/**
 * @description scale 的控制器
 */
import * as _ from '@antv/util';
import { getScale } from '../../dependents';
import { DataPointType } from '../../interface';

// tslint:disable-next-line
const dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;

enum Types {
  Linear = 'linear',
  Cat = 'cat',
  Time = 'time',
}

export interface ScaleCfg {
  field: string;
  values: any[];
  nice?: boolean;
  min?: number;
  max?: number;
}
export default class ScaleController {
  defs: DataPointType = {}; // Scale 配置项信息

  constructor(cfg: DataPointType) {
    this.defs = cfg;
  }

  createScale(field: string, data: DataPointType[]) {
    const def = this.defs[field];
    let scale;
    // 如果数据为空直接返回常量度量
    if (!data || !data.length) {
      if (def && def.type) {
        const Scale = getScale(def.type);
        scale = new Scale(def);
      } else {
        const Identity = getScale('identity');
        scale = new Identity({
          field: field.toString(),
          values: [ field ],
        });
      }
      return scale;
    }
    const firstValue = _.firstValue(data, field);

    if (_.isNumber(field) || (_.isNil(firstValue)) && !def) {
      const Identity = getScale('identity');
      scale = new Identity({
        field: field.toString(),
        values: [ field ],
      });
    } else { // 如果已经定义过这个度量
      const type = _.get(def, 'type', this._getDefaultType(field, data));
      const cfg = this._getScaleCfg(type, field, data);

      if (def) {
        _.mix(cfg, def);
      }
      const Scale = getScale(type);
      scale = new Scale(cfg);
    }
    return scale;
  }

  private _getDefaultType(field: string, data: DataPointType[]) {
    let type = Types.Linear;
    let value = _.firstValue(data, field);
    if (_.isArray(value)) {
      value = value[0];
    }
    if (dateRegex.test(value)) {
      type = Types.Time;
    } else if (_.isString(value)) {
      type = Types.Cat;
    }
    return type;
  }

  private _getScaleCfg(type:string, field: string, data: DataPointType[]) {
    const values = _.valuesOfKey(data, field);
    const cfg: ScaleCfg = {
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
}
