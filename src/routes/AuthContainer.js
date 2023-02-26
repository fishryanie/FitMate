/** @format */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '@screens/auth';
import React from 'react';
import router from './router';

const AuthStack = createNativeStackNavigator();

export default function AuthContainer() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name={router.LOGIN_SCREEN}
        component={auth[router.LOGIN_SCREEN]}
      />
      <AuthStack.Screen
        name={router.REGISTER_SCREEN}
        component={auth[router.REGISTER_SCREEN]}
      />
    </AuthStack.Navigator>
  );
}
