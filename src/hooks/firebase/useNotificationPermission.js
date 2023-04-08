/** @format */

import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';

export default function useNotificationPermission() {
  const [hasPermission, setHasPermission] = useState(false);
  const [register] = useState(messaging().isDeviceRegisteredForRemoteMessages);

  useEffect(() => {
    messaging()
      .hasPermission()
      .then(authStatus => {
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          setHasPermission(true);
        }
      });
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      messaging()
        .requestPermission()
        .then(authStatus => {
          if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            setHasPermission(true);
          }
        });
    }
  }, [hasPermission]);

  /* React Native Firebase Messaging automatically registers the device with APNs to receive remote messages
  https://rnfirebase.io/messaging/usage#auto-registration-ios */
  /* useEffect(() => {
    if (!register) {
      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => setRegister(true));
    }
  }, [register]); */

  return hasPermission && register;
}
