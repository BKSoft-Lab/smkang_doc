# std_base_common_code_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_common_code_mgmt`  
구현: [`renderer/src/screens/std/std_base_common_code_mgmt.tsx`](../../renderer/src/screens/std/std_base_common_code_mgmt.tsx)  
BE 베이스: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/tb-cm-code`**, **`/api/fn-cm-code`** (STD BE, 기본 포트 8787)  
공통코드 API: [`renderer/src/lib/tbCmCodeApi.ts`](../../renderer/src/lib/tbCmCodeApi.ts)  
매퍼: [`renderer/src/lib/tbCmCodeMapper.ts`](../../renderer/src/lib/tbCmCodeMapper.ts)  
함수 조회: [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmCommonCode.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmCommonCode.cs)

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등 IPC·INI 주입 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/tb-cm-code?...` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 그리드·목록 | GET | `/api/tb-cm-code` | 공통코드 행 목록 |
| 상단 Group Code 콤보 | GET | `/api/fn-cm-code` | `p1=GROUPCODE`, `p2=code_name` |
| 저장(신규/수정) | POST | `/api/tb-cm-code` | JSON body (`buildTbCmCodePostBody`) |
| 삭제 | DELETE | `/api/tb-cm-code` | 쿼리 `code`, 선택 `code_group` |

---

## 3. GET — `/api/tb-cm-code`

### 3.1 호출 코드

- **파일**: [`tbCmCodeApi.ts`](../../renderer/src/lib/tbCmCodeApi.ts) — `fetchTbCmCodes(query)`
- **쿼리 빌드**: `buildQuery` — 항상 `code_group__like`, `_orderBy=disp_seq`; 선택적으로 `code`, `code_name__like`

### 3.2 URL·쿼리

**전체(첫 화면):**

```
GET {base}/api/tb-cm-code?code_group__like=&_orderBy=disp_seq
```

**그룹 필터(예: DEPT):**

```
GET {base}/api/tb-cm-code?code_group__like=DEPT&_orderBy=disp_seq
```

(`code_group__like` 키는 **항상** 전송; 값이 비어 있으면 전체 조회 의미.)

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `code_group__like` | **항상** | `undefined`/생략 시 **빈 문자열**. Search 시 `filterGroupCode.trim()` |
| `_orderBy` | **항상** | `disp_seq` |
| `code` | `TbCmCodeQuery.code`가 비어 있지 않을 때만 | 이 화면에서는 **미사용** |
| `code_name__like` | trim 후 비어 있지 않을 때만 | 이 화면에서는 **미사용** |

### 3.3 호출 시점·조건

| 시점 | 인자 | 트리거 |
|------|------|--------|
| 화면 **최초 마운트** | `fetchTbCmCodes({ code_group__like: '' })` | `Promise.all`로 Group 콤보 GET과 **동시** |
| Toolbar **Search** | `fetchTbCmCodes({ code_group__like: filterGroupCode.trim() })` | `runSearch` |
| **저장 성공** 후 | 동일(현재 필터) | `runSave` → `runSearch()` |
| **삭제 성공** 후 | 동일 | `executeDelete` → `runSearch()` |

### 3.4 응답 처리

- JSON이 배열이 아니면 키 `data` / `rows` / `result` / `items` / `records` 중 **첫 배열**을 `TbCmCode[]`로 사용.
- 빈 배열이면 그리드 비움, 상세 초기화(`applySelectionAfterLoad`).

### 3.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`GET tb_cm_code ${status}: …\`)` |
| 화면 | `catch` → 배너 **`조회 실패: …`** (`Promise.all` 실패 시 콤보·그리드 **동시** 실패) |

---

## 4. GET — `/api/fn-cm-code` (상단 Group Code 콤보)

### 4.1 호출 코드

- **파일**: [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions(p1, p2?)`

### 4.2 URL·쿼리

```
GET {base}/api/fn-cm-code?p1=GROUPCODE&p2=code_name
```

### 4.3 호출 시점·조건

| 시점 | 조건 | 비고 |
|------|------|------|
| 화면 **최초 마운트** | 항상 1회 | `tb_cm_code` GET과 `Promise.all`로 **동시** |
| 이후 | 자동 재호출 없음 | 옵션은 state 유지 |

### 4.4 응답·UI

- 행 `{ code, code_name }` → `{ value, label }`. 중복 `value`는 **첫 항목만** 유지.
- 필터 `PlainSelect`: 전체 + 그룹 목록.
- 상세 **Group Code** `PlainSelect`: 동일 옵션 + DB에만 있는 그룹은 **`(현재값)`** 병합(`mergeLegacyGroupOption`).

### 4.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`GET fn_cm_code ${status}: …\`)` |
| 화면 | `catch` → **`조회 실패: …`** (그리드와 같은 `try`이면 한 번에 실패) |

---

## 5. POST — `/api/tb-cm-code` (저장)

### 5.1 호출 코드

- **함수**: `postTbCmCode(body)` — [`tbCmCodeApi.ts`](../../renderer/src/lib/tbCmCodeApi.ts)
- **본문 생성**: `buildTbCmCodePostBody` — [`tbCmCodeMapper.ts`](../../renderer/src/lib/tbCmCodeMapper.ts)

### 5.2 URL

```
POST {base}/api/tb-cm-code
Content-Type: application/json
Accept: application/json
```

### 5.3 호출 시점·조건

- Toolbar **Save** / 조회줄 저장 연동 → `runSave`.
- 기존 행: `useDirtyCheck`로 변경 없으면 저장 안 함 + 배너 **「변경된 항목이 없습니다.」**
- `code` 비어 있으면 mapper에서 `throw` → **「저장 실패: Code는 필수입니다.」**

### 5.4 클라이언트 검증

- 신규/수정 공통: `code` 필수(trim 후).
- 기존 행 저장 시 상세 dirty 없으면 조기 return(위 배너).

### 5.5 POST JSON 필드(매퍼 기준)

| 필드 | 출처·비고 |
|------|-----------|
| `code` | 필수, trim |
| `code_name`, `code_group`, `attribute01`…`attribute05`, `disp_seq`, `description` | trim |
| `activated` | 상세 Activity yes/no → `Y` / `N` |
| `create_date`, `created_by` | 신규: 현재 시각 / `ADMIN`; 수정: 기존 행 유지 |
| `update_date` | 항상 현재 ISO 시각 |
| `updated_by` | 기존 유지(없으면 `''`) |

### 5.6 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`POST tb_cm_code ${status}: …\`)` |
| 화면 | 배너 **`저장 실패: …`** |

---

## 6. DELETE — `/api/tb-cm-code`

### 6.1 URL·쿼리

```
DELETE {base}/api/tb-cm-code?code={code}&code_group={codeGroup}
```

- `code_group`은 `detail.codeGroup` trim 후 비어 있지 않을 때만 쿼리에 포함.

### 6.2 호출 코드

- **함수**: `deleteTbCmCode({ code, codeGroup })` — [`tbCmCodeApi.ts`](../../renderer/src/lib/tbCmCodeApi.ts)

### 6.3 호출 시점·조건

- 인라인 삭제 확인 후 `executeDelete`.
- 신규 모드이거나 `existingCode` 없으면 삭제 불가 배너.

### 6.4 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`DELETE tb_cm_code ${status}: …\`)` |
| 화면 | **`삭제 실패: …`**, 확인 상태 초기화 |

---

## 7. 테이블·응답 필드 (`tb_cm_code` 관점)

| 필드 | 비고 |
|------|------|
| `code` | 코드(PK 일부; 서버가 복합키면 `code_group`과 쌍) |
| `code_name`, `code_group` | |
| `attribute01` … `attribute05` | |
| `disp_seq` | 정렬·표시 순 |
| `activated` | 우선 사용; 없으면 `activity` 읽기 시 매퍼에서 보완 |
| `activity` | 레거시 호환 |
| `description` | |
| `create_date`, `created_by`, `update_date`, `updated_by` | |

---

## 8. 그리드·상세 UI 매핑 (`tbCmCodeToGridRow` / `CommonCodeDetail`)

| 그리드 인덱스 | 컬럼명 | DB·비고 |
|---------------|--------|---------|
| 0 | Code | `code` |
| 1 | Code Name | `code_name` |
| 2 | Group Code | `code_group` |
| 3–7 | Attribute.01–05 | `attribute01`–`attribute05` |
| 8 | Display Sequence | `disp_seq` |
| 9 | Activity | `activated`/`activity` → 그리드는 `Y`/`N` |
| 10 | Description | `description` |

상세 폼은 동일 필드; Activity는 UI에서 yes/no 셀렉트 → POST 시 `activated`로 변환.

---

## 9. 보완·주의점(제안)

1. **마운트 시 `Promise.all`**: 콤보·그리드 중 하나만 실패해도 전체 `catch` — 필요 시 분리 재시도 검토.
2. **`code` / `code_name__like`**: API는 지원하나 화면 미사용 — 단건·이름 검색 UI 추가 시 연동.
3. **DELETE 복합키**: 서버가 `code`만으로 부족하면 `code_group` 필수 여부를 백엔드와 재확인.
4. **`activated` vs `activity`**: 읽기 시 혼용 매핑 — DB 스키마 단일화 시 mapper 단순화 가능.
5. **정렬**: `MesDataGridPanel` 내부 정렬 시 `onSortChange`로 상세·선택 초기화(데이터 재요청 없음).

---

## 10. 관련 소스 파일

| 파일 |
|------|
| `renderer/src/screens/std/std_base_common_code_mgmt.tsx` |
| `renderer/src/lib/tbCmCodeApi.ts` |
| `renderer/src/lib/tbCmCodeMapper.ts` |
| `renderer/src/lib/fnCmCodeApi.ts` |
| `renderer/src/lib/mesDbBaseUrl.ts` |
| `renderer/vite.config.ts` (`proxy`: `/db`, `/func`) |
