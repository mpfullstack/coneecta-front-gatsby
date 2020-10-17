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
  lightPearl: '#f6f2e3',
  green: '#178530',
  yellow: '#b79c0a',
  orange: '#ff7119',
  purple: '#5f0ab7',
  red: '#b70a47'
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

const secondaryButtonColor = theme('mode', {
  light: COLORS.lightGrey,
  dark: COLORS.secondary
});

const secondaryButtonTextColor = theme('mode', {
  light: COLORS.superLightGrey,
  dark: COLORS.primary
});

const secondaryDisabledButtonColor = theme('mode', {
  light: COLORS.superLightGrey,
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

const borderDropdownItemColor = theme('mode', {
  light: COLORS.quinary,
  dark: COLORS.superLightBlue
});

const iconDropdownItemColor = theme('mode', {
  light: COLORS.primary,
  dark: COLORS.superLightBlue
});

const deaultStatusColor = theme('mode', {
  light: COLORS.lightGrey,
  dark: COLORS.green
});

const approvedStatusColor = theme('mode', {
  light: COLORS.green,
  dark: COLORS.green
});

const unapprovedStatusColor = theme('mode', {
  light: COLORS.yellow,
  dark: COLORS.yellow
});

const progressStatusColor = theme('mode', {
  light: COLORS.orange,
  dark: COLORS.orange
});

const unreviewedStatusColor = theme('mode', {
  light: COLORS.purple,
  dark: COLORS.purple
});

const finalizedStatusColor = theme('mode', {
  light: COLORS.blue,
  dark: COLORS.blue
});

const claimedStatusColor = theme('mode', {
  light: COLORS.red,
  dark: COLORS.rend
});

const statusTextColor = theme('mode', {
  light: COLORS.lightPearl,
  dark: COLORS.darkGrey
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
  secondaryButtonColor,
  secondaryButtonTextColor,
  secondaryDisabledButtonColor,
  iconColor,
  skeletonColor,
  skeletonHighlightColor,
  inputBorderColorFocus,
  inputBoxShadowColorFocus,
  borderDropdownItemColor,
  iconDropdownItemColor,
  deaultStatusColor,
  approvedStatusColor,
  statusTextColor,
  unapprovedStatusColor,
  progressStatusColor,
  unreviewedStatusColor,
  finalizedStatusColor,
  claimedStatusColor,
  // Constants
  COLORS,
  SIZES,
  TRANSITIONS
};
