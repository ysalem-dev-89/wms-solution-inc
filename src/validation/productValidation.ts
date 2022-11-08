import * as yup from 'yup';

const editSchema = yup.object().shape({
  title: yup.string().min(3).max(15).nullable(false).required(),
  price: yup.number().max(6).nullable(false).required(),
  discount: yup.number().min(6).max(16).nullable(false).required(),
  inStock: yup.number().min(8).max(16).nullable(false).required(),
  icon: yup.string().nullable(false).required()
});
export default editSchema;
