import {
  ELEMENT_CLASS_NAME,
  G2Spec,
  PLOT_CLASS_NAME,
  VIEW_CLASS_NAME,
} from '../../../src';
import { step } from './utils';

export function stateAgesSankeyHighlight(): G2Spec {
  return {
    type: 'sankey',
    data: {
      type: 'fetch',
      value: 'data/energy.csv',
      format: 'csv',
      transform: [
        {
          type: 'custom',
          callback: (data) => {
            return {
              links: data,
            };
          },
        },
      ],
    },
    state: {
      active: {
        fill: 'red',
        linkFill: 'blue',
      },
      inactive: {
        opacity: 0.6,
      },
    },
    interaction: {
      elementHighlight: true,
    },
  };
}

stateAgesSankeyHighlight.steps = ({ canvas }) => {
  const { document } = canvas;
  const result: any[] = [];
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  result.push(step(plot, 'pointerover'));
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const target = elements[0];
  elements.forEach((ele) => {
    if (ele['__data__']['data']['source']) {
      if (ele['__data__']['data']['source']['key'] === 'Nuclear') {
        result.push(step(ele, 'pointerover'));
      }
    } else {
      if (ele['__data__']['data']['key'] === 'Nuclear') {
        result.push(step(ele, 'pointerover'));
      }
    }
  });
  return result;
};
