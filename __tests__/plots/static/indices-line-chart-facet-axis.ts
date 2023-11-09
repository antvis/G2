import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function indicesLineChartFacetAxis(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'facetRect',
    height: 600,
    width: 700,
    paddingTop: 50,
    paddingLeft: 60,
    encode: { y: 'Symbol' },
    scale: { y: { paddingInner: 0.2 } },
    legend: false,
    data,
    children: [
      {
        type: 'line',
        frame: false,
        scale: { y: { nice: true, facet: false } },
        axis: {
          y: { labelAutoHide: false },
          x: ({ rowIndex }) =>
            rowIndex === 0
              ? { position: 'top' }
              : {
                  tickLine: false,
                  tick: false,
                  title: false,
                  label: false,
                },
        },
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
        },
      },
    ],
  };
}
