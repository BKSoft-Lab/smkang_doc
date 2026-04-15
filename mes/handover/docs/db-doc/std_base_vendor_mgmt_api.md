# std_base_vendor_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_vendor_mgmt`  
구현: [`renderer/src/screens/std/std_base_vendor_mgmt.tsx`](../../renderer/src/screens/std/std_base_vendor_mgmt.tsx)  
BE 베이스: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/tb-cm-customer`**  
거래처 API: [`renderer/src/lib/tbCmCustomerApi.ts`](../../renderer/src/lib/tbCmCustomerApi.ts)  
매퍼: [`renderer/src/lib/tbCmCustomerMapper.ts`](../../renderer/src/lib/tbCmCustomerMapper.ts)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmCustomer.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmCustomer.cs)

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등으로 주입된 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/tb-cm-customer?...` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 목록·조회 | GET | `/api/tb-cm-customer` | 마운트 시 전체/조회줄 검색(업체명 LIKE) |
| 저장(신규/수정) | POST | `/api/tb-cm-customer` | JSON body (`buildTbCmCustomerPostBody`) |
| 삭제 | DELETE | `/api/tb-cm-customer` | 쿼리 `cust_code` |

**비연동(클라이언트만):** 조회줄 **거래형태**(매출·매입·임가공·Maker)는 GET에 포함하지 않고, 응답 배열을 `cust_type` 기준으로 필터(`filterByDealType`).

---

## 3. GET — `/api/tb-cm-customer`

### 3.1 호출 코드

- **파일**: [`tbCmCustomerApi.ts`](../../renderer/src/lib/tbCmCustomerApi.ts) — `fetchTbCmCustomers(query)`
- **쿼리 빌드**: `buildQuery` — 선택 `cust_code__like`, `cust_name__like`; **항상** `_orderBy=cust_code`  
  - 이 화면의 **`runSearch`** 는 **`cust_name__like`만** 설정(`cust_code__like` 미사용).

### 3.2 URL·쿼리

**마운트 시 전체(검색어 없음):**

```
GET {base}/api/tb-cm-customer?_orderBy=cust_code
```

**조회줄 Search(거래처 검색어 있음, 예: `경미전자`):**

```
GET {base}/api/tb-cm-customer?cust_name__like=경미전자&_orderBy=cust_code
```

(브라우저는 한글 등을 퍼센트 인코딩함.)

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `cust_name__like` | **조회(Search)** 시 `filterVendorTextRef.current.trim()`이 비어 있지 않을 때만 | 업체명 부분 일치 |
| `cust_code__like` | **이 화면에서는 미전송** | API 타입은 지원하나 `runSearch`에서 설정하지 않음 |
| `_orderBy` | **항상** | `cust_code` |

### 3.3 호출 시점·조건

| 시점 | 인자 | 트리거 |
|------|------|--------|
| 화면 **최초 마운트** | `fetchTbCmCustomers({})` | `useEffect` 1회 |
| 조회줄 **Search** / 툴바 **Search** | `cust_name__like` 선택(검색어 있을 때만) + `_orderBy` | `runSearch` |
| **저장·삭제 성공** 후 | 현재 검색 조건과 동일 | `runSearch()` 재호출 |

### 3.4 응답 처리

- JSON이 배열이 아니면 키 `data` / `rows` / `result` / `items` / `records` / `list` / `List` / `DATA` 중 **첫 배열**을 `TbCmCustomer[]`로 파싱.
- `setSearchResult(rows)` 후 `applyRowsAfterFetch(rows, dealCol)`에서 거래형태 필터·첫 행 선택·상세 반영.

### 3.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(\`GET tb_cm_customer ${status}: …\`)` |
| 화면 | `catch` → 배너 **`조회 실패: …`** |

---

## 4. POST — `/api/tb-cm-customer`

### 4.1 호출 코드

- **파일**: [`tbCmCustomerApi.ts`](../../renderer/src/lib/tbCmCustomerApi.ts) — `postTbCmCustomer(body)`
- **본문 생성**: [`tbCmCustomerMapper.ts`](../../renderer/src/lib/tbCmCustomerMapper.ts) — `buildTbCmCustomerPostBody({ detail, existingRow })`

### 4.2 URL·쿼리

```
POST {base}/api/tb-cm-customer
Content-Type: application/json
```

### 4.3 호출 시점·조건

| 시점 | 인자 | 트리거 |
|------|------|--------|
| 조회줄 **Save** / 툴바 **Save** | `buildTbCmCustomerPostBody` 결과 | `runSave` — 업체코드 필수, 신규 시 중복 코드 검사 |

### 4.4 응답·UI

- 성공 시 `runSearch()`로 목록 갱신, 배너 **`저장되었습니다.`**
- 응답 본문은 JSON 또는 텍스트로 소비 가능(화면은 추가 파싱 없음).

### 4.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw` → 배너 **`저장 실패: …`** |

### 4.6 JSON 필드(POST body)

| 필드 | 출처·비고 |
|------|-----------|
| `cust_code` | 상세 `detail[0]` |
| `cust_name` | `detail[1]` |
| `cust_aliasname` | `detail[2]` |
| `family_flag` | `detail[3]` (자회사구분) |
| `cust_type` | `gridFlagsToCustType(detail, existing)` — 앞 4자리 매출·매입·임가공·Maker + 나머지 패딩 |
| `bizregno` | `detail[8]` |
| `reprename` | `detail[9]` |
| `bizcond` | `detail[10]` |
| `biztype` | `detail[11]` |
| `tel_no` | `detail[12]` |
| `fax_no` | `detail[13]` |
| `staff_name` | `detail[14]` |
| `staff_mobile` | `detail[15]` |
| `attribute02` | `detail[16]` — 화면 라벨 담당자 eMail |
| `attribute01` | `detail[17]` — 화면 라벨 국내외 |
| `addr_head` | `detail[18]` |
| `update_date` | 신규 ISO 시각 |
| `updated_by` | 기존값 또는 `'ADMIN'` |
| `create_date` / `created_by` | 신규 시 설정, 수정 시 기존 유지 |

---

## 5. DELETE — `/api/tb-cm-customer`

### 5.1 호출 코드

- **파일**: [`tbCmCustomerApi.ts`](../../renderer/src/lib/tbCmCustomerApi.ts) — `deleteTbCmCustomer(custCode)`

### 5.2 URL·쿼리

```
DELETE {base}/api/tb-cm-customer?cust_code=<업체코드>
```

### 5.3 호출 시점·조건

| 시점 | 인자 | 트리거 |
|------|------|--------|
| 삭제 확인 후 **삭제** 버튼 | `deleteConfirmCode` | `executeDelete` — DB 행 선택·신규 모드 아님 |

### 5.4 응답·UI

- 성공 시 `runSearch()`, 배너 **`삭제되었습니다.`**

### 5.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw` → 배너 **`삭제 실패: …`**, 확인 UI 닫힘 |

---

## 6. 테이블·응답 필드 (`TbCmCustomer` / `tb_cm_customer` 연동)

| 필드 | 비고 |
|------|------|
| `cust_code` | PK, 필수 |
| `cust_name` | 업체명 |
| `cust_aliasname` | 예명 |
| `family_flag` | 자회사 구분 등 |
| `cust_type` | 10자리 내역 — 1~4번째 자리: 매출·매입·임가공·Maker |
| `bizregno` | 사업자번호 |
| `reprename` | 대표자 |
| `bizcond` | 업종 |
| `biztype` | 업태 |
| `tel_no` | 전화 |
| `fax_no` | FAX |
| `staff_name` | 담당자 |
| `staff_mobile` | 담당자 전화 |
| `attribute01` | 국내외(화면 매핑) |
| `attribute02` | 담당자 eMail(화면 매핑) |
| `addr_head` | 주소 |
| `create_date` / `created_by` / `update_date` / `updated_by` | 감사 필드(POST에서 일부 설정) |

---

## 7. 그리드·상세 UI 매핑

| 그리드 인덱스 | 컬럼명 | DB·비고 |
|---------------|--------|---------|
| 0 | 업체코드 | `cust_code` |
| 1 | 업체명 | `cust_name` |
| 2 | 예명 | `cust_aliasname` |
| 3 | 자회사 | `family_flag` |
| 4 | 매출 | `cust_type` 1번째 자리 → 체크박스 표시 |
| 5 | 매입 | `cust_type` 2번째 자리 |
| 6 | 임가공 | `cust_type` 3번째 자리 |
| 7 | Maker | `cust_type` 4번째 자리 |
| 8 | 사업자번호 | `bizregno` |
| 9 | 대표자 | `reprename` |
| 10 | 업종 | `bizcond` |
| 11 | 업태 | `biztype` |
| 12 | 전화 | `tel_no` |
| 13 | FAX | `fax_no` |
| 14 | 담당자 | `staff_name` |
| 15 | 담당자전화 | `staff_mobile` |
| 16 | 담당자eMail | `attribute02` |
| 17 | 국내외 | `attribute01` (표시용 `국내`/`국외` 변환은 매퍼·화면 로직) |
| 18 | 주소 | `addr_head` |

---

## 8. 보완·주의점(제안)

1. **거래형태 필터**는 서버가 아닌 **클라이언트**만 적용 — 대량 데이터 시 전체 GET 후 필터하면 비효율일 수 있음. 필요 시 백엔드에 `cust_type` 조건 검토.
2. **`cust_type`**: `gridFlagsToCustType`이 기존 10자 유지 시 **5~10번째 자리**는 편집하지 않고 유지.
3. **삭제/저장 권한**은 API·DB 측 정책에 따름 — 화면은 HTTP 에러 메시지 표시.
4. 조회줄 검색은 **`cust_name__like`만** 전달 — **업체코드만**으로 찾으려면 API·화면 확장 필요.

---

## 9. 관련 소스 파일

| 파일 | 역할 |
|------|------|
| [`renderer/src/screens/std/std_base_vendor_mgmt.tsx`](../../renderer/src/screens/std/std_base_vendor_mgmt.tsx) | 화면·조회/저장/삭제·거래형태 클라이언트 필터 |
| [`renderer/src/lib/tbCmCustomerApi.ts`](../../renderer/src/lib/tbCmCustomerApi.ts) | GET/POST/DELETE |
| [`renderer/src/lib/tbCmCustomerMapper.ts`](../../renderer/src/lib/tbCmCustomerMapper.ts) | 행 매핑·POST body·`cust_type` ↔ 그리드 4열 |
| [`renderer/src/lib/mesDbBaseUrl.ts`](../../renderer/src/lib/mesDbBaseUrl.ts) | 베이스 URL |
