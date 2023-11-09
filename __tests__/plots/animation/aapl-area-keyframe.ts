import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function aaplAreaKeyframe(): Promise<G2Spec> {
  const data = await csv('data/aapl.csv', autoType);
  const missing = data.map((d) => ({
    ...d,
    close: d.date.getUTCMonth() <= 3 ? NaN : d.close,
  }));
  const area = {
    type: 'area',
    data: missing,
    encode: {
      x: 'date',
      y: 'close',
    },
    scale: {
      x: { type: 'time' },
    },
    style: {
      connect: true,
      connectFill: 'grey',
      connectFillOpacity: 0.15,
    },
  };
  return {
    type: 'timingKeyframe',
    width: 800,
    children: [
      // @ts-ignore
      { ...area, width: 800 },
      // @ts-ignore
      { ...area, width: 400 },
    ],
  };
}

aaplAreaKeyframe.intervals = [false, false, [333, 666]];
