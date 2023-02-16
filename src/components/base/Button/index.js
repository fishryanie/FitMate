/** @format */

import React from 'react';
import { COLORS, SIZES } from '@theme';
import { Pressable, Block, Text, TouchableOpacity } from '@components';
import { ActivityIndicator } from 'react-native';
const Button = ({
  title = '',
  onPress,
  loading,
  disabled,
  textProps,
  iconLeft,
  numberOfLines = 1,
  color = COLORS.light,
  ...containerProps
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      radius={15}
      padding={15}
      backgroundColor="dark"
      alignCenter
      justifyCenter
      disabled={loading || disabled}
      {...containerProps}
    >
      {loading ? (
        <ActivityIndicator size={SIZES.xLarge} color={color} />
      ) : (
        <Block rowCenter>
          {iconLeft && iconLeft}
          <Text h3 numberOfLines={numberOfLines} color={color} {...textProps}>
            {title}
          </Text>
        </Block>
      )}
    </TouchableOpacity>
  );
};

export default Button;
