/** @format */

import router from '@routes/router';
import SettingScreen from './SettingScreen';
import ProductManagementScreen from './ProductManagementScreen';
import ShopFormProductScreen from './ProductManagementScreen/ShopFormProductScreen';
import AccountInfoScreen from './AccountInfoScreen';
import LocationSavedScreen from './LocationSavedScreen';
import LocationFormScreen from './LocationFormScreen';

export const drawer = {
  [router.SETTING_SCREEN]: SettingScreen,
  [router.SUPPORT_SCREEN]: ProductManagementScreen,
  [router.PROMOTION_SCREEN]: ProductManagementScreen,
  [router.TERMS_POLICY_SCREEN]: ProductManagementScreen,
  [router.REFER_FRIEND_SCREEN]: ProductManagementScreen,
  [router.LOCATION_FORM_SCREEN]: LocationFormScreen,
  [router.LOCATION_SAVED_SCREEN]: LocationSavedScreen,

  [router.ORDER_HISTORY_SCREEN]: ProductManagementScreen,
  [router.ACCOUNT_INTRO_SCREEN]: AccountInfoScreen,
  [router.CHANGE_PASSWORD_SCREEN]: ProductManagementScreen,
  [router.REVENUE_STATISTICS_SCREEN]: ProductManagementScreen,
  [router.PRODUCT_MANAGEMENT_SCREEN]: ProductManagementScreen,
};
