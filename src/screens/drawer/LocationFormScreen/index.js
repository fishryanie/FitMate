/** @format */

import React, { useEffect, useRef, useState } from 'react';
import formConfig, { FORM_INPUT } from './formConfig';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import {
  Block,
  HeaderTitle,
  ScrollView,
  FormInput,
  Box,
  Text,
  Image,
  Icon,
  Pressable,
  SelectInput,
  ButtonGradient,
  CheckBoxHP,
  Modal,
} from '@components';
import { COLORS, FONTS, GRADIENTS } from '@theme';
import { ModalSelectLocation } from './ModalSelectLocation';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_MAP_DELTA } from '@constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import actions, { _onUnmount } from '@store/actions';
import { icons } from '@assets';
import { isEmpty } from 'lodash';
import { width } from '@utils/responsive';
import { root } from '@routes/Ref';
const region = {
  latitude: 10.8112788,
  longitude: 106.6287608,
  latitudeDelta: 0.0022,
  longitudeDelta: 0.0421,
};

export default function LocationFormScreen({ route }) {
  const dispatch = useDispatch();
  const { title, data } = route?.params;

  const { control, watch, setValue, handleSubmit } = useForm(formConfig);
  const { bottom } = useSafeAreaInsets();
  const myCoord = useSelector(state => state.userLocation.data);
  const provinces = useSelector(state => state.getProvince.data || []);
  const districts = useSelector(state => state.getDistrict.data || []);
  const wards = useSelector(state => state.getWard.data || []);
  const getLocation = useSelector(state => state.getSaveLocation?.data);

  const mapViewRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [modalNotifi, setModalNotifi] = useState(false);
  const [current, setCurrent] = useState(myCoord);
  const [isDefault, setIsDefault] = useState(false);
  const [heightDesc, setHeightDesc] = useState(120);

  const watchProvince = watch(FORM_INPUT.province);
  const watchDistrict = watch(FORM_INPUT.district);

  const handleDelete = () => {
    if (!isEmpty(data)) {
      dispatch({
        type: actions.DELETE_SAVE_LOCATION,
        body: { item_id: data?.item_id },
        onSuccess: () => {
          root.goBack();
          dispatch({ type: actions.GET_SAVED_LOCATION });
          Toast.show({
            type: 'success',
            text1: 'Xoá địa chỉ thành công',
          });
        },
        onFail: err => {
          Toast.show({
            type: 'error',
            text1: err,
          });
        },
      });
    }
  };
  const handleSave = actionType => {
    return handleSubmit(values => {
      const wardName = wards.find(e => e.value === values.wards);
      const districtName = districts.find(e => e.value === values.district);
      const provinceName = provinces.find(e => e.value === values.province);
      const fullAddress = `${values.address}, ${wardName.label}, ${districtName.label}, ${provinceName.label}`;
      dispatch({
        type: actions.GM_GEOCODING,
        params: { address: fullAddress },
        onSuccess: res => {
          let body = {
            address: values.address,
            province: values.province,
            district: values.district,
            ward: values.wards,
            name: values.name,
            phone: values.phone,
            title: values.title,
            latitude: res.geometry.location.lat,
            longitude: res.geometry.location.lng,
            is_default: isDefault ? '1' : '0',
          };
          if (actionType === actions.UPDATE_SAVED_LOCATION) {
            body.item_id = data?.item_id;
          }
          dispatch({
            type: actionType,
            body,
            onSuccess: () => {
              root.goBack();
              dispatch({ type: actions.GET_SAVED_LOCATION });
              Toast.show({
                type: 'success',
                text1: 'Lưu địa chỉ thành công',
              });
            },
            onFail: err => {
              Toast.show({
                type: 'error',
                text1: err,
              });
            },
          });
        },
        onFail: err => {
          Toast.show({
            type: 'error',
            text1: err,
          });
        },
      });
    });
  };
  useEffect(() => {
    mapViewRef.current?.animateToRegion({
      ...DEFAULT_MAP_DELTA,
      ...current,
    });
  }, [current]);

  useEffect(() => {
    dispatch({ type: actions.GET_PROVINCE });
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setValue(FORM_INPUT.name, data?.displayName);
      setValue(FORM_INPUT.phone, data?.phone);
      setValue(FORM_INPUT.ward, data.ward);
      setValue(FORM_INPUT.district, data.district);
      setValue(FORM_INPUT.province, data.province);
      setValue(FORM_INPUT.locationName, data?.title);
      setValue(FORM_INPUT.address, data?.address);
      setIsDefault(data?.is_default === '1' ? true : false);
    }
  }, [setValue, data]);

  useEffect(() => {
    if (watchProvince) {
      dispatch({
        type: actions.GET_DISTRICT_LOCATION,
        params: {
          type: 'district',
          province_code: watchProvince,
        },
      });
    } else {
      dispatch({ type: _onUnmount(actions.GET_DISTRICT_LOCATION) });
    }
  }, [watchProvince, dispatch]);

  useEffect(() => {
    if (watchDistrict) {
      dispatch({
        type: actions.GET_WARD_LOCATION,
        params: {
          type: 'ward',
          district_code: watchDistrict,
        },
      });
    } else {
      dispatch({ type: _onUnmount(actions.GET_WARD_LOCATION) });
    }
  }, [watchDistrict, dispatch]);
  return (
    <Block flex>
      <HeaderTitle canGoBack title={title} />
      <ScrollView padding={15}>
        <Box padding={15}>
          <FormInput
            label="Họ tên"
            require
            control={control}
            placeholder="Nhập tên"
            name={FORM_INPUT.name}
            styles={styles.inputStyle}
            customInput={RenderInput}
          />
          <FormInput
            marginTop={10}
            label="Số điện thoại"
            require
            control={control}
            placeholder="Nhập số điện thoại"
            name={FORM_INPUT.phone}
            styles={styles.inputStyle}
            customInput={RenderInput}
          />
        </Box>
        <Block marginTop={15}>
          <Box>
            <Block
              paddingHorizontal={15}
              paddingBottom={5}
              paddingTop={15}
              borderBottomWidth={3}
              borderColor={COLORS.background}>
              <Text semiBold fontSize={16} color={COLORS.jet}>
                Chọn địa chỉ
              </Text>
              <Pressable
                rowCenter
                spaceBetween
                paddingVertical={10}
                onPress={() => setModal(true)}>
                <Block rowCenter>
                  <Image width={11} height={15} source={icons.ic_location_small} />
                  <Text marginLeft={9} regular fontSize={15} color={COLORS.primary}>
                    Chọn địa chỉ trên bản đồ
                  </Text>
                </Block>
                <Icon
                  color={COLORS.philippineGray}
                  IconType={MaterialIcons}
                  iconName="navigate-next"
                  iconSize={25}
                />
              </Pressable>
            </Block>
            <Block padding={15}>
              <Text semiBold fontSize={16} color={COLORS.jet}>
                Nhập địa chỉ
              </Text>
              <SelectInput
                containerStyle={{ marginTop: 5, marginBottom: 5 }}
                placeholder={'Tỉnh thành'}
                data={provinces}
                control={control}
                name={FORM_INPUT.province}
              />
              <Block row flex>
                <Block flex={1} marginRight={10}>
                  <SelectInput
                    containerStyle={{ marginBottom: 5 }}
                    placeholder={'Quận/Huyện'}
                    data={districts}
                    control={control}
                    name={FORM_INPUT.district}
                  />
                </Block>
                <Block flex={1} marginLeft={10}>
                  <SelectInput
                    containerStyle={{ marginBottom: 5 }}
                    placeholder={'Phường/Xã'}
                    data={wards}
                    control={control}
                    name={FORM_INPUT.wards}
                  />
                </Block>
              </Block>
              <FormInput
                control={control}
                placeholder="Số nhà, tên đường, toà nhà..."
                name={FORM_INPUT.address}
                styles={styles.inputStyle}
                customInput={RenderInput}
              />

              <FormInput
                require
                marginTop={10}
                label="Tên địa chỉ"
                control={control}
                placeholder="Tên địa chỉ"
                name={FORM_INPUT.locationName}
                styles={styles.inputStyle}
                customInput={RenderInput}
              />

              <Text semiBold fontSize={16} color={COLORS.jet} marginTop={10}>
                Mô tả{'  '}
                <Text light fontSize={14}>
                  {'( Giúp nhân viên tiềm thấy nhà bạn dễ dàng hơn )'}
                </Text>
              </Text>
              <FormInput
                disable
                multiline={true}
                control={control}
                marginBottom={15}
                marginTop={10}
                name={FORM_INPUT.about}
                inputProps={{ multiline: true }}
                placeholder={'Nhập mô tả về cửa hàng'}
                styles={{ ...styles.textarea, height: heightDesc }}
                customInput={RenderInput}
                onContentSizeChange={event => {
                  setHeightDesc(event.nativeEvent.contentSize.height);
                }}
              />
              <Block rowCenter marginVertical={15}>
                <CheckBoxHP
                  zIndex={1}
                  marginRight={10}
                  checked={isDefault}
                  setChecked={setIsDefault}
                  setModal={isDefault && setModalNotifi}
                />

                <Text regular fontSize={14}>
                  Đặt làm mặc định
                </Text>
              </Block>
            </Block>
          </Box>
        </Block>
        {isEmpty(data) ? (
          <ButtonGradient
            marginTop={25}
            title="Lưu"
            marginBottom={bottom + 35}
            onPress={handleSave(actions.ADD_SAVE_LOCATION)}
          />
        ) : (
          <Block rowCenter marginTop={25} marginBottom={bottom + 50}>
            <ButtonGradient
              flex
              border
              title="Xoá"
              color={COLORS.jet}
              onPress={handleDelete}
              backgroundColor={GRADIENTS.transparent}
            />
            <ButtonGradient
              flex
              marginLeft={10}
              title="Chỉnh sửa"
              onPress={handleSave(actions.UPDATE_SAVE_LOCATION)}
            />
          </Block>
        )}

        {modal && (
          <ModalSelectLocation
            current={current}
            setCurrent={setCurrent}
            setModal={setModal}
          />
        )}
        {modalNotifi && (
          <Modal position="center">
            <Block
              backgroundColor={COLORS.white}
              width={width - 30}
              paddingVertical={15}
              paddingHorizontal={15}
              radius={10}
              alignSelfCenter>
              <Block row spaceBetween>
                <Block />
                <Text bold fontSize={18}>
                  Thông báo
                </Text>
                <Pressable onPress={() => setModalNotifi(false)}>
                  <Icon iconName={'close'} IconType={AntDesign} iconSize={20} />
                </Pressable>
              </Block>
              <Text regular fontSize={16} marginTop={10}>
                Bạn cần có ít nhất một địa chỉ mặc định. Hãy thêm mới hoặc chỉnh sửa một
                địa chỉ khác thành mặc định.
              </Text>
              <Pressable
                onPress={() => setModalNotifi(false)}
                marginTop={15}
                radius={5}
                backgroundColor={COLORS.primary}
                alignSelfCenter
                paddingHorizontal={10}
                paddingVertical={5}>
                <Text regular fontSize={16} color={COLORS.white}>
                  Đồng ý
                </Text>
              </Pressable>
            </Block>
          </Modal>
        )}
      </ScrollView>
    </Block>
  );
}
const RenderInput = renderInput => (
  <Block
    rowCenter
    radius={5}
    paddingLeft={10}
    borderWidth={0.5}
    marginTop={10}
    borderColor={COLORS.borderBottom}>
    {renderInput()}
  </Block>
);

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
  },
});
