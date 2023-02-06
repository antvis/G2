import { G2Spec } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';

export function scoreByItemAreaSmoothRadar(): G2Spec {
  return {
    type: 'view',
    data: scoreByItem,
    coordinates: [{ type: 'polar' }],
    axis: {
      x: { grid: true },
      y: { zIndex: 1, title: false },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5 },
    },
    legend: { color: { layout: { justifyContent: 'flex-start' } } },
    children: [
      {
        type: 'area',
        encode: { x: 'item', y: 'score', color: 'type', shape: 'smooth' },
        style: { fillOpacity: 0.5 },
      },
      {
        type: 'line',
        encode: { x: 'item', y: 'score', color: 'type', shape: 'smooth' },
        style: { lineWidth: 2 },
      },
    ],
  };
}
