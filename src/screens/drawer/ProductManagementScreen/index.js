/** @format */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Block, HeaderTitle } from '@components';
import { COLORS } from '@theme';
import Warehouse from './components/Warehouse';
import GroupOption from './components/OptionGroup';

const screenOptionTab = {
  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: COLORS.placeholder,
  tabBarIndicatorStyle: {
    backgroundColor: COLORS.primary,
  },
  tabBarStyle: {
    elevation: 3,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
};
const Tab = createMaterialTopTabNavigator();

export default function ProductManagementScreen() {
  return (
    <Block flex>
      <HeaderTitle canGoBack canSearch title={'Sản phẩm'} />
      <Tab.Navigator screenOptions={screenOptionTab}>
        <Tab.Screen name="Kho Hàng" component={Warehouse} />
        <Tab.Screen name="Tuỳ chọn nhóm" component={GroupOption} />
      </Tab.Navigator>
    </Block>
  );
}
