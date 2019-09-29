import * as _ from '@antv/util';
import { ComponentType, DIRECTION, LAYER } from '../../constant';
import { Scale } from '../../dependents';
import { Axis } from '../__components__';
import { AxisCfg, ComponentOption } from '../interface';
import View from '../view';

function createXAxes(container: any, axes: Record<string, AxisCfg>, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];
  // x axis
  const xScale = view.getXScale();
  if (!xScale) {
    return axisArray;
  }

  const xAxisCfg = _.get(axes, [xScale.field]);
  if (xAxisCfg !== false) {
    axisArray.push({
      component: new Axis(container.addGroup(), [0, 0], { text: `axis ${xScale.field}` }),
      layer: LAYER.BG,
      direction: DIRECTION.BOTTOM,
      type: ComponentType.AXIS,
    });
  }

  return axisArray;
}

function createYAxes(container: any, axes: Record<string, AxisCfg>, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];

  // y axes
  const yScales = view.getYScales();

  _.each(yScales, (yScale: Scale, idx: number) => {
    const yAxisCfg = _.get(axes, [yScale.field]);
    if (yAxisCfg !== false) {
      axisArray.push({
        component: new Axis(container.addGroup(), [0, 0], { text: `axis ${yScale.field}` }),
        layer: LAYER.BG,
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
 * @param container
 * @param axes
 * @param view
 */
export function createAxes(container: any, axes: Record<string, AxisCfg>, view: View): ComponentOption[] {
  return [...createXAxes(container, axes, view), ...createYAxes(container, axes, view)];
}
