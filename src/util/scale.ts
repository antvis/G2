import { isString, max, min, valuesOfKey, get, isNil, isEmpty } from '@antv/util';
import { isFullCircle } from './coordinate';
import { Scale, ScaleType, ScaleOptions, Data } from '../types';
import { Coordinate } from '../types/coordinate';
import { ViewOptions } from '../types/view';
import { getScale } from '../visual/scale';

/**
 * 获取字段对应数据的类型
 * @param field 数据字段名
 * @param data 数据源
 * @returns default type 返回对应的数据类型
 */
export function getDefaultScaleType(value: any): ScaleType {
  return isString(value) ? 'cat' : 'linear';
}

/**
 * 对于 stack 的数据进行修改 scale min max 值
 * @param scale
 * @param beforeMappingData
 */
export function getScaleUpdateOptionsAfterStack(
  scale: Scale,
  beforeMappingData: Data[],
): ScaleOptions {
  // 所有的数据
  const values = [];
  const field = scale.field;
  const minValue = scale.min;
  const maxValue = scale.max;

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
 * 为指定的 `field` 字段数据创建 scale
 * @param field 字段名
 * @param data 数据集，可为空
 * @param scaleOptions 列定义，可为空
 * @returns scale 返回创建的 Scale 实例
 */
export function createScaleByField(
  field: string | number,
  data: Data = [],
  scaleOptions?: ScaleOptions,
): Scale {
  // 非法情况，全部使用 identity/constant
  if ((!isString(field) || isNil(get(data, [0, field]))) && isEmpty(scaleOptions)) {
    const Identity = getScale('identity');
    return new Identity({
      field: field.toString(),
      values: [field],
    });
  }

  const values = valuesOfKey(data, field.toString());
  // 优先使用开发者的配置，如果没有设置，则全部默认使用 cat 类型
  const type = get(scaleOptions, 'type', getDefaultScaleType(values[0]));

  const ScaleCtor = getScale(type);
  return new ScaleCtor({
    field: field.toString(),
    values,
    ...scaleOptions,
  });
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

/**
 * 根据 scale values 和 coordinate 获取分类默认 range
 * @param scale 需要获取的 scale 实例
 * @param coordinate coordinate 实例
 * @param theme theme
 */
export function getDefaultCategoryScaleRange(
  scale: Scale, coordinate: Coordinate, theme: ViewOptions['theme'],
): Scale['range'] {
  const { values } = scale;
  const count = values.length;
  let range;

  if (count === 1) {
    range = [0.5, 1]; // 只有一个分类时,防止计算出现 [0.5,0.5] 的状态
  } else {
    let widthRatio = 1;
    let offset = 0;

    if (isFullCircle(coordinate)) {
      if (!coordinate.isTransposed) {
        range = [0, 1 - 1 / count];
      } else {
        widthRatio = get(theme, 'widthRatio.multiplePie', 1 / 1.3);
        offset = (1 / count) * widthRatio;
        range = [offset / 2, 1 - offset / 2];
      }
    } else {
      offset = 1 / count / 2; // 两边留下分类空间的一半
      range = [offset, 1 - offset]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
    }
  }
  return range;
}

/**
 * @function y轴scale的max
 * @param {yScale}
 */
export function getMaxScale(scale: Scale) {
  // 过滤values[]中 NaN/undefined/null 等
  const values = scale.values.filter((item) => !isNil(item) && !Number.isNaN(item));

  return Math.max(...values, isNil(scale.max) ? -Infinity : scale.max);
}

/**
 * @ignore
 * 同步 scale
 * @todo 是否可以通过 scale.update() 方法进行更新
 * @param scale 需要同步的 scale 实例
 * @param newScale 同步源 Scale
 */
export function syncScale(scale: Scale, newScale: Scale) {
  if (scale.type !== 'identity' && newScale.type !== 'identity') {
    const obj = {};
    Object.keys(newScale).forEach((k) => {
      obj[k] = newScale[k];
    });

    scale.change(obj);
  }
}

/**
 * @ignore
 * get the scale name, if alias exist, return alias, or else field
 * @param scale
 * @returns the name of field
 */
export function getName(scale: Scale): string {
  return scale.alias || scale.field;
}
