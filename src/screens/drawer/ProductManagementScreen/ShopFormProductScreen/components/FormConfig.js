import {PRICE_REGEX} from '@constants';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_INPUT = {
  title: 'title',
  content: 'content',
  price: 'price',
  weight: 'weight',
  height: 'height',
  width: 'width',
  length: 'length',
  quantity: 'quantity',
  category: 'category',
  category_child: 'category_child',
  sub_type: 'sub_type',
  type: 'type',
  images: 'images',
};

const schema = yup
  .object({
    [FORM_INPUT.title]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .max(50, 'Tên sản phẩm quá dài'),
    [FORM_INPUT.content]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .max(3000, 'Mô tả quá dài'),
    [FORM_INPUT.weight]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .matches(PRICE_REGEX, 'Sai định dạng'),
    [FORM_INPUT.price]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .matches(PRICE_REGEX, 'Sai định dạng'),
    [FORM_INPUT.height]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .matches(PRICE_REGEX, 'Sai định dạng'),
    [FORM_INPUT.width]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .matches(PRICE_REGEX, 'Sai định dạng'),
    [FORM_INPUT.length]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .matches(PRICE_REGEX, 'Sai định dạng'),
    [FORM_INPUT.quantity]: yup
      .string()
      .nullable()
      .required('Không được để trống')
      .matches(PRICE_REGEX, 'Sai định dạng'),
    // [FORM_INPUT.category]: yup
    //   .string()
    //   .nullable()
    //   .required('Không được để trống'),
    [FORM_INPUT.type]: yup.string().nullable().required('Không được để trống'),
    [FORM_INPUT.sub_type]: yup
      .string()
      .nullable()
      .required('Không được để trống'),
    [FORM_INPUT.images]: yup.array(),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.title]: '',
    [FORM_INPUT.price]: '',
    [FORM_INPUT.quantity]: '',
    [FORM_INPUT.weight]: '',
    [FORM_INPUT.height]: '',
    [FORM_INPUT.width]: '',
    [FORM_INPUT.length]: '',
    [FORM_INPUT.category]: null,
    [FORM_INPUT.category_child]: null,
    [FORM_INPUT.sub_type]: null,
    [FORM_INPUT.type]: null,
  },
};

export default formConfig;
