import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../recoil/atoms';
import styled from 'styled-components';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const coinId = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(`${coinId}`)
  );

  console.log('data', data);

  interface CandleStickProps {
    data: {
      x: number;
      y: string[];
    }[];
  }

  return (
    <div>
      {isLoading && <Loader>Loading...</Loader>}
      {!isLoading && (
        <ApexChart
          type='candlestick'
          series={[
            {
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })),
            } as CandleStickProps,
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#FE5A75',
                  downward: '#019FD4',
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

const Loader = styled.span`
  text-align: center;
  display: block;
`;
