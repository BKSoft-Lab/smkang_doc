/**
 * `MesDataGridPanel` 하단 — 선택 행 상세 표시·수정 폼 영역(마스터–디테일).
 * @see `docs/LAYOUT_RULES.md` 「행 상세 폼 (`MesDetailForm`)」·「기능 화면 구역 시각적 구분」
 */
import type { ReactNode } from 'react'

export type MesDetailFormProps = {
  /** 선택 행 상세 폼 본문 */
  children: ReactNode
  /** 구역 제목(선택). 비우면 제목 줄 없음 — 문자열 또는 배지 등 `ReactNode` */
  title?: ReactNode
  /** `title` 이 노드일 때 접근성용(비우면 `'상세'`) */
  titleAriaLabel?: string
  /** 제목 아래 푸터(주의 문구 등, 선택) */
  footer?: ReactNode
  /** 루트에 덧붙이는 클래스 */
  className?: string
}

export function MesDetailForm({
  children,
  title,
  titleAriaLabel,
  footer,
  className = ''
}: MesDetailFormProps) {
  const aria =
    titleAriaLabel ??
    (typeof title === 'string' || typeof title === 'number' ? String(title) : undefined) ??
    '상세'
  return (
    <section
      className={`shrink-0 border-t border-slate-300 bg-slate-50/80 p-3 ${className}`.trim()}
      role="region"
      aria-label={aria}
    >
      {title ? (
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-700">
          {title}
        </div>
      ) : null}
      {children}
      {footer ?? null}
    </section>
  )
}
