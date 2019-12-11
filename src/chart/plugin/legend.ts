import { deepMix, each, find, get, head, isBoolean, last, map, uniq } from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Attribute, CategoryLegend, ContinuousLegend, IGroup, Scale, Tick } from '../../dependents';
import Geometry from '../../geometry/base';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { getLegendItems, getLegendLayout } from '../../util/legend';
import { ComponentOption, LegendOption } from '../interface';
import View from '../view';
import { Plugin } from './base';

type Option = Record<string, LegendOption> | boolean;

/**
 * 从配置中获取单个字段的 legend 配置
 * @param legends
 * @param field
 * @returns the option of one legend field
 */
function getLegendOption(legends: Record<string, LegendOption> | boolean, field: string) {
  if (isBoolean(legends)) {
    return legends === false ? false : {};
  }

  return get(legends, [field], legends);
}

/**
 * legend Controller
 */
export default class Legend extends Plugin<Option> {
  /** the draw group of axis */
  private container: IGroup;

  constructor(view: View) {
    super(view);

    this.container = this.view.getLayer(LAYER.FORE).addGroup();
  }

  public get name(): string {
    return 'legend';
  }

  public init() {}

  /**
   * render the legend component by legend options
   */
  public render() {
    this.option = this.view.getOptions().legends;
    this.components.push(...this.createLegends());
  }

  /**
   * layout legend
   * 计算出 legend 的 direction 位置 x, y
   */
  public layout() {
    each(this.components, (co: ComponentOption) => {
      const { component, direction } = co;
      const bboxObject = component.getBBox();
      const bbox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

      const [x, y] = directionToPosition(this.view.viewBBox, bbox, direction);

      component.update({
        x,
        y,
      });
    });
  }

  public clear() {
    super.clear();

    this.container.clear();
  }

  public destroy() {
    super.destroy();

    this.container.remove(true);
  }

  private createLegends() {
    const legendArray: ComponentOption[] = [];

    const geometries = uniq(this.view.geometries);

    const legendMap: Record<string, any> = {};

    each(geometries, (geometry: Geometry) => {
      const attributes = geometry.getGroupAttributes();

      each(attributes, (attr: Attribute) => {
        const scale = attr.getScale(attr.type);
        // 如果在视觉通道上映射常量值，如 size(2) shape('circle') 不创建 legend
        if (!scale || scale.type === 'identity') {
          return;
        }

        const legendOption = getLegendOption(this.option, scale.field);

        // if the legend option is not false, means legend should be created.
        let legend;
        if (legendOption !== false && !legendMap[scale.field]) {
          if (scale.isLinear) {
            // linear field, create continuous legend
            legend = this.createContinuousLegend(geometry, attr, scale, legendOption);
          } else if (scale.isCategory) {
            // category field, create category legend
            legend = this.createCategoryLegend(geometry, attr, scale, legendOption);
          }
        }

        if (legend) {
          legendMap[scale.field] = legend;
          legendArray.push(legend);
        }
      });
    });

    return legendArray;
  }

  /**
   * create continuous legend(color, size)
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  private createContinuousLegend(
    geometry: Geometry,
    attr: Attribute,
    scale: Scale,
    legendOption: any
  ): ComponentOption {
    const ticks = scale.getTicks();

    const containMin = find(ticks, (tick: Tick) => tick.value === 0);
    const containMax = find(ticks, (tick: Tick) => tick.value === 1);
    const items = map(ticks, (tick: Tick) => {
      const { value, tickValue } = tick;
      const attrValue = attr.mapping(scale.invert(value)).join('');

      return {
        value: tickValue,
        attrValue,
        color: attrValue,
        scaleValue: value,
      };
    });

    if (!containMin) {
      items.push({
        value: scale.min,
        attrValue: attr.mapping(0).join(''),
        color: attr.mapping(0).join(''),
        scaleValue: 0,
      });
    }
    if (!containMax) {
      items.push({
        value: scale.max,
        attrValue: attr.mapping(1).join(''),
        color: attr.mapping(1).join(''),
        scaleValue: 1,
      });
    }

    // 排序
    items.sort((a: any, b: any) => a.value - b.value);

    // 跟 attr 相关的配置
    // size color 区别的配置
    let attrLegendCfg = {
      min: head(items).value,
      max: last(items).value,
      colors: [],
      rail: {
        type: attr.type,
      },
      track: {},
    };

    if (attr.type === 'size') {
      attrLegendCfg = {
        ...attrLegendCfg,
        track: {
          style: {
            // size 的选中前景色，对于 color，则直接使用 color 标识
            // @ts-ignore
            fill: attr.type === 'size' ? this.view.getTheme().defaultColor : undefined,
          },
        },
      };
    }

    if (attr.type === 'color') {
      attrLegendCfg = {
        ...attrLegendCfg,
        colors: map(items, (item) => item.attrValue),
      };
    }

    const layer = LAYER.FORE;
    const container = this.container;
    // if position is not set, use top as default
    const direction = get(legendOption, 'position', DIRECTION.BOTTOM);

    const layout = getLegendLayout(direction);

    // 基础配置，从当前数据中读到的配置
    const baseCfg = {
      container,
      layout,
      ...attrLegendCfg,
    };

    // @ts-ignore
    const cfg = this.getLegendCfg(baseCfg, legendOption, 'continuous');

    const component = new ContinuousLegend(cfg);

    return {
      component,
      layer,
      direction,
      type: COMPONENT_TYPE.LEGEND,
    };
  }

  /**
   * create a category legend
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   * @returns void
   */
  private createCategoryLegend(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: any): ComponentOption {
    const layer = LAYER.FORE;
    const container = this.container;
    // if position is not set, use top as default
    const direction = get(legendOption, 'position', DIRECTION.BOTTOM);

    // the default marker style
    const themeMarker = get(this.view.getTheme(), ['components', 'legend', direction, 'marker']);
    const userMarker = get(legendOption, 'marker');

    const baseCfg = {
      container,
      layout: getLegendLayout(direction),
      items: getLegendItems(this.view, geometry, attr, themeMarker, userMarker),
    };

    const component = new CategoryLegend(this.getLegendCfg(baseCfg, legendOption, direction));

    component.render();

    return {
      component,
      layer,
      direction,
      type: COMPONENT_TYPE.LEGEND,
    };
  }

  /**
   * get legend config, use option > suggestion > theme
   * @param baseCfg
   * @param legendOption
   * @param direction
   */
  private getLegendCfg(baseCfg: object, legendOption: LegendOption, direction: DIRECTION) {
    const themeObject = get(this.view.getTheme(), ['components', 'legend', direction], {});

    return deepMix({}, themeObject, baseCfg, legendOption);
  }
}
