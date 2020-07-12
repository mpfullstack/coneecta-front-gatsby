import theme from 'styled-theming';

// Colors
// ------------------------------------------------------
const COLORS = {
  fuchsia: '#ff1f54',
  fuchsiaLight: '#ff9bb3',
  darkBlue: '#003855',
  blue: '#499db4',
  lightBlue: '#00385525',
  superLightBlue: '#e9f9f6',
  superDarkGrey: '#222222',
  darkGrey: '#444444',
  mediumGrey: '#737373',
  superLightGrey: '#f9f9f9',
  lightGrey: '#bbbbbb',
  pearl: '#f1e9cd',
  superLightPearl: '#fffcf3',
  lightPearl: '#f6f2e3'
}

COLORS.primary = COLORS.darkBlue;
COLORS.secondary = COLORS.superLightPearl;
COLORS.tertiary = COLORS.fuchsia;
COLORS.tertiaryLight = COLORS.fuchsiaLight;
COLORS.quaternary = COLORS.lightPearl;
COLORS.quinary = COLORS.pearl;

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

const backgroundServiceCardHeaderColor = theme('mode', {
  light: COLORS.lightBlue,
  dark: COLORS.secondary
});

const textServiceCardHeaderColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.primary
});

const iconColor = theme('mode', {
  light: COLORS.tertiary,
  dark: COLORS.primary
});

const borderCardColor = theme('mode', {
  light: COLORS.lightPearl,
  dark: COLORS.darkBlue
});

const dateTimePickerColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.lightBlue
});

const boxBackgroundColor = theme('mode', {
  light: COLORS.quaternary,
  dark: COLORS.lightBlue
});


const dateTimePickerButtonsColor = theme('mode', {
  light: COLORS.tertiary,
  dark: COLORS.lightBlue
});

const dateTimePickerSelectedTextColor = theme('mode', {
  light: COLORS.secondary,
  dark: COLORS.primary
});

const primaryButtonColor = theme('mode', {
  light: COLORS.tertiary,
  dark: COLORS.secondary
});

const primaryButtonTextColor = theme('mode', {
  light: COLORS.secondary,
  dark: COLORS.primary
});

const primaryDisabledButtonColor = theme('mode', {
  light: COLORS.tertiaryLight,
  dark: COLORS.secondary
});

const skeletonColor = theme('mode', {
  light: COLORS.lightPearl,
  dark: COLORS.primary
});

const skeletonHighlightColor = theme('mode', {
  light: COLORS.superLightPearl,
  dark: COLORS.superLightBlue
});

const inputBorderColorFocus = theme('mode', {
  light: COLORS.quinary,
  dark: COLORS.superLightBlue
});

const inputBoxShadowColorFocus = theme('mode', {
  light: `${COLORS.quinary}90`,
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
  textCardHeaderColor,
  backgroundServiceCardHeaderColor,
  textServiceCardHeaderColor,
  borderCardColor,
  dateTimePickerColor,
  boxBackgroundColor,
  dateTimePickerButtonsColor,
  dateTimePickerSelectedTextColor,
  primaryButtonColor,
  primaryButtonTextColor,
  primaryDisabledButtonColor,
  iconColor,
  skeletonColor,
  skeletonHighlightColor,
  inputBorderColorFocus,
  inputBoxShadowColorFocus,
  // Constants
  COLORS,
  SIZES,
  TRANSITIONS
};
