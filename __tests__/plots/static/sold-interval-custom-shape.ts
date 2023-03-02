import { Polygon } from '@antv/g';
import { G2Spec } from '../../../src';
import { sold } from '../../data/sold';

export function soldIntervalCustomShape(): G2Spec {
  function triangleShape(style) {
    return (P, value, coordinate, theme) => {
      const { defaultColor } = theme;
      const [p0, p1, p2, p3] = P;
      const pm = [(p0[0] + p1[0]) / 2, p0[1]];
      const { color = defaultColor } = value;
      return new Polygon({
        style: {
          ...style,
          fill: color,
          points: [pm, p2, p3],
        },
      });
    };
  }

  return {
    type: 'interval',
    data: sold,
    encode: {
      x: 'genre',
      y: 'sold',
      color: 'genre',
    },
    style: {
      shape: triangleShape,
      stroke: '#000',
    },
  };
}
