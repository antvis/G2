import { G2Spec } from '../../../src';
import { temperatures } from '../../data/temperatures';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function temperaturesLineLegendFilterChildrenText(): G2Spec {
  return {
    type: 'view',
    data: temperatures,
    encode: {
      x: 'month',
      y: 'temperature',
      color: 'city',
    },
    children: [
      {
        type: 'line',
      },
      {
        type: 'point',
        style: {
          shape: 'point',
        },
      },
      {
        type: 'text',
        data: ['Jul', 17],
        encode: {
          text: '当前点London温度最高',
          color: 'London', // 加上 color encode
        },
        style: { fill: '#000' },
      },
    ],
  };
}

temperaturesLineLegendFilterChildrenText.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1] = elements;
  return [step(e0, 'click')];
};
