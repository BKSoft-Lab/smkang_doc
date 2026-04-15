## 2026-04-18 (smkang_doc — mes/handover 푸시)
### 작업 내용
- **`D:\smkang_data\docs`** (`BKSoft-Lab/smkang_doc`) — **`mes/handover/**`** 커밋·`origin/main` 푸시. `manual.csv`는 `.gitignore` `data/` 예외로 **`git add -f`** 포함.

### 변경된 파일 (MES 저장소)
- `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`

---

## 2026-04-17 (문서 — handover 오프라인 번들 smkang_data)
### 작업 내용
- **[`scripts/copy-handover-to-smkang.mjs`](../scripts/copy-handover-to-smkang.mjs)** — `docs/HANDOVER_NEW_DEVELOPER.html` 의 `href`를 해석해 MES 루트 상대 경로 그대로 **`D:\smkang_data\docs\mes\handover`** 에 복사(`docs/db-doc` 전체 포함). **`index.html`** 리다이렉트·**`README.txt`**.
- **[`docs/HANDOVER_NEW_DEVELOPER.md`](HANDOVER_NEW_DEVELOPER.md)** — `MesScreenShell` 링크 경로 수정, 존재하지 않는 `screenPngPresence.ts` 문구 정리, 오프라인 번들 안내 추가. HTML 재생성.

### 변경된 파일
- `scripts/copy-handover-to-smkang.mjs`, `docs/HANDOVER_NEW_DEVELOPER.md`, `docs/HANDOVER_NEW_DEVELOPER.html`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`
- (로컬) `D:\smkang_data\docs\mes\handover\**` — Git 미추적

---

## 2026-04-17 (문서 — 신규 개발자 인수인계 HTML)
### 작업 내용
- **[`docs/HANDOVER_NEW_DEVELOPER.html`](HANDOVER_NEW_DEVELOPER.html)** — [`HANDOVER_NEW_DEVELOPER.md`](HANDOVER_NEW_DEVELOPER.md) 를 [`scripts/render-db-doc-html.mjs`](../scripts/render-db-doc-html.mjs) 로 변환(GFM·인라인 CSS). MD 하단에 재생성 명령·HTML 경로 안내 추가.

### 변경된 파일
- `docs/HANDOVER_NEW_DEVELOPER.md`, `docs/HANDOVER_NEW_DEVELOPER.html`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-17 (문서 — 신규 개발자 인수인계)
### 작업 내용
- **[`docs/HANDOVER_NEW_DEVELOPER.md`](HANDOVER_NEW_DEVELOPER.md)** 신규 작성 — 준비(캡처·레거시 코드)·개발(FE/BE·연동·§6.0.3 정합)·문서 지도·코드 앵커 Mermaid·`BK MES.docx` 부록 안내(저장소 미수급 시 별도 확보).
- **[`docs/DOCUMENTATION_INDEX.md`](DOCUMENTATION_INDEX.md)** 필수 인덱스에 항목 추가.

### 변경된 파일
- `docs/HANDOVER_NEW_DEVELOPER.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-16 (BE — `lib/queries` 모듈 접두·STD 파일 rename)
### 작업 내용
- **`server/src/lib/queries`**: 기준정보 전용 구현 파일을 **`std_` 접두**로 통일 — 예: `std_tbCmUser.mjs`, `std_cfgMes.mjs`, `std_userAccessLog.mjs`. **여러 모듈 공통** 라우터는 접두 없음 — `authAndSplash.mjs` 유지.
- **`routes/byScreen`**, **`index.mjs`**, **`authAndSplash.mjs`** import 경로 갱신.
- 규칙 문서: **`server/src/routes/byScreen/README.md`**, **`server/src/lib/queries/README.md`**, **`project-rules.md`** §4.2, **`.cursor/rules/std-be-byscreen.mdc`**, **`docs/DATABASE.md`**·**`docs/db-doc/*_api.md`**·**`docs/sql/diagnose_menu_access.sql`** 링크 정리.

### 변경된 파일
- `server/src/lib/queries/*.mjs`(rename 다수), `server/src/routes/byScreen/*.mjs`, `server/src/index.mjs`, `project-rules.md`, `.cursor/rules/std-be-byscreen.mdc`, `docs/DATABASE.md`, `docs/db-doc/**`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-15 (BE — `server/src` 복구·DEVELOPER 로그인 수정 재반영)
### 작업 내용
- **`git restore server/src`** 로 삭제된 트리 복구. [`server/src/lib/queries/authAndSplash.mjs`](../server/src/lib/queries/authAndSplash.mjs) 에 `DEVELOPER` 전용 403·`isDeveloperId` 재제거(이전과 동일).

### 변경된 파일
- `server/src/lib/queries/authAndSplash.mjs`, `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`

---

## 2026-04-15 (BE — DEVELOPER 일반 로그인·비밀번호 변경 허용)
### 작업 내용
- [`server/src/lib/queries/authAndSplash.mjs`](../server/src/lib/queries/authAndSplash.mjs): `POST /api/auth/login`·`POST /api/auth/change-password` 에서 `DEVELOPER` 전용 403 분기 및 `isDeveloperId` 제거. `tb_cm_user`·비밀번호 검증은 일반 사용자와 동일.

### 변경된 파일
- `server/src/lib/queries/authAndSplash.mjs`, `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`

---

## 2026-04-15 (BE/FE — 메뉴 접근 권한 디버그 스킵 플래그 제거)
### 작업 내용
- **`MES_SKIP_MENU_ACCESS_CHECK`** / **`VITE_SKIP_MENU_ACCESS`** 및 `POST /api/menu-access`·`postMenuAccess` 조기 허용 분기 제거. `server/.env.example`·`server/README.md` 정리.

### 변경된 파일
- `server/src/lib/queries/std_userAccessLog.mjs`, `renderer/src/lib/userAccessLogApi.ts`, `server/.env.example`, `server/README.md`, `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`

---

## 2026-04-15 (도구 — AI 하네스 `check-ai-harness`·GitHub Actions CI)
### 작업 내용
- **[`scripts/check-ai-harness.mjs`](../scripts/check-ai-harness.mjs)** — `manual.csv`·`screenFormCodeMap`의 `std_*` ↔ `server/src/routes/byScreen`·`docs/USER_PROMPTS_LOG.md` 상단 3개 날짜 헤딩 내림차순 검사. **`npm run check:ai-harness`** / **`check:ai-harness:strict`**.
- **[`.github/workflows/ci.yml`](../.github/workflows/ci.yml)** — `npm ci` → `lint`(continue-on-error) → 하네스(일반·strict).
- **[`.gitignore`](../.gitignore)** — `.cursor/debug-*.log` 무시.
- 문서: [`docs/SETUP.md`](SETUP.md), [`docs/CONTEXT.md`](CONTEXT.md), [`docs/DOCUMENTATION_INDEX.md`](DOCUMENTATION_INDEX.md), [`.cursor/skills/README.md`](../.cursor/skills/README.md).

### 변경된 파일
- `scripts/check-ai-harness.mjs`, `package.json`, `.gitignore`, `.github/workflows/ci.yml`, `docs/SETUP.md`, `docs/CONTEXT.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/USER_PROMPTS_LOG.md`, `.cursor/skills/README.md`, `docs/CHANGELOG.md`

---

## 2026-04-13 (문서 — USER_PROMPTS_LOG Git 푸시 답 요약)
### 작업 내용
- **[`docs/USER_PROMPTS_LOG.md`](USER_PROMPTS_LOG.md)** Git 커밋·푸시 턴 답 요약 문구 정리.

### 변경된 파일
- `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`

---

## 2026-04-13 (문서 — VENDOR 보고서 §3 단일 물리 서버 전제)
### 작업 내용
- **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §3: **UI·BE·DB 동일 물리 서버**를 본문 기준으로 서두·역할 표·Mermaid·HTTP 표·§3.7 요약도 갱신. 다중 서버 분리는 참고 문구로만 유지.
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](USER_PROMPTS_LOG.md).

### 변경된 파일
- `docs/VENDOR_PROJECT_REPORT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-13 (문서 — VENDOR 보고서 §3 PC·UI·내부·외부 서버 구분)
### 작업 내용
- **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §3: **사용자 PC / (선택) UI 웹 서버 / 내부 서버 / 외부 서버** 역할 표, 배치 다이어그램(원격 UI 점선), §3.7 요약을 PC·내부·외부 3구역으로 정리.
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](USER_PROMPTS_LOG.md).

### 변경된 파일
- `docs/VENDOR_PROJECT_REPORT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-13 (문서 — VENDOR 보고서 시스템 구성 상세)
### 작업 내용
- **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §3 대폭 보강: `/api` vs `/db`·`/func`, STD BE 내부, 베이스 URL·Vite 프록시·Electron 비교, 논리/데이터 플로우 Mermaid.
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](USER_PROMPTS_LOG.md).

### 변경된 파일
- `docs/VENDOR_PROJECT_REPORT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-13 (문서 — VENDOR 보고서 UI 구성 상세)
### 작업 내용
- **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §4 대폭 보강: `HashRouter` 경로 표, 메인/모듈 창 비교, 스플래시·`ModuleFeaturesPage`·MDI·권한 게이트·`BaseFeatureScreen` 표준 레이아웃·공통 컴포넌트 역할 표, Mermaid 1종 추가.
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](USER_PROMPTS_LOG.md).

### 변경된 파일
- `docs/VENDOR_PROJECT_REPORT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-13 (문서 — VENDOR 보고서 Pandoc PDF 부록)
### 작업 내용
- **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** 부록 A: PDF 변환 시 **`pdflatex` 미설치** 오류와 **`wkhtmltopdf`**·`--pdf-engine` Windows 경로 예시 추가.
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](USER_PROMPTS_LOG.md).

### 변경된 파일
- `docs/VENDOR_PROJECT_REPORT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-13 (문서 — 발주업체용 프로젝트 정리 보고서)
### 작업 내용
- **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** 신설: 기술 스택, 클라이언트–BE–DB 희름, UI·내비게이션·표준 화면 스택(Mermaid), `manual.csv` 모듈별 화면 수, `FEATURE_SCREEN_REGISTRY` 등록 현황(249/296), 기준정보 API 문서 참조, PDF·Word 부록.
- **[`docs/DOCUMENTATION_INDEX.md`](DOCUMENTATION_INDEX.md)**·[`docs/USER_PROMPTS_LOG.md`](USER_PROMPTS_LOG.md).

### 변경된 파일
- `docs/VENDOR_PROJECT_REPORT.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-12 (규칙 — db-doc API 문서 워크플로 중복 정리)
### 작업 내용
- **[`page-db-analysis-workflow.mdc`](.cursor/rules/page-db-analysis-workflow.mdc)**: 「db-doc `*_api.md` 수정 시 후속」절을 2·3단계와 중복되지 않게 한 단락으로 정리.
- **`project-rules.md`**·**`.cursorrules`**·**[`ai-rules.md`](ai-rules.md)**: 동일 절차의 장문 반복을 제거하고 **`page-db-analysis-workflow.mdc` 를 정본**으로 두고 참조만 유지(`ai-rules` 위임 표 1행 통합).
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `.cursor/rules/page-db-analysis-workflow.mdc`, `project-rules.md`, `.cursorrules`, `ai-rules.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-12 (문서 — 기준정보 14화면 db-doc HTML·smkang_doc 푸시)
### 작업 내용
- **`scripts/render-db-doc-html.mjs`** 로 `docs/db-doc/std_*_api.md` 14건 → `D:\smkang_data\docs\mes\std_*_api.html` 생성·갱신.
- **저장소 `D:\smkang_data\docs`** (`origin` → `BKSoft-Lab/smkang_doc`) 에 `mes/` HTML 14개만 커밋·푸시 — 커밋 메시지 `만든 파일 업로드` (`091bac4`).

### 변경된 파일
- (외부) `D:\smkang_data\docs\mes\std_*_api.html` ×14 — 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

---

## 2026-04-12 (문서 — 기준정보 모듈 DB·HTTP 통합 분석)
### 작업 내용
- **[`docs/db-doc/std_module_basis_info_overview.md`](docs/db-doc/std_module_basis_info_overview.md)** 신설: 매뉴얼 기준 기준정보 14화면의 구현 경로·주요 테이블·대표 API·각 `*_api.md` 링크·공통 패턴(`fn-cm-code`, 권한, cfg, `menu-access`) 정리.
- **[`docs/DOCUMENTATION_INDEX.md`](docs/DOCUMENTATION_INDEX.md)**·본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `docs/db-doc/std_module_basis_info_overview.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-12 (BE — `POST /api/menu-access` 거부 시 접속 로그 미기록)
### 작업 내용
- **[`userAccessLog.mjs`](server/src/lib/queries/std_userAccessLog.mjs)**: `MES_USER_LOG_COLUMN_MODE=legacy`일 때도 **`access_power=Y`(허용)** 인 경우에만 `tb_mes_menuaccesslogs` INSERT. 권한 없음 팝업만 보고 화면 미진입 시 로그에 남지 않음.
- **[`docs/db-doc/std_base_user_log_inq_api.md`](docs/db-doc/std_base_user_log_inq_api.md)**·본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `server/src/lib/queries/std_userAccessLog.mjs`, `docs/db-doc/std_base_user_log_inq_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (규칙 — db-doc `*_api.md` 수정 시 HTML·smkang_doc 푸시)
### 작업 내용
- **`.cursor/rules/page-db-analysis-workflow.mdc`**: **`docs/db-doc/*_api.md` 수정·추가 시** `scripts/render-db-doc-html.mjs`로 `D:\smkang_data\docs\mes\` HTML 반영 후 `D:\smkang_data\docs` 커밋·`origin` 푸시 절차를 **「db-doc `*_api.md` 수정 시 후속」** 으로 명문화.
- **`project-rules.md`**·**`.cursorrules`**: 동일 의무를 문서 생성 규칙·Cursor 전용 절에 교차 반영.
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `.cursor/rules/page-db-analysis-workflow.mdc`, `project-rules.md`, `.cursorrules`, `ai-rules.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (FE/BE — `POST /api/menu-access` 집계·거부 사유·진단 SQL)
### 작업 내용
- **[`userAccessLog.mjs`](server/src/lib/queries/std_userAccessLog.mjs)**: `tb_mes_menu`에 동일 `form_code`가 여러 행일 때 **`LIMIT 1` 한 건만** 보던 방식이 `tb_mes_menu_authority`와 어긋날 수 있어, 후보 메뉴 전체와 권한을 조인한 뒤 **`MAX(access_power)`** 로 허용 여부를 판정. 접속 로그 INSERT는 허용된 `(메뉴, 권한)` 페어 중 한 건을 선택.
- **[`MesScreenAccessDeniedModal.tsx`](renderer/src/components/MesScreenAccessDeniedModal.tsx)**·**[`ScreenPlaceholderPage.tsx`](renderer/src/pages/ScreenPlaceholderPage.tsx)**: DB 메뉴 게이트 거부 시 **`no_menu` / `no_access` / `server_error`** 구분 안내.
- **[`docs/sql/diagnose_menu_access.sql`](docs/sql/diagnose_menu_access.sql)**: `tb_mes_user_authority`·`tb_mes_menu`·`tb_mes_menu_authority` 수동 교차 검증용 쿼리.
- 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `server/src/lib/queries/std_userAccessLog.mjs`, `renderer/src/components/MesScreenAccessDeniedModal.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `docs/sql/diagnose_menu_access.sql`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (BE — `POST /api/menu-access` 22001·권한 OR)
### 작업 내용
- **[`userAccessLog.mjs`](server/src/lib/queries/std_userAccessLog.mjs)**: `tb_mes_menuaccesslogs` INSERT 전 **`os_version`·`computer_name` 등 길이 클립**(기본 OS 50자 등, `MES_USER_LOG_INS_MAX_*`) — 브라우저 `userAgent`로 **22001** 나고 클라이언트가 500을 **접근 거부**로 오인하던 현상 완화. **`tb_mes_menu_authority`** 조건에 웹 **`screen_id`**(클라이언트)와의 일치 OR 추가(권한 행 `form_code`가 `std_*`만 저장된 경우).
- **본 파일**·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `server/src/lib/queries/std_userAccessLog.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (문서 — `screen_id`↔`form_code` 룰 반영)
### 작업 내용
- **`project-rules.md` §4.2**: 표 행 **`screen_id` ↔ `tb_mes_menu.form_code`**·`screenFormCodeMap.mjs`·새 `std_*` 시 `DATABASE.md` 동시 갱신. **`ai-rules.md`**·**`.cursor/rules/std-be-byscreen.mdc`** 교차 참조.
- **본 파일**·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `project-rules.md`, `ai-rules.md`, `.cursor/rules/std-be-byscreen.mdc`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (BE — `screen_id` ↔ `tb_mes_menu.form_code` 레거시 매핑)
### 작업 내용
- **[`server/src/lib/screenFormCodeMap.mjs`](server/src/lib/screenFormCodeMap.mjs)** 신설: 기준정보 14화면 웹 ID → 레거시 `frm*` (`docs/DATABASE.md` 표와 동일). **`POST /api/menu-access`** 는 `unnest` 후보로 메뉴 행을 찾고, **`tb_mes_menu_authority`** 비교는 조회된 행의 실제 `form_code` 사용.
- **문서**: [`docs/DATABASE.md`](docs/DATABASE.md), [`docs/db-doc/std_base_user_log_inq_api.md`](docs/db-doc/std_base_user_log_inq_api.md), 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `server/src/lib/screenFormCodeMap.mjs`, `server/src/lib/queries/std_userAccessLog.mjs`, `docs/DATABASE.md`, `docs/db-doc/std_base_user_log_inq_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (렌더러 — Electron 모듈 창 세션 공유)
### 작업 내용
- **[`MesAuthContext.tsx`](renderer/src/context/MesAuthContext.tsx)**: Electron 렌더러에서 로그인 세션을 **`sessionStorage` 대신 `localStorage`**에 저장(`mes_session_v1`). 모듈 `BrowserWindow`는 창마다 `sessionStorage`가 분리되어 메인 스플래시에서 로그인해도 모듈 창에서 `session`이 비어 `postMenuAccess`·「접근 권한 확인 중」이 누락되던 문제 완화. 기존 메인 창 `sessionStorage`만 있을 때는 한 번 `localStorage`로 이전.
- **본 파일**·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `renderer/src/context/MesAuthContext.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (렌더러·BE — 메뉴 진입 권한 검사·접속 로그)
### 작업 내용
- **POST `/api/menu-access`** ([`server/src/lib/queries/std_userAccessLog.mjs`](server/src/lib/queries/std_userAccessLog.mjs)): `user_id`·`screen_id`로 `tb_mes_menu`·`tb_mes_menu_authority`·`tb_mes_user_authority` 기준 접근 허용 여부 판단(레거시 `lFucMenuAccessAuth` 정렬). `DEVELOPER`는 검사·로그 생략. **`MES_USER_LOG_COLUMN_MODE=legacy`** 일 때 `tb_mes_menuaccesslogs` INSERT(IP는 `clientIp`·`MES_USER_LOG_COL_IP`). Express **`trust proxy`** ([`server/src/index.mjs`](server/src/index.mjs), `TRUST_PROXY_HOPS`).
- **렌더러**: [`ScreenPlaceholderPage.tsx`](renderer/src/pages/ScreenPlaceholderPage.tsx) `ScreenContentByScreenId` — 로그인·비 DEVELOPER 시 진입 전 `postMenuAccess` 호출, 거부 시 [`MesScreenAccessDeniedModal`](renderer/src/components/MesScreenAccessDeniedModal.tsx). 미로그인은 기존처럼 레지스트리만 검사.
- **클라이언트**: [`userAccessLogApi.ts`](renderer/src/lib/userAccessLogApi.ts) `postMenuAccess`.
- **문서**: [`docs/db-doc/std_base_user_log_inq_api.md`](docs/db-doc/std_base_user_log_inq_api.md), 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `server/src/lib/queries/std_userAccessLog.mjs`, `server/src/index.mjs`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `renderer/src/lib/userAccessLogApi.ts`, `docs/db-doc/std_base_user_log_inq_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (렌더러 — 스플래시 로그인 모달 겹침)
### 작업 내용
- **[`SplashScreen.tsx`](renderer/src/components/SplashScreen.tsx)**: 사용자 전환 시 `resetSplashModalsAndForms()`로 로그인·비밀번호 변경 모달 및 입력 state 초기화 후 `logout()`. 좌측 **로그인** / **비밀번호 변경** 클릭 시 상호 배타(`setPwdOpen` / `setLoginOpen`). 미로그인 모듈 타일 → 로그인 유도 시 `pwdOpen` 닫기.
- **렌더 가드**: `loginOpen`일 때는 비밀번호 변경 전체 화면 오버레이를 **마운트하지 않음**(`pwdOpen && session && !loginOpen`). 로그인 성공 시 `setPwdOpen(false)`로 플래그 정리 — 동일 `z-[90]`에서 비밀번호 패널이 위에 쌓여 로그인 입력 클릭이 막히던 현상 방지.
- **추가**: 로그인 오버레이 `z-[95]`(비밀번호 `z-[90]`보다 위), 패널에 `pointer-events-auto`. 디버그 ingest 계측 제거.
- **포털**: 로그인·비밀번호 변경 모달을 `createPortal(..., document.body)`로 렌더 — `#root`·부모 `overflow`/스택킹 때문에 `fixed` 레이어가 클릭을 못 받는 환경 완화.

### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (렌더러·BE — 레거시 메인 스플래시 반영)
### 작업 내용
- **로그인 비밀번호 검증** ([`server/src/lib/passwordVerify.mjs`](server/src/lib/passwordVerify.mjs)): `user_pwd`가 bcrypt(`$2…`)일 때만 `bcrypt.compare`; 그 외는 **trim 후 평문 동등** 비교. **`pass` 컬럼** 폴백(레거시 `frmChangePW` 등). Oracle `PKG_MES.pwd_encrypt`만 있는 값은 Node에서 검증 불가 → 사용자 관리에서 비밀번호 재설정.
- **디버그**: 로그인 이슈 조사용 임시 계측(`MesAuthContext` ingest fetch, `authAndSplash` 파일 로그) 제거.
- **BE** ([`server/src/lib/queries/authAndSplash.mjs`](server/src/lib/queries/authAndSplash.mjs)): `POST /api/auth/login`, `POST /api/auth/change-password`, `GET /api/tb-cm-messages`, `GET /api/tb-cm-vendor-brand` — [`server/src/index.mjs`](server/src/index.mjs) 마운트.
- **렌더러**: [`MesAuthContext`](renderer/src/context/MesAuthContext.tsx), [`App.tsx`](renderer/src/App.tsx) Provider, [`SplashScreen.tsx`](renderer/src/components/SplashScreen.tsx) — 좌측 로그인·비밀번호 변경·사용자 전환, 미로그인 시 모듈 타일 차단, 공지 10분 폴링, `Ver-`는 `VITE_MES_APP_VERSION`/`package.json`, 회사명은 `VITE_MES_COMPANY_TITLE` 또는 벤더 API.
- **Vite** ([`renderer/vite.config.ts`](renderer/vite.config.ts)): `import.meta.env.VITE_MES_APP_VERSION` 주입.
- **Electron** ([`electron/main.cjs`](electron/main.cjs), [`preload.cjs`](electron/preload.cjs)): 종료 확인 대화상자, `mes:close-all-module-windows`, 트레이(저장소 `docs/legacy_mes/Main/app.ico` 존재 시).
- **스모크**: [`scripts/smoke-std-be.mjs`](scripts/smoke-std-be.mjs) — `/api/tb-cm-messages`, `/api/tb-cm-vendor-brand`.
- **문서**: [`docs/DATABASE.md`](docs/DATABASE.md) `tb_cm_message` 절, 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `server/src/lib/queries/authAndSplash.mjs`, `server/src/lib/queries/std_tbCmUser.mjs`, `server/src/index.mjs`, `renderer/src/context/MesAuthContext.tsx`, `renderer/src/lib/splashApi.ts`, `renderer/src/components/SplashScreen.tsx`, `renderer/src/App.tsx`, `renderer/src/mes-env.d.ts`, `renderer/src/vite-env.d.ts`, `renderer/vite.config.ts`, `electron/main.cjs`, `electron/preload.cjs`, `scripts/smoke-std-be.mjs`, `docs/DATABASE.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (렌더러 — 마스터–상세 성능 패턴·룰)
### 작업 내용
- **`std_base_user_mgmt.tsx`**: `usersRef`로 `onSelectRow` 의존성 축소(`[snapshotDetail]`만). 정렬 후에도 `user_id`로 `users` 행을 찾도록 정리(표시 인덱스≠원본 인덱스). `MesDataGridPanel`에 `virtualizeRows`.
- **`std_base_vendor_mgmt.tsx`**: `searchResultRef`로 `onSelectRow` 안정화, `virtualizeRows`.
- **규칙**: `.cursor/rules/mes-master-detail-performance.mdc` 신규, `project-rules.md` §0 항목 6 교차 참조.

### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`, `renderer/src/screens/std/std_base_vendor_mgmt.tsx`, `.cursor/rules/mes-master-detail-performance.mdc`, `project-rules.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (기준정보 기준설정 — `std_cfg_*` 4화면 API·문서·레거시 메시지 정합)
### 작업 내용
- **인벤토리**: `renderer/src/data/manual.csv`와 `docs/매뉴얼.csv` 기준설정 4행 동일 확인. `docs/image/std_cfg_*.png` 4종은 현재 저장소에 없음(§6.0 PNG 캡처 절차로 로컬 추가 권장).
- **API**: [`renderer/src/lib/cfgMesApi.ts`](renderer/src/lib/cfgMesApi.ts) — `POST /api/cfg/route-row`, `/api/cfg/tact-time-row`, `/api/cfg/packing-unit` 클라이언트. [`renderer/src/lib/cfgMesScreenMaps.ts`](renderer/src/lib/cfgMesScreenMaps.ts) — 그리드 문자열 매핑.
- **화면**: [`std_cfg_router_mgmt.tsx`](renderer/src/screens/std/std_cfg_router_mgmt.tsx), [`std_cfg_prod_router_mgmt.tsx`](renderer/src/screens/std/std_cfg_prod_router_mgmt.tsx), [`std_cfg_tact_time_mgmt.tsx`](renderer/src/screens/std/std_cfg_tact_time_mgmt.tsx), [`std_cfg_packing_unit_mgmt.tsx`](renderer/src/screens/std/std_cfg_packing_unit_mgmt.tsx) — `stdPngSampleData` 대신 `GET/POST` 연동, `MesSearchSaveBar`, 레거시 `frm*`와 유사 배너·확인(생산 라우터 저장 전 `confirm`).
- **기타**: [`std_base_vendor_mgmt.tsx`](renderer/src/screens/std/std_base_vendor_mgmt.tsx) — `tsc` 빌드 통과용 최소 수정(readonly `columns`·미사용 인자).
- **문서**: [`docs/db-doc/std_cfg_router_mgmt_api.md`](docs/db-doc/std_cfg_router_mgmt_api.md) 등 기준설정 4건 전면 갱신, 본 파일·[`docs/USER_PROMPTS_LOG.md`](docs/USER_PROMPTS_LOG.md).

### 변경된 파일
- `renderer/src/lib/cfgMesApi.ts`, `renderer/src/lib/cfgMesScreenMaps.ts`, `renderer/src/screens/std/std_cfg_router_mgmt.tsx`, `renderer/src/screens/std/std_cfg_prod_router_mgmt.tsx`, `renderer/src/screens/std/std_cfg_tact_time_mgmt.tsx`, `renderer/src/screens/std/std_cfg_packing_unit_mgmt.tsx`, `renderer/src/screens/std/std_base_vendor_mgmt.tsx`, `docs/db-doc/std_cfg_router_mgmt_api.md`, `docs/db-doc/std_cfg_prod_router_mgmt_api.md`, `docs/db-doc/std_cfg_tact_time_mgmt_api.md`, `docs/db-doc/std_cfg_packing_unit_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (문서 — 페이지 생성 규칙 `legacy_mes` 정합)
### 작업 내용
- **`project-rules.md` §6.0.3**: `docs/legacy_mes` 참조·UI·DB·CRUD·메시지 정합 절차(PNG·`DATABASE.md`·BE 우선순위, `MessageBox` 취지 반영).
- **`docs/legacy_mes/README.md`**: 화면 작업 시 `DATABASE.md` 표 → `frm*.cs` / `frm*.resx` · §6.0.3 링크.
- **`ai-rules.md`**, **`.cursorrules`**, **`docs/DOCUMENTATION_INDEX.md`**: §6.0.3·`legacy_mes` 교차 참조.

### 변경된 파일
- `project-rules.md`, `docs/legacy_mes/README.md`, `ai-rules.md`, `.cursorrules`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`

---

## 2026-04-07 (기준정보 — `std_base_unit_process_mgmt` 저장)
### 작업 내용
- **`renderer/src/lib/unitProcessMgmtApi.ts`**: 그리드 행 → `POST /api/tb-cm-code` (`code_group=UNIT_PROCESS`) 매핑·검증·`saveUnitProcessGridRows`.
- **`renderer/src/screens/std/std_base_unit_process_mgmt.tsx`**: 조회줄·툴바 Save, `runSave` 후 `GET /api/fn-unit-process` 재조회. 그리드 열 2·3·4·6·7 `PlainInput` 편집, 열 1(단위 공정코드) 읽기 전용.
- **문서**: `docs/db-doc/std_base_unit_process_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`.

### 변경된 파일
- `renderer/src/lib/unitProcessMgmtApi.ts`, `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/db-doc/std_base_unit_process_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (기준정보 — `std_base_process_line_mgmt`·`byScreen` 1:1)
### 작업 내용
- **`server/src/lib/queries/std_lineCodeMes.mjs`**: `GET /api/line-codes`가 `attribute01`~`attribute04`·`process_code`(공정)를 반환하고, 공정 필터는 `attribute01` 또는 `attribute02` 일치(이관 호환). **`POST /api/line-codes`**가 레거시 `frmProcessLineMng`와 같이 전체 속성 저장.
- **`server/src/routes/byScreen/std_base_process_line_mgmt.mjs`**: `createLineCodeMesRouter()` 전용 — `/api/line-codes` 는 이 파일에서만 `app.use`. **`std_base_process_line_config_mgmt.mjs`** 에서 `lineCodeMes` 제거.
- **`server/src/index.mjs`**: `createStdBaseProcessLineMgmtRouter()` 등록.
- **`renderer/src/lib/lineMasterApi.ts`**, **`renderer/src/screens/std/std_base_process_line_mgmt.tsx`**, **`registry.ts`**: LINE 마스터 화면.
- **규칙**: **`project-rules.md`** §4.2, **`.cursor/rules/std-be-byscreen.mdc`**, `server/src/routes/byScreen/README.md`.
- **문서**: `docs/db-doc/std_*_process_line*_api.md`, `docs/DATABASE.md`, `docs/DOCUMENTATION_INDEX.md` 등.

### 변경된 파일
- `server/src/lib/queries/std_lineCodeMes.mjs`, `server/src/routes/byScreen/std_base_process_line_mgmt.mjs`, `server/src/routes/byScreen/std_base_process_line_config_mgmt.mjs`, `server/src/index.mjs`, `project-rules.md`, `.cursor/rules/std-be-byscreen.mdc`, `server/README.md`, `server/src/routes/byScreen/README.md`, `renderer/src/lib/lineMasterApi.ts`, `renderer/src/screens/std/std_base_process_line_mgmt.tsx`, `renderer/src/screens/std/registry.ts`, `docs/db-doc/std_base_process_line_mgmt_api.md`, `docs/db-doc/std_base_process_line_config_mgmt_api.md`, `docs/DATABASE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-08 (STD BE — `std_base_unit_process_mgmt` / `GET /api/fn-unit-process` C# 정합)
### 작업 내용
- **`server/src/lib/queries/std_fnMesStd.mjs`**: 단위 공정 조회를 **`tb_mes_unit_process`** 가 아니라 **`tb_cm_code`** `code_group = 'UNIT_PROCESS'` 로 변경(레거시 `frmUnitProcessMng.cs` `lPrcRetrieveProcessInfoData`). 공정 필터 **`attribute01 LIKE p1%`**, 정렬 **`attribute01`·`disp_seq`·`code`**. 응답 JSON 키는 기존(`code`·`tact_time`·`remark` 등) 유지.
- **문서**: `docs/DATABASE.md`(이미 반영)·`docs/db-doc/std_base_unit_process_mgmt_api.md` §5.2.1, `scripts/smoke-std-be.mjs`에 해당 API 스모크 추가.

### 변경된 파일
- `server/src/lib/queries/std_fnMesStd.mjs`, `scripts/smoke-std-be.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (STD BE — 사용자 LOG API: `tb_mes_menuaccesslogs` 소문자·snake_case)
### 작업 내용
- **`server/src/lib/queries/std_userAccessLog.mjs`**: `legacy` 기본 테이블 **`tb_mes_menuaccesslogs`**, 컬럼 **`accessed_date`·`accessed_time`·`menu_name`** 등 PostgreSQL 관례(Oracle `TB_MES_MenuAccessLogs` 이식본 전제). **`MES_USER_LOG_COLUMN_MODE=snake`** 는 기존처럼 `tb_mes_user_access_log` 등.
- **문서**: `docs/DATABASE.md`, `docs/db-doc/std_base_user_log_inq_api.md`, `server/README.md`, `server/.env.example`.

### 변경된 파일
- `server/src/lib/queries/std_userAccessLog.mjs`, `docs/DATABASE.md`, `docs/db-doc/std_base_user_log_inq_api.md`, `server/README.md`, `server/.env.example`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (STD BE — 사용자 LOG API 기본 테이블을 `TB_MES_MenuAccessLogs`로)
### 작업 내용
- (이전 단계) 이후 **`tb_mes_menuaccesslogs`** 로 정리됨 — 아래 항목은 역사 기록.
- **`server/src/lib/queries/std_userAccessLog.mjs`**: 기본을 C# `frmMenuAccessLogs`와 동일 — **`TB_MES_MenuAccessLogs`**, 컬럼 `ACCESSED_DATE`·`Accessed_Time`·`MENU_NAME` 등(PG `"..."` 인용). 기존 snake_case 전용은 **`MES_USER_LOG_COLUMN_MODE=snake`**.
- **문서**: `docs/DATABASE.md`, `docs/db-doc/std_base_user_log_inq_api.md`, `server/README.md`, `server/.env.example`.

### 변경된 파일
- `server/src/lib/queries/std_userAccessLog.mjs`, `docs/DATABASE.md`, `docs/db-doc/std_base_user_log_inq_api.md`, `server/README.md`, `server/.env.example`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (문서 — `legacy_mes` 기준정보 소스 → `Basis/` 이동)
### 작업 내용
- **`docs/legacy_mes`**: 기존 루트에 있던 기준정보 모듈 C#·프로젝트·리소스 전체를 **`Basis/`** 하위로 이동. 이후 다른 MES 모듈 레거시는 동일 `legacy_mes` 아래 동급 폴더로 추가 가능.
- **링크 갱신**: `legacy_mes/_2S_MES_Basis/...` → `legacy_mes/Basis/_2S_MES_Basis/...` (`docs/DATABASE.md`, `docs/db-doc/std_*_api.md` 다수, `server/src/lib/queries/std_userAccessLog.mjs` 주석).
- **`docs/legacy_mes/README.md`**: 디렉터리 역할·모듈별 폴더 규칙 안내.

### 변경된 파일
- `docs/legacy_mes/**`(경로 이동), `docs/DATABASE.md`, `docs/db-doc/std_*_api.md`(다수), `server/src/lib/queries/std_userAccessLog.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (문서 — 기준정보 레거시 C# 대비 DB·API 정합)
### 작업 내용
- **`docs/DATABASE.md`**: 사용자 LOG 레거시(`frmMenuAccessLogs`·`TB_MES_MenuAccessLogs`)·cfg MDI 폼명·**기준정보 14화면 ↔ 레거시 frm ↔ db-doc** 표.
- **`docs/db-doc`**: 기존 8건 — STD BE **`/api/*`**·`userMgmtBeUrl` 기준으로 경로 정리, 레거시 `frm` 링크. **신규 6건** — `std_base_process_line_mgmt`·`std_base_process_line_config_mgmt`·`std_cfg_*` (4).
- **`server/src/lib/queries/std_userAccessLog.mjs`**: `MES_USER_LOG_DATE_MODE`·`ORDER_MODE`·`TIME_COLUMN` 지원(Oracle 메뉴 로그 테이블 이식 시).
- **`server/.env.example`**: 사용자 LOG env 예시.
- **`docs/DOCUMENTATION_INDEX.md`**: db-doc 링크 추가.

### 변경된 파일
- `docs/DATABASE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/db-doc/std_*_api.md`(다수), `server/src/lib/queries/std_userAccessLog.mjs`, `server/.env.example`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (문서 — `MesSearchSaveBar`·`filterLeading` 룰 반영)
### 작업 내용
- **`docs/LAYOUT_RULES.md`**: 「조회 Search/Save 표준 스트립」— `leading` **`flex-1`**·**`pr-[10px]`**·필터 영역 `leading` 유무에 따른 클래스, 긴 경고 배너(`break-words`, `truncate` 고정폭 비권장) 명시.
- **`project-rules.md` §6.1** · **`.cursorrules`** · **`ai-rules.md`**: 동일 내용 요약·표 링크.
- **`docs/DOCUMENTATION_INDEX.md`**: `LAYOUT_RULES` 한 줄에 `filterLeading` 언급.

### 변경된 파일
- `docs/LAYOUT_RULES.md`, `project-rules.md`, `.cursorrules`, `ai-rules.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 (STD BE — `user_pwd` bcrypt·varchar(50) 22001 검증)
### 작업 내용
- **`server/src/lib/queries/std_tbCmUser.mjs`**: `user_pwd` 컬럼 메타를 `information_schema` + **`pg_catalog.format_type`** 으로 조회해 `TEXT` / `varchar(n)` 를 구분하고, bcrypt 해시 길이가 넘치면 **PostgreSQL 전 400** 유지. 예전 `getUserPwdMaxLen` 이 실패 시 **`null` 을 캐시해 이후 요청에서 길이 검증이 영구 스킵**될 수 있던 점을, 메타 조회 **실패 시 캐시하지 않음**으로 완화.

---

## 2026-04-11 (STD BE — lib/queries 구현 + byScreen 1:1 진입)
### 작업 내용
- **`server/src/lib/queries/*.mjs`**: 기존 `routes/*.mjs`의 HTTP·SQL 구현을 이전(`tbCmUser`·`cfgMes`·`mesAuthority`·`processLineMes` 등). `fnMesStd.mjs`는 `createFnUnitProcessOnlyRouter` / `createFnUnitProcessLineOnlyRouter` 분리.
- **`server/src/routes/byScreen/std_<screenId>.mjs`**: 화면 ID별 팩토리(13개). cfg 3화면·메뉴권한은 canonical/re-export.
- **`server/src/index.mjs`**: byScreen만 `app.use`. 기존 `routes/users.mjs` 등 도메인 파일 **삭제**.
- **문서**: `docs/DATABASE.md`, `server/README.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/db-doc/std_base_user_log_inq_api.md`, `lib/queries/README.md`, `routes/byScreen/README.md`.

### 변경된 파일
- `server/src/lib/queries/*`, `server/src/routes/byScreen/*`, `server/src/index.mjs`, `docs/*`, `server/README.md` — 삭제: `server/src/routes/users.mjs`, `tbCmCode.mjs`, … (도메인 라우트 11개)

---

## 2026-04-11 (STD BE — byScreen 래퍼 제거·도메인 라우트만 유지)
### 작업 내용
- **`server/src/routes/byScreen/`** 삭제(얇은 래퍼만 있던 `std_*.mjs` 13개·README). 실제 SQL·핸들러는 기존 도메인 `routes/*.mjs`에 유지.
- **`server/src/index.mjs`**: `createUsersRouter` 등 도메인 팩토리만 `app.use` 하도록 복원.
- **문서**: `docs/DATABASE.md`·`server/README.md`·`docs/DOCUMENTATION_INDEX.md`·`server/src/lib/queries/README.md` 에서 byScreen 언급 제거·매핑 표 갱신.

### 변경된 파일
- `server/src/index.mjs`, `docs/DATABASE.md`, `server/README.md`, `docs/DOCUMENTATION_INDEX.md`, `server/src/lib/queries/README.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md` — 삭제: `server/src/routes/byScreen/*`

---

## 2026-04-11 (STD BE — 화면별 byScreen 라우트 1:1·스모크·공통쿼리 자리)
### 작업 내용
- **`server/src/routes/byScreen/std_<screenId>.mjs`**: 기준정보 13개 화면 팩토리(도메인 모듈 합성). **`server/src/index.mjs`** 는 byScreen만 `app.use`.
- **문서**: `docs/DATABASE.md`·`server/README.md` 매핑표, `docs/SMOKE_STD_BE.md`, `docs/DOCUMENTATION_INDEX.md`, `server/src/routes/byScreen/README.md`, `server/src/lib/queries/README.md`(Phase 3 안내).
- **스모크**: `scripts/smoke-std-be.mjs`, 루트 `npm run smoke:be`.

### 변경된 파일
- `server/src/routes/byScreen/*.mjs`, `server/src/index.mjs`, `docs/DATABASE.md`, `server/README.md`, `docs/SMOKE_STD_BE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`, `package.json`, `scripts/smoke-std-be.mjs`, `server/src/lib/queries/README.md`

---

## 2026-04-11 (STD 전용 BE — 미완 화면 대비 레거시 DB 라우트)
### 작업 내용
- **`server/src/routes/processLineMes.mjs`**: `GET /api/process-line/unit-process-line-join`, `by-process-line`, `POST /api/process-line/save-for-line` — `frmProcessLineMng` 정합.
- **`server/src/routes/lineCodeMes.mjs`**, **`unitProcessLineCodeMes.mjs`**: `tb_cm_code` `LINE` / `UNIT_PROCESS_LINE` — `GET`·`POST`·`DELETE` `/api/line-codes`, `/api/unit-process-line-codes`.
- **`server/src/routes/cfgMesMutations.mjs`**: 포장·택트·라우트·모델매핑 단일 행 저장 — `POST /api/cfg/packing-unit` 등 4종.
- **`server/src/index.mjs`**: 위 라우터 등록.
- **문서**: `docs/DATABASE.md`, `server/README.md`.

### 변경된 파일
- `server/src/routes/processLineMes.mjs`, `lineCodeMes.mjs`, `unitProcessLineCodeMes.mjs`, `cfgMesMutations.mjs`, `server/src/index.mjs`, `docs/DATABASE.md`, `server/README.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 18:00 KST (STD 전용 BE — 사용자 LOG 조회·화면 연동)
### 작업 내용
- **`server/src/routes/userLog.mjs`**: `GET /api/user-access-logs` — `tb_mes_user_access_log`(기본)·`MES_USER_LOG_TABLE`·`tb_cm_user` 조인.
- **`renderer/src/lib/userAccessLogApi.ts`**, **`std_base_user_log_inq.tsx`**: 조회일·사용자 ID 필터 + Search → 그리드. `STD_USER_LOG_ROWS` 샘플 제거.
- **문서**: `docs/db-doc/std_base_user_log_inq_api.md`, `docs/DATABASE.md`, `DOCUMENTATION_INDEX`, `server/README.md`, `userMgmtBeBaseUrl.ts` 주석, `server/.env.example`.

### 변경된 파일
- `server/src/routes/userLog.mjs`, `server/src/index.mjs`, `renderer/src/lib/userAccessLogApi.ts`, `renderer/src/lib/userMgmtBeBaseUrl.ts`, `renderer/src/screens/std/std_base_user_log_inq.tsx`, `renderer/src/screens/std/stdPngSampleData.ts`, `docs/db-doc/std_base_user_log_inq_api.md`, `docs/DATABASE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CONTEXT.md`, `server/README.md`, `server/.env.example`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 16:00 KST (STD 전용 BE — 기준설정 cfg 조회 API)
### 작업 내용
- **`server/src/routes/cfgMes.mjs`**: `model-master`, `routes`, `unit-processes`, `tact-times`, `packing-units`, `model-mapping` **GET** — 레거시 `frmRouteMng`·`frmTactTimeManagement`·`frmPackingUnitMng`·`frmModelRevisionMapping` 정합.
- **`renderer/src/lib/cfgMesApi.ts`**: 클라이언트 래퍼.
- **`server/src/index.mjs`**: `createCfgMesRouter()` 등록.
- **문서**: `docs/DATABASE.md`, `docs/DOCUMENTATION_INDEX.md`, `server/README.md`, `docs/CONTEXT.md`.

### 변경된 파일
- `server/src/routes/cfgMes.mjs`, `server/src/index.mjs`, `renderer/src/lib/cfgMesApi.ts`, `renderer/src/screens/std/std_cfg_router_mgmt.tsx`, `std_cfg_prod_router_mgmt.tsx`, `std_cfg_tact_time_mgmt.tsx`, `std_cfg_packing_unit_mgmt.tsx`, `docs/DATABASE.md`, `docs/DOCUMENTATION_INDEX.md`, `server/README.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 14:00 KST (STD 전용 BE — 사용자·메뉴 권한 API `/api` 연동)
### 작업 내용
- **`server/src/routes/mesAuthority.mjs`**: `fn_user_authority_*`, `fn_cm_user_dept`, `fn_mes_menu_user_class`, `tb_mes_user_authority`, `tb_mes_menu_authority`를 PostgreSQL로 구현.
- **`server/src/index.mjs`**: `createMesAuthorityRouter()` 등록.
- **렌더러**: `userAuthorityApi.ts`, `menuAuthorityApi.ts`를 **`userMgmtBeUrl`** 기준 **`/api/...`** 로 전환. 권한 화면 TSX 파일 헤더 주석 정합.
- **문서**: `docs/DATABASE.md`, `server/README.md`, `docs/CONTEXT.md`.

### 변경된 파일
- `server/src/routes/mesAuthority.mjs`, `server/src/index.mjs`, `renderer/src/lib/userAuthorityApi.ts`, `renderer/src/lib/menuAuthorityApi.ts`, `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`, `std_base_menu_permission_mgmt.tsx`, `docs/DATABASE.md`, `server/README.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-11 12:00 KST (STD 전용 BE — 거래처·단위공정 라우트 등록·렌더러 연동)
### 작업 내용
- **`server/src/index.mjs`**: `createTbCmCustomerRouter`·`createFnMesStdRouter` 등록(기존 파일 연결).
- **렌더러**: `tbCmCustomerApi`·`fnUnitProcessApi`·`fnUnitProcessLineApi`를 **`userMgmtBeUrl`** 기준 **`/api/tb-cm-customer`**, **`/api/fn-unit-process`**, **`/api/fn-unit-process-line`** 로 호출하도록 전환.
- **문서**: `docs/DATABASE.md`(거래처·fn API), `server/README.md` 엔드포인트 요약, 기준정보 화면 파일 헤더 주석 정합.

### 변경된 파일
- `server/src/index.mjs`, `renderer/src/lib/tbCmCustomerApi.ts`, `renderer/src/lib/fnUnitProcessApi.ts`, `renderer/src/lib/fnUnitProcessLineApi.ts`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `std_base_vendor_mgmt.tsx`, `std_base_unit_process_mgmt.tsx`, `std_base_unit_process_line_mgmt.tsx`, `docs/DATABASE.md`, `server/README.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (규칙·문서 — `tb_cm_user` DB 정합 §4.1·DATABASE.md)
### 작업 내용
- **`project-rules.md` §4.1** 신설: 사용자 관리 BE·**`tb_cm_user`** (`user_pwd`/bcrypt·upsert·`beginning_employment_date`).
- **`docs/DATABASE.md`** 신설, **`docs/DOCUMENTATION_INDEX.md`**·**`docs/CONTEXT.md`**·**`ai-rules.md`**·**`.cursorrules`** 에 링크.
- **§1 브리핑**: `tb_cm_user`·`server/` 작업 시 §4.1·DATABASE·db-doc 확인(선택 단계).

### 변경된 파일
- `project-rules.md`, `ai-rules.md`, `.cursorrules`, `docs/DATABASE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (mes-user-mgmt-server — 22001 사전 차단 `information_schema`)
### 작업 내용
- **`getUserPwdMaxLen()`**: `information_schema.columns` 로 **`user_pwd` 최대 길이** 캐시 — bcrypt 해시 길이가 넘치면 **INSERT/UPDATE 전** **400** + `ALTER TABLE … VARCHAR(72)` 안내(스키마 수정 없이는 저장 불가). 스키마 변경 후에는 **BE 재시작** 권장(캐시 무효화).

### 변경된 파일
- `server/src/index.mjs`, `server/README.md`, `docs/db-doc/std_base_user_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (mes-user-mgmt-server — 22001 `user_pwd`·bcrypt 길이)
### 작업 내용
- PostgreSQL **22001**(`character varying(50) … 너무 긴 자료`): **bcrypt `user_pwd`**(약 60자)가 **varchar(50)** 컬럼에 안 들어가 발생하는 경우 — **`friendlyPgError`** 에 `ALTER TABLE … user_pwd VARCHAR(72)`·**TEXT** 안내. **`server/README.md`**·**`std_base_user_mgmt_api.md`** 보강.

### 변경된 파일
- `server/src/index.mjs`, `server/README.md`, `docs/db-doc/std_base_user_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (mes-user-mgmt-server — `beginning_employment_date` varchar·date COALESCE 42804)
### 작업 내용
- **`POST /api/users`**: `beginning_employment_date` 가 **`character varying`** 인 DB에서 `COALESCE(varchar, date)` 가 **42804** 를 유발 — UPDATE는 **`CASE` + `to_char`**, INSERT는 **`to_char(COALESCE($8::date, CURRENT_DATE), 'YYYY-MM-DD')`** 로 통일.
- **`friendlyPgError`**: 42804·COALESCE/매치 관련 시 짧은 안내 문구.

### 변경된 파일
- `server/src/index.mjs`, `docs/db-doc/std_base_user_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (mes-user-mgmt-server — POST upsert, `ON CONFLICT` 제거)
### 작업 내용
- **`POST /api/users`**: 일부 DB에 `user_id` **UNIQUE/PK** 가 없어 `ON CONFLICT (user_id)` 가 실패(메시지에 `ON CON` 등)하는 경우 대비 — **`UPDATE … WHERE user_id` → 영향 행 없으면 `INSERT`** 로 동일 upsert 의미 구현.
- (후속) DEBUG 세션용 `debug-75458a.log`·`agentDebugNdjson` 계측 제거.

### 변경된 파일
- `server/src/index.mjs`, `docs/db-doc/std_base_user_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (mes-config — 사용자 관리 BE URL `http://` 정합)
### 작업 내용
- **`USER_MGMT_API_BASE`**: Node BE는 **HTTP**만 제공하는데 `https://`로 지정되어 Vite **`/api` 프록시**가 TLS로 붙으려다 조회 실패할 수 있어 **`http://100.71.84.10:8787`** 로 수정. `mes-config.example.ini`·**`SETUP.md`** 에 스킴 안내 추가.

### 변경된 파일
- `mes-config.ini`, `electron/mes-config.example.ini`, `docs/SETUP.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (mes-config.ini — 사용자 관리 BE 원격 URL 명시)
### 작업 내용
- 저장소 루트 **`mes-config.ini`**: **`USER_MGMT_API_BASE`**, **`USER_MGMT_API_PORT=8787`** 추가 — Vite **`/api` 프록시**·Electron **`mes:get-user-mgmt-api-base`** 가 `localhost:8787` 대신 원격 BE를 사용.

### 변경된 파일
- `mes-config.ini`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-10 (사용자 관리 BE URL — mes-config.ini·UI_URL 연동)
### 작업 내용
- **`mes-config.ini`**: `USER_MGMT_API_BASE` 미설정 시 **`UI_URL` 호스트 + `USER_MGMT_API_PORT`(기본 8787)** 로 사용자 관리 BE 베이스 결정.
- **Electron**: IPC **`mes:get-user-mgmt-api-base`**, `preload`·`main.tsx` 부트스트랩으로 `window.__MES_USER_MGMT_API_BASE__` 주입; TLS 예외는 파생 URL 호스트 포함.
- **Vite dev**: 동일 INI(또는 `MES_USER_MGMT_PROXY_TARGET`)로 **`/api` 프록시** `target` 설정, HTTPS 대상은 `secure: false`.

### 변경 파일
- `electron/main.cjs`, `electron/preload.cjs`, `electron/mes-config.example.ini`
- `renderer/src/main.tsx`, `renderer/src/lib/userMgmtBeBaseUrl.ts`, `renderer/src/mes-env.d.ts`, `renderer/vite.config.ts`
- `docs/db-doc/std_base_user_mgmt_api.md`, `docs/CONTEXT.md`, `docs/SETUP.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (Vite `/api` 프록시 ECONNREFUSED — 진단 계측·dev BE 동시 기동)
### 작업 내용
- **원인**: `mes-config.ini` 없을 때 Vite `/api` → `localhost:8787` 인데, **`npm run dev`가 사용자 관리 BE를 띄우지 않아** `ECONNREFUSED`.
- **`scripts/dev.mjs`**: Vite 신규 기동 시(개발 포트 미사용) **`mes-user-mgmt-server`** 를 함께 띄우고 `wait-on`으로 **`PORT`(기본 8787)** 리슨 대기. 건너뛰기: **`MES_DEV_SKIP_USER_MGMT_BE=1`**. 종료 시 BE 프로세스도 정리. (경고 문구의 백틱·문자열 이어붙이기 구문 오류 수정.)
- **`vite.config.ts`**: (이후) ECONNREFUSED 디버그용 **`debug-75458a.log` append·ingest fetch** 계측 제거, `resolveUserMgmtProxyTarget` 를 기존 간결 형태로 복원.

### 변경된 파일
- `scripts/dev.mjs`, `renderer/vite.config.ts`, `docs/SETUP.md`, `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

---

## 2026-04-09 (mes-user-mgmt-server — DB 연결 안내·SSL)
### 작업 내용
- 기동 시 `SELECT 1`·`friendlyPgError`로 `ECONNREFUSED` 안내.
- **`PGSSLMODE`·`DATABASE_URL?sslmode=`** 를 `pg` Pool에 반영(원격 `ECONNRESET` 대응). `ECONNRESET`·**`does not support SSL`**·**`pg_hba.conf` 거부** 안내·README·`.env.example` 보강.

### 변경 파일
- `server/src/index.mjs`, `server/.env.example`, `server/README.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_line_mgmt — 공정 열 process)
### 작업 내용
- 그리드 **공정** 열 우선 키를 `process`로 변경(`attribute04`는 폴백). `db-doc`·화면 주석 반영.

### 변경 파일
- `renderer/src/lib/fnUnitProcessLineApi.ts`, `renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx`, `docs/db-doc/std_base_unit_process_line_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_line_mgmt — 그리드 필드 매핑)
### 작업 내용
- `fn_unit_process_line` 그리드 6열: 공정라인 `process_line`, 비고 `code_desc` 우선 매핑(기존 `line_code_name`·`attribute05`는 폴백). `db-doc`·화면 주석 반영.

### 변경 파일
- `renderer/src/lib/fnUnitProcessLineApi.ts`, `renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx`, `docs/db-doc/std_base_unit_process_line_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_vendor_mgmt — DB·HTTP 문서)
### 작업 내용
- `docs/db-doc/std_base_vendor_mgmt_api.md` 신설: `/db/tb_cm_customer` GET/POST/DELETE, `cust_name__like` 조회, 거래형태 클라이언트 필터, 그리드·상세 매핑.
- `docs/DOCUMENTATION_INDEX.md` 링크 추가. HTML 변환 `smkang_doc` `mes/` 반영.

### 변경 파일
- `docs/db-doc/std_base_vendor_mgmt_api.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_vendor_mgmt — 조회 쿼리)
### 작업 내용
- 거래처 조회줄 검색: `GET` `/db/tb_cm_customer`에 **`cust_name__like`만** 전달(`cust_code__like` 제거). 거래형태는 기존과 같이 응답 후 클라이언트 필터.

### 변경 파일
- `renderer/src/screens/std/std_base_vendor_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-07 (std_base_vendor_mgmt — tb_cm_customer 연동)
### 작업 내용
- `tbCmCustomerApi.ts` / `tbCmCustomerMapper.ts`: `GET`/`POST`/`DELETE` `/db/tb_cm_customer`, 그리드·`cust_type` 4자 매핑.
- `std_base_vendor_mgmt`: 조회(거래처 `cust_code`/`cust_name` like), 거래형태 클라이언트 필터, 툴바 신규·저장·삭제·인라인 배너.

### 변경 파일
- `renderer/src/lib/tbCmCustomerApi.ts`, `renderer/src/lib/tbCmCustomerMapper.ts`, `renderer/src/screens/std/std_base_vendor_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_line_mgmt — DB·HTTP 문서)
### 작업 내용
- `docs/db-doc/std_base_unit_process_line_mgmt_api.md` 신설: `fn_cm_code`(UNIT_PROCESS), `fn_unit_process_line`, 필드 매핑·조회 시점.
- `docs/DOCUMENTATION_INDEX.md` 링크 추가. HTML 변환 `smkang_doc` `mes/` 반영.

### 변경 파일
- `docs/db-doc/std_base_unit_process_line_mgmt_api.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (fn_unit_process_line — 그리드 필드 매핑)
### 작업 내용
- `rowToGridRow`: 6열을 `unit_process_name`, `code`, `code_name`, `attribute04`, `line_code_name`, `attribute05` 우선 매핑(기존 키는 후순위 폴백).

### 변경 파일
- `renderer/src/lib/fnUnitProcessLineApi.ts`, `renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (fn_unit_process / fn_unit_process_line — 그리드 빈 표시)
### 작업 내용
- **원인**: `MesDataGridPanel`이 데이터 열이 모두 빈 문자열인 행을 제거하는데, API JSON 키가 매핑과 어긋나면 행 전체가 빈 것으로 처리됨.
- `parseJsonArray`: 래핑 키(`list` 등)·객체 내 **첫 배열** 속성 추가.
- `rowToGridRow`: 컬럼별 키 후보 보강, 전부 빈 경우 `Object.values` 순서 폴백.
- **전체 조회**(`p1` 빈 값): `?p1=` 결과가 0건이면 **쿼리 없는** URL로 한 번 더 시도(`fnUnitProcessLineApi`, `fnUnitProcessApi`).

### 변경 파일
- `renderer/src/lib/fnUnitProcessLineApi.ts`, `renderer/src/lib/fnUnitProcessApi.ts`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_line_mgmt — DB URL)
### 작업 내용
- `fn_unit_process_line`: **항상** `?p1=` 쿼리(빈 값=전체, 예: `?p1=FCT`).
- 화면: 마운트 시 전체 1회 조회, 이후 **Search** 시에만 재조회(콤보 변경만으로는 미호출). 주석에 `tb_cm_code`·지정 URL 반영.

### 변경 파일
- `renderer/src/lib/fnUnitProcessLineApi.ts`, `renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_mgmt — DB·HTTP 문서)
### 작업 내용
- `docs/db-doc/std_base_unit_process_mgmt_api.md` 신설: `fn_cm_code`(PROCESS·ASSY_PACKING_UNIT), `fn_unit_process`, 그리드 매핑·주의점.
- `docs/DOCUMENTATION_INDEX.md` 링크 추가. HTML 변환 `smkang_doc` `mes/` 반영.

### 변경 파일
- `docs/db-doc/std_base_unit_process_mgmt_api.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_mgmt — 포장타입 빈 선택)
### 작업 내용
- **포장타입** 콤보: 값 없음 시 공정처럼 첫 옵션으로 채우지 않고 `value=""` + 빈 `<option>`으로 **빈 칸** 선택 표시.

### 변경 파일
- `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_mgmt — 포장타입 콤보 이전 수정 롤백)
### 작업 내용
- 포장타입 관련 **초기 폴백 상태**·**빈 셀 → 첫 옵션 `useEffect`** 제거(요지 오해로 인한 되돌림).

### 변경 파일
- `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_mgmt — 저장 버튼 롤백)
### 작업 내용
- `POST /func/fn_unit_process` 저장 연동·조회줄 Save·툴바 저장·저장 배너 제거 (`fnUnitProcessApi` 저장 API 삭제).

### 변경 파일
- `renderer/src/lib/fnUnitProcessApi.ts`, `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (MesDataGridPanel — 편집 시 재정렬 방지)
### 작업 내용
- **`preserveSortOrderUntilHeaderClick`**·**`sortDataEpoch`**: 헤더 클릭 전까지 정렬된 표시 순서 유지, **epoch** 변경 시 전체 재정렬.
- **`std_base_unit_process_mgmt`**: 조회(`loadGrid`) 성공 직후에만 **epoch** 증가(셀 공정 편집 경로는 제외).

### 변경 파일
- `renderer/src/components/MesDataGridPanel.tsx`, `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

---

## 2026-04-07 (fn_unit_process — 공정 열 attribute01·process_code_name)
### 작업 내용
- `fn_unit_process` 객체 응답이 `UNIT_PROCESS` 형태일 때 **공정** 열: `attribute01` 우선(PROCESS 콤보 코드 정합), 없으면 `process_code_name`. 단위 공정코드/명에 `code`/`CODE`, `code_name` 후보 보강.

### 변경 파일
- `renderer/src/lib/fnUnitProcessApi.ts`, `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-07 (std_base_unit_process_line_mgmt — fn_cm_code·fn_unit_process_line 연동)
### 작업 내용
- **단위공정** 콤보: `GET /func/fn_cm_code?p1=UNIT_PROCESS&p2=disp_seq`.
- **그리드**: `GET /func/fn_unit_process_line?p1=`(전체) / `p1=<단위공정코드>`(예: FCT). `fnUnitProcessLineApi.ts` 신설(6열 매핑).
- 조회(Search)·콤보 변경 시 재호출, 로딩·에러는 `filterLeading`. `showFilterSave={false}`.

### 변경 파일
- `renderer/src/lib/fnUnitProcessLineApi.ts`, `renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_line_mgmt — 조회줄·하단 폼)
### 작업 내용
- 하단 `MesGridRowDetailForm` 제거.
- 조회줄 **라인** 라벨·콤보 제거.
- **단위공정** 우측 입력을 `PlainInput` → `PlainSelect`(전체 + 샘플 그리드 `단위공정` 열 고유값)로 변경, 선택 시 그리드 클라이언트 필터.

### 변경 파일
- `renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_mgmt — fn_cm_code·fn_unit_process 연동)
### 작업 내용
- **공정** 콤보: `GET /func/fn_cm_code?p1=PROCESS&p2=disp_seq` (`fetchFnCmCodeOptions`).
- **그리드**: `GET /func/fn_unit_process?p1=`(전체) / `p1=<공정코드>` (`fetchFnUnitProcess`). 공정 변경·조회(Search) 시 재호출.
- 로딩·에러 메시지는 조회줄 `filterLeading`에 표시. 단위공정 콤보·텍스트는 로드된 행에 대한 클라이언트 필터 유지.

### 변경 파일
- `renderer/src/lib/fnUnitProcessApi.ts`, `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (std_base_unit_process_mgmt — 조회줄·그리드만)
### 작업 내용
- 하단 `MesGridRowDetailForm` 제거. 조회줄 **저장** 버튼 숨김(`showFilterSave={false}`).
- **단위공정**: 단위 공정코드 콤보(데이터 고유값+전체) + 코드·명 검색 `PlainInput`. 목업 그리드에 필터 반영.
- **단위공정** 라벨 문구 제거, 콤보·검색 입력 각 **너비 50%**(`w-1/2`).
- 단위공정 묶음: `flex-1` 대신 **`w-1/2 max-w-md`** 로 조회줄에서 차지 폭을 절반 수준으로 축소.

### 변경 파일
- `renderer/src/screens/std/std_base_unit_process_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-07 (USER_PROMPTS_LOG 규칙 강화)
### 작업 내용
- `USER_PROMPTS_LOG` 선행·후행 절차를 **Cursor alwaysApply 규칙**으로 고정(`.cursor/rules/user-prompts-log-workflow.mdc` 신설).
- `project-rules.md` §2·`.cursorrules` §4·`ai-rules.md`·`DOCUMENTATION_INDEX`에 상호 참조 보강.

### 변경 파일
- `.cursor/rules/user-prompts-log-workflow.mdc`, `project-rules.md`, `.cursorrules`, `ai-rules.md`, `docs/USER_PROMPTS_LOG.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — 변경 건수 조회줄 좌측)
### 작업 내용
- 「변경 N건 — 저장 클릭 시 반영」을 본문에서 **`MesSearchSaveBar` `filterLeading`**(좌측)으로 이동. 글자 크기 **`text-[11px]`** 로 조회줄 다른 텍스트와 정합.

### 변경 파일
- `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — 조회줄 버튼 제거)
### 작업 내용
- 범례와 권한그룹 콤보 사이 **조회·저장·삭제** 버튼 제거. 조회/저장은 상단 툴바(Search/Save)만 사용.

### 변경 파일
- `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — 모듈 권한 사각형)
### 작업 내용
- 모듈 행: `[BAS]` 등 코드 문자열 대신 **권한색 사각형**(빨/초/보라) + 모듈명만 표시. 요약 규칙: 하위 메뉴 중 하나라도 권한없음→빨강, 전부 모든권한→보라, 그 외→초록.

### 변경 파일
- `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — 접기 +/− 네모)
### 작업 내용
- 모듈·그룹 행 접기/펼치기: 삼각형(▶/▼) 대신 **네모 안 + / −**(레거시 트리뷰 스타일). 리프 행은 동일 폭 빈 칸으로 정렬.

### 변경 파일
- `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — 점선 트리라인·축소)
### 작업 내용
- 모듈 행 장식 `[-]` 제거. `TreeItem.parentKey` 추가로 가이드 계산.
- `visibleItems` 기준 점선 세로/가로(├/└) 트리 가이드 열 렌더.
- 트리 본문 약 30% 축소(`text-[14px]` 등).

### 변경 파일
- `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — 조회줄 버튼·접기 트리)
### 작업 내용
- `MesSearchSaveBar` 우측 Search/Save 숨김(`showFilterSearch`/`showFilterSave` false). 범례「모든권한」우측에 **조회·저장·삭제** 버튼 배치(삭제는 선택 메뉴 `DELETE tb_mes_menu_authority`).
- 트리 본문 약 **2배** 크기(`text-[20px]`, 패딩·간격·Dot 확대). 모듈(depth0)·그룹(depth1) **접기/펼치기**(▶/▼), 하위 트리 필터링.

### 변경 파일
- `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — 동적 구현)
### 작업 내용
- `renderer/src/lib/menuAuthorityApi.ts` 신규 — `fetchMenuUserClass`, `postMenuAuthority`, `deleteMenuAuthority` API 함수.
- `std_base_menu_permission_mgmt.tsx` 전면 재작성: 정적 샘플 → 동적 API 연동.
  - 콤보: `fn_cm_code?p1=USER_CLASS` 18건 로드, 첫 번째 자동 선택.
  - 트리: `fn_mes_menu_user_class?p1={uc}` 응답을 `pgm_code→depth=1→depth=2` 3단 계층으로 빌드, 권한 Dot(red/emerald/violet) 표시.
  - 더블클릭으로 권한 토글(없음→접근→모든→없음), 변경 항목 amber 하이라이트.
  - 저장: diff → `POST /db/tb_mes_menu_authority` (upsert), 이후 트리 갱신.

### 변경 파일
- `renderer/src/lib/menuAuthorityApi.ts`(신규), `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_menu_permission_mgmt — DB·API 문서화)
### 작업 내용
- `docs/db-doc/std_base_menu_permission_mgmt_api.md` 신규 작성 — 실제 DB 응답 데이터 기반 5개 API 상세 분석(fn_cm_code, fn_mes_menu_user_class, tb_mes_menu, tb_mes_menu_all, tb_mes_menu_authority).
- HTML 변환 후 `smkang_doc` 배포.
- `docs/DOCUMENTATION_INDEX.md`에 링크 추가.

### 변경 파일
- `docs/db-doc/std_base_menu_permission_mgmt_api.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-08 (std_base_user_mgmt — PostgreSQL 전용 Node BE + 렌더러 연동)
### 작업 내용
- **`server/`** 신규: Express + `pg` + `bcryptjs`, **`GET`/`POST`/`DELETE` `/api/users`** — 레거시 `frmUser.cs` 필터·`DEVELOPER` 제외·upsert·평문 `pass` 미사용·`password` 시 bcrypt `user_pwd`.
- 렌더러: **`userMgmtBeBaseUrl.ts`**, **`tbCmUserApi.ts`** 를 `/api/users` 전용으로 전환; **`tbCmUserMapper`** 에 `telephone`·`address`·`attribute02`·`password` 전송, **MD5(`js-md5`) 제거**.
- Vite **`/api` → localhost:8787** 프록시; 루트 **`npm run dev:be`**, workspaces에 `server` 추가.
- Electron INI **`USER_MGMT_API_BASE`** TLS 예외, `mes-config.example.ini` 주석 예시.
- 문서: **`docs/db-doc/std_base_user_mgmt_api.md`** 전면 갱신, **`std_base_user_permission_mgmt_api.md`** 사용자 API 설명, **`docs/SETUP.md`**, **`docs/CONTEXT.md`**.

### 변경 파일
- `server/package.json`, `server/src/index.mjs`, `server/.env.example`, `server/README.md`
- `package.json`, `package-lock.json`, `renderer/package.json`, `renderer/vite.config.ts`
- `renderer/src/lib/userMgmtBeBaseUrl.ts`, `renderer/src/lib/tbCmUserApi.ts`, `renderer/src/lib/tbCmUserMapper.ts`
- `renderer/src/screens/std/std_base_user_mgmt.tsx`, `electron/main.cjs`, `electron/mes-config.example.ini`
- `docs/db-doc/std_base_user_mgmt_api.md`, `docs/db-doc/std_base_user_permission_mgmt_api.md`, `docs/SETUP.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (SimpleGridTable — 헤더 높이 축소, 본문 py-0.5 정합)
### 작업 내용
- `SimpleGridTable` 헤더: 비정렬 `th` **`py-1.5` → `py-1`**, 정렬 버튼 **`min-h-[2rem]` → `min-h-[1.75rem]`** + **`py-1.5` → `py-1`** — 본문 `py-0.5`와 시각적 균형.
- `docs/LAYOUT_RULES.md`에 셀 세로 패딩 기준 한 줄 추가.

### 변경 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (SimpleGridTable — 본문 행 세로 패딩 축소)
### 작업 내용
- `SimpleGridTable` 본문 셀(`tbody` `td`)만 **`py-1` → `py-0.5`** 로 조정해 행당 세로 여백을 줄임(헤더·가상 스크롤 상수는 미변경).

### 변경 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 구역 구분선 `LAYOUT_RULES` 정합)
### 작업 내용
- 콤보 스트립·하단 권한 목록 헤더: `border-slate-200` → **`border-slate-300`** (연한 배경에서도 구분선이 잘 보이도록).
- 권한 목록 행 구분: `border-slate-100` → **`border-slate-200`**.
- 좌·우 패널: 우측에 **`border-l border-slate-300 pl-2`**.
- 권한복제 탭: 선택 그리드 상단에 **`border-t border-slate-300 pt-1`** 로 대상/선택 그리드 구분.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 권한복제 탭 그리드 세로 비율)
### 작업 내용
- 권한복제 탭: 대상 그리드·선택 그리드 세로 비율 **3:1** — 선택 그리드 높이를 줄여 대상 그리드에 더 많은 행이 보이도록 함.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 툴바 신규·조회·삭제 비활성)
### 작업 내용
- 사용자 권한 관리 화면에서 상단 툴바 **신규**·**조회**·**삭제** 버튼 비활성화.
- `Toolbar`에 `disabledActions` 지원, MDI 모듈 툴바는 `MesMdiContext`에 `registerToolbarDisabled`·`activeToolbarDisabled`·`invokeToolbar` 가드 추가.

### 변경 파일
- `renderer/src/components/Toolbar.tsx`, `renderer/src/components/BaseFeatureScreen.tsx`
- `renderer/src/context/MesMdiContext.tsx`, `renderer/src/pages/ModuleBlankPage.tsx`
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 권한복사→권한복제 변경)
### 작업 내용
- 탭 이름 **"권한복사"** → **"권한복제"** 변경.
- 저장 로직: 기존 **추가만**(POST) → 대상 사용자의 **기존 권한 전부 DELETE** 후 좌측 사용자 권한을 **동일하게 POST** (완전 복제).
- `deleteUserAuthority` import 추가, `runSave` 재작성.
- DB 문서(`std_base_user_permission_mgmt_api.md`) §9 흐름 갱신.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`
- `docs/db-doc/std_base_user_permission_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 정렬 시 선택 사용자 불일치 수정)
### 작업 내용
- 왼쪽 그리드를 열 헤더로 정렬한 뒤 행을 선택하면, 화면 순서 인덱스(`selectedUserIdx`)로 원본 배열(`deptUsers`)을 조회하여 **다른 사용자**의 권한그룹이 표시되던 버그 수정.
- `selectedUserId` 상태를 추가하여 `user_id` 기반으로 `deptUsers.find()` — 정렬 상태와 무관하게 올바른 사용자 매칭.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 오른쪽 탭 분리 + 권한복사)
### 작업 내용
- 오른쪽 패널을 **탭 2개**(`권한그룹` / `권한복사`)로 분리.
- **탭1(권한그룹)**: 기존 권한그룹 콤보 + 소속 사용자 그리드 — 변경 없이 탭 내부로 감쌈.
- **탭2(권한복사)**: 부서 콤보 + 대상 그리드(클릭 → 선택 그리드에 추가) + 선택 그리드(클릭 → 제거).
- Toolbar **저장**: 좌측 선택 사용자의 **모든 권한그룹**을 선택 그리드 사용자 전원에게 `POST /db/tb_mes_user_authority` 일괄 복사. 이미 존재하는 조합은 `try-catch`로 개별 건 무시, 성공/실패 건수 배너 표시.
- DB 문서(`docs/db-doc/std_base_user_permission_mgmt_api.md`) §9 권한복사 흐름 추가, 섹션 번호 재정렬.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`
- `docs/db-doc/std_base_user_permission_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 부서 전체 시 전체 사용자)
### 작업 내용
- 부서 콤보 **전체** 선택 시: `fn_cm_user_dept` 대신 `GET /db/tb_cm_user` 전체 + `fetchAllCmUsersForDeptGrid`로 `CmUserDeptRow` 형태 유지, DEPT/DUTY `fn_cm_code` 옵션으로 명칭 표시.
- 마운트 시 `DUTY` 콤보 옵션 병렬 로드.
- `docs/db-doc/std_base_user_permission_mgmt_api.md` 갱신, HTML smkang_doc 푸시.

### 변경 파일
- `renderer/src/lib/userAuthorityApi.ts`, `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`
- `docs/db-doc/std_base_user_permission_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (MesDataGridPanel memo + 권한 화면 그리드별 로딩)
### 작업 내용
- `MesDataGridPanel`: `React.memo` 적용 — `cellValues` 등 props가 동일하면 리렌더 생략(인접 패널만 데이터 변경될 때 상대 그리드 DOM 재그리기 감소).
- `std_base_user_permission_mgmt`: 상단 공통「조회 중」제거, 왼쪽/오른쪽 그리드 영역에만 로딩 오버레이.

### 변경 파일
- `renderer/src/components/MesDataGridPanel.tsx`, `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 콤보 변경 시 그리드 갱신)
### 작업 내용
- `filterDept` / `filterUserClass` 변경 시 `useEffect`에서 항상 `loadLeftGrid`·`loadRightGrid` 호출(기존 `if (filterDept)` 등으로 인해 전체·일부 선택 시 미갱신되던 문제 제거).

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 부서/권한 콤보 우측 정렬)
### 작업 내용
- 그리드 상단 `부서`·`권한그룹` 행에 `justify-end` 적용해 패널 내 우측 정렬.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 조회줄 제거·콤보를 그리드 위)
### 작업 내용
- `MesSearchSaveBar` 미사용: `filterArea`/`filterLeading`/`onFilterSearch` 제거.
- `부서`·`권한그룹` `PlainSelect`를 각 그리드 바로 위에 배치(`border-b` + `bg-slate-50/90` 조회줄 스타일).
- 조회 중·배너는 본문 상단 한 줄로 표시. Toolbar **조회**는 `runSearch` 유지.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_permission_mgmt — 실제 API 연동 재구성 + DB 분석)
### 작업 내용
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`: 목업 데이터 제거, 실제 6개 API 연동으로 전면 재구성.
- `renderer/src/lib/userAuthorityApi.ts` 신설(5개 GET + POST/DELETE).
- DB 분석: `docs/db-doc/std_base_user_permission_mgmt_api.md` 신설, smkang_doc 푸시(`8c4373c`).
- `docs/DOCUMENTATION_INDEX.md`: db-doc 링크 추가.

### 변경 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`, `renderer/src/lib/userAuthorityApi.ts` (신설)
- `docs/db-doc/std_base_user_permission_mgmt_api.md` (신설), `docs/DOCUMENTATION_INDEX.md`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_common_code_mgmt — 페이지 DB 분석)
### 작업 내용
- `docs/db-doc/std_base_common_code_mgmt_api.md`: § MD 템플릿 정합.
- `D:\smkang_data\docs\mes\std_base_common_code_mgmt_api.html` 생성, smkang_doc「만든 파일 업로드」푸시.

### 변경 파일
- `docs/db-doc/std_base_common_code_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_common_code_mgmt — 페이지 DB 분석)
### 작업 내용
- `docs/db-doc/std_base_common_code_mgmt_api.md` 신설(§ MD 템플릿): 베이스 URL, 엔드포인트 요약, `GET /db/tb_cm_code`·`GET /func/fn_cm_code`, `POST`/`DELETE`, 필드·그리드 매핑, 보완점, 관련 소스.
- `scripts/render-db-doc-html.mjs`로 `D:\smkang_data\docs\mes\std_base_common_code_mgmt_api.html` 생성, smkang_doc「만든 파일 업로드」푸시.

### 변경 파일
- `docs/db-doc/std_base_common_code_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_mgmt — 페이지 DB 분석 재수행)
### 작업 내용
- `docs/db-doc/std_base_user_mgmt_api.md`: §3.4 내부 참조 `§6` → `§7` 정정.
- `scripts/render-db-doc-html.mjs`로 `D:\smkang_data\docs\mes\std_base_user_mgmt_api.html` 재생성, smkang_doc 커밋「만든 파일 업로드」·푸시(`4c30abc`).

### 변경 파일
- `docs/db-doc/std_base_user_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (DB 분석 워크플로 — MD 템플릿·스타일 규칙 등록)
### 작업 내용
- `.cursor/rules/page-db-analysis-workflow.mdc`에 **§ MD 템플릿** 절 추가: 헤더 블록, 섹션 순서(베이스 URL·엔드포인트 요약·상세·필드·UI 매핑·보완점·관련 파일), 엔드포인트별 하위 구조(호출 코드·URL·시점·응답·에러), 서식 규칙(표·볼드·코드블록·링크·한국어) 정의.
- HTML 인라인 CSS 스타일 표(폰트·색·테이블·코드 등)를 규칙에 명시 — `scripts/render-db-doc-html.mjs`와 동기화.
- `.cursorrules` 워크플로 참조 문구에 "§ MD 템플릿 구조·스타일" 언급 추가.

### 변경 파일
- `.cursor/rules/page-db-analysis-workflow.mdc`, `.cursorrules`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_mgmt — 페이지 DB 분석 워크플로 완료)
### 작업 내용
- 이전 턴에서 채팅 요약만 제공하고 `page-db-analysis-workflow.mdc` 절차(MD 상세·HTML·smkang_doc 푸시)를 수행하지 않았던 점 보완.
- `docs/db-doc/std_base_user_mgmt_api.md` 전면 갱신(엔드포인트·POST 본문·DELETE·UI 매핑·에러·보완점·관련 소스).
- `scripts/render-db-doc-html.mjs`: MD→단일 HTML(인라인 CSS) 변환 스크립트 추가.
- `D:\smkang_data\docs\mes\std_base_user_mgmt_api.html` 생성 후 `smkang_doc`에 커밋 메시지「만든 파일 업로드」로 푸시(`main` → `origin`).
- `docs/db-doc` 내 구버전 `std_base_user_mgmt_api.html` 삭제(정식 산출물은 smkang_doc `mes/`만).

### 변경 파일
- `docs/db-doc/std_base_user_mgmt_api.md`, `scripts/render-db-doc-html.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`
- 삭제: `docs/db-doc/std_base_user_mgmt_api.html`

---

## 2026-04-03 (규칙 —「페이지에 대한 DB분석」워크플로)
### 작업 내용
- `.cursor/rules/page-db-analysis-workflow.mdc` 신설(`alwaysApply: true`): 트리거 문구 시 MD(`docs/db-doc/<screenId>_api.md`) → HTML(`D:\smkang_data\docs\mes\`) → `smkang_doc` 푸시(커밋 메시지「만든 파일 업로드」) 절차.
- `.cursorrules`·`project-rules.md` §3·`ai-rules.md` 표에 교차 참조.

### 변경 파일
- `.cursor/rules/page-db-analysis-workflow.mdc`, `.cursorrules`, `project-rules.md`, `ai-rules.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_common_code_mgmt — DB API 상세 문서)
### 작업 내용
- `docs/db-doc/std_base_common_code_mgmt_api.md`: GET/POST/DELETE·`fn_cm_code` 사용 위치·조건·에러·필드 매핑·보완점 등 상세 정리.

### 변경 파일
- `docs/db-doc/std_base_common_code_mgmt_api.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (MesDataGridPanel — 기본 행 수 데이터만)
### 작업 내용
- `MesDataGridPanel.tsx`: **`minVisibleRows` 기본값 8 → 0** — `cellValues` 길이만큼만 tbody 행 생성(빈 패딩 행 제거). 최소 행 높이가 필요하면 화면에서 `minVisibleRows={n}` 유지.
- `std_base_common_code_mgmt.tsx`: 불필요한 `minVisibleRows={8}` 제거.
- `docs/LAYOUT_RULES.md`: `minVisibleRows` 기본 0 설명 보강.

### 변경 파일
- `renderer/src/components/MesDataGridPanel.tsx`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_common_code_mgmt — DB 문서 정합·GROUPCODE 콤보·tb_cm_code 쿼리)
### 작업 내용
- `fnCmCodeApi.ts`: `fetchFnCmCodeOptions(p1, p2?)` — `p2` 시 `GET /func/fn_cm_code?p1=…&p2=…`.
- `tbCmCodeApi.ts`: 조회 `code_group__like`(미지정 시 빈 문자열)·항상 `_orderBy=disp_seq`; `code_group` 쿼리 키 제거.
- `std_base_common_code_mgmt.tsx`: 마운트 시 `fetchFnCmCodeOptions('GROUPCODE','code_name')`와 `fetchTbCmCodes({ code_group__like: '' })` 병렬; 검색·재조회는 `code_group__like`만 사용. 상세 Group Code `(현재값)` 병합.
- `docs/db-doc/std_base_common_code_mgmt_api.md` 신설, `docs/CONTEXT.md`·`docs/DOCUMENTATION_INDEX.md` 보강.

### 변경 파일
- `renderer/src/lib/fnCmCodeApi.ts`, `renderer/src/lib/tbCmCodeApi.ts`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/db-doc/std_base_common_code_mgmt_api.md`, `docs/CONTEXT.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

---

## 2026-04-03 (std_base_user_mgmt — GET 쿼리 정합·부서/직급 fn_cm_code 콤보)
### 작업 내용
- `tbCmUserApi.ts`: 조회 `user_id__like`·`user_name__like`·항상 `_orderBy=user_id`.
- `fnCmCodeApi.ts`: `GET /func/fn_cm_code?p1=DEPT|DUTY` → 콤보 옵션(`code`/`code_name`); 그리드 표시용 `resolveFnCmCodeLabel` 헬퍼.
- `std_base_user_mgmt.tsx`: 조회 필터 `user_id__like` 연동; 상세 부서·직급 `PlainSelect`(명칭 표시·코드 저장); 코드표에 없는 기존값은 `(현재값)` 옵션. **그리드** 부서·직급 열은 `fn_cm_code` 옵션으로 **명칭만** 표시(콤보 없음); 행 선택 시 상세는 `user_id`로 `users`에서 찾아 **코드** 유지.
- `vite.config.ts`: dev `proxy`에 `/func` 추가.

### 변경 파일
- `renderer/src/lib/tbCmUserApi.ts`, `renderer/src/lib/fnCmCodeApi.ts`, `renderer/src/lib/mesDbBaseUrl.ts`, `renderer/src/screens/std/std_base_user_mgmt.tsx`, `renderer/vite.config.ts`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`

---

## 2026-04-02 (PNG 미존재 화면 파일 삭제 — §6.0 규칙 준수)
### 작업 내용
- `project-rules.md` §6.0 규칙 준수: **PNG가 없는 화면은 페이지를 생성하지 않고 `MesScreenAccessDeniedModal` 에러 팝업으로 처리**.
- PNG 미존재 화면 .tsx 파일 삭제 및 레지스트리 제거:
  - **생산관리(mfg)** 2개: `mfg_proc_cycle_count_edit_confirm`, `mfg_ship_delivery_plan_hist_inq`
  - **자재관리(mat)** 6개: `mat_base_insp_item_change_hist`, `mat_base_defect_code_change_hist`, `mat_price_exchange_rate_hist_inq`, `mat_gi_material_kitting_order_mgmt`, `mat_gi_material_kitting_hist_order_issue`, `mat_gr_import_decl_total_amt_mgmt`
- 최종 화면 수: mfg 84개 (86→84), mat 134개 (140→134)

---

## 2026-04-02 (생산관리 모듈 전체 84개 화면 신규 구현)
### 작업 내용
- `renderer/src/screens/mfg/` 폴더에 생산관리 모듈의 모든 화면(84개)을 신규 생성.
- 각 화면의 `docs/image/<화면ID>.png`를 분석하여 레이아웃·필터·그리드 열·목업 데이터를 최대한 재현.
- PNG가 없는 화면(2개: `mfg_proc_cycle_count_edit_confirm`, `mfg_ship_delivery_plan_hist_inq`)은 §6.0 규칙에 따라 생성하지 않음(에러 팝업 처리).
- `docs/매뉴얼.csv` 변경사항을 `renderer/src/data/manual.csv`에 동기화:
  - `품질 지수 조회` → `품질지수 조회 - 월별처리 결과`(mfg_hist_quality_index_month) + `품질지수 조회 - 실적(납품)수량`(mfg_hist_quality_index_qty)로 분리
  - `기간별 조회` → `기간별 부적합 조회`, `기간별 분석` → `기간별 부적합 분석`으로 이름 변경
  - `고객사 품목별 출하검사 품질 현황`(mfg_oqc_ship_insp_quality_by_cust_item) 삭제

#### 서브메뉴별 화면 수
| 서브메뉴 | 접두어 | 화면 수 |
|---------|--------|--------|
| 생산정보 | `mfg_plan_*` | 12 |
| 공정관리 | `mfg_proc_*` | 17 |
| 이력조회 | `mfg_hist_*` | 13 |
| 출하 | `mfg_ship_*` | 12 |
| 포장 | `mfg_pkg_*` | 1 |
| 수리 | `mfg_repair_*` | 1 |
| 출하검사 설정 | `mfg_oqcset_*` | 12 |
| 출하검사 | `mfg_oqc_*` | 10 |
| 설정 | `mfg_cfg_*` | 6 |
| **합계** | | **84** |

### 인프라 변경
- `renderer/src/screens/mfg/registry.ts` — 84개 화면을 `React.lazy()`로 등록하는 `MFG_FEATURE_SCREEN_REGISTRY` 생성.
- `renderer/src/screens/registry.tsx` — `MFG_FEATURE_SCREEN_REGISTRY`를 병합.
- `renderer/src/data/manual.csv` — `docs/매뉴얼.csv` 변경사항 동기화.
- `renderer/src/screens/mfg/MfgFeatureScreen.tsx` 삭제 (개별 화면 파일로 대체).
- 복합 폼(출하검사 결과 등록 — 정보패널 + 검사대상 + 불량유형 + 하단 그리드)

---

## 2026-04-02 (자재관리 모듈 전체 140개 화면 신규 구현)
### 작업 내용
- 자재관리 모듈의 모든 화면(140개)을 `renderer/src/screens/mat/` 폴더에 신규 생성.
- 각 화면의 `docs/image/<화면ID>.png`를 분석하여 레이아웃·필터·그리드 열·목업 데이터를 최대한 재현.
- PNG가 없는 화면(6개: `mat_base_insp_item_change_hist`, `mat_base_defect_code_change_hist`, `mat_price_exchange_rate_hist_inq`, `mat_gi_material_kitting_order_mgmt`, `mat_gi_material_kitting_hist_order_issue`, `mat_gr_import_decl_total_amt_mgmt`)은 기본 패턴으로 생성.

#### 서브메뉴별 화면 수
| 서브메뉴 | 접두어 | 화면 수 |
|---------|--------|--------|
| 기초정보 | `mat_base_*` | 13 |
| 자재정보 | `mat_item_*` | 7 |
| 자재단가관리 | `mat_price_*` | 7 |
| 가입고관리 | `mat_prein_*` | 8 |
| 수입검사 | `mat_iqc_*` | 14 |
| 입고관리 | `mat_gr_*` | 22 |
| MSL자재 | `mat_msl_*` | 18 |
| 출고관리 | `mat_gi_*` | 22 |
| 재고실사 및 조정 | `mat_cyclecnt_*` | 10 |
| 재고관리 | `mat_inv_*` | 19 |
| **합계** | | **140** |

### 인프라 변경
- `renderer/src/screens/mat/registry.ts` — 140개 화면을 `React.lazy()`로 등록하는 `MAT_FEATURE_SCREEN_REGISTRY` 생성.
- `renderer/src/screens/registry.tsx` — `MAT_FEATURE_SCREEN_REGISTRY`를 병합.
- `renderer/src/pages/ScreenPlaceholderPage.tsx` — lazy 컴포넌트 지원을 위해 `Suspense` 경계 추가.

---

## 2026-04-02 (자재관리 재고관리 mat_inv 19화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 재고관리(mat_inv) 19화면 신규 구현.
  - `mat_inv_material_inv_main`: [자재 재고 조회 메인] — 부품분류·ERP코드·규격 등 필터 + 현물재고·입고·출고·환산재고 다중 컬러 그룹 헤더 넓은 그리드.
  - `mat_inv_material_wh_inv_inq`: [자재창고 재고 조회] — 창고 재고 전용, 가입고 제외 옵션 + 다중 컬러 그룹 헤더 그리드.
  - `mat_inv_smt_inv_inq`: [SMT 재고 조회] — SMT 공정 재고, From 자재실·환산재고·SMT 재고 합계 열 포함.
  - `mat_inv_assy_inv_inq`: [조립 재고 조회] — 조립 공정 재고, 구조 SMT와 유사.
  - `mat_inv_raw_material_inv_inq`: [자재 원자재 조회] — 입출고내역·0감추기 체크박스 + 창고구분·위치 열 포함.
  - `mat_inv_all_wh_material_inv_inq`: [전체 창고 자재 재고 조회] — CMS·FC·포장·SMTD·AIR 등 다수 창고 열 넓은 그리드.
  - `mat_inv_material_io_hist_inq`: [자재 입출고 내역 조회] — 상하 마스터-디테일 2단 그리드(입출고 요약 + 상세).
  - `mat_inv_material_monthly_txn_inq`: [월별 자재수불 조회] — 조회년월 필터 + 전월재고·입고·출고·현재고 그리드.
  - `mat_inv_material_lot_trace`: [자재LOT 추적] — 3단 구성(단품 요약 + 입고 내역 + SMT 사용 내역).
  - `mat_inv_vendor_lot_trace_by_label`: [업체 LOT 추적 (라벨별)] — 상하 마스터-디테일 2단 그리드.
  - `mat_inv_material_label_hist_trace`: [자재 라벨별 이력 추적] — TID 그룹별 상세 이력 그리드.
  - `mat_inv_material_location_inq`: [자재별 현재위치 조회] — Maker PartNo/업체LOT/TID 라디오 + 위치 그리드.
  - `mat_inv_material_issue_plan`: [자재불출계획] — 생산계획일자 범위 + 계획수량·불출수량·과부족 그리드.
  - `mat_inv_req_vs_plan_inq`: [생산계획 대비 소요량 조회] — BOM 소요량 토글 + 모델별 피벗 열 그리드.
  - `mat_inv_material_deplete_daily_by_item`: [일별 자재 소진 내역 (Item별)] — 일자별 피벗(2/1~2/28) 넓은 그리드.
  - `mat_inv_material_deplete_daily_detail`: [일별 자재 소진 상세 내역] — 소진일자 범위 + 생산소진·수리소진·합계 그리드.
  - `mat_inv_material_deplete_monthly_by_item`: [월 품번별 자재 소진 내역] — 조회년월 + 현재고·누계 간단 그리드.
  - `mat_inv_slow_moving_inv_status`: [장기 재고 현황] — 소계/경과일자 옵션 + LOT·MSL 등급 그리드.
  - `mat_inv_material_shelf_life_mgmt`: [자재 유효기간 관리] — 일자조건·판매일자 범위 + LOT·유효기간·잔여일자 그리드.
- `renderer/src/screens/mat/registry.ts`에 19개 화면 lazy import 등록.
### 변경된 파일
- `renderer/src/screens/mat/mat_inv_material_inv_main.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_wh_inv_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_smt_inv_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_assy_inv_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_raw_material_inv_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_all_wh_material_inv_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_io_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_monthly_txn_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_lot_trace.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_vendor_lot_trace_by_label.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_label_hist_trace.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_location_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_issue_plan.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_req_vs_plan_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_deplete_daily_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_deplete_daily_detail.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_deplete_monthly_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_slow_moving_inv_status.tsx` (신규)
- `renderer/src/screens/mat/mat_inv_material_shelf_life_mgmt.tsx` (신규)
- `renderer/src/screens/mat/registry.ts` (수정 — 19개 항목 추가)

---

## 2026-04-02 (자재관리 출고관리 mat_gi 22화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 출고관리(GI) 22화면 신규 구현.
  - `mat_gi_material_gi_confirm_cancel`: [자재 출고 및 취소] — 좌측 출고정보 폼(TID·출고구분·출고처·Maker PartNo 등)+우측 Ready 영역+하단 그리드
  - `mat_gi_material_gi_bulk_proc`: [자재 출고 일괄 처리] — 미출고/출고 토글+일괄출고/출고취소 버튼+단일 그리드
  - `mat_gi_gi_hist_inq`: [출고내역 조회] — 조회 전용, 출고일·출고구분·부품분류 필터+단일 그리드
  - `mat_gi_gi_daily_sum`: [일자별 출고내역 집계] — 출고일자 범위·부품분류 필터+집계 그리드
  - `mat_gi_gi_qty_sum_by_period`: [기간내 출고수량 집계] — 출고일자·부품분류·창고(From) 필터+집계 그리드
  - `mat_gi_gi_ready_label_list`: [출고가능 라벨 List] — 입고일자·정렬순서 필터+단일 그리드
  - `mat_gi_wip_return_hist_inq`: [공정반납 내역 조회] — 공정반납일 범위 필터+단일 그리드
  - `mat_gi_gi_cancel_hist_inq`: [출고 취소 내역 조회] — 취소일자 범위 필터+단일 그리드
  - `mat_gi_material_return_reg`: [자재반품 등록] — 반품사유 입력+상단 입고 그리드+하단 LOT 그리드+업체반품 버튼
  - `mat_gi_material_return_hist_inq`: [자재반품 내역 조회] — 상단 마스터 그리드+하단 TID 상세 그리드
  - `mat_gi_return_hist_inq_by_date`: [일자별 반품 내역 조회] — 반품일자 범위 필터+단일 그리드
  - `mat_gi_material_transfer_part_change`: [자재 이체 (PartNo 변경)] — To-be Item+변경사유+이체실행 버튼+그리드
  - `mat_gi_material_transfer_part_change_hist_inq`: [자재 이체 (PartNo 변경) 이력 조회] — 입고일자/이체일자 이중 범위 필터+변경전/후 열 그리드
  - `mat_gi_do_not_issue_material_reg`: [투입금지 자재 등록] — 금지등록/해제 토글+금지사유+상하 2단 그리드
  - `mat_gi_do_not_issue_material_status_inq`: [투입금지 자재 현황 조회] — 금지일자 범위 필터+단일 그리드
  - `mat_gi_gi_monthly_sum_by_part_class`: [월별 출고내역 집계(부품분류별)] — 월 선택+12개월 열 피벗 그리드
  - `mat_gi_gi_monthly_sum_by_item`: [월별 출고내역 집계(Item별)] — 월 선택+12개월 열 피벗 그리드
  - `mat_gi_gi_daily_sum_by_item`: [일별 출고내역 집계(Item별)] — 월 선택+28일 열 피벗 그리드
  - `mat_gi_vendor_loan_status`: [업체 대여 현황] — 수불집계/출고집계 토글+상단 그리드+하단 업체별 합계
  - `mat_gi_vendor_loan_hist`: [업체 대여 이력] — 대여구분·업체·기간 필터+단일 그리드
  - `mat_gi_material_kitting_order_mgmt`: [자재 키팅 지시서 관리] — PNG 없음, 기본 패턴(지시일자·라인·상태 필터+그리드)
  - `mat_gi_material_kitting_hist_order_issue`: [자재 키팅 이력 및 지시서 발행] — PNG 없음, 기본 패턴(일자·라인 필터+그리드)
### 변경된 파일
- `renderer/src/screens/mat/mat_gi_material_gi_confirm_cancel.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_material_gi_bulk_proc.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_daily_sum.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_qty_sum_by_period.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_ready_label_list.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_wip_return_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_cancel_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_material_return_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_material_return_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_return_hist_inq_by_date.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_material_transfer_part_change.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_material_transfer_part_change_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_do_not_issue_material_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_do_not_issue_material_status_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_monthly_sum_by_part_class.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_monthly_sum_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_gi_daily_sum_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_vendor_loan_status.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_vendor_loan_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_material_kitting_order_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_gi_material_kitting_hist_order_issue.tsx` (신규)

---

## 2026-04-02 (자재관리 재고실사 및 조정 mat_cyclecnt 10화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 재고실사 및 조정(Cycle Count) 10화면 신규 구현.
  - `mat_cyclecnt_cycle_count_reg`: [재고 실사 등록] — 상단 좌측 실사 정보 폼(TID·실사일자·실사창고·실사수량 등) + 우측 Ready 이미지(바코드리더) + 하단 그리드.
  - `mat_cyclecnt_cycle_count_edit_confirm`: [재고실사 수정 및 확정] — 선택/편집모드 토글 + 창고·고객사·실사일자 범위 필터 + 단일 그리드.
  - `mat_cyclecnt_cycle_count_hist_inq`: [재고실사 이력 조회] — 조회 전용, 재고실사일자 범위 필터 + 단일 그리드.
  - `mat_cyclecnt_wh_inv_qty_adj`: [창고 재고 수량 조정] — 선택/편집모드 토글 + 단일 그리드(전산재고·재고조정·재고차이).
  - `mat_cyclecnt_wh_inv_qty_adj_hist`: [창고 재고 수량 조정 이력] — 조회 전용, 단일 그리드.
  - `mat_cyclecnt_wip_inv_qty_adj`: [현장 재고 수량 조정] — 선택/편집모드 토글 + 단일 그리드.
  - `mat_cyclecnt_wip_inv_qty_adj_hist`: [현장 재고 수량 조정 이력] — 상하 마스터-디테일 2단 그리드.
  - `mat_cyclecnt_material_qty_adj_by_tid`: [(LOT No)별 자재 수량 조정] — TID 스캔 안내 + 선택/편집모드 + 그리드 + 엑셀 버튼.
  - `mat_cyclecnt_material_qty_adj_by_lot_field`: [(LOT No)별 자재 수량 조정 (생산현장용)] — TID 기반 조정과 동일 패턴, 작명/공장 열 추가.
  - `mat_cyclecnt_material_qty_adj_hist_by_tid`: [TID별 자재 수량 조정 이력] — 조회 전용, 단일 그리드.
### 변경된 파일
- `renderer/src/screens/mat/mat_cyclecnt_cycle_count_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_cycle_count_edit_confirm.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_cycle_count_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_wh_inv_qty_adj.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_wh_inv_qty_adj_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_wip_inv_qty_adj.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_wip_inv_qty_adj_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_material_qty_adj_by_tid.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_material_qty_adj_by_lot_field.tsx` (신규)
- `renderer/src/screens/mat/mat_cyclecnt_material_qty_adj_hist_by_tid.tsx` (신규)

---

## 2026-04-02 (자재관리 수입검사 mat_iqc 14화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 수입검사(IQC) 14화면 신규 구현.
  - `mat_iqc_insp_required_inq_by_item`: [Item별 검사 의뢰항목 조회] — 단일 그리드, 수검사항 라디오·부품분류·하위분류·ERP 코드·Item 명·규격 필터.
  - `mat_iqc_insp_item_inq_by_item`: [Item별 검사항목 조회] — 단일 그리드, 부품분류·하위분류·ERP 코드·Item 명·규격 필터.
  - `mat_iqc_defect_item_inq_by_item`: [Item별 불량항목 조회] — 단일 그리드, 동일 필터 패턴.
  - `mat_iqc_iqc_result_bulk_proc`: [수입검사 결과 일괄 처리] — 단일 그리드 + 판정결과 라디오·Save/Delete 버튼, 입고일자 범위·검사 대상 라디오·Maker PartNo/업체 LOT/검사의뢰 Label 체크.
  - `mat_iqc_iqc_result_reg`: [수입검사 결과 등록] — 상단 마스터 그리드 + 하단 좌측 상세폼(입고정보·검사정보·합부판정) + 하단 우측 검사항목 그리드 + 불량항목 리스트 + 우측 버튼열(Save/Delete/관리대장/통LOT/기준서/성적서).
  - `mat_iqc_iqc_result_inq`: [수입검사 결과 표시] — result_reg와 동일 레이아웃 (조회 전용, readOnly).
  - `mat_iqc_iqc_hist_inq_by_date`: [일자별 수입검사내역 조회] — 단일 그리드, 검사일자 범위·부품분류·하위분류·ERP 코드·Item 명·규격 필터.
  - `mat_iqc_iqc_status_by_period`: [기간별 수입검사 현황] — 단일 그리드(불량 유형별 컬럼 포함), 동일 필터 패턴.
  - `mat_iqc_iqc_status_sum_by_period`: [기간별 수입검사 현황 집계] — 단일 그리드(집계), 동일 필터 패턴.
  - `mat_iqc_iqc_quality_daily`: [일별 수입검사 통계현황] — 상단 일별 피벗 그리드(3/1~3/31) + 하단 막대 차트 영역, 조회년월·ERP 코드·Item 명·부품분류·하위분류·규격 필터.
  - `mat_iqc_defect_hist_inq_by_type`: [유형별 불량내역 조회] — 상단 일별 피벗 그리드 + 하단 차트 영역, 동일 필터 패턴.
  - `mat_iqc_iqc_spec_reg`: [수입검사 기준서 등록] — 단일 그리드, 등록기준 라디오(부품분류별/하위분류별/대표Item별/Item별)·부품분류·하위분류 필터.
  - `mat_iqc_iqc_spec_inq`: [수입검사 기준서 조회] — spec_reg와 동일 그리드 (조회 전용).
  - `mat_iqc_quality_judgment_setup`: [품질판정 설정] — 기준서 그리드 + 품질판정 설정 팝업(검사결과 수지들록·자동종합·차트 유형·검사수준별 항목·파일 경로·불량률 산식).
### 변경된 파일
- `renderer/src/screens/mat/mat_iqc_insp_required_inq_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_insp_item_inq_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_defect_item_inq_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_result_bulk_proc.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_result_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_result_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_hist_inq_by_date.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_status_by_period.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_status_sum_by_period.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_quality_daily.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_defect_hist_inq_by_type.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_spec_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_spec_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_quality_judgment_setup.tsx` (신규)
### 다음 작업 예정
- 자재관리 나머지 하위메뉴 화면 구현 (출고관리·재고관리 등)
- 기존 mat_iqc 화면 데이터 연동

## 2026-04-02 (자재관리 입고관리 mat_gr 22화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 입고관리 22화면 신규 구현.
  - `mat_gr_material_grn_confirm_cancel`: [자재입고 확정 및 취소] — 단일 그리드, 입고일자 범위·미확정/확정 라디오·현장 미출고만 보기·스키너 포트·Maker PartNo/업체 LOT/LOT No 라디오.
  - `mat_gr_grn_hist_edit`: [입고내역 수정] — 상단 그리드 + 중단 상세폼(입고 내역 수정) + 하단 LOT 그리드. 입고일자·스키너 포트·LOT No 필터.
  - `mat_gr_grn_hist_inq`: [입고내역 조회] — 단일 그리드, 입고일자 범위·고객사/공급업체 라디오·하위분류/상세구분·ERP 코드·Maker PartNo/업체 LOT/TID 라디오.
  - `mat_gr_grn_hist_inq_by_tid`: [TID별 입고내역 조회] — 단일 그리드, 동일 필터 패턴.
  - `mat_gr_grn_daily_sum`: [일자별 입고내역 집계] — 단일 그리드, 입고일자 범위·고객사/공급업체·하위분류/상세구분·Item 코드·Item 명.
  - `mat_gr_grn_qty_sum_by_period`: [기간내 입고수량 집계] — 단일 그리드, 입고일자 범위·부품분류·하위분류·ERP 코드·Item 명·규격.
  - `mat_gr_tid_location_inq_by_grn`: [입고별 TID 위치 조회] — 단일 그리드, 입고일자 범위·Maker PartNo/업체 LOT/TID 라디오. TID 목록 확장 행.
  - `mat_gr_material_label_issue`: [자재라벨 발행] — 좌측 그리드 + 우측 바코드 프린터 설정/출력정보/주석 사이드바.
  - `mat_gr_material_label_reissue`: [자재라벨 재발행] — 좌측 그리드 + 우측 바코드 프린터 설정/출력정보 사이드바.
  - `mat_gr_split_material_label_issue`: [분할자재 라벨발행] — 좌측 그리드 + 우측 바코드 프린터 설정/출력정보 사이드바.
  - `mat_gr_material_label_issue_hist_inq`: [자재라벨 발행 이력조회] — 단일 그리드.
  - `mat_gr_material_label_reissue_hist_inq`: [자재라벨 재발행 이력조회] — 단일 그리드.
  - `mat_gr_split_material_label_inq`: [분할자재라벨 이력 조회] — 단일 그리드.
  - `mat_gr_material_grn_cancel_by_label`: [자재 입고 취소 (자재라벨)] — 단일 그리드.
  - `mat_gr_material_label_dispose`: [자재라벨 폐기] — 단일 그리드, 폐기/해제 라디오.
  - `mat_gr_grn_monthly_sum_by_part_class`: [월별 입고내역 집계 (부품분류별)] — 월별 그리드 + 하단 부품분류 범례.
  - `mat_gr_grn_monthly_sum_by_vendor`: [월별 입고내역 집계 (공급업체별)] — 월별 그리드 + 하단 공급업체 범례.
  - `mat_gr_grn_monthly_sum_by_item`: [월별 입고내역 집계 (Item별)] — 월별 그리드.
  - `mat_gr_grn_daily_sum_by_item`: [일별 입고내역 집계 (Item별)] — 일별 그리드.
  - `mat_gr_grn_related_setup`: [입고 관련 설정] — 팝업 형태 설정 화면(무검사 자동 입고확정·라벨 자동발행·합격시 자동 입고확정).
  - `mat_gr_sims_unconfirmed_material_find`: [SIMS 미확인 자재 찾기] — 검색 정보 영역 + 처리 결과 Ready 패널 + 하단 그리드.
  - `mat_gr_import_decl_total_amt_mgmt`: [수입신고 총액 관리] — 단일 그리드, showFilterSave={true}.
### 변경된 파일
- `renderer/src/screens/mat/mat_gr_material_grn_confirm_cancel.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_hist_edit.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_hist_inq_by_tid.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_daily_sum.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_qty_sum_by_period.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_tid_location_inq_by_grn.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_material_label_issue.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_material_label_reissue.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_split_material_label_issue.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_material_label_issue_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_material_label_reissue_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_split_material_label_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_material_grn_cancel_by_label.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_material_label_dispose.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_monthly_sum_by_part_class.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_monthly_sum_by_vendor.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_monthly_sum_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_daily_sum_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_grn_related_setup.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_sims_unconfirmed_material_find.tsx` (신규)
- `renderer/src/screens/mat/mat_gr_import_decl_total_amt_mgmt.tsx` (신규)

## 2026-04-02 (자재관리 가입고관리 mat_prein 8화면 재작성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더의 가입고관리(mat_prein_*) 8화면을 PNG 기반으로 재작성.
  - `mat_prein_pre_grn_reg_cancel_manual`: [가입고 등록 및 취소 (수작업)] — 상단 그리드 + 하단 가입고 정보 상세 폼(Save/Delete). 필터: 입고 미확정만 보기, 현장 미출고만 보기, 입고일 범위, 부품분류/하위분류, 고객사/공급업체 라디오, Item 코드, Maker PartNo, 규격. 23행 목업.
  - `mat_prein_pre_grn_lot_label_issue`: [가입고 및 LOT 라벨 발행] — 좌측(등록 폼 + 하단 그리드) + 우측(바코드 프린터 설정/출력정보/주석). absolute→flex 레이아웃 수정. 등록옵션/스카너/FDA/수작업 라디오, 필수입력 노란 배경.
  - `mat_prein_pre_grn_hist_inq`: [가입고 내역조회] — 단일 그리드, 입고일자 범위, 고객사 라디오, 공급업체/부품분류/하위분류 전체, Item 코드/Maker PartNo/Item 명/업체 LOT/규격. 20행 목업.
  - `mat_prein_pre_grn_hist_inq_by_tid`: [LOT No별 가입고 내역조회] — 단일 그리드, 동일 필터 패턴. 20행 목업.
  - `mat_prein_pre_grn_daily_sum`: [일자별 가입고내역 집계] — 단일 그리드, 가입고일자 범위, ERP 코드, Item 명, 고객사 라디오, 입고 미확정만 보기 체크, 규격. 1행 목업.
  - `mat_prein_pre_grn_cancel_hist_inq`: [가입고 취소 내역조회] — 단일 그리드, 취소일자 범위, 열 순서 수정(수량/상태/검사종류/Week). 20행 목업.
  - `mat_prein_insp_wait_sample_qty_inq`: [검사대기용 샘플 수량 조회] — 단일 그리드, 누락된 입고수량 열 추가. 2행 목업.
  - `mat_prein_manual_barcode_issue`: [수기 바코드 발행] — 좌측 그리드(✓ 체크열 추가) + 우측 바코드 프린터/출력정보 패널. 2행 목업.
### 변경된 파일
- `renderer/src/screens/mat/mat_prein_pre_grn_reg_cancel_manual.tsx` (재작성)
- `renderer/src/screens/mat/mat_prein_pre_grn_lot_label_issue.tsx` (재작성)
- `renderer/src/screens/mat/mat_prein_pre_grn_hist_inq.tsx` (재작성)
- `renderer/src/screens/mat/mat_prein_pre_grn_hist_inq_by_tid.tsx` (재작성)
- `renderer/src/screens/mat/mat_prein_pre_grn_daily_sum.tsx` (재작성)
- `renderer/src/screens/mat/mat_prein_pre_grn_cancel_hist_inq.tsx` (재작성)
- `renderer/src/screens/mat/mat_prein_insp_wait_sample_qty_inq.tsx` (재작성)
- `renderer/src/screens/mat/mat_prein_manual_barcode_issue.tsx` (재작성)

## 2026-04-02 (자재관리 MSL자재 mat_msl 18화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 MSL자재 18화면 신규 구현.
  - `mat_msl_msl_material_list`: [MSL 자재 목록] — 단일 그리드, MSL 등급 체크박스 필터, 조회 전용.
  - `mat_msl_msl_open_mgmt`: [MSL 개봉 관리] — 개봉 정보 영역(스캔/자동저장) + 처리 결과 Ready 패널 + 그리드.
  - `mat_msl_msl_open_hist`: [MSL 개봉 내역] — 단일 그리드, MSL 체크·잔여시간·LOT No 필터, 조회 전용.
  - `mat_msl_msl_material_mgmt_hub`: [MSL 자재 관리 통합] — 3영역(현장 개봉 + 제습함 내 자재 + 베이킹 중 자재), 탭(개봉/재고소진).
  - `mat_msl_msl_stock_deplete_hist_inq`: [MSL 재고 소진 이력 조회] — 단일 그리드, 날짜 범위·Maker PartNo 라디오, 조회 전용.
  - `mat_msl_msl_combined_hist_inq`: [MSL 통합 이력 조회] — 단일 그리드, 입고일자 체크·부품분류·LOT No 필터, 조회 전용.
  - `mat_msl_dry_cabinet_mgmt`: [제습함 관리] — 단일 그리드, 스캔 TID→제습함 ID, 작업자 표시.
  - `mat_msl_dry_cabinet_material_hist`: [제습함내 자재 내역] — 단일 그리드, 제습함·ERP 코드·TID 필터, 조회 전용.
  - `mat_msl_dry_cabinet_material_status_v`: [제습함내 자재 현황] — 3단 그리드(현재 자재·이력·상세), 조회 전용.
  - `mat_msl_dry_cabinet_io_status`: [제습함 입출고 현황] — 단일 그리드, 날짜 범위·제습함·TID 필터, 조회 전용.
  - `mat_msl_baking_profile_by_material`: [자재별 베이킹 환경정보] — 단일 그리드, MSL 자재만 보기 라디오·온도/MIN/MAX 필터.
  - `mat_msl_baking_profile_change_hist`: [자재별 베이킹 환경정보 변경 이력] — 단일 그리드, 온도/MIN/MAX 라디오 필터, 조회 전용.
  - `mat_msl_baking_mgmt`: [베이킹 관리] — 단일 그리드, 알람Test/TEST 탭, 스캔 TID, 장비 포트.
  - `mat_msl_baking_io_status`: [베이킹 입출고 현황] — 단일 그리드, 날짜 범위·베이킹 장비·TID 필터, 조회 전용.
  - `mat_msl_baking_error_hist`: [베이킹 오류발생 이력] — 단일 그리드, 오류발생일자 범위·고객사 필터, 조회 전용.
  - `mat_msl_baking_related_setup`: [베이킹 관련 설정] — 그리드 + Baking 관련 설정 팝업(입고 가능 횟수·알람 설정 등).
  - `mat_msl_vacuum_pack_mgmt`: [진공포장 관리] — 단일 그리드, 스캔 TID, 작업자 표시.
  - `mat_msl_vacuum_pack_hist_inq`: [진공포장 이력 조회] — 단일 그리드, 포장일자 범위·진공포장 장비 필터, 조회 전용.
- `renderer/src/screens/mat/registry.ts`에 18개 화면 lazy 등록.
### 변경된 파일
- `renderer/src/screens/mat/mat_msl_msl_material_list.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_msl_open_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_msl_open_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_msl_material_mgmt_hub.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_msl_stock_deplete_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_msl_combined_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_dry_cabinet_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_dry_cabinet_material_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_dry_cabinet_material_status_v.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_dry_cabinet_io_status.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_baking_profile_by_material.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_baking_profile_change_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_baking_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_baking_io_status.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_baking_error_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_baking_related_setup.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_vacuum_pack_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_msl_vacuum_pack_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/registry.ts` (수정 — 18개 화면 lazy 등록 추가)

## 2026-04-02 (자재관리 수입검사 mat_iqc 14화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 수입검사 14화면 신규 구현.
  - `mat_iqc_insp_required_inq_by_item`: [Item별 검사여부 조회] — 단일 그리드, 라디오(수급사물/수급사봄) 필터, 조회 전용.
  - `mat_iqc_insp_item_inq_by_item`: [Item별 검사항목 조회] — 상하 분할(부품 목록 + 검사 항목), 조회 전용.
  - `mat_iqc_defect_item_inq_by_item`: [Item별 불량항목 조회] — 상하 분할(부품 목록 + 불량 항목), 조회 전용.
  - `mat_iqc_iqc_result_bulk_proc`: [수입검사 결과 일괄 처리] — 단일 그리드 + 판정 라디오 + Save/Delete 버튼, 날짜 범위·검사 상태 필터.
  - `mat_iqc_iqc_result_reg`: [수입검사 결과 등록] — 상단 그리드 + 하단 좌측 상세 폼 + 우측 검사 항목 그리드 + 버튼 열(Save·Delete·판정변경 등).
  - `mat_iqc_iqc_result_inq`: [수입검사 결과 조회] — result_reg와 유사한 3영역 레이아웃, 조회 전용(readOnly).
  - `mat_iqc_iqc_hist_inq_by_date`: [일자별 수입검사 내역 조회] — 단일 그리드, 날짜 범위 필터, 조회 전용.
  - `mat_iqc_iqc_status_by_period`: [기간별 수입검사 현황] — 단일 그리드(합계 행 포함), 날짜 범위 필터, 조회 전용.
  - `mat_iqc_iqc_status_sum_by_period`: [기간별 수입검사 현황 집계] — 단일 그리드(합계 행), 날짜 범위 필터, 조회 전용.
  - `mat_iqc_iqc_quality_daily`: [일별 수입검사 품질 현황] — 상하 분할(그리드 + 바 차트), 월 선택 필터, 조회 전용.
  - `mat_iqc_defect_hist_inq_by_type`: [유형별 불량내역 조회] — 상하 분할(그리드 + 차트), 월 선택 필터, 조회 전용.
  - `mat_iqc_iqc_spec_reg`: [수입검사 기준서 등록] — 단일 그리드, 등록기준 라디오, 파일 열.
  - `mat_iqc_iqc_spec_inq`: [수입검사 기준서 조회] — 단일 그리드, 조회기준 라디오, 조회 전용.
  - `mat_iqc_quality_judgment_setup`: [품질판단 설정] — 그리드 + Setting 버튼 → 모달 팝업(검사결과 수치등록·자동출하·차트유형·검사수준별 횟수·파일 경로·PPM 수식).
- `renderer/src/screens/mat/registry.ts`에 14개 화면 lazy 등록.
### 변경된 파일
- `renderer/src/screens/mat/mat_iqc_insp_required_inq_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_insp_item_inq_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_defect_item_inq_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_result_bulk_proc.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_result_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_result_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_hist_inq_by_date.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_status_by_period.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_status_sum_by_period.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_quality_daily.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_defect_hist_inq_by_type.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_spec_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_iqc_spec_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_iqc_quality_judgment_setup.tsx` (신규)
- `renderer/src/screens/mat/registry.ts` (수정 — 14개 lazy 등록 추가)

---

## 2026-04-02 (자재관리 가입고관리 mat_prein 8화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 가입고관리 8화면 신규 구현.
  - `mat_prein_pre_grn_reg_cancel_manual`: [가입고 등록 및 취소 (수작업)] — 상단 그리드(22행) + 하단 '가입고 정보' 상세 폼 + 우측 Save/Delete 버튼.
  - `mat_prein_pre_grn_lot_label_issue`: [가입고 및 LOT 라벨 발행] — 상단 등록 폼 + 하단 그리드 + 우측 바코드 프린터/출력정보 패널.
  - `mat_prein_pre_grn_hist_inq`: [가입고 내역조회] — 단일 그리드(20행), 조회 전용.
  - `mat_prein_pre_grn_hist_inq_by_tid`: [LOT No별 가입고 내역조회] — 단일 그리드(20행), 조회 전용.
  - `mat_prein_pre_grn_daily_sum`: [일자별 가입고내역 집계] — 단일 그리드(1행), 조회 전용.
  - `mat_prein_pre_grn_cancel_hist_inq`: [가입고 취소 내역조회] — 단일 그리드(20행), 조회 전용.
  - `mat_prein_insp_wait_sample_qty_inq`: [검사대기용 샘플 수량 조회] — 단일 그리드(2행), 조회 전용.
  - `mat_prein_manual_barcode_issue`: [수기 바코드 발행] — 좌측 그리드(2행) + 우측 바코드 프린터/출력정보 패널.
- 모든 화면은 `MesScreenShell` + `MesDataGridPanel` 공통 패턴 사용, PNG 이미지 분석 후 필터·그리드 열·목업 데이터 반영.
- `renderer/src/screens/mat/registry.ts`에 8개 화면 lazy 등록.
### 변경된 파일
- `renderer/src/screens/mat/mat_prein_pre_grn_reg_cancel_manual.tsx` (신규)
- `renderer/src/screens/mat/mat_prein_pre_grn_lot_label_issue.tsx` (신규)
- `renderer/src/screens/mat/mat_prein_pre_grn_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_prein_pre_grn_hist_inq_by_tid.tsx` (신규)
- `renderer/src/screens/mat/mat_prein_pre_grn_daily_sum.tsx` (신규)
- `renderer/src/screens/mat/mat_prein_pre_grn_cancel_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_prein_insp_wait_sample_qty_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_prein_manual_barcode_issue.tsx` (신규)
- `renderer/src/screens/mat/registry.ts` (수정 — 8개 lazy 등록 추가)

---

## 2026-04-02 (자재관리 자재정보 mat_item 7화면 + 자재단가관리 mat_price 7화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 자재정보 7화면 + 자재단가관리 7화면, 총 14개 화면 신규 구현.
  - **자재정보 (mat_item) 7개:**
    - `mat_item_material_master_reg`: 자재Master 등록 — 상단 그리드(21행) + 하단 '자재 정보' 상세 폼(5열 멀티행) + 우측 버튼열(Save/엑셀 업로드/엑셀도 양식/Maker PartNo).
    - `mat_item_item_attr_bulk_edit`: Item 속성 일괄 편집 — 개별/속성통합/포장단위 라디오, 다중편집 모드, 단일 그리드(25행).
    - `mat_item_maker_part_no_reg`: Maker PartNo 등록 — 좌측 Item 목록 + 우측 상단 그리드(2행) + 하단 Maker PartNo 정보 상세(parse 필드 테이블 9행) + Save.
    - `mat_item_maker_part_no_bulk_reg`: Maker PartNo 일괄 등록 — 상단 Maker PartNo 정보 + 선택/편집 모드 + 하단 그리드(24행) + Save/Delete.
    - `mat_item_material_inq_by_vendor`: 공급업체별 자재 조회 — 공급업체별/Maker별/자재별 라디오, 단일 그리드(25행), 조회 전용.
    - `mat_item_maker_barcode_use_setup`: Maker Barcode 사용 설정 — 부품분류/하위분류 필터, 체크박스 그리드(36행).
    - `mat_item_material_label_issue_qty_setup`: 자재라벨 발행 수량 설정 — 부품분류/하위분류 필터, 기본 발행수량 그리드(36행).
  - **자재단가관리 (mat_price) 7개:**
    - `mat_price_exchange_rate_hist_inq`: 환율이력 조회 — 날짜 범위/통화 필터, 단일 그리드(3행), 조회 전용.
    - `mat_price_material_price_mgmt`: 자재단가 관리 — 좌측 그리드(15행) + 우측 자재정보 상세(변경섬/New/Save/Delete) + 하단 변경이력 그리드(3행).
    - `mat_price_material_price_excel_upload`: 자재단가 Excel Upload — 선택/편집 모드, 엑셀 업로드/양식/Save/Delete, 변경전·후 2단 헤더 그리드.
    - `mat_price_material_price_confirm`: 자재단가 확정 — 미확정/확정 라디오, 날짜 범위, 승인자, 일괄확정/확정취소, 변경전·후 2단 헤더 그리드(1행).
    - `mat_price_material_price_inq`: 자재단가 조회 — 단가등록/미등록 자재 라디오, 단일 그리드(21행), 조회 전용.
    - `mat_price_material_price_change_hist_inq`: 자재단가 변경 이력 조회 — 등록일자 범위, 다중 필터, 단일 그리드(25행), 조회 전용.
    - `mat_price_material_price_job_hist_inq`: 단가 변경 작업 이력 조회 — 작업일자 범위, 단일 그리드(35행), 조회 전용.
- 모든 화면은 `MesScreenShell` + `MesDataGridPanel` 공통 패턴 사용, PNG 이미지 분석 후 필터·그리드 열·목업 데이터 반영.
### 변경된 파일
- `renderer/src/screens/mat/mat_item_material_master_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_item_item_attr_bulk_edit.tsx` (신규)
- `renderer/src/screens/mat/mat_item_maker_part_no_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_item_maker_part_no_bulk_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_item_material_inq_by_vendor.tsx` (신규)
- `renderer/src/screens/mat/mat_item_maker_barcode_use_setup.tsx` (신규)
- `renderer/src/screens/mat/mat_item_material_label_issue_qty_setup.tsx` (신규)
- `renderer/src/screens/mat/mat_price_exchange_rate_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_excel_upload.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_confirm.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_change_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_job_hist_inq.tsx` (신규)

---

## 2026-04-02 (자재관리 기초정보 mat_base 13화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 기초정보 화면 13개 신규 구현.
  - **부품분류코드 관리:**
    - `mat_base_part_class_code_mgmt`: 부품분류코드 관리 — 좌측 부품분류코드 그리드(5행) + 우측 하위분류 그리드(35행), 사이드 바이 사이드 레이아웃.
  - **검사항목 등록 (mat_base_insp_item) 5개:**
    - `mat_base_insp_item_reg`: 검사항목 정보 등록 — 단일 전체 너비 그리드(34행), 텍스트/라디오/체크박스 필터, 하단 상태바.
    - `mat_base_insp_item_change_hist`: 검사항목 변경이력 조회 — 날짜 범위 필터, 단일 그리드(3행), 조회 전용.
    - `mat_base_insp_item_reg_by_class`: 부품분류별 검사항목 등록 — 3영역(상단 부품분류 3행 + 하단좌 검사항목 17행 + 하단우 선택항목 1행), >>/<< 이동 버튼.
    - `mat_base_insp_item_reg_by_item`: Item별 검사항목 등록 — 3영역(상단 Item 14행 + 하단좌 검사항목 18행 + 하단우 선택항목), >>/<< 이동 버튼.
  - **불량항목 등록 (mat_base_defect_code) 4개:**
    - `mat_base_defect_code_reg`: 불량항목 등록 — 단일 그리드(30행), 항목구분=수입검사 필터.
    - `mat_base_defect_code_change_hist`: 불량항목 변경이력 — 날짜 범위 필터, 단일 그리드(3행), 조회 전용.
    - `mat_base_defect_code_reg_by_class`: 부품분류별 불량항목 등록 — 3영역(상단 3행 + 하단좌 불량항목 18행 + 하단우 선택항목), >>/<< 이동 버튼.
    - `mat_base_defect_code_reg_by_item`: Item별 불량항목 등록 — 3영역(상단 Item 14행 + 하단좌 불량항목 17행 + 하단우 선택항목), >>/<< 이동 버튼.
  - **샘플링 기준 (mat_base_sampling) 4개:**
    - `mat_base_sampling_insp_std`: 샘플링 검사기준 — 필터 없음(Search/Save만), AQL 0.010 타이틀, 단일 그리드(16행).
    - `mat_base_sampling_std_by_item`: Item별 샘플링 기준 — 부품분류/ERP코드/Item명/하위분류/규격 필터, 단일 그리드(34행).
    - `mat_base_sampling_std_by_vendor`: 공급업체별 샘플링 기준 — 공급업체 추가 필터 + 변경할 샘플링 기준/변경사유 행, 단일 그리드(32행).
    - `mat_base_sampling_std_change_hist_by_item`: Item별 샘플링 기준 변경이력 — 날짜 범위 + 다중 필터, 단일 그리드(3행), 조회 전용.
- 모든 화면은 `MesScreenShell` + `MesDataGridPanel` 공통 패턴 사용, PNG 이미지 분석 후 필터·그리드 열·목업 데이터 반영.
### 변경된 파일
- `renderer/src/screens/mat/mat_base_part_class_code_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_change_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_reg_by_class.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_reg_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_change_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_reg_by_class.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_reg_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_insp_std.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_std_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_std_by_vendor.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_std_change_hist_by_item.tsx` (신규)

## 2026-04-02 (자재관리 자재정보 mat_item 7화면 + 자재단가관리 mat_price 7화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더에 자재관리 모듈 자재정보·자재단가관리 화면 14개 신규 구현.
  - **자재정보 (mat_item) 7개:**
    - `mat_item_material_master_reg`: 자재Master 등록 — 상단 그리드(21행) + 하단 '자재 정보' 상세 폼, 우측 Save/엑셀 업로드/Maker PartNo 버튼.
    - `mat_item_item_attr_bulk_edit`: Item 속성 일괄 편집 — 개별/다중 편집 모드, 속성항목 콤보, 단일 그리드(25행).
    - `mat_item_maker_part_no_reg`: Maker PartNo 등록 — 좌측 Item 목록(20행) + 우측 교차표 그리드 + 바코드 설정 폼.
    - `mat_item_maker_part_no_bulk_reg`: Maker PartNo 일괄 등록 — 상단 PartNo 정보 폼 + 하단 그리드(24행), Save/Delete 버튼.
    - `mat_item_material_inq_by_vendor`: 공급업체별 자재 조회 — 4가지 조회 모드 라디오, 단일 그리드(20행), 조회 전용.
    - `mat_item_maker_barcode_use_setup`: Maker Barcode 사용 설정 — 단일 그리드(36행), 체크박스 열(Maker Barcode사용/다른/개별).
    - `mat_item_material_label_issue_qty_setup`: 자재라벨 발행 수량 설정 — 단일 그리드(36행), 기본 발행수량 열.
  - **자재단가관리 (mat_price) 7개:**
    - `mat_price_exchange_rate_hist_inq`: 환율이력 조회 — 날짜 범위+통화 필터, 단일 그리드(3행), 조회 전용.
    - `mat_price_material_price_mgmt`: 자재단가 관리 — 좌측 그리드(16행) + 우측 상세 패널(자재정보·변경정보·New/Save/Delete) + 하단 변경이력 그리드(3행).
    - `mat_price_material_price_excel_upload`: 자재단가 Excel Upload — 선택/편집 모드 토글, 엑셀 업로드/양식/Save/Delete, 빈 그리드.
    - `mat_price_material_price_confirm`: 자재단가 확정 — 미확정/확정 라디오, 승인자 표시, 단가확정/확정취소 버튼, 그리드(1행).
    - `mat_price_material_price_inq`: 자재단가 조회 — 등록/미등록 라디오, 단일 그리드(20행), 조회 전용.
    - `mat_price_material_price_change_hist_inq`: 자재단가 변경 이력 조회 — 날짜 범위 필터, 그리드(26행), 조회 전용.
    - `mat_price_material_price_job_hist_inq`: 단가 변경 작업 이력 조회 — 작업일자 범위 필터, 그리드(34행), 조회 전용.
- 모든 화면은 `MesScreenShell` + `MesDataGridPanel` 공통 패턴 사용, PNG 이미지 분석 후 필터·그리드 열·목업 데이터 반영.
### 변경된 파일
- `renderer/src/screens/mat/mat_item_material_master_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_item_item_attr_bulk_edit.tsx` (신규)
- `renderer/src/screens/mat/mat_item_maker_part_no_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_item_maker_part_no_bulk_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_item_material_inq_by_vendor.tsx` (신규)
- `renderer/src/screens/mat/mat_item_maker_barcode_use_setup.tsx` (신규)
- `renderer/src/screens/mat/mat_item_material_label_issue_qty_setup.tsx` (신규)
- `renderer/src/screens/mat/mat_price_exchange_rate_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_excel_upload.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_confirm.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_change_hist_inq.tsx` (신규)
- `renderer/src/screens/mat/mat_price_material_price_job_hist_inq.tsx` (신규)

---

## 2026-04-02 (자재관리 기초정보 mat_base 13화면 신규 생성)
### 작업 내용
- `renderer/src/screens/mat/` 폴더 생성 후 자재관리 모듈 기초정보 화면 13개 신규 구현.
  - **mat_base_part_class_code_mgmt**: 부품분류코드 관리 — 좌우 사이드바이사이드 그리드 (좌: 부품분류 5행, 우: 하위분류 35행).
  - **mat_base_insp_item_reg**: 검사항목 등록 — 단일 그리드 33행, 상단 입력형태 안내·하단 상태바.
  - **mat_base_insp_item_change_hist**: 검사항목 변경이력 — 날짜 범위+항목구분 필터, 3행 샘플.
  - **mat_base_insp_item_reg_by_class**: 부품분류별 검사항목 등록 — 3영역(상단 3행, 하단좌 17행, 하단우 1행) + >>/<< 이동 버튼.
  - **mat_base_insp_item_reg_by_item**: Item별 검사항목 등록 — 3영역(상단 14행, 하단좌 18행, 하단우 1행).
  - **mat_base_defect_code_reg**: 불량항목 등록 — 단일 그리드 30행.
  - **mat_base_defect_code_change_hist**: 불량항목 변경이력 — 날짜 범위 필터, 3행.
  - **mat_base_defect_code_reg_by_class**: 부품분류별 불량항목 등록 — 3영역(상단 3행, 하단좌 18행, 하단우 빈).
  - **mat_base_defect_code_reg_by_item**: Item별 불량항목 등록 — 3영역(상단 14행, 하단좌 17행, 하단우 빈).
  - **mat_base_sampling_insp_std**: 샘플링 검사기준 — 단일 그리드 16행, AQL 타이틀, 필터 없음.
  - **mat_base_sampling_std_by_item**: Item별 샘플링 기준 — 단일 그리드 35행.
  - **mat_base_sampling_std_by_vendor**: 공급업체별 샘플링 기준 — 상단 변경 샘플링/변경사유 행 + 그리드 32행.
  - **mat_base_sampling_std_change_hist_by_item**: Item별 샘플링 변경이력 — 날짜 범위 필터, 3행, Save 숨김.
- 모든 화면은 `MesScreenShell` + `MesDataGridPanel` + `useMesGridRowSelection` 공통 패턴 사용.
- PNG 이미지 분석 후 각 화면의 필터·그리드 열·샘플 데이터를 최대한 반영.
### 변경된 파일
- `renderer/src/screens/mat/mat_base_part_class_code_mgmt.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_change_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_reg_by_class.tsx` (신규)
- `renderer/src/screens/mat/mat_base_insp_item_reg_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_reg.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_change_hist.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_reg_by_class.tsx` (신규)
- `renderer/src/screens/mat/mat_base_defect_code_reg_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_insp_std.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_std_by_item.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_std_by_vendor.tsx` (신규)
- `renderer/src/screens/mat/mat_base_sampling_std_change_hist_by_item.tsx` (신규)
- `docs/CHANGELOG.md`, `docs/TODO.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (std_base_user_permission_mgmt 우 패널 탭 구조 재작성)
### 작업 내용
- `std_base_user_permission_mgmt.tsx` 우 패널을 탭 구조로 재구성.
  - **권한그룹 탭**: 상단 탭바 우측에 "권한그룹" PlainSelect 필터 + 멤버 그리드 1개.
  - **권한복사 탭**: 상단 탭바 우측에 "부서" PlainSelect 필터(초기: 전체) + 상단 그리드(사용자 목록) + 하단 그리드(복사 대상, 빈 상태).
  - 탭 버튼: 활성 탭은 `border-b-2 border-blue-500 text-blue-600`, 비활성은 회색.
  - `PERM_GROUP_OPTIONS`·`DEPT_OPTIONS` 상수 정의.
  - `rightTab`·`filterGroup`·`filterCopyDept` 상태 추가.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (std_base_user_permission_mgmt PNG 기준 전면 재구성)
### 작업 내용
- `std_base_user_permission_mgmt.tsx` 전면 재작성 (`docs/image/std_base_user_permission_mgmt.png` 분석 기준).
  - 레이아웃: 좌(40%) 전체 사용자 그리드 + 하단 사용자 권한그룹 목록 / 우(60%) 권한그룹 내부 필터(select) + 멤버 그리드.
  - 필터바: 부서 PlainInput + 전체 버튼.
  - 우 패널 내부 필터: 권한그룹 PlainSelect (자체 권리자 등 5개 옵션).
  - 하단 좌: amber 헤더 "사용자 이름 : {name}" + "사용자 권한그룹" 서브 타이틀 + 목록.
  - useState로 부서 필터·선택 그룹·선택 사용자 인덱스·이름 관리.
- `stdPngSampleData.ts`: 신규 export 3개 추가.
  - `STD_USER_PERM_USER_LIST`: PNG 좌측 그리드 29행 (사용자ID·사용자이름·부서·직급).
  - `STD_USER_PERM_GROUP_MEMBERS`: PNG 우측 그리드 11행 ("자체 권리자" 멤버).
  - `STD_USER_PERM_GROUPS_OF_USER`: 선택 사용자 권한그룹 목록 4개.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_permission_mgmt.tsx` (전면 재작성)
- `renderer/src/screens/std/stdPngSampleData.ts`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (변경 없음 감지 useDirtyCheck 구현 및 일괄 적용)
### 작업 내용
- `renderer/src/lib/useDirtyCheck.ts` 신규 생성: `snapshot()`·`isDirty()`·`clear()` 제공 범용 훅. JSON.stringify 직렬화 비교로 string[]·객체 모두 지원.
- `std_base_user_mgmt.tsx`: `useDirtyCheck<string[]>()` 적용.
  - `applySelectionAfterLoad`·`onSelectRow`에서 `snapshotDetail()` 호출.
  - `onSortChange`·`startNewUser`에서 `clearDetail()` 호출.
  - `runSave`에 기존 사용자 + 변경 없음 체크 추가 (`!isDetailDirty && !pChanged && !cChanged`).
- `std_base_common_code_mgmt.tsx`: `useDirtyCheck<CommonCodeDetail>()` 적용.
  - 동일 위치에 `snapshotDetail()`·`clearDetail()` 추가.
  - `runSave`에 기존 코드 + 변경 없음 체크 추가.
- `docs/LAYOUT_RULES.md`: "폼 저장 — 변경 없음 감지" 섹션 추가.
### 변경된 파일
- `renderer/src/lib/useDirtyCheck.ts` (신규)
- `renderer/src/screens/std/std_base_user_mgmt.tsx`
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/LAYOUT_RULES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (std_base_user_mgmt 사용자 정보 열 비율·colspan 적용)
### 작업 내용
- `std_base_user_mgmt.tsx`: 5열 그리드 열 비율 및 colspan 재구성.
  - `grid-cols-5` → `grid-cols-[2fr_2fr_1fr_1fr_2fr]` (2:2:1:1:2 비율).
  - Row2 IP Address: 단독 col3 → `col-span-2` 래퍼(col3+4 병합).
  - Row3 이니셜: 단독 col3 → `col-span-2` 래퍼(col3+4 병합).
  - Row4: 퇴사(col3) / Activity(col4) 개별 유지.
  - Row5 주소: 단독 col1 → `col-span-2` 래퍼(col1+2 병합).
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (std_base_user_mgmt 사용자 정보 5행×5열 재배치)
### 작업 내용
- `std_base_user_mgmt.tsx`: 사용자 정보 영역을 5열 5행 CSS Grid로 재구성.
  - `grid-cols-4` → `grid-cols-5` 변경.
  - 기존 Col3 인라인 flex(퇴사+Activity 한 셀)를 **Col3=퇴사▼, Col4=Activity▼** 개별 셀로 분리.
  - Description(Col5)을 row-span-4 textarea로 배치, E-Mail(Col5 row1)과 세로 분리.
  - Row1 Col3·Col4, Row2·Row3 Col4에 빈 `<div />` placeholder 삽입하여 auto-flow 유지.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (std_base_user_mgmt 사용자 정보 5행×4열 재배치)
### 작업 내용
- `std_base_user_mgmt.tsx`: 사용자 정보 영역을 이미지 기준 5행×4열 CSS Grid로 완전 재구성.
  - **Password·Pass 체크**: 기존 별도 섹션(border-t 구분선) 폐지 → 메인 그리드 Col1 3·4행으로 통합.
  - **Description**: `col-span-2 PlainInput` → Col4 `row-span-4` `<textarea>` (row2~row5 전체 높이 활용).
  - **퇴사 + Activity**: 별도 행 → Col3 4행 단일 셀 내 인라인 flex 배치.
  - **Col3 Row1**: 빈 `<div />` placeholder로 자동-배치 유지.
  - 레이블 너비: Col1 `w-[68px]`, Col2 `w-[52px]`, Col3 `w-[76px]`, Col4 `w-[80px]`.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (std_base_user_mgmt 사용자 정보 영역 재구성)
### 작업 내용
- `stdFormBits.tsx`: `IpInput` 컴포넌트 추가 — 4세그먼트 IPv4 전용 입력(`.` 구분자 자동 이동, 숫자 전용, 세그먼트별 최대 3자리, BackSpace·ArrowKey 세그먼트 이동).
- `std_base_user_mgmt.tsx`:
  - `MesGridRowDetailFields` → 명시적 4열 그리드로 교체 (이미지 배치: 1행 사용자ID·사용자명·부서·직급, 2행 Mobile·전화번호·IP Address·이니셜, 3행 퇴사·Activated·주소·E-Mail, 4행 설명 col-span-4).
  - `IP Address` 필드: `IpInput` 적용.
  - 퇴사·Activated: `PlainSelect`(Y/N) 전환.
  - Password 영역: 구분선 아래 2열로 정렬.
  - `updateDetail` 헬퍼 콜백 추가.
  - `runSave` 사전 비밀번호 불일치 체크 추가 — mapper throw 이전에 명시적 `flashSaveBanner` 처리.
  - 불필요한 `MesGridRowDetailFields` import 제거, `AmberInput·IpInput·PlainSelect` import 추가.
### 변경된 파일
- `renderer/src/screens/std/stdFormBits.tsx`
- `renderer/src/screens/std/std_base_user_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (MesDataGridPanel 수직 스크롤바 너비 보정)
### 작업 내용
- `BaseFeatureScreen.tsx` `SimpleGridTable` — 수직 스크롤바 출현·소멸 시 `clientWidth`가 줄어도 `pxColWidths`가 갱신되지 않아 가로 스크롤이 추가로 생기던 문제 수정.
- `lastClientWidthRef`: `initPxColWidths` 계산 시점의 `clientWidth`를 기억.
- `pxColWidthsRef`: `pxColWidths` state를 ResizeObserver 콜백에서 stale closure 없이 읽기 위한 미러 ref (`useLayoutEffect` 동기화).
- ResizeObserver 콜백: `clientWidth`가 이전 값과 달라지면 각 열 너비를 비율 유지하며 재계산 후 `setPxColWidths` — 의존 배열에서 `pxColWidths` state 제거(ref로 대체), 불필요한 observer 재등록 제거.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (공통코드 초기 조회 1회로 통합)
### 작업 내용
- `std_base_common_code_mgmt.tsx` 초기 `useEffect`에서 `Promise.all([fetchTbCmCodes, fetchTbCmCodeGroups])` 이중 조회를 제거.
- `fetchTbCmCodes({})` 1회 결과에서 `code_group` 중복 제거·정렬로 `groupOptions`를 클라이언트 추출 → 네트워크 요청 2→1회.
- `tbCmCodeApi.ts`에서 불필요해진 `fetchTbCmCodeGroups` 함수 삭제.
### 변경된 파일
- `renderer/src/lib/tbCmCodeApi.ts`
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (공통코드 Group Code 필터 콤보박스 전환)
### 작업 내용
- `tbCmCodeApi.ts`: `fetchTbCmCodeGroups()` 추가 — 전체 코드 조회 후 `code_group` 중복 제거·정렬 반환.
- `std_base_common_code_mgmt.tsx`:
  - `groupOptions: string[]` 상태 추가.
  - 마운트 시 초기 조회와 동시에(`Promise.all`) 그룹 목록 로드 → `setGroupOptions`.
  - filterArea의 Group Code 입력을 `PlainInput` → `PlainSelect`로 교체; 첫 옵션은 `전체`(value=""), 이후 DB에서 얻은 그룹명 옵션.
  - 콤보박스 선택 후 검색 버튼 클릭 시 선택한 그룹으로 `fetchTbCmCodes` 필터링.
### 변경된 파일
- `renderer/src/lib/tbCmCodeApi.ts`
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-02 (모듈 창 단일 인스턴스 제한)
### 작업 내용
- `electron/main.cjs`에 `moduleWindows: Map<string, BrowserWindow>` 추가.
- `createModuleWindow()`: 같은 모듈의 창이 이미 열려 있으면 새 창을 만들지 않고 해당 창을 포커스(최소화 상태면 restore 후 focus).
- 창이 닫힐 때 `closed` 이벤트로 Map에서 항목 자동 제거.
### 변경된 파일
- `electron/main.cjs`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (조정일 한 줄 고정 원복)
### 작업 내용
- 사용자 피드백에 따라 `PrdInventoryMappedScreen`의 `prd_inv_qty_adj_hist_by_item` 조정일 필터 한 줄 고정(`inline-flex + nowrap`) 변경을 원복.
- 조정일 입력을 기존 구조(`FormLabelInput + ~ + date`)로 되돌림.
### 변경된 파일
- `renderer/src/screens/prd/PrdInventoryMappedScreen.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (재고조정이력 조정일 기간 한 줄 표시 보정)
### 작업 내용
- `PrdInventoryMappedScreen`의 `prd_inv_qty_adj_hist_by_item` 필터에서 `조정일 date ~ date` 입력을 `inline-flex + whitespace-nowrap` 한 묶음으로 변경.
- 조정일 기간이 줄바꿈되어 2줄로 깨지는 문제를 수정해 한 줄 표시를 보장.
### 변경된 파일
- `renderer/src/screens/prd/PrdInventoryMappedScreen.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (적용일 기간 필터 한 줄 표시)
### 작업 내용
- `PrdBomMappedScreen`의 적용일 범위 입력(`date ~ date`)을 한 묶음(`inline-flex` + `whitespace-nowrap`)으로 변경.
- `적용일 연도 ~ 연도`가 줄바꿈 없이 한 줄에 유지되도록 레이아웃 보정.
### 변경된 파일
- `renderer/src/screens/prd/PrdBomMappedScreen.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 텍스트 정합 6차 — 화면 ID별 필터 라벨 보정)
### 작업 내용
- 제품관리 매핑 화면의 필터 라벨/표 제목을 화면 ID별로 세분화:
  - `PrdBomMappedScreen`: `codeLabel`·`nameLabel`·`revLabel`·`tableTitle` 분리
  - `PrdInventoryMappedScreen`: `codeLabel`·`nameLabel`·`tableTitle` 분리
  - `PrdItemNoMappedScreen`: `codeLabel`·`nameLabel`·`tableTitle` 분리
- 동일 입력 레이아웃에서 화면 성격(조회/상향/이력/상태관리)에 맞는 문구로 표시되도록 정리.
### 변경된 파일
- `renderer/src/screens/prd/PrdBomMappedScreen.tsx`
- `renderer/src/screens/prd/PrdInventoryMappedScreen.tsx`
- `renderer/src/screens/prd/PrdItemNoMappedScreen.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 상세 3화면 미세 정합 5차)
### 작업 내용
- 상세 구현 3개 화면에 PNG 정합 보정 추가:
  - `prd_itemno_item_attr_bulk_edit`: `showFilterSave` 활성화, `colWidths`·`tableTitle` 적용
  - `prd_inv_qty_adj_by_item`: 14열 `colWidths`·`tableTitle` 적용
  - `prd_bom_ebom_reg_edit`: 상·하단 그리드 각각 `colWidths`·`tableTitle` 적용
- 그리드 열폭 고정으로 화면별 가독성과 원본 캡처 대비 레이아웃 일치도를 추가 개선.
### 변경된 파일
- `renderer/src/screens/prd/prd_itemno_item_attr_bulk_edit.tsx`
- `renderer/src/screens/prd/prd_inv_qty_adj_by_item.tsx`
- `renderer/src/screens/prd/prd_bom_ebom_reg_edit.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 재고/품번 화면군 PNG 정합 4차)
### 작업 내용
- `PrdInventoryMappedScreen` 고도화:
  - 화면 ID별 컬럼 폭(`colWidths`) 분리
  - 화면별 존 라벨/옵션(`창고`/`공정`) 분리
  - 조정 이력 화면(`prd_inv_qty_adj_hist_by_item`)에 기간 필터 추가
- `PrdItemNoMappedScreen` 고도화:
  - 화면 ID별 컬럼 폭(`colWidths`) 분리
  - 화면별 분류 라벨/옵션(`품번분류`/`자재분류`) 분리
  - BOM 생성현황 화면에 상태 필터(`생성완료/미생성`) 추가
### 변경된 파일
- `renderer/src/screens/prd/PrdInventoryMappedScreen.tsx`
- `renderer/src/screens/prd/PrdItemNoMappedScreen.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 BOM 화면군 PNG 정합 3차)
### 작업 내용
- `PrdBomMappedScreen`을 화면 ID별 설정 강화:
  - 화면별 컬럼 폭(`colWidths`) 분리
  - 화면별 필터 동작 분리(일부 화면 적용일자 기간 필터, 일부 화면 사용여부 필터)
  - 화면별 필터 라벨(`usageFilterLabel`) 분리
- BOM 일괄변경/이력/조회/상향식/사용관리/Prod BOM 계열의 시각적 차이를 확대해 PNG 정합도를 개선.
### 변경된 파일
- `renderer/src/screens/prd/PrdBomMappedScreen.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 잔여 13개 화면 세분화 매핑)
### 작업 내용
- 제품관리의 남은 `prd_*` 화면을 화면 ID별 설정 컴포넌트로 세분화:
  - `PrdBomMappedScreen` (EBOM/Prod BOM 조회·상향·사용·일괄변경·이력)
  - `PrdInventoryMappedScreen` (재고조회·재공조회·재고조정이력)
  - `PrdItemNoMappedScreen` (품번별 BOM 생성현황·자재Master 등록)
- `prd/registry.tsx`의 `PRD_SPECIAL`·매핑 세트를 확장해 제품관리 17개 화면이 그룹 공통이 아닌 화면군별 전용 구조로 열리도록 조정.
- 빌드 오류(컴포넌트 props 타입 불일치) 수정: 레지스트리에는 `screenId`를 클로저로 고정한 래퍼 컴포넌트를 등록.
### 변경된 파일
- `renderer/src/screens/prd/PrdBomMappedScreen.tsx` (신규)
- `renderer/src/screens/prd/PrdInventoryMappedScreen.tsx` (신규)
- `renderer/src/screens/prd/PrdItemNoMappedScreen.tsx` (신규)
- `renderer/src/screens/prd/registry.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 3개 화면 PNG 정합 상세 구현 추가)
### 작업 내용
- 제품관리 화면 중 PNG 기준으로 우선 3개를 상세 구현:
  - `prd_itemno_item_attr_bulk_edit` (품번 속성 일괄 편집)
  - `prd_inv_qty_adj_by_item` (품번별 재고 수량 조정)
  - `prd_bom_ebom_reg_edit` (EBOM 등록 및 수정: 상·하단 그리드 + 중간 작업정보)
- 제품관리 레지스트리(`PRD_SPECIAL`)에 위 3개를 상세 화면으로 연결하고, 나머지 화면은 그룹 전용 공통 화면 유지.
### 변경된 파일
- `renderer/src/screens/prd/prd_itemno_item_attr_bulk_edit.tsx` (신규)
- `renderer/src/screens/prd/prd_inv_qty_adj_by_item.tsx` (신규)
- `renderer/src/screens/prd/prd_bom_ebom_reg_edit.tsx` (신규)
- `renderer/src/screens/prd/registry.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 화면 17개 2차 고도화 — 그룹별 전용 레이아웃)
### 작업 내용
- 제품관리 화면을 단일 공통 화면에서 `품번관리 / BOM관리 / 재고관리` 그룹별 전용 화면으로 분리(`PrdItemNoFeatureScreen`, `PrdBomFeatureScreen`, `PrdInventoryFeatureScreen`).
- 제품관리 레지스트리에서 화면 ID prefix(`prd_itemno_`, `prd_bom_`, `prd_inv_`) 기반으로 전용 컴포넌트를 매핑하고, `prd_itemno_item_no_mgmt_fg_semi` 상세 구현은 유지.
- 레이아웃 규칙(`MesSearchSaveBar` 필터 정렬, `MesDataGridPanel`, `MesGridRowDetailForm`)을 유지한 채 제품관리 전 하위메뉴 진입 품질을 개선.
### 변경된 파일
- `renderer/src/screens/prd/registry.tsx`
- `renderer/src/screens/prd/PrdItemNoFeatureScreen.tsx` (신규)
- `renderer/src/screens/prd/PrdBomFeatureScreen.tsx` (신규)
- `renderer/src/screens/prd/PrdInventoryFeatureScreen.tsx` (신규)
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (제품관리 전 하위메뉴 화면 생성/연결)
### 작업 내용
- 제품관리 `manual.csv` 하위메뉴 17개 화면 ID를 `PRD_FEATURE_SCREEN_REGISTRY`로 일괄 연결.
- `prd_itemno_item_no_mgmt_fg_semi`는 기존 PNG 정합 상세 화면을 유지하고, 나머지 16개는 `PrdGenericFeatureScreen` 공통 골격으로 생성.
- 메뉴 클릭 시 제품관리 하위메뉴가 더 이상 경고 팝업으로 떨어지지 않고 화면이 열리도록 복구.
### 변경된 파일
- `renderer/src/screens/prd/registry.tsx` (신규)
- `renderer/src/screens/registry.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (배포 경량화 — 화면 ID PNG 번들 제외 적용)
### 작업 내용
- 화면 PNG 기반 판정/목록 유틸 파일(`screenPngPresence`, `mdiScreenIds`)을 제거해 `screenId.png`가 번들에 유입되지 않도록 정리.
- 렌더러 빌드 검증 결과, `renderer/dist/assets`에는 스플래시 필수 이미지(`bksoft`, `모듈_off`, `모듈_on`)만 남고 화면 ID PNG는 제외됨을 확인.
### 변경된 파일
- 삭제: `renderer/src/lib/screenPngPresence.ts`, `renderer/src/lib/mdiScreenIds.ts`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (화면 생성 정책 소급 적용 — 미구현 화면 메뉴 클릭 시 경고 팝업)
### 작업 내용
- 사용자 의도에 맞춰 기존 동작을 소급 적용: **기준정보(STD) 외 화면 레지스트리 매핑을 비활성화**.
- `ScreenContentByScreenId`를 수정해 PNG 유무와 관계없이 **레지스트리 미구현 화면은 모두 경고 팝업**(`MesScreenAccessDeniedModal`)으로 처리.
- 기존 "화면 준비 중" 플레이스홀더 분기 제거.
### 변경된 파일
- `renderer/src/screens/registry.tsx`
- `renderer/src/pages/ScreenPlaceholderPage.tsx`
- `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (배포본 DB 조회 실패 수정 — TLS 인증서 예외 화이트리스트)
### 작업 내용
- 배포 실행 시 `조회 실패: Failed to fetch` 원인을 사내 DB HTTPS 인증서 검증 실패로 진단.
- `electron/main.cjs`에 `certificate-error` 핸들러를 추가해 **`100.71.84.10` 호스트만** 예외 허용(전체 무시 금지).
- 배포/운영 가이드에 DB 조회 실패 체크 항목을 추가(`docs/SETUP.md`).
### 변경된 파일
- `electron/main.cjs`, `docs/SETUP.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (패키징 실행 시 빈 창 수정 — Vite 상대 base)
### 작업 내용
- Electron 패키징(`file://`) 실행에서 `index.html`이 `/assets/...` 절대경로를 참조해 JS/CSS 로드 실패로 빈 창이 뜨는 문제 수정.
- `renderer/vite.config.ts`에 `base: './'`를 추가해 빌드 산출물 자산 경로를 상대경로(`./assets/...`)로 고정.
- 수정 후 `npm run build` 재실행으로 배포 산출물 재생성 확인.
### 변경된 파일
- `renderer/vite.config.ts`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (배포 빌드 안정화 — electron-builder 고정·사인 비활성)
### 작업 내용
- `electron-builder` 버전을 `26.0.12`로 고정(워크스페이스 npm tree 파싱 이슈 회피 목적).
- 테스트 배포용으로 코드사인 자동탐색 비활성(`CSC_IDENTITY_AUTO_DISCOVERY=false`) 및 `win.signAndEditExecutable=false` 설정.
- 빌드 스크립트에 npm 출력 억제 환경변수 추가(`NPM_CONFIG_LOGLEVEL=error` 등).
### 변경된 파일
- `package.json`, `package-lock.json`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (배포 — Windows Portable 타깃 추가)
### 작업 내용
- `electron-builder` Windows 타깃에 `portable` 추가.
- 이제 `npm run build` 시 **NSIS 설치형 + Portable EXE(무설치)** 를 함께 생성.
### 변경된 파일
- `package.json`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (가상 스크롤 + 자동맞춤 충돌 수정)
### 작업 내용
- 열 더블클릭 자동맞춤 측정 시 가상 스크롤 패딩행(`td[colspan]`)을 제외하도록 보정.
- 행번호 열 자동맞춤이 비정상적으로 과대 확장되던 문제 해소.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (그리드 줌 하한·가상화 임계값 조정)
### 작업 내용
- `MesDataGridPanel` **`GRID_ZOOM_MIN`**: `40 → 70` (Ctrl+휠 최소 축소 70%).
- `SimpleGridTable` 가상 스크롤 발동 임계값을 상수화하고 **150행**으로 조정.
### 변경된 파일
- `renderer/src/components/MesDataGridPanel.tsx`
- `renderer/src/components/BaseFeatureScreen.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_common_code_mgmt — 가상 스크롤 + 연속 행번호)
### 작업 내용
- 페이지네이션 대신 `MesDataGridPanel`/`SimpleGridTable`에 **행 가상 렌더링(virtualization)** 옵션을 추가하고 `std_base_common_code_mgmt`에 적용.
- 대량 데이터에서도 보이는 구간(+overscan)만 렌더해 드래그/입력 반응 개선.
- 행번호는 전체 데이터 기준으로 `1..N`(예: `1..1828`) 연속 표시 유지.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`
- `renderer/src/components/MesDataGridPanel.tsx`
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_common_code_mgmt — 대량 행 성능 개선 200행 페이지)
### 작업 내용
- 1,800+ 행 전체 렌더로 인한 입력/창 이동 지연 완화를 위해 `std_base_common_code_mgmt` 그리드에 **클라이언트 페이지네이션(페이지당 200행)** 추가.
- 하단에 `rows / page` 정보와 **이전/다음** 버튼 제공, 페이지 전환 시 선택/상세 초기화.
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_common_code_mgmt — `tb_cm_code` DB 연동)
### 작업 내용
- `std_base_common_code_mgmt` 데이터 소스를 PNG 샘플 배열에서 **`GET /db/tb_cm_code`**로 전환(초기 조회 + Group Code 검색).
- 사용자관리와 동일 패턴으로 **Toolbar/Search/Save/Delete + 인라인 배너 + 신규 등록 모드** 적용.
- 저장/삭제를 위해 `POST /db/tb_cm_code`, `DELETE /db/tb_cm_code` 연동 유틸 추가.
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`
- `renderer/src/lib/tbCmCodeApi.ts`
- `renderer/src/lib/tbCmCodeMapper.ts`
- `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (MesDataGridPanel — 부모 제공 `#` 헤더도 빈 값으로 통일)
### 작업 내용
- `std_base_common_code_mgmt`처럼 부모가 첫 열 헤더를 `#`로 넘기는 경우에도, 렌더링 시 첫 헤더를 빈 문자열로 치환해 `#`가 남지 않도록 정리.
### 변경된 파일
- `renderer/src/components/MesDataGridPanel.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (MesDataGridPanel — 행번호 헤더 `#` 제거·줄번호 열 정렬 해제)
### 작업 내용
- 자동 줄번호 열 헤더 텍스트를 `#`에서 **빈 문자열**로 변경.
- 줄번호 열(자동 주입·부모 제공 `#` 모두) 클릭 시 **정렬 동작 제외**.
- 줄번호 열은 별도 정렬 클래스 없이 기본(`text-center`)을 사용하고, 나머지 데이터 열은 `text-left` 유지.
### 변경된 파일
- `renderer/src/components/MesDataGridPanel.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (SplashScreen — `SPLASH_CONTENT_TOP_EXTRA_PX` 50)
### 작업 내용
- **`SPLASH_CONTENT_TOP_EXTRA_PX`**: **100 → 50** — 로고·타이틀·모듈 블록을 **50px** 위로.
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (SplashScreen — 로고·타이틀·모듈 스프라이트 블록 하향)
### 작업 내용
- 메인 콘텐츠 컬럼 **`padding-top`**: 기존 **`pt-7`(1.75rem)** 에 **`SPLASH_CONTENT_TOP_EXTRA_PX` 100px** 합산 — `bksoft`·BK MES·모듈 스프라이트 묶음을 약 **100px** 아래로.
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (SplashScreen — 모듈 타일 하단 여백)
### 작업 내용
- 타일 **`aspect-ratio`** 분모에 **`MODULE_TILE_EXTRA_HEIGHT_RATIO`(1.15)** 적용 — 뷰포트 높이를 PNG 한 칸보다 약 15% 키워 **모듈명 아래** 빈 여백 확보(스프라이트는 상단 정렬).
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (SplashScreen — 호버 `scale` 제거·하단 텍스트 잘림 해소)
### 작업 내용
- **`group-hover:scale-110` 제거**: 확대 시 스프라이트가 `aspect-ratio` 뷰포트를 넘어가 **`overflow-hidden`** 에 **하단 글자**가 더 잘리는 문제가 있었음. `on` 레이어는 다시 **`translateX`만** 적용한 단일 `img`로 복원.
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (SplashScreen — 호버 `on` 레이어 확대)
### 작업 내용
- **`모듈_on`**: 호버 시 **래퍼**에서 `origin-center` + **`scale-110`**(10% 확대) — `translateX`와 같은 요소에 `scale`을 쓰지 않음. 타일 **`p-1`**·클립 영역 **`overflow-visible`** 으로 확대 시 잘림 완화.
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (SplashScreen — 모듈 타일 뷰포트·그리드 셀 일치)
### 작업 내용
- 스프라이트 **클립 영역**을 고정 `calc(509/6)` 대신 **`w-full` + `aspect-ratio`(한 칸 비율)** 로 두어 **그리드 셀 너비**와 항상 동일하게 맞춤. 이미지는 **`width: 600%`**(부모 대비)·`height: auto`로 **`translateX(-(i/6)*100%)`** 가 **한 칸**과 어긋나지 않게 함(호버 노란색·아이콘·하단 글씨 중심 정렬).
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (SplashScreen — 모듈 타일 호버 `on` 스프라이트 정렬)
### 작업 내용
- **`모듈_off` / `모듈_on`**: 픽셀 `left`·`calc` 반올림으로 레이어가 어긋나 호버 시 노란 하이라이트가 왼쪽으로 치우쳐 보이던 문제를, **`translateX(-(i/6)*100%)`**(퍼센트는 스프라이트 이미지 너비 기준)로 **off/on 동일 변환**해 정렬.
- **`splashAssets`**: 미사용 **`moduleSpriteOffsetX`** 제거.
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `renderer/src/splash/splashAssets.ts`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (Electron 메인 창 800×600·스플래시 모듈 타일 간격)
### 작업 내용
- **`electron/main.cjs`**: 메인(스플래시) **`BrowserWindow`** **800×600** (기존 740×500).
- **`SplashScreen`**: 좌측 액션 열 **200→740 대비 800 비율**(**216px**). 모듈 타일 그리드 **열 간격 12px**·`maxWidth` 스프라이트+간격 합산·본문 패딩·세로 여백 소폭 확대.
### 변경된 파일
- `electron/main.cjs`, `renderer/src/components/SplashScreen.tsx`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (`SimpleGridTable` — 마지막 열 더블클릭으로 전체 열 너비 맞춤)
### 작업 내용
- **`columnResize`** 마지막 열 구분선 **더블클릭**: 열별 **`measureColumnFitWidth`** 를 **전 열**에 실행해 한 번에 반영. 그 외 열 핸들은 **해당 열만** (기존).
- **`title`** / **`aria-label`** 문구 구분.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (`MesDataGridPanel` — `showRowNumbers` 기본·`#` 자동)
### 작업 내용
- **`showRowNumbers`** 기본 **`true`**: 부모 `columns` 첫 열이 **`#`** 가 아니면 **`#`** + 줄번호 열·셀을 내부에서 부착, 첫 열 **`4%`**. **`onSelectRow`** 는 **데이터 열만** 전달.
- 부모가 이미 **`#`** 를 넘기면 중복 없음.
### 변경된 파일
- `renderer/src/components/MesDataGridPanel.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (`MesSearchSaveBar` `leading`·사용자 관리 배너 좌측)
### 작업 내용
- **`MesSearchSaveBar`**: **`leading`** — 조회줄 **맨 왼쪽**(필터·Search 사이 `border-r`).
- **`BaseFeatureScreen`**: **`filterLeading`** 전달.
- **`std_base_user_mgmt`**: 삭제 확인·저장/조회 메시지·조회 중·**신규 등록** 배지 → **`filterLeading`**; 필터 입력만 **`filterArea`**. 상세 **`MesDetailForm`** 제목은 **「사용자 정보」** 만.
### 변경된 파일
- `renderer/src/components/MesSearchSaveBar.tsx`, `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/screens/std/std_base_user_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_user_mgmt — 삭제 `confirm` 제거·인라인 확인·조회 오류 배너)
### 작업 내용
- **`window.confirm` 제거** — 조회줄에 **«… 삭제할까요?»** + **취소** / **삭제** (`requestDelete` → `executeDelete`).
- **조회 실패**(최초 로드·Search): **`window.alert` → `flashSaveBanner`** — 동기 다이얼로그 회피.
- `flashSaveBanner` 선언 순서를 **`runSearch`보다 앞**으로 조정.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_user_mgmt — 툴바 삭제·`DELETE /db/tb_cm_user`)
### 작업 내용
- **`deleteTbCmUser(userId)`**: **`DELETE …/db/tb_cm_user?user_id=`** (서버가 해당 메서드·쿼리를 지원한다고 가정).
- **`runDelete`**: 신규 등록 모드·미선택 시 안내; **`window.confirm`** 후 삭제 → **`runSearch()`** → 인라인 배너.
- **`toolbarHandlers.delete`** 연결.
### 변경된 파일
- `renderer/src/lib/tbCmUserApi.ts`, `renderer/src/screens/std/std_base_user_mgmt.tsx`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_user_mgmt — 저장 후 `alert` 제거·인라인 배너)
### 작업 내용
- **`runSave`**: 성공 시 **`window.alert` 제거** — **`postTbCmUser` → `await runSearch()` →** 조회줄 옆 **인라인 메시지**(약 3.2초 자동 해제). 검증(신규 비번)·저장 실패도 **`alert` 대신** 동일 배너.
- **이유**: Electron에서 저장 직후 동기 `alert`가 웹뷰 **포커스·히트 테스트**를 깨뜨려 입력이 막히는 현상 완화.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (신규 등록 시 조회·상세 입력 — 그리드 `zoom` 히트·스택)
### 작업 내용
- **`MesDataGridPanel`**: 루트 **`isolate overflow-hidden`**, 줌 래퍼 **`[contain:paint]`** — `zoom`으로 인한 포인터 히트 이탈 완화.
- **`std_base_user_mgmt`**: 그리드 래퍼 **`relative z-0 overflow-hidden`**, **`MesDetailForm`** **`relative z-20`**.
- **`MesSearchSaveBar`**: **`z-30`** (조회줄이 본문보다 위).
### 변경된 파일
- `renderer/src/components/MesDataGridPanel.tsx`, `renderer/src/screens/std/std_base_user_mgmt.tsx`, `renderer/src/components/MesSearchSaveBar.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (MDI 리사이즈 핸들 — 필터 입력 클릭 막힘 완화)
### 작업 내용
- **`MdiResizeHandles`**: `pointer-events-none` **`inset-0`** 래퍼 제거 — **가장자리 핸들만** 배치(본문·조회줄 클릭 방해 제거).
- **`MesSearchSaveBar`**: **`relative z-10`** — 조회 스트립이 겹침에 덜 민감하도록.
### 변경된 파일
- `renderer/src/components/MesMdiLayer.tsx`, `renderer/src/components/MesSearchSaveBar.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_user_mgmt — 툴바 신규·상세 배지·`toolbarHandlers`)
### 작업 내용
- 상세 **신규** 버튼 제거. **`BaseFeatureScreen`** `toolbarHandlers` — 단독 창(`Toolbar onAction`)·MDI(`registerToolbarHandlers` 병합). **조회/저장**도 툴바 **조회/저장**과 동일 동작.
- **`MesDetailForm`**: `title` `ReactNode`·`titleAriaLabel` — **신규 등록** 앰버 배지.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/MesDetailForm.tsx`, `renderer/src/screens/std/std_base_user_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_user_mgmt — 신규 등록 「신규」버튼·POST 기본값)
### 작업 내용
- **「신규」**: 그리드 선택 해제·상세 폼 초기화·Password 입력 가능(마스킹 `****`는 행 선택 시만).
- **`buildTbCmUserPostBody`**: `resigned`/`activated` 빈 값 → **`N`** / **`Y`**, `beginning_employment_date` 없으면 **당일** `YYYY-MM-DD`.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`, `renderer/src/lib/tbCmUserMapper.ts`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (std_base_user_mgmt — `tb_cm_user` GET/POST)
### 작업 내용
- **`GET /db/tb_cm_user`**: 조건 `user_id`·`user_name__like`(사용자명 필터). **`POST /db/tb_cm_user`**: 상세·비밀번호 반영, `user_pwd`는 MD5 대문자 hex(`js-md5`).
- **`lib/mesDbBaseUrl.ts`**: dev에서 `VITE_MES_DB_API_BASE` 미설정 시 상대 `/db` → **`vite.config.ts` `server.proxy`** 로 `https://100.71.84.10:7443` 전달(CORS 회피).
- **`MesSearchSaveBar`** / **`BaseFeatureScreen`**: **`onSearch`·`onSave`**(필터 Search/Save 핸들).
- **`MesDataGridPanel`**: 첫 열이 `#`가 아닐 때 빈 행 판정 시 `slice(1)` 제거.
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`, `renderer/src/lib/tbCmUserApi.ts`, `renderer/src/lib/tbCmUserMapper.ts`, `renderer/src/lib/mesDbBaseUrl.ts`, `renderer/src/components/MesSearchSaveBar.tsx`, `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/MesDataGridPanel.tsx`, `renderer/vite.config.ts`, `renderer/package.json`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (ScreenPlaceholder — PNG 없음은 항상 모달)
### 작업 내용
- **`ScreenContentByScreenId`**: **`hasScreenPng`** 가 false이면 **모든 모듈**에서 **`MesScreenAccessDeniedModal`** 만 — **「화면 준비 중」** 은 **`docs/image/<화면ID>.png` 가 있는데** `FEATURE_SCREEN_REGISTRY` 에 구현이 없을 때만.
- **`project-rules.md` §6.0**: **기준정보 한정** 문구를 **PNG 없음(모든 모듈)** 으로 정합.
### 변경된 파일
- `renderer/src/pages/ScreenPlaceholderPage.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/PROJECT_STRUCTURE.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (터미널 이슈 대응 잔여물 정리 — `.vscode` 제거·PS1 `-SkipPortKill`)
### 작업 내용
- **`.vscode/settings.json` 삭제**: 통합 터미널 GPU·스크롤 튜닝은 **시험적 완화**였고, dev 종료 정리(Electron/`dev.mjs`)가 본해결 — 워크스페이스 설정 제거.
- **`kill-mes-dev-children.ps1`**: `-SkipPortKill` — Electron `main`에서 이미 `netstat`+`taskkill` 한 뒤에는 **포트 구간 생략**, CIM만 실행. `dev.mjs`는 기존처럼 **전체** PS1.
- **`electron/main.cjs`**, **`scripts/dev.mjs`**: `execFileSync`의 과한 `maxBuffer` 제거(기본값). dev 종료 주석 축약.
### 변경된 파일
- `.vscode/settings.json`(삭제), `electron/main.cjs`, `scripts/dev.mjs`, `scripts/kill-mes-dev-children.ps1`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 12:00 KST
### 작업 내용
- **MDI 확장**: **기준정보**만이 아니라 **제품·자재·생산·구매** 모듈도 **`ModuleBlankPage`** 에서 동일하게 **Toolbar + `MesMdiLayer`** (`constants/mdiModules.ts`). **`MenuOpenScreenBridge`** / **`ModuleWindowMenuBridge`** 는 MDI 모듈 전부에 `openOrFocus`·Window 메뉴 동기화.
- **통합 레지스트리**: **`renderer/src/screens/registry.tsx`** — `STD_FEATURE_SCREEN_REGISTRY` + `import.meta.glob('docs/image/prd_*.png'|mat_|mfg_)` 로 화면 ID 수집. **제품** `prd_itemno_item_no_mgmt_fg_semi` 는 PNG 기준 상세(`screens/prd/prd_itemno_item_no_mgmt_fg_semi.tsx`·`prdPngSampleData.ts`), 그 외 prd·전체 mat·mfg 는 `PrdGenericFeatureScreen` / `MatFeatureScreen` / `MfgFeatureScreen` 목업.
- **`ScreenPlaceholderPage`**: **`FEATURE_SCREEN_REGISTRY`** 사용; **PNG 없으면**(모든 모듈) `MesScreenAccessDeniedModal`(이후 §6.0에서 **PNG 없음 = 모달**으로 통일).
### 변경된 파일
- `renderer/src/constants/mdiModules.ts`, `renderer/src/lib/mdiScreenIds.ts`, `renderer/src/App.tsx`, `renderer/src/pages/ModuleBlankPage.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `renderer/src/components/ModuleWindowMenuBridge.tsx`, `renderer/src/screens/registry.tsx`, `renderer/src/screens/prd/*`, `renderer/src/screens/mat/*`, `renderer/src/screens/mfg/*`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (스플래시 나가기 — “종료 중…” 오버레이)
### 작업 내용
- **`electron/main.cjs`**: `app.quit()` 직전 `webContents.send('mes:quit-starting')`, **80ms** 후 `quit`(페인트 여유). 타이틀 **X**로 닫을 때도 동일.
- **`electron/preload.cjs`**: `onQuitStarting` 구독.
- **`renderer`**: `SplashScreen`에 `종료 중…` 반투명 오버레이(`role="status"`, `aria-live`).
### 변경된 파일
- `electron/main.cjs`, `electron/preload.cjs`, `renderer/src/components/SplashScreen.tsx`, `renderer/src/mes-env.d.ts`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (detached PS1 롤백 — 터미널 느려짐 재발 + CIM `node.exe` 필터)
### 작업 내용
- **원인**: PS1를 **비동기**만 쓰면 Electron이 먼저 종료되어 **npm/Vite 잔류**·통합 터미널 느려짐이 다시 남.
- **`electron/main.cjs`**: `kill-mes-dev-children.ps1`을 다시 **`spawnSync`**(timeout 30s).
- **`scripts/kill-mes-dev-children.ps1`**: `Get-CimInstance Win32_Process` **전체** 대신 **`-Filter "Name = 'node.exe'"`** 로만 조회해 체감 지연 완화.
### 변경된 파일
- `electron/main.cjs`, `scripts/kill-mes-dev-children.ps1`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (나가기 지연 ~1s — PS1 `spawnSync` 제거·포트만 동기)
### 작업 내용
- **원인**: `before-quit`에서 `kill-mes-dev-children.ps1`를 **`spawnSync`**로 실행해 PowerShell 기동·`Get-CimInstance`가 **동기 블로킹**(~1s 체감).
- **`electron/main.cjs`**: **`netstat`+`taskkill`만 동기** 유지, PS1은 **`spawn`+`detached`+`unref`** 로 비차단. `scripts/dev.mjs` `electronProc.on('exit')` PS1 정리는 그대로.
### 변경된 파일
- `electron/main.cjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (Electron `before-quit` — Node `netstat`+`taskkill` 선행·PowerShell 전체 경로)
### 작업 내용
- **원인**: `kill-mes-dev-children.ps1`만 호출할 때 `powershell.exe`가 PATH에서 안 잡히거나, PS1 없을 때 **조기 return**으로 포트 정리가 스킵될 수 있음.
- **`electron/main.cjs`**: dev 종료 시 **`cmd /c netstat -ano`** 로 Local Address 포트를 **숫자 비교**해 PID 수집 후 **`taskkill /T /F`**(Vite LISTEN 우선). 이후 **`%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`** 로 PS1 실행(없으면 포트 정리만).
### 변경된 파일
- `electron/main.cjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (Electron `before-quit` — 비동기 spawn → `spawnSync`로 동기 정리)
### 작업 내용
- **원인**: `before-quit`에서 `spawn`+`detached`+`unref`만 쓰면 메인 프로세스가 먼저 종료되며 PowerShell 정리가 끝나기 전에 끊겨 **Vite·npm `node` 잔류**가 재현될 수 있음.
- **`electron/main.cjs`**: `kill-mes-dev-children.ps1`을 **`spawnSync`**(timeout 30s, `stdio: ignore`)로 실행해 **나가기 직전**에 정리 완료. dev 세션 판별에 **`MES_DEV_PORT` 있으면 true** 추가.
### 변경된 파일
- `electron/main.cjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (Electron `before-quit`에서 Vite/npm 정리 — `dev.mjs` exit만으로는 부족)
### 작업 내용
- **원인**: 앱 **나가기**만 하면 `electronProc.on('exit')` 타이밍/트리 때문에 Vite·npm `node`가 남을 수 있음.
- **`electron/main.cjs`**: 개발 모드(`ELECTRON_RENDERER_URL`이 `http`/`https`)에서 `app.on('before-quit')` 시 **`kill-mes-dev-children.ps1`** 를 `powershell -File` 로 **분리(detached) 실행** — Electron 종료와 무관하게 동일 정리.
- **`scripts/dev-electron.mjs`**: **`MES_DEV_PORT`** 를 env에 명시해 main이 포트를 안정적으로 전달.
- **`scripts/kill-mes-dev-children.ps1`**: **Get-NetTCPConnection + netstat + taskkill** 과 **CIM node 패턴**을 한 파일에 통합(`-Port` 기본 5174).
- **`scripts/dev.mjs`**: 포트 정리는 PS1에 위임해 **중복 `killPidsOnLocalPortWin32` 제거**.
### 변경된 파일
- `electron/main.cjs`, `scripts/dev-electron.mjs`, `scripts/dev.mjs`, `scripts/kill-mes-dev-children.ps1`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (dev 종료 순서·netstat·`kill-mes-dev-children.ps1`)
### 작업 내용
- **종료 순서**: 포트 정리 → `kill-mes-dev-children.ps1`(CIM) → **마지막**에 `taskkill` dev.mjs 트리 — 먼저 `dev.mjs`를 죽이면 npm/Vite가 고아로 남을 수 있음.
- **`netstat -ano | findstr :PORT`**: `Get-NetTCPConnection` 보조로 LISTEN PID에 `taskkill /T`.
- **`scripts/kill-mes-dev-children.ps1`**: 인라인 PowerShell 문자열 대신 파일로 유지보수·구문 오류 방지.
### 변경된 파일
- `scripts/dev.mjs`, `scripts/kill-mes-dev-children.ps1`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (CIM node 정리 조건 수정 — npm은 D:\\MES 없음)
### 작업 내용
- **`scripts/dev.mjs`**: `killOrphanMesNodeProcessesWin32` 가 `CommandLine -like '*repo*'` 만 요구해 **`C:\\Program Files\\nodejs\\...npm-cli.js` + `dev:renderer`** 프로세스가 제외되던 문제 수정. 작업 관리자 **명령줄** 기준으로 `MES*renderer*vite`, `npm-cli`+`dev:renderer`+포트, `workspace renderer run dev`+포트, `MES*scripts*dev-electron` 패턴으로 `Stop-Process`.
### 변경된 파일
- `scripts/dev.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (나가기 후 Node 잔류 — 외부 taskkill + 포트 전체 + CIM 명령줄 정리)
### 작업 내용
- **`scripts/dev.mjs` (Windows)**: 동일 프로세스 안 `execSync(taskkill)` 대신 **분리된 `taskkill` 프로세스**(`spawn` detached) + 1.5s 후 `process.exit` 폴백.
- **포트**: `Listen`만이 아니라 **LocalPort 일치하는 모든 연결**의 `OwningProcess` 종료.
- **보조**: `Get-CimInstance Win32_Process`로 **`node.exe`** 이면서 **CommandLine**에 **repo 루트** + **`vite` / `dev.mjs` / `dev-electron`** 포함인 프로세스 `Stop-Process`(npm이 자식을 다른 그룹으로 띄울 때).
### 변경된 파일
- `scripts/dev.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (나가기 후 남는 Node 프로세스 — `dev.mjs` 트리 전체 taskkill)
### 작업 내용
- **원인**: 작업 관리자에 **Node.js 여러 개**가 남음 — `rendererProc` PID만 `taskkill`하면 **npm/cmd 하위 node**가 일부 잔류.
- **`scripts/dev.mjs` (Windows)**: Electron 쪽 npm이 끝난 뒤 **`taskkill /PID <node dev.mjs pid> /T /F`** 로 **`node dev.mjs`가 시작한 자식 전부** 종료(자기 자신 포함). 우리가 Vite를 띄운 경우에만 기존처럼 **5174 Listen** 정리.
### 변경된 파일
- `scripts/dev.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (앱 나가기 후 터미널 느림 — Electron stdio 분리·포트 정리 재시도)
### 작업 내용
- **`dev-electron.mjs`**: Electron 자식 **`stdio: 'ignore'`** — Chromium 로그가 통합 터미널에 쌓이지 않도록 **콘솔 완전 분리**(디버그는 앱 DevTools).
- **`dev.mjs`**: Electron 종료 후 Windows에서 **`killListenersOnPortWin32(PORT)`** — Vite가 PID 트리 밖에 남을 때 **5174 Listen 프로세스**까지 정리.
### 변경된 파일
- `scripts/dev-electron.mjs`, `scripts/dev.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (앱 나가기만 터미널 느림 / Ctrl+C는 정상)
### 작업 내용
- **원인**: Electron **정상 종료** 시 터미널과 **같은 stdin**을 쓰는 `stdio: "inherit"` + Chromium 정리 과정이 Windows 콘솔/PTY에 부담. **Ctrl+C**는 `dev.mjs`가 **양쪽 npm 트리**를 한꺼번에 끊어 증상이 없음.
- **`scripts/dev-electron.mjs`**: Electron 자식은 `stdio: ['ignore','inherit','inherit']` — **stdin 미상속**.
- **`scripts/dev.mjs`**: Electron 쪽 npm이 먼저 끝난 뒤(앱 나가기), Windows에서는 Vite 트리를 **동기 `taskkill`**로 즉시 정리 후 `process.exit`.
### 변경된 파일
- `scripts/dev-electron.mjs`, `scripts/dev.mjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (`npm run dev` 종료 후 터미널 지속 느림 — 프로세스 트리 정리)
### 작업 내용
- **원인(Windows)**: `child.kill`만으로 **npm → cmd → node(Vite)** 자식이 남아 CPU·콘솔 핸들을 잡는 경우가 있어, 앱을 나간 뒤에도 통합 터미널이 계속 느리게 느껴질 수 있음.
- **`scripts/dev.mjs`**: `tree-kill`로 **렌더러·일렉트론 npm 트리 전체** 종료(SIGINT/SIGTERM·Electron 종료 시 Vite 정리). `package.json`에 `tree-kill` devDependency 추가.
### 변경된 파일
- `scripts/dev.mjs`, `package.json`, `package-lock.json`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (Cursor 통합 터미널 반응 — 워크스페이스 설정)
### 작업 내용
- **`.vscode/settings.json`**: `terminal.integrated.gpuAcceleration`·`smoothScrolling`·`scrollback`·`fastScrollSensitivity` 로 통합 터미널 입력·스크롤 체감 개선(이 저장소를 연 워크스페이스에만 적용).
### 변경된 파일
- `.vscode/settings.json`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (메인 창 타이틀 X = 나가기)
### 작업 내용
- **Electron `main.cjs`**: 스플래시(메인) `BrowserWindow`의 `close`에서, `app.quit()` 경로가 아닐 때 `preventDefault` 후 `app.quit()` — 타이틀바 X가 **`mes:quit`/`나가기`와 동일**하게 전체 앱 종료(모듈 창이 열려 있어도 동일).
- **`before-quit`**: `isQuitting` 플래그로 종료 시퀀스 중 이중 `preventDefault` 방지.
### 변경된 파일
- `electron/main.cjs`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (`MesDetailForm` 전 `std_*` 그리드 화면·공통 훅)
### 작업 내용
- **`useMesGridRowSelection`**: 열 개수·`cellValues` 기준 첫 데이터 행 초기 선택, `onSelectRow`·`onSortChange`·`detail`/`setDetail`.
- **`MesGridRowDetailFields` / `MesGridRowDetailForm`**: 그리드 `columns`와 동일 순서로 상세 입력란 배치.
- **기준정보 `std_*`**: `MesDataGridPanel` 사용 화면 전부 행 선택 → 하단 상세 연동(단일 그리드는 해당 패널만, 다중 그리드는 `lastPanel`로 마지막 클릭 패널 기준). **`std_base_common_code_mgmt`**는 기존 `rowToDetail`·Code Information 유지. **`std_base_user_mgmt`**: 그리드에 없는 Password·Pass 체크는 `MesDetailForm` 하단에 유지.
- **문서**: `LAYOUT_RULES.md`·`project-rules.md` §6.0.1·`FEATURES.md`에 일반 매핑·신규 화면 절차 보강.
### 변경된 파일
- `renderer/src/lib/useMesGridRowSelection.ts`, `renderer/src/components/MesGridRowDetailFields.tsx`, `renderer/src/screens/std/std_base_*.tsx`, `renderer/src/screens/std/std_cfg_*.tsx`(공통코드 제외 데이터 연동 추가), `docs/LAYOUT_RULES.md`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (그리드 행 선택 → `MesDetailForm`)
### 작업 내용
- **`SimpleGridTable`**: 선택 행 강조·`selectedRowIndex`·`onRowClick`.
- **`MesDataGridPanel`**: `selectedRowIndex`·`onSelectRow(rowIndex, row)`·`onSortChange`; 정렬 후 표시 순서 기준 인덱스.
- **`std_base_common_code_mgmt`**: 행 클릭 시 Code Information 폼에 열 매핑 반영(초기 첫 데이터 행 선택). 정렬 시 상세 초기화.
- **`docs/LAYOUT_RULES.md`**: 마스터–디테일 props 안내.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/MesDataGridPanel.tsx`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (공통 UI `Std*` → `Mes*` 리네이밍)
### 작업 내용
- **렌더러**: `MesDataGridPanel`·`MesDetailForm`·`MesSearchSaveBar`·`MesScreenShell`·`MesMdiContext`·`MesMdiLayer`·`MesScreenAccessDeniedModal`·훅 `useMesMdi`/`useMesMdiEmbedded`/`MesMdiEmbedContext`/`MesMdiProvider`로 일괄 변경. `MesMdiLayer`는 `renderer/src/components/MesMdiLayer.tsx`로 이동.
- **문서·규칙**: `project-rules`·`LAYOUT_RULES`·`FEATURES`·`CONTEXT`·`PROJECT_STRUCTURE`·`DOCUMENTATION_INDEX`·`CHANGELOG`·`USER_PROMPTS_LOG`·`.cursorrules` 등 경로·이름 반영. 용어 절 제목을 **`std_*` / `Mes*`** 로 정리.
### 변경된 파일
- `renderer/src/components/Mes*.tsx`, `renderer/src/context/MesMdiContext.tsx`, `renderer/src/screens/std/*.tsx`, `renderer/src/App.tsx`, `renderer/src/pages/*.tsx`, `project-rules.md`, `docs/**`, `ai-rules.md`, `.cursorrules`

## 2026-04-01 (`std_*` vs `Mes*` 용어)
### 작업 내용
- **`project-rules.md` §6.0**: 「용어: `std_*` / `Mes*`」— 기준정보 도메인 네이밍과 전역 표준 UI 컴포넌트 구분 명시.
- **`docs/LAYOUT_RULES.md`**: 서두에 동일 용어 한 줄·`project-rules` 링크.
- **`ai-rules.md`**: 표에 `std_*` vs `Mes*` 한 줄.
### 변경된 파일
- `project-rules.md`, `docs/LAYOUT_RULES.md`, `ai-rules.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (MesDetailForm)
### 작업 내용
- **`MesDetailForm`**: `MesDataGridPanel` 하단 **선택 행 상세·수정** 영역 공통 래퍼(`renderer/src/components/MesDetailForm.tsx`). **`std_base_common_code_mgmt`** 하단 「Code Information」 구역 적용.
- **문서**: `LAYOUT_RULES.md` 「행 상세 폼」절 추가, `project-rules.md` §6.0·문서 갱신 매핑, `FEATURES`·`PROJECT_STRUCTURE`·`CONTEXT` 반영.
### 변경된 파일
- `renderer/src/components/MesDetailForm.tsx`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `project-rules.md`, `docs/FEATURES.md`, `docs/PROJECT_STRUCTURE.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-04-01 (USER_PROMPTS_LOG 날짜 규칙)
### 작업 내용
- **`docs/USER_PROMPTS_LOG.md`**: 같은 날짜 제목 중복·날짜 블록 순서 뒤섞임을 정리(2026-03-31 일괄·2026-03-30 하단 배치). 상단 형식 절에 **날짜 권위**(`Today's date:`)·**동일 일자 한 번**·**최신 날 위** 안내 추가.
- **`project-rules.md` §2 `USER_PROMPTS_LOG`**: 위 날짜·섹션 순서 규칙을 본문에 반영.
- **`docs/USER_PROMPTS_LOG.md` (후속)**: 실제 일자가 3/31인 네 턴(그리드·프롬프트 저장·복구·로그 의무화)을 **`## 2026-03-31`** 로 이전, 빈 **`## 2026-03-30`** 섹션 제거.
### 변경된 파일
- `docs/USER_PROMPTS_LOG.md`, `project-rules.md`, `docs/CHANGELOG.md`

## 2026-03-31 01:00 KST
### 작업 내용
- **기준정보 전 화면 `MesSearchSaveBar`**: `MesScreenShell` `filterArea` 가 **`BaseFeatureScreen`** → **`MesSearchSaveBar`** 로 이어짐을 모든 `std_*` 화면 파일 주석으로 통일. 조회 필터를 **`FormLabelInput`**(및 날짜 구간 `~`) 패턴으로 정합. **`std_cfg_router_mgmt`** 하단 그리드 행 `min-h` 중복 클래스 정리.
### 변경된 파일
- `renderer/src/screens/std/std_base_*.tsx`, `renderer/src/screens/std/std_cfg_*.tsx`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 00:30 KST
### 작업 내용
- **사용자 관리 (`std_base_user_mgmt`)**: 상단 조회줄이 **`MesSearchSaveBar`**( `MesScreenShell` → `BaseFeatureScreen` `filterArea`)임을 파일 주석으로 명시. 조회 필터를 **`FormLabelInput`** 패턴으로 정합(`LAYOUT_RULES` 폼·조회줄).
### 변경된 파일
- `renderer/src/screens/std/std_base_user_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 00:15 KST
### 작업 내용
- **`MesSearchSaveBar` 규격 문서화**: `renderer/src/components/MesSearchSaveBar.tsx` 스타일(루트·한 줄 flex·필터 열·Search/Save 열·`FilterBarButtons`)을 **`docs/LAYOUT_RULES.md`** 「**조회 Search/Save 표준 스트립 (`MesSearchSaveBar`)**」에 표로 정리. 서두·조회줄 절·**`project-rules.md`** §6.0·§6.0.1·§6.1·**`FEATURES`·`PROJECT_STRUCTURE`·`DOCUMENTATION_INDEX`** 반영.
### 변경된 파일
- `docs/LAYOUT_RULES.md`, `project-rules.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/PROJECT_STRUCTURE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`, `renderer/src/components/MesSearchSaveBar.tsx`

## 2026-03-30 23:55 KST
### 작업 내용
- **데이터 그리드 표준 (`MesDataGridPanel`)**: 공통코드 관리와 동일한 그리드 UX를 **`docs/LAYOUT_RULES.md`** 「데이터 그리드 표준 패널」에 규칙화. **`project-rules.md`** §6.0.1·§6.1·**`FEATURES`·`CONTEXT`·`PROJECT_STRUCTURE`·`DOCUMENTATION_INDEX`** 반영 — 신규 화면도 별도 지시 없이 **`MesDataGridPanel`** 사용. 라우터 관련 화면 **`min-h` 중복** 정리(`std_cfg_router_mgmt`, `std_cfg_prod_router_mgmt`).
### 변경된 파일
- `docs/LAYOUT_RULES.md`, `project-rules.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/PROJECT_STRUCTURE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`, `renderer/src/screens/std/std_cfg_router_mgmt.tsx`, `renderer/src/screens/std/std_cfg_prod_router_mgmt.tsx`

## 2026-03-30 23:00 KST
### 작업 내용
- **규칙 §6.0.2**: Tile·MDI 클라이언트 측정·`tileLayoutActiveRef`·모듈 리사이즈 시 격자 재적용 등을 **`project-rules.md`**에 문서화. **§6.0.1**·`ai-rules.md`·**`.cursorrules`**·`LAYOUT_RULES.md`·`PROJECT_STRUCTURE.md`·`DOCUMENTATION_INDEX.md` 교차 참조.
### 변경된 파일
- `project-rules.md`, `ai-rules.md`, `.cursorrules`, `docs/LAYOUT_RULES.md`, `docs/PROJECT_STRUCTURE.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 22:00 KST
### 작업 내용
- **MDI Tile = 모듈 클라이언트 비례**: `tileLayout` 이 **저장된 `mdiClientSizeRef`만** 쓰면 Tile 클릭 시점에 **실제 MDI 클라이언트(예: 900×600)** 와 불일치해 내부창이 **고정 크기**(예: `beforeMaximize` 880×480)처럼 보임. **`registerMdiClientMeasure`** 로 `getBoundingClientRect` **즉시** 반영, 격자 `width/height`를 `floor`로 정수화. **Tile 적용 후** `tileLayoutActiveRef` — 모듈 창 리사이즈 시 `ResizeObserver` → `tileLayout` 재실행으로 격자 유지. Cascade·드래그·리사이즈·최대화·최소화·신규 창 시 Tile 모드 해제.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/MesMdiLayer.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 21:00 KST
### 작업 내용
- **MDI Tile 클라이언트 측정**: `registerMdiClientSize` 가 `MesMdiLayer` **최상위**(하단 최소화 바 포함)만 재면 **높이가 과대** → `tileLayout` 격자가 실제 내부창 영역보다 크게 잡혀 비율·꽉 참이 깨짐. **`mdiClientRef`**(내부창 전용 `flex-1` 영역)만 `ResizeObserver`로 측정. 타이틀 드래그 **경계 판정**도 동일 클라이언트 박스 사용.
### 변경된 파일
- `renderer/src/components/MesMdiLayer.tsx`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 20:00 KST
### 작업 내용
- **기준정보 화면 정리**: **공통코드 관리** 유지. 나머지 `std_*` 화면은 **`docs/image/<화면ID>.png`** 기준으로 `MesScreenShell` 패턴 유지·재작성(주석). **`std_base_process_line_mgmt`** 는 PNG 없음 → 구현 TSX·레지스트리 제거, 진입 시 **`MesScreenAccessDeniedModal`**. **`screenPngPresence`·`hasScreenPng`**, **`ScreenContentByScreenId`** 에서 기준정보·PNG 미포함 시 모달(확인 시 MDI `close` / `navigate(-1)`). `STD_PROCESS_LINE_MASTER_ROWS` 제거.
### 변경된 파일
- `renderer/src/lib/screenPngPresence.ts`, `renderer/src/components/MesScreenAccessDeniedModal.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `renderer/src/screens/std/registry.ts`, `renderer/src/screens/std/stdPngSampleData.ts`(삭제: `std_base_process_line_mgmt.tsx`), `project-rules.md`, `docs/CHANGELOG.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/PROJECT_STRUCTURE.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 19:00 KST
### 작업 내용
- **PNG 접근 팝업 관련 원복**: `ModuleScreenAccessDeniedModal`·`screenPngPresence`·`hasScreenPng`·`ScreenContentByScreenId` 내 팝업·`manual.ts` `findManualRowByScreenId` 제거. `FEATURES`·`CONTEXT`·`PROJECT_STRUCTURE`·`project-rules` §6.0 정리.
### 변경된 파일
- `renderer/src/pages/ScreenPlaceholderPage.tsx`, `renderer/src/lib/manual.ts`(삭제: `screenPngPresence.ts`, `ModuleScreenAccessDeniedModal.tsx`), `project-rules.md`, `docs/CHANGELOG.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/PROJECT_STRUCTURE.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 18:00 KST
### 작업 내용
- **PNG 접근 팝업 위치**: 하위메뉴는 **PNG 검사 없이** 항상 `openOrFocus` / `#/screens/<화면ID>` — **`ScreenContentByScreenId`** 에서 `hasScreenPng` 가 false이면 **`ModuleScreenAccessDeniedModal`**, 확인 시 MDI **`close`** 또는 **`navigate(-1)`**. `App`·`ModuleFeaturesPage` 선검사 제거. `project-rules` §6.0·`FEATURES`·`CONTEXT`·`PROJECT_STRUCTURE` 반영.
### 변경된 파일
- `renderer/src/App.tsx`, `renderer/src/pages/ModuleFeaturesPage.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `project-rules.md`, `docs/CHANGELOG.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/PROJECT_STRUCTURE.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 17:00 KST
### 작업 내용
- **PNG 미수급 시 하위메뉴**: `docs/image/<화면ID>.png` 가 빌드에 없으면 **`hasScreenPng`** 로 판별 후 **`ModuleScreenAccessDeniedModal`**(하위메뉴명·안내 2줄·확인). `App` `mes:open-screen`·`ModuleFeaturesPage` 버튼 공통. `manual.ts` **`findManualRowByScreenId`**. `PROJECT_STRUCTURE`·`FEATURES`·`project-rules` §6.0 반영.
### 변경된 파일
- `renderer/src/App.tsx`, `renderer/src/pages/ModuleFeaturesPage.tsx`, `renderer/src/lib/screenPngPresence.ts`, `renderer/src/lib/manual.ts`, `renderer/src/components/ModuleScreenAccessDeniedModal.tsx`, `project-rules.md`, `docs/CHANGELOG.md`, `docs/FEATURES.md`, `docs/PROJECT_STRUCTURE.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 16:00 KST
### 작업 내용
- **Window > Tile**: **모듈 MDI 클라이언트 크기**에 맞춰 **빈틈·여백 없이** 격자 분할(패딩·최소 크기 강제 제거, `(col*cw)/cols` 등으로 경계 정합). `docs/FEATURES.md`·`docs/CONTEXT.md`·`project-rules.md` 반영.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `project-rules.md`, `docs/CHANGELOG.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 15:00 KST
### 작업 내용
- **MDI**: 내부창 상한 **10 → 9**(`MAX_WINDOWS`, **3×3** Tile과 정합). **Window > Tile** 격자를 **1×1 / 1×2 / 1×3 / 2×3 / 3×3**(열×행)로 고정.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `project-rules.md`, `docs/CHANGELOG.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 14:00 KST
### 작업 내용
- **Window > Tile**: 모듈 MDI 클라이언트 **폭·높이**에 따라 **1×1 / 2×1 / 3×1 / 3열 그리드**(4~9창은 3×2·3×3 등)로 격자 선택, 높이 부족 시 열 수 조정(`pickTileGrid` in `MesMdiContext.tsx`). `project-rules.md` §6.0.1·`docs/FEATURES.md` 반영.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `project-rules.md`, `docs/CHANGELOG.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 13:00 KST
### 작업 내용
- **MDI `openOrFocus`**: **새** 내부창을 기본 최대화로 열 때 **기존 최대화 내부창을 일반 크기로 복원하던 동작 제거** — 최대화 상태는 유지하고 **z-order**만 올려 앞에 표시(`MesMdiContext.tsx`). `docs/FEATURES.md`·`docs/CONTEXT.md` 반영.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 12:00 KST
### 작업 내용
- **Electron Windows**: **Window** 메뉴(Tile·Cascade·열린 내부창)·**`mes:mdi-menu-sync`**(`setMenu`) 직후 **최대화가 풀리는 현상** 방지 — 조작 전 최대화 여부를 두고 `setImmediate` 뒤 `maximize()` 복구(`electron/main.cjs`).
### 변경된 파일
- `electron/main.cjs`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 11:00 KST
### 작업 내용
- **규칙 소소 보정**: `ai-rules.md` 도구·효율 절 참조를 **§0·§1** 로 명시. **`DOCUMENTATION_INDEX.md`** 에 **`.cursorrules`** 항목 추가.
### 변경된 파일
- `ai-rules.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 10:00 KST
### 작업 내용
- **규칙 중복 정리**: **`ai-rules.md`** 를 `project-rules.md` **위임·표** 중심으로 재작성(최신 UI·MDI·Electron 규칙은 **§6.0·§6.0.1** 단일 원본). `project-rules` 서두에 타 파일 관계 명시, **`.cursorrules`**·**`DOCUMENTATION_INDEX`**·`USER_PROMPTS_LOG` 참조 문구 정리.
### 변경된 파일
- `ai-rules.md`, `project-rules.md`, `.cursorrules`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 22:00 KST
### 작업 내용
- **Window 메뉴 열린 내부창 라벨**: **`1 하위메뉴명`** 형식으로 순번 접두(`ModuleWindowMenuBridge`).
### 변경된 파일
- `renderer/src/components/ModuleWindowMenuBridge.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 21:00 KST
### 작업 내용
- **Window 메뉴 열린 내부창 라벨**: 내부창 타이틀과 구분해 **`manual.csv` 하위메뉴(`subMenuLabel`)만** 표시(`ModuleWindowMenuBridge`).
### 변경된 파일
- `renderer/src/components/ModuleWindowMenuBridge.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 20:00 KST
### 작업 내용
- **Electron 모듈 창 Window 메뉴**: **Tile**·**Cascade**·구분선·**열린 내부창 동적 목록** — `MesMdiContext.tileLayout`/`cascadeLayout`/`registerMdiClientSize`, `ModuleWindowMenuBridge`, IPC `mes:mdi-menu-sync`·`mes:mdi-tile`·`mes:mdi-cascade`·`mes:mdi-focus-window`, `preload.cjs` 확장.
### 변경된 파일
- `electron/main.cjs`, `electron/preload.cjs`, `renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/MesMdiLayer.tsx`, `renderer/src/components/ModuleWindowMenuBridge.tsx`, `renderer/src/App.tsx`, `renderer/src/mes-env.d.ts`, `project-rules.md`, `docs/FEATURES.md`, `docs/PROJECT_STRUCTURE.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 19:00 KST
### 작업 내용
- **규칙 영구 반영**: 타 모듈(메뉴·그리드·내부창) 작업 시에도 동일 적용되도록 **`project-rules.md` §6.0.1** 체크리스트 추가. **`.cursorrules`**·**`ai-rules.md`**·**`docs/DOCUMENTATION_INDEX.md`** 에 상호 참조.
### 변경된 파일
- `project-rules.md`, `.cursorrules`, `ai-rules.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 18:00 KST
### 작업 내용
- **모듈 창 제목 유지**: MDI 내부(`MesMdiEmbedContext`)에서 **`BaseFeatureScreen`·`MesFeatureChrome`·플레이스홀더**가 **`document.title`을 갱신하지 않음** — 내부 제목은 `MesMdiLayer`만. (Electron이 `document.title`을 창 타이틀로 쓰면서 내부 창 열 때 모듈명이 바뀌던 현상 수정.)
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `MesFeatureChrome.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `project-rules.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 17:30 KST
### 작업 내용
- **타이틀 가시 규칙 재정렬**: **모듈 창**(Electron·`#/module/…`·`#/modules/…`)은 **모듈명만**; **내부 MDI·기능 화면**은 **`메뉴 > 하위메뉴 (화면ID)`** — `manualInnerWindowTitle`·`MesMdiLayer` 타이틀바·`BaseFeatureScreen`/`MesFeatureChrome`/`ScreenPlaceholder`의 `document.title`에서 `BK MES`·`[ ]` 제거. 이전 MDI 바는 `메뉴 / 하위`(슬래시)·화면 ID 없음이었음.
### 변경된 파일
- `renderer/src/lib/manual.ts`, `useScreenManualMeta.ts`, `ModuleBlankPage.tsx`, `ModuleFeaturesPage.tsx`, `ScreenPlaceholderPage.tsx`, `BaseFeatureScreen.tsx`, `MesFeatureChrome.tsx`, `MesMdiLayer.tsx`, `electron/main.cjs`, `project-rules.md`, `.cursorrules`, `docs/SETUP.md`, `docs/LAYOUT_RULES.md`, `docs/PROJECT_STRUCTURE.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 16:00 KST
### 작업 내용
- **`document.title` 분리**: **모듈 페이지**(`ModuleBlankPage`/`ModuleFeaturesPage`)는 **`BK MES - 모듈명`** 만. **기능·내부 화면**은 **`BK MES - 메뉴 > 하위메뉴 [화면ID]`** — `manualInnerTitlePath` 추가, `useDocumentTitlePath`·플레이스홀더·문서 반영. Electron 모듈 창 **`BK MES - 모듈명`**.
### 변경된 파일
- `renderer/src/lib/manual.ts`, `useScreenManualMeta.ts`, `ScreenPlaceholderPage.tsx`, `BaseFeatureScreen.tsx`, `MesFeatureChrome.tsx`, `MesScreenShell.tsx`, `electron/main.cjs`, `project-rules.md`, `.cursorrules`, `docs/SETUP.md`, `docs/LAYOUT_RULES.md`, `docs/PROJECT_STRUCTURE.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 15:00 KST
### 작업 내용
- **스플래시(메인) 중앙 로고**: `splashAssets.ts`에서 **`아이콘.png` → `docs/image/bksoft.png`** (`splashIconUrl`). `FEATURES`·`CONTEXT` 문서 동기화.
### 변경된 파일
- `renderer/src/splash/splashAssets.ts`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 12:00 KST
### 작업 내용
- **제품명 표기**: 프로젝트 전역 **`2S MES` → `BK MES`** (스플래시·`document.title`·Electron 대화상자·문서·규칙). `renderer` 빌드로 `dist` 반영.
### 변경된 파일
- `renderer/src/**`, `renderer/index.html`, `electron/main.cjs`, `project-rules.md`, `.cursorrules`, `docs/**`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 11:00 KST
### 작업 내용
- **기준정보 MDI 리사이즈**: 가장자리·모서리 드래그, `setFrameBounds`, 최소 320×200.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/MesMdiLayer.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 10:00 KST
### 작업 내용
- **기준정보 MDI**: 신규 내부 창 기본 최대화, 타이틀바 더블클릭으로 최대화 토글.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/MesMdiLayer.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 21:00 KST
### 작업 내용
- **기준정보 MDI 드래그**: 영역 밖에서는 이동만 막음, 안으로 들어오면 재앵커 후 드래그 지속.
### 변경된 파일
- `renderer/src/components/MesMdiLayer.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 20:00 KST
### 작업 내용
- **기준정보 MDI 드래그**: 마우스가 `MesMdiLayer` 바깥이면 드래그 종료.
### 변경된 파일
- `renderer/src/components/MesMdiLayer.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 19:00 KST
### 작업 내용
- **기준정보 MDI 드래그**: 클라이언트 밖 이동 허용(MFC식) — 위치 클램프 제거, 본문 `overflow-hidden`으로 잘림.
### 변경된 파일
- `renderer/src/components/MesMdiLayer.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 18:00 KST
### 작업 내용
- **기준정보 MDI 내부 창**: 타이틀 드래그 이동(`moveFrame`), 타이틀바 최소화·최대화·닫기, `framesByScreen`·하단 최소화 바.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/MesMdiLayer.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 17:00 KST
### 작업 내용
- **기준정보 MDI 툴바**: 모듈 창 단일 `Toolbar` — 내부 창에는 툴바 없음, `invokeToolbar`/`registerToolbarHandlers`로 활성 내부 화면 연동. `BaseFeatureScreen.showToolbar`·`MesMdiEmbedContext`·`Toolbar.onAction`.
### 변경된 파일
- `renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/Toolbar.tsx`, `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/MesFeatureChrome.tsx`, `renderer/src/screens/std/MesScreenShell.tsx`, `renderer/src/pages/ModuleBlankPage.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-30 16:00 KST
### 작업 내용
- **기준정보 MDI(내부 창)**: OS **별도 창** 대신 **모듈 창 본문**에 겹침 패널(`MesMdiLayer`) — 동일 화면 ID 포커스·최대 10·FIFO. `electron/main.cjs`는 전 모듈 `mes:open-screen` 통일.
### 변경된 파일
- `electron/main.cjs`, `renderer/src/App.tsx`, `renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/MesMdiLayer.tsx`, `renderer/src/pages/ModuleBlankPage.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 14:00 KST
### 작업 내용
- **Electron 기준정보 다중 창**: `electron/main.cjs` — 동일 **화면 ID**는 기존 전용 창만 포커스, 서로 다른 화면은 **최대 10**·**11번째** 시 **FIFO** 종료. `docs/FEATURES.md` 반영.
### 변경된 파일
- `electron/main.cjs`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/USER_PROMPTS_LOG.md`

## 2026-03-31 13:00 KST
### 작업 내용
- **`USER_PROMPTS_LOG`**: **응답 전 질문만 선행 기록**, **응답 후 답 요약** — `project-rules.md` §2·**`.cursorrules`**·**`ai-rules.md`**·`DOCUMENTATION_INDEX` 정정.
### 변경된 파일
- `docs/USER_PROMPTS_LOG.md`, `project-rules.md`, `.cursorrules`, `ai-rules.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`

## 2026-03-31 12:00 KST
### 작업 내용
- **`docs/USER_PROMPTS_LOG.md`**: 누락된 대화 턴(다중 창 설계 질의·로그 반영 여부) 보강.
### 변경된 파일
- `docs/USER_PROMPTS_LOG.md`, `docs/CHANGELOG.md`

## 2026-03-31 00:00 KST
### 작업 내용
- **`docs/USER_PROMPTS_LOG.md`**: 턴마다 사용자 프롬프트·답 요약 **자동 기록** — **`project-rules.md` §2**·**`.cursorrules`**·**`ai-rules.md`** 에 규칙 추가. **`DOCUMENTATION_INDEX`** 필수 항목으로 조정.
### 변경된 파일
- `docs/USER_PROMPTS_LOG.md`, `project-rules.md`, `.cursorrules`, `ai-rules.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`

## 2026-03-30 23:00 KST
### 작업 내용
- **`docs/USER_PROMPTS_LOG.md`**: 사용자 질문·프롬프트 **자동 저장 없음** 안내 및 선택 로그 템플릿. **`docs/DOCUMENTATION_INDEX.md`** 에 선택 항목으로 링크.
### 변경된 파일
- `docs/USER_PROMPTS_LOG.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`

## 2026-03-30 22:00 KST
### 작업 내용
- **`docs/LAYOUT_RULES.md`**: 반영된 **`SimpleGridTable`** 동작을 **「`SimpleGridTable` 공통 기능·옵션」** 소절로 정리(신규 화면 참고). **`project-rules.md` §6.1** 교차 참조 보강.
### 변경된 파일
- `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`, `project-rules.md`

## 2026-03-30 21:00 KST
### 작업 내용
- **`SimpleGridTable` 열 더블클릭 맞춤**: `GROUPCODE` 등 **마지막 한 글자만 다음 줄**로 내려가던 현상 — `td`만 `scrollWidth` 쓰면 `border-collapse`·서브픽셀에서 부족할 수 있어 **`measureCellWidthPx`**(내부 `span`/`button`의 `getBoundingClientRect`·`scrollWidth` 병행), **`COLUMN_FIT_EXTRA_PX` 10px** 상향.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 20:00 KST
### 작업 내용
- **`SimpleGridTable` 열 더블클릭 맞춤**: `table-fixed`에서 넓은 열은 `scrollWidth`가 **내용이 아니라 할당 너비**에 가까워 **줄어들지 않던** 문제 — 해당 `colgroup col`을 일시 `1px`로 두고 `scrollWidth`로 한 줄 폭 측정. **한 글자 잘림** 완화를 위해 **`COLUMN_FIT_EXTRA_PX`(4px)** 여유.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 19:00 KST
### 작업 내용
- **`SimpleGridTable` `columnResize`**: **마지막 열 오른쪽**에도 리사이즈 핸들 추가 — 맨 끝 열 **드래그·더블클릭** 가능(기존: 마지막 열에 핸들 없음 → 헤더 더블클릭 시 글자 선택·줄바꿈처럼 보임). 단일 열 표에서도 드래그 가능하도록 `pxColWidths` 길이 가드 완화.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-30 18:00 KST
### 작업 내용
- **`SimpleGridTable` `columnResize`**: 열 구분선 **더블클릭** 시 **왼쪽 열** 너비를 헤더·본문 **텍스트 한 줄 최대 폭**에 맞춤(`measureColumnFitWidth`). 드래그는 **약 5px 이상** 이동 시에만 시작해 더블클릭과 충돌 완화.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-31 15:00 KST
### 작업 내용
- **`SimpleGridTable` `columnResize`**: 구분선 드래그 시 **왼쪽 열만** 너비 변경 — **우측 열은 유지**, 표 **전체 너비**만 변해 가로 스크롤(기존: 좌·우 열 상쇄).
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-31 14:00 KST
### 작업 내용
- **`SimpleGridTable`**: **`columnResize`** — 열 경계 드래그로 너비 조절(`px` `colgroup`, 최소 **`minColumnWidthPx`**), **`columnResizeVisualScale`** 로 부모 `zoom` 보정.
- **공통코드 관리**: **`columnResize`**·**`columnResizeVisualScale={gridZoomPct/100}`** 활성화, 안내 문구 추가.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-31 13:00 KST
### 작업 내용
- **`SimpleGridTable`**: 그리드 본문 래퍼에 **`min-w-0`·`overflow-x-auto overflow-y-auto`**, 루트에 **`overflow-hidden`** — flex 높이 체인에서 **세로·가로 스크롤**로 전체 행·넓은 열 표시.
- **공통코드 관리**: `zoom` 래퍼를 **`flex flex-col flex-1 min-h-0`** 로 두어 자식 그리드가 **남는 높이**를 받도록 수정.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-31 12:00 KST
### 작업 내용
- **`STD_COMMON_CODE_ROWS`**: `docs/image/std_base_common_code_mgmt.png` 그리드에 보이는 **29행 전량** 반영(기존 5행 확장).
### 변경된 파일
- `renderer/src/screens/std/stdPngSampleData.ts`, `docs/CHANGELOG.md`

## 2026-03-31 11:00 KST
### 작업 내용
- **공통코드 그리드 정렬**: `sortCol`/`sortDir` **분리 `setState` 중첩 제거** → `{ col, dir }` **단일 객체**로 갱신해 **같은 열 토글**이 안정적으로 동작하도록 수정.
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-31 10:00 KST
### 작업 내용
- **공통코드 그리드 정렬**: 헤더 **클릭마다** 오름↔내림 전환 — **다른 열**로 바꿀 때도 항상 오름차순으로 리셋하지 않고 **방향만 토글**(맨 처음 열만 오름차순 시작).
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 23:00 KST
### 작업 내용
- **`SimpleGridTable`**: 선택적 **열 헤더 클릭 정렬**(`sortable`, `sortColumn`, `sortDirection`, `onSortColumn`) — `th`에 `aria-sort`, 활성 열에 ▲/▼.
- **공통코드 관리**: `localeCompare`(**`numeric: true`**) 기준 정렬, 정렬 후 **`#` 열은 표시 순 1…n**으로 재부여.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 22:30 KST
### 작업 내용
- **공통코드 관리 그리드 줌**: 최소 배율 **40%**까지 허용(기존 70% 하한 완화).
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 22:00 KST
### 작업 내용
- **공통코드 관리만**: 그리드 영역 **Ctrl+휠 / ⌘+휠** 확대·축소(70%~200%, CSS `zoom` + `wheel` `passive: false`), 상단에 **배율(%)**·안내.
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 21:00 KST
### 작업 내용
- **공통코드 관리만**: 그리드 본문(`td`) **좌측 정렬** — `columnClassNames`에 열별 `text-left`.
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 20:30 KST
### 작업 내용
- **공통코드 관리만**: 그리드 **좌측 라인번호 열(`#`)** 추가 — 데이터·빈 행 모두 `1…n` 표시, 열은 `text-right tabular-nums`.
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 20:00 KST
### 작업 내용
- **공통코드 관리(`std_base_common_code_mgmt`)만**: 조회줄 **Group Code** 를 **`FormLabelInput`** 으로 통일(`LAYOUT_RULES.md` 라벨·컨트롤 한 줄). 하단 **Description** 은 textarea 규칙(**`items-start`**, 라벨 **`pt-0.5`**) 적용 — 기준정보 타 화면 반영은 별도 예정.
### 변경된 파일
- `renderer/src/screens/std/std_base_common_code_mgmt.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 18:30 KST
### 작업 내용
- **기준정보 std 화면**: `stdPngSampleData.ts` 목업과 연동 — **사용자 LOG·포장단위·Tact·생산라우트·사용자권한(멤버+프로그램)·단위공정라인·공정라인·공정라인구성(상·하)·메뉴권한 트리** 등 캡처 기준 예시 행 반영.
- **`stdPngSampleData`**: `STD_USER_PERM_PROGRAM_ROWS`, `STD_MENU_PERM_TREE_SAMPLE`, `STD_PROCESS_LINE_CONFIG_*_COLS` 추가.
- **생산 라우트 화면**: 라우트·라우트 공정 리스트 그리드를 **전체 샘플 행**으로 표시.
### 변경된 파일
- `renderer/src/screens/std/stdPngSampleData.ts`, `renderer/src/screens/std/std_base_user_log_inq.tsx`, `std_cfg_packing_unit_mgmt.tsx`, `std_cfg_tact_time_mgmt.tsx`, `std_cfg_prod_router_mgmt.tsx`, `std_base_user_permission_mgmt.tsx`, `std_base_unit_process_line_mgmt.tsx`, `std_base_process_line_mgmt.tsx`, `std_base_process_line_config_mgmt.tsx`, `std_base_menu_permission_mgmt.tsx`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-30 19:00 KST
### 작업 내용
- **창 제목(`document.title`)**: 매뉴얼 매칭 시 **`BK MES - 모듈 > 메뉴 > 하위메뉴 [화면ID]`**, 미매칭 시 **`BK MES - [화면ID]`** — `docs/image/<화면ID>.png` 와 대조 용이.
- **`MesFeatureChrome`**: 선택 **`screenId`** 시 동일 규칙(미전달 시 기존처럼 경로만).
- **`ScreenPlaceholderPage`**: 플레이스홀더 모드 제목도 `[화면ID]` 접미사 정렬.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `MesFeatureChrome.tsx`, `ScreenPlaceholderPage.tsx`, `renderer/src/lib/useScreenManualMeta.ts`, `project-rules.md`, `docs/LAYOUT_RULES.md`, `docs/SETUP.md`, `docs/CHANGELOG.md`

## 2026-03-31 16:00 KST
### 작업 내용
- **기능 화면 Chrome**: 툴바·메뉴바 **아래** **경로(브레드크럼)·「이전 단계로」 영역 제거**.
- **`document.title`**: **`BK MES - 모듈 > 메뉴 > 하위메뉴`** (`manualTitlePath`) — **`BaseFeatureScreen`·`MesFeatureChrome`** 은 **`documentTitlePath`** prop. **`MesScreenShell`** 은 **`useDocumentTitlePath(screenId)`** 자동.
- **문서**: `project-rules.md` §6.0, `docs/LAYOUT_RULES.md`, `docs/SETUP.md` 반영.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/MesFeatureChrome.tsx`, `renderer/src/lib/useScreenManualMeta.ts`, `renderer/src/screens/std/MesScreenShell.tsx`, `project-rules.md`, `docs/LAYOUT_RULES.md`, `docs/SETUP.md`, `docs/PROJECT_STRUCTURE.md`, `docs/CHANGELOG.md`

## 2026-03-31 15:00 KST
### 작업 내용
- **기준정보 모듈** `manual.csv` **14개** 화면 ID(`std_base_*`·`std_cfg_*`) — **`docs/image/<화면ID>.png`**·`docs/LAYOUT_RULES.md`·`BaseFeatureScreen`/`SimpleGridTable` 기준으로 **1차 UI 구현**(`renderer/src/screens/std/*`, **`STD_FEATURE_SCREEN_REGISTRY`**).
- **`ScreenPlaceholderPage`**: 레지스트리에 등록된 ID는 해당 컴포넌트 렌더, 미등록은 기존 플레이스홀더.
- **`BaseFeatureScreenProps`** export, **`useScreenManualMeta`** / **`MesScreenShell`**(브레드크럼·`screenId` 자동).
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `renderer/src/lib/useScreenManualMeta.ts`, `renderer/src/screens/std/**`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/PROJECT_STRUCTURE.md`, `docs/TODO.md`, `docs/CHANGELOG.md`

## 2026-03-31 14:00 KST
### 작업 내용
- **Electron 메인 창**: 크기 **740×500** 고정(`resizable: false`), **최대화 버튼 비표시**(`maximizable: false`).
### 변경된 파일
- `electron/main.cjs`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-31 12:00 KST
### 작업 내용
- **스플래시**: 모듈 타일 **테두리·그림자·배경 카드 제거**, 그리드 **간격 0**·행 **최대 너비 `MODULE_SPRITE.width`** 로 6칸이 스프라이트 슬라이스와 맞닿게 표시.
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 24:00 KST
### 작업 내용
- **스플래시**: **SCM** 모듈 타일 **클릭 비활성화**(`disabled`, 사양 미정). 호버 시 `모듈_on` 전환 없음.
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-30 23:00 KST
### 작업 내용
- **메인(스플래시)**: 모듈 타일을 **`모듈_off.png`** / **`모듈_on.png`** 각각 가로 6등분 스프라이트로 표시. 기본은 **off**, **호버** 시 동일 슬라이스의 **on**으로 전환. **삭제**: `모듈.png`, `기준정보_on.png`, `제품관리_on.png`, `자재관리_on.png`, `생산관리_on.png`, `구매관리_on.png`(기존 개별 호버 PNG).
### 변경된 파일
- `renderer/src/splash/splashAssets.ts`, `renderer/src/components/SplashScreen.tsx`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-30 22:00 KST
### 작업 내용
- **메인(스플래시)**: 헤더 좌측 로고를 **`docs/image/아이콘.png`**. 모듈 타일은 **`모듈.png`** 가로 6등분 스프라이트(`splashAssets.ts` `MODULE_SPRITE`). **호버** 시 모듈별 `*_on.png`(`기준정보_on` … `SCM_on`, 자재는 **`자재관리_on..png`** 파일명 그대로) 오버레이.
### 변경된 파일
- `renderer/src/splash/splashAssets.ts`, `renderer/src/components/SplashScreen.tsx`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-30 21:00 KST
### 작업 내용
- **`Toolbar`**: 버튼을 **아이콘 좌·라벨 우** 가로 배치(`flex-row`·`gap-1.5`). **`LAYOUT_RULES.md`** 본문 액션 예시와 구분해 서술.
### 변경된 파일
- `renderer/src/components/Toolbar.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-30 20:00 KST
### 작업 내용
- **`ScreenPlaceholderPage`·`ModuleFeaturesPage`**: 툴바 아래 **경로(MES>…)·뒤로/메인으로** 영역 제거.
- **창 제목(`document.title`)**: 화면 플레이스홀더는 매뉴얼 매칭 시 **`BK MES - 모듈 > 메뉴 > 하위메뉴`** (`manualTitlePath`). 미매칭 시 `화면 ID`만.
- **`manual.ts`**: `manualTitlePath` 추가.
### 변경된 파일
- `renderer/src/lib/manual.ts`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `renderer/src/pages/ModuleFeaturesPage.tsx`, `docs/CHANGELOG.md`

## 2026-03-30 19:00 KST
### 작업 내용
- **모듈 전용 창** 초기 URL을 `#/module/<모듈명>` 으로 분리, **`ModuleBlankPage`**(빈 본문·slate 배경)만 표시. 기능 진입은 메뉴·`#/screens/<화면ID>` 유지.
### 변경된 파일
- `renderer/src/pages/ModuleBlankPage.tsx`, `renderer/src/App.tsx`, `electron/main.cjs`, `docs/CHANGELOG.md`

## 2026-03-30 18:00 KST
### 작업 내용
- **Electron**: 메인 스플래시에서 **기준정보·제품관리·자재관리·생산관리·구매관리** 클릭 시 **`mes:open-module-window`** → **새 BrowserWindow**(`#/modules/<모듈명>`). 각 모듈 창에 **`win.setMenu`**: **파일**(창 닫기·끝내기) | **매뉴얼 CSV `메뉴` 열마다 상위 메뉴 + `하위메뉴` 서브** | **Window** | **도움말**. 하위 클릭 시 **`mes:open-screen`**. 메인 창은 `setMenu(null)`. **SCM**은 기존처럼 같은 창 `#/modules/SCM`.
### 변경된 파일
- `electron/main.cjs`, `electron/preload.cjs`, `renderer/src/mes-env.d.ts`, `renderer/src/components/SplashScreen.tsx`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/PROJECT_STRUCTURE.md`, `README.md`, `docs/CHANGELOG.md`

## 2026-03-30 17:00 KST
### 작업 내용
- **Electron**: 상단 **애플리케이션 메뉴 제거** — `Menu.setApplicationMenu(null)`. CSV 기반 `파일|모듈|Window|도움말` 메뉴 빌드 코드 삭제. 화면 이동은 렌더러만 사용(브라우저와 동일한 느낌).
### 변경된 파일
- `electron/main.cjs`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/PROJECT_STRUCTURE.md`, `README.md`, `docs/CHANGELOG.md`

## 2026-03-30 16:00 KST
### 작업 내용
- **메인(스플래시)**: **`main.png` 배경 이미지 제거** — 그라데이션만 사용. 앱 **내부 메뉴 바**는 두지 않음(Electron **시스템 메뉴**는 `electron/main.cjs` 그대로).
### 변경된 파일
- `renderer/src/components/SplashScreen.tsx`, `docs/CONTEXT.md`, `docs/FEATURES.md`, `docs/PROJECT_STRUCTURE.md`, `README.md`, `docs/CHANGELOG.md`

## 2026-03-30 12:00 KST
### 작업 내용
- **`docs/매뉴얼.csv` 전면 교체**에 맞춰 앱 골격 재구성: `renderer/src/data/manual.csv` 동기화(4열), **`lib/manual.ts`** 파서 갱신.
- **구 세대 화면 제거**: `ScreenRouterPage` 및 `basis`·`product`·`material`·`iqc`·`material-trace`·`material-stock`·`production`·`process`·`quality`·`oqc`·`shipment`·`report` 하위 TSX·유틸 삭제.
- **스플래시**: `docs/image/main.png` 참조(`@docs/image/main.png?url`)·`main.png` 레이아웃에 가깝게 좌 패널·로고·6모듈 타일·하단 안내.
- **라우팅**: `ModuleFeaturesPage`(메뉴 그룹별 목록), `ScreenPlaceholderPage`(화면 ID 플레이스홀더). **SCM** 타일은 매뉴얼 미정의 시 안내만.
- **Electron**: `Menu.setApplicationMenu` — **파일** | **모듈별 중첩 메뉴**(메뉴→하위메뉴) | **Window** | **도움말**; `mes:open-screen`·`mes:quit` preload IPC. `package.json` `electron-builder` `files`에 **`docs/매뉴얼.csv`** 포함.
- **문서**: `project-rules.md` §6.0 CSV 컬럼·라우트 설명 갱신, `FEATURES.md`·`CONTEXT.md` 재작성.
### 변경된 파일
- `renderer/src/App.tsx`, `renderer/src/lib/manual.ts`, `renderer/src/components/SplashScreen.tsx`, `renderer/src/pages/ModuleFeaturesPage.tsx`, `renderer/src/pages/ScreenPlaceholderPage.tsx`, `renderer/src/data/manual.csv`, `renderer/vite.config.ts`, `renderer/src/mes-env.d.ts`, `electron/main.cjs`, `electron/preload.cjs`, `package.json`, `scripts/inject-base-feature-screen-id.mjs`, `project-rules.md`, `.cursorrules`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/TODO.md`, `docs/PROJECT_STRUCTURE.md`, `README.md`
### 다음 작업 예정
- 화면별 **`docs/image/<화면ID>.png`** 및 실제 화면 컴포넌트 구현(플레이스홀더 교체).

## 2026-03-18 20:15 KST
### 작업 내용
- **공정관리 화면 수** 문서 정정: `manual.csv` 공정관리 구간은 **11개**(`frmChamberIOMaster`~`frmProcessStockModifyHist`) — **`MODULE_PNG_SYNC.md`·`FEATURES.md`·`CONTEXT.md`**에서 기존 **10** 표기를 **11**로 맞춤.
### 변경된 파일
- `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 20:00 KST
### 작업 내용
- **`docs/image`** 기준 **공정관리 11화면** 재정합: **`renderer/src/pages/process/processUi.ts`**. 제습함 관리/이력·MSL 열명·메탈마스크(LIST·우측 정보·선택작지품번·스텐실 이력 요약+차트)·솔더(단위·우측 패널·다열 목록)·마스터샘플 등록·현장 재고 조정(`v`·2행)·조절 이력.
- **`docs/MODULE_PNG_SYNC.md`·`FEATURES.md`·`CONTEXT.md`** 갱신. **`manual.csv`**: `frmMasterSampleMaster`·`frmProcessStockModify*` 표기 PNG 동기화 권장.
### 변경된 파일
- `renderer/src/pages/process/processUi.ts`(신규), `ChamberIOMasterScreen.tsx`, `ChamberIOHistoryScreen.tsx`, `StencilMasterScreen.tsx`, `StencilManagementScreen.tsx`, `StencilHistoryScreen.tsx`, `SolderDetailScreen.tsx`, `SolderManagementScreen.tsx`, `SolderHistoryScreen.tsx`, `MasterSampleMasterScreen.tsx`, `ProcessStockModifyScreen.tsx`, `ProcessStockModifyHistScreen.tsx`, `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 19:15 KST
### 작업 내용
- **`docs/image`** 기준 **리포트 8화면** 재정합: **`reportUi.ts`**. IQC 일별 필터 순서·**불량률**; OQC 일별 품번 우선·요약 **sky**·탭 **일별 불량율**; OQC 유형별 **출하검사 유형별 불량내역**·2행 조회; 공정불량 **검수형태·탱크**; 출하01 2행 필터; 모델 계획대비 **작업면**; ShipmentReport02 className 오타 수정.
- **`docs/MODULE_PNG_SYNC.md`·`FEATURES.md`·`CONTEXT.md`** 갱신. **`manual.csv`** `frmOQCDailyDefectResult` 기능명 동기화 권장.
### 변경된 파일
- `renderer/src/pages/report/reportUi.ts`(신규), `IQCDailyInspectResultScreen.tsx`, `OQCDailyInspectResultScreen.tsx`, `OQCDailyDefectResultScreen.tsx`, `ProcessDefectListScreen.tsx`, `ShipmentReport01Screen.tsx`, `ShipmentReport02Screen.tsx`, `ModelProdPlanAndResultScreen.tsx`, `DailyProdPlanAndResultScreen.tsx`, `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 18:30 KST
### 작업 내용
- **`docs/image`** 기준 **출하 4화면** 재정합: 공통 **`renderer/src/pages/shipment/shipUi.ts`** (`150px`·`h-7`·기간·2행 줄바꿈). **`frmStockGoodsList`**: PNG **출하가능 재고 조회**·비고 열 **`colWidths`**·품명/규격/비고 **`text-left`**. **`frmPlanningAssyStock`**: **생산계획 대비 재고 조회**·기본 기간 캡처와 동일일. **`frmShipmentByDate`**: **일별 출하현황**·라디오 `frmShipmentByDate_modelScope`·`shipUi`. **`frmShipmentReport03`**: PNG **2행** 필터(출하일·집계·품번·품명 / 납품처·규격)·세부내역 집계 기본 체크.
- **`docs/MODULE_PNG_SYNC.md`** 출하 절 표 반영, **`FEATURES.md`·`CONTEXT.md`** 갱신.
- **`renderer/src/data/manual.csv`**, **`docs/매뉴얼.csv`**: 파일 잠금 시 편집 실패할 수 있음 — IDE에서 닫은 뒤 아래와 동기화 권장: `출하가능 재고 조회`, `생산계획 대비 재고 조회`, `일별 출하현황`.
### 변경된 파일
- `renderer/src/pages/shipment/shipUi.ts`(신규), `StockGoodsListScreen.tsx`, `PlanningAssyStockScreen.tsx`, `ShipmentByDateScreen.tsx`, `ShipmentReport03Screen.tsx`, `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (품질관리 모듈 PNG 재정합)
### 작업 내용
- **`docs/image`** 기준 **품질관리 7화면**: **`qualityUi.ts`** (`150px`·`h-7`). **`frmStockPartsVndLOT`**: PNG 제목 **자재 LOT 추적 (라벨별)**·필터 순서(창고·업체 LOT·입고일·…). **`frmSubPartInputHis`**: **부자재 투입이력**·**작업명**. **`frmStockPartsLOTHist`**: 3단 헤더·레코드당 3행·수입검사 행 **amber**. **`frmProdHistoryQR`**: 프로세스·라인·생산일자·검색·**A~I**. **`frmLotHistory`**: **LOT별 전체 이력 조회**·40/60. **`frmShipPackingHistory`**: 모델+세부·**No+BARCODE**. **`frmRepairRegResult`**: **수리 내역 등록**·검색구분·BARCODE 바·**저 장**·하단 18열.
- `manual.csv` 기능명과 PNG 창 제목이 다른 화면은 **`MODULE_PNG_SYNC.md`** 표 참고.
### 변경된 파일
- `renderer/src/pages/quality/*.tsx`(7), `renderer/src/pages/quality/qualityUi.ts`, `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (생산관리 모듈 PNG 재정합)
### 작업 내용
- **`docs/image`** 기준 **생산관리 6화면**: **`prodUi.ts`**. **`frmProdPlan`**: 공정 고정 **SMT**·단위공정 **VISION**·라인 2중 헤더 **평탄화**(**`SMT 01/02`** 각 8열)·**`No`**. **`frmShiftDailyWorkData`**: 상반부 **No Data Available**·**Series 1/2** 범례(teal/purple)·하단 그리드. **`frmProdResultData`**: **조회결과1~5** 탭·그리드 선행 공란 열·**달성율**. **`frmProdPlanDataHis`**: 검색 **콤보+입력**·**`No`**·**단위수량**·일자 열 강조. **`frmMountItemScanHis`**: 2행 필터·**스캔일자**·작업조/시간 **라디오**·**`prodTimeCls`**·브레드크럼 **마운트자재 스캔 이력조회**.
- 상세: **`docs/MODULE_PNG_SYNC.md`** 생산관리 절.
### 변경된 파일
- `renderer/src/pages/production/*.tsx`(6), `renderer/src/pages/production/prodUi.ts`, `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (자재재고관리 모듈 PNG 재정합)
### 작업 내용
- **`docs/image`** 기준 **자재재고관리 10화면**: **`stockUi.ts`**(`150px`·`h-7`·2행 **`stockFilterRowBreakCls`**). **재고 메인/창고/SMT**: **`No`** 열·전월·실사/차이 열·PNG 순서·일부 **`cellValues`**. **전체창고**: **샘플구분**·2행. **입고기간/현재고**: **`+ 당월 입고`** 등·**샘플구분**·창고 기본 **자재창고**. **실사**: PNG 제목 **「재고실사 수정 및 확정」**·**`v`**·실사일 범위·**확정** 버튼. **수량 조정/이력/TID**: PNG 기능명·**`v`**·**입고순번**·이력 **계정**·TID **단일 그리드**·상태 바·검색 **TID** 기본.
- 상세: **`docs/MODULE_PNG_SYNC.md`** 자재재고 절.
### 변경된 파일
- `renderer/src/pages/material-stock/*.tsx`(10), `renderer/src/pages/material-stock/stockUi.ts`, `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (자재추적관리 모듈 PNG 재정합)
### 작업 내용
- **`docs/image`** 기준 **자재추적관리 11화면** 재구성: 공통 **`renderer/src/pages/material-trace/traceUi.ts`**(`traceFieldPngCls`·`traceDatePairCls`·`traceFilterRowBreakCls`)·라디오 **`frm…_`** 접두사. **입고 확정** **`v`·TID**·2행 필터, **입고내역** **샘플구분·라벨발행·TID**·2행, **일자별 입고** **샘플구분**·16열, **라벨 발행** **선택·v·Sequece**·등록자·측면 **amber** 강조, **발행이력** 2행·15열, **입고취소** 브레드크럼 **PNG** 「자재라벨별」(매뉴얼은 LOT별)·19열, **출고내역** 「자재출고 내역 조회」·출고일 2행·17열, **일자별 출고** 12열·부품분류 중복 헤더, **기간 출고** **Maker명**·ERP 중복·2행, **반품**·**투입금지** 상하 그리드·**v**·노란 입력줄 등.
- 상세 표: **`docs/MODULE_PNG_SYNC.md`** 자재추적 절.
### 변경된 파일
- `renderer/src/pages/material-trace/*.tsx`(11), `renderer/src/pages/material-trace/traceUi.ts`, `docs/MODULE_PNG_SYNC.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (수입검사 모듈 PNG 재정합)
### 작업 내용
- **`docs/image` 기준** 수입검사 **6화면** 정합: **`frmTempIncomingManual`**(그리드 `#`·**발행수량**·입고창고·필터 150px·기능명), **`frmTempIncomingList`**(20열·**발행수량**·필·`colWidths`), **`frmlQCInspectResultIncomingLump`**(열 **`v`·포장단위수량·판정수량**·판정 비고), **`frmIQCInspectResultIncoming`**(검사의뢰별·선입선출값·필터·메인 `colWidths`), **`frmIQCStandardFileUpdate`/`frmIQCStandardFileList`**(대표Item별·목업 3행·`bg-sky-50/35`). 유틸 **`equalPercentageColWidths`**. 나머지 모듈 절차는 **`docs/MODULE_PNG_SYNC.md`**.
### 변경된 파일
- `renderer/src/pages/iqc/TempIncomingManualScreen.tsx`, `TempIncomingListScreen.tsx`, `IQCInspectResultIncomingLumpScreen.tsx`, `IQCInspectResultIncomingScreen.tsx`, `IQCStandardFileUpdateScreen.tsx`, `IQCStandardFileListScreen.tsx`, `docs/MODULE_PNG_SYNC.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`frmInspectTypeOfItem` PNG 정합)
### 작업 내용
- **`docs/image/frmInspectTypeOfItem.png`**·**`LAYOUT_RULES.md`**: 조회 **무검사품/유검사품** 라디오(기본 무검사)·**부품·하위·ERP·규격** **`150px`·`h-7`**·**`justify-end`**. 그리드 **11열**·열 헤더 **`Maker명`**(공백 제거)·**`colWidths`**(합 100%)·**`Item 명`·`규격`·`Maker PartNo`** **`text-left`**. 구 **검사품 선택** 라벨 래퍼 제거. 본문 **`flex min-h-0 flex-1`** 래퍼.
### 변경된 파일
- `renderer/src/pages/material/InspectTypeOfItemScreen.tsx`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`frmIQCDefectApply_Item` PNG 정합)
### 작업 내용
- **`docs/image/frmIQCDefectApply_Item.png`** 기준: 조회 **`frmIQCInspectApply_Item`** 와 동일 **3×2 그리드** + 우측 **`FilterSearchButton`/`FilterSaveButton`**·**`border-l`**(`showFilterSearch`/`showFilterSave` false). **`150px`·`h-7`**. 상단 Item **`SimpleGridTable`** **타이틀 없음**·**5열 `colWidths`**. 하단 **불량/선택** **8열**·체크 **`v`**·**`frmIQCDefectApply_Class`** 와 동일 **`00500…`** 목업·선택 빈 행·**`bg-sky-50/35`**. 기능명 **`manual.csv`**: **Item별 불량항목 등록**.
### 변경된 파일
- `renderer/src/pages/material/IQCDefectApplyItemScreen.tsx`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`frmIQCDefectApply_Class` PNG 정합)
### 작업 내용
- **`docs/image/frmIQCDefectApply_Class.png`** 기준 재구성: 상단 마스터 **5열**(부품·하위·구분·단위·**설명** 넓게). 하단 체크 헤더 **`v`**, **`항목코드`** 목업 **`005001001`** 등·**수입검사**·**소재 SMT**·**도금/퓨즈셀/패턴 오픈** 등. **선택 항목**은 **빈 그리드** 목업. (Inspect Class 8열 마스터·☑·B코드 버전 폐기.)
### 변경된 파일
- `renderer/src/pages/material/IQCDefectApplyClassScreen.tsx`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`frmIQCDefectApply_Class` 재구성)
### 작업 내용
- **`frmIQCDefectApply_Class`**: **`frmIQCInspectApply_Class`** 와 정렬 — 조회 **부품분류·하위분류**만( **`150px`·`h-7`**, `justify-end`). 상단 **`No`·부품×2·하위×2·구분·단위·설명** + **`colWidths`** + 마스터 목업 **1/2/4**. 하단 셔틀 **불량 항목 / >> << / 선택 항목**, 좌·우 동일 **8열**(☑·…·**규격·설명** `text-left`), **`colWidths`**, **`bg-sky-50/35`**, 목업 **B01~B10**·선택 예시 **B99**. 구 **부품분류 목록 5열·필터 내 설명** 제거.
### 변경된 파일
- `renderer/src/pages/material/IQCDefectApplyClassScreen.tsx`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`frmIQCInspectApply_Item`)
### 작업 내용
- 하단 **검사/선택** 그리드: **`검사회수` 다음 `설명` 열** 추가(좌·우 **13열**, `colWidths`·`columnClassNames` 정합). 상단 **Item 목록**: **`SimpleGridTable` 타이틀 제거**(`title=""`).
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`SimpleGridTable` 기본 `colWidths` 균등 %)
### 작업 내용
- **`SimpleGridTable`**: `colWidths` **미전달·열 길이 불일치** 시 **`equalPercentageColWidths(columns.length)`**로 보정 → **전 화면** 기본 **adaptive**로 패널 너비 채움. 유틸 **`renderer/src/components/simpleGridTableUtils.ts`**. **`react-refresh`** 준수를 위해 함수는 **`BaseFeatureScreen.tsx`에서 export하지 않음**.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/simpleGridTableUtils.ts`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`frmItemMaster` 그리드 패널 채움)
### 작업 내용
- **`frmItemMaster`**: 상단 **`SimpleGridTable`**에 **`colWidths` 없어** 항상 **intrinsic**(`w-max`)로만 표시되던 문제 — **15열 `%`(합 100%)**·**`columnClassNames`** 추가 → 기본 **adaptive**로 넓은 뷰에서 패널 가로를 채움.
### 변경된 파일
- `renderer/src/pages/material/ItemMasterScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-18 (버그 수정)
### 작업 내용
- **`frmIQCInspectApply_Class`**: **`shuttleRightColWidths` 미정의** → `shuttleRightColWidths` 참조 시 **`ReferenceError`**, 화면 검은색. 12열 **`colWidths`**(합 **100%**) 추가.
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `docs/CHANGELOG.md`

## 2026-03-18 22:00 KST
### 작업 내용
- **`SimpleGridTable`**: **`columnLayout: 'adaptive'`**( `colWidths` 있을 때 기본) — **가로에 자연 너비가 다 들어가면** `table-fixed`+`%`, **모든 열이 한 번에 안 보일 때만** `table-auto`+텍스트+**`simpleGridCellPadXClass`**. `ResizeObserver`+테이블 클론 측정. **`frmIQCInspectApply_Class`/`Item`** `colWidths` 유지.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 21:30 KST
### 작업 내용
- **`SimpleGridTable`**: 기본 **`columnLayout: 'intrinsic'`** — **`table-auto`**, 열 너비 = **헤더·본문 최장 텍스트** + **`simpleGridCellPadXClass`**(rem, 「텍스트+10」). **`columnLayout="fixed"`** + **`colWidths`** 로만 **`table-fixed`**. **`simpleGridCellPadXClass`** export. **`frmIQCInspectApply_Class`/`Item`** 에서 `colWidths` 제거. 문서 갱신.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 21:00 KST
### 작업 내용
- **`frmIQCInspectApply_Class`/`Item`**: 하단 셔틀 **`규격` 열 `colWidths`** **33%/32% → ~**`20%`**(합 100% 재분배) — `table-fixed`로 인한 과도한 빈 너비 완화. **`LAYOUT_RULES.md`·`FEATURES`** 설명.
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-18 20:30 KST
### 작업 내용
- **`SimpleGridTable`**: 그리드 **열 타이틀(`th`) 항상 `text-center`** — **`columnClassNames`** 는 **`td`** 에만 적용. **`docs/LAYOUT_RULES.md`**·**`FEATURES`**·**`CONTEXT`**.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 20:15 KST
### 작업 내용
- **`SimpleGridTable`**: 셀 수평 패딩 **`px` → `rem`** — **`simpleGridCellPadXClass`** = **`px-[0.3125rem]`**(좌·우 합 **0.625rem**). 문서 갱신.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 20:00 KST
### 작업 내용
- **`SimpleGridTable`**: **`td`** 가로 상한 — **`px-[5px]`**(수평 **10px**) + **`span` `w-max max-w-full break-words`** 로 **텍스트 intrinsic + 10px 패딩**을 넘지 않게 함; **`th`** 도 **`span`**·**`min-w-max`**. 문서 갱신.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 19:45 KST
### 작업 내용
- **`SimpleGridTable`**: 열 헤더 **`whitespace-nowrap`·`min-w-max`**로 **타이틀 한 줄·최소 너비** 보장; **`table-fixed`+`colWidths`** 시 테이블 **`width:100%`**·**`min-width:max-content`**·가로 스크롤 정합. **`docs/LAYOUT_RULES.md`**·**`docs/FEATURES.md`**.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 19:00 KST
### 작업 내용
- **조회 영역 행간 추가 축소**: 스트립 **`py-0.5`**, `flex-wrap` **`gap-y-0.5`**, Search/Save 열 **`ml-2 pl-3 gap-1`**; **`FilterSearchButton`/`Save`** 패딩·아이콘 간격 축소·**`FilterSearchButtonStacked`** 여백 축소. **`frmIQCInspectApply_Class`/`Item`** 다행 **`gap-y-0.5`**. **`docs/LAYOUT_RULES.md`** 수치 갱신.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/FilterBarButtons.tsx`, `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-18 18:45 KST
### 작업 내용
- **조회(검색) 영역 행간**: **`BaseFeatureScreen`**·**`MesFilterRow`** 스트립 **`py-1`**, 필터 래퍼 **`gap-y-1`**·**`py-0`**; **`frmIQCInspectApply_Class`/`Item`** 조회 그리드·버튼 열 간격 축소. **`docs/LAYOUT_RULES.md`** 반영.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/components/FilterBarButtons.tsx`, `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-18 18:15 KST
### 작업 내용
- **조회줄 우측 정합**: **`BaseFeatureScreen`** 검색 영역 컨트롤 **우측 정렬** — **`frmIQCInspectApply_Item`** (`justify-end`·그리드 `shrink-0`), **`frmIQCInspectApply_Class`** (필터 `flex` 래퍼). **`docs/LAYOUT_RULES.md`** 「조회줄 Search / Save」에 구현 패턴 문서화.
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `docs/LAYOUT_RULES.md`, `docs/CHANGELOG.md`

## 2026-03-18 17:30 KST
### 작업 내용
- **`frmIQCInspectApply_Item`**: **`docs/image/frmIQCInspectApply_Item.png`** 재정합 — 조회 **2행**(부품분류·ERP·Item 명 / 하위분류·규격) + **`FilterSearchButton`·`FilterSaveButton`** 세로·**`border-l`**; 필드 **`150px`**; **Item 목록** `colWidths`(**Item 명** 확대); 하단 **검사/선택** 좌·우 **동일 12열**(**`검사회수`**, 이전 `검사횟수`·비대칭 열 수정).
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 16:00 KST
### 작업 내용
- **`LAYOUT_RULES.md`**: **`PNG 캡처 기반 레이아웃 정합`** 절 신설 — 텍스트박스·셀렉트 등 **컨트롤 너비를 PNG에 최대한 맞출 것**, 그리드 **예제 행은 캡처에 보이는 대로 모두 반영**; 그리드 절에서 교차 참조.
### 변경된 파일
- `docs/LAYOUT_RULES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 14:30 KST
### 작업 내용
- **`frmIQCInspectApply_Class`**: PNG 폭 정합 — 조회 `select` **`w-[150px]`**(고정)·`h-7`; 하단 **검사 항목 11열**·**선택 항목 12열**(`검사회수`만 우측); **`colgroup` %** 좌·우 각각 합 100% 보정; 마스터·A01~A20·ZZZ 등 **예제 행** 유지.
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/LAYOUT_RULES.md`

## 2026-03-20 19:18 KST
### 작업 내용
- **`SimpleGridTable`**: **`cellValues?: string[][]`** — 행 수 `max(rows, cellValues.length)`, 빈 셀은 NBSP.
- **`frmIQCInspectApply_Class`**: 상단 마스터·하단 **검사/선택** 그리드에 **예제 행**(원자재/부자재/소모품, A01~, ZZZ 무검사) 적용.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:17 KST
### 작업 내용
- **`frmIQCInspectApply_Class`**: 첨부 PNG 재구성 — 상단 **부품분류×2·하위×2·구분·단위·설명**·**설명 ~62%**; 하단 좌·우 **동일 12열**(최대·최소·검사횟수)·**규격 ~28%**; 조회 `select` **18rem·h-7**; 홀수 행 **`bg-sky-50/35`**.
- **`SimpleGridTable`**: **`colWidths`(`colgroup`+`table-fixed`)**, **`columnClassNames`**, **`oddRowClassName`** 옵션 추가.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 19:16 KST
### 작업 내용
- **`frmIQCInspectApply_Class`**: **실 캡처 PNG**와 어긋나던 부분 수정 — 상단 **`No`·부품분류·하위×2**(이전 `#`·부품분류 이중열 오류); 하단 **검사 항목** `Check`·`No`·…·**최댓값**, **선택 항목**에 **최소값·검사횟수** 추가(좌·우 비대칭, 이전 동일열 오류).
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 19:15 KST
### 작업 내용
- **`frmIQCInspectApply_Class`**: **`docs/image/frmIQCInspectApply_Class.png`** 재정합 — 조회 **부품분류·하위분류**만·부품분류 **`18rem`**; 상단 그리드 **`title` 제거**·`max-h`로 상·하 비율; 하단 셔틀 그리드에서 **검사횟수 열 제거**(좌·우 동일·PNG 열 구성).
### 변경된 파일
- `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:14 KST
### 작업 내용
- **`frmItemClassManage`**: 좌측 **`SimpleGridTable`** 패널 제목 **`부품분류` 제거**(`title=""`).
### 변경된 파일
- `renderer/src/pages/material/ItemClassManageScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:13 KST
### 작업 내용
- **`frmItemClassManage`**: 상단 **부품분류** `select` 가로 **`18rem`**(일반 조회 콤보 대비 약 2배).
### 변경된 파일
- `renderer/src/pages/material/ItemClassManageScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:12 KST
### 작업 내용
- **`frmItemClassManage`**: **부품분류** 콤보·**Search/Save** 줄을 우측 패널에서 **`BaseFeatureScreen` 상단 조회줄**로 이동(`filterArea` + 기본 우측 버튼 열).
### 변경된 파일
- `renderer/src/pages/material/ItemClassManageScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 19:11 KST
### 작업 내용
- **`frmMakerPartNo`**: 매핑 테이블 **PartNo·LOT No 등 첫 열**(`td`/`th`) **우측 정렬**(`justify-end`·`text-right`).
### 변경된 파일
- `renderer/src/pages/material/MakerPartNoScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:09 KST
### 작업 내용
- **`frmMakerPartNo`**: 하단 **30:40:30** 비율이 화면과 어긋나던 원인(2열 `flex-1` 등 **grow 불일치**)을 **`grid` `minmax(0,3fr/4fr/3fr)`** 로 교정; **2열** **`table-fixed`+`colgroup`** 로 **40% 폭 안에 표 맞춤**(헤더 `text-[10px]`·줄바꿈).
### 변경된 파일
- `renderer/src/pages/material/MakerPartNoScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 19:08 KST
### 작업 내용
- **`frmMakerPartNo`**: 하단 **Maker PartNo 정보** 1·2·3열 비율 **30% · 40% · 30%**(`flex-grow` 3:4:3, `flex-[3_1_0]` / `flex-[4_1_0]` / `flex-[3_1_0]`).
### 변경된 파일
- `renderer/src/pages/material/MakerPartNoScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 19:07 KST
### 작업 내용
- **`frmMakerPartNo`**: 하단 **Maker PartNo 정보** — **1·2·3열 `flex-1 min-w-0` 균등 분할**(고정 `14rem`/`15rem` 제거); **2열 매핑 테이블** 외곽·셀 **구분선 제거**.
### 변경된 파일
- `renderer/src/pages/material/MakerPartNoScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 19:06 KST
### 작업 내용
- **`frmMakerPartNo`**: 하단 2열 **폭 30% 축소·무선 테이블** 변경 **취소** — 다시 **`flex-1`** 매핑 영역·**테이블/셀 `border-slate-300`** 복구.
### 변경된 파일
- `renderer/src/pages/material/MakerPartNoScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 19:02 KST
### 작업 내용
- **`frmMakerPartNo`**: 하단 **Maker PartNo 정보**를 첨부 PNG 기준 **1열(필드) · 2열(매핑 `table`+헤더 7열) · 3열(주석) · 우측 Save** 로 재구성. **Maker PartNo**·**포장단위 수량**·매핑 **시작값/끝값**은 **`amber`** 강조(`frmItemMaster` 와 동일 토큰).
### 변경된 파일
- `renderer/src/pages/material/MakerPartNoScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 18:26 KST
### 작업 내용
- **자재정보관리 12화면**: `docs/image` PNG·**`docs/LAYOUT_RULES.md`** 기준 재정합 — **`frmItemClassManage`** 우측 헤더 **`MesFilterRow` `bare`**로 필터·Search/Save **`border-l`** 분리·그리드 열(☑·부품분류코드 등) 정리; **`frmMakerPartNo`** 상단 조회줄 **`showFilterSave={false}`**(하단 상세 Save 유지); **`frmItemMaster`** 조회 그리드 내 Search 열 **`border-l`** 래핑; **`frmlQCInspectFactor`** 레거시 범례(적색 안내)를 조회줄 좌측 **`mr-auto`** 블록으로 배치·우측은 **항목구분**만·그리드 열 명 PNG(부호·공차·자동판정·전체불량·사용여부 등) 정합; **`frmIQCInspectApply_Class`** 상단 목록 **`#` 열**·하단 **선택 항목**에 **`부호`** 열; **`frmIQCInspectApply_Item`** 동일 **`부호`** 정합; 나머지 자재 화면 폼 라벨 **`flex min-w-0 items-center`**·Tailwind **`shrink-0`**/`min-h-0 flex-1` 순서 통일.
- **`SimpleGridTable`**: `th`/`td`의 React **`key`를 컬럼 인덱스 기반**으로 변경해 **동일 표기 헤더 중복** 시 경고·렌더 문제 방지.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/material/*.tsx`(12개), `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (제품관리 모듈 `LAYOUT_RULES.md` 일괄)
### 작업 내용
- **제품관리 7화면**: 조회줄 **`MesFilterRow` `bare`** 또는 **`border-l`** Search 열; 폼 라벨 **`text-slate-700`**·**`w-[80px]`** 정합; 그리드 **`td` `text-slate-600`** 보강; **품번 관리** 조회 2행 **`MesFilterRow`**·모델정보 라벨 톤 통일.
### 변경된 파일
- `renderer/src/pages/product/*.tsx`(7개), `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (docs/LAYOUT_RULES.md 분리)
### 작업 내용
- **UI 레이아웃 규칙**을 **`docs/LAYOUT_RULES.md`** 로 이전(폼·본문 액션·조회줄 구분선·Search/Save·기간 `~`·색상·그리드).
- **`project-rules.md`**: §6.0 유지, §6.1은 **상세 문서 링크** + 브리핑·갱신·문서 목록에 `LAYOUT_RULES.md` 반영.
- **`.cursorrules`**, **`docs/FEATURES.md`**, **`docs/CONTEXT.md`**: 교차 참조 갱신.
### 변경된 파일
- `docs/LAYOUT_RULES.md`, `project-rules.md`, `.cursorrules`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/TODO.md`, `docs/DOCUMENTATION_INDEX.md`, `docs/CHANGELOG.md`

## 2026-03-18 (규칙: 조회줄 필터–버튼 수직 구분선)
### 작업 내용
- **`project-rules.md` §6.1**: 「**조회줄: 필터–버튼 수직 구분선**」 소절 신설 — **`border-slate-300`** 이유(`bg-slate-50` 대비), **`items-stretch`**, **`BaseFeatureScreen`/`MesFilterRow`** 필수·나열 안 함, **`MesFilterRow` `bare`** 용도, 예외. 기존 「조회줄 Search / Save」는 본 소절 참조로 정리.
### 변경된 파일
- `project-rules.md`, `docs/CHANGELOG.md`

## 2026-03-18 (`frmProdRouteManagement` 조회줄 구분선)
### 작업 내용
- **상단 라우트 조회**: **`MesFilterRow`** 복구 — 필터·**Search(S)** 사이 **`border-l`** 표시.
- **`MesFilterRow`·`BaseFeatureScreen`**: 구분선 **`border-slate-300`**, 행 **`items-stretch`** 로 **`bg-slate-50`** 등에서도 선이 눈에 띄도록 통일.
### 변경된 파일
- `renderer/src/pages/basis/ProdRouteManagementScreen.tsx`, `renderer/src/components/FilterBarButtons.tsx`, `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/basis/ProdTactTimeScreen.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-18 (기준정보관리 UI 레이아웃 §6.0·§6.1 일괄)
### 작업 내용
- **`MesFeatureChrome`**: props에 **`breadcrumbSuffix`** 반영(분해 누락 수정).
- **`frmUser`·`frmCustomer`**: **`BaseFeatureScreen`** + 조회줄 **`border-l`**·§6.1 폼/그리드(`whitespace-nowrap` 등).
- **`frmLineMng`·`frmUnitProcessMng`**: **`BaseFeatureScreen`**·**`showFilterSave={false}`**.
- **`frmPackingUnitMng`·`frmProdRouteManagement`·`frmProdTactTimeManagement`**: 카드/탭 조회줄 **`MesFilterRow` `bare`**(필터 \| Search **`border-l`**).
- **`frmUserAuthority`**: 중복 Toolbar/메뉴바/브레드크럼 제거 → **`MesFeatureChrome`**; `document.title` 공통 규칙과 통일.
- **`frmMenuAuthMng`**: **`MesFeatureChrome`** + **`breadcrumbSuffix`**; 범례·권한그룹 **`MesFilterRow`**.
### 변경된 파일
- `renderer/src/components/MesFeatureChrome.tsx`, `renderer/src/pages/UserScreen.tsx`, `renderer/src/pages/basis/CustomerScreen.tsx`, `renderer/src/pages/basis/LineMngScreen.tsx`, `renderer/src/pages/basis/UnitProcessMngScreen.tsx`, `renderer/src/pages/basis/PackingUnitMngScreen.tsx`, `renderer/src/pages/basis/ProdRouteManagementScreen.tsx`, `renderer/src/pages/basis/ProdTactTimeScreen.tsx`, `renderer/src/pages/basis/UserAuthorityScreen.tsx`, `renderer/src/pages/basis/MenuAuthMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (`frmCommonCode` BaseFeatureScreen)
### 작업 내용
- **`frmCommonCode`**: `ScreenRouterPage` 인라인 제거 → **`pages/basis/CommonCodeScreen.tsx`**. **`BaseFeatureScreen`** + **`filterArea`**(Group Code)·조회줄 **필터–버튼 `border-l`**·**`FilterSearchButton`/`FilterSaveButton`**. 그리드/하단 Code Information §6.1 정돈(`sticky`·`whitespace-nowrap`·폼 라벨·`bg-slate-50/60`).
### 변경된 파일
- `renderer/src/pages/basis/CommonCodeScreen.tsx`, `renderer/src/pages/ScreenRouterPage.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-18 (조회줄 필터–버튼 구분선)
### 작업 내용
- **규칙·구현**: 조회줄에서 **필터 영역**과 **Search/Save 열** 사이 **`border-l border-slate-200/80`**·**`pl-4`**·**`ml-3`**(§6.1 「조회줄 Search / Save」). **`BaseFeatureScreen`** `flex-1` 필터 래퍼 + 우측 버튼 열 분리.
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (조회줄 Search/Save 정합)
### 작업 내용
- **`FilterBarButtons.tsx`**: **`FilterSearchButton`**·**`FilterSaveButton`**·**`FilterSearchButtonStacked`** — **`ToolbarIcon`**(`search`/`save`) + `filterBarIconWrapClass`. **`BaseFeatureScreen`** 기본 조회 버튼 및 **`MesFeatureChrome`/`ScreenRouterPage`/제품·기준정보·자재** 등 조회줄 **녹색 점** 일괄 제거·통일.
- **`project-rules.md` §6.1**: 「**조회줄 Search / Save**」 절 추가.
### 변경된 파일
- `renderer/src/components/FilterBarButtons.tsx`, `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/**` (다수), `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (규칙: 본문 액션 버튼)
### 작업 내용
- **`project-rules.md` §6.1**: 「**본문 액션 버튼**」 신설 — **위치**(필드·메타 그룹 vs 우측 `shrink-0` 열), **영역 구분**(`border-l`·전폭 가로 divider 금지 사례), **`ToolbarIcon`·래퍼·버튼 클래스**, **이름 매핑**(save/excel/new/grid) 명문화. §6.0 Chrome 문단은 본 절 참조로 정리.
### 변경된 파일
- `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (frmItemMaster Loss 행 레이아웃)
### 작업 내용
- **`frmItemMaster` 자재 정보**: **Loss / 제습함 / 평균배송** 행을 **좌·우 폼과 동일 폭 열 그룹**으로 넣고 **전폭 `border-t` 제거** — 버튼 열 아래로 침범하지 않아 **ERP 코드 블록과 한 영역**처럼 보이도록 정합. 등록·수정 행도 동일 그룹 내 배치.
### 변경된 파일
- `renderer/src/pages/material/ItemMasterScreen.tsx`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (ToolbarIcon 공유)
### 작업 내용
- **`ToolbarIcon` 분리**: `renderer/src/components/ToolbarIcons.tsx` — **`Toolbar`·`frmItemMaster` 자재 정보 액션** 동일 SVG. **`grid`** 아이콘 추가(Maker PartNo 등).
### 변경된 파일
- `renderer/src/components/ToolbarIcons.tsx`, `renderer/src/components/Toolbar.tsx`, `renderer/src/pages/material/ItemMasterScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `project-rules.md`

## 2026-03-18 (자재 정보 그리드)
### 작업 내용
- **`frmItemMaster` — 자재 정보**: 첨부 PNG와 동일 구조 — **좌측** ERP·Item·유효기간·규격(통행)·공정/부품분류·하위공정/하위분류·빈행·유무연(중앙) / **우측** 고객사(기본 공용자재)·품번·선입선출·포장단위(1)·단위·MOQ·관리등급·안전재고(1)·단가구분·기본통화·Item Type·창고 적재위치 / **우측 세로** Save·엑셀 업로드·업로드 양식·**Maker PartNo** 버튼 / **하단** Loss·제습함 보관위치·평균배송기간(일), 등록일시·등록자·수정일시·수정자(readonly). **ERP 코드·Item 명** 강조 배경(amber), 구 **`유무면` → `유무연`**, **Maker PartNo** 체크박스 → 버튼
### 변경된 파일
- `renderer/src/pages/material/ItemMasterScreen.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-18 (필터 순서)
### 작업 내용
- **`frmItemMaster`**: 조회 **1행** 고객사·부품분류·ERP 코드·Item 명 / **2행** Master·스캐너 포트·대표 Item으로 보기·규격 (기존 **Maker** 라벨 **Master**로 표기)
### 변경된 파일
- `renderer/src/pages/material/ItemMasterScreen.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 (후속)
### 작업 내용
- **`frmItemMaster`**: 조회 그리드 **2행×4열** (`repeat(4,…)_auto`), Search **`col-start-5`** · **`row-span-2`**; 5열용 빈 칸 제거, **ERP 코드**를 2행 1열로 이동
### 변경된 파일
- `renderer/src/pages/material/ItemMasterScreen.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-19 14:00 KST
### 작업 내용
- **`frmItemMaster`**: 검색 **`grid-cols-[repeat(5,…)_auto]`** · **2행** · **Search `row-span-2`**
- **`BaseFeatureScreen`**: **`showFilterSearch`** (기본 true) — 필터 내부 Search 시 false; Search·Save 둘 다 끄면 우측 버튼 래퍼 생략
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/material/ItemMasterScreen.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-19 13:00 KST
### 작업 내용
- **`frmItemMaster`**: 검색(필터) 영역 **`Save` 제거** — `BaseFeatureScreen` 에 **`showFilterSave`** 옵션(기본 true)·화면에서 **`showFilterSave={false}`**
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `renderer/src/pages/material/ItemMasterScreen.tsx`, `project-rules.md`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-19 12:30 KST
### 작업 내용
- **`frmStockAssyList`**: **1열**(최종완료일·최종공정이동일 **체크+라벨**) **`justify-self-end`** 우측 정렬
### 변경된 파일
- `renderer/src/pages/product/StockAssyListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-19 12:00 KST
### 작업 내용
- **`frmStockAssyList`**: 조회 **`grid-cols-6`** — **날짜~날짜** 구간을 **체크·라벨 열과 분리**한 **전용 열**로 배치
### 변경된 파일
- `renderer/src/pages/product/StockAssyListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-19 11:30 KST
### 작업 내용
- **`frmStockAssyList`**: 조회 **`grid-cols-5`** × **2행** — **열끼리 정렬**·라벨+컨트롤 **`flex-1`** 로 열 폭 공유
### 변경된 파일
- `renderer/src/pages/product/StockAssyListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-19 11:00 KST
### 작업 내용
- **`frmStockAssyList`**: 조회 영역 **`frmStockAssyList.png`** 기준 **2행** 필드 배치 + 우측 **Search** `self-stretch`·기간 **`date`~`date`** 유지
### 변경된 파일
- `renderer/src/pages/product/StockAssyListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-19 10:30 KST
### 작업 내용
- **`project-rules.md` §6.1**: **기간·일시 범위** — 가로 연속 **`date` / `datetime-local`** 쌍 사이 **`~` 표시** 규칙 **명문화**; `docs/FEATURES.md`·`docs/CONTEXT.md` 에 §6.1 교차 참조
### 변경된 파일
- `project-rules.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`

## 2026-03-19 10:00 KST
### 작업 내용
- **기간 `date` UI 정합**: `renderer/src/pages` 전역 검사 — 좌우 연속 **`type="date"`** 쌍 사이 **`~` 구간 문자** 누락분 보완(**`frmStockAssyList`** 최종완료일·최종공정이동일 각 기간); 나머지 화면·**`datetime-local`** 쌍(예: `frmMountItemScanHis`)은 기존 `~` 유지
### 변경된 파일
- `renderer/src/pages/product/StockAssyListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 22:00 KST
### 작업 내용
- **`frmNewProdBOMReverse`**: **부품분류** 우측 `select` 폭 **기본 대비 약 3배**(`min-w-[240px] w-[240px] max-w-full`)
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMReverseScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 21:00 KST
### 작업 내용
- **`frmNewProdBOMList`**: 조회 — **하위 Assy 펼쳐보기** 체크를 **품번과 동일 1행**에만 배치(`row-span-2` 제거·그리드 **`col-start`/`row-start`** 로 2행 정렬)
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 20:30 KST
### 작업 내용
- **`frmNewProdBOMList`**: 조회 카드 — 필터 **통합 그리드**를 **`flex w-full justify-end`** 로 감싸 **검색(Search) 포함 컨트롤 묶음 전체 우측** 정렬
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 20:00 KST
### 작업 내용
- **`frmNewProdBOMList`**: 조회 — **품명+입력 ↔ LED Rank** 사이 **빈 여백 제거**(`1fr` 열 → **`auto`**·품번/품명 입력 **`w-28`**); **Search**를 **그리드 1행**(Rev 입력 옆)으로 넣어 `justify-between`으로 인한 **우측 단독 정렬** 제거
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 19:30 KST
### 작업 내용
- **`frmNewProdBOMList`**: 조회 — **2행**에서 **품명+입력**을 **LED Rank** 바로 **앞**(같은 행)으로 이동; **LED Rank** 라벨·입력 열(`6rem`/`5rem`) **위치 유지**
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 19:00 KST
### 작업 내용
- **`frmNewProdBOMList`**: 조회 영역 **품번·품명↔LED Rank** 순서 변경 **취소** — **품번·품명** 묶음 **좌측**·**Rev.·LED Rank** **우측** 배치로 **복귀**
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 18:00 KST
### 작업 내용
- **`frmNewProdBOMList`**: 조회(Search) 영역 — **하위 Assy 펼쳐보기** 체크를 **품번 라벨 앞**으로 이동; **품번·품명** 우측 입력 **`w-1/5`**(열 기준 **20%**)
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 17:00 KST
### 작업 내용
- **`frmNewProdBOMList`**: **작업면** 라디오(**전체**·**TOP**·**BOT**) **다음 영역(품번·규격 카드)** 으로 이동 — **품번** 텍스트 입력 **우측**; **규격** 입력은 **품번 입력과 동일 폭**(CSS Grid 동일 열)
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-18 16:00 KST
### 작업 내용
- **`frmNewProdBOMList`**: **작업면** 라디오(**전체**·**TOP**·**BOT**) **그리드 하단 배치 취소** → 조회 패널 **우측(Search 옆)** 으로 **복귀**
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-21 01:00 KST
### 작업 내용
- **`frmNewProdBOMList`**: **선택 Item** 그리드 **분리 카드**(옆 텍스트 입력)·조회 **Rev./LED Rank** **우측정렬·입력 폭 통일**
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-21 00:30 KST
### 작업 내용
- **`frmNewProdBOMList`**: `docs/image/frmNewProdBOMList.png`·§6.1 기준 재구성 — **좌 빈 사이드바**·조회 **2행**·작업면 **라디오+Search**·**품번/규격** 요약·**선택 Item** 16열 그리드
### 변경된 파일
- `renderer/src/pages/product/NewProdBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-21 00:00 KST
### 작업 내용
- **`frmNewEBOMList`**: **최하단** 영역 **2분할** — **좌 빈 패널**(약 **18%** 폭)·**우 하단 그리드**(`frmNewEBOMList.png` 정합)
### 변경된 파일
- `renderer/src/pages/product/NewEBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 23:00 KST
### 작업 내용
- **`frmNewEBOMList`**: 상단 **시방일자**·본문 **적용일자** 각 **쌍의 `date` 사이 `~`**
### 변경된 파일
- `renderer/src/pages/product/NewEBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 22:45 KST
### 작업 내용
- **`frmNewEBOMList`**: 본문 폼 **적용일자 앞** **시방일자** 필드 **`type="date"` → `type="text"`**
### 변경된 파일
- `renderer/src/pages/product/NewEBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 22:30 KST
### 작업 내용
- **`frmNewEBOMList`**: 상단 **시방일자** 뒤 **첫 날짜 입력** — 텍스트 변경 **롤백**, **`type="date"`** 로 복구
### 변경된 파일
- `renderer/src/pages/product/NewEBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 22:15 KST
### 작업 내용
- **`frmNewEBOMList`**: 상단 **시방일자** 직후 **첫 캘린더 → 텍스트 입력**(`w-[120px]`), 두 번째는 **date** 유지
### 변경된 파일
- `renderer/src/pages/product/NewEBOMListScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 22:00 KST
### 작업 내용
- **`frmNewEBOMBatch`**: **규격** 앞·뒤 텍스트 입력 **80px → 160px**(2배)·`aria-label` 보강
### 변경된 파일
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 21:45 KST
### 작업 내용
- **`frmNewEBOMBatch`**: **변경전·변경후 Item** 메인 입력 **`w-1/6` → `w-[calc(100%/12)]`**(한 번 더 1/2 축소)
### 변경된 파일
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 21:30 KST
### 작업 내용
- **`frmNewEBOMBatch`**: **변경전·변경후 Item** 메인 입력 **`w-1/3` → `w-1/6`**(추가 1/2 축소)
### 변경된 파일
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 21:15 KST
### 작업 내용
- **`frmNewEBOMBatch`**: **변경전·변경후 Item** 메인 텍스트 입력 폭 **약 1/3**(`w-1/3`, 기존 `flex-1` 대비)
### 변경된 파일
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 21:00 KST
### 작업 내용
- **`frmNewEBOMBatch`**: **변경전·변경후 Item** 각 **규격** 라벨 **앞** 텍스트 입력 추가
### 변경된 파일
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 20:45 KST
### 작업 내용
- **`frmNewEBOMBatch`**: **Item 삭제** 라디오 라벨 **붉은색**(`text-red-600`, 옆 안내 문구와 동일)
### 변경된 파일
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 20:30 KST
### 작업 내용
- **`frmNewEBOMBatch`**: **시방일자** 라벨 앞 **체크박스**; 기간 **date ~ date** 틸드
### 변경된 파일
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 20:15 KST
### 작업 내용
- **`frmNewEBOMModify`**: **품번분류** 콤보 폭 **18rem → 9rem**(반으로 축소)
### 변경된 파일
- `renderer/src/pages/product/NewEBOMModifyScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 20:00 KST
### 작업 내용
- **`frmNewEBOMModify`**: 상단 **시방일자** 기간 **date~date** 틸드 표시; **품번분류** 콤보 폭 **18rem** 확대
### 변경된 파일
- `renderer/src/pages/product/NewEBOMModifyScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:45 KST
### 작업 내용
- **`frmModelMng`**: 조회줄 **2×(필드 3칸 `flex-1` + 버튼 100px)** 로 1·2행 **열·너비 정렬**·**Search/Save 동일 너비**·라벨·입력 **h-7** 통일
### 변경된 파일
- `renderer/src/pages/product/ModelMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:30 KST
### 작업 내용
- **`frmModelMng`**: 조회 **1행**에 **Search**, **2행**에 **Save** 각각 배치(고객사·품번·품명 / 공정·품번분류·규격과 같은 줄·우측)
### 변경된 파일
- `renderer/src/pages/product/ModelMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:15 KST
### 작업 내용
- **`frmModelMng`**: 조회줄 **Search** 버튼을 **Save** **상단**으로 세로 배치(`flex-col`)
### 변경된 파일
- `renderer/src/pages/product/ModelMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 19:00 KST
### 작업 내용
- **`frmModelMng`**: 모델정보 마지막 행 **주석** ↔ **등록/수정 정보(4필드)** 위치 스위치
### 변경된 파일
- `renderer/src/pages/product/ModelMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 18:45 KST
### 작업 내용
- **`frmModelMng`**: **하단 모델정보** 영역 **롤백** — PNG 8행 개편 전 **3열·라벨+컨트롤** 레이아웃으로 복구(상단 2행 조회·메인 그리드 헤더 정합은 유지)
### 변경된 파일
- `renderer/src/pages/product/ModelMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 18:30 KST
### 작업 내용
- **`frmModelMng`**: `docs/image/frmModelMng.png` 기준 재구성 — 상단 조회 **2행 우측 정합**, 메인 그리드 **열 헤더 정합·오타 수정**, 하단 **모델정보 8행** 구조·콤보 **첫 옵션 플레이스홀더**·필수 입력 **amber**
### 변경된 파일
- `renderer/src/pages/product/ModelMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 18:00 KST
### 작업 내용
- **`frmPackingUnitMng`**: `docs/image/frmPackingUnitMng.png` 기준 재구성 — 조회줄 **본문 `p-3`·우측 정렬·슬레이트 카드**; **Model Code** 라벨 제거·콤보 **기본 항목=「Model Code」**; 모델/포장단위 그리드 **§6.1**(`whitespace-nowrap`·비고 최소 폭·테이블 외곽선)
### 변경된 파일
- `renderer/src/pages/basis/PackingUnitMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`

## 2026-03-20 17:45 KST
### 작업 내용
- **`frmProdTactTimeManagement`**: **Model Code** 라벨 제거·콤보박스 기본 선택 항목(`value=""`) 문구로 통일
### 변경된 파일
- `renderer/src/pages/basis/ProdTactTimeScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 17:30 KST
### 작업 내용
- **`frmProdRouteManagement`**: 상단 조회줄 **라우트 코드 콤보—텍스트—Search(S)**; 하단 탭 조회 **모델코드 라벨 제거**·콤보 디폴트 항목 문구 **「모델코드」**
### 변경된 파일
- `renderer/src/pages/basis/ProdRouteManagementScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 17:15 KST
### 작업 내용
- **`frmProdRouteManagement`**: **라우트 코드** 별도 라벨 제거·콤보 기본 항목 문구로 통일; **라우트 코드 콤보+Search(S)** 를 **라우트 공장 리스트** 패널 헤더에서 분리해 **상단 전폭 조회 줄**로 이동
### 변경된 파일
- `renderer/src/pages/basis/ProdRouteManagementScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 17:00 KST
### 작업 내용
- **`frmCustomer`**: 상단 조회 **거래처** 필드를 코드—이름 2칸 → **단일 텍스트**로 축소
### 변경된 파일
- `renderer/src/pages/basis/CustomerScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 16:45 KST
### 작업 내용
- **`frmCustomer`** 하단 폼: **자회사구분 아래 구분선**, **거래처명** 코드+명 한 행, 중간 **3열 그리드 4행** 정렬, **주소** 전폭(첨부 레이아웃)
### 변경된 파일
- `renderer/src/pages/basis/CustomerScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 16:00 KST
### 작업 내용
- **`frmCustomer`**: `docs/image/frmCustomer.png` 재대조 — 필터 **거래형태**, 그리드 **약명**, 하단 **자회사구분 상단 행·전화구분 명칭·주소 하단 전폭**, §6.1 라벨 `w-[80px]`·그리드 `min-w-max`
### 변경된 파일
- `renderer/src/pages/basis/CustomerScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 15:30 KST
### 작업 내용
- **`frmUnitProcessMng`**: **단위공정 코드** 문구를 좌측 라벨에서 제거하고, 콤보박스 **기본 선택 항목(`value=""`)** 으로 표시
### 변경된 파일
- `renderer/src/pages/basis/UnitProcessMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 15:05 KST
### 작업 내용
- **롤백**: `frmUnitProcessMng` 단위공정 코드 **콤보+텍스트 입력** 구성으로 복구(직전「콤보만」변경 취소)
### 변경된 파일
- `renderer/src/pages/basis/UnitProcessMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`

## 2026-03-20 14:30 KST
### 작업 내용
- **`frmUnitProcessMng`**: `docs/image/frmUnitProcessMng.png` 재대조 — §6.1 라벨 폭(`공정` 80px·단위공정 코드 110px), 조회줄 `justify-end`·**Search(S)**, 그리드 헤더 `whitespace-nowrap`·**비고** `min-w-[240px]`, `min-w-max`+가로 스크롤 대비
### 변경된 파일
- `renderer/src/pages/basis/UnitProcessMngScreen.tsx`, `docs/FEATURES.md`, `docs/CHANGELOG.md`
### 다음 작업 예정
- (기존) 기타 기준정보 화면 PNG 미세 정합

## 2026-03-20 12:00 KST
### 작업 내용
- **리포트 모듈 8화면**: `docs/image` PNG 기준 재구성 — 다단 헤더·동적 일/월 열·요약 행 색·주말 **`sky` 열**, 상하 분할 **차트(목업)+그리드** 또는 **그리드+`ReportChartTabs`**
- **신규**: `reportGridUtils.ts`, `reportShared.tsx`(`ReportChartTabs`)
### 변경된 파일
- `renderer/src/pages/report/*.tsx`, `reportGridUtils.ts`, `reportShared.tsx`
- `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/TODO.md`
### 다음 작업 예정
- (선택) Recharts 등으로 차트 실데이터 연동

## 2026-03-20 10:00 KST
### 작업 내용
- **`project-rules.md` §6.0**: PNG가 “없다”고 **glob만으로 오판하지 않도록** **존재 확인 절차**(직접 Read·PowerShell 재귀 검색·`ren.bat` 매핑 참고) 및 **문서/답변 시 금지 사항** 명문화
- **`.cursorrules`**: Cursor 전용 규칙에 §6.0 PNG 확인 절차 준수 한 줄 추가
- **`docs/CONTEXT.md`**: 출하검사/다음 단계 문구를 §6.0과 일치하도록 정리
### 변경된 파일
- `project-rules.md`, `.cursorrules`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`
### 다음 작업 예정
- (기존) 모듈별 PNG 2차 정합

## 2026-03-19 19:15 KST
### 작업 내용
- **출하 4화면 PNG 정합**: `docs/image/frmStockGoodsList.png`, `frmPlanningAssyStock.png`, `frmShipmentByDate.png`, `frmShipmentReport03.png` 기준으로 필터·열·(일별) 2단 헤더·주말 컬럼 스타일 반영. 이전「PNG 없음」은 일부 도구가 `docs/image`를 스캔하지 못한 오탐 — 실제 파일은 프로젝트에 존재
### 변경된 파일
- `renderer/src/pages/shipment/StockGoodsListScreen.tsx`, `PlanningAssyStockScreen.tsx`, `ShipmentByDateScreen.tsx`, `ShipmentReport03Screen.tsx`
- `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/TODO.md`
### 다음 작업 예정
- (선택) 출하 화면 수량·날짜 열 `text-right` 등 §6.1 정렬 미세 조정

## 2026-03-19 18:30 KST
### 작업 내용
- **출하검사 모듈 9화면 재정비**: 워크스페이스에 **`docs/image/*.png` 없음** — PNG 픽셀 대조는 불가, `project-rules.md` §6.1·`manual.csv`·`FEATURES.md`에 맞춰 통일
- **§6.1 정합**: 검사항목 등록 **입력유형 범례**를 red → **amber** 톤; 조회·폼 라벨 **`w-[80px]`** 통일; 대상 조회 필터 라벨 **창고**(`FEATURES`와 동일); 검사항목 적용 이중 그리드 첫 열 헤더 **`☑`**; 기준서 등록 본문 **`min-h-0` 스크롤 래퍼** 보강
### 변경된 파일
- `renderer/src/pages/oqc/*.tsx`, `inspectApplyShared.tsx`
- `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/TODO.md`
### 다음 작업 예정
- `docs/image`에 `frmOQC*.png` 등 배치 후 출하검사 **열·헤더 문구** 2차 정합

## 2026-03-19 17:00 KST
### 작업 내용
- **출하 모듈 4화면** (`manual.csv` 모듈 **출하**): 기능명을 매뉴얼과 일치, 필터·그리드 열을 화면목적에 맞게 재구성(창고 재고 / 계획 대비 재고 / 일별·LOT별 현황). 워크스페이스에 `docs/image/frmStockGoodsList.png` 등 **PNG 미수급** — 수급 후 열 문구 픽셀 대조 권장
### 변경된 파일
- `renderer/src/pages/shipment/StockGoodsListScreen.tsx`, `PlanningAssyStockScreen.tsx`, `ShipmentByDateScreen.tsx`, `ShipmentReport03Screen.tsx`
- `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/TODO.md`
### 다음 작업 예정
- `docs/image` 확보 시 출하 4화면 PNG 2차 정합 · 리포트 모듈(고객사 일·월별 출하) 요청 시 동일 패턴

## 2026-03-19 14:30 KST
### 작업 내용
- **출하검사 모듈 9화면**: `docs/image/frmOQC*.png`, `frmShipmentTargetList.png` 기준 재구성 — 필터·분할·3패널·3단 트랜스퍼·범례·라디오·일괄그리드 등 PNG 반영
- **신규 공용**: `inspectApplyShared.tsx`(검사/선택 항목 `>>` `<<`), `oqcResultColumns.ts`, `OqcResultShippingBody.tsx`(결과 등록·조회 하단)
### 변경된 파일
- `renderer/src/pages/oqc/*.tsx`, `inspectApplyShared.tsx`, `OqcResultShippingBody.tsx`, `oqcResultColumns.ts`
- `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`
### 다음 작업 예정
- 출하·리포트 등 나머지 모듈 PNG 정합(요청 시)

## 2026-03-19 12:00 KST
### 작업 내용
- **품질관리 모듈 7화면**: `docs/image/*.png` 기준 재구성 — 조회 필터·그리드 열·분할 레이아웃(LOT 이력·포장·수리 등)
- **`SubPartInputHis` / `StockPartsLOTHist`**: 이전에 서로 뒤바뀐 필터·그리드 교정; LOTHist는 **3단 헤더** 커스텀 테이블
- **`SimpleGridTable`**: Fragment 제거 → **`flex` 단일 루트**, `title` 빈 문자열이면 **타이틀 바 생략**(분할 패널에 유리)
### 변경된 파일
- `renderer/src/pages/quality/*.tsx` (7개), `renderer/src/components/BaseFeatureScreen.tsx`
- `docs/FEATURES.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`
### 다음 작업 예정
- 출하검사·기타 모듈 PNG 대조(요청 시)

## 2026-03-19 10:00 KST
### 작업 내용
- **`SimpleGridTable`**: `th`에 **`whitespace-nowrap`** 적용 → 자재/생산/리포트 등 `BaseFeatureScreen` 기반 화면 그리드 헤더가 §6.1과 동일 패턴으로 줄바꿈 방지
- **`docs/매뉴얼.csv`** vs **`renderer/src/data/manual.csv`**: 내용 동일 확인, `docs/TODO.md` 정리
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`
- `docs/TODO.md`, `docs/CHANGELOG.md`, `docs/CONTEXT.md`, `docs/FEATURES.md`
### 다음 작업 예정
- **[P2]** PNG 기반 컬럼·라벨, **[P3]** 커스텀 테이블 화면 §6.1 세부 통일

## 2026-03-18 22:45 KST
### 작업 내용
- **sticky 테이블 헤더**: `frmUser`, `frmPackingUnitMng`, `frmUnitProcessMng`, `frmLineMng`, `frmUserAuthority` 그리드 `thead`에 **`z-10`** 추가(스크롤 시 본문과 겹침 방지, §6.1 패턴과 동일)
### 변경된 파일
- `renderer/src/pages/UserScreen.tsx`, `basis/PackingUnitMngScreen.tsx`, `UnitProcessMngScreen.tsx`, `LineMngScreen.tsx`, `UserAuthorityScreen.tsx`
- `project-rules.md` §6.1 (sticky 헤더 규칙), `docs/CHANGELOG.md`, `docs/CONTEXT.md`
### 다음 작업 예정
- PNG 보유 화면별 컬럼·라벨 문자열 미세 조정

## 2026-03-18 22:15 KST
### 작업 내용
- **전역 조회줄 정합**: `BaseFeatureScreen` 의 `filterArea` 래퍼를 **`justify-end`** 로 변경 → Search/Save 포함 **모든 필터가 우측 정렬** (기능 화면 일괄). `SimpleGridTable` **sticky thead `z-10`**
- **기준정보**: `frmProdRouteManagement` — 서브패널 조회 우측 정렬·**비고** 최소 폭·**모델코드** 라벨·Search(S) 도트 통일·sticky 헤더
- **기준정보**: `frmProdTactTimeManagement` — 모델 그리드 **Array Count** 열 추가·**비고** 최소 폭·**Model Code** 라벨·sticky/z-index
- **제품관리 (`MesFeatureChrome`)**: ModelMng, StockAssyList, NewEBOM*, NewProdBOM* — 상단 조회줄 **`justify-end`**, 일부 그리드 **thead z-10**
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`
- `renderer/src/pages/basis/ProdRouteManagementScreen.tsx`, `ProdTactTimeScreen.tsx`
- `renderer/src/pages/product/ModelMngScreen.tsx`, `StockAssyListScreen.tsx`, `NewEBOMListScreen.tsx`, `NewEBOMBatchScreen.tsx`, `NewEBOMModifyScreen.tsx`, `NewProdBOMListScreen.tsx`, `NewProdBOMReverseScreen.tsx`
- `project-rules.md`, `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/TODO.md`, `docs/CHANGELOG.md`
### 다음 작업 예정
- PNG 파일 기준 **컬럼명·라벨 문자열** 미세 조정(이미지 보유 시)

## 2026-03-18 21:30 KST
### 작업 내용
- **기준정보관리 PNG 2차 정합(일부)**: 공통코드·라인·단위공정·포장단위·사용자·거래처 — 필터 **우측 정렬**, 그리드 열/헤더·하단 폼을 캡처와 맞춤
- **`frmCommonCode`**: 상단 필터 우측 정렬, 목록 제목 바 제거, **No** 열, Code Information **필수 3필드** amber, sticky 헤더
- **`frmLineMng`**: **생산계획** 한 줄 헤더, **비고** `min-w`, 조회줄 우측 정렬
- **`frmUnitProcessMng`**: **단위공정 코드** 라벨, **비고** `min-w`, 조회줄 우측 정렬
- **`frmPackingUnitMng`**: **출하** 단위명, Model **70%** 영역, Model Code 라벨, 조회줄 우측 정렬
- **`frmUser`**: 조회줄 우측 정렬, 하단 **부서** select, 그리드 **사용자 ID**
- **`frmCustomer`**: **거래처형태**·**거래처** 2필드 필터, 그리드 열 순서(업태/업종/…/담당자Email) 및 하단 **3열** 폼, **거래처명** amber
### 변경된 파일
- `renderer/src/pages/ScreenRouterPage.tsx`, `renderer/src/pages/UserScreen.tsx`
- `renderer/src/pages/basis/LineMngScreen.tsx`, `UnitProcessMngScreen.tsx`, `PackingUnitMngScreen.tsx`, `CustomerScreen.tsx`
- `project-rules.md` §6.0 (2차 정합 가이드), `docs/FEATURES.md`, `docs/CONTEXT.md`, `docs/TODO.md`, `docs/CHANGELOG.md`
### 다음 작업 예정
- `frmProdRouteManagement`, `frmProdTactTime` 등 기준정보 잔여 화면 PNG 정합

## 2026-03-18 20:15 KST
### 작업 내용
- **전 화면 PNG/구성규칙 정렬(1차)**: `BaseFeatureScreen` 에 **`screenId` 필수** + `MesMenuBar` + 브레드크럼 ` — 화면ID` + `document.title` (`BK MES - [화면ID]`). `MesMenuBar`·`MesFeatureChrome` 컴포넌트 추가
- **84개** 기능 화면에 `screenId` 자동 주입(`scripts/inject-base-feature-screen-id.mjs`, `npm run inject-screen-ids`)
- 비-Base 화면: 기준정보/제품 **MesFeatureChrome** 적용, `CommonCode`·`Placeholder`·특수 화면에 메뉴바/타이틀 통일. `UserAuthority`·`MenuAuthMng` 메뉴바 DRY
- 출하검사 `OQCInspectApply_*` 기능명을 **manual.csv** 와 동기
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx`, `MesMenuBar.tsx`, `MesFeatureChrome.tsx` (신규)
- `renderer/src/pages/**/*.tsx` (광범위), `ScreenRouterPage.tsx`
- `scripts/inject-base-feature-screen-id.mjs` (신규), `package.json`
- `project-rules.md` §6.0 표준 골격, `docs/SETUP.md`, `docs/CONTEXT.md`, `docs/CHANGELOG.md`
### 다음 작업 예정
- 화면별 PNG 대비 **본문(필터·그리드·폼) 픽셀 단위** 추가 정합은 이미지별 순차 작업

## 2026-03-18 19:00 KST
### 작업 내용
- **frmMenuAuthMng**: `docs/image/frmMenuAuthMng.png` 기준으로 재구성 — 메뉴바, 우측 범례+권한그룹, 전체 폭 **접기 가능 트리**, 모듈별 권한 도트(모든권한=보라 `violet`), 자재 **수불관리** 명칭 및 생산관리 혼합 권한 반영, 빈 우측 패널 제거
### 변경된 파일
- `renderer/src/pages/basis/MenuAuthMngScreen.tsx`
- `docs/FEATURES.md`
- `docs/CHANGELOG.md`
- `docs/CONTEXT.md`
### 다음 작업 예정
- (필요 시) `manual.csv` 모듈/메뉴와 트리 데이터 연동

## 2026-03-18 18:30 KST
### 작업 내용
- **frmUserAuthority**: 화면 색상을 WinForms hex 대신 **project-rules.md §6.1** slate 스타일(`border-slate-300`, `bg-slate-50/100`, `td text-slate-600` 등)로 통일
- **project-rules.md** §6.1: **화면·패널 색상(Chrome)** 을 slate 통일·PNG 대비 우선순위 명시
### 변경된 파일
- `renderer/src/pages/basis/UserAuthorityScreen.tsx`
- `project-rules.md`
- `docs/FEATURES.md`
- `docs/CHANGELOG.md`
- `docs/CONTEXT.md`
### 다음 작업 예정
- (없음)

## 2026-03-18 18:00 KST
### 작업 내용
- **frmUserAuthority**: `docs/image/frmUserAuthority.png`에 맞춰 레이아웃 재구성(메뉴바, 좌측 노란 선택 바+권한그룹, 우측 탭+우상단 권한그룹 콤보, 우측 그리드 빈 열 확장)
- **Toolbar**: 버튼 라벨을 PNG와 동일 한글(신규/조회/저장/삭제/엑셀/인쇄/미리보기/설정/닫기)로 통일, `onNew` 트리거를 `신규`에 연결
### 변경된 파일
- `renderer/src/pages/basis/UserAuthorityScreen.tsx`
- `renderer/src/components/Toolbar.tsx`
- `docs/FEATURES.md`
- `docs/CHANGELOG.md`
- `docs/CONTEXT.md`
### 다음 작업 예정
- (필요 시) 권한복사 탭 상세 필드 PNG 기준 보강

## 2026-03-18 17:30 KST
### 작업 내용
- `project-rules.md` §6.0 및 `.cursorrules`에 **`docs/매뉴얼.csv` ↔ `renderer/src/data/manual.csv` 동기화** 규칙 추가
### 변경된 파일
- `project-rules.md`
- `.cursorrules`
- `docs/CHANGELOG.md`
- `docs/CONTEXT.md`
### 다음 작업 예정
- (없음)

## 2026-03-18 17:15 KST
### 작업 내용
- `project-rules.md` §6.0 및 `.cursorrules`에 **manual.csv(`모듈명`·`기능명`·`화면 ID`) ↔ `docs/image/<화면 ID>.png`** 화면 정의·레이아웃 참조 규칙 추가
### 변경된 파일
- `project-rules.md`
- `.cursorrules`
- `docs/CHANGELOG.md`
- `docs/CONTEXT.md`
### 다음 작업 예정
- (없음)

## 2026-03-18 16:40 KST
### 작업 내용
- `frmUserAuthority`(사용자권한 관리): 원본 화면 기준 **좌측 하단**에 누락되었던 **사용자 이름** 표시 영역(노란 박스) 및 **사용자 권한그룹** 그리드 추가; 사용자 목록 행 선택과 연동
- 참고: 워크스페이스에 `docs/image/frmUserAuthority.png` 등이 없어 첨부 스크린 기준으로 반영
### 변경된 파일
- `renderer/src/pages/basis/UserAuthorityScreen.tsx`
- `docs/FEATURES.md` (신규)
- `docs/CONTEXT.md`
### 다음 작업 예정
- (필요 시) `docs/image`에 PNG 반영 후 픽셀 단위 맞춤

## 2026-03-11 15:00 KST
### 작업 내용
- **수입검사 모듈 6개 기능 페이지**를 `D:\MES\docs\image` 내 화면ID.png 참고하여 project-rules.md §6.1에 맞게 전면 구현
- frmTempIncomingManual(가입고 등록 및 취소): 입고 미확정/현장 미출고 체크, 입고일~, 부품분류/하위분류/고객사·공급업체, ERP코드·Maker PartNo 라디오+입력, 규격 / 그리드 17컬럼 / 하단 가입고 정보 3열 폼(입고 Seq·입고유형·자재정보·공급업체·Maker·포장단위수량·비고, 고객사·입고일시·부품분류·업체 LOT·규격·Maker PartNo·주차·유효기간·입고수량·단위 등), 포장 안내문, Save/Delete
- frmTempIncomingList(가입고 내역조회): 입고일자~, 부품분류, ERP코드·Maker PartNo 라디오+입력, Item 명, 고객사·공급업체 라디오+드롭다운, 하위분류·업체 LOT·규격 / 그리드 20컬럼
- frmlQCInspectResultIncomingLump(수입검사 결과 일괄 처리): 검사 대상 무검사·완료, 입고일자~, ERP코드·규격, Maker PartNo·업체 LOT·검사의뢰 Label 라디오 / 판정결과 합격·불합격 / 그리드 15컬럼
- frmIQCInspectResultIncoming(수입검사 결과 등록): 검사 대상 대기·합격·불합격, 검사 방법 4종 라디오, 입고일자~·스캐너포트·ERP코드·규격·검색키 라디오 / 상단 그리드 19컬럼 / 하단 3패널(좌: 상세 폼+버튼+합부판정+검사자+비고, 중: 검사항목 그리드 14컬럼, 우: 불량 상세 그리드)
- frmIQCStandardFileUpdate/List(수입검사 기준서 등록·조회): 등록/조회기준 부품분류별·하위분류별·대표Item·Item별 라디오, 부품분류·하위분류·ERP코드·Item명·규격 / 그리드 10컬럼(분류코드~수정자)
### 변경된 파일
- `renderer/src/pages/iqc/TempIncomingManualScreen.tsx`
- `renderer/src/pages/iqc/TempIncomingListScreen.tsx`
- `renderer/src/pages/iqc/IQCInspectResultIncomingLumpScreen.tsx`
- `renderer/src/pages/iqc/IQCInspectResultIncomingScreen.tsx`
- `renderer/src/pages/iqc/IQCStandardFileUpdateScreen.tsx`
- `renderer/src/pages/iqc/IQCStandardFileListScreen.tsx`
### 다음 작업 예정
- (없음) 수입검사 6개 화면 PNG 기준 구현 완료

## 2026-03-11 14:30 KST
### 작업 내용
- **자재정보관리 모듈 12개 기능 페이지**를 `docs/image` 내 화면ID.png 참고하여 규칙에 맞게 전면 구현
- project-rules.md §6.1 적용: 폼 영역 `flex items-center gap-2 whitespace-nowrap`, 라벨 `w-[80px] shrink-0 text-right`, 컨트롤 `min-w-0 flex-1`, 그리드 `border border-slate-300` / `border-r` / `text-center` / `text-slate-600`
- frmItemMaster: 필터 **2행×4열**; **자재 정보**는 이후 **좌·우 2열+세로 버튼+하단 메타** 그리드로 정합(상세는 CHANGELOG `2026-03-18 (자재 정보 그리드)`). 그리드 15컬럼
- frmMakerPartNo: 필터(스캐너포트/부품분류/공급업체/ERP코드/Item명/규격/Maker PartNo), Item·Maker PartNo 이중 그리드, 하단 Maker PartNo 정보(공급업체/Maker/Scan Data/포장단위/PartNo·LOT No 설정/주석)
- frmItemClassManage: 좌측 부품분류 그리드(코드/부품분류/Item Type/설명), 우측 부품분류 필터+하위분류 그리드
- frmlQCInspectFactor(검사항목 등록): 항목구분/텍스트·숫자·체크박스·라디오·콤보 샘플, 안내문, 검사항목 그리드 23컬럼
- frmIQCInspectApply_Class/Item, frmIQCDefectApply_Class/Item: 부품분류·하위분류·(ERP코드/Item명/규격) 필터, 상단 목록 그리드, 하단 검사/불량 항목↔선택 항목 이중 그리드 + >>/<< 이동 버튼
- frmIQCDefectFactor: 항목구분 필터, 불량항목 그리드(Level/불량항목명/상위코드/항목코드/규격/단위/관리구분/정렬순서/사용여부/비고)
- frmInspectTypeOfItem: 검사품 선택(무검사품/유검사품), 부품분류/하위분류/ERP코드/규격, 그리드(검사구분~Maker PartNo/단위)
- frmIQCInspectApplyList, frmIQCDefectApplyList: 부품분류/하위분류/ERP코드/Item명/규격 필터, Item 검사항목/불량항목 조회 그리드
### 변경된 파일
- `renderer/src/pages/material/ItemMasterScreen.tsx`
- `renderer/src/pages/material/MakerPartNoScreen.tsx`
- `renderer/src/pages/material/ItemClassManageScreen.tsx`
- `renderer/src/pages/material/IQCInspectFactorScreen.tsx`
- `renderer/src/pages/material/IQCInspectApplyClassScreen.tsx`
- `renderer/src/pages/material/IQCInspectApplyItemScreen.tsx`
- `renderer/src/pages/material/IQCDefectFactorScreen.tsx`
- `renderer/src/pages/material/IQCDefectApplyClassScreen.tsx`
- `renderer/src/pages/material/IQCDefectApplyItemScreen.tsx`
- `renderer/src/pages/material/InspectTypeOfItemScreen.tsx`
- `renderer/src/pages/material/IQCInspectApplyListScreen.tsx`
- `renderer/src/pages/material/IQCDefectApplyListScreen.tsx`
### 다음 작업 예정
- (없음) 자재정보관리 12개 화면 PNG 기준 구현 완료

## 2026-03-11 (최근) KST
### 작업 내용
- UI 레이아웃 규칙을 모든 페이지에 적용
- **폼 영역**: CustomerScreen, ScreenRouterPage(CommonCode) Code Information - `flex items-center gap-2 whitespace-nowrap`, `span w-[80px] shrink-0 text-right`, `min-w-0 flex-1` 패턴 적용
- **필터 라벨**: 모든 페이지의 `filterArea` 및 `label`에 `whitespace-nowrap` 추가 (라벨+컨트롤 한 줄 표시)
### 변경된 파일
- `renderer/src/pages/basis/CustomerScreen.tsx`
- `renderer/src/pages/ScreenRouterPage.tsx`
- `renderer/src/pages/**/*.tsx` (전체 filter 라벨 whitespace-nowrap 적용)

## 2026-03-13 12:45 KST
### 작업 내용
- 나머지 모듈 전체 기능 화면 구현 (manual.csv 기준): 자재정보관리(12), 수입검사(6), 자재추적관리(11), 자재재고관리(12), 생산관리(6), 공정관리(10), 품질관리(7), 출하검사(9), 출하(4), 리포트(9) — 총 76개 화면
- 공통 레이아웃 `BaseFeatureScreen`, `SimpleGridTable` 컴포넌트 추가
- docs/image에 PNG 없음 — manual.csv 및 기존 화면 패턴 기반 구현
### 변경된 파일
- `renderer/src/components/BaseFeatureScreen.tsx` (신규)
- `renderer/src/pages/material/*.tsx` (12개 신규)
- `renderer/src/pages/iqc/*.tsx` (6개 신규)
- `renderer/src/pages/material-trace/*.tsx` (11개 신규)
- `renderer/src/pages/material-stock/*.tsx` (12개 신규)
- `renderer/src/pages/production/*.tsx` (6개 신규)
- `renderer/src/pages/process/*.tsx` (10개 신규)
- `renderer/src/pages/quality/*.tsx` (7개 신규)
- `renderer/src/pages/oqc/*.tsx` (9개 신규)
- `renderer/src/pages/shipment/*.tsx` (4개 신규)
- `renderer/src/pages/report/*.tsx` (9개 신규)
- `renderer/src/pages/ScreenRouterPage.tsx`
### 다음 작업 예정
- (없음) 전체 모듈 화면 구현 완료

## 2026-03-13 12:03 KST
### 작업 내용
- 제품관리 모듈 7개 화면 구현 (`docs/image/*.png` 참조): 품번관리, EBOM 등록/수정, EBOM 일괄변경, EBOM 조회, Prod BOM 조회, Prod BOM 상향식 조회, 완제품/반제품 재고 조회
- 기준정보관리 화면 세부 수정: frmUserAuthority(부서 좌측·권한그룹/권한복사 탭), frmUnitProcessMng(단위공정코드 리스트박스+텍스트), frmProdRouteManagement(라우트코드·모델코드 리스트박스), frmProdTactTimeManagement(공정 라벨·Model Code 리스트박스·작업면 텍스트), frmPackingUnitMng(포장단위 3컬럼 그리드·Model Code 리스트박스)
### 변경된 파일
- `renderer/src/pages/product/ModelMngScreen.tsx` (신규)
- `renderer/src/pages/product/NewEBOMModifyScreen.tsx` (신규)
- `renderer/src/pages/product/NewEBOMBatchScreen.tsx` (신규)
- `renderer/src/pages/product/NewEBOMListScreen.tsx` (신규)
- `renderer/src/pages/product/NewProdBOMListScreen.tsx` (신규)
- `renderer/src/pages/product/NewProdBOMReverseScreen.tsx` (신규)
- `renderer/src/pages/product/StockAssyListScreen.tsx` (신규)
- `renderer/src/pages/basis/UserAuthorityScreen.tsx`
- `renderer/src/pages/basis/UnitProcessMngScreen.tsx`
- `renderer/src/pages/basis/ProdRouteManagementScreen.tsx`
- `renderer/src/pages/basis/ProdTactTimeScreen.tsx`
- `renderer/src/pages/basis/PackingUnitMngScreen.tsx`
- `renderer/src/pages/ScreenRouterPage.tsx`
### 다음 작업 예정
- (완료됨) 나머지 모듈 화면 구현

## 2026-03-11 19:00 KST
### 작업 내용
- 기준정보관리 나머지 8개 화면 구현 (`docs/image/*.png` 참조)
- 사용자권한 관리, 메뉴권한 관리, 단위공정 관리, 라인관리, 거래처 관리, 라우터 관리, Tact Time 관리, 포장단위 관리
- 공통코드 관리·사용자 관리와 동일한 규칙·스타일 적용
### 변경된 파일
- `renderer/src/pages/basis/UserAuthorityScreen.tsx` (신규)
- `renderer/src/pages/basis/MenuAuthMngScreen.tsx` (신규)
- `renderer/src/pages/basis/UnitProcessMngScreen.tsx` (신규)
- `renderer/src/pages/basis/LineMngScreen.tsx` (신규)
- `renderer/src/pages/basis/CustomerScreen.tsx` (신규)
- `renderer/src/pages/basis/ProdRouteManagementScreen.tsx` (신규)
- `renderer/src/pages/basis/ProdTactTimeScreen.tsx` (신규)
- `renderer/src/pages/basis/PackingUnitMngScreen.tsx` (신규)
- `renderer/src/pages/ScreenRouterPage.tsx`
### 다음 작업 예정
- 기타 모듈(자재정보관리 등) 화면 구현

## 2026-03-11 17:20 KST
### 작업 내용
- `renderer/`에 Vite + React + TypeScript 스캐폴딩 및 Tailwind CSS(v4) 설정 완료.
- 루트에 Electron(main/preload) 및 `npm workspaces` 구성 추가, dev/build 스크립트 연결.
- 캡처 화면과 동일한 스플래시 UI(`SplashScreen`) 구현 및 기본 샘플 제거.
- 스플래시의 `New` 클릭 시 캡처 화면 기반 페이지로 라우팅 추가(`react-router-dom`, `#/group-code`).
- 메인 화면에 `매뉴얼.csv`의 모듈명 기반 버튼 그리드 추가.
- 모듈명 클릭 시 모듈별 기능명 버튼 목록 페이지로 이동 추가(`#/modules/<모듈명>`).
### 변경된 파일
- `package.json`
- `electron/main.cjs`
- `electron/preload.cjs`
- `renderer/vite.config.ts`
- `renderer/src/index.css`
- `renderer/src/App.tsx`
- `renderer/src/components/SplashScreen.tsx`
- `renderer/src/data/manual.csv`
- `renderer/src/lib/manual.ts`
- `renderer/src/pages/ModuleFeaturesPage.tsx`
- `renderer/src/pages/GroupCodePage.tsx`
- `renderer/src/main.tsx`
- `README.md`
- `docs/PROJECT_STRUCTURE.md`
### 다음 작업 예정
- 필요 시 preload API/IPC 채널 설계 및 보안 정책 정리

## 2026-03-11 16:55 KST
### 작업 내용
- 프로젝트 규칙에 따라 필수 문서(`docs/CONTEXT.md`, `docs/CHANGELOG.md`, `docs/TODO.md`)를 초기 생성.
### 변경된 파일
- `docs/CONTEXT.md`
- `docs/CHANGELOG.md`
### 다음 작업 예정
- Vite+React+TS+Tailwind renderer 스캐폴딩
- Electron 설정 추가 및 renderer 연동
- 스플래시 UI 구현

