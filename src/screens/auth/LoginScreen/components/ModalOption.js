/** @format */

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Block, Icon, Modal, Text, TouchableOpacity } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TYPE_SUBMIT_AUTH } from '@constants';
import { COLORS, SIZES } from '@theme';
import { authRoot } from '@routes/Ref';
import router from '@routes/router';

export default function ModalOption({ open, setOpen, setContinue }) {
  const { bottom } = useSafeAreaInsets();
  const handleSubmit = () => {
    setOpen(false);

    setTimeout(() => {
      return authRoot.navigate(router.REGISTER_SCREEN, {
        typeSignUp: TYPE_SUBMIT_AUTH.phone,
      });
    }, 200);
  };

  return (
    <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
      <Block
        radius={20}
        overflow="hidden"
        marginBottom={bottom + 15}
        marginHorizontal={15}
        backgroundColor={COLORS.light}>
        <Block padding={15} backgroundColor={COLORS.bg_bottom}>
          <Text bold center fontSize={SIZES.large}>
            Other Option
          </Text>
          <Icon
            absolute
            right={15}
            top={15}
            iconName="closecircle"
            ICONSize={20}
            iconColor={COLORS.transparentDark1}
            IconType={AntDesign}
            onPress={() => setOpen(false)}
          />
        </Block>
        <TouchableOpacity
          rowCenter
          padding={15}
          borderBottomWidth={1}
          borderColor={COLORS.background}>
          <Icon
            marginRight={10}
            iconName="logo-google"
            ICONSize={20}
            iconColor={COLORS.danger}
            IconType={Ionicons}
          />
          <Text bold fontSize={SIZES.xMedium}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity rowCenter padding={15}>
          <Icon
            marginRight={10}
            iconName="facebook"
            ICONSize={20}
            iconColor={COLORS.facebook}
            IconType={MaterialIcons}
          />
          <Text bold fontSize={SIZES.xMedium}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
        <Block height={25} width={'100%'} backgroundColor={COLORS.bg_bottom} />
        <TouchableOpacity
          rowCenter
          padding={15}
          borderBottomWidth={1}
          borderColor={COLORS.background}
          onPress={handleSubmit}>
          <Icon
            marginRight={10}
            iconName="ios-phone-portrait-outline"
            ICONSize={20}
            iconColor={COLORS.textPlaceholder}
            IconType={Ionicons}
          />
          <Text bold fontSize={SIZES.xMedium}>
            Continue with Phone Number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity rowCenter padding={15}>
          <Icon
            marginRight={10}
            iconName="mail"
            ICONSize={20}
            iconColor={COLORS.textPlaceholder}
            IconType={Foundation}
          />
          <Text bold fontSize={SIZES.xMedium}>
            Continue with Email
          </Text>
        </TouchableOpacity>
        <Block height={25} width={'100%'} backgroundColor={COLORS.bg_bottom} />
      </Block>
    </Modal>
  );
}
