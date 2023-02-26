/** @format */

import {
  Block,
  HeaderTitle,
  Icon,
  Image,
  LiveMarker,
  Modal,
  Pressable,
  Text,
} from '@components';
import { StatusBar } from 'react-native';
import { COLORS } from '@theme';
import { height, width } from '@utils/responsive';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DEFAULT_MAP_DELTA } from '@constants';
import { icons } from '@assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PIN_WIDTH = 30;
const PIN_HEIGHT = 30;

export const ModalSelectLocation = ({ current, setModal, setCurrent }) => {
  const dispatch = useDispatch();
  const { top, bottom } = useSafeAreaInsets();
  console.log(
    '🚀 ~ file: ModalSelectLocation.js:31 ~ ModalSelectLocation ~ bottom',
    bottom,
  );
  console.log('🚀 ~ file: ModalSelectLocation.js:31 ~ ModalSelectLocation ~ top', top);
  console.log('height', height);
  const [isAnimating, setIsAnimating] = useState(false);
  const [region, setRegion] = useState(current);
  const mapViewRef = useRef(null);
  // const geocoding = useSelector(state => state.geocoding);

  useEffect(() => {
    // dispatch({
    //   type: actions.GG_GEOCODING,
    //   delay: 300,
    //   params: {
    //     latlng: `${region.latitude},${region.longitude}`,
    //   },
    // });
  }, [region, dispatch]);

  const setGeoCoding = () => {
    setModal(false);
    setCurrent({
      // latitude: geocoding?.data?.geometry?.location?.lat,
      // longitude: geocoding?.data?.geometry?.location?.lng,
      heading: 0,
    });
  };

  const onGoBack = () => {
    setModal(false);
  };

  const onRegionChangeComplete = (_region, _) => {
    console.log(
      '🚀 ~ file: ModalSelectLocation.js:60 ~ onRegionChangeComplete ~ _region',
      _region,
    );
    setRegion(_region);
    setIsAnimating(false);
  };

  const focusToMyCoord = () => {
    mapViewRef.current?.animateToRegion({
      ...DEFAULT_MAP_DELTA,
      ...current,
    });
  };

  const _renderButtons = () => {
    return (
      <Block
        rowCenter
        marginBottom={bottom ? bottom : 20}
        spaceBetween
        paddingHorizontal={15}>
        <Block
          width={width / 1.3}
          height={50}
          backgroundColor={COLORS.white}
          radius={10}
          rowCenter>
          <Text fontSize={15} paddingHorizontal={10} numberOfLines={2}>
            {/* {geocoding?.data?.formatted_address} */}
          </Text>
        </Block>
        <Pressable
          round={40}
          shadow1
          backgroundColor="white"
          alignCenter
          justifyCenter
          onPress={focusToMyCoord}>
          <Icon
            IconType={MaterialIcons}
            iconName="my-location"
            color="black"
            iconSize={25}
          />
        </Pressable>
      </Block>
    );
  };

  const PIN_LEFT = useMemo(() => {
    return (width - PIN_WIDTH + 3) / 2;
  }, []);
  const PIN_TOP = useMemo(() => {
    return Platform.select({
      android: height / 2 - (StatusBar.currentHeight + 63),
      // ios: (height - top) / 2.33 - PIN_HEIGHT,
      ios: height / 2 - height * 0.1,
    });
  }, []);
  // console.log(
  //   '🚀 ~ file: ModalSelectLocation.js:112 ~ StatusBar?.currentHeight',
  //   StatusBar.currentHeight,
  // );

  return (
    <Modal>
      <HeaderTitle title={'Chọn địa chỉ'} canGoBack onGoBack={onGoBack} />
      <Block backgroundColor={COLORS.white} flex>
        <MapView
          onRegionChange={() => setIsAnimating(true)}
          onRegionChangeComplete={onRegionChangeComplete}
          ref={mapViewRef}
          // provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          initialRegion={{ ...DEFAULT_MAP_DELTA, ...current }}>
          <Marker coordinate={current}>
            <LiveMarker />
          </Marker>
        </MapView>

        <Image
          source={icons.ic_location}
          absolute
          left={PIN_LEFT}
          top={PIN_TOP}
          width={PIN_WIDTH}
          height={PIN_HEIGHT}
          resizeMode="contain"
        />
        <Block absolute bottom={50} left={0} right={0}>
          {_renderButtons()}
        </Block>
        <Pressable
          absolute
          onPress={setGeoCoding}
          zIndex={99}
          bottom={bottom || 15}
          radius={7}
          justifyCenter
          alignCenter
          height={40}
          backgroundColor={COLORS.primary}
          width={width - 30}
          marginHorizontal={15}>
          <Text color={COLORS.white}>{'Xác nhận'}</Text>
        </Pressable>
      </Block>
    </Modal>
  );
};
