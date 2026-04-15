# std_base_user_permission_mgmt — DB·HTTP API 상세 정리

화면 ID: `std_base_user_permission_mgmt`  
구현: [`renderer/src/screens/std/std_base_user_permission_mgmt.tsx`](../../renderer/src/screens/std/std_base_user_permission_mgmt.tsx)  
BE 베이스: [`renderer/src/lib/userMgmtBeBaseUrl.ts`](../../renderer/src/lib/userMgmtBeBaseUrl.ts)의 `userMgmtBeUrl()` (STD BE, 기본 포트 8787)  
권한 API: [`renderer/src/lib/userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts)  
사용자 목록 API: [`renderer/src/lib/tbCmUserApi.ts`](../../renderer/src/lib/tbCmUserApi.ts) — **`GET /api/users`**  
공통코드: [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — **`/api/fn-cm-code`**  
레거시(Oracle): [`docs/legacy_mes/Basis/_2S_MES_Basis/frmUserAuthority.cs`](../legacy_mes/Basis/_2S_MES_Basis/frmUserAuthority.cs)

---

## 1. 베이스 URL·환경

| 환경 | 동작 |
|------|------|
| **Vite dev** | 상대 **`/api/...`** → [`vite.config.ts`](../../renderer/vite.config.ts) 프록시 → STD BE(기본 `http://localhost:8787`). |
| **Electron** | `USER_MGMT_API_BASE` 등으로 주입된 베이스 + path. |
| **절대 URL 예** | `http://localhost:8787/api/fn-user-authority-base?p1=A` |

---

## 2. 엔드포인트 요약

| 구분 | Method | Path | 용도 |
|------|--------|------|------|
| 부서 콤보 | GET | `/api/fn-cm-code` | `p1=DEPT&p2=disp_seq` |
| 직급 콤보 | GET | `/api/fn-cm-code` | `p1=DUTY&p2=disp_seq` |
| 권한그룹 콤보 | GET | `/api/fn-cm-code` | `p1=USER_CLASS&p2=disp_seq` |
| 부서별 사용자 목록 | GET | `/api/fn-cm-user-dept` | `p1=<dept>` |
| 전체 사용자 (부서 "전체") | GET | `/api/users` | `_orderBy=user_id` |
| 선택 사용자 권한그룹 | GET | `/api/fn-user-authority-userid` | `p1=<user_id>` |
| 권한그룹별 사용자 | GET | `/api/fn-user-authority-base` | `p1=<user_class>` |
| 권한 추가 | POST | `/api/tb-mes-user-authority` | JSON body |
| 권한 삭제 | DELETE | `/api/tb-mes-user-authority` | `user_id` + `user_class` |

---

## 3. GET — `/api/fn-cm-code` (콤보 3종)

### 3.1 호출 코드

- **파일**: [`fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) — `fetchFnCmCodeOptions(p1, p2)`

### 3.2 URL·쿼리

```
GET {base}/api/fn-cm-code?p1=DEPT&p2=disp_seq
GET {base}/api/fn-cm-code?p1=DUTY&p2=disp_seq
GET {base}/api/fn-cm-code?p1=USER_CLASS&p2=disp_seq
```

| 파라미터 | 의미 |
|----------|------|
| `p1` | 그룹 코드 (`DEPT` / `DUTY` / `USER_CLASS`) |
| `p2` | 정렬 기준 (`disp_seq`) |

### 3.3 호출 시점·조건

| 시점 | 트리거 |
|------|--------|
| **최초 마운트** | `useEffect` 1회 — 3종 `Promise.all` 병렬 |

### 3.4 응답·UI

- `code` → `FnCmCodeOption.value`, `code_name` → `label`.
- 부서 콤보는 **"전체"** 옵션(빈 문자열) 선두 삽입.
- 초기 선택: 부서 → 첫 옵션, 권한그룹 → 첫 옵션.

### 3.5 에러

| 원인 | 동작 |
|------|------|
| HTTP 오류 | 배너 `콤보 로드 실패: …` |

---

## 4. GET — `/api/fn-cm-user-dept` (좌측 사용자 그리드)

### 4.1 호출 코드

- **파일**: [`userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts) — `fetchCmUserDept(dept)`

### 4.2 URL·쿼리

```
GET {base}/api/fn-cm-user-dept?p1=<dept>
```

| 파라미터 | 전송 조건 | 의미 |
|----------|-----------|------|
| `p1` | **항상** | 부서 코드 |

### 4.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **부서 콤보 변경** | `filterDept` | `useEffect` |
| 부서 **"전체"** 선택 | `filterDept === ''` | `fetchAllCmUsersForDeptGrid` — `GET /api/users` 대체 |

### 4.4 응답·UI

- 타입: `CmUserDeptRow` (`user_id`, `user_name`, `dept`, `dept_code_name`, `duty`, `duty_code_name`)
- 그리드 열: **사용자 ID**, **사용자 이름**, **부서**, **직급**

### 4.5 에러

| 원인 | 동작 |
|------|------|
| HTTP 오류 | 배너 `부서 사용자 조회 실패: …` |

---

## 5. GET — `/api/users` (부서 "전체" 대체)

### 5.1 호출 코드

- **파일**: [`tbCmUserApi.ts`](../../renderer/src/lib/tbCmUserApi.ts) — `fetchTbCmUsers({})`  
  → [`userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts) — `fetchAllCmUsersForDeptGrid(deptOpts, dutyOpts)`

### 5.2 URL·쿼리

```
GET {base}/api/users?_orderBy=user_id
```

### 5.3 호출 시점·조건

| 시점 | 조건 | 트리거 |
|------|------|--------|
| 부서 콤보 **"전체"** | `filterDept === ''` | `loadLeftGrid` / `loadCopyGrid` |

### 5.4 응답 처리

- `TbCmUser` 전체 행 → `CmUserDeptRow`로 매핑.
- `dept`/`duty` 코드를 `resolveFnCmCodeLabel`로 **명칭**(`dept_code_name`, `duty_code_name`) 치환.

---

## 6. GET — `/api/fn-user-authority-userid` (선택 사용자 권한그룹)

### 6.1 호출 코드

- **파일**: [`userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts) — `fetchUserAuthorityOfUser(userId)`

### 6.2 URL·쿼리

```
GET {base}/api/fn-user-authority-userid?p1=<user_id>
```

| 파라미터 | 의미 |
|----------|------|
| `p1` | 사용자 ID |

### 6.3 호출 시점·조건

| 시점 | 조건 | 트리거 |
|------|------|--------|
| 좌측 그리드 **행 클릭** | `selectedUser` 변경 | `useEffect` |
| 탭1 **저장 완료** 후 | `selectedUser` 존재 시 | `runSave` |
| 탭2 **저장** 도중 | 대상 사용자별 기존 권한 조회 | `runSave` (복제 삭제 전) |

### 6.4 응답·UI

- 타입: `UserAuthorityOfUser` (`user_id`, `user_class`, `code_name`)
- 좌측 하단 **권한그룹 그리드**: `code_name`만 표시 (`MesDataGridPanel`, 줄번호 `lineNoColWidth="3ch"`)

### 6.5 에러

| 원인 | 동작 |
|------|------|
| HTTP 오류 | 배너 `권한 조회 실패: …` |

---

## 7. GET — `/api/fn-user-authority-base` (우측 탭1 권한그룹 그리드)

### 7.1 호출 코드

- **파일**: [`userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts) — `fetchUserAuthorityBase(userClass)`

### 7.2 URL·쿼리

```
GET {base}/api/fn-user-authority-base?p1=<user_class>
```

| 파라미터 | 의미 |
|----------|------|
| `p1` | 권한그룹 코드 |

### 7.3 호출 시점·조건

| 시점 | 인자/조건 | 트리거 |
|------|-----------|--------|
| **권한그룹 콤보 변경** | `filterUserClass` | `useEffect` |
| 탭1 **저장 완료** 후 | `filterUserClass` | `runSave` → `loadRightGrid` |

### 7.4 응답·UI

- 타입: `UserAuthorityBaseRow` (`user_id`, `user_class`, `user_name`, `dept`, `dept_code_name`, `duty`, `duty_code_name`)
- 우측 탭1 그리드: **사용자 ID**, **사용자 이름**, **부서**, **직급**
- 로드 직후 `groupOriginalIds`(user_id `Set`)에 원본 스냅샷 저장 — 저장 시 diff 계산용

### 7.5 에러

| 원인 | 동작 |
|------|------|
| HTTP 오류 | 배너 `권한그룹 사용자 조회 실패: …` |

---

## 8. POST — `/api/tb-mes-user-authority` (권한 추가)

### 8.1 호출 코드

- **파일**: [`userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts) — `postUserAuthority(body)`

### 8.2 URL·Body

```
POST {base}/api/tb-mes-user-authority
Content-Type: application/json
```

### 8.3 JSON 필드

| 필드 | 출처·비고 |
|------|-----------|
| `user_id` | 추가 대상 사용자 ID |
| `user_class` | 현재 선택된 권한그룹 코드(`filterUserClass`) |
| `created_by` | 탭1: `'ADMIN'` 고정 / 탭2: 좌측 선택 사용자 `selectedUser.user_id` |

### 8.4 호출 시점·조건

| 시점 | 조건 | 트리거 |
|------|------|--------|
| 탭1 **저장** | diff에서 추가된 user_id 건별 | `runSave` (group) |
| 탭2 **저장** | 대상 사용자별 × 좌측 사용자 권한그룹 수 | `runSave` (copy) |

### 8.5 에러

| 원인 | 동작 |
|------|------|
| HTTP 오류 | `fail` 카운터 증가 → 배너 `일부 실패` 또는 `저장 완료` |

---

## 9. DELETE — `/api/tb-mes-user-authority` (권한 삭제)

### 9.1 호출 코드

- **파일**: [`userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts) — `deleteUserAuthority(userId, userClass)`

### 9.2 URL·쿼리

```
DELETE {base}/api/tb-mes-user-authority?user_id=<id>&user_class=<cls>
```

| 파라미터 | 의미 |
|----------|------|
| `user_id` | 대상 사용자 ID |
| `user_class` | 권한그룹 코드 |

### 9.3 호출 시점·조건

| 시점 | 조건 | 트리거 |
|------|------|--------|
| 탭1 **저장** | diff에서 제거된 user_id 건별 | `runSave` (group) |
| 탭2 **저장** | 대상 사용자 기존 권한 전체 삭제 | `runSave` (copy) |

### 9.4 에러

| 원인 | 동작 |
|------|------|
| HTTP 오류 | `fail`/`delFail` 카운터 증가 |

---

## 10. 테이블·응답 필드

### `tb_mes_user_authority` (저장 테이블)

| 필드 | 비고 |
|------|------|
| `user_id` | PK — 사용자 ID |
| `user_class` | PK — 권한그룹 코드 |
| `create_date` | 생성일 (서버 자동) |
| `created_by` | 생성자 |
| `update_date` | 수정일 |
| `updated_by` | 수정자 |

### `tb_cm_user` (사용자 마스터 — 읽기)

| 필드 | 비고 |
|------|------|
| `user_id` | PK |
| `user_name` | 이름 |
| `dept` | 부서 코드 → `fn_cm_code(DEPT)` 명칭 매핑 |
| `duty` | 직급 코드 → `fn_cm_code(DUTY)` 명칭 매핑 |

---

## 11. 그리드·UI 매핑

### 좌측 사용자 그리드

| # | 컬럼명 | DB·비고 |
|---|--------|---------|
| 1 | 사용자 ID | `user_id` |
| 2 | 사용자 이름 | `user_name` |
| 3 | 부서 | `dept_code_name` (코드 → 명칭) |
| 4 | 직급 | `duty_code_name` (코드 → 명칭) |

### 좌측 하단 권한그룹 그리드

| # | 컬럼명 | DB·비고 |
|---|--------|---------|
| 1 | 권한그룹 | `code_name` (`fn_user_authority_userid` 응답) |

### 우측 탭1 권한그룹 그리드

| # | 컬럼명 | DB·비고 |
|---|--------|---------|
| 1 | 사용자 ID | `user_id` |
| 2 | 사용자 이름 | `user_name` |
| 3 | 부서 | `dept_code_name` |
| 4 | 직급 | `duty_code_name` |

### 우측 탭2 대상·선택 그리드

위 좌측 사용자 그리드와 동일 열 구조.

---

## 12. 저장 동작 상세

### 탭1 — 권한그룹 사용자 편집

1. 좌측 사용자 더블클릭 → 우측 `rightUsers`에 추가 (중복 무시)
2. 우측 사용자 더블클릭 → `rightUsers`에서 제거
3. **저장** 시 `groupOriginalIds`(로드 시점 스냅샷)와 현재 `rightUsers` ID 비교
   - **추가**: 현재에만 있는 → `POST` (`created_by: 'ADMIN'`)
   - **삭제**: 원본에만 있는 → `DELETE`
   - 변경 없으면 배너 `변경 사항이 없습니다.`
4. 저장 완료 후 `loadRightGrid` 재호출 → 원본 동기화

### 탭2 — 권한복제

1. 대상 그리드 행 클릭 → 선택 그리드에 추가 (중복 무시)
2. 선택 그리드 행 클릭 → 제거
3. **저장** 시 선택된 사용자 각각에 대해:
   - `fn_user_authority_userid`로 기존 권한 조회
   - 기존 권한 **전체 DELETE**
   - 좌측 선택 사용자 권한그룹 **전체 POST** (`created_by: selectedUser.user_id`)

---

## 13. 보완·주의점(제안)

1. `tb_mes_user_authority` PK는 (`user_id`, `user_class`) 복합키 — 동일 조합 중복 INSERT 시 서버 오류 가능
2. 탭2 권한복제는 대상 사용자 기존 권한 **전체 삭제 후 재생성** → 중간 실패 시 부분 삭제 상태 발생 가능 (트랜잭션 미보장)
3. `created_by`가 탭1은 `'ADMIN'` 고정, 탭2는 좌측 선택 사용자 ID — 통일 여부 검토
4. 부서 "전체" 조회 시 `tb_cm_user` 전건 + 클라이언트 명칭 매핑 — 대량 사용자 시 성능 고려

---

## 14. 관련 소스 파일

| 파일 | 경로 |
|------|------|
| 화면 | [`renderer/src/screens/std/std_base_user_permission_mgmt.tsx`](../../renderer/src/screens/std/std_base_user_permission_mgmt.tsx) |
| 권한 API | [`renderer/src/lib/userAuthorityApi.ts`](../../renderer/src/lib/userAuthorityApi.ts) |
| 사용자 API | [`renderer/src/lib/tbCmUserApi.ts`](../../renderer/src/lib/tbCmUserApi.ts) |
| 공통코드 API | [`renderer/src/lib/fnCmCodeApi.ts`](../../renderer/src/lib/fnCmCodeApi.ts) |
| 베이스 URL | [`renderer/src/lib/mesDbBaseUrl.ts`](../../renderer/src/lib/mesDbBaseUrl.ts) |
