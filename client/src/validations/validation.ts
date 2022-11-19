import * as yup from 'yup';

export const newUserSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username length should be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Should enter valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});

export const editUserSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username length should be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Should enter valid email'),
  password: yup
    .string()
    .notRequired()
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .nullable()
    .transform(value => (!!value ? value : null)),
  confirmPassword: yup
    .string()
    .notRequired()
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .nullable()
    .transform(value => (!!value ? value : null))
});

export const transactionProductSchema = yup.object().shape({
  price: yup.number().min(1).required('Price is required'),
  quantity: yup.number().integer().min(1).required('Quantity is required')
});
