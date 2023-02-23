import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import GlobalStyle from './styles/GlobalStyle';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
