import i18n from '@/localization';

export const passwordRule = {
  required: i18n.t('validation.passwordRequired'),
  minLength: {
    value: 6,
    message: i18n.t('validation.passwordMinLength', { minLength: 6 }),
  },
};

export const emailRule = {
  required: i18n.t('validation.emailRequired'),
  pattern: {
    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: i18n.t('validation.invalidEmail'),
  },
};

export const minLengthFieldRule = (
  fieldName: string,
  minLengthValue: number,
) => ({
  required: i18n.t('validation.fieldRequired', { fieldName }),
  minLength: {
    value: minLengthValue,
    message: i18n.t('validation.fieldMinLength', {
      fieldName,
      minLength: minLengthValue,
    }),
  },
});

export const requiredRule = (fieldName: string) => ({
  required: i18n.t('validation.fieldRequired', { fieldName }),
});
