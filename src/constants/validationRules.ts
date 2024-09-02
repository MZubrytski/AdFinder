export const passwordRule = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters long',
  },
};

export const emailRule = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: 'Invalid email address',
  },
};

export const minLengthFieldRule = (
  fieldName: string,
  minLengthValue: number,
) => ({
  required: `${fieldName} is required`,
  minLength: {
    value: minLengthValue,
    message: `${fieldName} must be at least ${minLengthValue} characters long`,
  },
});

export const requiredRule = (fieldName: string) => ({
  required: `${fieldName} is required`,
});
