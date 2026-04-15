type Props = {
  /** 하위메뉴명 — 모달 타이틀 */
  title: string
  open: boolean
  onConfirm: () => void
  /** `POST /api/menu-access` 거부 시 진단용 — 개발자 도구 없이 구분 표시 */
  detailCode?: 'no_menu' | 'no_access' | 'server_error' | null
}

function menuAccessDetailHint(code: Props['detailCode']): string | null {
  if (!code) return null
  if (code === 'no_menu') {
    return '메뉴 마스터(tb_mes_menu)에 이 화면의 form 코드가 없습니다. DB 담당자에게 문의하세요. (reason: no_menu)'
  }
  if (code === 'no_access') {
    return '메뉴 권한(tb_mes_menu_authority) 또는 사용자 권한 그룹(tb_mes_user_authority)이 맞지 않습니다. (reason: no_access)'
  }
  return '서버와 통신 중 오류가 발생했습니다. (reason: server_error)'
}

/**
 * 기준정보 — `docs/image/<화면ID>.png` 미포함 시 접근 안내(에러) 팝업.
 * DB 메뉴 게이트 거부 시 `detailCode`로 `no_menu` / `no_access` 구분.
 */
export function MesScreenAccessDeniedModal({ title, open, onConfirm, detailCode }: Props) {
  if (!open) return null

  const detail = menuAccessDetailHint(detailCode ?? undefined)

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="std-access-denied-title"
    >
      <div className="w-full max-w-md rounded-lg border border-slate-300 bg-white shadow-xl">
        <div
          id="std-access-denied-title"
          className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[13px] font-semibold text-slate-800"
        >
          {title}
        </div>
        <div className="space-y-3 px-4 py-4 text-[12px] leading-relaxed text-slate-700">
          <p>해당 메뉴의 접근권한이 없습니다.</p>
          <p>접근권한 조정을 원하시거나 문제가 있으면 담당자에게 문의 바랍니다.</p>
          {detail ? (
            <p className="rounded border border-amber-200 bg-amber-50/90 px-2 py-1.5 font-mono text-[11px] text-amber-950">
              {detail}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end border-t border-slate-200 bg-slate-50/80 px-4 py-2.5">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded border border-slate-300 bg-white px-6 py-1.5 text-[12px] font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
