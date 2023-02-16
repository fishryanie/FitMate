/** @format */

import router from '@routes/router';
import SettingScreen from './SettingScreen';
import ProductManagementScreen from './ProductManagementScreen';
import ShopFormProductScreen from './ProductManagementScreen/ShopFormProductScreen';

export const drawer = {
  [router.SETTING_SCREEN]: SettingScreen,
  [router.SUPPORT_SCREEN]: ProductManagementScreen,
  [router.PROMOTION_SCREEN]: ProductManagementScreen,
  [router.TERMS_POLICY_SCREEN]: ProductManagementScreen,
  [router.REFER_FRIEND_SCREEN]: ProductManagementScreen,
  [router.SAVE_LOCATION_SCREEN]: ProductManagementScreen,
  [router.ORDER_HISTORY_SCREEN]: ProductManagementScreen,
  [router.ACCOUNT_INTRO_SCREEN]: ProductManagementScreen,
  [router.CHANGE_PASSWORD_SCREEN]: ProductManagementScreen,
  [router.REVENUE_STATISTICS_SCREEN]: ProductManagementScreen,
  [router.PRODUCT_MANAGEMENT_SCREEN]: ProductManagementScreen,
};
