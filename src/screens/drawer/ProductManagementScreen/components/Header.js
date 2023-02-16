/** @format */

import React, { Fragment } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Block, Text, Pressable, ListWrapper, Image, Icon } from '@components';
import { COLORS } from '@theme';
import { shopCommonRoot } from '@navigation/navigationRef';
import { icons } from '@assets';
import router from '@routes/router';
import { commonRoot } from '@routes/Ref';

export default function CustomHeader({
  listMenu,
  chooseMenu,
  setChooseMenu,
  setOpenModal,
  category,
}) {
  return (
    <Fragment>
      <Pressable
        rowCenter
        padding={15}
        backgroundColor={COLORS.white}
        onPress={() => {
          commonRoot.navigate(router.SHOP_FORM_PRODUCT_SCREEN);
        }}>
        <Block flex rowCenter>
          <Image source={icons.ic_config_product} width={30} height={34} />
          <Block marginLeft={15}>
            <Text medium fontSize={14}>
              Thiết lập sản phẩm
            </Text>
            <Text regular fontSize={14} color={COLORS.placeholder}>
              Thêm hoặc chỉnh sản phẩm
            </Text>
          </Block>
        </Block>
        <Icon IconType={Octicons} iconName="plus" iconSize={20} color={COLORS.gray5} />
      </Pressable>
      <ListWrapper
        horizontal
        data={listMenu}
        paddingTop={15}
        backgroundColor={COLORS.cultured}
        renderItem={({ item, index }) => (
          <Pressable
            radius={20}
            borderWidth={1}
            paddingVertical={7}
            paddingHorizontal={10}
            onPress={() => setChooseMenu(item.id)}
            marginLeft={index === 0 ? 15 : 0}
            marginRight={index === listMenu.length - 1 ? 15 : 0}
            borderColor={chooseMenu === item.id ? COLORS.primary : COLORS.placeholder}
            backgroundColor={
              chooseMenu === item.id ? COLORS.secondary : COLORS.background
            }>
            <Text
              medium
              fontSize={14}
              color={chooseMenu === item.id ? COLORS.primary : COLORS.placeholder}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
      <Block rowCenter spaceBetween padding={15} backgroundColor={COLORS.placeholder2}>
        <Text medium width={'85%'} fontSize={14} numberOfLines={1} color={'#333333'}>
          {category?.title}{' '}
          <Text medium fontSize={14} color={COLORS.placeholder}>
            ( {category?.arr_sub?.length} danh mục )
          </Text>
        </Text>
        <Text
          medium
          fontSize={14}
          color={COLORS.primary}
          onPress={() => setOpenModal(true)}>
          Chọn
        </Text>
      </Block>
    </Fragment>
  );
}
