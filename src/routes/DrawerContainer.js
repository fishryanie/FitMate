/** @format */

import React from 'react';
import router from './router';
import { drawer } from '@screens/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const DrawerStack = createNativeStackNavigator();

export default function DrawerContainer() {
  return (
    <DrawerStack.Navigator screenOptions={{ headerShown: false }}>
      <DrawerStack.Screen
        name={router.SETTING_SCREEN}
        component={drawer[router.SETTING_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.SUPPORT_SCREEN}
        component={drawer[router.SUPPORT_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.PROMOTION_SCREEN}
        component={drawer[router.PROMOTION_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.REFER_FRIEND_SCREEN}
        component={drawer[router.REFER_FRIEND_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.TERMS_POLICY_SCREEN}
        component={drawer[router.TERMS_POLICY_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.SAVE_LOCATION_SCREEN}
        component={drawer[router.SAVE_LOCATION_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.ORDER_HISTORY_SCREEN}
        component={drawer[router.ORDER_HISTORY_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.ACCOUNT_INTRO_SCREEN}
        component={drawer[router.ACCOUNT_INTRO_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.REVENUE_STATISTICS_SCREEN}
        component={drawer[router.REVENUE_STATISTICS_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.CHANGE_PASSWORD_SCREEN}
        component={drawer[router.CHANGE_PASSWORD_SCREEN]}
      />
      <DrawerStack.Screen
        name={router.PRODUCT_MANAGEMENT_SCREEN}
        component={drawer[router.PRODUCT_MANAGEMENT_SCREEN]}
      />
    </DrawerStack.Navigator>
  );
}
