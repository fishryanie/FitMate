import {Block} from '@components';
import {COLORS} from '@theme';
import {hs, mhs, width, height} from '@utils/responsive';
import React from 'react';
import {Animated} from 'react-native';

const Dot = ({data, scrollX}) => {
  return (
    <Block
      style={{alignItems: height > 680 ? 'flex-start' : 'center'}}
      justifyCenter
      row
      height={64}>
      {data?.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [mhs(10), mhs(40), mhs(10)],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#b3b3b3', COLORS.yellow, '#b3b3b3'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={{
              width: dotWidth,
              height: hs(10),
              borderRadius: mhs(5),
              marginHorizontal: mhs(10),
              backgroundColor: backgroundColor,
            }}
          />
        );
      })}
    </Block>
  );
};
export default Dot;
