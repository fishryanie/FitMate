/** @format */

import React, { Fragment, useEffect } from 'react';
import i18n from 'i18n';
import router from './router';
import actions from 'store/actions';
import AuthContainer from './AuthContainer';
import BottomContainer from './BottomContainer';
import CommonContainer from './CommonContainer';
import DrawerContainer from './DrawerContainer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useBackgroundMessages, useFCMMessage, useNotificationPermission } from '@hooks';
import { useSelector, useDispatch } from 'react-redux';
import { navigationRef } from './Ref';

const Stack = createNativeStackNavigator();

export default function MainContainer() {
  useBackgroundMessages();
  useNotificationPermission();
  const dispatch = useDispatch();
  const message = useFCMMessage();

  const appLanguage = useSelector(state => state.app.lang);
  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    i18n.changeLanguage(appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    dispatch({ type: actions.GET_CONFIGS_APP, params: { type: 'terms-policy' } });
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch({ type: actions.GET_ONE_USER });
    }
  }, [dispatch, accessToken]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!accessToken ? (
          <Stack.Screen name={router.AUTH_CONTAINER} component={AuthContainer} />
        ) : (
          <Fragment>
            <Stack.Screen name={router.BOTTOM_CONTAINER} component={BottomContainer} />
            <Stack.Screen name={router.DRAWER_CONTAINER} component={DrawerContainer} />
            <Stack.Screen name={router.COMMON_CONTAINER} component={CommonContainer} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
