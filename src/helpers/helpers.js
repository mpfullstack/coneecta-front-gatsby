import numeral from './numeral';

export function capitalise(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatMoney(value) {
  return numeral(value).format('0.00$');
}