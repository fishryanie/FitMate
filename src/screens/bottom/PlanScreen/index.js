/** @format */

import { Block, Button, HeaderTitle, Icon, ListWrapper, Modal, Text } from '@components';
import Box from '@components/common/Box';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '@theme';
import { height, width } from '@responsive';
import React, { useRef, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Animated, ScrollView } from 'react-native';

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

export default function PlanScreen() {
  return (
    <Block flex>
      <HeaderTitle canGoBack canSearch title="Plan" />
      <Tab.Navigator screenOptions={screenOptionTab}>
        <Tab.Screen name="Workout" component={Workout} />
        <Tab.Screen name="Meal" component={Meal} />
      </Tab.Navigator>
    </Block>
  );
}

function Workout() {
  const [isOpen, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }).current;
  const handleScrollToIndex = index => {
    slidesRef.current.scrollTo({ x: (width - 60) * index, animated: true });
  };
  return (
    <Block flex safePaddingAreaBottom padding={15} backgroundColor={COLORS.light}>
      <Box rowCenter padding={15} onPress={() => setOpen(true)}>
        <Icon IconType={AntDesign} iconName={'pluscircleo'} iconSize={16} />
        <Text flex medium fontSize={16} marginHorizontal={10}>
          Thêm lịch tập
        </Text>
      </Box>

      <Modal position="center" isVisible={isOpen} onBackdropPress={() => setOpen(false)}>
        <Block
          radius={15}
          margin={15}
          padding={15}
          width={width - 30}
          height={height / 1.5}
          backgroundColor={COLORS.light}>
          <ScrollView
            horizontal
            pagingEnabled
            bounces={false}
            ref={slidesRef}
            scrollEnabled={false}
            scrollEventThrottle={32}
            viewabilityConfig={viewConfig}
            onViewableItemsChanged={viewableItemsChanged}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              },
            )}>
            <Block justifyEnd width={width - 60} backgroundColor={COLORS.amber100}>
              <Button
                margin={20}
                title="Continue1"
                onPress={() => handleScrollToIndex(1)}
              />
            </Block>
            <Block width={width - 60} backgroundColor={COLORS.blue100}>
              <Button title="Continue2" margin={20}  onPress={() => handleScrollToIndex(2)}/>
            </Block>
            <Block width={width - 60} backgroundColor={COLORS.brown100}>
              <Button title="Continue3" margin={20} />
            </Block>
          </ScrollView>
        </Block>
      </Modal>
    </Block>
  );
}

function Meal() {
  return <Block flex></Block>;
}
