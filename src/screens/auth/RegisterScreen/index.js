/** @format */

import React, { useState } from 'react';
import { Block, Button, Icon, Text, TouchableOpacity, TextInput } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import { AntDesign } from 'react-native-vector-icons';
import { COLORS, SIZES } from '@theme';
import { commonRoot, root } from 'routes/Ref';
import { useDispatch } from 'react-redux';
import { TYPE_SUBMIT_AUTH } from '@constants';
import Toast from 'react-native-toast-message';
import actions from 'store/actions';
import router from 'routes/router';

export default function RegisterScreen({ route }) {
  const { typeSignUp } = route.params;
  const { bottom } = useSafeAreaInsets();
  const { keyboardHeight, keyboardShown } = useKeyboard();
  const [value, setValue] = useState();
  console.log('🚀 ~ file: index.js:30 ~ RegisterScreen ~ value', value);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({
      body: value,
      type:
        typeSignUp === TYPE_SUBMIT_AUTH.phone
          ? actions.SEND_OTP_REGISTER
          : actions.SEND_MAIL_REGISTER,
      onSuccess: res => {
        commonRoot.navigate(router.VERIFY_OTP_SCREEN, {
          username: value,
          data: res,
        });
      },
      onFailure: error => {
        Toast.show({
          type: 'error',
          text1: error?.data?.message,
        });
      },
    });
  };

  return (
    <Block flex padding={15} backgroundColor={COLORS.light}>
      <Icon
        absolute
        right={15}
        top={15}
        iconName="closecircle"
        ICONSize={22}
        IconType={AntDesign}
        iconColor={COLORS.transparentDark1}
        onPress={root.goBack}
      />
      <Text bold fontSize={SIZES.xLarge} marginTop={50}>
        Your Number
      </Text>
      <Block rowCenter marginTop={15}>
        <TouchableOpacity
          rowCenter
          justifyCenter
          radius={15}
          marginRight={10}
          paddingVertical={12}
          paddingHorizontal={15}
          backgroundColor={COLORS.background}>
          <Text bold fontSize={SIZES.large} marginRight={5}>
            +84
          </Text>
          <Icon
            iconName="caretdown"
            ICONSize={SIZES.medium}
            iconColor={COLORS.transparentDark1}
            IconType={AntDesign}
          />
        </TouchableOpacity>
        <TextInput
          flex
          value={value}
          onChangeValue={setValue}
          borderWidth={1}
          borderColor={COLORS.grey300}
        />
      </Block>
      <Text bold marginVertical={10} fontSize={13} color={COLORS.blueGrey200}>
        A text with verification code will be sent. Message and data rates maybe apply
      </Text>

      <Block flex justifyEnd paddingBottom={keyboardShown ? keyboardHeight : bottom}>
        <Text bold lineHeight={22} marginVertical={25} color={COLORS.blueGrey200}>
          By signing in, you agree to IFLEX <Text bold>Privacy Policy</Text> and{' '}
          <Text bold>Terms of Use</Text>
        </Text>
        <Button title="Continue" onPress={handleSubmit} />
      </Block>
    </Block>
  );
}
