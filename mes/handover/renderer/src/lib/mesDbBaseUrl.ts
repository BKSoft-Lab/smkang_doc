/**
 * MES DB HTTP API 베이스 (`/db/tb_*`, `/func/fn_*` …).
 * - **dev**: `VITE_MES_DB_API_BASE` 가 비어 있으면 상대 경로 `/db` → Vite `server.proxy` 로 백엔드 전달(CORS 회피).
 * - **prod**: 기본 `https://100.71.84.10:7443` 또는 `VITE_MES_DB_API_BASE` 로 직접 호출.
 */
export function getMesDbBaseUrl(): string {
  const v = import.meta.env.VITE_MES_DB_API_BASE as string | undefined
  if (v !== undefined && String(v).trim() !== '') return String(v).replace(/\/$/, '')
  if (import.meta.env.DEV) return ''
  return 'https://100.71.84.10:7443'
}

/** `/db/tb_cm_user` 형태 path(선행 슬래시) */
export function mesDbUrl(path: string): string {
  const base = getMesDbBaseUrl()
  const p = path.startsWith('/') ? path : `/${path}`
  return base === '' ? p : `${base}${p}`
}
