import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';

interface Row {
  distance: number;
  name: string;
}

export async function tranLineMultiAxes(): Promise<G2Spec> {
  const data = await csv<Row>('data/train.csv', autoType);
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
        { ...xAxis, position: 'top', labelTransform: 'rotate(90)' },
        {
          ...xAxis,
          position: 'bottom',
          labelTransform: 'rotate(90)',
        },
      ],
    },
  };
}
