/** @format */

import { icons } from '@assets';
import { Block, Button, HeaderTitle, Icon, Image, Modal, Pressable, Text, TextInput, UserAvatar } from '@components';
import { useBiometrics } from '@hooks';
import actions from '@store/actions';
import { COLORS } from '@theme';
import React, { useState } from 'react';
import { Switch } from 'react-native-switch';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';

export default function SettingScreen() {
  const dispatch = useDispatch();
  const { iconBiometrics, isShowBiometrics, isSupportedBiometrics, describeBiometrics } = useBiometrics();
  const userInfo = useSelector(state => state.userInfo.data);
  const isActiveBiometrics = useSelector(state => state.app.isActiveBiometrics);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isShowPopupPwd, setShowPopupPwd] = useState(false);
  const data = [
    {
      value: isActiveBiometrics,
      img: iconBiometrics,
      title: isSupportedBiometrics,
      isShow: isShowBiometrics,
      describe: describeBiometrics,
      setValue: () => {
        if (!isActiveBiometrics) {
          return setShowPopupPwd(true);
        }
        dispatch({ type: actions.ACTIVE_BIOMETRICS, isActive: false });
      },
    },
    {
      img: icons.ic_notify_setting,
      title: 'Nhận thông báo',
      describe: 'Bật/tắt thông báo cho ứng dụng',
      isShow: true,
      value: false,
      setValue: () => {},
    },
  ];

  const handleCheckCurrentPassword = () => {
    if (!password) {
      return Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: 'Mật khẩu không được để trống',
      });
    }
    dispatch({
      type: actions.CHECK_CURRENT_PASSWORD,
      body: { password },
      onSuccess: () => {
        setShowPopupPwd(false);
        dispatch({
          type: actions.ACTIVE_BIOMETRICS,
          isActive: true,
        });
        dispatch({
          type: actions.SAVE_USER_LOGIN,
          displayName: userInfo?.displayName,
          username: userInfo?.username,
          password: password,
        });
      },
    });
  };
  return (
    <Block flex>
      <HeaderTitle canGoBack title="Cài đặt" />
      {data.map(
        (item, index) =>
          item.isShow && (
            <Block
              rowCenter
              spaceBetween
              radius={5}
              key={index}
              padding={15}
              marginTop={15}
              marginHorizontal={15}
              backgroundColor={'#F5F7FB'}>
              <Image
                width={30}
                height={item.img === icons.ic_notify_setting ? 35 : 30}
                marginRight={15}
                source={item.img}
                resizeMode={'stretch'}
                tintColor={COLORS.primary}
              />
              <Block flex marginRight={15}>
                <Text regular fontSize={17} marginBottom={5}>
                  {item.title}
                </Text>
                <Text regular fontSize={14} color={COLORS.placeholder}>
                  {item.describe}
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
          ),
      )}
      <Modal position="center" isVisible={isShowPopupPwd} onBackdropPress={() => setShowPopupPwd(false)}>
        <Block radius={15} margin={15} padding={15} alignCenter backgroundColor={COLORS.white}>
          <UserAvatar uri={userInfo?.picture} name={userInfo?.full_name} marginTop={25} size={70} />
          <Text bold fontSize={17} marginTop={25}>
            Xác thực
          </Text>
          <Text center regular fontSize={15} marginTop={25}>
            Nhập lại mật khẩu đăng nhập của bạn để xác thực
          </Text>
          <Block
            rowCenter
            radius={5}
            marginTop={25}
            borderWidth={0.5}
            marginHorizontal={15}
            borderColor={COLORS.philippineGray}>
            <TextInput
              radius={5}
              height={45}
              width="100%"
              value={password}
              secureTextEntry={!showPass}
              paddingHorizontal={15}
              onChangeText={setPassword}
              placeholder="Nhập mật khẩu hiện tại"
            />
            <Pressable
              paddingRight={15}
              onPress={() => {
                setShowPass(!showPass);
              }}>
              <Icon IconType={Entypo} color={COLORS.buttonDisable} iconName={showPass ? 'eye-with-line' : 'eye'} />
            </Pressable>
          </Block>
          <Button width="100%" title="Xác nhận" marginTop={25} onPress={handleCheckCurrentPassword} />
        </Block>
      </Modal>
    </Block>
  );
}
