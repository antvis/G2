import { firstValue, get, isEmpty, isNil, isNumber, isString, valuesOfKey } from '@antv/util';
import { getScale, Scale } from '../dependents';
import { LooseObject, ScaleOption } from '../interface';

const dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]+)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;

/**
 * 获取字段对应数据的类型
 * @param field 数据字段名
 * @param data 数据源
 * @returns default type 返回对应的数据类型
 */
function getDefaultType(value: any): string {
  let type = 'linear';
  if (dateRegex.test(value)) {
    type = 'time';
  } else if (isString(value)) {
    type = 'cat';
  }
  return type;
}

/**
 * @ignore
 * 为指定的 `field` 字段数据创建 scale
 * @param field 字段名
 * @param [data] 数据集，可为空
 * @param [scaleDef] 列定义，可为空
 * @returns scale 返回创建的 Scale 实例
 */
export function createScaleByField(field: string | number, data?: LooseObject[] | [], scaleDef?: ScaleOption): Scale {
  const validData = data || [];

  if (isNumber(field) || (isNil(firstValue(validData, field)) && isEmpty(scaleDef))) {
    const Identity = getScale('identity');
    return new Identity({
      field: field.toString(),
      values: [field],
    });
  }

  const values = valuesOfKey(validData, field);

  // 如果已经定义过这个度量
  const type = get(scaleDef, 'type', getDefaultType(values[0]));
  const ScaleCtor = getScale(type);
  return new ScaleCtor({
    field,
    values,
    ...scaleDef,
  });
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
    for (const k in newScale) {
      if (Object.prototype.hasOwnProperty.call(newScale, k)) {
        obj[k] = newScale[k];
      }
    }

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
