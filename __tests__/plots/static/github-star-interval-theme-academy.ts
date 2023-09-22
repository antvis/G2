import { G2Spec } from '../../../src';
import { githubStar } from '../../data/github-star';

export function githubStarIntervalThemeAcademy(): G2Spec {
  return {
    type: 'interval',
    theme: 'academy',
    data: githubStar,
    encode: {
      x: 'name',
      y: 'star',
      color: 'name',
    },
  };
}
