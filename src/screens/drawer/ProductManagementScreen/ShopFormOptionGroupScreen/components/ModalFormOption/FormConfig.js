import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {PRICE_REGEX} from '@constants';
export const FORM_INPUT_MODAL = {
  title: 'title',
  price: 'price',
};

const schema = yup
  .object({
    [FORM_INPUT_MODAL.title]: yup.string().required('Tên không được để trống'),
    [FORM_INPUT_MODAL.price]: yup
      .string()
      .required('Giá không được để trống')
      .matches(PRICE_REGEX, 'Không đúng định dạng'),
  })
  .required();

const formConfigModal = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT_MODAL.title]: '',
    [FORM_INPUT_MODAL.price]: '',
  },
};

export default formConfigModal;
