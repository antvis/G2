const Util = require('../../util');
const { Legend } = require('@antv/component/lib');
const Tail = require('../../component/legend/tail');
const Shape = require('../../geom/shape/shape');
const bboxOfBackPlot = require('../util/bbox-of-back-plot');
const plotRange2BBox = require('../util/plot-range2bbox');

const FIELD_ORIGIN = '_origin';
const MARKER_SIZE = 4.5;
const requireAnimationFrameFn = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const STROKE_MARKERS = [
  'cross',
  'tick',
  'plus',
  'hyphen',
  'line',
  'hollowCircle',
  'hollowSquare',
  'hollowDiamond',
  'hollowTriangle',
  'hollowTriangleDown',
  'hollowHexagon',
  'hollowBowtie'
];

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
    const self = this;
    self.options = {};
    Util.mix(self, cfg);
    self.clear();
    const chart = self.chart;
    self.container = chart.get('frontPlot');
    self.plotRange = chart.get('plotRange');
  }

  clear() {
    const legends = this.legends;
    this.backRange = null;
    Util.each(legends, legendItems => {
      Util.each(legendItems, legend => {
        legend.destroy();
      });
    });
    this.legends = {};
  }

  // 获取坐标轴等背景元素占的范围，防止遮挡坐标轴
  getBackRange() {
    let backRange = this.backRange;
    if (!backRange) {
      const backPlot = this.chart.get('backPlot');
      backRange = bboxOfBackPlot(backPlot, plotRange2BBox(this.chart.get('plotRange')));
      const plotRange = this.plotRange;
      if (backRange.maxX - backRange.minX < plotRange.br.x - plotRange.tl.x &&
        backRange.maxY - backRange.minY < plotRange.br.y - plotRange.tl.y) {
        // 如果背景小于则直接使用 plotRange
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
      if (options.onClick && options.defaultClickHandlerEnabled !== true) {
        options.onClick(ev);
      } else {   // if 'defaultClickHandlerEnabled' is true the default click behavior would be worked.
        const item = ev.item;
        const checked = ev.checked;
        const isSingleSelected = legend.get('selectedMode') === 'single'; // 图例的选中模式
        const clickedValue = item.dataValue; // import: 需要取该图例项原始的数值

        if (checked) {
          Util.Array.remove(filterVals, clickedValue);
          if (self._isFieldInView(field, clickedValue, chart)) {
            chart.filter(field, field => {
              return isSingleSelected ? field === clickedValue : !Util.inArray(filterVals, field);
            });
          }
          Util.each(views, view => {
            if (self._isFieldInView(field, clickedValue, view)) {
              view.filter(field, field => {
                return isSingleSelected ? field === clickedValue : !Util.inArray(filterVals, field);
              });
            }
          });
        } else if (!isSingleSelected) {
          filterVals.push(clickedValue);

          if (self._isFieldInView(field, clickedValue, chart)) {
            chart.filter(field, field => {
              return !Util.inArray(filterVals, field);
            });
          }
          Util.each(views, view => {
            if (self._isFieldInView(field, clickedValue, view)) {
              view.filter(field, field => {
                return !Util.inArray(filterVals, field);
              });
            }
          });
        }
        if (options.onClick) {
          options.onClick(ev);
        }
        chart.set('keepLegend', true); // 图例不重新渲染
        chart.set('keepPadding', true); // 边框不重新计算
        chart.repaint();
        chart.set('keepPadding', false);
        chart.set('keepLegend', false);
      }
    });
  }


  _bindClickEventForMix(legend) {
    const self = this;
    const chart = self.chart;
    const geoms = chart.getAllGeoms();
    legend.on('itemclick', ev => {
      const { field: itemField } = ev.item;
      const checked = ev.checked;
      if (checked) {
        Util.each(geoms, geom => {
          const field = geom.getYScale().field;
          if (field === itemField) {
            geom.show();
          }
        });
      } else {
        Util.each(geoms, geom => {
          const field = geom.getYScale().field;
          if (field === itemField) {
            geom.hide();
          }
        });
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
        // @2018-12-21 by blue.lb 由于数值0直接被类型转换为false，这里需要做更精确一点的判断
        if (!Util.isNil(obj[field])) {
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

    legend.on('itemunhover', function(ev) {
      self.pre = null;
      if (options.onUnhover) {
        options.onUnhover(ev);
      }
      Util.each(geoms, function(geom) {
        if (geom.get('activeShapes')) {
          geom.clearActivedShapes();
          canvas.draw();
        }
      });
    });
  }

  _isFiltered(scale, filterVals, scaleValue) {
    if (!scale.isCategory) {
      return true;
    }
    let rst = true;
    scaleValue = scale.invert(scaleValue);
    Util.each(filterVals, val => {
      if (scale.getText(val) === scale.getText(scaleValue)) {
        rst = false;
        return false;
      }
    });
    return rst;
  }

  _alignLegend(legend, pre, region, position) {
    const self = this;
    const viewTheme = self.viewTheme;
    const container = self.container;
    const canvas = container.get('canvas');
    const width = canvas.get('width');
    let height = canvas.get('height');
    const totalRegion = self.totalRegion;
    const plotRange = self.plotRange;
    const backRange = self.getBackRange(); // 背景占得范围
    const offsetX = legend.get('offset')[0] || 0;
    const offsetY = legend.get('offset')[1] || 0;
    // const offset = Util.isNil(legend.get('offset')) ? MARGIN : legend.get('offset');
    const legendHeight = legend.getHeight();
    const legendWidth = legend.getWidth();
    const borderMargin = viewTheme.legend.margin;
    const innerMargin = viewTheme.legend.legendMargin;
    const legendNum = self.legends[position].length;
    const posArray = position.split('-');

    let x = 0;
    let y = 0;
    const tempoRegion = (legendNum > 1) ? totalRegion : region;

    if (posArray[0] === 'left' || posArray[0] === 'right') {
      height = plotRange.br.y;
      x = self._getXAlign(posArray[0], width, region, backRange, legendWidth, borderMargin);
      if (pre) {
        // @2018-10-19 by blue.lb 由于legend中并不存在y属性，这里需要先获取group再获取y值
        // @2019-03-21 by blue.lb 由于内部实现问题，usehtml部分的实例可以直接获取x、y的
        y = (pre.get('y') || pre.get('group').get('y')) + pre.getHeight() + innerMargin;
      } else {
        y = self._getYAlignVertical(posArray[1], height, tempoRegion, backRange, 0, borderMargin, canvas.get('height'));
      }
    } else if (posArray[0] === 'top' || posArray[0] === 'bottom') {
      y = self._getYAlignHorizontal(posArray[0], height, region, backRange, legendHeight, borderMargin);
      if (pre) {
        const preWidth = pre.getWidth();
        // @2018-10-19 by blue.lb 由于legend中并不存在x属性，这里需要先获取group再获取x值
        // @2019-03-21 by blue.lb 由于内部实现问题，usehtml部分的实例可以直接获取x、y的
        x = (pre.get('x') || pre.get('group').get('x')) + preWidth + innerMargin;
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
    const viewTheme = self.viewTheme;
    const legends = self.legends;
    const innerMargin = viewTheme.legend.legendMargin;
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

  _addCategoryLegend(scale, attr, geom, filterVals, position) {
    const self = this;
    const field = scale.field;
    let legendOptions = self.options;
    const fieldOption = legendOptions[field];
    if (fieldOption) {
      legendOptions = fieldOption;
    }
    const legends = self.legends;
    legends[position] = legends[position] || [];
    let container = self.container;
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
    const viewTheme = self.viewTheme;
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
          cfg.color = colorAttr.mapping(value, ...restArgs).join('') || viewTheme.defaultColor;
        } else {
          cfg.color = colorAttr.mapping(value).join('') || viewTheme.defaultColor;
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

    const legendCfg = Util.deepMix({}, viewTheme.legend[posArray[0]], legendOptions[field] || legendOptions, {
      viewId: chart.get('_id'),
      maxLength,
      items,
      container,
      position: [ 0, 0 ]
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
      legend = new Tail(legendCfg);
    } else {
      if (legendOptions.useHtml) {
        const canvasEle = container.get('canvas').get('el');
        container = legendOptions.container;
        if (Util.isString(container) && /^\#/.test(container)) { // 如果传入 dom 节点的 id
          const id = container.replace('#', '');
          container = document.getElementById(id);
        }
        if (!container) {
          container = canvasEle.parentNode;
        }
        legendCfg.container = container;
        if (legendCfg.legendStyle === undefined) legendCfg.legendStyle = {};
        legendCfg.legendStyle.CONTAINER_CLASS = {
          position: 'absolute',
          overflow: 'auto',
          'z-index': canvasEle.style.zIndex === '' ? 1 : parseInt(canvasEle.style.zIndex, 10) + 1
        };
        if (legendOptions.flipPage) {
          legendCfg.legendStyle.CONTAINER_CLASS.height = (posArray[0] === 'right' || posArray[0] === 'left') ? maxLength + 'px' : 'auto';
          legendCfg.legendStyle.CONTAINER_CLASS.width = !(posArray[0] === 'right' || posArray[0] === 'left') ? maxLength + 'px' : 'auto';
          legend = new Legend.CatPageHtml(legendCfg);
        } else {
          legend = new Legend.CatHtml(legendCfg);
        }
      } else {
        legend = new Legend.Category(legendCfg);
      }
    }
    self._bindClickEvent(legend, scale, filterVals);

    legends[position].push(legend);
    return legend;
  }

  _bindChartMove(scale) {
    const chart = this.chart;
    const legends = this.legends;
    chart.on('plotmove', ev => {
      let selected = false;
      if (ev.target) {
        const origin = ev.target.get('origin');
        if (origin) {
          const data = origin[FIELD_ORIGIN] || origin[0][FIELD_ORIGIN];
          const field = scale.field;
          if (data) {
            const value = data[field];
            Util.each(legends, legendItems => {
              Util.each(legendItems, legend => {
                selected = true;
                (!legend.destroyed) && legend.activate(value);
              });
            });
          }
        }
      }
      if (!selected) {
        Util.each(legends, legendItems => {
          Util.each(legendItems, legend => {
            (!legend.destroyed) && legend.deactivate();
          });
        });
      }
    });
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
    const viewTheme = self.viewTheme;

    Util.each(ticks, tick => {
      const scaleValue = tick.value;
      const invertValue = scale.invert(scaleValue);
      const attrValue = attr.mapping(invertValue).join('');

      items.push({
        value: tick.tickValue, // tick.text
        attrValue,
        color: attrValue,
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
        color: attr.mapping(0).join(''),
        scaleValue: 0
      });
    }
    if (!maxValue) {
      items.push({
        value: scale.max,
        attrValue: attr.mapping(1).join(''),
        color: attr.mapping(1).join(''),
        scaleValue: 1
      });
    }

    const options = self.options;

    const posArray = position.split('-');
    let defaultCfg = viewTheme.legend[posArray[0]];
    if ((options && options.slidable === false) || (options[field] && options[field].slidable === false)) {
      defaultCfg = Util.mix({}, defaultCfg, viewTheme.legend.gradient);
    }

    const legendCfg = Util.deepMix({}, defaultCfg, options[field] || options, {
      items,
      attr,
      formatter: scale.formatter,
      container,
      position: [ 0, 0 ]
    });
    if (legendCfg.title) {
      Util.deepMix(legendCfg, {
        title: {
          text: scale.alias || scale.field
        }
      });
    }

    if (attr.type === 'color') {
      legend = new Legend.Color(legendCfg);
    } else if (attr.type === 'size') {
      if (options && options.sizeType === 'circle') legend = new Legend.CircleSize(legendCfg);
      else legend = new Legend.Size(legendCfg);
    } else {
      return;
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
    const viewTheme = self.viewTheme;

    if (fieldOption === false) { // 如果不显示此图例
      return null;
    }

    if (fieldOption && fieldOption.custom) {
      self.addCustomLegend(field);
    } else {
      let position = legendOptions.position || viewTheme.defaultLegendPosition;
      position = self._adjustPosition(position, self._isTailLegend(legendOptions, geom));
      if (fieldOption && fieldOption.position) { // 如果对某个图例单独设置 position，则对 position 重新赋值
        position = self._adjustPosition(fieldOption.position, self._isTailLegend(fieldOption, geom));
      }
      let legend;
      if (scale.isLinear) {
        legend = self._addContinuousLegend(scale, attr, position);
      } else {
        legend = self._addCategoryLegend(scale, attr, geom, filterVals, position);
      }
      if (legend) {
        self._bindHoverEvent(legend, field);
        legendOptions.reactive && self._bindChartMove(scale);
      }
    }
  }

  /**
   * 自定义图例
   * @param {string} field 自定义图例的数据字段名，可以为空
   * @return {object} legend 自定义图例实例
   */
  addCustomLegend(field) {
    const self = this;
    const chart = self.chart;
    const viewTheme = self.viewTheme;
    const container = self.container;
    let legendOptions = self.options;

    if (field) {
      legendOptions = legendOptions[field];
    }

    let position = legendOptions.position || viewTheme.defaultLegendPosition;
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
      if (!Util.isPlainObject(item.marker)) { // 直接传入字符串或者回调函数时转换为对象，如 item.marker = 'circle'
        item.marker = {
          symbol: item.marker || 'circle',
          radius: MARKER_SIZE
        };
        if (Util.indexOf(STROKE_MARKERS, item.marker.symbol) !== -1) {
          item.marker.stroke = item.fill;
        } else {
          item.marker.fill = item.fill;
        }
      } else { // 用户传入对象 item.marker = { symbol: 'circle', fill: 'red', radius: 3 }
        item.marker.radius = item.marker.radius || MARKER_SIZE;
      }

      const symbol = item.marker.symbol;
      if (Util.isString(symbol) && symbol.indexOf('hollow') !== -1) {
        item.marker.symbol = Util.lowerFirst(symbol.substr(6));
      }

      item.checked = Util.isNil(item.checked) ? true : item.checked;
      item.geom = geom;
    });

    const canvas = chart.get('canvas');
    const plotRange = self.plotRange;
    const posArray = position.split('-');
    const maxLength = (posArray[0] === 'right' || posArray[0] === 'left') ? plotRange.bl.y - plotRange.tr.y : canvas.get('width');

    const legendCfg = Util.deepMix({}, viewTheme.legend[posArray[0]], legendOptions, {
      maxLength,
      items,
      container,
      position: [ 0, 0 ]
    });
    let legend;
    if (legendOptions.useHtml) {
      let htmlContainer = legendOptions.container;
      if (/^\#/.test(container)) { // 如果传入 dom 节点的 id
        const id = htmlContainer.replace('#', '');
        htmlContainer = document.getElementById(id);
      } else if (!htmlContainer) {
        htmlContainer = container.get('canvas').get('el').parentNode;
      }
      legendCfg.container = htmlContainer;
      if (legendCfg.legendStyle === undefined) legendCfg.legendStyle = {};
      if (!legendCfg.legendStyle.CONTAINER_CLASS) {
        legendCfg.legendStyle.CONTAINER_CLASS = {
          height: (posArray[0] === 'right' || posArray[0] === 'left') ? maxLength + 'px' : 'auto',
          width: !(posArray[0] === 'right' || posArray[0] === 'left') ? maxLength + 'px' : 'auto',
          position: 'absolute',
          overflow: 'auto'
        };
      }
      if (legendOptions.flipPage) legend = new Legend.CatPageHtml(legendCfg);
      else legend = new Legend.CatHtml(legendCfg);
    } else legend = new Legend.Category(legendCfg);
    legends[position].push(legend);

    legend.on('itemclick', ev => {
      if (legendOptions.onClick) { // 用户自定义了图例点击事件
        legendOptions.onClick(ev);
      }
    });

    self._bindHoverEvent(legend);
    return legend;
  }

  addMixedLegend(scales, geoms) {
    const self = this;
    const items = [];
    Util.each(scales, scale => {
      const value = scale.alias || scale.field;
      Util.each(geoms, geom => {
        if (geom.getYScale() === scale && scale.values && scale.values.length > 0) {
          const shapeType = geom.get('shapeType') || 'point';
          const shape = geom.getDefaultValue('shape') || 'circle';
          const shapeObject = Shape.getShapeFactory(shapeType);
          const cfg = { color: geom.getDefaultValue('color') };
          const marker = shapeObject.getMarkerCfg(shape, cfg);
          const item = {
            value,
            marker,
            field: scale.field
          };
          items.push(item);
        }
      });// end of geom loop
    });// end of scale loop
    const options = { custom: true, items };
    self.options = Util.deepMix({}, options, self.options);
    const legend = self.addCustomLegend();
    self._bindClickEventForMix(legend);
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
