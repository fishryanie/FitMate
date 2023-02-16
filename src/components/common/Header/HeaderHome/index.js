import {
  Block,
  Icon,
  Image,
  Pressable,
  StatusBar,
  Text,
  UserAvatar,
} from '@components';
import {commonRoot} from '@routes/Ref';
import router from '@routes/router';
import actions from '@redux/actions';
import {COLORS} from '@theme';
import React, {useEffect, useState} from 'react';
import IonICONS from 'react-native-vector-icons/IonICONS';
import {IMAGES} from '@assets';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
const HeaderHome = () => {
  const dispatch = useDispatch();
  const getUser = useSelector(state => state.getUser?.data);
  const getNotification = useSelector(state => state.getNotification?.data);
  const userToken = useSelector(state => state.user.userToken || '123');
  const [numberLength, setNumberLength] = useState(0);

  useEffect(() => {
    getUser &&
      dispatch({
        type: actions.GET_NOTIFICATION,
        onSuccess() {
          const length = getNotification?.filter(
            e => e.status === 'reading',
          )?.length;
          setNumberLength(length);
        },
      });
  }, [dispatch]);

  useEffect(() => {
    const length = getNotification?.filter(e => e.status === 'reading')?.length;
    setNumberLength(length);
  }, [getNotification]);

  return (
    <Block>
      <StatusBar />
      <Block
        height={80}
        width={'100%'}
        backgroundColor={COLORS.primary}
        rowCenter
        spaceBetween
        row>
        <Block paddingLeft={15}>
          <UserAvatar
            uri={getUser?.picture || IMAGES.no_image}
            name={getUser?.full_name}
            size={39}
          />
        </Block>
        <Block flex paddingLeft={15}>
          <Text
            regular
            marginBottom={5}
            color={COLORS.white}
            numberOfLines={1}
            fontSize={12}>
            {t('jobScreen.welcome')},
          </Text>
          {userToken && (
            <Text semiBold color={COLORS.white} numberOfLines={1} fontSize={15}>
              {getUser?.first_name && getUser?.last_name
                ? getUser?.first_name + ' ' + getUser?.last_name
                : 'Người dùng Jobsbe'}
            </Text>
          )}
        </Block>
        {userToken && (
          <Pressable
            alignSelf={'center'}
            height={35}
            width={35}
            radius={5}
            justifyCenter
            alignCenter
            bottom={15}
            marginRight={15}
            onPress={() => {
              commonRoot.navigate(router.NOTIFICATION_SCREEN);
            }}>
            {numberLength > 0 && (
              <Block
                absolute
                top={0}
                right={0}
                zIndex={99}
                backgroundColor={COLORS.darkBlue}
                round={18}
                justifyCenter
                alignCenter>
                <Text color={COLORS.white} semiBold fontSize={9}>
                  {numberLength > 99 ? numberLength + '+' : numberLength}
                </Text>
              </Block>
            )}
            <Icon
              IconType={IonICONS}
              iconName={'notifications'}
              color={COLORS.white}
              ICONSize={28}
            />
          </Pressable>
        )}
      </Block>
    </Block>
  );
};

export default HeaderHome;
