import validator from 'validator';

export function validateEmail(value) {
  if (value && !validator.isEmail(String(value))) {
    return 'wrongEmailFormat';
  } else if (!value) {
    return 'isRequired';
  }
}

export function validatePassword(value) {
  if (!value) {
    return 'isRequired';
  } else if (value.toString().length < 8) {
    return 'minimumCharactersRequired';
  }
}

export function validateRepeatPassword(value, otherValue) {
  let isValid = validatePassword(value);
  if (isValid === undefined) {
    if (value !== otherValue) {
      isValid = 'passwordDontMach';
    }
  }
  return isValid;
}

export function validateName(value) {
  if (!value) {
    return 'isRequired';
  }
}

export function validateRequired(value) {
  if (!value) {
    return 'isRequired';
  }
}

export function validatePrivacyPolicy(value) {
  if (value !== true) {
    return 'mustAcceptPrivacyPolicy';
  }
}