/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Block, Text, TextInput } from '@components';
import { COLORS, SIZES } from '@theme';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';
import { width } from '@utils/responsive';

const FormInput = ({
  name,
  control,
  placeholder,
  messageErr,
  inputProps,
  errProps,
  customInput,
  customerMessageErr,
  secureTextEntry,
  keyboardType,
  returnKeyType,
  maxLength,
  setRef,
  blurOnSubmit,
  onSubmitEditing,
  styles,
  label = '',
  require = false,
  fontSizeLabel = 14,
  labelProps,
  onEndEditing,
  renderIconLeft,
  renderIconRight,
  disabled,
  outline,
  color = COLORS.dark,
  ...containerProps
}) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });
  const { t } = useTranslation();
  const errorMessage = t(messageErr) || t(error?.message);
  const _renderMessageErr = () => {
    return (
      <Text {...errProps} marginTop={SIZES.normal} small color="red">
        {errorMessage}
      </Text>
    );
  };

  const _renderInputErr = () => {
    if (errorMessage) {
      return customerMessageErr
        ? customerMessageErr(_renderMessageErr)
        : _renderMessageErr();
    }
  };

  const labelOffset = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);

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

  useEffect(() => {
    Animated.timing(labelOffset, {
      duration: 150,
      toValue: isFocused || value ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isFocused, labelOffset, value]);

  const _renderInput = () => {
    return (
      <TextInput
        flex
        editable={disabled ? false : true}
        setRef={setRef}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles}
        onChangeText={onChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          onBlur();
          setIsFocused(false);
        }}
        value={value}
        placeholder={isFocused ? t(placeholder) : ''}
        blurOnSubmit={blurOnSubmit}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={onEndEditing}
        {...inputProps}
      />
    );
  };

  return (
    <Block {...containerProps}>
      <Block
        relative
        rowCenter
        height={45}
        radius={10}
        paddingLeft={15}
        paddingRight={5}
        borderWidth={outline ? 1 : 0}
        borderBottomWidth={outline ? 0 : 1}
        backgroundColor={disabled ? COLORS.grey300 : COLORS.transparent}
        borderColor={
          isFocused && errorMessage
            ? COLORS.red500
            : isFocused
            ? COLORS.primary
            : errorMessage
            ? COLORS.red500
            : COLORS.grey300
        }>
        {label.length > 0 && (
          <Animated.View
            style={[
              {
                marginLeft: renderIconLeft ? 35 : 10,
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
        {renderIconLeft && renderIconLeft}
        {_renderInput()}
        {renderIconRight && renderIconRight}
        {/* {customInput ? customInput(_renderInput) : _renderInput()} */}
      </Block>
      {_renderInputErr()}
    </Block>
  );
};

export default FormInput;
