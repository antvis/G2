import { isNil, max, min } from '@antv/util';
import {
  Band,
  BaseOptions,
  Identity,
  Linear,
  Log,
  Ordinal,
  Point,
  Pow, Quantile, Quantize,
  Sqrt, Threshold,
  Time,
} from '@antv/scale';
import { Base } from '@antv/scale/lib/scales/base';
import { Data, ScaleDefCfg, ScaleTypes } from '../types';

/**
 * 对于 stack 的数据进行修改 scale min max 值
 * @param scale
 * @param beforeMappingData
 */
export function getScaleUpdateOptionsAfterStack(
  scale: ScaleDefCfg,
  beforeMappingData: Data[],
): Partial<ScaleDefCfg> {
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
export function createScaleFactory(type: ScaleTypes, cfg: BaseOptions): Base<any> {
  // 针对不同的类型，创建不同的 scale
  switch (type) {
    // ordinal cases
    case 'ordinal':
      return new Ordinal(cfg);
    case 'cat':
      return new Point(cfg);
    case 'category':
      return new Point(cfg);
    case 'band':
      return new Band(cfg);
    case 'point':
      return new Point(cfg);

    // linear cases
    case 'linear':
      return new Linear(cfg);
    case 'log':
      return new Log(cfg);
    case 'pow':
      return new Pow(cfg);
    case 'sqrt':
      return new Sqrt(cfg);
    case 'time':
      return new Time(cfg);
    case 'timeCat':
      return new Time(cfg);
    case 'identity':
      return new Identity(cfg);

    // threshold cases
    case 'threshold':
      return new Threshold(cfg);
    case 'quantize':
      return new Quantize(cfg);
    case 'quantile':
      return new Quantile(cfg);

    // default case
    default:
      return new Ordinal(cfg);
  }
}
