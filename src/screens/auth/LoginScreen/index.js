/** @format */

import React, { useEffect, useState } from 'react';
import formConfig, { FORM_LOGIN } from './components/FromConfig';
import actions from '@redux/actions';
import ModalOption from './components/ModalOption';
import ModalReferralCode from './components/ModalReferralCode';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block, Button, Image, Pressable, Text } from '@components';
import { useBiometrics, useDeviceName } from '@hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { COLORS, SIZES } from '@theme';
import { ICONS } from '@assets';
import { isEmpty } from '@utils/helper';
import { useCallback } from 'react';
import FormLogin from './components/FormLogin';

export default function LoginScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { rnBiometrics, iconBiometrics, isShowBiometrics } = useBiometrics();
  const { control, setValues, handleSubmit } = useForm(formConfig);
  const deviceName = useDeviceName();

  const account = useSelector(state => state.user);
  const isLoading = useSelector(state => state.login.isLoading);

  const [openOption, setOpenOption] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(1);
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [openReferralCode, setOpenReferralCode] = useState(false);

  const dispatch = useDispatch();

  const handlePress = () => {
    if (isSubmitting === 1 && account?.username === '' && account?.password === '') {
      setShowFormLogin(true);
    } else if (isSubmitting === 2 && account?.username === '' && account?.password === '') {
      onSubmit();
    }
    setIsSubmitting(previous => (previous >= 2 ? 2 : previous + 1));
  };

  const onSubmit = handleSubmit(values => {
    dispatch({
      type: actions.LOGIN_APP,
      body: {
        // deviceName,
        username: account?.username !== '' ? account?.username : values?.username,
        password: account?.password !== '' ? account?.password : values?.password,
      },
      onSuccess: res => {
        setIsSubmitting(false);
        setShowFormLogin(false);
      },
    });
  });

  const autoActiveBiomatrics = useCallback(async () => {
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Xác nhận sinh trắc học',
      cancelButtonText: 'Huỷ',
    });
    if (result.success) {
      dispatch({
        type: actions.LOGIN_APP,
        body: {
          // device_token,
          deviceName,
          username: account?.username,
          password: account?.password,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (account.username && account.password) {
      setValues(FORM_LOGIN.username, account?.username);
      setValues(FORM_LOGIN.password, account?.password);
    }
  }, []);

  useEffect(() => {
    if (account.isActiveBiometrics && !isEmpty(account.username && !isEmpty(account.password))) {
      autoActiveBiomatrics();
    }
  }, []);

  return (
    <Block flex paddingTop={top + 10} backgroundColor={COLORS.light}>
      <Text flex center semiBold justifyStart letterSpacing={5} fontSize={SIZES.xMedium}>
        IFLEX
      </Text>
      <Text flex={1.5} bold justifyCenter numberOfLines={2} paddingLeft={15} fontSize={55} color={COLORS.dark}>
        Fitness Simplified.
      </Text>
      {showFormLogin && <FormLogin control={control} />}
      <Block flex justifyEnd paddingHorizontal={15} marginBottom={bottom + 10}>
        <Text medium color={COLORS.textPlaceholder} marginBottom={25} onPress={() => setOpenOption(true)}>
          Choose Language
        </Text>
        <Block row>
          <Button flex title="Đăng nhập" loading={isLoading} backgroundColor={COLORS.dark} onPress={handlePress} />
          {isShowBiometrics && account.isActiveBiometrics && (
            <Pressable square={50} padding={10} radius={15} marginLeft={10} backgroundColor={COLORS.dark}>
              <Image square="100%" source={ICONS.ic_faceId} />
            </Pressable>
          )}
        </Block>
        <Text center medium color={COLORS.textPlaceholder} marginVertical={15} onPress={() => setOpenOption(true)}>
          Orther Option
        </Text>
      </Block>
      {/* <Button title="Continue with Facebook" iconLeft={<Icon marginRight={10} iconName="facebook" ICONSize={20} iconColor={COLORS.light} IconType={MaterialICONS} />} />
      <Button title="Continue with Google" iconLeft={<Icon marginRight={10} iconName="logo-google" ICONSize={20} iconColor={COLORS.light} IconType={IonICONS} />} /> */}
      <ModalOption open={openOption} setOpen={setOpenOption} setContinue={setOpenReferralCode} />
      <ModalReferralCode open={openReferralCode} setOpen={setOpenReferralCode} />
    </Block>
  );
}
