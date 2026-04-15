import type { ComponentType } from 'react'
import StdBaseCommonCodeMgmt from './std_base_common_code_mgmt'
import StdBaseMenuPermissionMgmt from './std_base_menu_permission_mgmt'
import StdBaseProcessLineConfigMgmt from './std_base_process_line_config_mgmt'
import StdBaseProcessLineMgmt from './std_base_process_line_mgmt'
import StdBaseUnitProcessLineMgmt from './std_base_unit_process_line_mgmt'
import StdBaseUnitProcessMgmt from './std_base_unit_process_mgmt'
import StdBaseUserLogInq from './std_base_user_log_inq'
import StdBaseUserMgmt from './std_base_user_mgmt'
import StdBaseUserPermissionMgmt from './std_base_user_permission_mgmt'
import StdBaseVendorMgmt from './std_base_vendor_mgmt'
import StdCfgPackingUnitMgmt from './std_cfg_packing_unit_mgmt'
import StdCfgProdRouterMgmt from './std_cfg_prod_router_mgmt'
import StdCfgRouterMgmt from './std_cfg_router_mgmt'
import StdCfgTactTimeMgmt from './std_cfg_tact_time_mgmt'

/** 기준정보 모듈 — `manual.csv` 화면 ID → PNG 기준 구현 화면 */
export const STD_FEATURE_SCREEN_REGISTRY: Record<string, ComponentType> = {
  std_base_common_code_mgmt: StdBaseCommonCodeMgmt,
  std_base_user_mgmt: StdBaseUserMgmt,
  std_base_user_permission_mgmt: StdBaseUserPermissionMgmt,
  std_base_menu_permission_mgmt: StdBaseMenuPermissionMgmt,
  std_base_unit_process_mgmt: StdBaseUnitProcessMgmt,
  std_base_unit_process_line_mgmt: StdBaseUnitProcessLineMgmt,
  std_base_process_line_mgmt: StdBaseProcessLineMgmt,
  std_base_process_line_config_mgmt: StdBaseProcessLineConfigMgmt,
  std_base_vendor_mgmt: StdBaseVendorMgmt,
  std_base_user_log_inq: StdBaseUserLogInq,
  std_cfg_router_mgmt: StdCfgRouterMgmt,
  std_cfg_prod_router_mgmt: StdCfgProdRouterMgmt,
  std_cfg_tact_time_mgmt: StdCfgTactTimeMgmt,
  std_cfg_packing_unit_mgmt: StdCfgPackingUnitMgmt
}
