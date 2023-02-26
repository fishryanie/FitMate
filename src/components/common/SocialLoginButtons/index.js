/** @format */

import { icons } from '@assets';
import { Block, Image, Pressable, Text, Icon } from '@components';
import { useBiometrics, useCustomToast, useDeviceName, useFCMToken } from '@hooks';
import appleAuth from '@invertase/react-native-apple-authentication';
import { authRoot, bottomRoot } from '@routes/Ref';
import router from '@routes/router';
import actions from 'store/actions';
import { COLORS } from '@theme';
import { throttle } from '@utils/helper';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appleLogin, facebookLogin, googleLogin } from './helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBiometrics from 'react-native-biometrics';
import { OTP_TYPE } from '@constants';

const SocialLoginButtons = ({ containterProps }) => {
  const [isLoading, setLoading] = useState(false);
  const { toastFail } = useCustomToast();
  const dispatch = useDispatch();
  const device_name = useDeviceName();
  const device_token = useFCMToken();
  const { t } = useTranslation();
  const bioLogin = useSelector(state => state.other.bioLogin);
  const { biometryType, available } = useBiometrics();

  const handeLogin = async (profile, idType, actionType) => {
    if (profile.uid) {
      dispatch({
        type: actionType,
        body: {
          info: JSON.stringify(profile),
          [idType]: profile.uid,
          device_token,
          device_name,
        },
        onFail(e) {
          setLoading(false);
          toastFail(e);
        },
      });
    } else {
      setLoading(false);
      toastFail(t('LoginScreen.invalid_account'));
    }
  };

  const handleFacebook = async () => {
    try {
      setLoading(true);
      const profile = await facebookLogin();
      handeLogin(profile, 'fbID', actions.LOGIN_FACEBOOK);
    } catch (error) {
      toastFail(t('common.error_occur'));
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const profile = await googleLogin();
      handeLogin(profile, 'ggID', actions.LOGIN_GOOGLE);
    } catch (error) {
      toastFail(t('common.error_occur'));
      setLoading(false);
    }
  };

  const handleApple = async () => {
    try {
      setLoading(true);
      const profile = await appleLogin();
      handeLogin(profile, 'apID', actions.LOGIN_APPLE);
    } catch (error) {
      toastFail(t('common.error_occur'));
      setLoading(false);
    }
  };

  const handleBioLogin = async () => {
    try {
      const { success } = await ReactNativeBiometrics.simplePrompt({
        promptMessage:
          biometryType === ReactNativeBiometrics.FaceID
            ? t('SettingScreen.face_confirm')
            : t('SettingScreen.fingerprint_confirm'),
      });
      if (success) {
        setLoading(true);
        switch (bioLogin.type) {
          case actions.SIGN_IN_USER:
            dispatch({
              ...bioLogin,
              onSuccess: res => {
                if (res.phone) {
                  dispatch({
                    type: actions.SEND_OTP,
                    params: { phone: res.phone },
                    otpType: OTP_TYPE.signIn,
                    onSuccess: () =>
                      authRoot.navigate(router.INPUT_OTP_SCREEN, {
                        info: res,
                      }),
                    onFail: error => {
                      toastFail(error?.data?.message);
                    },
                  });
                } else {
                  dispatch({
                    type: actions.SAVE_USER_INFO,
                    role: res.user_type,
                    userToken: res.token,
                  });
                  dispatch({ type: actions.GET_USER });
                  bottomRoot.navigate(router.HOME_SCREEN);
                }
              },
              onFail: error => {
                error?.data?.message && toastFail(error?.data?.message);
                setLoading(false);
              },
            });
            break;
          case actions.LOGIN_FACEBOOK:
          case actions.LOGIN_GOOGLE:
          case actions.LOGIN_APPLE:
            dispatch({
              ...bioLogin,
              onFail(e) {
                setLoading(false);
                toastFail(e);
              },
            });
            break;
          default:
            break;
        }
      }
    } catch (error) {}
  };

  return (
    <Block alignCenter marginBottom={30} {...containterProps}>
      <Text regular fontSize={17} marginBottom={20} light>
        {t('LoginScreen.social_login')}
      </Text>
      {isLoading ? (
        <Block padding={20}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </Block>
      ) : (
        <Block justifyCenter rowCenter>
          <Pressable onPress={throttle(handleFacebook)}>
            <Image source={icons.ic_facebook} round={40} />
          </Pressable>
          <Pressable
            onPress={throttle(handleGoogle)}
            round={40}
            backgroundColor={COLORS.whiteGray}
            justifyCenter
            alignCenter
            marginHorizontal={18}>
            <Image source={icons.ic_google} width={36} height={21} />
          </Pressable>
          {appleAuth.isSupported && (
            <Pressable
              onPress={throttle(handleApple)}
              round={40}
              backgroundColor={COLORS.whiteGray}
              justifyCenter
              alignCenter>
              <Image source={icons.ic_apple} width={36} height={21} />
            </Pressable>
          )}
          {bioLogin && available && (
            <Pressable
              onPress={throttle(handleBioLogin)}
              round={40}
              backgroundColor={COLORS.whiteGray}
              justifyCenter
              alignCenter>
              <Icon
                IconType={MaterialCommunityIcons}
                iconName={
                  biometryType === ReactNativeBiometrics.FaceID
                    ? 'face-recognition'
                    : 'fingerprint'
                }
                color={COLORS.primary}
                iconSize={25}
              />
            </Pressable>
          )}
        </Block>
      )}
    </Block>
  );
};

export default SocialLoginButtons;
