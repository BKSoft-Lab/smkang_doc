# std_cfg_router_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_cfg_router_mgmt`  
구현: [`renderer/src/screens/std/std_cfg_router_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_router_mgmt.tsx)  
베이스 URL: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/cfg/*`** (STD BE)  
클라이언트 API: [`renderer/src/lib/cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts)  
그리드 매핑: [`renderer/src/lib/cfgMesScreenMaps.ts`](../../renderer/src/lib/cfgMesScreenMaps.ts)  
BE: [`server/src/lib/queries/std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs), [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs)  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmRouteManagement.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmRouteManagement.cs) — MDI `msStandard_RouteMng`

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등 IPC·INI 주입 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/cfg/model-master?...` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 모델 목록 | GET | `/api/cfg/model-master` | `process`, `model_name__prefix` (선택) |
| 단위공정 | GET | `/api/cfg/unit-processes` | 라우트 화면 좌측 목록 |
| 모델별 라우트 | GET | `/api/cfg/routes` | **`model_code` 필수** — 선택 모델 변경 시 |
| 라우트 행 저장 | POST | `/api/cfg/route-row` | `tb_mes_route` upsert |

---

## 3. GET — `/api/cfg/model-master`

### 3.1 호출 코드

- **파일**: [`cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts) — `fetchCfgModelMaster({ process, model_name__prefix })`
- **화면**: `runSearch` — 조회줄 **Search**

### 3.2 URL·쿼리

```
GET {base}/api/cfg/model-master?process={p}&model_name__prefix={prefix}
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `process` | trim 후 비어 있지 않을 때 | 공정 코드 필터 |
| `model_name__prefix` | trim 후 비어 있지 않을 때 | 모델명 접두(대소문자 무시) |

### 3.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **최초 마운트** | `runSearch()` | `useEffect` |
| **Search** | 현재 조회줄 `process`, `model_name__prefix` | `onFilterSearch` |

### 3.4 응답 처리

- `CfgModelMasterRow[]` 파싱 후 상단 **모델** 그리드 3열: `model_code`, `model_name`, `model_desc` (`cfgModelToRouterTopRow`).

### 3.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw` — `filterLeading` 빨간 메시지 |

---

## 4. GET — `/api/cfg/unit-processes`

### 4.1 호출 코드

- `fetchCfgUnitProcesses()` — `runSearch` 내 `Promise.all`로 모델 마스터와 병렬 호출.

### 4.2 URL·쿼리

```
GET {base}/api/cfg/unit-processes
```

### 4.3 호출 시점·조건

| 시점 | 트리거 |
|------|--------|
| **Search** 성공 시 | `runSearch` |

### 4.4 응답·UI

- **단위공정** 그리드 3열: 공정(빈 값), `unit_process_code`, `unit_process_name`.

---

## 5. GET — `/api/cfg/routes`

### 5.1 호출 코드

- `fetchCfgRoutes(modelCode)` — `selectedModelCode` 변경 시 `useEffect`.

### 5.2 URL·쿼리

```
GET {base}/api/cfg/routes?model_code={modelCode}
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `model_code` | **항상** (비어 있으면 클라이언트에서 호출 생략) | 모델 코드 |

### 5.3 호출 시점·조건

| 시점 | 트리거 |
|------|--------|
| 모델 행 선택·조회 후 첫 모델 선택 | `selectedModelCode` 갱신 |

### 5.4 응답·UI

- **라우트 공정 리스트** 14열 — `cfgRouteToRouteListRow` (API 필드 + 빈 열 패딩).

---

## 6. POST — `/api/cfg/route-row`

### 6.1 호출 코드

- [`cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts) — `postCfgRouteRow(body)`
- **화면**: `onFilterSave` — **마지막 포커스 패널**이 **라우트 공정 리스트**일 때만

### 6.2 URL·본문

```
POST {base}/api/cfg/route-row
Content-Type: application/json
```

| JSON 필드 | 출처·비고 |
|-----------|-----------|
| `model_code` | 선택 모델 `selectedModelCode` |
| `unit_process_code` | 상세/그리드 열 인덱스 1 |
| `work_side` | 열 인덱스 3 |
| `route_seq` | 열 4 (숫자 변환) |
| `attribute01` | 투입여부 (열 5, 기본 `N`) |
| `attribute02` | 완료여부 (열 6, 기본 `N`) |
| `route_desc` | 열 12 |

### 6.3 호출 시점·조건

| 시점 | 조건 |
|------|------|
| **Save** | `lastPanel === 'list'` 이고 `selectedModelCode` 있음 |

### 6.4 응답 처리

- 성공 시 `filterLeading` **초록** 배너: 레거시와 동일 취지 — `라우트 정보가 저장 되었습니다.`
- 이후 `fetchCfgRoutes`로 그리드 재조회.

### 6.5 에러

| 원인 | 동작 |
|------|------|
| 400/500 | `POST` 메시지 본문 또는 `error` 필드 → 빨간 배너 |
| 단위공정/작업면 누락 | 클라이언트 배너 — `라우트 코드나 라우트 명이 입력안된 데이타가 있습니다...` (레거시 `frmRouteManagement` 370행 취지) |

---

## 7. 테이블·응답 필드 (주)

| 테이블 | 비고 |
|--------|------|
| `tb_mes_model_master` | GET model-master |
| `tb_mes_unit_process` | GET unit-processes |
| `tb_mes_route` | GET routes / POST route-row |

---

## 8. 그리드·상세 UI 매핑

| 그리드 | 인덱스·컬럼 | DB·비고 |
|--------|-------------|---------|
| 모델 | 0~2 | `model_code`, `model_name`, `model_desc` |
| 단위공정 | 0~2 | 공정(빈), `unit_process_code`, `unit_process_name` |
| 라우트 공정 리스트 | 0~13 | `CfgRouteRow` 기반 14열 PNG 정렬 |

---

## 9. 보완·주의점(제안)

1. 레거시 `MessageBox` (삭제 확인 708행 등)는 웹에서는 **삭제 API 미구현** 시 생략; 저장만 배너·`POST` 오류로 정합.
2. 상단 표제가 PNG의 「라우트」였으나 API는 **모델 마스터** 기준이므로 화면 표제는 **모델**로 표시.
3. `docs/image/std_cfg_router_mgmt.png`는 §6.0 캡처 절차로 저장소에 두는 것이 원칙(로컬 워크스페이스에 없을 수 있음).

---

## 10. 관련 소스 파일

| 파일 (경로) | 비고 |
|-------------|------|
| [`std_cfg_router_mgmt.tsx`](../../renderer/src/screens/std/std_cfg_router_mgmt.tsx) | 화면 |
| [`cfgMesApi.ts`](../../renderer/src/lib/cfgMesApi.ts) | GET/POST |
| [`cfgMesScreenMaps.ts`](../../renderer/src/lib/cfgMesScreenMaps.ts) | 그리드 문자열 매핑 |
| [`std_cfgMes.mjs`](../../server/src/lib/queries/std_cfgMes.mjs) | GET 구현 |
| [`std_cfgMesMutations.mjs`](../../server/src/lib/queries/std_cfgMesMutations.mjs) | POST 구현 |
