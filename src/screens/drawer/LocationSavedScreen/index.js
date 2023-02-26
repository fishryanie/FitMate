/** @format */

import React, { useEffect } from 'react';
import router from '@routes/router';
import actions from 'store/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Block, HeaderTitle, Text, Image, Box, Icon, ListWrapper } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '@assets';
import { COLORS } from '@theme';
import { width } from '@utils/responsive';
import { commonRoot } from '@routes/Ref';
import { orderBy } from 'lodash';

export default function LocationSavedScreen({ route }) {
  const getSavedLocation = useSelector(state => state.getSavedLocation?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actions.GET_SAVED_LOCATION });
  }, [dispatch]);

  useEffect(() => {
    const item = getSavedLocation?.find(e => e.isDefault);
    if (!item) {
      dispatch({
        type: actions.UPDATE_SAVED_LOCATION,
        body: { ...getSavedLocation?.[0], isDefault: true },
        onSuccess: () => {
          dispatch({ type: actions.GET_SAVED_LOCATION });
        },
      });
    }
  }, [dispatch, getSavedLocation]);

  return (
    <Block flex>
      <HeaderTitle
        title="Vị trí đã lưu"
        canGoBack
        IconRight={
          <Icon
            iconSize={25}
            color={COLORS.light}
            IconType={MaterialIcons}
            iconName={'add-location-alt'}
          />
        }
        rightOnPress={() => {
          commonRoot.navigate(router.LOCATION_FORM_SCREEN, {
            title: 'Chỉnh sửa vị trí',
          });
        }}
      />
      <ListWrapper
        data={orderBy(getSavedLocation, ['is_default'], ['desc'])}
        VSeparator={10}
        safeAreaBottom
        emptyTitle="Bạn chưa có địa chỉ, hãy thêm ít nhất 1 địa chỉ"
        paddingHorizontal={15}
        paddingTopContent={15}
        renderItem={({ item }) => (
          <Box
            rowCenter
            padding={15}
            onPress={() =>
              commonRoot.navigate(router.LOCATION_FORM_SCREEN, {
                data: item,
                title: 'Chỉnh sửa vị trí',
              })
            }>
            <Block flex>
              <Block row>
                <Text flex semiBold fontSize={16} marginBottom={8} numberOfLines={2}>
                  <Image source={icons.ic_location} width={19} height={19} />
                  {'  '}
                  {item?.title}
                </Text>
                {item.is_default === '1' && (
                  <Block
                    radius={8}
                    height={20}
                    alignCenter
                    justifyCenter
                    paddingHorizontal={8}
                    backgroundColor={COLORS.transparentGreen}>
                    <Text regular fontSize={12} color={COLORS.yellowGreen}>
                      Mặc định
                    </Text>
                  </Block>
                )}
              </Block>
              <Text
                width={width / 1.3}
                numberOfLines={1}
                regular
                fontSize={16}
                color={COLORS.primary}>
                {item.full_address}
              </Text>
            </Block>
            <Icon
              color={COLORS.philippineGray}
              IconType={MaterialIcons}
              iconName="navigate-next"
              iconSize={25}
            />
          </Box>
        )}
      />
    </Block>
  );
}
