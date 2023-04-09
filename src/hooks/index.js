/** @format */

import useMomo from './common/useMomo';
import useBiometrics from './common/useBiometrics';
import useLayoutSize from './common/useLayoutSize';
import usePrevious from './common/usePrevious';
import useDeviceName from './deviceInfo/useDeviceName';
import useCurrentPosition from './common/useCurrentPosition';

import useFCMToken from './firebase/useFCMToken';
import useFCMMessage from './firebase/useFCMMessage';
import useBackgroundMessages from './firebase/useBackgroundMessages';
import useNotificationListener from './firebase/useNotificationListener';

import useCameraPermission from './permission/useCameraPermission';
import useLocationPermission from './permission/useLocationPermission';
import usePhotoPermission from './permission/usePhotoPermission';
import useNotificationPermission from './permission/useNotificationPermission';

export {
  usePrevious,
  useLayoutSize,
  //device info
  useDeviceName,
  //firebase
  useFCMToken,
  useFCMMessage,
  useBackgroundMessages,
  useNotificationListener,
  //permission
  useCameraPermission,
  useLocationPermission,
  usePhotoPermission,
  useNotificationPermission,
  //user
  useCurrentPosition,
  useMomo,
  //common
  useBiometrics,
};
