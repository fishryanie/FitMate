import {PHONE_REGEX} from '@constants';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_INPUT = {
  name: 'name',
  phone: 'phone',
  about: 'about',
  ward: 'ward',
  address: 'address',
  province: 'province',
  district: 'district',
  locationName: 'locationName',
  isDefault: 'isDefault',
};

const schema = yup
  .object({
    [FORM_INPUT.name]: yup.string().required('Không được để trống'),
    [FORM_INPUT.address]: yup.string().required('Không được để trống'),
    [FORM_INPUT.locationName]: yup.string().required('Không được để trống'),
    [FORM_INPUT.province]: yup.string().required('Không được để trống'),
    [FORM_INPUT.district]: yup.string().required('Không được để trống'),
    [FORM_INPUT.ward]: yup.string().required('Không được để trống'),
    [FORM_INPUT.phone]: yup
      .string()
      .nullable()
      .required('CheckForm.required_phone')
      .min(10, 'CheckForm.min_phone')
      .max(10, 'CheckForm.max_phone')
      .matches(PHONE_REGEX, 'CheckForm.matches_phone'),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.address]: '',
    [FORM_INPUT.name]: '',
    [FORM_INPUT.phone]: '',
    [FORM_INPUT.about]: '',
    [FORM_INPUT.locationName]: '',
    [FORM_INPUT.province]: null,
    [FORM_INPUT.district]: null,
    [FORM_INPUT.ward]: null,
    [FORM_INPUT.isDefault]: '0',
  },
};

export default formConfig;
