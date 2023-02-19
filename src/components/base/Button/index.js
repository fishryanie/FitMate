/** @format */

import React from 'react';
import { COLORS, SIZES } from '@theme';
import { Block, Text, TouchableOpacity } from '@components';
import { ActivityIndicator } from 'react-native';
const Button = ({
  title = '',
  onPress,
  loading,
  disabled,
  textProps,
  iconLeft,
  outline,
  height = 45,
  numberOfLines = 1,
  color = COLORS.light,
  backgroundColor = COLORS.primary,
  ...containerProps
}) => {
  return (
    <TouchableOpacity
      radius={15}
      onPress={onPress}
      height={height}
      alignCenter
      justifyCenter
      borderWidth={1}
      borderColor={backgroundColor}
      disabled={loading || disabled}
      backgroundColor={outline ? COLORS.transparent : backgroundColor}
      {...containerProps}>
      {loading ? (
        <ActivityIndicator size={SIZES.xLarge} color={color} />
      ) : (
        <Block rowCenter>
          {iconLeft && iconLeft}
          <Text
            medium
            numberOfLines={numberOfLines}
            color={outline ? backgroundColor : color}
            fontSize={16}
            {...textProps}>
            {title}
          </Text>
        </Block>
      )}
    </TouchableOpacity>
  );
};

export default Button;
