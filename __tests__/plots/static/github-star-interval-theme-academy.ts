import { G2Spec } from '../../../src';
import { githubStar } from '../../data/github-star';

export function githubStarIntervalThemeAcademy(): G2Spec {
  return {
    type: 'interval',
    data: {
      value: githubStar,
      transform: [{ type: 'sortBy', fields: [['star', true]] }],
    },
    legend: { color: false },
    encode: {
      x: 'name',
      y: 'star',
      color: 'name',
    },
    theme: {
      type: 'academy',
    },
  };
}
