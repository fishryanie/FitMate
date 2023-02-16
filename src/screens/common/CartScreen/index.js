/** @format */

import React, { Fragment } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Block, BottomButton, HeaderTitle, Icon, Image, ListWrapper, Text, TouchableOpacity } from '@components';
import { COLORS } from '@theme';
import { formatCurrency } from '@utils/helper';
import ItemCart from './components/ItemCart';
import { height } from '@utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CartScreen() {
  const { bottom } = useSafeAreaInsets();
  return (
    <Block flex backgroundColor={COLORS.light}>
      <HeaderTitle canGoBack canSearch title="My Cart" color={COLORS.dark} backgroundColor={COLORS.light} />

      <ListWrapper
        paddingTopContent={15}
        data={[1, 2, 3, 4]}
        VSeparator={15}
        renderItem={({ item, index }) => <ItemCart index={index} />}
      />

      <BottomButton title={'Checkout ' + formatCurrency('100000')} backgroundColor={COLORS.dark} />
    </Block>
  );
}
