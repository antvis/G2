/**
 * @fileOverview Default animation funciton
 * @author sima.zhang
 */
const Util = require('../util');
const G = require('../renderer');
const PathUtil = Util.PathUtil;

function getClip(coord) {
  const start = coord.start;
  const end = coord.end;
  const width = coord.getWidth();
  const height = coord.getHeight();
  const margin = 200;
  let startAngle;
  let endAngle;
  let center;
  let radius;
  let clip;

  if (coord.isPolar) {
    radius = coord.getRadius();
    center = coord.getCenter();
    startAngle = coord.startAngle;
    endAngle = coord.endAngle;
    clip = new G.Fan({
      attrs: {
        x: center.x,
        y: center.y,
        rs: 0,
        re: radius + margin,
        startAngle,
        endAngle: startAngle
      }
    });
    clip.endState = {
      endAngle
    };
  } else {
    clip = new G.Rect({
      attrs: {
        x: start.x - margin,
        y: end.y - margin,
        width: coord.isTransposed ? width + margin * 2 : 0,
        height: coord.isTransposed ? 0 : height + margin * 2
      }
    });

    if (coord.isTransposed) {
      clip.endState = {
        height: height + margin * 2
      };
    } else {
      clip.endState = {
        width: width + margin * 2
      };
    }
  }
  clip.isClip = true;
  return clip;
}

// 获取图形的包围盒
function getPointsBox(points) {
  if (Util.isEmpty(points)) {
    return null;
  }

  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;
  Util.each(points, point => {
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
    centerY: (minY + maxY) / 2
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
    endAngle
  };
}

function getAnimateParam(animateCfg, index, id) {
  const result = {};
  if (animateCfg.delay) {
    result.delay = Util.isFunction(animateCfg.delay) ? animateCfg.delay(index, id) : animateCfg.delay;
  }
  result.easing = Util.isFunction(animateCfg.easing) ? animateCfg.easing(index, id) : animateCfg.easing;
  result.duration = Util.isFunction(animateCfg.duration) ? animateCfg.duration(index, id) : animateCfg.duration;
  result.callback = animateCfg.callback;
  return result;
}

function scaleInY(shape, animateCfg) {
  const id = shape._id;
  const index = shape.get('index');
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  const x = (box.minX + box.maxX) / 2;
  let y;

  if (points[0].y - points[1].y <= 0) { // 当顶点在零点之下
    y = box.maxY;
  } else {
    y = box.minY;
  }
  const v = [ x, y, 1 ];
  shape.apply(v);
  shape.attr('transform', [
    [ 't', -x, -y ],
    [ 's', 1, 0.01 ],
    [ 't', x, y ]
  ]);
  const endState = {
    transform: [
      [ 't', -x, -y ],
      [ 's', 1, 100 ],
      [ 't', x, y ]
    ]
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, animateParam.callback, animateParam.delay);
}

function scaleInX(shape, animateCfg) {
  const id = shape._id;
  const index = shape.get('index');
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  let x;
  const y = (box.minY + box.maxY) / 2;

  if (points[0].y - points[1].y > 0) { // 当顶点在零点之下
    x = box.maxX;
  } else {
    x = box.minX;
  }
  const v = [ x, y, 1 ];
  shape.apply(v);
  shape.attr({
    transform: [
      [ 't', -x, -y ],
      [ 's', 0.01, 1 ],
      [ 't', x, y ]
    ]
  });
  const endState = {
    transform: [
      [ 't', -x, -y ],
      [ 's', 100, 1 ],
      [ 't', x, y ]
    ]
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, animateParam.callback, animateParam.delay);
}

function lineWidthOut(shape, animateCfg) {
  const endState = {
    lineWidth: 0,
    opacity: 0
  };
  const id = shape._id;
  const index = shape.get('index');
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, () => {
    shape.remove();
  }, animateParam.delay);
}

function zoomIn(shape, animateCfg, coord) {
  const id = shape._id;
  const index = shape.get('index');
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
  const v = [ x, y, 1 ];
  shape.apply(v);
  shape.attr({
    transform: [
      [ 't', -x, -y ],
      [ 's', 0.01, 0.01 ],
      [ 't', x, y ]
    ]
  });
  const endState = {
    transform: [
      [ 't', -x, -y ],
      [ 's', 100, 100 ],
      [ 't', x, y ]
    ]
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, animateParam.callback, animateParam.delay);
}

function zoomOut(shape, animateCfg, coord) {
  const id = shape._id;
  const index = shape.get('index');
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
  const v = [ x, y, 1 ];
  shape.apply(v);
  const endState = {
    transform: [
      [ 't', -x, -y ],
      [ 's', 0.01, 0.01 ],
      [ 't', x, y ]
    ]
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, () => {
    shape.remove();
  }, animateParam.delay);
}

function pathIn(shape, animateCfg) {
  if (shape.get('type') !== 'path') return;
  const id = shape._id;
  const index = shape.get('index');
  const path = PathUtil.pathToAbsolute(shape.attr('path'));
  shape.attr('path', [ path[0] ]);
  const endState = {
    path
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, animateParam.callback, animateParam.delay);
}

function pathOut(shape, animateCfg) {
  if (shape.get('type') !== 'path') return;
  const id = shape._id;
  const index = shape.get('index');
  const path = PathUtil.pathToAbsolute(shape.attr('path'));
  const endState = {
    path: [ path[0] ]
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, () => {
    shape.remove();
  }, animateParam.delay);
}

function clipIn(shape, animateCfg, coord, startAngle, endAngle) {
  const clip = getClip(coord);
  const canvas = shape.get('canvas');
  const id = shape._id;
  const index = shape.get('index');
  let endState;
  if (startAngle) {
    clip.attr('startAngle', startAngle);
    clip.attr('endAngle', startAngle);
    endState = {
      endAngle
    };
  } else {
    endState = clip.endState;
  }
  clip.set('canvas', canvas);
  shape.attr('clip', clip);
  shape.setSilent('animating', true);
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  clip.animate(endState, animateParam.duration, animateParam.easing,
    () => {
      if (shape && !shape.get('destroyed')) {
        shape.attr('clip', null);
        shape.setSilent('cacheShape', null);
        shape.setSilent('animating', false);
        clip.remove();
      }
    }, animateParam.delay);
}

function fadeIn(shape, animateCfg) {
  const id = shape._id;
  const index = shape.get('index');
  const fillOpacity = Util.isNil(shape.attr('fillOpacity')) ? 1 : shape.attr('fillOpacity');
  const strokeOpacity = Util.isNil(shape.attr('strokeOpacity')) ? 1 : shape.attr('strokeOpacity');
  shape.attr('fillOpacity', 0);
  shape.attr('strokeOpacity', 0);
  const endState = {
    fillOpacity,
    strokeOpacity
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, animateParam.callback, animateParam.delay);
}

function fadeOut(shape, animateCfg) {
  const id = shape._id;
  const index = shape.get('index');
  const endState = {
    fillOpacity: 0,
    strokeOpacity: 0
  };
  const animateParam = getAnimateParam(animateCfg, index, id, endState);
  shape.animate(endState, animateParam.duration, animateParam.easing, () => {
    shape.remove();
  }, animateParam.delay);
}

function fanIn(shape, animateCfg, coord) {
  const angle = getAngle(shape, coord);
  const endAngle = angle.endAngle;
  const startAngle = angle.startAngle;
  clipIn(shape, animateCfg, coord, startAngle, endAngle);
}

function lineSlideLeft(shape, animateCfg, coord) {

  if (shape.name !== 'line') {
    return;
  }

  const canvas = shape.get('canvas');
  const cache = shape.get('cacheShape');
  const id = shape._id;
  const index = shape.get('index');

  const clip = new G.Rect({
    attrs: {
      x: coord.start.x,
      y: coord.end.y,
      width: coord.getWidth(),
      height: coord.getHeight()
    }
  });
  clip.isClip = true;

  clip.set('canvas', canvas);

  const lastPath = PathUtil.pathToAbsolute(cache.attrs.path);
  const updatePath = PathUtil.pathToAbsolute(shape.attr('path'));

  const gap = lastPath[1][1] - lastPath[0][1];

  // 生成过渡Path
  const pathPatchPosX = lastPath[lastPath.length - 1][1] + gap;
  const pathPatchPosY = updatePath[updatePath.length - 1][2];
  const transitionPath = lastPath.concat([[ 'L', pathPatchPosX, pathPatchPosY ]]);

  const v = [ 0, 0, 1 ];
  shape.apply(v);

  shape.attr('clip', clip);
  shape.attr('path', transitionPath);

  const endState = {
    transform: [
      [ 't', -gap, 0 ]
    ]
  };

  const animateParam = getAnimateParam(animateCfg, index, id, endState);

  shape.animate(endState, animateParam.duration, animateParam.easing, function() {
    if (shape && !shape.get('destroyed')) {
      shape.attr('path', updatePath);
      shape.attr({
        transform: [
          [ 't', gap, 0 ]
        ]
      });
      shape.attr('clip', null);
      shape.setSilent('cacheShape', null);
      clip.remove();
    }
  }, animateParam.delay);
}

function areaSlideLeft(shape, animateCfg, coord) {

  if (shape.name !== 'area') {
    return;
  }

  const canvas = shape.get('canvas');
  const cache = shape.get('cacheShape');
  const id = shape._id;
  const index = shape.get('index');

  const clip = new G.Rect({
    attrs: {
      x: coord.start.x,
      y: coord.end.y,
      width: coord.getWidth(),
      height: coord.getHeight()
    }
  });
  clip.isClip = true;

  clip.set('canvas', canvas);

  const lastPath = PathUtil.pathToAbsolute(cache.attrs.path);
  const updatePath = PathUtil.pathToAbsolute(shape.attr('path'));

  const gap = lastPath[1][1] - lastPath[0][1];

  // 生成过渡Path
  const middleIndex = Math.floor(lastPath.length / 2);
  const pathPatchPosX = lastPath[middleIndex - 1][1] + gap;
  const pathPatchPosY = updatePath[middleIndex - 1][2];
  const transitionPath = [ ...lastPath.slice(0, middleIndex), [ 'L', pathPatchPosX, pathPatchPosY ], [ 'L', pathPatchPosX, updatePath[middleIndex][2] ], ...lastPath.slice(middleIndex) ];

  const v = [ 0, 0, 1 ];
  shape.apply(v);

  shape.attr('clip', clip);
  shape.attr('path', transitionPath);

  const endState = {
    transform: [
      [ 't', -gap, 0 ]
    ]
  };

  const animateParam = getAnimateParam(animateCfg, index, id, endState);

  shape.animate(endState, animateParam.duration, animateParam.easing, function() {
    if (shape && !shape.get('destroyed')) {
      shape.attr('path', updatePath);
      shape.attr({
        transform: [
          [ 't', gap, 0 ]
        ]
      });
      shape.attr('clip', null);
      shape.setSilent('cacheShape', null);
      clip.remove();
    }
  }, animateParam.delay);
}

// 默认动画库
module.exports = {
  enter: {
    clipIn,
    zoomIn,
    pathIn,
    scaleInY,
    scaleInX,
    fanIn,
    fadeIn
  },
  leave: {
    lineWidthOut,
    zoomOut,
    pathOut,
    fadeOut
  },
  appear: {
    clipIn,
    zoomIn,
    pathIn,
    scaleInY,
    scaleInX,
    fanIn,
    fadeIn
  },
  update: {
    fadeIn,
    fanIn,
    lineSlideLeft,
    areaSlideLeft
  }
};
