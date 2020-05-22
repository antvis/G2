import { DIRECTION } from '../constant';
import { Point } from '../dependents';
import { FacetTitle } from '../interface';

/**
 * @ignore
 * 获取 facet title 的最佳默认配置，防止
 */
export function getFactTitleConfig(direction: DIRECTION): FacetTitle {
  if ([DIRECTION.TOP, DIRECTION.BOTTOM].includes(direction)) {
    return {
      offsetX: 0,
      offsetY: direction === DIRECTION.TOP ? -8 : 8,
      style: {
        textAlign: 'center',
        textBaseline: direction === DIRECTION.TOP ? 'bottom' : 'top',
      },
    };
  }

  if ([DIRECTION.LEFT, DIRECTION.RIGHT].includes(direction)) {
    return {
      offsetX: direction === DIRECTION.LEFT ? -8 : 8,
      offsetY: 0,
      style: {
        textAlign: direction === DIRECTION.LEFT ? 'right' : 'left',
        textBaseline: 'middle',
        rotate: Math.PI / 2, // 文本阅读习惯从上往下
      },
    };
  }

  return {};
}

/**
 * @ignore
 * 根据角度，获取 ○ 上的点
 * @param center
 * @param r
 * @param angle
 */
export function getAnglePoint(center: Point, r: number, angle: number): Point {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
  };
}
