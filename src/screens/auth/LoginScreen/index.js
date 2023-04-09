/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import formConfig, { FORM_LOGIN } from './components/FromConfig';
import actions from 'store/actions';
import FormLogin from './components/FormLogin';
import ModalOption from './components/ModalOption';
import ModalReferralCode from './components/ModalReferralCode';
import SwitchSelector from 'react-native-switch-selector';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block, Button, Image, Pressable, Text } from '@components';
import { useBiometrics, useDeviceName, useFCMToken } from '@hooks';
import { useDispatch, useSelector } from 'react-redux';
import { APP_LANGUAGE_DATA } from '@constants';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { COLORS, SIZES } from '@theme';
import { ICONS } from '@assets';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();
  const { rnBiometrics, iconBiometrics, isShowBiometrics } = useBiometrics();
  const { control, setValue, handleSubmit } = useForm(formConfig);
  const deviceToken = useFCMToken();
  const deviceName = useDeviceName();

  const account = useSelector(state => state.user);
  const isLoading = useSelector(state => state.login.isLoading);
  const savedUsername = useSelector(state => state.user.username);
  const savedPassword = useSelector(state => state.user.password);
  const isActiveBiometrics = useSelector(state => state.app.isActiveBiometrics);

  const [openOption, setOpenOption] = useState(false);
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [openReferralCode, setOpenReferralCode] = useState(false);

  const dispatch = useDispatch();

  const handlePress = () => {
    if (
      savedUsername === '' &&
      savedPassword === '' &&
      !isActiveBiometrics &&
      !showFormLogin
    ) {
      setShowFormLogin(true);
    } else {
      onSubmit();
    }
  };

  const onSubmit = handleSubmit(values => {
    dispatch({
      type: actions.LOGIN_APP,
      body: {
        deviceName,
        deviceToken,
        username: savedUsername ? savedUsername : values?.username,
        password: savedPassword ? savedPassword : values?.password,
      },
      onSuccess: res => {
        setShowFormLogin(false);
        dispatch({
          type: actions.SAVE_USER_LOGIN,
          username: values?.username,
          password: values?.password,
        });
      },
    });
  });

  const autoActiveBiometrics = useCallback(async () => {
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Xác nhận sinh trắc học',
      cancelButtonText: 'Huỷ',
    });
    if (result.success) {
      dispatch({
        type: actions.LOGIN_APP,
        body: {
          deviceName,
          deviceToken,
          username: savedUsername,
          password: savedPassword,
        },
      });
    }
  }, [dispatch, rnBiometrics, deviceName, deviceToken, savedUsername, savedPassword]);

  useEffect(() => {
    if (isActiveBiometrics) {
      autoActiveBiometrics();
    }
  }, [autoActiveBiometrics, isActiveBiometrics]);

  useEffect(() => {
    if (isActiveBiometrics && savedUsername && savedPassword) {
      setValue(FORM_LOGIN.username, savedUsername);
      setValue(FORM_LOGIN.password, savedPassword);
    }
  }, [setValue, isActiveBiometrics, savedUsername, savedPassword]);

  return (
    <Block flex paddingTop={top + 10} backgroundColor={COLORS.light}>
      <Block flex justifyStart>
        <Text center semiBold letterSpacing={5} fontSize={SIZES.xMedium}>
          FIT MATE
        </Text>
        <SwitchSelector
          hasPadding
          initial={0}
          height={25}
          fontSize={12}
          borderWidth={0.5}
          animationDuration={300}
          textColor={COLORS.grey800}
          borderColor={COLORS.grey500}
          buttonColor={COLORS.grey800}
          options={APP_LANGUAGE_DATA}
          style={{ width: 100, margin: 15, alignSelf: 'flex-end' }}
          onPress={value => dispatch({ type: actions.CHANGE_LANGUAGE, value })}
        />
      </Block>
      <Text
        flex={1.5}
        bold
        justifyCenter
        numberOfLines={2}
        paddingLeft={15}
        fontSize={55}
        color={COLORS.dark}>
        {t('Login.title')}
      </Text>

      {showFormLogin && <FormLogin control={control} />}
      <Block flex justifyEnd paddingHorizontal={15} marginBottom={bottom + 10}>
        <Block row>
          <Button
            flex
            title={t('Login.buttonSubmit')}
            loading={isLoading}
            backgroundColor={COLORS.dark}
            onPress={handlePress}
          />
          {isShowBiometrics && account.isActiveBiometrics && (
            <Pressable
              square={50}
              padding={10}
              radius={15}
              marginLeft={10}
              backgroundColor={COLORS.dark}>
              <Image square="100%" source={ICONS.ic_faceId} />
            </Pressable>
          )}
        </Block>
        <Text
          center
          medium
          color={COLORS.textPlaceholder}
          marginVertical={15}
          onPress={() => setOpenOption(true)}>
          {t('Login.otherOption')}
        </Text>
      </Block>
      {/* <Button title="Continue with Facebook" iconLeft={<Icon marginRight={10} iconName="facebook" ICONSize={20} iconColor={COLORS.light} IconType={MaterialICONS} />} />
      <Button title="Continue with Google" iconLeft={<Icon marginRight={10} iconName="logo-google" ICONSize={20} iconColor={COLORS.light} IconType={IonICONS} />} /> */}
      <ModalOption
        open={openOption}
        setOpen={setOpenOption}
        setContinue={setOpenReferralCode}
      />
      <ModalReferralCode open={openReferralCode} setOpen={setOpenReferralCode} />
    </Block>
  );
}
