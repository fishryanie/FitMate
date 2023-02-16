import {Block} from '@components';
import {COLORS} from '@theme';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {BallIndicator} from 'react-native-indicators';

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
      <Block
        shadow3
        alignCenter
        justifyCenter
        height={70}
        width={70}
        radius={5}
        backgroundColor="white">
        <BallIndicator size={30} color={COLORS.red} />
      </Block>
    </Block>
  );
};

export default Loading;
