## 프로젝트 구조 (Project Structure)

### 루트

- **`package.json`**: Electron 실행/빌드 스크립트와 workspaces 설정. `electron-builder` `files`에 **`docs/매뉴얼.csv`** 포함(앱 메뉴 생성용).
- **`project-rules.md` / `.cursorrules`**: 작업 규칙

### Electron

- **`electron/main.cjs`**: 메인 창 `setMenu(null)`; **`mes:open-module-window`** 로 모듈별 **새 창** + `docs/매뉴얼.csv` 기반 **`win.setMenu`**(파일·모듈 메뉴·**Window**: Tile·Cascade·열린 MDI 동적 목록·도움말), **`mes:mdi-menu-sync`**(렌더러가 열린 내부창 목록 반영), `mes:quit` / `mes:minimize` / `mes:close` IPC
- **`electron/preload.cjs`**: `window.mes` — `version`, `quitApp`, `onOpenScreen`(등록 해제 함수 반환)

### Renderer (Vite)

- **`renderer/`**: Vite + React + TypeScript 프로젝트
  - **`renderer/vite.config.ts`**: `@docs` → 저장소 `docs/` (이미지 등), `server.fs.allow` 로 상위 디렉터리 허용
  - **`renderer/src/components/SplashScreen.tsx`**: 스플래시(6모듈 타일·SCM 포함, 배경 그라데이션·앱 내 메뉴 바 없음)
  - **`renderer/src/components/BaseFeatureScreen.tsx`**: 공통 기능 화면 레이아웃·**`SimpleGridTable`**
  - **`renderer/src/components/MesDataGridPanel.tsx`**: 기준정보 등 **데이터 그리드 표준**(안내줄·줌·정렬·열 리사이즈; **`docs/LAYOUT_RULES.md`**)
  - **`renderer/src/components/MesDetailForm.tsx`**: **`MesDataGridPanel`** 하단 **선택 행 상세·수정** 영역(마스터–디테일; **`docs/LAYOUT_RULES.md`** 「행 상세 폼」)
  - **`renderer/src/components/MesSearchSaveBar.tsx`**: 그리드 위 **조회 스트립 표준**(필터 + Search/Save, `FilterBarButtons`; **`BaseFeatureScreen`** `filterArea` — **`docs/LAYOUT_RULES.md`** 「조회 Search/Save 표준 스트립」)
  - **`renderer/src/data/manual.csv`**: `docs/매뉴얼.csv` 와 동기화 — **모듈명, 메뉴, 하위메뉴, 화면 ID**
  - **`renderer/src/lib/manual.ts`**: CSV 파싱, 모듈명 목록, 모듈별 행·메뉴 그룹 묶기
  - **`renderer/src/lib/screenPngPresence.ts`**: `docs/image/<화면ID>.png` 빌드 포함 여부(`import.meta.glob`) — **`hasScreenPng`**
  - **`renderer/src/components/MesScreenAccessDeniedModal.tsx`**: **`docs/image/<화면ID>.png`** 미포함 시 **`ScreenContentByScreenId`** 접근 안내(모든 모듈)
  - **`renderer/src/lib/useScreenManualMeta.ts`**: `manual.csv` 행 조회·**`useDocumentTitlePath`**(`메뉴 > 하위메뉴`; **`BaseFeatureScreen`**이 **`(화면ID)`** 접미로 `메뉴 > 하위메뉴 (화면ID)` 완성). **`manualInnerWindowTitle`** 은 MDI 타이틀바와 동일 문자열
  - **`renderer/src/screens/std/`**: **기준정보** 화면 ID별 TSX(`std_base_*`, `std_cfg_*`), **`registry.ts`** 로 `#/screens/<화면ID>` 에 매핑
  - **`renderer/src/context/MesMdiContext.tsx`**: MDI 상태·**`tileLayout`/`cascadeLayout`**·**`registerMdiClientSize`/`registerMdiClientMeasure`**·**`tileLayoutActiveRef`**(Tile 후 모듈 창 리사이즈 시 격자 재적용) — 규격은 **`project-rules.md` §6.0.2**
  - **`renderer/src/components/MesMdiLayer.tsx`**: 모듈 **MDI 내부창** 렌더·**내부 클라이언트** ref(`mdiClientRef`)만 크기 측정
  - **`renderer/src/components/ModuleWindowMenuBridge.tsx`**: Electron 모듈 창 **Window** 메뉴 ↔ MDI(Tile/Cascade/포커스)
  - **`renderer/src/pages/`**:
    - **`ModuleBlankPage.tsx`**: `#/module/<모듈명>` — Electron 모듈 전용 창 **초기 빈 화면**
    - **`ModuleFeaturesPage.tsx`**: `#/modules/<모듈명>` — 메뉴 그룹별 목록(브라우저·SCM 등)
    - **`ScreenPlaceholderPage.tsx`**: `#/screens/<화면ID>` — **PNG 없으면** **`MesScreenAccessDeniedModal`**; PNG 있고 레지스트리에 있으면 구현 화면, PNG만 있고 미등록이면 **준비 중** 안내
  - **`renderer/src/App.tsx`**: 라우트 + Electron 메뉴 IPC(`mes:open-screen`) → 화면 이동
  - **`renderer/src/mes-env.d.ts`**: `window.mes` 타입
  - **`renderer/src/index.css`**: `@import "tailwindcss";` 방식
  - **라우팅**: `HashRouter` — `#/` 스플래시, `#/modules/<모듈명>`, `#/screens/<화면ID>`
