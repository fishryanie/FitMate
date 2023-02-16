import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {width} from '@utils/responsive';
import {Block} from '@components';
import {COLORS} from '@theme';
import SortableList from 'react-native-sortable-list';

export default function ListSort({data, CustomItems, ...props}) {
  const {bottom} = useSafeAreaInsets();

  const renderRow = useCallback(({data, active}) => {
    return <Row data={data} active={active} CustomItems={CustomItems} />;
  }, []);

  return (
    <SortableList
      {...props}
      data={data || []}
      renderRow={renderRow}
      contentContainerStyle={styles.contentContainerStyle(bottom)}
    />
  );
}

function Row({active, data, CustomItems}) {
  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(() => styles.anim(activeAnim), []);

  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={style}>
      <CustomItems data={data} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: bottom => ({
    width: width,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    // paddingBottom: bottom + 60,
  }),
  anim: activeAnim => ({
    ...Platform.select({
      ios: {
        transform: [
          {
            scale: activeAnim.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          },
        ],
        shadowRadius: activeAnim.current.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 10],
        }),
      },
      android: {
        transform: [
          {
            scale: activeAnim.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          },
        ],
        elevation: activeAnim.current.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 6],
        }),
      },
    }),
  }),
});
