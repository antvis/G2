import { G2Spec } from '../../../src';
import { githubStar } from '../../data/github-star';

export function githubStarIntervalDarkThemeTransparent(): G2Spec {
  return {
    type: 'interval',
    theme: 'dark',
    data: githubStar,
    encode: {
      x: 'name',
      y: 'star',
      color: 'name',
    },
  };
}
