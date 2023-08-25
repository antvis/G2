import { G2Spec } from '../../../src';
import { githubStar } from '../../data/github-star';

export function githubStarIntervalPalette(): G2Spec {
  return {
    type: 'interval',
    width: 1000,
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
      category10: 'category10',
      category20: 'category20',
    },
  };
}
