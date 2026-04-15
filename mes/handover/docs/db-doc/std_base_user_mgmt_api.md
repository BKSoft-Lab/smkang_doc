# std_base_user_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_user_mgmt`  
구현: [`renderer/src/screens/std/std_base_user_mgmt.tsx`](../../renderer/src/screens/std/std_base_user_mgmt.tsx)  
사용자 API 베이스: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()`  
사용자 API: [`renderer/src/lib/tbCmUserApi.ts`](../../renderer/src/lib/tbCmUserApi.ts)  
매퍼: [`renderer/src/lib/tbCmUserMapper.ts`](../../renderer/src/lib/tbCmUserMapper.ts)  
공통코드(부서·직급): [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — 베이스는 [`userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` — **`/api/fn-cm-code`**  
BE 구현: [`server/src/index.mjs`](../../server/src/index.mjs) — PostgreSQL `tb_cm_user` 직접 접근(레거시 [`frmUser.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmUser.cs) 조회·MERGE·삭제 의미).

---

## 1. 베이스 URL·환경

### 1.1 사용자 관리 BE (`/api/users`)

| 환경 | 동작 |
|------|------|
| **Electron(원격 UI)** | 부트 시 IPC [`mes:get-user-mgmt-api-base`](../../electron/main.cjs) → INI **`USER_MGMT_API_BASE`**(있으면 그대로) 또는 **`UI_URL`의 origin 호스트 + `USER_MGMT_API_PORT`**(기본 **8787**) → `window.__MES_USER_MGMT_API_BASE__` → [`userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts). 환경 변수 **`MES_USER_MGMT_API_BASE`** 가 있으면 INI보다 우선. |
| **Vite dev** | `VITE_USER_MGMT_API_BASE` 비어 있으면 **`/api`** → 프록시 대상: **`MES_USER_MGMT_PROXY_TARGET`** 또는 저장소 루트 **`mes-config.ini`**(동일 INI 규칙), 없으면 **`http://localhost:8787`**. |
| **프로덕션(순수 브라우저 번들)** | **`VITE_USER_MGMT_API_BASE`** 빌드 시 주입. |
| **TLS 사설 인증서** | Electron: 파생·명시 BE URL의 hostname을 인증서 예외 목록에 추가([`extendCertAllowlistFromIniUserMgmt`](../../electron/main.cjs)). |

### 1.2 공통코드 `/api/fn-cm-code`

| 환경 | 동작 |
|------|------|
| **Vite dev** | `userMgmtBeUrl('/api/fn-cm-code')` → 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` + path. |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 사용자 목록·조건조회 | GET | `/api/users` | BE → PostgreSQL `tb_cm_user` |
| 부서 콤보 | GET | `/func/fn_cm_code` | `p1=DEPT` |
| 직급 콤보 | GET | `/func/fn_cm_code` | `p1=DUTY` |
| 저장(신규/수정) | POST | `/api/users` | JSON — 서버에서 bcrypt `user_pwd`, `UPDATE` 후 없으면 `INSERT` upsert |
| 삭제 | DELETE | `/api/users` | 쿼리 `user_id` |

---

## 3. GET — `/api/users`

### 3.1 호출 코드

- [`tbCmUserApi.ts`](../../renderer/src/lib/tbCmUserApi.ts) — `fetchTbCmUsers(query)`

### 3.2 URL·쿼리

```
GET {userMgmtBase}/api/users?{쿼리스트링}
```

| 파라미터 | 전송 조건 | BE 의미(레거시 정합) |
|----------|-----------|----------------------|
| `user_id__like` | trim 후 비어 있지 않을 때 | `user_id LIKE upper(값) \|\| '%'` |
| `user_name__like` | trim 후 비어 있지 않을 때 | 이름에 부분 문자열 포함(대소문자 무시) |
| (암시) | **항상** | `user_id <> 'DEVELOPER'` |

### 3.3 호출 시점·조건

| 시점 | 인자 | 트리거 |
|------|------|--------|
| 화면 **최초 마운트** | `{}` | `useEffect` 1회 |
| Toolbar **Search** | 필터 있을 때만 쿼리 파라미터 | `runSearch` |
| **저장·삭제 성공** 후 | 현재 필터 | `runSearch()` |

### 3.4 응답 처리

- JSON **배열** — `TbCmUser[]`. (`data` 래핑 없음)
- 필드: `telephone`, `address`, `attribute02`(E-Mail) 포함.

### 3.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | 본문 JSON `{ error }` 우선 파싱 후 `throw` |
| 화면 | `조회 실패: …` 배너 |

---

## 4. GET — `/func/fn_cm_code` (부서·직급)

(기존과 동일 — §4 유지)

### 4.1 호출 코드

- [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions(p1)`

### 4.2 URL

```
GET {mesDbBase}/func/fn_cm_code?p1=DEPT
GET {mesDbBase}/func/fn_cm_code?p1=DUTY
```

### 4.3 호출 시점

- 화면 마운트 시 `Promise.all`로 **동시 2회**.

### 4.4 응답·UI

- 그리드 부서·직급 명칭: `resolveFnCmCodeLabel`. 상세: `PlainSelect` + `mergeLegacyCodeOption`.

### 4.5 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw` → 배너 **`공통코드(DEPT/DUTY) 로드 실패`** |

---

## 5. POST — `/api/users` (저장)

### 5.1 호출 코드

- `postTbCmUser(body)` — [`tbCmUserApi.ts`](../../renderer/src/lib/tbCmUserApi.ts)
- `buildTbCmUserPostBody` — [`tbCmUserMapper.ts`](../../renderer/src/lib/tbCmUserMapper.ts)

### 5.2 BE 동작

- PostgreSQL **`UPDATE tb_cm_user … WHERE user_id = $1`** — `rowCount === 0` 이면 **`INSERT`** (레거시 DB에 `user_id` UNIQUE/PK가 없어 `ON CONFLICT (user_id)` 가 불가한 경우 대비).
- **`password`**: 평문이 비어 있지 않으면 **bcrypt** 해시 후 `user_pwd` 저장. 비어 있으면 **기존 행은 기존 `user_pwd` 유지**, 신규는 **400**. **`user_pwd` 컬럼**이 **varchar(50)** 등 짧으면 해시(약 **60자**)가 들어가지 않아 PostgreSQL **22001** — **`VARCHAR(72)` 이상** 또는 **`TEXT`** 권장.
- **`pass`**: 정책상 DB에 **빈 문자열**로 둠(평문 미저장).
- **`beginning_employment_date`**: 레거시 DB에서 **`varchar`** 인 경우가 있어, `date`와 `COALESCE`를 섞지 않고 **`to_char(…,'YYYY-MM-DD')`**·**`CASE`** 로 문자열과 맞춤. INSERT는 `to_char(COALESCE($8::date, CURRENT_DATE), 'YYYY-MM-DD')`; UPDATE는 기존 행이 비어 있지 않으면 유지, 아니면 동일 `to_char`.
- **`DEVELOPER`**: 저장 **403**.

### 5.3 클라이언트 검증(저장 전)

- (기존과 동일) 신규 비밀번호 필수, 변경 시 Pass 체크 일치 등 — 화면 + 매퍼.

### 5.4 POST JSON 필드(매퍼 기준)

| 필드 | 출처·비고 |
|------|-----------|
| `user_id`, `user_name` | 필수 |
| `password` | 비밀번호 **변경·신규** 시만 포함. BE에서만 해시. |
| `dept`, `duty`, `mobile`, `telephone` | 상세 |
| `beginning_employment_date` | `YYYY-MM-DD` 등 |
| `ip_address`, `user_initial`, `resigned`, `activated` | 상세 |
| `address`, `attribute02` | 주소, E-Mail(레거시 `ATTRIBUTE02`) |
| `description` | |
| `attribute01` | 기본 `Y` |
| `create_date`, `created_by`, `update_date`, `updated_by` | 감사 필드( BE가 일부 보정 가능) |

### 5.5 에러

| 원인 | 동작 |
|------|------|
| 400 / 403 / 500 | JSON `error` 메시지 |
| **22001** (varchar 길이 초과) | 흔히 **`user_pwd` varchar(50)** + bcrypt — `friendlyPgError`에 `ALTER TABLE` 안내 |
| **400** (`user_pwd` varchar(n) 부족) | BE가 **`information_schema`** 로 `n`을 읽어 해시 길이 초과 시 **PostgreSQL 전** 차단·`ALTER TABLE` 문구 |
| 화면 | **`저장 실패: …`** |

---

## 6. DELETE — `/api/users`

### 6.1 형태

```
DELETE {userMgmtBase}/api/users?user_id={user_id}
```

- `DEVELOPER` 삭제 **403**. 없는 행 **404**.

### 6.2 호출 시점

- 인라인 삭제 확인 후 `executeDelete`.

### 6.3 에러

| 원인 | 동작 |
|------|------|
| `res.ok === false` | `throw` → **`삭제 실패: …`** |

---

## 7. 테이블·응답 필드 (`tb_cm_user`)

| 필드 | 비고 |
|------|------|
| `user_id` | 식별자(업서트 시 `WHERE`·`INSERT` 키; DB에 PK/UNIQUE 없어도 BE upsert 동작) |
| `user_name` | |
| `pass` | BE가 빈 문자열 유지 |
| `user_pwd` | **bcrypt** 해시(기존 MD5·Oracle 패키지와 **비호환** — 이전 비밀번호는 재설정 전제) |
| `dept`, `duty` | |
| `mobile`, `telephone` | |
| `beginning_employment_date` | |
| `ip_address`, `user_initial` | |
| `resigned`, `activated` | |
| `address`, `attribute02`, `description` | `attribute02` = E-Mail |
| `attribute01` … | |
| `create_date`, `created_by`, `update_date`, `updated_by` | |

---

## 8. 그리드·상세 UI 매핑 (`tbCmUserToGridRow`)

| 그리드 인덱스 | 컬럼명 | DB·비고 |
|---------------|--------|---------|
| 0 | 사용자ID | `user_id` |
| 1 | 사용자명 | `user_name` |
| 2 | 부서 | `dept` → 명칭(`fn_cm_code`) |
| 3 | 직급 | `duty` → 명칭 |
| 4 | Mobile | `mobile` |
| 5 | 전화번호 | `telephone` |
| 6 | IP Address | `ip_address` |
| 7 | 이니셜 | `user_initial` |
| 8 | 퇴사 | `resigned` |
| 9 | Activated | `activated` |
| 10 | 주소 | `address` |
| 11 | E-Mail | `attribute02` |
| 12 | 설명 | `description` |

---

## 9. 보완·주의점(제안)

1. **스키마**: `tb_cm_user`에 `telephone`, `address`, `attribute02` 및 `user_id` UNIQUE(PK) 필요. 없으면 마이그레이션 선행.
2. **다른 화면**: `fetchTbCmUsers`를 쓰는 화면(예: 사용자 권한)도 **동일 BE**를 바라봄 — BE 가동·`VITE_USER_MGMT_API_BASE` 필수.
3. **운영**: 구 사용자 비밀번호는 bcrypt 전환 전 **재설정** 정책 명시.

---

## 10. 관련 소스 파일

| 파일 |
|------|
| `renderer/src/screens/std/std_base_user_mgmt.tsx` |
| `renderer/src/lib/tbCmUserApi.ts` |
| `renderer/src/lib/userMgmtBeBaseUrl.ts` |
| `renderer/src/lib/tbCmUserMapper.ts` |
| `renderer/src/lib/fnCmCodeApi.ts` |
| `renderer/src/lib/mesDbBaseUrl.ts` |
| `renderer/vite.config.ts` (`proxy`: `/api`, `/db`, `/func`) |
| `server/src/index.mjs` |
| `server/.env.example` |
