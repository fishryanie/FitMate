/** @format */

import { Block, BottomButton, Icon, ListWrapper, Pressable, Text } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@theme';
import Entypo from 'react-native-vector-icons/Entypo';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '@redux/actions';
import router from '@routes/router';
import { commonRoot } from '@routes/Ref';

export default function GroupOption() {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();

  const getExtraOptions = useSelector(state => state.getExtraOptions?.data);

  useEffect(() => {
    dispatch({ type: actions.SHOP_GET_EXTRA_OPTION });
  }, [dispatch]);

  const RenderItem = ({ item, index }) => {
    return (
      <Pressable
        rowCenter
        spaceBetween
        padding={15}
        marginBottom={index === getExtraOptions.length - 1 ? bottom + 110 : 0}
        marginVertical={-5.5}
        backgroundColor={COLORS.white}
        onPress={() => {
          commonRoot.navigate(router.SHOP_FORM_GROUP_OPTION_SCREEN, {
            data: item,
          });
        }}>
        <Block flex column spaceAround>
          <Text semiBold fontSize={16} marginBottom={5} color={COLORS.orange}>
            {item?.title}
          </Text>
          {item?.arr_option?.length > 0 && (
            <Text
              medium
              fontSize={14}
              numberOfLines={2}
              marginBottom={5}
              color={COLORS.placeholder}>
              {item?.arr_option?.map(e => e.title).join(', ')}
            </Text>
          )}

          <Block rowCenter>
            <Text medium fontSize={14} color={COLORS.primary}>
              Chỉnh sửa
            </Text>
            <Pressable
              flex
              rowCenter
              justifyEnd
              onPress={() =>
                commonRoot.navigate(router.SHOP_LIST_MY_PRODUCT, {
                  option: item,
                })
              }>
              <Text medium fontSize={14} color={COLORS.primary}>
                Liên kết với {item?.count_connect} sản phẩm
              </Text>
              <Icon
                iconSize={17}
                marginLeft={10}
                IconType={Entypo}
                iconName="link"
                color={COLORS.primary}
              />
            </Pressable>
          </Block>
        </Block>
      </Pressable>
    );
  };

  return (
    <Block flex>
      <Block padding={15}>
        <Text medium fontSize={14} color={'#333333'}>
          Bạn có 1 nhóm tuỳ chọn
        </Text>
      </Block>

      <ListWrapper
        data={getExtraOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderItem}
      />

      <BottomButton
        title="Tạo nhóm tuỳ chọn"
        onPress={() => {
          commonRoot.navigate(router.SHOP_FORM_GROUP_OPTION_SCREEN);
        }}
      />
    </Block>
  );
}
