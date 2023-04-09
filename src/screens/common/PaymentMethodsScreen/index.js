/** @format */

import React, { useEffect } from 'react';
import actions from '@store/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Block, HeaderTitle, Text, Box, Image, Pressable, Icon } from '@components';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { COLORS } from '@theme';
import { ICONS } from '@assets';

const PaymentMethodsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const getOrderMethod = useSelector(state => state.getOrderMethod?.data);

  const handleSelectMethod = () => {};

  useEffect(() => {
    dispatch({ type: actions.GET_ORDER_METHOD });
  }, [dispatch]);

  return (
    <Block flex>
      <HeaderTitle title={'Phương thức thanh toán'} canGoBack />
      <Block marginTop={15} paddingHorizontal={15}>
        <Box paddingHorizontal={15} paddingTop={15}>
          <Text semiBold fontSize={16} marginBottom={15}>
            Phương thức thanh toán khả dụng
          </Text>
          {getOrderMethod?.map((item, index) => (
            <Pressable
              rowCenter
              key={index}
              borderTopWidth={index === 0 ? 0 : 1}
              borderColor={COLORS.background}
              paddingVertical={15}
              onPress={handleSelectMethod}>
              <Image square={22} source={{ uri: item.icon }} />
              <Text regular fontSize={16} marginLeft={15}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </Box>
      </Block>
      <Pressable
        marginTop={15}
        marginHorizontal={15}
        onPress={() => {
          Toast.show({ type: 'success', text1: 'Chức năng chỉ dành cho quản trị viên' });
        }}>
        <Box padding={15} row alignCenter spaceBetween>
          <Block rowCenter>
            <Image source={ICONS.ic_add_green} width={18} height={18} />
            <Text regular fontSize={16} marginLeft={10} color={COLORS.green500}>
              Thêm phương thức thanh toán
            </Text>
          </Block>
          <Icon
            color={COLORS.philippineGray}
            IconType={MaterialIcons}
            iconName="navigate-next"
            iconSize={25}
          />
        </Box>
      </Pressable>
    </Block>
  );
};

export default PaymentMethodsScreen;
