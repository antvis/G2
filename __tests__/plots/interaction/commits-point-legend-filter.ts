import { G2Spec } from '../../../src';
import { CONTINUOUS_LEGEND_CLASS_NAME } from '../../../src/interaction/legendFilter';

export function commitsPointLegendFilter(): G2Spec {
  return {
    type: 'point',
    height: 300,
    inset: 10,
    padding: 'auto',
    frame: true,
    data: {
      type: 'fetch',
      value: 'data/commits.csv',
    },
    encode: {
      x: (d) => d.time.getUTCHours(),
      y: (d) => d.time.getUTCDay(),
      size: 'count',
      shape: 'point',
      color: 'count',
    },
    transform: [
      { type: 'group', size: 'sum', color: 'sum' },
      { type: 'sortY' },
    ],
    scale: {
      y: { type: 'point' },
      x: { tickCount: 24 },
      color: { palette: 'rdBu' },
    },
    axis: {
      x: { title: 'time (hours)' },
      y: { title: 'time (day)', grid: true },
    },
  };
}

export function dispatchValueChange(legend, values) {
  legend.setSelection(...values);
}

commitsPointLegendFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const [legend] = document.getElementsByClassName(
    CONTINUOUS_LEGEND_CLASS_NAME,
  );
  return [
    {
      changeState: () => {
        dispatchValueChange(legend, [20, 60]);
      },
    },
  ];
};
