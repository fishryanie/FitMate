/** @format */

import { Block, Pressable, Text } from '@components';
import { COLORS, SIZES } from '@theme';
import { width } from '@utils/responsive';
import React from 'react';

const RadioButton = ({
  data,
  value,
  onChangeValue,
  unCheckColor = 'smoke',
  borderColor = 'jet',
  checkedColor = 'primary',
  itemProps,
  labelProps,
  marginLeftItem = SIZES.medium,
  ...containerProps
}) => {
  const _renderItem = (item, index) => {
    return (
      <Pressable
        {...itemProps}
        key={index}
        marginLeft={index !== 0 ? marginLeftItem : 0}
        onPress={() => onChangeValue(item)}>
        <Block row alignCenter>
          <Block
            round={18}
            // backgroundColor={unCheckColor}
            alignCenter
            borderWidth={1}
            borderColor={borderColor}
            justifyCenter>
            {item.value === value && <Block round={12} backgroundColor={checkedColor} />}
          </Block>
          <Text {...labelProps} marginLeft={10}>
            {item.label}
          </Text>
        </Block>
      </Pressable>
    );
  };

  return (
    <Block {...containerProps} rowCenter>
      {data.map(_renderItem)}
    </Block>
  );
};

export default RadioButton;
