import * as _ from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Attribute, Category, Scale, Tick } from '../../dependents';
import Geometry from '../../geometry/base';
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
 * TODO: create a continuous legend: color / size
 * when scale is linear, use continuous legend by the attribute instance.
 */
function createContinuousLegend(): ComponentOption {
  return undefined;
}

/**
 * create a category legend
 * @param view
 * @param geometry
 * @param attr
 * @param scale
 * @param legendOption
 * @returns void
 */
function createCategoryLegend(
  view: View,
  geometry: Geometry,
  attr: Attribute,
  scale: Scale,
  legendOption: any
): ComponentOption {
  const layer = LAYER.FORE;
  const container = view.getLayer(layer);
  // if position is not set, use top as default
  const direction = _.get(legendOption, 'position', DIRECTION.TOP);

  // the default marker style
  const themeMarker = _.get(view.getTheme(), ['components', 'legend', direction, 'marker']);
  const userMarker = _.get(legendOption, 'marker');

  const baseCfg = {
    container,
    layout: getLegendLayout(direction),
    items: getLegendItems(view, geometry, attr, themeMarker, userMarker),
  };

  const component = new Category(getLegendCfg(view, baseCfg, legendOption, direction));

  component.render();

  return {
    // @ts-ignore
    component,
    layer,
    direction,
    type: COMPONENT_TYPE.LEGEND,
  };
}

/**
 * 创建 legend 组件
 * @param legends
 * @param view
 */
export function createLegends(legends: Record<string, LegendOption> | boolean, view: View): ComponentOption[] {
  const legendArray: ComponentOption[] = [];

  const geometries = _.uniq(view.geometries);

  const legendMap: Record<string, any> = {};

  _.each(geometries, (geometry: Geometry) => {
    const attributes = geometry.getLegendAttributes();

    _.each(attributes, (attr: Attribute) => {
      const scale = attr.getScale(attr.type);
      // 如果在视觉通道上映射常量值则不会生成 scale，如 size(2) shape('circle')
      if (!scale) {
        return;
      }

      const legendOption = getLegendOption(legends, scale.field);

      // if the legend option is not false, means legend should be created.
      let legend;
      if (legendOption !== false && !legendMap[scale.field]) {
        if (scale.isLinear) {
          // linear field, create continuous legend
          legend = createContinuousLegend();
        } else if (scale.isCategory) {
          // category field, create category legend
          legend = createCategoryLegend(view, geometry, attr, scale, legendOption);
        }
      }

      if (legend) {
        legendMap[scale.field] = legend;
        legendArray.push(legend);
      }
    });
  });

  return legendArray;
}
