import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function aapl2CandlestickChart(): G2Spec {
  return {
    type: 'view',
    width: 900,
    data: {
      type: 'fetch',
      value: 'data/aapl2.csv',
    },
    scale: {
      color: {
        domain: [1, 0, -1],
        range: ['#4daf4a', '#999999', '#e41a1c'],
      },
    },
    legend: false,
    axis: {
      y: { title: '↑ Price ($)' },
    },
    interaction: {
      tooltip: { shared: true, sort: (d) => d.value, groupName: false },
    },
    children: [
      {
        type: 'link',
        encode: {
          x: 'Date',
          y: ['Low', 'High'],
        },
        style: {
          stroke: 'black',
        },
        tooltip: {
          title: (d) => d.Date.toUTCString(),
          items: [
            { field: 'Low', name: 'low', valueFormatter: '~s' },
            { field: 'High', name: 'high', valueFormatter: '~s' },
          ],
        },
      },
      {
        type: 'link',
        encode: {
          x: 'Date',
          y: ['Open', 'Close'],
          color: (d) => Math.sign(d.Close - d.Open),
        },
        style: {
          radius: 2,
          fillOpacity: 1,
          lineWidth: 4,
          lineCap: 'round',
        },
        tooltip: {
          title: '',
          items: [
            { field: 'Open', name: 'open', valueFormatter: '~s' },
            { field: 'Close', name: 'close', valueFormatter: '~s' },
          ],
        },
      },
    ],
  };
}

aapl2CandlestickChart.steps = tooltipSteps(0);
