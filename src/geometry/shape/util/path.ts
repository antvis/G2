import { vec2 } from '@antv/matrix-util';
import { each } from '@antv/util';
import { Coordinate, PathCommand } from '../../../dependents';
import { Point, Position } from '../../../interface';
import { getDistanceToCenter } from '../../../util/coordinate';

function _points2path(points: Point[], isInCircle: boolean): PathCommand[] {
  const path = [];
  if (points.length) {
    path.push(['M', points[0].x, points[0].y]);
    for (let i = 1, length = points.length; i < length; i += 1) {
      const item = points[i];
      path.push(['L', item.x, item.y]);
    }

    if (isInCircle) {
      path.push(['Z']);
    }
  }

  return path;
}

function _convertArr(arr: number[], coord: Coordinate): any[] {
  const tmp = [arr[0]];
  for (let i = 1, len = arr.length; i < len; i = i + 2) {
    const point = coord.convert({
      x: arr[i],
      y: arr[i + 1],
    });
    tmp.push(point.x, point.y);
  }
  return tmp;
}
function _convertArcPath(path: PathCommand, coord: Coordinate): any[] {
  const { isTransposed } = coord;
  const r = path[1];
  const x = path[6];
  const y = path[7];
  const point = coord.convert({ x, y });
  const direction = isTransposed ? 0 : 1;
  return ['A', r, r, 0, 0, direction, point.x, point.y];
}

function _convertPolarPath(pre: PathCommand, cur: PathCommand, coord: Coordinate): PathCommand[] {
  const { isTransposed, startAngle, endAngle } = coord;
  const prePoint =
    pre[0].toLowerCase() === 'a'
      ? {
          x: pre[6],
          y: pre[7],
        }
      : {
          x: pre[1],
          y: pre[2],
        };
  const curPoint = {
    x: cur[1],
    y: cur[2],
  };
  const rst = [];
  const xDim = isTransposed ? 'y' : 'x';
  const angleRange = Math.abs(curPoint[xDim] - prePoint[xDim]) * (endAngle - startAngle);
  const direction = curPoint[xDim] >= prePoint[xDim] ? 1 : 0; // 圆弧的方向
  const flag = angleRange > Math.PI ? 1 : 0; // 大弧还是小弧标志位
  const convertPoint = coord.convert(curPoint);
  const r = getDistanceToCenter(coord, convertPoint);
  if (r >= 0.5) {
    // 小于1像素的圆在图像上无法识别
    if (angleRange === Math.PI * 2) {
      const middlePoint = {
        x: (curPoint.x + prePoint.x) / 2,
        y: (curPoint.y + prePoint.y) / 2,
      };
      const middleConvertPoint = coord.convert(middlePoint);
      rst.push(['A', r, r, 0, flag, direction, middleConvertPoint.x, middleConvertPoint.y]);
      rst.push(['A', r, r, 0, flag, direction, convertPoint.x, convertPoint.y]);
    } else {
      rst.push(['A', r, r, 0, flag, direction, convertPoint.x, convertPoint.y]);
    }
  }
  return rst;
}

// 当存在整体的圆时，去除圆前面和后面的线，防止出现直线穿过整个圆的情形
function _filterFullCirleLine(path: PathCommand[]) {
  each(path, (subPath, index) => {
    const cur = subPath;
    if (cur[0].toLowerCase() === 'a') {
      const pre = path[index - 1];
      const next = path[index + 1];
      if (next && next[0].toLowerCase() === 'a') {
        if (pre && pre[0].toLowerCase() === 'l') {
          pre[0] = 'M';
        }
      } else if (pre && pre[0].toLowerCase() === 'a') {
        if (next && next[0].toLowerCase() === 'l') {
          next[0] = 'M';
        }
      }
    }
  });
}

/**
 * @ignore
 * 计算光滑的贝塞尔曲线
 */
export const smoothBezier = (
  points: Position[],
  smooth: number,
  isLoop: boolean,
  constraint: Position[]
): Position[] => {
  const cps = [];

  let prevPoint: Position;
  let nextPoint: Position;
  const hasConstraint = !!constraint;
  let min: Position;
  let max: Position;
  if (hasConstraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (let i = 0, l = points.length; i < l; i++) {
      const point = points[i];
      min = vec2.min([0, 0], min, point) as [number, number];
      max = vec2.max([0, 0], max, point) as [number, number];
    }
    min = vec2.min([0, 0], min, constraint[0]) as [number, number];
    max = vec2.max([0, 0], max, constraint[1]) as [number, number];
  }

  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    if (isLoop) {
      prevPoint = points[i ? i - 1 : len - 1];
      nextPoint = points[(i + 1) % len];
    } else {
      if (i === 0 || i === len - 1) {
        cps.push(point);
        continue;
      } else {
        prevPoint = points[i - 1];
        nextPoint = points[i + 1];
      }
    }
    let v: [number, number] = [0, 0];
    v = vec2.sub(v, nextPoint, prevPoint) as [number, number];
    v = vec2.scale(v, v, smooth) as [number, number];

    let d0 = vec2.distance(point, prevPoint);
    let d1 = vec2.distance(point, nextPoint);

    const sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    const v1 = vec2.scale([0, 0], v, -d0);
    const v2 = vec2.scale([0, 0], v, d1);

    let cp0 = vec2.add([0, 0], point, v1);
    let cp1 = vec2.add([0, 0], point, v2);

    if (hasConstraint) {
      cp0 = vec2.max([0, 0], cp0, min);
      cp0 = vec2.min([0, 0], cp0, max);
      cp1 = vec2.max([0, 0], cp1, min);
      cp1 = vec2.min([0, 0], cp1, max);
    }

    cps.push(cp0);
    cps.push(cp1);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;
};

/**
 * @ignore
 * 贝塞尔曲线
 */
export function catmullRom2bezier(crp: number[], z: boolean, constraint: Position[]): PathCommand[] {
  const isLoop = !!z;
  const pointList = [];
  for (let i = 0, l = crp.length; i < l; i += 2) {
    pointList.push([crp[i], crp[i + 1]]);
  }

  const controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  const len = pointList.length;
  const d1 = [];

  let cp1: Position;
  let cp2: Position;
  let p: Position;

  for (let i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];

    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];

    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
  }
  return d1;
}

/**
 * @ignore
 * 将点连接成路径 path
 */
export function getLinePath(points: Point[], isInCircle?: boolean): PathCommand[] {
  return _points2path(points, isInCircle);
}

/**
 * @ignore
 * 根据关键点获取限定了范围的平滑线
 */
export function getSplinePath(points: Point[], isInCircle?: boolean, constaint?: Position[]): PathCommand[] {
  const data = [];
  const first = points[0];
  let prePoint = null;
  if (points.length <= 2) {
    // 两点以内直接绘制成路径
    return getLinePath(points, isInCircle);
  }
  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    if (!prePoint || !(prePoint.x === point.x && prePoint.y === point.y)) {
      data.push(point.x);
      data.push(point.y);
      prePoint = point;
    }
  }
  const constraint = constaint || [
    // 范围
    [0, 0],
    [1, 1],
  ];
  const splinePath = catmullRom2bezier(data, isInCircle, constraint);
  splinePath.unshift(['M', first.x, first.y]);
  return splinePath;
}

/**
 * @ignore
 * 将归一化后的路径数据转换成坐标
 */
export function convertNormalPath(coord, path: PathCommand[]): PathCommand[] {
  const tmp = [];
  each(path, (subPath) => {
    const action = subPath[0];
    switch (action.toLowerCase()) {
      case 'm':
      case 'l':
      case 'c':
        tmp.push(_convertArr(subPath, coord));
        break;
      case 'a':
        tmp.push(_convertArcPath(subPath, coord));
        break;
      case 'z':
      default:
        tmp.push(subPath);
        break;
    }
  });
  return tmp;
}

/**
 * @ignore
 * 将路径转换为极坐标下的真实路径
 */
export function convertPolarPath(coord, path: PathCommand[]): PathCommand[] {
  let tmp = [];
  let pre: PathCommand;
  let cur: PathCommand;
  let transposed: boolean;
  let equals: boolean;
  each(path, (subPath, index) => {
    const action = subPath[0];

    switch (action.toLowerCase()) {
      case 'm':
      case 'c':
      case 'q':
        tmp.push(_convertArr(subPath, coord));
        break;
      case 'l':
        pre = path[index - 1];
        cur = subPath;
        transposed = coord.isTransposed;
        // 是否半径相同，转换成圆弧
        equals = transposed ? pre[pre.length - 2] === cur[1] : pre[pre.length - 1] === cur[2];
        if (equals) {
          tmp = tmp.concat(_convertPolarPath(pre, cur, coord));
        } else {
          // y 不相等，所以直接转换
          tmp.push(_convertArr(subPath, coord));
        }
        break;
      case 'a':
        tmp.push(_convertArcPath(subPath, coord));
        break;
      case 'z':
      default:
        tmp.push(subPath);
        break;
    }
  });
  _filterFullCirleLine(tmp); // 过滤多余的直线
  return tmp;
}
