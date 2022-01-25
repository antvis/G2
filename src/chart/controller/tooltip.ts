import { deepMix, find, get, isEqual, isFunction, mix, isString, isBoolean, flatten, isArray } from '@antv/util';
import { Crosshair, HtmlTooltip, IGroup } from '../../dependents';
import { Point, TooltipItem, TooltipOption } from '../../interface';
import { getAngleByPoint, getDistanceToCenter, isPointInCoordinate, getCoordinateClipCfg } from '../../util/coordinate';
import { polarToCartesian } from '../../util/graphics';
import { findItemsFromView } from '../../util/tooltip';
import { BBox } from '../../util/bbox';
import { Controller } from './base';
import Event from '../event';
import View from '../view';

// Filter duplicates, use `name`, `color`, `value` and `title` property values as condition
function uniq(items) {
  const uniqItems = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
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
  }
  return uniqItems;
}

/** @ignore */
export default class Tooltip extends Controller<TooltipOption> {
  private tooltip;
  private tooltipMarkersGroup: IGroup;
  private tooltipCrosshairsGroup: IGroup;
  private xCrosshair;
  private yCrosshair;
  private guideGroup: IGroup;

  private isLocked: boolean = false;
  private items;
  private title: string;
  private point: Point;

  public get name(): string {
    return 'tooltip';
  }

  public init() { }

  private isVisible() {
    const option = this.view.getOptions().tooltip;
    return option !== false;
  }

  public render() { }

  /**
   * Shows tooltip
   * @param point
   */
  public showTooltip(point: Point) {
    this.point = point;
    if (!this.isVisible()) {
      // 如果设置 tooltip(false) 则始终不显示
      return;
    }
    const view = this.view;
    const items = this.getTooltipItems(point);
    if (!items.length) {
      // 无内容则不展示，同时 tooltip 需要隐藏
      this.hideTooltip();
      return;
    }
    const title = this.getTitle(items);
    const dataPoint = {
      x: items[0].x,
      y: items[0].y,
    }; // 数据点位置

    view.emit(
      'tooltip:show',
      Event.fromData(view, 'tooltip:show', {
        items,
        title,
        ...point,
      })
    );

    const cfg = this.getTooltipCfg();
    const { follow, showMarkers, showCrosshairs, showContent, marker } = cfg;
    const lastItems = this.items;
    const lastTitle = this.title;
    if (!isEqual(lastTitle, title) || !isEqual(lastItems, items)) {
      // 内容发生变化了更新 tooltip
      view.emit(
        'tooltip:change',
        Event.fromData(view, 'tooltip:change', {
          items,
          title,
          ...point,
        })
      );

      if (isFunction(showContent) ? showContent(items) : showContent) {
        // 展示 tooltip 内容框才渲染 tooltip
        if (!this.tooltip) {
          // 延迟生成
          this.renderTooltip();
        }
        this.tooltip.update(
          mix(
            {},
            cfg,
            {
              items: this.getItemsAfterProcess(items),
              title,
            },
            follow ? point : {}
          )
        );
        this.tooltip.show();
      }

      if (showMarkers) {
        // 展示 tooltipMarkers，tooltipMarkers 跟随数据
        this.renderTooltipMarkers(items, marker);
      }
    } else {
      // 内容未发生变化，则更新位置
      if (this.tooltip && follow) {
        this.tooltip.update(point);
        this.tooltip.show(); // tooltip 有可能被隐藏，需要保证显示状态
      }

      if (this.tooltipMarkersGroup) {
        this.tooltipMarkersGroup.show();
      }
    }

    this.items = items;
    this.title = title;

    if (showCrosshairs) {
      // 展示 tooltip 辅助线
      const isCrosshairsFollowCursor = get(cfg, ['crosshairs', 'follow'], false); // 辅助线是否要跟随鼠标
      this.renderCrosshairs(isCrosshairsFollowCursor ? point : dataPoint, cfg);
    }
  }

  public hideTooltip() {
    const { follow } = this.getTooltipCfg();
    if (!follow) {
      this.point = null;
      return;
    }
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

    const tooltip = this.tooltip;
    if (tooltip) {
      tooltip.hide();
    }

    this.view.emit('tooltip:hide', Event.fromData(this.view, 'tooltip:hide', {}));

    this.point = null;
  }

  /**
   * lockTooltip
   */
  public lockTooltip() {
    this.isLocked = true;
    if (this.tooltip) {
      // tooltip contianer 可捕获事件
      this.tooltip.setCapture(true);
    }
  }

  /**
   * unlockTooltip
   */
  public unlockTooltip() {
    this.isLocked = false;
    const cfg = this.getTooltipCfg();
    if (this.tooltip) {
      // 重置 capture 属性
      this.tooltip.setCapture(cfg.capture);
    }
  }

  /**
   * isTooltipLocked
   */
  public isTooltipLocked() {
    return this.isLocked;
  }

  public clear() {
    const { tooltip, xCrosshair, yCrosshair, tooltipMarkersGroup } = this;
    if (tooltip) {
      tooltip.hide();
      tooltip.clear();
    }

    if (xCrosshair) {
      xCrosshair.clear();
    }

    if (yCrosshair) {
      yCrosshair.clear();
    }

    if (tooltipMarkersGroup) {
      tooltipMarkersGroup.clear();
    }

    // 如果 customContent 不为空，就重新生成 tooltip
    if (tooltip?.get('customContent')) {
      this.tooltip.destroy();
      this.tooltip = null;
    }

    // title 和 items 需要清空, 否则 tooltip 内容会出现置空的情况
    // 即：需要走进 !isEqual(lastTitle, title) || !isEqual(lastItems, items) 的逻辑，更新 tooltip 的内容
    this.title = null;
    this.items = null;
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

    this.reset();
  }

  public reset() {
    this.items = null;
    this.title = null;
    this.tooltipMarkersGroup = null;
    this.tooltipCrosshairsGroup = null;
    this.xCrosshair = null;
    this.yCrosshair = null;
    this.tooltip = null;
    this.guideGroup = null;
    this.isLocked = false;
    this.point = null;
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
      // 三层
      items = flatten(items);
      for (const itemArr of items) {
        for (const item of itemArr) {
          const { x, y } = item.mappingData;
          item.x = isArray(x) ? x[x.length - 1] : x;
          item.y = isArray(y) ? y[y.length - 1] : y;
        }
      }

      const { shared } = this.getTooltipCfg();
      // shared: false 代表只显示当前拾取到的 shape 的数据，但是一个 view 会有多个 Geometry，所以有可能会拾取到多个 shape
      if (shared === false && items.length > 1) {
        let snapItem = items[0];
        let min = Math.abs(point.y - snapItem[0].y);
        for (const aItem of items) {
          const yDistance = Math.abs(point.y - aItem[0].y);
          if (yDistance <= min) {
            snapItem = aItem;
            min = yDistance;
          }
        }
        items = [snapItem];
      }

      return uniq(flatten(items));
    }

    return [];
  }

  public layout() { }

  public update() {
    if (this.point) {
      this.showTooltip(this.point);
    }

    if (this.tooltip) {
      // #2279 修复resize之后tooltip越界的问题
      // 确保tooltip已经创建的情况下
      const canvas = this.view.getCanvas();
      // TODO 逍为 tooltip 的区域不应该是 canvas，而应该是整个 特别是在图比较小的时候
      // 更新 region
      this.tooltip.set('region', {
        start: { x: 0, y: 0 },
        end: { x: canvas.get('width'), y: canvas.get('height') },
      });
    }
  }

  /**
   * 当前鼠标点是在 enter tooltip 中
   * @param point
   */
  public isCursorEntered(point: Point) {
    // 是可捕获的，并且点在 tooltip dom 上
    if (this.tooltip) {
      const el: HTMLElement = this.tooltip.getContainer();
      const capture = this.tooltip.get('capture');

      if (el && capture) {
        const { x, y, width, height } = el.getBoundingClientRect();
        return new BBox(x, y, width, height).isPointIn(point);
      }
    }

    return false;
  }

  // 获取 tooltip 配置，因为用户可能会通过 view.tooltip() 重新配置 tooltip，所以就不做缓存，每次直接读取
  public getTooltipCfg() {
    const view = this.view;
    const option = view.getOptions().tooltip;
    const processOption = this.processCustomContent(option);
    const theme = view.getTheme();
    const defaultCfg = get(theme, ['components', 'tooltip'], {});
    const enterable = get(processOption, 'enterable', defaultCfg.enterable);
    return deepMix({}, defaultCfg, processOption, {
      capture: enterable || this.isLocked ? true : false,
    });
  }

  // process customContent
  protected processCustomContent(option: TooltipOption) {
    if (isBoolean(option) || !get(option, 'customContent')) {
      return option;
    }
    const currentCustomContent = option.customContent;
    const customContent = (title: string, items: any[]) => {
      const content = currentCustomContent(title, items) || '';
      return isString(content) ? '<div class="g2-tooltip">' + content + '</div>' : content;
    };
    return {
      ...option,
      customContent,
    };
  }

  private getTitle(items) {
    const title = items[0].title || items[0].name;
    this.title = title;

    return title;
  }

  private renderTooltip() {
    const canvas = this.view.getCanvas();
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

  private renderTooltipMarkers(items, marker) {
    const tooltipMarkersGroup = this.getTooltipMarkersGroup();
    const rootView = this.view.getRootView();
    const { limitInPlot } = rootView;
    for (const item of items) {
      const { x, y } = item;

      // 有裁剪就剪切
      if (limitInPlot || tooltipMarkersGroup?.getClip()) {
        const { type, attrs } = getCoordinateClipCfg(rootView.getCoordinate());
        tooltipMarkersGroup?.setClip({
          type,
          attrs,
        });
      } else {
        // 清除已有的 clip
        tooltipMarkersGroup?.setClip(undefined);
      }

      const attrs = {
        fill: item.color,
        symbol: 'circle',
        shadowColor: item.color,
        ...marker,
        x,
        y,
      };

      tooltipMarkersGroup.addShape('marker', {
        attrs,
      });
    }
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
    const coordinate = this.getViewWithGeometry(this.view).getCoordinate();
    if (!isPointInCoordinate(coordinate, point)) {
      return;
    }
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
      const angle = getAngleByPoint(coordinate, point);
      const center = coordinate.getCenter();
      const radius = coordinate.getRadius();
      end = polarToCartesian(center.x, center.y, radius, angle);
      start = center;
    }

    const cfg = deepMix(
      {
        start,
        end,
        container: this.getTooltipCrosshairsGroup(),
      },
      get(tooltipCfg, 'crosshairs', {}),
      this.getCrosshairsText('x', point, tooltipCfg)
    );
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
    const coordinate = this.getViewWithGeometry(this.view).getCoordinate();
    if (!isPointInCoordinate(coordinate, point)) {
      return;
    }
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

    cfg = deepMix(
      {
        container: this.getTooltipCrosshairsGroup(),
      },
      cfg,
      get(tooltipCfg, 'crosshairs', {}),
      this.getCrosshairsText('y', point, tooltipCfg)
    );
    delete cfg.type; // 与 Crosshairs 组件的 type 冲突故删除

    let yCrosshair = this.yCrosshair;
    if (yCrosshair) {
      // 如果坐标系发生直角坐标系与极坐标的切换操作
      if (
        (coordinate.isRect && yCrosshair.get('type') === 'circle') ||
        (!coordinate.isRect && yCrosshair.get('type') === 'line')
      ) {
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
    const follow = get(tooltipCfg, ['crosshairs', 'follow']);
    const items = this.items;

    if (textCfg) {
      const view = this.getViewWithGeometry(this.view);
      // 需要展示文本
      const firstItem = items[0];
      const xScale = view.getXScale();
      const yScale = view.getYScales()[0];
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
        capture: false,
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

  private findItemsFromView(view: View, point: Point) {
    if (view.getOptions().tooltip === false) {
      // 如果 view 关闭了 tooltip
      return [];
    }

    const tooltipCfg = this.getTooltipCfg();
    let result = findItemsFromView(view, point, tooltipCfg);
    // 递归查找，并合并结果
    for (const childView of view.views) {
      result = result.concat(this.findItemsFromView(childView, point));
    }

    return result;
  }

  // FIXME: hack 方法
  // 因为 tooltip 的交互是挂载在 Chart 上，所以当chart 上没有绘制 Geometry 的时候，就查找不到数据，并且绘图区域同子 View 的区域不同
  private getViewWithGeometry(view) {
    if (view.geometries.length) {
      return view;
    }

    return find(view.views, (childView) => this.getViewWithGeometry(childView));
  }

  /**
   * 根据用户配置的 items 配置，来进行用户自定义的处理，并返回最终的 items
   * 默认不做任何处理
   */
  private getItemsAfterProcess(originalItems: TooltipItem[]): TooltipItem[] {
    const { customItems } = this.getTooltipCfg();
    const fn = customItems ? customItems : (v) => v;

    return fn(originalItems);
  }
}
