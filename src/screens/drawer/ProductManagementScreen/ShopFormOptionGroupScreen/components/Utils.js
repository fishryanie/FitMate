import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Block, Icon, Text} from '@components';
import {COLORS} from '@theme';
import {width} from '@utils/responsive';

export const Hr = () => (
  <Block height={6} width={width} backgroundColor={COLORS.cultured} />
);

export const RenderHeader = ({title}) => (
  <Block
    padding={15}
    marginTop={6}
    borderBottomWidth={1}
    backgroundColor={COLORS.white}
    borderColor={COLORS.placeholder2}>
    <Text bold fontSize={16} color={COLORS.black}>
      {title}
    </Text>
  </Block>
);

export const RenderInput = renderInput => (
  <Block
    rowCenter
    radius={5}
    paddingLeft={10}
    borderWidth={0.25}
    backgroundColor={COLORS.white}
    borderColor={COLORS.placeholder}>
    {renderInput()}
  </Block>
);

export const RenderLable = (label, watch, maxlength) => () => {
  return (
    <Block rowCenter spaceBetween marginBottom={10}>
      <Text regular fontSize={14}>
        {label}
      </Text>
      <Text regular fontSize={13} color={COLORS.placeholder}>
        {watch?.length || 0}/{maxlength}
      </Text>
    </Block>
  );
};

export const RenderNote = ({watchRequired, watchQuantity, optionList}) => {
  return watchRequired === 1 && watchQuantity === 1 ? (
    <Block
      rowCenter
      padding={15}
      marginVertical={20}
      backgroundColor={COLORS.secondary}>
      <Icon IconType={Ionicons} iconName={'ios-information-circle-outline'} />
      <Text fontSize={14} marginLeft={10}>
        Có nghĩa khách hàng phải chọn <Text bold>1 tuỳ chọn</Text>
      </Text>
    </Block>
  ) : watchRequired === 1 && watchQuantity === 0 ? (
    <Block
      rowCenter
      padding={15}
      marginVertical={20}
      backgroundColor={COLORS.secondary}>
      <Icon IconType={Ionicons} iconName={'ios-information-circle-outline'} />

      <Text fontSize={14} marginLeft={10}>
        Có nghĩa khách hàng phải chọn <Text bold>ít nhất 1</Text> và
        <Text bold>không quá {optionList.length}</Text> tuỳ chọn
      </Text>
    </Block>
  ) : watchRequired === 0 && watchQuantity === 1 ? (
    <Block
      rowCenter
      padding={15}
      marginVertical={20}
      backgroundColor={COLORS.secondary}>
      <Icon IconType={Ionicons} iconName={'ios-information-circle-outline'} />
      <Text fontSize={14} marginLeft={10}>
        Có nghĩa tuỳ chọn này là <Text bold>không bắt buộc</Text> và khách hàng
        của bạn <Text bold>có thể chọn duy nhất 1 tuỳ chọn</Text>
      </Text>
    </Block>
  ) : watchRequired === 0 && watchQuantity === 0 ? (
    <Block
      rowCenter
      padding={15}
      marginVertical={20}
      backgroundColor={COLORS.secondary}>
      <Icon IconType={Ionicons} iconName={'ios-information-circle-outline'} />
      <Text fontSize={14} marginLeft={10}>
        Có nghĩa khách hàng có thể chọn{' '}
        <Text bold>tối đa {optionList.length}</Text> tuỳ chọn
      </Text>
    </Block>
  ) : null;
};
