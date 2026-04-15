# 데이터베이스 메모 (DATABASE)

프로젝트 전역 **스키마 가이드·마이그레이션 요약**을 둔다. 화면별 HTTP·쿼리 상세는 **`docs/db-doc/<화면ID>_api.md`** 가 우선이다.

## 범용

- 스키마·엔티티를 바꾸면 **`project-rules.md` §4**·본 파일·관련 **db-doc**·**CHANGELOG** 를 갱신한다.

## `tb_cm_message` (스플래시 공지 / 선택)

레거시 메인 `frmMain.displayMessage` — `tb_cm_message`에 행이 있을 때만 스플래시 하단 공지에 표시된다.  
테이블·컬럼이 없거나 스키마가 다르면 [`GET /api/tb-cm-messages`](../server/src/lib/queries/authAndSplash.mjs)는 **`{ lines: [] }`** 로 폴백한다.  
**기대 컬럼(예시)**: `update_date`, `content`.

## `tb_cm_user` (사용자 관리 / mes-user-mgmt-server)

**규칙 원문**: **`project-rules.md` §4.1** (단일 권위 요약).

| 항목 | 요약 |
|------|------|
| **`user_pwd`** | bcrypt 해시 **~60자**. **`varchar(50)` 불가** → **`VARCHAR(72)+`** 또는 **`TEXT`**. |
| **Upsert** | BE는 **`UPDATE` 후 `INSERT`** (`ON CONFLICT` 미사용). **`user_id` UNIQUE/PK 없음** 레거시 대응. |
| **`beginning_employment_date`** | **`varchar`** 레거시 시 **`date`와 `COALESCE` 혼용 금지**(42804). BE는 **`to_char`·`CASE`**. |

- **API·필드 매핑**: [`docs/db-doc/std_base_user_mgmt_api.md`](db-doc/std_base_user_mgmt_api.md)
- **BE 실행·연결**: [`docs/SETUP.md`](SETUP.md), [`server/README.md`](../server/README.md)

## `tb_cm_code` (공통코드 / std_base_common_code_mgmt)

**규칙 원문·BE**: **`project-rules.md` §4.2**, 레거시 **`frmCommonCode.cs`** (MERGE·`CODE_LEVEL`·`CODE_DESC`).

| 항목 | 요약 |
|------|------|
| **조회** | 그룹 미지정 시 목록 전체( **`code_level` 이 1이 아닌 행** 제외 — 레거시 `CODE_LEVEL != 1`). 그룹 지정 시 **`code_group` 정확 일치**. 정렬 **`code_group`, `code_level`, `disp_seq`**. |
| **저장** | PostgreSQL BE는 Oracle `MERGE` 대신 **`UPDATE` → 영향 없으면 `INSERT`**. 저장 시 **`code_level = 3`** (레거시와 동일). |
| **설명 컬럼** | 레거시·DB는 **`code_desc`** 일 수 있음. 게이트웨이/프론트는 **`description`** 키를 쓰는 경우가 있어 BE **`GET` 응답**에서 **`description` ← `code_desc`** 별칭을 맞춘다. |
| **삭제** | **`code` + `code_group`** 복합 조건(레거시 `DELETE … WHERE CODE AND CODE_GROUP`). |

- **API·필드 매핑**: [`docs/db-doc/std_base_common_code_mgmt_api.md`](db-doc/std_base_common_code_mgmt_api.md)
- **라우트**: `GET`·`POST`·`DELETE` **`/api/tb-cm-code`** — 구현 [`server/src/lib/queries/std_tbCmCode.mjs`](../server/src/lib/queries/std_tbCmCode.mjs), 진입 [`server/src/routes/byScreen/std_base_common_code_mgmt.mjs`](../server/src/routes/byScreen/std_base_common_code_mgmt.mjs)

## `tb_cm_customer` (거래처 / std_base_vendor_mgmt)

**규칙 원문·BE**: **`project-rules.md` §4.2**, 레거시 **`frmCustomer.cs`**.

| 항목 | 요약 |
|------|------|
| **조회** | `cust_code__like`·`cust_name__like` — 부분 일치(대소문자 무시). 정렬 **`cust_code`**. |
| **저장** | **`UPDATE` → 영향 없으면 `INSERT`** (`cust_code` 키). |
| **삭제** | **`cust_code`** 단일 키. |

- **API·필드 매핑**: [`docs/db-doc/std_base_vendor_mgmt_api.md`](db-doc/std_base_vendor_mgmt_api.md)
- **라우트**: `GET`·`POST`·`DELETE` **`/api/tb-cm-customer`** — [`server/src/lib/queries/std_tbCmCustomer.mjs`](../server/src/lib/queries/std_tbCmCustomer.mjs), [`std_base_vendor_mgmt.mjs`](../server/src/routes/byScreen/std_base_vendor_mgmt.mjs)

## 단위 공정·라인 (보조 API)

**std_base_unit_process_mgmt** — `tb_cm_code` **`code_group = 'UNIT_PROCESS'`** (레거시 `frmUnitProcessMng`). **std_base_unit_process_line_mgmt** — `tb_cm_code` `UNIT_PROCESS_LINE`·`tb_mes_unit_process`·`tb_mes_process_line` 조인.

| Path | 용도 |
|------|------|
| **`GET /api/fn-unit-process`** | `p1` 빈 값 = 전체, 아니면 **`attribute01 LIKE p1%`** (공정 코드 접두). |
| **`GET /api/fn-unit-process-line`** | `UNIT_PROCESS_LINE` 코드 + 공정라인 조인. |

- **구현**: [`server/src/lib/queries/std_fnMesStd.mjs`](../server/src/lib/queries/std_fnMesStd.mjs) (`createFnUnitProcessOnlyRouter` / `createFnUnitProcessLineOnlyRouter`)

## 사용자·메뉴 권한 (`tb_mes_user_authority`, `tb_mes_menu` / `tb_mes_menu_authority`)

**화면**: `std_base_user_permission_mgmt`, `std_base_menu_permission_mgmt` — **레거시** `frmUserAuthority.cs`, `frmMenuAuthMng.cs` 정합.

| Path | 용도 |
|------|------|
| **`GET /api/fn-user-authority-base`** | 권한그룹(`p1`)별 사용자 + 부서·직급 명칭. |
| **`GET /api/fn-cm-user-dept`** | 부서(`p1`)별 사용자(`DEVELOPER` 제외). |
| **`GET /api/fn-user-authority-userid`** | 사용자(`p1`)가 속한 권한그룹 + `USER_CLASS` 명칭. |
| **`GET`/`POST`/`DELETE` `/api/tb-mes-user-authority`** | 권한 행 조회·추가·삭제. |
| **`GET /api/fn-mes-menu-user-class`** | `tb_mes_menu` LEFT JOIN `tb_mes_menu_authority` — 트리·한글 `접근권한`/`실행권한` 컬럼. |
| **`POST`/`DELETE` `/api/tb-mes-menu-authority`** | 메뉴 권한 upsert·삭제. |

- **구현**: [`server/src/lib/queries/std_mesAuthority.mjs`](../server/src/lib/queries/std_mesAuthority.mjs)
- **전제**: `tb_mes_menu`에 **`activated`**(또는 동일 의미) 컬럼이 있어야 조회 `WHERE`가 동작한다. 스키마가 다르면 쿼리·문서를 맞춘다.
- **웹 `screen_id` vs `form_code`**: 운영 DB의 **`form_code`** 는 레거시 **`frm*`** 일 수 있다. **`POST /api/menu-access`** 는 [`server/src/lib/screenFormCodeMap.mjs`](../server/src/lib/screenFormCodeMap.mjs) 로 웹 ID와 레거시 frm을 후보로 `tb_mes_menu`를 찾고, 권한은 조회된 행의 실제 `form_code`로 맞춘다(아래 **기준정보 모듈 화면 ID ↔ 레거시 C#** 표).
- **상세**: [`docs/db-doc/std_base_user_permission_mgmt_api.md`](db-doc/std_base_user_permission_mgmt_api.md), [`docs/db-doc/std_base_menu_permission_mgmt_api.md`](db-doc/std_base_menu_permission_mgmt_api.md)

## 사용자 접속 LOG (`std_base_user_log_inq`)

**레거시**: [`docs/legacy_mes/Basis/_2S_MES_Basis/frmMenuAccessLogs.cs`](legacy_mes/Basis/_2S_MES_Basis/frmMenuAccessLogs.cs) — Oracle **`TB_MES_MenuAccessLogs`**, 조건 **`ACCESSED_DATE BETWEEN :fr AND :to`**, 정렬 **`ORDER BY Accessed_Time`**, 그리드 컬럼 `user_id`, `user_name`, `MENU_NAME`, `Accessed_Time`, `IpAddress`, `COMPUTER_NAME`, `OS_VERSION`.

**PostgreSQL BE**: 기본 **`MES_USER_LOG_COLUMN_MODE=legacy`** — 테이블 **`tb_mes_menuaccesslogs`**, 컬럼 `accessed_date`·`accessed_time`·`menu_name` 등, IP는 이식에 따라 **`ipaddress`**(환경 **`MES_USER_LOG_COL_IP`** 로 변경) — Oracle **`TB_MES_MenuAccessLogs`** 이식본. 다른 물리명·컬럼만 있으면 **`MES_USER_LOG_TABLE`** 또는 **`MES_USER_LOG_COLUMN_MODE=snake`** 및 **`MES_USER_LOG_DATE_MODE`** / **`MES_USER_LOG_ORDER_MODE`** / **`MES_USER_LOG_TIME_COLUMN`**.

| 모드 | 예상 테이블·컬럼 |
|------|------------------|
| **legacy**(기본) | `tb_mes_menuaccesslogs` + `accessed_date`·`accessed_time`·`menu_name` 등 · `user_name` 없으면 **`tb_cm_user`** 조인 |
| **snake** | `tb_mes_user_access_log` 등 + `access_time` / `accessed_date` / `accessed_time` 조합 |

- **API**: `GET /api/user-access-logs` — [`server/src/lib/queries/std_userAccessLog.mjs`](../server/src/lib/queries/std_userAccessLog.mjs)
- **상세**: [`docs/db-doc/std_base_user_log_inq_api.md`](db-doc/std_base_user_log_inq_api.md)

## 기준설정(cfg) — 라우트·택트·포장·모델매핑 (조회)

**화면**: `std_cfg_router_mgmt`, `std_cfg_prod_router_mgmt`, `std_cfg_tact_time_mgmt`, `std_cfg_packing_unit_mgmt` — MDI 기준 레거시는 각각 **`frmRouteManagement`**, **`frmProdRouteManagement`**, **`frmProdTactTimeManagement`**, **`frmPackingUnitMng`** ([`frmMDIMain.cs`](legacy_mes/Basis/_2S_MES_Basis/frmMDIMain.cs)). UI는 PNG·샘플 데이터 위주이며 **데이터 연동은 `cfgMesApi.ts`** 로 점진 적용한다.

| Path | 용도 |
|------|------|
| **`GET /api/cfg/model-master`** | `process`·`model_code`·`model_name__prefix` 필터 — 모델 마스터 + 거래처·품목분류·제품구분 공통코드. |
| **`GET /api/cfg/routes`** | `model_code` — `tb_mes_route` + 단위공정 명. |
| **`GET /api/cfg/unit-processes`** | `tb_mes_unit_process` 목록. |
| **`GET /api/cfg/tact-times`** | `process`·`work_side`·`model_code` — `LINE` 공통코드 + `tb_mes_tact_time`. |
| **`GET /api/cfg/packing-units`** | `model_code` — `tb_mes_common_value` `ASSY_PACKING_UNIT`. |
| **`GET /api/cfg/model-mapping`** | `kind=model\|revision` — `MODEL_MAPPING` / `REVISION_MAPPING` 맵핑 조회. |

- **구현**: [`server/src/lib/queries/std_cfgMes.mjs`](../server/src/lib/queries/std_cfgMes.mjs)·[`std_cfgMesMutations.mjs`](../server/src/lib/queries/std_cfgMesMutations.mjs), **`renderer/src/lib/cfgMesApi.ts`**

## 레거시 추출 — 공정라인·라인·단위공정라인·cfg 저장 (미완 화면 대비)

C# **`frmProcessLineMng`**, **`frmLineMng`**, **`frmUnitProcessLineMng`**, **`frmPackingUnitMng`**, **`frmTactTimeManagement`**, **`frmRouteMng`**, **`frmModelRevisionMapping`** 등의 DB 접근을 PostgreSQL용으로 옮긴 **추가 라우트**. UI가 아직 PNG·샘플 위주여도 BE만으로 검증 가능하다.

| 구분 | Path (요약) | 구현 파일 |
|------|-------------|-----------|
| **공정라인** | `GET /api/process-line/…`, `POST /api/process-line/save-for-line` | [`std_processLineMes.mjs`](../server/src/lib/queries/std_processLineMes.mjs) |
| **LINE 공통코드** | **`/api/line-codes`** | [`std_lineCodeMes.mjs`](../server/src/lib/queries/std_lineCodeMes.mjs) |
| **UNIT_PROCESS_LINE 공통코드** | **`/api/unit-process-line-codes`** | [`std_unitProcessLineCodeMes.mjs`](../server/src/lib/queries/std_unitProcessLineCodeMes.mjs) |
| **cfg 저장** | `POST /api/cfg/…` | [`std_cfgMesMutations.mjs`](../server/src/lib/queries/std_cfgMesMutations.mjs) |

- **참고**: Oracle **`V_UNIT_PROCESS_LINE`** 에 해당하는 뷰가 없을 수 있어, 단위공정라인 조인 목록은 **`tb_cm_code`·`tb_mes_unit_process`·`tb_mes_process_line`** 조인으로 제공한다. 운영 DB 컬럼 타입이 다르면 쿼리를 맞춘다.

## 기준정보 모듈 화면 ID ↔ 레거시 C# ↔ BE ↔ db-doc

[`manual.csv`](../renderer/src/data/manual.csv) 에서 **모듈명=기준정보** 인 14화면. 레거시 폼은 [`docs/legacy_mes/Basis/_2S_MES_Basis/frmMDIMain.cs`](legacy_mes/Basis/_2S_MES_Basis/frmMDIMain.cs) 의 `OpenChildWindow` 기준.

HTTP는 [`server/src/index.mjs`](../server/src/index.mjs) 가 [`server/src/routes/byScreen/std_<screenId>.mjs`](../server/src/routes/byScreen/) 를 `app.use` 한다. **SQL 본문**은 [`server/src/lib/queries/*.mjs`](../server/src/lib/queries/) .

| screenId | 레거시 `frm` | `routes/byScreen/` | 주요 `lib/queries/` | db-doc |
|----------|----------------|---------------------|----------------------|--------|
| `std_base_common_code_mgmt` | `frmCommonCode` | `std_base_common_code_mgmt.mjs` | `std_tbCmCode.mjs` | [`std_base_common_code_mgmt_api.md`](db-doc/std_base_common_code_mgmt_api.md) |
| `std_base_user_mgmt` | `frmUser` | `std_base_user_mgmt.mjs` | `std_tbCmUser.mjs` | [`std_base_user_mgmt_api.md`](db-doc/std_base_user_mgmt_api.md) |
| `std_base_user_permission_mgmt` | `frmUserAuthority` | `std_base_user_permission_mgmt.mjs` | `std_mesAuthority.mjs` | [`std_base_user_permission_mgmt_api.md`](db-doc/std_base_user_permission_mgmt_api.md) |
| `std_base_menu_permission_mgmt` | `frmMenuAuthMng` | `std_base_menu_permission_mgmt.mjs` | `std_mesAuthority.mjs` | [`std_base_menu_permission_mgmt_api.md`](db-doc/std_base_menu_permission_mgmt_api.md) |
| `std_base_unit_process_mgmt` | `frmUnitProcessMng` | `std_base_unit_process_mgmt.mjs` | `std_fnMesStd.mjs` | [`std_base_unit_process_mgmt_api.md`](db-doc/std_base_unit_process_mgmt_api.md) |
| `std_base_unit_process_line_mgmt` | `frmUnitProcessLineMng` | `std_base_unit_process_line_mgmt.mjs` | `std_fnMesStd.mjs`, `std_unitProcessLineCodeMes.mjs` | [`std_base_unit_process_line_mgmt_api.md`](db-doc/std_base_unit_process_line_mgmt_api.md) |
| `std_base_process_line_mgmt` | `frmProcessLineMng` (`msBasic_LineMng`) | `std_base_process_line_mgmt.mjs` | `std_lineCodeMes.mjs`(`tb_cm_code` LINE), `std_fnMesStd.mjs`(프론트) | [`std_base_process_line_mgmt_api.md`](db-doc/std_base_process_line_mgmt_api.md) |
| `std_base_process_line_config_mgmt` | `frmProcessLineConstMng` | `std_base_process_line_config_mgmt.mjs` | `std_processLineMes.mjs`, `std_unitProcessLineCodeMes.mjs` | [`std_base_process_line_config_mgmt_api.md`](db-doc/std_base_process_line_config_mgmt_api.md) |
| `std_base_vendor_mgmt` | `frmCustomer` | `std_base_vendor_mgmt.mjs` | `std_tbCmCustomer.mjs` | [`std_base_vendor_mgmt_api.md`](db-doc/std_base_vendor_mgmt_api.md) |
| `std_base_user_log_inq` | `frmMenuAccessLogs` | `std_base_user_log_inq.mjs` | `std_userAccessLog.mjs` | [`std_base_user_log_inq_api.md`](db-doc/std_base_user_log_inq_api.md) |
| `std_cfg_router_mgmt` | `frmRouteManagement` | `std_cfg_router_mgmt.mjs` | `std_cfgMes.mjs`, `std_cfgMesMutations.mjs` | [`std_cfg_router_mgmt_api.md`](db-doc/std_cfg_router_mgmt_api.md) |
| `std_cfg_prod_router_mgmt` | `frmProdRouteManagement` | `std_cfg_prod_router_mgmt.mjs` | ↑ | [`std_cfg_prod_router_mgmt_api.md`](db-doc/std_cfg_prod_router_mgmt_api.md) |
| `std_cfg_tact_time_mgmt` | `frmProdTactTimeManagement` | `std_cfg_tact_time_mgmt.mjs` | ↑ | [`std_cfg_tact_time_mgmt_api.md`](db-doc/std_cfg_tact_time_mgmt_api.md) |
| `std_cfg_packing_unit_mgmt` | `frmPackingUnitMng` | `std_cfg_packing_unit_mgmt.mjs` | ↑ | [`std_cfg_packing_unit_mgmt_api.md`](db-doc/std_cfg_packing_unit_mgmt_api.md) |

- **공통 SQL·레이어**: [`server/src/lib/queries/README.md`](../server/src/lib/queries/README.md)
