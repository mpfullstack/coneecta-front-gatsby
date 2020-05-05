import theme from 'styled-theming';

// Colors
// ------------------------------------------------------
const COLORS = {
  primary: '#6cc3bf',
  superDarkGrey: '#222222',
  darkGrey: '#444444',
  mediumGrey: '#737373',
  lightGrey: '#bbbbbb',
  superLightGrey: '#f9f9f9',
  purple: '#eeeefc',
  green: '#e8f5e0'
}

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
const backgroundColor = theme('mode', {
  light: COLORS.superLightGrey,
  dark: COLORS.superDarkGrey
});

const backgroundHeaderColor = theme('mode', {
  light: '#fff',
  dark: COLORS.superDarkGrey
});

// Transitions
// -------------------------------------------------------
const TRANSITIONS = {
  ease: 'width 0.5s ease, box-shadow 0.5s ease !important'
};

export default {
  // Theme functions
  backgroundColor,
  backgroundHeaderColor,
  // Constants
  COLORS,
  SIZES,
  TRANSITIONS
};
