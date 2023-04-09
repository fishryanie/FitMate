/** @format */

import { Block, BottomButton, HeaderTitle, Icon, LiveMarker, Text } from '@components';
import { HO_CHI_MINH_CITY_REGION } from '@constants';
import { commonRoot } from '@routes/Ref';
import { COLORS } from '@theme';
import { Dimensions, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import router from '@routes/router';
import actions from '@store/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const { width, height } = Dimensions.get('window');
const PIN_WIDTH = 33;
const PIN_HEIGHT = 56;

export default function MapSelectScreen({ redirect }) {
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();
  const [region, setRegion] = useState(HO_CHI_MINH_CITY_REGION);
  const [isAnimating, setIsAnimating] = useState(false);
  const mapViewRef = useRef(null);
  const geocoding = useSelector(state => state.gmGeocoding);

  useEffect(() => {
    dispatch({
      type: actions.GM_GEOCODING,
      delay: 500,
      params: {
        latlng: `${region?.latitude},${region?.longitude}`,
      },
    });
  }, [region, dispatch]);

  const confirmOnPress = () => {
    const data = {
      address: geocoding?.data?.name,
      fullAdress: geocoding?.data?.formatted_address,
      province: geocoding?.data?.compound.province,
      district: geocoding?.data?.compound.district,
      commune: geocoding?.data?.compound.commune,
      latitude: geocoding?.data?.geometry.location.lat,
      longitude: geocoding?.data?.geometry.location.lng,
    };
    switch (redirect) {
      default:
        return commonRoot.navigate(router.LOCATION_SELECT_SCREEN, {
          placeSelected: data,
        });
    }
  };

  const onRegionChangeComplete = (_region, _) => {
    setRegion(_region);
    setIsAnimating(false);
  };

  const focusToMyCoord = () => {
    mapViewRef.current?.animateToRegion(HO_CHI_MINH_CITY_REGION);
  };

  const PIN_LEFT = useMemo(() => {
    return (width - PIN_WIDTH) / 2;
  }, []);

  const PIN_TOP = useMemo(() => {
    return Platform.select({
      android: (height - PIN_HEIGHT) / 2 - StatusBar.currentHeight,
      ios: (height - PIN_HEIGHT - top) / 2,
    });
  }, [top]);

  return (
    <Block flex>
      <HeaderTitle
        absolute
        canGoBack
        zIndex={1}
        color={COLORS.dark}
        rightOnPress={focusToMyCoord}
        backgroundColor={COLORS.transparent}
        leftStyle={{
          round: 35,
          alignCenter: 'alignCenter',
          justifyCenter: 'justifyCenter',
          backgroundColor: COLORS.transparentDark1,
        }}
        rightStyle={{
          round: 35,
          alignCenter: 'alignCenter',
          justifyCenter: 'justifyCenter',
          backgroundColor: COLORS.transparentDark1,
        }}
        IconRight={
          <Icon
            IconType={MaterialIcons}
            iconName="my-location"
            color={COLORS.dark}
            iconSize={25}
          />
        }
      />
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        onRegionChange={() => setIsAnimating(true)}
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={HO_CHI_MINH_CITY_REGION}>
        <Marker coordinate={HO_CHI_MINH_CITY_REGION}>
          <LiveMarker />
        </Marker>
      </MapView>
      <Icon
        IconType={FontAwesome5}
        iconName="map-pin"
        color={COLORS.primary}
        iconSize={35}
        absolute
        left={PIN_LEFT}
        top={PIN_TOP}
        width={PIN_WIDTH}
        height={PIN_HEIGHT}
      />
      {geocoding?.data && !geocoding.isLoading && !isAnimating && (
        <BottomButton title="Xác nhận" onPress={confirmOnPress}>
          <Block rowCenter paddingBottom={15}>
            <Icon
              iconSize={25}
              marginRight={10}
              iconName="map-pin"
              IconType={FontAwesome5}
              color={COLORS.primary}
            />
            <Text flex medium fontSize={16} lineHeight={25} color={COLORS.grey600}>
              {geocoding.data.formatted_address}
            </Text>
          </Block>
        </BottomButton>
      )}
    </Block>
  );
}
