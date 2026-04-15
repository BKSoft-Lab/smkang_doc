# 기준정보 STD BE 스모크

## 실행

1. `server/.env` 로 DB 연결 설정 후 BE 기동: 루트에서 `npm run dev:be` (포트 기본 **8787**).
2. 다른 터미널에서: **`npm run smoke:be`**

## 환경 변수

| 변수 | 설명 |
|------|------|
| `SMOKE_BASE` | 기본 `http://127.0.0.1:8787` — 원격 BE 검증 시 `http://호스트:포트` |
| `PORT` | `SMOKE_BASE` 미지정 시 호스트 URL 조합에 사용(기본 8787) |

## 스크립트

- [`scripts/smoke-std-be.mjs`](../scripts/smoke-std-be.mjs) — `GET` 일부 경로로 **200** 응답 확인. `/api/health` 만 **503**(DB 끊김) 허용.

## 화면별 수동 체크(참고)

| screenId | 대표 GET (예) |
|----------|----------------|
| `std_base_common_code_mgmt` | `/api/tb-cm-code`, `/api/fn-cm-code?p1=LINE` |
| `std_base_user_mgmt` | `/api/users` |
| `std_base_vendor_mgmt` | `/api/tb-cm-customer` |
| `std_base_unit_process_mgmt` | `/api/fn-unit-process` |
| `std_base_unit_process_line_mgmt` | `/api/fn-unit-process-line`, `/api/unit-process-line-codes` |
| `std_base_user_permission_mgmt` | `/api/fn-user-authority-base?p1=` … |
| `std_base_menu_permission_mgmt` | `/api/fn-mes-menu-user-class?p1=` … |
| `std_base_user_log_inq` | `/api/user-access-logs?date_from=&date_to=` |
| `std_cfg_*` | `/api/cfg/model-master`, `/api/cfg/routes?model_code=` … |
| `std_base_process_line_config_mgmt` | `/api/process-line/unit-process-line-join`, `/api/line-codes` |

상세 Path는 [`docs/DATABASE.md`](DATABASE.md)·[`server/README.md`](../server/README.md) 참고.
