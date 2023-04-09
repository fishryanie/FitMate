/** @format */

import { icons } from '@assets';
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
  const [describeBiometrics, setDescribeBiometrics] = useState('');

  useEffect(() => {
    rnBiometrics.isSensorAvailable();
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        setIconBiometrics(icons.ic_fingerprint);
        setDescribeBiometrics('Dùng cảm biến vân tay của người dùng');
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.TouchID);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setIconBiometrics(icons.ic_faceId);
        setDescribeBiometrics('Nhận diện khuôn mặt của người dùng');
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.FaceID);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setIconBiometrics(icons.ic_fingerprint);
        setDescribeBiometrics('Dùng cảm biến vân tay của người dùng');
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.Biometrics);
      } else {
        setIsShowBiometrics(false);
        setIsSupportedBiometrics(TYPE_SUPPORT_BIOMETRIC.UnSupport);
      }
    });
  }, [rnBiometrics]);

  return {
    rnBiometrics,
    iconBiometrics,
    isShowBiometrics,
    isSupportedBiometrics,
    describeBiometrics,
    TYPE_SUPPORT_BIOMETRIC,
  };
}
