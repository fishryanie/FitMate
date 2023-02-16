/** @format */

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Block, Icon, Image, Pressable, Text } from '@components';
import { COLORS } from '@theme';
import { formatCurrency } from '@utils/helper';

export default function ItemCart() {
  return (
    <Block row radius={10} marginHorizontal={15} backgroundColor={COLORS.light}>
      <Block radius={10} square={120} padding={10} backgroundColor={COLORS.grey200}>
        <Image
          square={'100%'}
          source={{ uri: 'https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02351.png' }}
        />
      </Block>
      <Block flex marginLeft={15} paddingTop={5}>
        <Text medium fontSize={16} marginBottom={10}>
          Headphone, Tai Phone Nghe Nhạc 3
        </Text>
        <Text regular fontSize={14} marginBottom={10}>
          {formatCurrency('1000000')}
        </Text>
        <Block rowCenter>
          <Icon IconType={AntDesign} iconName="minuscircleo" iconSize={20} color={COLORS.grey400} />
          <Text regular fontSize={14} marginHorizontal={15} color={COLORS.grey600}>
            1
          </Text>
          <Icon IconType={AntDesign} iconName="pluscircleo" iconSize={20} color={COLORS.grey400} />
        </Block>
      </Block>
      <Pressable alignSelfEnd justifyCenter alignCenter round={30} margin={5} backgroundColor={COLORS.grey200}>
        <Icon IconType={Feather} iconName="trash" iconSize={14} color={COLORS.grey600} />
      </Pressable>
    </Block>
  );
}
