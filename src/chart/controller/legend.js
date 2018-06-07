const Util = require('../../util');
const Global = require('../../global');
const Legend = require('../../component/legend');
const Shape = require('../../geom/shape/shape');

const FIELD_ORIGIN = '_origin';
const MARKER_SIZE = 4.5;
const requireAnimationFrameFn = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

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
    this.container = chart.get('frontPlot');
    this.plotRange = chart.get('plotRange');
  }

  clear() {
    const legends = this.legends;
    this.backRange = null;
    Util.each(legends, legendItems => {
      Util.each(legendItems, legend => {
        legend.remove();
      });
    });
    this.legends = {};
  }

  // 获取坐标轴等背景元素占的范围，防止遮挡坐标轴
  getBackRange() {
    let backRange = this.backRange;
    if (!backRange) {
      backRange = this.chart.get('backPlot').getBBox();
      if (backRange.minX === Infinity) { // 如果背景不占宽高，则直接使用 plotRange
        const plotRange = this.plotRange;
        backRange = {
          minX: plotRange.tl.x,
          minY: plotRange.tl.y,
          maxX: plotRange.br.x,
          maxY: plotRange.br.y
        };
      }
      this.backRange = backRange;
    }
    return backRange;
  }

  _isFieldInView(field, value, view) {
    let flag = false;
    const scales = view.get('scales');
    const fieldScale = scales[field];
    if (fieldScale && fieldScale.values) {
      flag = Util.inArray(fieldScale.values, value);
    }

    return flag;
  }

  _bindClickEvent(legend, scale, filterVals) {
    const self = this;
    const chart = self.chart;
    const views = chart.get('views');
    const field = scale.field;
    const options = self.options;

    legend.on('itemclick', ev => {
      if (options.onClick) { // 用户自定义了图例点击事件
        options.onClick(ev);
      } else {
        const item = ev.item;
        const checked = ev.checked;
        const isSingeSelected = legend.get('selectedMode') === 'single'; // 图例的选中模式
        const clickedValue = item.dataValue; // import: 需要取该图例项原始的数值

        if (checked) {
          filterVals.push(clickedValue);
          if (self._isFieldInView(field, clickedValue, chart)) {
            chart.filter(field, field => {
              return isSingeSelected ? field === clickedValue : Util.inArray(filterVals, field);
            });
          }
          Util.each(views, view => {
            if (self._isFieldInView(field, clickedValue, view)) {
              view.filter(field, field => {
                return isSingeSelected ? field === clickedValue : Util.inArray(filterVals, field);
              });
            }
          });
        } else if (!isSingeSelected) {
          Util.Array.remove(filterVals, clickedValue);

          if (self._isFieldInView(field, clickedValue, chart)) {
            chart.filter(field, field => {
              return Util.inArray(filterVals, field);
            });
          }
          Util.each(views, view => {
            if (self._isFieldInView(field, clickedValue, view)) {
              view.filter(field, field => {
                return Util.inArray(filterVals, field);
              });
            }
          });
        }
        chart.set('keepLegend', true); // 图例不重新渲染
        chart.set('keepPadding', true); // 边框不重新计算
        chart.repaint();
        chart.set('keepPadding', false);
        chart.set('keepLegend', false);
      }
    });
  }

  _filterLabels(shape, geom, visible) {
    if (shape.get('gLabel')) {
      shape.get('gLabel').set('visible', visible);
    } else {
      const labelCfg = geom.get('labelCfg');
      if (labelCfg && labelCfg.fields && labelCfg.fields.length > 0) {
        const xScale = geom.getXScale();
        const yScale = geom.getYScale();
        const xField = xScale.field;
        const yField = yScale.field;
        const shapeData = shape.get('origin')._origin;
        const labelContainer = geom.get('labelContainer');
        const labels = labelContainer.get('labelsGroup').get('children');
        Util.each(labels, label => {
          const labelData = label.get('origin') || [];
          if ((labelData[xField] === shapeData[xField]) && (labelData[yField] === shapeData[yField])) {
            label.set('visible', visible);
            shape.set('gLabel', label);
          }
        });
      }
    }
  }

  _bindFilterEvent(legend, scale) {
    const self = this;
    const chart = this.chart;
    const field = scale.field;
    legend.on('itemfilter', ev => {
      const range = ev.range;
      chart.filterShape(function(obj, shape, geom) {
        if (obj[field]) {
          const filtered = (obj[field] >= range[0] && obj[field] <= range[1]);
          // shape 带 label，则还需要隐藏 label
          self._filterLabels(shape, geom, filtered);
          return filtered;
        }
        return true;
      });
      const geoms = chart.getAllGeoms() || [];
      for (let i = 0; i < geoms.length; i++) {
        const geom = geoms[i];
        if (geom.get('type') === 'heatmap') {
          requireAnimationFrameFn(() => {
            geom.drawWithRange(range);
          });
        }
      }
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
          const shapeContainer = geom.get('shapeContainer');
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
              shapeContainer.sort();
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
    const totalRegion = self.totalRegion;
    const plotRange = self.plotRange;
    const backRange = self.getBackRange(); // 背景占得范围
    const offsetX = legend.get('offsetX') || 0;
    const offsetY = legend.get('offsetY') || 0;
    // const offset = Util.isNil(legend.get('offset')) ? MARGIN : legend.get('offset');
    const legendHeight = legend.getHeight();
    const legendWidth = legend.getWidth();
    const borderMargin = Global.legend.margin;
    const innerMargin = Global.legend.legendMargin;
    const legendNum = self.legends[position].length;
    const posArray = position.split('-');

    let x = 0;
    let y = 0;
    const tempoRegion = (legendNum > 1) ? totalRegion : region;

    if (posArray[0] === 'left' || posArray[0] === 'right') {
      height = plotRange.br.y;
      x = self._getXAlign(posArray[0], width, region, backRange, legendWidth, borderMargin);
      if (pre) {
        y = pre.get('y') + pre.getHeight() + innerMargin;
      } else {
        y = self._getYAlignVertical(posArray[1], height, tempoRegion, backRange, 0, borderMargin, canvas.get('height'));
      }
    } else if (posArray[0] === 'top' || posArray[0] === 'bottom') {
      y = self._getYAlignHorizontal(posArray[0], height, region, backRange, legendHeight, borderMargin);
      if (pre) {
        const preWidth = pre.getWidth();
        x = pre.get('x') + preWidth + innerMargin;
      } else {
        x = self._getXAlign(posArray[1], width, tempoRegion, backRange, 0, borderMargin);
        if (posArray[1] === 'right') x = plotRange.br.x - tempoRegion.totalWidth;
      }
    }

    legend.move(x + offsetX, y + offsetY);
  }

  _getXAlign(pos, width, region, backRange, legendWidth, borderMargin) {
    let x = pos === 'left' ? backRange.minX - legendWidth - borderMargin[3] : backRange.maxX + borderMargin[1];
    if (pos === 'center') {
      x = (width - region.totalWidth) / 2;
    }
    return x;
  }

  _getYAlignHorizontal(pos, height, region, backRange, legendHeight, borderMargin) {
    const y = (pos === 'top') ? backRange.minY - legendHeight - borderMargin[0] : backRange.maxY + borderMargin[2];
    return y;
  }

  _getYAlignVertical(pos, height, region, backRange, legendHeight, borderMargin, canvasHeight) {
    let y = (pos === 'top') ? backRange.minY - legendHeight - borderMargin[0] : height - region.totalHeight;
    if (pos === 'center') {
      y = (canvasHeight - region.totalHeight) / 2;
    }
    return y;
  }

  _getSubRegion(legends) {
    let maxWidth = 0;
    let maxHeight = 0;
    let totalWidth = 0;
    let totalHeight = 0;
    Util.each(legends, function(legend) {
      const width = legend.getWidth();
      const height = legend.getHeight();
      if (maxWidth < width) {
        maxWidth = width;
      }
      totalWidth += width;
      if (maxHeight < height) {
        maxHeight = height;
      }
      totalHeight += height;
    });
    return {
      maxWidth,
      totalWidth,
      maxHeight,
      totalHeight
    };
  }

  _getRegion() {
    const self = this;
    const legends = self.legends;
    const innerMargin = Global.legend.legendMargin;
    const subs = [];
    let totalWidth = 0;
    let totalHeight = 0;
    Util.each(legends, legendItems => {
      const subRegion = self._getSubRegion(legendItems);
      subs.push(subRegion);
      totalWidth += (subRegion.totalWidth + innerMargin);
      totalHeight += (subRegion.totalHeight + innerMargin);
    });
    return {
      totalWidth,
      totalHeight,
      subs
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

    const chart = self.chart;
    const canvas = chart.get('canvas');
    const plotRange = self.plotRange;
    const posArray = position.split('-');
    const maxLength = (posArray[0] === 'right' || posArray[0] === 'left') ? plotRange.bl.y - plotRange.tr.y : canvas.get('width');
    Util.each(ticks, tick => {
      const text = tick.text;
      const name = text;
      const scaleValue = tick.value;
      const value = scale.invert(scaleValue);
      const cfg = {
        isInCircle: geom.isInCircle()
      };
      const checked = filterVals ? self._isFiltered(scale, filterVals, scaleValue) : true;

      const colorAttr = geom.getAttr('color');
      const shapeAttr = geom.getAttr('shape');
      if (colorAttr) { // 存在颜色映射
        if (colorAttr.callback && colorAttr.callback.length > 1) { // 多参数映射，阻止程序报错
          const restArgs = Array(colorAttr.callback.length - 1).fill('');
          cfg.color = colorAttr.mapping(value, ...restArgs).join('') || Global.defaultColor;
        } else {
          cfg.color = colorAttr.mapping(value).join('') || Global.defaultColor;
        }
      }
      if (isByAttr && shapeAttr) { // 存在形状映射
        if (shapeAttr.callback && shapeAttr.callback.length > 1) { // 多参数映射，阻止程序报错
          const restArgs = Array(shapeAttr.callback.length - 1).fill('');
          shape = shapeAttr.mapping(value, ...restArgs).join('');
        } else {
          shape = shapeAttr.mapping(value).join('');
        }
      }

      const shapeObject = Shape.getShapeFactory(shapeType);
      const marker = shapeObject.getMarkerCfg(shape, cfg);

      if (Util.isFunction(shape)) {
        marker.symbol = shape;
      }

      items.push({
        value: name, // 图例项显示文本的内容
        dataValue: value, // 图例项对应原始数据中的数值
        checked,
        marker
      });
    });

    const legendCfg = Util.deepMix({}, Global.legend[posArray[0]], legendOptions[field] || legendOptions, {
      viewId: chart.get('_id'),
      maxLength,
      items
    });
    if (legendCfg.title) {
      Util.deepMix(legendCfg, {
        title: {
          text: scale.alias || scale.field
        }
      });
    }

    let legend;
    if (self._isTailLegend(legendOptions, geom)) {
      legendCfg.chart = self.chart;
      legendCfg.geom = geom;
      legend = container.addGroup(Legend.Tail, legendCfg);
    } else {
      legend = container.addGroup(Legend.Category, legendCfg);
    }
    self._bindClickEvent(legend, scale, filterVals);
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
        value: tick.tickValue, // tick.text
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
        value: scale.min,
        attrValue: attr.mapping(0).join(''),
        scaleValue: 0
      });
    }
    if (!maxValue) {
      items.push({
        value: scale.max,
        attrValue: attr.mapping(1).join(''),
        scaleValue: 1
      });
    }

    const options = self.options;

    const posArray = position.split('-');
    let defaultCfg = Global.legend[posArray[0]];
    if ((options && options.slidable === false) || (options[field] && options[field].slidable === false)) {
      defaultCfg = Util.mix({}, defaultCfg, Global.legend.gradient);
    }

    const legendCfg = Util.deepMix({}, defaultCfg, options[field] || options, {
      items,
      attr,
      numberFormatter: scale.formatter
    });
    if (legendCfg.title) {
      Util.deepMix(legendCfg, {
        title: {
          text: scale.alias || scale.field
        }
      });
    }

    if (attr.type === 'color') {
      legend = container.addGroup(Legend.Color, legendCfg);
    } else if (attr.type === 'size') {
      legend = container.addGroup(Legend.Size, legendCfg);
    }
    self._bindFilterEvent(legend, scale);
    legends[position].push(legend);
    return legend;
  }
  _isTailLegend(opt, geom) {
    if (opt.hasOwnProperty('attachLast') && opt.attachLast) {
      const geomType = geom.get('type');
      if (geomType === 'line' || geomType === 'lineStack' || geomType === 'area' || geomType === 'areaStack') return true;
    }
    return false;
  }

  _adjustPosition(position, isTailLegend) {
    let pos;
    if (isTailLegend) {
      pos = 'right-top';
    } else if (Util.isArray(position)) {
      pos = String(position[0]) + '-' + String(position[1]);
    } else {
      const posArr = position.split('-');
      if (posArr.length === 1) { // 只用了left/right/bottom/top一个位置定位
        if (posArr[0] === 'left') pos = 'left-bottom';
        if (posArr[0] === 'right') pos = 'right-bottom';
        if (posArr[0] === 'top') pos = 'top-center';
        if (posArr[0] === 'bottom') pos = 'bottom-center';
      } else {
        pos = position;
      }
    }
    return pos;
  }

  addLegend(scale, attr, geom, filterVals) {
    const self = this;
    const legendOptions = self.options;
    const field = scale.field;
    const fieldOption = legendOptions[field];

    if (fieldOption === false) { // 如果不显示此图例
      return null;
    }

    if (fieldOption && fieldOption.custom) {
      self.addCustomLegend(field);
    } else {
      let position = legendOptions.position || Global.defaultLegendPosition;
      position = self._adjustPosition(position, self._isTailLegend(legendOptions, geom));
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
    }
  }

  /**
   * 自定义图例
   * @param {string} field 自定义图例的数据字段名，可以为空
   */
  addCustomLegend(field) {
    const self = this;
    const chart = self.chart;
    const container = self.container;
    let legendOptions = self.options;

    if (field) {
      legendOptions = legendOptions[field];
    }

    let position = legendOptions.position || Global.defaultLegendPosition;
    position = self._adjustPosition(position);
    const legends = self.legends;
    legends[position] = legends[position] || [];
    const items = legendOptions.items;
    if (!items) {
      return;
    }

    const geoms = chart.getAllGeoms();
    Util.each(items, item => {
      const geom = findGeom(geoms, item.value);
      if (!Util.isObject(item.marker)) {
        item.marker = {
          symbol: item.marker ? item.marker : 'circle',
          fill: item.fill,
          radius: MARKER_SIZE
        };
      } else {
        item.marker.radius = item.marker.radius || MARKER_SIZE;
      }
      item.checked = Util.isNil(item.checked) ? true : item.checked;
      item.geom = geom;
    });

    const canvas = chart.get('canvas');
    const plotRange = self.plotRange;
    const posArray = position.split('-');
    const maxLength = (posArray[0] === 'right' || posArray[0] === 'left') ? plotRange.bl.y - plotRange.tr.y : canvas.get('width');

    const legendCfg = Util.deepMix({}, Global.legend[posArray[0]], legendOptions, {
      maxLength,
      items
    });

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
    const totalRegion = self._getRegion(legends);
    self.totalRegion = totalRegion;
    let i = 0;
    Util.each(legends, (legendItems, position) => {
      const region = /* self._getRegion(legendItems)*/totalRegion.subs[i];
      Util.each(legendItems, (legend, index) => {
        const pre = legendItems[index - 1];
        if (!(legend.get('useHtml') && !legend.get('autoPosition'))) {
          self._alignLegend(legend, pre, region, position);
        }
      });
      i++;
    });

    return this;
  }
}

module.exports = LegendController;
