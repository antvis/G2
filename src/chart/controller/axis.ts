import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { CircleAxis, IGroup, LineAxis, Scale } from '../../dependents';
import { getAxisFactor, getAxisRegion, getAxisThemeCfg, getCircleAxisCenterRadius } from '../../util/axis';
import { getName } from '../../util/scale';
import { AxisOption, ComponentOption } from '../interface';
import { Controller } from './base';

type Option = Record<string, AxisOption> | boolean;

/**
 * 从配置中获取单个字段的 axis 配置
 * @param axes
 * @param field
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
  public init() {}

  public render() {
    this.option = this.view.getOptions().axes;

    const x = this.createXAxis();
    const ys = this.createYAxes();
    if (x) {
      this.components.push(x);
    }

    this.components.push(...ys);
  }

  public layout() {}

  public destroy() {
    super.destroy();
  }

  /**
   * create component into which layer
   */
  protected getContainer(): IGroup {
    return this.view.getLayer(LAYER.FORE);
  }

  /**
   * 创建 x axis 组件
   */
  private createXAxis(): ComponentOption {
    // x axis
    const scale = this.view.getXScale();
    if (!scale) {
      return undefined;
    }

    const xAxisOption = getAxisOption(this.option, scale.field);
    if (xAxisOption !== false) {
      const direction = DIRECTION.BOTTOM;
      const layer = LAYER.BG;

      const coordinate = this.view.getCoordinate();

      let C;
      let cfg;

      if (coordinate.isRect) {
        C = LineAxis;
        cfg = this.getLineAxisCfg(scale, xAxisOption, direction, layer);
      } else if (coordinate.isPolar) {
        C = CircleAxis;
        cfg = this.getCircleAxisCfg(scale, xAxisOption, direction, layer);
      } else {
        // helix and other, do not draw axis
      }

      if (C) {
        const component = new C(cfg);
        component.render();

        return {
          component,
          layer,
          direction,
          type: COMPONENT_TYPE.AXIS,
        };
      }
    }
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
        const direction = idx === 0 ? DIRECTION.LEFT : DIRECTION.RIGHT;

        const coordinate = this.view.getCoordinate();

        let C;
        let cfg;

        if (coordinate.isRect) {
          C = LineAxis;
          cfg = this.getLineAxisCfg(scale, yAxisOption, direction, layer);
        } else if (coordinate.isPolar) {
          C = LineAxis;
          // @ts-ignore
          cfg = this.getLineAxisCfg(scale, yAxisOption, 'radius', layer);
        } else {
          // nothing
        }

        if (C) {
          const component = new C(cfg);
          component.render();

          axisArray.push({
            component,
            layer,
            direction,
            type: COMPONENT_TYPE.AXIS,
          });
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
   * @param layer
   * @return line axis cfg
   */
  private getLineAxisCfg(scale: Scale, axisOption: AxisOption, direction: DIRECTION, layer: LAYER): object {
    const container = this.view.getLayer(layer).addGroup();

    const coordinate = this.view.getCoordinate();

    const baseAxisCfg = {
      container,
      ...getAxisRegion(this.view.getCoordinate(), direction),
      ticks: _.map(scale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
      title: {
        text: getName(scale),
      },
      verticalFactor: getAxisFactor(coordinate, direction),
    };

    const axisThemeCfg = getAxisThemeCfg(this.view.getTheme(), direction);

    // the cfg order should be ensure
    return _.deepMix({}, baseAxisCfg, axisThemeCfg, axisOption);
  }

  /**
   * generate circle axis cfg
   * @param scale
   * @param axisOption
   * @param direction
   * @param layer
   * @return line axis cfg
   */
  private getCircleAxisCfg(scale: Scale, axisOption: AxisOption, direction: DIRECTION, layer: LAYER): object {
    const container = this.view.getLayer(layer).addGroup();

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
}
