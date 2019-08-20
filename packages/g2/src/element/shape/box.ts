/**
 * @description Box Element shapes
 */
import * as _ from '@antv/util';
import { setStrokeStyle } from '../util/shape';
import { registerShape, registerShapeFactory, ShapeFactoryCFG } from './base';
import { ShapePointInfo, ShapeDrawCFG, ShapeMarkerCfg, PointObject } from '../../interface';
import { Group } from '@antv/g';

function _parseValue(oldValue) {
  let value = oldValue;
  if (!_.isArray(oldValue)) {
    value = [ oldValue ];
  }
  const min = value[0]; // 最小值
  const max = value[value.length - 1]; // 最大值
  const min1 = value.length > 1 ? value[1] : min;
  const max1 = value.length > 3 ? value[3] : max;
  const median = value.length > 2 ? value[2] : min1;

  return {
    min, // 最小值
    max, // 最大值
    min1,
    max1,
    median,
  };
}

function addPoints(from: PointObject[], to: PointObject[]) {
  _.each(from, (subArr) => {
    to.push({
      x: subArr[0],
      y: subArr[1],
    });
  });
}

function getAttrs(cfg) {
  const lineAttrs = cfg.style;
  setStrokeStyle(lineAttrs, cfg);
  return lineAttrs;
}

function _getBoxPoints(pointX, pointY, width: number) {
  const points = [];
  let pointsArray;
  let obj;
  const x = pointX;
  let y = pointY;
  if (_.isArray(y)) { // position('x*range')
    // 2维
    obj = _parseValue(y);
    pointsArray = [
      [ x - width / 2, obj.max ],
      [ x + width / 2, obj.max ],
      [ x, obj.max ],
      [ x, obj.max1 ],
      [ x - width / 2, obj.min1 ],
      [ x - width / 2, obj.max1 ],
      [ x + width / 2, obj.max1 ],
      [ x + width / 2, obj.min1 ],
      [ x, obj.min1 ],
      [ x, obj.min ],
      [ x - width / 2, obj.min ],
      [ x + width / 2, obj.min ],
      [ x - width / 2, obj.median ],
      [ x + width / 2, obj.median ],
    ];
  } else { // position('range*1') 一维图表
    y = y || 0.5;
    obj = _parseValue(x);
    pointsArray = [
      [ obj.min, y - width / 2 ],
      [ obj.min, y + width / 2 ],
      [ obj.min, y ],
      [ obj.min1, y ],
      [ obj.min1, y - width / 2 ],
      [ obj.min1, y + width / 2 ],
      [ obj.max1, y + width / 2 ],
      [ obj.max1, y - width / 2 ],
      [ obj.max1, y ],
      [ obj.max, y ],
      [ obj.max, y - width / 2 ],
      [ obj.max, y + width / 2 ],
      [ obj.median, y - width / 2 ],
      [ obj.median, y + width / 2 ],
    ];
  }
  addPoints(pointsArray, points);
  return points;
}

function _getBoxPath(points) {
  const path = [
    [ 'M', points[0].x, points[0].y ],
    [ 'L', points[1].x, points[1].y ],
    [ 'M', points[2].x, points[2].y ],
    [ 'L', points[3].x, points[3].y ],
    [ 'M', points[4].x, points[4].y ],
    [ 'L', points[5].x, points[5].y ],
    [ 'L', points[6].x, points[6].y ],
    [ 'L', points[7].x, points[7].y ],
    [ 'L', points[4].x, points[4].y ], // 封闭 z
    [ 'Z' ],
    [ 'M', points[8].x, points[8].y ],
    [ 'L', points[9].x, points[9].y ],
    [ 'M', points[10].x, points[10].y ],
    [ 'L', points[11].x, points[11].y ],
    [ 'M', points[12].x, points[12].y ],
    [ 'L', points[13].x, points[13].y ],
  ];
  return path;
}

const BoxShapeFactory: ShapeFactoryCFG = registerShapeFactory('box', {
  defaultShapeType: 'box',
});

// 箱线图
registerShape('box', 'box', {
  getPoints(pointInfo: ShapePointInfo) {
    return _getBoxPoints(pointInfo.x, pointInfo.y, pointInfo.size);
  },
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = getAttrs(cfg);
    let path = _getBoxPath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: _.mix(attrs, {
        path,
      }),
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    return {
      symbol(x: number, y: number, r: number) {
        const yValues = [ y - 6, y - 3, y, y + 3, y + 6 ];
        const points = _getBoxPoints(x, yValues, r);
        return [
          [ 'M', points[0].x + 1, points[0].y ],
          [ 'L', points[1].x - 1, points[1].y ],
          [ 'M', points[2].x, points[2].y ],
          [ 'L', points[3].x, points[3].y ],
          [ 'M', points[4].x, points[4].y ],
          [ 'L', points[5].x, points[5].y ],
          [ 'L', points[6].x, points[6].y ],
          [ 'L', points[7].x, points[7].y ],
          [ 'L', points[4].x, points[4].y ],
          [ 'Z' ],
          [ 'M', points[8].x, points[8].y ],
          [ 'L', points[9].x, points[9].y ],
          [ 'M', points[10].x + 1, points[10].y ],
          [ 'L', points[11].x - 1, points[11].y ],
          [ 'M', points[12].x, points[12].y ],
          [ 'L', points[13].x, points[13].y ],
        ];
      },
      radius: 6,
      lineWidth: 1,
      stroke: markerCfg.color,
    };
  },
});

export default BoxShapeFactory;
