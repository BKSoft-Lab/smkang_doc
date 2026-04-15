# std_cfg_packing_unit_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_cfg_packing_unit_mgmt`  
구현: [`renderer/src/screens/std/std_cfg_packing_unit_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_packing_unit_mgmt.tsx)  
베이스 URL: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/cfg/*`**  
클라이언트 API: [`renderer/src/lib/cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts)  
그리드 매핑: [`renderer/src/lib/cfgMesScreenMaps.ts`](../../renderer/src/lib/cfgMesScreenMaps.ts)  
BE: [`server/src/lib/queries/std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs), [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmPackingUnitMng.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmPackingUnitMng.cs) — MDI `msStandard_PackingUnitMng`

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **STD BE** | `userMgmtBeUrl('/api/cfg/...')` |
| **절대 URL 예** | `http://localhost:8787/api/cfg/packing-units?model_code=...` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 모델 목록 | GET | `/api/cfg/model-master` | `process`, `model_name__prefix` |
| 포장단위 조회 | GET | `/api/cfg/packing-units` | **`model_code` 필수** — `ASSY_PACKING_UNIT` |
| 포장단위 저장 | POST | `/api/cfg/packing-unit` | 모델별 DELETE 후 INSERT |

---

## 3. GET — `/api/cfg/model-master`

### 3.1 호출 코드

- `fetchCfgModelMaster` — `runSearch`.

### 3.2 호출 시점

| 시점 | 트리거 |
|------|--------|
| **Search** | 조회줄 |

### 3.3 응답·UI

- **모델** 그리드 8열 — `cfgModelToPackingModelRow`.

---

## 4. GET — `/api/cfg/packing-units`

### 4.1 호출 코드

- `fetchCfgPackingUnits(modelCode)` — `selectedModelCode` 변경 시 `useEffect`.

### 4.2 URL·쿼리

```
GET {base}/api/cfg/packing-units?model_code={model_code}
```

### 4.3 응답·UI

- 단일 행이면 `attribute01`~`03`을 **4행 고정 라벨**(매거진/박스/트레이/출하)에 매핑 — `packingAttrsToRows`.

---

## 5. POST — `/api/cfg/packing-unit`

### 5.1 호출 코드

- `postCfgPackingUnit` — `onFilterSave`.

### 5.2 JSON 필드

| 필드 | 출처 |
|------|------|
| `value_code` | 선택 모델 코드 (= `model_code`) |
| `attribute01` | 그리드 1행 주석 열 |
| `attribute02` | 2행 |
| `attribute03` | 3행 |

### 5.3 클라이언트 검증

- 레거시 203행 취지: `attribute01`~`03`이 비어 있지 않을 때 **숫자**인지 검사 — 아니면 `포장단위에 숫자가 아닌 값이 있습니다.`

### 5.4 응답 처리

- 성공 배너: `Assy 포장단위 정보가 저장 되었습니다.` (232행 취지)

### 5.5 에러

| 원인 | 동작 |
|------|------|
| 모델 미선택 | `Assy 모델을 선택하여 주십시요.` (196행) |
| 서버 오류 | `error` 메시지 |

---

## 6. 테이블·응답 필드 (주)

| 테이블 | 비고 |
|--------|------|
| `tb_mes_model_master` | 모델 조회 |
| `tb_mes_common_value` `value_group='ASSY_PACKING_UNIT'` | GET/POST packing |

---

## 7. 그리드·상세 UI 매핑

| 그리드 | 컬럼 | 비고 |
|--------|------|------|
| 모델 | 8열 | 마스터 + Array Count 열은 API 미사용 시 빈 값 |
| 포장단위 | 포장단위, 주석 | 4행 고정 라벨 + 값 |

---

## 8. 보완·주의점(제안)

1. 상세 폼 편집 값은 **저장 시** 선택 행에 병합 후 `attribute01`~`03`으로 전송.
2. PNG와 달리 서버는 **모델당 최대 3개 속성** — 4행 중 출하 행은 UI 라벨만 유지.

---

## 9. 관련 소스 파일

| 파일 (경로) | 비고 |
|-------------|------|
| [`std_cfg_packing_unit_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_packing_unit_mgmt.tsx) | 화면 |
| [`cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts) | API |
| [`std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs) | GET packing-units |
| [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs) | POST packing-unit |
