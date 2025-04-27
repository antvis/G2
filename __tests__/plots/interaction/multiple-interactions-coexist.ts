import { ELEMENT_CLASS_NAME, G2Spec } from '../../../src';
import { disableDelay, step } from './utils';

const state = {
  selected: {
    fill: 'red',
  },
  active: {
    stroke: '#000000',
    lineWidth: 2,
  },
};

export function multipleInteractionsCoexist(): G2Spec {
  return {
    type: 'view',
    autoFit: true,
    state,
    interaction: {
      elementSelect: {},
      elementHighlight: {},
    },
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    ],
    children: [
      {
        encode: { x: '月份', y: '月均降雨量', series: 'name' },
        type: 'interval',
        axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
        state: {
          selected: {
            fill: 'red',
          },
        },
      },
    ],
  };
}

multipleInteractionsCoexist.preprocess = disableDelay;

multipleInteractionsCoexist.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);

  const e1 = elements[0];
  const e2 = elements[1];
  return [step(e1, 'pointerover'), step(e2, 'click')];
};
