import { vec2 } from '@antv/matrix-util';
import { deepMix, each, find, get, isArray, isEqual, isObject } from '@antv/util';
import { HtmlTooltip, IGroup } from '../../dependents';
import Geometry from '../../geometry/base';
import { MappingDatum, Point } from '../../interface';
import { findDataByPoint, getTooltipItems } from '../../util/tooltip';
import { TooltipOption } from '../interface';
import { Controller } from './base';

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

  private isVisible: boolean = true;
  private markerGroup: IGroup;
  private items;
  private title: string;
  private tooltipInteraction;

  public get name(): string {
    return 'tooltip';
  }

  public init() {}

  public render() {
    if (this.tooltip) {
      return;
    }

    this.option = this.view.getOptions().tooltip;
    this.isVisible = this.option !== false;

    const view = this.view;

    const canvas = view.getCanvas();
    const coordinateBBox = view.coordinateBBox;
    const region = {
      start: { x: 0, y: 0 },
      end: { x: canvas.get('width'), y: canvas.get('height') },
    };
    const crosshairsRegion = {
      start: coordinateBBox.tl,
      end: coordinateBBox.br,
    };

    const cfg = this.getTooltipCfg();

    const tooltip = new HtmlTooltip({
      parent: canvas.get('el').parentNode,
      region,
      crosshairsRegion,
      ...cfg,
      visible: false,
    });

    tooltip.render();

    this.tooltip = tooltip;

    if (this.isVisible && !this.tooltipInteraction) {
      // 用户开启 Tooltip
      view.interaction('tooltip');

      this.tooltipInteraction = get(view.getOptions(), ['interactions', 'tooltip']);
    }
  }

  public layout() {}

  public update() {}

  /**
   * Shows tooltip
   * @param point
   */
  public showTooltip(point: Point) {
    const { view, tooltip } = this;
    const { coordinateBBox } = view;
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

    // @ts-ignore
    tooltip.update({
      ...cfg,
      items,
      title,
      ...location,
      crosshairsRegion: {
        start: coordinateBBox.tl,
        end: coordinateBBox.br,
      },
    });
    // @ts-ignore
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

    // show the tooltip markers
    const { showTooltipMarkers } = cfg;
    if (showTooltipMarkers) {
      this.renderTooltipMarkers();
    }
  }

  public hideTooltip() {
    const { view, tooltip } = this;

    // hide the tooltipMarkers
    const markerGroup = this.markerGroup;
    if (markerGroup) {
      markerGroup.hide();
    }

    // @ts-ignore
    tooltip.hide();

    view.emit('tooltip:hide', {
      tooltip: this.tooltip,
    });
  }

  /**
   * override 不做任何事情
   */
  public clear() {
    // do nothing
  }

  public destroy() {
    const { tooltip, markerGroup } = this;

    if (tooltip) {
      tooltip.destroy();
      this.tooltip = null;
    }

    if (markerGroup) {
      markerGroup.remove(true);
      this.markerGroup = null;
    }

    this.items = null;
    this.title = null;

    if (this.tooltipInteraction) {
      this.tooltipInteraction.destroy();
      this.tooltipInteraction = null;
    }
  }

  public changeVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    const { tooltip, markerGroup } = this;
    if (visible) {
      if (tooltip) {
        tooltip.show();
      }
      if (markerGroup) {
        markerGroup.show();
      }
    } else {
      if (tooltip) {
        tooltip.hide();
      }
      if (markerGroup) {
        markerGroup.hide();
      }
    }
    this.visible = visible;
  }

  private getTooltipCfg() {
    const view = this.view;
    const option = this.option;
    const theme = view.getTheme();
    const defaultCfg = get(theme, ['components', 'tooltip'], {});
    const tooltipCfg = deepMix({}, defaultCfg, option);

    // set `crosshairs`
    const coordinate = view.getCoordinate();
    if (tooltipCfg.showCrosshairs && !tooltipCfg.crosshairs && coordinate.isRect) {
      // 目前 Tooltip 辅助线只在直角坐标系下展示
      tooltipCfg.crosshairs = !!coordinate.isTransposed ? 'y' : 'x';
    }

    if (tooltipCfg.showCrosshairs === false) {
      tooltipCfg.crosshairs = null;
    }

    return tooltipCfg;
  }

  public getTooltipItems(point: Point) {
    let items = [];

    const geometries = this.view.geometries;
    const { shared, title } = this.getTooltipCfg();
    each(geometries, (geometry: Geometry) => {
      if (geometry.visible && geometry.tooltipOption !== false) {
        // geometry 可见同时未关闭 tooltip
        const dataArray = geometry.dataArray;
        if (shared !== false) {
          // 用户未配置 share: false
          each(dataArray, (data: MappingDatum[]) => {
            const record = findDataByPoint(point, data, geometry);
            if (record) {
              const tooltipItems = getTooltipItems(record, geometry, title);
              items = items.concat(tooltipItems);
            }
          });
        } else {
          const container = geometry.container;
          const shape = container.getShape(point.x, point.y);
          if (shape && shape.get('visible') && shape.get('origin')) {
            const mappingData = shape.get('origin').mappingData;
            if (isArray(mappingData)) {
              const record = findDataByPoint(point, mappingData, geometry);
              if (record) {
                items = items.concat(getTooltipItems(record, geometry, title));
              }
            } else {
              items = items.concat(getTooltipItems(mappingData, geometry, title));
            }
          }
        }
      }
    });

    items = uniq(items); // 去除重复值

    each(items, (item) => {
      const { x, y } = item.mappingData;
      item.x = isArray(x) ? x[x.length - 1] : x;
      item.y = isArray(y) ? y[y.length - 1] : y;
    });

    if (items.length) {
      const first = items[0];
      // bugfix: 由于点图的数据查找策略不同，所以有可能存在相同坐标点，查到的数据 x 字段不同的情况（即 title 不同）
      // 比如带点的折线图
      if (!items.every((item) => item.title === first.title)) {
        let nearestItem = first;
        let nearestDistance = Infinity;
        items.forEach((item) => {
          const distance = vec2.distance([point.x, point.y], [item.x, item.y]);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestItem = item;
          }
        });
        items = items.filter((item) => item.title === nearestItem.title);
      }
    }

    return items;
  }

  private getTitle(items) {
    const title = items[0].title || items[0].name;
    this.title = title;

    return title;
  }

  private renderTooltipMarkers() {
    const { view, items } = this;

    const cfg = this.getTooltipCfg();

    const foregroundGroup = view.foregroundGroup;
    let markerGroup = this.markerGroup;
    if (markerGroup && !markerGroup.destroyed) {
      markerGroup.clear();
      markerGroup.show();
    } else {
      markerGroup = foregroundGroup.addGroup({
        name: 'tooltipMarkersGroup',
      });
      this.markerGroup = markerGroup;
    }

    each(items, (item) => {
      const { x, y } = item;
      const attrs = {
        fill: item.color,
        symbol: 'circle',
        shadowColor: item.color,
        ...cfg.tooltipMarker,
        x,
        y,
      };

      markerGroup.addShape('marker', {
        attrs,
      });
    });
  }
}
