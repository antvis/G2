import { getArcParams } from '@antv/g-canvas';
import { isNumberEqual, isEqual, isFunction } from '@antv/util';

import { IShape, PathCommand } from '../../dependents';
import { GAnimateCfg } from '../../interface';
import { AnimateExtraCfg } from '../interface';

import { getArcPath, getSectorPath } from '../../util/graphics';

function getAngle(startPoint: number[], arcPath: PathCommand) {
  let { startAngle, endAngle } = getArcParams(startPoint, arcPath);

  if (!isNumberEqual(startAngle, -Math.PI * 0.5) && startAngle < -Math.PI * 0.5) {
    startAngle += Math.PI * 2;
  }
  if (!isNumberEqual(endAngle, -Math.PI * 0.5) && endAngle < -Math.PI * 0.5) {
    endAngle += Math.PI * 2;
  }

  if (arcPath[5] === 0) {
    // 逆时针，需要将 startAngle 和 endAngle 转置，因为 G2 极坐标系为顺时针方向
    [startAngle, endAngle] = [endAngle, startAngle];
  }

  if (isNumberEqual(startAngle, Math.PI * 1.5)) {
    startAngle = Math.PI * -0.5;
  }

  // 当 startAngle, endAngle 接近相等时，不进行 endAngle = Math.PI * 1.5 防止变化从整个圆开始
  if (isNumberEqual(endAngle, Math.PI * -0.5) && !isNumberEqual(startAngle, endAngle)) {
    endAngle = Math.PI * 1.5;
  }

  return {
    startAngle,
    endAngle,
  };
}

function getArcStartPoint(path: PathCommand) {
  let startPoint;
  if (path[0] === 'M' || path[0] === 'L') {
    startPoint = [path[1], path[2]];
  } else if (path[0] === 'a' || path[0] === 'A' || path[0] === 'C') {
    startPoint = [path[path.length - 2], path[path.length - 1]];
  }

  return startPoint;
}

/**
 * path 存在以下情况
 * 1. 饼图不为整圆的 path，命令为 M, L, A, L, Z
 * 2. 饼图为整圆的 path，命令为 M, M, A, A, M, Z
 * 3. 环图不为整圆的 path，命令为 M, A, L, A, L, Z
 * 4. 环图为整圆的 path，命令为 M, A, A, M, A, A, M, Z
 * 5. radial-line, 不为整圆时的 path, 命令为 M, A, A, Z
 * 6. radial-line, 为整圆时的 path，命令为 M, A, A, A, A, Z
 * @param path theta 坐标系下圆弧的 path 命令
 */
export function getArcInfo(path: PathCommand[]) {
  let startAngle;
  let endAngle;

  const arcPaths = path.filter((command) => {
    return command[0] === 'A' || command[0] === 'a';
  });

  if (arcPaths.length === 0) {
    return {
      startAngle: 0,
      endAngle: 0,
      radius: 0,
      innerRadius: 0,
    };
  }

  const firstArcPathCommand = arcPaths[0];
  const lastArcPathCommand = arcPaths.length > 1 ? arcPaths[1] : arcPaths[0];
  const firstIndex = path.indexOf(firstArcPathCommand);
  const lastIndex = path.indexOf(lastArcPathCommand);
  const firstStartPoint = getArcStartPoint(path[firstIndex - 1]);
  const lastStartPoint = getArcStartPoint(path[lastIndex - 1]);

  const { startAngle: firstStartAngle, endAngle: firstEndAngle } = getAngle(firstStartPoint, firstArcPathCommand);
  const { startAngle: lastStartAngle, endAngle: lastEndAngle } = getAngle(lastStartPoint, lastArcPathCommand);

  if (isNumberEqual(firstStartAngle, lastStartAngle) && isNumberEqual(firstEndAngle, lastEndAngle)) {
    startAngle = firstStartAngle;
    endAngle = firstEndAngle;
  } else {
    startAngle = Math.min(firstStartAngle, lastStartAngle);
    endAngle = Math.max(firstEndAngle, lastEndAngle);
  }

  let radius = firstArcPathCommand[1];
  let innerRadius = arcPaths[arcPaths.length - 1][1];
  if (radius < innerRadius) {
    [radius, innerRadius] = [innerRadius, radius];
  } else if (radius === innerRadius) {
    innerRadius = 0;
  }

  return {
    startAngle,
    endAngle,
    radius,
    innerRadius,
  };
}

/**
 * @ignore
 * 饼图更新动画
 * @param shape 文本图形
 * @param animateCfg
 * @param cfg
 */
export function sectorPathUpdate(shape: IShape, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  const { toAttrs, coordinate } = cfg;
  const path = (toAttrs as { path: PathCommand[] }).path || [];
  const pathCommands = path.map((command) => command[0]);

  if (path.length < 1) return;

  const { startAngle: curStartAngle, endAngle: curEndAngle, radius, innerRadius } = getArcInfo(path);
  const { startAngle: preStartAngle, endAngle: preEndAngle } = getArcInfo(shape.attr('path'));

  const center = coordinate.getCenter();
  const diffStartAngle = curStartAngle - preStartAngle;
  const diffEndAngle = curEndAngle - preEndAngle;
  // 没有 diff 时直接返回最终 attrs，不需要额外动画
  if (diffStartAngle === 0 && diffEndAngle === 0) {
    shape.attr(toAttrs);
    return;
  }

  shape.animate(
    (ratio) => {
      const onFrameStartAngle = preStartAngle + ratio * diffStartAngle;
      const onFrameEndAngle = preEndAngle + ratio * diffEndAngle;
      return {
        ...toAttrs,
        path:
          // hack, 兼容 /examples/bar/basic/demo/radial-line.ts 动画
          isEqual(pathCommands, ['M', 'A', 'A', 'Z'])
            ? getArcPath(center.x, center.y, radius, onFrameStartAngle, onFrameEndAngle)
            : getSectorPath(center.x, center.y, radius, onFrameStartAngle, onFrameEndAngle, innerRadius),
      };
    },
    {
      ...animateCfg,
      callback: () => {
        // 将 path 保持原始态，否则会影响 setState() 的动画
        shape.attr('path', path);
        isFunction(animateCfg.callback) && animateCfg.callback();
      },
    }
  );
}
