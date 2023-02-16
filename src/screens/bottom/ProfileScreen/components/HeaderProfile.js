/** @format */

import React from 'react';
import router from '@routes/router';
import { Block, Image, Pressable, Text, UserAvatar } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, ImageBackground } from 'react-native';
import { height, width } from '@utils/responsive';
import { formatCurrency } from '@utils/helper';
import { commonRoot } from '@routes/Ref';
import { useSelector } from 'react-redux';
import { IMAGES, icons } from '@assets';
import { COLORS } from '@theme';

export const HeaderProfile = () => {
  const { top } = useSafeAreaInsets();
  const { full_name, picture } = useSelector(state => state.userInfo?.data || {});
  const userInfo = useSelector(state => state.userInfo?.data);

  return (
    <Block>
      <ImageBackground
        source={IMAGES.backgroundHeaderhome}
        style={{
          width: width,
          height: height / 5,
          paddingHorizontal: 15,
          paddingTop: top ? top + 10 : 10,
        }}
      >
        <Block row spaceBetween>
          <Pressable rowCenter onPress={() => commonRoot.navigate(router.RATING_ACCOUNT)}>
            <UserAvatar uri={picture} name={full_name} size={70} />
            <Block marginLeft={15}>
              <Text regular color="white" fontSize={16}>
                {'Xin chào, '}
                <Text color="white" medium fontSize={16}>
                  {userInfo?.full_name}
                </Text>
              </Text>
              <Text marginTop={5}>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</Text>
            </Block>
          </Pressable>

          <Block row>
            <Pressable marginRight={10} onPress={() => commonRoot.navigate(router.UPDATE_USER_INFO)}>
              <Image square={25} source={icons.ic_profile_edit} />
            </Pressable>
            <Pressable onPress={Alert.alert('Chức năng đang được cập nhật')}>
              <Image square={25} source={icons.ic_switch_account} />
            </Pressable>
          </Block>
        </Block>

        <Block rowCenter spaceBetween marginTop={10}>
          <Block
            padding={8}
            height={56}
            shadow1
            borderWidth={1}
            width={width / 2 - 22}
            borderColor={COLORS.white}
            backgroundColor={COLORS.white}
            radius={10}
          >
            <Pressable rowCenter onPress={() => commonRoot.navigate(router.WALLET_BALANCE_SCREEN)}>
              <Image source={icons.ic_wallet} height={40} width={40} />
              <Block flex alignCenter>
                <Text fontSize={14} medium>
                  Số dư ví
                </Text>
                <Text fontSize={16} bold color={COLORS.orangeHome}>
                  {formatCurrency('0')}
                </Text>
              </Block>
            </Pressable>
          </Block>
          <Pressable
            shadow1
            padding={8}
            height={56}
            radius={10}
            borderWidth={1}
            width={width / 2 - 22}
            borderColor={COLORS.white}
            backgroundColor={COLORS.white}
            onPress={() => commonRoot.navigate(router.POINTS_REWARD_SCREEN)}
          >
            <Block rowCenter>
              <Image source={icons.ic_diamondHome} height={40} width={40} />
              <Block flex alignCenter>
                <Text fontSize={14} medium>
                  Điểm tích lũy
                </Text>
                <Text fontSize={16} bold color={COLORS.orangeHome}>
                  0
                </Text>
              </Block>
            </Block>
          </Pressable>
        </Block>
      </ImageBackground>
    </Block>
  );
};
