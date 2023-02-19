/** @format */

import { DATA_GENDER, PHONE_REGEX } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_INPUT = {
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  email: 'email',
  birthday: 'birthday',
  gender: 'gender',
};

const schema = yup
  .object({
    [FORM_INPUT.firstName]: yup.string().required('Không được để trống'),
    [FORM_INPUT.lastName]: yup.string().required('Không được để trống'),
    [FORM_INPUT.birthday]: yup.string().required('Không được để trống'),
    [FORM_INPUT.gender]: yup.string().required('Không được để trống'),
    [FORM_INPUT.email]: yup.string().required('Không được để trống'),
    [FORM_INPUT.phone]: yup.string().required('Không được để trống'),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.firstName]: '',
    [FORM_INPUT.lastName]: '',
    [FORM_INPUT.birthday]: '',
    [FORM_INPUT.gender]: DATA_GENDER[0].value,
    [FORM_INPUT.email]: '',
    [FORM_INPUT.phone]: '',
  },
};

export default formConfig;
