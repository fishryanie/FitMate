/** @format */

import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, FormInput, Icon, Pressable } from '@components';
import { FORM_LOGIN } from './FromConfig';
import { COLORS } from '@theme';

export default function FormLogin({ control }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <Block flex={3} justifyStart paddingHorizontal={15}>
      <FormInput
        require
        marginBottom={25}
        name={FORM_LOGIN.username}
        control={control}
        label={'Username'}
        placeholder="Enter your email or phone number"
        renderIconLeft={
          <Pressable marginRight={15} onPress={() => setShowPass(!showPass)}>
            <Icon IconType={FontAwesome} color={COLORS.grey800} iconName={'user'} />
          </Pressable>
        }
      />
      <FormInput
        require
        label="Password"
        control={control}
        name={FORM_LOGIN.password}
        placeholder="Enter your password"
        secureTextEntry={!showPass}
        renderIconLeft={
          <Pressable marginRight={15} onPress={() => setShowPass(!showPass)}>
            <Icon IconType={FontAwesome} color={COLORS.grey800} iconName={'lock'} />
          </Pressable>
        }
        renderIconRight={
          <Pressable marginLeft={15} onPress={() => setShowPass(!showPass)}>
            <Icon
              IconType={Entypo}
              color={COLORS.grey600}
              iconName={showPass ? 'eye' : 'eye-with-line'}
            />
          </Pressable>
        }
      />
    </Block>
  );
}
