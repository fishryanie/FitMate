/** @format */

import React, { useState } from 'react';
import actions, { _onUnmount } from 'store/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Block, Icon, Image, Pressable, ScrollView, Text } from '@components';
import { Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderProfile } from './components/HeaderProfile';
import { listProfile } from './mocks';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.logout?.isLoading);
  const [showDialog, setShowDialog] = useState(false);
  const [isSignout, setIsSignout] = useState(false);

  const signOut = () => {
    dispatch({
      type: actions.SAVE_CURRENT_BOOKING_TRIP,
      payload: null,
    });
    dispatch({
      type: actions.LOG_OUT_USER,
      onSuccess: () => setShowDialog(false),
    });
  };

  const signOutOnPress = _isSignOut => {
    if (Platform.OS === 'ios') {
      showAlert(_isSignOut);
    } else {
      setIsSignout(_isSignOut);
      setShowDialog(true);
    }
  };

  const showAlert = _isSignout => {
    Alert.alert(
      _isSignout
        ? 'Bạn có thực sự muốn đăng xuất?'
        : 'Đăng xuất và chuyển đến trang đăng ký tài xế?',
      '',
      [
        {
          text: 'Huỷ',
          onPress: () => {},
        },
        {
          text: 'Đồng ý',
          // onPress: _isSignout ? signOut : redirectToDriverRegister,
        },
      ],
    );
  };

  return (
    <Block flex backgroundColor="background">
      <HeaderProfile />
      <ScrollView safeAreaBottom marginTop={25} paddingHorizontal={15}>
        {listProfile.map((item, index) => {
          const handlePress = () => {
            index === DATA.length - 1 ? signOutOnPress(true) : onPress();
          };
          return (
            <Pressable
              paddingHorizontal={10}
              backgroundColor={'white'}
              rowCenter
              height={50}
              key={index}
              onPress={handlePress}>
              <Image source={item.icon} square={35} resizeMode="contain" />
              <Block
                flex
                rowCenter
                alignSelf="stretch"
                marginLeft={16}
                borderBottomWidth={0.5}
                borderColor="lineBreak">
                <Text flex fontSize={17}>
                  {item.title}
                </Text>
                <Icon
                  IconType={FontAwesome5}
                  iconName="chevron-right"
                  iconColor="iconPlaceholder"
                  iconSize={16}
                />
              </Block>
            </Pressable>
          );
        })}
      </ScrollView>
    </Block>
  );
}
