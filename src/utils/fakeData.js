/** @format */

import { drawerRoot } from '@routes/Ref';
import router from '@routes/router';

export const LIST_PROFILE = [
  {
    icon: 'solution1',
    title: 'Thông tin cá nhân',
    action: () => drawerRoot.navigate(router.ACCOUNT_INTRO_SCREEN),
  },
  {
    icon: 'isv',
    title: 'Quản lý kho hàng',
    action: () => drawerRoot.navigate(router.PRODUCT_MANAGEMENT_SCREEN),
  },
  {
    icon: 'printer',
    title: 'Lịch sử đơn hàng',
    action: () => drawerRoot.navigate(router.ORDER_HISTORY_SCREEN),
  },
  {
    icon: 'barchart',
    title: 'Số liệu thống kê',
    action: () => drawerRoot.navigate(router.REVENUE_STATISTICS_SCREEN),
  },
  {
    icon: 'pushpino',
    title: 'Địa điểm đã lưu',
    action: () => drawerRoot.navigate(router.SAVE_LOCATION_SCREEN),
  },
  {
    icon: 'gift',
    title: 'Khuyến mãi của thôi',
    action: () => drawerRoot.navigate(router.PROMOTION_SCREEN),
  },
  {
    icon: 'Safety',
    title: 'Điều khoản & bảo mật',
    action: () => drawerRoot.navigate(router.TERMS_POLICY_SCREEN),
  },
  {
    icon: 'key',
    title: 'Thay đổi mật khẩu',
    action: () => drawerRoot.navigate(router.CHANGE_PASSWORD_SCREEN),
  },
  {
    icon: 'sharealt',
    title: 'Giới thiệu bạn bè',
    action: () => drawerRoot.navigate(router.REFER_FRIEND_SCREEN),
  },
  {
    icon: 'customerservice',
    title: 'Hỗ trợ hệ thống',
    action: () => drawerRoot.navigate(router.SUPPORT_SCREEN),
  },
  {
    icon: 'setting',
    title: 'Cài đặt ứng dụng',
    action: () => drawerRoot.navigate(router.SETTING_SCREEN),
  },
];
