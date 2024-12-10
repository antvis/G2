import { G2Spec } from '../../../src';
import { helix } from '../../data/helix';

export function helixBasic(): G2Spec {
  return {
    type: 'interval',
    autoFit: true,
    height: 500,
    data: {
      value: helix,
    },
    encode: { x: 'time', y: 'value', color: 'value' },
    scale: { color: { type: 'linear', range: ['#ffffff', '#1890FF'] } },
    coordinate: {
      type: 'helix',
      startAngle: 0.5 * Math.PI,
      endAngle: 12.5 * Math.PI,
    },
    animate: { enter: { type: 'fadeIn' } },
    tooltip: { title: 'time' },
  };
}
