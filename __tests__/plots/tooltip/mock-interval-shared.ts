import { CustomEvent } from '@antv/g';
import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { tooltipSteps } from './utils';

export function mockIntervalShared(): G2Spec {
  return {
    type: 'interval',
    data: {
      value: [
        { color: '房地产', x: '20230702', y: 36049 },
        { color: '房地产', x: '20230703', y: 26229 },
        { color: '汽车', x: '20230702', y: 23016 },
        { color: '汽车', x: '20230703', y: 48280 },
      ],
    },
    encode: { x: 'x', y: 'y', color: 'color', series: 'color' },
    legend: { color: { title: false } },
    interaction: { tooltip: { shared: true } },
  };
}

mockIntervalShared.steps = ({ canvas }) => {
  const { document } = canvas;
  const [legend] = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  return [
    {
      changeState: async () => {
        legend.dispatchEvent(new CustomEvent('click'));
      },
    },
    ...tooltipSteps(2)({ canvas }),
  ];
};
