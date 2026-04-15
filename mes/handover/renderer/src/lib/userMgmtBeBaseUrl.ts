/**
 * STD 전용 Node BE 베이스 URL (`/api/users`, `/api/tb-cm-code`, `/api/user-access-logs` 등 공통).
 * (INI 키명 `USER_MGMT_API_BASE` 는 역사적 이름이며, 문서상 **MES_STD_API_BASE** 와 동일 의미로 볼 수 있음.)
 * 우선순위:
 * 1. **`window.__MES_USER_MGMT_API_BASE__`** — Electron에서 `mes-config.ini`(`USER_MGMT_API_BASE` 또는 `UI_URL`+`USER_MGMT_API_PORT`)로 부트스트랩 시 주입
 * 2. **`import.meta.env.VITE_USER_MGMT_API_BASE`**
 * 3. **dev** + 위가 비어 있으면 상대 `/api` → Vite `server.proxy`(저장소 `mes-config.ini` 또는 `MES_USER_MGMT_PROXY_TARGET`)
 */
export function getUserMgmtBeBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const inj = window.__MES_USER_MGMT_API_BASE__
    if (typeof inj === 'string' && inj.trim() !== '') return inj.replace(/\/$/, '')
  }
  const v = import.meta.env.VITE_USER_MGMT_API_BASE as string | undefined
  if (v !== undefined && String(v).trim() !== '') return String(v).replace(/\/$/, '')
  if (import.meta.env.DEV) return ''
  return ''
}

/** `/api/users` 형태 path(선행 슬래시) */
export function userMgmtBeUrl(path: string): string {
  const base = getUserMgmtBeBaseUrl()
  const p = path.startsWith('/') ? path : `/${path}`
  return base === '' ? p : `${base}${p}`
}
