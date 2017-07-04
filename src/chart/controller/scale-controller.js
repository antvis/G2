/**
 * @fileOverview 度量的控制器
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const Global = require('../../global');
const Scale = require('../../scale/');
const dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;
const TYPES = {
  LINEAR: 'linear',
  CAT: 'cat',
  TIME: 'time'
};

function getRange(values) {
  if (Util.isArray(values[0])) {
    let tmp = [];
    for (let i = 0; i < values.length; i++) {
      tmp = tmp.concat(values[i]);
    }
    values = tmp;
  }
  const max = Math.max.apply(null, values);
  const min = Math.min.apply(null, values);
  return {
    min,
    max
  };
}

class ScaleController {
  constructor(cfg) {
    // defs 列定义
    this.defs = {};
    Util.assign(this, cfg);
  }

  _getDef(field) {
    const defs = this.defs;
    let def = null;
    if (Global.scales[field] || defs[field]) {
      def = Util.mix({}, Global.scales[field]);
      // 处理覆盖属性的问题
      Util.each(defs[field], function(v, k) {
        if (Util.isNull(v)) {
          delete def[k];
        } else {
          def[k] = v;
        }
      });
    }
    return def;
  }

  _getDefaultType(field, data) {
    let type = TYPES.LINEAR;
    let value = Util.Array.firstValue(data, field);
    if (Util.isArray(value)) {
      value = value[0];
    }
    if (dateRegex.test(value)) {
      type = TYPES.TIME;
    } else if (Util.isString(value)) {
      type = TYPES.CAT;
    }
    return type;
  }

  _getScaleCfg(type, field, data) {
    const cfg = {
      field
    };
    const values = Util.Array.values(data, field);
    cfg.values = values;
    if (!Scale.isCategory(type) && type !== 'time') {
      const range = getRange(values);
      cfg.min = range.min;
      cfg.max = range.max;
      cfg.nice = true;
    }

    if (type === 'time') {
      cfg.nice = false;
    }
    /* if (!Scale.isCategory(type) && type !== 'time' && isIntervalY && (!cfg.min || cfg.min > 0)) {
      var defs = this.defs;
      var newDef = {};
      newDef[field] = {
        min: 0
      };
      this.defs = Util.mix(true, newDef, defs);
    }*/
    return cfg;
  }

  createScale(field, data) {
    const self = this;
    const def = self._getDef(field);
    const firstObj = data[0];
    // 如果数据为空直接返回 null
    if (!firstObj) {
      return null;
    }
    let scale;
    if (Util.isNumber(field) || Util.isNil(firstObj[field])) {
      scale = Scale.identity({
        value: field,
        field: field.toString()
      });
    } else { // 如果已经定义过这个度量
      let type;
      if (def) {
        type = def.type;
      }
      type = type || self._getDefaultType(field, data);
      const cfg = self._getScaleCfg(type, field, data);
      if (def) {
        Util.mix(cfg, def);
      }
      scale = Scale[type](cfg);
    }
    return scale;
  }
}

module.exports = ScaleController;
