/** @format */

import moment from 'moment';
import actions from 'store/actions';
import React, { useEffect, useState } from 'react';
import formConfig, { FORM_INPUT } from './formConfig';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { DATA_GENDER } from '@constants';
import { useCallback } from 'react';
import { COLORS } from '@theme';
import {
  Block,
  Button,
  FormDateTime,
  FormInput,
  FormRadio,
  HeaderTitle,
  PopupAccept,
  ScrollView,
} from '@components';

export default function AccountInfoScreen() {
  const { control, handleSubmit, setValue } = useForm(formConfig);
  const dispatch = useDispatch();
  const infoUser = useSelector(state => state.getOneUser?.data);
  const loadingEdit = useSelector(state => state?.updateOneUser?.isLoading);
  const [isShowPopupDeleteAccount, setShowPopupDeleteAccount] = useState(false);

  const onSubmit = values => {
    const body = {
      phone: values?.phone,
      email: values?.email,
      gender: values?.gender,
      lastName: values?.lastName,
      firstName: values?.firstName,
      dob: moment(values.birthday).format('MM/DD/YYYY'),
    };
    console.log('🚀 ~ file: index.js:39 ~ onSubmit ~ body', body);
    dispatch({ type: actions.UPDATE_ONE_USER, body });
  };

  const handleDeleteAccount = () => {
    dispatch({ type: actions.DELETE_ONE_USER, params: { idUser: infoUser?._id } });
  };

  const handleRefresh = useCallback(() => {
    setValue(FORM_INPUT.email, infoUser?.email);
    setValue(FORM_INPUT.phone, infoUser?.phone);
    setValue(FORM_INPUT.gender, infoUser?.gender);
    setValue(FORM_INPUT.birthday, infoUser?.dob);
    setValue(FORM_INPUT.firstName, infoUser?.firstName);
    setValue(FORM_INPUT.firstName, infoUser?.firstName);
  }, [setValue, infoUser]);

  useEffect(() => {
    setValue(FORM_INPUT.email, infoUser?.email);
    setValue(FORM_INPUT.phone, infoUser?.phone);
    setValue(FORM_INPUT.gender, infoUser?.gender);
    setValue(FORM_INPUT.birthday, new Date(Date.parse(infoUser?.dob)));
    setValue(FORM_INPUT.lastName, infoUser?.lastName);
    setValue(FORM_INPUT.firstName, infoUser?.firstName);
  }, [setValue, infoUser]);

  return (
    <Block flex backgroundColor={COLORS.light}>
      <HeaderTitle canGoBack title="Personal Information" />
      <ScrollView padding={15} onRefresh={handleRefresh}>
        {/* <Block
          width={width}
          height={6}
          backgroundColor={COLORS.grey100}
          marginHorizontal={-15}
        /> */}

        {/* <UserAvatar
          canPicker
          name="123"
          size={120}
          alignSelfCenter
          marginBottom={20}
          imagePicker={imagePicker}
          setImagePicker={setImagePicker}
        /> */}
        <Block row marginVertical={20}>
          <FormInput
            flex
            require
            outline
            marginRight={15}
            control={control}
            name={FORM_INPUT.firstName}
            label="First name"
            placeholder="Enter your first name"
          />
          <FormInput
            flex
            require
            outline
            control={control}
            name={FORM_INPUT.lastName}
            label="Last name"
            placeholder="Enter your last name"
          />
        </Block>
        <FormDateTime
          outline
          control={control}
          marginBottom={20}
          name={FORM_INPUT.birthday}
          label="Birthday"
        />
        <FormInput
          flex
          require
          outline
          disabled
          control={control}
          marginBottom={20}
          name={FORM_INPUT.phone}
          label="Phone Number"
          placeholder="Enter your phone"
        />
        <FormInput
          flex
          require
          outline
          disabled
          control={control}
          marginBottom={20}
          name={FORM_INPUT.email}
          label="Email"
          placeholder="Enter your email"
        />
        <FormRadio control={control} data={DATA_GENDER} name={FORM_INPUT.gender} />
        <Block rowCenter marginTop={50}>
          <Button
            flex
            outline
            title="Delete account"
            onPress={() => setShowPopupDeleteAccount(true)}
          />
          <Button
            flex
            title="Save"
            marginLeft={15}
            loading={loadingEdit}
            onPress={handleSubmit(onSubmit)}
          />
        </Block>
      </ScrollView>
      <PopupAccept
        title="Are you sure you want to delete your account?"
        description="Việc xoá tài khoản này chỉ là tạm thời ngưng hoạt động tài khoản của bạn, trong vòng 90 ngày nếu bạn muốn khôi phục lại tài khoản hãy liên hệ với admin trong mục hỗ trợ của ứng dụng"
        isShow={isShowPopupDeleteAccount}
        onShow={setShowPopupDeleteAccount}
        onAccept={handleDeleteAccount}
        onClose={() => setShowPopupDeleteAccount(false)}
      />
    </Block>
  );
}
