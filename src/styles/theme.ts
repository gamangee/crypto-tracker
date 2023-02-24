import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  bgColor: '#0e1333',
  textColor: '#ffffff',
  listTextColor: '#333333',
  listBgColor: '#343A6E',
  accentColor: '#FE5A75',
  gradientColor: 'rgb(154,67,162)',
  linearColor:
    'linear-gradient(90deg, rgba(154,67,162,1) 0%, rgba(37,20,128,1) 100%)',
  // cardBgColor: 'transparent',
};

export const lightTheme: DefaultTheme = {
  bgColor: '#ffffff',
  textColor: '#333333',
  listTextColor: '#333333',
  listBgColor: '#f1f1f1',
  accentColor: '#019FD4',
  gradientColor: 'rgb(255,189,0)',
  linearColor:
    'linear-gradient(90deg, rgba(255,189,0,1) 0%, rgba(208,105,87,1) 100%)',
  // cardBgColor: 'white',
};
