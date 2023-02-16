import React, {Fragment, useEffect, useRef, useState} from 'react';
import formConfig, {FORM_INPUT} from './components/FormConfig';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Block,
  FormInput,
  HeaderTitle,
  Icon,
  Image,
  ListSort,
  Pressable,
  Text,
} from '@components';
import {
  Hr,
  RenderHeader,
  RenderInput,
  RenderLable,
  RenderNote,
} from './components/Utils';
import {COLORS, FONTS} from '@theme';
import {StyleSheet, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {icons} from '@assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import actions from '@redux/actions';
import {width} from '@utils/responsive';
import Footer from './components/Footer';
import ModalFormOption from './components/ModalFormOption';

const Obligatory = [
  {label: 'Có, bắt buộc', value: 1},
  {label: 'Không bắt buộc', value: 0},
];

const Types = [
  {label: '1 loại', value: 1},
  {label: 'Nhiều loại', value: 0},
];

export default function ShopFormOptionGroupScreen({route}) {
  const extraOption = route?.params?.data;
  const dispatch = useDispatch();

  const scrollRef = useRef();
  const {bottom} = useSafeAreaInsets();
  const {control, handleSubmit, setValue, watch} = useForm(formConfig);
  const [arranged, setArranged] = useState([]);
  const [typeModal, setTypeModal] = useState(null);
  const [optionItemClick, setOptionItemClick] = useState(null);
  const [scrollenabled, setScrollenabled] = useState();
  const [optionList, setOptionList] = useState([]);
  const [showModalFormOption, setShowModalFormOption] = useState(false);
  const [watchQuantityState, setWatchQuantityState] = useState();
  const [watchRequiredState, setWatchRequiredState] = useState();
  const [isChecked, setChecked] = useState(false);

  const groupName = watch(FORM_INPUT.groupName);
  const watchRequired = watch(FORM_INPUT.isRequired);
  const watchQuantity = watch(FORM_INPUT.quantity);

  useEffect(() => {
    setWatchQuantityState(watchQuantity);
    setWatchRequiredState(watchRequired);
    if (watchQuantityState === 0 && watchRequiredState === 0) {
      setValue(FORM_INPUT.min, 0);
    } else {
      setValue(FORM_INPUT.min, 1);
    }
  }, [watchQuantity, watchRequired, watchRequiredState, watchQuantityState]);

  useEffect(() => {
    if (optionList) {
      setValue(FORM_INPUT.max, optionList.length);
      setValue(FORM_INPUT.min, 1);
    }
  }, [optionList]);

  useEffect(() => {
    setValue(FORM_INPUT.max, null);
    setValue(FORM_INPUT.min, null);
  }, []);

  useEffect(() => {
    setValue(FORM_INPUT.quantity, 1);
    setValue(FORM_INPUT.isRequired, 1);
    dispatch({type: actions.SHOP_GET_EXTRA_OPTION});
  }, []);

  useEffect(() => {
    if (arranged?.length > 0) {
      setValue(FORM_INPUT.optionList, arranged);
    }
  }, [arranged]);

  useEffect(() => {
    if (extraOption) {
      setOptionList(extraOption.arr_option);
      setValue(FORM_INPUT.groupName, extraOption.title);
      setValue(FORM_INPUT.optionList, extraOption.arr_option);
      setValue(FORM_INPUT.quantity, +extraOption.quantity);
      setValue(FORM_INPUT.isRequired, +extraOption.is_required);
      setValue(FORM_INPUT.min, extraOption.min_choose);
      setValue(FORM_INPUT.max, extraOption.max_choose);
    }
  }, [extraOption]);

  const RenderInputMin = renderInput => (
    <Block
      rowCenter
      radius={5}
      paddingLeft={10}
      borderWidth={0.25}
      backgroundColor={
        watchQuantityState === 0 && watchRequiredState === 0
          ? COLORS.placeholder2
          : COLORS.white
      }
      borderColor={COLORS.placeholder}>
      {renderInput()}
    </Block>
  );

  return (
    <Block flex backgroundColor={COLORS.white}>
      {/* Header */}
      <HeaderTitle
        canGoBack
        title={extraOption ? 'Chỉnh sửa' : 'Thêm' + ' nhóm tùy chọn'}
        colorIcon="#000000"
        titleProps={{color: '#000000'}}
        backgroundColor={COLORS.white}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        nestedScrollEnabled={true}
        ref={scrollRef}
        scrollEnabled={scrollenabled}
        onContentSizeChange={() => {
          isChecked && scrollRef.current.scrollToEnd();
        }}>
        <Block padding={15} marginTop={6} backgroundColor={COLORS.white}>
          <FormInput
            disable
            control={control}
            marginTop={10}
            width={width - 30}
            name={FORM_INPUT.groupName}
            styles={styles.inputStyle}
            placeholder={'Nhập tên nhóm tùy chọn'}
            customInput={RenderInput}
            customLabel={RenderLable('Tên nhóm tùy chọn*', groupName, 50)}
          />
        </Block>
        {/* Option list */}
        <Hr />
        <RenderHeader title="Tuỳ chọn" />

        <ListSort
          data={optionList}
          CustomItems={CustomItems(
            setShowModalFormOption,
            setTypeModal,
            setOptionItemClick,
          )}
          onChangeOrder={setArranged}
          setScrollenabled={setScrollenabled}
          renderFooter={() => (
            <Block>
              <Text>{''}</Text>
            </Block>
          )}
        />

        <Pressable
          paddingVertical={15}
          paddingHorizontal={15}
          onPress={() => {
            setShowModalFormOption(true);
            setTypeModal(true);
          }}>
          <Text semiBold fontSize={14} color={COLORS.primary}>
            + Thêm một tuỳ chọn
          </Text>
        </Pressable>
        {/* Option detail */}
        <Hr />
        {optionList?.length > 0 && (
          <Fragment>
            <RenderHeader title="Chi tiết tuỳ chọn" />
            <RenderCheckbox
              data={Obligatory}
              setChecked={setChecked}
              setValue={setValue}
              watch={watchRequired}
              name={FORM_INPUT.isRequired}
              title="Có bắt buộc phải chọn tùy chọn?"
            />
            <RenderCheckbox
              data={Types}
              setChecked={setChecked}
              disabled={optionList?.length > 1 ? false : true}
              setValue={setValue}
              watch={watchQuantityState}
              name={FORM_INPUT.quantity}
              title="Khách hàng có thể chọn bao nhiêu loại tùy chọn ?"
            />
            {watchQuantityState === 0 && (
              <Block
                // rowCenter
                row
                spaceAround
                marginBottom={30}
                paddingHorizontal={10}
                backgroundColor={COLORS.white}>
                <FormInput
                  editable={
                    watchQuantityState === 0 && watchRequiredState === 0
                      ? false
                      : true
                  }
                  width={(width - 45) / 2}
                  control={control}
                  label="Tối thiểu"
                  numberValueType
                  inputProps={{keyboardType: 'number-pad'}}
                  placeholder={'Nhập Tối thiểu'}
                  name={FORM_INPUT.min}
                  customInput={RenderInputMin}

                  // editable={watchRequired === 0 && watchQuantity === 0 && false}
                />

                <FormInput
                  width={(width - 45) / 2}
                  control={control}
                  label="Tối đa"
                  numberValueType
                  placeholder={'Nhập Tối đa'}
                  inputProps={{keyboardType: 'number-pad'}}
                  name={FORM_INPUT.max}
                  styles={styles.inputStyle}
                  customInput={RenderInput}
                />
              </Block>
            )}

            <RenderNote
              watchQuantity={watchQuantityState}
              watchRequired={watchRequiredState}
              optionList={optionList}
            />
          </Fragment>
        )}
      </ScrollView>
      <Footer
        extraOption={extraOption}
        listOption={optionList}
        handleSubmit={handleSubmit}
      />
      <ModalFormOption
        setValueOptionList={setValue}
        typeModal={typeModal}
        optionItemClick={optionItemClick}
        optionList={optionList}
        open={showModalFormOption}
        setOpen={setShowModalFormOption}
        setOptionList={setOptionList}
      />
    </Block>
  );
}

const RenderCheckbox = ({
  title,
  data,
  name,
  setChecked,
  watch,
  disabled = false,
  setValue,
  ...props
}) => {
  return (
    <Block padding={15} backgroundColor={COLORS.white} {...props}>
      <Text regular fontSize={14} color={COLORS.black}>
        {title}
      </Text>
      {data?.map((item, index) => (
        <Pressable
          disabled={disabled}
          rowCenter
          marginTop={15}
          key={index}
          onPress={() => {
            setValue(name, item?.value);
            setChecked(true);
          }}>
          <Block
            round={19}
            alignCenter
            justifyCenter
            borderWidth={1}
            marginRight={20}
            borderColor={
              item?.value === watch ? COLORS.primary : COLORS.border2
            }>
            <Block
              round={13}
              backgroundColor={
                item?.value === watch ? COLORS.primary : COLORS.border2
              }
            />
          </Block>
          <Text
            regular
            fontSize={16}
            color={disabled ? COLORS.gray6 : COLORS.black}>
            {item?.label}
          </Text>
        </Pressable>
      ))}
    </Block>
  );
};

const CustomItems =
  (setShowModalFormOption, setTypeModal, setOptionItemClick) =>
  ({index, data}) => {
    return (
      <Block
        rowCenter
        spaceBetween
        paddingVertical={15}
        borderBottomWidth={1}
        backgroundColor={COLORS.white}
        borderColor={COLORS.placeholder2}>
        <Image source={icons.ic_sort} square={15} marginRight={10} />
        <Pressable
          flex
          rowCenter
          spaceBetween
          onPress={() => {
            setShowModalFormOption(true);
            setTypeModal(false);
            setOptionItemClick({...data, index: index});
          }}>
          <Block flex rowCenter spaceBetween>
            <Text medium fontSize={14} marginLeft={20} numberOfLines={1}>
              {data?.title}
            </Text>
          </Block>
          <Block rowCenter spaceBetween>
            <Text
              regular
              fontSize={14}
              marginRight={10}
              color={COLORS.placeholder}>
              +{data?.price}
            </Text>
            <Icon
              IconType={MaterialIcons}
              iconName={'keyboard-arrow-right'}
              color={COLORS.placeholder}
              iconSize={25}
            />
          </Block>
        </Pressable>
      </Block>
    );
  };

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    fontSize: 14,
    fontFamily: FONTS.OpenSansRegular,
  },
});
