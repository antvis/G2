import getArcParams from '@antv/g-canvas/lib/util/arc-params';
import { each } from '@antv/util';
import { IShape } from '../../dependents';
import { getSectorPath } from '../../util/graphics';
import { AnimateCfg, AnimateExtraCfg } from '../interface';

function getAngle(path) {
  let startPoint;
  let arcPathCommand;
  let index;
  each(path, (command, idx) => {
    if (command[0] === 'A' || command[0] === 'a') {
      arcPathCommand = command;
      index = idx;
      return false;
    }
  });

  startPoint = [path[index - 1][1], path[index - 1][2]];
  let { startAngle, endAngle } = getArcParams(startPoint, arcPathCommand);

  if (startAngle < -Math.PI * 0.5) {
    startAngle += Math.PI * 2;
  }
  if (endAngle < -Math.PI * 0.5) {
    endAngle += Math.PI * 2;
  }

  if (endAngle > startAngle) {
    endAngle -= Math.PI * 2;
  }

  return {
    startAngle: endAngle,
    endAngle: startAngle,
    radius: arcPathCommand[1],
  };
}

/**
 * 文本的更新动画，只会更新位移
 * @param shape 文本图形
 * @param animateCfg
 * @param cfg
 */
export function sectorPathUpdate(shape: IShape, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { toAttrs, coordinate } = cfg;
  // @ts-ignore
  const path = toAttrs.path;
  const { startAngle: curStartAngle, endAngle: curEndAngle, radius } = getAngle(path);
  const { startAngle: preStartAngle, endAngle: preEndAngle } = getAngle(shape.attr('path'));

  const center = coordinate.getCenter();
  const diffStartAngle = curStartAngle - preStartAngle;
  const diffEndAngle = curEndAngle - preEndAngle;

  shape.animate((ratio) => {
    const onFrameStartAngle = preStartAngle + ratio * diffStartAngle;
    const onFrameEndAngle = preEndAngle + ratio * diffEndAngle;
    return {
      ...toAttrs,
      path: getSectorPath(center.x, center.y, radius, onFrameStartAngle, onFrameEndAngle),
    };
  }, animateCfg);
}
