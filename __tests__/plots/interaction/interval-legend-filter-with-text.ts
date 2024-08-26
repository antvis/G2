import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function intervalLegendFilterWithText(): G2Spec {
  return {
    type: 'view',
    autoFit: true,
    coordinate: { type: 'theta', outerRadius: 0.8, innerRadius: 0.5 },
    children: [
      {
        type: 'interval',
        data: [
          { item: '事例一', count: 40, percent: 0.4 },
          { item: '事例二', count: 21, percent: 0.21 },
          { item: '事例三', count: 17, percent: 0.17 },
          { item: '事例四', count: 13, percent: 0.13 },
          { item: '事例五', count: 9, percent: 0.09 },
        ],
        encode: { y: 'percent', color: 'item' },
        transform: [{ type: 'stackY' }],
        legend: {
          color: { position: 'bottom', layout: { justifyContent: 'center' } },
        },
        labels: [
          {
            position: 'outside',
            text: (data) => `${data.item}: ${data.percent * 100}%`,
          },
        ],
        tooltip: {
          items: [
            (data) => ({
              name: data.item,
              value: `${data.percent * 100}%`,
            }),
          ],
        },
      },
      {
        type: 'text',
        style: {
          text: '主机',
          x: '50%',
          y: '50%',
          fontSize: 34,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
      },
    ],
  };
}

intervalLegendFilterWithText.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [, e1] = elements;
  return [step(e1, 'click'), step(e1, 'click')];
};
