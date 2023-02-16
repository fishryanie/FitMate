/** @format */

import React, { Fragment } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Block, BottomButton, HeaderTitle, Icon, ListWrapper, Text, TouchableOpacity } from '@components';
import { COLORS } from '@theme';
import { formatCurrency } from '@utils/helper';
import ItemCart from './components/ItemCart';
import ScrollView from '@components/base/ScrollView';
import { height } from '@utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OrderDetailScreen() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Block flex backgroundColor={COLORS.light}>
      <HeaderTitle canGoBack title="My Cart" color={COLORS.dark} backgroundColor={COLORS.light} />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + height / 5 }}>
        <Text bold fontSize={18} padding={15}>
          My Cart
        </Text>
        <Block>
          <ListWrapper
            data={[1, 2, 3, 4]}
            VSeparator={15}
            renderItem={({ item, index }) => <ItemCart index={index} />}
          />
        </Block>
        <Text bold fontSize={18} padding={15} marginTop={10}>
          Delivery Location
        </Text>
        <TouchableOpacity rowCenter paddingHorizontal={15}>
          <Block alignCenter justifyCenter radius={10} square={60} backgroundColor={COLORS.grey300}>
            <Icon iconSize={25} IconType={FontAwesome5} iconName="shipping-fast" />
          </Block>
          <Block flex paddingLeft={15}>
            <Text semiBold fontSize={16} marginBottom={5} numberOfLines={1}>
              748/30 Thống Nhất
            </Text>
            <Text regular fontSize={14} numberOfLines={2}>
              Phường 15, Quận Gò Vấp, Thành Phố Hồ Chí Minh
            </Text>
          </Block>
          <Icon iconSize={25} IconType={MaterialIcons} iconName="navigate-next" iconColor={COLORS.grey600} />
        </TouchableOpacity>

        <Text bold fontSize={18} padding={15} marginTop={10}>
          Payment Methot
        </Text>

        <TouchableOpacity rowCenter paddingHorizontal={15}>
          <Block alignCenter justifyCenter radius={10} square={60} backgroundColor={COLORS.grey300}>
            <Icon iconSize={25} IconType={Fontisto} iconName={'visa' || 'mastercard'} />
          </Block>
          <Block flex paddingLeft={15}>
            <Text semiBold fontSize={16} marginBottom={5} numberOfLines={1}>
              Visa Classic
            </Text>
            <Text regular fontSize={14} numberOfLines={2}>
              * * * * 9081
            </Text>
          </Block>
          <Icon iconSize={25} IconType={MaterialIcons} iconName="navigate-next" iconColor={COLORS.grey600} />
        </TouchableOpacity>
      </ScrollView>

      <BottomButton
        title={'Checkout ' + formatCurrency('100000')}
        backgroundColor={COLORS.dark}
        topContent={
          <Block rowCenter spaceBetween marginBottom={15}>
            <Text>Total</Text>
            <Text>100</Text>
          </Block>
        }
      />
    </Block>
  );
}
