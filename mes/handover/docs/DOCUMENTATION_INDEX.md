## 문서 인덱스

### 대외·발주

- [`docs/VENDOR_PROJECT_REPORT.md`](VENDOR_PROJECT_REPORT.md): 발주업체용 프로젝트 정리(기술 스택, UI·내비게이션, 화면 인벤토리, `FEATURE_SCREEN_REGISTRY` 현황, Mermaid 구성도)

### 필수

- [`docs/HANDOVER_NEW_DEVELOPER.md`](HANDOVER_NEW_DEVELOPER.md): **신규 개발자 인수인계** — 레거시 정합 작업 순서(캡처·`legacy_mes`·FE/BE·연동)·문서 지도
- [`docs/HANDOVER_NEW_DEVELOPER.html`](HANDOVER_NEW_DEVELOPER.html): 위 MD의 **브라우저용 HTML** (`scripts/render-db-doc-html.mjs` 변환)
- `docs/CONTEXT.md`: 현재 상태/다음 단계
- `docs/CHANGELOG.md`: 작업 이력
- `docs/TODO.md`: 남은 작업
- `docs/USER_PROMPTS_LOG.md`: 턴별 **질문 선행 기록 → 응답 후 답 요약**(`project-rules.md` §2, `.cursor/rules/user-prompts-log-workflow.mdc`)

### 설정/구조

- `docs/SETUP.md`: 설치 및 실행 방법
- `docs/PROJECT_STRUCTURE.md`: 디렉토리 구조 및 파일 역할
- `docs/legacy_mes/README.md`: WinForms 레거시 소스 보관·화면 ID↔`frm` 매핑 절차(`project-rules.md` §6.0.3)

### DB 스키마·마이그레이션 요약

- `docs/DATABASE.md` — 전역 DB 메모(`tb_cm_user`·STD 전용 BE **`/api/*`**·기준설정 **`/api/cfg/*`** 등 — **`project-rules.md` §4.1·§4.2**)
- `docs/SMOKE_STD_BE.md` — STD BE 스모크(`npm run smoke:be`)·화면별 수동 체크 요약
- `server/src/routes/byScreen/README.md` — 화면 ID별 `byScreen` 진입점(`<screenId>.mjs`, `manual.csv`와 1:1)
- `server/src/lib/queries/README.md` — SQL·HTTP 라우트 구현(`std_*` 등 모듈 접두·공통 예외)

### DB·화면별 API 메모

- `docs/db-doc/std_module_basis_info_overview.md` — **기준정보 모듈(매뉴얼 14화면)** DB·HTTP 통합 표·공통 패턴 — 화면별 상세는 아래 `*_api.md`
- `docs/db-doc/std_base_user_mgmt_api.md` — 사용자 관리 HTTP 쿼리
- `docs/db-doc/std_base_common_code_mgmt_api.md` — 공통코드 관리 HTTP 쿼리
- `docs/db-doc/std_base_user_permission_mgmt_api.md` — 사용자 권한 관리 HTTP 쿼리
- `docs/db-doc/std_base_menu_permission_mgmt_api.md` — 메뉴권한 관리 HTTP 쿼리
- `docs/db-doc/std_base_unit_process_mgmt_api.md` — 단위 공정 관리 HTTP 쿼리
- `docs/db-doc/std_base_unit_process_line_mgmt_api.md` — 단위공정 라인 관리 HTTP 쿼리
- `docs/db-doc/std_base_vendor_mgmt_api.md` — 거래처 관리 HTTP 쿼리
- `docs/db-doc/std_base_user_log_inq_api.md` — 사용자 LOG 조회 HTTP 쿼리
- `docs/db-doc/std_base_process_line_mgmt_api.md` — 공정라인 관리(LINE 마스터·`/api/line-codes`)
- `docs/db-doc/std_base_process_line_config_mgmt_api.md` — 공정라인 구성 관리 HTTP
- `docs/db-doc/std_cfg_router_mgmt_api.md` — 라우터 관리(기준설정)
- `docs/db-doc/std_cfg_prod_router_mgmt_api.md` — 생산 라우터 관리
- `docs/db-doc/std_cfg_tact_time_mgmt_api.md` — Tact Time 관리
- `docs/db-doc/std_cfg_packing_unit_mgmt_api.md` — 포장단위 관리

### AI·에이전트 도구

- `npm run check:ai-harness` / `npm run check:ai-harness:strict` — 저장소 규약 읽기 전용 검사([`scripts/check-ai-harness.mjs`](../scripts/check-ai-harness.mjs)), CI: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
- `.cursor/skills/README.md` — (선택) Cursor `SKILL.md` 배치 안내

### UI / 규칙

- `docs/LAYOUT_RULES.md`: UI 레이아웃(폼·조회줄·**`MesSearchSaveBar`**·`filterLeading`/`leading`·그리드·**`MesDataGridPanel`**·**`MesDetailForm`**·색상·기간 입력) — `project-rules.md` §6.0·§6.0.2(MDI·Tile)와 병행
- `project-rules.md`: 프로젝트 전반 규칙(§6.0 화면ID·PNG·Chrome, **§6.0.1 타 모듈·신규 화면 공통**, **§6.0.2 MDI 클라이언트·Tile·Cascade**) — **단일 상세 원본**
- `.cursorrules`(저장소 루트): **Cursor IDE** 전용 — 코드 인용 형식·도구·워크플로; 범용은 `project-rules.md` 우선
- `ai-rules.md`: Cursor 외 AI용 **`project-rules.md` 위임·표** — 본문 중복 없음

