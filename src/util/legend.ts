import { DIRECTION } from '../constant';
import { Attribute, Scale } from '../dependents';

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
 * @param attr
 * @param marker
 * @returns legend items
 */
export function getLegendItems(attr: Attribute, marker: object): any[] {
  const scale = attr.getScale(attr.type);
  if (scale.isCategory) {
    return scale.values.map((v: string) => {
      // todo get the marker from attribute instance ( color shape )
      return { id: v, name: v, value: v, marker };
    });
  }
  return [];
}
