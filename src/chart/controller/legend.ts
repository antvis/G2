import { deepMix, each, find, get, head, isBoolean, last, map, uniq } from '@antv/util';
import { DEFAULT_ANIMATE_CFG } from '../../animate';
import { COMPONENT_MAX_VIEW_PERCENTAGE, COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Attribute, CategoryLegend, ContinuousLegend, GroupComponent, IGroup, Scale, Tick } from '../../dependents';
import Geometry from '../../geometry/base';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { omit } from '../../util/helper';
import { getLegendItems, getLegendLayout } from '../../util/legend';
import { ComponentOption, LegendOption } from '../interface';
import View from '../view';
import { Controller } from './base';

type Option = Record<string, LegendOption> | boolean;

type DoEach = (geometry: Geometry, attr: Attribute, scale: Scale) => void;

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

function getDirection(legendOption: any): DIRECTION {
  return get(legendOption, 'position', DIRECTION.BOTTOM);
}

/**
 * legend Controller
 */
export default class Legend extends Controller<Option> {
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

    const doEachLegend = (geometry: Geometry, attr: Attribute, scale: Scale) => {
      const legend = this.createLegend(geometry, attr, scale);

      if (legend) {
        (legend.component as GroupComponent).render();
        this.components.push(legend);
      }
    };

    // 遍历处理每一个创建逻辑
    this.loopLegends(doEachLegend);
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

      const [x1, y1] = directionToPosition(this.view.coordinateBBox, bbox, direction);
      const [x2, y2] = directionToPosition(this.view.viewBBox, bbox, direction);

      let x = 0;
      let y = 0;

      // 因为 legend x y 要和 coordinateBBox 对齐，所以要做一个简单的判断
      if (direction.startsWith('top') || direction.startsWith('bottom')) {
        x = x1;
        y = y2;
      } else {
        x = x2;
        y = y1;
      }

      component.update({
        x,
        y,
      });
    });
  }

  /**
   * legend 的更新逻辑
   */
  public update() {
    this.option = this.view.getOptions().legends;

    // 已经处理过的 legend
    const updated: Record<string, true> = {};

    const eachLegend = (geometry: Geometry, attr: Attribute, scale: Scale) => {
      const id = this.getId(scale.field);

      const existCo = this.getComponentById(id);

      // 存在则 update
      if (existCo) {
        let cfg;
        const legendOption = getLegendOption(this.option, scale.field);

        // if the legend option is not false, means legend should be created.
        if (legendOption !== false) {
          if (scale.isLinear) {
            // linear field, create continuous legend
            cfg = this.getContinuousCfg(geometry, attr, scale, legendOption);
          } else if (scale.isCategory) {
            // category field, create category legend
            cfg = this.getCategoryCfg(geometry, attr, scale, legendOption);
          }
        }

        // 如果 cfg 为空，则不在 updated 标记，那么会在后面逻辑中删除
        if (cfg) {
          // omit 掉一些属性，比如 container 等
          omit(cfg, ['container']);

          existCo.direction = getDirection(legendOption);

          existCo.component.update(cfg);

          // 标记为新的
          updated[id] = true;
        }
      } else {
        // 不存在则 create
        const legend = this.createLegend(geometry, attr, scale);

        if (legend) {
          (legend.component as GroupComponent).render();
          this.components.push(legend);

          // 标记为新的
          updated[id] = true;
        }
      }
    };

    this.loopLegends(eachLegend);

    // 处理完成之后，销毁删除的
    // 不在处理中的
    const components = [];
    each(this.getComponents(), (co: ComponentOption) => {
      if (updated[co.id]) {
        components.push(co);
      } else {
        co.component.destroy();
      }
    });

    // 更新当前已有的 components
    this.components = components;
  }

  public clear() {
    super.clear();

    this.container.clear();
  }

  public destroy() {
    super.destroy();

    this.container.remove(true);
  }

  /**
   * 遍历 Geometry，处理 legend 逻辑
   * @param doEach 每个 loop 中的处理方法
   */
  private loopLegends(doEach: DoEach) {
    const geometries = uniq(this.view.geometries);
    const looped: Record<string, true> = {}; // 防止一个字段创建两个 legend

    each(geometries, (geometry: Geometry) => {
      const attributes = geometry.getGroupAttributes();

      each(attributes, (attr: Attribute) => {
        const scale = attr.getScale(attr.type);
        // 如果在视觉通道上映射常量值，如 size(2) shape('circle') 不创建 legend
        if (!scale || scale.type === 'identity' || looped[scale.field]) {
          return;
        }

        doEach(geometry, attr, scale);

        looped[scale.field] = true;
      });
    });
  }

  /**
   * 创建一个 legend
   * @param geometry
   * @param attr
   * @param scale
   */
  private createLegend(geometry: Geometry, attr: Attribute, scale: Scale): ComponentOption {
    let component;

    const legendOption = getLegendOption(this.option, scale.field);
    const layer = LAYER.FORE;
    const direction = getDirection(legendOption);

    // if the legend option is not false, means legend should be created.
    if (legendOption !== false) {
      if (scale.isLinear) {
        // linear field, create continuous legend
        const cfg = this.getContinuousCfg(geometry, attr, scale, legendOption);
        component = new ContinuousLegend(cfg);
      } else if (scale.isCategory) {
        // category field, create category legend
        const cfg = this.getCategoryCfg(geometry, attr, scale, legendOption);
        component = new CategoryLegend(cfg);
      }
    }

    if (component) {
      component.set('field', scale.field);

      return {
        id: this.getId(scale.field),
        component,
        layer,
        direction,
        type: COMPONENT_TYPE.LEGEND,
        extra: { scale },
      };
    }
  }

  /**
   * 获得连续图例的配置
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  private getContinuousCfg(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: any): object {
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

    const container = this.container;
    // if position is not set, use top as default
    const direction = getDirection(legendOption);

    const layout = getLegendLayout(direction);

    // 基础配置，从当前数据中读到的配置
    const baseCfg = {
      container,
      layout,
      ...attrLegendCfg,
    };

    // @ts-ignore
    return this.mergeLegendCfg(baseCfg, legendOption, 'continuous');
  }

  /**
   * 获取分类图例的配置项
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  private getCategoryCfg(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: any): object {
    const container = this.container;
    // if position is not set, use top as default
    const direction = get(legendOption, 'position', DIRECTION.BOTTOM);

    // the default marker style
    const themeMarker = get(this.view.getTheme(), ['components', 'legend', direction, 'marker']);
    const userMarker = get(legendOption, 'marker');
    const layout = getLegendLayout(direction);

    const baseCfg = {
      container,
      layout,
      items: getLegendItems(this.view, geometry, attr, themeMarker, userMarker),
      ...this.getCategoryLegendSizeCfg(layout),
    };

    const categoryCfg = this.mergeLegendCfg(baseCfg, legendOption, direction);
    if (categoryCfg.reversed) {
      // 图例项需要逆序
      categoryCfg.items.reverse();
    }

    return categoryCfg;
  }

  /**
   * get legend config, use option > suggestion > theme
   * @param baseCfg
   * @param legendOption
   * @param direction
   */
  private mergeLegendCfg(baseCfg: object, legendOption: LegendOption, direction: DIRECTION) {
    const themeObject = get(this.view.getTheme(), ['components', 'legend', direction], {});

    return deepMix({}, themeObject, baseCfg, legendOption, {
      animateOption: DEFAULT_ANIMATE_CFG,
    });
  }

  /**
   * 生成 id
   * @param key
   */
  private getId(key: string): string {
    return `${this.name}-${key}`;
  }

  /**
   * 根据 id 来获取组件
   * @param id
   */
  private getComponentById(id: string): ComponentOption {
    return find(this.components, (co) => co.id === id);
  }

  private getCategoryLegendSizeCfg(layout: 'horizontal' | 'vertical') {
    const { width, height } = this.view.viewBBox;
    return layout === 'vertical'
      ? {
          maxWidth: width * COMPONENT_MAX_VIEW_PERCENTAGE,
          maxHeight: height,
        }
      : {
          maxWidth: width,
          maxHeight: height * COMPONENT_MAX_VIEW_PERCENTAGE,
        };
  }
}
