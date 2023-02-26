/** @format */

import { icons } from '@assets';
import { commonRoot } from '@routes/Ref';
import router from '@routes/router';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import actions from 'store/actions';
import { COLORS } from '@theme';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import { useDispatch } from 'react-redux';

export default function useFCMMessage(isLog) {
  const dispatch = useDispatch();
  const [fMessage, setFMessage] = useState(null);

  useEffect(() => {
    const onMessageListener = messaging().onMessage(message => {
      if (__DEV__ && isLog) {
        console.log(
          '%c FIREBASE_MESSAGE_FORE_GROUND: ',
          'color: yellow; font-weight: bold',
          message,
        );
      }
      setFMessage(message);
      if (message.data?.type === 'message') {
        return;
      }
      if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: message?.messageId,
          body: message?.notification?.body,
          title: message?.notification?.title,
          sound: 'default',
        });
      } else {
        PushNotification.localNotification({
          channelId: 'transaction_notification',
          title: message?.notification?.title,
          message: message?.notification?.body,
          showWhen: true,
          autoCancel: true,
          vibrate: true,
          playSound: true,
          soundName: 'default',
          smallIcon: icons.ic_load,
          largeIcon: 'icon_app_round',
          color: COLORS.red6,
          when: moment().valueOf(),
        });
      }
    });
    return onMessageListener;
  }, []);

  useEffect(() => {
    const onNotificationOpenedAppListener = messaging().onNotificationOpenedApp(
      message => {
        setFMessage(message);
        if (__DEV__ && isLog) {
          console.log(
            '%c FIREBASE_MESSAGE_NOTIFICATION_OPEN_APP: ',
            'color: yellow; font-weight: bold',
            message,
          );
        }
        if (Platform.OS === 'ios' && message?.data?.url) {
          if (message?.data?.url !== 'ROOM_CHAT_SCREEN') {
            commonRoot.navigate(message?.data?.url, {
              id: message?.data?.item_id,
            });
          } else {
            dispatch({
              type: actions.GET_INFO_STORE,
              params: { department_id: message?.data?.department_id },
              onSuccess: res => {
                commonRoot.navigate(message?.data?.url, {
                  id: message?.data?.item_id,
                  department: res,
                });
              },
            });
          }
        } else {
          commonRoot.navigate(message?.data?.url, {
            id: message?.data?.item_id,
          });
        }
      },
    );
    return onNotificationOpenedAppListener;
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(message => {
        if (message) {
          setFMessage(message);
          if (__DEV__ && isLog) {
            console.log(
              '%c FIREBASE_MESSAGE_NOTIFICATION_OPEN_FROM_QUIT_STATE: ',
              'color: yellow; font-weight: bold',
              message,
            );
          }
        }
      });
  }, []);

  return fMessage;
}
