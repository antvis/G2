import { G2Spec } from '../../../src';
import { temperatures } from '../../data/temperatures';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function temperaturesLineLegendFilterOrdinal(): G2Spec {
  return {
    type: 'view',
    data: temperatures,
    axis: { y: { animate: false } },
    children: [
      {
        type: 'line',
        encode: {
          x: 'month',
          y: 'temperature',
          color: 'city',
        },
      },
      {
        type: 'point',
        encode: {
          x: 'month',
          y: 'temperature',
          color: 'city',
        },
        style: {
          fill: '#fff',
        },
      },
    ],
  };
}

temperaturesLineLegendFilterOrdinal.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1] = elements;
  return [
    step(e0, 'click'),
    step(e0, 'click'),
    step(e1, 'click'),
    step(e0, 'click'),
  ];
};
