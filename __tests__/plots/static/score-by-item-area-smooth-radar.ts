import { G2Spec } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';

export function scoreByItemAreaSmoothRadar(): G2Spec {
  return {
    type: 'view',
    data: scoreByItem,
    padding: 0,
    height: 640,
    coordinate: { type: 'polar' },
    axis: {
      x: { grid: true },
      y: { zIndex: 1, title: false, direction: 'center' },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5 },
    },
    legend: false,
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
    style: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
