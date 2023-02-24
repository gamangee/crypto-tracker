import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Chart from './routes/Chart';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';
import Error from './routes/components/Error';

const router = createBrowserRouter([
  {
    path: '/crypto-tracker',
    element: <Coins />,
    errorElement: <Error />,
  },
  {
    path: '/coin/:coinId',
    element: <Coin />,
    errorElement: <Error />,
    children: [
      {
        path: 'chart',
        element: <Chart />,
      },
      {
        path: 'price',
        element: <Price />,
      },
    ],
  },
]);

export default router;
