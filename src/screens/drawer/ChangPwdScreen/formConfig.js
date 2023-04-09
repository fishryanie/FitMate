/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_INPUT = {
  newPass: 'newPass',
  currentPass: 'currentPass',
  currentPassConfirm: 'currentPassConfirm',
};

const schema = yup
  .object({
    [FORM_INPUT.newPass]: yup.string().required('Không được để trống'),
    [FORM_INPUT.currentPass]: yup.string().required('Không được để trống'),
    [FORM_INPUT.currentPassConfirm]: yup
      .string()
      .required('Không được để trống')
      .oneOf([yup.ref('currentPass'), null], 'Mật khẩu không giống'),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.newPass]: '',
    [FORM_INPUT.currentPass]: '',
    [FORM_INPUT.currentPassConfirm]: '',
  },
};

export default formConfig;
