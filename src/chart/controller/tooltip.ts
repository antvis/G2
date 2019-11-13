import * as TOOLTIP_CLASSNAMES from '@antv/component/lib/tooltip/css-const';
import * as _ from '@antv/util';
import { HtmlTooltip, IGroup } from '../../dependents';
import Geometry from '../../geometry/base';
import { registerInteraction } from '../../interaction';
// 引入 Tooltip 交互行为
import TooltipInteraction from '../../interaction/tooltip';
import { Data, Point } from '../../interface';
import { findDataByPoint, getTooltipItems } from '../../util/tooltip';
import { TooltipOption } from '../interface';
import View from '../view';

// register Tooltip interaction
registerInteraction('showTooltip', TooltipInteraction);

// Filter duplicates, use `name`, `color`, `value` and `title` property values as condition
function uniq(items) {
  const uniqItems = [];
  _.each(items, (item) => {
    const result = _.find(uniqItems, (subItem) => {
      return (
        subItem.color === item.color &&
        subItem.name === item.name &&
        subItem.value === item.value &&
        subItem.title === item.value
      );
    });
    if (!result) {
      uniqItems.push(item);
    }
  });
  return uniqItems;
}

export default class Tooltip {
  public view: View;
  public cfg;
  public tooltip;

  private isVisible: boolean = true;
  private markerGroup: IGroup;
  private items;
  private title: string;
  private tooltipInteraction;

  constructor(view: View) {
    this.view = view;
  }

  public setCfg(cfg: TooltipOption) {
    if (cfg === false) {
      // 用户关闭 tooltip
      this.isVisible = false;
    }
    this.initCfg(cfg);
  }

  public render() {
    if (this.tooltip) {
      return;
    }

    const { view, cfg } = this;
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

    const tooltip = new HtmlTooltip({
      parent: canvas.get('el').parentNode,
      region,
      crosshairsRegion,
      ...cfg,
    });
    tooltip.hide();
    tooltip.render();

    this.tooltip = tooltip;

    if (this.isVisible && !this.tooltipInteraction) {
      // 用户开启 Tooltip
      view.interaction('showTooltip', {
        trigger: cfg.triggerOn,
        enterable: cfg.enterable,
        tooltip,
      });

      this.tooltipInteraction = _.get(view.getOptions(), ['interactions', 'showTooltip']);
    }
  }

  /**
   * Shows tooltip
   * @param point
   */
  public showTooltip(point: Point) {
    const { view, cfg, tooltip } = this;
    const { coordinateBBox } = view;
    const items = this.getItems(point);
    if (!items.length) {
      return;
    }
    const title = this.getTitle(items);
    const location = {
      x: items[0].x,
      y: items[0].y,
    }; // 定位到数据点
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
    if (!_.isEqual(lastTitle, title) || !_.isEqual(lastItems, items)) {
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

  public getTooltipItems(point: Point) {
    let rst = [];
    const geometries = this.view.geometries;
    for (const geometry of geometries) {
      const dataArray = geometry.dataArray;
      let items = [];
      _.each(dataArray, (data) => {
        const record = findDataByPoint(point, data, geometry);
        if (record) {
          const subItems = getTooltipItems(record, geometry);
          items = items.concat(subItems);
        }
      });
      rst = rst.concat(items);
    }

    return rst;
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

  private initCfg(cfg) {
    const view = this.view;
    const theme = view.getTheme();
    const defaultCfg = _.get(theme, ['components', 'tooltip'], {});
    let tooltipCfg = {
      ...defaultCfg,
    };

    if (_.isObject(cfg)) {
      tooltipCfg = {
        ...defaultCfg,
        ...cfg,
      };
    }
    // set `crosshairs`
    const coordinate = view.getCoordinate();
    if (tooltipCfg.showCrosshairs && !tooltipCfg.crosshairs && coordinate.isRect) {
      // 目前 Tooltip 辅助线只在直角坐标系下展示
      tooltipCfg.crosshairs = !!coordinate.isTransposed ? 'y' : 'x';
    }

    // set domStyles
    tooltipCfg.domStyles = {};
    _.each(TOOLTIP_CLASSNAMES, (classname) => {
      if (tooltipCfg[classname]) {
        tooltipCfg.domStyles[classname] = tooltipCfg[classname];
      }
    });

    this.cfg = tooltipCfg;
  }

  private getItems(point: Point) {
    const { view, cfg: tooltipCfg } = this;
    const geometries = view.geometries;
    if (!geometries.length) {
      return [];
    }

    let items = [];
    const shared = tooltipCfg.shared;
    _.each(geometries, (geometry: Geometry) => {
      if (geometry.visible && geometry.tooltipOption !== false) {
        // geometry 可见同时未关闭 tooltip
        const dataArray = geometry.dataArray;
        if (shared !== false) {
          // 用户未配置 share: false
          _.each(dataArray, (data: Data) => {
            const record = findDataByPoint(point, data, geometry);
            if (record) {
              const tooltipItems = getTooltipItems(record, geometry);
              items = items.concat(tooltipItems);
            }
          });
        } else {
          const container = geometry.container;
          const shape = container.getShape(point.x, point.y);
          if (shape && shape.get('visible') && shape.get('origin')) {
            const tooltipItems = getTooltipItems(shape.get('origin').origin, geometry);
            items = items.concat(tooltipItems);
          }
        }
      }
    });

    items = uniq(items); // 去除重复值

    const coordinate = view.getCoordinate();
    _.each(items, (item) => {
      let { x, y } = item.mappingData;
      x = _.isArray(x) ? x[x.length - 1] : x;
      y = _.isArray(y) ? y[y.length - 1] : y;
      const convertPoint = coordinate.applyMatrix(x, y, 1);
      item.x = convertPoint[0];
      item.y = convertPoint[1];
    });

    return items;
  }

  private getTitle(items) {
    const title = items[0].title || items[0].name;
    this.title = title;

    return title;
  }

  private renderTooltipMarkers() {
    const { view, cfg, items } = this;
    const foregroundGroup = view.foregroundGroup;
    let markerGroup = this.markerGroup;
    if (markerGroup) {
      markerGroup.clear();
      markerGroup.show();
    } else {
      markerGroup = foregroundGroup.addGroup({
        name: 'tooltipMarkersGroup',
      });
      this.markerGroup = markerGroup;
    }

    _.each(items, (item) => {
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
