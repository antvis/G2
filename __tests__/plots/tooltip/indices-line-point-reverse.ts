import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

interface Row {
  Date: string;
  Symbol: string;
}
export async function indicesLinePointReverse(): Promise<G2Spec> {
  const raw = await csv<Row>('data/indices.csv', autoType);
  const symbols = ['AAPL', 'AMZN'];
  const data = raw.filter((d) => {
    const date = new Date(d.Date);
    const year = date.getFullYear();
    const month = date.getMonth();
    return year < 2014 && month < 5 && symbols.includes(d.Symbol);
  });
  return {
    type: 'view',
    width: 800,
    paddingLeft: 60,
    data: data.reverse(),
    children: [
      {
        type: 'line',
        axis: {
          y: { labelAutoRotate: false },
        },
        legend: false,
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
        },
        tooltip: { title: (d) => new Date(d.Date).toUTCString() },
      },
      {
        type: 'point',
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
        },
        tooltip: false,
      },
    ],
  };
}

indicesLinePointReverse.steps = seriesTooltipSteps([100, 300], [500, 300]);
