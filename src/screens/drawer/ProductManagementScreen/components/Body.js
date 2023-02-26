/** @format */

import React, { useEffect } from 'react';
import actions, { _onUnmount } from 'store/actions';
import { ListWrapper, Block, Image, Text, EmptyData } from '@components';
import { shopCommonRoot } from '@navigation/navigationRef';
import { LOTTIES } from '@assets';
import { COLORS } from '@theme';
import { Switch } from 'react-native-switch';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { formatCurrency } from '@utils/helper';
import { commonRoot } from '@routes/Ref';
import router from '@routes/router';

export default function CustomBody({ setNewArr, listProducts, filter }) {
  const getStoreProduct = useSelector(state => state.getStoreProduct);
  const page = getStoreProduct?.data?.page;
  const totalPage = getStoreProduct?.data?.total_page;

  const dispatch = useDispatch();
  const handleLoadmore = () => {
    if (page < totalPage) {
      dispatch({
        type: actions.SHOP_GET_PRODUCT,
        params: {
          group_id: listProducts[0]?.group_id,
          tab: filter,
          p: +page + 1,
          numshow: 2,
        },
        onSuccess: res => {
          setNewArr(previous =>
            previous.filter(element => {
              if (element.group_text === res.group_text) {
                element.data = [...element.data, ...res.data];
              }
              return element;
            }),
          );
        },
      });
    }
  };

  useEffect(() => {
    // dispatch({type: _onUnmount(actions.SHOP_GET_PRODUCT)});
    return () => {
      dispatch({ type: _onUnmount(actions.SHOP_HIDE_PRODUCT) });
    };
  }, [dispatch]);

  return (
    <ListWrapper
      data={listProducts}
      marginTop={10}
      EmptyComponent={<EmptyData source={LOTTIES.empty_box} />}
      ListFooterComponent={
        <Text
          center
          regular
          underline
          fontSize={14}
          paddingTop={15}
          paddingBottom={5}
          color={COLORS.primary}
          onPress={handleLoadmore}>
          Xem thêm
        </Text>
      }
      renderItem={({ item, index }) => (
        <Block
          rowCenter
          spaceBetween
          paddingRight={5}
          paddingBottom={10}
          borderColor={COLORS.placeholder2}
          borderBottomWidth={index === listProducts?.length - 1 ? 0 : 1}>
          <Block rowCenter>
            <Image
              square={58}
              marginRight={5}
              source={{
                uri: item?.picture,
              }}
            />
            <Block paddingLeft={15}>
              <Text regular fontSize={14} marginBottom={3}>
                {item?.title}
              </Text>
              <Text regular fontSize={14} color={COLORS.placeholder}>
                {formatCurrency(item?.price)}
              </Text>
              <Text
                underline
                fontSize={14}
                marginTop={5}
                color={COLORS.primary}
                onPress={() => {
                  commonRoot.navigate(router.SHOP_FORM_PRODUCT_SCREEN, {
                    data: item,
                  });
                }}>
                Chỉnh sửa
              </Text>
            </Block>
          </Block>
          <Block alignEnd alignSelf={'flex-end'}>
            <Switch
              backgroundActive={COLORS.primary}
              backgroundInactive={COLORS.gray6}
              circleInActiveColor={COLORS.background}
              circleBorderActiveColor={COLORS.primary}
              circleBorderInactiveColor={COLORS.gray6}
              circleBorderWidth={1}
              circleSize={18}
              switchLeftPx={3}
              switchRightPx={3}
              activeText=""
              inActiveText=""
              value={+item?.is_show === 1 ? true : false}
              onValueChange={() => {
                dispatch({
                  type: actions.SHOP_HIDE_PRODUCT,
                  body: {
                    list_id: item.item_id,
                    is_hide: +item?.is_show === 1 ? 1 : 0,
                  },
                  onSuccess: res => {
                    Toast.show({
                      type: 'success',
                      text1: res.message,
                      text2: +item?.is_show === 1 ? 'Đã ẩn sản phẩm' : 'Đã hiện sản phẩm',
                    });
                  },
                });
              }}
            />
            <Text
              fontSize={14}
              marginTop={15}
              color={COLORS.primary}
              onPress={() => {
                commonRoot.navigate(router.SHOP_LIST_EXTRA_OPTION_SCREEN, {
                  data: item,
                });
              }}>
              {item?.arr_connect?.length} nhóm tuỳ chọn
            </Text>
          </Block>
        </Block>
      )}
    />
  );
}
