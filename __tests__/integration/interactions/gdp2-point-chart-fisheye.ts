import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export async function gdp2PointFisheye(): Promise<G2Spec> {
  const data = await csv('data/gdp2.csv', autoType);
  return {
    type: 'view',
    data,
    children: [
      {
        type: 'point',
        scale: {
          size: { type: 'log', range: [4, 20] },
        },
        legend: false,
        axis: { y: { tickFormatter: '~s' } },
        encode: {
          x: 'LifeExpectancy',
          y: 'GDP',
          size: 'Population',
          shape: 'point',
          color: 'continent',
        },
        style: {
          fillOpacity: 0.3,
          lineWidth: 1,
        },
      },
    ],
    interactions: [{ type: 'fisheye' }],
  };
}

gdp2PointFisheye.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e] = elements;
  return [
    step(e, 'pointermove', {
      offsetX: 450,
      offsetY: 350,
    }),
  ];
};
