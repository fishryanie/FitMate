/** @format */

import React from 'react';
import { COLORS, SIZES } from '@theme';
import { Block, Pressable, Text } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import { width } from '@utils/responsive';

export default function BottomButton({
  title = '',
  onPress,
  disabled,
  loading = false,
  color = COLORS.light,
  backgroundColor = COLORS.primary,
  children,
  ...containerProps
}) {
  const { bottom } = useSafeAreaInsets();
  return (
    <Block
      absolute
      shadow3
      bottom={0}
      zIndex={99}
      padding={15}
      width={width}
      alignSelfCenter
      paddingBottom={bottom === 0 ? 10 : bottom}
      backgroundColor={COLORS.light}>
      {children}
      <Pressable
        flex
        justifyCenter
        alignCenter
        radius={15}
        padding={15}
        onPress={onPress}
        backgroundColor={backgroundColor}
        disabled={loading || disabled}
        {...containerProps}>
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <Text bold fontSize={18} color={color}>
            {title}
          </Text>
        )}
      </Pressable>
    </Block>
  );
}
