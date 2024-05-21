import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';
import { step } from './utils';

export function scoreByItemAreaRadar(): G2Spec {
  return {
    type: 'view',
    data: scoreByItem,
    coordinate: { type: 'polar' },
    axis: {
      x: { grid: true },
      y: { zIndex: 1, title: false, direction: 'center' },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMax: 80 },
    },
    encode: { x: 'item', y: 'score', shape: 'smooth', color: 'type' },
    interaction: {
      tooltip: {
        body: false,
        marker: false,
        crosshairsLineDash: [4, 4],
        crosshairsLineWidth: 10,
      },
    },
    children: [
      {
        type: 'area',
        style: { fillOpacity: 0.5 },
      },
      {
        type: 'line',
        style: { lineWidth: 2 },
      },
    ],
  };
}

scoreByItemAreaRadar.tooltip = true;

scoreByItemAreaRadar.steps = ({ canvas }) => {
  const { document } = canvas;
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    step(plot, 'pointermove', {
      offsetX: 450,
      offsetY: 350,
    }),
  ];
};
