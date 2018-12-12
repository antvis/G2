/**
 * @fileOverview The controller of tooltip
 * @author sima.zhang
 */
const Util = require('../../util');
const Shape = require('../../geom/shape/shape');
const { Tooltip } = require('@antv/component/lib');
const MatrixUtil = Util.MatrixUtil;
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
    const chart = self.chart;
    const viewTheme = self.viewTheme;
    const options = self.options;
    const defaultCfg = Util.mix({}, viewTheme.tooltip);
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

    const isTransposed = geoms.length && geoms[0].get('coord') ? geoms[0].get('coord').isTransposed : false;

    let crosshairsCfg;
    if (geoms.length && geoms[0].get('coord') && geoms[0].get('coord').type === 'cartesian') {
      if (shapes[0] === 'interval' && options.shared !== false) { // 直角坐标系下 interval 的 crosshair 为矩形背景框
        const crosshairs = Util.mix({}, viewTheme.tooltipCrosshairsRect);
        crosshairs.isTransposed = isTransposed;
        crosshairsCfg = {
          zIndex: 0, // 矩形背景框不可覆盖 geom
          crosshairs
        };
      } else if (Util.indexOf(TYPE_SHOW_CROSSHAIRS, shapes[0]) > -1) {
        const crosshairs = Util.mix({}, viewTheme.tooltipCrosshairsLine);
        crosshairs.isTransposed = isTransposed;
        crosshairsCfg = {
          crosshairs
        };
      }
    }

    return Util.mix(defaultCfg, crosshairsCfg, {});
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
      const viewTheme = self.viewTheme;
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
            tooltip.setMarkers(markersItems, viewTheme.tooltipMarker);
          }
        } else {
          tooltip.clearMarkers();
          // clearMarkers 只会将 markerItems 从 markerGroup 中移除
          // 所以我们还要将 markerItems 从 tooltip 中移除
          // 这么做是为了防止上一次设置 marker 时的 markerItems 影响此次 tooltip 辅助线的定位
          tooltip.set('markerItems', []);
        }
      }
      const canvas = this._getCanvas();
      if (target === canvas && tooltip.get('type') === 'mini') { // filter mini tooltip
        tooltip.hide();
      } else {
        tooltip.setPosition(x, y, target);
        tooltip.show();
      }
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
    if ((timeStamp - lastTimeStamp) > 16 && !this.chart.get('stopTooltip')) {
      this.showTooltip(point, ev.views, ev.shape);
      this.timeStamp = timeStamp;
    }
  }

  onMouseOut(ev) {
    const tooltip = this.tooltip;
    // const canvas = this._getCanvas();
    if (!tooltip.get('visible') || !tooltip.get('follow')) {
      return;
    }
    // 除非离开 plot 时鼠标依然在图形上，这段逻辑没有意义
    // if (ev && ev.target !== canvas) {
    //   return;
    // }
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
    const viewTheme = self.viewTheme;
    const canvas = self._getCanvas();
    const defaultCfg = self._getDefaultTooltipCfg();
    let options = self.options;
    options = Util.deepMix({
      plotRange: chart.get('plotRange'),
      capture: false,
      canvas,
      frontPlot: chart.get('frontPlot'),
      viewTheme: viewTheme.tooltip,
      backPlot: chart.get('backPlot')
    }, defaultCfg, options);
    if (options.crosshairs && options.crosshairs.type === 'rect') {
      options.zIndex = 0; // toolip 背景框不可遮盖住 geom，防止用户配置了 crosshairs
    }

    options.visible = false;
    // @2018-09-13 by blue.lb 如果设置shared为false不需要指定position
    // if (options.shared === false && Util.isNil(options.position)) {
    //   options.position = 'top';
    // }
    let tooltip;
    if (options.type === 'mini') {
      options.crosshairs = false;
      // this.options.shared = false;
      options.position = 'top';
      tooltip = new Tooltip.Mini(options);
    } else if (options.useHtml) {
      tooltip = new Tooltip.Html(options);
    } else {
      tooltip = new Tooltip.Canvas(options);
    }
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
          if (geom.isShareTooltip() || (options.shared === false && Util.inArray([ 'area', 'line', 'path', 'polygon' ], type))) {
            Util.each(dataArray, function(obj) {
              const tmpPoint = geom.findPoint(point, obj);
              if (tmpPoint) {
                const subItems = geom.getTipItems(tmpPoint, options.title);
                Util.each(subItems, v => {
                  let point = v.point;
                  if (point && point.x && point.y) { // hotfix: make sure there is no null value
                    const x = Util.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
                    const y = Util.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
                    point = coord.applyMatrix(x, y, 1);
                    v.x = point[0];
                    v.y = point[1];
                    v.showMarker = true;
                    const itemMarker = self._getItemMarker(geom, v.color);
                    v.marker = itemMarker;
                    if (Util.indexOf(TYPE_SHOW_MARKERS, type) !== -1) {
                      markersItems.push(v);
                    }
                  }
                });
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

  _getItemMarker(geom, color) {
    const shapeType = geom.get('shapeType') || 'point';
    const shape = geom.getDefaultValue('shape') || 'circle';
    const shapeObject = Shape.getShapeFactory(shapeType);
    const cfg = { color };
    const marker = shapeObject.getMarkerCfg(shape, cfg);
    return marker;
  }

}

module.exports = TooltipController;
