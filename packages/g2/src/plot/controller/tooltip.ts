import * as _ from '@antv/util';
import { Tooltip } from '@antv/component';
import View from '../view';
import { getShapeFactory } from '../../element/shape/base';
import { DataPointType } from '../../interface';
import Element from '../../element/base';
const Vector2 = _.vec2;

const TYPE_SHOW_MARKERS = [ 'line', 'area', 'path' ]; // 默认展示 tooltip marker 的几何图形
const TYPE_SHOW_CROSSHAIRS = [ 'line', 'area' ]; // 默认展示十字瞄准线的几何图形

// TODO FIXME this is HARD CODING
const IGNORE_TOOLTIP_ITEM_PROPERTIES = [ 'marker', 'showMarker' ];

const _indexOfArray = (items, item) => {
  let rst = -1;
  _.each(items, (sub, index: number) => {
    let isEqual = true;
    for (const key in item) {
      if (item.hasOwnProperty(key) && IGNORE_TOOLTIP_ITEM_PROPERTIES.indexOf(key) === -1) {
        if (!_.isObject(item[key]) && item[key] !== sub[key]) {
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
};

// 判断是否有样式
const _hasClass = (dom, className) => {
  const cls = dom.className;
  return cls && cls.indexOf(className) !== -1;
};

const _isParent = (dom, cls) => {
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
};

// 去除重复的值, 去除不同图形相同数据，只展示一份即可
const _uniqItems = (items) => {
  const tmp = [];
  _.each(items, (item) => {
    const index = _indexOfArray(tmp, item);
    if (index === -1) {
      tmp.push(item);
    }
  });
  return tmp;
};

export default class TooltipController {
  private timeStamp: number = 0;
  private prePoint: {
    x: number;
    y: number;
  };
  view: View;
  theme: DataPointType;
  options: DataPointType;
  tooltip: Tooltip.Html | Tooltip.Canvas;

  constructor(cfg) {
    _.assign(this, cfg);
  }

  renderTooltip() {
    if (this.tooltip) {
      // tooltip 对象已经创建
      return;
    }
    const view = this.view;
    const theme = this.theme;
    const canvas = this._getCanvas();
    const defaultCfg = this._getDefaultTooltipOptions();
    let options = this.options;
    options = _.deepMix(
      {
        panelRange: view.get('panelRange'),
        capture: false,
        canvas,
        frontgroundGroup: view.get('frontgroundGroup'),
        theme: theme.tooltip,
        backgroundGroup: view.get('backgroundGroup'),
      },
      defaultCfg,
      options,
    );

    options.visible = false;

    let tooltip;
    if (options.useHtml) {
      tooltip = new Tooltip.Html(options);
      const triggerEvent = this._getTriggerEvent();
      if (!tooltip.get('enterable') && triggerEvent === 'panel:mousemove') {
        const tooltipContainer = tooltip.get('container');
        if (tooltipContainer) {
          tooltipContainer.onmousemove = (e) => {
            // 避免 tooltip 频繁闪烁
            const eventObj = this._normalizeEvent(e);
            view.emit(triggerEvent, eventObj);
          };
        }
      }
    } else {
      tooltip = new Tooltip.Canvas(options);
    }
    this.tooltip = tooltip;
    // 需要保存当前 tooltip 的配置项，否则当用户关闭 tooltip 再手动调用 view.showTooltip() 时会报错
    this.options = options;

    this._bindEvent();
  }

  _normalizeEvent(event) {
    const view = this.view;
    const canvas = this._getCanvas();
    const point = canvas.getPointByClient(event.clientX, event.clientY);
    const pixelRatio = canvas.get('pixelRatio');
    point.x = point.x / pixelRatio;
    point.y = point.y / pixelRatio;
    point.view = view;
    return point;
  }

  private _getCanvas() {
    return this.view.get('canvas');
  }

  private _getTriggerEvent() {
    const triggerOn = _.get(this.options, 'triggerOn');
    let eventName;

    if (!triggerOn || triggerOn === 'mousemove') {
      eventName = 'panel:mousemove';
    } else if (triggerOn === 'click') {
      eventName = 'panel:click';
    } else if (triggerOn === 'none') {
      eventName = null;
    }

    return eventName;
  }

  private _getDefaultTooltipOptions() {
    const view = this.view;
    const theme = this.theme;
    const defaultCfg = _.mix({}, theme.tooltip);
    const elements = _.filter(view.getElements(), (element: Element): boolean => element.get('visible'));
    const shapes = _.uniq(_.map(elements, (element: Element) => element.get('type')));

    const isTransposed = view.get('coord') ? view.get('coord').isTransposed : false;

    let crosshairsCfg;
    if (view.get('coord') && view.get('coord').type === 'cartesian') {
      if (_.indexOf(TYPE_SHOW_CROSSHAIRS, shapes[0]) > -1) {
        const crosshairs = _.mix({}, theme.tooltipCrosshairsLine);
        crosshairs.isTransposed = isTransposed;
        crosshairsCfg = {
          crosshairs,
        };
      }
    }

    return _.mix(defaultCfg, crosshairsCfg);
  }

  private _bindEvent() {
    const view = this.view;
    const triggerEvent = this._getTriggerEvent();
    if (triggerEvent) {
      view.on(triggerEvent, this.onMouseMove);
      view.on('panel:mouseleave', this.onMouseOut);
    }
  }

  private _offEvent() {
    const view = this.view;
    const triggerEvent = this._getTriggerEvent();
    if (triggerEvent) {
      view.off(triggerEvent, this.onMouseMove);
      view.off('panel:mouseleave', this.onMouseOut);
    }
  }

  private _setTooltip(point, _items, markersItems, target) {
    const tooltip = this.tooltip;
    const prePoint = this.prePoint;
    if (!prePoint || (prePoint.x !== point.x || prePoint.y !== point.y)) {
      const items = _uniqItems(_items);
      this.prePoint = point;

      const view = this.view;
      const theme = this.theme;
      const x = _.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
      const y = _.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
      if (!tooltip.get('visible')) {
        view.emit('tooltip:show', {
          x,
          y,
          tooltip,
        });
      }
      const first = items[0];
      let title = first.title || first.name;
      if (tooltip.isContentChange(title, items)) {
        view.emit('tooltip:change', {
          tooltip,
          x,
          y,
          items,
        });
        // bugfix: when set the title in the tooltip:change event does not take effect.
        title = items[0].title || items[0].name;
        tooltip.setContent(title, items);
        if (!_.isEmpty(markersItems)) {
          if (this.options.showTooltipMarkers === false) {
            // 不展示 tooltip marker
            tooltip.set('markerItems', markersItems); // 用于 tooltip 辅助线的定位
          } else {
            tooltip.setMarkers(markersItems, theme.tooltipMarker);
          }
        } else {
          tooltip.clearMarkers();
          // clearMarkers 只会将 markerItems 从 markerGroup 中移除
          // 所以我们还要将 markerItems 从 tooltip 中移除
          // 这么做是为了防止上一次设置 marker 时的 markerItems 影响此次 tooltip 辅助线的定位
          tooltip.set('markerItems', []);
        }
      }
      tooltip.setPosition(
        x + (view.get('panelGroup').get('x') || 0),
        y + (view.get('panelGroup').get('y') || 0),
        target,
      );
      tooltip.show();
    }
  }

  hideTooltip() {
    const tooltip = this.tooltip;
    if (tooltip.get('visible')) {
      // 优化，只有 tooltip 处于 visible: true 状态时才隐藏，否则会造成 canvas 的不断重绘
      const view = this.view;
      const canvas = this._getCanvas();
      this.prePoint = null;
      tooltip.hide();
      view.emit('tooltip:hide', {
        tooltip,
      });
      view.setActive(() => {
        return false;
      });
      canvas.draw();
    }
  }

  onMouseMove = (ev) => {
    const group = this.view.get('panelGroup');
    const lastTimeStamp = this.timeStamp;
    const timeStamp = +new Date();
    const point = {
      x: ev.x - (group.get('x') || 0),
      y: ev.y - (group.get('y') || 0),
    };
    if (timeStamp - lastTimeStamp > 16) {
      this.showTooltip(point, this.view, ev.target);
      this.timeStamp = timeStamp;
    }
  }

  onMouseOut = (ev) => {
    // const tooltip = this.tooltip;
    // if (!tooltip.get('visible') || !tooltip.get('follow')) {
    //   return;
    // }
    if (ev && !ev.event) {
      // 如果鼠标 hover 到 tooltipContainer 内容框上不需要 hideTooltip
      return;
    }
    this.hideTooltip();
  }

  showTooltip(point, view, target) {
    if (!point) {
      return;
    }
    if (!this.tooltip) {
      this.renderTooltip(); // 如果一开始 tooltip 关闭，用户重新调用的时候需要先生成 tooltip
    }
    const options = this.options;
    let markersItems = [];
    let items = [];
    const elements = view.getElements();
    const coord = view.get('coord');
    _.each(elements, (element: Element) => {
      const type = element.get('type');
      if (element.get('visible') && element.get('tooltipOptions') !== false) {
        const dataArray = element.get('dataArray');
        if (element.isShareTooltip() || _.contains([ 'area', 'line', 'path' ], type)) {
          // area、line、path 四种几何标记以及共享 tooltip 的场景使用数据查找策略
          _.each(dataArray, (data: DataPointType[]) => {
            const tmpPoint = element.findPoint(point, data);
            if (tmpPoint) {
              const subItems = element.getTooltipItems(tmpPoint, options.title);
              _.each(subItems, (v: DataPointType) => {
                let point = v.point;
                if (!_.isNil(point) && !_.isNil(point.x) && !_.isNil(point.y)) {
                  // hotfix: make sure there is no null value
                  const x = _.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
                  const y = _.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
                  point = coord.applyMatrix(x, y, 1);
                  v.x = point[0];
                  v.y = point[1];
                  v.showMarker = true;
                  const itemMarker = this._getItemMarker(element, v.color);
                  v.marker = itemMarker;
                  if (_.indexOf(TYPE_SHOW_MARKERS, type) !== -1) {
                    markersItems.push(v);
                  }
                }
              });
              items = items.concat(subItems);
            }
          });
        } else {
          const shapeContainer = element.get('shapeContainer');
          const canvas = shapeContainer.get('canvas');
          const pixelRatio = canvas.get('pixelRatio');
          const shape = shapeContainer.getShape(point.x * pixelRatio, point.y * pixelRatio);
          if (shape && shape.get('visible') && shape.get('origin')) {
            items = element.getTooltipItems(shape.get('origin'), options.title);
          }
        }
      }
    });

    _.each(items, (item) => {
      let point = item.point;
      const x = _.isArray(point.x) ? point.x[point.x.length - 1] : point.x;
      const y = _.isArray(point.y) ? point.y[point.y.length - 1] : point.y;
      point = coord.applyMatrix(x, y, 1);
      item.x = point[0];
      item.y = point[1];
    });

    if (items.length) {
      const first = items[0];
      // bugfix: multiple tooltip items with different titles
      if (!items.every((item) => item.title === first.title)) {
        let nearestItem = first;
        let nearestDistance = Infinity;
        items.forEach((item) => {
          const distance = Vector2.distance([ point.x, point.y ], [ item.x, item.y ]);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestItem = item;
          }
        });
        items = items.filter((item) => item.title === nearestItem.title);
        markersItems = markersItems.filter((item) => item.title === nearestItem.title);
      }

      if (options.shared === false && items.length > 1) {
        let snapItem = items[0];
        let min = Math.abs(point.y - snapItem.y);
        _.each(items, (aItem) => {
          if (Math.abs(point.y - aItem.y) <= min) {
            snapItem = aItem;
            min = Math.abs(point.y - aItem.y);
          }
        });
        if (snapItem && !_.isNil(snapItem.x) && !_.isNil(snapItem.y)) {
          markersItems = [ snapItem ];
        }
        items = [ snapItem ];
      }
      this._setTooltip(point, items, markersItems, target);
      // 使查找到的数据对应的 shape 处于 active 状态
      // 应该在每次出现 tooltip 的时候就 active 对应的 shapes
      view.setActive((obj) => {
        let result = false;
        _.each(items, (item) => {
          const origin = item.point._origin;
          if (origin === obj) {
            result = true;
            return false;
          }
        });
        return result;
      },             false);
    } else {
      this.hideTooltip();
    }
  }

  clear() {
    const tooltip = this.tooltip;
    tooltip && tooltip.destroy();
    this.tooltip = null;
    this.prePoint = null;
    this._offEvent();
  }

  private _getItemMarker(element: Element, color) {
    const shapeType = element.get('shapeType') || 'point';
    const shape = element.getDefaultValue('shape') || 'circle';
    const shapeObject = getShapeFactory(shapeType);
    const cfg = { color };
    const marker = shapeObject.getMarkerStyle(shape, cfg);
    return marker;
  }
}
