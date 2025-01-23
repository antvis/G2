import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';

export async function tranLineMultiAxesAutoPaddingTickMethod(): Promise<G2Spec> {
  const data = await csv<any>('data/train.csv', autoType);
  const distanceName = new Map(data.map((d) => [d.distance, d.name]));
  const xAxis = {
    tickMethod: () => Array.from(distanceName.keys()),
    labelFormatter: (d) => distanceName.get(d),
    title: false,
  };
  return {
    type: 'line',
    width: 800,
    height: 1000,
    data,
    encode: {
      x: 'distance',
      y: 'time',
      color: 'type',
      series: 'number',
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
    scale: {
      color: {
        domain: ['N', 'L', 'B'],
        range: ['rgb(34, 34, 34)', 'rgb(183, 116, 9)', 'rgb(192, 62, 29)'],
      },
      y: { range: [0, 1], tickCount: 15, utc: true },
    },
    legend: false,
    axis: {
      x: [
        { ...xAxis, position: 'top' },
        {
          ...xAxis,
          position: 'bottom',
        },
      ],
    },
  };
}
