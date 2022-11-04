import { step } from './utils';
import { ELEMENT_CLASS_NAME } from '@/runtime';
import type { G2Spec } from '@/spec';

export function stateAgesIntervalActiveByColorLinked(): G2Spec {
  return {
    type: 'interval',
    padding: 0,
    width: 800,
    transform: [
      { type: 'stackY' },
      { type: 'sortX', by: 'y', reverse: true, slice: 5 },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
      format: 'csv',
    },
    axis: false,
    legend: false,
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    scale: {
      x: { paddingInner: 0.2 },
    },
    interaction: [
      {
        type: 'elementActiveByColor',
        link: true,
        linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
        activeStroke: '#000',
        activeStrokeWidth: 1,
        inactiveOpacity: 0.6,
        linkFillOpacity: 0.5,
      },
    ],
  };
}

stateAgesIntervalActiveByColorLinked.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1] = elements;
  return [step(e1, 'pointerover'), step(e1, 'pointerout')];
};
