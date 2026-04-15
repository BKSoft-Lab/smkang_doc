# legacy_mes — MES 레거시(WinForms) C# 참조

이 디렉터리는 **구 MES 클라이언트 소스**를 모듈별로 보관한다.

| 폴더 | 내용 |
|------|------|
| **`Basis/`** | 기준정보 모듈 — `2S_MES_Basis` 프로젝트·`_2S_MES_Basis` 폼 등 |

다른 모듈의 C# 소스는 **`Basis`와 동일한 레벨**에 새 폴더를 두면 된다 (예: `docs/legacy_mes/<모듈명>/`).

## 화면 작업 시 사용 방법 (신규·개편)

1. **화면 ID(`screenId`) 확정** — `renderer/src/data/manual.csv` / `docs/매뉴얼.csv` 와 일치하는지 확인한다.  
2. **레거시 폼 이름 찾기** — 기준정보 `std_*` 화면은 **[`docs/DATABASE.md`](../DATABASE.md)** 표 **「기준정보 모듈 화면 ID ↔ 레거시 C#」** 및 **`Basis/_2S_MES_Basis/frmMDIMain.cs`** 의 `OpenChildWindow` 매핑을 따른다.  
3. **소스 읽기** — 매핑된 **`Basis/_2S_MES_Basis/frm*.cs`** 를 연다. 필요 시 같은 이름의 **`frm*.resx`** 로 캡션·리소스를 보조한다.  
4. **규칙** — UI·그리드·툴바·저장/삭제/조회·`MessageBox` 문구를 웹 구현에 반영할 때는 **[`project-rules.md`](../../project-rules.md) §6.0.3** (레거시 정합)을 따른다. PNG·`LAYOUT_RULES`·PostgreSQL BE 규칙과의 우선순위는 §6.0.3에 정의되어 있다.  
5. **매핑이 없을 때** — 저장소에 대응 `frm` 이 없으면 레거시 동작 정합을 **강제하지 않으며**, `docs/db-doc` 또는 코드 주석에 **레거시 N/A** 를 남길 수 있다.
