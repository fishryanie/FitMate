/** @format */

import router from 'routes/router';
import CartScreen from './CartScreen';
import ProductDetailScreen from './ProductDetailScreen';
import ScanScreen from './ScanScreen';
// import StoreCheckInHistoryScreen from "./StoreCheckInHistoryScreen";

export const common = {
  [router.SCAN_SCREEN]: ScanScreen,
  [router.CART_SCREEN]: CartScreen,
  [router.PRODUCT_DETAIL_SCREEN]: ProductDetailScreen,
  // [router.STORE_CHECKIN_HISTORY_SCREEN]: StoreCheckInHistoryScreen
};
