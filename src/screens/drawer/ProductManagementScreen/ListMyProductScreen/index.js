import React from 'react';
import {
  Block,
  EmptyData,
  HeaderTitle,
  Icon,
  Image,
  ListWrapper,
  Loading,
  Pressable,
  Text,
} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import actions, {_onUnmount} from '@redux/actions';
import {COLORS} from '@theme';
import {convertCurrency} from '@utils';
import {LOTTIES} from '@assets';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ShopListMyProductScreen({route}) {
  const option = route?.params?.option;
  const getStoreProduct = useSelector(state => state.getStoreProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: actions.SHOP_GET_PRODUCT});
    return () => {
      // dispatch({type: _onUnmount(actions.SHOP_GET_PRODUCT)});
    };
  }, [dispatch]);

  const handleRefesh = () => {};
  const handleLoadmore = () => {};
  return (
    <Block flex>
      {getStoreProduct?.isLoading && <Loading />}

      <HeaderTitle
        canGoBack
        title="Tất cả sản phẩm"
        color={COLORS.gray5}
        backgroundColor={COLORS.white}
      />
      <ListWrapper
        data={getStoreProduct?.data?.data}
        marginTop={5}
        VSeparator={5}
        safeAreaBottom
        paddingHorizontal={15}
        style={{flex: 1}}
        EmptyComponent={<EmptyData source={LOTTIES.empty_box} />}
        renderItem={({item, index}) => {
          let isConnect = item.arr_connect.findIndex(
            x => x.option_id === option.group_id,
          );
          const handleConnectExtraOptions = () => {
            dispatch({
              type: actions.SHOP_CONNECT_EXTRA_OPTION,
              body: {
                product_id: item.item_id,
                option_id: option.group_id,
                action: isConnect === -1 ? 'connect' : 'disconnect',
              },
              onSuccess: res => {
                dispatch({type: actions.SHOP_GET_EXTRA_OPTION});
                dispatch({type: actions.SHOP_GET_PRODUCT});
                Toast.show({
                  type: 'success',
                  text1: res.message,
                });
              },
            });
          };
          return (
            <Pressable
              radius={5}
              rowCenter
              spaceBetween
              paddingRight={5}
              borderColor={COLORS.placeholder2}
              backgroundColor={COLORS.white}
              borderBottomWidth={
                index === getStoreProduct?.data?.data?.length - 1 ? 0 : 1
              }>
              <Block flex rowCenter padding={5}>
                <Image
                  resizeMode="stretch"
                  square={58}
                  source={{
                    uri: item?.picture,
                  }}
                />
                <Block flex paddingLeft={15}>
                  <Text regular fontSize={14} marginBottom={5}>
                    {item?.title}
                  </Text>
                  <Text regular fontSize={14} color={COLORS.placeholder}>
                    {convertCurrency(item?.price)}
                  </Text>
                </Block>
              </Block>
              <Pressable rowCenter alignEnd onPress={handleConnectExtraOptions}>
                <Text
                  medium
                  fontSize={14}
                  color={isConnect === -1 ? COLORS.primary : COLORS.orange}>
                  {isConnect === -1 ? 'Liên kết' : 'Huỷ liên kết'}
                </Text>
                <Icon
                  iconSize={17}
                  marginLeft={10}
                  IconType={Entypo}
                  iconName="link"
                  color={isConnect === -1 ? COLORS.primary : COLORS.orange}
                />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </Block>
  );
}
