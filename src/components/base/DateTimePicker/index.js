/** @format */

import { Block, Modal, Pressable, Text } from '@components';
import { COLORS } from '@theme';
import React, { useState } from 'react';
// import DTPicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import { Platform } from 'react-native';

const DateTimePicker = ({
  maximumDate,
  minimumDate,
  mode,
  onCancel,
  onConfirm,
  date,
  ...pickerProps
}) => {
  const [_date, setDate] = useState(date || new Date());

  return (
    <DatePicker
      mode={mode}
      modal
      date={_date}
      open={true}
      onConfirm={d => {
        onConfirm(d);
        onCancel(false);
      }}
      onDateChange={(_, v) => {
        setDate(v);
      }}
      onCancel={onCancel}
      cancelText={'Hủy'}
      confirmText={'Xác nhận'}
      title={'Chọn ngày'}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      {...pickerProps}
    />
  );
};

export default DateTimePicker;
