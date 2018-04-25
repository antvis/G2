/**
 * @fileOverview Venn Diagram
 * @author leungwensen@gmail.com
 */
const GeomBase = require('./base');
const Attr = require('../attr/index');
const Global = require('../global');
const Util = require('../util');
const {
  venn,
  scaleSolution,
  circlePath,
  intersectionAreaPath,
  computeTextCentres
} = require('venn.js');
require('./shape/venn');

function parseFields(field) {
  if (Util.isArray(field)) {
    return field;
  }
  if (Util.isString(field)) {
    return field.split('*');
  }
  return [ field ];
}

class Venn extends GeomBase {
  /**
   * get default configuration
   * @protected
   * @return {Object} configuration
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'venn';
    cfg.shapeType = 'venn';
    cfg.generatePoints = true;
    // super.draw(data, container, shapeFactory, index);
    return cfg;
  }

  _initAttrs() {
    const self = this;
    const view = self.get('view');
    const attrs = this.get('attrs');
    const attrOptions = self.get('attrOptions');
    const labelCfg = self.get('labelCfg');
    const data = self.get('data');
    const sizeField = attrOptions.size ? attrOptions.size.field : 'size';
    const labelField = labelCfg ? labelCfg.fields[0] : 'sets';
    self.set('labelCfg', null);
    // prepare data
    data.forEach(row => {
      row.sets = row[labelField];
      row.size = row[sizeField];
    });
    const solution = venn(data);
    // scaling
    const coord = self.get('coord');
    const xRange = [ Math.min(coord.x.end, coord.x.start), Math.max(coord.x.end, coord.x.start) ];
    const yRange = [ Math.min(coord.y.end, coord.y.start), Math.max(coord.y.end, coord.y.start) ];
    const width = xRange[1] - xRange[0];
    const height = yRange[1] - yRange[0];
    const styleOptions = self.get('styleOptions');
    let padding = styleOptions && Util.isObject(styleOptions.style) ? styleOptions.style.padding : 0;
    if (!Util.isFinite(padding)) {
      padding = 0;
    }
    const circles = scaleSolution(solution, width, height, padding);
    const textCenters = computeTextCentres(circles, data);
    data.forEach(row => {
      const sets = row.sets;
      const id = sets.join(',');
      row.id = id;
      if (sets.length === 1) {
        const circle = circles[id];
        row.path = circlePath(circle.x, circle.y, circle.radius);
        Util.assign(row, circle);
      } else {
        const setCircles = sets.map(set => circles[set]);
        let path = intersectionAreaPath(setCircles);
        if (!/[zZ]$/.test(path)) {
          path += 'Z';
        }
        row.path = path;
        const center = textCenters[id] || { x: 0, y: 0 };
        Util.assign(row, center);
      }
    });
    // x, y scales
    view.set('data', data);
    self.set('data', data);
    self.set('dataArray', data);
    self.position('x*y');

    // init attrs
    for (const type in attrOptions) {
      if (attrOptions.hasOwnProperty(type)) {
        const option = attrOptions[type];
        const className = Util.upperFirst(type);
        const fields = parseFields(option.field);
        if (type === 'position') {
          option.coord = coord;
        }
        const scales = [];
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const scale = self._createScale(field, data);
          if (type === 'color' && Util.isNil(option.values)) { // 设置 color 的默认色值
            if (scale.values.length <= 8) {
              option.values = Global.colors;
            } else if (scale.values.length <= 16) {
              option.values = Global.colors_16;
            } else {
              option.values = Global.colors_24;
            }

            if (Util.isNil(option.values)) {
              option.values = Global.colors; // 防止主题没有声明诸如 colors_pie 的属性
            }
          }
          scales.push(scale);
        }
        if (type === 'position') {
          scales[0].change({
            nice: false,
            min: xRange[0],
            max: xRange[1]
          });
          scales[1].change({
            nice: false,
            min: yRange[0],
            max: yRange[1]
          });
        }
        option.scales = scales;
        const attr = new Attr[className](option);
        attrs[type] = attr;
      }
    }
  }

  paint() {
    super.paint();
    const self = this;
    const dataArray = self.get('dataArray');
    const shapeContainer = self.get('shapeContainer');
    // add labels
    dataArray.forEach(row => {
      const cfg = self.getDrawCfg(row[0]);
      const origin = cfg.origin._origin;
      shapeContainer.addShape('text', {
        attrs: Util.mix({}, {
          x: origin.x,
          y: origin.y,
          text: origin.label || '',
          fontSize: 18,
          fill: cfg.shape === 'hollow' ? cfg.color : '#666',
          textAlign: 'center',
          textBaseline: 'middle'
        }, cfg.style ? cfg.style.textStyle : {})
      });
    });
  }
}

GeomBase.Venn = Venn;

module.exports = Venn;
