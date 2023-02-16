/** @format */

import { useFCMMessage } from '@hooks';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@redux/actions';
import moment from 'moment';
import PushNotification, { Importance } from 'react-native-push-notification';
import { COLORS } from '@theme';
import { ICONS } from '@assets';
import { ORDER_TYPE } from '@constants';

export default function useNotificationMessage() {
  const dispatch = useDispatch();
  const message = useFCMMessage();
  const userToken = useSelector(state => state.user.userToken);

  PushNotification.createChannel({
    channelId: 'transaction_notification',
    channelName: 'Giao dịch',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  });

  useEffect(() => {
    if (userToken && message && !message.from.startsWith('/topics/')) {
      console.log('message=====', message);
      PushNotification.localNotification({
        channelId: 'transaction_notification',
        title: message?.notification?.title,
        message: message?.notification?.body,
        showWhen: true,
        autoCancel: true,
        vibrate: true,
        playSound: true,
        soundName: 'default',
        smallIcon: ICONS.ic_load,
        largeIcon: 'icon_app_round',
        color: COLORS.red6,
        when: moment().valueOf(),
      });
      dispatch({
        type: actions.GET_ALL_NOTIFICATION,
      });
      dispatch({ type: actions.GET_ORDER_STATUS });
    }
  }, [message?.messageId]);
}
