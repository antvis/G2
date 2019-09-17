import * as _ from '@antv/util';
import { Legend } from '../__components__';
import { ComponentType, DIRECTION, LAYER } from '../constant';
import { AxisCfg, ComponentOption, LegendCfg } from '../interface';
import View from '../view';

/**
 * 创建 legend 组件
 * @param container
 * @param legends
 * @param view
 */

export function createLegends(container: any, legends: Record<string, LegendCfg>, view: View): ComponentOption[] {
  const legendArray: ComponentOption[] = [];

  _.each(legends, (legend: AxisCfg, field: string) => {
    legendArray.push({
      component: new Legend(container.addGroup(), [0, 0], { text: 'legend' }),
      layer: LAYER.FORE,
      direction: DIRECTION.TOP,
      type: ComponentType.LEGEND,
    });
  });

  return legendArray;
}
