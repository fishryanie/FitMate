import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Block,
  HeaderTitle,
  Icon,
  ListWrapper,
  Loading,
  Pressable,
  Text,
} from '@components';
import {useSelector} from 'react-redux';
import {COLORS} from '@theme';
import {useDispatch} from 'react-redux';
import actions from '@redux/actions';
import Toast from 'react-native-toast-message';

export default function ListExtraOptionsScreen({route}) {
  const data = route?.params?.data;
  const getExtraOptions = useSelector(state => state.getExtraOptions?.data);
  const isLoading = useSelector(state => state.connectExtraOptions.isLoading);
  const dispatch = useDispatch();

  const RenderItem = ({item, index}) => {
    let isConnect = data.arr_connect.findIndex(
      x => x.option_id === item.group_id,
    );
    const handleConnectExtraOptions = () => {
      dispatch({
        type: actions.SHOP_CONNECT_EXTRA_OPTION,
        body: {
          product_id: data.item_id,
          option_id: item.group_id,
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
      <Pressable padding={15} backgroundColor={COLORS.white}>
        <Block rowCenter spaceBetween>
          <Text flex semiBold fontSize={16} color={COLORS.orange}>
            {item?.title}
          </Text>
          <Pressable rowCenter onPress={handleConnectExtraOptions}>
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
        </Block>
        {item?.arr_option?.length > 0 && (
          <Text
            medium
            fontSize={14}
            marginTop={10}
            numberOfLines={2}
            color={COLORS.placeholder}>
            {item?.arr_option?.map(e => e.title).join(', ')}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <Block flex>
      {isLoading && <Loading />}
      <HeaderTitle
        canGoBack
        color={COLORS.black}
        backgroundColor={COLORS.white}
        title={'Nhóm tùy chọn của ' + data.title}
      />
      <ListWrapper
        safeAreaBottom
        VSeparator={1}
        data={getExtraOptions}
        renderItem={RenderItem}
        containerProps={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <Text medium fontSize={14} padding={15} color={'#333333'}>
            Bạn có 1 nhóm tuỳ chọn
          </Text>
        }
      />
    </Block>
  );
}
