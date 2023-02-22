import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
