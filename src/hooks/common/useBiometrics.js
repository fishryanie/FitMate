/** @format */

import { ICONS } from '@assets';
// import {CustomToast} from '@utils/';
import { useEffect, useState } from 'react';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const TYPE_SUPPORT_BIOMETRIC = {
  FaceID: 'FaceID',
  TouchID: 'TouchID',
  Biometrics: 'Biometrics',
  UnSupport: 'NoSupport',
};

export default function useBiometrics() {
  const rnBiometrics = new ReactNativeBiometrics();

  const [iconBiometrics, setIconBiometrics] = useState(null);
  const [isShowBiometrics, setIsShowBiometrics] = useState(true);
  const [isSupportedBiometrics, setIsSupportedBiometrics] = useState(null);

  useEffect(() => {
    rnBiometrics.isSensorAvailable();
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        setIconBiometrics(ICONS.ic_fingerprint);
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.TouchID);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setIconBiometrics(ICONS.ic_faceId);
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.FaceID);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setIconBiometrics(ICONS.ic_fingerprint);
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.Biometrics);
      } else {
        setIsShowBiometrics(false);
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.UnSupport);
        //CustomToast('Thiết bị của bạn không hỗ trợ biometrics');
      }
    });
  }, []);

  return {
    rnBiometrics,
    iconBiometrics,
    isShowBiometrics,
    isSupportedBiometrics,
    TYPE_SUPPORT_BIOMETRIC,
  };
}
