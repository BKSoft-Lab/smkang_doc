# std_base_process_line_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_process_line_mgmt`  
구현: [`renderer/src/screens/std/std_base_process_line_mgmt.tsx`](../../renderer/src/screens/std/std_base_process_line_mgmt.tsx)  
베이스 URL: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()`  
LINE 마스터 API: [`renderer/src/lib/lineMasterApi.ts`](../../renderer/src/lib/lineMasterApi.ts) — `fetchLineMasterLines`, `postLineMasterRow`, `deleteLineMasterCode`  
공정 콤보: [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions('PROCESS', 'disp_seq')`  
대표 단위공정 콤보: [`renderer/src/lib/fnUnitProcessApi.ts`](../../renderer/src/lib/fnUnitProcessApi.ts) — `fetchFnUnitProcess(p1)` (`GET /api/fn-unit-process`)  
BE 진입: [`server/src/routes/byScreen/std_base_process_line_mgmt.mjs`](../../server/src/routes/byScreen/std_base_process_line_mgmt.mjs) — [`std_lineCodeMes.mjs`](../../server/src/lib/queries/std_lineCodeMes.mjs) — `GET`/`POST`/`DELETE` **`/api/line-codes`**  
PNG: [`docs/image/std_base_process_line_mgmt.png`](../image/std_base_process_line_mgmt.png)  
레거시: [`docs/legacy_mes/Basis/_2S_MES_Basis/frmProcessLineMng.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmProcessLineMng.cs) — `V_MES_PROCESS_LINE` 조회·`TB_CM_CODE` LINE 저장  

**참고**: 라인별 **단위공정라인 순서**(`tb_mes_process_line`)는 [`std_processLineMes.mjs`](../../server/src/lib/queries/std_processLineMes.mjs) — 본 화면 주 기능과 별개.

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등으로 주입된 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/line-codes?process=SMT` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 공정 콤보(조회줄·그리드) | GET | `/api/fn-cm-code` | `p1=PROCESS`, `p2=disp_seq` — 마운트 시 |
| LINE 목록 | GET | `/api/line-codes` | `tb_cm_code` `LINE` — 조회줄 공정 필터 |
| LINE 저장 | POST | `/api/line-codes` | 행 단위 INSERT/UPDATE |
| LINE 삭제 | DELETE | `/api/line-codes` | `?code=` |
| 단위공정 목록(행별 콤보) | GET | `/api/fn-unit-process` | `p1=<공정코드>` — `attribute01 LIKE p1%` |

---

## 3. GET — `/api/fn-cm-code` (`p1=PROCESS`)

### 3.1 호출 코드

- **파일·함수**: [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions('PROCESS', 'disp_seq')`
- **화면**: 마운트 시 `useEffect` 1회 — 조회줄·그리드 **공정** 콤보

### 3.2 URL·쿼리

```
GET {base}/api/fn-cm-code?p1=PROCESS&p2=disp_seq
```

### 3.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **최초 마운트** | 위 인자 | `useEffect` |

### 3.4 응답 처리

- `{ value, label }[]` → 조회줄·그리드 공정 `PlainSelect`

### 3.5 에러

| 원인 | 동작 |
|------|------|
| 실패 | `setProcessOptions([])` |

---

## 4. GET — `/api/line-codes`

### 4.1 호출 코드

- **파일·함수**: [`lineMasterApi.ts`](../../renderer/src/lib/lineMasterApi.ts) — `fetchLineMasterLines(process?)`

### 4.2 URL·쿼리

**전체:**

```
GET {base}/api/line-codes
```

**공정 필터:**

```
GET {base}/api/line-codes?process=<공정코드>
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `process` | **빈 값·`ALL` 아님** | `attribute01 = $1` **또는** `attribute02 = $1`(이관 데이터 호환) |

### 4.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **마운트** | 조회줄 공정(`processFilter`) | `useEffect` → `loadGrid` |
| **Search** | 동일 | `onFilterSearch` / 툴바 Search |

### 4.4 응답 처리

- 행: `line_code`, `line_name`, `process`, `std_unit_process`, `prod_plan_yn`, `auto_client_yn`, `process_code`(=공정·`attribute01`), `code_desc` → 그리드 7열
- 단위공정 콤보용: 응답에 등장하는 **공정** 값마다 `GET /api/fn-unit-process` 프리패치

### 4.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | 배너 메시지, 그리드 비움 |

---

## 5. POST — `/api/line-codes`

### 5.1 호출 코드

- **파일·함수**: [`lineMasterApi.ts`](../../renderer/src/lib/lineMasterApi.ts) — `postLineMasterRow`
- **화면**: 툴바/조회줄 **Save** — 그리드에 값이 있는 **모든 행** 순차 POST

### 5.2 URL·바디

```
POST {base}/api/line-codes
Content-Type: application/json
```

### 5.3 JSON 필드

| 필드 | 출처·비고 |
|------|-----------|
| `code` | 라인코드(필수) |
| `code_name` | 라인명(필수) |
| `process` 또는 `process_code` | 공정 → `attribute01` |
| `std_unit_process` | 대표 단위공정 → `attribute02` |
| `prod_plan_yn` | 생산계획 Y/N → `attribute03` |
| `auto_client_yn` | 수율실적(레거시 `AUTO_CLIENT_YN`) → `attribute04` |
| `code_desc` | 비고 |
| `created_by` | (선택) |

### 5.4 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **Save** | 라인코드 비어 있으면 클라이언트에서 차단 | `runSave` |

### 5.5 응답 처리

- `{ ok: true }` → 성공 배너 → `loadGrid` 재조회

### 5.6 에러

| 원인 | 동작 |
|------|------|
| 400 `code와 code_name은 필수` | 배너 |
| 500 | `friendlyPgError` |

---

## 6. DELETE — `/api/line-codes`

### 6.1 호출 코드

- **파일·함수**: [`lineMasterApi.ts`](../../renderer/src/lib/lineMasterApi.ts) — `deleteLineMasterCode(code)`

### 6.2 URL·쿼리

```
DELETE {base}/api/line-codes?code=<라인코드>
```

### 6.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **Delete** | 라인코드 있음 — `window.confirm` 후 | 툴바 Delete |
| **미저장 신규 행** | 라인코드 없음 | 그리드에서 행만 제거 |

### 6.4 에러

| 원인 | 동작 |
|------|------|
| 404 | 배너 |

---

## 7. GET — `/api/fn-unit-process`

### 7.1 호출 코드

- **파일·함수**: [`fnUnitProcessApi.ts`](../../renderer/src/lib/fnUnitProcessApi.ts) — `fetchFnUnitProcess(p1)`

### 7.2 URL·쿼리

```
GET {base}/api/fn-unit-process?p1=<공정코드>
```

### 7.3 응답 처리

- 그리드 행 → `code`(단위공정코드), `code_name` → **대표 단위공정** `PlainSelect` 옵션(공정별 캐시)

---

## 8. 테이블·응답 필드 (`tb_cm_code` `LINE`)

| 필드 | 비고 |
|------|------|
| `code` | 라인코드 |
| `code_name` | 라인명 |
| `attribute01` | 공정(PROCESS) |
| `attribute02` | 대표 단위공정(STD_UNIT_PROCESS) |
| `attribute03` | 생산계획 Y/N |
| `attribute04` | 수율실적(AUTO_CLIENT_YN) |
| `code_desc` | 비고 |

---

## 9. 그리드·상세 UI 매핑

| 그리드 인덱스 | 컬럼명 | DB·비고 |
|---------------|--------|---------|
| 0 | 라인코드 | `code` |
| 1 | 라인명 | `code_name` |
| 2 | 공정 | `attribute01` — PROCESS 콤보 |
| 3 | 대표 단위공정 | `attribute02` — `fn-unit-process` 옵션 |
| 4 | 생산계획 | `attribute03` — Y/N |
| 5 | 수율실적 | `attribute04` — Y/N |
| 6 | 비고 | `code_desc` |

---

## 10. 보완·주의점(제안)

1. **`std_processLineMes.mjs`**(`save-for-line` 등)는 **공정라인 순서**용 — 본 화면과 혼동하지 말 것.
2. 공정 필터·이관 데이터: `GET`은 `attribute01` 또는 `attribute02`가 공정과 같을 때 매칭한다.
3. 저장 시 **라인코드·라인명** 필수 — 빈 라인코드 행은 저장 불가.

---

## 11. 관련 소스 파일

| 파일 (경로) | 비고 |
|-------------|------|
| [`renderer/src/screens/std/std_base_process_line_mgmt.tsx`](../../renderer/src/screens/std/std_base_process_line_mgmt.tsx) | 화면 |
| [`renderer/src/lib/lineMasterApi.ts`](../../renderer/src/lib/lineMasterApi.ts) | HTTP 래퍼 |
| [`server/src/routes/byScreen/std_base_process_line_mgmt.mjs`](../../server/src/routes/byScreen/std_base_process_line_mgmt.mjs) | `byScreen` 진입 |
| [`server/src/lib/queries/std_lineCodeMes.mjs`](../../server/src/lib/queries/std_lineCodeMes.mjs) | BE |
| [`server/src/lib/queries/std_fnMesStd.mjs`](../../server/src/lib/queries/std_fnMesStd.mjs) | `fn-unit-process` |
| [`renderer/src/screens/std/registry.ts`](../../renderer/src/screens/std/registry.ts) | 레지스트리 |
