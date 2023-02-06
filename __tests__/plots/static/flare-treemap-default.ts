import { G2Spec } from '../../../src';
import { philosophyTreemapData } from '../../data/philosophy';

export function flareTreemapDefault(): G2Spec {
  return {
    type: 'treemap',
    data: {
      value: philosophyTreemapData,
    },
    layout: {
      layer: 1,
    },
    encode: {
      color: (d) => d.data.name,
    },
  };
}
