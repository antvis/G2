import { commit } from '../data/commit';
import type { G2Spec } from '@/spec';

export function commitIntervalFixedCorner(): G2Spec {
  return {
    type: 'interval',
    data: commit,
    encode: {
      x: 'name',
      y: 'value',
      color: 'name',
      size: 80,
    },
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 20,
      radiusBottomRight: 30,
      radiusBottomLeft: 40,
    },
  };
}
