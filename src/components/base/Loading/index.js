/** @format */

import React from 'react';
import { Block } from '@components';
import { COLORS } from '@theme';
import { ActivityIndicator } from 'react-native';

const Loading = ({
  width = 250,
  height = 250,
  containerProps,
  backgroundColor = 'rgba(0,0,0,0.2)',
}) => {
  return (
    <Block
      absoluteFillObject
      zIndex={99}
      justifyCenter
      alignCenter
      backgroundColor={backgroundColor}
      {...containerProps}>
      <Block shadow3 alignCenter justifyCenter height={70} width={70} radius={5}>
        <ActivityIndicator size={30} color={COLORS.light} />
      </Block>
    </Block>
  );
};

export default Loading;
