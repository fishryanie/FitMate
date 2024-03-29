/** @format */

import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';

export default function useFCMToken() {
  const [token, setToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [register, setRegister] = useState(messaging().isDeviceRegisteredForRemoteMessages);

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

  useEffect(() => {
    if (!register) {
      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => setRegister(true));
    }
  }, [register]);

  useEffect(() => {
    if (hasPermission && register) {
      messaging().getToken().then(setToken);
      const unsubcribe = messaging().onTokenRefresh(setToken);
      return () => {
        unsubcribe();
      };
    }
  }, [hasPermission, register]);

  useEffect(() => {
    if (token) {
      if (__DEV__) {
        console.log('DEVICE_TOKEN: ', token);
      }
    }
  }, [token]);

  return token;
}
