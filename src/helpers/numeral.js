const numeral = require('numeral');

// load a locale
numeral.register('locale', 'es', {
  delimiters: {
      thousands: ' ',
      decimal: ','
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
  },
  ordinal : function (number) {
      return 'º';
  },
  currency: {
      symbol: '€'
  }
});

// switch between locales
numeral.locale('es');

export default numeral;