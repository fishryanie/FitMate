import {Platform} from 'react-native';
import {Block, Modal} from '@components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CalendarPicker from 'react-native-calendar-picker';
import React, {useEffect, useState} from 'react';
import {COLORS} from '@theme';
import moment from 'moment';

const listWeek = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const listMonth = [
  'January',
  'Febraury',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function SelectMultiDate({
  openModel,
  setOpenModel,
  setMultiDate,
}) {
  const {bottom} = useSafeAreaInsets();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date, type) => {
    const customDate = moment(date).format('DD/MM/YY');
    if (type === 'END_DATE') {
      setEndDate(customDate);
    } else {
      setStartDate(customDate);
      setEndDate(null);
    }
  };

  useEffect(() => {
    setMultiDate(
      !startDate && !endDate
        ? '-- Select date --'
        : startDate + ' - ' + endDate,
    );
  }, [startDate, endDate]);
  return (
    <Modal isVisible={openModel} onBackdropPress={() => setOpenModel(false)}>
      <Block
        borderTopRadius={15}
        padding={15}
        backgroundColor={COLORS.white}
        paddingBottom={Platform.OS === 'ios' ? bottom : bottom + 10}>
        <CalendarPicker
          onDateChange={handleDateChange}
          allowRangeSelection={true}
          startFromMonday={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={listWeek}
          months={listMonth}
          previousTitle="Previous"
          nextTitle="Next"
          todayTextStyle={{color: COLORS.black}}
          todayBackgroundColor={'#FFF8B8'}
          selectedDayColor={COLORS.primary}
          selectedDayTextColor={COLORS.white}
          scaleFactor={375}
        />
      </Block>
    </Modal>
  );
}
