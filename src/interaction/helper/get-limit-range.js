import Util from '../../util';
import TimeUtil from '@antv/scale/lib/time-util';

export default (data, scale) => {
  let result;
  const { field, type } = scale;
  const values = Util.Array.values(data, field);
  if (type === 'linear') {
    result = Util.Array.getRange(values);
    if (scale.min < result.min) {
      result.min = scale.min;
    }
    if (scale.max > result.max) {
      result.max = scale.max;
    }
  } else if (type === 'timeCat') {
    Util.each(values, (v, i) => {
      values[i] = TimeUtil.toTimeStamp(v);
    });
    values.sort((v1, v2) => v1 - v2);
    result = values;
  } else {
    result = values;
  }
  return result;
};
