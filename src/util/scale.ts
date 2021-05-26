import { isNil, isString, max, min, valuesOfKey, isNumber, get } from '@antv/util';
import {
  Band,
  Identity,
  Linear,
  Log,
  Ordinal,
  Point,
  Pow,
  Quantile,
  Quantize,
  Sqrt,
  Threshold,
  Time,
} from '@antv/scale';
import { ScaleBaseOptions, Constructable, Data, ScaleOption, ScaleTypes } from '../types';
import { ScaleDef } from '../visual/scale';

/**
 * 对于 stack 的数据进行修改 scale min max 值
 * @param scale
 * @param beforeMappingData
 */
export function getScaleUpdateOptionsAfterStack(
  scale: ScaleOption,
  beforeMappingData: Data[],
): ScaleOption {
  const { field } = scale;

  // 所有的数据
  const values = [];
  let dataGroup;
  let datum;

  for (let i = 0; i < beforeMappingData.length; i += 1) {
    dataGroup = beforeMappingData[i];
    for (let j = 0; j < dataGroup.length; j += 1) {
      datum = dataGroup[j];
      // 经过 stack adjust 之后的数据，变成了数组方式
      values.push(...datum[field]);
    }
  }

  // 最终计算的 min max
  let minValue = scale.min;
  let maxValue = scale.max;

  if (isNil(minValue)) {
    minValue = min([minValue, ...values]);
  }

  if (isNil(maxValue)) {
    maxValue = max([maxValue, ...values]);
  }

  // 返回最新的配置
  return {
    min: minValue,
    max: maxValue,
  };
}

/**
 * 创建 scale 的工厂函数
 *
 * @param type 一个字符串，
 * @param cfg @antv/scale 的配置
 */
export function createScaleFactory(type: ScaleTypes, cfg: ScaleBaseOptions): any {
  // 针对不同的类型，创建不同的 scale
  const scaleMap = {
    // ordinal cases
    ordinal: Ordinal,
    cat: Ordinal,
    category: Ordinal,
    band: Band,
    point: Point,
    linear: Linear,
    log: Log,
    pow: Pow,
    sqrt: Sqrt,
    time: Time,
    timeCat: Time,
    identity: Identity,
    threshold: Threshold,
    quantize: Quantize,
    quantile: Quantile,
  };
  const TargetScaleClass = scaleMap[type.toLowerCase()] || (Ordinal as Constructable);
  return new TargetScaleClass(cfg);
}

/**
 * 为指定的 `field` 字段数据创建 scale
 * @param field 字段名
 * @param [data] 数据集，可为空
 * @param [scaleDef] 列定义，可为空
 * @returns scale 返回创建的 Scale 实例
 */
export function createScaleByField(
  field: string | number,
  data?: Data,
  scaleOption?: ScaleOption,
): ScaleDef {
  const validData = data || [];

  if (isString(field)) {
    const values = valuesOfKey(validData, field);

    return new ScaleDef({
      // 优先使用开发者的配置，如果没有设置，则全部默认使用 cat 类型
      type: isNumber(get(values, [0])) ? 'linear' : 'cat',
      field: field.toString(),
      domain: values,
      ...scaleOption,
    });
  }
  // 其他情况，均为非法，全部使用 identity/constant
  return new ScaleDef({
    type: 'identity',
    field: field.toString(),
    domain: [field],
  });
}
