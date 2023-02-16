/** @format */

import React from 'react';
import { Block } from '@components';
import { COLORS } from '@theme';
import { StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatusBar = ({ barStyle = 'light-content', backgroundColor = COLORS.primary, ...props }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Block>
      <RNStatusBar barStyle={barStyle} {...props} backgroundColor={COLORS[backgroundColor] || backgroundColor} />
      <Block style={{ height: top }} backgroundColor={backgroundColor} />
    </Block>
  );
};

export default StatusBar;
