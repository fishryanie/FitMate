/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import actions from 'store/actions';
import { Block, Button, CustomDialog, Modal, Text } from '@components';
import { COLORS } from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { root } from '@navigation/navigationRef';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
export default function Footer({ extraOption, listOption, handleSubmit }) {
  const { bottom } = useSafeAreaInsets();

  const [typeSubmit, setTypeSubmit] = useState();
  const [confirm, setConfirm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const getDataBody = value => {
    return {
      title: value.groupName,
      quantity: value.quantity,
      is_required: value.isRequired,
      max_choose: value.min,
      min_choose: value.max,
      arr_option: JSON.stringify(listOption),
    };
  };

  const handleDelete = () => {
    setConfirm(false);
    setOpenModal(true);
    setTypeSubmit('DELETE');
  };

  const handleSave = handleSubmit(value => {
    console.log('123');
    setConfirm(false);
    setOpenModal(true);
    setTypeSubmit('SAVE');
    setData(getDataBody(value));
  });

  const handleUpdate = handleSubmit(value => {
    setConfirm(false);
    setOpenModal(true);
    setTypeSubmit('UPDATE');
    let data = getDataBody(value);
    if (data) {
      data['group_id'] = extraOption?.group_id;
    }
    setData(data);
  });

  useEffect(() => {
    if (confirm && typeSubmit) {
      dispatch({
        type:
          typeSubmit === 'SAVE'
            ? actions.SHOP_SAVE_EXTRA_OPTION
            : typeSubmit === 'UPDATE'
            ? actions.SHOP_UPDATE_EXTRA_OPTION
            : typeSubmit === 'DELETE'
            ? actions.SHOP_DELETE_EXTRA_OPTION
            : null,
        body: data,
        params: { group_id: extraOption?.group_id },
        onSuccess: res => {
          root.goBack();
          setConfirm(false);
          setOpenModal(false);
          setTypeSubmit(false);
          Toast.show({ type: 'success', text1: res.message });
          dispatch({ type: actions.SHOP_GET_EXTRA_OPTION });
        },
        onFail: err => {
          setConfirm(false);
          setOpenModal(false);
          setTypeSubmit(false);
          Toast.show({ type: 'error', text1: err.message });
        },
      });
    }
  }, [dispatch, confirm, typeSubmit]);

  return (
    <Fragment>
      <Block
        row
        absolute
        shadow3
        bottom={0}
        paddingTop={10}
        alignSelf={'flex-end'}
        paddingBottom={bottom === 0 ? 10 : bottom}
        backgroundColor={COLORS.white}>
        {extraOption && (
          <Button
            flex
            title="Xoá"
            backgroundColor="red"
            onPress={handleDelete}
            marginRight={10}
          />
        )}
        <Button
          flex
          title={extraOption ? 'Sửa' : 'Lưu'}
          onPress={extraOption ? handleUpdate : handleSave}
          marginLeft={extraOption ? 5 : 0}
        />
      </Block>
      <Confirm
        open={openModal}
        setConfirm={setConfirm}
        setOpen={setOpenModal}
        typeSubmit={typeSubmit}
      />
    </Fragment>
  );
}

const Confirm = ({ open, setOpen, setConfirm, isLoading, typeSubmit }) => (
  <Modal isVisible={open} position="center">
    <Block radius={10} padding={15} margin={15} backgroundColor={COLORS.white}>
      <Text center semiBold large marginTop={15}>
        Bạn có chắc chắn muốn {typeSubmit} sản phẩm này không ?
      </Text>
      <Block rowCenter marginTop={35}>
        <Button
          flex
          title="Đóng"
          borderWidth={1}
          color={COLORS.black}
          borderColor={COLORS.placeholder}
          backgroundColor={COLORS.white}
          onPress={() => setOpen(false)}
        />
        <Button
          flex
          title="Xác nhận"
          isLoading={isLoading}
          onPress={() => {
            setConfirm(true);
          }}
        />
      </Block>
    </Block>
  </Modal>
);
