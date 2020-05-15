import validator from 'validator';

export function validateEmail(value) {
  if (value && !validator.isEmail(String(value))) {
    return 'wrongEmailFormat';
  }
}

export function validatePassword(value) {
  if (!value) {//validator.isEmpty(String(value))) {
    return 'isRequired';
  }
}