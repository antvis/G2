import * as _ from '@antv/util';
import { ComponentType, DIRECTION, LAYER } from '../../constant';
import { Scale } from '../../dependents';
import { Axis } from '../__components__';
import { AxisOption, ComponentOption } from '../interface';
import View from '../view';

function createXAxes(axes: Record<string, AxisOption>, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];
  // x axis
  const xScale = view.getXScale();
  if (!xScale) {
    return axisArray;
  }

  const xAxisOption = _.get(axes, [xScale.field]);
  if (xAxisOption !== false) {
    const layer = LAYER.BG;
    axisArray.push({
      component: new Axis(view.getLayer(layer).addGroup(), [0, 0], { text: `axis ${xScale.field}` }),
      layer,
      direction: DIRECTION.BOTTOM,
      type: ComponentType.AXIS,
    });
  }

  return axisArray;
}

function createYAxes(axes: Record<string, AxisOption>, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];

  // y axes
  const yScales = view.getYScales();

  _.each(yScales, (yScale: Scale, idx: number) => {
    const yAxisOption = _.get(axes, [yScale.field]);
    if (yAxisOption !== false) {
      const layer = LAYER.BG;
      axisArray.push({
        component: new Axis(view.getLayer(layer).addGroup(), [0, 0], { text: `axis ${yScale.field}` }),
        layer,
        // 如果有两个，则是双轴图
        direction: idx === 0 ? DIRECTION.LEFT : DIRECTION.RIGHT,
        type: ComponentType.AXIS,
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
export function createAxes(axes: Record<string, AxisOption>, view: View): ComponentOption[] {
  return [...createXAxes(axes, view), ...createYAxes(axes, view)];
}
