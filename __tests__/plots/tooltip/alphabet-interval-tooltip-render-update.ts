import { CustomEvent } from '@antv/g';
import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { sleep } from '../../integration/utils/sleep';
import { Slice } from '../../../src/data';
import { dispatchPointermove } from './utils';

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

        await sleep(100);
        const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
        const [e0] = elements;
        dispatchPointermove(e0);
      },
    },
    {
      changeState: async () => {
        const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
        const [e0] = elements;
        dispatchPointermove(e0);
      },
    },
  ];
};
