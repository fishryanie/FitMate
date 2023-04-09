/** @format */

import React from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Block, Image, ListWrapper, Pressable, Text } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@theme';
import { ICONS, IMAGES } from '@assets';
import { width } from '@responsive';
import { commonRoot } from '@routes/Ref';
import router from '@routes/router';
import { useDispatch } from 'react-redux';
import actions from 'store/actions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const infoUser = useSelector(state => state.getOneUser?.data);
  useEffect(() => {
    dispatch({ type: actions.GET_ONE_USER });
  }, [dispatch]);
  const { top } = useSafeAreaInsets();

  function redirectCart() {
    return commonRoot.navigate(router.CART_SCREEN);
  }
  return (
    <Block flex paddingTop={top} backgroundColor={COLORS.light}>
      <Block rowCenter spaceBetween paddingVertical={10} paddingHorizontal={15}>
        <Block flex={1.4} rowCenter>
          <Pressable onPress={() => dispatch({ type: actions.TOGGLE_DRAWER })}>
            <Image square={25} marginRight={15} source={ICONS.ic_back} />
          </Pressable>
          <Block>
            <Text h5 lineHeight={25} color={COLORS.dark}>
              Xin chào!
            </Text>
            <Text h4 numberOfLines={1}>
              {infoUser?.lastName} {infoUser?.firstName}
            </Text>
          </Block>
        </Block>
        <Block flex rowCenter spaceBetween>
          <Image square={18} source={ICONS.ic_search} />
          <Pressable onPress={redirectCart}>
            <Image square={18} source={ICONS.ic_bag} />
          </Pressable>
          <Image square={20} source={ICONS.notification} />
          <Image square={50} radius={10} source={IMAGES.avatar} resizeMode="cover" />
        </Block>
      </Block>
      <ScrollView>
        <Banner />
        <VideoPlay />
      </ScrollView>
    </Block>
  );
}

const Banner = () => (
  <Block paddingHorizontal={15} marginBottom={15}>
    <ImageBackground style={styles.banner} source={IMAGES.banner}>
      <Block flex>
        <Block rowCenter>
          <Block alignCenter justifyCenter>
            <Image
              alignSelfCenter
              square={15}
              margin={5}
              source={ICONS.fire}
              resizeMode="contain"
            />
          </Block>
          <Text small color={COLORS.light}>
            limited offer
          </Text>
        </Block>
        <Text regular sizeMedium color={COLORS.light}>
          30% Discount
        </Text>
        <Text regular sizeMedium color={COLORS.light}>
          Flash Sales
        </Text>
      </Block>
    </ImageBackground>
    <Image source={IMAGES.model} style={styles.model} resizeMode="contain" />
  </Block>
);

const VideoPlay = () => (
  <Block>
    <Text h1 marginHorizontal={15}>
      Fitness video
    </Text>
    <ListWrapper
      horizontal
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ item, index }) => (
        <Block
          shadow3
          radius={15}
          width={width / 1.25}
          backgroundColor={COLORS.light}
          marginLeft={index === 0 ? 15 : 0}
          marginRight={15}
          marginVertical={15}>
          <Image
            height={150}
            width={'100%'}
            borderTopRadius={15}
            source={IMAGES.couple}
            resizeMode="cover"
          />
          <Block padding={10}>
            <Text regular sizeMedium>
              2 Hour Bulking Trainer
            </Text>
            <Block rowCenter spaceBetween marginTop={5}>
              <Text small>
                <Image square={15} source={ICONS.book} />
                {'   Beginner'}
              </Text>
              <Text small color={COLORS.primary}>
                45 Min
              </Text>
            </Block>
            <Block
              absolute
              top={-15}
              right={25}
              radius={15}
              padding={10}
              backgroundColor={COLORS.primary}>
              <Image square={10} source={ICONS.play} />
            </Block>
          </Block>
        </Block>
      )}
    />
  </Block>
);

const styles = StyleSheet.create({
  banner: {
    marginTop: 20,
    padding: 30,
    resizeMode: 'contain',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  model: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 10,
    height: '75%',
    width: '50%',
    transform: [{ rotateY: '180deg' }],
  },
});
