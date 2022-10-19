import yup from 'yup';
import { AnyObject } from 'yup/lib/types';

export const validator = async ({
  schema,
  data
}: {
  schema: yup.ObjectSchema<AnyObject>;
  data: unknown;
}) => {
  const result = { isValid: true, error: '' };

  try {
    await schema.validate(data);
  } catch (error: unknown) {
    const validationError = error as yup.ValidationError;

    result.isValid = false;
    result.error = validationError.errors[0];
  }

  return result;
};
