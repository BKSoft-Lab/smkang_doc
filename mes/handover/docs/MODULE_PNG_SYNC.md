# 모듈별 PNG 재정합 (`docs/image/*.png`)

`project-rules.md` §6.0·**`docs/LAYOUT_RULES.md`** 에 따라, 각 화면은 **`docs/image/<화면ID>.png`** 와 정합한다.

## 공통 패턴 (조회·그리드)

- **`filterArea`**: `flex flex-wrap items-center justify-end gap-x-3 gap-y-2` (우측 정렬).
- **콤보·단일행 입력**: **`h-7` + `w-[150px]`** (`fieldPngCls` 등) — PNG·`LAYOUT_RULES.md` 「컨트롤 가로 폭」.
- **기간**: `type="date"` 두 개 + **`~`** (`datePairCls` 등).
- **`SimpleGridTable`**: 열 문구·순서는 **PNG 헤더**와 일치, **`colWidths`**(`equalPercentageColWidths` 또는 PNG 비율 명시), **`Item 명`·`규격`·`설명` 등은 `text-left`**.
- **라디오 `name`**: 화면별 고유 접두사(예: `frmXXX_…`)로 충돌 방지.

## 수입검사 (6) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmTempIncomingManual` | ✅ | 상단 그리드 `#`~`상태`·**발행수량**·`justify-end`·상세 **입고창고**·기능명에서 `(수작업)` 제거 |
| `frmTempIncomingList` | ✅ | **발행수량**(구 발정수량)·20열·필터 순서 PNG에 맞게 정리 |
| `frmlQCInspectResultIncomingLump` | ✅ | 체크 **`v`**·**포장단위수량**·**판정수량**·판정줄 비고 입력 |
| `frmIQCInspectResultIncoming` | ✅ | **검사의뢰별**·**선입선출값**·필터·메인 그리드 `colWidths` |
| `frmIQCStandardFileUpdate` | ✅ | **대표Item별** 라디오 문구·PNG 목업 3행·`bg-sky-50/35` |
| `frmIQCStandardFileList` | ✅ | 조회기준·동일 그리드 목업 |

## 나머지 모듈 (순서대로 적용 권장)

아래는 `manual.csv` 순서. 각 행은 **`docs/image/<화면ID>.png` 존재 여부**를 Read/터미널로 확인(§6.0, glob 금지 정책 준수) 후 동일 패턴으로 정합한다.

### 자재추적관리 (11) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmIncomingConfirm` | ✅ | 조회 2행·**`v`**·**TID** 기본·ERP/규격 분리 |
| `frmIncomingList` | ✅ | 2행·**샘플구분**·**라벨발행**·검색값 입력·**TID** 기본 |
| `frmIncomingListByDate` | ✅ | 2행 순서·**샘플구분**·16열 |
| `frmSystemLabel` | ✅ | **선택**·**`v`**·**Sequece**·스캐너 `select`·검색 텍스트·설정 **등록자**·출력수량/포장단위 **amber** |
| `frmSystemLabelPrintHis` | ✅ | 2행·**TID** 기본·15열 |
| `frmIncomingCancel` | ✅ | 브레드크럼 **PNG** 「자재라벨별」(`manual.csv`는 LOT별)·**TID**·19열 순서 |
| `frmPartIssuanceHis` | ✅ | 제목 **자재출고 내역 조회**·2행(출고일 분할)·**TID**·17열 |
| `frmlssuanceListByDate` | ✅ | 2행·**부품분류** 중복 헤더·12열 |
| `frmlssuanceSumByPeriod` | ✅ | 2행(2행 첫 칸 PNG 여백)·**Maker명**·**ERP 코드** 중복 열 |
| `frmStockPartsReturn` | ✅ | 반품사유 **amber**·상/하 그리드·하단 **`v`**·**TID** |
| `frmNonlssuance` | ✅ | 금지 사유 노란 바·**`v`**·**창고**·하단 **발정자ID/명**(PNG 표기) |

공통: `renderer/src/pages/material-trace/traceUi.ts` (`traceFieldPngCls`·`traceDatePairCls`·`traceFilterRowBreakCls`·라디오 `frm…_` 접두사).

### 자재재고관리 (10) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmNewStockPartsMain` | ✅ | **`No`**·전월/입출고·실사 4열·**`stockUi`**·`cellValues` 샘플 행 |
| `frmNewStockPartsWH` | ✅ | 2행 조회·**`No`**·전월 단일열·차이 **수량·로스율** |
| `frmNewStockPartsSMT` | ✅ | 필터 순서(고객사·년월·부품·…)·**원자재/반제품** 분리·**차이 율(%)** |
| `frmCurrentAllStockParts` | ✅ | **샘플구분**·2행·9열 |
| `frmStockParts` | ✅ | **샘플구분**·**`+/-/=`** 헤더·2행·15열 |
| `frmCurrentStockParts` | ✅ | **샘플구분**·**`= 현재재고`**·적재위치·16열 |
| `frmStockRevision` | ✅ | 브레드크럼 **PNG** 「재고실사 수정 및 확정」·**`v`**·실사일 **~**·**확정** |
| `frmStockModify` | ✅ | 「창고 재고 수량 조정」·**`v`**·**입고순번**·2행 |
| `frmStockModifyHist` | ✅ | 「창고 재고 수량 조절 이력」·2행·**계정** 열 |
| `frmStockLOTModify` | ✅ | 단일 그리드·안내 바·**TID** 기본·**수량 조정 사유** |

공통: `renderer/src/pages/material-stock/stockUi.ts`.

### 생산관리 (6) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmProdPlan` | ✅ | 공정 **SMT**(`disabled`)·**VISION**·**`SMT 01/02`** 열 평탄화·**`No`** |
| `frmNoworkManagement` | ✅ | **`prodUi`**·무작업 **주석** 열 넓게 `text-left` |
| `frmShiftDailyWorkData` | ✅ | **차트 영역**·Series 1/2 범례·하단 4열 그리드·공정/라인 기본값 |
| `frmProdResultData` | ✅ | **조회결과1~5** 탭·선행 빈 열·**달성율** |
| `frmProdPlanDataHis` | ✅ | **검색조건** 콤보+입력·**`No`**·**단위수량**·**일자** 열 amber |
| `frmMountItemScanHis` | ✅ | 제목 **마운트자재 스캔 이력조회**·2행·날짜**~**·**시간** 라디오·19열 |

공통: `renderer/src/pages/production/prodUi.ts`.

### 공정관리 (11) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmChamberIOMaster` | ✅ | TID 안내·필터 재배치·**`processUi`**·입출고 시계열 열 |
| `frmChamberIOHistory` | ✅ | 필터 순서·**입출고 시점 MSL 잔여시간**·현재 MSL 잔여시간 |
| `frmStencilMaster` | ✅ | **메탈 마스크 LIST**·**텐션알람**·MIN/MAX·우측 **정보**·`frmStencilMaster_searchKey` |
| `frmStencilManagement` | ✅ | **선택작지품번**·작업명·세척후 **찍힘** 선행·라인 기본 |
| `frmStencilHistory` | ✅ | 요약 12·차트·텐션 범례·**때워**·필터 축소 |
| `frmSolderDetail` | ✅ | 열 단위·**SOLDER 정보** 패널·`frmSolderDetail_searchKey` |
| `frmSolderManagement` | ✅ | **SOLDER 목록** 제목·다단 헤더 평탄 열 명 |
| `frmSolderHistory` | ✅ | 다단 헤더 평탄·**교반보조시간**·`processUi` |
| `frmMasterSampleMaster` | ✅ | **마스터샘플 등록**·시간설정·적색 안내·비고 `colWidths` |
| `frmProcessStockModify` | ✅ | **현장 재고 수량 조정**·2행 조회·선택 **`v`** |
| `frmProcessStockModifyHist` | ✅ | **현장 재고 수량 조절 이력**·상·하 그리드 |

공통: `renderer/src/pages/process/processUi.ts`.

### 품질관리 (7) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmStockPartsVndLOT` | ✅ | 브레드크럼 **「자재 LOT 추적 (라벨별)」**(`manual.csv`는 입고별)·필터 순서·**`qualityUi`** |
| `frmSubPartInputHis` | ✅ | **「부자재 투입이력」**·**작업명**·검색 라디오 **`frmSubPartInputHis_modelKey`** |
| `frmStockPartsLOTHist` | ✅ | 3단 헤더·**수입검사** 행·데이터 **amber**·헤더2행 연한 amber |
| `frmProdHistoryQR` | ✅ | **프로세스/라인/생산일자/검색**·그리드 **A~I**(캡처 템플릿) |
| `frmLotHistory` | ✅ | **「LOT별 전체 이력 조회」**·좌 **40%**·우 이력 |
| `frmShipPackingHistory` | ✅ | **모델·세부** 2콤보·**포장 내역** `No`+**BARCODE**·비율 **7:3** |
| `frmRepairRegResult` | ✅ | **「수리 내역 등록」**·필터 **검색구분**·**BARCODE** 바·**저 장**·원인공정 **..** |

공통: `renderer/src/pages/quality/qualityUi.ts`.

### 출하검사 (9)

`frmOQCInspectFactor`, `frmShipmentTargetList`, `frmOQCInspectApply_Class`, `frmOQCInspectApply_Model`, `frmOQCStandardFileUpdate`, `frmOQCInspectResultShippingLump`, `frmOQCInspectResultShipping`, `frmOQCInspectResultShippingList`, `frmOQCInspectStatusSum`

### 출하 (4) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmStockGoodsList` | ✅ | 창 제목 **`출하가능 재고 조회`**·**`shipUi`**·11열·**비고** 넓은 `colWidths`·품명/규격/비고 **`text-left`** |
| `frmPlanningAssyStock` | ✅ | **`생산계획 대비 재고 조회`**·재고만 보기·의뢰일 **`2018-06-29`~**·**`shipUi`**·11열 |
| `frmShipmentByDate` | ✅ | **`일별 출하현황`**·라디오 **`frmShipmentByDate_modelScope`**·조회년월·2단 헤더·주말 **`sky`** |
| `frmShipmentReport03` | ✅ | 조회 **2행**(출하일·집계·품번·품명 / 납품처·규격)·세부내역 집계 기본 체크·11열 |

공통: `renderer/src/pages/shipment/shipUi.ts`.

### 리포트 (8) — 반영 완료 (2026-03)

| 화면 ID | PNG | 비고 |
|---------|-----|------|
| `frmIQCDailyInspectResult` | ✅ | 필터 순서 PNG·요약 **`불량률`**·바이올렛·**`reportUi`** |
| `frmModelProdPlanAndResult` | ✅ | 하단 **`작업면`** 열·차트 범례·**`reportUi`** |
| `frmDailyProdPlanAndResult` | ✅ | 동일 필터·차트·**`reportUi`** |
| `frmProcessDefectList` | ✅ | **`검수형태`·`탱크`**·19열·`colWidths` |
| `frmShipmentReport01` | ✅ | 조회 **2행**(년월·품번·품명 / 납품처·규격) |
| `frmShipmentReport02` | ✅ | **`reportUi`**·월 강조 열 |
| `frmOQCDailyDefectResult` | ✅ | 제목 **출하검사 유형별 불량내역**·2행 조회 |
| `frmOQCDailyInspectResult` | ✅ | 필터 순서·요약 **sky**·탭 **일별 불량율** |

공통: `renderer/src/pages/report/reportUi.ts` · `reportGridUtils.ts` · `reportShared.tsx`.

---

**참고**: **수입검사 6**·**자재추적관리 11**·**자재재고관리 10**·**생산관리 6**·**공정관리 11**·**품질관리 7**·**출하 4**·**리포트 8** 화면은 PNG 기준 코드 반영·`npm run lint` 점검을 따른다. 위 나머지 모듈은 동일 절차로 순차 적용하면 된다.
