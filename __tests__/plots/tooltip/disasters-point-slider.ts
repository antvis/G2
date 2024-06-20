import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function disastersPointSlider(): G2Spec {
  return {
    type: 'point',
    insetTop: 30,
    insetLeft: 30,
    clip: true,
    data: {
      type: 'fetch',
      value: 'data/disasters.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.Entity !== 'All natural disasters',
        },
      ],
    },
    scale: { size: { rangeMax: 35 } },
    encode: {
      x: 'Year',
      y: 'Entity',
      size: 'Deaths',
      color: 'Entity',
      shape: 'point',
    },
    style: {
      stroke: 'black',
      opacity: 0.8,
      lineWidth: 1,
    },
    slider: { x: { values: [0.1, 0.5] } },
    legend: false,
    interaction: {
      tooltip: {
        render: () =>
          `<h1 style="display:block; height: 100px; width: 100px">tooltip</h1>`,
      },
    },
  };
}

disastersPointSlider.steps = tooltipSteps(0);
