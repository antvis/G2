import { G2Spec } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';
import { seriesTooltipSteps } from './utils';

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
        crosshairsLineDash: [4, 4],
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

scoreByItemAreaRadar.steps = seriesTooltipSteps([200, 300]);
