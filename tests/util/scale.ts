import { each } from '@antv/util';
import { createScaleByField, syncScale } from '../../src/util/scale';

export function createScale(field, data, scaleDefs = {}) {
  return createScaleByField(field, data, scaleDefs[field]);
}

export function updateScales(sourceScales, targetScales) {
  each(sourceScales, (scale, field) => {
    const { type } = scale;
    if (type !== 'identity') {
      syncScale(scale, targetScales[field]);
    }
  });
}
