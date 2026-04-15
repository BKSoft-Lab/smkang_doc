# std_base_user_log_inq — DB·HTTP API 상세 정리

화면 ID: `std_base_user_log_inq`  
구현: [`renderer/src/screens/std/std_base_user_log_inq.tsx`](../../renderer/src/screens/std/std_base_user_log_inq.tsx)  
베이스 URL: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` (STD 전용 BE, 기본 포트 8787)  
로그 API: [`renderer/src/lib/userAccessLogApi.ts`](../../renderer/src/lib/userAccessLogApi.ts)  
BE: [`server/src/lib/queries/std_userAccessLog.mjs`](../../server/src/lib/queries/std_userAccessLog.mjs)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmMenuAccessLogs.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmMenuAccessLogs.cs) — MDI [`frmMDIMain`](../legacy_mes/Basis/_2S_MES_Basis/frmMDIMain.cs) `msBasic_MenuAccessLogs` → `frmMenuAccessLogs`

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/user-access-logs`** → `vite.config.ts` 프록시 → STD BE. |
| **Electron** | `USER_MGMT_API_BASE` 등으로 주입된 베이스 + path. |

### 1.1 레거시 Oracle (참고)

| 항목 | 내용 |
|------|------|
| **테이블** | **`TB_MES_MenuAccessLogs`** |
| **조회 SQL** | `SELECT * FROM TB_MES_MenuAccessLogs WHERE ACCESSED_DATE BETWEEN :fr AND :to ORDER BY Accessed_Time` |
| **그리드** | `user_id`, `user_name`, `MENU_NAME`, `Accessed_Time`, `IpAddress`, `COMPUTER_NAME`, `OS_VERSION` |

### 1.2 PostgreSQL BE — 테이블·컬럼 매핑 env

| 환경변수 | 기본 | 의미 |
|----------|------|------|
| **`MES_USER_LOG_COLUMN_MODE`** | `legacy` | **`legacy`**: Oracle 이식 PG 스키마 — 테이블 **`tb_mes_menuaccesslogs`**, 컬럼 `accessed_date`·`accessed_time`·`menu_name`·`computer_name`·`os_version`·`user_id`·`user_name`, IP는 **`MES_USER_LOG_COL_IP`**(기본 **`ipaddress`**, Oracle `IpAddress` 이식). **`snake`**: 별도 테이블(기본 `tb_mes_user_access_log`) + 아래 `DATE`/`ORDER`/`TIME_COLUMN`. |
| **`MES_USER_LOG_TABLE`** | 모드별 기본 | `legacy` → `tb_mes_menuaccesslogs`, `snake` → `tb_mes_user_access_log`. |
| **`MES_USER_LOG_COL_IP`** | `ipaddress` | **`legacy`일 때만** — 로그 테이블의 IP 컬럼명. `ip_address` 로 이식했으면 `MES_USER_LOG_COL_IP=ip_address`. |
| **`MES_USER_LOG_DATE_MODE`** | `access_time` | **`snake`일 때만** — 일자 WHERE: `access_time` \| **`accessed_date`**. |
| **`MES_USER_LOG_ORDER_MODE`** | `access_time` | **`snake`일 때만** — `ORDER BY`: `access_time` \| `accessed_time` \| `accessed_date`. |
| **`MES_USER_LOG_TIME_COLUMN`** | `access_time` | **`snake`일 때만** — 응답 JSON `access_time` 소스 컬럼: `access_time` \| `accessed_time`. |

`snake` 모드에서만 예: `MES_USER_LOG_DATE_MODE=accessed_date`, `MES_USER_LOG_ORDER_MODE=accessed_time`, `MES_USER_LOG_TIME_COLUMN=accessed_time`. `legacy`에서는 Oracle 이식본 기준으로 `accessed_date`·`accessed_time` 등으로 고정된다.

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 접속 로그 목록 | GET | `/api/user-access-logs` | 조회일 범위·선택 사용자 ID 부분 일치 |
| 메뉴 진입 권한·접속 로그 | POST | `/api/menu-access` | `screen_id`(≈`form_code`) 기준 권한 확인 — **허용**이고 `MES_USER_LOG_COLUMN_MODE=legacy`일 때만 `tb_mes_menuaccesslogs` INSERT |

---

## 3. GET — `/api/user-access-logs`

### 3.1 호출 코드

- **파일**: [`userAccessLogApi.ts`](../../renderer/src/lib/userAccessLogApi.ts) — `fetchUserAccessLogs`

### 3.2 URL·쿼리

```
GET {base}/api/user-access-logs?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD&user_id__like=
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `date_from` | **필수** | 시작일 |
| `date_to` | **필수** | 종료일 |
| `user_id__like` | 선택 | `user_id` 부분 일치(대소문자 무시) |

### 3.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| 조회 버튼 | `date_from`·`date_to`·필터 | `onFilterSearch` |

### 3.4 응답 처리

- BE는 `user_id`, `user_name`, `menu_name`, `access_time`, `ip_address`, `computer_name`, `os_version` 행 배열.
- `user_name`이 비어 있으면 **`tb_cm_user`** LEFT JOIN으로 보강.

### 3.5 에러

| 원인 | 동작 |
|------|------|
| 테이블 미존재·컬럼 불일치 | **500** + `friendlyPgError`·`hint` |

---

## 4. POST — `/api/menu-access`

### 4.1 호출 코드

- **파일**: [`userAccessLogApi.ts`](../../renderer/src/lib/userAccessLogApi.ts) — `postMenuAccess`
- **화면 진입**: [`ScreenPlaceholderPage.tsx`](../../renderer/src/pages/ScreenPlaceholderPage.tsx) — `ScreenContentByScreenId` 마운트 시(로그인·비 DEVELOPER)

### 4.2 Body(JSON)

| 필드 | 필수 | 의미 |
|------|------|------|
| `user_id` | O | 세션 사용자 ID |
| `screen_id` | O | 웹 화면 ID — DB `tb_mes_menu.form_code`가 레거시 **`frm*`** 인 경우가 많아 BE가 [`screenFormCodeMap.mjs`](../../server/src/lib/screenFormCodeMap.mjs) 으로 후보 조회 후 실제 행의 `form_code`로 권한 판단 |
| `computer_name` | 선택 | 클라이언트(예: `location.hostname`) |
| `os_version` | 선택 | 예: `navigator.userAgent` |

### 4.3 동작

- **`user_id` = `DEVELOPER`**: `{ allowed: true, logged: false, skip_log: true }` — 권한·INSERT 생략.
- **그 외**: `tb_mes_menu`에서 `form_code` 일치 행 조회 → 없으면 `{ allowed: false, reason: 'no_menu' }`. `tb_mes_menu_authority`·`tb_mes_user_authority`로 `access_power` 판단 — **메뉴 행 `form_code`(frm*)** 와 동일 비교에 더해 **웹 `screen_id`(std*)** 와의 일치 OR(권한 테이블에 웹 ID만 넣은 경우). **접근 거부**(`no_access` 등) 시에는 INSERT하지 않음(`logged: false`). INSERT는 **`MES_USER_LOG_COLUMN_MODE=legacy`** 이고 **`access_power=Y`(허용)** 일 때만(`logged: true`); INSERT 값은 **`MES_USER_LOG_INS_MAX_OS`** 등으로 **문자열 상한**(기본 OS 50자 등) — 긴 `navigator.userAgent`로 `varchar` **22001** 방지.

### 4.4 응답(JSON)

| 필드 | 의미 |
|------|------|
| `allowed` | 접근 허용 여부 |
| `menu_name` | 메뉴명(조회 시) |
| `reason` | `no_menu` \| `no_access` 등 |
| `logged` | 로그 테이블 INSERT 수행 여부 |

---

## 5. 테이블·응답 필드

| 필드 | 비고 |
|------|------|
| `user_id` | |
| `user_name` | 로그 테이블 또는 `tb_cm_user` |
| `menu_name` | 레거시 `MENU_NAME` |
| `access_time` | 레거시 `Accessed_Time` / PG `access_time` 또는 `accessed_time` 매핑 |
| `ip_address` | |
| `computer_name` | |
| `os_version` | |

---

## 6. 그리드·상세 UI 매핑

| 그리드 인덱스 | 컬럼명 | DB·비고 |
|---------------|--------|---------|
| 0 | 사용자 ID | `user_id` |
| 1 | 사용자 명 | `user_name` |
| 2 | 메뉴 | `menu_name` |
| 3 | 접속일시 | `access_time` |
| 4 | IP 주소 | `ip_address` |
| 5 | 컴퓨터명 | `computer_name` |
| 6 | OS 버전 | `os_version` |

---

## 7. 보완·주의점

1. Oracle **`TB_MES_MenuAccessLogs`** 를 PG에 **`tb_mes_menuaccesslogs`** 로 두었는지 확인. 물리명·컬럼이 다르면 **VIEW**로 맞추거나 **`MES_USER_LOG_COLUMN_MODE=snake`** 및 **env**로 지정한다.
2. 레거시는 **문자열 결합 SQL** — BE는 **파라미터 바인딩**만 사용한다.

---

## 8. 관련 소스 파일

| 파일 (경로) | 비고 |
|-------------|------|
| [`server/src/lib/queries/std_userAccessLog.mjs`](../../server/src/lib/queries/std_userAccessLog.mjs) | GET·POST 구현 |
| [`docs/DATABASE.md`](../DATABASE.md) | 스키마 메모 |
| [`server/README.md`](../../server/README.md) | 엔드포인트 요약 |
