/**
 * @fileOverview The controller of tooltip
 * @author sima.zhang
 */
const Util = require('../../util');
const Global = require('../../global');
const Tooltip = require('../../component/tooltip');
const MatrixUtil = require('@antv/g').MatrixUtil;
const Vector2 = MatrixUtil.vec2;

const TYPE_SHOW_MARKERS = [ 'line', 'area', 'path', 'areaStack' ]; // 默认展示 tooltip marker 的几何图形
const TYPE_SHOW_CROSSHAIRS = [ 'line', 'area' ]; // 默认展示十字瞄准线的几何图形

// TODO FIXME this is HARD CODING
const IGNORE_TOOLTIP_ITEM_PROPERTIES = [
  'marker',
  'showMarker'
];

function _indexOfArray(items, item) {
  let rst = -1;
  Util.each(items, function(sub, index) {
    let isEqual = true;
    for (const key in item) {
      if (item.hasOwnProperty(key) && IGNORE_TOOLTIP_ITEM_PROPERTIES.indexOf(key) === -1) {
        if (!Util.isObject(item[key]) && item[key] !== sub[key]) {
          isEqual = false;
          break;
        }
      }
    }
    if (isEqual) {
      rst = index;
      return false;
    }
  });
  return rst;
}

// 判断是否有样式
function _hasClass(dom, className) {
  if (!dom) {
    return false;
  }
  let cls = '';
  if (!dom.className) return false;
  if (!Util.isNil(dom.className.baseVal)) {
    cls = dom.className.baseVal;
  } else {
    cls = dom.className;
  }
  return cls.indexOf(className) !== -1;
}

function _isParent(dom, cls) {
  let parent = dom.parentNode;
  let rst = false;
  while (parent && parent !== document.body) {
    if (_hasClass(parent, cls)) {
      rst = true;
      break;
    }
    parent = parent.parentNode;
  }
  return rst;
}

// 去除重复的值, 去除不同图形相同数据，只展示一份即可
function _uniqItems(items) {
  const tmp = [];
  Util.each(items, function(item) {
    const index = _indexOfArray(tmp, item);
    if (index === -1) {
      tmp.push(item);
    } else {
      tmp[index] = item;
    }
  });
  return tmp;
}

class TooltipController {
  constructor(cfg) {
    Util.assign(this, cfg);
    this.timeStamp = 0;
  }

  _normalizeEvent(event) {
    const chart = this.chart;
    const canvas = this._getCanvas();
    const point = canvas.getPointByClient(event.clientX, event.clientY);
    const pixelRatio = canvas.get('pixelRatio');
    point.x = point.x / pixelRatio;
    point.y = point.y / pixelRatio;
    const views = chart.getViewsByPoint(point);
    point.views = views;
    return point;
  }

  _getCanvas() {
    return this.chart.get('canvas');
  }

  _getTriggerEvent() {
    const options = this.options;
    const triggerOn = options.triggerOn;
    let eventName;

    if (!triggerOn || triggerOn === 'mousemove') {
      eventName = 'plotmove';
    } else if (triggerOn === 'click') {
      eventName = 'plotclick';
    } else if (triggerOn === 'none') {
      eventName = null;
    }

    return eventName;
  }

  _getDefaultTooltipCfg() {
    const self = this;
    const options = self.options;
    const defaultCfg = Util.mix({}, Global.tooltip);
    const chart = self.chart;
    const geoms = chart.getAllGeoms().filter(function(geom) {
      return geom.get('visible');
    });
    const shapes = [];
    Util.each(geoms, function(geom) {
      const type = geom.get('type');
      const adjusts = geom.get('adjusts');
      let isSymmetric = false;
      if (adjusts) {
        Util.each(adjusts, adjust => {
          if (adjust.type === 'symmetric' || adjust.type === 'Symmetric') {
            isSymmetric = true;
            return false;
          }
        });
      }
      if (Util.indexOf(shapes, type) === -1 && !isSymmetric) {
        shapes.push(type);
      }
    });

    let crosshairsCfg;
    if (geoms.length && geoms[0].get('coord') && geoms[0].get('coord').type === 'cartesian' && shapes.length === 1) {
      if (shapes[0] === 'interval' && options.shared !== false) { // 直角坐标系下 interval 的 crosshair 为矩形背景框
        crosshairsCfg = {
          zIndex: 0, // 矩形背景框不可覆盖 geom
          crosshairs: Global.tooltipCrosshairsRect
        };
      } else if (Util.indexOf(TYPE_SHOW_CROSSHAIRS, shapes[0]) > -1) {
        crosshairsCfg = {
          crosshairs: Global.tooltipCrosshairsLine
        };
      }
    }

    return Util.mix(defaultCfg, crosshairsCfg, {
      isTransposed: geoms.length && geoms[0].get('coord') ? geoms[0].get('coord').isTransposed : false
    });
  }

  _bindEvent() {
    const chart = this.chart;
    const triggerEvent = this._getTriggerEvent();
    if (triggerEvent) {
      chart.on(triggerEvent, Util.wrapBehavior(this, 'onMouseMove'));
      chart.on('plotleave', Util.wrapBehavior(this, 'onMouseOut'));
    }
  }

  _offEvent() {
    const chart = this.chart;
    const triggerEvent = this._getTriggerEvent();
    if (triggerEvent) {
      chart.off(triggerEvent, Util.getWrapBehavior(this, 'onMouseMove'));
      chart.off('plotleave', Util.getWrapBehavior(this, 'onMouseOut'));
    }
  }

  _setTooltip(point, items, markersItems, target) {
    const self = this;
    const tooltip = self.tooltip;
    const prePoint = self.prePoint;
    if (!prePoint || (prePoint.x !== point.x || prePoint.y !== point.y)) {
      items = _uniqItems(items);
      self.prePoint = point;

      const chart = self.chart;
      const x = Util.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
      const y = Util.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
      if (!tooltip.get('visible')) {
        chart.emit('tooltip:show', {
          x,
          y,
          tooltip
        });
      }
      const first = items[0];
      let title = first.title || first.name;
      if (tooltip.isContentChange(title, items)) {
        chart.emit('tooltip:change', {
          tooltip,
          x,
          y,
          items
        });
        // bugfix: when set the title in the tooltip:change event does not take effect.
        title = items[0].title || items[0].name;
        tooltip.setContent(title, items);
        if (!Util.isEmpty(markersItems)) {
          if (self.options.hideMarkers === true) { // 不展示 tooltip marker
            tooltip.set('markerItems', markersItems); // 用于 tooltip 辅助线的定位
          } else {
            tooltip.setMarkers(markersItems, Global.tooltipMarker);
          }
        } else {
          tooltip.clearMarkers();
        }
      }
      tooltip.setPosition(x, y, target);
      tooltip.show();
    }
  }

  hideTooltip() {
    const tooltip = this.tooltip;
    const chart = this.chart;
    const canvas = this._getCanvas();
    this.prePoint = null;
    tooltip.hide();
    chart.emit('tooltip:hide', {
      tooltip
    });
    canvas.draw();
  }

  onMouseMove(ev) {
    if (Util.isEmpty(ev.views)) {
      return;
    }

    const lastTimeStamp = this.timeStamp;
    const timeStamp = +new Date();
    const point = {
      x: ev.x,
      y: ev.y
    };
    if ((timeStamp - lastTimeStamp) > 16) {
      let target;
      if (ev.shape
        && Util.inArray([ 'point', 'interval', 'polygon', 'schema' ], ev.shape.name)) {
        target = ev.shape;
      }
      this.showTooltip(point, ev.views, target);
      this.timeStamp = timeStamp;
    }
  }

  onMouseOut(ev) {
    const tooltip = this.tooltip;
    const canvas = this._getCanvas();
    if (!tooltip.get('visible')) {
      return;
    }
    if (ev && ev.target !== canvas) {
      return;
    }
    if (ev && ev.toElement && (_hasClass(ev.toElement, 'g2-tooltip') || _isParent(ev.toElement, 'g2-tooltip'))) {
      return;
    }
    this.hideTooltip();
  }

  renderTooltip() {
    const self = this;
    if (self.tooltip) { // tooltip 对象已经创建
      return;
    }
    const chart = self.chart;
    const canvas = self._getCanvas();
    const defaultCfg = self._getDefaultTooltipCfg();
    let options = self.options;
    options = Util.deepMix({
      plotRange: chart.get('plotRange'),
      capture: false,
      canvas,
      frontPlot: chart.get('frontPlot'),
      backPlot: chart.get('backPlot')
    }, defaultCfg, options);
    if (options.crosshairs && options.crosshairs.type === 'rect') {
      options.zIndex = 0; // toolip 背景框不可遮盖住 geom，防止用户配置了 crosshairs
    }

    options.visible = false;
    if (options.shared === false && Util.isNil(options.position)) {
      options.position = 'top';
    }

    const tooltip = new Tooltip(options);
    self.tooltip = tooltip;

    const triggerEvent = self._getTriggerEvent();
    if (!tooltip.get('enterable') && triggerEvent === 'plotmove') { // 鼠标不允许进入 tooltip 容器
      const tooltipContainer = tooltip.get('container');
      if (tooltipContainer) {
        tooltipContainer.onmousemove = e => {
          // 避免 tooltip 频繁闪烁
          const eventObj = self._normalizeEvent(e);
          chart.emit(triggerEvent, eventObj);
        };
      }
    }
    self._bindEvent();
  }

  showTooltip(point, views, target) {
    const self = this;
    if (Util.isEmpty(views) || !point) {
      return;
    }
    if (!this.tooltip) {
      this.renderTooltip(); // 如果一开始 tooltip 关闭，用户重新调用的时候需要先生成 tooltip
    }
    const options = self.options;
    let markersItems = [];
    let items = [];

    Util.each(views, view => {
      if (!view.get('tooltipEnable')) { // 如果不显示tooltip，则跳过
        return true;
      }
      const geoms = view.get('geoms');
      const coord = view.get('coord');
      Util.each(geoms, geom => {
        const type = geom.get('type');
        if (geom.get('visible') && geom.get('tooltipCfg') !== false) {
          const dataArray = geom.get('dataArray');
          if (geom.isShareTooltip() || (options.shared === false && Util.inArray([ 'area', 'line', 'path' ], type))) {
            Util.each(dataArray, function(obj) {
              const tmpPoint = geom.findPoint(point, obj);
              if (tmpPoint) {
                const subItems = geom.getTipItems(tmpPoint, options.title);
                if (Util.indexOf(TYPE_SHOW_MARKERS, type) !== -1) {
                  Util.each(subItems, v => {
                    let point = v.point;
                    if (point && point.x && point.y) { // hotfix: make sure there is no null value
                      const x = Util.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
                      const y = Util.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
                      point = coord.applyMatrix(x, y, 1);
                      v.x = point[0];
                      v.y = point[1];
                      v.showMarker = true;
                      markersItems.push(v);
                    }
                  });
                }
                items = items.concat(subItems);
              }
            });
          } else {
            const geomContainer = geom.get('shapeContainer');
            const canvas = geomContainer.get('canvas');
            const pixelRatio = canvas.get('pixelRatio');
            const shape = geomContainer.getShape(point.x * pixelRatio, point.y * pixelRatio);
            if (shape && shape.get('visible') && shape.get('origin')) {
              items = geom.getTipItems(shape.get('origin'), options.title);
            }
          }
        }
      });

      Util.each(items, item => {
        let point = item.point;
        const x = Util.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
        const y = Util.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
        point = coord.applyMatrix(x, y, 1);
        item.x = point[0];
        item.y = point[1];
      });
    });

    if (items.length) {
      const first = items[0];

      // bugfix: multiple tooltip items with different titles
      if (!items.every(item => item.title === first.title)) {
        let nearestItem = first;
        let nearestDistance = Infinity;
        items.forEach(item => {
          const distance = Vector2.distance([ point.x, point.y ], [ item.x, item.y ]);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestItem = item;
          }
        });
        items = items.filter(item => item.title === nearestItem.title);
        markersItems = markersItems.filter(item => item.title === nearestItem.title);
      }

      if (options.shared === false && items.length > 1) {
        let snapItem = items[0];
        let min = Math.abs(point.y - snapItem.y);
        Util.each(items, aItem => {
          if (Math.abs(point.y - aItem.y) <= min) {
            snapItem = aItem;
            min = Math.abs(point.y - aItem.y);
          }
        });
        if (snapItem && snapItem.x && snapItem.y) {
          markersItems = [ snapItem ];
        }
        items = [ snapItem ];
      }
      // 3.0 采用当前鼠标位置作为 tooltip 的参考点
      // if (!Util.isEmpty(markersItems)) {
      //   point = markersItems[0];
      // }
      self._setTooltip(point, items, markersItems, target);
    } else {
      self.hideTooltip();
    }
  }

  clear() {
    const tooltip = this.tooltip;
    tooltip && tooltip.destroy();
    this.tooltip = null;
    this.prePoint = null;
    this._offEvent();
  }
}

module.exports = TooltipController;
