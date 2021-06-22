import { isString, max, min, valuesOfKey, isNumber, get, isNil } from '@antv/util';
import {
  Band,
  Constant,
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

import { Scale, ScaleTypes, ScaleOptions, ScaleDefOptions, Constructable, Data } from '../types';

import { ScaleDef } from '../visual/scale';

/**
 * 每种比例尺实际上使用的比例尺
 */
const scaleByType = {
  ordinal: Ordinal,
  linear: Linear,
  log: Log,
  pow: Pow,
  sqrt: Sqrt,
  time: Time,
  band: Band,
  point: Point,
  constant: Constant,
  identity: Identity,
  threshold: Threshold,
  quantize: Quantize,
  quantile: Quantile,
  timeCat: Band,
  cat: Ordinal,
  category: Ordinal,
};

/**
 * 对于 stack 的数据进行修改 scale min max 值
 * @param scale
 * @param beforeMappingData
 */
export function getScaleUpdateOptionsAfterStack(
  scaleDef: ScaleDef,
  beforeMappingData: Data[],
): ScaleDefOptions {
  // 所有的数据
  const values = [];
  const field = scaleDef.getField();
  const { min: minValue, max: maxValue } = scaleDef.getOptions();

  for (let i = 0; i < beforeMappingData.length; i += 1) {
    const dataGroup = beforeMappingData[i];
    for (let j = 0; j < dataGroup.length; j += 1) {
      const datum = dataGroup[j];
      // 经过 stack adjust 之后的数据，变成了数组方式
      values.push(...datum[field]);
    }
  }

  // 返回最新的配置
  return {
    min: isNil(minValue) ? min(values) : minValue,
    max: isNil(maxValue) ? max(values) : maxValue,
  };
}

/**
 * 创建 scale 的工厂函数
 *
 * @param type 一个字符串，
 * @param cfg @antv/scale 的配置
 */
export function createScaleByType(type: ScaleTypes, options?: ScaleOptions): Scale {
  const ScaleCtor = (scaleByType[type] || Identity) as Constructable;
  return new ScaleCtor(options);
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
  data: Data = [],
  scaleDefOptions?: ScaleDefOptions,
): ScaleDef {
  // 非法情况，全部使用 identity/constant
  if (!isString(field)) {
    const options = {
      type: 'identity' as ScaleTypes,
      domain: [field],
    };
    return new ScaleDef(options, field.toString());
  }

  const values = valuesOfKey(data, field);
  // 优先使用开发者的配置，如果没有设置，则全部默认使用 cat 类型
  const type: ScaleTypes = isNumber(get(values, [0])) ? 'linear' : 'cat';
  const options = {
    type,
    domain: values,
    ...scaleDefOptions,
  };
  return new ScaleDef(options, field.toString());
}

/**
 * 内置的 tickMethod：保证生成 ticks 的数量和 count 相等
 * @param min 生成 ticks 范围的最小值
 * @param max 生成 ticks 范围的最大值
 * @param count 生成 ticks 范围的数量
 * @returns ticks
 */
export function strictCount(min: number, max: number, count: number) {
  const step = (max - min) / count;
  return new Array(count).fill(0).map((_, index) => min + index * step);
}
