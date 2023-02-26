/** @format */

import React, { useEffect, useState } from 'react';
import actions, { _onUnmount } from 'store/actions';
import formConfig, { FORM_INPUT } from './components/FormConfig';
import MultiImageInput from './components/MultiImageInput';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Block,
  Button,
  FormInput,
  HeaderTitle,
  Icon,
  Modal,
  ModalCategoriesSaller,
  Pressable,
  RadioButton,
  SelectInput,
  Text,
} from '@components';
import { COLORS, FONTS } from '@theme';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { width } from '@utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { root } from '@routes/Ref';

export default function ShopFormProductScreen({ route }) {
  const dispatch = useDispatch();
  const product = route?.params?.data;
  const { bottom } = useSafeAreaInsets();
  const { control, handleSubmit, setValue, resetField, watch } = useForm(formConfig);

  const [transport, setTransport] = useState(listTransport[0].value);
  const [typeSubmit, setTypeSubmit] = useState();
  const [confirm, setConfirm] = useState(false);
  const [heightDesc, setHeightDesc] = useState(120);
  const [openModal, setOpenModal] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [data, setData] = useState();
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState();

  const watchType = watch(FORM_INPUT.type);
  const watchTitle = watch(FORM_INPUT.title);
  const watchContent = watch(FORM_INPUT.content);

  const vehicleSubTypes = useSelector(state => state.vehicleSubTypes.data || []).map(
    t => ({ value: t.item_id, label: t.title }),
  );
  const vehicleTypes = useSelector(state => state.vehicleTypes.data || []).map(t => ({
    value: t.item_id,
    label: t.title,
  }));

  const getDataBody = value => {
    return {
      title: value.title,
      price: value.price,
      content: value.content,
      quantity: value.quantity,
      group_id: category?.group_id,
      weight: value.weight,
      length: value.length,
      height: value.height,
      width: value.width,
      arr_picture: JSON.stringify(value.images),
    };
  };

  const handleDelete = () => {
    setConfirm(false);
    setOpenModal(true);
    setTypeSubmit('DELETE');
    setData({ list_id: product?.item_id });
  };

  const handleSave = handleSubmit(value => {
    setConfirm(false);
    setOpenModal(true);
    setTypeSubmit('SAVE');
    setData(getDataBody(value));
  });

  const handleUpdate = handleSubmit(value => {
    setConfirm(false);
    setOpenModal(true);
    setTypeSubmit('UPDATE');
    let data = getDataBody(value);
    if (data) {
      data.item_id = product?.item_id;
    }
  });

  useEffect(() => {
    if (product) {
      setValue(FORM_INPUT.images, [product?.picture]);
      setValue(FORM_INPUT.title, product?.title);
      setValue(FORM_INPUT.price, product?.price);
      setValue(FORM_INPUT.content, product?.desciption);
      setValue(FORM_INPUT.quantity, product?.quantity);
      setValue(FORM_INPUT.category_child, product?.group_id);
    }
  }, [product]);

  useEffect(() => {
    if (confirm && typeSubmit) {
      dispatch({
        type:
          typeSubmit === 'SAVE'
            ? actions.SHOP_SAVE_PRODUCT
            : typeSubmit === 'UPDATE'
            ? actions.SHOP_UPDATE_PRODUCT
            : typeSubmit === 'DELETE'
            ? actions.SHOP_DELETE_PRODUCT
            : null,
        body: data,
        onSuccess: res => {
          root.goBack();
          setConfirm(false);
          setOpenModal(false);
          setTypeSubmit(false);
          // CustomToast(res.message);
        },
        onFail: err => {
          setConfirm(false);
          setOpenModal(false);
          setTypeSubmit(false);
          // CustomToast(err.message);
        },
      });
    }
  }, [dispatch, confirm, typeSubmit]);

  useEffect(() => {
    dispatch({ type: actions.GET_VEHICLE_TYPES });
    return () => {
      dispatch({ type: _onUnmount(actions.GET_VEHICLE_TYPES) });
    };
  }, [dispatch]);

  useEffect(() => {
    if (watchType) {
      dispatch({
        type: actions.GET_VEHICLE_SUB_TYPES,
        params: { group_id: watchType },
      });
    } else {
      dispatch({ type: _onUnmount(actions.GET_VEHICLE_SUB_TYPES) });
    }
    resetField(FORM_INPUT.sub_type);
  }, [watchType, dispatch, resetField]);

  return (
    <Block flex>
      <HeaderTitle
        canGoBack
        colorIcon="#000000"
        title={product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        titleProps={{ color: '#000000' }}
        backgroundColor={COLORS.white}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: bottom + 50 }}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always">
        <Block
          row
          wrap
          spaceBetween
          padding={15}
          width={width}
          marginVertical={6}
          backgroundColor={COLORS.white}>
          <Text bold fontSize={16} marginBottom={15} color={COLORS.primary}>
            Thông tin sản phẩm
          </Text>
          <MultiImageInput
            maxImage={4}
            width={width - 30}
            marginBottom={15}
            control={control}
            name={FORM_INPUT.images}
            imageOptions={{ compressImageQuality: 0.2 }}
            label="Ảnh sản phẩm *"
          />
          <Hr />
          <FormInput
            disable
            control={control}
            marginTop={10}
            marginBottom={15}
            width={width - 30}
            name={FORM_INPUT.title}
            styles={styles.inputStyle}
            placeholder={'Nhập tiêu đề'}
            customInput={RenderInput}
            customLabel={RenderLable('Tên sản phẩm *', watchTitle, 50)}
          />
          <Hr />
          <FormInput
            disable
            label="Giá"
            width={(width - 45) / 2}
            control={control}
            marginTop={10}
            marginBottom={15}
            name={FORM_INPUT.price}
            styles={styles.inputStyle}
            keyboardType={'numeric'}
            placeholder={'Nhập giá'}
            customInput={RenderInput}
          />
          <FormInput
            disable
            label="Số lượng"
            width={(width - 45) / 2}
            placeholder={'Nhập số lượng'}
            control={control}
            marginTop={10}
            marginBottom={15}
            keyboardType={'numeric'}
            name={FORM_INPUT.quantity}
            styles={styles.inputStyle}
            customInput={RenderInput}
          />
          <Text>Danh mục*</Text>
          <Pressable
            rowCenter
            radius={5}
            height={45}
            width={width - 30}
            paddingHorizontal={10}
            marginTop={10}
            borderWidth={0.25}
            marginBottom={15}
            backgroundColor={COLORS.white}
            borderColor={COLORS.placeholder}
            onPress={() => setOpenCategory(true)}>
            <Text flex color={COLORS.placeholder}>
              {category?.title ? category?.title : '-- Chọn danh mục --'}
            </Text>
            <Icon
              IconType={Entypo}
              iconSize={25}
              color={COLORS.placeholder}
              iconName="chevron-small-down"
            />
          </Pressable>
          <Hr />
          <FormInput
            disable
            multiline={true}
            control={control}
            marginBottom={15}
            width={width - 30}
            marginTop={10}
            name={FORM_INPUT.content}
            inputProps={{ multiline: true }}
            placeholder={'Nhập mô tả sản phẩm'}
            styles={{ ...styles.textarea, height: heightDesc }}
            customInput={RenderInput}
            customLabel={RenderLable('Mô tả sản phẩm *', watchContent, 3000)}
            onContentSizeChange={event => {
              setHeightDesc(event.nativeEvent.contentSize.height);
            }}
          />
          <Hr />
          <Text bold fontSize={16} marginVertical={15} color={COLORS.primary}>
            Vận chuyển
          </Text>
          <Text regular width={width - 30} fontSize={14}>
            Chọn phương thức giao hàng*
          </Text>
          <RadioButton
            value={transport}
            data={listTransport}
            checkedColor={COLORS.primary}
            itemProps={{ marginVertical: 15, marginRight: 10 }}
            onChangeValue={item => setTransport(item?.value)}
          />
          <FormInput
            disable
            label="Khối lượng*"
            placeholder={'Nhập cân nặng'}
            control={control}
            marginTop={10}
            marginBottom={15}
            width={width - 30}
            name={FORM_INPUT.weight}
            styles={styles.inputStyle}
            customInput={RenderInput}
          />
          <Hr />
          <FormInput
            disable
            label="Chiều dài*"
            width={(width - 60) / 3}
            placeholder={'centimet'}
            control={control}
            marginTop={10}
            marginBottom={15}
            keyboardType={'numeric'}
            name={FORM_INPUT.length}
            styles={styles.inputStyle}
            customInput={RenderInput}
          />
          <FormInput
            disable
            label="Chiều rộng"
            width={(width - 60) / 3}
            marginTop={10}
            placeholder={'centimet'}
            control={control}
            marginBottom={15}
            keyboardType={'numeric'}
            name={FORM_INPUT.width}
            styles={styles.inputStyle}
            customInput={RenderInput}
          />
          <FormInput
            disable
            label="Chiều cao"
            width={(width - 60) / 3}
            marginTop={10}
            placeholder={'centimet'}
            control={control}
            marginBottom={15}
            keyboardType={'numeric'}
            name={FORM_INPUT.height}
            styles={styles.inputStyle}
            customInput={RenderInput}
          />
          <Hr />
          <SelectInput
            label={'Loại xe'}
            placeholder={'-- Chọn danh loại xe --'}
            data={vehicleTypes || []}
            control={control}
            marginBottom={15}
            marginTop={10}
            width={(width - 45) / 2}
            name={FORM_INPUT.type}
            inputStyle={styles.selectStyle}
            textProps={{ light: true }}
          />
          <SelectInput
            label={'Chi tiết loại xe'}
            placeholder={'-- Chọn danh loại xe --'}
            data={vehicleSubTypes || []}
            control={control}
            marginTop={10}
            marginBottom={15}
            width={(width - 45) / 2}
            name={FORM_INPUT.sub_type}
            inputStyle={styles.selectStyle}
            textProps={{ light: true }}
          />
        </Block>
      </KeyboardAwareScrollView>
      <ModalCategoriesSaller
        open={openCategory}
        setOpen={setOpenCategory}
        setCategory={setCategory}
      />
      <Confirm
        open={openModal}
        setConfirm={setConfirm}
        typeSubmit={typeSubmit}
        setOpen={setOpenModal}
        handleSave={handleSave}
      />
      <Block
        row
        absolute
        shadow3
        bottom={0}
        paddingTop={10}
        alignSelf={'flex-end'}
        paddingBottom={bottom === 0 ? 10 : bottom}
        backgroundColor={COLORS.white}>
        {product && (
          <Button
            flex
            title="Xoá"
            backgroundColor="red"
            onPress={handleDelete}
            marginRight={7.5}
          />
        )}
        {product ? (
          <Button flex title="Sửa" onPress={handleUpdate} marginLeft={7.5} />
        ) : (
          <Button flex title="Lưu" onPress={handleSave} />
        )}
      </Block>
    </Block>
  );
}

const Hr = () => (
  <Block
    height={6}
    width={width}
    marginHorizontal={-15}
    backgroundColor={COLORS.cultured}
  />
);

const RenderInput = renderInput => (
  <Block
    rowCenter
    radius={5}
    paddingLeft={10}
    borderWidth={0.25}
    backgroundColor={COLORS.white}
    borderColor={COLORS.placeholder}>
    {renderInput()}
  </Block>
);

const RenderLable = (label, watch, maxlength) => () => {
  return (
    <Block rowCenter spaceBetween marginBottom={10}>
      <Text regular fontSize={14}>
        {label}
      </Text>
      <Text regular fontSize={13} color={COLORS.placeholder}>
        {watch?.length || 0}/{maxlength}
      </Text>
    </Block>
  );
};

const Confirm = ({ open, setOpen, setConfirm, isLoading, typeSubmit }) => (
  <Modal isVisible={open} position="center">
    <Block radius={10} padding={15} margin={15} backgroundColor={COLORS.white}>
      <Text center semiBold large marginTop={15}>
        Bạn có chắc chắn muốn {typeSubmit} sản phẩm này không ?
      </Text>
      <Block rowCenter marginTop={35}>
        <Button
          flex
          title="Đóng"
          marginRight={5}
          borderWidth={1}
          color={COLORS.black}
          borderColor={COLORS.placeholder}
          backgroundColor={COLORS.white}
          onPress={() => setOpen(false)}
        />
        <Button
          flex
          title="Xác nhận"
          marginLeft={5}
          isLoading={isLoading}
          onPress={() => {
            setOpen(false);
            setConfirm(true);
          }}
        />
      </Block>
    </Block>
  </Modal>
);

const listTransport = [
  { label: 'Đơn vị giao hàng của SEE', value: 0 },
  { label: 'Cửa hàng tự giao', value: 1 },
];

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    fontSize: 14,
    paddingRight: 10,
    fontFamily: FONTS.OpenSansRegular,
  },
  textarea: {
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 23,
    textAlignVertical: 'top',
    fontSize: 14,
    paddingRight: 10,
    fontFamily: FONTS.OpenSansRegular,
  },
  selectStyle: {
    height: 45,
    borderRadius: 5,
    borderWidth: 0.25,
    alignItems: 'center',
    fontFamily: FONTS.OpenSansRegular,
    color: COLORS.textPlaceholder,
    borderColor: COLORS.placeholder,
    backgroundColor: COLORS.white,
  },
});
