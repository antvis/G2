import * as _ from '@antv/util';
import { Axis } from '../__components__';
import { ComponentType, DIRECTION, LAYER } from '../constant';
import { AxisCfg, ComponentOption } from '../interface';
import View from '../view';

/**
 * 创建 axis 组件
 * @param container
 * @param axes
 * @param view
 */
export function createAxes(container: any, axes: Record<string, AxisCfg>, view: View): ComponentOption[] {
  const axisArray: ComponentOption[] = [];

  _.each(axes, (axis: AxisCfg, field: string) => {
    axisArray.push({
      component: new Axis(container.addGroup(), [0, 0], { text: `axis ${field}` }),
      layer: LAYER.BG,
      direction: field === 'city' ? DIRECTION.BOTTOM : DIRECTION.LEFT,
      type: ComponentType.AXIS,
    });
  });

  return axisArray;
}
