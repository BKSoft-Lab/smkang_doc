import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, '..')

/** `electron/main.cjs` `parseMesIni` 와 동일 규칙(최소) */
function parseMesIniForProxy(content: string): Record<string, string> {
  const out: Record<string, string> = {}
  let section = ''
  for (const raw of content.replace(/^\uFEFF/, '').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith(';') || line.startsWith('#')) continue
    if (line.startsWith('[') && line.endsWith(']')) {
      section = line.slice(1, -1).trim().toLowerCase()
      continue
    }
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const k = line.slice(0, eq).trim().toLowerCase()
    let v = line.slice(eq + 1).trim()
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    if (section) out[`${section}.${k}`] = v
    else out[k] = v
  }
  return out
}

/**
 * `/api` 프록시 대상 — `MES_USER_MGMT_PROXY_TARGET` > INI `USER_MGMT_API_BASE` > `UI_URL`+`USER_MGMT_API_PORT`.
 */
function resolveUserMgmtProxyTarget(): string {
  const envT = (process.env.MES_USER_MGMT_PROXY_TARGET || '').trim()
  if (envT) return envT.replace(/\/$/, '')
  const candidates = [
    (process.env.MES_CONFIG_INI || '').trim(),
    path.join(repoRoot, 'mes-config.ini')
  ].filter(Boolean) as string[]
  for (const iniPath of candidates) {
    try {
      if (!fs.existsSync(iniPath)) continue
      const kv = parseMesIniForProxy(fs.readFileSync(iniPath, 'utf8'))
      const explicit = (kv['mes.user_mgmt_api_base'] || '').trim()
      if (explicit) return explicit.replace(/\/$/, '')
      const ui = (kv['mes.ui_url'] || '').trim()
      if (!ui) continue
      const u = new URL(ui.includes('://') ? ui : `https://${ui}`)
      const port = (kv['mes.user_mgmt_api_port'] || '').trim() || '8787'
      u.port = port
      return u.origin.replace(/\/$/, '')
    } catch {
      /* try next */
    }
  }
  return 'http://localhost:8787'
}

const userMgmtProxyTarget = resolveUserMgmtProxyTarget()

const pkgVersion = (() => {
  try {
    const raw = fs.readFileSync(path.join(root, 'package.json'), 'utf8')
    const v = JSON.parse(raw)?.version
    return typeof v === 'string' && v.trim() !== '' ? v.trim() : '0.0.0'
  } catch {
    return '0.0.0'
  }
})()
const mesAppVersion = (process.env.VITE_MES_APP_VERSION || '').trim() || pkgVersion

// https://vite.dev/config/
export default defineConfig({
  /**
   * - Electron 로컬(file://): 기본 './' — 상대 경로로 정적 자산 로드
   * - 원격 UI 서버(루트): VITE_BASE_URL='/' 로 빌드
   * - 원격 UI 서버(하위 경로): VITE_BASE_URL='/app/' 등으로 빌드
   */
  base: process.env.VITE_BASE_URL || './',
  plugins: [react(), tailwindcss()],
  define: {
    /** 스플래시 등 — `VITE_MES_APP_VERSION` 우선, 없으면 `renderer/package.json` */
    'import.meta.env.VITE_MES_APP_VERSION': JSON.stringify(mesAppVersion)
  },
  resolve: {
    alias: {
      '@docs': path.resolve(root, '../docs')
    }
  },
  server: {
    fs: {
      allow: [path.resolve(root, '..')]
    },
    /** dev: `getMesDbBaseUrl()` 가 `''` 일 때 `/db/...`·`/func/...` → 백엔드(CORS 회피) */
    proxy: {
      /** std_base_user_mgmt BE — `mes-config.ini` UI_URL 호스트+포트(기본 8787) 또는 `MES_USER_MGMT_PROXY_TARGET` */
      '/api': {
        target: userMgmtProxyTarget,
        changeOrigin: true,
        secure: false
      },
      '/db': {
        target: 'https://100.71.84.10:7443',
        changeOrigin: true,
        secure: false
      },
      '/func': {
        target: 'https://100.71.84.10:7443',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
