import * as yup from 'yup';

const authSchema = yup.object().shape({
  username: yup.string().min(3).max(15).nullable(false).required(),
  password: yup
    .string()
    .min(8)
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!#%*?&]{7,17}$/,
      'Your password must contains at least one number and one special character'
    )
    .required()
});
export default authSchema;
