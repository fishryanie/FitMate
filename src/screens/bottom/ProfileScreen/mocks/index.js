import {ICONS} from '@assets';
import {bottomRoot, commonRoot} from '@routes/Ref';
import {Alert} from 'react-native';
import router from '@routes/router';

export const listProfile = [
  {
    title: 'Đơn hàng',
    icon: ICONS.ic_profile_order,
    onPress: () => bottomRoot.navigate(router.HISTORY_SCREEN),
  },
  {
    title: 'Mật khẩu ví',
    icon: ICONS.ic_profle_wallet_pwd,
    onPress: () => Alert.alert('Chức năng đang được cập nhật'),
  },
  {
    title: 'Cửa hàng của bạn',
    icon: ICONS.ic_profile_shop,
    onPress: () => bottomRoot.navigate(router.SHOP_BOTTOM_CONTAINER),
  },
  {
    title: 'Khuyến mãi của tôi',
    icon: ICONS.ic_profile_promo,
    onPress: () => bottomRoot.navigate(router.PROMOTIONS_SCREEN),
  },
  {
    title: 'Địa điểm đã lưu',
    icon: ICONS.ic_profile_saved_locations,
    onPress: () => commonRoot.navigate(router.SAVED_PLACES_SCREEN),
  },
  {
    title: 'Giới thiệu bạn bè',
    icon: ICONS.ic_profile_ref,
    onPress: params => commonRoot.navigate(router.QR_CODE, params),
    isRef: true,
  },
  {
    title: 'Chính sách bảo mật',
    icon: ICONS.ic_profile_security,
    onPress: () => commonRoot.navigate(router.TERM_OF_SERVICE_SCREEN),
  },
  {
    title: 'Điều khoản dịch vụ',
    icon: ICONS.ic_profile_service,
    onPress: () => commonRoot.navigate(router.TERM_OF_USE_SCREEN),
  },
  {
    title: 'Hệ thống giới thiệu',
    icon: ICONS.ic_commission,
    onPress: () => commonRoot.navigate(router.COMMISSION_LIST),
  },
  {
    title: 'Phương thức thanh toán',
    icon: ICONS.ic_profile_payment,
    onPress: () => commonRoot.navigate(router.PAYMENT_METHOD_SCREEN),
  },
  {
    title: 'Đổi mật khẩu',
    icon: ICONS.ic_lock,
    onPress: () => commonRoot.navigate(router.CHANGE_PASSWORD),
  },
  {
    title: 'Hỗ trợ',
    icon: ICONS.ic_profile_support,
    onPress: () => commonRoot.navigate(router.SUPPORT_SCREEN),
  },
  {
    title: 'Cài đặt',
    icon: ICONS.ic_profile_setting,
    onPress: () => commonRoot.navigate(router.SETTING_SCREEN),
  },
  {
    title: 'Đăng xuất',
    icon: ICONS.ic_logout,
  },
];
