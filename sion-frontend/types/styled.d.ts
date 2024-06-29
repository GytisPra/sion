import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string];
      yellow: string;
      white: string;
      black: string;
      accent: string;
      accentorange: string;
      disabled: string;
      lightblue: string;
      blinklightblue: string;
      offwhite: string;
      grey: string;
      red: string;
      buttongrey: string;
      green: string;
    };
    breakpoints: {
      phone: string;
      tablet: string;
      desktop: string;
      ldesktop: string;
    };
  }
}
