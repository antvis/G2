import { G2Spec } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';

export function scoreByItemAreaBasicRadar(): G2Spec {
  return {
    type: 'view',
    data: scoreByItem,
    coordinate: { type: 'polar' },
    axis: {
      x: {
        grid: true,
        gridLineWidth: 1,
        tick: false,
        gridLineDash: [0, 0],
      },
      y: {
        zIndex: 1,
        title: false,
        gridConnect: 'line',
        gridLineWidth: 1,
        gridLineDash: [0, 0],
      },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMax: 80 },
    },
    interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
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
      {
        type: 'point',
        encode: {
          x: 'item',
          y: 'score',
          color: 'type',
          shape: 'point',
          size: 3,
        },
        tooltip: null,
      },
    ],
  };
}
