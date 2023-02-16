/** @format */

import React, { useRef, useState } from 'react';
import { Block, Icon, StatusBar, Text, TextInput, TouchableOpacity } from '@components';
import { HEADER } from '@constants';
import { root } from '@routes/Ref';
import { COLORS, SIZES } from '@theme';
import { width } from '@utils/responsive';
import { Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Keyboard } from 'react-native';

export default function HeaderTitle({
  title,
  canGoBack,
  canSearch,
  onGoBack,
  backgroundColor = COLORS.primary,
  color = COLORS.light,
  colorIcon,
  containerProps,
  titleProps,
  IconRight,
  rightOnPress,
  barStyle,
  searchInput,
  ...props
}) {
  const _renderIconBack = opacity => {
    const _onGoBack = () => {
      if (opacity === 1) {
        onGoBack ? onGoBack() : root.goBack();
      }
    };

    return (
      (canGoBack || onGoBack) && (
        <TouchableOpacity opacity={opacity} onPress={_onGoBack}>
          <Icon IconType={AntDesign} iconName="arrowleft" iconSize={25} />
        </TouchableOpacity>
      )
    );
  };

  const _renderIconRight = () => {
    return IconRight ? (
      <TouchableOpacity onPress={rightOnPress} paddingHorizontal={SIZES.xSmall}>
        {IconRight}
      </TouchableOpacity>
    ) : (
      _renderIconBack(0)
    );
  };

  return (
    <Block width={width} {...props}>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      <Block
        rowCenter
        height={HEADER.height}
        paddingHorizontal={15}
        backgroundColor={backgroundColor}
        {...containerProps}>
        {_renderIconBack(1)}
        <Text
          flex
          center
          semiBold
          color={color}
          fontSize={HEADER.titleSize}
          numberOfLines={1}
          {...titleProps}>
          {title}
        </Text>
        {_renderIconRight()}
        {canSearch && <Search />}
      </Block>
    </Block>
  );
}

const Search = ({ setTextSearch, ...props }) => {
  const inputRef = useRef(null);
  const searchBarOfSet = useRef(new Animated.Value(0)).current;
  const [iconName, setIconName] = useState('ios-search');
  const [searchInput, setSearchInput] = useState('');

  const opacityAnimated = searchBarOfSet.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const widthAnimated = searchBarOfSet.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 85],
  });

  const handleToggle = () => {
    if (searchBarOfSet._value === 0) {
      Animated.timing(searchBarOfSet, {
        toValue: 1,
        duration: 250,
      }).start();
      inputRef.current.focus();
      setIconName('ios-close');
    } else {
      Animated.timing(searchBarOfSet, {
        toValue: 0,
        duration: 250,
      }).start();
      Keyboard.dismiss();
      setIconName('ios-search');
      setSearchInput('');
      setTextSearch && setTextSearch('');
    }
  };

  return (
    <Block absolute rowCenter right={15} backgroundColor={COLORS.light} {...props}>
      <Animated.View
        style={{
          width: widthAnimated,
          opacity: opacityAnimated,
        }}>
        <TextInput
          right={0}
          height={40}
          radius={10}
          marginRight={5}
          borderWidth={1}
          setRef={inputRef}
          value={searchInput}
          paddingHorizontal={15}
          placeholder="Tìm kiếm..."
          borderColor={COLORS.grey400}
          onChangeText={text => {
            setSearchInput(text);
            setTextSearch && setTextSearch(text);
          }}
        />
      </Animated.View>
      <TouchableOpacity onPress={handleToggle}>
        <Icon IconType={Ionicons} iconName={iconName} iconSize={25} />
      </TouchableOpacity>
    </Block>
  );
};
