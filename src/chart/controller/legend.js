const Util = require('../../util');
const Global = require('../../global');
const { Legend } = require('../../component/index');
const Shape = require('../../geom/shape/index');

const FIELD_ORIGIN = '_origin';
const MARGIN = 16;
const MARGIN_LEGEND = 25;

function _snapEqual(v1, v2, scale) {
  let isEqual;
  if (Util.isNil(scale)) {
    return false;
  }
  v1 = scale.translate(v1);
  v2 = scale.translate(v2);
  if (scale.isCategory) {
    isEqual = (v1 === v2);
  } else {
    isEqual = Math.abs(v1 - v2) <= 1;
  }
  return isEqual;
}

function findGeom(geoms, value) {
  let rst;
  Util.each(geoms, geom => {
    if (geom.get('visible')) {
      const yScale = geom.getYScale();
      if (yScale.field === value) {
        rst = geom;
        return;
      }
    }
  });

  return rst;
}

class LegendController {
  constructor(cfg) {
    this.options = {};
    Util.mix(this, cfg);
    this.clear();
    const chart = this.chart;
    this.container = chart.get('canvas');
    this.plotRange = chart.get('plotRange');
  }

  clear() {
    const legends = this.legends;
    Util.each(legends, legendItems => {
      Util.each(legendItems, legend => {
        legend.remove();
      });
    });
    this.legends = {};
  }

  _bindEvent(legend, scale, filterVals) {
    const self = this;
    const chart = self.chart;
    const field = scale.field;
    const options = self.options;

    legend.on('itemclick', ev => {
      if (options.onClick) { // 用户自定义了图例点击事件
        options.onClick(ev);
      } else {
        const item = ev.item;
        const checked = ev.checked;
        const isSingeSelected = legend.get('selectedMode') === 'single'; // 图例的选中模式

        if (checked) {
          filterVals.push(item.value);
          chart.filter(field, field => {
            return isSingeSelected ? field === item.value : Util.inArray(filterVals, field);
          });
        } else if (!isSingeSelected) {
          Util.Array.remove(filterVals, item.value);
          chart.filter(field, field => {
            return Util.inArray(filterVals, field);
          });
        }
        chart.repaint();
      }
    });
  }

  _bindFilterEvent(legend, scale) {
    const chart = this.chart;
    const field = scale.field;
    legend.on('itemfilter', ev => {
      const range = ev.range;
      chart.filterShape(function(obj) {
        return obj[field] >= range[0] && obj[field] <= range[1];
      });
    });
  }

  _getShapeData(shape) {
    let originData = shape.get('origin');

    if (Util.isArray(originData)) {
      originData = originData[0];
    }
    return originData[FIELD_ORIGIN];
  }

  _bindHoverEvent(legend, field) {
    const self = this;
    const chart = self.chart;
    const geoms = chart.getAllGeoms();
    const options = self.options;
    const canvas = chart.get('canvas');
    legend.on('itemhover', ev => {
      const value = ev.item.value;
      const pre = self.pre;
      if (!pre) {
        Util.each(geoms, geom => {
          const container = geom.get('container');
          const shapes = geom.getShapes();
          let activeShapes = [];
          if (field) {
            const scale = geom.get('scales')[field];
            Util.each(shapes, shape => {
              const origin = self._getShapeData(shape);
              if (origin && _snapEqual(origin[field], value, scale)) {
                activeShapes.push(shape);
              }
            });
          } else if (geom.getYScale().field === value) {
            activeShapes = shapes;
          }

          if (!Util.isEmpty(activeShapes)) {
            ev.shapes = activeShapes;
            ev.geom = geom;
            if (options.onHover) {
              options.onHover(ev);
              container.sort();
              canvas.draw();
            } else {
              geom.setShapesActived(activeShapes);
            }
          }
        });
        self.pre = value;
      } else if (pre === value) {
        return;
      }
    });

    legend.on('itemunhover', function() {
      self.pre = null;
      Util.each(geoms, function(geom) {
        if (geom.get('activeShapes')) {
          geom.clearActivedShapes();
          canvas.draw();
        }
      });
    });
  }

  _isFiltered(scale, values, value) {
    if (!scale.isCategory) {
      return true;
    }
    let rst = false;
    value = scale.invert(value);
    Util.each(values, val => {
      rst = rst || scale.getText(val) === scale.getText(value);
      if (rst) {
        return false;
      }
    });
    return rst;
  }

  _alignLegend(legend, pre, region, position) {
    const self = this;
    const container = self.container;
    const canvas = container.get('canvas');
    const width = canvas.get('width');
    let height = canvas.get('height');
    const plotRange = self.plotRange;
    const offsetX = legend.get('offsetX') || 0;
    const offsetY = legend.get('offsetY') || 0;
    const legendHeight = legend.getHeight();

    let x = 0;
    let y = 0;

    if (position === 'left' || position === 'right') { // 垂直
      const legendWidth = region.maxWidth;
      if (plotRange) {
        height = plotRange.br.y;
        x = position === 'left' ? MARGIN : plotRange.br.x + MARGIN;
      } else {
        x = position === 'left' ? MARGIN : width - legendWidth + MARGIN;
      }

      y = height - legendHeight;
      if (pre) {
        y = pre.get('y') - legendHeight - MARGIN_LEGEND;
      }
    } else {
      let statrX = 0;

      if (plotRange) {
        statrX = plotRange.bl.x + ((plotRange.br.x - plotRange.bl.x) - region.totalWidth) / 2;
      }
      x = statrX;
      y = position === 'top' ? MARGIN : height - legendHeight - MARGIN;

      if (pre) {
        const preWidth = pre.getWidth();
        x = pre.get('x') + preWidth + MARGIN_LEGEND;
      }
    }

    legend.move(x + offsetX, y + offsetY);
  }

  _getRegion(legends) {
    let maxWidth = 0;
    let totalWidth = 0;
    Util.each(legends, function(legend) {
      const width = legend.getWidth();
      if (maxWidth < width) {
        maxWidth = width;
      }
      totalWidth += width;
    });
    return {
      maxWidth,
      totalWidth
    };
  }

  _addCategroyLegend(scale, attr, geom, filterVals, position) {
    const self = this;
    const field = scale.field;
    const legendOptions = self.options;
    const legends = self.legends;
    legends[position] = legends[position] || [];
    const container = self.container;
    const items = [];
    const ticks = scale.getTicks();

    let isByAttr = true;
    let shapeType = geom.get('shapeType') || 'point';
    let shape = geom.getDefaultValue('shape') || 'circle';
    if ((legendOptions[field] && legendOptions[field].marker)) { // 用户为 field 对应的图例定义了 marker
      shape = legendOptions[field].marker;
      shapeType = 'point';
      isByAttr = false;
    } else if (legendOptions.marker) {
      shape = legendOptions.marker;
      shapeType = 'point';
      isByAttr = false;
    }

    const plotRange = self.plotRange;
    const maxLength = (position === 'right' || position === 'left') ? plotRange.bl.y - plotRange.tr.y : plotRange.tr.x - plotRange.bl.x;

    Util.each(ticks, tick => {
      const text = tick.text;
      const name = text;
      const scaleValue = tick.value;
      const value = scale.invert(scaleValue);
      const cfg = {
        isInCircle: geom.isInCircle()
      };
      const checked = filterVals ? self._isFiltered(scale, filterVals, scaleValue) : true;

      if (geom.getAttr('color')) { // 存在颜色映射
        cfg.color = geom.getAttr('color').mapping(value).join('');
      }
      if (isByAttr && geom.getAttr('shape')) { // 存在形状映射
        shape = geom.getAttr('shape').mapping(value).join('');
      }

      const shapeObject = Shape.getShapeFactory(shapeType);
      const marker = shapeObject.getMarkerCfg(shape, cfg);

      items.push({
        value: name,
        checked,
        marker
      });
    });

    const legendCfg = Util.defaultsDeep({
      title: {
        text: scale.alias || scale.field
      },
      maxLength,
      items
    }, legendOptions[field] || legendOptions, Global.legend[position]);

    const legend = container.addGroup(Legend.Category, legendCfg);
    self._bindEvent(legend, scale, filterVals);
    legends[position].push(legend);
    return legend;
  }

  _addContinuousLegend(scale, attr, position) {
    const self = this;
    const legends = self.legends;
    legends[position] = legends[position] || [];
    const container = self.container;
    const field = scale.field;
    const ticks = scale.getTicks();
    const items = [];
    let legend;
    let minValue;
    let maxValue;

    Util.each(ticks, tick => {
      const scaleValue = tick.value;
      const invertValue = scale.invert(scaleValue);
      const attrValue = attr.mapping(invertValue).join('');

      items.push({
        value: tick.text,
        attrValue,
        scaleValue
      });
      if (scaleValue === 0) {
        minValue = true;
      }
      if (scaleValue === 1) {
        maxValue = true;
      }
    });

    if (!minValue) {
      items.push({
        value: scale.getText(scale.invert(0)),
        attrValue: attr.mapping(0).join(''),
        scaleValue: 0
      });
    }
    if (!maxValue) {
      items.push({
        value: scale.getText(scale.invert(1)),
        attrValue: attr.mapping(1).join(''),
        scaleValue: 1
      });
    }

    const options = self.options;
    const legendCfg = Util.defaultsDeep({
      title: {
        text: scale.alias || scale.field
      },
      items,
      attr
    }, options[field], Global.legend[position], options);

    if (attr.type === 'color') {
      legend = container.addGroup(Legend.Color, legendCfg);
    } else if (attr.type === 'size') {
      legend = container.addGroup(Legend.Size, legendCfg);
    }
    self._bindFilterEvent(legend, scale);
    legends[position].push(legend);
    return legend;
  }

  addLegend(scale, attr, geom, filterVals) {
    const self = this;
    const legendOptions = self.options;
    const field = scale.field;
    if (legendOptions[field] === false) { // 如果不显示此图例
      return null;
    }

    let position = legendOptions.position || 'right';
    const fieldOption = legendOptions[field];
    if (fieldOption && fieldOption.position) { // 如果对某个图例单独设置 position，则对 position 重新赋值
      position = fieldOption.position;
    }

    let legend;
    if (scale.isLinear) {
      legend = self._addContinuousLegend(scale, attr, position);
    } else {
      legend = self._addCategroyLegend(scale, attr, geom, filterVals, position);
    }
    self._bindHoverEvent(legend, field);

    return legend;
  }

  /**
   * 自定义图例
   */
  addCustomLegend() {
    const self = this;
    const chart = self.chart;
    const container = self.container;
    const legendOptions = self.options;
    const position = legendOptions.position || 'right';
    const legends = self.legends;
    legends[position] = legends[position] || [];
    const items = legendOptions.items;
    if (!items) {
      return;
    }

    const geoms = chart.getAllGeoms();
    Util.each(items, item => {
      const geom = findGeom(geoms, item.value);
      item.marker = {
        symbol: item.marker ? item.marker : 'circle',
        fill: item.fill,
        radius: 5
      };
      item.checked = Util.isNil(item.checked) ? true : item.checked;
      item.geom = geom;
    });

    const plotRange = self.plotRange;
    const maxLength = (position === 'right' || position === 'left') ? plotRange.bl.y - plotRange.tr.y : plotRange.tr.x - plotRange.bl.x;

    const legendCfg = Util.defaultsDeep({
      maxLength,
      items
    }, legendOptions, Global.legend[position]);

    const legend = container.addGroup(Legend.Category, legendCfg);
    legends[position].push(legend);

    legend.on('itemclick', ev => {
      if (legendOptions.onClick) { // 用户自定义了图例点击事件
        legendOptions.onClick(ev);
      }
    });

    self._bindHoverEvent(legend);
  }

  alignLegends() {
    const self = this;
    const legends = self.legends;
    Util.each(legends, (legendItems, position) => {
      const region = self._getRegion(legendItems);
      Util.each(legendItems, (legend, index) => {
        const pre = legendItems[index - 1];
        self._alignLegend(legend, pre, region, position);
      });
    });

    return this;
  }
}

module.exports = LegendController;
