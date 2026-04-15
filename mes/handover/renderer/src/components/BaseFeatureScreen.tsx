import type { ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  useMesMdi,
  useMesMdiEmbedded,
  type ToolbarActionKey,
  type MdiToolbarHandlers
} from '../context/MesMdiContext'
import { MesSearchSaveBar } from './MesSearchSaveBar'
import { equalPercentageColWidths } from './simpleGridTableUtils'
import { Toolbar } from './Toolbar'
import { MesMenuBar } from './MesMenuBar'

export type BaseFeatureScreenProps = {
  /** `manual.csv` 화면 ID — 레이아웃 참조: `docs/image/<screenId>.png` */
  screenId: string
  /** 창 제목: `메뉴 > 하위메뉴 (화면ID)` — 보통 `manualInnerWindowTitle(row)` 또는 `manualInnerTitlePath`+`screenId` 조합; 모듈 창 타이틀은 모듈명만 */
  documentTitlePath: string
  /**
   * 기본 true. 기준정보 MDI 등 **모듈 창 단일 툴바**를 쓸 때 false — 상단 `Toolbar`는 숨기고 모듈 툴바가 `registerToolbarHandlers`로 연동.
   */
  showToolbar?: boolean
  /** 기본 false — Electron **시스템 메뉴**와 중복되지 않게 인앱 `MesMenuBar`는 넣지 않음 */
  showMenuBar?: boolean
  filterArea?: ReactNode
  /** 조회 스트립 **맨 왼쪽** — 배너·모드 배지 등(`MesSearchSaveBar` `leading`) */
  filterLeading?: ReactNode
  /** 필터 줄 우측 **Search** 버튼 표시(기본 true). 필터 내부에 Search 배치 시 `false` */
  showFilterSearch?: boolean
  /** 필터 줄 우측 **Save** 버튼 표시(기본 true). `frmItemMaster` 등 PNG에 조회줄 Save 없을 때 false */
  showFilterSave?: boolean
  /** 조회줄 Search 클릭 — DB 조회 등 */
  onFilterSearch?: () => void
  /** 조회줄 Save 클릭 — DB 저장 등 */
  onFilterSave?: () => void
  /**
   * 상단 **Toolbar** 액션 — 단독 창(`showToolbar`)은 `onAction`으로, MDI(`!showToolbar`)는 `registerToolbarHandlers`로 병합.
   * `close`는 항상 내부창 닫기로 처리.
   */
  toolbarHandlers?: MdiToolbarHandlers
  /** 툴바 버튼 비활성 — 단독 창은 `Toolbar`에 직접, MDI는 모듈 툴바에 `registerToolbarDisabled`로 반영 */
  toolbarDisabledActions?: ToolbarActionKey[]
  children: ReactNode
}

export function BaseFeatureScreen({
  screenId,
  documentTitlePath,
  showToolbar = true,
  showMenuBar = false,
  filterArea,
  filterLeading,
  showFilterSearch = true,
  showFilterSave = true,
  onFilterSearch,
  onFilterSave,
  toolbarHandlers,
  toolbarDisabledActions = [],
  children
}: BaseFeatureScreenProps) {
  const { registerToolbarHandlers, registerToolbarDisabled, close } = useMesMdi()
  const mdiEmbedded = useMesMdiEmbedded()

  const onToolbarAction = useCallback(
    (action: ToolbarActionKey) => {
      if (action === 'close') {
        close(screenId)
        return
      }
      toolbarHandlers?.[action]?.()
    },
    [close, screenId, toolbarHandlers]
  )

  useEffect(() => {
    if (showToolbar) return
    return registerToolbarHandlers(screenId, {
      close: () => close(screenId),
      ...toolbarHandlers
    })
  }, [showToolbar, screenId, registerToolbarHandlers, close, toolbarHandlers])

  useEffect(() => {
    if (showToolbar) return
    return registerToolbarDisabled(screenId, toolbarDisabledActions)
  }, [showToolbar, screenId, registerToolbarDisabled, toolbarDisabledActions])

  /** MDI 내부일 때는 `MesMdiLayer` 타이틀만 쓰고 `document.title`을 바꾸지 않음 — 모듈 Electron 창 제목이 내부 화면 문자열로 덮이지 않게 함 */
  useEffect(() => {
    if (mdiEmbedded) return
    const prev = document.title
    const pathPart =
      documentTitlePath === screenId
        ? `(${screenId})`
        : `${documentTitlePath} (${screenId})`
    document.title = pathPart
    return () => {
      document.title = prev
    }
  }, [mdiEmbedded, documentTitlePath, screenId])

  return (
    <div className="flex h-full flex-col bg-slate-100 text-slate-800" data-screen-id={screenId}>
      {showToolbar ? (
        <Toolbar onAction={onToolbarAction} disabledActions={toolbarDisabledActions} />
      ) : null}
      {showMenuBar && <MesMenuBar />}
      {filterArea != null || filterLeading != null ? (
        <MesSearchSaveBar
          leading={filterLeading}
          filters={filterArea}
          showSearch={showFilterSearch}
          showSave={showFilterSave}
          onSearch={onFilterSearch}
          onSave={onFilterSave}
        />
      ) : null}
      <div className="min-h-0 flex-1 overflow-hidden p-3">
        <div className="flex h-full flex-col rounded border border-slate-300 bg-white shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

/** 셀 수평 패딩: 좌·우 각 **0.3125rem** → 합 **0.625rem**(루트 `16px`일 때 약 **10px** — 「텍스트 + 10」**rem** 여유, zoom·글꼴 대응) */
export const simpleGridCellPadXClass = 'px-[0.3125rem]'

const COLUMN_RESIZE_MIN_PX = 40
/** 열 너비 계산 시 `clientWidth`에서 빼는 안전 여백 — 스크롤바·border 서브픽셀 오차로 가로 스크롤바가 생기는 것을 방지 */
const COL_WIDTH_GUTTER_PX = 5
/** 열 경계에서 이 픽셀 이상 이동해야 리사이즈 드래그로 간주(더블클릭 자동 맞춤과 구분) */
const COLUMN_RESIZE_DRAG_THRESHOLD_PX = 5
/** 더블클릭 맞춤: 서브픽셀·테두리·한글 글리프·`border-collapse` 여유(마지막 글자 줄바꿈 방지) */
const COLUMN_FIT_EXTRA_PX = 10
/** 대량 행 가상 렌더링(고정 행 높이 근사) */
const GRID_VIRTUAL_ROW_HEIGHT_PX = 24
const GRID_VIRTUAL_OVERSCAN_ROWS = 14
const GRID_VIRTUAL_THRESHOLD_ROWS = 150

function applyNoWrapForMeasure(chain: HTMLElement[]) {
  return chain.map((el) => ({
    el,
    whiteSpace: el.style.whiteSpace,
    maxWidth: el.style.maxWidth,
    minWidth: el.style.minWidth,
    wordBreak: el.style.wordBreak,
    overflowWrap: el.style.overflowWrap,
    overflow: el.style.overflow,
    textOverflow: el.style.textOverflow,
    display: el.style.display,
    width: el.style.width
  }))
}

function restoreNoWrap(backups: ReturnType<typeof applyNoWrapForMeasure>) {
  backups.forEach(
    ({
      el,
      whiteSpace,
      maxWidth,
      minWidth,
      wordBreak,
      overflowWrap,
      overflow,
      textOverflow,
      display,
      width
    }) => {
      el.style.whiteSpace = whiteSpace
      el.style.maxWidth = maxWidth
      el.style.minWidth = minWidth
      el.style.wordBreak = wordBreak
      el.style.overflowWrap = overflowWrap
      el.style.overflow = overflow
      el.style.textOverflow = textOverflow
      el.style.display = display
      el.style.width = width
    }
  )
}

/** `truncate`/`overflow-hidden`이 켜진 본문 셀도 intrinsic 텍스트 폭을 읽도록 측정용 인라인 스타일을 덮어쓴다. */
function applyMeasureUnclipStyles(chain: HTMLElement[]) {
  chain.forEach((el) => {
    el.style.whiteSpace = 'nowrap'
    el.style.maxWidth = 'none'
    el.style.minWidth = ''
    el.style.wordBreak = 'normal'
    el.style.overflowWrap = 'normal'
    el.style.overflow = 'visible'
    el.style.textOverflow = 'clip'
  })
}

function applyTdBodyIntrinsicSpan(cell: HTMLElement) {
  if (cell.tagName !== 'TD') return
  const first = cell.firstElementChild as HTMLElement | null
  if (!first || first.tagName !== 'SPAN') return
  first.style.display = 'inline-block'
  first.style.width = 'max-content'
}

function pushCellNoWrapChain(cell: HTMLElement): HTMLElement[] {
  const chain: HTMLElement[] = [cell]
  cell.querySelectorAll('button, span').forEach((el) => chain.push(el as HTMLElement))
  return chain
}

/**
 * `colgroup`을 좁힌 뒤 한 줄로 둔 상태에서, 셀·내부 요소 폭을 읽는다.
 * `td`만 `scrollWidth` 쓰면 `border-collapse`·서브픽셀에서 1글자 부족하게 나오는 경우가 있어
 * `getBoundingClientRect`·자식 `scrollWidth`와 함께 본다.
 */
function measureCellWidthPx(cell: HTMLElement): number {
  /**
   * `th`에는 열 리사이즈 핸들(`absolute right-0`)이 형제로 붙어 있어, `th.scrollWidth`가
   * 텍스트보다 과하게 잡히는 경우가 있다. 헤더는 **첫 자식(정렬 버튼 또는 제목 span)** 만 측정한다.
   */
  if (cell.tagName === 'TH') {
    const inner = cell.firstElementChild as HTMLElement | null
    if (inner && (inner.tagName === 'BUTTON' || inner.tagName === 'SPAN')) {
      return measureCellWidthPx(inner)
    }
  }
  /** 열이 1px일 때 `td`의 `getBoundingClientRect().width`는 ~1px라 쓰지 않는다. `scrollWidth` + 내부 박스만 본다. */
  let max = Math.ceil(cell.scrollWidth)
  const bump = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    max = Math.max(max, Math.ceil(r.width), Math.ceil(el.scrollWidth))
  }
  cell.querySelectorAll<HTMLElement>('button, span').forEach((el) => bump(el))
  const first = cell.firstElementChild as HTMLElement | null
  if (first) bump(first)
  return max
}

/**
 * `table-fixed`에서 열이 넓으면 셀 `scrollWidth`가 **할당 너비**에 가깝게 나와 **줄어들지 않는** 문제가 있다.
 * 해당 `colgroup col`을 일시로 좁혀 오버플로 시킨 뒤 **내용 한 줄 폭**을 읽는다.
 */
function measureColumnFitWidth(table: HTMLTableElement, colIndex: number, minW: number): number {
  const sel = `thead tr th:nth-child(${colIndex + 1}), tbody tr td:nth-child(${colIndex + 1})`
  const cells = Array.from(table.querySelectorAll(sel)).filter((node) => {
    const cell = node as HTMLTableCellElement
    /** 가상 스크롤 패딩행(`td[colspan]`)은 측정에서 제외 — 과대 자동맞춤 방지 */
    return !(cell.tagName === 'TD' && cell.colSpan > 1)
  }) as HTMLElement[]
  if (cells.length === 0) return minW

  const colEls = table.querySelectorAll('colgroup col')
  const colEl = colEls[colIndex] as HTMLTableColElement | undefined

  if (colEl) {
    const prevColW = colEl.style.width
    const cellBackups: ReturnType<typeof applyNoWrapForMeasure>[] = []
    cells.forEach((cell) => {
      const chain = pushCellNoWrapChain(cell)
      const backups = applyNoWrapForMeasure(chain)
      cellBackups.push(backups)
      applyMeasureUnclipStyles(chain)
      applyTdBodyIntrinsicSpan(cell)
    })
    colEl.style.width = '1px'
    void table.offsetWidth
    let max = minW
    cells.forEach((cell) => {
      max = Math.max(max, measureCellWidthPx(cell))
    })
    colEl.style.width = prevColW
    cellBackups.forEach((b) => restoreNoWrap(b))
    return Math.max(minW, Math.ceil(max + COLUMN_FIT_EXTRA_PX))
  }

  /** `colgroup` 없을 때(비정상): 기존 방식 + 여유 px */
  let max = minW
  cells.forEach((cell) => {
    const chain = pushCellNoWrapChain(cell)
    const backups = applyNoWrapForMeasure(chain)
    applyMeasureUnclipStyles(chain)
    applyTdBodyIntrinsicSpan(cell)
    max = Math.max(max, cell.scrollWidth)
    restoreNoWrap(backups)
  })
  return Math.max(minW, Math.ceil(max + COLUMN_FIT_EXTRA_PX))
}

/** 드래그 중 React 리렌더 없이 `colgroup`·표 너비만 갱신 — mouseup에서 `setPxColWidths`로 state 정합 */
function applyColumnResizeWidthsToTableDom(table: HTMLTableElement, w: number[]) {
  if (w.length === 0) return
  const sum = w.reduce((a, b) => a + b, 0)
  table.style.width = `${sum}px`
  table.style.minWidth = `${sum}px`
  const cols = table.querySelectorAll('colgroup col')
  for (let i = 0; i < w.length; i++) {
    const col = cols[i] as HTMLTableColElement | undefined
    if (col) col.style.width = `${w[i]}px`
  }
}

function parsePercentWidths(widths: string[]): number[] {
  const nums = widths.map((w) => {
    const s = String(w).trim()
    if (s.endsWith('%')) return parseFloat(s) / 100
    return 0
  })
  const sum = nums.reduce((a, b) => a + b, 0)
  if (sum <= 0) return widths.map(() => 1 / widths.length)
  return nums.map((n) => n / sum)
}

/** `colgroup` 초기 폭 — 첫 열 `Nch`(행번호 등) → 본문 `text-[11px]` 기준 대략 자릿수 폭 */
function parseChWidthToPx(input: string): number | null {
  const m = /^(\d+(?:\.\d+)?)ch$/i.exec(String(input).trim())
  if (!m) return null
  const n = parseFloat(m[1]!)
  const fontPx = 11
  return Math.ceil(n * fontPx * 0.55)
}

export function SimpleGridTable({
  title,
  columns,
  rows = 15,
  /**
   * - **`adaptive`**(기본): 뷰에 **자연 너비가 다 들어가면** `table-fixed`+`%`, **안 들어갈 때**(가로 오버플로) **`table-auto`** · 「텍스트 + `simpleGridCellPadXClass`(rem)」.
   * - **`colWidths`**: 생략 또는 열 길이 불일치 시 **`equalPercentageColWidths(columns.length)`**로 보정(PNG별 비율은 명시적 전달).
   * - **`intrinsic`**: 항상 `table-auto`(너비 힌트 무시).
   * - **`fixed`**: 항상 `table-fixed`+해당 `colWidths`(유효할 때).
   */
  colWidths,
  columnLayout,
  /** 각 열 `th`/`td`에 덧붙이는 클래스(정렬 등). 비우면 해당 열 `td`는 `text-center` */
  columnClassNames,
  /** 홀수 행 배경(기본 `bg-slate-100/90`). 예: `bg-sky-50/35` */
  oddRowClassName = 'bg-slate-100/90',
  virtualizeRows = false,
  /** 예제/목업: `cellValues[i][j]` 가 `columns[j]` 에 대응. 행 수는 `max(rows, cellValues.length)` */
  cellValues,
  /** 헤더 클릭 정렬 — 부모에서 정렬된 `cellValues`·`onSortColumn`·`sortColumn`/`sortDirection` */
  sortable = false,
  sortColumn = null,
  sortDirection = 'asc',
  onSortColumn,
  /** 열 경계 드래그로 너비 조절 — 내부 `px` `colgroup`(초기값은 스크롤 영역 너비×`colWidths` %). 구분선 **더블클릭** 시 해당 열을 내용(한 줄) 최대 폭에 맞춤. **마지막 열** 구분선 더블클릭 시 **모든 열**을 같은 방식으로 한 번에 맞춤 */
  columnResize = false,
  minColumnWidthPx = COLUMN_RESIZE_MIN_PX,
  /** 부모 `style.zoom` 배율 — 열 리사이즈 드래그를 논리 px로 환산 */
  columnResizeVisualScale = 1,
  /** 본문 행 선택(마스터–디테일). `onRowClick` 이 있으면 행에 `cursor-pointer`·클릭 시 인덱스 전달 */
  selectedRowIndex = null,
  onRowClick,
  onRowDoubleClick,
  /**
   * 반환값이 있으면 해당 셀을 커스텀 렌더(예: `select`). 없으면 기본 텍스트 `span`.
   * 인터랙티브 요소는 행 클릭과 겹치지 않게 `stopPropagation` 권장.
   */
  renderCell
}: {
  title: string
  columns: string[]
  rows?: number
  colWidths?: string[]
  columnLayout?: 'intrinsic' | 'fixed' | 'adaptive'
  columnClassNames?: string[]
  oddRowClassName?: string
  virtualizeRows?: boolean
  cellValues?: string[][]
  sortable?: boolean
  sortColumn?: number | null
  sortDirection?: 'asc' | 'desc'
  onSortColumn?: (columnIndex: number) => void
  columnResize?: boolean
  minColumnWidthPx?: number
  columnResizeVisualScale?: number
  selectedRowIndex?: number | null
  onRowClick?: (rowIndex: number) => void
  onRowDoubleClick?: (rowIndex: number) => void
  renderCell?: (args: {
    rowIndex: number
    colIndex: number
    value: string
    row: string[]
  }) => ReactNode | null | undefined
}) {
  const bodyRowCount = Math.max(rows, cellValues?.length ?? 0)
  const resolvedColWidths = useMemo(() => {
    if (colWidths != null && colWidths.length === columns.length) {
      return colWidths
    }
    return equalPercentageColWidths(columns.length)
  }, [colWidths, columns.length])

  const resolvedColWidthsKey = resolvedColWidths.join('\0')

  const firstColChPx = useMemo(
    () => parseChWidthToPx(resolvedColWidths[0] ?? ''),
    [resolvedColWidths]
  )

  const layoutHasPercentCols =
    resolvedColWidths.length === columns.length && columns.length > 0

  const effectiveLayout =
    columnLayout ?? (layoutHasPercentCols ? 'adaptive' : 'intrinsic')

  const scrollRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const [virtualScrollTop, setVirtualScrollTop] = useState(0)
  const [virtualViewportH, setVirtualViewportH] = useState(0)
  const [pxColWidths, setPxColWidths] = useState<number[] | null>(null)
  const resizeDragRef = useRef<{
    col: number
    startX: number
    startWidths: number[]
    active: boolean
  } | null>(null)
  /** 드래그 중 DOM에만 반영한 최신 너비 — mouseup 시 state와 동기화 */
  const resizeDragLastWidthsRef = useRef<number[] | null>(null)
  const colWidthsInitKeyRef = useRef<string>('')
  /** 마지막으로 열 너비를 계산했을 때의 유효 너비 기준값 (컨테이너 clientWidth - 버퍼) */
  const lastEffectiveWidthRef = useRef<number>(0)
  /** `pxColWidths` state 최신값 — ResizeObserver 콜백에서 stale closure 없이 참조 */
  const pxColWidthsRef = useRef<number[] | null>(null)
  /**
   * `adaptive`일 때만 의미 있음(아닐 때는 아래 파생값으로 무시).
   * effect 안에서 `!adaptive`일 때 동기 `setState` 리셋은 ESLint `set-state-in-effect` 위반이므로 사용하지 않음.
   */
  const [measuredOverflow, setMeasuredOverflow] = useState(false)

  const isAdaptive = effectiveLayout === 'adaptive' && layoutHasPercentCols
  const overflowIntrinsic = isAdaptive && measuredOverflow

  /** 가로로 **모든 열이 한 번에 들어갈 수 있을 때** `%` 고정, **안 들어갈 때만** 내용+rem(intrinsic). */
  const useIntrinsicLayout =
    !columnResize &&
    (!layoutHasPercentCols ||
      effectiveLayout === 'intrinsic' ||
      (effectiveLayout === 'adaptive' && overflowIntrinsic))

  const useFixedLayout =
    columnResize ||
    (layoutHasPercentCols &&
      (effectiveLayout === 'fixed' ||
        (effectiveLayout === 'adaptive' && !overflowIntrinsic)))

  const initPxColWidths = useCallback(() => {
    if (!columnResize) return
    const wrap = scrollRef.current
    if (!wrap || columns.length === 0) return
    // 스크롤바·border 서브픽셀 오차 대비 5px 여백을 빼고 계산
    const cw = Math.max(0, wrap.clientWidth - COL_WIDTH_GUTTER_PX)
    if (cw <= 0) return
    lastEffectiveWidthRef.current = cw
    const chFirst = parseChWidthToPx(resolvedColWidths[0] ?? '')
    if (chFirst != null && resolvedColWidths.length >= 2) {
      const fixedFirst = Math.max(1, Math.floor(chFirst))
      const remaining = Math.max(0, cw - fixedFirst)
      const restPcts = parsePercentWidths(resolvedColWidths.slice(1))
      const raw: number[] = [fixedFirst]
      for (let i = 0; i < restPcts.length; i++) {
        raw.push(Math.max(minColumnWidthPx, Math.floor(restPcts[i]! * remaining)))
      }
      const sum = raw.reduce((a, b) => a + b, 0)
      if (sum < cw) {
        raw[raw.length - 1]! += cw - sum
      } else if (sum > cw) {
        raw[raw.length - 1]! -= sum - cw
      }
      setPxColWidths(raw)
      return
    }
    const pcts = parsePercentWidths(resolvedColWidths)
    const raw = pcts.map((p) => Math.max(minColumnWidthPx, Math.floor(p * cw)))
    const sum = raw.reduce((a, b) => a + b, 0)
    if (sum < cw) {
      const last = raw.length - 1
      raw[last] = raw[last]! + (cw - sum)
    }
    setPxColWidths(raw)
  }, [columnResize, columns.length, resolvedColWidths, minColumnWidthPx])

  useLayoutEffect(() => {
    if (!columnResize) {
      setPxColWidths(null)
      colWidthsInitKeyRef.current = ''
      return
    }
    const key = `${columns.length}:${resolvedColWidthsKey}`
    if (colWidthsInitKeyRef.current !== key) {
      colWidthsInitKeyRef.current = key
      setPxColWidths(null)
    }
  }, [columnResize, columns.length, resolvedColWidthsKey])

  /** `pxColWidths` state → ref 동기화 (ResizeObserver 콜백에서 stale closure 없이 참조) */
  useLayoutEffect(() => {
    pxColWidthsRef.current = pxColWidths
  })

  useLayoutEffect(() => {
    if (!columnResize || pxColWidths !== null) return
    initPxColWidths()
  }, [columnResize, pxColWidths, initPxColWidths])

  useLayoutEffect(() => {
    if (!columnResize) return
    const wrap = scrollRef.current
    if (!wrap) return
    const ro = new ResizeObserver(() => {
      const cw = Math.max(0, wrap.clientWidth - COL_WIDTH_GUTTER_PX)
      if (cw <= 0) return
      if (pxColWidthsRef.current == null) {
        initPxColWidths()
        return
      }
      const prevCw = lastEffectiveWidthRef.current
      if (prevCw > 0 && cw !== prevCw) {
        lastEffectiveWidthRef.current = cw
        if (firstColChPx != null) {
          initPxColWidths()
          return
        }
        // 창 크기 변경·스크롤바 출현 등으로 너비가 바뀌면 비율 유지하며 재계산
        setPxColWidths((prev) => {
          if (!prev) return prev
          const scaled = prev.map((w) => Math.max(minColumnWidthPx, Math.round((w * cw) / prevCw)))
          const sum = scaled.reduce((a, b) => a + b, 0)
          if (sum !== cw) {
            scaled[scaled.length - 1] = Math.max(minColumnWidthPx, scaled[scaled.length - 1]! + (cw - sum))
          }
          return scaled
        })
      }
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [columnResize, initPxColWidths, minColumnWidthPx, firstColChPx])

  const onColumnResizeStart = useCallback(
    (boundaryIndex: number) => (e: React.MouseEvent) => {
      if (!pxColWidths || pxColWidths.length < 1) return
      e.preventDefault()
      e.stopPropagation()
      resizeDragRef.current = {
        col: boundaryIndex,
        startX: e.clientX,
        startWidths: [...pxColWidths],
        active: false
      }
      resizeDragLastWidthsRef.current = null
      const onMove = (ev: MouseEvent) => {
        const drag = resizeDragRef.current
        if (!drag) return
        const scale = Math.max(columnResizeVisualScale, 0.01)
        const dx = (ev.clientX - drag.startX) / scale
        if (!drag.active) {
          if (Math.abs(dx) < COLUMN_RESIZE_DRAG_THRESHOLD_PX) return
          drag.active = true
          document.body.style.cursor = 'col-resize'
          document.body.style.userSelect = 'none'
        }
        const i = drag.col
        const w = [...drag.startWidths]
        const min = minColumnWidthPx
        /** 구분선 기준 **왼쪽 열(i)** 만 조절 — 우측 열은 유지, 표 전체 너비만 증·감(가로 스크롤) */
        w[i] = Math.max(min, drag.startWidths[i]! + dx)
        resizeDragLastWidthsRef.current = w
        const tableEl = tableRef.current
        if (tableEl) applyColumnResizeWidthsToTableDom(tableEl, w)
      }
      const onUp = () => {
        const last = resizeDragLastWidthsRef.current
        resizeDragRef.current = null
        resizeDragLastWidthsRef.current = null
        if (last && last.length === columns.length) {
          setPxColWidths(last)
        }
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    },
    [minColumnWidthPx, pxColWidths, columnResizeVisualScale, columns.length]
  )

  const onColumnResizeDoubleClick = useCallback(
    (colIndex: number) => (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!pxColWidths || pxColWidths.length !== columns.length) return
      const table = tableRef.current
      if (!table) return
      requestAnimationFrame(() => {
        const t = tableRef.current
        if (!t) return
        const n = columns.length
        const isLastColumnHandle = colIndex === n - 1
        if (isLastColumnHandle) {
          const next = Array.from({ length: n }, (_, j) =>
            Math.max(minColumnWidthPx, measureColumnFitWidth(t, j, minColumnWidthPx))
          )
          setPxColWidths(next)
          return
        }
        const w = Math.max(minColumnWidthPx, measureColumnFitWidth(t, colIndex, minColumnWidthPx))
        setPxColWidths((prev) => {
          if (!prev || prev.length !== columns.length) return prev
          const next = [...prev]
          next[colIndex] = w
          return next
        })
      })
    },
    [columns.length, minColumnWidthPx, pxColWidths]
  )

  const colgroupWidths = useMemo(() => {
    if (columnResize && pxColWidths && pxColWidths.length === columns.length) {
      return pxColWidths.map((px) => `${px}px`)
    }
    return resolvedColWidths
  }, [columnResize, pxColWidths, resolvedColWidths, columns.length])

  const tablePixelWidth =
    columnResize && pxColWidths && pxColWidths.length === columns.length
      ? pxColWidths.reduce((a, b) => a + b, 0)
      : null

  useLayoutEffect(() => {
    if (!isAdaptive || !layoutHasPercentCols || columnResize) {
      return
    }

    const wrap = scrollRef.current
    const tableEl = tableRef.current
    if (!wrap || !tableEl) return

    const measure = () => {
      const clone = tableEl.cloneNode(true) as HTMLTableElement
      clone.removeAttribute('style')
      clone.className = 'border-collapse border border-slate-400 text-[11px] table-auto w-max'
      clone.querySelector('colgroup')?.remove()
      clone.style.visibility = 'hidden'
      clone.style.position = 'absolute'
      clone.style.left = '-99999px'
      clone.style.top = '0'
      clone.style.pointerEvents = 'none'
      document.body.appendChild(clone)
      const naturalW = clone.offsetWidth
      document.body.removeChild(clone)
      const availW = wrap.clientWidth
      setMeasuredOverflow(naturalW > availW + 1)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [
    isAdaptive,
    layoutHasPercentCols,
    columnResize,
    bodyRowCount,
    resolvedColWidthsKey,
    cellValues
  ])

  const useVirtualBody = virtualizeRows && bodyRowCount > GRID_VIRTUAL_THRESHOLD_ROWS

  useLayoutEffect(() => {
    if (!useVirtualBody) return
    const wrap = scrollRef.current
    if (!wrap) return
    const sync = () => {
      setVirtualScrollTop(wrap.scrollTop)
      setVirtualViewportH(wrap.clientHeight)
    }
    sync()
    const onScroll = () => setVirtualScrollTop(wrap.scrollTop)
    wrap.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(wrap)
    return () => {
      wrap.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [useVirtualBody])

  const virtualStart = useVirtualBody
    ? Math.max(0, Math.floor(virtualScrollTop / GRID_VIRTUAL_ROW_HEIGHT_PX) - GRID_VIRTUAL_OVERSCAN_ROWS)
    : 0
  const virtualEndExclusive = useVirtualBody
    ? Math.min(
        bodyRowCount,
        Math.ceil((virtualScrollTop + Math.max(virtualViewportH, 1)) / GRID_VIRTUAL_ROW_HEIGHT_PX) +
          GRID_VIRTUAL_OVERSCAN_ROWS
      )
    : bodyRowCount
  const virtualTopPadPx = useVirtualBody ? virtualStart * GRID_VIRTUAL_ROW_HEIGHT_PX : 0
  const virtualBottomPadPx = useVirtualBody
    ? Math.max(0, (bodyRowCount - virtualEndExclusive) * GRID_VIRTUAL_ROW_HEIGHT_PX)
    : 0

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {title ? (
        <div className="shrink-0 border-b border-slate-300 bg-slate-100 px-3 py-2 text-[11px] font-semibold text-slate-800">
          {title}
        </div>
      ) : null}
      <div
        ref={scrollRef}
        className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto overscroll-contain"
      >
        <table
          ref={tableRef}
          className={`border-collapse border border-slate-400 text-[11px] ${
            useIntrinsicLayout ? 'table-auto w-max' : 'table-fixed'
          } ${tablePixelWidth == null && !useIntrinsicLayout ? 'w-full' : ''} ${
            tablePixelWidth != null ? 'w-max max-w-none' : ''
          }`}
          style={
            useIntrinsicLayout
              ? { minWidth: 'max-content' }
              : tablePixelWidth != null
                ? { width: tablePixelWidth, minWidth: tablePixelWidth }
                : { width: '100%', minWidth: 'max-content' }
          }
        >
          {useFixedLayout ? (
            <colgroup>
              {colgroupWidths.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
          ) : null}
          <thead className="sticky top-0 z-10 bg-slate-100 text-slate-800">
            <tr>
              {columns.map((h, ci) => {
                const active = sortable && sortColumn === ci
                const ariaSort =
                  active && sortDirection === 'asc'
                    ? 'ascending'
                    : active && sortDirection === 'desc'
                      ? 'descending'
                      : 'none'
                return (
                  <th
                    key={ci}
                    aria-sort={sortable && onSortColumn ? ariaSort : undefined}
                    className={`border-b border-r border-slate-400 text-center text-[10px] font-semibold leading-tight ${
                      columnResize ? 'relative' : ''
                    } ${
                      sortable && onSortColumn ? 'p-0' : `${simpleGridCellPadXClass} py-1`
                    }`}
                  >
                    {sortable && onSortColumn ? (
                      <button
                        type="button"
                        className={`${simpleGridCellPadXClass} flex w-full min-h-[1.75rem] items-center justify-center gap-0.5 py-1 hover:bg-slate-200/95 active:bg-slate-300/85`}
                        onClick={() => onSortColumn(ci)}
                      >
                        <span className="inline-block w-max min-w-max max-w-full whitespace-nowrap">{h}</span>
                        {active ? (
                          <span className="inline-block shrink-0 text-[9px] text-slate-500" aria-hidden>
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        ) : null}
                      </button>
                    ) : (
                      <>
                        {/*
                          열 타이틀은 항상 가운데 정렬 — `columnClassNames`(본문 `td`용 `text-left` 등)를 `th`에 붙이지 않는다.
                        */}
                        <span className="inline-block w-max min-w-max max-w-full whitespace-nowrap">{h}</span>
                      </>
                    )}
                    {columnResize && pxColWidths ? (
                      <div
                        role="separator"
                        aria-orientation="vertical"
                        aria-label={
                          ci < columns.length - 1
                            ? `${ci + 1}번·${ci + 2}번 열 사이. 드래그로 ${ci + 1}번 열 너비 조절, 더블클릭으로 이 열만 내용에 맞춤`
                            : `${ci + 1}번 열(마지막) 오른쪽. 드래그로 이 열 너비 조절, 더블클릭으로 모든 열을 내용에 맞춤`
                        }
                        title={
                          ci < columns.length - 1
                            ? '드래그: 이 열 너비 조절 · 더블클릭: 이 열만 내용에 맞춤'
                            : '드래그: 이 열 너비 조절 · 더블클릭: 모든 열을 내용에 맞춤'
                        }
                        className="absolute right-0 top-0 z-30 h-full w-1.5 -translate-x-1/2 cursor-col-resize select-none hover:bg-slate-500/35"
                        onMouseDown={onColumnResizeStart(ci)}
                        onDoubleClick={onColumnResizeDoubleClick(ci)}
                      />
                    ) : null}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {useVirtualBody && virtualTopPadPx > 0 ? (
              <tr aria-hidden>
                <td colSpan={columns.length} className="border-r border-slate-400 p-0" style={{ height: virtualTopPadPx }} />
              </tr>
            ) : null}
            {Array.from({ length: virtualEndExclusive - virtualStart }).map((_, offset) => {
              const i = virtualStart + offset
              const isSelected = selectedRowIndex != null && selectedRowIndex === i
              const zebra = i % 2 === 0 ? 'bg-white' : oddRowClassName
              return (
              <tr
                key={i}
                aria-selected={onRowClick ? isSelected : undefined}
                className={`${isSelected ? 'bg-sky-100/85 ring-1 ring-inset ring-sky-400/55' : zebra} ${onRowClick ? 'cursor-pointer hover:bg-sky-50/90' : ''}`}
                onClick={onRowClick ? () => onRowClick(i) : undefined}
                onDoubleClick={onRowDoubleClick ? () => onRowDoubleClick(i) : undefined}
              >
                {columns.map((_, ci) => {
                  const colExtra = columnClassNames?.[ci]
                  const raw = cellValues?.[i]?.[ci]
                  const text = raw != null && raw !== '' ? raw : '\u00a0'
                  const cellTitle = raw != null && raw !== '' ? String(raw) : undefined
                  const fullRow = cellValues?.[i] ?? []
                  const custom = renderCell?.({
                    rowIndex: i,
                    colIndex: ci,
                    value: raw != null && raw !== '' ? String(raw) : '',
                    row: fullRow
                  })
                  const isCustom = custom != null
                  return (
                    <td
                      key={ci}
                      className={`max-w-0 ${isCustom ? 'overflow-visible' : 'overflow-hidden'} border-b border-r border-slate-400 ${simpleGridCellPadXClass} py-0.5 text-slate-600 ${colExtra && colExtra.length > 0 ? colExtra : 'text-center'}`}
                    >
                      {isCustom ? (
                        <span className="block min-w-0 align-middle">{custom}</span>
                      ) : (
                        <>
                          {/*
                            열이 좁으면 한 줄 + 말줄임(`truncate`). `max-w-0`로 `table-fixed`/`colgroup` 폭 안에서 말줄임이 적용되게 한다.
                          */}
                          <span className="block min-w-0 truncate align-middle" title={cellTitle}>
                            {text}
                          </span>
                        </>
                      )}
                    </td>
                  )
                })}
              </tr>
              )
            })}
            {useVirtualBody && virtualBottomPadPx > 0 ? (
              <tr aria-hidden>
                <td
                  colSpan={columns.length}
                  className="border-b border-r border-slate-400 p-0"
                  style={{ height: virtualBottomPadPx }}
                />
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
