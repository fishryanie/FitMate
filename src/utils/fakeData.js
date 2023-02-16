/** @format */

import { commonRoot } from '@routes/Ref';
import router from '@routes/router';

export const LIST_PROFILE = [
  {
    icon: 'solution1',
    title: 'Thông tin cá nhân',
    action: () => commonRoot.navigate(router.ACCOUNT_INTRO_SCREEN),
  },
  {
    icon: 'isv',
    title: 'Quản lý kho hàng',
    action: () => commonRoot.navigate(router.PRODUCT_MANAGEMENT_SCREEN),
  },
  {
    icon: 'printer',
    title: 'Lịch sử đơn hàng',
    action: () => commonRoot.navigate(router.ORDER_HISTORY_SCREEN),
  },
  {
    icon: 'barchart',
    title: 'Số liệu thống kê',
    action: () => commonRoot.navigate(router.REVENUE_STATISTICS_SCREEN),
  },
  {
    icon: 'pushpino',
    title: 'Địa điểm đã lưu',
    action: () => commonRoot.navigate(router.SAVE_LOCATION_SCREEN),
  },
  {
    icon: 'gift',
    title: 'Khuyến mãi của thôi',
    action: () => commonRoot.navigate(router.PROMOTION_SCREEN),
  },
  {
    icon: 'Safety',
    title: 'Điều khoản & bảo mật',
    action: () => commonRoot.navigate(router.TERMS_POLICY_SCREEN),
  },
  {
    icon: 'key',
    title: 'Thay đổi mật khẩu',
    action: () => commonRoot.navigate(router.CHANGE_PASSWORD_SCREEN),
  },
  {
    icon: 'sharealt',
    title: 'Giới thiệu bạn bè',
    action: () => commonRoot.navigate(router.REFER_FRIEND_SCREEN),
  },
  {
    icon: 'customerservice',
    title: 'Hỗ trợ hệ thống',
    action: () => commonRoot.navigate(router.SUPPORT_SCREEN),
  },
  {
    icon: 'setting',
    title: 'Cài đặt ứng dụng',
    action: () => commonRoot.navigate(router.SETTING_SCREEN),
  },
];
