# std_cfg_tact_time_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_cfg_tact_time_mgmt`  
구현: [`renderer/src/screens/std/std_cfg_tact_time_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_tact_time_mgmt.tsx)  
베이스 URL: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/cfg/*`**  
클라이언트 API: [`renderer/src/lib/cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts)  
그리드 매핑: [`renderer/src/lib/cfgMesScreenMaps.ts`](../../renderer/src/lib/cfgMesScreenMaps.ts)  
BE: [`server/src/lib/queries/std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs), [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmProdTactTimeManagement.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmProdTactTimeManagement.cs) — MDI `msStandard_TactTimeMng`

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **STD BE** | `userMgmtBeUrl('/api/cfg/...')` |
| **절대 URL 예** | `http://localhost:8787/api/cfg/tact-times?process=SMT&work_side=TOP&model_code=...` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 모델 목록 | GET | `/api/cfg/model-master` | `process`, `model_name__prefix` |
| 택트 목록 | GET | `/api/cfg/tact-times` | **`process`**, **`work_side`**, **`model_code` 필수** |
| 택트 행 저장 | POST | `/api/cfg/tact-time-row` | `tb_mes_tact_time` INSERT/UPDATE |

---

## 3. GET — `/api/cfg/model-master`

### 3.1 호출 코드

- `fetchCfgModelMaster({ process, model_name__prefix })` — `runSearch`.

### 3.2 URL·쿼리

```
GET {base}/api/cfg/model-master?process={p}&model_name__prefix={prefix}
```

### 3.3 호출 시점·조건

| 시점 | 트리거 |
|------|--------|
| **최초 마운트** | `useEffect` → `runSearch` |
| **Search** | 조회줄 버튼 |

### 3.4 응답·UI

- **모델** 그리드 7열 — `cfgModelToTactModelRow`.

---

## 4. GET — `/api/cfg/tact-times`

### 4.1 호출 코드

- `fetchCfgTactTimes(process, workSide, modelCode)` — `selectedModelCode`·`workSide`·`processCode`·`tab==='line'`일 때 `useEffect`.

### 4.2 URL·쿼리

```
GET {base}/api/cfg/tact-times?process={process}&work_side={work_side}&model_code={model_code}
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `process` | **항상** | 공정 코드 |
| `work_side` | **항상** | 작업면 |
| `model_code` | **항상** | 모델 코드 |

### 4.3 응답·UI

- **라인 Tact Time** 그리드 3열: 라인명(`process_line_name` 우선), `tact_time`, `tact_time_desc` — `cfgTactLineRow`.

---

## 5. POST — `/api/cfg/tact-time-row`

### 5.1 호출 코드

- `postCfgTactTimeRow` — `onFilterSave`, **`tab === 'line'`** 이고 **`lastPanel === 'line'`**.

### 5.2 JSON 필드

| 필드 | 출처 |
|------|------|
| `model_code` | 선택 모델 |
| `process` | 조회줄 `processCode` |
| `work_side` | 조회줄/탭 하단 `workSide` |
| `process_line` | 원본 행 `process_line` 또는 라인 컬럼 매칭 |
| `tact_time`, `tact_time_use`, `tact_time_desc` | 상세 폼 |

### 5.3 응답 처리

- 성공 배너: `라인 Tact Time 설정이 저장 되었습니다.` (레거시 380행 취지)

### 5.4 에러

| 원인 | 동작 |
|------|------|
| 모델 미선택 | `모델을 선택하세요.` |
| 라인 그리드 미선택 | 저장 안내 메시지 |
| 서버 오류 | `error` 또는 HTTP 본문 |

---

## 6. 테이블·응답 필드 (주)

| 테이블 | 비고 |
|--------|------|
| `tb_mes_model_master` | 모델 조회 |
| `tb_cm_code` `LINE` + `tb_mes_tact_time` | GET tact-times 조인 |
| `tb_mes_tact_time` | POST tact-time-row |

---

## 7. 그리드·상세 UI 매핑

| 그리드 | 컬럼 | 비고 |
|--------|------|------|
| 모델 | 7열 | 마스터 필드 |
| 라인 Tact Time | 라인, Tact Time(초), 비고 | `CfgTactTimeRow` |

---

## 8. 보완·주의점(제안)

1. **공정 Tact Time 설정**·**Tact Time 복사** 탭은 웹 API 미연동 — 안내 문구만 표시(레거시 439·453·475행은 추후 범위).
2. 레거시 삭제 확인(587행)은 **삭제 API** 없으면 미구현.
3. 레거시 QUERY ERROR(219행) 취지는 조회 실패 시 `filterLeading` 오류로 대체 가능.

---

## 9. 관련 소스 파일

| 파일 (경로) | 비고 |
|-------------|------|
| [`std_cfg_tact_time_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_tact_time_mgmt.tsx) | 화면 |
| [`cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts) | API |
| [`std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs) | GET tact-times |
| [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs) | POST tact-time-row |
