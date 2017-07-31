const Util = require('../../util');
const Global = require('../../global');
const { Tooltip } = require('../../component/index');
const TYPE_SHOW_MARKERS = [ 'line', 'area', 'path', 'areaStack' ]; // 默认展示 tooltip marker 的几何图形
const TYPE_SHOW_CROSSHAIRS = [ 'line', 'area' ]; // 默认展示十字瞄准线的几何图形

function _indexOfArray(items, item) {
  let rst = -1;
  Util.each(items, function(sub, index) {
    if (sub.title === item.title && sub.name === item.name && sub.value === item.value && sub.color === item.color) {
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

  _getCanvas() {
    return this.chart.get('canvas');
  }

  _getDefaultTooltipCfg() {
    const self = this;
    const options = self.options;
    const defaultCfg = Util.mix({}, Global.tooltip);
    const chart = self.chart;
    const coord = chart.get('coord');
    const geoms = chart.getAllGeoms().filter(function(geom) {
      return geom.get('visible');
    });
    const shapes = [];
    Util.each(geoms, function(geom) {
      const type = geom.get('type');
      if (Util.indexOf(shapes, type) === -1) {
        shapes.push(type);
      }
    });
    if (geoms.length && geoms[0].get('coord').type === 'cartesian' && shapes.length === 1) {
      if (shapes[0] === 'interval' && !options.split && coord.type === 'cartesian') { // 直角坐标系下 interval 的 crosshair 为矩形背景框
        Util.mix(defaultCfg, {
          zIndex: 0, // 矩形背景框不可覆盖 geom
          crosshairs: {
            type: 'rect',
            style: {
              fill: '#CCD7EB',
              opacity: 0.4
            }
          }
        });
      } else if (Util.indexOf(TYPE_SHOW_CROSSHAIRS, shapes[0]) > -1) {
        Util.mix(defaultCfg, {
          crosshairs: {
            type: 'y',
            style: {
              stroke: '#666',
              lineWidth: 1
            }
          }
        });
      }
    }

    return defaultCfg;
  }

  _bindEvent() {
    const chart = this.chart;
    chart.on('plotmove', Util.wrapBehavior(this, 'onMouseMove'));
    chart.on('plotleave', Util.wrapBehavior(this, 'onMouseOut'));
  }

  _offEvent() {
    const chart = this.chart;
    chart.off('plotmove', Util.getWrapBehavior(this, 'onMouseMove'));
    chart.off('plotleave', Util.getWrapBehavior(this, 'onMouseOut'));
  }

  _setTooltip(title, point, items, markersItems) {
    const self = this;
    const options = self.options;
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
      chart.emit('tooltip:change', {
        tooltip,
        x,
        y,
        items
      });
      tooltip.setContent(title, items);
      if (!Util.isEmpty(markersItems)) {
        tooltip.setMarkers(markersItems, Global.tooltipMarker);
      } else {
        tooltip.clearMarkers();
      }
      if (options.split) {
        const positionX = Util.isArray(items[0].point.x) ? items[0].point.x[0] : items[0].point.x;
        const positionY = Util.isArray(items[0].point.y) ? items[0].point.y[1] : items[0].point.y;

        tooltip.setPosition(positionX, positionY, true);
      } else {
        tooltip.setPosition(x, y);
      }
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
      this.showTooltip(point, ev.views);
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
    const defaultCfg = self._getDefaultTooltipCfg();
    const options = self.options;
    Util.defaultsDeep(options, defaultCfg, {
      plotRange: chart.get('plotRange'),
      capture: false
    });

    if (options.crosshairs && options.crosshairs.type === 'rect') {
      options.isTransposed = chart.get('coord').isTransposed; // 是否旋转
      options.zIndex = 0; // toolip 背景框不可遮盖住 geom，防止用户配置了 crosshairs
    }

    options.visible = false;
    const canvas = self._getCanvas();
    const tooltip = canvas.addGroup(Tooltip, options);
    canvas.sort();
    self.tooltip = tooltip;
    self._bindEvent();
  }

  showTooltip(point, views) {
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
    // const tooltip = self.tooltip;

    Util.each(views, view => {
      if (!view.get('tooltipEnable')) { // 如果不显示tooltip，则跳过
        return true;
      }
      const geoms = view.get('geoms');
      const coord = view.get('coord');
      Util.each(geoms, geom => {
        const type = geom.get('type');
        if (geom.get('visible')) {
          const dataArray = geom.get('dataArray');
          if (geom.isShareTooltip() || (options.split && Util.inArray([ 'area', 'line', 'path' ], type))) {
            const points = [];
            Util.each(dataArray, function(obj) {
              const tmpPoint = geom.findPoint(point, obj);
              if (tmpPoint) {
                points.push(tmpPoint);
                const subItems = geom.getTipItems(tmpPoint);
                if (Util.indexOf(TYPE_SHOW_MARKERS, type) !== -1) {
                  Util.each(subItems, v => {
                    let point = v.point;
                    const x = Util.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
                    const y = Util.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
                    point = coord.applyMatrix(x, y, 1);
                    v.x = point[0];
                    v.y = point[1];
                    v.showMarker = true;
                  });
                  markersItems = markersItems.concat(subItems);
                }
                items = items.concat(subItems);
              }
            });
          // } else if ((options.split && Util.inArray([ 'interval', 'schema' ], type)) || !geom.isShareTooltip()) {
          } else {
            const geomContainer = geom.get('container');
            const canvas = geomContainer.get('canvas');
            const pixelRatio = canvas.get('pixelRatio');
            const shape = geomContainer.getShape(point.x * pixelRatio, point.y * pixelRatio);
            if (shape && shape.get('visible')) {
              items = geom.getTipItems(shape.get('origin'));
            }
          }
        }
      });
    });

    if (items.length) {
      if (options.split && items.length > 1) {
        let snapItem = items[0];
        let min = Math.abs(point.y - snapItem.y);
        Util.each(items, aItem => {
          if (Math.abs(point.y - aItem.y) <= min) {
            snapItem = aItem;
            min = Math.abs(point.y - aItem.y);
          }
        });
        markersItems = [ snapItem ];
        items = [ snapItem ];
      }
      const first = items[0];
      if (!Util.isEmpty(markersItems)) {
        point = markersItems[0];
      }
      const title = first.title || first.name;
      self._setTooltip(title, point, items, markersItems);
    } else {
      self.hideTooltip();
    }
  }

  clear() {
    const tooltip = this.tooltip;
    tooltip && tooltip.remove();
    this.tooltip = null;
    this.prePoint = null;
    this._offEvent();
  }
}

module.exports = TooltipController;

