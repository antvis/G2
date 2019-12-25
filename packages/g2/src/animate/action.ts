/**
 * @fileOverview Default animation funciton
 */
import * as pathUtil from '@antv/path-util';
import * as _ from '@antv/util';
import { PointObject } from '../interface';
import { doAnimation, doGroupScaleIn, getClip, getScaledMatrix } from './util';

// 获取图形的包围盒
function getPointsBox(points: PointObject[]) {
  if (_.isEmpty(points)) {
    return null;
  }

  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;
  _.each(points, (point) => {
    minX = minX > point.x ? point.x : minX;
    maxX = maxX < point.x ? point.x : maxX;
    minY = minY > point.y ? point.y : minY;
    maxY = maxY < point.y ? point.y : maxY;
  });
  return {
    minX,
    maxX,
    minY,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

function getAngle(shape, coord) {
  const points = shape.points || shape.get('origin').points;
  const box = getPointsBox(points);
  let endAngle;
  let startAngle;
  const coordStartAngle = coord.startAngle;
  const coordEndAngle = coord.endAngle;
  const diffAngle = coordEndAngle - coordStartAngle;

  if (coord.isTransposed) {
    endAngle = box.maxY * diffAngle;
    startAngle = box.minY * diffAngle;
  } else {
    endAngle = box.maxX * diffAngle;
    startAngle = box.minX * diffAngle;
  }
  endAngle += coordStartAngle;
  startAngle += coordStartAngle;
  return {
    startAngle,
    endAngle,
  };
}

function scaleInY(shape, animateCfg) {
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  const x = (box.minX + box.maxX) / 2;
  const y = points[0].y - points[1].y <= 0 ? box.maxY : box.minY;
  const endState = {
    matrix: getScaledMatrix(shape, [x, y, 1], 'y'),
  };

  doAnimation(shape, endState, animateCfg);
}

function scaleInX(shape, animateCfg) {
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  const x = points[0].y - points[1].y > 0 ? box.maxX : box.minX;
  const y = (box.minY + box.maxY) / 2;
  const endState = {
    matrix: getScaledMatrix(shape, [x, y, 1], 'x'),
  };

  doAnimation(shape, endState, animateCfg);
}

function lineWidthOut(shape, animateCfg) {
  const endState = {
    lineWidth: 0,
    opacity: 0,
  };
  animateCfg.callback = () => shape.remove();
  doAnimation(shape, endState, animateCfg);
}

function zoomIn(shape, animateCfg, coord) {
  let x;
  let y;
  if (coord.isPolar && shape.name !== 'point') {
    x = coord.getCenter().x;
    y = coord.getCenter().y;
  } else {
    const box = shape.getBBox();
    x = (box.minX + box.maxX) / 2;
    y = (box.minY + box.maxY) / 2;
  }

  const endState = {
    matrix: getScaledMatrix(shape, [x, y, 1], 'xy'),
  };

  doAnimation(shape, endState, animateCfg);
}

function zoomOut(shape, animateCfg, coord) {
  let x;
  let y;
  if (coord.isPolar && shape.name !== 'point') {
    x = coord.getCenter().x;
    y = coord.getCenter().y;
  } else {
    const box = shape.getBBox();
    x = (box.minX + box.maxX) / 2;
    y = (box.minY + box.maxY) / 2;
  }
  const v = [x, y, 1];
  shape.apply(v);
  const endState = {
    transform: [
      ['t', -x, -y],
      ['s', 0.01, 0.01],
      ['t', x, y],
    ],
  };

  animateCfg.callback = () => shape.remove();
  doAnimation(shape, endState, animateCfg);
}

function pathIn(shape, animateCfg) {
  if (shape.get('type') !== 'path') {
    return;
  }
  const path = pathUtil.path2Curve(shape.attr('path'));
  shape.attr('path', [path[0]]);
  const endState = {
    path,
  };

  doAnimation(shape, endState, animateCfg);
}

function pathOut(shape, animateCfg) {
  if (shape.get('type') !== 'path') {
    return;
  }
  const path = pathUtil.path2Curve(shape.attr('path'));
  const endState = {
    path: [path[0]],
  };
  animateCfg.callback = () => shape.remove();

  doAnimation(shape, endState, animateCfg);
}

function clipIn(shape, animateCfg, coord, startAngle, endAngle) {
  const clip = getClip(coord);
  const canvas = shape.get('canvas');
  let endState;
  if (startAngle) {
    // 指定了 startAngle 和 endAngle
    clip.attr('startAngle', startAngle);
    clip.attr('endAngle', startAngle);
    endState = {
      endAngle,
    };
  } else {
    endState = clip.endState;
  }
  clip.set('canvas', canvas);
  shape.attr('clip', clip);
  shape.setSilent('animating', true);

  animateCfg.callback = () => {
    if (shape && !shape.get('destroyed')) {
      shape.attr('clip', null);
      shape.setSilent('cacheShape', null);
      shape.setSilent('animating', false);
      clip.remove();
    }
  };
  doAnimation(clip, endState, animateCfg);
}

function fadeIn(shape, animateCfg) {
  const fillOpacity = _.isNil(shape.attr('fillOpacity')) ? 1 : shape.attr('fillOpacity');
  const strokeOpacity = _.isNil(shape.attr('strokeOpacity')) ? 1 : shape.attr('strokeOpacity');
  shape.attr('fillOpacity', 0);
  shape.attr('strokeOpacity', 0);
  const endState = {
    fillOpacity,
    strokeOpacity,
  };

  doAnimation(shape, endState, animateCfg);
}

function fadeOut(shape, animateCfg) {
  const endState = {
    fillOpacity: 0,
    strokeOpacity: 0,
  };
  animateCfg.callback = () => shape.remove();

  doAnimation(shape, endState, animateCfg);
}

function fanIn(shape, animateCfg, coord) {
  const { startAngle, endAngle } = getAngle(shape, coord);
  clipIn(shape, animateCfg, coord, startAngle, endAngle);
}

function groupScaleInX(container, animateCfg, coord, zeroY) {
  doGroupScaleIn(container, animateCfg, coord, zeroY, 'x');
}

function groupScaleInY(container, animateCfg, coord, zeroY) {
  doGroupScaleIn(container, animateCfg, coord, zeroY, 'y');
}

function groupScaleInXY(container, animateCfg, coord, zeroY) {
  doGroupScaleIn(container, animateCfg, coord, zeroY, 'xy');
}

function groupWaveIn(container, animateCfg, coord) {
  const clip = getClip(coord);
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);
  animateCfg.callback = function() {
    container.attr('clip', null);
    clip.remove();
  };
  const endState = clip.endState;
  doAnimation(clip, endState, animateCfg);
}

// 默认动画库
const Action = {
  enter: {
    clipIn,
    zoomIn,
    pathIn,
    scaleInY,
    scaleInX,
    fanIn,
    fadeIn,
  },
  leave: {
    lineWidthOut,
    zoomOut,
    pathOut,
    fadeOut,
    fadeIn,
  },
  appear: {
    clipIn,
    zoomIn,
    pathIn,
    scaleInY,
    scaleInX,
    fanIn,
    fadeIn,
    groupWaveIn,
    groupScaleInX,
    groupScaleInY,
    groupScaleInXY,
  },
  update: {
    fadeIn,
    fanIn,
  },
};

// 给每一个方法增加 name 属性，防止 function name 被 uglify 改掉。
_.each(Action, (v: object) => {
  _.each(v, (animate: any, name: string) => {
    // @ts-ignore
    animate.animationName = name;
  });
});

export default Action;
