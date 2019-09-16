import * as _ from '@antv/util';
import Component from '../../component';
import { AxisCfg } from '../interface';
import View from '../view';

/**
 * 创建 axis 组件
 * @param axes
 * @param view
 */
export function createAxes(axes: Record<string, AxisCfg>, view: View): Component[] {
  const axisArray: Component[] = [];

  _.each(axes, (axis: AxisCfg, field: string) => {});

  return axisArray;
}
