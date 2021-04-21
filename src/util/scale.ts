
import { isNil, max, min } from '@antv/util';
import { Data, Scale, ScaleOptions } from '../types';

/**
 * 对于 stack 的数据进行修改 scale min max 值
 * @param scale 
 * @param beforeMappingData 
 */
export function getScaleUpdateOptionsAfterStack(scale: Scale, beforeMappingData: Data[]): Partial<ScaleOptions> {
  const field = scale.field;
  
  // 所有的数据
  const values = [];
  let dataGroup;
  let datum;

  for (let i = 0; i < beforeMappingData.length; i ++) {
    dataGroup = beforeMappingData[i];
    for (let j = 0; j < dataGroup.length; j ++) {
      datum = dataGroup[j];
      // 经过 stack adjust 之后的数据，变成了数组方式
      values.push(...datum[field]);
    }
  }

  // 最终计算的 min max
  let minValue = scale.getOptions().min;
  let maxValue = scale.getOptions().max;

  if (isNil(minValue)) {
    minValue = min([minValue, ...values]);
  }

  if (isNil(maxValue)) {
    maxValue = max([maxValue, ...values]);
  }

  // 返回最新的配置
  return { min: minValue, max: maxValue };
}