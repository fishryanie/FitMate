/** @format */

import React, { Fragment, useEffect } from 'react';
import router from './router';
import actions from '@redux/actions';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { navigationRef } from './Ref';
import AuthContainer from './AuthContainer';
import BottomContainer from './BottomContainer';
import CommonContainer from './CommonContainer';
import DrawerContainer from './DrawerContainer';

const Stack = createNativeStackNavigator();

export default function MainContainer() {
  const accessToken = useSelector(state => state.user.accessToken);

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
