import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Line as LineAxis, Scale } from '../../dependents';
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
    const layer = LAYER.BG;
    const component = new LineAxis({
      container: view.getLayer(layer).addGroup(),
      // 初始的位置大小方向，x 不同是水平方向的
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
      ticks: _.map(xScale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
      title: {
        text: `${xScale.field}`,
      },
    });

    component.render();

    axisArray.push({
      // @ts-ignore
      component,
      // component: new Axis(container, [0, 0], { text: `axis ${xScale.field}` }),
      layer,
      direction: DIRECTION.BOTTOM,
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

      const component = new LineAxis({
        container: view.getLayer(layer).addGroup(),
        // 初始的位置大小方向，y 不同是垂直方向的
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        ticks: _.map(yScale.getTicks(), (tick) => ({ name: tick.text, value: tick.value })),
        title: {
          text: `${yScale.field}`,
        },
      });

      component.render();

      axisArray.push({
        // @ts-ignore
        component,
        // component: new Axis(view.getLayer(layer).addGroup(), [0, 0], { text: `axis ${yScale.field}` }),
        layer,
        // 如果有两个，则是双轴图
        direction: idx === 0 ? DIRECTION.LEFT : DIRECTION.RIGHT,
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
