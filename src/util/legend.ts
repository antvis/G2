import { deepMix, map, get, isString } from '@antv/util';
import { LegendItem } from '../chart/interface';
import View from '../chart/view';
import { DIRECTION } from '../constant';
import { Attribute, Tick } from '../dependents';
import Geometry from '../geometry/base';
import { getMappingValue } from './attr';
import { MarkerSymbols } from './marker';

/**
 * get the legend layout from direction
 * @param direction
 * @returns layout 'horizontal' | 'vertical'
 */
export function getLegendLayout(direction: DIRECTION): 'vertical' | 'horizontal' {
  return direction.startsWith(DIRECTION.LEFT) || direction.startsWith(DIRECTION.RIGHT) ? 'vertical' : 'horizontal';
}

/**
 * get the legend items
 * @param view
 * @param geometry
 * @param attr
 * @param themeMarker
 * @param userMarker
 * @returns legend items
 */
export function getLegendItems(
  view: View,
  geometry: Geometry,
  attr: Attribute,
  themeMarker: object,
  userMarker,
): any[] {
  const scale = attr.getScale(attr.type);
  if (scale.isCategory) {
    return map(scale.getTicks(), (tick: Tick): object => {
      const { text, value: scaleValue } = tick;
      const name = text;
      const value = scale.invert(scaleValue);

      // const checked = filterVals ? self._isFiltered(scale, filterVals, scaleValue) : true;

      const colorAttr = geometry.getAttribute('color');
      const shapeAttr = geometry.getAttribute('shape');

      // @ts-ignore
      const color = getMappingValue(colorAttr, value, view.getTheme().defaultColor);
      const shape = getMappingValue(shapeAttr, value, 'point');
      let marker = geometry.getShapeMarker(shape, {
        color,
        isInPolar: geometry.coordinate.isPolar,
      });
      // the marker configure order should be ensure
      marker = deepMix({}, themeMarker, marker, userMarker);

      const symbol = marker.symbol;
      if (isString(symbol) && MarkerSymbols[symbol]) {
        marker.symbol = MarkerSymbols[symbol];
      }

      return { id: value, name, value, marker };
    });
  }
  return [];
}

/**
 * custom legend 的 items 获取
 * @param themeMarker
 * @param userMarker
 * @param customItems
 */
export function getCustomLegendItems(themeMarker: object, userMarker: object, customItems: LegendItem[]) {
  // 如果有自定义的 item，那么就直接使用，并合并主题的 marker 配置
  return map(customItems, (item: LegendItem) => {
    const marker = deepMix({}, themeMarker, userMarker, item.marker);
    const symbol = marker.symbol;
    if (isString(symbol) && MarkerSymbols[symbol]) {
      marker.symbol = MarkerSymbols[symbol];
    }

    item.marker = marker;
    return item;
  });
}
