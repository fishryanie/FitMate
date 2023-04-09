/** @format */

import { USER_ROLE } from '@constants';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import actions from '@store/actions';
import displayNotification, { ANDROID_NOTIFICATION_CHANNEL } from '@utils/displayNotification';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNotificationListener() {
  const accessToken = useSelector(state => state.user.accessToken);
  const userRole = useSelector(state => state.user.userRole);
  const dispatch = useDispatch();
  const getDataMessage = fMessage => {};
  const onMessagePress = message => {};

  useEffect(() => {
    // Create a channel (required for Android)
    notifee.createChannels(Object.values(ANDROID_NOTIFICATION_CHANNEL));

    // Request permissions (required for iOS)
    notifee.requestPermission({ criticalAlert: true });

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          onMessagePress({
            notification: detail.notification,
            data: detail.notification?.data,
          });
          break;
      }
    });

    messaging().onNotificationOpenedApp(onMessagePress);
    messaging()
      .getInitialNotification()
      .then(message => {
        if (message) {
          onMessagePress(message);
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      messaging().subscribeToTopic('all-customer');
      if (userRole === USER_ROLE.driver) {
        messaging().subscribeToTopic('all-driver');
      } else {
        messaging().unsubscribeFromTopic('all-driver');
      }
    } else {
      messaging().unsubscribeFromTopic('all-customer');
      messaging().unsubscribeFromTopic('all-driver');
    }
    messaging().unsubscribeFromTopic('all-store');
  }, [userRole, accessToken]);

  useEffect(() => {
    const onMessageListener = messaging().onMessage(message => {
      if (__DEV__) {
        console.log('%c FIREBASE_MESSAGE_FORE_GROUND: ', 'color: yellow; font-weight: bold', message);
      }
      displayNotification(message);
      getDataMessage(message);
      dispatch({ type: actions.GET_USER });
      dispatch({ type: actions.SAVE_FCM_MESSAGE, data: message });
    });
    return onMessageListener;
  }, [dispatch]);
}
