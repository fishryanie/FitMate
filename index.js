/**
 * @format
 */

import { name as appName } from './app.json';
import { AppRegistry, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (__DEV__) {
    console.log(
      '%c FIREBASE_MESSAGE_NOTIFICATION_FROM_BACKGROUND: ',
      'color: purple; font-weight: bold',
      remoteMessage,
    );
  }
});

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
