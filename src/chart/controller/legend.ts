import * as _ from '@antv/util';
import { ComponentType, DIRECTION, LAYER } from '../../constant';
import { Attribute } from '../../dependents';
import { Legend } from '../__components__';
import { ComponentOption, LegendOption } from '../interface';
import View from '../view';

/**
 * 从配置中获取单个字段的 legend 配置
 * @param legends
 * @param field
 */
function getLegendOption(legends: Record<string, LegendOption> | boolean, field: string) {
  if (_.isBoolean(legends)) {
    return legends === false ? false : {};
  } else {
    return _.get(legends, [field]);
  }
}

/**
 * 创建 legend 组件
 * @param legends
 * @param view
 */
export function createLegends(legends: Record<string, LegendOption> | boolean, view: View): ComponentOption[] {
  const legendArray: ComponentOption[] = [];

  const legendAttributes = view.getLegendAttributes();

  _.each(legendAttributes, (attr: Attribute) => {
    const scale = attr.getScale(attr.type);
    if (!scale) {
      // 如果在视觉通道上映射常量值则不会生成 scale，如 size(2) shape('circle')
      return;
    }
    const legendCfg = getLegendOption(legends, scale.field);

    // 如果配置中，用户没有关闭 legend，则添加组件
    if (legendCfg !== false) {
      const layer = LAYER.FORE;
      const container = view.getLayer(layer);
      legendArray.push({
        component: new Legend(container.addGroup(), [0, 0], { text: `legend ${scale.field}` }),
        layer,
        direction: DIRECTION.TOP,
        type: ComponentType.LEGEND,
      });
    }
  });

  return legendArray;
}
