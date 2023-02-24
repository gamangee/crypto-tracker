import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './recoil/atoms';
import StatusBar from './routes/components/StatusBar';

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <StatusBar />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
