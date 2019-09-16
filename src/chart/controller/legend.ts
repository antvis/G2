import * as _ from '@antv/util';
import Component from '../../component';
import { LegendCfg } from '../interface';
import View from '../view';

/**
 * 创建 legend 组件
 * @param legends
 * @param view
 */
export function createLegends(legends: Record<string, LegendCfg>, view: View): Component[] {
  const legendArray: Component[] = [];

  _.each(legends, (legend: LegendCfg, field: string) => {});

  return legendArray;
}
