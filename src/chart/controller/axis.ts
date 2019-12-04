import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { CircleAxis, CircleGrid, IGroup, LineAxis, LineGrid, Scale } from '../../dependents';
import { getAxisFactorByRegion, getAxisRegion, getAxisThemeCfg, getCircleAxisCenterRadius } from '../../util/axis';
import { getCircleGridItems, getGridThemeCfg, getLineGridItems, showGrid } from '../../util/grid';
import { getName } from '../../util/scale';
import { AxisOption, ComponentOption } from '../interface';
import View from '../view';
import { Controller } from './base';

type Option = Record<string, AxisOption> | boolean;

/**
 * 从配置中获取单个字段的 axis 配置
 * @param axes
 * @param field
 * @returns the axis option of field
 */
function getAxisOption(axes: Record<string, AxisOption> | boolean, field: string) {
  if (_.isBoolean(axes)) {
    return axes === false ? false : {};
  } else {
    return _.get(axes, [field]);
  }
}

/**
 * G2 Axis controller, will:
 *  - create component
 *    - axis
 *    - grid
 *  - life circle
 */
export class Axis extends Controller<Option> {
  /** the draw group of axis */
  private container: IGroup;

  constructor(view: View) {
    super(view);

    this.container = this.view.getLayer(LAYER.BG).addGroup();
  }

  public init() {}

  public render() {
    this.option = this.view.getOptions().axes;

    const xs = this.createXAxes();
    const ys = this.createYAxes();
    this.components.push(...xs, ...ys);
  }

  /**
   * 更新组件布局，位置大小
   */
  public layout() {
    const coordinate = this.view.getCoordinate();

    _.each(this.components, (co: ComponentOption) => {
      const { component, direction, type, extra } = co;
      const { dim, scale } = extra;

      let updated;

      if (type === COMPONENT_TYPE.AXIS) {
        if (coordinate.isPolar) {
          if (dim === 'x') {
            updated = getCircleAxisCenterRadius(coordinate);
          } else if (dim === 'y') {
            updated = getAxisRegion(coordinate, direction);
          }
        } else {
          updated = getAxisRegion(coordinate, direction);
        }
      } else if (type === COMPONENT_TYPE.GRID) {
        if (coordinate.isPolar) {
          updated = { items: getCircleGridItems(coordinate, this.view.getXScale(), scale, dim) };
        } else {
          updated = { items: getLineGridItems(coordinate, scale, dim) };
        }
      }

      component.update(updated);
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

  /**
   * 创建 x axis 组件
   */
  private createXAxes(): ComponentOption[] {
    const axisArray: ComponentOption[] = [];
    // x axis
    const scale = this.view.getXScale();
    if (!scale) {
      return axisArray;
    }

    const xAxisOption = getAxisOption(this.option, scale.field);
    if (xAxisOption !== false) {
      const direction = DIRECTION.BOTTOM;
      const layer = LAYER.BG;
      const dim = 'x';

      const coordinate = this.view.getCoordinate();

      if (coordinate.isRect) {
        // axis
        const axis = {
          component: new LineAxis(this.getLineAxisCfg(scale, xAxisOption, direction)),
          layer,
          direction,
          type: COMPONENT_TYPE.AXIS,
          extra: { dim: 'x', scale },
        };
        axisArray.push(axis);

        // grid
        const cfg = this.getLineGridCfg(scale, xAxisOption, direction, dim);
        if (cfg) {
          const grid = {
            component: new LineGrid(cfg),
            layer,
            direction: DIRECTION.NONE,
            type: COMPONENT_TYPE.GRID,
            extra: { dim, scale },
          };
          axisArray.push(grid);
        }
      } else if (coordinate.isPolar) {
        const axis = {
          component: new CircleAxis(this.getCircleAxisCfg(scale, xAxisOption, direction)),
          layer,
          direction,
          type: COMPONENT_TYPE.AXIS,
          extra: { dim: 'x', scale },
        };
        axisArray.push(axis);

        // grid
        // @ts-ignore
        const cfg = this.getCircleGridCfg(scale, xAxisOption, 'radius', dim);
        if (cfg) {
          const grid = {
            // @ts-ignore
            component: new LineGrid(cfg),
            layer,
            direction: DIRECTION.NONE,
            type: COMPONENT_TYPE.GRID,
            extra: { dim: 'x', scale },
          };
          axisArray.push(grid);
        }
      } else {
        // helix and other, do not draw axis
      }
    }
    return axisArray;
  }

  /**
   * create y axis
   */
  private createYAxes(): ComponentOption[] {
    const axisArray: ComponentOption[] = [];

    // y axes
    const yScales = this.view.getYScales();

    _.each(yScales, (scale: Scale, idx: number) => {
      const yAxisOption = getAxisOption(this.option, scale.field);

      if (yAxisOption !== false) {
        const layer = LAYER.BG;
        const dim = 'y';

        const coordinate = this.view.getCoordinate();

        if (coordinate.isRect) {
          const direction = idx === 0 ? DIRECTION.LEFT : DIRECTION.RIGHT;
          // axis
          const axis = {
            component: new LineAxis(this.getLineAxisCfg(scale, yAxisOption, direction)),
            layer,
            direction,
            type: COMPONENT_TYPE.AXIS,
            extra: { dim, scale },
          };
          axisArray.push(axis);

          // grid
          const cfg = this.getLineGridCfg(scale, yAxisOption, direction, dim);
          if (cfg) {
            const grid = {
              component: new LineGrid(cfg),
              layer,
              direction: DIRECTION.NONE,
              type: COMPONENT_TYPE.GRID,
              extra: { dim, scale },
            };
            axisArray.push(grid);
          }
        } else if (coordinate.isPolar) {
          // axis
          const axis = {
            // @ts-ignore
            component: new LineAxis(this.getLineAxisCfg(scale, yAxisOption, 'radius')),
            layer,
            direction: DIRECTION.NONE,
            type: COMPONENT_TYPE.AXIS,
            extra: { dim: 'y', scale },
          };
          axisArray.push(axis);

          // grid
          // @ts-ignore
          const cfg = this.getCircleGridCfg(scale, yAxisOption, 'radius', dim);
          if (cfg) {
            const grid = {
              component: new CircleGrid(cfg),
              layer,
              direction: DIRECTION.NONE,
              type: COMPONENT_TYPE.GRID,
              extra: { dim: 'y', scale },
            };
            axisArray.push(grid);
          }
        } else {
          // nothing
        }
      }
    });

    return axisArray;
  }

  /**
   * generate line axis cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @return line axis cfg
   */
  private getLineAxisCfg(scale: Scale, axisOption: AxisOption, direction: DIRECTION): object {
    const container = this.container;

    const coordinate = this.view.getCoordinate();

    const region = getAxisRegion(coordinate, direction);

    const baseAxisCfg = {
      container,
      ...region,
      ticks: _.map(scale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
      title: {
        text: getName(scale),
      },
      verticalFactor: getAxisFactorByRegion(region, coordinate.getCenter()),
    };

    const axisThemeCfg = getAxisThemeCfg(this.view.getTheme(), direction);

    // the cfg order should be ensure
    return _.deepMix({}, baseAxisCfg, axisThemeCfg, axisOption);
  }

  /**
   * generate line grid cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @param dim
   * @return line grid cfg
   */
  private getLineGridCfg(scale: Scale, axisOption: AxisOption, direction: DIRECTION, dim: string): object {
    if (!showGrid(getAxisThemeCfg(this.view.getTheme(), direction), axisOption)) {
      return undefined;
    }

    const container = this.container;

    const baseGridCfg = {
      container,
      items: getLineGridItems(this.view.getCoordinate(), scale, dim),
    };

    const gridThemeCfg = getGridThemeCfg(this.view.getTheme(), direction);

    // the cfg order should be ensure
    return _.deepMix({}, baseGridCfg, gridThemeCfg, _.get(axisOption, 'grid', {}));
  }

  /**
   * generate circle axis cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @return circle axis cfg
   */
  private getCircleAxisCfg(scale: Scale, axisOption: AxisOption, direction: DIRECTION): object {
    const container = this.container;

    const baseAxisCfg = {
      container,
      ...getCircleAxisCenterRadius(this.view.getCoordinate()),
      ticks: _.map(scale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
      title: {
        text: getName(scale),
      },
      verticalFactor: 1,
    };

    const axisThemeCfg = getAxisThemeCfg(this.view.getTheme(), 'circle');

    // the cfg order should be ensure
    return _.deepMix({}, baseAxisCfg, axisThemeCfg, axisOption);
  }

  /**
   * generate circle grid cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @param dim
   * @return circle grid cfg
   */
  private getCircleGridCfg(scale: Scale, axisOption: AxisOption, direction: DIRECTION, dim: string): object {
    if (!showGrid(getAxisThemeCfg(this.view.getTheme(), direction), axisOption)) {
      return undefined;
    }

    const container = this.container;

    const baseGridCfg = {
      container,
      items: getCircleGridItems(this.view.getCoordinate(), this.view.getXScale(), scale, dim),
    };

    const gridThemeCfg = getGridThemeCfg(this.view.getTheme(), direction);

    // the cfg order should be ensure
    return _.deepMix({}, baseGridCfg, gridThemeCfg, _.get(axisOption, 'grid', {}));
  }
}
