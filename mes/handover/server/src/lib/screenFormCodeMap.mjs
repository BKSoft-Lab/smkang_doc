/**
 * 웹 `screen_id`와 운영 `tb_mes_menu.form_code`(레거시 `frm*`) 정합.
 * @see docs/DATABASE.md — 기준정보 모듈 화면 ID ↔ 레거시 C#
 */
import { str } from './strings.mjs'

/** @type {Readonly<Record<string, string>>} */
export const LEGACY_FORM_CODE_BY_SCREEN_ID = Object.freeze({
  std_base_common_code_mgmt: 'frmCommonCode',
  std_base_user_mgmt: 'frmUser',
  std_base_user_permission_mgmt: 'frmUserAuthority',
  std_base_menu_permission_mgmt: 'frmMenuAuthMng',
  std_base_unit_process_mgmt: 'frmUnitProcessMng',
  std_base_unit_process_line_mgmt: 'frmUnitProcessLineMng',
  std_base_process_line_mgmt: 'frmProcessLineMng',
  std_base_process_line_config_mgmt: 'frmProcessLineConstMng',
  std_base_vendor_mgmt: 'frmCustomer',
  std_base_user_log_inq: 'frmMenuAccessLogs',
  std_cfg_router_mgmt: 'frmRouteManagement',
  std_cfg_prod_router_mgmt: 'frmProdRouteManagement',
  std_cfg_tact_time_mgmt: 'frmProdTactTimeManagement',
  std_cfg_packing_unit_mgmt: 'frmPackingUnitMng'
})

/**
 * `tb_mes_menu` 조회용 form_code 후보 — 웹 ID와 레거시 frm(있으면) 모두 시도.
 * @param {string} screenId
 * @returns {string[]}
 */
export function formCodeCandidates(screenId) {
  const id = str(screenId)
  if (!id) return []
  const legacy = LEGACY_FORM_CODE_BY_SCREEN_ID[id]
  const set = new Set([id])
  if (legacy) set.add(legacy)
  return [...set]
}
