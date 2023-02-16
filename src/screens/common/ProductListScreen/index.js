/** @format */

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Block, BottomButton, HeaderTitle, Icon, Image, Text } from '@components';
import { COLORS } from '@theme';
import { height, width } from '@utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatCurrency } from '@utils/helper';

export default function ProductDetailScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <Block flex backgroundColor={COLORS.light}>
      <HeaderTitle canGoBack absolute zIndex={1} />
      <Block width={width} height={height / 2.5} borderBottomLeftRadius={50} backgroundColor={COLORS.primary} />
      <Image
        absolute
        alignSelfEnd
        zIndex={2}
        top={top}
        translateX={35}
        square={width / 1.5}
        source={{ uri: 'https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02351.png' }}
      />
      <Block
        top={top + height / 4.5}
        absolute
        zIndex={1}
        alignSelfEnd
        width={width - 20}
        padding={20}
        borderTopLeftRadius={50}
        backgroundColor={COLORS.light}
        height={'100%'}
        shadow1
      >
        <Text bold fontSize={25} width={width / 1.8} marginTop={30} numberOfLines={2} color={COLORS.primary}>
          Headphone, Tai Phone Nghe Nhạc 3
        </Text>
        <Block rowCenter marginTop={15}>
          <Text semiBold fontSize={18} marginRight={15} color={COLORS.danger}>
            {formatCurrency('550000')}
          </Text>
          <Text flex medium lineThrough fontSize={14} color={COLORS.danger}>
            {formatCurrency('550000')}
          </Text>
          <Icon IconType={AntDesign} iconName="hearto" iconSize={22} />
          <Icon IconType={AntDesign} iconName="sharealt" iconSize={22} marginLeft={15} />
          <Icon IconType={AntDesign} iconName="message1" iconSize={22} marginLeft={20} />
        </Block>
        <Text semiBold fontSize={18} marginTop={30}>
          Description
        </Text>
        <Text regular fontSize={16} marginTop={10} numberOfLines={4}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci assumenda tempore tenetur minus amet
          sed sunt molestiae illum hic nobis harum dignissimos, itaque deleniti enim dolore iusto? Accusamus, id!
        </Text>

        <Block rowCenter>
          <Block flex>
            <Text semiBold fontSize={18} marginTop={30}>
              Review
            </Text>
          </Block>
          <Text regular underline fontSize={14} marginTop={30}>
            See all
          </Text>
        </Block>
      </Block>
      <BottomButton title="Add to cart" />
    </Block>
  );
}
