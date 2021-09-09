import { getMedian, getMean } from './stat';
import { Scale } from '../dependents';

/**
 * parse the value position
 * @param val
 * @param scale
 */
export function getNormalizedValue(val: number | string, scale: Scale) {
  if (!scale) {
    return null;
  }
  let scaled: number;

  switch (val) {
    case 'start':
      return 0;
    case 'center':
      return 0.5;
    case 'end':
      return 1;
    case 'median': {
      scaled = scale.isCategory ? getMedian(scale.values.map((_, idx: number) => idx)) : getMedian(scale.values);
      break;
    }
    case 'mean': {
      scaled = scale.isCategory ? (scale.values.length - 1) / 2 : getMean(scale.values);
      break;
    }
    case 'min':
      scaled = scale.isCategory ? 0 : scale[val];
      break;
    case 'max':
      scaled = scale.isCategory ? scale.values.length - 1 : scale[val];
      break;
    default:
      scaled = val as number;
      break;
  }

  return scale.scale(scaled);
}
