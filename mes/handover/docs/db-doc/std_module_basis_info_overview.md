# 기준정보 모듈 — DB·HTTP 통합 분석

`docs/매뉴얼.csv` 기준 **모듈명 = 기준정보** 인 화면 **14건**에 대한 DB·API 연동을 한눈에 정리한다. 화면별 상세(엔드포인트별 상세·그리드 매핑·에러)는 각 **`docs/db-doc/<screenId>_api.md`** 를 권위로 한다.

---

## 1. 베이스 URL·공통 BE

| 항목 | 내용 |
|------|------|
| **STD 전용 BE** | [`server/src/index.mjs`](../../server/src/index.mjs) — 기본 `http://localhost:8787`, 화면별 라우트는 [`server/src/routes/byScreen/`](../../server/src/routes/byScreen/README.md) `std_<screenId>.mjs` 에서 `lib/queries/*.mjs` 로 마운트 |
| **렌더러 베이스** | [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts) 의 `userMgmtBeUrl()` — Vite dev 는 보통 `/api` 프록시 → 위 BE |
| **모든 구현 화면 진입 시** | [`ScreenPlaceholderPage.tsx`](../../renderer/src/pages/ScreenPlaceholderPage.tsx) — 로그인·비 DEVELOPER 이면 [`POST /api/menu-access`](std_base_user_log_inq_api.md) (`tb_mes_menu`·`tb_mes_menu_authority` 권한, 허용 시에만 `tb_mes_menuaccesslogs` INSERT — [`std_userAccessLog.mjs`](../../server/src/lib/queries/std_userAccessLog.mjs)) |

---

## 2. 화면 일람 (매뉴얼 · DB·API 요약 · 상세 문서)

| 그룹 | 메뉴(매뉴얼) | 화면 ID | 구현 TSX | 주요 테이블·대상 | 대표 HTTP(Path) | 상세 MD |
|------|----------------|---------|----------|------------------|-----------------|---------|
| 기초정보 | 공통코드 관리 | `std_base_common_code_mgmt` | [`std_base_common_code_mgmt.tsx`](../../renderer/src/screens/std/std_base_common_code_mgmt.tsx) | `tb_cm_code` | `GET/POST/DELETE /api/tb-cm-code`, `GET /api/fn-cm-code` | [std_base_common_code_mgmt_api.md](std_base_common_code_mgmt_api.md) |
| 기초정보 | 사용자 관리 | `std_base_user_mgmt` | [`std_base_user_mgmt.tsx`](../../renderer/src/screens/std/std_base_user_mgmt.tsx) | `tb_cm_user` | `GET/POST/DELETE /api/users` | [std_base_user_mgmt_api.md](std_base_user_mgmt_api.md) |
| 기초정보 | 사용자권한 관리 | `std_base_user_permission_mgmt` | [`std_base_user_permission_mgmt.tsx`](../../renderer/src/screens/std/std_base_user_permission_mgmt.tsx) | `tb_mes_user_authority`, `tb_cm_user` | `GET /api/fn-cm-user-dept`, `GET /api/fn-user-authority-*`, `GET/POST/DELETE /api/tb-mes-user-authority`, `GET /api/users` | [std_base_user_permission_mgmt_api.md](std_base_user_permission_mgmt_api.md) |
| 기초정보 | 메뉴권한 관리 | `std_base_menu_permission_mgmt` | [`std_base_menu_permission_mgmt.tsx`](../../renderer/src/screens/std/std_base_menu_permission_mgmt.tsx) | `tb_mes_menu`, `tb_mes_menu_authority` | `GET /api/fn-mes-menu-user-class`, `POST/DELETE /api/tb-mes-menu-authority`, `GET /api/fn-cm-code` | [std_base_menu_permission_mgmt_api.md](std_base_menu_permission_mgmt_api.md) |
| 기초정보 | 단위공정 관리 | `std_base_unit_process_mgmt` | [`std_base_unit_process_mgmt.tsx`](../../renderer/src/screens/std/std_base_unit_process_mgmt.tsx) | `tb_cm_code`(PROCESS 등), `tb_mes_unit_process` | `GET /api/fn-cm-code`, `GET /api/fn-unit-process` | [std_base_unit_process_mgmt_api.md](std_base_unit_process_mgmt_api.md) |
| 기초정보 | 단위공정라인 관리 | `std_base_unit_process_line_mgmt` | [`std_base_unit_process_line_mgmt.tsx`](../../renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx) | `tb_cm_code`, `tb_mes_unit_process`, `tb_mes_process_line` | `GET /api/fn-cm-code`, `GET /api/fn-unit-process-line` | [std_base_unit_process_line_mgmt_api.md](std_base_unit_process_line_mgmt_api.md) |
| 기초정보 | 공정라인 관리 | `std_base_process_line_mgmt` | [`std_base_process_line_mgmt.tsx`](../../renderer/src/screens/std/std_base_process_line_mgmt.tsx) | `tb_cm_code`(LINE), `tb_mes_process_line` 등 | `GET /api/fn-cm-code`, `GET /api/line-codes`, `GET /api/fn-unit-process` | [std_base_process_line_mgmt_api.md](std_base_process_line_mgmt_api.md) |
| 기초정보 | 공정라인 구성 관리 | `std_base_process_line_config_mgmt` | [`std_base_process_line_config_mgmt.tsx`](../../renderer/src/screens/std/std_base_process_line_config_mgmt.tsx) | `tb_mes_process_line`, `tb_cm_code` | `GET/POST/DELETE /api/unit-process-line-codes`, `GET/POST /api/process-line/...` | [std_base_process_line_config_mgmt_api.md](std_base_process_line_config_mgmt_api.md) |
| 기초정보 | 업체 관리 | `std_base_vendor_mgmt` | [`std_base_vendor_mgmt.tsx`](../../renderer/src/screens/std/std_base_vendor_mgmt.tsx) | `tb_cm_customer` | `GET/POST/DELETE /api/tb-cm-customer` | [std_base_vendor_mgmt_api.md](std_base_vendor_mgmt_api.md) |
| 기초정보 | 사용자 LOG 조회 | `std_base_user_log_inq` | [`std_base_user_log_inq.tsx`](../../renderer/src/screens/std/std_base_user_log_inq.tsx) | `tb_mes_menuaccesslogs`(legacy 등 env) | `GET /api/user-access-logs`, (타 화면) `POST /api/menu-access` | [std_base_user_log_inq_api.md](std_base_user_log_inq_api.md) |
| 기준설정 | 라우터 관리 | `std_cfg_router_mgmt` | [`std_cfg_router_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_router_mgmt.tsx) | cfg·모델·라우트 테이블( `std_cfgMes.mjs` ) | `GET /api/cfg/model-master`, `GET /api/cfg/unit-processes`, `GET /api/cfg/routes`, `POST/DELETE …` (mutations) | [std_cfg_router_mgmt_api.md](std_cfg_router_mgmt_api.md) |
| 기준설정 | 생산 라우터 관리 | `std_cfg_prod_router_mgmt` | [`std_cfg_prod_router_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_prod_router_mgmt.tsx) | 동일 계열 | `GET /api/cfg/model-master`, `GET /api/cfg/model-mapping`, `GET /api/cfg/routes` | [std_cfg_prod_router_mgmt_api.md](std_cfg_prod_router_mgmt_api.md) |
| 기준설정 | Tact Time 관리 | `std_cfg_tact_time_mgmt` | [`std_cfg_tact_time_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_tact_time_mgmt.tsx) | 동일 계열 | `GET /api/cfg/model-master`, `GET /api/cfg/tact-times` | [std_cfg_tact_time_mgmt_api.md](std_cfg_tact_time_mgmt_api.md) |
| 기준설정 | 포장단위 관리 | `std_cfg_packing_unit_mgmt` | [`std_cfg_packing_unit_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_packing_unit_mgmt.tsx) | 동일 계열 | `GET /api/cfg/model-master`, `GET /api/cfg/packing-units` | [std_cfg_packing_unit_mgmt_api.md](std_cfg_packing_unit_mgmt_api.md) |

---

## 3. 공통 DB·API 패턴

| 패턴 | 설명 |
|------|------|
| **공통코드 콤보** | 다수 화면이 `GET /api/fn-cm-code?p1=<GROUP>&p2=disp_seq` 로 `tb_cm_code` 부서·직급·공정·라인 등 조회 — 구현 [`fnCmCode.mjs`](../../server/src/lib/queries/fnCmCode.mjs) 등 |
| **권한** | 사용자·메뉴 권한은 `tb_mes_user_authority`, `tb_mes_menu_authority`, `tb_mes_menu` — [`std_mesAuthority.mjs`](../../server/src/lib/queries/std_mesAuthority.mjs) |
| **웹 `screen_id` vs `form_code`** | 메뉴·접속 로그는 레거시 `frm*` 과 웹 `std_*` 매핑 — [`screenFormCodeMap.mjs`](../../server/src/lib/screenFormCodeMap.mjs), [`project-rules.md` §4.2](../../project-rules.md), [`DATABASE.md`](../DATABASE.md) |
| **기준설정(cfg)** | `std_cfg_*` 는 [`std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs)·[`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs) 중심 `/api/cfg/*` |

---

## 4. 보완·주의

1. **공정라인 구성** 화면은 UI가 샘플·PNG 위주인 구간이 있을 수 있어, 해당 [`std_base_process_line_config_mgmt_api.md`](std_base_process_line_config_mgmt_api.md) 의 “보완” 절을 따른다.
2. 스키마·엔드티 변경 시 **`DATABASE.md`**·해당 화면 **`_api.md`**·**`CHANGELOG.md`** 를 함께 갱신한다(`project-rules.md` §4).

---

## 5. 관련 인덱스·소스

| 문서·경로 | 비고 |
|-----------|------|
| [`DOCUMENTATION_INDEX.md`](../DOCUMENTATION_INDEX.md) | `db-doc` 화면별 링크 목록 |
| [`DATABASE.md`](../DATABASE.md) | 전역 테이블·STD BE 요약 |
| [`server/src/routes/byScreen/README.md`](../../server/src/routes/byScreen/README.md) | `std_*.mjs` 진입점 설명 |
