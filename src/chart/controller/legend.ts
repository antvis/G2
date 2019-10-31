import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Attribute, Category } from '../../dependents';
import { getLegendItems, getLegendLayout } from '../../util/legend';
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
 * get legend config, use option > suggestion > theme
 * @param view
 * @param baseCfg
 * @param legendOption
 * @param direction
 */
function getLegendCfg(view: View, baseCfg: object, legendOption: LegendOption, direction: DIRECTION) {
  const themeObject = _.get(view.getTheme(), ['components', 'legend', direction], {});

  return _.deepMix({}, themeObject, baseCfg, legendOption);
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
    const legendOption = getLegendOption(legends, scale.field);

    const layer = LAYER.FORE;
    const container = view.getLayer(layer);
    // if position is not set, use top as default
    const direction = _.get(legendOption, 'position', DIRECTION.TOP);

    // 如果配置中，用户没有关闭 legend，则添加组件
    if (legendOption !== false) {
      if (scale.isCategory) {
        const marker = _.get(
          legendOption,
          'marker',
          _.get(view.getTheme(), ['components', 'legend', direction, 'marker'])
        );

        const baseCfg = {
          container,
          layout: getLegendLayout(direction),
          items: getLegendItems(attr, marker),
        };

        const component = new Category(getLegendCfg(view, baseCfg, legendOption, direction));

        component.render();

        legendArray.push({
          // @ts-ignore
          component,
          layer,
          direction,
          type: COMPONENT_TYPE.LEGEND,
        });
      } else if (scale.isLinear) {
        // todo, when scale is linear, use continuous legend by the attribute instance.
      }
    }
  });

  return legendArray;
}
