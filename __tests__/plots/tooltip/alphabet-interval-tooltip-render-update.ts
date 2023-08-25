import { CustomEvent } from '@antv/g';
import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';

export function alphabetIntervalTooltipRenderUpdate(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
      transform: [{ type: 'slice', start: 0, end: 3 }],
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'letter',
    },
    interaction: {
      legendFilter: true,
      tooltip: {
        render: (_, { title, items }) =>
          `<div><h2>${title}</h2>${items.map(
            (d) => `<span>${d.name}: ${d.value}</span>`,
          )}</di>`,
      },
    },
  };
}

alphabetIntervalTooltipRenderUpdate.steps = ({ canvas }) => {
  const { document } = canvas;
  return [
    {
      changeState: async () => {
        const items = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
        const [i0] = items;
        i0.dispatchEvent(new CustomEvent('click'));

        const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
        const [e0] = elements;
        e0.dispatchEvent(new CustomEvent('pointerover'));
      },
    },
    {
      changeState: async () => {
        const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
        const [e0] = elements;
        e0.dispatchEvent(new CustomEvent('pointerover'));
      },
    },
  ];
};
