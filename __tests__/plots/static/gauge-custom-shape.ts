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
        target: 159,
        total: 424,
        name: 'score',
      },
    },
    style: {
      pointerShape: customShape,
      pinShape: false,
      textContent: (target, total) => {
        return `得分：${target}\n占比：${(target / total) * 100}%`;
      },
    },
  };
}
