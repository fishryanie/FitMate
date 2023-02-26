/** @format */

import React, { useState } from 'react';
import actions from 'store/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Block, Button, Icon, Modal, Pressable, Text } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@theme';
import { useDispatch } from 'react-redux';

export default function ModalChangeStatus({ product, open, setOpen }) {
  const { bottom } = useSafeAreaInsets();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getItem, setItem] = useState();

  const dispatch = useDispatch();

  const handleConfirm = () => {
    setIsLoading(true);
    dispatch({
      type: getItem.action,
      body: '',
      onSuccess: res => {
        setOpen(false);
        setIsLoading(false);
        // CustomToast(res.message);
      },
      onFail: err => {
        setOpen(false);
        setIsLoading(false);
        // CustomToast(err.message);
      },
    });
  };

  const Confirm = () => (
    <Modal position="center" isVisible={openConfirm}>
      <Block radius={10} padding={15} margin={15} backgroundColor={COLORS.white}>
        <Text bold large center marginTop={10}>
          Bạn có đồng ý
        </Text>
        <Block rowCenter marginTop={40}>
          <Button
            flex
            title="Huỷ"
            marginRight={5}
            onPress={() => setOpenConfirm(false)}
            backgroundColor={COLORS.placeholder}
          />
          <Button
            flex
            title="Xác nhận"
            marginLeft={5}
            loading={isLoading}
            onPress={handleConfirm}
          />
        </Block>
      </Block>
    </Modal>
  );
  return (
    <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
      <Block radius={20} backgroundColor={COLORS.white} paddingBottom={bottom}>
        {data.map((item, index) => (
          <Pressable
            key={index}
            rowCenter
            spaceBetween
            padding={15}
            onPress={() => {
              setItem(item);
              setOpenConfirm(true);
            }}
            paddingTop={index === 0 ? 20 : null}>
            <Block flex>
              <Text medium fontSize={16} marginBottom={7}>
                {item.title}
              </Text>
              <Text regular fontSize={14} color={COLORS.gray5}>
                {item.desc}
              </Text>
            </Block>
            <Icon
              IconType={MaterialIcons}
              iconName={'keyboard-arrow-right'}
              color={COLORS.gray5}
              iconSize={25}
            />
          </Pressable>
        ))}
      </Block>
      <Confirm />
    </Modal>
  );
}

const data = [
  {
    id: 1,
    title: 'Tạm ẩn',
    desc: 'Sản phẩm sẽ không hiện với người mua hàng',
    action: actions.SHOP_HIDE_PRODUCT,
  },
  {
    id: 2,
    title: 'Hết hàng',
    desc: 'Thông báo với khách hàng sản phẩm đã hết',
    action: actions.SHOP_HIDE_PRODUCT,
  },
  {
    id: 3,
    title: 'Nháp',
    desc: 'Chuyển sản phẩm vào danh sách nháp',
    action: actions.SHOP_HIDE_PRODUCT,
  },
];
