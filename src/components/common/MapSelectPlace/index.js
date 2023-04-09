/** @format */

import { icons } from '@assets';
import { Block, Icon, Image, LiveMarker, Modal, Pressable, Text } from '@components';
import { DEFAULT_MAP_DELTA, HO_CHI_MINH_CITY_REGION } from '@constants';
import actions from '@redux/actions';
import { COLORS } from '@theme';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
const PIN_WIDTH = 33;
const PIN_HEIGHT = 56;

const MapSelectPlace = ({ placeOnConfirm, backOnPress, latLng }) => {
  const myCoordUser =
    useSelector(state => state.userLocation.data) || HO_CHI_MINH_CITY_REGION;

  const [myCoord, setMyCoord] = useState(latLng ? latLng : myCoordUser);

  const [region, setRegion] = useState(myCoord);
  const [isAnimating, setIsAnimating] = useState(false);
  const mapViewRef = useRef(null);
  const dispatch = useDispatch();
  const { top, bottom } = useSafeAreaInsets();
  const geocoding = useSelector(state => state.geocoding);

  useEffect(() => {
    dispatch({
      type: actions.GG_GEOCODING,
      delay: 300,
      params: {
        latlng: `${region?.latitude},${region?.longitude}`,
      },
    });
  }, [region, dispatch]);

  const confirmOnPress = () => {
    placeOnConfirm?.({
      name: geocoding.data.formatted_address.replace(', Vietnam', '').trim(),
      address: geocoding.data.formatted_address,
      location: geocoding.data.geometry?.location,
      compound: geocoding.data.compound,
      formatted_address: geocoding.data.formatted_address,
    });
  };

  const onRegionChangeComplete = (_region, _) => {
    setRegion(_region);
    setIsAnimating(false);
  };

  const focusToMyCoord = () => {
    mapViewRef.current?.animateToRegion({
      ...DEFAULT_MAP_DELTA,
      ...myCoord,
    });
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

  const _renderButtons = () => {
    return (
      <Block row marginBottom={20} spaceBetween paddingHorizontal={15}>
        <Pressable
          round={40}
          shadow1
          backgroundColor="white"
          alignCenter
          justifyCenter
          onPress={backOnPress}>
          <Icon
            IconType={FontAwesome5}
            iconName="chevron-left"
            color="black"
            iconSize={25}
          />
        </Pressable>
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

  const _renderConfirmAddress = () => {
    return (
      <Block backgroundColor="white" radius={10} shadow3 paddingBottom={bottom + 15}>
        {geocoding.data && !geocoding.isLoading && !isAnimating && (
          <>
            <Block
              backgroundColor="rgba(159,159,159,0.1)"
              radius={19}
              marginTop={15}
              paddingVertical={8}
              marginHorizontal={15}
              paddingHorizontal={15}
              rowCenter>
              <Image source={icons.ic_map_destination} />
              <Text fontSize={15} paddingHorizontal={10} numberOfLines={1}>
                {geocoding.data.formatted_address}
              </Text>
            </Block>
            <Pressable
              onPress={confirmOnPress}
              height={45}
              justifyCenter
              alignCenter
              marginHorizontal={15}
              marginTop={17}
              radius={5}
              backgroundColor="primary">
              <Text color="white" fontSize={17}>
                Xác nhận
              </Text>
            </Pressable>
          </>
        )}
      </Block>
    );
  };

  return (
    <Modal isVisible={true} position="center">
      <Block flex>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <MapView
          onRegionChange={() => setIsAnimating(true)}
          onRegionChangeComplete={onRegionChangeComplete}
          ref={mapViewRef}
          // provider={PROVIDER_GOOGLE}
          initialRegion={{ ...DEFAULT_MAP_DELTA, ...myCoord }}
          style={{ flex: 1 }}>
          <Marker coordinate={myCoord}>
            <LiveMarker />
          </Marker>
        </MapView>
        <Image
          source={icons.ic_location_pin}
          absolute
          left={PIN_LEFT}
          top={PIN_TOP}
          width={PIN_WIDTH}
          height={PIN_HEIGHT}
          resizeMode="contain"
        />
        <Block absolute bottom={0} left={0} right={0}>
          {_renderButtons()}
          {_renderConfirmAddress()}
        </Block>
      </Block>
    </Modal>
  );
};

export default MapSelectPlace;
