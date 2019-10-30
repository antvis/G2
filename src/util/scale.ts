import * as _ from '@antv/util';
import { getScale, Scale, ScaleConfig } from '../dependents';
import { LooseObject, ScaleDef } from '../interface';

const dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;

/**
 * 获取字段对应数据的类型
 * @param field 数据字段名
 * @param data 数据源
 * @returns default type 返回对应的数据类型
 */
function getDefaultType(field: string, data: LooseObject[]): string {
  let type = 'linear';
  let value = _.firstValue(data, field);
  if (_.isArray(value)) {
    value = value[0];
  }
  if (dateRegex.test(value)) {
    type = 'time';
  } else if (_.isString(value)) {
    type = 'cat';
  }
  return type;
}

/**
 * 获取 scale 的配置项信息
 * @param type 数据类型
 * @param field 数据字段名
 * @param data 数据源
 * @returns scale cfg 返回数据字段对应的列定义配置
 */
function getScaleCfg(type: string, field: string, data: LooseObject[]): ScaleConfig {
  const values = _.valuesOfKey(data, field);
  const cfg: ScaleConfig = {
    field,
    values,
  };
  if (type !== 'cat' && type !== 'timeCat' && type !== 'time') {
    const { min, max } = _.getRange(values);
    cfg.min = min;
    cfg.max = max;
    cfg.nice = true;
  }

  if (type === 'time') {
    cfg.nice = false;
  }
  return cfg;
}

/**
 * 为指定的 `field` 字段数据创建 scale
 * @param field 字段名
 * @param [data] 数据集，可为空
 * @param [scaleDef] 列定义，可为空
 * @returns scale 返回创建的 Scale 实例
 */
export function createScaleByField(field: string | number, data?: LooseObject[] | [], scaleDef?: ScaleDef): Scale {
  let scale: Scale;

  if (!data || !data.length) {
    // 如果数据为空直接返回常量度量
    if (scaleDef && scaleDef.type) {
      const ScaleCtor = getScale(scaleDef.type);
      scale = new ScaleCtor(scaleDef);
    } else {
      const Identity = getScale('identity');
      scale = new Identity({
        field: field.toString(),
        values: [field],
      });
    }
    return scale;
  }

  if (_.isNumber(field) || (_.isNil(_.firstValue(data, field)) && !scaleDef)) {
    const Identity = getScale('identity');
    scale = new Identity({
      field: field.toString(),
      values: [field],
    });
  } else {
    // 如果已经定义过这个度量
    // TODO: scale 将用户设置的 min 和 max 转换成 maxLimit，minLimit，使得生成的 scale 以用户设置的 min 和 max 为准
    const type = _.get(scaleDef, 'type', getDefaultType(field, data));
    const cfg = getScaleCfg(type, field, data);

    _.mix(cfg, scaleDef);

    const ScaleCtor = getScale(type);
    scale = new ScaleCtor(cfg);
  }
  return scale;
}

/**
 * 同步 scale
 * @todo 是否可以通过 scale.update() 方法进行更新
 * @param scale 需要同步的 scale 实例
 * @param newScale 同步源 Scale
 */
export function syncScale(scale: Scale, newScale: Scale) {
  if (scale.type !== 'identity') {
    const obj = {};
    for (const k in newScale) {
      if (Object.prototype.hasOwnProperty.call(newScale, k)) {
        obj[k] = newScale[k];
      }
    }
    scale.change(obj);
  }
}

export function getName(scale: Scale): string {
  return scale.alias || scale.field;
}
