# std_cfg_prod_router_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_cfg_prod_router_mgmt`  
구현: [`renderer/src/screens/std/std_cfg_prod_router_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_prod_router_mgmt.tsx)  
베이스 URL: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/cfg/*`**  
클라이언트 API: [`renderer/src/lib/cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts)  
그리드 매핑: [`renderer/src/lib/cfgMesScreenMaps.ts`](../../renderer/src/lib/cfgMesScreenMaps.ts)  
BE: [`server/src/lib/queries/std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs), [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmProdRouteManagement.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmProdRouteManagement.cs) — MDI `msStandard_ProdRouteMng`

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev / Electron** | [`userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts) — `/api/cfg/*` |
| **절대 URL 예** | `http://localhost:8787/api/cfg/model-mapping?kind=model` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 모델 마스터 | GET | `/api/cfg/model-master` | `model_code` 정확 검색(조회줄) |
| 모델 매핑 | GET | `/api/cfg/model-mapping` | `kind=model` — `MODEL_MAPPING` 공통값 조인 |
| 라우트 목록 | GET | `/api/cfg/routes` | **`model_code` 필수** — 하단 모델 선택 시 |
| 라우트 행 저장 | POST | `/api/cfg/route-row` | `tb_mes_route` upsert |

---

## 3. GET — `/api/cfg/model-master`

### 3.1 호출 코드

- `fetchCfgModelMaster({ model_code })` — `runSearch`에서 단독 호출(조회줄 모델코드).

### 3.2 URL·쿼리

```
GET {base}/api/cfg/model-master?model_code={code}
```

### 3.3 호출 시점·조건

| 시점 | 트리거 |
|------|--------|
| **Search** | `onFilterSearch` → `runSearch` |

### 3.4 응답·UI

- 하단 **모델** 그리드 7열: 모델코드·모델명·고객사·제품구분·사양·**매핑 라우트값**(`value_code` 병합)·빈 열.

---

## 4. GET — `/api/cfg/model-mapping`

### 4.1 호출 코드

- `fetchCfgModelMapping('model')` — `runSearch`에서 `model-master`와 병렬.

### 4.2 URL·쿼리

```
GET {base}/api/cfg/model-mapping?kind=model
```

### 4.3 응답 처리

- `model_code` → `Map` → 그리드 6번째 열 **라우트 코드** 자리에 `value_code` 표시.

---

## 5. GET — `/api/cfg/routes`

### 5.1 호출 코드

- `fetchCfgRoutes(selectedModelCode)` — 하단 모델 선택 시 `useEffect`.

### 5.2 URL·쿼리

```
GET {base}/api/cfg/routes?model_code={modelCode}
```

### 5.3 응답·UI

- 상단 **라우트** 3열: `cfgRouteToShortRow`
- 상단 **라우트 공정 리스트** 14열: `cfgRouteToRouteListRow`

---

## 6. POST — `/api/cfg/route-row`

### 6.1 호출 코드

- `postCfgRouteRow` — `onFilterSave`, **`lastPanel === 'routeProc'`** 일 때.

### 6.2 클라이언트 검증·확인

- 저장 전 `window.confirm` — 레거시 506행 취지: `선택한 모델의 라우트 설정값을 저장 하시겠습니까?`

### 6.3 JSON 필드

| 필드 | 출처 |
|------|------|
| `model_code` | `selectedModelCode` |
| `unit_process_code`, `work_side`, `route_seq`, `attribute01`, `attribute02`, `route_desc` | 라우트 공정 리스트 상세 열 (라우터 관리 화면과 동일 인덱스) |

### 6.4 응답 처리

- 성공 배너: `선택한 모델의 라우트 설정값이 저장 되었습니다.` (레거시 528·564행 취지)

### 6.5 에러

| 원인 | 동작 |
|------|------|
| 필수 누락 | 빨간 배너 — 단위공정·작업면 안내 |
| 서버 오류 | `error` 메시지 배너 |

---

## 7. 테이블·응답 필드 (주)

| 테이블 | 비고 |
|--------|------|
| `tb_mes_model_master` | 모델 목록 |
| `tb_mes_common_value` `MODEL_MAPPING` | 매핑 값 |
| `tb_mes_route` | 라우트 GET/POST |

---

## 8. 그리드·상세 UI 매핑

| 그리드 | 컬럼 | 비고 |
|--------|------|------|
| 라우트 | 3열 | 단축 라우트 행 |
| 라우트 공정 리스트 | 14열 | PNG `routeProcCols` |
| 모델 | 7열 | 마스터 + 매핑 `value_code` |

---

## 9. 보완·주의점(제안)

1. 레거시 **일괄 저장·삭제**(506·603행)는 웹에서는 **행 단위 `POST`** + 확인 한 번으로 단순화.
2. `ROUTE CODE … 존재하지 않습니다`(489행)는 웹에서 **필수 필드 누락** 메시지로 대체.
3. PNG `docs/image/std_cfg_prod_router_mgmt.png` — §6.0 절차로 로컬 보관 권장.

---

## 10. 관련 소스 파일

| 파일 (경로) | 비고 |
|-------------|------|
| [`std_cfg_prod_router_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_prod_router_mgmt.tsx) | 화면 |
| [`cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts) | API |
| [`std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs) | GET |
| [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs) | POST |
