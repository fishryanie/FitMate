/** @format */

import React from 'react';
import router from 'routes/router';
import { Block, Icon, Modal, Text, TouchableOpacity } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, OctICONS } from 'react-native-vector-icons';
import { COLORS, SIZES } from '@theme';
import { authRoot } from 'routes/Ref';

export default function ModalReferralCode({ open, setOpen }) {
  const { bottom } = useSafeAreaInsets();
  return (
    <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
      <Block
        radius={20}
        padding={15}
        paddingTop={50}
        overflow="hidden"
        marginBottom={bottom}
        marginHorizontal={15}
        backgroundColor={COLORS.bg_bottom}
      >
        <Icon
          absolute
          right={15}
          top={15}
          iconName="closecircle"
          ICONSize={22}
          iconColor={COLORS.transparentDark1}
          IconType={AntDesign}
        />
        <TouchableOpacity rowCenter radius={15} padding={15} backgroundColor={COLORS.light}>
          <Icon iconName="plus" ICONSize={20} iconColor={COLORS.success} IconType={OctICONS} marginRight={10} />
          <Text medium center fontSize={SIZES.large}>
            Add Referral Code
          </Text>
        </TouchableOpacity>
        <Text medium lineHeight={25} marginVertical={25} marginHorizontal={15} color={COLORS.textPlaceholder}>
          By signing in, you agree to IFLEX <Text bold>Privacy Policy</Text> and <Text bold>Terms of Use</Text>
        </Text>
        <TouchableOpacity
          radius={15}
          padding={15}
          backgroundColor={COLORS.dark}
          onPress={() => {
            setOpen(false);
            authRoot.navigate(router.REGISTER_SCREEN);
          }}
        >
          <Text bold center fontSize={SIZES.large} color={COLORS.light}>
            Continue
          </Text>
        </TouchableOpacity>
      </Block>
    </Modal>
  );
}
