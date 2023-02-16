/** @format */

import React from 'react';
import actions from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Block, HeaderTitle, Image, Text } from '@components';
import { useBiometrics } from '@hooks';
import { Switch } from 'react-native-switch';
import { COLORS } from '@theme';

export default function SettingScreen() {
  const dispatch = useDispatch();
  const {
    iconBiometrics,
    isShowBiometrics,
    isSupportedBiometrics,
    TYPE_SUPPORT_BIOMETRIC,
  } = useBiometrics();

  const isActive = useSelector(state => state.user.isActiveBiometrics);
  const data = [
    {
      value: isActive,
      img: iconBiometrics,
      title: isSupportedBiometrics,
      isShow: isShowBiometrics,
      describe:
        isSupportedBiometrics === TYPE_SUPPORT_BIOMETRIC.FaceID
          ? 'Nhận diện khuôn mặt của người dùng để đăng nhập ứng dụng'
          : 'Dùng cảm biến vân tay của người dùng để đăng nhập ứng dụng',
      setValue: () => {
        dispatch({ type: actions.ACTIVE_BIOMETRICS, isActive: !isActive });
      },
    },
  ];
  return (
    <Block flex>
      <HeaderTitle canGoBack title="Cài đặt" />
      {data.map((item, index) => {
        item.isShow && (
          <Block
            rowCenter
            radius={5}
            key={index}
            padding={15}
            marginTop={15}
            marginHorizontal={15}
            backgroundColor={'#F5F7FB'}>
            <Image
              square={30}
              marginRight={15}
              source={item.img}
              tintColor={COLORS.primary}
            />
            <Block>
              <Text regular fontSize={17} marginBottom={8}>
                {item.title}
              </Text>
              <Text regular fontSize={14} color={COLORS.placeholder}>
                {item.title}
              </Text>
            </Block>
            <Switch
              activeText=""
              inActiveText=""
              switchLeftPx={3}
              switchRightPx={3}
              circleSize={20}
              value={item.value}
              onValueChange={item.setValue}
              circleBorderWidth={2}
              backgroundActive={COLORS.primary}
              circleInActiveColor={COLORS.white}
              circleBorderActiveColor={COLORS.primary}
              backgroundInactive={COLORS.lightGray}
              circleBorderInactiveColor={COLORS.lightGray}
            />
          </Block>
        );
      })}
    </Block>
  );
}
