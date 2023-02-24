import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    listTextColor: string;
    listBgColor: string;
    accentColor: string;
    gradientColor: string;
    linearColor: string;
  }
}
