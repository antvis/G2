import { deepMix, each, find, get, head, isBoolean, last } from '@antv/util';
import { COMPONENT_MAX_VIEW_PERCENTAGE, COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Attribute, CategoryLegend, ContinuousLegend, GroupComponent, IGroup, Scale, Tick } from '../../dependents';
import { ComponentOption, LegendCfg, LegendOption, LooseObject, AllLegendsOptions, Padding } from '../../interface';
import { DEFAULT_ANIMATE_CFG } from '../../animate';
import Geometry from '../../geometry/base';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { omit } from '../../util/helper';
import { getCustomLegendItems, getLegendItems, getLegendLayout, getLegendThemeCfg } from '../../util/legend';
import { getName } from '../../util/scale';
import View from '../view';
import { Controller } from './base';

type DoEach = (geometry: Geometry, attr: Attribute, scale: Scale) => void;

/**
 * 从配置中获取单个字段的 legend 配置
 * @param legends
 * @param field
 * @returns the option of one legend field
 */
function getLegendOption(legends: AllLegendsOptions, field: string) {
  if (isBoolean(legends)) {
    return legends === false ? false : {};
  }

  return get(legends, [field], legends);
}

function getDirection(legendOption: any): DIRECTION {
  return get(legendOption, 'position', DIRECTION.BOTTOM);
}

/**
 * @ignore
 * legend Controller
 */
export default class Legend extends Controller<AllLegendsOptions> {
  /** the draw group of axis */
  private container: IGroup;
  /** 用于多个 legend 布局的 bbox */
  private layoutBBox: BBox;

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
    // 和 update 逻辑保持一致
    this.update();
  }

  /**
   * layout legend
   * 计算出 legend 的 direction 位置 x, y
   */
  public layout() {
    this.layoutBBox = this.view.viewBBox;

    each(this.components, (co: ComponentOption) => {
      const { component, direction } = co;
      const layout = getLegendLayout(direction);
      const maxSize = this.getCategoryLegendSizeCfg(layout);

      const maxWidth = component.get('maxWidth');
      const maxHeight = component.get('maxHeight');

      // 先更新 maxSize，更新 layoutBBox，以便计算正确的 x y
      component.update({
        maxWidth: Math.min(maxSize.maxWidth, maxWidth || 0),
        maxHeight: Math.min(maxSize.maxHeight, maxHeight || 0),
      });

      const padding = component.get('padding') as Padding;

      const bboxObject = component.getLayoutBBox(); // 这里只需要他的 width、height 信息做位置调整
      const bbox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height).expand(padding);

      const [x1, y1] = directionToPosition(this.view.viewBBox, bbox, direction);
      const [x2, y2] = directionToPosition(this.layoutBBox, bbox, direction);

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

      // 更新位置
      component.setLocation({ x: x + padding[3], y: y + padding[0] });

      this.layoutBBox = this.layoutBBox.cut(bbox, direction);
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
          if (get(legendOption, 'custom')) {
            cfg = this.getCategoryCfg(geometry, attr, scale, legendOption, true);
          } else {
            if (scale.isLinear) {
              // linear field, create continuous legend
              cfg = this.getContinuousCfg(geometry, attr, scale, legendOption);
            } else if (scale.isCategory) {
              // category field, create category legend
              cfg = this.getCategoryCfg(geometry, attr, scale, legendOption);
            }
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
        const legend = this.createFieldLegend(geometry, attr, scale);

        if (legend) {
          (legend.component as GroupComponent).init();
          this.components.push(legend);

          // 标记为新的
          updated[id] = true;
        }
      }
    };

    // 全局自定义图例
    if (get(this.option, 'custom')) {
      const id = 'global-custom';
      const existCo = this.getComponentById(id);
      if (existCo) {
        const customCfg = this.getCategoryCfg(undefined, undefined, undefined, this.option, true);
        omit(customCfg, ['container']);
        existCo.component.update(customCfg);

        updated[id] = true;
      } else {
        const component = this.createCustomLegend(undefined, undefined, undefined, this.option as LegendCfg);
        if (component) {
          component.init();

          const layer = LAYER.FORE;
          const direction = getDirection(this.option);

          this.components.push({
            id,
            component,
            layer,
            direction,
            type: COMPONENT_TYPE.LEGEND,
            extra: undefined,
          });

          // 标记为更新
          updated[id] = true;
        }
      }
    } else {
      // 遍历处理每一个创建逻辑
      this.loopLegends(eachLegend);
    }

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
   * 递归获取所有的 Geometry
   */
  private getGeometries(view: View): Geometry[] {
    let geometries = view.geometries;

    each(view.views, (v: View) => {
      geometries = geometries.concat(this.getGeometries(v));
    });

    return geometries;
  }

  /**
   * 遍历 Geometry，处理 legend 逻辑
   * @param doEach 每个 loop 中的处理方法
   */
  private loopLegends(doEach: DoEach) {
    const isRootView = this.view.getRootView() === this.view;
    // 非根 view，不处理 legend
    if (!isRootView) {
      return;
    }

    // 递归 view 中所有的 Geometry，进行创建 legend
    const geometries = this.getGeometries(this.view);

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
  private createFieldLegend(geometry: Geometry, attr: Attribute, scale: Scale): ComponentOption {
    let component;

    const legendOption = getLegendOption(this.option, scale.field);
    const layer = LAYER.FORE;
    const direction = getDirection(legendOption);

    // if the legend option is not false, means legend should be created.
    if (legendOption !== false) {
      if (get(legendOption, 'custom')) {
        component = this.createCustomLegend(geometry, attr, scale, legendOption);
      } else {
        if (scale.isLinear) {
          // linear field, create continuous legend
          component = this.createContinuousLegend(geometry, attr, scale, legendOption);
        } else if (scale.isCategory) {
          // category field, create category legend
          component = this.createCategoryLegend(geometry, attr, scale, legendOption);
        }
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
   * 自定义图例使用 category 图例去渲染
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  private createCustomLegend(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: LegendCfg) {
    // 直接使用 分类图例渲染
    const cfg = this.getCategoryCfg(geometry, attr, scale, legendOption, true);
    return new CategoryLegend(cfg);
  }

  /**
   * 创建连续图例
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  private createContinuousLegend(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: any) {
    const cfg = this.getContinuousCfg(geometry, attr, scale, legendOption);
    return new ContinuousLegend(cfg);
  }

  /**
   * 创建分类图例
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  private createCategoryLegend(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: any) {
    const cfg = this.getCategoryCfg(geometry, attr, scale, legendOption);
    return new CategoryLegend(cfg);
  }

  /**
   * 获得连续图例的配置
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  private getContinuousCfg(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: any) {
    const ticks = scale.getTicks();

    const containMin = find(ticks, (tick: Tick) => tick.value === 0);
    const containMax = find(ticks, (tick: Tick) => tick.value === 1);
    const items = ticks.map((tick: Tick) => {
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
        attrValue: attr.mapping(scale.invert(0)).join(''),
        color: attr.mapping(scale.invert(0)).join(''),
        scaleValue: 0,
      });
    }
    if (!containMax) {
      items.push({
        value: scale.max,
        attrValue: attr.mapping(scale.invert(1)).join(''),
        color: attr.mapping(scale.invert(1)).join(''),
        scaleValue: 1,
      });
    }

    // 排序
    items.sort((a: any, b: any) => a.value - b.value);

    // 跟 attr 相关的配置
    // size color 区别的配置
    const attrLegendCfg: LooseObject = {
      min: head(items).value,
      max: last(items).value,
      colors: [],
      rail: {
        type: attr.type,
      },
      track: {},
    };

    if (attr.type === 'size') {
      attrLegendCfg.track = {
        style: {
          // size 的选中前景色，对于 color，则直接使用 color 标识
          // @ts-ignore
          fill: attr.type === 'size' ? this.view.getTheme().defaultColor : undefined,
        },
      };
    }

    if (attr.type === 'color') {
      attrLegendCfg.colors = items.map((item) => item.attrValue);
    }

    const container = this.container;
    // if position is not set, use top as default
    const direction = getDirection(legendOption);

    const layout = getLegendLayout(direction);

    let title = get(legendOption, 'title');
    if (title) {
      title = deepMix(
        {
          text: getName(scale),
        },
        title
      );
    }

    // 基础配置，从当前数据中读到的配置
    attrLegendCfg.container = container;
    attrLegendCfg.layout = layout;
    attrLegendCfg.title = title;
    attrLegendCfg.animateOption = DEFAULT_ANIMATE_CFG;
    // @ts-ignore
    return this.mergeLegendCfg(attrLegendCfg, legendOption, 'continuous');
  }

  /**
   * 获取分类图例的配置项
   * @param geometry
   * @param attr
   * @param scale
   * @param custom
   * @param legendOption
   */
  private getCategoryCfg(geometry: Geometry, attr: Attribute, scale: Scale, legendOption: any, custom?: boolean) {
    const container = this.container;
    // if position is not set, use top as default
    const direction = get(legendOption, 'position', DIRECTION.BOTTOM);

    const legendTheme = getLegendThemeCfg(this.view.getTheme(), direction);

    // the default marker style
    const themeMarker = get(legendTheme, ['marker']);
    const userMarker = get(legendOption, 'marker');
    const layout = getLegendLayout(direction);
    const themePageNavigator = get(legendTheme, ['pageNavigator']);
    const userPageNavigator = get(legendOption, 'pageNavigator');

    const items = custom
      ? getCustomLegendItems(themeMarker, userMarker, legendOption.items)
      : getLegendItems(this.view, geometry, attr, themeMarker, userMarker);

    let title = get(legendOption, 'title');
    if (title) {
      title = deepMix(
        {
          text: scale ? getName(scale) : '',
        },
        title
      );
    }

    const baseCfg: LooseObject = this.getCategoryLegendSizeCfg(layout);
    baseCfg.container = container;
    baseCfg.layout = layout;
    baseCfg.items = items;
    baseCfg.title = title;
    baseCfg.animateOption = DEFAULT_ANIMATE_CFG;
    baseCfg.pageNavigator = deepMix({}, themePageNavigator, userPageNavigator);

    const categoryCfg = this.mergeLegendCfg(baseCfg, legendOption, direction);
    if (categoryCfg.reversed) {
      // 图例项需要逆序
      categoryCfg.items.reverse();
    }

    const maxItemWidth = get(categoryCfg, 'maxItemWidth');
    if (maxItemWidth && maxItemWidth <= 1) {
      // 转换成像素值
      categoryCfg.maxItemWidth = this.view.viewBBox.width * maxItemWidth;
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
    const position = direction.split('-')[0];
    const themeObject = getLegendThemeCfg(this.view.getTheme(), position);

    return deepMix({}, themeObject, baseCfg, legendOption);
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
    const { width: vw, height: vh } = this.view.viewBBox;
    // 目前 legend 的布局是以 viewBBox 为参照
    // const { width: cw, height: ch } = this.view.coordinateBBox;
    return layout === 'vertical'
      ? {
          maxWidth: vw * COMPONENT_MAX_VIEW_PERCENTAGE,
          maxHeight: vh,
        }
      : {
          maxWidth: vw,
          maxHeight: vh * COMPONENT_MAX_VIEW_PERCENTAGE,
        };
  }
}
