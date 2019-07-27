/**
 * @fileOverview The entry of chart's animation
 * @author sima.zhang
 */
const Util = require('../util');
const Animate = require('./animate');
const MatrixUtil = Util.MatrixUtil;
const { mat3 } = MatrixUtil;

// 获取图组内所有的shapes
function getShapes(container, viewId) {
  let shapes = [];
  if (container.get('animate') === false) {
    return [];
  }
  const children = container.get('children');
  Util.each(children, child => {
    if (child.isGroup) {
      shapes = shapes.concat(getShapes(child, viewId));
    } else if (child.isShape && child._id) {
      let id = child._id;
      id = id.split('-')[0];
      if (id === viewId) {
        shapes.push(child);
      }
    }
  });

  return shapes;
}

function cache(shapes) {
  const rst = {};
  Util.each(shapes, shape => {
    if (!shape._id || shape.isClip) return;
    const id = shape._id;
    rst[id] = {
      _id: id,
      type: shape.get('type'),
      attrs: Util.cloneDeep(shape.attr()), // 原始属性
      name: shape.name,
      index: shape.get('index'),
      animateCfg: shape.get('animateCfg'),
      coord: shape.get('coord')
    };
  });
  return rst;
}

function getAnimate(geomType, coord, animationType, animationName) {
  let result;
  if (animationName) {
    result = Animate.Action[animationType][animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, animationType);
  }
  return result;
}

function getAnimateCfg(geomType, animationType, animateCfg) {
  const defaultCfg = Animate.getAnimateCfg(geomType, animationType);
  if (animateCfg && animateCfg[animationType]) {
    return Util.deepMix({}, defaultCfg, animateCfg[animationType]);
  }
  return defaultCfg;
}

function addAnimate(cache, shapes, canvas, isUpdate) {
  let animate;
  let animateCfg;
  let canvasDrawn = false;
  if (isUpdate) {
    // Step: leave -> update -> enter
    const updateShapes = []; // 存储的是 shapes
    const newShapes = []; // 存储的是 shapes
    Util.each(shapes, shape => {
      const result = cache[shape._id];
      if (!result) {
        newShapes.push(shape);
      } else {
        shape.setSilent('cacheShape', result);
        updateShapes.push(shape);
        delete cache[shape._id];
      }
    });

    Util.each(cache, deletedShape => {
      const { name, coord, _id, attrs, index, type } = deletedShape;
      animateCfg = getAnimateCfg(name, 'leave', deletedShape.animateCfg);
      animate = getAnimate(name, coord, 'leave', animateCfg.animation);
      if (Util.isFunction(animate)) {
        const tempShape = canvas.addShape(type, {
          attrs,
          index
        });
        tempShape._id = _id;
        tempShape.name = name;
        if (coord && name !== 'label') {
          const tempShapeMatrix = tempShape.getMatrix();
          const finalMatrix = mat3.multiply([], tempShapeMatrix, coord.matrix);
          tempShape.setMatrix(finalMatrix);
        }
        canvasDrawn = true;
        animate(tempShape, animateCfg, coord);
      }
    });

    Util.each(updateShapes, updateShape => {
      const name = updateShape.name;
      const coord = updateShape.get('coord');
      const cacheAttrs = updateShape.get('cacheShape').attrs;
      // 判断如果属性相同的话就不进行变换
      if (!Util.isEqual(cacheAttrs, updateShape.attr())) {
        animateCfg = getAnimateCfg(name, 'update', updateShape.get('animateCfg'));
        animate = getAnimate(name, coord, 'update', animateCfg.animation);
        if (Util.isFunction(animate)) {
          animate(updateShape, animateCfg, coord);
        } else {
          const endState = Util.cloneDeep(updateShape.attr());
          updateShape.attr(cacheAttrs);
          updateShape.animate(endState, animateCfg.duration, animateCfg.easing, function() {
            updateShape.setSilent('cacheShape', null);
          });
        }
        canvasDrawn = true;
      }
    });

    Util.each(newShapes, newShape => {
      const name = newShape.name;
      const coord = newShape.get('coord');

      animateCfg = getAnimateCfg(name, 'enter', newShape.get('animateCfg'));
      animate = getAnimate(name, coord, 'enter', animateCfg.animation);
      if (Util.isFunction(animate)) {
        animate(newShape, animateCfg, coord);
        canvasDrawn = true;
      }
    });
  } else {
    Util.each(shapes, shape => {
      const name = shape.name;
      const coord = shape.get('coord');
      animateCfg = getAnimateCfg(name, 'appear', shape.get('animateCfg'));
      animate = getAnimate(name, coord, 'appear', animateCfg.animation);
      if (Util.isFunction(animate)) {
        animate(shape, animateCfg, coord);
        canvasDrawn = true;
      }
    });
  }
  return canvasDrawn;
}

module.exports = {
  execAnimation(view, isUpdate) {
    const viewContainer = view.get('middlePlot');
    const axisContainer = view.get('backPlot');
    const viewId = view.get('_id');
    const canvas = view.get('canvas');
    const caches = canvas.get(viewId + 'caches') || [];
    if (caches.length === 0) {
      isUpdate = false;
    }
    const shapes = getShapes(viewContainer, viewId);
    const axisShapes = getShapes(axisContainer, viewId);
    const cacheShapes = shapes.concat(axisShapes);
    canvas.setSilent(viewId + 'caches', cache(cacheShapes));
    let drawn;
    if (isUpdate) {
      drawn = addAnimate(caches, cacheShapes, canvas, isUpdate);
    } else {
      drawn = addAnimate(caches, shapes, canvas, isUpdate);
    }
    if (!drawn) {
      canvas.draw();
    }
  }
};
