import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_INPUT = {
  groupName: 'groupName',
  optionList: 'optionList',
  optionName: 'optionName',
  optionPrice: 'optionPrice',
  isRequired: 'isRequired',
  quantity: 'quantity',
  min: 'min',
  max: 'max',
};

const schema = yup.object({
  [FORM_INPUT.groupName]: yup
    .string()
    .nullable()

    .required('Tên nhóm không được để trống'),
  [FORM_INPUT.optionList]: yup.array(),
  [FORM_INPUT.max]: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .when('optionList', (optionList, field) => {
      if (optionList?.length > 1) {
        return field
          .required('Không để trống')
          .max(optionList?.length, 'Quá số lượng tối đa')
          .min(2, 'Số lượng tối đa phải nhiều hơn 1');
      } else {
        return;
      }
    }),
  [FORM_INPUT.min]: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .when(
      ['optionList', 'isRequired', 'quantity'],
      (optionList, isRequired, quantity, field) => {
        if (optionList?.length > 1) {
          if (isRequired === 0 && quantity === 0) {
            return;
          }
          return field
            .required('Không để trống')
            .max(
              optionList?.length,
              'Số lượng tối thiểu không thể vượt quá số lượng tối đa',
            )
            .min(1, 'Số lượng tối thiểu phải lớn hơn 0');
        } else {
          return;
        }
      },
    ),
});

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.groupName]: null,
  },
};

export default formConfig;
