# std_base_unit_process_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_unit_process_mgmt`  
구현: [`renderer/src/screens/std/std_base_unit_process_mgmt.tsx`](../../renderer/src/screens/std/std_base_unit_process_mgmt.tsx)  
BE 베이스: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/fn-cm-code`**, **`/api/fn-unit-process`**, **`POST /api/tb-cm-code`**  
공통코드(콤보): [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions`  
단위 공정 그리드: [`renderer/src/lib/fnUnitProcessApi.ts`](../../renderer/src/lib/fnUnitProcessApi.ts) — `fetchFnUnitProcess`  
저장(그리드 → `UNIT_PROCESS`): [`renderer/src/lib/unitProcessMgmtApi.ts`](../../renderer/src/lib/unitProcessMgmtApi.ts) — `saveUnitProcessGridRows` → [`postTbCmCode`](../../renderer/src/lib/tbCmCodeApi.ts)  
공통코드 그룹: 조회줄·그리드 **공정** `p1=PROCESS`; 그리드 **포장타입** `p1=ASSY_PACKING_UNIT` (`tb_cm_code.code_group` 가정)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmUnitProcessMng.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmUnitProcessMng.cs)

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등으로 주입된 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/fn-unit-process?p1=` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 공정 콤보(조회줄·그리드) | GET | `/api/fn-cm-code` | `p1=PROCESS`, `p2=disp_seq` |
| 포장타입 콤보(그리드) | GET | `/api/fn-cm-code` | `p1=ASSY_PACKING_UNIT`, `p2=disp_seq` |
| 단위 공정 그리드 | GET | `/api/fn-unit-process` | `p1` 공정 조건(빈 값=전체) |
| 단위 공정 저장(행별 upsert) | POST | `/api/tb-cm-code` | `code_group=UNIT_PROCESS` — `unitProcessMgmtApi` |

**저장·조회줄 Save**: `MesSearchSaveBar` **Save**·모듈 툴바 **save** → `runSave` → 전체 `rawRows` 순회 `postTbCmCode`. 성공 후 `loadGrid(processFilter)`로 `GET /api/fn-unit-process` 재조회.

---

## 3. GET — `/api/fn-cm-code` (`p1=PROCESS`)

### 3.1 호출 코드

- **파일·함수**: [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions('PROCESS', 'disp_seq')`
- **화면**: [`std_base_unit_process_mgmt.tsx`](../../renderer/src/screens/std/std_base_unit_process_mgmt.tsx) — 마운트 시 `useEffect` 1회

### 3.2 URL·쿼리

```
GET {base}/api/fn-cm-code?p1=PROCESS&p2=disp_seq
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `p1` | **항상** | `PROCESS` — `tb_cm_code.code_group` 등 서버 정의 |
| `p2` | **항상** | `disp_seq` — 정렬·표시 순 |

### 3.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **최초 마운트** | `fetchFnCmCodeOptions('PROCESS', 'disp_seq')` | `useEffect` (빈 deps) |
| 이후 | 자동 재호출 없음 | — |

### 3.4 응답 처리

- JSON 배열 또는 래핑 객체(`data` / `rows` / `result` / `items` / `records`) 중 첫 배열.
- 행 `{ code, code_name }` → `{ value: code, label: code_name }` (`rowToOption`). 중복 `value`는 **첫 항목만** 유지.
- **실패 시** `setProcessOptions([])` — 그리드 공정 콤보 옵션 없음.

### 3.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`GET fn_cm_code ${status}: …\`)` |
| 화면 `catch` | `setProcessOptions([])` — **배너 없음**(공정 콤보만 비움) |

---

## 4. GET — `/api/fn-cm-code` (`p1=ASSY_PACKING_UNIT`)

### 4.1 호출 코드

- **파일·함수**: [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions(PACK_TYPE_CM_GROUP, 'disp_seq')`  
  `PACK_TYPE_CM_GROUP = 'ASSY_PACKING_UNIT'` (화면 상수)

### 4.2 URL·쿼리

```
GET {base}/api/fn-cm-code?p1=ASSY_PACKING_UNIT&p2=disp_seq
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `p1` | **항상** | `ASSY_PACKING_UNIT` — 서버 그룹명이 다르면 화면 상수만 교체 |
| `p2` | **항상** | `disp_seq` |

### 4.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **최초 마운트** | 위 인자 | `useEffect` (빈 deps) |
| 이후 | 자동 재호출 없음 | — |

### 4.4 응답·UI

- `fetchFnCmCodeOptions` 동일 처리 → `{ value, label }[]`.
- 응답 **0건**이면 `setPackTypeOptions(FALLBACK_PACK_TYPE_OPTIONS)` — 매거진·박스·트레이·출하(라벨 동일).
- **catch** 시에도 동일 폴백.

### 4.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw` → `catch` → `FALLBACK_PACK_TYPE_OPTIONS` |
| 네트워크 등 | 동일 폴백 |

---

## 5. GET — `/api/fn-unit-process`

### 5.1 호출 코드

- **파일·함수**: [`fnUnitProcessApi.ts`](../../renderer/src/lib/fnUnitProcessApi.ts) — `fetchFnUnitProcess(p1)`

### 5.2 URL·쿼리

**전체 조회:**

```
GET {base}/api/fn-unit-process?p1=
```

**공정 코드 조건(예: SMT):**

```
GET {base}/api/fn-unit-process?p1=SMT
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `p1` | **항상** | 조회줄 **공정** `PlainSelect` 값. **빈 문자열** = 전체 |

### 5.2.1 BE·DB (PostgreSQL)

- **구현**: [`server/src/lib/queries/std_fnMesStd.mjs`](../../server/src/lib/queries/std_fnMesStd.mjs) `createFnUnitProcessOnlyRouter`.
- **테이블**: **`tb_cm_code`** — `code_group = 'UNIT_PROCESS'` (Oracle **`TB_CM_CODE`** / 레거시 `frmUnitProcessMng.cs` `lPrcRetrieveProcessInfoData` 와 동일 출처).
- **필터**: `p1`이 비어 있지 않으면 `attribute01::text LIKE p1 || '%'` (접두 일치). 빈 `p1`이면 공정 조건 없음.
- **정렬**: `attribute01`, `disp_seq`(숫자로 해석 가능하면 수치 순·아니면 999 취급), `code`.
- **응답 행 매핑**: `code`·`code_name`·`attribute01`·`attribute02`~`attribute04`·`disp_seq`·`code_desc` → JSON `code`·`code_name`·`attribute01`·`tact_time`·`pack_unit`·`pack_type`·`disp_seq`·`remark`.

### 5.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| 조회줄 **Search** 클릭 | `loadGrid(processFilter)` | `onFilterSearch` — `processFilter`가 `p1` |
| **최초 마운트** | 자동 호출 **없음** | 사용자가 Search 전까지 그리드 비어 있음 |

### 5.4 응답 처리

- JSON 배열 또는 래핑 객체(`data` / `rows` / `result` / `items` / `records`) 중 첫 배열.
- 각 행 `rowToGridRow` → **8열 문자열 배열** (아래 필드 표).
- `p1`이 비어 있지 않은데 행 JSON에 공정이 비어 있으면 **열0**에 `p1` 보강.

### 5.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`GET fn_unit_process ${status}: …\`)` |
| 화면 | `setErrorMsg`, `setRawRows([])` |

---

## 6. POST — `/api/tb-cm-code` (UNIT_PROCESS 저장)

### 6.1 호출 코드

- **파일·함수**: [`unitProcessMgmtApi.ts`](../../renderer/src/lib/unitProcessMgmtApi.ts) — `saveUnitProcessGridRows(rawRows)` → 행별 `postTbCmCode(buildUnitProcessTbCmCodeBody(row))` ([`tbCmCodeApi.ts`](../../renderer/src/lib/tbCmCodeApi.ts))
- **화면**: [`std_base_unit_process_mgmt.tsx`](../../renderer/src/screens/std/std_base_unit_process_mgmt.tsx) — `runSave`

### 6.2 URL·본문

```
POST {base}/api/tb-cm-code
Content-Type: application/json
```

| JSON 필드 | 출처·비고 |
|-----------|-----------|
| `code_group` | **항상** `'UNIT_PROCESS'` |
| `code` | 그리드 열 1 — 단위 공정코드(필수) |
| `code_name` | 열 2 — 단위 공정명(필수) |
| `attribute01` | 열 0 — 공정(필수) |
| `attribute02` | 열 3 — Tact Time |
| `attribute03` | 열 4 — 포장단위 |
| `attribute04` | 열 5 — 포장타입 |
| `attribute05` | `''` |
| `disp_seq` | 열 6 — 빈 값이면 숫자 `0`으로 전송 |
| `activated` | `'Y'` |
| `code_desc` | 열 7 — 비고 |

### 6.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| 조회줄 **Save** 또는 툴바 **save** | `saveUnitProcessGridRows(rawRows)` — **필터와 무관한 전체 원본** | `onFilterSave` / `toolbarHandlers.save` |
| **행 건너뜀** | 모든 셀이 공백인 행 | 저장 루프에서 `continue` |

### 6.4 응답·UI

- `postTbCmCode` 성공 시 행별로 진행; 전부 성공하면 `setSaveMsg('[저장완료] 단위공정 정보가 저장되었습니다.')`(레거시 `MessageBox` 본문과 동일), `loadGrid(processFilter)`.
- 실패 시 첫 `throw` 메시지를 `setErrorMsg`에 표시.

### 6.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`POST tb_cm_code ${status}: …\`)` |
| 클라이언트 검증 | 공정·단위공정·단위공정명 중 빈 값이 있으면 `throw new Error('[저장실패] …')`(레거시 `MessageBox` 본문과 동일) |

### 6.6 (선택) 클라이언트 검증

- `validateUnitProcessRow`: 열 0·1·2 trim 후 모두 비어 있지 않아야 함. 실패 메시지 본문: `공정, 단위공정, 단위공정명 중에 값이 없는 데이타가 있습니다. 확인하여 주십시요.` (`frmUnitProcessMng.cs` `[저장실패]`와 동일)

---

## 7. 테이블·응답 필드 (`fn_unit_process` 행 객체 관점)

`rowToGridRow`가 객체일 때 읽는 키(우선순위 순). 실제 DB 함수·뷰는 서버 정의.

| 논리 필드 | 후보 키(일부) | 그리드 열 |
|-----------|----------------|-----------|
| 공정(상위 공정 코드 등) | `attribute01`, `process_code_name`, `process_cd`, … | 0 |
| 단위 공정코드 | `unit_process_cd`, `code`, `CODE`, … | 1 |
| 단위 공정명 | `unit_process_nm`, `code_name`, … | 2 |
| Tact Time | `tact_time`, `tact_time_sec`, … | 3 |
| 포장단위 | `pack_unit`, `ea`, … | 4 |
| 포장타입 | `pack_type`, … | 5 |
| 순서 | `disp_seq`, `seq`, … | 6 |
| 비고 | `remark`, `remarks`, … | 7 |

---

## 8. 그리드·상세 UI 매핑

| 그리드 인덱스 | 컬럼명 | DB·비고 |
|---------------|--------|---------|
| 0 | 공정 | `PlainSelect` — `PROCESS` 콤보. 빈 셀은 옵션 로드 후 **첫 `value`로** `useEffect` 보정 |
| 1 | 단위 공정코드 | `PlainInput` **readOnly** — PK 성격, 변경 불가 |
| 2 | 단위 공정명 | `PlainInput` 편집 → `code_name` |
| 3 | Tact Time (Sec) | `PlainInput` 편집 → `attribute02` |
| 4 | 포장단위(E/A) | `PlainInput` 편집 → `attribute03` |
| 5 | 포장타입 | `PlainSelect` — `ASSY_PACKING_UNIT` 콤보 + **첫 항목 `<option value="">`**. 값 없음 = **빈 선택** 표시(공정과 다름) |
| 6 | 순서 | `PlainInput` 편집 → `disp_seq` |
| 7 | 비고 | `PlainInput` 편집 → `code_desc` |

**조회줄 필터(클라이언트):** `appliedUnitText`가 비어 있지 않으면 **단위 공정코드** 또는 **단위 공정명** 열에 **부분 일치**(대소문자 무시). 검색 적용은 **Search 클릭** 시 `appliedUnitField` / `appliedUnitText` 확정 후.

---

## 9. 보완·주의점(제안)

1. **저장은 행별 POST**: 트랜잭션 묶음 없음 — 일부 성공 후 실패 시 DB는 부분 반영될 수 있음.
2. **`fn_unit_process` 응답 형태**: `UNIT_PROCESS` 형태 공통코드(`code`/`code_name`)와 일반 컬럼명 혼용 가능 — `rowToGridRow`가 다중 키로 흡수.
3. **포장타입 코드/라벨**: DB `pack_type`이 **코드**(`MAZ`)인지 **명**인지에 따라 콤보 `value`와 불일치 시 `resolveCmCodeSelectValue`·orphan `<option>`으로 보강.
4. **`p1` 필터**: 서버가 `code_group` `ASSY_PACKING_UNIT`과 다른 이름을 쓰면 상수 `PACK_TYPE_CM_GROUP`만 교체.
5. **조회 시점**: 그리드는 **Search** 시에만 `loadGrid` — 공정 콤보만 바꾸고 Search 안 하면 이전 데이터 유지.

---

## 10. 관련 소스 파일

| 파일 |
|------|
| `renderer/src/screens/std/std_base_unit_process_mgmt.tsx` |
| `renderer/src/lib/unitProcessMgmtApi.ts` |
| `renderer/src/lib/tbCmCodeApi.ts` |
| `renderer/src/lib/fnCmCodeApi.ts` |
| `renderer/src/lib/fnUnitProcessApi.ts` |
| `renderer/src/lib/mesDbBaseUrl.ts` |
| `renderer/src/components/MesDataGridPanel.tsx` |
| `renderer/vite.config.ts` (`proxy`: `/db`, `/func`) |
