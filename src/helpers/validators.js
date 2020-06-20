import validator from 'validator';

export function validateEmail(value) {
  if (value && !validator.isEmail(String(value))) {
    return 'wrongEmailFormat';
  } else if (!value) {
    return 'isRequired';
  }
}

export function validatePassword(value) {
  if (!value) {//validator.isEmpty(String(value))) {
    return 'isRequired';
  }
}

export function validateName(value) {
  if (!value) {
    return 'isRequired';
  }
}

export function validatePrivacyPolicy(value) {
  if (value !== true) {
    return 'mustAcceptPrivacyPolicy';
  }
}