# BE — 화면별 `byScreen` (`<screenId>.mjs`)

- **HTTP 핸들러·SQL**은 [`../../lib/queries/`](../../lib/queries/) 에 두고, 이 디렉터리는 **화면 ID별 진입점**(re-export 또는 소규모 `Router` 합성)만 둔다.
- [`../../index.mjs`](../../index.mjs) 는 여기 팩토리만 `app.use` 한다.
- **`manual.csv` 화면 ID와 1:1**: 파일명은 **`<screenId>.mjs`** (화면 ID가 곧 접두를 포함 — 예: `std_base_process_line_mgmt.mjs`, `prd_itemno_item_no_mgmt_fg_semi.mjs`). 동일 `/api/...` 경로를 두 파일에서 중복 마운트하지 않는다 — 공용 쿼리 모듈은 한 화면 진입점에만 `Router`로 연결한다.

## 모듈 접두 (파일명)

| 접두 | `manual.csv` 모듈 | `byScreen` 파일명 예 |
|------|-------------------|----------------------|
| `std_` | 기준정보 | `std_base_user_mgmt.mjs` |
| `prd_` | 제품관리 | `prd_bom_ebom_inq.mjs` |
| `mat_` | 자재관리 | `mat_gr_grn_hist_inq.mjs` |
| `mfg_` | 생산관리 | `mfg_plan_prod_plan_mgmt.mjs` |
| `pur_` | 구매관리 | `pur_po_reg.mjs` |

**`lib/queries`**: 해당 모듈에서만 쓰는 구현 파일은 **동일 접두** — 예: `std_tbCmUser.mjs`, 향후 `mat_*.mjs`. **여러 모듈에서 import** 하는 공통 구현은 접두 없음(또는 팀 합의 시 `common_`) — 예: [`authAndSplash.mjs`](../../lib/queries/authAndSplash.mjs). 상세는 [`../../lib/queries/README.md`](../../lib/queries/README.md).
