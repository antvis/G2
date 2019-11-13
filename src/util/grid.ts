import * as _ from '@antv/util';
import { DIRECTION } from '../constant';
import { Coordinate, Scale, Tick } from '../dependents';

/**
 * get the grid theme by type
 * @param theme
 * @param direction
 * @returns theme object
 */
export function getGridThemeCfg(theme: object, direction: DIRECTION): object {
  return _.get(theme, ['components', 'axis', direction, 'grid'], {});
}

/**
 * get axis grid items
 * @param coordinate
 * @param scale
 * @param dim
 * @return items
 */
export function getLineGridItems(coordinate: Coordinate, scale: Scale, dim: string) {
  return _.map(scale.getTicks(), (tick: Tick) => {
    const { value } = tick;
    return {
      points: [
        coordinate.convert(dim === 'y' ? { x: 0, y: value } : { x: value, y: 0 }),
        coordinate.convert(dim === 'y' ? { x: 1, y: value } : { x: value, y: 1 }),
      ],
    };
  });
}

/**
 * get
 * @param coordinate
 * @param xScale
 * @param yScale
 * @param dim
 * @returns items
 */
export function getCircleGridItems(coordinate: Coordinate, xScale: Scale, yScale: Scale, dim: string) {
  const count = xScale.values.length;

  // x
  if (dim === 'x') {
    return _.map(Array(count), (__: any, idx: number) => {
      return {
        points: [coordinate.convert({ x: 0, y: 0 }), coordinate.convert({ x: idx / count, y: 1 })],
      };
    });
  }

  // y
  if (dim === 'y') {
    return _.map(yScale.getTicks(), (tick: Tick) => {
      const { value } = tick;

      const points = _.map(Array(count), (__: any, idx: number) => {
        return coordinate.convert({
          x: idx / count,
          y: value,
        });
      });
      return { points };
    });
  }

  return [];
}

/**
 * show grid or not
 * @param axisTheme
 * @param axisOption
 */
export function showGrid(axisTheme: any, axisOption: any): boolean {
  const userGrid = _.get(axisOption, 'grid');
  if (userGrid === null) {
    return false;
  }

  const themeGrid = _.get(axisTheme, 'grid');

  return !(userGrid === undefined && themeGrid === null);
}
