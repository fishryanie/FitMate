/** @format */

import React, { Fragment, useEffect, useRef, useState } from 'react';
import router from './router';
import actions, { _onUnmount } from '@redux/actions';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Block, Icon, Image, ListWrapper, Pressable, Text } from '@components';
import { Animated, StyleSheet } from 'react-native';
import { bottom } from '@screens/bottom';
import { hs, vs, width } from '@responsive';
import { ICONS, IMAGES } from '@assets';
import { COLORS, FONTS } from '@theme';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LIST_PROFILE } from '@utils/fakeData';

const Bottom = createBottomTabNavigator();

export default function BottomContainer() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const drawerOffset = useRef(new Animated.Value(0)).current;
  const isDrawer = useSelector(state => state.other.isDrawer);
  const [isFocusDrawer, setFocusDrawer] = useState(null);

  const animatedStyles = {
    borderRadius: drawerOffset.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30],
    }),
    transform: [
      {
        scale: drawerOffset.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.7],
        }),
      },
      {
        translateX: drawerOffset.interpolate({
          inputRange: [0, 1],
          outputRange: [0, width / 1.2],
        }),
      },
      {
        rotateZ: drawerOffset.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-10deg'],
        }),
      },
    ],
  };

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      height: vs(60) + insets.bottom,
      paddingHorizontal: hs(12),
      backgroundColor: COLORS.light,
      borderTopWidth: 0,
      shadowColor: COLORS.dark,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    tabBarButton: ({ accessibilityState, onPress }) => {
      const icon = {
        [router.HOME_SCREEN]: ICONS.home,
        [router.SHOP_SCREEN]: ICONS.heart,
        [router.SCAN_SCREEN]: ICONS.plus,
        [router.PLAN_SCREEN]: ICONS.calendar,
        [router.PROFILE_SCREEN]: ICONS.profile,
      };
      const focused = accessibilityState.selected;
      const isPlus = icon[route.name] === ICONS.plus;
      const labels = {
        [router.HOME_SCREEN]: t('BottomTab.Home'),
        [router.SHOP_SCREEN]: t('BottomTab.Category'),
        [router.SCAN_SCREEN]: t('BottomTab.Scan'),
        [router.PLAN_SCREEN]: t('BottomTab.Plan'),
        [router.PROFILE_SCREEN]: t('BottomTab.Profile'),
      };
      return (
        <Pressable flex alignCenter justifyCenter onPress={onPress}>
          {isPlus ? (
            <Image source={icon[route.name]} square={45} resizeMode="contain" />
          ) : (
            <Fragment>
              <Image
                source={icon[route.name]}
                square={focused ? 23 : 18}
                tintColor={focused ? COLORS.primary : COLORS.blueGrey900}
              />
              <Text
                marginTop={2}
                translateY={5}
                fontSize={focused ? 13 : 12}
                color={focused ? COLORS.primary : COLORS.blueGrey900}
                fontFamily={focused ? FONTS.SemiBold : FONTS.Regular}>
                {labels[route.name]}
              </Text>
            </Fragment>
          )}
        </Pressable>
      );
    },
  });

  useEffect(() => {
    Animated.timing(drawerOffset, {
      duration: 300,
      toValue: isDrawer ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isDrawer, drawerOffset]);

  return (
    <Block flex>
      <Pressable
        rowCenter
        padding={15}
        width={width / 1.8}
        paddingTop={insets.top + 6}
        backgroundColor={COLORS.light}
        borderBottomRightRadius={107 / 2}
        onPress={() => dispatch({ type: actions.TOGGLE_DRAWER })}>
        <Image
          radius={15}
          square={45}
          source={IMAGES.avatar}
          marginRight={10}
          resizeMode="cover"
        />
        <Block flex>
          <Text regular fontSize={12} lineHeight={25} color={COLORS.dark}>
            Xin chào!
          </Text>
          <Text flex medium fontSize={14} numberOfLines={1}>
            Phan Hồng Quân
          </Text>
        </Block>
      </Pressable>
      <ListWrapper
        data={LIST_PROFILE}
        VSeparator={15}
        paddingTopContent={25}
        renderItem={({ item }) => (
          <Pressable
            rowCenter
            paddingVertical={5}
            paddingHorizontal={15}
            borderColor={COLORS.primary}
            borderLeftWidth={isFocusDrawer === item.title ? 5 : 0}
            onPress={() => {
              item.action();
              setFocusDrawer(item.title);
            }}>
            <Icon IconType={AntDesign} iconName={item.icon} />
            <Text medium fontSize={16} lineHeight={25} marginLeft={15}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />

      <Block paddingHorizontal={15} paddingBottom={insets.bottom + 10}>
        <Pressable
          rowCenter
          onPress={() => {
            dispatch({ type: actions.LOGOUT_APP });
            dispatch({ type: _onUnmount(actions.GET_ONE_USER) });
          }}>
          <Icon IconType={Feather} iconName={'log-out'} iconSize={20} />
          <Text medium fontSize={18} margin={15}>
            Logout
          </Text>
        </Pressable>
        <Text light fontSize={12}>
          Version 1.0.0
        </Text>
      </Block>

      <Animated.View style={[styles.container, { ...animatedStyles }]}>
        <Bottom.Navigator
          backBehavior="initialRoute"
          screenOptions={screenOptions}
          initialRouteName={router.HOME_SCREEN}>
          <Bottom.Screen
            name={router.HOME_SCREEN}
            component={bottom[router.HOME_SCREEN]}
          />
          <Bottom.Screen
            name={router.SHOP_SCREEN}
            component={bottom[router.SHOP_SCREEN]}
          />
          <Bottom.Screen
            name={router.SCAN_SCREEN}
            component={bottom[router.SCAN_SCREEN]}
          />
          <Bottom.Screen
            name={router.PLAN_SCREEN}
            component={bottom[router.PLAN_SCREEN]}
          />
          <Bottom.Screen
            name={router.PROFILE_SCREEN}
            component={bottom[router.PROFILE_SCREEN]}
          />
        </Bottom.Navigator>
      </Animated.View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
    elevation: 3,
    height: hs(55),
    borderRadius: hs(20),
    shadowRadius: 2.22,
    shadowOpacity: 0.22,
    position: 'absolute',
    marginHorizontal: hs(15),
    shadowColor: COLORS.dark,
    backgroundColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
  },
});
