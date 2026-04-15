/**
 * 그리드·본문 위 **조회 스트립** — 필터(우측 정렬) + **Search / Save** 열 (`border-l` 구분).
 * `BaseFeatureScreen` 의 `filterArea` 가 여기에 해당한다.
 * @see `docs/LAYOUT_RULES.md` 「조회 Search/Save 표준 스트립 (`MesSearchSaveBar`)」— 루트·flex·버튼 클래스 표
 */
import type { ReactNode } from 'react'
import { FilterSaveButton, FilterSearchButton } from './FilterBarButtons'

export type MesSearchSaveBarProps = {
  /**
   * 조회줄 **맨 왼쪽** — 삭제 확인·저장/오류 메시지·모드 배지 등(선택).
   * Search/Save 열 앞이 아니라 스트립 좌측에 둔다.
   */
  leading?: ReactNode
  /** 필터 필드(콤보·입력 등) — 행 내 **우측 정렬**(`justify-end`) 패턴 유지 */
  filters?: ReactNode
  /** 우측 Search 버튼 — 기본 `true`. 필터 안에만 Search 두면 `false` */
  showSearch?: boolean
  /** 우측 Save 버튼 — 기본 `true`. PNG에 조회줄 Save 없으면 `false` */
  showSave?: boolean
  /** Search 클릭 — `std_base_user_mgmt` 등 DB 조회 연동 시 */
  onSearch?: () => void
  /** Save 클릭 — DB 등록·갱신 시 */
  onSave?: () => void
  /** 루트 래퍼에 덧붙이는 클래스 */
  className?: string
}

export function MesSearchSaveBar({
  leading,
  filters,
  showSearch = true,
  showSave = true,
  onSearch,
  onSave,
  className = ''
}: MesSearchSaveBarProps) {
  const showActions = showSearch || showSave
  return (
    <div
      className={`relative z-30 border-b border-slate-300 bg-white px-3 py-0.5 shadow-sm ${className}`.trim()}
    >
      <div className="flex w-full min-w-0 items-stretch gap-0 text-[11px] text-slate-700">
        {leading ? (
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 border-r border-slate-200 pr-[10px]">
            {leading}
          </div>
        ) : null}
        <div
          className={`flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0.5 py-0 ${
            leading ? 'shrink-0 justify-end' : 'flex-1 justify-end'
          }`}
        >
          {filters}
        </div>
        {showActions ? (
          <div className="ml-2 flex shrink-0 items-center gap-1 border-l border-slate-300 pl-3">
            {showSearch ? <FilterSearchButton onClick={onSearch} /> : null}
            {showSave ? <FilterSaveButton onClick={onSave} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
