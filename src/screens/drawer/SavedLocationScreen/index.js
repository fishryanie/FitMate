import React, {useEffect} from 'react';
import router from '@navigation/router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Block,
  HeaderTitle,
  Text,
  Image,
  Box,
  Icon,
  Pressable,
  ListWrapper,
} from '@components';
import {icons} from '@assets';
import {COLORS} from '@theme';
import {width} from '@utils/responsive';
import {commonRoot} from '@navigation/navigationRef';
import {useDispatch, useSelector} from 'react-redux';
import {orderBy} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import actions from '@redux/actions';
const SavedLocationScreen = ({route}) => {
  const getLocation = useSelector(state => state.getSaveLocation?.data);

  const dispatch = useDispatch();
  useEffect(() => {
    const item = getLocation?.find(e => e.is_default === '1');
    if (!item) {
      dispatch({
        type: actions.UPDATE_SAVE_LOCATION,
        body: {...getLocation[0], is_default: '1'},
        onSuccess: () => {
          dispatch({type: actions.GET_SAVE_LOCATION});
        },
      });
    }
  }, [dispatch, getLocation]);

  return (
    <Block flex>
      <HeaderTitle title="Vị trí đã lưu" canGoBack />
      <ListWrapper
        data={orderBy(getLocation, ['is_default'], ['desc'])}
        VSeparator={10}
        safeAreaBottom
        emptyTitle="Bạn chưa có địa chỉ, hãy thêm ít nhất 1 địa chỉ"
        paddingHorizontal={15}
        paddingTopContent={15}
        renderItem={({item}) => (
          <Box
            rowCenter
            padding={15}
            onPress={() =>
              commonRoot.navigate(router.ADD_LOCATION_SCREEN, {
                data: item,
                title: 'Chỉnh sửa vị trí',
              })
            }>
            <Block flex>
              <Block row>
                <Text
                  flex
                  semiBold
                  fontSize={16}
                  marginBottom={8}
                  numberOfLines={2}>
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
        ListFooterComponent={
          <Box rowCenter padding={15} containerStyle={{marginTop: 40}}>
            <Pressable
              onPress={() => commonRoot.navigate(router.ADD_LOCATION_SCREEN)}
              rowCenter
              spaceBetween
              flex>
              <Block rowCenter>
                <Image source={icons.ic_add_green} width={18} height={18} />
                <Text regular fontSize={16} marginLeft={10} color={COLORS.text}>
                  Thêm vị trí mới
                </Text>
              </Block>
              <Icon
                color={COLORS.philippineGray}
                IconType={MaterialIcons}
                iconName="navigate-next"
                iconSize={25}
              />
            </Pressable>
          </Box>
        }
      />
    </Block>
  );
};

export default SavedLocationScreen;
