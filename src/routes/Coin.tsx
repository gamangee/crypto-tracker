import React from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
  coinId?: string | undefined;
}

export default function Coin() {
  const { coinId } = useParams<keyof RouteParams>();

  return <div>Coin: {coinId}</div>;
}
