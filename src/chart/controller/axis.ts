import { deepMix, each, get, isUndefined } from '@antv/util';
import { DIRECTION, COMPONENT_TYPE, LAYER } from '../../constant';
import { CircleAxis, CircleGrid, IGroup, LineAxis, LineGrid, Scale } from '../../dependents';
import { AxisCfg, AxisOption, ComponentOption } from '../../interface';

import { DEFAULT_ANIMATE_CFG } from '../../animate/';

import {
  getAxisDirection,
  getAxisFactorByRegion,
  getAxisRegion,
  getAxisThemeCfg,
  getAxisTitleOptions,
  getAxisTitleText,
  getCircleAxisCenterRadius,
  isVertical,
} from '../../util/axis';
import { getAxisOption } from '../../util/axis';
import { getCircleGridItems, getGridThemeCfg, getLineGridItems, showGrid } from '../../util/grid';
import { omit } from '../../util/helper';
import View from '../view';
import { Controller } from './base';

type Option = Record<string, AxisOption> | boolean;

type Cache = Map<string, ComponentOption>;

// update 组件的时候，忽略的数据更新
const OMIT_CFG = ['container'];

// 坐标轴默认动画配置
const AXIS_DEFAULT_ANIMATE_CFG = {
  ...DEFAULT_ANIMATE_CFG,
  appear: null,
};

/**
 * @ignore
 * G2 Axis controller, will:
 *  - create component
 *    - axis
 *    - grid
 *  - life circle
 */
export default class Axis extends Controller<Option> {
  /** the draw group of axis */
  private axisContainer: IGroup;
  private axisForeContainer: IGroup;
  private gridContainer: IGroup;
  private gridForeContainer: IGroup;

  /** 使用 object 存储组件 */
  private cache: Cache = new Map<string, ComponentOption>();

  constructor(view: View) {
    super(view);

    // 先创建 gridContainer，将 grid 放到 axis 底层
    this.gridContainer = this.view.getLayer(LAYER.BG).addGroup();
    this.gridForeContainer = this.view.getLayer(LAYER.FORE).addGroup();
    this.axisContainer = this.view.getLayer(LAYER.BG).addGroup();
    this.axisForeContainer = this.view.getLayer(LAYER.FORE).addGroup();
  }

  public get name(): string {
    return 'axis';
  }

  public init() {}

  public render() {
    this.update();
  }

  /**
   * 更新组件布局，位置大小
   */
  public layout() {
    const coordinate = this.view.getCoordinate();

    each(this.getComponents(), (co: ComponentOption) => {
      const { component, direction, type, extra } = co;
      const { dim, scale, alignTick } = extra;

      let updated;

      if (type === COMPONENT_TYPE.AXIS) {
        if (coordinate.isPolar) {
          if (dim === 'x') {
            updated = coordinate.isTransposed
              ? getAxisRegion(coordinate, direction)
              : getCircleAxisCenterRadius(coordinate);
          } else if (dim === 'y') {
            updated = coordinate.isTransposed
              ? getCircleAxisCenterRadius(coordinate)
              : getAxisRegion(coordinate, direction);
          }
        } else {
          updated = getAxisRegion(coordinate, direction);
        }
      } else if (type === COMPONENT_TYPE.GRID) {
        if (coordinate.isPolar) {
          let items;
          if (coordinate.isTransposed) {
            items =
              dim === 'x'
                ? getCircleGridItems(coordinate, this.view.getYScales()[0], scale, alignTick, dim)
                : getLineGridItems(coordinate, scale, dim, alignTick);
          } else {
            items =
              dim === 'x'
                ? getLineGridItems(coordinate, scale, dim, alignTick)
                : getCircleGridItems(coordinate, this.view.getXScale(), scale, alignTick, dim);
          }
          updated = {
            items,
            // coordinate 更新之后，center 也变化了
            center: this.view.getCoordinate().getCenter(),
          };
        } else {
          updated = { items: getLineGridItems(coordinate, scale, dim, alignTick) };
        }
      }
      component.update(updated);
    });
  }

  /**
   * 更新 axis 组件
   */
  public update() {
    this.option = this.view.getOptions().axes;

    const updatedCache = new Map<string, ComponentOption>();

    this.updateXAxes(updatedCache);
    this.updateYAxes(updatedCache);

    // 处理完成之后，销毁删除的
    // 不在处理中的
    const newCache = new Map<string, ComponentOption>();

    this.cache.forEach((co: ComponentOption, key: string) => {
      if (updatedCache.has(key)) {
        newCache.set(key, co);
      } else {
        // 不存在，则是所有需要被销毁的组件
        co.component.destroy();
      }
    });

    // 更新缓存
    this.cache = newCache;
  }

  public clear() {
    super.clear();

    this.cache.clear();
    this.gridContainer.clear();
    this.gridForeContainer.clear();
    this.axisContainer.clear();
    this.axisForeContainer.clear();
  }

  public destroy() {
    super.destroy();

    this.gridContainer.remove(true);
    this.gridForeContainer.remove(true);
    this.axisContainer.remove(true);
    this.axisForeContainer.remove(true);
  }

  /**
   * @override
   */
  public getComponents(): ComponentOption[] {
    const co = [];

    this.cache.forEach((value: ComponentOption) => {
      co.push(value);
    });

    return co;
  }

  /**
   * 更新 x axis
   * @param updatedCache
   */
  private updateXAxes(updatedCache: Cache) {
    // x axis
    const scale = this.view.getXScale();

    if (!scale || scale.isIdentity) {
      return;
    }

    const xAxisOption = getAxisOption(this.option, scale.field);
    if (xAxisOption === false) {
      return;
    }

    const direction = getAxisDirection(xAxisOption, DIRECTION.BOTTOM);
    const layer = LAYER.BG;
    const dim = 'x';

    const coordinate = this.view.getCoordinate();

    const axisId = this.getId('axis', scale.field);
    const gridId = this.getId('grid', scale.field);

    if (coordinate.isRect) {
      // 1. do axis update
      let axis = this.cache.get(axisId);
      // 存在则更新
      if (axis) {
        const cfg = this.getLineAxisCfg(scale, xAxisOption, direction);
        omit(cfg, OMIT_CFG);
        axis.component.update(cfg);
        updatedCache.set(axisId, axis);
      } else {
        // 不存在，则创建
        axis = this.createLineAxis(scale, xAxisOption, layer, direction, dim);
        this.cache.set(axisId, axis);
        updatedCache.set(axisId, axis);
      }

      // 2. do grid update
      let grid = this.cache.get(gridId);
      // 存在则更新
      if (grid) {
        const cfg = this.getLineGridCfg(scale, xAxisOption, direction, dim);
        omit(cfg, OMIT_CFG);
        grid.component.update(cfg);
        updatedCache.set(gridId, grid);
      } else {
        // 不存在则创建
        grid = this.createLineGrid(scale, xAxisOption, layer, direction, dim);
        if (grid) {
          this.cache.set(gridId, grid);
          updatedCache.set(gridId, grid);
        }
      }
    } else if (coordinate.isPolar) {
      // 1. do axis update
      let axis = this.cache.get(axisId);
      // 存在则更新
      if (axis) {
        const cfg = coordinate.isTransposed
          ? this.getLineAxisCfg(scale, xAxisOption, DIRECTION.RADIUS)
          : this.getCircleAxisCfg(scale, xAxisOption, direction);

        omit(cfg, OMIT_CFG);
        axis.component.update(cfg);
        updatedCache.set(axisId, axis);
      } else {
        // 不存在，则创建
        if (coordinate.isTransposed) {
          if (isUndefined(xAxisOption)) {
            // 默认不渲染转置极坐标下的坐标轴
            return;
          } else {
            // 如果用户打开了隐藏的坐标轴 chart.axis(true)/chart.axis('x', true)
            // 那么对于转置了的极坐标，半径轴显示的是 x 轴对应的数据
            axis = this.createLineAxis(scale, xAxisOption, layer, DIRECTION.RADIUS, dim);
          }
        } else {
          axis = this.createCircleAxis(scale, xAxisOption, layer, direction, dim);
        }
        this.cache.set(axisId, axis);
        updatedCache.set(axisId, axis);
      }

      // 2. do grid update
      let grid = this.cache.get(gridId);
      // 存在则更新
      if (grid) {
        const cfg = coordinate.isTransposed
          ? this.getCircleGridCfg(scale, xAxisOption, DIRECTION.RADIUS, dim)
          : this.getLineGridCfg(scale, xAxisOption, DIRECTION.CIRCLE, dim);
        omit(cfg, OMIT_CFG);
        grid.component.update(cfg);
        updatedCache.set(gridId, grid);
      } else {
        // 不存在则创建
        if (coordinate.isTransposed) {
          if (isUndefined(xAxisOption)) {
            return;
          } else {
            grid = this.createCircleGrid(scale, xAxisOption, layer, DIRECTION.RADIUS, dim);
          }
        } else {
          // grid，极坐标下的 x 轴网格线沿着半径方向绘制
          grid = this.createLineGrid(scale, xAxisOption, layer, DIRECTION.CIRCLE, dim);
        }

        if (grid) {
          this.cache.set(gridId, grid);
          updatedCache.set(gridId, grid);
        }
      }
    } else {
      // helix and other, do not draw axis
    }
  }

  private updateYAxes(updatedCache: Cache) {
    // y axes
    const yScales = this.view.getYScales();

    each(yScales, (scale: Scale, idx: number) => {
      // @ts-ignore
      if (!scale || scale.isIdentity) {
        return;
      }
      const { field } = scale;
      const yAxisOption = getAxisOption(this.option, field);

      if (yAxisOption !== false) {
        const layer = LAYER.BG;
        const dim = 'y';
        const axisId = this.getId('axis', field);
        const gridId = this.getId('grid', field);

        const coordinate = this.view.getCoordinate();

        if (coordinate.isRect) {
          const direction = getAxisDirection(yAxisOption, idx === 0 ? DIRECTION.LEFT : DIRECTION.RIGHT);

          // 1. do axis update
          let axis = this.cache.get(axisId);
          // 存在则更新
          if (axis) {
            const cfg = this.getLineAxisCfg(scale, yAxisOption, direction);
            omit(cfg, OMIT_CFG);
            axis.component.update(cfg);
            updatedCache.set(axisId, axis);
          } else {
            // 不存在，则创建
            axis = this.createLineAxis(scale, yAxisOption, layer, direction, dim);
            this.cache.set(axisId, axis);
            updatedCache.set(axisId, axis);
          }

          // 2. do grid update
          let grid = this.cache.get(gridId);
          // 存在则更新
          if (grid) {
            const cfg = this.getLineGridCfg(scale, yAxisOption, direction, dim);
            omit(cfg, OMIT_CFG);
            grid.component.update(cfg);
            updatedCache.set(gridId, grid);
          } else {
            // 不存在则创建
            grid = this.createLineGrid(scale, yAxisOption, layer, direction, dim);
            if (grid) {
              this.cache.set(gridId, grid);
              updatedCache.set(gridId, grid);
            }
          }
        } else if (coordinate.isPolar) {
          // 1. do axis update
          let axis = this.cache.get(axisId);
          // 存在则更新
          if (axis) {
            const cfg = coordinate.isTransposed
              ? this.getCircleAxisCfg(scale, yAxisOption, DIRECTION.CIRCLE)
              : this.getLineAxisCfg(scale, yAxisOption, DIRECTION.RADIUS);

            // @ts-ignore
            omit(cfg, OMIT_CFG);
            axis.component.update(cfg);
            updatedCache.set(axisId, axis);
          } else {
            // 不存在，则创建
            if (coordinate.isTransposed) {
              if (isUndefined(yAxisOption)) {
                return;
              } else {
                axis = this.createCircleAxis(scale, yAxisOption, layer, DIRECTION.CIRCLE, dim);
              }
            } else {
              axis = this.createLineAxis(scale, yAxisOption, layer, DIRECTION.RADIUS, dim);
            }

            this.cache.set(axisId, axis);
            updatedCache.set(axisId, axis);
          }

          // 2. do grid update
          let grid = this.cache.get(gridId);
          // 存在则更新
          if (grid) {
            const cfg = coordinate.isTransposed
              ? this.getLineGridCfg(scale, yAxisOption, DIRECTION.CIRCLE, dim)
              : this.getCircleGridCfg(scale, yAxisOption, DIRECTION.RADIUS, dim);
            omit(cfg, OMIT_CFG);
            grid.component.update(cfg);
            updatedCache.set(gridId, grid);
          } else {
            // 不存在则创建
            if (coordinate.isTransposed) {
              if (isUndefined(yAxisOption)) {
                return;
              } else {
                grid = this.createLineGrid(scale, yAxisOption, layer, DIRECTION.CIRCLE, dim);
              }
            } else {
              grid = this.createCircleGrid(scale, yAxisOption, layer, DIRECTION.RADIUS, dim);
            }

            if (grid) {
              this.cache.set(gridId, grid);
              updatedCache.set(gridId, grid);
            }
          }
        } else {
          // helix and other, do not draw axis
        }
      }
    });
  }

  /**
   * 创建 line axis
   * @param scale
   * @param option
   * @param layer
   * @param direction
   * @param dim
   */
  private createLineAxis(
    scale: Scale,
    option: AxisCfg,
    layer: LAYER,
    direction: DIRECTION,
    dim: string
  ): ComponentOption {
    // axis
    const axis = {
      component: new LineAxis(this.getLineAxisCfg(scale, option, direction)),
      layer,
      direction: direction === DIRECTION.RADIUS ? DIRECTION.NONE : direction,
      type: COMPONENT_TYPE.AXIS,
      extra: { dim, scale },
    };
    axis.component.set('field', scale.field);
    axis.component.init();

    return axis;
  }

  private createLineGrid(
    scale: Scale,
    option: AxisCfg,
    layer: LAYER,
    direction: DIRECTION,
    dim: string
  ): ComponentOption {
    const cfg = this.getLineGridCfg(scale, option, direction, dim);
    if (cfg) {
      const grid = {
        component: new LineGrid(cfg),
        layer,
        direction: DIRECTION.NONE,
        type: COMPONENT_TYPE.GRID,
        extra: {
          dim,
          scale,
          alignTick: get(cfg, 'alignTick', true),
        },
      };
      grid.component.init();

      return grid;
    }
  }

  private createCircleAxis(
    scale: Scale,
    option: AxisCfg,
    layer: LAYER,
    direction: DIRECTION,
    dim: string
  ): ComponentOption {
    const axis = {
      component: new CircleAxis(this.getCircleAxisCfg(scale, option, direction)),
      layer,
      direction,
      type: COMPONENT_TYPE.AXIS,
      extra: { dim, scale },
    };
    axis.component.set('field', scale.field);

    axis.component.init();

    return axis;
  }

  private createCircleGrid(
    scale: Scale,
    option: AxisCfg,
    layer: LAYER,
    direction: DIRECTION,
    dim: string
  ): ComponentOption {
    const cfg = this.getCircleGridCfg(scale, option, direction, dim);
    if (cfg) {
      const grid = {
        component: new CircleGrid(cfg),
        layer,
        direction: DIRECTION.NONE,
        type: COMPONENT_TYPE.GRID,
        extra: {
          dim,
          scale,
          alignTick: get(cfg, 'alignTick', true),
        },
      };

      grid.component.init();
      return grid;
    }
  }

  /**
   * generate line axis cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @return line axis cfg
   */
  private getLineAxisCfg(scale: Scale, axisOption: AxisCfg, direction: DIRECTION) {
    const container = get(axisOption, ['top']) ? this.axisForeContainer : this.axisContainer;
    const coordinate = this.view.getCoordinate();
    const region = getAxisRegion(coordinate, direction);
    const titleText = getAxisTitleText(scale, axisOption);
    const axisThemeCfg = getAxisThemeCfg(this.view.getTheme(), direction);
    // the cfg order should be ensure
    const optionWithTitle = get(axisOption, ['title'])
      ? deepMix(
          { title: { style: { text: titleText } } },
          { title: getAxisTitleOptions(this.view.getTheme(), direction, axisOption.title) },
          axisOption
        )
      : axisOption;

    const cfg = deepMix(
      {
        container,
        ...region,
        ticks: scale.getTicks().map((tick) => ({ id: `${tick.tickValue}`, name: tick.text, value: tick.value })),
        verticalFactor: coordinate.isPolar
          ? getAxisFactorByRegion(region, coordinate.getCenter()) * -1
          : getAxisFactorByRegion(region, coordinate.getCenter()),
        theme: axisThemeCfg,
      },
      axisThemeCfg,
      optionWithTitle
    );
    const { animate, animateOption } = this.getAnimateCfg(cfg);
    cfg.animateOption = animateOption;
    cfg.animate = animate;

    // 计算 verticalLimitLength
    const isAxisVertical = isVertical(region);
    // TODO: 1 / 3 等默认值需要有一个全局的配置的地方
    const verticalLimitLength = get(cfg, 'verticalLimitLength', isAxisVertical ? 1 / 3 : 1 / 2);
    if (verticalLimitLength <= 1) {
      // 配置的相对值，相对于画布
      const canvasWidth = this.view.getCanvas().get('width');
      const canvasHeight = this.view.getCanvas().get('height');
      cfg.verticalLimitLength = verticalLimitLength * (isAxisVertical ? canvasWidth : canvasHeight);
    }

    return cfg;
  }

  /**
   * generate line grid cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @param dim
   * @return line grid cfg
   */
  private getLineGridCfg(scale: Scale, axisOption: AxisCfg, direction: DIRECTION, dim: string) {
    if (!showGrid(getAxisThemeCfg(this.view.getTheme(), direction), axisOption)) {
      return undefined;
    }
    const gridThemeCfg = getGridThemeCfg(this.view.getTheme(), direction);
    // the cfg order should be ensure
    // grid 动画以 axis 为准
    const gridCfg = deepMix(
      {
        container: get(axisOption, ['top']) ? this.gridForeContainer : this.gridContainer,
      },
      gridThemeCfg,
      get(axisOption, 'grid'),
      this.getAnimateCfg(axisOption)
    );
    gridCfg.items = getLineGridItems(this.view.getCoordinate(), scale, dim, get(gridCfg, 'alignTick', true));

    return gridCfg;
  }

  /**
   * generate circle axis cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @return circle axis cfg
   */
  private getCircleAxisCfg(scale: Scale, axisOption: AxisCfg, direction: DIRECTION) {
    const container = get(axisOption, ['top']) ? this.axisForeContainer : this.axisContainer;
    const coordinate = this.view.getCoordinate();

    const ticks = scale.getTicks().map((tick) => ({ id: `${tick.tickValue}`, name: tick.text, value: tick.value }));
    if (!scale.isCategory && Math.abs(coordinate.endAngle - coordinate.startAngle) === Math.PI * 2) {
      // x 轴对应的值如果是非 cat 类型，在整圆的情况下坐标轴第一个和最后一个文本会重叠，默认只展示第一个文本
      ticks.pop();
    }

    const titleText = getAxisTitleText(scale, axisOption);
    const axisThemeCfg = getAxisThemeCfg(this.view.getTheme(), DIRECTION.CIRCLE);
    // the cfg order should be ensure
    const optionWithTitle = get(axisOption, ['title'])
      ? deepMix(
          { title: { style: { text: titleText } } },
          { title: getAxisTitleOptions(this.view.getTheme(), direction, axisOption.title) },
          axisOption
        )
      : axisOption;
    const cfg = deepMix(
      {
        container,
        ...getCircleAxisCenterRadius(this.view.getCoordinate()),
        ticks,
        verticalFactor: 1,
        theme: axisThemeCfg,
      },
      axisThemeCfg,
      optionWithTitle
    );
    const { animate, animateOption } = this.getAnimateCfg(cfg);
    cfg.animate = animate;
    cfg.animateOption = animateOption;

    return cfg;
  }

  /**
   * generate circle grid cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @return circle grid cfg
   */
  private getCircleGridCfg(scale: Scale, axisOption: AxisCfg, direction: DIRECTION, dim: string) {
    if (!showGrid(getAxisThemeCfg(this.view.getTheme(), direction), axisOption)) {
      return undefined;
    }

    // the cfg order should be ensure
    // grid 动画以 axis 为准
    const gridThemeCfg = getGridThemeCfg(this.view.getTheme(), DIRECTION.RADIUS);
    const gridCfg = deepMix(
      {
        container: get(axisOption, ['top']) ? this.gridForeContainer : this.gridContainer,
        center: this.view.getCoordinate().getCenter(),
      },
      gridThemeCfg,
      get(axisOption, 'grid'),
      this.getAnimateCfg(axisOption)
    );
    const alignTick = get(gridCfg, 'alignTick', true);
    const verticalScale = dim === 'x' ? this.view.getYScales()[0] : this.view.getXScale();
    gridCfg.items = getCircleGridItems(this.view.getCoordinate(), verticalScale, scale, alignTick, dim);
    // the cfg order should be ensure
    // grid 动画以 axis 为准
    return gridCfg;
  }

  private getId(name: string, key: string): string {
    const coordinate = this.view.getCoordinate();
    // 坐标系类型也作为组件的 key
    return `${name}-${key}-${coordinate.type}`;
  }

  private getAnimateCfg(cfg) {
    return {
      animate: this.view.getOptions().animate && get(cfg, 'animate'), // 如果 view 关闭动画，则不执行动画
      animateOption:
        cfg && cfg.animateOption ? deepMix({}, AXIS_DEFAULT_ANIMATE_CFG, cfg.animateOption) : AXIS_DEFAULT_ANIMATE_CFG,
    };
  }
}
