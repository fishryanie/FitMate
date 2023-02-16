import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Block, Button, FormInput, Modal} from '@components';
import {COLORS, FONTS} from '@theme';
import {FORM_INPUT} from './FormConfig';
import {useForm} from 'react-hook-form';
import formConfigModal, {FORM_INPUT_MODAL} from './FormConfig';
import {useKeyboard} from '@react-native-community/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {width} from '@utils/responsive';
import {CustomToast} from '@utils';

export default function ModalFormOption({
  open,
  setOpen,
  setValueOptionList,
  typeModal,
  optionItemClick,
  optionList,
  setOptionList,
}) {
  const {control, handleSubmit, reset, setValue} = useForm(formConfigModal);
  const {keyboardShown} = useKeyboard();
  const {bottom} = useSafeAreaInsets();
  const inputRef = useRef();
  const handlePress = handleSubmit(value => {
    setValueOptionList(FORM_INPUT.optionList, [...optionList, value]);
    setOptionList([...optionList, value]);
    reset();
    inputRef?.current?.focus?.();
  });
  const removeElement = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
  const handleDelete = handleSubmit(() => {
    if (optionList.length > 0) {
      CustomToast('Cần có ít nhất 1 tuỳ chọn');
      return;
    }
    setOpen(false);
    setOptionList(removeElement(optionList, optionItemClick?.index));
  });
  const handleUpdate = handleSubmit(value => {
    const data = optionList?.map((item, idx) => {
      return idx !== optionItemClick?.index
        ? item
        : {title: value.title, price: value.price};
    });
    setOptionList(data);
    setOpen(false);
  });
  useEffect(() => {
    if (!typeModal) {
      setValue(FORM_INPUT_MODAL.title, optionItemClick?.title);
      setValue(FORM_INPUT_MODAL.price, optionItemClick?.price);
    } else {
      setValue(FORM_INPUT_MODAL.title, '');
      setValue(FORM_INPUT_MODAL.price, '');
    }
  }, [optionItemClick, typeModal]);

  useEffect(() => {
    if (!keyboardShown) {
      setOpen(false);
    }
  }, [keyboardShown]);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => inputRef?.current?.focus?.(), 100);
    return () => {
      clearTimeout(timer);
    };
  }, [open]);
  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => {
        setOpen(false);
        reset();
      }}>
      <KeyboardAvoidingView
        onBackdropPress
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Block
          alignCenter
          padding={15}
          paddingTop={25}
          paddingBottom={keyboardShown ? 15 : bottom}
          borderTopRadius={20}
          backgroundColor={COLORS.white}>
          <FormInput
            disable
            control={control}
            inputProps={{
              autoCorect: false,
              // keyboardType: 'visible-password',
              autoFocus: Platform.OS === 'ios' ? true : false,
            }}
            setRef={inputRef}
            name={FORM_INPUT_MODAL.title}
            styles={styles.inputStyle}
            placeholder={'Nhập tên tuỳ nhọn'}
            customInput={RenderInput}
            label="Tên tuỳ chọn*"
          />
          <FormInput
            marginTop={20}
            disable
            control={control}
            marginHorizontal={10}
            name={FORM_INPUT_MODAL.price}
            inputProps={{keyboardType: 'number-pad'}}
            styles={styles.inputStyle}
            placeholder={'Nhập giá'}
            customInput={RenderInput}
            label="Giá*"
          />

          {typeModal ? (
            <Block width={width} height={45} marginTop={30}>
              <Button flex title="Thêm mới" onPress={handlePress} />
            </Block>
          ) : (
            <Block
              row
              paddingTop={30}
              alignSelf={'flex-end'}
              paddingBottom={bottom === 0 ? 10 : bottom - 25}
              backgroundColor={COLORS.white}>
              <Button
                flex
                title="Xoá tuỳ chọn"
                backgroundColor="red"
                onPress={handleDelete}
                marginRight={10}
              />
              <Button flex title="Sửa" onPress={handleUpdate} />
            </Block>
          )}
        </Block>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const RenderInput = renderInput => (
  <Block
    width={width - 30}
    rowCenter
    radius={5}
    paddingLeft={10}
    borderWidth={0.25}
    backgroundColor={COLORS.white}
    borderColor={COLORS.placeholder}>
    {renderInput()}
  </Block>
);

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    width: '100%',
    fontSize: 14,
    fontFamily: FONTS.OpenSansRegular,
  },
});
