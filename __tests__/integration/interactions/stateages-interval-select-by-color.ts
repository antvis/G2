import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function stateAgesIntervalSelectByColor(): G2Spec {
  return {
    type: 'interval',
    padding: 0,
    axis: false,
    legend: false,
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
        type: 'elementSelectByColor',
        link: true,
        linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
        selectedStroke: '#000',
        selectedStrokeWidth: 1,
        unselectedOpacity: 0.6,
        linkFillOpacity: 0.5,
      },
    ],
  };
}

stateAgesIntervalSelectByColor.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1] = elements;
  const e2 = elements[elements.length - 1];
  return [
    step(e1, 'click'),
    step(e2, 'click'),
    step(e1, 'click'),
    step(e2, 'click'),
  ];
};
