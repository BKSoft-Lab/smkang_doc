## 설치 및 실행 (Setup)

### 요구사항

- Node.js / npm (Windows PowerShell 환경 기준)

### 설치

#### 새 PC(노트북)에서 최초 1회

Node.js가 없다면 먼저 설치합니다:

```bash
winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
```

설치 후에는 **새 PowerShell 터미널을 열어서** 아래가 동작하는지 확인합니다:

```bash
node -v
npm -v
```

#### 프로젝트 의존성 설치

프로젝트 루트(`d:\MES`)에서:

```bash
npm ci
```

이 프로젝트는 `npm workspaces`를 사용하며, `renderer/` 의존성도 함께 설치됩니다.

참고:
- `npm ci`는 `package-lock.json` 기준으로 **깨끗하게 재설치**합니다(복사해온 폴더일 때 권장).

### AI 하네스(저장소 규약 검사, DB 불필요)

```bash
npm run check:ai-harness
```

- 엄격 모드(상단 `USER_PROMPTS_LOG` 날짜 헤딩 내림차순 실패 시 exit 1): `npm run check:ai-harness:strict`
- GitHub Actions: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) 에서 `lint`와 함께 실행됩니다.

### 개발 실행 (Dev)

```bash
npm run dev
```

- renderer: Vite dev server가 \(http://localhost:5174\) 에서 실행됩니다.
- electron: 위 URL을 로드하여 데스크톱 창으로 띄웁니다.

참고:
- 개발 중 Electron 창을 닫아도(dev에서) Vite dev server는 계속 실행됩니다.
- **다시 시작 시 포트(5174)가 이미 열려 있으면** renderer(Vite)는 재사용하고 **Electron만 다시 실행**합니다(수동으로 포트 점유 프로세스를 kill 할 필요 없음).

#### Cursor 디버그 ingest (워크스페이스 로그)

에이전트 계측이 `http://127.0.0.1:7827/ingest/...`로 POST하는 NDJSON을 **리포지토리 루트 파일**에 남기려면, 해당 포트에서 받는 프로세스가 있어야 합니다.

- **별도 터미널**에서 수집 서버만 실행:

```bash
npm run debug:ingest
```

- **`npm run dev`와 함께** 자동 기동(선택): 환경 변수 **`MES_DEBUG_INGEST=1`** (예: PowerShell ` $env:MES_DEBUG_INGEST=1; npm run dev `). 종료 시 자식 프로세스와 함께 정리됩니다.

- **기본 출력 파일**: 프로젝트 루트 `debug-ingest.ndjson` (Git 무시). 경로·포트는 환경 변수로 바꿀 수 있습니다.
  - **`DEBUG_INGEST_LOG_PATH`**: 상대 경로면 리포지토리 루트 기준, 절대 경로면 그대로 사용.
  - **`DEBUG_INGEST_PORT`**: 기본값 **7827**.

구현: [`scripts/debug-ingest-server.mjs`](../scripts/debug-ingest-server.mjs).

#### 사용자 관리(`std_base_user_mgmt`) 전용 BE

- 저장소 [`server/`](../server/) — PostgreSQL `tb_cm_user` 직접 연동. 기본 포트 **8787**.
- **`npm run dev`**(`scripts/dev.mjs`): Vite를 새로 띄울 때(개발 포트가 비어 있을 때) 위 BE가 **아직 해당 포트에서 리슨 중이 아니면** `mes-user-mgmt-server`를 함께 기동하고, `wait-on`으로 포트가 열릴 때까지 잠시 대기합니다. 원격 BE만 쓰거나 로컬 BE를 수동으로만 돌리려면 **`MES_DEV_SKIP_USER_MGMT_BE=1`** 을 설정하세요.
- **별도 터미널**만 쓸 때는 DB 연결 정보를 [`server/.env.example`](../server/.env.example) 참고해 `.env` 설정 후:

```bash
npm run dev:be
```

- Vite dev는 `/api` 프록시 대상을 **`mes-config.ini`**(`USER_MGMT_API_BASE` 또는 `UI_URL`+`USER_MGMT_API_PORT`)로 맞출 수 있습니다(INI 없으면 `localhost:8787`). 원격 BE만 쓸 때는 환경 변수 **`MES_USER_MGMT_PROXY_TARGET`** 로도 지정 가능합니다. BE를 띄우지 않으면 해당 화면 조회·저장은 실패합니다.
- **`USER_MGMT_API_BASE` 스킴**: 저장소 `server/` BE는 **HTTP**(`app.listen`)만 사용합니다. 8787에 TLS가 없으면 **`http://호스트:8787`** 으로 적어야 합니다(`https://`로 두면 Vite 프록시·조회가 실패할 수 있음). 앞단에 HTTPS 리버스 프록시만 두었다면 그에 맞는 URL을 씁니다.

### 화면 ID / BaseFeatureScreen 정리 (유지보수)

`BaseFeatureScreen` 에 **`screenId`**·**`documentTitlePath`**(`manualInnerTitlePath` 권장)를 넣으면 **`메뉴 > 하위메뉴 (화면ID)`** 형태가 되어 PNG 파일명(`docs/image/<화면ID>.png`)과 바로 대조할 수 있습니다. 모듈 창 타이틀은 **모듈명만** 별도 규칙입니다. 라우터 컴포넌트 매핑 기준으로 다시 채우려면 프로젝트 루트에서:

```bash
npm run inject-screen-ids
```

### 프로덕션 빌드 (Build)

배포 Electron 패키지는 **원격(또는 사내) 웹 서버에 올린 UI**만 로드합니다. 패키지 안에 `renderer/dist`를 넣지 않습니다.

#### 1) UI 정적 파일 빌드 (웹 서버에 배포)

```bash
npm run build:renderer:remote
```

`VITE_BASE_URL=/` 로 빌드하여 `renderer/dist/`에 서버 배포용 정적 파일을 만듭니다. 하위 경로 배포 시 `VITE_BASE_URL=/app/` 등으로 변경합니다.

`renderer/dist/` 내용을 웹 서버(Nginx, IIS 등) 문서 루트에 복사합니다.

#### 2) Electron 쉘 빌드 (UI 미포함)

```bash
npm run build
```

기본 `build` 스크립트는 **아이콘 생성 + electron-builder**만 수행합니다(UI 워크스페이스 빌드는 포함하지 않음). `build:electron-only`와 동일한 흐름입니다.

산출물 예: `dist-electron/BK_MES Setup 0.1.0.exe`, `dist-electron/BK-MES_Portable 0.1.0.exe`

`BK_MES Setup … .exe` 는 **설치 마법사** 형태이며, **설치 폴더를 지정**할 수 있습니다(기본은 사용자별 `AppData\Local\Programs` 계열).

NSIS 설치 후(및 포터블 앱 폴더) **`BK_MES.exe`와 같은 디렉터리**에 [`electron/mes-config.example.ini`](../electron/mes-config.example.ini) 내용으로 **`mes-config.ini`** 가 함께 설치됩니다. 필요 시 해당 파일만 수정하면 됩니다.

NSIS 설치형인 경우 같은 폴더에 **`Uninstall BK_MES.exe`**(NSIS 기본 제거 프로그램)와 동일한 **`BK_MES_Uninstall.exe`**(설치 시 복사되는 별칭)가 함께 있습니다. Windows **설정 → 앱**에서 제거해도 됩니다.

로컬에서 렌더러만 빌드할 때는 `npm run build:renderer` 또는 위 `build:renderer:remote`를 사용합니다.

---

### Electron UI 주소 설정 (`mes-config.ini`)

프로덕션(또는 `ELECTRON_RENDERER_URL`이 없는 실행)에서는 **반드시** UI 베이스 URL이 있어야 합니다. 없으면 창에 설정 안내 페이지만 표시됩니다(로컬 `file://` 번들 폴백 없음).

**INI 형식** (`[MES]` 섹션, 키 이름 고정):

```ini
[MES]
UI_URL=https://your-mes-ui.example.com/
DB_API_BASE=https://your-db-api.example.com:7443
```

- `DB_API_BASE`: MES DB HTTP API 베이스 URL. Electron이 **hostname**만 추출해 사설 인증서 TLS 예외 목록(`MES_CERT_ALLOWLIST`)에 넣습니다. UI 호스트와 DB 호스트가 다를 때 필요합니다.
- `#` 또는 `;` 로 시작하는 줄은 주석입니다.
- 값 앞뒤 공백·선택적 따옴표는 제거됩니다.

**파일 위치 탐색 순서** (첫 번째로 존재·읽을 수 있는 파일 사용):

1. 환경 변수 **`MES_CONFIG_INI`** — 절대 경로 또는 **현재 작업 디렉터리** 기준 상대 경로.
2. **실행 파일과 같은 폴더**: `mes-config.ini` (포터블/설치형 단말).
3. **개발 시** 저장소 루트: `d:\MES\mes-config.ini` (`electron/main.cjs` 기준 한 단계 위).

예시는 [`electron/mes-config.example.ini`](../electron/mes-config.example.ini)를 복사해 `mes-config.ini`로 두고 수정하면 됩니다.

**최종 UI 베이스 URL 우선순위:**

1. **`ELECTRON_RENDERER_URL`** — `npm run dev` 전용(Vite). 있으면 INI·아래 env보다 우선.
2. **`MES_UI_URL`** — CI·일회성 테스트 등, INI보다 **우선**.
3. **INI `MES.UI_URL`** (`UI_URL` 키).
4. 모두 없으면 **설정 오류 안내만** 표시.

---

### 환경 변수

| 변수 | 적용 대상 | 설명 |
|------|-----------|------|
| `MES_CONFIG_INI` | **Electron (런타임)** | `mes-config.ini` 경로(미설정 시 exe 옆·저장소 루트 순으로 탐색). |
| `MES_UI_URL` | **Electron (런타임)** | 원격 UI 서버 URL. **INI보다 우선**. 예: `https://mes.company.com/app/` |
| `ELECTRON_RENDERER_URL` | **Electron (dev)** | Vite dev server URL. `npm run dev` 시 자동 설정됨. |
| `VITE_BASE_URL` | **Vite (빌드 시)** | 빌드 산출물의 base path. 서버 루트 `/`, 하위 경로 `/app/` 등. |
| `VITE_MES_DB_API_BASE` | **렌더러 (런타임)** | API 서버 base URL. 미설정 시 프로덕션 기본값 `https://100.71.84.10:7443`. |

### 배포본 DB·UI 서버 인증서 체크

- 배포본에서는 dev proxy가 없어서 렌더러가 DB HTTPS를 직접 호출합니다.
- 사내/사설 인증서 환경이면 Electron에서 TLS 검증으로 실패할 수 있습니다.
- `mes-config.ini`의 **`DB_API_BASE`** 에서 추출한 **hostname**과, 확정된 **UI URL**의 **hostname**이 앱 시작 시 `MES_CERT_ALLOWLIST`에 자동 추가됩니다.

