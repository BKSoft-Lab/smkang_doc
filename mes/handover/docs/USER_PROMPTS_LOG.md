# 사용자 질문·프롬프트 로그

`project-rules.md` §2·**`.cursorrules`**·**`ai-rules.md`** · **`.cursor/rules/user-prompts-log-workflow.mdc`**(alwaysApply) 에 따라, **각 턴마다** 먼저 **질문만** 기록하고, **응답을 마친 뒤** 같은 블록에 **답 요약**을 채운다. (매우 긴 프롬프트는 핵심만 요약 가능.)

## 형식

```text
## YYYY-MM-DD
### (선택) 주제 한 줄
- 질문: …
- 답 요약: (응답 전) — 비워 두거나 (응답 후 기입) 표시 → (응답 후) 한두 문장으로 채움
```

- **날짜(heading)**: Cursor **user_info**에 `Today's date:` 가 있으면 **그 연·월·일**을 따른다(권위). 없으면 **실제 작업 환경의 달력 날짜**를 쓴다. 학습·추측 연도(예: 2025)를 쓰지 않는다.
- **동일 일자**: `## YYYY-MM-DD` 는 **하루에 한 번만** 두고, 그날 턴은 **같은 제목 아래**에 연속으로 붙인다(같은 날짜 제목 중복 금지).
- **섹션 순서**: 날짜 블록은 **최신 날이 위**(내림차순). `---` 직후 첫 `##` 가 **가장 최근 날짜**이다.

---

## 2026-04-16
### smkang_doc 오프라인 동기화 + Git 푸시
- 질문: smkang_doc 에 반영하고 smkang_doc 깃 반영
- 답 요약: **`copy-handover-to-smkang.mjs`** 로 **`D:\smkang_data\docs\mes\handover`** 갱신 → **`mes/handover/**` 커밋·**`git push origin main`** (`BKSoft-Lab/smkang_doc`, 핸드오버·CHANGELOG·USER_PROMPTS_LOG 등).

## 2026-04-18
### HANDOVER — 번호 체계 표 제거
- 질문: (1.2.1~1.2.4 번호 체계 표) 이부분 제거
- 답 요약: **`HANDOVER_NEW_DEVELOPER.md`** 서두의 **번호 체계** 문단·표·구분선 제거 후 **`render-db-doc-html.mjs`** 로 **HTML 재생성**. 본문 **`#### 1.2.3` / `#### 1.2.4`** 절 제목은 유지.

### smkang_doc Git 반영 (의도 정정)
- 질문: 아니 smkang_doc 저장소를 깃에 반영하라는 것이었다.
- 답 요약: **`D:\smkang_data\docs`** (`smkang_doc`) — **`mes/handover/**` 만 스테이징·커밋 **`ac8e3eb`** (`BK MES.docx`, HANDOVER·CHANGELOG 등)·**`git push origin main`**. `02.WorkList`·`03.Tip` 은 미포함.

### docs Git 반영
- 질문: docs git에 반영하라.
- 답 요약: **`docs/`만** 스테이징·커밋 **`30df63e`** (`인수인계·BK MES.docx, db-doc·DATABASE·CHANGELOG 등`). 이전 커밋에 섞였던 **`server/` 쿼리 rename** 은 **`git reset`** 으로 분리해 **미커밋** 상태로 복구 후 **`git push origin main`**.

### HANDOVER HTML — BK MES.docx 링크
- 질문: docs/BK MES.docx 파일도 HANDOVER_NEW_DEVELOPER.html에서 링크로 연결되도록 파일를 복사하고 HANDOVER_NEW_DEVELOPER.html도 수정해줘.
- 답 요약: **`docs/BK MES.docx`** 는 이미 `docs/`에 있음. **MD에 `BK%20MES.docx` 링크** 추가 후 **`render-db-doc-html.mjs`** 로 HTML 재생성 → **`href="BK%20MES.docx"`**. **`copy-handover-to-smkang.mjs`** 실행 시 **`docs/BK MES.docx`** 오프라인 번들에 포함 확인.

### smkang_doc mes/handover Git 반영
- 질문: D:\\smkang_data\\docs\\mes 에 추가한 파일들을 모두 git에 반영하라.
- 답 요약: **`D:\smkang_data\docs`** 저장소에서 **`mes/handover/**` 스테이징·커밋 `165bd41`·**`git push origin main`** (`BKSoft-Lab/smkang_doc`). **`renderer/src/data/manual.csv`** 는 루트 `.gitignore`의 `data/` 때문에 **`git add -f`** 로 포함.

## 2026-04-17
### handover 오프라인 번들 (smkang_data)
- 질문: HANDOVER_NEW_DEVELOPER.html 및 연결 파일을 D:\\smkang_data\\docs\\mes\\handover 에 동일 구조로 복사·웹에서 열기.
- 답 요약: **`scripts/copy-handover-to-smkang.mjs`** 추가·실행, **`index.html`** 리다이렉트. 문서 링크 수정(`MesScreenShell` 경로·`screenPngPresence` 제거). **`HANDOVER_NEW_DEVELOPER.md/html`** 갱신.

### HANDOVER_NEW_DEVELOPER.md HTML 변환
- 질문: 이 문서를 html로 변환
- 답 요약: **`node scripts/render-db-doc-html.mjs docs/HANDOVER_NEW_DEVELOPER.md docs/HANDOVER_NEW_DEVELOPER.html`** 로 생성. **DOCUMENTATION_INDEX**·**CHANGELOG** 반영.

### 신규 개발자 인수인계 문서
- 질문: 인수인계 문서 작성 계획 구현 — HANDOVER_NEW_DEVELOPER.md, BK MES.docx 반영, DOCUMENTATION_INDEX·CHANGELOG.
- 답 요약: **[`docs/HANDOVER_NEW_DEVELOPER.md`](HANDOVER_NEW_DEVELOPER.md)** 작성(1.1~1.2·문서표·Mermaid·`BK MES.docx` 부록). 저장소에 docx 없음 → 부록에서 별도 확보 안내. **DOCUMENTATION_INDEX**·**CHANGELOG** 반영.

## 2026-04-16
### BE 모듈별 파일 접두(prefix) 정리
- 질문: BE 모듈별 파일 접두 정리 계획 구현 — byScreen·lib/queries·lib 모듈 전용 파일명 `std_`/`prd_`/`mat_`/`mfg_`/`pur_` 접두, 문서화, 기존 STD 쿼리 파일 rename 및 import 갱신.
- 답 요약: `lib/queries` STD 전용 파일을 `std_tbCmUser.mjs` 등으로 **rename**·import·문서 링크 갱신. **`byScreen/README`**, **`queries/README`**, **`project-rules.md`** §4.2, **`std-be-byscreen.mdc`**, **`DATABASE.md`**·**db-doc** 반영. 공통은 **`authAndSplash.mjs`** 유지. **`npm run check:ai-harness`** 통과.

## 2026-04-15
### Git 커밋 및 푸시
- 질문: Git 커밋 및 푸시 — 플랜 구현
- 답 요약: 스테이징 후 **`feat: AI 하네스·CI 추가, DEVELOPER 일반 로그인 허용`** 커밋(`abd0e1c`)·**`git push origin main`** 완료.

### server/src 삭제 복구 및 DEVELOPER 로그인 수정 재반영
- 질문: 잘못해서 `D:\MES\server\src` 폴더를 지워버렸다. git 에서 복구하고 조금전에 수정했던 DEVELOPER 계정에 대한 수정을 다시 반영해줘
- 답 요약: **`git restore server/src`** 로 트리 복구 후 [`authAndSplash.mjs`](server/src/lib/queries/authAndSplash.mjs) 에서 `isDeveloperId`·로그인·비밀번호 변경 403 분기 재제거.

### DEVELOPER 일반 로그인·비밀번호 변경 허용
- 질문: DEVELOPER 일반 로그인·비밀번호 변경 허용 — 플랜 구현
- 답 요약: [`authAndSplash.mjs`](server/src/lib/queries/authAndSplash.mjs) 에서 `isDeveloperId`·로그인·비밀번호 변경 403 분기 제거. `tb_cm_user`·비밀번호 검증은 일반 사용자와 동일(`tbCmUser` CRUD 보호 등은 유지).

### 메뉴 접근 권한 스킵 디버그 플래그 제거
- 질문: 디버그를 위해 모든 메뉴접근시 권한을 체크하지 않도록 하는 플래그를 두었던것을 제거
- 답 요약: **BE** `MES_SKIP_MENU_ACCESS_CHECK`·**FE** `VITE_SKIP_MENU_ACCESS` 및 관련 분기·`server/.env.example`·`server/README.md` 문구를 제거. `POST /api/menu-access`·`postMenuAccess`는 항상 권한·로그 로직을 탄다(DEVELOPER 예외는 유지).

### AI 하네스 개선 계획 구현
- 질문: AI 하네스 개선 계획 — Implement the plan as specified.
- 답 요약: **`scripts/check-ai-harness.mjs`**·**`npm run check:ai-harness`/`check:ai-harness:strict`**·**`.github/workflows/ci.yml`**·**`.gitignore`** `.cursor/debug-*.log`·**`docs/SETUP`·`CONTEXT`·`DOCUMENTATION_INDEX`**·**`.cursor/skills/README.md`** 반영.

### 메뉴 접근 권한 스킵 디버그 플래그
- 질문: 디버그를 위해 모든 메뉴접근시 권한을 체크하지 않도록 하는 플래그를 두자. (플랜 구현)
- 답 요약: (이후 제거됨 — 위 **메뉴 접근 권한 스킵 디버그 플래그 제거** 턴 참고.) 당시: **BE** `MES_SKIP_MENU_ACCESS_CHECK` — `userAccessLog.mjs` 조기 허용·**FE** `VITE_SKIP_MENU_ACCESS` — `userAccessLogApi.ts` fetch 생략·예시·README 반영.

### mat 미추적·스크립트 파일 삭제
- 질문: `matScreenApi.ts`, `useMatSearch.ts`, `MatApiBanner.tsx`, `generate-mat-screen-tsx.mjs`, `matSegmentFormFallbacks.mjs` 를 지워.
- 답 요약: 지정 5개 파일 **삭제** 완료. 다른 소스에서 import 참조 없음. **`.cursor/skills/mes-legacy-query-port/SKILL.md`** 에서 삭제된 경로 링크를 일반 문구·`userMgmtBeBaseUrl.ts` 안내로 정리.

### 원격 `main` 히스토리 정리(강제 푸시)
- 질문: 원격에 올려진 커밋들을 다 없애자.
- 답 요약: **`git push --force-with-lease origin main`** 으로 `origin/main`을 로컬 **`64ef237`** 과 일치시킴. 원격에만 있던 커밋(예: `5b03972` 등 이후 3개)은 히스토리에서 제거됨. 다른 클론은 **`git fetch` 후 `git reset --hard origin/main`** 등으로 맞출 것.

### Git 특정 커밋으로 롤백
- 질문: 64ef237cfab0d40356b820cb22d6218e84826bb5 커밋으로 롤백하자.
- 답 요약: **`git reset --hard 64ef237cfab0d40356b820cb22d6218e84826bb5`** 로 작업 트리를 해당 커밋과 일치시킴. **`main`은 `origin/main`보다 3커밋 뒤처짐.** 미추적 경로(예: `.cursor/skills/`·`matScreenApi.ts` 등)는 그대로 남음 — 필요 시 `git clean`으로 정리.

## 2026-04-13
### Git 커밋 및 푸시
- 질문: git 커밋 및 푸시 하라
- 답 요약: **`docs/VENDOR_PROJECT_REPORT.md`**·**CHANGELOG**·**DOCUMENTATION_INDEX**·**USER_PROMPTS_LOG** 커밋 후 **`origin/main` 푸시** 완료. PDF·docx·`docs/BK MES.docx`는 미추적(생성물).

### VENDOR 보고서 §3 — 단일 물리 서버
- 질문: DB, BE, UI 모두 물리적으로 하나의 서버이다.
- 답 요약: **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §3 — **단일 애플리케이션 서버** 전제로 서두·표·배치도·§3.2·§3.7 정리, 분리 배포는 참고만. CHANGELOG.

### VENDOR 보고서 §3 — UI·외부서버·PC 구분
- 질문: 3. 시스템 구성에 UI 도 외부서버 추가, 서버, pc간에 구분이되도록 표시
- 답 요약: **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §3 — **역할 표**(사용자 PC·선택 UI 웹 서버·내부 서버·외부 서버), **배치 Mermaid**(점선 원격 UI), §3.7 PC↔내부↔외부 요약도. CHANGELOG.

### VENDOR 보고서 — 시스템 구성 상세
- 질문: 3. 시스템 구성 을 좀더 자세히
- 답 요약: **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §3 확장 — HTTP 경로 표·STD BE 내부·`userMgmtBe`/`mesDb` 베이스 우선순위·Vite 프록시·Electron vs 브라우저·Mermaid 2종. CHANGELOG.

### VENDOR 보고서 — UI 구성 상세
- 질문: BK MES 발주업체용 프로젝트 정리 보고서를 다듬어서 UI 구성을 좀 더 상세히
- 답 요약: **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** §4 확장 — 라우트 표·메인/모듈 창·스플래시·`ModuleFeaturesPage`·MDI 5모듈·`ScreenContentByScreenId` 게이트 Mermaid·`BaseFeatureScreen` 수직 스택·컴포넌트 역할 표·Electron 비고. CHANGELOG.

### Pandoc PDF — pdflatex 없음
- 질문: `pandoc docs/VENDOR_PROJECT_REPORT.md -o VENDOR_PROJECT_REPORT.pdf` 시 `pdflatex not found`
- 답 요약: 기본 PDF 엔진은 LaTeX **`pdflatex`**. **`wkhtmltopdf`** 설치 후 `--pdf-engine=wkhtmltopdf`(또는 `C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe`)로 PDF 생성 확인. **[`docs/VENDOR_PROJECT_REPORT.md`](docs/VENDOR_PROJECT_REPORT.md)** 부록 A에 Windows 예시 보강.

### Pandoc 설치
- 질문: pandoc 설치
- 답 요약: **`winget install JohnMacFarlane.Pandoc`** 로 Pandoc **3.9.0.2** 설치 완료. 새 터미널에서 `pandoc --version` 확인.

### 발주업체용 프로젝트 정리 보고서
- 질문: 발주업체용 프로젝트 정리 보고서 작성 계획을 구현하라(첨부 플랜). 플랜 파일은 편집하지 말 것.
- 답 요약: **[`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md)** 신설(Mermaid 3종·`manual.csv` 296행·레지스트리 249)·**`DOCUMENTATION_INDEX`**·**CHANGELOG** 반영. PDF 변환은 부록 A만.

---

## 2026-04-12
### db-doc API 규칙 중복 정리
- 질문: 이 규칙에 관련되어 중복이 있으면 정리하라.
- 답 요약: **`page-db-analysis-workflow.mdc`** 를 정본으로 두고 **`project-rules.md`**·**`.cursorrules`**·**`ai-rules.md`** 의 동일 서술을 짧은 참조로 통일. `mdc` 내 「후속」절은 2·3단계와 겹치지 않게 한 단락으로 정리. CHANGELOG·본 로그.

### 기준정보 14화면 std_*_api.md → HTML·smkang_doc 푸시
- 질문: 기준정보 14화면에 대해 std_*_api.md → HTML 14개 + doc 에서 git push 하라.
- 답 요약: `node scripts/render-db-doc-html.mjs` 로 14개 HTML을 `D:\smkang_data\docs\mes\` 에 생성·갱신 후 **`smkang_doc`** 저장소에서 `만든 파일 업로드` 커밋·`origin/main` 푸시(`091bac4`).

### 기준정보 모듈 모든 페이지 DB 분석
- 질문: 기준정보 모듈의 모든 페이지에 대해 DB를 분석하라.
- 답 요약: 매뉴얼 **14화면**은 기존 `docs/db-doc/*_api.md`로 화면별 상세가 있음 — **[`std_module_basis_info_overview.md`](docs/db-doc/std_module_basis_info_overview.md)** 에 통합 표·공통 패턴·문서 링크를 추가. `DOCUMENTATION_INDEX`·CHANGELOG·본 로그 반영.

### 메뉴 접근 거부 시 DB 접속 로그 미기록
- 질문: 메뉴 접근권한이 없어 팝업이 뜨고 메뉴에 진입하지 못 했으면 DB에 로그를 남기지 말자.
- 답 요약: **`POST /api/menu-access`** 에서 legacy INSERT 조건을 **`allowed`(허용)** 일 때만 수행하도록 변경. [`std_base_user_log_inq_api.md`](docs/db-doc/std_base_user_log_inq_api.md)·CHANGELOG 반영.

---

## 2026-04-07
### 공정라인 접근 거부 원인 플랜 구현
- 질문: 공정라인 관리(001 / super user) 접근 거부 원인 플랜을 구현하라.
- 답 요약: **`POST /api/menu-access`** 를 동일 `form_code` 여러 행에 대해 집계하도록 수정, 거부 시 **`no_menu`/`no_access`/`server_error`** 를 모달에 표시, **[`docs/sql/diagnose_menu_access.sql`](docs/sql/diagnose_menu_access.sql)** 진단 쿼리 추가. CHANGELOG·본 로그 반영.

### db-doc *_api.md 수정 시 HTML·푸시 규칙 기록
- 질문: `docs/db-doc/*_api.md` 파일이 수정되면 `D:\smkang_data\docs\mes`에 HTML 변환 저장 → `D:\smkang_data\docs` git 커밋 및 푸시하도록 규칙에 기록하라.
- 답 요약: **`page-db-analysis-workflow.mdc`**에 **「db-doc `*_api.md` 수정 시 후속」** 절 추가, **`project-rules.md`**·**`.cursorrules`**·**`ai-rules.md`**에 교차 반영. CHANGELOG·본 로그.

---

## 2026-04-11
### 권한 있는데 모든 페이지 접근 거부
- 질문: 현재 권한이 있는데 모든 페이지에서 접근권한이 없다고 나온다.
- 답 요약: 로그상 **`POST /api/menu-access` 500·22001** — INSERT 시 `os_version` 등이 길어 레거시 `varchar` 초과(`user_pwd` 힌트는 오탐). **INSERT 필드 클립**·**권한 SQL에 웹 `screen_id` OR** 적용. 재현 후 로그로 검증.

### Issue reproduced please proceed (메뉴 접근)
- 질문: Issue reproduced, please proceed.
- 답 요약: 위와 동일(22001 클립·권한 OR)·CHANGELOG.

### screenId·frm 미스매칭 룰 반영 여부
- 질문: screenId와 frmCommonCode가 미스매칭될때 보완 내용을 룰에 반영하였나?
- 답 요약: 이전에는 `DATABASE.md`/구현만 있었고 **§4.2 룰에는 없었음** — 이번에 `project-rules.md` §4.2 표·`ai-rules.md`·`std-be-byscreen.mdc`에 `screenFormCodeMap`·동시 갱신 명시.

### screenId와 tb_mes_menu.form_code 불일치
- 질문: screenId가 tb_mes_menu.form_code와 동일하지 않은 것 같다.
- 답 요약: 기준정보 14화면에 대해 웹 ID+레거시 `frm*` 후보로 메뉴 조회·권한은 DB `form_code` 기준으로 `screenFormCodeMap.mjs`·`userAccessLog.mjs` 반영, DATABASE·db-doc·CHANGELOG 갱신.

### 메뉴 접속 로그 미저장 디버그
- 질문: 001 로 로그인 후 std_base_common_code_mgmt 접근 시 DB 로그 미저장.
- 답 요약: (이전) 디버그 계측. (추가) 「접근 권한 확인 중」이 안 보임 — Electron 모듈 창은 `sessionStorage`가 메인과 분리되어 세션·게이트 미동작. **`MesAuthContext`에서 Electron은 `localStorage`로 세션 저장**하도록 수정, CHANGELOG 반영.

### 메뉴 접속 로그 — Electron 세션
- 질문: "접근 권한 확인 중"이 안보인다.
- 답 요약: `sessionStorage` 분리로 `uid` 없음 → 게이트 스킵. Electron에서 `localStorage` 공유로 수정(위와 동일).

### 메뉴 진입 권한·DB 접속 로그
- 질문: 메뉴 진입 시 권한 검사 및 DB 접속 로그 — 플랜대로 구현(플랜 파일은 편집하지 않음).
- 답 요약: `POST /api/menu-access` + `ScreenContentByScreenId` 게이트·`postMenuAccess`·`std_base_user_log_inq_api.md`·CHANGELOG·본 로그 반영.

### 스플래시 모달 겹침 — 렌더 가드
- 질문: 동일하게 발생(Issue reproduced, proceed). 로그 파일 없음 — 코드·플랜 근거로 수정.
- 답 요약: `pwdOpen && session && !loginOpen`로 비밀번호 오버레이 비표시, 로그인 성공 시 `setPwdOpen(false)`. 디버그 ingest 스냅샷에 `pwdModalRendered` 추가(`runId: post-fix`). CHANGELOG 보강.

### 스플래시 모달 — 계측 제거·z-index
- 질문: Issue reproduced, please proceed.
- 답 요약: ingest/`useEffect` 스냅샷·`onUserSwitch`·`reset` 내 fetch 제거. 로그인 모달 `z-[95]`, 패널 `pointer-events-auto`. CHANGELOG 한 줄.

### 스플래시 모달 — ReactDOM 포털
- 질문: Issue reproduced, please proceed.
- 답 요약: 로그인·비밀번호 모달을 `createPortal(..., document.body)`로 이동. CHANGELOG 보강.

### 스플래시 로그인 모달 입력 불가 수정
- 질문: 스플래시 로그인 모달 입력 불가 수정 플랜 구현(플랜 파일은 편집하지 않음).
- 답 요약: `SplashScreen`에 `resetSplashModalsAndForms`·`onUserSwitch`에서 호출, 로그인/비밀번호 변경 버튼 상호 배타, 모듈 타일 로그인 유도 시 `pwdOpen` 닫기. CHANGELOG·본 로그 반영.

### 로그인 정상 — 디버그 계측 제거
- 질문: 로그인은 정상이다.
- 답 요약: 로그인 디버그용 ingest·`dbgAuth` 제거, `MesAuthContext`·`authAndSplash.mjs` 정리. `passwordVerify`·`pass` 폴백 로직은 유지. CHANGELOG에 계측 제거 한 줄 반영.

### STD BE — byScreen 화면 ID 1:1 룰
- 질문: 항상 화면 ID와 byScreen 파일을 1:1로 맞추고 룰에 기록.
- 답 요약: `std_base_process_line_mgmt.mjs` 추가·`line-codes` 단일 마운트·`project-rules.md` §4.2·`.cursor/rules/std-be-byscreen.mdc`·README·db-doc·DATABASE 반영.

### std_base_process_line_mgmt — PNG·레거시·DB 연동
- 질문: PNG·`docs/legacy_mes/Basis` 참고해 공정라인 관리 화면 구성 및 DB 연결.
- 답 요약: `tb_cm_code` LINE용 `lineCodeMes.mjs` 확장·`lineMasterApi.ts`·`std_base_process_line_mgmt.tsx`·레지스트리 등록. db-doc·DATABASE·INDEX·CHANGELOG·본 로그 반영.

### 레거시 메인 → 스플래시 반영 계획 구현
- 질문: 레거시 메인 → 스플래시 반영 계획(첨부 플랜)대로 구현. 플랜 파일은 편집하지 않음.
- 답 요약: `POST/GET` auth·공지·벤더 API(`authAndSplash.mjs`)·`MesAuthContext`·`SplashScreen` 모듈 가드·10분 공지·`VITE_MES_APP_VERSION`·Electron 종료 확인·`closeAllModuleWindows`·트레이·`DATABASE.md`·`smoke-std-be`·CHANGELOG.

---

## 2026-04-08
### std_base_unit_process_mgmt — C# 쿼리 정합·검색 버그
- 질문: 계획대로 완료하지 못했으면 계속 수행(`fn-unit-process`·문서·스모크).
- 답 요약: `GET /api/fn-unit-process`를 `tb_cm_code` `UNIT_PROCESS` + `attribute01 LIKE p1%`로 이미 구현됨 확인. CHANGELOG·본 로그·`smoke-std-be.mjs`에 `fn-unit-process` 체크 추가.

---

## 2026-04-07
### std_base_unit_process_mgmt — 저장 버튼 반영
- 질문: 플랜대로 `POST /api/tb-cm-code` 저장·그리드 편집·문서 반영(신규 BE 없음).
- 답 요약: `unitProcessMgmtApi.ts`·화면 Save/툴바·편집 열·`std_base_unit_process_mgmt_api.md`·CHANGELOG·본 로그 반영.

### 사용자 LOG API — `tb_mes_menuaccesslogs` PG 소문자·snake_case
- 질문: `TB_MES_MenuAccessLogs`를 PostgreSQL에 맞게 소문자로 변경.
- 답 요약: 기본 테이블명 **`tb_mes_menuaccesslogs`**, 컬럼 **`accessed_date`·`accessed_time`·`menu_name`** 등 snake_case. 문서·`.env.example`·README·CHANGELOG 반영.

### 사용자 LOG API — `TB_MES_MenuAccessLogs` 기본·C# 동일 컬럼
- 질문: `TB_MES_MenuAccessLogs`를 쓰도록 변경. C#과 동일하게 쓰라고 했는데 왜 테이블명이 달랐는지.
- 답 요약: BE가 PG 관례(`tb_mes_user_access_log`)로 잡혀 있었음 → 기본을 **`TB_MES_MenuAccessLogs`** + **`ACCESSED_DATE`/`Accessed_Time`** 등 C# 식별자로 맞춤(`MES_USER_LOG_COLUMN_MODE=legacy`). snake 전용은 `snake` 모드. 문서·`.env.example`·README 갱신.

### legacy_mes — 기준정보 소스를 `Basis/` 폴더로 이동
- 질문: `docs/legacy_mes`의 내용은 모두 기준정보 모듈이다. `Basis` 폴더를 만들고 파일들을 이동해 달라(향후 다른 모듈 C#을 폴더별로 둘 예정).
- 답 요약: `docs/legacy_mes/Basis/` 아래로 프로젝트·`_2S_MES_Basis` 등 전부 이동. `DATABASE.md`·`db-doc`·`userAccessLog.mjs`의 레거시 경로를 `Basis/_2S_MES_Basis`로 수정. `docs/legacy_mes/README.md`·CHANGELOG·본 로그 반영.

### 기준정보 모듈 — 레거시 C# 대비 DB 문서·userAccessLog 정합
- 질문: `docs/legacy_mes` 갱신에 맞춰 기준정보 전 화면을 레거시 `frm`과 비교해 DB 관련 사항 수정(계획 이어서 실행).
- 답 요약: `DATABASE.md`에 14화면 매핑 표·사용자 LOG Oracle 전제. `db-doc` 8건을 `/api`·`userMgmtBe` 기준으로 갱신, 공정라인·cfg 6건 신규 md. `userAccessLog.mjs`에 `MES_USER_LOG_*` env. `DOCUMENTATION_INDEX`·CHANGELOG·본 로그 반영.

### 기준정보 기준설정 — `std_cfg_*` 4화면 규칙 정합
- 질문: 기준정보 > 기준설정 페이지 생성 규칙 준수 계획 실행(첨부 플랜·TODO 전부 완료, 플랜 파일은 편집하지 않음).
- 답 요약: `manual.csv`와 `docs/매뉴얼.csv` 기준설정 4행 일치 확인, `docs/image/std_cfg_*.png`는 저장소에 없음(§6.0 캡처 안내). `cfgMesApi.ts`에 `postCfgRouteRow`·`postCfgTactTimeRow`·`postCfgPackingUnit`·`cfgMesScreenMaps.ts` 추가. `std_cfg_router_mgmt`·`std_cfg_prod_router_mgmt`·`std_cfg_tact_time_mgmt`·`std_cfg_packing_unit_mgmt`를 `MesSearchSaveBar`·GET/POST 연동·레거시 `MessageBox` 취지 배너(`confirm`은 생산 라우터 저장). `std_base_vendor_mgmt.tsx` TS 빌드 오류(readonly columns·미사용 파라미터) 최소 수정. `docs/db-doc/std_cfg_*_api.md` 4건 템플릿 수준 확장·CHANGELOG·본 로그 반영.

### 마스터–상세 성능 패턴 이식 및 룰
- 질문: 플랜대로 `std_base_user_mgmt`·`std_base_vendor_mgmt`에 ref/`virtualizeRows` 적용, `MesDetailForm` 커스텀 선택 화면 grep, `.cursor/rules/mes-master-detail-performance.mdc`·`project-rules.md`·CHANGELOG·본 로그 반영.
- 답 요약: `usersRef`·`searchResultRef`로 `onSelectRow` 안정화, 사용자 화면은 `user_id` 기준 find로 정렬 후 인덱스 오류 방지. 나머지 `MesDetailForm` 화면은 `useMesGridRowSelection` 위주로 추가 변경 없음. `mes-master-detail-performance.mdc`·§0 항목 6 추가.

---

## 2026-04-11
### 룰 문서 — MesSearchSaveBar leading·경고 영역
- 질문: 룰에 기록
- 답 요약: `docs/LAYOUT_RULES.md` MesSearchSaveBar 표를 `leading` flex-1·`pr-[10px]`·필터 `shrink-0` 조건부로 갱신, 배너 `break-words` 안내 추가. `project-rules.md` §6.1·`.cursorrules`·`ai-rules.md`에 교차 참조.

### std_base_user_mgmt — 경고 문구 영역 너비(사용자 ID 10pt 전)
- 질문: 경고 문구가 나오는 영역을 "사용자 ID" 텍스트 10포인트 전까지 늘림
- 답 요약: `MesSearchSaveBar` leading 을 `flex-1`·필터 열은 `shrink-0`으로 두고 leading 우측에 `pr-[10px]`. `std_base_user_mgmt` 배너는 `max-w-[14rem] truncate` 제거·`flex-1 break-words`로 넓게 표시.

### std_base_user_mgmt — 동일 사용자ID 변경·신규 시 경고 후 불가
- 질문: 동일한 사용자ID로 변경하거나 신규생성시 경고 후 불가
- 답 요약: `originalUserId`로 편집 행을 고정하고 `fetchTbCmUserExistsExact`(GET `/api/users` 접두+완전일치)로 저장 전 중복 검사. 신규·ID 변경 시 기존 ID와 겹치면 배너로 차단. `existingRow`/삭제는 `detail[0]` 대신 `originalUserId` 기준으로 정리.

### tb_cm_user 스키마 캡처 — user_pwd varchar(50) 확인
- 질문: (이미지) `tb_cm_user` 컬럼 정의 — `user_pwd` 가 `character varying(50)`
- 답 요약: 스크린샷과 동일하게 50자 제한이면 bcrypt(약 60자) 저장 불가. `ALTER … user_pwd VARCHAR(72)` 또는 `TEXT` 필요.

### POST /api/users 400 — user_pwd varchar(50)·bcrypt 안내 문구
- 질문: 저장 실패: POST /api/users 400: user_pwd 컬럼이 varchar(50)라 bcrypt 해시(60자…) DBA: ALTER TABLE …
- 답 요약: 400은 앱 오류가 아니라 스키마 한계 안내. PostgreSQL에서 `user_pwd`를 `VARCHAR(72)` 이상 또는 `TEXT`로 `ALTER` 한 뒤 저장하면 된다.

### POST /api/users — user_pwd varchar(50)·bcrypt 22001 (재발)
- 질문: std_base_user_mgmt 신규등록 시 패스워드에서 varchar(50) 너무 김(22001). 이전에 수정·룰 반영 여부?
- 답 요약: `project-rules.md` §4.1·`DATABASE.md` 등에 이미 bcrypt·`VARCHAR(72)` 안내가 있음. BE는 `tbCmUser.mjs`에서 메타 조회를 `information_schema`+`pg_catalog.format_type`으로 보강하고, 예전 `null` 캐시로 검증이 스킵되던 경우를 줄임. **근본 해결은 DB** `ALTER TABLE tb_cm_user ALTER COLUMN user_pwd TYPE VARCHAR(72)` 또는 **TEXT**. **`D:\mes_BE`** 는 MES `server/` 와 동기화 필요.

### 디버그 계측 제거 (std_base_common_code_mgmt)
- 질문: The issue has been fixed. Please clean up the instrumentation.
- 답 요약: `std_base_common_code_mgmt.tsx` 초기 로드 블록에서 ingest `fetch` 및 `#region agent log` 구간을 제거했다. `pickInitialGroupCode`·조회 흐름은 그대로 유지.

### STD 공통코드 — 초기 선택을 "GROUP CODE" 옵션으로
- 질문: 초기 로드 시 첫 항목이 아니라 콤보박스 값 중 "GROUP CODE"가 있으면 그걸 선택하고 그리드를 조회하라.
- 답 요약: `pickInitialGroupCode`로 `value`·`label`이 `GROUP CODE`인 항목을 찾아 초기 `code_group__like`로 조회하고, 없으면 첫 옵션으로 폴백했다. 검증용 디버그 로그는 이후 제거됨.

### STD 공통코드 — 초기 그룹 조회·전체 옵션 제거
- 질문: std_base_common_code_mgmt 수정 1) 페이지 첫 로딩시 GROUP CODE를 선택값으로 하여 그리드를 채우면서 로딩한다. 2) 콤보박스에 전체를 삭제한다.
- 답 요약: 초기 `useEffect`에서 `fetchFnCmCodeOptions` 후 첫 옵션 값으로 `setFilterGroupCode`·`fetchTbCmCodes`를 수행하도록 변경했다. `runSearch(optionalGroup)`로 콤보 변경 시 즉시 재조회. `전체` 옵션 제거, 옵션 0건일 때 `(그룹 없음)` placeholder만 표시.

### Git — 커밋
- 질문: 커밋해
- 답 요약: 추적 대상 변경이 `mes-config.ini`(untracked)뿐이라 `.gitignore`에 추가하고 해당 파일만 커밋했다.

### Git — 커밋 및 푸시
- 질문: git 커밋 및 푸시 하라
- 답 요약: `mes-config.ini` 제외하고 스테이징 후 커밋·`origin/main` 푸시.

### STD — 화면별 byScreen 구현 + lib/queries 공통 SQL
- 질문: 화면마다 전용 파일에 구현하고 (공통 SQL은 lib/queries 등으로 빼는 방식)
- 답 요약: `server/src/lib/queries/`에 기존 도메인 라우트 구현을 옮기고 `routes/byScreen/std_*.mjs`를 화면 ID별 진입점으로 두었다. `index.mjs`는 byScreen만 등록, `routes/users.mjs` 등 11개 도메인 파일은 삭제. `fnMesStd`는 단위공정/단위공정라인 라우터 분리. 문서·db-doc 경로 갱신.

### STD BE — 불필요한 mjs 삭제
- 질문: 필요없는 mjs는 지워라
- 답 요약: 구현 없이 도메인만 재export하던 `routes/byScreen/std_*.mjs` 13개·README를 삭제하고 `index.mjs`를 도메인 라우터 직접 등록으로 복원했다. `DATABASE.md`·README·INDEX·`lib/queries/README`에서 byScreen 설명을 정리했다.

### STD — 화면 ID 1:1 byScreen mjs 플랜 구현
- 질문: (플랜) 기준정보 화면 ID ↔ 전용 mjs 1:1 (검증 후 공통화) — 문서·byScreen·스모크·정리
- 답 요약: `DATABASE.md`·`server/README`에 매핑표, `routes/byScreen/std_*.mjs` 13개·`index.mjs` 전환, `scripts/smoke-std-be.mjs`·`docs/SMOKE_STD_BE.md`·`npm run smoke:be`, Phase 3용 `lib/queries/README.md`·byScreen README 보강, CHANGELOG·DOCUMENTATION_INDEX 반영.

### 기준정보 — 화면별 전용 mjs 미작성 화면 ID
- 질문: 기준정보에서 mjs 파일이 안만들어진 화면아이디는?
- 답 요약: `server/src/routes/`에 `std_<screenId>.mjs`는 없고 기능별 공통 mjs만 있다. 기준정보 13개 화면 ID는 모두 도메인별 라우트로 매핑 가능하며, **별도 전용 mjs가 없는 화면 ID는 전부(13개)** 이다.

### 기준정보 미완 화면 — C# DB 추출·서버 mjs 추가
- 질문: 아직 "같게 변환 완료"라고 보기 어려운 화면 들도 C#에서 DB 관련부분을 추출하여 서버에 해당 mjs 파일을 만들어 놓자
- 답 요약: `processLineMes`·`lineCodeMes`·`unitProcessLineCodeMes`·`cfgMesMutations` 라우트를 추가하고 `index.mjs`에 등록했다. `DATABASE.md`·`server/README.md`·`CHANGELOG`에 엔드포인트를 반영했다(레거시 `frm*` 정합·화면 연동은 별도).

### 기준정보 — C# DB 변환 완료 화면 질문
- 질문: 기준정보 모듈의 모든 페이지중에서 C#의 DB와 같게 변환이 완료된 페이지는 어떤것인가?
- 답 요약: **완료에 가깝게(화면→Node BE `/api`→PostgreSQL, 레거시 `frm`·테이블 정합)** 는 공통코드·사용자·사용자권한·메뉴권한·단위공정·단위공정라인·거래처·사용자LOG(조회) 8종. 기준설정 4종·공정라인 구성은 API만 있거나 샘플만. 공정라인 관리는 미등록·PNG 없음.

### STD 플랜 — 진행 (Phase 4 user log)
- 질문: 진행
- 답 요약: `GET /api/user-access-logs`·`userLog.mjs` 추가, `userAccessLogApi`·`std_base_user_log_inq` 연동, `tb_mes_user_access_log` 전제·`MES_USER_LOG_TABLE` 문서화, `std_base_user_log_inq_api.md`·DATABASE·INDEX·README·`userMgmtBeBaseUrl` 주석 갱신. 플랜 phase4 전부 완료.

### STD 플랜 — 진행 (Phase 3 cfg)
- 질문: 진행
- 답 요약: Phase3에 따라 `cfgMes.mjs`로 기준설정 조회 API 6종을 추가하고 `cfgMesApi.ts`를 두었다. 네 cfg 화면은 아직 PNG 샘플이며 파일 헤더에 API 링크만 명시했다. DATABASE·README·CONTEXT·CHANGELOG·플랜 TODO(phase3) 갱신.

### STD 플랜 — 계속 진행
- 질문: 계속 진행
- 답 요약: Phase2에 따라 `mesAuthority.mjs`로 사용자·메뉴 권한 API를 추가하고 `userAuthorityApi`·`menuAuthorityApi`를 `/api/...`로 전환했다. DATABASE·README·CONTEXT·CHANGELOG·플랜 TODO(phase2)를 갱신했다.

### STD 모듈 전용 BE 플랜 — 리부트 후 이어서
- 질문: std_모듈_전용_be_a4e5d2cd.plan.md 를 수행중에 컴퓨터가 리부트 되었다. 계속 이어서 진행하라.
- 답 요약: 플랜 상태를 확인해 Phase0·공통코드 Phase1은 이미 반영된 뒤였고, 누락된 `tbCmCustomer`·`fnMesStd` 라우트를 `index.mjs`에 등록한 뒤 거래처·단위공정(라인) API 클라이언트를 STD BE `/api/...`로 전환했다. DATABASE·README·CONTEXT·CHANGELOG·플랜 TODO를 갱신했다.

## 2026-04-10
### DB 수정내역 — 프로젝트 룰·문서 반영
- 질문: DB 관련 수정내역들을 룰에 기록하라.
- 답 요약: `project-rules.md` **§4.1**(`tb_cm_user`·bcrypt·upsert·날짜 varchar), **`docs/DATABASE.md`** 신설, `DOCUMENTATION_INDEX`·`CONTEXT`·`ai-rules`·`.cursorrules`·§1 브리핑 보강.

### POST /api/users — 22001 varchar(50) 너무 김
- 질문: `[POST /api/users]` `22001` character varying(50) 자료형에 너무 긴 자료.
- 답 요약: **bcrypt 해시(~60자)** 가 **`user_pwd` varchar(50)** 에 안 맞음 — DB에서 `VARCHAR(72)` 또는 `TEXT` 로 확장. `friendlyPgError`·README·DB 문서 안내. 추가로 **`information_schema`** 로 컬럼 길이를 읽어 **쓰기 전 400** + `ALTER TABLE` 문구로 **22001 대신** 명확히 안내(스키마 수정 필수·`D:\mes_BE` 동기화).

### POST /api/users — 22001 (재문의)
- 질문: 동일 `22001` 로그 재전달.
- 답 요약: DB 미변경 시 동일 오류 — 위 **400 사전 검사**·`ALTER TABLE` 적용·BE 재시작.

### POST /api/users — COALESCE varchar·date (42804)
- 질문: `[POST /api/users]` `42804` — COALESCE 자료형 character varying 와 date 는 서로 매치되지 않습니다.
- 답 요약: `beginning_employment_date` 가 varchar인 레거시 스키마에서 `COALESCE(컬럼, date)` 제거 → UPDATE는 `CASE`/기존 유지·아니면 `to_char`, INSERT는 `to_char(COALESCE($8::date, CURRENT_DATE),'YYYY-MM-DD')`. `friendlyPgError` 42804 안내 추가. **`D:\mes_BE` 등 복제본은 동기화 필요.**

### 사용자 관리 — 저장 실패 `POST /api/users 500: ON CON`
- 질문: 저장 시 저장 실패: POST /api/users 500: ON CON (DEBUG 계측·재현 요청).
- 답 요약: `ON CONFLICT` 제거·`UPDATE`→`INSERT` upsert로 수정. 검증 후 **`server/src/index.mjs` DEBUG 계측(`agentDebugNdjson`·`debug-75458a.log`) 제거**.

### 사용자 관리 — POST 저장 검증 후 계측 제거
- 질문: Issue reproduced, please proceed.
- 답 요약: 사용자 확인에 따라 POST용 NDJSON 디버그 로깅 전부 제거(upsert 로직은 유지).

### 사용자 관리 — 조회 실패
- 질문: 조회 버튼 시 조회 실패.
- 답 요약: `mes-user-mgmt-server`는 HTTP(`app.listen`)만 제공 — `USER_MGMT_API_BASE`를 `https://`로 두면 Vite 프록시가 잘못된 스킴으로 접속해 실패. `http://100.71.84.10:8787`로 수정, 예시·SETUP에 스킴 안내.

### mes-config.ini — `/api` 원격 BE(100.71.84.10:8787)
- 질문: `/api`가 localhost가 아니라 100.71.84.10으로 가도록 설정(해줘).
- 답 요약: 저장소 루트 `mes-config.ini`에 `USER_MGMT_API_BASE`·`USER_MGMT_API_PORT=8787` 명시 — BE는 HTTP이므로 **`http://`** URL 사용(후속 `https` 오설정 시 조회 실패).

### 사용자 관리 BE — INI(UI_URL)와 동일 호스트 사용
- 질문: UI 서버와 동일 값을 ini에서 읽어 사용(수행).
- 답 요약: `USER_MGMT_API_BASE` 우선, 없으면 `UI_URL`+`USER_MGMT_API_PORT`. Electron IPC·`main.tsx` 주입, Vite는 동일 INI로 `/api` 프록시. `MES_USER_MGMT_PROXY_TARGET`·`MES_USER_MGMT_API_BASE` env 우선 가능.

## 2026-04-09
### mes-user-mgmt-server — pg_hba.conf 거부(클라이언트 IP)
- 질문: 연결 실패, 오류에 `pg_hba.conf`·호스트 IP(예: 100.70.157.20) 등(콘솔 인코딩 깨짐).
- 답 요약: 서버가 보는 출구 IP에 대한 `pg_hba` 규칙 부재 — DBA가 host/hostssl 추가 또는 BE를 DB 동일 호스트에서 구동. `isPgHbaRejection`·`friendlyPgError`·README 보강.

### mes-user-mgmt-server — SSL 미지원 서버 메시지
- 질문: PGSSLMODE=require 후 `The server does not support SSL connections`.
- 답 요약: 해당 PG는 평문만 허용 — `PGSSLMODE=disable` 또는 require 제거. `friendlyPgError`·README·`.env.example`에 쌍방 안내. ECONNRESET 안내는 평문/SSL 둘 다 언급하도록 수정.

### mes-user-mgmt-server — 원격 PG ECONNRESET + SSL
- 질문: PGHOST=100.71.84.10 등 설정 후 `read ECONNRESET`.
- 답 요약: SSL 미협상·방화벽 등 가능. Pool에 `PGSSLMODE`/`sslmode=require` 반영, 안내 문구·README·`.env.example` 보강. 사용자는 `PGSSLMODE=require` 추가 후 재시도.

### mes-user-mgmt-server — ECONNREFUSED (로컬 PostgreSQL)
- 질문: dev:be 실행 시 GET /api/users 에서 ECONNREFUSED (::1·127.0.0.1:5432).
- 답 요약: 코드 결함이 아니라 해당 주소에 PostgreSQL 미기동·미설정. 기동 시 연결 검사·콘솔/JSON 안내 문구 추가, `.env.example` 보강. 실제 해결은 PG 서비스 또는 `DATABASE_URL`/PGHOST 등 원격 설정.
- (후속) 디버그 ingest `fetch` 계측 제거 — 안내 로직·`friendlyPgError`는 유지.

## 2026-04-08
### std_base_user_mgmt — 레거시 DB 의미 + PostgreSQL + 전용 BE 구현
- 질문: std_base_user_mgmt 를 frmUser.cs DB 구현을 PostgreSQL에 맞게 적용, BE에서 DB 처리·Electron은 BE에서 데이터 수신(플랜 실행).
- 답 요약: `server/` Node BE(`/api/users`, bcrypt, DEVELOPER 차단). 렌더러 `userMgmtBeBaseUrl`·`tbCmUserApi`·매퍼(telephone·address·attribute02·password, MD5 제거). Vite `/api` 프록시·`npm run dev:be`. Electron `USER_MGMT_API_BASE` TLS 예시. DB 문서·CONTEXT·SETUP·CHANGELOG 갱신.

## 2026-04-07
### std_base_unit_process_line_mgmt — 공정 열 process
- 질문: 그리드 매칭 공정 열을 `process`로 변경(process_line, code_desc와 정리).
- 답 요약: `rowToGridRow` 3열 우선 키를 `process`로 두고 `attribute04` 폴백. `db-doc`·화면 주석·`CHANGELOG` 반영.

### std_base_unit_process_line_mgmt — 그리드 열 매핑 변경
- 질문: 그리드 열 매칭을 unit_process_name, code, code_name, attribute04, process_line, code_desc 로 변경.
- 답 요약: `rowToGridRow` 5·6열 우선 키를 `process_line`·`code_desc`로 수정, 레거시 키 폴백 유지. 화면 주석·`std_base_unit_process_line_mgmt_api.md`·`CHANGELOG` 반영.

### std_base_vendor_mgmt — DB·HTTP 문서
- 질문: std_base_vendor_mgmt 페이지에 대한 DB 분석
- 답 요약: `docs/db-doc/std_base_vendor_mgmt_api.md` 작성(템플릿 준수), `DOCUMENTATION_INDEX` 링크, `render-db-doc-html.mjs`로 `D:\\smkang_data\\docs\\mes\\` HTML, `smkang_doc` 커밋·푸시. `CHANGELOG` 반영.

### std_base_vendor_mgmt — 조회 `cust_name__like`만 전달
- 질문: 거래처 검색 시 `cust_name__like`만 GET에 넣고 거래형태는 클라이언트 필터(플랜 구현).
- 답 요약: `runSearch`에서 `cust_code__like` 제거·`cust_name__like`만 설정, 파일 상단 주석 보강, `CHANGELOG` 반영.

### std_base_vendor_mgmt — tb_cm_customer 연동·CRUD
- 질문: tb_cm_customer 연동, 컬럼 매핑, MesSearchSaveBar 검색, 신규·저장·삭제.
- 답 요약: `tbCmCustomerApi`/`tbCmCustomerMapper` 추가, 화면에서 조회·거래형태 필터·툴바 CRUD·삭제 확인 UI 반영, `CHANGELOG`/`USER_PROMPTS_LOG` 기록.

### std_base_unit_process_line_mgmt — DB 분석
- 질문: std_base_unit_process_line_mgmt 페이지에 대한 DB 분석
- 답 요약: `docs/db-doc/std_base_unit_process_line_mgmt_api.md` 작성(템플릿 준수), `DOCUMENTATION_INDEX` 링크, `render-db-doc-html.mjs`로 `D:\\smkang_data\\docs\\mes\\` HTML, `smkang_doc` 커밋·푸시. `CHANGELOG` 반영.

### std_base_unit_process_line_mgmt — 그리드 컬럼·DB 필드
- 질문: 단위공정 라인 그리드 열을 unit_process_name, code, code_name, attribute04, line_code_name, attribute05 로 채워줘.
- 답 요약: `fnUnitProcessLineApi` `rowToGridRow`에서 위 필드명 우선 매핑·주석·`CHANGELOG` 반영.

### 그리드 검색 시 행 없음
- 질문: 검색 버튼을 눌러도 그리드에 값이 하나도 안올라온다
- 답 요약: API 응답 JSON 키 매핑·배열 래핑 불일치로 셀이 전부 빈 문자열이 되면 `MesDataGridPanel`이 행을 제거. `parseJsonArray`·`rowToGridRow` 보강 및 전체 조회 시 `?p1=` 후 0건이면 쿼리 없이 재시도. `fn_unit_process`·`fn_unit_process_line` 공통. `CHANGELOG` 반영.

### std_base_unit_process_line_mgmt — DB URL 적용
- 질문: std_base_unit_process_line_mgmt 수정 … tb_cm_code, fn_cm_code UNIT_PROCESS, fn_unit_process_line ?p1= / ?p1=FCT DB 적용
- 답 요약: `fetchFnUnitProcessLine`가 항상 `?p1=` 전달. 화면은 마운트 시 `?p1=` 전체 1회·이후 Search만 재호출. 주석에 `db/tb_cm_code`·URL 명시. `CHANGELOG` 반영.

### std_base_unit_process_mgmt — DB 분석
- 질문: std_base_unit_process_mgmt 페이지에 대한 DB분석
- 답 요약: `docs/db-doc/std_base_unit_process_mgmt_api.md` 작성(템플릿 준수), `DOCUMENTATION_INDEX` 링크, `render-db-doc-html.mjs`로 `D:\\smkang_data\\docs\\mes\\` HTML, `smkang_doc` 커밋·푸시. `CHANGELOG` 반영.

### std_base_unit_process_mgmt — 포장타입 빈 콤보(의도)
- 질문: 포장타입은 공정과 달리 값이 없으면 콤보박스에 빈공간이 선택되었으면 한다.
- 답 요약: 포장타입만 `value=""` 유지, 첫 옵션 대체 제거. `<option value="">` 추가로 빈 선택 표시. 주석·`CHANGELOG` 반영.

### std_base_unit_process_mgmt — 포장타입 (이전 답 오해)
- 질문: 아니 잘못 이해해.
- 답 요약: 포장타입 **폴백 초기 상태**·**빈 셀 자동 첫 옵션 동기화 `useEffect`** 롤백. 원하는 UI/데이터 동작을 다시 알려주면 그에 맞게 수정 가능.

### std_base_unit_process_mgmt — 포장타입 빈 콤보
- 질문: 포장타입 값이 없으면 콤보박스에 빈공간이 선택된다.
- 답 요약: `packTypeOptions` 초기값을 폴백 옵션으로 두어 API 전 `<select>`에 옵션이 생기게 함. 빈 포장타입 셀은 공정 열과 동일하게 첫 옵션으로 `useEffect` 동기화. `CHANGELOG` 반영.

### std_base_unit_process_mgmt — 저장 버튼 POST 연동
- 질문: 저장버튼을 연결해줘.
- 답 요약: (이후 사용자 요청으로 롤백) `POST fn_unit_process`·저장 UI·`fnUnitProcessApi` 저장 함수 제거, `showFilterSave={false}`·문서 항목 원복.

### fn_unit_process — 공정 열 매핑(attribute01, process_code_name)
- 질문: 추천(attribute01·process_code_name)대로 구현.
- 답 요약: `fnUnitProcessApi` `rowToGridRow` 공정 열을 `attribute01`→`process_code_name`→기존 키 순으로 pick, 단위공정에 `code`/`CODE`·`code_name` 보강. 화면 주석·`CHANGELOG` 반영.

### std_base_unit_process_line_mgmt — DB URL (fn_cm_code, fn_unit_process_line)
- 질문: `tb_cm_code`, `fn_cm_code?p1=UNIT_PROCESS&p2=disp_seq`, `fn_unit_process_line?p1=` / `?p1=FCT` 반영.
- 답 요약: `fnUnitProcessLineApi.ts`로 `GET /func/fn_unit_process_line`·6열 매핑. 콤보는 `fetchFnCmCodeOptions('UNIT_PROCESS','disp_seq')`+전체, 그리드는 `p1`로 전체/조건 조회·Search 재호출. `CHANGELOG` 반영.

### std_base_unit_process_line_mgmt — MesDetailForm·라인 조회·단위공정 콤보
- 질문: MesDetailForm 삭제, MesSearchSaveBar의 라인+콤보 삭제, 단위공정 우측 텍스트박스를 콤보박스로 변경.
- 답 요약: `MesGridRowDetailForm` 제거. 조회줄은 `단위공정`만 `PlainSelect`(전체+`STD_UNIT_PROCESS_LINE_ROWS` 고유값), `filteredRows`·`useMesGridRowSelection`·필터 변경 시 `onSortChange`. `CHANGELOG` 반영.

### std_base_unit_process_mgmt — DB URL 반영 (fn_cm_code, fn_unit_process)
- 질문: `tb_cm_code`, `fn_cm_code?p1=PROCESS&p2=disp_seq`, `fn_unit_process?p1=` / `?p1=SMT` 등 URL 정보를 페이지에 반영.
- 답 요약: `fnUnitProcessApi.ts`로 `GET /func/fn_unit_process` 호출·8열 매핑. 화면에서 공정은 `fetchFnCmCodeOptions('PROCESS','disp_seq')`+전체, 그리드는 `p1`로 전체/공정별 로드, Search로 재조회. `CHANGELOG` 반영.

### USER_PROMPTS_LOG 규칙 미준수
- 질문: 사용자 질문·프롬프트 로그 룰이 안지켜지고 있다.
- 답 요약: `project-rules.md` §2에 선행 기록을 **도구로 최우선**하도록 명시하고, **`.cursor/rules/user-prompts-log-workflow.mdc`**(alwaysApply)를 신설해 매 턴 순서·범위를 고정. `.cursorrules`·`ai-rules.md`에서 상호 참조. 본 턴도 규칙에 맞게 로그·CHANGELOG 반영.

### std_base_unit_process_mgmt — 조회줄·하단 폼
- 질문: (계획) 하단 MesDetailForm 삭제, MesSearchSaveBar 저장 버튼 삭제, 단위공정을 콤보박스+텍스트 입력으로 변경.
- 답 요약: `MesGridRowDetailForm` 제거·`showFilterSave={false}`. 단위공정은 `STD_UNIT_PROCESS_ROWS` 고유 단위 공정코드 콤보+텍스트 검색, `useMemo` 필터·필터 변경 시 `onSortChange`로 선택 초기화. `CHANGELOG` 반영.

### std_base_unit_process_mgmt — 단위공정 라벨·콤보 너비
- 질문: MesSearchSaveBar 의 "단위공정" 텍스트는 지우고 콤보박스의 너비를 50%로 조정.
- 답 요약: `FormLabelInput`(단위공정) 제거 후 콤보+검색을 `flex` 한 줄로 유지, `PlainSelect`·`PlainInput` 각 `w-1/2 min-w-0`. `CHANGELOG` 한 줄.

### std_base_unit_process_mgmt — 조회줄 콤보·입력 너비 축소
- 질문: MesSearchSaveBar 콤보박스와 텍스트창이 너무 크다. 사이즈를 반으로 줄이자.
- 답 요약: 단위공정 묶음 `flex-1` 제거 → `w-1/2 max-w-md`로 블록 너비를 조회줄 기준 절반(상한 `max-w-md`)으로 제한, 내부는 기존처럼 각 `!w-1/2`. `CHANGELOG` 반영.

## 2026-04-03
### Vite ECONNREFUSED 디버그 계측 제거
- 질문: 이슈 해결됨 — 계측(instrumentation) 정리.
- 답 요약: `vite.config.ts`에서 `debug-75458a.log` append·ingest `fetch` 및 진단용 분기 제거, `resolveUserMgmtProxyTarget` 단순 복원.

### `npm run dev` — dev.mjs SyntaxError
- 질문: `console.warn` 줄 `Invalid or unexpected token`(백틱·문자열).
- 답 요약: 템플릿 리터럴 조기 종료·끝 따옴표 누락으로 파싱 실패 → 한 줄 `console.warn` 템플릿으로 정리.

### Vite `/api/users` 프록시 ECONNREFUSED (DEBUG)
- 질문: `[vite] http proxy error: /api/users` · `AggregateError [ECONNREFUSED]` 원인 확인·수정.
- 답 요약: 저장소에 `mes-config.ini` 없음 → Vite는 `fallback_localhost_8787`; `npm run dev`가 BE 미기동이어서 ECONNREFUSED. `scripts/dev.mjs`에서 Vite 신규 기동 시 `mes-user-mgmt-server` 동시 기동·`wait-on`·`MES_DEV_SKIP_USER_MGMT_BE=1` 옵션. (임시) Vite 진단 계측은 검증 후 제거됨.

### Git — 수정사항 정리·push
- 질문: 수정사항 정리하여 git push.
- 답 요약: 변경 파일 스테이징(대용량 `std_base_menu_permission_mgmt-DB.txt`·`.cursor/` 제외), 커밋 메시지로 요약 후 `origin` 푸시.

### std_base_menu_permission_mgmt — 변경 건수 조회줄 좌측
- 질문: 「변경 N건 — 저장 클릭 시 반영」을 MesSearchSaveBar 좌측으로, 글자 크기는 조회줄과 동일.
- 답 요약: `filterLeading`에 `text-[11px] text-amber-700` 로 표시, 본문 중복 블록 제거.

### std_base_menu_permission_mgmt — 조회줄 버튼 제거
- 질문: 모든권한과 권한그룹 사이 조회·저장·삭제 없애기.
- 답 요약: 해당 버튼 블록·`runDelete`·`deleteMenuAuthority` import·FilterBarButtons import 제거. Search/Save는 `toolbarHandlers` 유지.

### std_base_menu_permission_mgmt — 모듈 권한 사각형
- 질문: [BAS][MAT]… 대신 색 사각형, 권한별 빨·초·보라.
- 답 요약: `menu_name`을 모듈명만 저장. `aggregateModulePerm`으로 하위 메뉴 권한을 집계해 `PERM_SQUARE`+`PERM_DOT` 색으로 표시.

### std_base_menu_permission_mgmt — +/− 네모 토글
- 질문: 삼각형 표시 대신 하위트리 접힘 +네모, 열림 −네모.
- 답 요약: `TreeExpandToggle`으로 13px 네모 버튼(+ / U+2212 −), 그라데이션·테두리. 리프는 동일 폭 스페이서.

### std_base_menu_permission_mgmt — 점선 트리·30% 축소
- 질문: 메뉴권한 트리: [-] 제거 · 점선 트리라인 · 30% 축소 (플랜 구현).
- 답 요약: `parentKey`로 가이드 메타 계산, 점선 세로/가로 가이드 열, `[-]` 제거, 본문 `text-[14px]` 등 축소.

### std_base_menu_permission_mgmt — 조회줄·트리 UI
- 질문: MesSearchSaveBar에서 Search Save 삭제하고 모든권한 우측에 조회·저장·삭제 추가. 트리 2배 크기·하위 접기/펼치기.
- 답 요약: `showFilterSearch`/`showFilterSave` false, 범례 옆 `FilterSearchButton`/`FilterSaveButton`+삭제. `collapsedPgm`/`collapsedGroup`로 가시 행 필터, ▶/▼ 토글. 본문 `text-[20px]` 등 2배 스케일.

### std_base_menu_permission_mgmt — 동적 구현
- 질문: 분석내용을 구현하라.
- 답 요약: `menuAuthorityApi.ts` 신규 작성(fetch/post/delete). 화면을 정적 샘플에서 동적 API 연동으로 전면 재구현 — 콤보(18건), 트리(pgm_code→depth1→depth2), 더블클릭 권한 토글, diff 기반 저장.

### std_base_menu_permission_mgmt — DB 분석 및 문서화
- 질문: std_base_menu_permission_mgmt-DB.txt 실제 API 응답 데이터를 참고해서 분석하고, std_base_user_mgmt_api.md 스타일의 MD 파일 생성 + HTML 변환.
- 답 요약: `docs/db-doc/std_base_menu_permission_mgmt_api.md` 작성(14개 섹션). 5개 API(fn_cm_code, fn_mes_menu_user_class, tb_mes_menu, tb_mes_menu_all, tb_mes_menu_authority) 실제 데이터 기반 필드·건수·권한 조합 분포 상세 문서화. HTML 변환 후 smkang_doc 배포.

### std_base_user_permission_mgmt — 페이지 DB분석
- 질문: std_base_user_permission_mgmt 페이지에 대한 DB분석
- 답 요약: `docs/db-doc/std_base_user_permission_mgmt_api.md` 전면 재작성(14개 섹션). 콤보 3종, 사용자 그리드, 권한그룹 조회/편집, POST/DELETE, 저장 동작 상세 등 화면 전체 API 문서화. HTML 변환 후 `smkang_doc` 푸시.

### std_base_user_permission_mgmt — 권한그룹 탭 더블클릭 추가/제거 + 저장
- 질문: 권한그룹 탭에서 좌측 더블클릭→우측 추가(중복 무시), 우측 더블클릭→제거, 저장 시 DB 반영.
- 답 요약: `SimpleGridTable`에 `onRowDoubleClick`, `MesDataGridPanel`에 `onDoubleClickRow` prop 추가. 화면에 `groupOriginalIds`(API 로드 원본) 두고 `rightUsers`를 편집 목록으로 사용. `runSave`를 탭별 분기: 권한그룹 탭은 diff 기반 DELETE/POST(`tb_mes_user_authority`), 권한복제 탭은 기존 로직 유지.

### std_base_user_permission_mgmt — 권한 그리드: 권한그룹 코드 열 제거·줄번호 열
- 질문: 권한 그리드는 권한그룹 코드행은 삭제하고 행번호 열을 넣어라. 행번호 열의 사이즈는 행번호 텍스트의 사이즈를 기본값으로 가지자.
- 답 요약: `AUTH_GROUP_COLS`를 `권한그룹`만 두고 `userAuthGroupCells`는 `code_name`만. `MesDataGridPanel`에 `lineNoColWidth`(기본 `4%`) 추가, 권한 그리드는 `lineNoColWidth="3ch"`. `SimpleGridTable` `initPxColWidths`에서 첫 열 `Nch`를 `text-[11px]` 기준 px로 잡고 나머지 열에 남은 폭 배분. 줄번호 열 `tabular-nums text-center`.

### std_base_user_permission_mgmt — 하단 그리드 높이 추가 축소
- 질문: 지금보다 20% 더 줄이자.
- 답 요약: 왼쪽·권한복제 탭 모두 상단:하단 flex를 `2:1` → `11:4`로 조정(하단 세로 비중이 기준 대비 약 20% 감소). 하단 래퍼는 `flex-[4]`.

### std_base_user_permission_mgmt — 권한 그리드 MesDataGridPanel·높이 정합
- 질문: 권한 그리드도 선택 그리드와 같은 크기로 맞추고 MesDataGridPanel로 해줘.
- 답 요약: 왼쪽 하단 `userAuthGroups` div 리스트를 `MesDataGridPanel`(`AUTH_GROUP_COLS`: 권한그룹 코드·권한그룹)로 전환, 사용자 그리드와 1:1 flex 분할. 권한복제 탭도 대상·선택 `flex-[3]`/`flex-1` → 동일 `flex-1`로 변경.

### SimpleGridTable — 헤더 높이 축소 (본문 py-0.5 정합)
- 질문: 본문 py-0.5 만족스럽다. 이 사이즈에 맞게 헤더 높이도 조절하고 싶다.
- 답 요약: 비정렬 `th` `py-1.5`→`py-1`, 정렬 버튼 `min-h-[2rem]`→`min-h-[1.75rem]`·`py-1.5`→`py-1`. LAYOUT_RULES.md에 세로 패딩 기준 추가.

### SimpleGridTable — 본문 행 패딩
- 질문: 먼저 본문 py-1 → py-0.5 만 적용
- 답 요약: `BaseFeatureScreen.tsx`의 `SimpleGridTable` 본문 `td`만 `py-1`→`py-0.5`로 변경. 헤더(`th`) `py-1.5`·`GRID_VIRTUAL_ROW_HEIGHT_PX`는 그대로.

### std_base_user_permission_mgmt — 구역 구분선 정합
- 질문: 수정해줘 (`LAYOUT_RULES`에 맞게 `std_base_user_permission_mgmt` 구분선).
- 답 요약: 콤보·상세 헤더 `border-slate-300` 통일, 목록 행 `border-slate-200`, 우패널 `border-l border-slate-300`, 권한복제 선택 그리드 `border-t border-slate-300`.

### std_base_user_permission_mgmt — 권한복제 탭 그리드 높이
- 질문: 선택 그리드의 높이를 1/2로 줄여 대상 그리드에 표시되는 행을 늘리자.
- 답 요약: 권한복제 탭에서 대상·선택 그리드 `flex` 비율을 **3:1**로 조정(기존 동일 `flex-1` 대비 선택 영역 축소).

### std_base_user_permission_mgmt — 툴바 신규·조회·삭제 비활성
- 질문: 이 페이지에서는 조회와 삭제 버튼은 비활성화한다. (추가: 신규도 비활성)
- 답 요약: `Toolbar`에 `disabledActions` 추가, MDI는 `registerToolbarDisabled`·`activeToolbarDisabled`로 활성 화면별 비활성 반영. `std_base_user_permission_mgmt`에 `toolbarDisabledActions={['new','search','delete']}`.

### std_base_user_permission_mgmt — 권한복사→권한복제 변경
- 질문: 권한복사는 추가가 아니라 동일하게 복제하는 것이다. 탭 이름도 "권한복제"로 변경하고 기능도 변경.
- 답 요약: 탭 라벨 "권한복사"→"권한복제", `runSave`를 대상 사용자 기존 권한 전부 DELETE → 좌측 사용자 권한 동일 POST로 재작성. `deleteUserAuthority` import 추가. DB 문서 §9 갱신.

### std_base_user_permission_mgmt — 정렬 시 선택 사용자 불일치
- 질문: 그리드 정렬 후 행 선택 시 하단 사용자 이름이 다른 사람으로 표시된다. 권한복사 후에도 동일.
- 답 요약: `selectedUserIdx`(화면 인덱스)로 원본 배열을 조회하던 로직 → `selectedUserId`(`user_id` 문자열)로 `deptUsers.find()` 조회로 변경. 정렬·비정렬 무관하게 정확한 사용자 매칭.

### std_base_user_permission_mgmt — 오른쪽 탭 분리 + 권한복사
- 질문: 우측 영역을 탭 2개(권한그룹/권한복사)로 분리. 권한그룹 탭은 기존 유지, 권한복사 탭은 부서 콤보+대상 그리드+선택 그리드 구성. 저장 시 좌측 사용자 권한그룹을 선택 그리드 사용자 전원에게 일괄 복사.
- 답 요약: 탭 UI(`rightTab` state) 추가, 탭1에 기존 권한그룹 콤보+그리드 감쌈, 탭2에 `filterCopyDept`·대상 그리드(`onClickCandidate`)·선택 그리드(`onClickSelected`)·`selectedCopyUsers` 구현. Toolbar save에 이중 루프 POST 로직 추가. DB 문서 §9 권한복사 흐름 반영. `npx tsc --noEmit` 통과.

### 규칙 —「페이지에 대한 DB분석」트리거 워크플로
- 질문: "페이지에 대한 DB분석"이라고 하면 DB분석→html→git push까지 수행하는 규칙 생성.
- 답 요약: `.cursor/rules/page-db-analysis-workflow.mdc`(alwaysApply)에 3단계 절차 명시. `.cursorrules`·`project-rules.md` §3·`ai-rules.md` 위임 표 보강. CHANGELOG 기록.

### smkang_doc — mes HTML 커밋·푸시
- 질문: D:\smkang_data\docs 에서 커밋 메시지「만든 파일 업로드」로 git push.
- 답 요약: `mes/std_base_common_code_mgmt_api.html`만 `git add` 후 `git commit -m "만든 파일 업로드"`·`git push origin main` 완료(`BKSoft-Lab/smkang_doc`). `02.WorkList` 수정분은 미포함.

### std_base_common_code_mgmt API md → HTML (smkang_data)
- 질문: D:\smkang_data\docs\mes 에 html로 변환 저장.
- 답 요약: `docs/db-doc/std_base_common_code_mgmt_api.md`를 marked로 HTML 변환해 `D:\smkang_data\docs\mes\std_base_common_code_mgmt_api.html` 생성(인라인 CSS). MES 패키지에 marked 영구 추가 없음.

### std_base_common_code_mgmt — DB 사용 상세 md 저장
- 질문: std_base_common_code_mgmt에 DB 관련 쿼리·GET/POST URL·사용 위치·조건·에러·보완점 등 상세 정리해 md로 저장.
- 답 요약: `docs/db-doc/std_base_common_code_mgmt_api.md` 전면 확장(베이스 URL, fn_cm_code/tb_cm_code, POST body, DELETE, UI 에러, 매핑표, 보완 제안, 관련 파일). CHANGELOG·USER_PROMPTS_LOG 반영.

### MesDataGridPanel — 데이터 행 수만 렌더
- 질문: 데이터가 8개 미만이어도 8행 만드는 것 같다. 데이터 개수만큼만 행을 만들어라.
- 답 요약: `minVisibleRows` 기본값 **0**으로 변경해 `rowCount = max(0, cellValues.length)`. `std_base_common_code_mgmt`의 `minVisibleRows={8}` 제거. `LAYOUT_RULES.md`·CHANGELOG 반영. `npx tsc --noEmit` 통과.

### std_base_common_code_mgmt — DB 문서대로 API 정합(플랜 구현)
- 질문: (플랜) 상단 콤보 `fn_cm_code?p1=GROUPCODE&p2=code_name`, 그리드 `code_group__like`·`_orderBy=disp_seq` 문서에 맞게 구현.
- 답 요약: `fetchFnCmCodeOptions`에 `p2` 추가. `tbCmCodeApi`는 `code_group__like`+`_orderBy=disp_seq` 고정. 화면은 GROUPCODE 콤보+초기/검색 GET 정합, 상세 레거시 그룹 `(현재값)` 병합. `docs/db-doc/std_base_common_code_mgmt_api.md`·CONTEXT·DOCUMENTATION_INDEX·CHANGELOG. `npx tsc --noEmit` 통과.

### GitHub BK_MES — 첫 푸시·README 병합
- 질문: 사용자 정보 등록 후 계속하려면?
- 답 요약: 로컬에 커밋 없어 `src refspec main`이었음 → `git commit`으로 Initial commit. 원격에 README만 있어 푸시 거절 → `git pull origin main --allow-unrelated-histories` 후 `README.md` add/add 충돌을 로컬 설명+제목 `BK_MES`로 정리·merge 커밋·`git push -u origin main` 완료.

### 개발 환경 — Git 미인식(winget 설치)
- 질문: PowerShell에서 `git`이 cmdlet으로 인식되지 않음.
- 답 요약: PC에 Git 미설치로 확인 후 `winget install --id Git.Git -e`로 Git for Windows 2.53.0 설치. 새 세션에서는 Machine+User `Path` 갱신 후 `git --version` 정상. **Cursor·PowerShell 터미널은 한 번 닫았다가 다시 열면** `git`이 PATH에서 잡힌다.

### 개발 환경 — Git 설치 후에도 `git` 미인식
- 질문: 설치 후에도 `git --version`이 cmdlet으로 인식되지 않음.
- 답 요약: `C:\Program Files\Git\cmd\git.exe`는 존재·동작. 시스템 `Path`에만 있고 Cursor가 예전 환경을 쓰는 경우가 있어 **사용자 `Path`에 `C:\Program Files\Git\cmd` 추가**함. **Cursor 완전 종료 후 재실행** 또는 **터미널 탭 새로 열기** 후 `git --version` 재시도. 당장 한 세션만 쓰려면 `& 'C:\Program Files\Git\cmd\git.exe' --version`.

### std_base_user_mgmt — 그리드 부서·직급 명칭(비콤보)
- 질문: 그리드의 부서, 직급도 사용자 정보와 동일하게 DB에서 읽어 코드번호가 아닌 문자열로 표시해줘 콤보박스는 아니다.
- 답 요약: `resolveFnCmCodeLabel`로 `cellValues` 2·3열을 DEPT/DUTY 옵션의 `label`로 표시. `onSelectRow`는 `row[0]` `user_id`로 `users`에서 원본을 찾아 `tbCmUserToGridRow`로 상세(코드) 유지. `npx tsc --noEmit` 통과.

### std_base_user_mgmt — API 정합 및 부서·직급 콤보박스
- 질문: (플랜 실행) std_base_user_mgmt — API 정합 및 부서·직급 콤보박스. 플랜 파일은 수정하지 말 것.
- 답 요약: `tbCmUserApi` `user_id__like`·`_orderBy=user_id`. `fnCmCodeApi` 신설·`PlainSelect`+레거시 `(현재값)` 옵션. Vite `/func` proxy. CHANGELOG·CONTEXT 갱신. `npx tsc --noEmit` 통과.

### MES 구역 구분 라인 강화
- 질문: (플랜 실행) MesSearchSaveBar·MesDataGridPanel·MesDetailForm·본문 카드 구역 구분 라인 강화. 플랜 파일은 수정하지 말 것.
- 답 요약: `MesSearchSaveBar`에 `shadow-sm`, `BaseFeatureScreen` 본문 카드에 `shadow-sm`, `MesDetailForm` 상단 `border-slate-300`, `MesDataGridPanel` 루트 `ring-1 ring-slate-300 ring-inset`. `LAYOUT_RULES.md`에 「기능 화면 구역 시각적 구분」절·관련 표/절 보강. `npx tsc --noEmit` 통과.

### 열 더블클릭 자동 맞춤 후 말줄임 수정
- 질문: (플랜 실행) 열 더블클릭 자동 맞춤 후에도 말줄임이 남는 문제 수정. 플랜 파일은 수정하지 말 것.
- 답 요약: (응답 후) `measureColumnFitWidth`에서 측정 시 `applyMeasureUnclipStyles`(overflow visible, text-overflow clip) 및 `tbody td` 직접 자식 `span`에 `inline-block`/`max-content` 임시 적용. `applyNoWrapForMeasure`에 overflow·textOverflow·display·width 백업·복원 추가. `LAYOUT_RULES.md` 더블클릭 절 보강. `npx tsc --noEmit` 통과.

### MesDataGridPanel 그리드 셀 한 줄 말줄임 구현
- 질문: (플랜 실행) MesDataGridPanel 그리드 셀 한 줄 말줄임 — 계획대로 구현하라. 플랜 파일은 수정하지 말 것.
- 답 요약: (응답 후) `SimpleGridTable` 본문 `td`에 `max-w-0 overflow-hidden`, 내부 `span`에 `block min-w-0 truncate` 및 비어 있지 않을 때 `title` 추가. `docs/LAYOUT_RULES.md` 그리드·공통 원칙 문구 동기화. `renderer`에서 `npx tsc --noEmit` 통과.

## 2026-04-02
### 날짜 범위 ~ 패턴 일괄 수정
- 질문: 날짜 ~ 날짜를 한줄에 표시하는 규칙도 있을텐데?
- 답 요약: LAYOUT_RULES.md 기간·일시 범위 규칙 확인. mfg 40개 + mat 69개 파일에서 날짜 범위 패턴을 수정 — `FormLabelInput` 하나 안에 두 날짜를 `flex min-w-0 items-center gap-1.5`로 감싸고, `<span className="shrink-0 text-slate-500" aria-hidden>~</span>` 구분자 추가. `label="~"` 분리 패턴·`aria-hidden` 누락·외부 배치 등 3가지 잘못된 패턴 모두 수정 완료. TypeScript 빌드 통과.

### PNG 미존재 화면 파일 삭제 — §6.0 규칙 준수
- 질문: 화면id.png 파일이 없으면 페이지를 생성하지 말고 정의된 에러 팝업을 띄우도록 규칙에 넣었던거 같은데 지켜지지 않은것 같다.
- 답 요약: §6.0 규칙 확인 후 PNG 미존재 화면 8개(mfg 2개 + mat 6개)의 .tsx 파일 삭제 및 레지스트리 제거 완료. 레지스트리에 미등록된 화면은 `MesScreenAccessDeniedModal` 에러 팝업이 자동으로 표시됨. mfg 84개, mat 134개로 최종 정리.

### 생산관리 모듈 전체 84개 화면 생성 + CSV 동기화
- 질문: 모든 규칙과 기준정보 모듈의 구현을 참고하여 생산관리 모듈의 모든 페이지를 생성하라. 화면id.png 파일을 분석하여 최대한 같은 배치, 크기, 데이터를 구현하라. 매뉴얼.csv 파일이 수정되었으니 수정된 내용에 따라 메뉴바도 수정되어야 한다.
- 답 요약: `renderer/src/screens/mfg/` 폴더에 생산관리 모듈 전체 86개 화면 신규 생성 완료. 9개 서브메뉴(생산정보 12, 공정관리 18, 이력조회 13, 출하 13, 포장 1, 수리 1, 출하검사설정 12, 출하검사 10, 설정 6). `매뉴얼.csv` 변경사항(품질지수 분리, 기간별 이름변경, 고객사품목별 삭제)을 `manual.csv`에 동기화. `MFG_FEATURE_SCREEN_REGISTRY` 생성·병합, `MfgFeatureScreen.tsx` 삭제. TypeScript 타입 체크 통과.

### 생산관리 모듈 포장·수리·출하검사설정·출하검사·설정 30개 화면 생성
- 질문: 생산관리 모듈의 5개 서브메뉴(포장 1, 수리 1, 출하검사 설정 12, 출하검사 10, 설정 6)에 해당하는 30개 화면 파일을 생성. 각 PNG 분석 후 레이아웃·열·목업 데이터 반영.
- 답 요약: `renderer/src/screens/mfg/` 폴더에 30개 TSX 파일 신규 구현 완료. 좌우 분할(포장이력), 마스터-디테일 3단(검사항목/불량항목 등록), 복합 폼(출하검사 결과 등록), 그리드+차트(일별 품질/유형별 불량) 등 다양한 레이아웃 패턴 적용. lint 에러 없음.

### 자재관리 모듈 전체 140개 화면 생성
- 질문: 모든 규칙과 기준정보 모듈의 구현을 참고하여 자재관리 모듈의 모든 페이지(140개)를 생성하라. 화면id.png 파일을 분석하여 최대한 같은 배치, 크기, 데이터를 구현하라.
- 답 요약: `renderer/src/screens/mat/` 폴더에 자재관리 모듈 전체 140개 화면을 신규 생성 완료. 10개 서브메뉴(기초정보 13, 자재정보 7, 자재단가관리 7, 가입고관리 8, 수입검사 14, 입고관리 22, MSL자재 18, 출고관리 22, 재고실사및조정 10, 재고관리 19)를 병렬 서브에이전트로 처리. `registry.ts`에 React.lazy()로 등록, `Suspense` 경계 추가. TypeScript 타입 체크 통과.

### 자재관리 재고실사 및 조정 mat_cyclecnt 10화면 생성
- 질문: 자재관리 모듈의 재고실사 및 조정(mat_cyclecnt_*) 화면 10개를 생성. 재고 실사 등록·재고실사 수정/확정·재고실사 이력 조회·창고 재고 수량 조정·창고 재고 수량 조정 이력·현장 재고 수량 조정·현장 재고 수량 조정 이력·(LOT No)별 자재 수량 조정·(LOT No)별 자재 수량 조정(생산현장용)·TID별 자재 수량 조정 이력. 각 PNG 분석 후 레이아웃·열·목업 데이터 반영.
- 답 요약: `renderer/src/screens/mat/` 폴더에 10개 TSX 파일 신규 구현. 실사 등록(폼+Ready 이미지+그리드), 수정/확정(모드 토글+그리드), 이력 조회(조회 전용), 수량 조정(선택/편집모드+그리드), 조정 이력(마스터-디테일 2단 그리드 또는 단일 그리드), TID 기반 조정(스캔 안내+체크박스+엑셀 업로드 버튼) 등 다양한 레이아웃 패턴 적용. CHANGELOG·TODO 갱신.

### 자재관리 수입검사 mat_iqc 14화면 생성
- 질문: 자재관리 모듈의 수입검사(mat_iqc_*) 화면 14개를 생성. Item별 검사 의뢰항목 조회·Item별 검사항목 조회·Item별 불량항목 조회·수입검사 결과 일괄 처리·수입검사 결과 등록·수입검사 결과 표시·일자별 수입검사내역 조회·기간별 수입검사 현황·기간별 수입검사 현황 집계·일별 수입검사 통계현황·유형별 불량내역 조회·수입검사 기준서 등록·수입검사 기준서 조회·품질판정 설정. 각 PNG를 읽어서 분석.
- 답 요약: `renderer/src/screens/mat/` 하위에 14개 TSX 신규 생성. 14개 PNG 분석 반영, 다양한 레이아웃(단일 그리드·마스터-디테일·피벗 그리드+차트·팝업) 적용, lint 오류 없음.

### 자재관리 입고관리 mat_gr 22화면 생성
- 질문: 자재관리 모듈의 입고관리(mat_gr_*) 화면 22개를 생성. 자재입고확정취소·입고내역수정·입고내역조회·TID별입고내역·일자별입고내역집계·기간내입고수량집계·입고별TID위치조회·자재라벨발행·재발행·분할자재라벨발행·라벨발행이력·재발행이력·분할자재라벨이력·자재입고취소(자재라벨)·자재라벨폐기·월별입고내역집계(부품분류별·공급업체별·Item별)·일별입고내역집계·입고관련설정·SIMS미확인자재찾기·수입신고총액관리. 각 PNG를 읽어서 분석.
- 답 요약: `renderer/src/screens/mat/` 하위에 22개 TSX 신규 생성. 21개 PNG 분석 반영(1개는 PNG 없어 기본 패턴), lint 오류 없음.

### 자재관리 MSL자재 mat_msl 18화면 생성
- 질문: 자재관리 모듈의 MSL자재(mat_msl_*) 화면 18개를 생성. MSL자재목록·개봉관리·개봉내역·자재관리통합·재고소진이력·통합이력·제습함관리·제습함자재내역·제습함자재현황·제습함입출고·베이킹프로파일·베이킹변경이력·베이킹관리·베이킹입출고·베이킹오류·베이킹설정·진공포장관리·진공포장이력. 각 PNG를 읽어서 분석.
- 답 요약: `renderer/src/screens/mat/` 하위에 18개 TSX 신규 생성. 모든 PNG(18개) 분석 반영, 다양한 레이아웃(단일 그리드·3단 그리드·탭·팝업·스캔 영역 등) 적용, registry.ts에 lazy 등록, lint 오류 없음.

### 자재관리 수입검사 mat_iqc 14화면 생성
- 질문: 자재관리 모듈의 수입검사(mat_iqc_*) 화면 14개를 생성. 각 PNG를 읽어서 분석하여 필터·그리드·상세폼·차트·팝업 구성.
- 답 요약: `renderer/src/screens/mat/` 하위에 14개 TSX 신규 생성. 모든 PNG 분석 반영, registry.ts에 lazy 등록, lint 오류 없음.

### 자재관리 기초정보 mat_base 13화면 생성
- 질문: 자재관리 모듈의 기초정보(mat_base_*) 화면 13개를 생성. 부품분류코드 관리 1개 + 검사항목 5개 + 불량항목 4개 + 샘플링 기준 4개. 각 PNG를 읽어서 분석하여 필터·그리드·목업 데이터 구성.
- 답 요약: `renderer/src/screens/mat/` 하위에 13개 TSX 신규 생성. 모든 PNG(10개) 분석 반영, 사이드 바이 사이드·3영역 레이아웃·단일 그리드 등 다양한 레이아웃 적용, lint 오류 없음.

### 자재관리 가입고관리 mat_prein 8화면 생성
- 질문: 자재관리 모듈의 가입고관리(mat_prein_*) 화면 8개를 생성. 각 PNG를 읽어서 분석하여 필터·그리드·상세폼·바코드 패널 구성.
- 답 요약: `renderer/src/screens/mat/` 하위에 8개 TSX 신규 생성. mat_prein 8개(pre_grn_reg_cancel_manual·pre_grn_lot_label_issue·pre_grn_hist_inq·pre_grn_hist_inq_by_tid·pre_grn_daily_sum·pre_grn_cancel_hist_inq·insp_wait_sample_qty_inq·manual_barcode_issue). 모든 PNG 분석 반영, registry.ts에 lazy 등록, lint 오류 없음.

### 자재관리 자재정보·자재단가관리 14화면 생성
- 질문: 자재관리 모듈의 자재정보(mat_item_*) 7개와 자재단가관리(mat_price_*) 7개, 총 14개 화면을 생성. 각 PNG를 읽어서 분석하여 필터·그리드·상세폼 구성.
- 답 요약: `renderer/src/screens/mat/` 하위에 14개 TSX 신규 생성. mat_item 7개(material_master_reg·item_attr_bulk_edit·maker_part_no_reg·maker_part_no_bulk_reg·material_inq_by_vendor·maker_barcode_use_setup·material_label_issue_qty_setup) + mat_price 7개(exchange_rate_hist_inq·material_price_mgmt·material_price_excel_upload·material_price_confirm·material_price_inq·material_price_change_hist_inq·material_price_job_hist_inq). 모든 PNG 분석 반영, lint 오류 없음.

## 2026-04-01
### 제품관리 모듈 전체 삭제 후 PNG 기반 재작성
- 질문: 제품관리 모듈 내 모든 페이지를 삭제하고 png 파일을 읽어 다시 분석하고 모든 규칙을 참고하여 다시 만들어라
- 답 요약: 기존 prd/ 하위 12개 파일 전부 삭제. `docs/image/prd_*.png` 17개 파일 전부 읽어 분석 후, 화면별 개별 TSX 17개(`prd_inv_*` 4개, `prd_itemno_*` 4개, `prd_bom_*` 9개) + `registry.tsx` 재작성. 날짜 범위는 모두 `inline-flex shrink-0 whitespace-nowrap` 패턴으로 통일. TypeScript 오류·lint 오류 없음.

### 제품관리 날짜 범위 한 줄 표시 전체 수정
- 질문: 제품관리 모듈 내 페이지에서 날짜입력 ~ 날짜입력 이 두 줄로 표시되지 않고 한 줄로 표시되도록 수정
- 답 요약: `PrdInventoryMappedScreen`(조정일)·`prd_bom_ebom_reg_edit`(신청일자) 의 `FormLabelInput + ~ + PlainInput` 분리 구조를 `div.inline-flex.shrink-0.whitespace-nowrap` 안에 `span + PlainInput + ~ + PlainInput` 로 통일. `PrdBomMappedScreen`(적용일)은 이미 동일 패턴으로 변경 불필요.

### 조정일 한 줄 고정 원복 요청
- 질문: 에라이 더 이상해졌다. 되돌려라.
- 답 요약: 직전 변경만 원복 완료. `PrdInventoryMappedScreen`의 조정일 기간 입력을 `inline-flex` 묶음 이전 구조(`FormLabelInput + ~ + date`)로 되돌렸고 빌드도 정상 확인.

### MesSearchSaveBar 적용 여부 확인
- 질문: MesSearchSaveBar 를 적용한 것 맞나?
- 답 요약: 맞음. 제품관리 화면은 `MesScreenShell -> BaseFeatureScreen` 경유로 `filterArea`를 전달하며, `BaseFeatureScreen`이 이를 `MesSearchSaveBar`로 렌더링한다. `showFilterSave`/`showFilterSearch`도 동일 경로로 동작.

### 조정일 기간 줄바꿈 문제
- 질문: 이렇게 조정일 날짜 ~ 날짜 가 한줄에 있지 않다.
- 답 요약: `PrdInventoryMappedScreen`의 조정일 범위를 `inline-flex + whitespace-nowrap`로 묶어 `날짜 ~ 날짜`가 한 줄에 고정되도록 수정했다.

### 적용일 기간 한 줄 표시 요청
- 질문: 적용일 연도 ~ 연도 가 한줄에 표시되록 수정
- 답 요약: `PrdBomMappedScreen`의 적용일 범위를 `inline-flex + whitespace-nowrap`로 묶어 `연도 ~ 연도`가 줄바꿈 없이 한 줄에 표시되도록 수정했다.

### 제품관리 텍스트 정합 단계 진행
- 질문: 진행
- 답 요약: 제품관리 매핑 화면 3종(`PrdBomMappedScreen`, `PrdInventoryMappedScreen`, `PrdItemNoMappedScreen`)에 화면 ID별 필터 라벨과 `tableTitle`을 분리해 텍스트 정합을 진행했다. 빌드까지 정상 완료.

### 제품관리 미세 정합 추가 진행
- 질문: 진행
- 답 요약: 상세 구현 3개 화면(`prd_itemno_item_attr_bulk_edit`, `prd_inv_qty_adj_by_item`, `prd_bom_ebom_reg_edit`)에 `colWidths`/`tableTitle`/필터 저장버튼 정합을 추가 적용했다. 빌드 확인까지 완료.

### 제품관리 정합 작업 계속 진행(재고/품번군)
- 질문: 진행
- 답 요약: 재고/품번 화면군도 화면 ID별로 필터/열폭/라벨을 분리 적용했다(`PrdInventoryMappedScreen`, `PrdItemNoMappedScreen`). 재고조정이력 기간 필터, BOM생성현황 상태 필터 등을 추가해 정합도를 한 단계 더 올렸다.

### 제품관리 PNG 정합 다음 단계 진행
- 질문: 진행
- 답 요약: BOM 화면군을 중심으로 화면 ID별 컬럼 폭·필터 라벨·기간 필터를 분리해 `PrdBomMappedScreen` 정합도를 추가 개선했다. 빌드 오류(`colWidths` 타입)까지 수정 후 정상 빌드 완료.

### 제품관리 상세 구현 다음 단계 지시
- 질문: 계속 다음단계를 진행하라
- 답 요약: 남은 제품관리 화면들도 화면군별 매핑 컴포넌트(`PrdBomMappedScreen`, `PrdInventoryMappedScreen`, `PrdItemNoMappedScreen`)로 세분화해 17개 전체를 개별 성격에 맞게 확장했다. 빌드 오류 타입 이슈도 레지스트리 래퍼 방식으로 함께 해결.

### 제품관리 상세 구현 계속 진행
- 질문: 계속 진행해줘
- 답 요약: 추가로 3개 화면(`prd_itemno_item_attr_bulk_edit`, `prd_inv_qty_adj_by_item`, `prd_bom_ebom_reg_edit`)을 PNG 구조 기반 상세 구현으로 반영하고 제품관리 레지스트리에 특화 매핑했다. 나머지 `prd_*`는 그룹 전용 화면을 유지한다.

### 제품관리 하위메뉴 전체 화면 생성 요청
- 질문: 제품관리 모듈의 모든 하위메뉴에 해당하는 페이지를 png파일을 읽어 레이아웃 규칙과 다른 규칙들에 맞게 생성해줘
- 답 요약: 제품관리 17개 `prd_*` 화면 ID를 레지스트리에 일괄 연결해 전 하위메뉴 페이지를 생성. `prd_itemno_item_no_mgmt_fg_semi`는 상세 구현 유지, 나머지는 레이아웃 규칙 기반 공통 화면으로 생성.

### 화면 ID PNG 배포 제외 적용 요청
- 질문: 그럼 제외하고 배포되도록 적용해줘
- 답 요약: 적용 완료. 화면 PNG 판정/목록 유틸(`screenPngPresence`, `mdiScreenIds`)을 제거해 `screenId.png`가 번들에 포함되지 않게 했고, 빌드 결과 `renderer/dist/assets`에 스플래시 필수 PNG만 남음을 확인.

### 화면 ID PNG 배포 제외 가능 여부
- 질문: 그럼이제 화면id.png 파일들을 배포에서 뺄 수 있나?
- 답 요약: 가능함. 현재 정책 변경 후 `화면ID.png`는 번들 참조가 없어 배포 산출물에서 제외되며, 런타임 필수인 스플래시 이미지(`bksoft`, `모듈_off`, `모듈_on`)만 포함 유지하면 됨.

### 기존 생성 페이지 비활성화 요청
- 질문: 그럼 지금 만들어진 페이지도 적용하여 페이지 삭제, 메뉴클릭시 팝업 표시로 수정할 수있나?
- 답 요약: 소급 적용 완료. 기준정보 외 레지스트리 매핑을 비활성화하고, 레지스트리 미구현 화면은 PNG 유무와 무관하게 메뉴 클릭 시 경고 팝업만 표시되도록 수정.

### PNG 기반 화면 생성 정책 의도 확인
- 질문: 나의 의도는 런타임이 아니라 니가 화면id.png 파일을 참고해서 해당 페이지를 만들려고 할때 참조할 png 파일이 없으면 페이지를 만들지 말고 메뉴바 > 메뉴 > 하위메뉴 클릭시 경고팝업 띄우는게 목적이었다. 차후 화면id.png가 확보하고 다시 너에게 해당 페이지 생성을 요청하면 정상적인 페이지가 생성되고
- 답 요약: 의도 확인 완료. PNG가 없는 화면은 생성하지 않고 메뉴 클릭 시 경고 팝업을 유지하며, 추후 PNG 확보 후 생성 요청 시 해당 화면을 정상 구현하는 정책으로 진행.

### 화면 ID PNG 배포 제외 시 영향
- 질문: 배포시 포함하지 않도록 하면 문제가 생기나?
- 답 요약: 화면 PNG는 런타임 UI 렌더 자산이 아니라 “존재 판정/목록 생성” 용도로도 사용되므로, 전부 제외하면 다수 화면이 접근 제한 모달로 바뀔 수 있음. 최소한 `screenPngPresence`/`mdiScreenIds`가 참조하는 PNG 집합은 포함 유지 권장.

### 화면 ID PNG 배포 포함 여부
- 질문: 페이지생성을 위해 참고한 화면id.png 파일은 배포시 제외되고 있나?
- 답 요약: 제외되지 않음. `import.meta.glob('../../../docs/image/*.png', { eager: true })`로 참조된 PNG는 `renderer/dist/assets`로 번들되어 배포에 포함된다. 단, 코드에서 전혀 참조하지 않은 파일은 포함되지 않을 수 있다.

### 배포본 DB 조회 실패
- 질문: 배포버전에서는 DB 조회 실패가 뜬다.
- 답 요약: 배포본은 dev proxy 없이 DB HTTPS를 직접 호출해 인증서 검증에서 `Failed to fetch`가 발생. Electron 메인에 `certificate-error` 예외를 추가해 `100.71.84.10` 호스트만 허용하도록 수정.

### 패키징 실행 시 빈 창 원인/수정
- 질문: 실행하면 빈 창이 뜬다.
- 답 요약: Vite 산출물 `index.html`이 `/assets/...` 절대경로라 `file://` 실행에서 리소스 로드 실패. `vite.config.ts`에 `base: './'`를 추가해 상대경로로 수정.

### Portable 산출물 파일명 확인
- 질문: MES Portable 0.1.0.exe 가 없다
- 답 요약: (과거) `MES 0.1.0.exe` Portable / `MES Setup 0.1.0.exe` 설치형. 현재는 `BK-MES_Portable …`·`BK_MES Setup …` 등 `productName`·`artifactName`에 따름.

### electron-builder JSON 파싱 오류 재발 우회
- 질문: (재시도 로그 공유) 동일 `No JSON content found in output` 오류
- 답 요약: `electron-builder` 의 npm 트리 수집 단계(workspace 출력 오염)를 우회하기 위해 build 설정에 `npmRebuild: false`를 추가해 패키징 안정화.

### electron-builder `No JSON content found in output` 오류
- 질문: (빌드 로그 공유) `electron-builder` 단계에서 `No JSON content found in output` 발생
- 답 요약: 빌드 스크립트에서 `NODE_NO_WARNINGS=1`로 Node 경고 출력이 JSON 파싱을 오염시키지 않도록 조정해 패키징 오류 회피.

### 배포용 Portable 타깃 추가
- 질문: 네
- 답 요약: `electron-builder`의 `win.target`에 `portable`을 추가해 NSIS 설치형 + 무설치 Portable EXE를 함께 생성하도록 설정.

### 현 구조에서 가능한 최대 행수
- 질문: 몇 행까지는 이구조로 가능할까?
- 답 요약: 현재는 전체조회+클라보관 구조라 렌더는 가상화로 버티지만 네트워크/파싱/메모리가 한계. 실무 권장 5천 내외, 1만은 조건부, 그 이상은 서버 페이지네이션 전환 권장.

### 대량 데이터(수만행) 시 문제와 대응
- 질문: 만약에 DB에서 가져온값이 엄청 커서 몇만행이 된다면 어떤 문제가 발생하고 어떻게 해결해야 할까?
- 답 요약: 수만 행은 네트워크/파싱/메모리/정렬·필터 CPU 병목이 동시 발생. 핵심 해법은 서버 사이드 페이지네이션(또는 cursor) + 필터 강제 + 필요한 컬럼만 조회 + 인덱스 최적화 + 클라이언트 가상스크롤 병행.

### 행번호 열 더블클릭 자동맞춤 과대 확장
- 질문: 행번호의 해더의 사이즈변경 구간을 더블클릭했는데 텍스트길이보다 말도안되게 크게 사이즈변경된다. 행번호만 그런다.
- 답 요약: 가상 스크롤 패딩행(`td[colspan]`)이 열 너비 측정에 섞인 버그 수정. 자동맞춤은 실제 헤더/데이터 셀만 측정하도록 필터링.

### GRID_ZOOM_MIN 70·가상화 임계값 150 적용
- 질문: 상수(GRID_ZOOM_MIN)를 40 → 70으로 바꾸고 임계값은 150으로 해줘
- 답 요약: `MesDataGridPanel` 최소 줌을 70%로 조정하고, `SimpleGridTable` 가상 스크롤 발동 임계값을 150행으로 하향.

### 그리드 축소 하한 40%→70% 의견
- 질문: Ctrl+휠로 최대축소 40%를 70% 정도로 줄이는건 어떻게 생각해?
- 답 요약: 70% 하한은 가독성·성능·조작 안정성 측면에서 권장. 다만 한 화면 밀도는 줄어들어 스크롤이 늘 수 있으므로, 70% + 가상 스크롤 조합이 균형적.

### 가상 스크롤 임계값 추천(고해상도·40% 축소)
- 질문: 고해상도의 모니터에서 최대화 시키고 Ctrl+휠로 최대축소하면 40%인데 그럼 한화면에 최대 몇행까지 그려질까? 거기에 맞춰 임계값을 추천해줘
- 답 요약: 현재 행높이 근사(24px) 기준 4K 최대화·40% 축소 시 대략 100~140행(보수적으로 150행 내외) 가시. 임계값은 최대 가시행의 1.3~1.7배인 200 전후(권장 220)로 제안.

### std_base_common_code_mgmt — 가상 스크롤 + 연속 행번호
- 질문: 그렇게 해주고 행번호는 1~1828까지 연결되어 표시되도록
- 답 요약: 페이지네이션을 제거하고 `MesDataGridPanel`에 가상 스크롤을 적용. `std_base_common_code_mgmt`는 전체 행을 유지한 채 보이는 구간만 렌더하며 행번호는 `1..N`(예: `1..1828`) 연속 표시.

### std_base_common_code_mgmt — 1823행 성능 즉시 개선
- 질문: 바로 적용해
- 답 요약: `std_base_common_code_mgmt`에 페이지당 200행 클라이언트 페이지네이션(이전/다음, rows/page 표시) 적용해 대량 DOM 렌더를 줄이고 입력/창 이동 지연을 완화.

### std_base_common_code_mgmt — 1823행 성능 저하 원인
- 질문: std_base_common_code_mgmt  :  DB에서 데이터를 가져와 그리드를 채우니 1823행이 되었다. 그러지 이창을 드래그해서 이동할때나 텍스트입력창에 텍스트를 입력시 반응이 느리다. 왜그런가?
- 답 요약: 가상 스크롤 없이 1823행 전체 DOM을 매 렌더에 그려서(약 2만 셀+) 입력/드래그 시 리렌더 비용이 커짐. `MesDataGridPanel` 비메모화 + `zoom` 스타일/정렬·리사이즈 기능도 비용 증가 요인.

### std_base_common_code_mgmt — `tb_cm_code` DB 연동
- 질문: std_base_user_mgmt에서 DB연동을 한것과 동일하게 std_base_common_code_mgmt 페이지에  https://100.71.84.10:7443/db/tb_cm_code 를 이용하도록 수정
- 답 요약: `std_base_common_code_mgmt`를 `tb_cm_code` API 기반으로 전환(GET/POST/DELETE), 사용자관리와 동일한 Search/Save/Delete/신규 + 인라인 배너 흐름 적용. `tbCmCodeApi`/`tbCmCodeMapper` 신규 추가.

### MesDataGridPanel — std_base_common_code_mgmt `#` 헤더 잔존
- 질문: std_base_common_code_mgmt 그리드의 행번호 해더는 #가 남아있다.
- 답 요약: 부모가 첫 열 `#`를 직접 넘기는 경우도 렌더링 시 첫 헤더를 빈 문자열로 치환하도록 수정해 `#` 잔존 제거.

### Cursor Auto·고정 모델 운영 룰
- 질문: 알려줘
- 답 요약: Auto는 탐색·초안·반복 편집, 고정 모델은 리뷰·리팩터·규칙 문서화 등. 비용 민감하면 Auto 비중 낮추고 Usage 모니터링.

### Cursor Auto 모드 장단점
- 질문: Auto 모드를 사용시 장,단점
- 답 요약: Auto는 모델 선택 부담을 줄이고 작업 흐름이 빠르지만, 비용/품질/지연시간을 세밀하게 통제하기 어렵다. 중요 작업은 고정 모델 병행이 유리.

### MesDataGridPanel — 행번호 열 `#` 제거·정렬 해제
- 질문: MesDataGridPanel 에서 행번호 열의 텍스트 "#" 는 삭제하고 정렬을 빼줘
- 답 요약: 행번호 헤더를 `#`에서 빈 문자열로 바꾸고, 줄번호 열(자동/부모 제공 모두)은 헤더 클릭 정렬에서 제외. 줄번호 열은 별도 정렬 클래스 없이 기본 정렬 사용.

### 스플래시 — 상단 오프셋 50px 위로
- 질문: 50포인트만 위로
- 답 요약: **`SPLASH_CONTENT_TOP_EXTRA_PX` 100 → 50** — `padding-top: calc(1.75rem + 50px)`. `CHANGELOG` 반영.

### 스플래시 — 로고~스프라이트 블록 세로 이동
- 질문: bksoft.png 와 텍스트 영역 부터 스프라이트 영역까지 y좌표를 100정도 내려보자
- 답 요약: **`SplashScreen`** — 메인 컬럼 `padding-top: calc(1.75rem + 100px)` 상수 **`SPLASH_CONTENT_TOP_EXTRA_PX`**, 기존 `pt-7`에 100px 합산. `CHANGELOG` 반영.

### 스플래시 모듈 타일 — 하단 글자 아래 여백
- 질문: 지금도 아래쪽 글자 밑에 공간이 부족해
- 답 요약: **`SplashScreen`** — **`MODULE_TILE_EXTRA_HEIGHT_RATIO` 1.15** 로 `aspect-ratio` 뷰포트 높이를 PNG 한 칸보다 키워 하단 여백 확보, 스프라이트는 상단 정렬. `CHANGELOG` 반영.

### 스플래시 모듈 타일 — 호버 후 하단 텍스트 잘림
- 질문: 뭐야 하단 텍스트가 더 짤린다.
- 답 요약: **`group-hover:scale-110`** 제거 — 확대 시 `on` 이미지가 뷰포트 밖으로 나가 **`overflow-hidden`** 에 하단 글자가 잘림. `on` 은 **`translateX`만** 단일 `img`로 복원. `CHANGELOG` 반영.

### 스플래시 모듈 타일 — on 레이어 하단 여백(확대)
- 질문: 하단도 너무 텍스트에 딱 맞게 on 레이어가 설정되어 있다. 좀 키워줘
- 답 요약: **`SplashScreen`** — `on` 이미지를 **래퍼**로 감싸 **`translateX`와 분리**한 뒤 **`group-hover:scale-110`**(뷰포트 중심)으로 노란 영역이 텍스트에 덜 붙게 확대. 타일 **`p-1`**·**`overflow-visible`**. `CHANGELOG` 반영.

### 스플래시 모듈 타일 — 제품관리 등 중심 불일치(노란 하이라이트)
- 질문: 제품관리 버튼의 중심이 안 맞는다. 다른 버튼도 마찬가지.
- 답 요약: **`SplashScreen`** — 클립 뷰포트를 고정 `calc(509/6)` 대신 **`w-full` + `aspect-ratio`**(한 칸)로 **그리드 셀과 동일 너비**로 맞추고, 스프라이트는 **`width: 600%`**·`translateX` 유지로 off/on·노란 하이라이트 중심 정렬. `CHANGELOG` 반영.

### 스플래시 모듈 타일 — 호버 노란색 치우침
- 질문: 버튼에 마우스를 올렸을 때 노란색으로 그려지는 부분이 너무 왼쪽으로 치우쳐서 하단 글씨가 우측으로 치우쳐 보인다.
- 답 요약: **`SplashScreen`** — 스프라이트 위치를 픽셀 `left` 대신 **`transform: translateX((index/-6)*100%)`** 로 통일해 off/on 겹침 정렬. 미사용 **`moduleSpriteOffsetX`** 제거. `CHANGELOG` 반영.

### 메인창 800×600·모듈 버튼 간격
- 질문: 메인창을 800x600으로 조정하고 각 모듈 버튼을 비율에 맞게 간격을 벌려줘
- 답 요약: **`main.cjs`** **800×600**. **`SplashScreen`** 좌측 **216px**(200×800/740), 타일 **`columnGap` 12px**·합산 `maxWidth`·패딩·`py` 조정. `CONTEXT`·`FEATURES`·`CHANGELOG` 반영.

### 마지막 열 리사이즈 더블클릭 — 전체 열 맞춤
- 질문: MesDataGridPanel에서 마지막 열의 크기조절 부분을 더블클릭하면 모든 열을 하나하나 더블클릭해서 텍스트크기에 맞게 열의 사이즈를 변경할 수 있을까?
- 답 요약: **`SimpleGridTable`** — 마지막 열 핸들 **더블클릭** 시 **`measureColumnFitWidth`** 를 **열 인덱스 전체**에 적용해 **`setPxColWidths`** 한 번에 갱신. 그 외 열은 기존처럼 **해당 열만** 맞춤. `LAYOUT_RULES`·`CHANGELOG` 반영.

### MesDataGridPanel 첫 열 행번호(#) 규칙 미적용
- 질문: MesDataGridPanel 에서 첫열은 행번호를 넣기로 규칙에 적은것 같은데 적용이 안되었네?
- 답 요약: **`showRowNumbers`** 기본 **`true`** — 부모에 **`#`** 없으면 패널이 **`#`+1…n** 자동 부착, **`onSelectRow`** 는 데이터 열만. 이미 **`#`** 를 넘기면(`std_base_common_code_mgmt`) 유지. `LAYOUT_RULES`·`CHANGELOG` 반영.

### 조회줄 배너·신규등록 표시 — 맨 좌측
- 질문: 삭제, 신규등록 인라인 배너의 위치를 검색버튼앞에 두지 말고 맨 좌측으로 이동
- 답 요약: **`MesSearchSaveBar`** 에 **`leading`** · **`BaseFeatureScreen`** 에 **`filterLeading`**. **`std_base_user_mgmt`** 에서 조회 중·신규 등록 배지·삭제 확인·저장/오류 배너는 좌측, 필터 입력만 우측 묶음. 상세 제목의 **신규 등록** 칩은 조회줄로 이동. `LAYOUT_RULES`·`CHANGELOG` 반영.

### std_base_user_mgmt — 삭제 후 입력 먹통(10초 후 복구)
- 질문: 삭제를 한 다음에도 텍스트 입력창이 먹통이다. 그런데 한동안 10초이상?? 후에 동작한다.
- 답 요약: 삭제 확인에 **`window.confirm`** 사용이 **`alert`와 동일하게** Electron 웹뷰 포커스·히트를 오래 깨뜨릴 수 있어 **`confirm` 제거**. 툴바 **삭제** → 조회줄 **인라인 «삭제할까요?» + 취소/삭제**. 초기·수동 조회 실패도 **`window.alert` → 인라인 배너**. `CHANGELOG` 반영.

### std_base_user_mgmt — 행 선택 후 툴바 삭제로 DB 삭제
- 질문: 셀을 선택하고 삭제버튼을 누르면 DB에서 삭제하려면 ?
- 답 요약: **`tbCmUserApi.deleteTbCmUser`** — **`DELETE …/db/tb_cm_user?user_id=`**. **`toolbarHandlers.delete`** → **`runDelete`**: DB에 있는 행(`existingUser`)만, **`confirm`** 후 삭제·**`runSearch()`**·인라인 배너. 서버가 다른 삭제 규약이면 API 함수만 맞춤. `CHANGELOG`·`CONTEXT` 반영.

### std_base_user_mgmt — 저장 후 입력 막힘(신규 아님)
- 질문: 신규시가 아니라 저장시 막힌다.
- 답 요약: 저장 성공 경로에서 **`window.alert('저장되었습니다.')` 제거** — **`await runSearch()` 후** 인라인 배너(약 3.2초)로 안내. 검증·저장 실패도 **`alert` 대신 동일 배너**. Electron에서 동기 `alert` 직후 포커스·히트 이슈 완화. `CHANGELOG` 반영.

### 신규등록 시 사용자 ID·사용자명 입력 클릭 불가
- 질문: 신규등록을 하면 사용자 ID, 사용자명의 텍스트박스가 클릭안됨
- 답 요약: 그리드 **`zoom`** 영역 히트가 레이아웃 밖으로 새는 경우를 줄이기 위해 **`MesDataGridPanel`**에 **`isolate`·`overflow-hidden`·`[contain:paint]`**, **`std_base_user_mgmt`** 상세 **`relative z-20`**, 조회줄 **`z-30`**. `CHANGELOG` 반영.

### 사용자 관리 필터 입력 클릭 불가
- 질문: 사용자 ID, 사용자명 텍스트박스를 클릭할 수 없게되었다.
- 답 요약: **MDI** `MdiResizeHandles`의 **`inset-0` 전면 래퍼**가 본문 위를 덮어 클릭이 막힐 수 있어 **핸들만** 배치. **`MesSearchSaveBar`** 에 **`relative z-10`** 추가. `CHANGELOG` 반영.

### std_base_user_mgmt — 상세 신규 제거·툴바 연동·신규 등록 배지
- 질문: 새롭게 추가한 신규버튼은 삭제하고 툴바에 있는 신규버튼을 이용하라. 신규 등록일땐 신규등록임을 사용자 정보 텍스트 옆에 눈에 띄도록 표시
- 답 요약: **`BaseFeatureScreen`** `toolbarHandlers` + 단독 창 **`Toolbar onAction`**. MDI는 **`registerToolbarHandlers`** 병합. 상세 **신규** 버튼 제거. **`MesDetailForm`** 제목 `ReactNode`·**`신규 등록`** 앰버 배지. `CHANGELOG` 반영.

### std_base_user_mgmt — 신규 사용자 등록 UX
- 질문: 작업 진행해줘 (신규 사용자 등록 흐름 구현)
- 답 요약: 상세 영역 **「신규」** 버튼 — 그리드 선택 해제·상세 초기화·비밀번호 필드 비움. 그리드 행 선택 시만 `****` 마스킹. POST 시 **퇴사/Activated** 빈 값이면 **`N`/`Y`**, **입사일**은 신규 시 오늘(YYYY-MM-DD). `CHANGELOG` 반영.

### std_base_user_mgmt — tb_cm_user DB API 연동
- 질문: std_base_user_mgmt 페이지 수정요청 — 조건조회(GET …/db/tb_cm_user, 쿼리 user_id·user_name·user_name__like), POST로 기록. (엔드포인트·본문 예시 제공)
- 답 요약: **`lib/tbCmUserApi.ts`**·**`mesDbBaseUrl`**(dev는 Vite **`/db` 프록시**, prod 기본 `https://100.71.84.10:7443` 또는 **`VITE_MES_DB_API_BASE`**). **`MesSearchSaveBar`**에 **`onSearch`/`onSave`** 연결. 그리드·상세 폼은 API 매핑·**`js-md5`**로 `user_pwd` 대문자 hex. **`MesDataGridPanel`** 첫 열이 `#`가 아닐 때 빈 행 판정 수정.

### PNG 없음인데 「화면 준비 중」으로 나옴
- 질문: 화면id.png 파일이 없는 페이지는 에러팝업을 띄우도록 규칙에 넣은것 같은데 "화면 준비 중" 페이지를 만들었네.
- 답 요약: **`pngMissing`** 를 **`모든 모듈` + `hasScreenPng` false** 로 통일. **「화면 준비 중」** 은 **PNG가 있을 때만**(레지스트리 미구현). `project-rules.md` §6.0·`FEATURES`·`CONTEXT`·`PROJECT_STRUCTURE`·`CHANGELOG` 문구 정합.

### 타 모듈 페이지 재구성(PNG·규칙)
- 질문: 기준정보 모듈처럼 다른 모듈들도 페이지를 재구성해줘. 화면ID.png 파일을 다시 읽어서 작업해줘 모든규칙에 맞게 작성해야되
- 답 요약: **5개 모듈 MDI**(`mdiModules.ts`)·`ModuleBlankPage`·`MenuOpenScreenBridge`·`ModuleWindowMenuBridge` 통합. **`FEATURE_SCREEN_REGISTRY`**(`screens/registry.tsx`) = std + `docs/image` **glob** 기준 prd/mat/mfg. **제품** `prd_itemno_item_no_mgmt_fg_semi` PNG 정합 상세, 나머지·자재·생산은 `MesScreenShell`+그리드+행상세 목업. **구매** `pur_*` PNG 없음→플레이스홀더. `FEATURES`·`CONTEXT`·`CHANGELOG` 반영.

### 터미널 문제 대응 테스트·검증 코드 잔여 여부
- 질문: 터미널문제 해결을 위해 테스트용, 검증용 코드들이 남아있는지 확인하고 있다면 없애줘
- 답 요약: **`.vscode/settings.json`**(통합 터미널 튜닝) 삭제, Electron 경로에서 PS1 **포트 중복** 제거용 **`-SkipPortKill`**, `execFileSync` **maxBuffer** 과설정 제거. `kill-mes-dev-children.ps1`/`dev.mjs` 본 정리 로직은 유지.

### 나가기 시 “종료 중…” 피드백
- 질문: “종료 중…” 같은 피드백만 넣어줘
- 답 요약: 메인이 `mes:quit-starting` IPC로 스플래시에 알림 → **80ms** 후 `app.quit()`. `preload`에 `onQuitStarting`, `SplashScreen`에 반투명 오버레이+문구. 타이틀 X 닫기도 동일 알림.

### 나가기 ~1초 지연 — 이대로 유지해도 될지
- 질문: 여전히 1초정도 후에 닫힌다. 해결이 힘들다면 이대로 가는건 어떤가?
- 답 요약: **이대로 가도 된다.** 즉시 닫힘과 동기 정리(Vite·npm 잔류 방지)는 상충하고, **dev**에서만 체감되는 비용이다. **패키징된 앱**은 이 경로가 아니므로 동일 지연이 없다. 원하면 나중에 “종료 중…” 정도만 UI로 보완 가능.

### detached PS1 적용 후 다시 느려짐
- 질문: (나가기 빠르게 한 변경) 적용하니 다시 느려졌다.
- 답 요약: detached PS1이 끝나기 전에 Electron이 종료되어 **잔류·터미널 느려짐** 재발 → **`spawnSync`로 PS1 동기 복구**. `Get-CimInstance`는 **전체 프로세스 대신 `Name='node.exe'` 필터**로 경량화.

### 나가기 후 약 1초 뒤에 닫힘 — 최선인지
- 질문: 깨끗이 정리·터미널 빠름은 확인됐는데, 나가기 버튼을 누르면 약 1초 후에 닫힌다. 최선일까?
- 답 요약: 지연은 `before-quit`에서 PS1을 **`spawnSync`**로 돌려 PowerShell+CIM이 블로킹한 탓 → **`netstat`+`taskkill`만 동기**, PS1은 **`spawn` detached**로 창은 즉시 닫히게 조정. `dev.mjs`의 `electron` exit 정리는 유지.

### 나가기 후에도 Vite·npm 잔류(스크린샷 재현)
- 질문: (이미지 — 동일하게 vite 5174·npm-cli)
- 답 요약: PS1만 의존 시 `powershell` PATH·스크립트 미존재 시 무력화 가능 → **`netstat`+`taskkill`을 Node(`execFileSync`)에서 먼저** 실행해 LISTEN PID 제거, 이어서 **`System32\\...\\powershell.exe` 전체 경로**로 PS1.

### 나가기 후에도 Vite·npm node 잔류(스크린샷)
- 질문: (이미지 — `vite.js` 5174, `npm-cli` workspace renderer / `dev:renderer` 등 동일)
- 답 요약: `before-quit`의 **비동기** `spawn`+`unref`는 메인이 먼저 끝나 정리 미완료 가능 → **`spawnSync`(timeout 30s)** 로 `kill-mes-dev-children.ps1` 동기 실행, dev 판별에 `MES_DEV_PORT` 우선.

### 대화 이어서 — Electron `before-quit` + `MES_DEV_PORT`
- 질문: (대화 요약) `dev.mjs`의 `electronProc.on('exit')`만으로는 나가기 시 Vite/npm 고아가 남을 수 있어, main에서 `before-quit`에 `kill-mes-dev-children.ps1` 분리 실행·`MES_DEV_PORT` 전달·PS1에 포트 정리 통합을 반영해 달라.
- 답 요약: `main.cjs`에 `spawnMesDevCleanupOnWindows()` 추가, `dev-electron.mjs`에 `MES_DEV_PORT`, PS1에 포트+netstat+CIM 통합, `dev.mjs`는 중복 포트 kill 제거.

### Vite·npm 잔류 스크린샷(후속)
- 질문: (이미지 — 동일하게 Vite·npm 명령줄)
- 답 요약: dev.mjs를 먼저 taskkill하면 고아 남을 수 있어 **순서**를 포트·CIM 후 트리로 조정. `netstat` 보조, CIM은 `kill-mes-dev-children.ps1`로 분리.

### 명령줄 스크린샷 — Vite·npm 잔류 원인
- 질문: (명령줄 캡처 — vite.js, npm-cli dev:renderer / workspace renderer run dev)
- 답 요약: npm node는 경로에 `D:\MES`가 없어 `-like '*repo*'` 조건에서 빠졌음. CIM 필터를 `MES*renderer*vite`, `npm-cli`+`dev:renderer`+포트 등으로 수정.

### 나가기 후 Node 여러 개 남음(재현 스크린샷)
- 질문: (스크린샷 — Node 6개·메모리 72%)
- 답 요약: 동일 `execSync(taskkill)` 한계로 **분리 프로세스 taskkill**, **5174 모든 TCP OwningProcess**, **CIM으로 repo 경로+vite/dev 스크립트 node** 보조 종료 추가.

### 나가기 후에도 Node 여러 개 남음(작업 관리자)
- 질문: 동일 발생 (+ 스크린샷: Node.js 런타임 여러 개·메모리 70%)
- 답 요약: `rendererProc`만 끊어 부족. Windows에서 Electron 종료 시 `taskkill /PID` `node dev.mjs`의 PID `/T /F`로 **해당 dev 세션 트리 전체** 종료. Vite는 우리가 띄운 경우에만 5174 포트 정리.

### 나가기 후 터미널 느림 — 재시도 후에도 동일
- 질문: npm run dev → 앱만 실행 → 나가기 순서 진행했으나 동일하게 느리다.
- 답 요약: Electron `stdio`를 전부 `ignore`로 터미널과 분리, Windows에서 Vite PID 외 **Listen 포트(5174) 프로세스**까지 `Get-NetTCPConnection`+`Stop-Process`로 정리. 여전하면 Cursor 통합 터미널 한계 가능 → 외부 터미널에서 `npm run dev` 비교.

### 앱 나가기만 느리고 Ctrl+C는 괜찮음
- 질문: 앱만 띄웠다 나갔는데도 느리다. 앱에서 나가기로 나가면 문제 있고 터미널에서 ctrl+c로 종료하면 문제 없다.
- 답 요약: 정상 종료 시 터미널·Electron이 stdin 공유(`stdio: inherit`)하며 Windows 콘솔이 꼬이는 케이스. `dev-electron`에서 Electron stdin 미상속, `dev.mjs`에서 Electron 종료 후 Vite 트리를 Win에서 동기 taskkill.

### 나가기 후 터미널이 항상 느림
- 질문: 한 번 나가면 항상 느리다
- 답 요약: Windows에서 `npm run dev` 자식(Vite 등)이 부모 `kill`만으로 남는 경우 → `scripts/dev.mjs`에 `tree-kill`로 프로세스 트리 전체 종료. 여전히 느리면 작업 관리자에서 `node.exe` 잔류 확인.

### npm run dev 후 나가기 시 터미널만 느려짐
- 질문: npm run dev 실행 후 앱을 나가기로 종료하면 터미널 응답이 느려진다. 터미널을 닫고 다시 열면 빨라진다. 이유는?
- 답 요약: dev 중 Vite/Electron 로그로 스크롤 버퍼·렌더 부담, stdio 연결 종료 후에도 PTY/통합 터미널 상태가 무거워짐, Windows에서 npm/node 자식 프로세스 잔류 가능성. 패널을 닫으면 PTY가 새로 생겨 체감이 정상으로 돌아옴.

### 통합 터미널 반응 지연
- 질문: 터미널 창의 반응이 느리다.
- 답 요약: Cursor 통합 터미널 이슈로 워크스페이스 `.vscode/settings.json`에 GPU 가속·스크롤 관련 권장값. 여전히 느리면 사용자 설정·셸 프로필·GPU 드라이버·백신 예외 점검 안내.

### 메인 창 타이틀 X = 나가기
- 질문: 메인화면 타이틀의 X의 동작을 나가기 버튼과 동일하게 처리
- 답 요약: `electron/main.cjs`에서 메인(스플래시) 창 `close` 시 `app.quit()`으로 통일. `before-quit`에서 `isQuitting` 설정으로 종료 시퀀스와 이중 `preventDefault` 방지.

### MesDetailForm 전 페이지·신규 화면 반영
- 질문: 지금 MesDetailForm 수정을 모든 페이지에 적용하고. 이후 페이지 생성시에도 반영하라
- 답 요약: `useMesGridRowSelection`·`MesGridRowDetailForm`/`MesGridRowDetailFields` 추가. `MesDataGridPanel` 쓰는 모든 `std_*` 화면에 행 선택·하단 상세 연동(다중 그리드는 `lastPanel`). 공통코드는 기존 매핑 유지. `LAYOUT_RULES`·`project-rules` §6.0.1에 신규 화면 절차 명시.

### 그리드 행 선택 → MesDetailForm
- 질문: MesDataGridPanel에서 행을 선택하면 데이터를 MesDetailForm의 해당하는 항목에 데이터를 넣자
- 답 요약: `SimpleGridTable`에 행 클릭·선택 스타일. `MesDataGridPanel`에 `onSelectRow`·`selectedRowIndex`·`onSortChange`. 공통코드 화면에서 열 매핑·controlled 폼. `LAYOUT_RULES`·CHANGELOG·본 로그.

### USER_PROMPTS_LOG 날짜
- 질문: USER_PROMPTS_LOG.md 에 기록할때 날짜가 이상하다.
- 답 요약: 동일 날짜 `##` 중복·03-30을 03-31 사이에 끼운 구조를 정리. `project-rules.md` §2에 날짜 권위(`Today's date:`)·하루 한 제목·최신 날 위 규칙 명시. 본 파일 형식 절 보강.

### USER_PROMPTS_LOG 3/31 프롬프트가 3/30으로 저장된 이유
- 질문: 3월 30일에 사용한 프롬프트가 아니라 3월 31일에 사용한 프롬프트인데 3월 30일로 저장된거다. 왜 그랬을까?
- 답 요약: 당시 `Today's date:` 기준 없이 기록됨. `CHANGELOG`의 **2026-03-30 23:xx KST** 타임스탬프·작업 서술을 보고 **같은 날짜로 로그를 맞춘 추정**(프롬프트 실제 일자와 혼동). 구조상 `## 2026-03-30` 블록이 먼저 생기면 그 아래에 턴이 붙어 3/31 대화도 3/30으로 보임. 이후 §2에 user_info 날짜 권위 반영.

### USER_PROMPTS_LOG 3/30→3/31 이동
- 질문: 3/31로 옮겨
- 답 요약: 그리드·프롬프트 저장·복구·로그 의무화 네 항목을 `## 2026-03-31` 선두(기준정보 MesSearchSaveBar 앞)로 옮기고 `## 2026-03-30` 섹션 제거.

### MesDataGridPanel 하단 상세 영역 이름
- 질문: MesDataGridPanel 아래영역은 선택 행 상세·수정 영역이다. 이 영역에 이름을 추천해줘
- 답 요약: 코드·문서용 후보 `StdRowDetailPanel`(권장)·`MesDetailForm`·`StdSelectedRowPanel`. UI 라벨은 「상세」·「행 상세」 등.

### MesDetailForm 확정
- 질문: MesDetailForm 으로 하자
- 답 요약: `MesDetailForm.tsx` 추가·`std_base_common_code_mgmt` 적용. `LAYOUT_RULES`·`project-rules`·FEATURES·PROJECT_STRUCTURE·CONTEXT·CHANGELOG 반영.

### Std 접두어: 기준정보 vs 전역
- 질문: MesDetailForm, MesDataGridPanel 을 모든 모듈에서 쓸 예정인데 Std 는 기준정보 페이지 접두 아닌가?
- 답 요약: `std_*`·`screens/std` = 기준정보 도메인. `Std*` 컴포넌트 = 전역 표준 UI(기준정보 전용 아님). `project-rules` §6.0·`LAYOUT_RULES` 서두에 용어 구분 명시.

### Std* → Mes* 등 리네이밍 검토
- 질문: 이름을 바꾸은건 어때?
- 답 요약: 의미 분리에는 유리(`Mes*`는 이미 `MesFeatureChrome` 등과 톤 맞음). 다만 `MesDataGridPanel`·`MesDetailForm`·`MesSearchSaveBar`·`MesScreenShell`·MDI 일괄(`MesMdi*`)·모달·문서 전역 치환으로 **범위·리스크 큼** — 필요 시 한 번에 PR·`tsc`로 검증. 규칙 문구만으로 충분하면 리네이밍은 선택.

### 공통 UI Std* → Mes* 리네이밍 실행
- 질문: 변경하자
- 답 요약: 그리드·상세·조회줄·`MesScreenShell`·MDI 컨텍스트/레이어·접근 거부 모달을 `Mes*`로 통일. `MesMdiLayer`는 `components/MesMdiLayer.tsx`. 문서·`project-rules` 용어를 `std_*`/`Mes*`로 갱신. `tsc` 통과.

## 2026-03-31
### 그리드 표준 문서화·전면 적용
- 질문: 공통코드 관리의 그리드에 적용된 내용을 규칙에 기록하고 모든 그리드에 적용하고, 새롭게 페이지를 만들 때 그리드를 추가할 때도 적용하라. 따로 말하지 않아도
- 답 요약: `MesDataGridPanel` 규칙을 `LAYOUT_RULES.md`·`project-rules` §6.0.1 등에 반영하고, 기준정보 그리드는 패널로 통일. 라우터 화면 `min-h` 중복 정리. CHANGELOG·CONTEXT·FEATURES·PROJECT_STRUCTURE 갱신.

### 프롬프트 저장 여부
- 질문: 내가 너에게 질문하거나 내린 프롬프트를 텍스트로 저장하고 있나? 아니면 저장해줘
- 답 요약: 저장소에 자동 저장은 없음. `USER_PROMPTS_LOG.md`를 선택 로그로 추가.

### 이전 기록 복구 가능 여부
- 질문: 이전 기록은 알수 없나?
- 답 요약: AI는 과거 세션을 조회하지 못함. 저장소에 없으면 복구 불가. Cursor 채팅 UI·로컬 데이터는 사용자 PC에서 확인.

### 프롬프트 로그 의무화
- 질문: 이제부터 입력하는 프롬프트와 간단한 답변을 USER_PROMPTS_LOG.md에 기록하라. 룰에 추가
- 답 요약: `project-rules.md` §2·`.cursorrules`·`ai-rules.md`·`DOCUMENTATION_INDEX`에 반영. 이 턴부터 턴마다 본 파일에 기록.

### 기준정보 모듈 전 페이지 MesSearchSaveBar
- 질문: 기준정보 모듈의 다른 모든 페이지들도 MesSearchSaveBar 를 적용
- 답 요약: 모든 `std_*` 화면에 `filterArea`→`MesSearchSaveBar` 주석 통일·`FormLabelInput` 정합. `BaseFeatureScreen` 경로는 동일.

### 사용자 관리에 MesSearchSaveBar 적용
- 질문: 사용자 관리 페이지에 MesSearchSaveBar 적용
- 답 요약: `MesScreenShell`의 `filterArea`는 이미 `BaseFeatureScreen`에서 `MesSearchSaveBar`로 렌더됨 — 주석 명시 및 조회 필터를 `FormLabelInput`으로 정합.

### MesSearchSaveBar 스타일 분석·저장
- 질문: MesSearchSaveBar로 이름붙이고 관리하여 다른 하위메뉴 페이지에서 사용하도록 하자. MesSearchSaveBar의 스타일을 분석하여 저장해줘
- 답 요약: `BaseFeatureScreen`이 `filterArea`를 `MesSearchSaveBar`로 렌더. `LAYOUT_RULES.md`에 「조회 Search/Save 표준 스트립」절 추가(루트·flex·버튼 표). `project-rules`·FEATURES·PROJECT_STRUCTURE·DOCUMENTATION_INDEX·CONTEXT·CHANGELOG 반영.

### PNG 접근 팝업 기능 원복
- 질문: 팝업관련 수정사항을 모두 원복해줘
- 답 요약: `ModuleScreenAccessDeniedModal`·`screenPngPresence`·`hasScreenPng`·`findManualRowByScreenId`·`ScreenPlaceholderPage` 팝업 분기 제거. §6.0·FEATURES·CONTEXT·PROJECT_STRUCTURE·CHANGELOG 반영.

### PNG 팝업 위치: 화면 구성 시(ScreenContentByScreenId)
- 질문: 그렇게 반영해줘 (하위메뉴는 항상 화면 요청 → 페이지에서 PNG 없으면 팝업)
- 답 요약: `App`·`ModuleFeaturesPage`에서 `hasScreenPng` 제거. `ScreenContentByScreenId`에서 `pngMissing` 시 모달; 확인 시 MDI `close` 또는 `navigate(-1)`. 문서·CHANGELOG 반영.

### PNG 없을 때 하위메뉴 접근 안내 팝업
- 질문: 모듈내 페이지 생성작업시 하위메뉴에 해당하는 화면id.png파일이 없으면 하위메뉴 버튼 클릭시 팝업창을 띄운다. (타이틀·2줄 문구·확인)
- 답 요약: `screenPngPresence`(glob)·`hasScreenPng`, `ModuleScreenAccessDeniedModal`, `MenuOpenScreenBridge`·`ModuleFeaturesPage`에서 선검사. `findManualRowByScreenId`로 타이틀. project-rules §6.0·FEATURES·PROJECT_STRUCTURE·CHANGELOG 반영.

### Tile 모듈 클라이언트 꽉 채움
- 질문: Tile 구성시 현재 모듈의 사이즈에 꽉차게 구성하라
- 답 요약: `tileLayout`에서 `TILE_PAD`·`Math.max(MIN…)` 제거, `mdiClientSizeRef`의 cw×ch를 열·행으로 나누어 좌표 `(col*cw)/cols` 등으로 전면 배치. FEATURES·CONTEXT·project-rules·CHANGELOG 반영.

### Tile 격자 1×1·1×2·1×3·2×3·3×3, 내부창 최대 9
- 질문: 배열은 1x1, 1x2, 1x3, 2x3, 3x3 고 내부창은 최대갯수는 10에서 9개로 변경
- 답 요약: `pickTileGrid`를 **1×1·1×2·1×3·2×3·3×3**(열×행) 고정, `MAX_WINDOWS=9`. FEATURES·CONTEXT·project-rules·CHANGELOG 반영.

### Window > Tile 격자(1×1·2×1·3×1·3×3)
- 질문: 윈도우 > Tile 실행시 모듈창의 크기에 따라 1x1, 2x1, 3x1, 3x3 구성으로 크기를 배분한다.
- 답 요약: `MesMdiContext`에 `pickTileGrid` 추가 — 폭으로 최대 1~3열, 창 수에 따라 1×1/2×1/3×1/3열·ceil(n/열) 행(4~9는 3×2·3×3), 높이 부족 시 행당 최소 높이 맞추며 열 수 감소. FEATURES·project-rules §6.0.1·CHANGELOG·CONTEXT 반영.

### MDI 새 내부창 열 때 기존 최대화 창이 작아짐
- 질문: 새로운 내부창이 최대화로 열릴때 기존의 최대화 내부창이 작아진다.
- 답 요약: `openOrFocus` 신규 분기에서 기존 최대화 창을 `beforeMaximize`로 복원하던 루프를 제거. 최대화는 유지하고 새 창만 최상위 z로 겹침(`MesMdiLayer`는 `inset-0` 스택). 타이틀 더블클릭 최대화 시 다른 창 복원은 `toggleMaximize` 그대로. FEATURES·CONTEXT·CHANGELOG 반영.

### Window > 열린 창 클릭 시 최대화 풀림(Windows)
- 질문: 윈도우>열린윈도우 클릭시 최대화 되어 있는 창인데 창이 작아진다.
- 답 요약: Windows에서 네이티브 메뉴(`setMenu`/항목 클릭) 직후 BrowserWindow 최대화가 풀리는 동작에 맞춰, `electron/main.cjs`에서 조작 전 `isMaximized()`를 저장하고 `setImmediate` 후 `maximize()`로 복구. Tile·Cascade·열린 목록·`mes:mdi-menu-sync` 모두 적용. CHANGELOG·FEATURES 반영.

### Electron 다중 창 설계(동일 화면 ID·최대 10·선입선출)
- 질문: 화면 하단이 아니라 내부 창으로 그리기, 같은 화면 ID는 같은 창 공유, 최대 10개 유지, 새 창 시 가장 먼저 연 창 닫기 구성에 대한 의견
- 답 요약: 같은 ID 재사용·상한·FIFO는 합리적. 저장 확인·동일 ID 범위(상태)·FIFO vs LRU·하단/탭과 혼용 가능성을 짚음.

### USER_PROMPTS_LOG 반영 여부
- 질문: 지금한 질문은 USER_PROMPTS_LOG.md에 추가되었나?
- 답 요약: 직전(다중 창) 턴은 미반영이었음. 본 턴에서 위 항목과 함께 추가함.

### 로그 선행 기록(질문 먼저)
- 질문: 그럼 답변하기전에 프롬프트 입력만 먼저 저장하도록 해줘
- 답 요약: `project-rules.md` §2·`.cursorrules`·`ai-rules.md`에 **질문 선행 → 답 후 요약** 순서로 명시. `USER_PROMPTS_LOG` 상단 형식·본 턴 로그 반영.

### 확인
- 질문: 알았어
- 답 요약: 수신. 이후에도 동일 규칙(질문 선행 → 답 후 요약)으로 로그에 남김.

### 기준정보 다중 창(FIFO·동일 화면 ID)
- 질문: Electron 다중 창 설계(동일 화면 ID·최대 10·선입선출)를 기준정보 모듈에 적용해줘
- 답 요약: `electron/main.cjs`에 `openOrFocusStdScreen`·`loadScreenRoute`·`stdScreenWindows`/`stdScreenOrder` 추가. `기준정보` 메뉴 클릭만 분기, 동일 ID 포커스·10초과 시 FIFO 종료. `docs/FEATURES.md` 반영.

### 기준정보 내부 창(MDI)
- 질문: 다중창으로 변경된것 확인했는데 이게 새창으로 뜨는게 아니라. 내부창으로 떳으면 좋겠다.
- 답 요약: `electron/main.cjs`는 기준정보도 `mes:open-screen`만 전송(BrowserWindow 분기 제거). 렌더러에 `MesMdiProvider`/`MesMdiLayer`·`ScreenContentByScreenId`로 동일 모듈 창 안 MDI(최대 10·FIFO·동일 ID 포커스). `docs/FEATURES.md` 갱신.

### 기준정보 모듈 툴바·내부창 연계
- 질문: 툴바는 모듈윈도우에 종속되며 내부윈도우에는 툴바가 없으며 툴바클릭시 활성화되어있는 내부윈도우와 연계된다.
- 답 요약: `ModuleBlankPage`에 모듈 단일 `Toolbar`(`onAction`→`invokeToolbar`). `MesMdiEmbedContext`·`registerToolbarHandlers`로 활성 `screenId`에 전달. MDI 내부는 `MesScreenShell`/`BaseFeatureScreen`/`ScreenPlaceholder`에서 툴바 숨김. 기본 `close`는 해당 내부 창 닫기.

### MDI 내부창 이동·타이틀(최소·최대·닫기)
- 질문: 내부창은 모듈창내에서 이동이 가능하여야하며 타이틀바에 최소화, 최대화, 닫기 가 들어가야한다.
- 답 요약: `framesByScreen`에 위치·크기·`minimized`·`maximized`·`beforeMaximize` 저장. 타이틀 드래그로 `moveFrame`, 타이틀바에 최소화·최대화/복원·닫기. 최소화는 하단 바·클릭 시 복원. 동시 최대화는 한 창만.

### MDI 클라이언트 밖으로 드래그(MFC)
- 질문: 일반 MFC프로그램처럼 내부창이 모듈창을 내에서 안보이는 영역까지 이동가능할 수 없나?
- 답 요약: 드래그 시 위치 **클램프 제거** — 음수 좌표·클라이언트 밖 허용. MDI 본문 `overflow-hidden`으로 잘림(MFC와 유사). 완전히 밖이면 메뉴로 동일 화면 재진입 등으로 복구.

### MDI 드래그 영역 밖에서 중단
- 질문: 마우스가 영역밖으로 넘어가면 드래그가 더이상 되지않도록 수정
- 답 요약: `mousemove`에서 `MesMdiLayer` 루트 `getBoundingClientRect()` 밖이면 `dragRef` 해제로 드래그 종료(모듈 툴바 위 등).

### MDI 드래그 영역 밖에서 막고, 안으로 오면 이어서
- 질문: 영역밖으로 드래그시 막고 다시 안으로 들어오면 드래그가 진행되도록 수정
- 답 요약: 밖이면 `moveFrame`만 생략·`dragRef` 유지(`wasOutside`). 안으로 들어오면 현재 프레임 좌표로 **재앵커** 후 계속 드래그.

### MDI 기본 최대화·타이틀 더블클릭
- 질문: 내부창은 첫음으로 뜰때 디폴트로 최대화로 뜨며 내부창을 더블클릭하면 최대화 되도록 수정
- 답 요약: `openOrFocus` 신규 시 `maximized: true` + `beforeMaximize`(캐스케이드·디폴트 크기), 기존 최대화 창은 복원. 타이틀 `mousedown` `detail === 2`로 `toggleMaximize`.

### MDI 내부창 리사이즈
- 질문: 내부창도 마우스로 크기를 조절할 수 있도록 수정
- 답 요약: `MesMdiContext.setFrameBounds`·8방 핸들·`clampResize`(최소 `MDI_MIN_FRAME_WIDTH`/`HEIGHT`). 최대화·최소화 시 핸들 없음.

### 제품명 2S MES → BK MES
- 질문: 프로젝트내 모든 "2S MES" 를 "BK MES" 로 변경하라
- 답 요약: 소스·`renderer/index.html`·`electron/main.cjs`(도움말)·`project-rules`·`.cursorrules`·`docs/**` 일괄 치환. `.cursorrules`는 확장자 제외라 수동. `npm run build`로 `dist` 갱신.

### 스플래시 로고 bksoft.png
- 질문: 메인페이지에서 사용하던 아이콘.png대신 bksoft.png를 사용하라.
- 답 요약: `splashAssets.ts`의 `@docs/image/아이콘.png`를 **`bksoft.png`**로 교체(`splashIconUrl`). `FEATURES`·`CONTEXT`·`CHANGELOG` 반영 후 `npm run build`.

### document.title 모듈 vs 내부 화면
- 질문: 모듈페이지 타이틀에 표시하던 정보를 모듈명까지만 표시하고 나머지 정보들은 내부페이지 타이틀에 표시하라.
- 답 요약: `manualInnerTitlePath`(메뉴>하위) 추가·`useDocumentTitlePath`/플레이스홀더 반영. 모듈 라우트는 기존 `BK MES - 모듈명` 유지. Electron 모듈 창 제목 `BK MES - 모듈명`. 규칙·문서 갱신.

### 모듈·내부 창 타이틀(모듈명만 / 메뉴>하위 (화면ID))
- 질문: 변경된게 없는데? … 1. 모듈윈도우 타이틀에는 모듈명만 2. 내부윈도우 타이틀에는 메뉴명 > 하위메뉴 (화면ID) 로 표시
- 답 요약: **MDI 타이틀바**가 `메뉴/하위`+ID 없이 보였던 것이 원인. `manualInnerWindowTitle`·`MesMdiLayer` 반영. 모듈은 `BK MES` 접두 제거 후 **모듈명만**; 내부는 **`>` + `(화면ID)`**; Electron·`document.title` 동일 규칙.

### 모듈 창 타이틀이 내부 창 열 때 바뀜
- 질문: 모듈창 타이틀의 텍스트가 처음에 떴을때는 모듈명만 적혀있다가. 내부창을 띄우면 모듈창 타이틀도 변경되는 버그가 있다.
- 답 요약: `document.title`이 Electron 창 제목과 동기화되어 내부 화면이 덮어씀. **MDI 임베드**일 때는 `document.title` 미갱신·`MesMdiLayer` 타이틀만 사용.

### 규칙에 타 모듈 공통 반영
- 질문: 수정했던 내역을 다른 모듈작업시 (메뉴, 그리드, 내부창 작성 등등) 에도 동일하게 반영되도록 rules 들에 저장해둬
- 답 요약: `project-rules.md` **§6.0.1** 체크리스트(CSV·BK MES·bksoft·타이틀·MDI·Electron·골격). `.cursorrules`·`ai-rules.md`(위임)·`DOCUMENTATION_INDEX` 링크.

### 모듈창 Window 메뉴 Tile·Cascade·내부창 목록
- 질문: 모듈창의 Window 메뉴를 수정한다. 하위메뉴는 1.Tile 2.Cascade 3 구분선 4. 열려있는 내부창의 이름 … 동작 …
- 답 요약: `buildModuleWindowMenu`·`mes:mdi-menu-sync`로 동적 목록, IPC로 Tile/Cascade/포커스. `MesMdiContext` 타일·캐스케이드·`MesMdiLayer` `ResizeObserver`로 클라이언트 크기. `ModuleWindowMenuBridge`.

### Window 메뉴 내부창 라벨 = 하위메뉴명
- 질문: 열려 있는 내부창에 표시를 내부창 타이틀내용과 같이하지 말고 하위메뉴 명으로 하자
- 답 요약: `ModuleWindowMenuBridge`에서 `manualInnerWindowTitle` 대신 **`row.subMenuLabel`** 사용. 규칙·`FEATURES` 반영.

### Window 메뉴 내부창 순번 접두
- 질문: 열려 있는 내부창에 번호를 앞에 적자 아래처럼 1 공동코드 관리 2 단위공정라인 관리
- 답 요약: `order.map`에서 **`${index + 1} ${subMenuLabel}`** (`ModuleWindowMenuBridge`). 문서 반영.

### Tile 규칙을 project-rules에 반영(모든 모듈 참고)
- 질문: tile 에 적용한 내용을 규칙에 적용하여 모든 모듈페이지 구성시 참고하라
- 답 요약: **`project-rules.md` §6.0.2** 신설(MDI 클라이언트·`ResizeObserver` 대상·즉시 측정·Tile/Cascade·`tileLayoutActiveRef`). §6.0.1·`ai-rules`·`.cursorrules`·`LAYOUT_RULES`·`PROJECT_STRUCTURE`·`DOCUMENTATION_INDEX` 갱신.

### Tile 시 내부창이 모듈 크기에 비례하지 않음(예: 9칸 300×200)
- 질문: 지금은 tile를 눌러도 내부창의 크기가 고정되어있다. 모듈창 영역에 맞게 조절되는것이다. 예: 9개, 모듈 900×600이면 각 300×200.
- 답 요약: `tileLayout`이 Tile 클릭 직전 **DOM `getBoundingClientRect`** 없이 저장 ref만 쓰면 실제 클라이언트와 어긋남. **`registerMdiClientMeasure`**·Tile 후 모듈 리사이즈 시 격자 재적용. 수동 드래그·Cascade 등은 Tile 모드 해제.

### MDI Tile 시 내부창이 모듈 클라이언트에 꽉 차지 않음
- 질문: 왜 tile 일때 내부윈도우의 크기를 모듈윈도우크기에 비례해서 꽉차게 하라고 했느데 변경되었지?
- 답 요약: **원인**: `registerMdiClientSize`가 최소화 바까지 포함한 **전체 `MesMdiLayer` 높이**를 재어 `tileLayout`의 ch가 **실제 내부창 영역보다 큼**. **조치**: 내부창만 두는 **`mdiClientRef`**에 `ResizeObserver`·드래그 경계 적용. `CHANGELOG` 반영.

### 기준정보 하위메뉴 삭제·PNG 기준 재작성·PNG 없으면 팝업
- 질문: 기준정보 모듈의 모든 하위메뉴 페이지들을 삭제하고 다시 만들예정이다. 1. 공통코드 관리는 삭제하지 않는다. 2. 공통코드 관리 페이지에 적용된 내용과 관련 룰들을 반영하여 화면id.png 파일들을 다시 로드/분석하여 페이지를 만든다. 3. 화면id.png 가 없을 경우 에러팝업을 띄우도록 한다. (타이틀=하위메뉴명, 본문 2줄, 확인)
- 답 요약: 공통코드 유지. PNG 있는 화면은 기존 `MesScreenShell` 구현 유지·`std_base_process_line_mgmt`(PNG 없음) TSX·레지스트리 제거. `hasScreenPng`+`MesScreenAccessDeniedModal`로 기준정보·PNG 미포함 시 팝업. 문서·CHANGELOG 반영.

### ai-rules 중복 제거·최신은 project-rules 우선
- 질문: 수정해줘. 고려사항은 최근에 반영된 정보를 우선으로 해서 (rules 중복 정리)
- 답 요약: **`ai-rules.md`** 를 표·위임 전용으로 재작성(§6.0.1 등 상세는 **`project-rules.md`만**). `project-rules` 서두·**`.cursorrules`**·`DOCUMENTATION_INDEX`·과거 로그 §3.5 참조 정리.

### rules 점검 후 소소 패치
- 질문: 패치해줘 (ai-rules §참조·DOCUMENTATION_INDEX에 .cursorrules)
- 답 요약: `ai-rules` §3을 **§0·§1** 로 정정. `DOCUMENTATION_INDEX` UI/규칙에 **`.cursorrules`** 한 줄 추가. CHANGELOG·본 로그 반영.

### 모듈창 단일 인스턴스 제한
- 질문: 메인화면에서 각 모듈실행시 각 모듈창은 하나씩만 뜨도록 수정
- 답 요약: `electron/main.cjs`에 `moduleWindows Map` 추가. `createModuleWindow`에서 동일 모듈 창이 이미 존재하면 포커스(최소화 시 restore)하고 반환. 창 닫힘 시 Map 자동 정리. CHANGELOG 반영.

### std_base_user_permission_mgmt PNG 기준 전면 재구성
- 질문: D:\MES\docs\image 폴더에 있다 (이전 턴에서 std_base_user_permission_mgmt.png 재구성 요청)
- 답 요약: `docs/image/std_base_user_permission_mgmt.png` Read 성공. 레이아웃 분석 후 전면 재작성. 좌(40%) 전체사용자 그리드 + 하단 사용자권한그룹 목록, 우(60%) 권한그룹 내부필터 select + 멤버 그리드. `stdPngSampleData.ts`에 `STD_USER_PERM_USER_LIST`(29행)·`STD_USER_PERM_GROUP_MEMBERS`(11행)·`STD_USER_PERM_GROUPS_OF_USER` 추가. CHANGELOG 반영.

### std_base_user_permission_mgmt 우 패널 탭 구조 재작성
- 질문: 우측 영역을 탭(권한그룹|권한복사) 구조로 재구성 — 권한그룹 탭: 권한그룹 select + 그리드; 권한복사 탭: 부서 select(초기=전체) + 상단/하단 그리드
- 답 요약: 우 패널을 탭 구조로 전면 재구성. 탭바(권한그룹/권한복사)와 탭별 필터를 동일 행에 배치. 권한그룹 탭은 멤버 그리드 1개, 권한복사 탭은 상단(사용자목록)+하단(빈 복사대상) 2개 그리드. 활성 탭 blue 언더라인. CHANGELOG 반영.

### std_base_user_permission_mgmt 우측 그리드 tableTitle 명칭 수정
- 질문: 우측의 "권한그룹 명령" "사용자 명령" "복사대상" 모두 그리드이다. 그리드로 구성하라
- 답 요약: 권한그룹 탭 → `tableTitle="권한그룹 명령"`, 권한복사 탭 상단 → `tableTitle="사용자 명령"`, 권한복사 탭 하단 → `tableTitle="복사대상"` 으로 각 MesDataGridPanel의 tableTitle 수정.

### std_base_user_permission_mgmt 그리드 열 헤더 확인·샘플 데이터 갱신
- 질문: 권한그룹 명령, 사용자 명령, 복사 대상 모두 열 헤더를 사용자ID | 사용자 이름 | 부서 | 직급 로 구성
- 답 요약: 세 그리드 모두 `USER_COLS = ['사용자 ID', '사용자 이름', '부서', '직급']`로 이미 통일 적용됨 확인. `STD_USER_PERM_GROUP_MEMBERS` 샘플 데이터를 PNG 캡처(15행) 기준으로 갱신.

### MesDataGridPanel 안내 텍스트 제거
- 질문: 공통그리드에서 "열 경계 드래그 … Ctrl+휠 …" 설명을 지워 공간을 절약하자
- 답 요약: `MesDataGridPanel`의 안내줄 div 제거. 확대·축소 배율이 100%가 아닐 때만 배율(%)을 우측 상단에 소형으로 표시하도록 변경.

### std_base_user_permission_mgmt 열 헤더 미표시 버그 수정
- 질문: 그림처럼 열해더가 안보여
- 답 요약: 우 패널이 flex-row align-items:stretch로 높이를 받는 구조에서 `overflow-hidden`이 없으면 자식 flex-col의 flex-1 높이 계산이 Chromium에서 깨지는 문제. 우 패널 및 탭 콘텐츠 모든 계층에 `overflow-hidden min-w-0` 추가. 좌 패널 그리드 래퍼도 동일 패턴 적용.

### std_base_user_mgmt 사용자 정보 영역 재구성
- 질문: 첨부파일 기준 사용자 정보 재구성, IP 최적화 입력, 저장 시 비밀번호 불일치 알림
- 답 요약: `stdFormBits`에 `IpInput`(4세그먼트 IPv4) 추가. 사용자 정보를 4열 그리드(이미지 배치)로 재구성, 퇴사·Activated → PlainSelect, 설명 col-span-4. runSave에 pwd 불일치 사전 체크 추가. CHANGELOG 반영.

### MesDataGridPanel 스크롤바 너비 보정
- 질문: MesDataGridPanel 개선 — 수직 스크롤바 출현 시 그만큼 각 셀 크기 계산 전체 사이즈 보정
- 답 요약: `BaseFeatureScreen.tsx` `SimpleGridTable`에 `lastClientWidthRef`·`pxColWidthsRef` 추가. `initPxColWidths`에서 `clientWidth` 기억. ResizeObserver에서 너비 변화 시 비율 유지 재계산. dep 배열에서 `pxColWidths` 제거(ref 사용). CHANGELOG 반영.

### 공통코드 초기 조회 1회 통합
- 질문: 초기 fetchTbCmCodes({}) 결과로 그리드도 채우고 그룹 옵션도 동시에 추출하여 요청을 1회로 수정
- 답 요약: `Promise.all` 이중 조회 제거. `fetchTbCmCodes({})` 1회 결과에서 클라이언트 측 `Set` 중복 제거로 `groupOptions` 추출. `fetchTbCmCodeGroups` 함수 삭제. CHANGELOG 반영.

### 변경 없음 감지 useDirtyCheck 구현·일괄 적용
- 질문: 구현하고 다른화면에서도 일괄 적용
- 답 요약: `useDirtyCheck<T>()` 훅 신규 생성(snapshot/isDirty/clear). std_base_user_mgmt·std_base_common_code_mgmt 두 화면에 적용 — 행 선택·로드 시 snapshot, 신규·정렬 변경 시 clear, runSave에서 기존 레코드 변경 없음 시 "변경된 항목이 없습니다." 반환. LAYOUT_RULES·CHANGELOG 반영.

### std_base_user_mgmt 열 비율·colspan 적용 (4차)
- 질문: 이미지처럼 수정, 열 사이즈 2:2:1:1:2 비율
- 답 요약: grid-cols-[2fr_2fr_1fr_1fr_2fr] 적용. IP Address·이니셜 col-span-2(col3+4 병합), 주소 col-span-2(col1+2 병합). 퇴사/Activity는 col3·col4 개별 유지. CHANGELOG 반영.

### std_base_user_mgmt 사용자 정보 5열 재배치 (3차)
- 질문: 이 구성으로 배치해줘 (5열 다이어그램: 퇴사/Activity 분리, Description col5 rowspan)
- 답 요약: grid-cols-4 → grid-cols-5로 변경. Col3 인라인 flex(퇴사+Activity) 제거 → Col3=퇴사, Col4=Activity 개별 FormLabelInput. Col5=E-Mail(1행)+Description(row-span-4, 2~5행). 빈 placeholder div 추가. CHANGELOG 반영.

### std_base_user_mgmt 사용자 정보 이미지 재배치 (2차)
- 질문: 이 이미지에 맞춰 재배치해줘 (5행 4열: Password·Pass체크를 메인 그리드 col1에 통합, Description을 col4 row-span-4, 퇴사+Activity 인라인)
- 답 요약: MesDetailForm 내부를 5행×4열 CSS Grid로 완전 재구성. Password·Pass체크를 기존 별도 섹션(border-t)에서 메인 그리드 col1 3·4행으로 이동. Description(설명)을 col4 row-span-4 textarea로 변경. 퇴사·Activity를 col3 4행 인라인 flex 배치. 빈 col3 1행에 placeholder div 삽입. CHANGELOG 반영.

### 공통코드 Group Code 필터 콤보박스 전환
- 질문: std_base_common_code_mgmt — Group Code 텍스트박스를 콤보박스로 변경, 첫 항목 "전체", 이후 DB code_group 값, 선택 후 검색 시 DB 필터링
- 답 요약: `tbCmCodeApi.ts`에 `fetchTbCmCodeGroups()` 추가(전체 조회 후 중복 제거). 화면에 `groupOptions` 상태 추가, 마운트 시 `Promise.all`로 코드·그룹 동시 로드. filterArea `PlainInput` → `PlainSelect`(전체 + 그룹 옵션). CHANGELOG 반영.

### 자재관리 기초정보 mat_base 13화면 일괄 생성
- 질문: 자재관리 모듈의 기초정보(mat_base_*) 화면 13개를 생성. PNG 분석 후 레이아웃·데이터 매칭. 부품분류코드 관리, 검사항목 등록/변경이력/분류별/Item별, 불량항목 등록/변경이력/분류별/Item별, 샘플링 검사기준/Item별/공급업체별/변경이력 총 13개.
- 답 요약: `renderer/src/screens/mat/` 폴더 생성 후 13개 TSX 파일 신규 구현. 각 화면은 `MesScreenShell`+`MesDataGridPanel`+`useMesGridRowSelection` 공통 패턴 사용. 사이드바이사이드(1개), 3영역(4개), 단일그리드(8개) 레이아웃. PNG에서 추출한 열 정의·샘플 데이터 전부 반영. CHANGELOG·TODO 갱신.

### 자재관리 자재정보 mat_item 7화면 + 자재단가관리 mat_price 7화면 일괄 생성
- 질문: 자재관리 모듈의 자재정보(mat_item_*) 7개 + 자재단가관리(mat_price_*) 7개, 총 14개 화면을 생성. 각 PNG를 분석하여 필터·그리드 열·레이아웃·목업 데이터를 정확히 반영.
- 답 요약: `renderer/src/screens/mat/` 폴더에 14개 TSX 파일 신규 구현. 자재정보(material_master_reg, item_attr_bulk_edit, maker_part_no_reg/bulk_reg, material_inq_by_vendor, maker_barcode_use_setup, material_label_issue_qty_setup) 7개 + 자재단가관리(exchange_rate_hist_inq, material_price_mgmt/excel_upload/confirm/inq/change_hist_inq/job_hist_inq) 7개. 다양한 레이아웃 패턴(상단그리드+하단상세, 좌우분할, 좌측목록+우측그리드+상세, 2단헤더 그리드 등) 적용. CHANGELOG·TODO 갱신.

### 자재관리 가입고관리 mat_prein 8화면 재작성
- 질문: 자재관리 모듈의 가입고관리(mat_prein_*) 화면 8개를 PNG 분석 기반으로 재작성. 가입고 등록/취소(수작업), LOT 라벨 발행, 내역조회, LOT No별 내역조회, 일자별 집계, 취소 내역조회, 검사대기용 샘플 수량 조회, 수기 바코드 발행.
- 답 요약: 8개 TSX 파일 PNG 기반 재작성. 주요 수정: (1) lot_label_issue absolute→flex 레이아웃, (2) cancel_hist_inq 열 순서 수정(수량/상태 분리), (3) insp_wait 누락 입고수량 열 추가, (4) manual_barcode ✓ 체크열 추가, (5) reg_cancel_manual 고객사/공급업체 라디오 패턴·규격 필터 추가. CHANGELOG 반영.

### 자재관리 재고관리 mat_inv 19화면 일괄 생성
- 질문: 자재관리 모듈의 재고관리(mat_inv_*) 화면 19개를 PNG 분석 기반으로 일괄 생성. 재고조회 메인, 창고/SMT/조립/원자재 재고, 전체창고, 입출고 내역, 월별 수불, LOT 추적(단품·라벨별·업체별), 위치조회, 불출계획, 소요량 대비, 일별/월별 소진, 장기재고, 유효기간 관리.
- 답 요약: 19개 TSX 파일 신규 생성, registry.ts에 lazy import 등록. 다양한 레이아웃: 단일 넓은 그리드(재고 메인·창고·SMT·조립·원자재·전체창고·월별수불·불출계획·소요량·일별소진·월별소진·장기재고·유효기간), 상하 마스터-디테일 2단(입출고내역·업체LOT추적), 3단 구성(LOT추적: 요약+입고+SMT사용), 피벗 그리드(일별소진 28일 열). CHANGELOG·TODO 갱신.

### 자재관리 출고관리 mat_gi 22화면 신규 생성
- 질문: 자재관리 모듈의 출고관리(mat_gi_*) 화면 22개를 생성. PNG 20개 분석 기반 + PNG 없는 2개(키팅 지시서 관리, 키팅 이력 및 지시서 발행)는 기본 패턴으로 생성.
- 답 요약: 22개 TSX 파일 신규 생성 완료. 주요 패턴: (1) 자재 출고 및 취소 — 좌측 출고정보 폼+바코드 Ready 영역+하단 그리드, (2) 출고 일괄 처리 — 미출고/출고 토글+일괄출고/취소 버튼, (3) 출고내역/취소내역 조회 — 단일 그리드+showFilterSave=false, (4) 일자별/기간/월별 집계 — 합산 그리드, (5) 자재반품 등록 — 상하 2단 그리드, (6) 반품내역 조회 — 마스터+디테일 그리드, (7) 자재 이체 — To-be Item+변경사유 입력+이체실행, (8) 투입금지 자재 — 금지등록/해제+금지사유+상하 그리드, (9) 업체 대여 — 수불집계+합계 그리드, (10) 키팅 지시/이력 — 기본 필터+그리드. CHANGELOG·TODO 갱신.

### std_base_user_mgmt DB 라이브 분석
- 질문: std_base_user_mgmt 페이지에 대한 DB 분석
- 답 요약: Vite dev proxy(localhost:5174)를 통해 라이브 DB 직접 조회 수행. (1) tb_cm_user 테이블 29개 컬럼 구조 확인(user_id PK, user_name, pass, user_pwd(MD5), dept, duty, mobile, telephone, beginning_employment_date, ip_address, user_initial, resigned, address, description, activated, attribute01~10, create_date, created_by, update_date, updated_by). (2) 총 148건/고유 135건 — user_id 중복 발견(002: 6건, QWEASD2403: 4건, test01: 4건, 5577_1234: 2건, BHM: 2건). (3) DEPT 15개, DUTY 20개 공통코드 확인. (4) 부서 분포: 제조1부(SMT)/제조2부(ASM) 각 40건 최다. (5) 문제점 식별: PK 중복(UNIQUE 미적용), 평문 비밀번호 저장(pass 컬럼), telephone/address 그리드 미매핑, E-Mail UI 필드에 대응 DB 컬럼 부재, attribute01 용도 불명확.

### 페이지 DB 분석 워크플로 미수행 이유 + 규칙대로 보완
- 질문: 규칙에 페이지 DB 분석 시 MD·HTML·git push까지 하도록 추가하지 않았나, 왜 수행되지 않았지?
- 답 요약: `.cursor/rules/page-db-analysis-workflow.mdc`에 정의된 절차(1) `docs/db-doc/<screenId>_api.md` 상세 작성 (2) `D:\smkang_data\docs\mes\<screenId>_api.html` 변환 (3) `D:\smkang_data\docs`에서「만든 파일 업로드」커밋·push)가 이전 턴에서 누락됨 — 트리거 문구가 정확히 일치하지 않았거나 에이전트가 요약만 제공한 탓. 이번에 `std_base_user_mgmt_api.md` 전면 갱신, `scripts/render-db-doc-html.mjs`로 HTML 생성, `mes/std_base_user_mgmt_api.html`만 스테이징 후 `origin/main` 푸시 완료(ec354a6). MES 쪽 잘못 둔 `docs/db-doc/std_base_user_mgmt_api.html` 삭제.

### DB 분석 MD 템플릿·스타일 규칙 등록
- 질문: 지금 수행한 DB 분석방법의 md파일 구조, 구성, 스타일을 기억하여 차후 수행시 동일한 스타일의 분석 HTML 문서가 나올 수 있도록 규칙에 등록해줘
- 답 요약: `.cursor/rules/page-db-analysis-workflow.mdc`에 **§ MD 템플릿** 절 추가. (1) 헤더 블록 형식(# 제목, 메타 줄, 상대 링크), (2) 섹션 순서·번호(베이스 URL → 엔드포인트 요약 → 상세(GET/POST/DELETE 순) → 테이블 필드 → UI 매핑 → 보완점 → 관련 파일), (3) 엔드포인트 하위 구조(호출 코드·URL·시점·응답·에러), (4) 서식 규칙(표·볼드·코드블록·링크·한국어·문서 길이 150~250줄), (5) HTML 인라인 CSS 스타일 표. `.cursorrules`에도 "§ MD 템플릿 구조·스타일" 참조 추가.

### 부서 전체 선택 시 그리드 비어 있음
- 질문: 부서 전체 선택시 값이 하나도 없다.
- 답 요약: 전체(`""`)일 때 빈 배열만 쓰던 로직을 `fetchTbCmUsers({})` + `fetchAllCmUsersForDeptGrid`(DEPT/DUTY `fn_cm_code` 명칭)로 교체. DUTY 옵션 마운트 시 로드. DB 문서·HTML(smkang_doc) 갱신.

### 그리드 값 변경 시 변경된 그리드만 다시 그리기
- 질문: 그리드 값변경시 변경된 그리드만 다시그려라
- 답 요약: `MesDataGridPanel`에 `React.memo` 적용해 props 동일 시 리렌더 생략. 권한 화면은 조회 중 표시를 각 그리드 영역 오버레이로만 표시(상단 공통 로딩 제거).

### std_base_user_permission_mgmt 콤보 선택 시 그리드 갱신
- 질문: 부서, 권한그룹 모두 콤보박스 선택시 그리드 값 변경
- 답 요약: `useEffect`에서 `if (filterDept)` / `if (filterUserClass)` 제거 — 콤보 값이 바뀔 때마다(전체 포함) 왼쪽·오른쪽 그리드 각각 재조회.

### std_base_user_permission_mgmt 부서 콤보 우측 정렬
- 질문: 부서 + 콤보박스 우측정렬
- 답 요약: 그리드 상단 `부서`·`권한그룹` 행 컨테이너에 `justify-end` 추가해 각 패널 내 우측 정렬.

### std_base_user_permission_mgmt MesSearchSaveBar 제거·콤보 그리드 위
- 질문: MesSearchSaveBar를 없애고 부서 + 콤보박스를 그리드 위에 배치
- 답 요약: `filterArea`/`filterLeading` 제거로 `MesSearchSaveBar` 비표시. 왼쪽 `부서`·오른쪽 `권한그룹` 콤보를 각 그리드 상단에 배치. 로딩·배너는 본문 상단. Toolbar 조회는 유지.

### std_base_user_permission_mgmt 실제 API 연동 재구성 + DB 분석
- 질문: std_base_user_permission_mgmt에 대한 DB상세를 참고하여 페이지를 재구성하라 (6개 API 엔드포인트 제공)
- 답 요약: 목업 제거, 6개 실제 API 연동 TSX 전면 재구성. `userAuthorityApi.ts` 신설. DB 분석 워크플로: `std_base_user_permission_mgmt_api.md` 신설, HTML smkang_doc 푸시(8c4373c). `DOCUMENTATION_INDEX.md` 링크 추가.

### std_base_common_code_mgmt 페이지 DB 분석
- 질문: std_base_common_code_mgmt 페이지에 대한 DB분석
- 답 요약: 워크플로에 따라 `docs/db-doc/std_base_common_code_mgmt_api.md` 신설. HTML smkang_doc 푸시.

### std_base_user_mgmt 페이지 DB 분석 (재요청)
- 질문: std_base_user_mgmt 페이지에 대한 DB분석
- 답 요약: 워크플로에 따라 `docs/db-doc/std_base_user_mgmt_api.md` 점검(§3.4 내부 참조 §7로 정정), `render-db-doc-html.mjs`로 `D:\smkang_data\docs\mes\std_base_user_mgmt_api.html` 재생성, smkang_doc만 스테이징 후「만든 파일 업로드」푸시(4c30abc). 문서는 GET `tb_cm_user`·`fn_cm_code`(DEPT/DUTY)·POST·DELETE, 매퍼·그리드 매핑·보완점 요약 유지.

### std_base_common_code_mgmt 페이지 DB 분석
- 질문: std_base_common_code_mgmt 페이지에 대한 DB분석
- 답 요약: `docs/db-doc/std_base_common_code_mgmt_api.md` 전면 정합(헤더 API·매퍼 링크, 엔드포인트 요약, GET fn_cm_code/GROUPCODE, GET tb_cm_code, POST/DELETE, §7 `TbCmCode` 필드, §8 그리드 0~10 매핑, UX·보완·관련 파일). `render-db-doc-html.mjs`로 `D:\smkang_data\docs\mes\std_base_common_code_mgmt_api.html` 생성, smkang_doc「만든 파일 업로드」푸시.
