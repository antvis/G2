import * as d3 from 'd3-random';
import { G2Spec } from '../../../src';

export function monthIntervalFacetCircle(): G2Spec {
  const random = d3.randomUniform.source(d3.randomLcg(42))(0, 1);
  const M = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  const N = ['A', 'B', 'C', 'D'];
  const mockData = M.flatMap((month) =>
    N.map((name) => ({
      month,
      name,
      value: random(),
    })),
  );
  return {
    type: 'facetCircle',
    encode: {
      position: 'month',
    },
    width: 480,
    height: 480,
    data: mockData,
    children: [
      {
        type: 'interval',
        encode: {
          x: 'name',
          y: 'value',
          color: 'name',
        },
      },
    ],
  };
}
