import * as _ from '@antv/util';
import { ShapeInfo } from '../../../interface';

/**
 * 根据条件返回图形的 style 样式
 * @param cfg
 * @param isStroke 是否是描边 shape
 * @param sizeName shape 的size 对应的图形属性
 */
export function getStyle(cfg: ShapeInfo, isStroke: boolean, sizeName: string = '') {
  const { style, defaultStyle, color, size } = cfg;
  const attrs = {
    ...defaultStyle,
    ...style,
  };
  if (color) {
    if (isStroke) {
      if (!_.get(style, 'stroke')) {
        // 如果用户在 style() 中配置了 stroke，则以用户配置的为准
        attrs.stroke = color;
      }
    } else if (!_.get(style, 'fill')) {
      // 如果用户在 style() 中配置了 fill
      attrs.fill = color;
    }
  }
  if (sizeName && _.isNil(_.get(style, sizeName)) && size) {
    // 如果用户在 style() 中配置了 lineWidth 或者 r 属性
    attrs[sizeName] = size;
  }

  return attrs;
}
