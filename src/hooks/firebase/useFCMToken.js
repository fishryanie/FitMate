/** @format */

import { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

export default function useFCMToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    messaging().getToken().then(setToken);
    const unsubcribe = messaging().onTokenRefresh(setToken);
    return () => {
      unsubcribe();
    };
  }, []);

  useEffect(() => {
    if (__DEV__) {
      console.log('DEVICE_TOKEN: ', token);
    }
  }, [token]);

  return token;
}
