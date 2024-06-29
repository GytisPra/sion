import { createGlobalStyle, DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    yellow: '#FFC107',
    white: '#FFFFFF',
    black: '#222222',
    accent: '#006D77',
    accentorange: '#EE7B30',
    disabled: '#979797',
    grey: '#979797',
    red: '#F71735',
    lightblue: '#EDF6F9',
    blinklightblue: '#a9e3f7',
    offwhite: '#F8F8F8',
    buttongrey: '#C4C4C4',
    green: '#089156',
  },
  breakpoints: {
    phone: '576px',
    tablet: '768px',
    desktop: '992px',
    ldesktop: '1200px',
  },
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

export default theme;
