import { G2Spec } from '../../../src';
import { githubStar } from '../data/github-star';

export function githubStarIntervalRadialLabel(): G2Spec {
  return {
    type: 'interval',
    coordinate: [{ type: 'radial', innerRadius: 0.1, endAngle: Math.PI }],
    data: {
      value: githubStar,
      transform: [{ type: 'sortBy', fields: [['star', true]] }],
    },
    encode: {
      x: 'name',
      y: 'star',
      color: 'name',
    },
    axis: {
      y: false,
    },
    legend: false,
    labels: [
      {
        text: 'star',
        position: 'outside',
        autoRotate: true,
        rotateToAlignArc: true,
        dx: 4,
      },
    ],
  };
}
