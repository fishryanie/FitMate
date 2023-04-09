/** @format */

import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import actions from '@store/actions';
import formConfig, { FORM_INPUT } from './formConfig';
import { useForm } from 'react-hook-form';
import { COLORS } from '@theme';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Icon,
  Block,
  Button,
  FormInput,
  HeaderTitle,
  TouchableOpacity,
} from '@components';

export default function ChangePwdScreen() {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm(formConfig);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);

  const onSubmit = values => {
    dispatch({
      type: actions.CHANGE_PASS,
      body: { currentPass: values.currentPass, newPass: values.newPass },
    });
  };
  return (
    <Block flex backgroundColor={COLORS.light}>
      <HeaderTitle canGoBack title="Thay đổi mật khẩu" />
      <KeyboardAwareScrollView>
        <FormInput
          require
          outline
          margin={15}
          marginTop={30}
          label="Mật khẩu hiện tại"
          control={control}
          name={FORM_INPUT.currentPass}
          placeholder="Nhập mật khẩu hiện tại"
          secureTextEntry={!showPass1}
          renderIconLeft={
            <TouchableOpacity marginRight={15} onPress={() => setShowPass1(!showPass1)}>
              <Icon IconType={FontAwesome} color={COLORS.grey800} iconName={'lock'} />
            </TouchableOpacity>
          }
          renderIconRight={
            <TouchableOpacity marginLeft={15} onPress={() => setShowPass1(!showPass1)}>
              <Icon
                IconType={Entypo}
                color={COLORS.grey600}
                iconName={showPass1 ? 'eye' : 'eye-with-line'}
              />
            </TouchableOpacity>
          }
        />
        <FormInput
          require
          outline
          marginBottom={15}
          marginHorizontal={15}
          label="Xác nhận mật khẩu"
          control={control}
          name={FORM_INPUT.currentPassConfirm}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={!showPass2}
          renderIconLeft={
            <TouchableOpacity marginRight={15} onPress={() => setShowPass2(!showPass2)}>
              <Icon IconType={FontAwesome} color={COLORS.grey800} iconName={'lock'} />
            </TouchableOpacity>
          }
          renderIconRight={
            <TouchableOpacity marginLeft={15} onPress={() => setShowPass2(!showPass2)}>
              <Icon
                IconType={Entypo}
                color={COLORS.grey600}
                iconName={showPass2 ? 'eye' : 'eye-with-line'}
              />
            </TouchableOpacity>
          }
        />
        <FormInput
          require
          outline
          marginBottom={15}
          marginHorizontal={15}
          label="Mật khẩu mới"
          control={control}
          name={FORM_INPUT.newPass}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry={!showPass3}
          renderIconLeft={
            <TouchableOpacity marginRight={15} onPress={() => setShowPass3(!showPass3)}>
              <Icon IconType={FontAwesome} color={COLORS.grey800} iconName={'lock'} />
            </TouchableOpacity>
          }
          renderIconRight={
            <TouchableOpacity marginLeft={15} onPress={() => setShowPass3(!showPass3)}>
              <Icon
                IconType={Entypo}
                color={COLORS.grey600}
                iconName={showPass3 ? 'eye' : 'eye-with-line'}
              />
            </TouchableOpacity>
          }
        />
        <Button
          title="Xác nhận"
          margin={15}
          marginTop={30}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </Block>
  );
}
