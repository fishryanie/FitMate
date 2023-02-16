/** @format */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { common } from '@screens/common';
import React from 'react';
import router from './router';

const CommonStack = createNativeStackNavigator();

export default function CommonContainer() {
  return (
    <CommonStack.Navigator screenOptions={{ headerShown: false }}>
      <CommonStack.Screen
        name={router.SCAN_SCREEN}
        component={common[router.SCAN_SCREEN]}
      />
      <CommonStack.Screen
        name={router.CART_SCREEN}
        component={common[router.CART_SCREEN]}
      />
      <CommonStack.Screen
        name={router.PRODUCT_DETAIL_SCREEN}
        component={common[router.PRODUCT_DETAIL_SCREEN]}
      />

      {/* <CommonStack.Screen
        name={router.STORE_CHECKIN_HISTORY_SCREEN}
        component={common[router.STORE_CHECKIN_HISTORY_SCREEN]}
      /> */}
    </CommonStack.Navigator>
  );
}
