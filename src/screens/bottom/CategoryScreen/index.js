/** @format */

import React, { useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrollView from '@components/base/ScrollView';
import { Block, Icon, ListWrapper, Pressable, Text } from '@components';
import { COLORS } from '@theme';
import { height, width } from '@responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import actions from 'store/actions';
import Carousel from 'react-native-snap-carousel';

export default function CategoryScreen() {
  const dispatch = useDispatch();
  const bigCategories = useSelector(state => state.getBigCategory);
  const smallCategories = useSelector(state => state.getSmallCategory);

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: actions.GET_CATEGORIES,
        onSuccess: res => {
          dispatch({
            type: actions.GET_CATEGORIES,
            params: { idParent: res._id },
            onSuccess: res => {
              dispatch({
                type: actions.GET_PRODUCT,
                params: { idCategory: res._id },
              });
            },
          });
        },
      });
    }, [dispatch, bigCategories?.data?.length, smallCategories?.data?.length]),
  );

  return (
    <Block flex row>
      <Aside data={bigCategories?.data} loading={bigCategories?.isLoading} />
      <Main data={smallCategories?.data} loading={smallCategories?.isLoading} />
    </Block>
  );
}

const Main = ({ data, loading }) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Block
      flex={4}
      height={height}
      paddingTop={top + 15}
      paddingLeft={25}
      backgroundColor={COLORS.light}>
      <Text bold fontSize={25} numberOfLines={2}>
        Select the product you want to buy
      </Text>
      <ListWrapper data={data} />
      <Carousel
        layout={'stack'}
        data={[1, 2, 3]}
        itemWidth={300}
        sliderWidth={300}
        itemHeight={height / 2}
        sliderHeight={height / 2}
        renderItem={({ item, index }) => (
          <Block height={height / 2} backgroundColor={'red'}>
            <Text>123</Text>
          </Block>
        )}
      />
    </Block>
  );
};

const Aside = ({ data, loading }) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Block
      width={width / 5}
      height={height}
      paddingTop={top + 15}
      backgroundColor={COLORS.primary}>
      <Icon
        flex
        iconSize={35}
        alignSelf={'center'}
        IconType={Ionicons}
        iconName="ios-menu-outline"
        color={COLORS.light}
      />
      <Block height={height / 1.6} spaceBetween marginBottom={bottom + 100}>
        <ScrollView>
          {data?.map(({ item, index }) => (
            <Pressable
              justifyCenter
              marginVertical={15}
              height={height / 10}
              width={'100%'}
              key={index}>
              <Text
                semiBold
                fontSize={16}
                color={COLORS.light}
                style={{
                  transform: [{ rotateZ: '-90deg' }],
                }}>
                phone
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Block>
    </Block>
  );
};
