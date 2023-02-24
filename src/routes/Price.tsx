import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../recoil/atoms';
import ApexChart from 'react-apexcharts';

export default function Price() {
  const isDark = useRecoilValue(isDarkAtom);

  const {
    state: { priceData },
  } = useLocation();

  return (
    <>
      <ApexChart
        type='line'
        series={[
          {
            name: priceData.symbol,
            data: [
              priceData.quotes.USD.percent_change_1y,
              priceData.quotes.USD.percent_change_7d,
              priceData.quotes.USD.percent_change_30d,
              priceData.quotes.USD.percent_change_24h,
              priceData.quotes.USD.percent_change_12h,
              priceData.quotes.USD.percent_change_6h,
              priceData.quotes.USD.percent_change_1h,
              priceData.quotes.USD.percent_change_30m,
              priceData.quotes.USD.percent_change_15m,
            ],
          },
        ]}
        options={{
          theme: {
            mode: isDark ? 'dark' : 'light',
          },
          chart: {
            type: 'line',
            height: 350,
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 10,
              left: 5,
              blur: 2,
              opacity: isDark ? 1 : 0.1,
            },
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },
          title: {
            text: `${priceData.name} Percent Changes`,
            align: 'left',
          },
          stroke: {
            curve: 'smooth',
            width: 10,
          },
          fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: isDark ? ['#FE5A75'] : ['#019FD4'],
              stops: [0, 50],
            },
          },
          colors: ['#ffd32a'],
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            categories: [
              '1y',
              '30d',
              '7d',
              '24h',
              '12h',
              '6h',
              '1h',
              '30m',
              '15m',
            ],
          },
          tooltip: {
            enabled: true,
            x: {
              show: false,
            },
            y: {
              formatter: (value) => `${value.toFixed(2)}%`,
            },
          },
        }}
      />
    </>
  );
}
