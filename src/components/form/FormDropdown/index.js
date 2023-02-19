/** @format */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { hs, width } from '@utils/responsive';
import { Block, Image, Pressable, Text, Box, TextInput, Icon } from '@components';
import { COLORS, FONTS } from '@theme';

import { useController } from 'react-hook-form';

import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function FormDropdown({
  containerStyle,
  require,
  name,
  label,
  onSelectItem,
  labelProps,
  style = styles.dropStyle,
  textStyle = styles.dropTextStyle,
  labelStyle = styles.dropLabelStyle,
  dropDownContainerStyle = styles.dropDownContainerStyle,
  placeholderStyle = styles.placeholderStyle,
  control,
  listItems,
  onChageCustom,
  placeholder = 'Chọn',
  dropdownPickerProps,
  errorProps,
}) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });
  const [open, setOpen] = useState(false);

  return (
    <Block zIndex={100} {...containerStyle}>
      {label?.length > 0 && (
        <Text fontSize={15} semiBold {...labelProps}>
          {`${label}`}
          {require && <Text color={'red'}> *</Text>}
        </Text>
      )}
      <DropDownPicker
        zIndex={1000}
        dropDownDirection="BOTTOM"
        open={open}
        defaultValue={value}
        value={value}
        ArrowDownIconComponent={() => (
          <Icon
            color={COLORS.philippineGray}
            IconType={MaterialIcons}
            iconName="keyboard-arrow-down"
            iconSize={25}
          />
        )}
        ArrowUpIconComponent={() => (
          <Icon
            color={COLORS.philippineGray}
            IconType={MaterialIcons}
            iconName="keyboard-arrow-up"
            iconSize={25}
          />
        )}
        onSelectItem={onSelectItem}
        items={listItems}
        placeholder={placeholder}
        setOpen={setOpen}
        onChangeValue={_v => {
          onChageCustom && onChageCustom(_v);
        }}
        setValue={onChange}
        placeholderStyle={placeholderStyle}
        style={style}
        textStyle={textStyle}
        labelStyle={labelStyle}
        dropDownContainerStyle={dropDownContainerStyle}
        {...dropdownPickerProps}
      />
      {error && (
        <Text color="red" fontSize={11} marginTop={2} {...errorProps}>
          {error.message}
        </Text>
      )}
    </Block>
  );
}
const styles = StyleSheet.create({
  dropStyle: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    borderColor: COLORS.borderBottom,
    minHeight: 40,
  },
  dropTextStyle: {
    fontSize: 14,
    color: COLORS.philippineGray,
    fontFamily: FONTS.regular,
  },
  dropLabelStyle: {
    color: COLORS.black,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  dropDownContainerStyle: {
    backgroundColor: COLORS.light,
    borderWidth: 0.5,
    borderColor: COLORS.borderBottom,
    zIndex: 1000,
  },
  placeholderStyle: {
    color: COLORS.philippineGray,
  },
});
