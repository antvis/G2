import * as _ from '@antv/util';
import { Coordinate, Shape } from '../../dependents';
import { getSectorPath } from '../../util/graphics';

/**
 * 获取同坐标系范围相同的剪切区域
 * @param coordinate
 * @returns
 */
export function getCoordinateClipCfg(coordinate: Coordinate) {
  const { start, end } = coordinate;
  const width = coordinate.getWidth();
  const height = coordinate.getHeight();
  const margin = 20;
  let clip;

  if (coordinate.isPolar) {
    const { startAngle, endAngle } = coordinate;
    const center = coordinate.getCenter();
    // @ts-ignore 需要 coordinate 基类上支持
    const radius = coordinate.getRadius();
    // @ts-ignore 待 G 4.0 支持
    // 初始状态
    clip = new Shape.Path({
      isClipShape: true,
      attrs: {
        path: getSectorPath(center.x, center.y, radius + margin, startAngle, startAngle),
      },
    });

    return {
      type: 'path',
      attrs: {
        path: getSectorPath(center.x, center.y, radius + margin, startAngle, startAngle),
      },
      endState: (ratio) => {
        const diff = (endAngle - startAngle) * ratio + startAngle;
        const path = getSectorPath(center.x, center.y, radius + margin, startAngle, diff);
        return {
          path,
        };
      },
    };
  }

  let endState;
  if (coordinate.isTransposed) {
    endState = {
      height: height + margin * 2,
    };
  } else {
    endState = {
      width: width + margin * 2,
    };
  }

  return {
    type: 'rect',
    attrs: {
      x: start.x - margin,
      y: end.y - margin,
      width: coordinate.isTransposed ? width + margin * 2 : 0,
      height: coordinate.isTransposed ? 0 : height + margin * 2,
    },
    endState,
  };
}
