import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Circle as CircleAxis, Line as LineAxis, Scale } from '../../dependents';
import { getAxisFactor, getAxisRegion, getAxisThemeCfg, getCircleAxisCenterRadius } from '../../util/axis';
import { getName } from '../../util/scale';
import { AxisOption, ComponentOption } from '../interface';
import View from '../view';

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
 * generate line axis cfg
 * @param view
 * @param scale
 * @param axisOption
 * @param direction
 * @param layer
 * @return line axis cfg
 */
function getLineAxisCfg(view: View, scale: Scale, axisOption: AxisOption, direction: DIRECTION, layer: LAYER): object {
  const container = view.getLayer(layer).addGroup();

  const coordinate = view.getCoordinate();

  const baseAxisCfg = {
    container,
    ...getAxisRegion(view.getCoordinate(), direction),
    ticks: _.map(scale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
    title: {
      text: getName(scale),
    },
    verticalFactor: getAxisFactor(coordinate, direction),
  };

  const axisThemeCfg = getAxisThemeCfg(view.getTheme(), 'line', direction);

  // the cfg order should be ensure
  return _.deepMix({}, axisThemeCfg, baseAxisCfg, axisOption);
}

/**
 * generate circle axis cfg
 * @param view
 * @param scale
 * @param axisOption
 * @param direction
 * @param layer
 * @return line axis cfg
 */
function getCircleAxisCfg(
  view: View,
  scale: Scale,
  axisOption: AxisOption,
  direction: DIRECTION,
  layer: LAYER
): object {
  const container = view.getLayer(layer).addGroup();

  const coordinate = view.getCoordinate();

  const baseAxisCfg = {
    container,
    ...getCircleAxisCenterRadius(view.getCoordinate()),
    ticks: _.map(scale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
    title: {
      text: getName(scale),
    },
    verticalFactor: getAxisFactor(coordinate, direction),
  };

  const axisThemeCfg = getAxisThemeCfg(view.getTheme(), 'circle', direction);

  // the cfg order should be ensure
  return _.deepMix({}, axisThemeCfg, baseAxisCfg, axisOption);
}

/**
 * 创建 x axis 组件
 * @param axes axes 用户配置
 * @param view
 */
function createXAxes(axes: Record<string, AxisOption> | boolean, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];
  // x axis
  const scale = view.getXScale();
  if (!scale) {
    return axisArray;
  }

  const xAxisOption = getAxisOption(axes, scale.field);
  if (xAxisOption !== false) {
    const direction = DIRECTION.BOTTOM;
    const layer = LAYER.BG;

    const coordinate = view.getCoordinate();

    let C;
    let cfg;

    if (coordinate.isRect) {
      C = LineAxis;
      cfg = getLineAxisCfg(view, scale, xAxisOption, direction, layer);
    } else if (coordinate.isPolar) {
      C = CircleAxis;
      cfg = getCircleAxisCfg(view, scale, xAxisOption, direction, layer);
    } else {
      // helix and other, do not draw axis
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

  return axisArray;
}

/**
 * create y axis
 * @param axes
 * @param view
 */
function createYAxes(axes: Record<string, AxisOption> | boolean, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];

  // y axes
  const yScales = view.getYScales();

  _.each(yScales, (scale: Scale, idx: number) => {
    const yAxisOption = getAxisOption(axes, scale.field);

    if (yAxisOption !== false) {
      const layer = LAYER.BG;
      const direction = idx === 0 ? DIRECTION.LEFT : DIRECTION.RIGHT;

      const coordinate = view.getCoordinate();

      let C;
      let cfg;

      if (coordinate.isRect) {
        C = LineAxis;
        cfg = getLineAxisCfg(view, scale, yAxisOption, direction, layer);
      } else if (coordinate.isPolar) {
        // C = LineAxis;
        // cfg = getLineAxisCfg(view, scale, yAxisOption, direction, layer);
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
 * 创建 axis 组件
 * @param axes
 * @param view
 */
export function createAxes(axes: Record<string, AxisOption> | boolean, view: View): ComponentOption[] {
  return [...createXAxes(axes, view), ...createYAxes(axes, view)];
}
