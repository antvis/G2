import { G2Spec } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';

export function scoreByItemAreaRadarCustom(): G2Spec {
  return {
    type: 'view',
    data: scoreByItem,
    coordinate: { type: 'polar' },
    inset: 50,
    axis: {
      x: { grid: true },
      y: {
        zIndex: 1,
        title: false,
        tickCount: 3,
        direction: 'center',
        gridStroke: 'red',
        gridStrokeOpacity: 1,
        labelStroke: 'green',
        lineStroke: 'yellow',
        tickStroke: 'red',
      },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5 },
    },
    legend: { color: { layout: { justifyContent: 'flex-start' } } },
    children: [
      {
        type: 'area',
        encode: { x: 'item', y: 'score', color: 'type' },
        style: { fillOpacity: 0.5 },
      },
      {
        type: 'line',
        encode: { x: 'item', y: 'score', color: 'type' },
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
