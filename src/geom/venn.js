/**
 * @fileOverview Venn Diagram
 * @author leungwensen@gmail.com
 */
const GeomBase = require('./base');
const Util = require('../util');
const {
  venn,
  scaleSolution,
  circlePath,
  intersectionAreaPath,
  computeTextCentres
} = require('venn.js');
require('./shape/venn');

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
    self.position('x*y');
    super._initAttrs();
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
