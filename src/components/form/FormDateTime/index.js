/** @format */

import { Block, Icon, Pressable, Text, DateTimePicker } from '@components';
import { COLORS } from '@theme';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FormDateTime({
  name,
  control,
  label = '',
  mode = 'date',
  outline,
  maximumDate,
  minimumDate,
  placeholder = 'DD/MM/YYYY',
  displayFormat = 'DD/MM/YYYY',
  disabled,
  textInputProps,
  labelProps,
  errorProps,
  pickerProps,
  messageErr,
  require = false,
  color = COLORS.dark,
  inputProps,
  ...containerProps
}) {
  const labelOffset = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });
  const { t } = useTranslation();
  const errorMessage = t(messageErr) || t(error?.message);

  const animatedStyles = {
    transform: [
      {
        translateY: labelOffset.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25],
        }),
      },
    ],
  };
  const showModal = () => {
    setModalVisible(true);
    setIsFocused(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setIsFocused(false);
    onBlur();
  };

  useEffect(() => {
    Animated.timing(labelOffset, {
      duration: 150,
      toValue: isFocused || value ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isFocused, labelOffset, value]);

  const _renderInput = () => {
    return (
      <Pressable
        disabled={disabled}
        onPress={showModal}
        relative
        rowCenter
        height={45}
        radius={10}
        paddingLeft={15}
        paddingRight={5}
        borderWidth={outline ? 1 : 0}
        backgroundColor={disabled ? COLORS.grey300 : COLORS.transparent}
        borderColor={
          isFocused && errorMessage
            ? COLORS.red500
            : isFocused
            ? COLORS.primary
            : errorMessage
            ? COLORS.red500
            : COLORS.grey300
        }
        {...inputProps}>
        {label.length > 0 && (
          <Animated.View
            style={[
              {
                marginLeft: 10,
                borderRadius: 5,
                position: 'absolute',
                paddingHorizontal: 5,
                backgroundColor: disabled ? COLORS.grey300 : COLORS.light,
              },
              animatedStyles,
            ]}>
            <Text
              regular
              fontSize={isFocused || value ? 12 : 14}
              color={
                isFocused && errorMessage
                  ? COLORS.red500
                  : isFocused
                  ? COLORS.primary
                  : errorMessage
                  ? COLORS.red500
                  : color
              }
              {...labelProps}>
              {t(label)}
              {require && <Text color={COLORS.red500}> *</Text>}
            </Text>
          </Animated.View>
        )}
        <Text
          regular
          fontSize={14}
          flex
          color={value ? COLORS.textColor : COLORS.placeholder}
          {...textInputProps}>
          {value ? moment(value).format(displayFormat) : isFocused ? placeholder : ''}
        </Text>
        <Icon
          right={15}
          absolute
          IconType={AntDesign}
          color={COLORS.gray2}
          iconName="calendar"
          ICONSize={20}
        />
      </Pressable>
    );
  };

  return (
    <Block {...containerProps}>
      {_renderInput()}
      {modalVisible && (
        <DateTimePicker
          onConfirm={onChange}
          onCancel={hideModal}
          date={value}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          mode={mode}
          {...pickerProps}
        />
      )}
      {error && (
        <Text color="red" fontSize={11} marginTop={2} {...errorProps}>
          {error.message}
        </Text>
      )}
    </Block>
  );
}
