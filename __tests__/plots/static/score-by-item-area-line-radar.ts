import { G2Spec } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';

export function scoreByItemAreaLineRadar(): G2Spec {
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
        gridLineWidth: 1,
        gridLineDash: [0, 0],
        gridAreaFill: (dataum, index, data) => {
          return index % 2 === 1 ? 'rgba(0, 0, 0, 0.04)' : '';
        },
      },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMin: 0, domainMax: 80 },
    },
    interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
    children: [
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
