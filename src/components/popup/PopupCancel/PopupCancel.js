/** @format */

import React, { memo, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Block, Button, Modal, Text, TextInput } from '@components';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSelector } from 'react-redux';
import { COLORS } from '@theme';

const PopupCancel = ({ isOpen, setOpen, onPress, loadingPress }) => {
  const getOrderCancelReasons = useSelector(state => state.getOrderCancelReasons?.data);
  const [textReasons, setTextReasons] = useState('');
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getOrderCancelReasons);

  const handlePress = () => {
    if (!value) {
      return Toast.show({ type: 'error', text1: 'Vui lòng chọn lý do huỷ đơn' });
    }
    if (textReasons?.length > 200) {
      return;
    }
    onPress();
  };

  return (
    <Modal position="center" isVisible={isOpen} onBackdropPress={() => setOpen(false)}>
      <Block radius={15} padding={15} margin={15} backgroundColor={COLORS.white}>
        <Text center bold fontSize={16} marginVertical={10}>
          Xác nhận huỷ đơn hàng
        </Text>
        <Text medium fontSize={14} marginVertical={10}>
          Chọn 1 lý do để huỷ
        </Text>
        <DropDownPicker
          open={openPicker}
          value={value}
          items={items || []}
          setOpen={setOpenPicker}
          setValue={setValue}
          setItems={setItems}
          placeholder="Chọn lý do huỷ"
          placeholderStyle={{ color: COLORS.placeholder }}
          style={{ borderColor: COLORS.gray3, borderRadius: 10 }}
          dropDownContainerStyle={{ borderColor: COLORS.gray3 }}
        />
        <Block rowCenter spaceBetween marginTop={15} marginBottom={10}>
          <Text medium fontSize={14}>
            Ghi chú
          </Text>
          <Block>
            <Text color={textReasons?.length > 200 && 'red'}>{`${textReasons?.length}/200`}</Text>
          </Block>
        </Block>

        <TextInput
          radius={10}
          height={120}
          padding={15}
          borderWidth={1}
          multiline
          textAlignVertical={'top'}
          value={textReasons.toString()}
          borderColor={COLORS.gray3}
          onChangeText={setTextReasons}
          placeholder="Nhập ghi chú nếu có"
        />
        {textReasons?.length > 200 && (
          <Text fontSize={12} regular color={'red'} marginTop={5}>
            Ghi chú nhập tối đa 200 ký tự
          </Text>
        )}
        <Block row marginTop={25} backgroundColor={COLORS.white}>
          <Button
            flex
            title="Hủy"
            marginHorizontal={0}
            marginRight={15}
            backgroundColor={COLORS.red}
            onPress={() => setOpen(false)}
          />
          <Button flex title="Xác nhận" loading={loadingPress} marginHorizontal={0} onPress={handlePress} />
        </Block>
      </Block>
    </Modal>
  );
};

export default memo(PopupCancel);
