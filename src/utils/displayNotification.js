/** @format */

import notifee, { AndroidImportance } from '@notifee/react-native';

export const ANDROID_NOTIFICATION_CHANNEL = {
  default: {
    id: 'default',
    name: 'Thông báo chung',
    sound: 'default',
  },
  booking: {
    id: 'booking',
    bypassDnd: true,
    importance: AndroidImportance.HIGH,
    name: 'Thông báo chuyến xe',
    sound: 'booking',
  },
  cancel_booking: {
    id: 'cancel_booking',
    bypassDnd: true,
    importance: AndroidImportance.HIGH,
    name: 'Thông báo hủy chuyến',
    sound: 'cancel_booking',
  },
  call: {
    id: 'call',
    bypassDnd: true,
    importance: AndroidImportance.HIGH,
    name: 'Thông báo cuộc gọi',
    sound: 'call',
  },
};

export default async function displayNotification(message) {
  switch (message.data.type) {
    default:
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        data: message.data,
        android: {
          channelId: ANDROID_NOTIFICATION_CHANNEL.default.id,
          sound: ANDROID_NOTIFICATION_CHANNEL.default.sound,
        },
        ios: {
          sound: ANDROID_NOTIFICATION_CHANNEL.default.sound,
        },
      });
      break;
  }
}
