import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Line as LineAxis, Scale } from '../../dependents';
import { getAxisFactor, getAxisRegion } from '../../util/axis';
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
 * get axis component cfg
 * @param view
 * @param option
 * @param baseAxisCfg
 * @param direction
 * @returns get the total axis cfg
 */
function getAxisCfg(view: View, option: AxisOption, baseAxisCfg: object, direction: DIRECTION): object {
  const axisTheme = _.get(view.getTheme(), ['components', 'axis', direction], {});

  return _.deepMix({}, axisTheme, baseAxisCfg, option);
}

/**
 * 创建 x axis 组件
 * @param axes axes 用户配置
 * @param view
 */
function createXAxes(axes: Record<string, AxisOption> | boolean, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];
  // x axis
  const xScale = view.getXScale();
  if (!xScale) {
    return axisArray;
  }

  const xAxisOption = getAxisOption(axes, xScale.field);

  if (xAxisOption !== false) {
    const direction = DIRECTION.BOTTOM;
    const layer = LAYER.BG;

    const axisCfg = {
      container: view.getLayer(layer).addGroup(),
      ...getAxisRegion(view.getCoordinate(), direction),
      ticks: _.map(xScale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
      title: {
        text: getName(xScale),
      },
      verticalFactor: getAxisFactor(direction),
    };

    const component = new LineAxis(getAxisCfg(view, xAxisOption, axisCfg, direction));

    component.render();

    axisArray.push({
      // @ts-ignore
      component,
      layer,
      direction,
      type: COMPONENT_TYPE.AXIS,
    });
  }

  return axisArray;
}

function createYAxes(axes: Record<string, AxisOption> | boolean, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];

  // y axes
  const yScales = view.getYScales();

  _.each(yScales, (yScale: Scale, idx: number) => {
    const yAxisOption = getAxisOption(axes, yScale.field);

    if (yAxisOption !== false) {
      const layer = LAYER.BG;
      const direction = idx === 0 ? DIRECTION.LEFT : DIRECTION.RIGHT;

      const axisCfg = {
        container: view.getLayer(layer).addGroup(),
        // 初始的位置大小方向，y 不同是垂直方向的
        ...getAxisRegion(view.getCoordinate(), direction),
        ticks: _.map(yScale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
        title: {
          text: getName(yScale),
        },
      };

      const component = new LineAxis(getAxisCfg(view, yAxisOption, axisCfg, direction));

      component.render();

      axisArray.push({
        // @ts-ignore
        component,
        layer,
        // 如果有两个，则是双轴图
        direction,
        type: COMPONENT_TYPE.AXIS,
      });
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
