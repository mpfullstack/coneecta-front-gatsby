import numeral from './numeral';

export function capitalise(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatMoney(value) {
  return numeral(value).format('0.00$');
}

export function getSize() {
  const isClient = typeof window === 'object';
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  };
};

export function isDevice() {
  const size = getSize();
  if (size.width < 990) {
    return true;
  } else {
    return false;
  }
}

export function isDesktop() {
  const size = getSize();
  if (size.width >= 990) {
    return true;
  } else {
    return false;
  }
}

export function range(start, stop, step) {
  return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
}

export function getSlugFromPath(path) {
  /^\/u\/(.+)$/gmi.exec(path);
  return RegExp.$1;
}

export function isFormValid(formState, requiredFields, fieldValidators) {
  let valid =  Object.keys(formState.validity).every(key => {
    return formState.validity[key];
  });
  let requiredValidation = requiredFields.every(fieldname => {
    if (fieldname in formState.errors) {
      if (formState.errors[fieldname] != null) {
        return false;
      } else {
        return true;
      }
    } else if (fieldname in fieldValidators && typeof fieldValidators[fieldname] === 'function') {
      return fieldValidators[fieldname](formState.values[fieldname], formState.values) === undefined;
    } else {
      return false;
    }
  });
  return valid && requiredValidation;
}

export function isFieldValid(name, formState, valdidateFunc) {
  if (formState.isPristine()) {
    return {};
  } else {
    if (name in formState.errors) {
      if (formState.errors[name] != null) {
        return {
          isInvalid: true,
          isValid: false
        };
      } else {
        return {
          isInvalid: false,
          isValid: true
        };
      }
    } else if (typeof valdidateFunc === 'function') {
      let valid = valdidateFunc(formState.values[name]);
      return {
        isInvalid: valid !== undefined,
        isValid: valid === undefined
      };
    } else {
      return {}
    }
  }
}