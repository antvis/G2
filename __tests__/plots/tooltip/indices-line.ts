import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function indicesLine(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    width: 800,
    paddingLeft: 50,
    children: [
      {
        type: 'line',
        data,
        axis: {
          y: { labelAutoRotate: false },
        },
        transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
        legend: false,
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
        },
        tooltip: { channel: 'y' },
      },
    ],
    interaction: {
      tooltip: true,
    },
  };
}

indicesLine.steps = seriesTooltipSteps([200, 300]);

// Make the local ci and online ci covert Date object to consistent string.
let toString;
indicesLine.before = () => {
  toString = Date.prototype.toString;
  Date.prototype.toString = Date.prototype.toUTCString;
};

indicesLine.after = () => {
  Date.prototype.toString = toString;
};
