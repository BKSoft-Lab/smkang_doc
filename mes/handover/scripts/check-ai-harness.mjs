#!/usr/bin/env node
/**
 * AI 하네스 — 저장소 규약 읽기 전용 검사 (DB 불필요).
 * 사용: `npm run check:ai-harness` · 엄격 USER_PROMPTS_LOG 날짜 순서: `npm run check:ai-harness:strict`
 * @see project-rules.md §4.2 · docs/USER_PROMPTS_LOG.md
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LEGACY_FORM_CODE_BY_SCREEN_ID } from '../server/src/lib/screenFormCodeMap.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const strictLogOrder = process.argv.includes('--strict-log-order')

let failures = 0
let warnings = 0

function fail(msg) {
  failures++
  console.error(`[check-ai-harness] FAIL: ${msg}`)
}

function warn(msg) {
  warnings++
  console.warn(`[check-ai-harness] WARN: ${msg}`)
}

function checkManualCsv() {
  const p = path.join(root, 'renderer', 'src', 'data', 'manual.csv')
  if (!fs.existsSync(p)) {
    fail(`manual.csv 없음: ${p}`)
    return
  }
  const raw = fs.readFileSync(p, 'utf8')
  const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== '')
  if (lines.length < 2) {
    fail('manual.csv에 헤더 외 행이 없습니다.')
    return
  }
  const header = lines[0]
  if (!header.includes('화면 ID') || !header.includes('모듈명')) {
    fail('manual.csv 헤더에 모듈명·화면 ID 열이 필요합니다.')
  }
}

function checkStdByScreenFiles() {
  const ids = Object.keys(LEGACY_FORM_CODE_BY_SCREEN_ID)
  const dir = path.join(root, 'server', 'src', 'routes', 'byScreen')
  for (const id of ids) {
    const f = path.join(dir, `${id}.mjs`)
    if (!fs.existsSync(f)) {
      fail(`byScreen 파일 없음 (screenFormCodeMap): ${path.relative(root, f)}`)
    }
  }
}

/**
 * `docs/USER_PROMPTS_LOG.md` 본문에서 `## YYYY-MM-DD` 헤더만 순서대로 추출(형식 블록의 비날짜 `##` 제외).
 */
function extractPromptLogDates(content) {
  const dates = []
  const re = /^##\s+(\d{4}-\d{2}-\d{2})\s*$/gm
  let m
  while ((m = re.exec(content)) !== null) {
    dates.push(m[1])
  }
  return dates
}

/** 상단 **연속** `## YYYY-MM-DD` 개수만 내림차순 검사(과거 본문 중 날짜 역전은 제외). */
const USER_PROMPTS_LOG_DATE_CHECK_HEAD = 3

function checkUserPromptsLogOrder() {
  const p = path.join(root, 'docs', 'USER_PROMPTS_LOG.md')
  if (!fs.existsSync(p)) {
    fail(`USER_PROMPTS_LOG.md 없음: ${p}`)
    return
  }
  const content = fs.readFileSync(p, 'utf8')
  const dates = extractPromptLogDates(content).slice(0, USER_PROMPTS_LOG_DATE_CHECK_HEAD)
  if (dates.length < 2) {
    return
  }
  for (let i = 0; i < dates.length - 1; i++) {
    if (dates[i] < dates[i + 1]) {
      const msg = `USER_PROMPTS_LOG 상위 ${USER_PROMPTS_LOG_DATE_CHECK_HEAD}개 날짜 헤딩이 내림차순이 아님: "${dates[i]}" 다음에 "${dates[i + 1]}" (최신 날짜가 파일 상단이어야 함)`
      if (strictLogOrder) {
        fail(msg)
      } else {
        warn(msg)
      }
      return
    }
  }
}

function main() {
  console.log('[check-ai-harness] running…')
  checkManualCsv()
  checkStdByScreenFiles()
  checkUserPromptsLogOrder()

  if (failures > 0) {
    console.error(`\n[check-ai-harness] ${failures} error(s), ${warnings} warning(s).`)
    process.exit(1)
  }
  if (warnings > 0) {
    console.log(`\n[check-ai-harness] passed with ${warnings} warning(s). (--strict-log-order 로 날짜 순 실패 시 exit 1)`)
  } else {
    console.log('\n[check-ai-harness] all checks passed.')
  }
  process.exit(0)
}

main()
