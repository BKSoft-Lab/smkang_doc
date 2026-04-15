# std_base_process_line_config_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_process_line_config_mgmt`  
구현: [`renderer/src/screens/std/std_base_process_line_config_mgmt.tsx`](../../renderer/src/screens/std/std_base_process_line_config_mgmt.tsx) — 현재 **PNG·샘플 데이터** 위주 (`stdPngSampleData`).  
BE: [`server/src/routes/byScreen/std_base_process_line_config_mgmt.mjs`](../../server/src/routes/byScreen/std_base_process_line_config_mgmt.mjs) — [`std_processLineMes.mjs`](../../server/src/lib/queries/std_processLineMes.mjs), [`std_unitProcessLineCodeMes.mjs`](../../server/src/lib/queries/std_unitProcessLineCodeMes.mjs) (`/api/line-codes` 는 [`std_base_process_line_mgmt.mjs`](../../server/src/routes/byScreen/std_base_process_line_mgmt.mjs))  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmProcessLineConstMng.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmProcessLineConstMng.cs) — MDI `msBasic_ProcessLine`

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **향후 연동** | [`userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts) + `/api/process-line/*`, `/api/unit-process-line-codes` (LINE 마스터 `/api/line-codes` 는 **`std_base_process_line_mgmt`** 진입점) |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| UNIT_PROCESS_LINE 코드 | GET/POST/DELETE | `/api/unit-process-line-codes` | [`std_unitProcessLineCodeMes.mjs`](../../server/src/lib/queries/std_unitProcessLineCodeMes.mjs) |
| 조인·라인별 조회·저장 | GET/POST | `/api/process-line/...` | [`std_processLineMes.mjs`](../../server/src/lib/queries/std_processLineMes.mjs) |

---

## 3. 레거시와 PostgreSQL

- 레거시 `frmProcessLineConstMng`는 공정라인 구성(라인·단위공정라인·순서)을 Oracle에서 관리한다.
- BE는 `tb_mes_process_line`, `tb_cm_code` 등으로 이식한다.

---

## 4. 보완·주의점

1. UI가 실데이터와 연동되면 `cfgMesApi`·전용 훅 추가 후 본 문서에 **호출 시점·그리드 매핑**을 채운다.

---

## 5. 관련 소스 파일

| 파일 (경로) | 비고 |
|-------------|------|
| [`server/src/routes/byScreen/std_base_process_line_config_mgmt.mjs`](../../server/src/routes/byScreen/std_base_process_line_config_mgmt.mjs) | `byScreen` 진입 |
| [`server/src/lib/queries/std_processLineMes.mjs`](../../server/src/lib/queries/std_processLineMes.mjs) | 공정라인 핵심 |
| [`server/src/lib/queries/std_unitProcessLineCodeMes.mjs`](../../server/src/lib/queries/std_unitProcessLineCodeMes.mjs) | UNIT_PROCESS_LINE 코드 |
| [`docs/DATABASE.md`](../DATABASE.md) | 레거시 추출 메모 |
