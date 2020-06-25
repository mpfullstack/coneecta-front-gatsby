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