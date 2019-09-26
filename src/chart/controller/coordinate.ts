import { BBox } from '@antv/g';
import * as _ from '@antv/util';
import { Coordinate, getCoordinate } from '../../dependents';
import { CoordinateOption } from '../interface';

/**
 * 是否存在 action
 * @param actions
 * @param actionName
 */
function hasAction(actions, actionName) {
  return _.some(actions, (action) => action[0] === actionName);
}

function isTheta(type: string): boolean {
  return type === 'theta';
}
/**
 * 创建坐标系
 * @param coordinateOption
 * @param coordinateBBox
 */
export function createCoordinate(coordinateOption: CoordinateOption = {}, coordinateBBox: BBox): Coordinate {
  const { type = 'rect', cfg, actions = [] } = coordinateOption;

  // 1. 起始位置
  const start = coordinateBBox.bl;
  const end = coordinateBBox.tr;

  const props = {
    start,
    end,
    ...cfg,
  };

  // 2. 创建实例
  const C = getCoordinate(isTheta(type) ? 'polar' : type);

  const coordinate = new C(props);

  // 3. 执行 actions
  let coordinateActions = actions;
  if (isTheta(type)) {
    // 不存在 transpose，为其自动设置一个 action
    if (!hasAction(coordinateActions, 'transpose')) {
      coordinateActions = [...coordinateActions, ['transpose']];
    }
  }

  _.each(coordinateActions, (action: any[]) => {
    const [act, ...args] = action;
    coordinate[act](...args);
  });

  return coordinate;
}
