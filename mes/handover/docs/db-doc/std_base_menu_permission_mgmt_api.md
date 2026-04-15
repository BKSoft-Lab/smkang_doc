# std_base_menu_permission_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_menu_permission_mgmt`  
구현: [`renderer/src/screens/std/std_base_menu_permission_mgmt.tsx`](../../renderer/src/screens/std/std_base_menu_permission_mgmt.tsx)  
BE 베이스: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` (STD BE, 기본 포트 8787)  
메뉴·권한 API: [`renderer/src/lib/menuAuthorityApi.ts`](../../renderer/src/lib/menuAuthorityApi.ts)  
공통코드: [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — **`/api/fn-cm-code`**  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmMenuAuthMng.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmMenuAuthMng.cs) (메뉴 목록 편집은 [`frmMenuManagement.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmMenuManagement.cs) 별도)

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등으로 주입된 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/fn-mes-menu-user-class?p1=MM` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 권한그룹 콤보 | GET | `/api/fn-cm-code` | `p1=USER_CLASS&p2=disp_seq` |
| 메뉴+권한 트리 | GET | `/api/fn-mes-menu-user-class` | `p1={user_class}` — 서버에서 `tb_mes_menu` JOIN `tb_mes_menu_authority` |
| 권한 저장 | POST | `/api/tb-mes-menu-authority` | 권한 변경 반영 |
| 권한 삭제 | DELETE | `/api/tb-mes-menu-authority` | `pgm_code`·`menu_code`·`user_class` 쿼리 |

**참고:** 레거시·게이트웨이에서 `tb_mes_menu`를 직접 GET 하던 경우가 있으나, **현재 STD BE 화면**은 위 API만 호출한다.

---

## 3. GET — `/api/fn-cm-code` (권한그룹 콤보)

### 3.1 호출 코드

- **파일**: [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions('USER_CLASS')`

### 3.2 URL

```
GET {base}/api/fn-cm-code?p1=USER_CLASS&p2=disp_seq
```

### 3.3 호출 시점·조건

| 시점 | 인자 | 트리거 |
|------|------|--------|
| 화면 **최초 마운트** | `p1=USER_CLASS`, `p2=disp_seq` | `useEffect` 1회 |

### 3.4 응답·UI

- **18건** — `{ code, code_name }` 배열.
- `PlainSelect` 콤보에 바인딩. **첫 번째 항목(`code="MM"`, 자재 관리자)** 이 자동 선택되어 §4 호출을 트리거한다.

| code | code_name | code | code_name |
|------|-----------|------|-----------|
| `MM` | 자재 관리자 | `MTM` | 생산기술 관리자 |
| `MS` | 자재 구성원 | `MTS` | 생산기술 구성원 |
| `QM` | QM 관리자 | `SM` | 영업 관리자 |
| `QS` | QS 구성원 | `SS` | 영업 구성원 |
| `RM` | 수리분석 | `A` | Admin |
| `IO` | 검사 작업자 | `G` | Guest |
| `PM` | 제조 관리자 | `S` | Super User |
| `PS` | 제조 구성원 | `O` | Operator |
| `SO` | SMT 작업자 | `EX_PRODUCE` | 외주협력사 |

### 3.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(...)` |
| 화면 | 배너 **`공통코드 로드 실패: …`** |

---

## 4. GET — `/api/fn-mes-menu-user-class` (핵심 — 메뉴 트리+권한)

### 4.1 호출 코드

- **함수**: 화면 내 `fetch` 호출 (또는 전용 API 함수)

### 4.2 URL·쿼리

```
GET {base}/api/fn-mes-menu-user-class?p1={user_class}
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `p1` | **항상** | 콤보에서 선택된 `user_class` 코드 (예: `MM`, `QM`, `A`) |

### 4.3 호출 시점·조건

| 시점 | 인자 | 트리거 |
|------|------|--------|
| 화면 **최초 마운트** | 콤보 첫 번째 값(`MM`) | 콤보 초기화 직후 자동 |
| 콤보 **변경** | 선택된 `code` | `onChange` |
| **저장 성공** 후 | 현재 콤보 값 | 트리 갱신 |

### 4.4 응답 구조

**`p1=MM` 기준 476건** 반환. 서버 사이드에서 `tb_mes_menu LEFT JOIN tb_mes_menu_authority` 를 수행한 결과.

| 필드 | 타입 | 설명 |
|------|------|------|
| `menu_code` | string | 메뉴 코드 |
| `pgm_code` | string | 모듈 코드 (`BAS`, `MAT`, `PDM`, `POP`, `PSM`, `SCM`) |
| `pgm_name` | string | 모듈명 (기준정보, 자재관리 등) |
| `depth` | string | `"1"` = 메뉴 그룹, `"2"` = 하위 메뉴 |
| `menu_name` | string | 메뉴 표시명 |
| `seq_idx` | string | 정렬 순서 |
| `form_code` | string | 폼 코드 (depth=1이면 빈 문자열) |
| `user_class` | string | 조회한 권한그룹 코드 |
| **`접근권한`** | string | `"Y"` / `"N"` (한글 컬럼명) |
| **`실행권한`** | string | `"Y"` / `"N"` (한글 컬럼명) |
| `parent_menu_code` | string | 상위 메뉴 코드 (depth=1이면 빈 문자열) |

### 4.5 권한 ↔ Dot 색상 매핑

| 접근권한 | 실행권한 | Dot 색상 | 의미 | 분포(MM 기준) |
|----------|----------|----------|------|---------------|
| `N` | `N` | **red** | 권한없음 | 19건 (4.0%) |
| `Y` | `N` | **emerald** | 접근권한(조회) | 36건 (7.6%) |
| `Y` | `Y` | **violet** | 모든권한 | 421건 (88.4%) |

### 4.6 트리 구성 방법

응답을 **pgm_code(모듈) → depth=1(그룹) → depth=2(하위 메뉴)** 3단 계층으로 재구성.

```
[BAS] 기준정보
 ├─ 파일(F)                     ● violet
 │   ├─ 신규                    ● violet
 │   ├─ 조회                    ● violet
 │   └─ …
 ├─ 기초정보(B)                  ● violet
 │   ├─ 공통코드 관리             ● violet
 │   ├─ 사용자 LOG 조회           ● red      ← 접근:N 실행:N
 │   └─ …
[MAT] 자재관리
 ├─ 베이킹관리                   ● emerald   ← 접근:Y 실행:N
 └─ …
```

- 모듈별 메뉴 수: **BAS**(30), **MAT**(183), **PDM**(48), **POP**(48), **PSM**(135), **SCM**(32)
- 같은 `menu_code`가 여러 `pgm_code`에 존재할 수 있음 (`msFiles`, `msWindow` 등 공통 메뉴)

### 4.7 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(...)` |
| 화면 | 배너 **`메뉴 권한 조회 실패: …`** |

---

## 5. DB 테이블 `tb_mes_menu` (참고 — 렌더러 직접 GET 없음)

`GET /api/fn-mes-menu-user-class` 는 [`std_mesAuthority.mjs`](../../server/src/lib/queries/std_mesAuthority.mjs) 에서 **`tb_mes_menu` LEFT JOIN `tb_mes_menu_authority`** 로 한 번에 조회한다. 과거 문서의 `GET …/tb_mes_menu`·`tb_mes_menu_all` 직접 호출은 **현재 STD BE 화면에서는 사용하지 않는다.**

---

## 6. POST — `/api/tb-mes-menu-authority` (권한 저장)

### 6.1 호출 시점

- Toolbar **Save** — 사용자가 트리에서 Dot을 변경한 항목만 diff 계산 후 전송.

### 6.2 JSON 필드

| 필드 | 출처·비고 |
|------|-----------|
| `pgm_code` | 변경된 메뉴의 모듈 코드 |
| `menu_code` | 변경된 메뉴 코드 |
| `form_code` | 해당 메뉴의 폼 코드 |
| `user_class` | 현재 콤보에서 선택된 권한그룹 코드 |
| `access_power` | `"Y"` / `"N"` |
| `execute_power` | `"Y"` / `"N"` |
| `created_by` | 현재 로그인 사용자 |

**복합 키**: `pgm_code` + `menu_code` + `user_class` — 같은 `menu_code`가 여러 모듈에 존재하므로 `pgm_code`가 반드시 필요.

### 6.3 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(...)` |
| 화면 | 배너 **`저장 실패: …`** |

---

## 7. DELETE — `/api/tb-mes-menu-authority` (권한 삭제)

### 7.1 형태

```
DELETE {base}/api/tb-mes-menu-authority?pgm_code={pgm_code}&menu_code={menu_code}&user_class={user_class}
```

### 7.2 호출 시점

- 저장 시 기존 권한 행 제거가 필요한 경우(N/N으로 변경 등).

### 7.3 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw new Error(...)` |
| 화면 | 배너 **`삭제 실패: …`** |

---

## 8. 테이블·응답 필드 (`tb_mes_menu_authority` 관점)

**7,784건** (17개 `user_class` × 메뉴 수). `PS`(제조 구성원)만 데이터 0건(미설정).

| 필드 | 비고 |
|------|------|
| `pgm_code` | 모듈 코드 — 복합 PK 일부 |
| `menu_code` | 메뉴 코드 — 복합 PK 일부 |
| `form_code` | 폼 코드 |
| `user_class` | 권한그룹 코드 — 복합 PK 일부 |
| `access_power` | 접근권한 `"Y"` / `"N"` |
| `execute_power` | 실행권한 `"Y"` / `"N"` |
| `create_date` | 생성일시 |
| `created_by` | 생성자 |
| `update_date` | 수정일시 |
| `updated_by` | 수정자 |

**권한 조합 분포 (전체 7,784건)**:

| access_power | execute_power | 의미 | 건수 | 비율 |
|--------------|---------------|------|------|------|
| `N` | `N` | 권한없음 | 4,658 | 59.8% |
| `Y` | `Y` | 모든권한 | 1,764 | 22.7% |
| `Y` | `N` | 접근권한(조회) | 1,362 | 17.5% |

---

## 9. UI 트리 매핑

### 9.1 Dot 색상 범례

| Dot | 클래스 | 의미 |
|-----|--------|------|
| 🔴 red | `bg-red-500` | 권한없음 (`N`/`N`) |
| 🟢 emerald | `bg-emerald-500` | 접근권한·조회만 (`Y`/`N`) |
| 🟣 violet | `bg-violet-500` | 모든권한 (`Y`/`Y`) |

### 9.2 트리 계층 구조

| 레벨 | 소스 | 들여쓰기 | 스타일 |
|------|------|----------|--------|
| 모듈 | `pgm_code` (`[BAS]`, `[MAT]`…) | `pl-0` | **볼드**, bracket `[-]` |
| 그룹 | depth=`"1"` (parent 없음) | `pl-3` | 일반 |
| 메뉴 | depth=`"2"` (parent 있음) | `pl-6` | Dot 표시 |

### 9.3 더블클릭 토글 순환

| 현재 상태 | → 다음 상태 | 설명 |
|-----------|-------------|------|
| `N`/`N` (red) | `Y`/`N` (emerald) | 권한없음 → 접근권한 |
| `Y`/`N` (emerald) | `Y`/`Y` (violet) | 접근권한 → 모든권한 |
| `Y`/`Y` (violet) | `N`/`N` (red) | 모든권한 → 권한없음 |

---

## 10. 실행 흐름 요약

```
┌── 화면 마운트 ──────────────────────────────────────────┐
│ ① fn_cm_code?p1=USER_CLASS&p2=disp_seq → 콤보 18건     │
│ ② 첫 번째 값 "MM" 자동 선택                              │
│ ③ fn_mes_menu_user_class?p1=MM → 476건 → 트리 렌더링    │
└──────────────────────────────────────────────────────────┘

┌── 콤보 변경 ────────────────────────────────────────────┐
│ fn_mes_menu_user_class?p1={선택값} → 트리 전체 갱신       │
└──────────────────────────────────────────────────────────┘

┌── 저장 ─────────────────────────────────────────────────┐
│ ① 변경된 항목 diff 계산                                   │
│ ② POST /api/tb-mes-menu-authority (변경/신규)              │
│    DELETE /api/tb-mes-menu-authority (삭제)                │
│ ③ fn_mes_menu_user_class?p1={현재값} → 트리 갱신          │
└──────────────────────────────────────────────────────────┘
```

---

## 11. 공통 메뉴 중복 (주의)

같은 `menu_code`가 여러 `pgm_code`에 등록된 경우:

| menu_code | 등장 모듈 |
|-----------|----------|
| `msFiles` | BAS, MAT, PDM, POP, PSM |
| `msWindow` | BAS, MAT, PDM, POP, PSM, SCM |
| `msHelp` | BAS, MAT, PDM, POP, PSM |
| `msBasic` | BAS, MAT |
| `msStock` | MAT, PDM, PSM |
| `PsmScaner` | MAT, PDM, PSM |

**저장·삭제 시 반드시 `pgm_code`를 함께 전송**해야 올바른 행을 특정할 수 있다.

---

## 12. 보완·주의점(제안)

1. **한글 컬럼명**: `fn_mes_menu_user_class` 응답에 `접근권한`, `실행권한` 한글 키가 사용됨 — 프론트에서 `row['접근권한']`으로 접근 필요.
2. **`PS` 미설정**: 18개 `user_class` 중 `PS`(제조 구성원)만 `tb_mes_menu_authority`에 데이터 0건. 콤보에서 선택 시 모든 메뉴가 `N`/`N`(권한없음)으로 표시될 수 있음.
3. **depth 문자열**: `fn_mes_menu_user_class` 응답의 `depth`·`seq_idx`가 **문자열**(`"1"`, `"2"`) — 정렬 시 `Number()` 변환 필요.
4. **`tb_mes_menu_all` 제한**: MAT·PDM·BAS 3개 모듈만 포함. PSM·POP·SCM 메뉴는 이 테이블에 없으므로 전체 메뉴 구조는 `fn_mes_menu_user_class` 또는 `tb_mes_menu`를 사용해야 한다.
5. **`N/Y` 조합 부재**: 접근 불가인데 실행 가능(`access=N`, `execute=Y`)한 데이터는 없음 — 논리적으로 타당하나 프론트에서 방어 로직 권장.

---

## 13. 관련 소스 파일

| 파일 |
|------|
| `renderer/src/screens/std/std_base_menu_permission_mgmt.tsx` |
| `renderer/src/lib/fnCmCodeApi.ts` |
| `renderer/src/lib/mesDbBaseUrl.ts` |
| `renderer/vite.config.ts` (`proxy`: `/db`, `/func`) |
