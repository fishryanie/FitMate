/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '@components';
import { COLORS, FONTS } from '@theme';
import { mhs } from '@responsive';
import CountDown from 'react-native-countdown-component';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function VerifyOtpScreen() {
  const handleCodeFilled = otp => {};
  const handleReSendOTP = () => {};
  return (
    <Block flex>
      <Text light fontSize={16} marginBottom={25}>
        Một mã xác thực gồm 6 số đã được gửi đến số điện thoại 0909 123 456
      </Text>
      <Text medium center fontSize={16}>
        Nhập mã để tiếp tục
      </Text>
      <OTPInputView
        //   ref={ref => (otpInput.current = ref)}
        style={styles.itemOtp}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.codeInputFieldStyle}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={handleCodeFilled}
      />
      <Block rowCenter marginBottom={25}>
        <Text light fontSize={16}>
          Bạn không nhận được mã?
        </Text>
        <Text underline color={COLORS.primary} marginHorizontal={5} onPress={handleReSendOTP}>
          Gửi lại
        </Text>
        <CountDown
          showSeparator
          digitStyle={{ backgroundColor: COLORS.transparent }}
          digitTxtStyle={{ color: COLORS.jet }}
          timeToShow={['M', 'S']}
          timeLabels={{ s: null }}
          until={300}
          size={12}
        />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  itemOtp: {
    width: '100%',
    height: 40,
    marginVertical: 25,
  },
  codeInputFieldStyle: {
    color: COLORS.jet,
    fontSize: mhs(20),
    backgroundColor: '#F5F7FB',
    fontFamily: FONTS.semiBold,
    marginVertical: 25,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primary,
  },
});
