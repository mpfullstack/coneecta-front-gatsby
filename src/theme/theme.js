import theme from 'styled-theming';

// Colors
// ------------------------------------------------------
const COLORS = {
  fuchsia: '#ff1f54',
  darkBlue: '#003855',
  blue: '#499db4',
  lightBlue: '#d7f1ec',
  superLightBlue: '#e9f9f6',
  superDarkGrey: '#222222',
  darkGrey: '#444444',
  mediumGrey: '#737373',
  superLightGrey: '#f9f9f9',
  lightGrey: '#bbbbbb'
}

COLORS.primary = COLORS.darkBlue;
COLORS.secondary = COLORS.superLightBlue;
COLORS.titles = COLORS.fuchsia;

// Sizes
// Ref. https://mediag.com/blog/popular-screen-resolutions-designing-for-all/
// ------------------------------------------------------
const SIZES = {
  XS: '478px',
  S: '766px',
  M: '990px',
  L: '1279px',
  maxWidth: '900px'
};

// Theme definitions
// ------------------------------------------------------
const textColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.secondary
});

const backgroundColor = theme('mode', {
  light: COLORS.secondary,
  dark: COLORS.primary
});

const backgroundHeaderColor = theme('mode', {
  light: COLORS.secondary,
  dark: COLORS.primary
});

const backgroundCardHeaderColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.secondary
});

const textCardHeaderColor = theme('mode', {
  light: COLORS.secondary,
  dark: COLORS.primary
});

const borderCardColor = theme('mode', {
  light: COLORS.lightBlue,
  dark: COLORS.darkBlue
});

const dateTimePickerColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.lightBlue
});

const dateTimePickerSelectedTextColor = theme('mode', {
  light: COLORS.lightBlue,
  dark: COLORS.primary
});

const primaryButtonColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.fuchsia
});

const primaryButtonTextColor = theme('mode', {
  light: COLORS.lightBlue,
  dark: COLORS.primary
});

const skeletonColor = theme('mode', {
  light: COLORS.lightBlue,
  dark: COLORS.primary
});

const skeletonHighlightColor = theme('mode', {
  light: COLORS.superLightBlue,
  dark: COLORS.superLightBlue
});

// Transitions
// -------------------------------------------------------
const TRANSITIONS = {
  ease: 'width 0.5s ease, box-shadow 0.5s ease !important'
};

export default {
  // Theme functions
  textColor,
  backgroundColor,
  backgroundHeaderColor,
  backgroundCardHeaderColor,
  borderCardColor,
  textCardHeaderColor,
  dateTimePickerColor,
  dateTimePickerSelectedTextColor,
  primaryButtonColor,
  primaryButtonTextColor,
  skeletonColor,
  skeletonHighlightColor,
  // Constants
  COLORS,
  SIZES,
  TRANSITIONS
};
