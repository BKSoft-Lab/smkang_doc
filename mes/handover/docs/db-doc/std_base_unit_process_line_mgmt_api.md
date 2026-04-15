# std_base_unit_process_line_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_unit_process_line_mgmt`  
구현: [`renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx`](../../renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx)  
BE 베이스: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/fn-cm-code`**, **`/api/fn-unit-process-line`**  
공통코드(콤보): [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions`  
단위공정 라인 그리드: [`renderer/src/lib/fnUnitProcessLineApi.ts`](../../renderer/src/lib/fnUnitProcessLineApi.ts) — `fetchFnUnitProcessLine`  
조회줄 콤보는 **`/api/fn-cm-code`** 로 `UNIT_PROCESS` 그룹  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmUnitProcessLineMng.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmUnitProcessLineMng.cs)

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등으로 주입된 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/fn-unit-process-line?p1=` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 단위공정 콤보(조회줄) | GET | `/api/fn-cm-code` | `p1=UNIT_PROCESS`, `p2=disp_seq` |
| 단위공정 라인 그리드 | GET | `/api/fn-unit-process-line` | `p1` 빈 값=전체; `p1=<코드>`=단위공정 조건 |

이 화면은 **저장·삭제 HTTP 호출 없음**(`showFilterSave={false}`). 그리드는 **읽기 전용** 표시.

---

## 3. GET — `/api/fn-cm-code` (`p1=UNIT_PROCESS`)

### 3.1 호출 코드

- **파일·함수**: [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions('UNIT_PROCESS', 'disp_seq')`
- **화면**: [`std_base_unit_process_line_mgmt.tsx`](../../renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx) — 마운트 시 `useEffect` 1회

### 3.2 URL·쿼리

```
GET {base}/api/fn-cm-code?p1=UNIT_PROCESS&p2=disp_seq
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `p1` | **항상** | `UNIT_PROCESS` — `tb_cm_code.code_group` 등 서버 정의 |
| `p2` | **항상** | `disp_seq` |

### 3.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **최초 마운트** | 위 인자 | `useEffect` (빈 deps) |
| 이후 | 자동 재호출 없음 | — |

### 3.4 응답 처리

- JSON 배열 또는 래핑 객체(`data` / `rows` / `result` / `items` / `records` / `list` 등) 중 첫 배열.
- 행 `{ code, code_name }` → `{ value, label }` (`rowToOption`).
- **실패 시** `setUnitProcessOptions([])`.

### 3.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw` → `catch` → `setUnitProcessOptions([])` |

---

## 4. GET — `/api/fn-unit-process-line`

### 4.1 호출 코드

- **파일·함수**: [`fnUnitProcessLineApi.ts`](../../renderer/src/lib/fnUnitProcessLineApi.ts) — `fetchFnUnitProcessLine(p1)`

### 4.2 URL·쿼리

**전체(빈 `p1`):**

```
GET {base}/api/fn-unit-process-line?p1=
```

- 클라이언트는 먼저 위 URL을 호출하고, **파싱 후 행이 0건**이면 **쿼리 없이** `GET {base}/api/fn-unit-process-line` 를 한 번 더 시도한다.

**단위공정 코드 조건(예: FCT):**

```
GET {base}/api/fn-unit-process-line?p1=FCT
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `p1` | **항상**(`URLSearchParams`) | 조회줄 **단위공정** `PlainSelect` 값. **빈 문자열** = 전체 |

### 4.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **최초 마운트** | `loadGrid('')` | `useEffect` — 전체 조회 1회 |
| 조회줄 **Search** | `loadGrid(unitProcessFilter)` | `onFilterSearch` |
| 콤보만 변경 | — | **자동 조회 없음** |

### 4.4 응답 처리

- JSON 배열 또는 래핑 객체 내 첫 배열; 객체 안 **임의 키의 배열 값**도 탐색.
- 각 행 `rowToGridRow` → **6열 문자열 배열** (아래 §6).
- 응답이 **객체 배열**이면 우선 필드명으로 매핑; **배열의 배열**이면 인덱스 0~5로 자름.

### 4.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`GET fn_unit_process_line ${status}: …\`)` |
| 화면 | `setErrorMsg`, `setRawRows([])` |

---

## 5. 테이블·응답 필드 (`fn_unit_process_line` 행 객체 관점)

객체 응답 시 **우선** 사용하는 키(그 다음 레거시·별명 키는 `rowToGridRow` 참고).

| 논리 필드 | 우선 키 | 그리드 열 |
|-----------|---------|-----------|
| 단위공정 | `unit_process_name` | 0 |
| 단위공정 라인코드 | `code` | 1 |
| 단위공정 라인명 | `code_name` | 2 |
| 공정 | `process` | 3 |
| 공정라인 | `process_line` | 4 |
| 비고 | `code_desc` | 5 |

---

## 6. 그리드·UI 매핑

| 그리드 인덱스 | 컬럼명 | DB·비고 |
|---------------|--------|---------|
| 0 | 단위공정 | 객체: `unit_process_name` 우선 |
| 1 | 단위공정 라인코드 | `code` 우선 |
| 2 | 단위공정 라인명 | `code_name` 우선 |
| 3 | 공정 | `process` 우선 |
| 4 | 공정라인 | `process_line` 우선 |
| 5 | 비고 | `code_desc` 우선 |

**조회줄**: **단위공정** 콤보(`전체` + `UNIT_PROCESS` 옵션) — 그리드 필터는 **`p1`** 로만 전달(클라이언트 텍스트 필터 없음).

---

## 7. 보완·주의점(제안)

1. **`MesDataGridPanel`**: 데이터 열이 모두 빈 문자열이면 행이 **렌더에서 제외**됨 — API 키와 매핑 불일치 시 빈 그리드로 보일 수 있음.
2. **전체 조회 0건 시 재시도**: `?p1=` 후 빈 배열이면 **쿼리 없는** URL로 재호출 — 백엔드가 둘 중 하나만 지원할 수 있음.
3. **배열 행 응답**: 객체가 아닌 `[[...],...]` 이면 **필드명 매핑 없이** 열 순서만 사용.
4. **저장 없음**: 편집·POST 연동은 없음.

---

## 8. 관련 소스 파일

| 파일 |
|------|
| `renderer/src/screens/std/std_base_unit_process_line_mgmt.tsx` |
| `renderer/src/lib/fnCmCodeApi.ts` |
| `renderer/src/lib/fnUnitProcessLineApi.ts` |
| `renderer/src/lib/mesDbBaseUrl.ts` |
| `renderer/src/components/MesDataGridPanel.tsx` |
| `renderer/vite.config.ts` (`proxy`: `/db`, `/func`) |
