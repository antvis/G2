import { G2Spec } from '../../../src';

const Shapes = [
  'hollow',
  'hollowDiamond',
  'hollowHexagon',
  'hollowSquare',
  'hollowTriangleDown',
  'hollowTriangle',
  'hollowBowtie',
  'point',
  'plus',
  'diamond',
  'square',
  'triangle',
  'hexagon',
  'cross',
  'bowtie',
  'hyphen',
  'line',
  'tick',
  'triangleDown',
];

export function housePricePointShapes(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/house-price-area.json',
    },
    encode: {
      x: (d) => d[0],
      y: (d) => d[1],
      shape: (_, i) => `${i % Shapes.length}`,
      color: '#24b7f2',
      size: 4,
    },
    transform: [
      {
        type: 'sample',
        thresholds: 400,
      },
    ],
  };
}
