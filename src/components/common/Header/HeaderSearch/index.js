/** @format */

import { Block, Icon, Pressable, StatusBar, Text, TextInput } from '@components';
import { HEADER } from '@constants';
import { commonRoot, root } from '@routes/Ref';
import { SIZES } from '@theme';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Image, StyleSheet } from 'react-native';
import { ICONS } from '@assets';
import { getSize } from '@utils/responsive';
import { COLORS } from '@theme';
import router from '@routes/router';
import { useDispatch, useSelector } from 'react-redux';
import actions, { _onUnmount } from 'store/actions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { t } from 'i18next';

const HeaderSearch = ({
  title,
  backgroundColor,
  color = 'white',
  barStyle,
  goBack = false,
  onGoBack,
  onChangeText,
}) => {
  const listItemCart = useSelector(state => state.addToCart);

  const [textSearch, setTextSearch] = useState('');

  const _renderIconBack = () => {
    const _onGoBack = () => {
      onGoBack ? onGoBack() : root.goBack();
    };

    return (
      <Pressable paddingRight={SIZES.xSmall} onPress={_onGoBack}>
        <Icon IconType={Ionicons} iconName="chevron-back" ICONSize={30} color={color} />
      </Pressable>
    );
  };

  const _renderIconRight = () => {
    return (
      <Pressable
        style={styles.icRight}
        onPress={() => {
          commonRoot.navigate(router.FILTER_SCREEN);
        }}
        paddingHorizontal={SIZES.xSmall}>
        <Image source={ICONS.ic_filter} width={34} height={28} />
        {listItemCart?.food?.length > 0 && (
          <Block
            absolute
            backgroundColor={COLORS.red}
            width={15}
            height={15}
            right={3}
            alignCenter
            justifyCenter
            radius={9}
            top={20}
            alignSelfEnd>
            <Text fontSize={10} color={COLORS.white} bold>
              {listItemCart?.food?.length || 0}
            </Text>
          </Block>
        )}
      </Pressable>
    );
  };

  return (
    <Block>
      <StatusBar
        backgroundColor={backgroundColor ? backgroundColor : 'primary'}
        barStyle={barStyle}
      />
      <Block
        row
        alignCenter
        height={HEADER.height}
        padding={SIZES.medium}
        backgroundColor={backgroundColor ? backgroundColor : 'primary'}>
        {(goBack || onGoBack) && _renderIconBack()}
        <Block
          flex={1}
          radius={5}
          height={38}
          paddingHorizontal={10}
          marginHorizontal={5}
          rowCenter
          backgroundColor={'white'}>
          {textSearch.length <= 0 && (
            <Block width={40} height={45} justifyCenter alignCenter>
              <Icon
                IconType={AntDesign}
                iconName="search1"
                iconColor={COLORS.gray}
                ICONSize={20}
              />
            </Block>
          )}

          <TextInput
            onChangeText={text => {
              setTextSearch(text);
              onChangeText?.(text);
            }}
            placeholder={t('jobScreen.searchPlaceholder')}
            placeholderTextColor={COLORS.buttonDisable}
            value={textSearch}
            // placeholder={title}
            flex
            // placeholderTextColor={'black'}
          />
          {/* <Image source={ICONS.ic_search} /> */}
        </Block>
        {_renderIconRight()}
      </Block>
    </Block>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  icRight: {
    height: getSize.vs(38),
    width: getSize.vs(38),
    backgroundColor: COLORS.orange1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 5,
  },
});
