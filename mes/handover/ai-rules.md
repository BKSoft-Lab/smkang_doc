# AI 규칙 (AI Assistant Rules)

**최우선·단일 상세**: **`project-rules.md`** — 최근 UI·Electron·MDI·Tile·Window 메뉴 등 **갱신 규칙은 항상 여기(특히 §6.0·§6.0.1·§6.0.2·레거시 정합 §6.0.3)를 본다.**  
본 파일은 **Codex·Claude 등 Cursor 외 AI**용 **위임·참조**이며, `project-rules`·**`.cursorrules`** 와 **같은 내용을 길게 반복하지 않는다.**

| 주제 | 위치 |
|------|------|
| AI 기본 원칙·브리핑(CONTEXT / CHANGELOG / TODO) | `project-rules.md` **§0·§1** |
| `USER_PROMPTS_LOG` 선행·후행 | `project-rules.md` **§2** · **`.cursor/rules/user-prompts-log-workflow.mdc`**(alwaysApply) |
| 문서 자동 갱신·매핑·작업 종료 프로토콜 | `project-rules.md` **§3·§8** |
| 매뉴얼·화면 ID·PNG·Chrome·타이틀·MDI·Electron Window·Tile/Cascade·**`std_*`(기준정보) vs `Mes*`(전역 UI)** | `project-rules.md` **§6.0·§6.0.1** |
| **`docs/legacy_mes`** WinForms와 UI·DB 의도·저장/삭제/조회·`MessageBox` 문구 정합 | `project-rules.md` **§6.0.3** · **`docs/legacy_mes/README.md`** · **`docs/DATABASE.md`** (화면 ID ↔ `frm`) |
| UI 레이아웃(폼·조회줄·그리드) | `docs/LAYOUT_RULES.md` + `project-rules.md` **§6.1** — **`MesSearchSaveBar`·`filterLeading`**: `LAYOUT_RULES` 「조회 Search/Save 표준 스트립」(`leading` **`flex-1`**·**`pr-[10px]`**·배너 `break-words`) |
| 화면 DB/API 문서 `docs/db-doc/*_api.md` (트리거 **페이지 DB분석**, MD 수정 시 HTML·smkang_doc) | `.cursor/rules/page-db-analysis-workflow.mdc`(정본) · `project-rules.md` **§3** · `.cursorrules`(Cursor 요약) |
| **`tb_cm_user`·사용자 관리 BE 스키마 정합** (`user_pwd` 길이·upsert·날짜 컬럼) | `project-rules.md` **§4.1** · `docs/DATABASE.md` · `docs/db-doc/std_base_user_mgmt_api.md` |
| **STD BE — `manual.csv` `std_*` ↔ `server/src/routes/byScreen/std_<screenId>.mjs` 1:1** (동일 path 중복 마운트 금지) | `project-rules.md` **§4.2** · **`.cursor/rules/std-be-byscreen.mdc`**(alwaysApply) · `server/src/routes/byScreen/README.md` |
| **웹 `screen_id` ↔ DB `tb_mes_menu.form_code`(레거시 `frm*`)** — `POST /api/menu-access`·`screenFormCodeMap.mjs` | `project-rules.md` **§4.2** 표 **`screen_id` ↔ `form_code`** · `docs/DATABASE.md` |

## 1. 코드 작업 시 (요약)

- 기존 스타일 유지·변경 최소·기능 보존.
- **프론트·모듈·그리드·내부창·MDI·Tile** 작업 전: **`project-rules.md` §6.0·§6.0.1·§6.0.2** 필수 확인. **레거시와 동작·메시지를 맞출 때** §6.0.3·`docs/legacy_mes/README.md` 확인.

## 2. `project-rules.md`에 없는 보조

- **외부 도구로 수정된 코드** 발견 시 문서·CHANGELOG 정합.
- **문서 vs 코드 불일치**: `project-rules.md` **§0** — 문서 우선, 또는 코드 반영 후 문서 갱신.
- **경미한 변경**(오타·주석·import·기능 없는 리팩터 등)은 필요 시에만 CHANGELOG.

## 3. 도구·코드 인용

- 도구 사용·효율: `project-rules.md` **§0**(토큰 효율)·**§1**(효율성 원칙·전체 검색)과 동일.
- **코드 인용 형식**(`startLine:endLine:path`): Cursor에서는 **`.cursorrules`** §1 과 동일.

## 4. Cursor IDE

- **`.cursorrules`** + **`project-rules.md`** 를 함께 따른다(본 파일은 보조).
