/** @format */

import React, { PureComponent, useEffect } from 'react';
import store, { persistor } from '@redux/store';
import { useFCMToken, useNotificationMessage, useNotificationPermission } from '@hooks';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CodePushProgressDialog } from '@components';
import { Text, TextInput } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NetWork } from '@components';
import MainContainer from '@routes';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import i18n from './i18n';
import 'moment/locale/vi';
import actions from '@redux/actions';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.allowFontScaling = false;

const App = () => {
  useNotificationPermission();
  useNotificationMessage();
  const getConfigsApp = useSelector(state => state.getConfigsApp);
  console.log('🚀 ~ file: App.js:35 ~ App ~ getConfigsApp', getConfigsApp);
  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
    dispatch({ type: actions.GET_CONFIGS_APP, params: { type: 'terms-policy' } });
  }, [dispatch]);
  return <MainContainer />;
};

class AppWrapper extends PureComponent {
  state = {
    status: codePush.SyncStatus.UP_TO_DATE,
    progress: {},
  };

  codePushStatusDidChange(status) {
    this.setState({ status });
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <App />
            <NetWork />
            <Toast visibilityTime={2000} />
            {(this.state.status === codePush.SyncStatus.DOWNLOADING_PACKAGE ||
              this.state.status === codePush.SyncStatus.INSTALLING_UPDATE) && (
              <CodePushProgressDialog progress={this.state.progress} />
            )}
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

export default codePush(codePushOptions)(AppWrapper);
