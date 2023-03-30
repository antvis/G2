import { Line } from '@antv/g';
import { G2Spec } from '../../../src';
import { getOrigin } from '../../../src/shape/utils';

export function gaugeCustomShape(): G2Spec {
  const customShape = (style) => {
    return (points, value, coordinate, theme) => {
      const [cx, cy] = coordinate.getCenter();
      const [x, y] = getOrigin(points);
      return new Line({
        style: {
          x1: x,
          y1: y,
          x2: cx,
          y2: cy,
          stroke: '#30BF78',
          lineWidth: 5,
        },
      });
    };
  };
  return {
    type: 'gauge',
    data: {
      value: {
        current: 159,
        target: 424,
        name: 'score',
      },
    },
    style: {
      pointerShape: customShape,
      pinShape: false,
      textContent: (current, target) => {
        return `得分：${current}\n占比：${(current / target) * 100}%`;
      },
    },
  };
}
