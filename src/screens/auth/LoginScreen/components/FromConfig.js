/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_LOGIN = {
  username: 'username',
  password: 'password',
};

const schema = yup
  .object({
    [FORM_LOGIN.username]: yup.string().nullable().required('loginScreen.email_empty_error'),
    [FORM_LOGIN.password]: yup.string().required('loginScreen.pass_empty_error'),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_LOGIN.username]: '',
    [FORM_LOGIN.password]: '',
  },
};

export default formConfig;
