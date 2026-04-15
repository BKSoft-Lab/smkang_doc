/**
 * 공통코드 관리(`std_base_common_code_mgmt`)와 동일한 그리드 UX — 정렬·열 리사이즈·Ctrl+휠 줌·안내줄.
 * @see `docs/LAYOUT_RULES.md` 「데이터 그리드 표준 패널」·`project-rules.md` §6.0
 *
 * **편집 시 재정렬 방지(선택)**: `preserveSortOrderUntilHeaderClick` 이 true 이면 열 헤더로 정렬이 바뀌기 전까지
 * `cellValues`만 바뀐 경우(같은 행 개수·같은 정렬 열) 표시 순서를 유지한다. 데이터 세트를 통째로 바꿀 때는
 * `sortDataEpoch` 를 올려 한 번 전체 재정렬되게 한다(예: 조회 성공 직후).
 */
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from 'react'
import { SimpleGridTable } from './BaseFeatureScreen'
import { equalPercentageColWidths } from './simpleGridTableUtils'

const GRID_ZOOM_MIN = 70
const GRID_ZOOM_MAX = 200
const GRID_ZOOM_STEP = 5
/** `minVisibleRows`로 잡는 본문 최소 높이(행 높이 대략값, px) — 빈 패딩 행은 만들지 않음 */
const MIN_VISIBLE_GRID_BODY_HEIGHT_PER_ROW_PX = 26

type GridSortState = { col: number | null; dir: 'asc' | 'desc' }

/** 줄번호 열 제외 후 데이터 셀이 모두 비어 있으면 렌더·정렬에서 제외(또는 정렬 시 맨 아래) */
function isRowEmptyPadding(row: string[], hasLineNoCol: boolean): boolean {
  const cells = hasLineNoCol ? row.slice(1) : row
  return !cells.some((c) => String(c).trim() !== '')
}

export type MesDataGridPanelProps = {
  columns: string[]
  /**
   * 첫 열 **`#`(줄번호)** 자동 부착 — 기본 `true`.
   * 부모가 이미 `columns[0] === '#'` 이면 중복하지 않음(`std_base_common_code_mgmt` 등).
   * `false` 로 끄면 부모 `columns`·`cellValues` 그대로(레거시·특수 표).
   */
  showRowNumbers?: boolean
  /**
   * `showRowNumbers` 로 줄번호 열을 붙일 때 첫 열 너비 — 기본 `4%`.
   * `Nch`(예: `3ch`) 는 `SimpleGridTable` 본문 `text-[11px]` 기준 행번호 자릿수에 맞춘 좁은 열.
   */
  lineNoColWidth?: string
  /** 행 데이터 — **데이터 열**만(`showRowNumbers` 가 켜지면 줄번호 열은 내부에서 붙임). 첫 열이 `#`이면 정렬 후 줄번호를 1…n 으로 다시 매김 */
  cellValues: string[][]
  /**
   * 열 너비 — 합 100% 권장. 생략 시 `equalPercentageColWidths(columns.length)`.
   * PNG·캡처에 맞춘 비율을 두는 것을 권장한다.
   */
  colWidths?: string[]
  /** `SimpleGridTable` 상단 제목(빈 문자열이면 제목 영역 없음) */
  tableTitle?: string
  /**
   * 그리드 본문 **최소 높이** 힌트(대략 `행 높이×값` px). **빈 패딩 행은 만들지 않음** — 데이터가 비어 있는 행은 렌더하지 않는다.
   * 기본 0.
   */
  minVisibleRows?: number
  /** 홀수 행 배경 — 기본 `bg-slate-100/90` (`SimpleGridTable` 기본) */
  oddRowClassName?: string
  /** 대량 데이터에서 본문 행 가상 렌더링(virtualization) */
  virtualizeRows?: boolean
  /** 루트에 덧붙이는 클래스 */
  className?: string
  /** 본문 행 선택(표시 순서 기준 인덱스). `onSelectRow` 와 함께 쓴다 */
  selectedRowIndex?: number | null
  /**
   * 행 클릭 — **표시 순서**(정렬 반영)의 `rowIndex`와 해당 행 `cellValues` 전체.
   * 빈 패딩 행(데이터 열이 모두 비어 있으면) 호출하지 않는다.
   */
  onSelectRow?: (rowIndex: number, row: string[]) => void
  /** 행 더블클릭 — `onSelectRow`와 동일 시그니처. 빈 패딩 행은 호출하지 않는다 */
  onDoubleClickRow?: (rowIndex: number, row: string[]) => void
  /** 열 헤더로 정렬이 바뀔 때(선택 행이 의미 없어질 수 있음) — 상세 폼 초기화 등에 사용 */
  onSortChange?: () => void
  /**
   * true 이면 **헤더 클릭으로 정렬이 바뀌기 전**에는 셀 값만 바뀐 경우 **표시 순서를 유지**한다(기본 false).
   * 다른 화면 동작은 그대로 둔다.
   */
  preserveSortOrderUntilHeaderClick?: boolean
  /**
   * `preserveSortOrderUntilHeaderClick` 이 true 일 때만 사용. 값이 바뀌면 **데이터 세트 교체**로 보고
   * 저장된 표시 순서를 버리고 **현재 정렬 열 기준으로 전체 재정렬**한다.
   */
  sortDataEpoch?: number | string
  /**
   * 데이터 열 기준 커스텀 셀(줄번호 열 제외). `sourceRowIndex`는 부모 `cellValues`의 **원본 행 인덱스**(빈 행 필터 후에도 동일).
   */
  renderCell?: (args: {
    rowIndex: number
    colIndex: number
    value: string
    row: string[]
    sourceRowIndex: number
  }) => ReactNode | null | undefined
}

function MesDataGridPanelInner({
  columns,
  showRowNumbers = true,
  lineNoColWidth = '4%',
  cellValues,
  colWidths: colWidthsProp,
  tableTitle = '',
  minVisibleRows = 0,
  oddRowClassName,
  virtualizeRows = false,
  className = '',
  selectedRowIndex = null,
  onSelectRow,
  onDoubleClickRow,
  onSortChange,
  preserveSortOrderUntilHeaderClick = false,
  sortDataEpoch,
  renderCell: renderCellProp
}: MesDataGridPanelProps) {
  const [gridZoomPct, setGridZoomPct] = useState(100)
  const [sort, setSort] = useState<GridSortState>({ col: null, dir: 'asc' })
  const gridZoomWrapRef = useRef<HTMLDivElement>(null)
  /** preserve 모드: 표시 순서 = `paddedRows[stablePermRef[i]]` */
  const stablePermRef = useRef<number[] | null>(null)
  const lastStableSigRef = useRef<string>('')

  /** 부모가 이미 `#` 열을 넘긴 경우 — 자동 줄번호 생략 */
  const parentHasLineNoCol = columns[0]?.trim() === '#'
  const injectLineNo = showRowNumbers && !parentHasLineNoCol

  const hasLineNoCol = injectLineNo || parentHasLineNoCol

  const effectiveColumns = useMemo(() => {
    if (injectLineNo) return ['', ...columns] as string[]
    if (parentHasLineNoCol) return ['', ...columns.slice(1)] as string[]
    return columns
  }, [injectLineNo, parentHasLineNoCol, columns])

  const cellValuesWithLineNo = useMemo(() => {
    if (!injectLineNo) return cellValues
    const n = columns.length
    return cellValues.map((row, i) => {
      const r = [...row]
      while (r.length < n) r.push('')
      return [String(i + 1), ...r.slice(0, n)]
    })
  }, [cellValues, injectLineNo, columns.length])

  const colWidths = useMemo(() => {
    if (!injectLineNo) return colWidthsProp ?? equalPercentageColWidths(columns.length)
    const rest = colWidthsProp ?? equalPercentageColWidths(columns.length)
    return [lineNoColWidth, ...rest]
  }, [injectLineNo, lineNoColWidth, colWidthsProp, columns.length])

  const columnClassNames = useMemo(
    () =>
      Array.from({ length: effectiveColumns.length }, (_, idx) =>
        hasLineNoCol && idx === 0 ? 'tabular-nums text-center' : 'text-left'
      ),
    [effectiveColumns.length, hasLineNoCol]
  )

  useEffect(() => {
    const el = gridZoomWrapRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      e.stopPropagation()
      const step = Math.abs(e.deltaY) >= 50 ? GRID_ZOOM_STEP * 2 : GRID_ZOOM_STEP
      const delta = e.deltaY < 0 ? step : -step
      setGridZoomPct((z) => Math.min(GRID_ZOOM_MAX, Math.max(GRID_ZOOM_MIN, z + delta)))
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  /** 빈 데이터 행 제거 후 줄번호 1…n 재부여, 부모 `cellValues` 원본 인덱스 병행 */
  const { paddedRows, sourceIndicesForDisplay } = useMemo(() => {
    const colCount = effectiveColumns.length
    const kept: string[][] = []
    const sourceIndices: number[] = []
    cellValuesWithLineNo.forEach((row, sourceIndex) => {
      if (isRowEmptyPadding(row, hasLineNoCol)) return
      kept.push(row)
      sourceIndices.push(sourceIndex)
    })
    const withLineNumbers = injectLineNo
      ? kept.map((row, i) => [String(i + 1), ...row.slice(1)] as string[])
      : kept
    const normalized = withLineNumbers.map((row) => {
      const out = [...row]
      while (out.length < colCount) out.push('')
      return out.slice(0, colCount)
    })
    return { paddedRows: normalized, sourceIndicesForDisplay: sourceIndices }
  }, [cellValuesWithLineNo, hasLineNoCol, injectLineNo, effectiveColumns.length])

  const rowCount = paddedRows.length

  const onSortColumn = useCallback(
    (col: number) => {
      /** 줄번호 열(자동·부모 제공 모두)은 정렬 대상에서 제외 */
      if (hasLineNoCol && col === 0) return
      setSort((s) => {
        if (s.col === col) {
          return { col, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        }
        if (s.col === null) {
          return { col, dir: 'asc' }
        }
        return { col, dir: s.dir === 'asc' ? 'desc' : 'asc' }
      })
      onSortChange?.()
    },
    [onSortChange, hasLineNoCol]
  )

  const { displayRows, displayToSourceRow } = useMemo(() => {
    const colIdx = sort.col
    const lineNoCol = hasLineNoCol

    const doFullSort = (): { displayRows: string[][]; displayToSourceRow: number[] } => {
      if (colIdx == null) {
        const displayToSourceRow = paddedRows.map((_, i) => i)
        return { displayRows: paddedRows, displayToSourceRow }
      }
      const dir = sort.dir
      const indexed = paddedRows.map((row, i) => ({ row, i }))
      indexed.sort((a, b) => {
        const aPad = isRowEmptyPadding(a.row, lineNoCol)
        const bPad = isRowEmptyPadding(b.row, lineNoCol)
        if (aPad !== bPad) {
          return aPad ? 1 : -1
        }
        const va = a.row[colIdx] ?? ''
        const vb = b.row[colIdx] ?? ''
        const c = va.localeCompare(vb, 'ko', { numeric: true, sensitivity: 'base' })
        return dir === 'asc' ? c : -c
      })
      const displayToSourceRow = indexed.map((x) => x.i)
      let sortedRows = indexed.map((x) => x.row)
      if (lineNoCol) {
        sortedRows = sortedRows.map((row, i) => [String(i + 1), ...row.slice(1)])
      }
      return { displayRows: sortedRows, displayToSourceRow }
    }

    if (colIdx == null) {
      if (preserveSortOrderUntilHeaderClick) {
        stablePermRef.current = null
        lastStableSigRef.current = ''
      }
      const displayToSourceRow = paddedRows.map((_, i) => i)
      return { displayRows: paddedRows, displayToSourceRow }
    }

    if (!preserveSortOrderUntilHeaderClick) {
      return doFullSort()
    }

    const sig = `${colIdx}:${sort.dir}:${paddedRows.length}:${String(sortDataEpoch ?? '')}`
    const needFullSort =
      !stablePermRef.current ||
      stablePermRef.current.length !== paddedRows.length ||
      lastStableSigRef.current !== sig

    if (needFullSort) {
      const result = doFullSort()
      stablePermRef.current = result.displayToSourceRow
      lastStableSigRef.current = sig
      return result
    }

    const perm = stablePermRef.current!
    let permuted = perm.map((i) => paddedRows[i])
    if (lineNoCol) {
      permuted = permuted.map((row, i) => [String(i + 1), ...row.slice(1)])
    }
    return { displayRows: permuted, displayToSourceRow: perm }
  }, [
    paddedRows,
    sort.col,
    sort.dir,
    hasLineNoCol,
    preserveSortOrderUntilHeaderClick,
    sortDataEpoch
  ])

  const gridRenderCell = useMemo(() => {
    if (!renderCellProp) return undefined
    return (args: {
      rowIndex: number
      colIndex: number
      value: string
      row: string[]
    }) => {
      if (injectLineNo && args.colIndex === 0) return null
      const dataCol = injectLineNo ? args.colIndex - 1 : args.colIndex
      const dataRow = injectLineNo ? args.row.slice(1) : args.row
      const paddedIdx = displayToSourceRow[args.rowIndex] ?? args.rowIndex
      const sourceRowIndex = sourceIndicesForDisplay[paddedIdx] ?? paddedIdx
      return renderCellProp({
        rowIndex: args.rowIndex,
        colIndex: dataCol,
        value: dataRow[dataCol] ?? '',
        row: dataRow,
        sourceRowIndex
      })
    }
  }, [renderCellProp, injectLineNo, displayToSourceRow, sourceIndicesForDisplay])

  const resolveRow = useCallback(
    (rowIndex: number): string[] | null => {
      const row = displayRows[rowIndex]
      if (!row) return null
      const cellsForEmpty = hasLineNoCol ? row.slice(1) : row
      if (!cellsForEmpty.some((c) => String(c).trim() !== '')) return null
      return injectLineNo ? row.slice(1) : row
    },
    [displayRows, hasLineNoCol, injectLineNo]
  )

  const handleRowClick = useCallback(
    (rowIndex: number) => {
      if (!onSelectRow) return
      const row = resolveRow(rowIndex)
      if (!row) return
      onSelectRow(rowIndex, row)
    },
    [onSelectRow, resolveRow]
  )

  const handleRowDoubleClick = useCallback(
    (rowIndex: number) => {
      if (!onDoubleClickRow) return
      const row = resolveRow(rowIndex)
      if (!row) return
      onDoubleClickRow(rowIndex, row)
    },
    [onDoubleClickRow, resolveRow]
  )

  return (
    <div
      className={`isolate flex min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-hidden ring-1 ring-slate-400 ring-inset ${className}`.trim()}
    >
      {gridZoomPct !== 100 && (
        <div className="flex shrink-0 items-center justify-end border-b border-slate-300 bg-slate-100/95 px-2 py-0.5 text-[10px] text-slate-600">
          <span className="tabular-nums font-medium text-slate-600">{gridZoomPct}%</span>
        </div>
      )}
      <div
        ref={gridZoomWrapRef}
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden [contain:paint]"
        style={
          {
            zoom: gridZoomPct / 100,
            ...(minVisibleRows > 0
              ? {
                  /** 부모(flex)보다 크면 overflow-hidden에 잘려 스크롤로 마지막 행까지 못 감 — 상한 100% */
                  minHeight: `min(${minVisibleRows * MIN_VISIBLE_GRID_BODY_HEIGHT_PER_ROW_PX}px, 100%)`
                }
              : {})
          } as CSSProperties
        }
      >
        <SimpleGridTable
          title={tableTitle}
          columns={effectiveColumns}
          rows={rowCount}
          cellValues={displayRows}
          columnLayout="adaptive"
          columnClassNames={columnClassNames}
          sortable
          sortColumn={sort.col}
          sortDirection={sort.dir}
          onSortColumn={onSortColumn}
          columnResize
          columnResizeVisualScale={gridZoomPct / 100}
          colWidths={colWidths}
          oddRowClassName={oddRowClassName}
          virtualizeRows={virtualizeRows}
          selectedRowIndex={onSelectRow ? selectedRowIndex : null}
          onRowClick={onSelectRow ? handleRowClick : undefined}
          onRowDoubleClick={onDoubleClickRow ? handleRowDoubleClick : undefined}
          renderCell={gridRenderCell}
        />
      </div>
    </div>
  )
}

/**
 * `cellValues` 등 props가 같으면 리렌더 생략 — 인접 패널 데이터 변경 시 상대 그리드 DOM 재그리기 방지.
 */
export const MesDataGridPanel = memo(MesDataGridPanelInner)
MesDataGridPanel.displayName = 'MesDataGridPanel'
