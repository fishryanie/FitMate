/** @format */

import React from 'react';
import { hs } from '@utils/responsive';
import { Block, Pressable } from '@components';
import { COLORS } from '@theme';

export default function Box({
  children,
  onPress,
  containerStyle,
  bgColor,
  ...contentStyle
}) {
  return (
    <Pressable
      radius={15}
      marginTop={10}
      marginLeft={8}
      style={containerStyle}
      onPress={onPress}
      backgroundColor={bgColor || COLORS.deepPurple50}>
      <Block
        radius={15}
        borderWidth={0.75}
        backgroundColor={COLORS.light}
        borderColor={COLORS.grey400}
        {...contentStyle}
        style={{ transform: [{ translateX: hs(-8) }, { translateY: hs(-8) }] }}>
        {children}
      </Block>
    </Pressable>
  );
}
