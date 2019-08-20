import * as _ from '@antv/util';
import { mat3 } from '@antv/matrix-util';
import { Shapes } from '@antv/g';

export function getAnimateParam(animateCfg, index, id) {
  return {
    delay: _.isFunction(animateCfg.delay) ? animateCfg.delay(index, id) : animateCfg.delay,
    easing: _.isFunction(animateCfg.easing) ? animateCfg.easing(index, id) : animateCfg.easing,
    duration: _.isFunction(animateCfg.duration) ? animateCfg.duration(index, id) : animateCfg.duration,
    callback: animateCfg.callback,
  };
}

export function getCoordRange(coord) {
  const { start, end } = coord;
  return {
    start,
    end,
    width: coord.getWidth(),
    height: coord.getWidth(),
  };
}

export function getClip(coord) {
  const { start, end, width, height } = coord;
  const margin = 200;
  let clip;

  if (coord.isPolar) {
    const { startAngle, endAngle } = coord;
    const center = coord.getCenter();
    const radius = coord.getRadius();
    clip = new Shapes.Fan({
      attrs: {
        x: center.x,
        y: center.y,
        rs: 0,
        re: radius + margin,
        startAngle,
        endAngle: startAngle,
      },
    });
    clip.endState = {
      endAngle,
    };
  } else {
    clip = new Shapes.Rect({
      attrs: {
        x: start.x - margin,
        y: end.y - margin,
        width: coord.isTransposed ? width + margin * 2 : 0,
        height: coord.isTransposed ? 0 : height + margin * 2,
      },
    });

    if (coord.isTransposed) {
      clip.endState = {
        height: height + margin * 2,
      };
    } else {
      clip.endState = {
        width: width + margin * 2,
      };
    }
  }
  clip.set('isClip', true);
  return clip;
}

export function getScaledMatrix(shape, v, direct) {
  let scaledMatrix;

  shape.apply(v);
  const x = v[0];
  const y = v[1];

  if (direct === 'x') {
    shape.transform([
      [ 't', -x, -y ],
      [ 's', 0.01, 1 ],
      [ 't', x, y ],
    ]);
    const matrix = shape.getMatrix();
    scaledMatrix = mat3.transform(matrix, [
      [ 't', -x, -y ],
      [ 's', 100, 1 ],
      [ 't', x, y ],
    ]);
  } else if (direct === 'y') {
    shape.transform([
      [ 't', -x, -y ],
      [ 's', 1, 0.01 ],
      [ 't', x, y ],
    ]);
    const matrix = shape.getMatrix();
    scaledMatrix = mat3.transform(matrix, [
      [ 't', -x, -y ],
      [ 's', 1, 100 ],
      [ 't', x, y ],
    ]);
  } else if (direct === 'xy') {
    shape.transform([
      [ 't', -x, -y ],
      [ 's', 0.01, 0.01 ],
      [ 't', x, y ],
    ]);
    const matrix = shape.getMatrix();
    scaledMatrix = mat3.transform(matrix, [
      [ 't', -x, -y ],
      [ 's', 100, 100 ],
      [ 't', x, y ],
    ]);
  }
  return scaledMatrix;
}

export function doAnimation(shape, endState, animateCfg) {
  const id = shape.id;
  const index = shape.get('index');
  const { easing, delay, duration, callback } = getAnimateParam(animateCfg, index, id);
  shape.animate(endState, duration, easing, callback, delay);
}

export function doGroupScaleIn(container, animateCfg, coord, zeroY, type) {
  const { start, end, width, height } = getCoordRange(coord);
  let x;
  let y;

  const clip = new Shapes.Rect({
    attrs: {
      x: start.x,
      y: end.y,
      width,
      height,
    },
  });

  if (type === 'y') {
    x = start.x + width / 2;
    y = zeroY.y < start.y ? zeroY.y : start.y;
  } else if (type === 'x') {
    x = zeroY.x > start.x ? zeroY.x : start.x;
    y = start.y + height / 2;
  } else if (type === 'xy') {
    if (coord.isPolar) {
      x = coord.center.x;
      y = coord.center.y;
    } else {
      x = (start.x + end.x) / 2;
      y = (start.y + end.y) / 2;
    }
  }

  const endMatrix = getScaledMatrix(clip, [ x, y, 1 ], type);
  clip.set('isClip', true);
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);
  animateCfg.callback = function () {
    container.attr('clip', null);
    clip.remove();
  };
  doAnimation(clip, { matrix: endMatrix }, animateCfg);
}
