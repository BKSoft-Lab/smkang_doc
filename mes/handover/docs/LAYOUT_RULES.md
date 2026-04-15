# UI 레이아웃 규칙 (Layout Rules)

이 문서는 React 렌더러 화면의 **폼·조회줄·그리드·색상·기간 입력** 등 **시각 레이아웃**을 정의한다.

- **용어 (`std_*` vs `Mes*`)**: **`std_*` 화면 ID**·**`screens/std/`** 는 **기준정보** 도메인이다. **`MesDataGridPanel`·`MesDetailForm`·`MesSearchSaveBar` 등 `Mes*` 컴포넌트**는 **전 모듈 공통 표준 UI**이며 `std_*` 전용 접두어가 아니다. 상세는 **`project-rules.md` §6.0** 「용어: `std_*` / `Mes*`」.
- **함께 읽을 문서**: **`project-rules.md` §6.0** — `manual.csv`·`docs/image/<화면ID>.png`·표준 Chrome(**Toolbar만** — 인앱 `MesMenuBar` 기본 생략, Electron 시스템 메뉴와 중복 방지)·**타이틀**: 모듈 창은 **모듈명만**; 기능·내부 화면은 **`메뉴 > 하위메뉴 (화면ID)`**(`docs/image/<화면ID>.png` 대조)·PNG **예시 데이터 전부** 목업·`BaseFeatureScreen` / `MesFeatureChrome` 골격(경로 줄·뒤로가기 없음). **Electron 모듈 창·MDI·Tile/Cascade·클라이언트 측정**은 **`project-rules.md` §6.0.1·§6.0.2** — 내부창 격자가 **모듈 클라이언트(툴바 아래)** 픽셀에 비례하도록 `registerMdiClientSize` / `registerMdiClientMeasure`·`tileLayoutActiveRef` 등(모든 모듈 MDI 구성 시 동일).
- **갱신 원칙**: 레이아웃 규칙을 바꿀 때는 **본 문서를 먼저 수정**하고, 화면 ID·PNG·골격과 맞물리면 **`project-rules.md` §6.0** 도 점검한다.
- **AI 브리핑**: UI 화면 구현·Tailwind 패턴·조회줄 정합 작업 시 **`docs/LAYOUT_RULES.md`** 를 확인한다(`project-rules.md` 작업 종료 프로토콜 준수). **그리드 위 조회줄**(필터 + Search/Save)은 **`MesSearchSaveBar`**(아래 「조회 Search/Save 표준 스트립」). **데이터 그리드**는 **`MesDataGridPanel`**(「데이터 그리드 표준 패널」), 그리드 **하단 행 상세·수정**은 **`MesDetailForm`**(「행 상세 폼」)을 우선하고, **조회·그리드·상세·본문 카드 경계**는 「**기능 화면 구역 시각적 구분**」을 본다. 세부는 「**그리드(테이블) 스타일**」·「**`SimpleGridTable` 공통 기능·옵션**」과 함께 본다.

---

## PNG 캡처 기반 레이아웃 정합 (`docs/image/<화면ID>.png`)

화면을 **`docs/image/<화면ID>.png`** 로 1차 정합할 때 다음을 **필수로** 따른다.

- **컨트롤 가로 폭 (width)**: **텍스트박스**(`input` / `textarea`)·**셀렉트박스**(`select`)·기타 입력·선택 컨트롤은 **그림에서 보이는 가로 크기에 최대한 맞춘다**. 캡처상 대략 폭을 잴 수 있으면 **`w-[NNNpx]`**·`min-w-[…]`·`max-w-[…]` 등으로 **고정 폭**을 두거나, 동일 **비율**이 되도록 `rem`·Tailwind 폭 유틸을 선택한다. 조회줄 콤보처럼 PNG에서 **특히 넓거나 좁게** 보이는 항목은 **일반 필드와 다른 전용 클래스**를 두어 시각적 비중을 맞춘다.
- **그리드 예제 행**: PNG에 나타난 **샘플·예시 데이터 행**은 **모두 추가**한다(일부만 옮기지 않음). **모든 신규 화면** 구성 시 동일 원칙을 적용한다. 행 번호 스킵·빈 행·스크롤용 패딩 등 **캡처에 보이는 패턴**이면 **`SimpleGridTable`의 `cellValues`·`rows` 등**으로 동일하게 반영한다. 상세 패턴은 아래 「**그리드(테이블) 스타일**」·**`SimpleGridTable` 열 너비·목업**·「**`SimpleGridTable` 공통 기능·옵션**」과 함께 본다.

---

## 폼 영역 (Form Area)

- **한 줄 표시**: 각 라벨과 컨트롤은 반드시 한 줄에 표시. 줄바꿈 금지
- **구현 패턴**: `flex items-center gap-2 whitespace-nowrap` (label), 라벨 텍스트는 `<span className="w-[80px] shrink-0 text-right">`, 컨트롤은 `min-w-0 flex-1`. textarea일 때는 `items-start` + 라벨에 `pt-0.5`
- **그리드 구조**: N열 × M행 그리드로 구성. 같은 열의 컨트롤은 세로 정렬
- **라벨 + 컨트롤**: 각 셀은 `label + control` 가로 배치 (label 우측 정렬, control 왼쪽 정렬)
- **라벨 너비 통일**: 같은 열 내 라벨은 동일 너비(`w-[80px]`, `w-[110px]` 등) 적용, `whitespace-nowrap`로 줄바꿈 방지
- **컨트롤 정렬**: 각 행의 첫 번째 컨트롤 시작 위치를 맞춤
- **열 그룹 내 입력 시작 X좌표 정렬**: 같은 열(또는 동일 시작 열을 공유하는 `col-span` 셀)에 배치된 모든 행의 입력 박스 시작 X좌표는 반드시 일치시킨다.
  - **방법**: 해당 행들의 `FormLabelInput widthClass`를 **가장 긴 라벨 기준**으로 통일한다 (예: `w-[68px]`로 IP Address·이니셜·퇴사 모두 통일).
  - **col-span 적용 시**: `col-span-2` 등으로 여러 열을 병합한 셀도 **왼쪽 시작 열이 동일**하면 같은 `widthClass`를 써서 입력 시작 위치를 맞춘다.
  - **세로 스택 열**: Description·E-Mail처럼 같은 열에 세로로 쌓인 항목도 동일 `widthClass`를 적용해 입력 박스 좌측 선이 정렬되도록 한다.
- **경고문 위치**: 관련 항목 오른쪽 끝에 배치

## 본문 액션 버튼 (Form-body action column)

- **적용**: 상단 **`Toolbar`** 와 별도로, PNG에 **카드·폼 본문의 우측 세로 버튼열**(Save, 엑셀 업로드, 양식, Maker PartNo 등)이 있는 경우. **필드 순서·행 수는 PNG 1차**, **스타일·아이콘·열 구조는 본 절**로 통일한다.
- **위치·레이아웃**
  - 입력 필드 블록(한 열 또는 **좌·우 다열**)과 버튼 열을 **형제**로 둔다: 바깥 **`flex`**(또는 **`grid`** 의 마지막 열). 필드 측 **`flex-1 min-w-0`**, 버튼 열 **`shrink-0`**.
  - 버튼은 **`flex flex-col gap-1`**(필요 시 `gap-2`)로 **위→아래** 스택. PNG가 가로 나열이면 그에 맞게 예외.
  - **하단 메타**(Loss, 제습함, 등록·수정 등)가 있으면, **필드+메타를 하나의 `flex-1 flex-col`** 로 묶고 버튼 열을 **옆 형제**로 두어 — 메타 행이 **버튼열 너비 아래로 넓어지지 않게** 한다(한 입력 영역으로 보이게 할 때 **필드~메타에만 적용되는 전폭 가로 `border-t`** 로 버튼까지 띠가 이어지지 않게 할 것).
- **영역 구분**
  - 필드(및 위 메타) 그룹과 버튼 열 사이: **`border-l border-slate-300`** + **`pl-4`**(또는 동등 간격)로 **수직 분리**(밝은 배경·`bg-slate-50` 조회줄에서도 식별되도록 `200/80` 대신 고정 톤).
  - 조회줄 **`BaseFeatureScreen`의 Search/Save**와 혼동하지 않는다(그쪽은 `filterArea` + `justify-end` 패턴) — 상세는 아래 「**조회줄 Search / Save**」.
- **아이콘·컴포넌트**
  - 아이콘은 반드시 **`ToolbarIcon`** (`renderer/src/components/ToolbarIcons.tsx`). **이모지·임의 단독 SVG**로 상단 Toolbar와 다른 그림 쓰지 않는다.
  - 래퍼(상단 Toolbar 버튼과 동일):  
    `flex h-7 w-7 shrink-0 items-center justify-center rounded bg-gradient-to-b from-white to-slate-100 shadow-sm ring-1 ring-slate-200`  
    내부 `<ToolbarIcon name="…" />` (기본 크기 `h-5 w-5`).
  - 버튼: Toolbar와 같은 상호작용 계열 — 상단 **`Toolbar.tsx`** 는 **아이콘 왼쪽·라벨 오른쪽** (`inline-flex flex-row items-center gap-1.5`). 본문 액션 등 **세로 스택** 예시:  
    `group inline-flex flex-col items-center justify-center gap-0.5 rounded border border-transparent text-[11px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100`  
    라벨은 **`leading-none`**. 가독·PNG에 따라 버튼 **`min-w`**·**`whitespace-nowrap`** 만 조정.
- **`ToolbarIcon` 이름 매핑(참고)**
  - 저장/Save → **`save`**, 엑셀·다운로드류 → **`excel`**, 양식·문서 파일 → **`new`**, 그리드·PartNo·표 → **`grid`**. 필요 시 **`ToolbarIconName`**에 **동일 `stroke-slate-500` 스타일**로 케이스 추가 후 사용.

## 조회줄: 필터–버튼 수직 구분선 (필터 ↔ Search / Save)

조회 한 줄에서 **필터 묶음**과 **Search·Save 열** 사이의 **왼쪽 세로 구분선**은 반드시 눈에 띄게 그린다.

- **표준 클래스**: **`border-l border-slate-300`** + **`pl-4`**(간격 여유 시 버튼 열 앞에 **`ml-3`** 병행 가능). 본문 액션 열과 동일 톤으로 맞춘다(위 「**본문 액션 버튼**」·`border-l`).
- **색상 이유**: **`border-slate-200`**·**`border-slate-200/80`** 등은 **`bg-white`** 에서는 보일 수 있으나, **`bg-slate-50`**·**`bg-slate-50/60`**·탭/카드 **헤더 스트립**처럼 배경이 연한 회색일 때 **배경과 대비가 거의 없어 구분선이 보이지 않는다**. 조회줄·`MesFilterRow` 의 필터–버튼 분리선에는 **`border-slate-300`** 을 쓴다.
- **세로 높이 (`items-stretch`)**: 조회 줄 **바깥 `flex` 컨테이너**는 **`items-stretch`** 로 둔다. **`items-center`** 만 쓰면 구분선을 둔 열의 높이가 아이콘·버튼에 맞춰 짧아져 **세로선이 거의 보이지 않을 수 있다**. 필터 쪽 **`flex-1`** 래퍼 안에서는 **`items-center`**·**`justify-end`**·`flex-wrap` 으로 컨트롤만 세로 가운데 정렬하고, 필요 시 **`py-0.5`** 등으로 행 내 여백을 맞춘다.
- **구현 패턴 (누락 방지)**: 구분선은 **`MesSearchSaveBar`**(`BaseFeatureScreen` 의 `filterArea` 렌더)의 **우측 Search/Save 열**(`border-l` 이 있는 `shrink-0` 블록) 또는 **`MesFilterRow`** 의 **`filters` / `actions`** 로만 만든다. 필터 컨트롤과 Search 버튼을 **한 줄에 형제로만 나열**하면 **`border-l` 이 없어** 규칙 위반이 된다(재발 예: 라우터 관리 상단 조회).
- **`MesFilterRow`** (`FilterBarButtons.tsx`): 카드·탭 헤더 등 **바깥에 이미 `border-b`·패딩**이 있는 조회 줄은 **`bare`** — 내부만 한 줄 **`flex`** + 위와 동일 **`border-l border-slate-300`**. 페이지 **최상단 전용** 조회 스트립(흰 바)은 **`bare={false}`** 가 기본(컴포넌트가 `border-b`·`px-3 py-0.5` 래퍼 제공).
- **예외**: PNG에서 필터·버튼이 **의도적으로 한 덩어리**면 구분선 생략 가능. **필터 그리드 셀 안에만** Search가 있으면(`showFilterSearch={false}`) 본 구분선·우측 열을 쓰지 않는다.

## 조회줄 Search / Save (`BaseFeatureScreen`·`MesFeatureChrome` 공통)

- **`BaseFeatureScreen`**: `filterArea` 가 있으면 상단 조회 한 줄을 **`MesSearchSaveBar`** 로 렌더한다. `showFilterSearch`·`showFilterSave` 가 켜진 경우 우측 **`FilterSearchButton`**·**`FilterSaveButton`** (`renderer/src/components/FilterBarButtons.tsx`) 로만 렌더한다. **녹색 점(`bg-emerald`)·임의 아이콘**으로 Toolbar와 다른 패턴 쓰지 않는다.
- **`MesFeatureChrome`** 또는 **커스텀 조회줄**에서도 동일 컴포넌트를 쓴다. PNG 문구가 **`Search(S)`** 등이면 **`children`** 으로 넘긴다.
- **아이콘**: **`ToolbarIcon`** 의 **`search`**·**`save`**, 래퍼는 **`filterBarIconWrapClass`** (`h-7 w-7` 그라데이션 링 — 상단 Toolbar·본문 액션과 동일).
- **배치**: 필터 필드 블록은 **`flex-1`** 안에서 **`justify-end`**·`flex-wrap`(**`project-rules.md` §6.0** 2차 정합). **검색(조회) 영역 컨트롤은 우측 정렬**: 필터·콤보·입력란 묶음이 **행 전체 너비에서 오른쪽**에 오도록 한다. `filterArea` 루트가 **`w-full`** 인 **`flex`** 안에서 내부만 **`flex-1`** 그리드로 넓히면 **컨트롤이 왼쪽에 붙는 실수**가 나므로, 루트에 **`justify-end`**, 내부 그리드·필드 블록에는 **`shrink-0`**(또는 불필요한 **`flex-1` 제거**)를 적용하거나, 필드를 **`flex flex-wrap justify-end gap-x-3 gap-y-0.5`** 한 래퍼로 묶어 **콘텐츠 폭만큼만 차지한 채 우측**에 두는 패턴을 쓴다. **행간 여백**: 다행 조회 스트립은 세로 **`gap-y-0.5`**·스트립 **`py-0.5`**·필터–Search 열 **`ml-2 pl-3 gap-1`**(`BaseFeatureScreen`·`MesFilterRow`)로 더 촘촘하게 맞춘다. **`FilterSearchButton`/`FilterSaveButton`** 은 **`px-1.5 py-0.5`**. 필터–버튼 **수직 구분선·높이·색**은 위 「**조회줄: 필터–버튼 수직 구분선**」을 따른다.
- **`MesFilterRow`**: 상세는 위 같은 절 — **`bare`/`filters`/`actions`**(포장단위·라우터·Tact Time 카드 헤더·메뉴권한 범례+권한그룹 등).
- **필터 그리드 셀** 안 **세로 병합** Search는 **`FilterSearchButtonStacked`** (`frmItemMaster` 등).

## 조회 Search/Save 표준 스트립 (`MesSearchSaveBar`)

**구현**: `renderer/src/components/MesSearchSaveBar.tsx`. **`BaseFeatureScreen`** 은 `filterArea` 를 **`MesSearchSaveBar`** 의 **`filters`** 로 넘기고, 선택 **`filterLeading`** 을 **`leading`** 으로 넘긴다(스트립 **맨 왼쪽**·배너·모드 배지). **`showFilterSearch`** / **`showFilterSave`** 를 **`showSearch`** / **`showSave`** 에 연결한다. 버튼 마크업·아이콘 래퍼는 **`FilterBarButtons.tsx`** — 상세 클래스는 아래.

**적용 원칙 (신규·수정 공통)**: **페이지 최상단** 흰 조회 스트립(그리드·카드 본문 위)은 **이 절의 클래스·구조**를 따른다. **카드·탭 헤더 안** 한 줄 조회는 **`MesFilterRow`**(`bare`/`filters`/`actions`) — 수직 구분선·톤은 「**조회줄: 필터–버튼 수직 구분선**」과 동일. **`BaseFeatureScreen` 밖**에서 동일 UI가 필요하면 **`MesSearchSaveBar`** 를 직접 import 해 사용한다.

### 루트(흰 조회 바)

| 구분 | Tailwind / 마크업 |
|------|-------------------|
| 하단 경계·배경·패딩·구역감 | `border-b border-slate-300 bg-white px-3 py-0.5 shadow-sm` |
| 선택 루트 확장 | `className` prop |

### 한 줄 flex(자식 1단계)

| 구분 | 클래스 |
|------|--------|
| 가로·세로 맞춤 | `flex w-full min-w-0 items-stretch gap-0 text-[11px] text-slate-700` |

### `leading` 영역(맨 왼쪽, 선택)

| 구분 | 클래스 / 비고 |
|------|----------------|
| 컨테이너 | `flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 border-r border-slate-200 pr-[10px]` |
| 너비 | **`flex-1`** 으로 **필터 블록(첫 라벨, 예: 「사용자 ID」) 직전까지** 가로를 쓴다. 우측 패딩 **`pr-[10px]`** 는 필터 첫 텍스트와의 **간격(약 10px)**. 예전처럼 `shrink-0` 만 두어 메시지가 좁게 남지 않게 한다. |
| 용도 | 삭제 확인·저장/오류 메시지·**신규 등록** 배지 등 — Search 열 **직전**이 아니라 **스트립 좌측** |
| 긴 경고 문구 | `filterLeading` 안 **저장/오류 배너**는 **`max-w-[14rem] truncate`** 로 잘리지 않게 **`min-w-0 flex-1 basis-0 break-words`** 등으로 남는 너비를 쓴다(예: `std_base_user_mgmt`). |

### 필터 영역(가운데, `leading` 유무에 따라)

| 구분 | 클래스 |
|------|--------|
| `leading` **있음** | `flex min-w-0 flex-wrap items-center shrink-0 justify-end gap-x-3 gap-y-0.5 py-0` — 필터만 **내용 폭**; `leading` 이 남는 공간을 채운 뒤 그 오른쪽에 붙는다. |
| `leading` **없음** | `flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-0.5 py-0` — 기존과 같이 **행 우측 정렬** |
| 정렬 | 필터·콤보 묶음은 **우측**(`justify-end`) — §6.0 2차 정합·위 「**조회줄 Search / Save**」 배치 절 참고 |

### Search / Save 열(오른쪽, 고정)

| 구분 | 클래스 |
|------|--------|
| 컨테이너 | `ml-2 flex shrink-0 items-center gap-1 border-l border-slate-300 pl-3` |
| 표시 조건 | `showSearch` 또는 `showSave` 가 하나라도 켜졌을 때만 열 렌더. 둘 다 끄면 우측 열 없음 |

### 버튼(`FilterSearchButton` / `FilterSaveButton`)

| 구분 | 클래스 / 비고 |
|------|----------------|
| 버튼 베이스 (`filterBarBtnInlineBase`) | `group inline-flex items-center gap-1.5 rounded border border-transparent text-[11px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 px-1.5 py-0.5` |
| 아이콘 래퍼 (`filterBarIconWrapClass`) | `flex h-7 w-7 shrink-0 items-center justify-center rounded bg-gradient-to-b from-white to-slate-100 shadow-sm ring-1 ring-slate-200` — 내부 **ToolbarIcon** `search` / `save` |
| 라벨 | `leading-none` (`<span>`) |
| PNG 문구 | `children`(예: `Search(S)`)으로 전달 가능 |

### `MesFilterRow` 와의 차이

- **`MesSearchSaveBar`**: **페이지 상단** 전용 — 루트에 **`border-b`**·**`bg-white`**·**`px-3 py-0.5`**·**`shadow-sm`** 포함.
- **`MesFilterRow` `bare={true}`**: 상위에 이미 **`border-b`**·패딩이 있을 때 — 내부만 **`MesSearchSaveBar`** 의 한 줄 flex와 **동일한** 필터/`border-l`/버튼 톤.

## 기간·일시 범위 (`type="date"` / `type="datetime-local"`)

- **가로 연속 배치**: 조회·폼에서 **시작·끝** 두 컨트롤을 **한 줄에 좌우로 나란히** 두는 경우, **사이에 물결표 `~` 를 반드시 표시**한다(구간 구분).
- **구현 권장**: `flex items-center gap-1.5`(또는 `gap-2`)로 묶고, 중앙에 예) `<span className="shrink-0 text-slate-500" aria-hidden="true">~</span>` 를 둔다. `MesFeatureChrome`·`BaseFeatureScreen` 필터 모두 동일 원칙 적용.
- **신규/수정 시**: 동일 화면·동일 패턴을 추가할 때 연속 캘린더(날짜·일시) 사이 `~` 누락 여부를 확인한다. `docs/FEATURES.md` 공통 절과 함께 본 규칙을 따른다.

## 화면·패널 색상 (Chrome & Panels)

- **팔레트**: 화면 전체 배경·카드/패널·구분선·본문 텍스트는 **Tailwind `slate` 계열**로 통일한다 (예: 페이지 `bg-slate-100`, 패널 `bg-white`·`border-slate-300`, 헤더 영역 `bg-slate-50`, 본문 `text-slate-700`·`text-slate-600`).
- **PNG 참고 시**: 원본 캡처가 WinForms/회색·베이지 hex 톤이더라도, **구현 색상은 본 절 및 그리드 스타일 규칙을 우선**한다(임의 hex 색으로 화면 전체 톤을 맞추지 않는다).
- **선택/강조**: 행 선택·강조 박스 등은 과도한 색 대신 `amber`/`ring` 등 **보조색을 절제**하여 사용한다.

## 기능 화면 구역 시각적 구분 (Toolbar·조회·본문)

**목적**: **`MesSearchSaveBar`**·**`MesDataGridPanel`**·**`MesDetailForm`**·**`BaseFeatureScreen`** 본문 카드가 한 화면에 이어질 때 경계가 드러나도록 **테두리·그림자·링** 톤을 맞춘다(구분선은 **`border-slate-300`** 계열 우선).

- **`BaseFeatureScreen`** 본문 흰 카드: **`rounded border border-slate-300 bg-white shadow-sm`** — 페이지 **`bg-slate-100`** 과 대비.
- **`MesSearchSaveBar`**: **`border-b border-slate-300 bg-white shadow-sm`** — 조회줄과 아래 본문 카드 사이 층 구분.
- **`MesDataGridPanel`** 루트: **`ring-1 ring-slate-300 ring-inset`** — 그리드 블록을 흰 카드 안에서 한 덩어리로 구분(`SimpleGridTable` 표 테두리와 별개).
- **`MesDetailForm`**: **`border-t border-slate-300`** — 그리드(또는 목록)와 상세 폼 사이 **조회줄 필터–버튼 구분선**과 동일 톤.
- **`children` 안 여러 세로 구역**(폼 블록·좌우 분할의 한 열 안 스택 등): 공통 컴포넌트 밖에서 임의로 쌓을 때는 **`flex flex-col divide-y divide-slate-300`** 이거나, 구역마다 **`border border-slate-300 rounded-sm`**·**`bg-white`** 등으로 **명시적 테두리**를 둔다. PNG에 맞춰 과도한 선은 줄여도 된다.

## 그리드(테이블) 스타일 (Grid/Table Style)

모든 페이지의 그리드(테이블)에 일관되게 적용:

- **sticky 헤더**: 세로 스크롤이 있는 테이블은 `thead`에 `sticky top-0 z-10 bg-slate-50` 를 적용해 헤더가 본문 셀 위에 올바르게 겹치도록 한다.
- **헤더(열 타이틀) 한 줄·최소 너비·가운데 정렬**: 열 제목은 **항상 `text-center`**(본문 열이 `text-left`/`text-right`여도 **`columnClassNames`를 `th`에 적용하지 않음**). `th` 내부 래퍼에 **`whitespace-nowrap`**·**`min-w-max`**·**`w-max max-w-full`** 를 적용한다. **`SimpleGridTable`** 의 **`columnLayout: 'fixed'`** + **`colWidths`**(`table-fixed`) 일 때만 테이블에 **`width: 100%`**·**`min-width: max-content`**·**가로 스크롤** 래퍼 정합을 병행한다. **기본 `intrinsic`** 에서도 표가 넓으면 동일 래퍼에서 스크롤한다.
- **스크롤**: 그리드 래퍼는 flex 체인에서 **`min-h-0`·`min-w-0`** 로 높이·너비 상한을 받고, 본문 영역은 **`overflow-x-auto overflow-y-auto`** 로 가로·세로 스크롤(부모가 **`flex` + `flex-1` + `min-h-0`** 인지 확인).
- **`SimpleGridTable` 셀 가로 상한·한 줄 말줄임**: 본문 **`td`**·**`th`** 수평 패딩은 **`px-[0.3125rem]`**(좌·우 각 **0.3125rem**, 합 **0.625rem** — 루트 **`1rem === 16px`** 일 때 합 ≈ **10px**; **`rem`** 으로 사용자 zoom·글꼴 설정에 맞춤). 본문 **`td`** 는 **`max-w-0 overflow-hidden`** + 내부 **`span.block min-w-0 truncate`** 로 열이 좁을 때 **한 줄 + 말줄임(`…`)**; 값이 있으면 **`title`** 로 전체 문자열 툴팁. 구현 상수: **`BaseFeatureScreen.tsx`** 의 **`simpleGridCellPadXClass`**.
- **셀 세로 패딩**: 본문 **`td`** 는 **`py-0.5`**(합 4px), 헤더 **`th`** 는 비정렬 시 **`py-1`**(합 8px), 정렬 가능 시 내부 `button`에 **`min-h-[1.75rem]`** + **`py-1`**. 헤더가 본문보다 약간 두꺼워 계층 구분을 유지한다.
- **테이블 외곽선**: `border border-slate-300`
- **열 구분선**: `th`, `td`에 `border-r border-slate-300` (열 구분선 진하게)
- **텍스트 정렬**: 기본적으로 `th`, `td` **가운데 정렬**. **`SimpleGridTable`** 은 **`th` 고정 `text-center`**, **`td`** 만 **`columnClassNames`** 로 정렬 예외.
- **셀 텍스트 색상**: `td`에 `text-slate-600` (통일된 색상)
- **커스텀 테이블**: `SimpleGridTable` 미사용 시에도 위 스타일 동일 적용
- **`SimpleGridTable` 열 너비·목업**: 기본 **`columnLayout: 'adaptive'`**(열이 1개 이상일 때). **`colWidths` 생략** 또는 **열 개수 불일치** 시 내부적으로 **`simpleGridTableUtils.ts`** 의 **`equalPercentageColWidths(n)`**(정수 **`%`**, 합 **100%**)로 보정 → 넓은 뷰에서 **`table-fixed`**로 **패널 가로 채움**. 가로 스크롤 영역에 **자연 너비가 다 들어가지 않을 때만** **`table-auto`** · 열 ≈ **최장 텍스트 + `simpleGridCellPadXClass`**. **`columnLayout: 'intrinsic'`** = 항상 내용 기반. **`fixed`** = 항상 `table-fixed`+유효 `colWidths`. PNG별 열 비는 명시적 **`colWidths`** 권장. **`columnClassNames`**·**`oddRowClassName`**·**`cellValues`**. **선택**: **`sortable`** + **`sortColumn`** / **`sortDirection`** / **`onSortColumn`** — 헤더 클릭 정렬(부모에서 **`cellValues` 정렬** 후 전달). **열 리사이즈·더블클릭 맞춤**은 아래 「**`SimpleGridTable` 공통 기능·옵션**」. **PNG 예제 행 전량**은 위 「**PNG 캡처 기반 레이아웃 정합**」。

### `SimpleGridTable` 공통 기능·옵션 (신규 화면 작성 시)

**구현·상수**: `renderer/src/components/BaseFeatureScreen.tsx` — **`SimpleGridTable`**, **`simpleGridCellPadXClass`**, 열 맞춤용 **`COLUMN_FIT_EXTRA_PX`**, 드래그 임계 **`COLUMN_RESIZE_DRAG_THRESHOLD_PX`** 등.

- **공통 원칙**
  - **한 컴포넌트로 통일**: 화면별로 테이블 마크업을 새로 짜지 않고 **`SimpleGridTable`** + props로만 차이를 둔다.
  - **셀 패딩·본문 한 줄**: 가로 패딩은 **`simpleGridCellPadXClass`**(`px-[0.3125rem]`) — zoom·글꼴 대응. 본문 **`td`**: **`max-w-0 overflow-hidden`**, 내부 **`span`**: **`block min-w-0 truncate`**, 비어 있지 않은 값에 **`title`**(전체 텍스트).

- **레이아웃·스크롤**
  - 그리드가 들어가는 **부모**는 flex 체인에서 **`flex-1`·`min-h-0`·`min-w-0`** 를 받을 수 있게 두어, **`SimpleGridTable`** 루트의 **`overflow-hidden`** + 본문 **`overflow-x-auto overflow-y-auto`** 로 세로·가로 스크롤이 동작하도록 한다(빈 패널·잘린 행 방지).

- **데이터·목업**
  - **`cellValues`**·**`rows`**: PNG·매뉴얼에 나온 **예시 행은 가능한 한 전부** 반영한다(위 「PNG 캡처 기반」).

- **열 헤더 클릭 정렬 (선택)**
  - **`sortable`**, **`sortColumn`**, **`sortDirection`**, **`onSortColumn`**: 정렬 상태는 부모에서 관리하고, **`cellValues`** 를 정렬한 뒤 넘긴다. 헤더 **`th`** 는 항상 가운데 정렬 — 본문만 **`columnClassNames`** 로 좌·우 정렬.

- **열 너비 조절 `columnResize` (선택)**
  - **`columnResize={true}`** 일 때 `colgroup` **`px`** 로 열 너비를 잡는다. 초기값은 스크롤 영역 너비 × **`colWidths`** 비율.
  - **`minColumnWidthPx`**: 열 최소 너비(코드 기본 **40**).
  - **부모 `zoom`**: 표를 CSS **`zoom`** 등으로 확대·축소할 때 드래그 좌표와 맞추려면 **`columnResizeVisualScale`** 에 배율을 넘긴다(예: `gridZoomPct / 100`).
  - **드래그**: 각 열 **오른쪽 경계**에 핸들(마지막 열 포함). 드래그 시 **그 핸들의 왼쪽 열**만 너비 변경 — **오른쪽 열 너비는 유지**, **표 전체 가로 길이**만 늘거나 줄어들며 **가로 스크롤**로 본다.
  - **드래그 시작 임계값**: 포인터가 약 **5px** 이상 움직인 뒤에만 리사이즈로 처리해 **더블클릭 맞춤**과 겹치지 않게 한다.
  - **더블클릭(열 맞춤)**: 구분선(핸들)을 더블클릭하면 **그 핸들의 왼쪽 열 하나**를 헤더·본문 **한 줄**에 들어가도록 너비를 맞춘다. 넓은 열도 **줄어들도록** 측정한다. 내부적으로 **`colgroup col`** 을 일시 좁힌 뒤 **`scrollWidth`** 와 내부 **`span`/`button`** 의 **`getBoundingClientRect`** 등을 병행해 과소 측정을 줄이고, 여유 **`COLUMN_FIT_EXTRA_PX`**(코드 기본 **10px**)를 더한다. 본문 셀 **한 줄 말줄임(`truncate`/`overflow-hidden`)** 과 병행할 때는 측정 순간에만 셀·자식에 **`overflow: visible`**, **`text-overflow: clip`** 을 인라인으로 덮어쓰고, **`tbody` `td` 의 직접 자식 `span`** 에는 **`display: inline-block`**, **`width: max-content`** 를 잠시 적용한 뒤 복원한다(`BaseFeatureScreen.tsx` 의 **`measureColumnFitWidth`**). 핸들에 **`title`**·**`aria-label`** 로 조작 힌트를 둔다.
  - **맨 끝 열 핸들 더블클릭**: **마지막 열** 오른쪽 구분선을 더블클릭하면 위와 **동일한 측정**을 **모든 열**에 한 번에 적용한다(열을 하나씩 더블클릭한 것과 같은 효과).
  - **맨 끝 열**: 오른쪽 끝에도 핸들이 있어야 헤더 텍스트를 더블클릭할 때 글자 선택·줄바꿈처럼 보이는 문제를 피한다.

- **열 비·고정 레이아웃**
  - PNG와 열 비율을 맞출 때는 **`colWidths`**(합 100% **`%`**)를 명시하는 것을 권장한다. **`columnLayout: 'fixed'`** 는 항상 `table-fixed` + 유효 `colWidths` 일 때.

## 데이터 그리드 표준 패널 (`MesDataGridPanel`)

**구현**: `renderer/src/components/MesDataGridPanel.tsx` — 내부에서 **`SimpleGridTable`** + 공통 UX를 묶는다.

**적용 원칙 (신규·수정 공통)**: 목록·마스터 형 **데이터 그리드**는 **별도 지시가 없어도** 원칙적으로 **`MesDataGridPanel`** 만 사용한다. 화면 TSX에서 **`SimpleGridTable`** 을 직접 import 하지 않는다. **예외**: PNG/기획상 **특수한 비표준 테이블**(예: 단일 행 편집용 미니 그리드, 정렬·줌이 불필요한 정적 표)만 사례별로 **`SimpleGridTable`** 또는 커스텀 마크업을 검토한다.

**포함 UX** (공통코드 관리와 동일 기준):
- **구역 프레임**: 루트에 **`ring-1 ring-slate-300 ring-inset`** 로 본문 카드 안에서 그리드 블록 경계를 구분(위 「**기능 화면 구역 시각적 구분**」).
- **안내줄**: 열 경계 드래그(왼쪽 열만 너비 변경)·열 제목 클릭 정렬 전환·**Ctrl+휠** / **⌘+휠** 확대·축소·현재 줌 **%** 표시
- **줌**: CSS **`zoom`** **40~200%**, **5%** 스텝; 열 리사이즈 좌표 보정을 위해 **`columnResizeVisualScale = gridZoomPct / 100`**
- **`SimpleGridTable` 고정값**: **`columnLayout: 'adaptive'`**, 본문 열 **`text-left`**, **`sortable`**, **`columnResize`**, **`colWidths`** 생략 시 **`equalPercentageColWidths(columns.length)`** (`simpleGridTableUtils.ts`)
- **정렬**: **`localeCompare(..., 'ko', { numeric: true, sensitivity: 'base' })`**; 첫 열 헤더가 **`#`**(줄번호)이면 정렬 후 **1…n** 으로 다시 매김
- **편집 시 재정렬 방지**(선택): **`preserveSortOrderUntilHeaderClick`** — **true**이면 **열 헤더로 정렬이 바뀌기 전**에는 셀 값만 바뀐 경우 **표시 순서를 유지**한다. **`sortDataEpoch`**(number|string)를 부모가 **데이터 세트 교체**(예: 조회 성공) 시에만 올리면 **새 데이터**에 대해 정렬 기준을 다시 적용한다.
- **첫 열 줄번호**: **`showRowNumbers`** 기본 **`true`** — 부모 `columns` 에 **`#`** 가 없으면 패널이 **`#`** 열과 **1…n** 줄번호를 붙인다(첫 열 너비 **`4%`** + 나머지 열 비율). **`onSelectRow`** 로는 **데이터 열만** 넘긴다. 부모가 이미 **`columns[0] === '#'`** 를 넘기면(예: **`std_base_common_code_mgmt`**) 중복하지 않는다. 끄려면 **`showRowNumbers={false}`**.

**주요 props**: `columns`, `cellValues`, 선택 **`showRowNumbers`**, **`colWidths`**, **`tableTitle`**, **`minVisibleRows`**(기본 **0** — 데이터가 비어 있는 행은 렌더하지 않음; `n>0`이면 본문 **최소 높이** 힌트만 주고 빈 패딩 행은 만들지 않음. 높이는 `min(n×대략행높이, 100%)`로 부모를 넘지 않게 캡), **`oddRowClassName`**, **`className`**, 마스터–디테일용 **`selectedRowIndex`**·**`onSelectRow(rowIndex, row)`**·**`onSortChange`**

- **행 선택 → `MesDetailForm`**: `onSelectRow` 를 넘기면 본문 행이 클릭 가능해지고, **`rowIndex`는 현재 정렬이 반영된 표시 순서**이다. 빈 패딩 행(데이터 열이 모두 비어 있으면)은 선택되지 않는다. **열 헤더로 정렬을 바꾸면** `onSortChange` 로 상세 선택을 비우는 것이 일반적이다. 저수준 **`SimpleGridTable`** 에는 **`selectedRowIndex`**·**`onRowClick(rowIndex)`** 가 대응한다.

**부모 레이아웃**: 그리드가 들어가는 영역은 flex 체인에서 **`flex-1`·`min-h-0`·`min-w-0`** 를 받게 둔다. **한 화면에 그리드가 여러 개**면 **인스턴스를 분리**한다(각각 `MesDataGridPanel`).

**PNG·열 비**: 캡처와 열 비를 맞출 때는 **`colWidths`**(합 **100%**) **명시**를 권장한다.

**`SimpleGridTable` 공통 기능·옵션** 절과의 관계: 패널이 **안내줄·줌·정렬 상태·리사이즈 스케일**을 일괄 적용한다. 셀 패딩·sticky·열 맞춤 등 저수준 규칙은 위 「**`SimpleGridTable` 공통 기능·옵션**」 및 **`BaseFeatureScreen.tsx`** 를 따른다.

## 행 상세 폼 (`MesDetailForm`)

**역할**: **`MesDataGridPanel`** 아래(또는 그리드와 세로로 쌓인) **선택 행의 상세 정보 표시·수정** 영역 — 마스터(목록 그리드)–디테일(폼) 패턴.

**구현**: `renderer/src/components/MesDetailForm.tsx` — 상단 경계(`border-t border-slate-300`)·배경(`bg-slate-50/80`)·패딩을 공통으로 두고, **`title`**(선택)·**`children`**(폼 필드)·**`footer`**(주의 문구 등, 선택)를 받는다.

**적용 원칙**: 목록+상세가 있는 기준정보·유사 화면에서 그리드 하단 상세는 **별도 지시가 없어도** **`MesDetailForm`** 으로 감싼다. UI 라벨은 화면별로 「상세」「Code Information」 등 PNG·매뉴얼에 맞춘다.

**부모 레이아웃**: 그리드+상세가 세로로 쌓일 때 부모는 **`flex flex-col min-h-0`**, 그리드 래퍼는 **`flex-1 min-h-0 min-w-0`**, **`MesDetailForm`** 은 **`shrink-0`**(컴포넌트 루트에 포함)로 목록이 남는 공간을 먼저 쓰게 한다.

**일반 열 매핑(신규·일괄 적용 권장)**: 그리드 열과 **동일한 라벨·값 순서**로 상세를 채울 때는 **`useMesGridRowSelection`**(`renderer/src/lib/useMesGridRowSelection.ts`)과 **`MesGridRowDetailFields`** / **`MesGridRowDetailForm`**(`renderer/src/components/MesGridRowDetailFields.tsx`)를 쓴다. 첫 데이터 행을 초기 선택으로 쓰고, **`onSortChange`**에서 상세를 비운다. **한 화면에 그리드가 여러 개**이면 패널마다 훅을 두고, **`lastPanel` 등 상태로 마지막으로 클릭한 그리드**에 맞는 `columns`·`detail`·`setDetail`을 하단 **`MesGridRowDetailForm` 한 곳**에 넘긴다. 그리드에 없는 필드(예: 비밀번호만 있는 입력)는 **`MesDetailForm` 안에서 `MesGridRowDetailFields` 아래**에 둔다. **열 타입·특수 매핑**(예: Activity Yes/No, 줄번호 `#` 제외 등)이 필요하면 **`std_base_common_code_mgmt`**처럼 **`rowToDetail`**·전용 필드를 유지한다.

## 폼 저장 — 변경 없음 감지 (`useDirtyCheck`)

저장(Save) 시 **원본 데이터와 변경 사항이 없으면 DB 쓰기를 건너뛰는** 패턴.

### 훅 위치
`renderer/src/lib/useDirtyCheck.ts` — `useDirtyCheck<T>()`

### 반환값

| 함수 | 설명 |
|---|---|
| `snapshot(value)` | 현재 값을 원본으로 기록. 행 선택·데이터 로드 완료 시 호출 |
| `isDirty(current)` | 원본과 다르면 `true`. 스냅샷이 없으면 항상 `true` (신규 등록) |
| `clear()` | 스냅샷 초기화. 신규 등록 진입·정렬 변경 시 호출 |

### 적용 위치 (화면별)

| 호출 위치 | 동작 |
|---|---|
| `applySelectionAfterLoad` | 데이터 있으면 `snapshot()`, 없으면 `clear()` |
| `onSelectRow` | `snapshot()` |
| `onSortChange` | `clear()` |
| `startNew` / `startNewUser` | `clear()` |
| `runSave` — 기존 레코드 분기 | `!isDirty(detail)` → "변경된 항목이 없습니다." 반환 |

### `runSave` 내 체크 위치

```typescript
// 신규가 아닌(existingXxx) 경우만 체크
if (existingXxx && !isDetailDirty(detail)) {
  flashSaveBanner('err', '변경된 항목이 없습니다.')
  return
}
```

> **Password 필드 주의**: `pwd`·`pwdChk`는 `useDirtyCheck` 밖에서 `pChanged`·`cChanged`로 별도 판단한다 (플레이스홀더 `'****'` 처리 필요). 아래 「Password / Pass 체크 검증 패턴」 참고.

### 적용 화면 목록

- `std_base_user_mgmt.tsx` — `detail: string[]` + password 별도 판단
- `std_base_common_code_mgmt.tsx` — `detail: CommonCodeDetail` 객체

---

## 폼 저장 — Password / Pass 체크 검증 패턴

사용자 등록·수정처럼 **Password + Pass 체크** 두 필드가 함께 있는 폼의 저장 시 검증 규칙.

### 초기값 플레이스홀더
- **기존 사용자 로드 시**: 두 필드 모두 `'****'` (실제 해시 미표시, 미변경 의사 표시)
- **신규 등록 모드 진입 시**: 두 필드 모두 빈 문자열 `''`

### 저장 시 검증 매트릭스

| Password (`p`) | Pass 체크 (`c`) | 결과 |
|---|---|---|
| 미입력·미변경 (`''` / `'****'`) | 미입력·미변경 (`''` / `'****'`) | 통과 — 비밀번호 변경 없음 |
| **신규** + 미입력 | — | 오류: "신규 저장 시 Password를 입력하세요." |
| 입력됨 | 미입력·미변경 | 오류: "Pass 체크를 입력하세요." + **Pass 체크 포커스** |
| 입력됨 | 입력됨, 불일치 | 오류: "Password와 Pass 체크가 일치하지 않습니다." + **Pass 체크 포커스** |
| 입력됨 | 입력됨, 일치 | 저장 진행 ✓ |
| 미변경 (`'****'`) | **입력됨** | 오류: "Pass 체크를 변경하려면 Password도 입력하세요." + **Pass 체크 포커스** |

### 구현 패턴 (`runSave` 내부)

```typescript
const pChanged = p !== '' && p !== '****'
const cChanged = c !== '' && c !== '****'

if (pChanged) {
  if (!cChanged) { /* "Pass 체크를 입력하세요." */ focusPwdChk(); return }
  if (p !== c)   { /* "일치하지 않습니다."     */ focusPwdChk(); return }
} else if (cChanged) {
  /* "Password도 입력하세요." */ focusPwdChk(); return
}
```

### 포커스 이동
- Pass 체크 실패 시 반드시 Pass 체크 입력 필드로 포커스를 이동한다.
- `PlainInput`은 `forwardRef`를 지원하지 않으므로, `useRef<HTMLDivElement>`로 래퍼 `<div>`를 참조하고 `wrapRef.current?.querySelector('input')?.focus()`를 사용한다.

```typescript
const pwdChkWrapRef = useRef<HTMLDivElement>(null)
const focusPwdChk = useCallback(() => {
  pwdChkWrapRef.current?.querySelector('input')?.focus()
}, [])

// JSX
<div ref={pwdChkWrapRef}>
  <FormLabelInput label="Pass 체크" ...>
    <PlainInput type="password" ... />
  </FormLabelInput>
</div>
```
