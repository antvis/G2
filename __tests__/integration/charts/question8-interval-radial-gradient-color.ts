import { question8 } from '../data/question8';
import type { G2Spec } from '@/spec';

export function question8IntervalRadialGradientColor(): G2Spec {
  return {
    type: 'interval',
    data: question8,
    scale: {
      color: { range: '#BAE7FF-#1890FF-#0050B3' },
    },
    axis: {
      y: { tickFilter: (d, i) => i !== 0 },
    },
    coordinate: [{ type: 'radial', innerRadius: 0.1, endAngle: Math.PI }],
    encode: {
      x: 'question',
      y: 'percent',
      color: 'percent',
    },
  };
}
