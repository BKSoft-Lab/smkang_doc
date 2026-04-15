/**
 * 기준정보(STD) 전용 BE — 단일 Express 프로세스, PostgreSQL `tb_cm_*` 직접 접근.
 * 라우트 구현: `lib/queries/*.mjs`(모듈 전용은 `std_*` 등 접두) — 화면별 진입: `routes/byScreen/<screenId>.mjs`.
 */
import 'dotenv/config'
import express from 'express'
import { pool, safePoolTarget } from './db/pool.mjs'
import { friendlyPgError, isConnRefused, isConnReset, isPgServerRejectsSsl, isPgHbaRejection } from './lib/pgErrors.mjs'
import { createStdBaseCommonCodeMgmtRouter } from './routes/byScreen/std_base_common_code_mgmt.mjs'
import { createStdBaseUserMgmtRouter } from './routes/byScreen/std_base_user_mgmt.mjs'
import { createStdBaseVendorMgmtRouter } from './routes/byScreen/std_base_vendor_mgmt.mjs'
import { createStdBaseUnitProcessMgmtRouter } from './routes/byScreen/std_base_unit_process_mgmt.mjs'
import { createStdBaseUnitProcessLineMgmtRouter } from './routes/byScreen/std_base_unit_process_line_mgmt.mjs'
import { createStdBaseUserPermissionMgmtRouter } from './routes/byScreen/std_base_user_permission_mgmt.mjs'
import { createStdBaseMenuPermissionMgmtRouter } from './routes/byScreen/std_base_menu_permission_mgmt.mjs'
import { createStdBaseUserLogInqRouter } from './routes/byScreen/std_base_user_log_inq.mjs'
import { createStdCfgRouterMgmtRouter } from './routes/byScreen/std_cfg_router_mgmt.mjs'
import { createStdCfgProdRouterMgmtRouter } from './routes/byScreen/std_cfg_prod_router_mgmt.mjs'
import { createStdCfgTactTimeMgmtRouter } from './routes/byScreen/std_cfg_tact_time_mgmt.mjs'
import { createStdCfgPackingUnitMgmtRouter } from './routes/byScreen/std_cfg_packing_unit_mgmt.mjs'
import { createStdBaseProcessLineMgmtRouter } from './routes/byScreen/std_base_process_line_mgmt.mjs'
import { createStdBaseProcessLineConfigMgmtRouter } from './routes/byScreen/std_base_process_line_config_mgmt.mjs'
import { createAuthAndSplashRouter } from './lib/queries/authAndSplash.mjs'

const PORT = Number(process.env.PORT ?? '8787')

const app = express()
/** `X-Forwarded-For`·`req.ip` — 리버스 프록시 뒤에서 클라이언트 IP 보존 */
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? '1'))
app.use(express.json({ limit: '512kb' }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,PATCH,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use(createStdBaseCommonCodeMgmtRouter())
app.use(createStdBaseUserMgmtRouter())
app.use(createStdBaseVendorMgmtRouter())
app.use(createStdBaseUnitProcessMgmtRouter())
app.use(createStdBaseUnitProcessLineMgmtRouter())
app.use(createStdBaseUserPermissionMgmtRouter())
app.use(createStdBaseMenuPermissionMgmtRouter())
app.use(createStdBaseUserLogInqRouter())
app.use(createStdCfgRouterMgmtRouter())
app.use(createStdCfgProdRouterMgmtRouter())
app.use(createStdCfgTactTimeMgmtRouter())
app.use(createStdCfgPackingUnitMgmtRouter())
app.use(createStdBaseProcessLineMgmtRouter())
app.use(createStdBaseProcessLineConfigMgmtRouter())
app.use(createAuthAndSplashRouter())

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true })
  } catch (e) {
    res.status(503).json({ ok: false, error: friendlyPgError(e) })
  }
})

app.listen(PORT, () => {
  console.log(`[mes-std-be] listening on http://localhost:${PORT}`)
  const target = safePoolTarget()
  void pool
    .query('SELECT 1')
    .then(() => {
      console.log('[mes-std-be] PostgreSQL 연결 OK', target)
    })
    .catch((e) => {
      const refused = isConnRefused(e)
      const reset = isConnReset(e)
      const sslNo = isPgServerRejectsSsl(e)
      const hba = isPgHbaRejection(e)
      console.error(
        '[mes-std-be] PostgreSQL 연결 실패 — /api/* 가 500을 반환할 수 있습니다.',
        '\n  대상(비밀번호 제외):',
        JSON.stringify(target),
        '\n  → Windows: PostgreSQL 설치·서비스 기동, 또는 원격 DB면 DATABASE_URL 설정.',
        sslNo ? '\n  → "does not support SSL": PGSSLMODE=disable 또는 require/sslmode 제거 후 재시작.' : '',
        hba
          ? '\n  → pg_hba.conf 거부: 서버에서 보이는 클라이언트 IP에 대한 host/hostssl·사용자·DB 규칙을 추가하거나, BE를 DB 서버 로컬에서 실행.'
          : '',
        reset && !sslNo && !hba
          ? '\n  → ECONNRESET: 방화벽/VPN/pg_hba — 필요 시 PGSSLMODE=require 시도, 평문만이면 disable.'
          : '',
        '\n  원인:',
        refused ? 'ECONNREFUSED (해당 host:port에 리스너 없음)' : (e instanceof Error ? e.message : String(e))
      )
    })
})
