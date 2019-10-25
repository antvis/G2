import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Scale } from '../../dependents';
import { Axis } from '../__components__';
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
    axisArray.push({
      component: new Axis(view.getLayer(layer).addGroup(), [0, 0], { text: `axis ${xScale.field}` }),
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
      axisArray.push({
        component: new Axis(view.getLayer(layer).addGroup(), [0, 0], { text: `axis ${yScale.field}` }),
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
