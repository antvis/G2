import { deepMix, get, isBoolean } from '@antv/util';
import { DIRECTION } from '../constant';
import { Coordinate, Scale } from '../dependents';
import { AxisCfg, AxisOption, Point, Region } from '../interface';
import { getName } from './scale';
import { vec2 } from '@antv/matrix-util';

/**
 * @ignore
 * get axis relative region ( 0 ~ 1) by direction when coordinate is rect
 * @param direction
 * @returns axis coordinate region
 */
export function getLineAxisRelativeRegion(direction: DIRECTION): Region {
  let start;
  let end;

  switch (direction) {
    case DIRECTION.TOP:
      start = { x: 0, y: 1 };
      end = { x: 1, y: 1 };
      break;
    case DIRECTION.RIGHT:
      start = { x: 1, y: 0 };
      end = { x: 1, y: 1 };
      break;
    case DIRECTION.BOTTOM:
      start = { x: 0, y: 0 };
      end = { x: 1, y: 0 };
      break;
    case DIRECTION.LEFT:
      start = { x: 0, y: 0 };
      end = { x: 0, y: 1 };
      break;
    default:
      start = end = { x: 0, y: 0 };
  }

  return { start, end };
}

/**
 * @ignore
 * get axis relative region ( 0 ~ 1) by direction when coordinate is polar
 * @param coordinate
 * @returns axis coordinate region
 */
export function getCircleAxisRelativeRegion(coordinate: Coordinate) {
  let start;
  let end;
  if (coordinate.isTransposed) {
    start = {
      x: 0,
      y: 0,
    };
    end = {
      x: 1,
      y: 0,
    };
  } else {
    start = {
      x: 0,
      y: 0,
    };
    end = {
      x: 0,
      y: 1,
    };
  }

  return { start, end };
}

/**
 * @ignore
 * get the axis region from coordinate
 * @param coordinate
 * @param direction
 * @returns the axis region (start point, end point)
 */
export function getAxisRegion(coordinate: Coordinate, direction: DIRECTION): Region {
  let region = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
  if (coordinate.isRect) {
    region = getLineAxisRelativeRegion(direction);
  } else if (coordinate.isPolar) {
    region = getCircleAxisRelativeRegion(coordinate);
  }

  const { start, end } = region;
  return {
    start: coordinate.convert(start),
    end: coordinate.convert(end),
  };
}

/**
 * @ignore
 * get axis factor
 * @param coordinate
 * @param direction
 * @returns factor
 */
export function getAxisFactor(coordinate: Coordinate, direction: DIRECTION): number {
  // rect coordinate, by direction
  if (coordinate.isRect) {
    return coordinate.isTransposed
      ? [DIRECTION.RIGHT, DIRECTION.BOTTOM].includes(direction)
        ? 1
        : -1
      : [DIRECTION.BOTTOM, DIRECTION.RIGHT].includes(direction)
      ? -1
      : 1;
  }

  // polar y axis, by angle
  if (coordinate.isPolar) {
    const startAngle = coordinate.x.start;
    return startAngle < 0 ? -1 : 1;
  }

  return 1;
}

/**
 * @ignore
 * whether the axis isVertical
 * @param region
 * @returns isVertical
 */
export function isVertical(region: Region): boolean {
  const { start, end } = region;

  return start.x === end.x;
}

/**
 * @ignore
 * get factor by region (real position)
 * @param region
 * @param center
 * @returns factor
 */
export function getAxisFactorByRegion(region: Region, center: Point): number {
  const { start, end } = region;

  const isAxisVertical = isVertical(region);

  // 垂直
  if (isAxisVertical) {
    // 左方,从下到上、右方,从上到下
    if ((start.y - end.y) * (center.x - start.x) > 0) {
      return 1;
    } else {
      return -1;
    }
  } else {
    // 下方,从左到右、上方,从右到做
    if ((end.x - start.x) * (start.y - center.y) > 0) {
      return -1;
    } else {
      return 1;
    }
  }
}

/**
 * @ignore
 * get the axis cfg from theme, will mix the common cfg of legend theme
 *
 * @param theme view theme object
 * @param direction axis direction
 * @returns axis theme cfg
 */
export function getAxisThemeCfg(theme: object, direction: string): object {
  const axisTheme = get(theme, ['components', 'axis'], {});
  return deepMix({}, get(axisTheme, ['common'], {}), deepMix({}, get(axisTheme, [direction], {})));
}

/**
 * get the options of axis title，mix the cfg from theme, avoid common themeCfg not work
 * @param theme 
 * @param direction 
 * @param axisOptions 
 * @returns axis title options
 */
export function getAxisTitleOptions(theme: object, direction: string, axisOptions?: object): object {
  const axisTheme = get(theme, ['components', 'axis'], {});
  return deepMix({}, get(axisTheme, ['common', 'title'], {}), deepMix({}, get(axisTheme, [direction, 'title'], {})), axisOptions);
}

/**
 * @ignore
 * get circle axis center and radius
 * @param coordinate
 */
export function getCircleAxisCenterRadius(coordinate: Coordinate) {
  // @ts-ignore
  const { x, y, circleCenter: center } = coordinate;
  const isReflectY = y.start > y.end;
  const start = coordinate.isTransposed
    ? coordinate.convert({
        x: isReflectY ? 0 : 1,
        y: 0,
      })
    : coordinate.convert({
        x: 0,
        y: isReflectY ? 0 : 1,
      });

  const startVector: [number, number] = [start.x - center.x, start.y - center.y];
  const normalVector: [number, number] = [1, 0];
  const startAngle =
    start.y > center.y ? vec2.angle(startVector, normalVector) : vec2.angle(startVector, normalVector) * -1;
  const endAngle = startAngle + (x.end - x.start);
  const radius = Math.sqrt((start.x - center.x) ** 2 + (start.y - center.y) ** 2);

  return {
    center,
    radius,
    startAngle,
    endAngle,
  };
}

/**
 * @ignore
 * 从配置中获取单个字段的 axis 配置
 * @param axes
 * @param field
 * @returns the axis option of field
 */
export function getAxisOption(axes: Record<string, AxisOption> | boolean, field: string) {
  if (isBoolean(axes)) {
    return axes === false ? false : {};
  }
  return get(axes, [field]);
}

/**
 * @ignore
 * 如果配置了 position，则使用配置
 * @param axisOption
 * @param def
 */
export function getAxisDirection(axisOption: AxisOption, def: DIRECTION): DIRECTION {
  return get(axisOption, 'position', def);
}

/**
 * 获取 axis 的 title 文本
 * @param scale
 * @param axisOption
 */
export function getAxisTitleText(scale: Scale, axisOption: AxisCfg): string {
  return get(axisOption, ['title', 'text'], getName(scale));
}
