/**
 * @fileOverview 度量的控制器
 * @author dxq613@gmail.com
 */

const Scale = require('@antv/scale/lib');
const Util = require('../../util');
const dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;
const TYPES = {
  LINEAR: 'linear',
  CAT: 'cat',
  TIME: 'time'
};

class ScaleController {
  constructor(cfg) {
    // defs 列定义
    this.defs = {};
    this.viewTheme = {
      scales: {}
    };
    // filtered fields
    this.filters = {};
    Util.assign(this, cfg);
  }

  _getDef(field) {
    const defs = this.defs;
    const viewTheme = this.viewTheme;
    let def = null;
    if (viewTheme.scales[field] || defs[field]) {
      def = Util.mix({}, viewTheme.scales[field]);
      // 处理覆盖属性的问题
      Util.each(defs[field], function(v, k) {
        if (Util.isNil(v)) {
          delete def[k];
        } else {
          def[k] = v;
        }
      });
      if (this.filters[field]) {
        delete def.min;
        delete def.max;
      }
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
      const range = Util.Array.getRange(values);
      cfg.min = range.min;
      cfg.max = range.max;
      cfg.nice = true;
    }

    if (type === 'time') {
      cfg.nice = false;
    }
    return cfg;
  }

  createScale(field, data) {
    const self = this;
    const def = self._getDef(field);
    let scale;
    // 如果数据为空直接返回常量度量
    if (!data || !data.length) {
      if (def && def.type) {
        scale = Scale[def.type](def);
      } else {
        scale = Scale.identity({
          value: field,
          field: field.toString(),
          values: [ field ]
        });
      }
      return scale;
    }
    const firstValue = Util.Array.firstValue(data, field);

    if (Util.isNumber(field) || (Util.isNil(firstValue)) && !def) {
      scale = Scale.identity({
        value: field,
        field: field.toString(),
        values: [ field ]
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
