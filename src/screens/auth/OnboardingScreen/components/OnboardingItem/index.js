/** @format */

import { Block, Text } from '@components';
import { COLORS, FONTS } from '@theme';
import { hs, vs, mhs, width, height } from '@utils/responsive';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const OnBoardingItem = ({ item }) => {
  return (
    <Block style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        style={[styles.image, { width: width }]}
        source={item.image}
      />
      <Text bold style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.content}>{item.content}</Text>
    </Block>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: mhs(20),
    color: COLORS.primary,
    textAlign: 'center',
    paddingTop: mhs(40),
    paddingBottom: mhs(20),
  },
  content: {
    fontSize: mhs(15),
    textAlign: 'center',
    width: width,
    paddingHorizontal: mhs(17),
    color: COLORS.black,
  },
  image: {
    height: vs(255),
  },
  item: {},
});
