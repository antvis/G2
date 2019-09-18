import { getScale, Scale, ScaleConfig } from '@antv/scale';
import * as Util from '@antv/util';
import { LooseObject, ScaleDef } from '../interface';

const dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;

/** 创建 Scale 工具函数 */
const ScaleUtil = {
  /**
   * 为指定的 `field` 字段数据创建 scale
   * @param field 字段名
   * @param data 数据集
   * @param scaleDef 列定义
   */
  createScale(field: string | number, data?: LooseObject[] | [], scaleDef?: ScaleDef) {
    let scale: Scale;

    if (!data || !data.length) {
      // 如果数据为空直接返回常量度量
      if (scaleDef && scaleDef.type) {
        const scaleCtor = getScale(scaleDef.type);
        scale = new scaleCtor(scaleDef);
      } else {
        const Identity = getScale('identity');
        scale = new Identity({
          field: field.toString(),
          values: [field],
        });
      }
      return scale;
    }

    if (Util.isNumber(field) || (Util.isNil(Util.firstValue(data, field)) && !scaleDef)) {
      const Identity = getScale('identity');
      scale = new Identity({
        field: field.toString(),
        values: [field],
      });
    } else {
      // 如果已经定义过这个度量
      // TODO: scale 将用户设置的 min 和 max 转换成 maxLimit，minLimit，使得生成的 scale 以用户设置的 min 和 max 为准
      const type = Util.get(scaleDef, 'type', this.getDefaultType(field, data));
      const cfg = this.getScaleCfg(type, field, data);

      Util.mix(cfg, scaleDef);

      const scaleCtor = getScale(type);
      scale = new scaleCtor(cfg);
    }
    return scale;
  },
  /**
   * 同步 scale
   * @param scale 需要同步的 scale 实例
   * @param newScale 同步源 Scale
   */
  syncScale(scale: Scale, newScale: Scale) {
    if (scale.type !== 'identity') {
      const obj = {};
      for (const k in newScale) {
        if (Object.prototype.hasOwnProperty.call(newScale, k)) {
          obj[k] = newScale[k];
        }
      }
      scale.change(obj);
    }
  },
  /**
   * 获取默认类型
   * @param field 数据字段名
   * @param data 数据集
   */
  getDefaultType(field: string, data: LooseObject[]) {
    let type = 'linear';
    let value = Util.firstValue(data, field);
    if (Util.isArray(value)) {
      value = value[0];
    }
    if (dateRegex.test(value)) {
      type = 'time';
    } else if (Util.isString(value)) {
      type = 'cat';
    }
    return type;
  },
  /**
   * 获取 scale 的配置项信息
   * @param type scale 类型
   * @param field 数据字段名
   * @param data 数据集
   */
  getScaleCfg(type: string, field: string, data: LooseObject[]) {
    const values = Util.valuesOfKey(data, field);
    const cfg: ScaleConfig = {
      field,
      values,
    };
    if (type !== 'cat' && type !== 'timeCat' && type !== 'time') {
      const { min, max } = Util.getRange(values);
      cfg.min = min;
      cfg.max = max;
      cfg.nice = true;
    }

    if (type === 'time') {
      cfg.nice = false;
    }
    return cfg;
  },
};

export default ScaleUtil;
