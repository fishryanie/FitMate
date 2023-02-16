/** @format */

import PlanScreen from './PlanScreen';
import CategoryScreen from './CategoryScreen';
import ProfileScreen from './ProfileScreen';
import router from '@routes/router';
import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';

export const bottom = {
  [router.HOME_SCREEN]: HomeScreen,
  [router.SHOP_SCREEN]: CategoryScreen,
  [router.SCAN_SCREEN]: ScanScreen,
  [router.PLAN_SCREEN]: PlanScreen,
  [router.PROFILE_SCREEN]: ProfileScreen,
};
