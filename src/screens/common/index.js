/** @format */

import router from 'routes/router';
import CartScreen from './CartScreen';
import LocationSelectScreen from './LocationSelectScreen';
import MapSelectScreen from './MapSelectScreen';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import ProductDetailScreen from './ProductDetailScreen';
import ScanScreen from './ScanScreen';
// import StoreCheckInHistoryScreen from "./StoreCheckInHistoryScreen";

export const common = {
  [router.SCAN_SCREEN]: ScanScreen,
  [router.CART_SCREEN]: CartScreen,
  [router.MAP_SELECT_SCREEN]: MapSelectScreen,
  [router.LOCATION_SELECT_SCREEN]: LocationSelectScreen,
  [router.PRODUCT_DETAIL_SCREEN]: ProductDetailScreen,
  [router.PAYMENT_METHODS_SCREEN]: PaymentMethodsScreen,

  // [router.STORE_CHECKIN_HISTORY_SCREEN]: StoreCheckInHistoryScreen
};
