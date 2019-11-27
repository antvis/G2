import * as _ from '@antv/util';
import View from '../chart/view';
import { DIRECTION } from '../constant';
import { Attribute, Scale, Tick } from '../dependents';
import Geometry from '../geometry/base';
import { getMappingValue } from './attr';

/**
 * get the legend layout from direction
 * @param direction
 * @returns layout 'horizontal' | 'vertical'
 */
export function getLegendLayout(direction: DIRECTION): string {
  return [DIRECTION.TOP, DIRECTION.BOTTOM].includes(direction) ? 'horizontal' : 'vertical';
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
  userMarker
): any[] {
  const scale = attr.getScale(attr.type);
  if (scale.isCategory) {
    return _.map(scale.getTicks(), (tick: Tick): object => {
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
      marker = _.deepMix({}, themeMarker, marker, userMarker);

      return { id: value, name, value, marker };
    });
  }
  return [];
}
