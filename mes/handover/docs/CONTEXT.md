## 프로젝트 개요

- **프로젝트명**: MES (Vite + React + TypeScript + Tailwind CSS + Electron)
- **목표**: Electron 데스크톱 앱에서 MES UI(React renderer)를 구동한다.

## 현재 상태

- **매뉴 데이터**: `docs/매뉴얼.csv` ↔ `renderer/src/data/manual.csv` — **모듈명, 메뉴, 하위메뉴, 화면 ID** (4열). 모듈은 **기준정보, 제품관리, 자재관리, 생산관리, 구매관리**.
- **첫 화면**: **스플래시** — 좌측 액션·중앙 **`docs/image/bksoft.png`** + **BK MES**·**모듈_off.png** / **모듈_on.png**(동일 6열 스프라이트, 호버 시 on)·하단 로그인/안내(배경 이미지·앱 내 메뉴 줄 없음). **SCM** 타일은 **사양 미정**으로 클릭 비활성화.
- **라우팅**: `#/` 스플래시, `#/modules/:moduleName` 모듈별 메뉴 트리, `#/screens/:screenId` — 현재 **`FEATURE_SCREEN_REGISTRY`는 기준정보(STD) + 제품관리(PRD) 17화면 활성화**. 제품관리는 `prd_itemno_item_no_mgmt_fg_semi` + `prd_itemno_item_attr_bulk_edit`·`prd_inv_qty_adj_by_item`·`prd_bom_ebom_reg_edit` 상세 구현을 포함하며, 남은 화면도 `PrdBomMappedScreen`·`PrdInventoryMappedScreen`·`PrdItemNoMappedScreen`의 화면 ID별 설정으로 세분화해 연결했다. BOM(3차)·재고/품번(4차)·상세3화면(5차)에 이어, 6차에서는 화면 ID별 필터 라벨(`code/name/rev`)과 그리드 표 제목(`tableTitle`)까지 분리해 텍스트 정합도를 추가 개선했다. 자재/생산/구매 등 미구현 화면은 메뉴 클릭 시 **`MesScreenAccessDeniedModal`** 경고 팝업 처리. 배포 번들에서는 `screenId.png`를 제외하고 스플래시 필수 PNG만 유지. 조회줄·그리드·행 상세는 **`docs/LAYOUT_RULES.md`**·`MesSearchSaveBar`·`MesDataGridPanel`·`MesGridRowDetailForm`.
- **타이틀**: **모듈 창**은 **모듈명만**; **내부·기능 화면**은 **`메뉴 > 하위메뉴 (화면ID)`** (MDI 타이틀바·`document.title` 동일 형식).
- **Electron**: **메인 창**은 **800×600** 고정·최대화 없음·메뉴 없음(`setMenu(null)`). **기준정보~구매관리** 타일은 **`mes:open-module-window`** 로 **새 BrowserWindow** — 최초 `#/module/<모듈명>` **`ModuleBlankPage`**. **기준정보·제품·자재·생산·구매** 5개 모듈은 **동일 창 MDI**(`MDI_MODULE_ROUTE_NAMES`). 하위 메뉴 클릭 시 `mes:open-screen` → **`openOrFocus`**(MDI) 또는 `#/screens/<화면ID>`(비 MDI·SCM 등). **모듈 단일 `Toolbar`**·`MesMdiLayer`·Tile/Cascade·내부창 상한 9 등은 **`project-rules.md`** §6.0.1·§6.0.2와 동일.
- **Vite**: `vite.config.ts` 에 `@docs` → 저장소 `docs/` (화면 PNG 등 참조 시 사용), `base: './'`(패키징 `file://` 자산 경로 안정화). **STD 전용 BE**: Node **`server/`** — **`/api/users`**·**`/api/tb-cm-code`**·**`/api/fn-cm-code`**·**`/api/tb-cm-customer`**·**`/api/fn-unit-process`**·**`/api/fn-unit-process-line`**·**`/api/fn-user-authority-base`**·**`/api/fn-cm-user-dept`**·**`/api/fn-user-authority-userid`**·**`/api/tb-mes-user-authority`**·**`/api/fn-mes-menu-user-class`**·**`/api/tb-mes-menu-authority`**·**`/api/cfg/*`**(기준설정 조회)·**`/api/user-access-logs`**(사용자 LOG) 등(Express **HTTP** `app.listen`, 스킴은 보통 **`http://호스트:8787`**). **`npm run dev`** 는 Vite를 새로 띄울 때 로컬 **8787** 에 BE가 없으면 함께 기동(`MES_DEV_SKIP_USER_MGMT_BE=1` 로 생략 가능). **Electron**은 `mes-config.ini`의 **`USER_MGMT_API_BASE`** 또는 **`UI_URL`+`USER_MGMT_API_PORT`(기본 8787)** 를 IPC로 렌더러에 주입(`main.tsx`·`userMgmtBeBaseUrl.ts`) — 이름은 user이나 **동일 베이스로 STD `/api` 전체**에 사용. **Vite dev**는 동일 INI(또는 `MES_USER_MGMT_PROXY_TARGET`)로 **`/api` 프록시** 대상을 정하고, 없으면 `localhost:8787`. 기준정보 **사용자·메뉴 권한**은 위 **`/api`** 로 통일했고, 다른 모듈·화면은 **`/db`**·**`/func`** 게이트웨이(`mesDbUrl`)를 쓸 수 있다. 배포·TLS는 **`VITE_USER_MGMT_API_BASE`**·**`VITE_MES_DB_API_BASE`**·INI·`electron/main.cjs` 인증서 예외. **PostgreSQL `tb_cm_user` 레거시 정합**(bcrypt·`user_pwd` 길이·upsert·날짜 컬럼)은 **`project-rules.md` §4.1**·**`docs/DATABASE.md`**.
- **이전 세대**: 구 `frm*` 기반 개별 화면 TSX·`ScreenRouterPage` 는 제거됨. PNG·화면 구현은 **새 화면 ID** 기준으로 단계 진행.
- **AI 하네스**: 루트 **`npm run check:ai-harness`** — `manual.csv`·[`screenFormCodeMap.mjs`](../server/src/lib/screenFormCodeMap.mjs)의 `std_*` ↔ [`byScreen`](../server/src/routes/byScreen)·`docs/USER_PROMPTS_LOG.md` 상단 날짜 순(엄격: `npm run check:ai-harness:strict`). PR·push 시 [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

## 기술 스택

- **Renderer**: Vite, React, TypeScript, Tailwind CSS
- **Desktop Shell**: Electron

## 다음 단계

- **자재관리 입고관리** `mat_gr_*` 22화면 1차 구현 완료 — 데이터 연동 필요.
- **자재관리 수입검사** `mat_iqc_*` 14화면 1차 구현 완료 — 데이터 연동 필요.
- **구매관리** `pur_*` PNG 수급 시 레지스트리·화면 추가; 제품·자재·생산 **화면별 PNG 정합**·데이터 연동.
- 기준정보 화면 **데이터 연동·검증** 및 PNG 대비 **픽셀 단위 정합** 보강.
