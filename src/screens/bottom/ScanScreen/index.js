/** @format */

import { Icon } from '@components';
import { width } from '@utils/responsive';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
  const [searchBarWidth, setSearchBarWidth] = useState(new Animated.Value(0));
  const [iconName, setIconName] = useState('ios-search');
  const [searchInput, setSearchInput] = useState('');

  const handleToggle = () => {
    if (searchBarWidth._value === 0) {
      Animated.timing(searchBarWidth, {
        toValue: 1,
        duration: 250,
      }).start();
      setIconName('ios-close');
    } else {
      Animated.timing(searchBarWidth, {
        toValue: 0,
        duration: 250,
      }).start();
      setIconName('ios-search');
      setSearchInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: searchBarWidth.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
          width: searchBarWidth.interpolate({ inputRange: [0, 1], outputRange: [0, width - 60] }),
        }}
      >
        <TextInput
          value={searchInput}
          onChangeText={text => setSearchInput(text)}
          placeholder="Tìm kiếm..."
          style={styles.input}
        />
      </Animated.View>
      <TouchableOpacity onPress={handleToggle}>
        <Icon IconType={Ionicons} iconName={iconName} iconSize={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
});

export default SearchBar;
