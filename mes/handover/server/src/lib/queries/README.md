# 공통 SQL·BE 라우트 구현 (`lib/queries`)

HTTP 핸들러·`pool.query`·트랜잭션은 이 디렉터리의 `*.mjs`에 둔다. 화면별 **진입점·re-export**는 [`../routes/byScreen/`](../routes/byScreen/) 의 **`<screenId>.mjs`** 에만 둔다.

## 모듈 접두 (파일명)

[`renderer/src/data/manual.csv`](../../../../renderer/src/data/manual.csv) 의 **화면 ID** 첫 세그먼트가 모듈이다: `std`, `prd`, `mat`, `mfg`, `pur`.

- **모듈 전용** 구현 파일: **`<module>_<이름>.mjs`** (예: `std_tbCmUser.mjs`, `mat_grMaterialGrn.mjs`).
- **공통** (로그인·스플래시 등 여러 모듈/앱 전역에서 쓰는 라우터): 접두 **생략** — 예: `authAndSplash.mjs`. (필요 시 `common_` 접두로 통일 가능.)
- **`server/src/lib`** (이 폴더 밖): 전역 유틸(`pgErrors.mjs`, `strings.mjs` 등)은 접두 없음. 모듈 전용 헬퍼만 `prd_` 등 동일 규칙.

## 파일 목록 (STD)

| 파일 | 용도 |
|------|------|
| `std_tbCmUser.mjs` | `tb_cm_user` — `std_base_user_mgmt` |
| `std_tbCmCode.mjs` | 공통코드 |
| `std_tbCmCustomer.mjs` | 거래처 |
| `std_fnMesStd.mjs` | `createFnUnitProcessOnlyRouter`, `createFnUnitProcessLineOnlyRouter`, `createFnMesStdRouter`(합침) |
| `std_userAccessLog.mjs` | 사용자 접속 LOG·`POST /api/menu-access` |
| `std_mesAuthority.mjs` | 사용자·메뉴 권한 |
| `std_cfgMes.mjs` / `std_cfgMesMutations.mjs` | 기준설정 조회·저장 |
| `std_processLineMes.mjs` / `std_lineCodeMes.mjs` / `std_unitProcessLineCodeMes.mjs` | 공정라인·LINE·단위공정라인 코드 |
| `authAndSplash.mjs` | 로그인·스플래시(공통) |

[`../index.mjs`](../index.mjs) 는 **`routes/byScreen`** 팩토리와 필요 시 `authAndSplash` 등을 등록한다.
