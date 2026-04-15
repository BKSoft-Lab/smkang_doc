# 프로젝트 규칙 (Project Rules)

이 파일은 모든 AI 어시스턴트(Codex, Claude, Cursor 등)가 프로젝트 작업 시 반드시 따라야 하는 범용 규칙을 정의합니다.

**다른 규칙 파일**: **`ai-rules.md`** 는 본 파일을 **최우선**으로 두고 위임·중복을 줄인 참조용이다. **`.cursorrules`** 는 Cursor IDE 전용(코드 인용·워크플로 등).

## 0. AI 기본 행동 원칙

1. AI는 **대화 맥락을 기억하지 못하므로**, 항상 **프로젝트 내부 문서**를 기반으로 작업한다.
2. 작업 시작 시 **최소한의 필수 문서만** 읽고 현재 상태를 복구한다:
   - `docs/CONTEXT.md` (필수)
   - `docs/CHANGELOG.md` (최근 항목만, 필수)
   - `docs/TODO.md` (필수)
   - **UI 레이아웃·조회줄·그리드 스타일** 작업 시: **`docs/LAYOUT_RULES.md`** (§6.0과 함께)
   - 추가 문서는 작업에 필요할 때만 읽기
3. 문서 → 코드 순으로 판단하며, 문서가 코드보다 우선한다.
4. **문서 자동 갱신은 필수**: 작업 종료 시 반드시 관련 문서를 자동으로 최신화해야 한다. 문서 갱신을 건너뛰는 것은 절대 금지된다.
5. **토큰 효율성**: 불필요한 파일 읽기나 전체 검색은 피하고, 필요한 정보만 선별적으로 확인한다.
6. **마스터–상세 성능**: `MesDataGridPanel` + `MesDetailForm` 조합 작업 시 **`.cursor/rules/mes-master-detail-performance.mdc`** (항상 적용) — `onSelectRow` 안정화·`useMemo`·`virtualizeRows`·콤보 옵션 규모.

## 1. AI 자기 브리핑(Self-Briefing) 절차

새 세션이 시작되면 AI는 반드시 다음 순서를 따른다:

### 필수 단계 (항상 수행)
1. **`docs/CONTEXT.md` 읽기** - 프로젝트 현재 상태 파악
2. **`docs/CHANGELOG.md` 읽기** (최근 3-5개 항목만) - 최근 작업 이력 확인
3. **`docs/TODO.md` 읽기** - 진행 중인 작업 확인

### 선택적 단계 (필요 시에만 수행)
4. **사용자 요청에 따라 추가 확인**:
   - 코드 변경이 필요한 작업인 경우: 관련 파일만 확인
   - 문서 갱신이 필요한 작업인 경우: 해당 문서와 관련 코드만 확인
   - 전체 검사가 필요한 경우에만: 코드 diff, 의존성 파일, API, DB 스키마 등 확인
   - **DB·`tb_cm_user`·사용자 관리 BE(`server/`, `/api/users`)** 작업 시: **`project-rules.md` §4.1**, **`docs/DATABASE.md`**, **`docs/db-doc/std_base_user_mgmt_api.md`**
   - **기준정보 STD 전용 BE(`server/`, `/api/...` 공통)** 작업 시: **`project-rules.md` §4.2**, **`docs/DATABASE.md`**, 해당 화면 **`docs/db-doc/std_*_api.md`** (사용자 LOG: **`std_base_user_log_inq_api.md`**·`tb_mes_menuaccesslogs` 전제)

### 효율성 원칙
- **최소한의 파일만 읽기**: 필요한 파일만 선별적으로 읽기
- **점진적 확인**: 사용자 요청에 따라 필요한 정보만 추가로 확인
- **캐시 활용**: 이미 읽은 문서 정보는 재사용
- **전체 검사는 사용자 요청 시에만**: "문서 동기화 확인", "전체 검사" 등의 명시적 요청이 있을 때만 수행

## 2. 작업 상태 자동 저장 규칙

### docs/CONTEXT.md
- 현재 프로젝트 상태
- 진행 중인 작업
- 다음 단계

### docs/CHANGELOG.md
- 타임스탬프는 작업 완료 시점의 **실제 시간**을 **한국시간(KST)** 기준으로 기록 (`YYYY-MM-DD HH:mm KST`)
```
## YYYY-MM-DD HH:mm KST
### 작업 내용
- 변경사항 요약
### 변경된 파일
- ...
### 다음 작업 예정
- ...
```

### docs/TODO.md
- 미완료 작업
- 우선순위

### docs/USER_PROMPTS_LOG.md
- **이 규칙 적용 이후** 각 턴마다 **(1) 질문 선행 기록 → (2) 응답 → (3) 답 요약 기입** 순서를 따른다.
- **(1) 선행(필수)**: 사용자 메시지를 받은 뒤, **본문 응답·코드 편집·터미널 실행·다른 파일 저장보다 먼저** `docs/USER_PROMPTS_LOG.md`에 해당 턴의 **`###` 주제(선택)** 와 **`- 질문: …`** 만 추가한다. `- 답 요약:` 은 비워 두거나 `(응답 후 기입)` 등으로 둔다. **Cursor 에이전트는 이 선행 기록을 도구 호출로 먼저 수행**하는 것을 원칙으로 한다(순서가 바뀌면 규칙 미준수).
- **(3) 후행(필수)**: 응답과 문서 작업을 마친 뒤 **같은 블록**에 **`- 답 요약: …`**(한두 문장)를 채운다. **CHANGELOG** 등과 병행해도 된다.
- **내용**: 질문은 가능하면 원문(매우 길면 핵심만 요약). 답 요약은 **한두 문장**으로 충분하다.
- **형식**: 날짜별 `## YYYY-MM-DD` 아래에 `### (선택) 주제`, `- 질문: …`, `- 답 요약: …` 를 이어 붙인다(답은 선행 시에는 미기입 가능).
- **날짜(heading)**: Cursor **user_info**의 `Today's date:` 가 있으면 **그 연·월·일**을 사용한다(권위). 없으면 **작업 환경의 실제 달력 날짜**를 쓴다. 학습·추측 연도(예: 2025)를 임의로 쓰지 않는다.
- **동일 일자**: `## YYYY-MM-DD` 는 **하루에 한 번만** 두고, 그날 턴은 **연속으로** 추가한다(같은 날짜 제목 중복·삽입 금지).
- **섹션 순서**: 날짜 블록은 **최신이 위**(내림차순). `docs/USER_PROMPTS_LOG.md` 에서 `---` 직후 첫 `##` 가 **가장 최근 날짜**이며, **과거 날짜 블록을 최신 블록 사이에 끼워 넣지 않는다**.
- **Cursor IDE**: **`.cursor/rules/user-prompts-log-workflow.mdc`**(`alwaysApply: true`)에서 위 절차를 동일하게 반복한다. 에이전트가 선행 기록을 생략한 경우 **턴 완료 전에 보완**한다.

## 3. 필수 문서 갱신 규칙

**중요**: 다음 규칙에 해당하는 변경사항이 발생하면 **작업 종료 시 자동으로** 해당 문서를 갱신해야 합니다.

**문서 자동 갱신 강제 원칙**:
1. **자동 갱신은 필수**: 모든 코드 변경, 설정 변경, 구조 변경은 즉시 관련 문서에 반영되어야 합니다.
2. **건너뛰기 금지**: 문서 갱신을 건너뛰거나 "나중에 하겠다"고 말하는 것은 절대 금지됩니다.
3. **사용자 요청 불필요**: 사용자가 명시적으로 문서 갱신을 요청하지 않아도, 변경사항이 있으면 자동으로 문서를 갱신해야 합니다.
4. **검증 필수**: 작업 종료 전 반드시 관련 문서가 갱신되었는지 확인해야 합니다.

### 기본 문서 갱신 규칙 (자동 갱신 필수)
- **UI 레이아웃 규칙 변경**(폼/조회줄/그리드/색상 패턴) → **`docs/LAYOUT_RULES.md` 자동 업데이트** (§6.0·`FEATURES.md`와 충돌 없이 교차 참조 점검)
- **기능 추가/변경** → `docs/FEATURES.md` **자동 업데이트**
- **API 변경** → `docs/API.md` **자동 업데이트**
- **DB 스키마 변경** → `docs/DATABASE.md` **자동 업데이트**
- **설정 변경** → `docs/SETUP.md` **자동 업데이트**
- **프로젝트 구조 변경** → `README.md` **자동 업데이트**
- **의존성 추가/변경** → `README.md` 기술 스택 섹션 **자동 업데이트**
- **새 컴포넌트/모듈 추가** → `README.md` 프로젝트 구조 섹션 **자동 업데이트**
- **작업 상태 변경** → `docs/CONTEXT.md` **자동 업데이트**
- **작업 완료/시작** → `docs/CHANGELOG.md` **자동 업데이트** (필수)
- **TODO 항목 변경** → `docs/TODO.md` **자동 업데이트**
- **사용자 프롬프트 턴** → `docs/USER_PROMPTS_LOG.md` **선행(질문) + 후행(답 요약)** (위 §2 `USER_PROMPTS_LOG` 절)

### 아키텍처 및 구조 문서 갱신 규칙 (자동 갱신 필수)
- **아키텍처 변경** (레이어 구조, 패키지 구조, 데이터 흐름, 보안 구조 등) → `docs/ARCHITECTURE.md` **자동 업데이트**
- **프로젝트 디렉토리 구조 변경** (새 디렉토리, 파일 이동, 명명 규칙 변경 등) → `docs/PROJECT_STRUCTURE.md` **자동 업데이트**
- **엔티티 관계 변경** (새 엔티티, 관계 추가/변경) → `docs/CLASS_DIAGRAM.md` **자동 업데이트**
- **새 기능/유스케이스 추가** → `docs/USE_CASES.md` **자동 업데이트**
- **문서 인덱스 변경** (새 문서 추가, 문서 구조 변경) → `docs/DOCUMENTATION_INDEX.md` **자동 업데이트**

### 문서 생성 규칙
다음 문서들은 프로젝트 구조나 아키텍처가 변경될 때 생성/갱신해야 합니다:
- `docs/ARCHITECTURE.md` - 아키텍처 개요, 레이어 구조, 데이터 흐름, 보안 아키텍처
- `docs/PROJECT_STRUCTURE.md` - 디렉토리 구조, 파일 찾기 가이드, 명명 규칙
- `docs/CLASS_DIAGRAM.md` - 엔티티 관계도, 레이어별 클래스 다이어그램
- `docs/USE_CASES.md` - 유스케이스 다이어그램, 기능별 파일 매핑, 시퀀스 다이어그램
- `docs/DOCUMENTATION_INDEX.md` - 모든 문서의 인덱스 및 카테고리 분류
- **화면별 DB·HTTP API 메모** (`docs/db-doc/<화면ID>_api.md`): **`.cursor/rules/page-db-analysis-workflow.mdc`** 가 정본이다 — 트리거 **「페이지에 대한 DB분석」**, § MD 템플릿, 2·3단계(HTML·smkang_doc 푸시), **`docs/db-doc/*_api.md` 수정·추가 시 후속**까지 포함. 경로·스크립트·커밋 메시지는 해당 파일을 따른다(Cursor 전용 요약은 **`.cursorrules`**).

**중요**: 코드 변경 시 관련 문서를 **자동으로** 최신 상태로 갱신해야 합니다.

## 4. 데이터베이스 변경 규칙

1. 엔티티 수정
2. 모든 Repository 쿼리 점검
3. Service 로직 점검
4. DTO 반영
5. API 문서 수정
6. DATABASE.md 업데이트
7. SQL 업데이트
8. 스키마/쿼리 일관성 검증

### 4.1 사용자 관리 BE·PostgreSQL `tb_cm_user` (레거시 스키마 정합)

**대상**: 저장소 **`server/`** (**mes-user-mgmt-server**), `GET`·`POST`·`DELETE` **`/api/users`**, 화면 **`std_base_user_mgmt`**. 구현·쿼리 상세는 **`docs/db-doc/std_base_user_mgmt_api.md`**, 연결·실행은 **`docs/SETUP.md`**·**`server/README.md`** 와 함께 본다.

| 주제 | 규칙·메모 |
|------|-----------|
| **`user_pwd`** | BE는 비밀번호를 **bcrypt**로 저장하며 해시 길이는 통상 **약 60자**이다. 컬럼이 **`varchar(50)`** 등 짧으면 PostgreSQL **22001**(값이 유형에 비해 김)이 난다. 운영·마이그레이션 시 **`VARCHAR(72)` 이상** 또는 **`TEXT`** 를 쓴다. 예: `ALTER TABLE tb_cm_user ALTER COLUMN user_pwd TYPE VARCHAR(72);` |
| **`user_id`·upsert** | BE는 **`INSERT … ON CONFLICT (user_id)`** 를 쓰지 않고 **`UPDATE … WHERE user_id` → 영향 행이 없으면 `INSERT`** 로 upsert 한다. **`user_id`에 UNIQUE 제약·PK가 없는 레거시 DB**에서도 동작한다(식별자 무결성·중복 행 방지를 위해 PK/UNIQUE 권장은 별개). |
| **`beginning_employment_date`** | 일부 DB는 **`varchar`** 인데 SQL에서 **`date`** 와 **`COALESCE`** 를 섞으면 **42804**(자료형 불일치)가 난다. BE는 **`to_char(…, 'YYYY-MM-DD')`**·**`CASE`** 로 문자열과 맞춘다. 컬럼을 **`date`** 로 통일하는 마이그레이션은 선택. |
| **오류 안내** | **22001**·**42804** 등은 **`server/src/lib/pgErrors.mjs`** 의 **`friendlyPgError`** 및 위 DB 문서·README에 요약해 두었으며, 스키마 변경 시 **해당 문서·본 절**을 함께 갱신한다. |

**AI·에이전트**: 사용자 관리 저장 오류(22001·42804·`ON CON` 등)를 다룰 때 **본 절**과 **`std_base_user_mgmt_api.md`** 를 먼저 확인한다.

### 4.2 기준정보(STD) 전용 BE 공통 (`server/`, `/api/...`)

**대상**: 저장소 **`server/`** — **단일 Node 프로세스**(기본 포트 **8787**, `PORT` 환경변수)에 **Express** 라우트를 **`server/src/routes/*.mjs`** 로 모듈화해 둔다. **사용자 관리**(`createUsersRouter`) 외에 공통코드·거래처 등 **`tb_cm_*`** 테이블용 **`/api/...`** 를 같은 앱에 추가한다.

| 주제 | 규칙·메모 |
|------|-----------|
| **연결** | **`server/src/db/pool.mjs`** 의 공유 **`pg.Pool`** — `DATABASE_URL` 또는 `PGHOST`·`PGPORT`·`PGDATABASE`·`PGUSER`·`PGPASSWORD`, SSL은 **`resolvePgSslOptions()`** (`PGSSLMODE`·`sslmode`). |
| **CORS** | **`server/src/index.mjs`** 에서 dev·Electron 혼용을 위해 **`Access-Control-Allow-Origin: *`** 등 기본 헤더 설정. |
| **렌더러 베이스 URL** | Vite dev는 상대 **`/api`** → **`renderer/vite.config.ts`** 프록시로 동일 BE에 전달. 프로덕션·Electron은 **`userMgmtBeBaseUrl.ts`**(또는 문서상 **`MES_STD_API_BASE`** 별칭)로 **동일 호스트**에 `/api` 를 붙인다 — 이름에 “user”가 있어도 **STD 전체 API** 베이스로 취급한다. |
| **문서** | 화면별 쿼리·필드는 **`docs/db-doc/<화면ID>_api.md`** 가 우선. 테이블 제약·공통 메모는 **`docs/DATABASE.md`** 에 누적한다. |
| **`screen_id` ↔ `tb_mes_menu.form_code`** | 웹 라우트 **`화면 ID`**(`std_*` 등)와 DB **`tb_mes_menu.form_code`** 는 **동일하지 않을 수 있다**(레거시 **`frmCommonCode`** 등). **`POST /api/menu-access`**(메뉴 진입 권한·접속 로그)는 **`server/src/lib/screenFormCodeMap.mjs`** 로 웹 ID와 레거시 `frm*` 후보를 `tb_mes_menu`에 조회하고, **`tb_mes_menu_authority`** 판단은 조회된 행의 **실제 `form_code`** 로 한다. **새 기준정보 `std_*` 화면**을 추가·이관할 때 **`docs/DATABASE.md`** 「기준정보 모듈 화면 ID ↔ 레거시 C#」표와 **`screenFormCodeMap.mjs`** 를 **같이** 맞춘다. 상세: **`docs/db-doc/std_base_user_log_inq_api.md`**. |
| **`byScreen` 1:1** | **`renderer/src/data/manual.csv`** 에 있는 **기준정보 `std_*` 화면 ID**마다 **`server/src/routes/byScreen/std_<screenId>.mjs`** 파일이 **반드시 하나** 있어야 한다(이름·내보내기 팩토리는 `createStd…Router` 패턴). **`server/src/index.mjs`** 에서 해당 팩토리를 **`app.use`** 로 등록한다. **동일 `GET/POST` 경로를 두 `byScreen` 파일에서 중복 `app.use` 하지 않는다** — 여러 화면이 같은 `lib/queries/*.mjs` 를 쓰더라도, **HTTP 라우트는 한 화면의 `byScreen` 진입점에만 마운트**하고 다른 화면 문서·`db-doc` 에서 “공용 API”로 표기한다. |
| **`lib/queries` 파일명·모듈 접두** | 화면 ID의 **첫 번째 언더스코어 앞 세그먼트**(`std`, `prd`, `mat`, `mfg`, `pur`)를 모듈 접두로 쓴다. **해당 모듈에서만** 쓰는 구현 파일은 **`std_*.mjs`**, **`prd_*.mjs`** 등으로 저장한다(예: `std_tbCmUser.mjs`). **여러 모듈에서 import** 하거나 앱 공통인 라우터는 접두 생략 — 예: `authAndSplash.mjs`. 상세: **`server/src/lib/queries/README.md`**, **`server/src/routes/byScreen/README.md`**. |

**AI·에이전트**: 새 STD 화면용 BE를 추가할 때 **풀·`friendlyPgError`** 를 **재생성하지 말고** `pool.mjs`·`pgErrors.mjs`·기존 라우트 패턴을 따른다. **새 `std_*` 화면이면** **`byScreen/std_<screenId>.mjs` + `index.mjs` 등록**을 빠뜨리지 않는다. **메뉴·접속 로그·권한**과 연동되는 화면이면 **`screenFormCodeMap.mjs`**·**`DATABASE.md`** 표(웹 ID ↔ 레거시 `frm`)도 함께 갱신한다.

## 5. API 규칙

- Controller → Service → Repository 흐름 확인
- DTO 반영
- 예시 JSON 포함
- API.md 업데이트

## 6. 프론트엔드 규칙

- 컴포넌트 생성/수정
- README 구조 업데이트
- 필요시 기능 설명 추가

### 6.0 매뉴얼·화면ID·이미지 참조 (Manual CSV & Screen PNG)

앱의 **모듈·기능·라우팅(화면)** 은 **`renderer/src/data/manual.csv`** 를 기준으로 한다.

- **매뉴얼 CSV 동기화**: **`docs/매뉴얼.csv`** 와 **`renderer/src/data/manual.csv`** 는 **동일한 내용을 유지하도록 항상 동기화**한다.  
  - 둘 중 **어느 한 파일을 수정하면** 반대쪽도 **같은 작업 범위 내에서 즉시 반영**한다(내용·행 순서·컬럼 구조 불일치 금지).  
  - 런타임에서 읽는 경로는 `manual.csv`이지만, **문서/이력 관점의 원본과 앱 번들 데이터의 단일성**을 이 규칙으로 보장한다.
- **구성(컬럼 의미)**: CSV 헤더는 **`모듈명` · `메뉴` · `하위메뉴` · `화면 ID`** 이며, 한 행은 **`모듈명` — `메뉴` — `하위메뉴` — `화면 ID`** 로 화면을 식별한다. (표시용 기능 라벨은 코드에서 **`메뉴 / 하위메뉴`** 로 묶을 수 있다.)  
  - **`모듈명`이 비어 있으면** 직전 행의 모듈명과 동일한 그룹으로 간주한다(표기 생략 규칙).
- **화면 구현 기준**: 각 화면의 **레이아웃·컨트롤 배치·영역 구성**은 반드시 **`docs/image/<화면ID>.png`** (예: `docs/image/std_base_user_mgmt.png`) 를 **1차 참조 소스**로 한다.
  - **PNG 존재 여부 확인 (필수 — 오판 방지)**: **`docs/image`에 PNG가 없다고 판단하기 전에**, 아래 중 **하나 이상**으로 **실제 파일 시스템 또는 직접 읽기**를 수행한다.  
    - IDE·에이전트의 **glob/파일 목록 검색만으로 “없음” 결론을 내리지 않는다.** (`.cursorignore`, 워크스페이스 인덱싱 제외, 도구 샌드박스, 캐시 등으로 **동일 경로가 0건으로 보일 수 있음** — 사용자 로컬에는 `docs/image/frm*.png`가 존재하는 경우가 있다.)  
    - **권장 1**: `docs/image/<화면ID>.png` 를 **이미지/파일 Read**로 직접 열어 본다.  
    - **권장 2 (Windows)**: PowerShell 예 — `Get-ChildItem -Path "<프로젝트루트>/docs/image" -Recurse -Filter "frm*.png"` 또는 특정 파일명으로 검색.  
    - **권장 3**: `docs/image/ren.bat` 등 **이름 매핑 스크립트**가 있으면, 최종 파일명이 `<화면ID>.png`임을 전제로 해당 경로를 우선 시도한다.  
  - **문서·CHANGELOG·답변 규칙**: 위 확인 없이 **「PNG 미수급」「워크스페이스에 PNG 없음」** 등을 **사실처럼 기술하지 않는다.** 확인 후 실제로 없을 때만 그렇게 적고, 있으면 **캡처 기준으로 레이아웃을 정합**한다.
  - PNG가 **확인 후에도** 없을 때만: 사용자가 제공한 캡처 또는 동일 `화면ID` 명명 규칙으로 추가될 파일을 전제로 하고, **추가 즉시 PNG 기준으로 재검증**한다.
  - **2차 정합(픽셀·필드 수준)**: 조회/필터 줄은 PNG가 **우측 정렬**인 경우가 많으므로 `justify-end` 패턴을 우선 검토한다. 그리드 **열 순서·헤더 문구**는 PNG와 동일하게 맞추고, 원본의 **필수 입력(노란 배경)** 은 **`docs/LAYOUT_RULES.md`**(화면·패널 색상·폼) 원칙에 따라 `bg-amber-50/80` 등으로만 표현한다(WinForms hex 복원 금지).
- **코드 매핑**: 라우트 **`#/screens/<화면ID>`** 와 **manual.csv의 `화면 ID`**·**`docs/image/<화면ID>.png`** 파일명이 서로 일치하도록 유지한다. (기능 화면 컴포넌트는 단계적으로 추가한다.)  
  - **PNG 없음(모든 모듈)**: 빌드에 **`docs/image/<화면ID>.png`** 가 없으면 **`ScreenContentByScreenId`** 에서 **`MesScreenAccessDeniedModal`**(타이틀=**하위메뉴명**·`manual.csv` 매칭 시, 아니면 **화면 ID**, 본문 2줄, 확인)만 띄운다. **「화면 준비 중」 플레이스홀더는 PNG가 있을 때만** — 레지스트리에 구현이 아직 없는 경우에 한한다. 확인 시 MDI **`close(screenId)`**, 단독 창은 **`navigate(-1)`**. **`renderer/src/lib/screenPngPresence.ts`** 의 **`hasScreenPng`** 로 판별한다.
- **표준 화면 골격 (Chrome, PNG 공통 상단)**: 기능 화면은 원칙적으로 **`Toolbar` 만** 둔다. **인앱 `MesMenuBar`(파일·기초정보… 가짜 메뉴 줄)는 기본적으로 넣지 않는다** — Electron **시스템 메뉴**(`electron/main.cjs` `setMenu`)와 **중복(메뉴 2줄)** 되기 때문이다. (브라우저 전용·메뉴 없는 뷰에서만 필요 시 `showMenuBar={true}`.) **툴바 아래 경로 줄·뒤로가기 버튼은 두지 않는다.** **모듈 창**(Electron `BrowserWindow`·`#/module/…`·`#/modules/…`) **타이틀**은 **`모듈명`만** (`document.title` 동일). **기준정보 MDI**(`MesMdiEmbedContext`) 안에서는 내부 화면이 **`document.title`을 바꾸지 않음** — 내부 제목은 **`MesMdiLayer`** 타이틀바만; 그렇지 않으면 Electron이 **`document.title`** 을 창 제목으로 쓰면서 **모듈명이 내부 화면 문자열로 덮임**. **내부·기능 화면**(단독 창·`#/screens/…`)의 **`document.title`** 은 **`메뉴 > 하위메뉴 (화면ID)`** — `manual.csv` 매칭 시 **`manualInnerWindowTitle(row)`**(`lib/manual.ts`), 미매칭 시 **`(화면ID)`**. 스플래시 등 그 외는 **`BK MES`**. 전체 경로 문자열이 필요하면 **`manualTitlePath(row)`**(`모듈 > 메뉴 > 하위메뉴`)를 쓴다. **`BaseFeatureScreen`**·**`MesFeatureChrome`** 에는 **`documentTitlePath`**(`manualInnerTitlePath` 권장)·**`screenId`** 로 전달한다. **목업 데이터**: PNG에 보이는 **예시 행·셀 값은 가능한 한 모두** 그리드·폼에 반영한다(`docs/LAYOUT_RULES.md` 「PNG 캡처 기반」). **본문 우측 세로 액션 버튼열**(Save·엑셀 등)의 **위치·영역 구분·아이콘**은 **`docs/LAYOUT_RULES.md`** 「**본문 액션 버튼**」을 따른다. (참고: **`frmItemMaster` 자재 정보**.)  
  - 필터 + 카드 본문 패턴: **`BaseFeatureScreen`** 에 **`screenId`(필수)**·**`documentTitlePath`**·(선택) `filterArea` 등을 넘긴다. `filterArea` 가 있을 때 상단 조회 한 줄은 **`MesSearchSaveBar`**(`renderer/src/components/MesSearchSaveBar.tsx`) — **조회 필터와 Search(·선택 Save) 버튼**은 **`justify-end`** 한 줄로 묶이며, 필터와 버튼 사이 **수직 구분선**은 **`docs/LAYOUT_RULES.md`** 「**조회줄: 필터–버튼 수직 구분선**」·「**조회 Search/Save 표준 스트립**」을 따른다. PNG에 조회줄 **Save 없음**이면 **`showFilterSave={false}`**; 필터 **그리드 안에 Search**를 두면 **`showFilterSearch={false}`**(`frmItemMaster`: **2행×4열** 조회 + Search **`row-span-2`**; **자재 정보**는 좌·우 **`grid-cols-2`** + 우측 세로 **Save·엑셀·양식·Maker PartNo**(**`docs/LAYOUT_RULES.md`** 「본문 액션 버튼」) + 하단 **3열·4열** 메타; **ERP 코드·Item 명** `amber` 강조).  
  - PNG처럼 본문 레이아웃이 특수한 화면: **`MesFeatureChrome`** 으로 동일 상단(Toolbar+메뉴바)만 맞추고 아래 영역은 컴포넌트별 구현.  
  - 새 화면을 `BaseFeatureScreen` 으로 추가할 때 `screenId`·`documentTitlePath` 누락 금지. (과거 `npm run inject-screen-ids` 는 ScreenRouterPage 기반이었으며, 현재는 비활성 스크립트이다.)

### 용어: `std_*` / `Mes*` (기준정보 도메인 vs 전역 표준 UI)

- **`std_*` 화면 ID**·**`renderer/src/screens/std/`** 아래 TSX: **기준정보** 모듈(기준 마스터) **화면·파일 네이밍**이다. `manual.csv`의 기준정보 행과 대응한다.
- **`Mes`로 시작하는 공통 컴포넌트·컨텍스트**(`MesDataGridPanel`, `MesDetailForm`, `MesSearchSaveBar`, `MesScreenShell`, `MesMdiProvider`, `MesMdiLayer` 등): **모든 모듈**에서 재사용하는 **BK MES 공통 표준 UI**이다. **`std_*` 화면 전용 접두어가 아니다**. 신규 모듈 화면도 동일 컴포넌트를 쓴다.

### 6.0.1 타 모듈·신규 화면 작업 시 공통 준수 (메뉴·그리드·내부창·MDI)

**기준정보 외 모듈**을 추가하거나 **메뉴 행·화면 ID·그리드 레이아웃·내부 창(MDI)** 을 손댈 때는 아래를 **항상 동일**하게 적용한다. (상세 본문은 위 §6.0·`docs/LAYOUT_RULES.md`·`docs/SETUP.md` 와 충돌 없이 맞춘다.)

1. **매뉴 데이터**: `docs/매뉴얼.csv` ↔ `renderer/src/data/manual.csv` **4열 동기화**(`모듈명·메뉴·하위메뉴·화면 ID`). 한쪽만 수정 금지.
2. **제품명 표기**: UI·문서·Electron 문구는 **`BK MES`** (구 `2S MES` 금지). 스플래시·`index.html`·도움말 등 포함.
3. **스플래시 로고**: 중앙 로고는 **`renderer/src/splash/splashAssets.ts`** 에서 **`docs/image/bksoft.png`** 를 쓴다(`splashIconUrl`). 로고 교체 시 이 경로만 바꾸고 문서(`FEATURES`·`CONTEXT` 등) 동기화.
4. **창 제목 (`document.title` / Electron 창 제목)**  
   - **모듈 창**(`#/module/…`, `#/modules/…`, Electron `BrowserWindow`로 연 모듈 전용 창): **`모듈명`만** — `ModuleBlankPage`/`ModuleFeaturesPage`의 `document.title`과 `electron/main.cjs` 의 모듈 창 `title` 일치.  
   - **기능·단독 화면**(`#/screens/…`, MDI가 아닌 경우): **`메뉴 > 하위메뉴 (화면ID)`** — `manual.csv` 행이 있으면 **`manualInnerWindowTitle(row)`** / 경로 본문만 필요하면 **`manualInnerTitlePath(row)`** + `useDocumentTitlePath(screenId)` → `BaseFeatureScreen`·`MesScreenShell`이 `(화면ID)` 접미 처리.  
   - **기준정보 MDI 내부**(`MesMdiEmbedContext` = true): 내부 화면 컴포넌트는 **`document.title`을 갱신하지 않는다** — 내부 제목은 **`MesMdiLayer`** 타이틀바만; 문자열은 **`manualInnerWindowTitle(row)`** 와 동일 패턴. **다른 모듈에 MDI를 도입할 경우**에도 동일하게 적용한다.  
5. **Electron**: 새 모듈 전용 창을 `main.cjs` 등에서 열 때 **창 제목은 모듈명만** 두고, 내부 화면 문자열로 덮이지 않게 §6.0·위 4항을 지킨다. **모듈 창 `Window` 메뉴**(기준정보 MDI): **Tile**·**Cascade**·구분선·**열린 내부창 목록**(동적) — 렌더러 `ModuleWindowMenuBridge`가 `mes:mdi-menu-sync`로 갱신; 목록 **라벨은 `1 하위메뉴명`처럼 순번 + `manual.csv` 하위메뉴(`subMenuLabel`)** (내부창 타이틀과 구분). **Tile/Cascade·MDI 클라이언트 픽셀·리사이즈 시 격자 재적용** 등 구현 세부는 **§6.0.2** 를 따른다.
6. **화면 골격**: PNG·그리드·조회줄·`BaseFeatureScreen` 은 **`docs/LAYOUT_RULES.md`** 및 §6.0 필터/Toolbar 규칙을 따른다. **그리드 위 조회줄**(필터 + Search/Save)은 **`MesSearchSaveBar`**(`filterArea` 시 `BaseFeatureScreen` 에서 사용). **데이터 그리드**는 원칙적으로 **`MesDataGridPanel`** — 내부에서 `SimpleGridTable` 사용; 별도 지시 없이 신규 화면에도 동일 적용. **그리드 하단 선택 행 상세·수정** 영역은 **`MesDetailForm`** (`LAYOUT_RULES` 「행 상세 폼」); **열–필드 1:1 매핑**이면 **`useMesGridRowSelection`**·**`MesGridRowDetailFields`**/`MesGridRowDetailForm` 를 우선한다. 신규 표준 화면은 가능하면 **`MesScreenShell`** + `screens/<모듈>/registry.ts` 패턴을 재사용한다.

**AI·에이전트**: 메뉴 추가·화면 ID·그리드·내부창·**모듈 MDI·Tile** 작업을 시작할 때 **§6.0·§6.0.1·§6.0.2** 를 먼저 확인한다. **레거시와 동작·메시지 정합**이 필요하면 **§6.0.3** 을 함께 본다.

### 6.0.2 MDI 클라이언트 크기·Tile·Cascade (모든 모듈 페이지·MDI 구성 시 참고)

**기준정보**에 구현된 MDI·Tile 동작을 **다른 모듈**에 Electron 전용 창 + 내부창(MDI)을 도입할 때도 **동일 원칙**으로 맞춘다. (`renderer/src/context/MesMdiContext.tsx`, `renderer/src/components/MesMdiLayer.tsx`, `renderer/src/pages/ModuleBlankPage.tsx`, `renderer/src/components/ModuleWindowMenuBridge.tsx` 참조.)

1. **MDI “클라이언트”란**: 모듈 창에서 **모듈 툴바(또는 상단 Chrome) 아래**에 내부창만 올라가는 영역이다. **하단 최소화 바** 등이 있으면 그 높이는 클라이언트에 **포함하지 않는다**.
2. **크기 측정 (`cw` × `ch`)**  
   - **`ResizeObserver`**: 내부창 전용 래퍼(예: `flex-1 min-h-0 overflow-hidden` **한 박스**)에만 건다. **최상위 MDI 루트**(최소화 바까지 포함)만 재면 **`cw`·`ch`가 과대**해져 Tile 격자가 실제보다 크게 잡힌다.  
   - **`registerMdiClientSize(width, height)`**: 위 클라이언트 박스의 가로·세로를 저장한다.  
   - **`registerMdiClientMeasure(() => { width, height } | null)`**: **Tile/Cascade/`tileLayout` 호출 직전**에 **`getBoundingClientRect()`** 로 **현재** 픽셀을 읽는다. 저장 ref만 쓰면 메뉴 클릭 시점과 한 틱 어긋나 **내부창이 고정 크기처럼** 보일 수 있다.
3. **Tile (`tileLayout`)**  
   - **비율**: 모듈 클라이언트 **전체**를 `cols`×`rows` 격자로 나누어 **비최소화** 내부창에 배분한다. 예: 클라이언트 **900×600**, 창 **9개**, 격자 **3×3**이면 각 칸은 **약 300×200**(테두리·`floor`로 1px 차이 가능).  
   - **격자 선택**: `pickTileGrid(n)` — **1×1 / 1×2 / 1×3 / 2×3 / 3×3**(열×행, `n`개를 **행 우선**), 내부창 **최대 9**.  
   - **셀 좌표**: `left`·`top`·`right`·`bottom`은 **`Math.floor`** 로 정수 픽셀 경계; `width`·`height`는 `right-left`·`bottom-top`(최소 0).  
   - **최대화 해제**: Tile 적용 전 각 내부창은 **`restoreFrameFromMaximize`** 로 일반 모드로 둔다.
4. **Tile 모드 유지·해제 (`tileLayoutActiveRef`)**  
   - **유지**: 마지막 배치가 Tile이면, 모듈 창 **리사이즈**로 클라이언트 크기가 바뀔 때 **`tileLayout`을 다시 호출**해 격자를 맞춘다(`registerMdiClientSize`에서 크기 변화 감지 시).  
   - **해제**(자동 격자를 끔): **Cascade**, **내부창 드래그**(`moveFrame`), **모서리 리사이즈**(`setFrameBounds`), **최대화/최소화**, **신규 내부창 추가**(`openOrFocus` 신규) 등 사용자가 배치를 바꾼 경우.
5. **Cascade (`cascadeLayout`)**: `mdiClientMeasureRef` / `mdiClientSizeRef`로 **`cw`·`ch`를 읽은 뒤** 대각 스택으로 배치; 실행 시 **Tile 모드 플래그를 끈다**.

**문서 교차 참조**: 기능 요약 **`docs/FEATURES.md`**(Window·Tile), **`docs/LAYOUT_RULES.md`** 서두(MDI·§6.0.2 링크), **`docs/PROJECT_STRUCTURE.md`**(MesMdi·모듈 본문).

### 6.0.3 레거시 `docs/legacy_mes` 참조·동작·메시지 정합

**기존 §6.0~§6.0.2·`LAYOUT_RULES.md`·`DATABASE.md`는 그대로 적용**한다. 아래는 **신규·개편 화면**을 구현할 때, 구 WinForms 클라이언트와 **UI·DB 의도·버튼/검증/알림**을 맞추기 위한 **추가** 절차다.

**참조 우선순위 (충돌 시)**  
1. **`docs/image/<화면ID>.png`** — 레이아웃·그리드·조회줄(§6.0).  
2. **`docs/legacy_mes`** — 해당 화면에 매핑되는 **`frm*.cs`** / **`frm*.resx`**(있을 때만) — 그리드 열·필터·툴바(신규/저장/삭제/조회)·탭·읽기 전용 필드 등 **동작·구성 보완**.  
3. **`docs/DATABASE.md`** · **`docs/db-doc/<화면ID>_api.md`** — PostgreSQL·`/api/*`·`byScreen`(§4.2).

**화면 ID → 레거시 파일 찾기**  
- **기준정보(`std_*`) 14화면**: **`docs/DATABASE.md`** 표 **「기준정보 모듈 화면 ID ↔ 레거시 C#」** 및 **`docs/legacy_mes/Basis/_2S_MES_Basis/frmMDIMain.cs`** 의 `OpenChildWindow` 매핑을 **1차**로 따른다.  
- **그 외 모듈**: `docs/legacy_mes` 아래에 **`frm` 소스가 없거나** 표에 없으면 **레거시 동작 정합은 강제하지 않는다**. 필요 시 `docs/db-doc` 또는 화면 주석에 **「레거시 N/A」** 를 남긴다. 이후 다른 모듈 폴더가 `legacy_mes`에 추가되면 **동일 절차**로 매핑을 확장한다.

**UI 수집**  
- 대상 `frm*.cs`에서 **그리드 컬럼 순서·라벨**, **조회/저장/삭제/신규** 연결 메서드(`gSave`, `gNew`, `gDelete`, `cmdSearch_Click` 등), **확인·입력 대화** 호출을 확인한다. **`frm*.resx`** 는 캡션·초기 크기 등 보조 참고.  
- **PNG(또는 제품 스크린샷)와 레거시가 불일치**하면 **PNG·현행 기획을 우선**하고, 차이는 구현 주석 또는 `docs/db-doc` 한 줄로 남긴다.

**DB·BE**  
- C# 내 **Oracle SQL·`TB_*` 물리명을 그대로** 서버에 넣지 않는다. **`docs/DATABASE.md`** 의 PostgreSQL·이관 전제, **`server/src/lib/queries/*.mjs`**, **`server/src/routes/byScreen/std_<screenId>.mjs`**(§4.2)를 따른다. 레거시는 **참조 테이블·컬럼·필수 검증·저장 순서·트랜잭션 의도** 파악용이다.

**버튼·팝업·오류·알림 메시지**  
- `MessageBox.Show`, `MessageBox` 확인/취소, 검증 실패 문구, 저장/삭제 성공 문구를 **목록화**하고, 웹/Electron에서는 **문구(한글)는 동일 취지**로 맞춘다(제목 `[저장완료]` 등 레거시 패턴 포함 가능).  
- **표현 방식**은 프로젝트 기존 패턴을 유지: **동기 `alert` 남용 지양**, 조회줄 **`filterLeading`**·배너·`MesSearchSaveBar` 등 **인라인** 안내 우선; **삭제 확인** 등은 **`window.confirm`** 또는 동등한 모달로 처리 가능. Electron에서 포커스·히트 이슈가 있었던 경로는 **`docs/USER_PROMPTS_LOG.md`**·관련 CHANGELOG를 참고한다.

**AI·에이전트**: **신규 화면 구현·기능 정합** 시 §6.0~§6.0.2와 함께 **본 절(§6.0.3)** 을 확인하고, **`docs/legacy_mes/README.md`** 를 본다.

### 6.1 UI 레이아웃 규칙 (상세 문서)

**전문은 `docs/LAYOUT_RULES.md`에 둔다.** (이전 `project-rules.md` §6.1 본문 이관.)

- **`docs/LAYOUT_RULES.md`**: 폼 영역, 본문 액션 버튼, 조회줄(필터–버튼 수직 구분선, **`MesSearchSaveBar`**, Search/Save, `MesFilterRow`), 기간 입력(`date`/`datetime-local` 사이 `~`), 패널 색상(slate), 그리드(sticky·테두리·`text-slate-600`)·**`MesDataGridPanel`(데이터 그리드 표준)**·**`MesDetailForm`(행 상세 폼)**·**`SimpleGridTable` 공통 기능·옵션**(열 리사이즈·정렬·스크롤 체인 등; 패널이 감싼 뒤에도 저수준 규칙으로 유효) 등. **`MesSearchSaveBar` 의 `filterLeading`(`leading`)**: **`flex-1`**·**`pr-[10px]`** 로 필터 첫 라벨 직전까지 넓히고, 긴 경고 문구는 **`LAYOUT_RULES.md`** 「조회 Search/Save 표준 스트립」`leading` 절.
- **§6.0과의 관계**: 화면 ID·PNG·Toolbar/MesMenuBar 골격·`document.title` 규칙은 **위 §6.0**. **`docs/legacy_mes`** 기반 동작·메시지 정합은 **§6.0.3**. **Electron 모듈 창·MDI·Tile** 은 **§6.0.2**. 스타일·간격·테이블 패턴은 **`LAYOUT_RULES.md`**.
- **유지보수**: 레이아웃만 바꿀 때 **`docs/LAYOUT_RULES.md`를 먼저 갱신**한다. CSV/PNG/라우팅과 겹치면 §6.0도 함께 본다.

## 7. 설정 파일 변경 규칙

- 설정 파일 변경 시 관련 문서 업데이트
- 목적/설정 항목 문서화

## 8. 작업 종료 프로토콜

**중요**: 작업 종료 시 다음 단계를 **반드시 자동으로** 수행해야 합니다. 문서 갱신은 선택 사항이 아닌 **필수 사항**입니다.

**문서 자동 갱신 원칙**:
- 모든 코드 변경, 설정 변경, 구조 변경은 즉시 관련 문서에 반영되어야 합니다.
- 문서 갱신을 건너뛰거나 "나중에 하겠다"고 말하는 것은 절대 금지됩니다.
- 사용자가 명시적으로 문서 갱신을 요청하지 않아도, 변경사항이 있으면 자동으로 문서를 갱신해야 합니다.

1. **작업 요약**
   - 수행한 작업 내용 요약
   - 변경된 주요 파일 목록 확인

2. **관련 문서 자동 갱신** (변경사항에 따라 자동 선택, 필수 수행)
   - **기능 변경/추가 시**: `docs/FEATURES.md` 자동 업데이트
   - **API 변경 시**: `docs/API.md` 자동 업데이트
   - **DB 스키마 변경 시**: `docs/DATABASE.md` 자동 업데이트
   - **설정 변경 시**: `docs/SETUP.md` 자동 업데이트
   - **아키텍처 변경 시**: `docs/ARCHITECTURE.md` 자동 업데이트
   - **디렉토리 구조 변경 시**: `docs/PROJECT_STRUCTURE.md` 자동 업데이트
   - **엔티티 관계 변경 시**: `docs/CLASS_DIAGRAM.md` 자동 업데이트
   - **새 기능/유스케이스 추가 시**: `docs/USE_CASES.md` 자동 업데이트
   - **의존성 변경 시**: `README.md` 기술 스택 섹션 자동 업데이트
   - **프로젝트 구조 변경 시**: `README.md` 프로젝트 구조 섹션 자동 업데이트

3. **CHANGELOG 자동 업데이트** (필수)
   - 작업 내용, 변경된 파일, 다음 작업 예정 기록
   - 형식: `## YYYY-MM-DD HH:mm KST` (최신 항목이 위에 오도록)
   - 타임스탬프는 작업 완료 시점의 **실제 한국시간(KST)** 사용

4. **CONTEXT 자동 최신화** (필수)
   - 현재 프로젝트 상태 반영
   - 진행 중인 작업 업데이트
   - 다음 단계 명시

5. **TODO 자동 정리** (필수)
   - 완료된 작업 제거
   - 새 작업 추가
   - 우선순위 업데이트

6. **체크리스트 자동 검증** (필수)
   - 변경사항에 해당하는 문서 갱신 여부 확인
   - 누락된 문서 갱신 항목이 있으면 즉시 추가
   - 모든 관련 문서가 최신 상태인지 확인

7. **다음 작업 명확히 기록**
   - CONTEXT.md에 다음 작업 기록
   - TODO.md에 우선순위 반영

**문서 갱신 검증 체크리스트** (작업 종료 전 반드시 확인):
- [ ] CHANGELOG.md에 작업 내용 기록됨
- [ ] CONTEXT.md에 현재 상태 반영됨
- [ ] TODO.md에 완료/진행 중 작업 업데이트됨
- [ ] 변경사항에 해당하는 모든 문서 갱신됨 (FEATURES.md, SETUP.md, PROJECT_STRUCTURE.md 등)
- [ ] README.md가 최신 상태인지 확인됨

## 8-1. 외부에서 변경된 내용 발견 시 문서 갱신 규칙

다른 IDE, 에디터, 또는 외부 도구에서 작업하여 문서에 기록되지 않은 변경사항을 발견했을 때:

**주의**: 이 규칙은 사용자가 명시적으로 "문서 동기화 확인", "외부 변경사항 확인" 등을 요청했을 때만 실행합니다.

1. **변경사항 확인 (선택적, 필요한 항목만)**
   - 사용자 요청에 따라 특정 항목만 확인:
     - 의존성 파일 (build.gradle, package.json 등) - 의존성 관련 작업 시
     - API 엔드포인트 - API 관련 작업 시
     - 데이터베이스 스키마 - DB 관련 작업 시
     - 설정 파일 (application.yml, .env 등) - 설정 관련 작업 시
   - 전체 검사는 사용자가 명시적으로 요청한 경우에만 수행

2. **관련 문서 즉시 갱신**
   - **의존성 추가/변경 발견 시**:
     - `README.md`의 기술 스택 섹션 업데이트
     - `docs/SETUP.md`의 의존성 설치 섹션 업데이트
     - `docs/CONTEXT.md`의 기술 스택 섹션 업데이트

   - **API 엔드포인트 추가/변경 발견 시**:
     - `docs/API.md`에 엔드포인트 추가/수정
     - `docs/FEATURES.md`의 관련 기능 섹션 업데이트

   - **데이터베이스 스키마 변경 발견 시**:
     - `docs/DATABASE.md`의 테이블 구조 업데이트
     - `docs/CONTEXT.md`의 데이터베이스 구조 섹션 업데이트

   - **설정 파일 변경 발견 시**:
     - `docs/SETUP.md`의 환경 설정 섹션 업데이트
     - `docs/CONTEXT.md`의 현재 상태 섹션 업데이트

   - **새 컴포넌트/모듈 추가 발견 시**:
     - `README.md`의 프로젝트 구조 섹션 업데이트
     - `docs/FEATURES.md`의 관련 기능 섹션 업데이트

   - **기능 변경/추가 발견 시**:
     - `docs/FEATURES.md` 업데이트
     - `docs/CONTEXT.md`의 현재 구현된 기능 상태 업데이트

3. **CHANGELOG에 기록**
   - 발견한 변경사항을 `docs/CHANGELOG.md`에 추가
   - 형식: "외부에서 변경된 [항목] 문서화 완료"

4. **일관성 검증**
   - 모든 관련 문서 간 일관성 확인
   - 코드와 문서의 일치 여부 확인
   - 누락된 문서화 항목 추가 확인

**주의**: 외부에서 변경된 내용을 발견하면 즉시 문서를 갱신하고, 작업 종료 프로토콜을 따릅니다.

## 9. 체크리스트 (작업 종료 시 자동 검증)

**중요**: 다음 체크리스트는 작업 종료 프로토콜의 6단계에서 **자동으로 검증**해야 합니다. 이 체크리스트는 선택 사항이 아닌 **필수 검증 항목**입니다.

**문서 자동 갱신 강제 규칙**:
- 작업 종료 시 이 체크리스트를 확인하고, 체크되지 않은 항목이 있으면 즉시 문서를 갱신해야 합니다.
- "문서 갱신을 건너뛰겠다" 또는 "나중에 하겠다"는 응답은 절대 허용되지 않습니다.
- 모든 변경사항은 즉시 문서에 반영되어야 합니다.

### 필수 항목 (항상 확인)
- [ ] UTF-8 저장
- [ ] docs/CHANGELOG.md 자동 업데이트 완료 (작업 이력 기록)
- [ ] docs/CONTEXT.md 자동 최신화 완료 (현재 상태 반영)
- [ ] docs/TODO.md 자동 갱신 완료 (작업 목록 업데이트)

### 변경사항별 자동 갱신 확인 (해당 시)
- [ ] README.md 자동 최신화 (프로젝트 구조, 기술 스택, 의존성 변경 시)
- [ ] docs/LAYOUT_RULES.md 자동 최신화 (폼·조회줄·그리드·색상 등 UI 레이아웃 규칙 변경 시)
- [ ] docs/FEATURES.md 자동 최신화 (기능 변경/추가 시)
- [ ] docs/API.md 자동 최신화 (API 변경 시)
- [ ] docs/DATABASE.md 자동 최신화 (DB 스키마 변경 시)
- [ ] docs/SETUP.md 자동 최신화 (설정 변경 시)
- [ ] docs/ARCHITECTURE.md 자동 최신화 (아키텍처 변경 시)
- [ ] docs/PROJECT_STRUCTURE.md 자동 최신화 (디렉토리 구조 변경 시)
- [ ] docs/CLASS_DIAGRAM.md 자동 최신화 (엔티티/클래스 관계 변경 시)
- [ ] docs/USE_CASES.md 자동 최신화 (새 기능/유스케이스 추가 시)
- [ ] docs/DOCUMENTATION_INDEX.md 자동 최신화 (새 문서 추가 시)

### 추가 검증 항목 (해당 시)
- [ ] DB 스키마 반영 확인 (DB 변경 시)
- [ ] 쿼리 일관성 확인 (DB 변경 시)
- [ ] API 문서 일관성 확인 (API 변경 시)
- [ ] 외부에서 변경된 내용 문서화 확인 (의존성, 설정, 코드 변경 등)

## 10. 예외 상황 (문서 갱신 불필요)

- 오타 수정
- 주석
- 콘솔 출력
- import
- 리팩토링(기능 변경 없음)
- CSS 미세 수정
- 빌드 버전 업

## 11. 프로젝트 컨텍스트 파일 구조

### 필수 컨텍스트 파일 (AI 브리핑 시 읽는 파일)
- `docs/CONTEXT.md` - 프로젝트 현재 상태 및 진행 상황
- `docs/CHANGELOG.md` - 작업 이력 및 변경사항
- `docs/TODO.md` - 진행 중인 작업 및 미완료 항목

### 프로젝트 문서 파일 (참조용)
- `README.md` - 프로젝트 개요 및 빠른 시작
- `docs/LAYOUT_RULES.md` - UI 레이아웃(폼·조회줄·그리드·색상·기간 입력); **`project-rules.md` §6.0** 과 함께 적용
- `docs/API.md` - API 엔드포인트 문서
- `docs/DATABASE.md` - 데이터베이스 스키마 문서
- `docs/FEATURES.md` - 주요 기능 설명
- `docs/SETUP.md` - 설치 및 설정 가이드
- `docs/ARCHITECTURE.md` - 아키텍처 개요 및 구조
- `docs/PROJECT_STRUCTURE.md` - 프로젝트 디렉토리 구조
- `docs/CLASS_DIAGRAM.md` - 클래스 다이어그램 및 엔티티 관계도
- `docs/USE_CASES.md` - 유스케이스 및 기능별 파일 매핑
- `docs/DOCUMENTATION_INDEX.md` - 문서 인덱스 및 카테고리 분류

### 템플릿 파일 (다른 프로젝트 적용용)
- `project-rules.template` - 규칙 템플릿
- `docs/templates/*.template` - 문서 템플릿들

