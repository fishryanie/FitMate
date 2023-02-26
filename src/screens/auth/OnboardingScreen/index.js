/** @format */

import { Block, ButtonSubmit } from '@components';
import { USER_ROLE } from '@constants';
import router from '@routes/router';
import { useNavigation } from '@react-navigation/native';
import actions from 'store/actions';
import { COLORS } from '@theme';
import { vs } from '@utils/responsive';
import Storage from '@utils/storage';
import React, { useRef, useState } from 'react';
import { Animated, FlatList, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import Dot from './components/Dot';
import OnBoardingItem from './components/OnboardingItem';
import { dataImage } from './components/OnboardingScreen/data';

const OnboardingScreen = ({ navigation }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  let slidesRef;

  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);

  function onStart() {
    navigate(router.BOTTOM_CONTAINER);
  }

  function onSkip() {
    Storage.setItem('@viewedOnboarding', true);
    navigate(router.BOTTOM_CONTAINER);
  }

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <Block flex justifyCenter alignCenter backgroundColor={'white'}>
      <FlatList
        data={dataImage}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(_, index) => `${index}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={ref => {
          slidesRef = ref;
        }}
      />
      <Block bottom={vs(50)} backgroundColor={'white'} style={{ width: '100%' }}>
        <Dot data={dataImage} scrollX={scrollX} key={item => item.img_link} />
        <ButtonSubmit
          onPress={() => navigate(router.AUTH_CONTAINER)}
          paddingVertical={12}>
          {'Tiếp tục'}
        </ButtonSubmit>
      </Block>
    </Block>
  );
};
export default OnboardingScreen;
