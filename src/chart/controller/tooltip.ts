import { vec2 } from '@antv/matrix-util';
import { deepMix, each, find, flatten, get, isArray, isEqual, isFunction } from '@antv/util';
import { Crosshair, HtmlTooltip, IGroup } from '../../dependents';
import Geometry from '../../geometry/base';
import { MappingDatum, Point, TooltipOption } from '../../interface';
import { getDistanceToCenter, getPointAngle } from '../../util/coordinate';
import { polarToCartesian } from '../../util/graphics';
import { findDataByPoint, getTooltipItems } from '../../util/tooltip';
import { Controller } from './base';

function getFirstItem(item) {
  return isArray(item) ? item[0] : item;
}

// Filter duplicates, use `name`, `color`, `value` and `title` property values as condition
function uniq(items) {
  const uniqItems = [];
  each(items, (item) => {
    const result = find(uniqItems, (subItem) => {
      return (
        subItem.color === item.color &&
        subItem.name === item.name &&
        subItem.value === item.value &&
        subItem.title === item.title
      );
    });
    if (!result) {
      uniqItems.push(item);
    }
  });
  return uniqItems;
}

export default class Tooltip extends Controller<TooltipOption> {
  private tooltip;
  private tooltipMarkersGroup: IGroup;
  private tooltipCrosshairsGroup: IGroup;
  private xCrosshair;
  private yCrosshair;
  private guideGroup: IGroup;

  private isVisible: boolean = true;
  private items;
  private title: string;

  public get name(): string {
    return 'tooltip';
  }

  public init() { }

  public render() {
    if (this.tooltip) {
      return;
    }

    this.option = this.view.getOptions().tooltip;
    this.isVisible = this.option !== false;

    const view = this.view;

    const canvas = view.getCanvas();
    const region = {
      start: { x: 0, y: 0 },
      end: { x: canvas.get('width'), y: canvas.get('height') },
    };

    const cfg = this.getTooltipCfg();
    const tooltip = new HtmlTooltip({
      parent: canvas.get('el').parentNode,
      region,
      ...cfg,
      visible: false,
      crosshairs: null,
    });

    tooltip.init();

    this.tooltip = tooltip;
  }

  /**
   * Shows tooltip
   * @param point
   */
  public showTooltip(point: Point) {
    if (!this.isVisible) { // 如果设置 tooltip(false) 则始终不显示
      return;
    }
    const { view, tooltip } = this;
    const items = this.getTooltipItems(point);
    if (!items.length) {
      return;
    }

    const cfg = this.getTooltipCfg();
    const title = this.getTitle(items);

    const follow = cfg.follow;
    let location;
    if (follow) {
      // 跟随鼠标
      location = point;
    } else {
      // 定位到数据点
      location = {
        x: items[0].x,
        y: items[0].y,
      };
    }

    tooltip.update({
      ...cfg,
      items,
      title,
      ...location,
    });
    tooltip.show();

    view.emit('tooltip:show', {
      tooltip,
      items,
      title,
      ...point,
    });

    const lastItems = this.items;
    const lastTitle = this.title;
    if (!isEqual(lastTitle, title) || !isEqual(lastItems, items)) {
      // 内容发生变化
      view.emit('tooltip:change', {
        tooltip,
        items,
        title,
        ...point,
      });
    }
    this.items = items;
    this.title = title;

    const { showMarkers, showCrosshairs } = cfg;
    if (showMarkers) {
      // 展示 tooltipMarkers
      this.renderTooltipMarkers(cfg);
    }
    if (showCrosshairs) {
      // 展示 tooltip 辅助线
      this.renderCrosshairs(location, cfg);
    }
  }

  public hideTooltip() {
    const { view, tooltip } = this;

    // hide the tooltipMarkers
    const tooltipMarkersGroup = this.tooltipMarkersGroup;
    if (tooltipMarkersGroup) {
      tooltipMarkersGroup.hide();
    }

    // hide crosshairs
    const xCrosshair = this.xCrosshair;
    const yCrosshair = this.yCrosshair;
    if (xCrosshair) {
      xCrosshair.hide();
    }
    if (yCrosshair) {
      yCrosshair.hide();
    }

    // @ts-ignore
    tooltip.hide();

    view.emit('tooltip:hide', {
      tooltip: this.tooltip,
    });
  }

  public clear() {
    const { tooltip, xCrosshair, yCrosshair } = this;
    if (tooltip) {
      tooltip.clear();
      tooltip.hide();
    }

    if (xCrosshair) {
      xCrosshair.clear();
    }

    if (yCrosshair) {
      yCrosshair.clear();
    }
  }

  public destroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
    if (this.xCrosshair) {
      this.xCrosshair.destroy();
    }
    if (this.yCrosshair) {
      this.yCrosshair.destroy();
    }

    if (this.guideGroup) {
      this.guideGroup.remove(true);
    }

    this.items = null;
    this.title = null;
    this.tooltipMarkersGroup = null;
    this.tooltipCrosshairsGroup = null;
    this.xCrosshair = null;
    this.yCrosshair = null;
    this.tooltip = null;
    this.guideGroup = null;
  }

  public changeVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    const { tooltip, tooltipMarkersGroup, xCrosshair, yCrosshair } = this;
    if (visible) {
      if (tooltip) {
        tooltip.show();
      }
      if (tooltipMarkersGroup) {
        tooltipMarkersGroup.show();
      }
      if (xCrosshair) {
        xCrosshair.show();
      }
      if (yCrosshair) {
        yCrosshair.show();
      }
    } else {
      if (tooltip) {
        tooltip.hide();
      }
      if (tooltipMarkersGroup) {
        tooltipMarkersGroup.hide();
      }
      if (xCrosshair) {
        xCrosshair.hide();
      }
      if (yCrosshair) {
        yCrosshair.hide();
      }
    }
    this.visible = visible;
  }

  public getTooltipItems(point: Point) {
    let items = this.findItemsFromView(this.view, point);
    if (items.length) {
      each(flatten(items), (item) => {
        const { x, y } = item.mappingData;
        item.x = isArray(x) ? x[x.length - 1] : x;
        item.y = isArray(y) ? y[y.length - 1] : y;
      });

      const { shared } = this.getTooltipCfg();
      // shared: false 代表只显示当前拾取到的 shape 的数据，但是一个 view 会有多个 Geometry，所以有可能会拾取到多个 shape
      if (shared === false && items.length > 1) {
        let snapItem = getFirstItem(items[0]);
        let min = Math.abs(point.y - snapItem.y);
        each(items, (aItem) => {
          const firstAItem = getFirstItem(aItem);
          const yDistance = Math.abs(point.y - firstAItem.y);
          if (yDistance <= min) {
            snapItem = firstAItem;
            min = yDistance;
          }
        });
        items = [snapItem];
      }

      return uniq(flatten(items));
    }

    return [];
  }

  public layout() { }
  public update() {
    this.clear();
    // 更新 tooltip 配置
    this.option = this.view.getOptions().tooltip;
  }


  // 获取 tooltip 配置，因为用户可能会通过 view.tooltip() 重新配置 tooltip，所以就不做缓存，每次直接读取
  private getTooltipCfg() {
    const view = this.view;
    const option = this.option;
    const theme = view.getTheme();
    const defaultCfg = get(theme, ['components', 'tooltip'], {});
    return deepMix({}, defaultCfg, option);
  }

  private getTitle(items) {
    const title = items[0].title || items[0].name;
    this.title = title;

    return title;
  }

  private renderTooltipMarkers(cfg) {
    const tooltipMarkersGroup = this.getTooltipMarkersGroup();
    each(this.items, (item) => {
      const { x, y } = item;
      const attrs = {
        fill: item.color,
        symbol: 'circle',
        shadowColor: item.color,
        ...cfg.marker,
        x,
        y,
      };

      tooltipMarkersGroup.addShape('marker', {
        attrs,
      });
    });
  }

  private renderCrosshairs(point: Point, cfg) {
    const crosshairsType = get(cfg, ['crosshairs', 'type'], 'x'); // 默认展示 x 轴上的辅助线
    if (crosshairsType === 'x') {
      if (this.yCrosshair) {
        this.yCrosshair.hide();
      }
      this.renderXCrosshairs(point, cfg);
    } else if (crosshairsType === 'y') {
      if (this.xCrosshair) {
        this.xCrosshair.hide();
      }
      this.renderYCrosshairs(point, cfg);
    } else if (crosshairsType === 'xy') {
      this.renderXCrosshairs(point, cfg);
      this.renderYCrosshairs(point, cfg);
    }
  }

  // 渲染 x 轴上的 tooltip 辅助线
  private renderXCrosshairs(point: Point, tooltipCfg) {
    const coordinate = this.view.getCoordinate();
    let start;
    let end;
    if (coordinate.isRect) {
      if (coordinate.isTransposed) {
        start = {
          x: coordinate.start.x,
          y: point.y,
        };
        end = {
          x: coordinate.end.x,
          y: point.y,
        };
      } else {
        start = {
          x: point.x,
          y: coordinate.end.y,
        };
        end = {
          x: point.x,
          y: coordinate.start.y,
        };
      }
    } else {
      // 极坐标下 x 轴上的 crosshairs 表现为半径
      const angle = getPointAngle(coordinate, point);
      const center = coordinate.getCenter();
      // @ts-ignore
      const radius = coordinate.getRadius();
      end = polarToCartesian(center.x, center.y, radius, angle);
      start = center;
    }

    const cfg = deepMix({
      start,
      end,
      container: this.getTooltipCrosshairsGroup(),
    }, get(tooltipCfg, 'crosshairs', {}), this.getCrosshairsText('x', point, tooltipCfg));
    delete cfg.type; // 与 Crosshairs 组件的 type 冲突故删除

    let xCrosshair = this.xCrosshair;
    if (xCrosshair) {
      xCrosshair.update(cfg);
    } else {
      xCrosshair = new Crosshair.Line(cfg);
      xCrosshair.init();
    }
    xCrosshair.render();
    xCrosshair.show();
    this.xCrosshair = xCrosshair;
  }

  // 渲染 y 轴上的辅助线
  private renderYCrosshairs(point: Point, tooltipCfg) {
    const coordinate = this.view.getCoordinate();
    let cfg;
    let type;
    if (coordinate.isRect) {
      let start;
      let end;
      if (coordinate.isTransposed) {
        start = {
          x: point.x,
          y: coordinate.end.y,
        };
        end = {
          x: point.x,
          y: coordinate.start.y,
        };
      } else {
        start = {
          x: coordinate.start.x,
          y: point.y,
        };
        end = {
          x: coordinate.end.x,
          y: point.y,
        };
      }
      cfg = {
        start,
        end,
      };
      type = 'Line';
    } else {
      // 极坐标下 y 轴上的 crosshairs 表现为圆弧
      cfg = {
        center: coordinate.getCenter(),
        // @ts-ignore
        radius: getDistanceToCenter(coordinate, point),
        startAngle: coordinate.startAngle,
        endAngle: coordinate.endAngle,
      };
      type = 'Circle';
    }

    cfg = deepMix({
      container: this.getTooltipCrosshairsGroup()
    }, cfg, get(tooltipCfg, 'crosshairs', {}), this.getCrosshairsText('y', point, tooltipCfg));
    delete cfg.type; // 与 Crosshairs 组件的 type 冲突故删除

    let yCrosshair = this.yCrosshair;
    if (yCrosshair) {
      // 如果坐标系发生直角坐标系与极坐标的切换操作
      if ((coordinate.isRect && yCrosshair.get('type') === 'circle')
        || (!coordinate.isRect && yCrosshair.get('type') === 'line')) {
        yCrosshair = new Crosshair[type](cfg);
        yCrosshair.init();
      } else {
        yCrosshair.update(cfg);
      }
    } else {
      yCrosshair = new Crosshair[type](cfg);
      yCrosshair.init();
    }
    yCrosshair.render();
    yCrosshair.show();
    this.yCrosshair = yCrosshair;
  }

  private getCrosshairsText(type, point: Point, tooltipCfg) {
    let textCfg = get(tooltipCfg, ['crosshairs', 'text']);
    const follow = tooltipCfg.follow;
    const items = this.items;

    if (textCfg) {
      // 需要展示文本
      const firstItem = items[0];
      const xScale = this.view.getXScale();
      const yScale = this.view.getYScales()[0];
      let xValue;
      let yValue;
      if (follow) {
        // 如果需要跟随鼠标移动，就需要将当前鼠标坐标点转换为对应的数值
        const invertPoint = this.view.getCoordinate().invert(point);
        xValue = xScale.invert(invertPoint.x); // 转换为原始值
        yValue = yScale.invert(invertPoint.y); // 转换为原始值
      } else {
        xValue = firstItem.data[xScale.field];
        yValue = firstItem.data[yScale.field];
      }

      const content = type === 'x' ? xValue : yValue;
      if (isFunction(textCfg)) {
        textCfg = textCfg(type, content, items, point);
      } else {
        textCfg.content = content;
      }

      return {
        text: textCfg,
      };
    }
  }

  // 获取存储 tooltipMarkers 和 crosshairs 的容器
  private getGuideGroup() {
    if (!this.guideGroup) {
      const foregroundGroup = this.view.foregroundGroup;
      this.guideGroup = foregroundGroup.addGroup({
        name: 'tooltipGuide',
      });
    }

    return this.guideGroup;
  }

  // 获取 tooltipMarkers 存储的容器
  private getTooltipMarkersGroup() {
    let tooltipMarkersGroup = this.tooltipMarkersGroup;
    if (tooltipMarkersGroup && !tooltipMarkersGroup.destroyed) {
      tooltipMarkersGroup.clear();
      tooltipMarkersGroup.show();
    } else {
      tooltipMarkersGroup = this.getGuideGroup().addGroup({
        name: 'tooltipMarkersGroup',
      });
      tooltipMarkersGroup.toFront();
      this.tooltipMarkersGroup = tooltipMarkersGroup;
    }
    return tooltipMarkersGroup;
  }

  // 获取 tooltip crosshairs 存储的容器
  private getTooltipCrosshairsGroup() {
    let tooltipCrosshairsGroup = this.tooltipCrosshairsGroup;
    if (!tooltipCrosshairsGroup) {
      tooltipCrosshairsGroup = this.getGuideGroup().addGroup({
        name: 'tooltipCrosshairsGroup',
        capture: false,
      });
      tooltipCrosshairsGroup.toBack();
      this.tooltipCrosshairsGroup = tooltipCrosshairsGroup;
    }
    return tooltipCrosshairsGroup;
  }

  private getTooltipItemsByHitShape(geometry, point, title) {
    let result = [];
    const container = geometry.container;
    const shape = container.getShape(point.x, point.y);
    if (shape && shape.get('visible') && shape.get('origin')) {
      const mappingData = shape.get('origin').mappingData;
      result = getTooltipItems(mappingData, geometry, title);
    }

    return result;
  }

  private getTooltipItemsByFindData(geometry, point, title) {
    let result = [];
    each(geometry.dataArray, (data: MappingDatum[]) => {
      const record = findDataByPoint(point, data, geometry);
      if (record) {
        result = result.concat(getTooltipItems(record, geometry, title));
      }
    });

    return result;
  }

  private findItemsFromView(view, point) {
    if (view.getOptions().tooltip === false) {
      // 如果 view 关闭了 tooltip
      return [];
    }

    let result = [];
    // 先从 view 本身查找
    const geometries = view.geometries;
    const { shared, title } = this.getTooltipCfg();
    each(geometries, (geometry: Geometry) => {
      if (geometry.visible && geometry.tooltipOption !== false) {
        // geometry 可见同时未关闭 tooltip
        const geometryType = geometry.type;
        let tooltipItems;
        if (['point', 'edge', 'polygon'].includes(geometryType)) {
          // 始终通过图形拾取
          tooltipItems = this.getTooltipItemsByHitShape(geometry, point, title);
        } else if (['area', 'line', 'path', 'heatmap'].includes(geometryType)) {
          // 如果是 'area', 'line', 'path'，始终通过数据查找方法查找 tooltip
          tooltipItems = this.getTooltipItemsByFindData(geometry, point, title);
        } else {
          if (shared !== false) {
            tooltipItems = this.getTooltipItemsByFindData(geometry, point, title);
          } else {
            tooltipItems = this.getTooltipItemsByHitShape(geometry, point, title);
          }
        }
        if (tooltipItems.length) {
          // geometry 有可能会有多个 item，因为用户可以设置 geometry.tooltip('x*y*z')
          result.push(tooltipItems);
        }
      }
    });

    // 递归查找，并合并结果
    each(view.views, (childView) => {
      result = result.concat(this.findItemsFromView(childView, point));
    });

    return result;
  }
}
