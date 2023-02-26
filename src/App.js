/** @format */

import React, { PureComponent } from 'react';
import { store, persistor } from '@store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CodePushProgressDialog } from '@components';
import { Text, TextInput } from 'react-native';
import { Provider } from 'react-redux';
import { NetWork } from '@components';
import MainContainer from '@routes';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import 'moment/locale/vi';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.allowFontScaling = false;

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

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NetWork />
            <MainContainer />
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
