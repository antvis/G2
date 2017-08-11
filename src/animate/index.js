const Util = require('../util');
const Animate = require('./animate');
const { MatrixUtil } = require('@ali/g');
const { mat3 } = MatrixUtil;

// 获取图组内所有的shapes
function getShapes(container) {
  let shapes = [];
  if (container.get('animate') === false) {
    return [];
  }
  const children = container.get('children');
  Util.each(children, child => {
    if (child.isGroup) {
      shapes = shapes.concat(getShapes(child));
    } else if (child.isShape && child._id) {
      shapes.push(child);
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
      attrs: Util.cloneDeep(shape.__attrs), // 原始属性
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
    return Util.defaultsDeep(animateCfg[animationType], defaultCfg);
  }
  return defaultCfg;
}

function _findById(id, shapes) {
  let result;
  Util.each(shapes, shape => {
    if (shape._id === id) {
      result = shape;
      return;
    }
  });

  return result;
}

function addAnimate(cache, shapes, canvas, isUpdate) {
  let animate;
  let animateCfg;

  if (isUpdate) {
    // Step: leave -> update -> enter
    const deletedShapes = []; // 存储的是 cache 中的配置
    const updateShapes = []; // 存储的是 shapes
    const newShapes = []; // 存储的是 shapes
    Util.each(cache, cacheShape => {
      const result = _findById(cacheShape._id, shapes);
      if (result) {
        result.set('cacheShape', cacheShape);
        updateShapes.push(result);
      } else {
        deletedShapes.push(cacheShape);
      }
    });

    Util.each(shapes, shape => {
      const result = cache[shape._id];
      if (!result) {
        newShapes.push(shape);
      }
    });

    Util.each(deletedShapes, deletedShape => {
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
        const tempShapeMatrix = tempShape.getMatrix();
        const finalMatrix = mat3.multiply([], tempShapeMatrix, coord.matrix);
        tempShape.setMatrix(finalMatrix);
        animate(tempShape, animateCfg, coord);
      }
    });

    Util.each(updateShapes, updateShape => {
      const name = updateShape.name;
      const coord = updateShape.get('coord');
      const cacheAttrs = updateShape.get('cacheShape').attrs;
      // 判断如果属性相同的话就不进行变换
      if (!Util.isEqual(cacheAttrs, updateShape.__attrs)) {
        animateCfg = getAnimateCfg(name, 'update', updateShape.get('animateCfg'));
        animate = getAnimate(name, coord, 'update', animateCfg.animation);
        if (Util.isFunction(animate)) {
          animate(updateShape, animateCfg, coord);
        } else {
          const endState = Util.cloneDeep(updateShape.__attrs);
          updateShape.__attrs = cacheAttrs;
          updateShape.animate(endState, animateCfg.duration, animateCfg.easing, function() {
            updateShape.set('cacheShape', null);
          });
        }
      }
    });

    Util.each(newShapes, newShape => {
      const name = newShape.name;
      const coord = newShape.get('coord');

      animateCfg = getAnimateCfg(name, 'enter', newShape.get('animateCfg'));
      animate = getAnimate(name, coord, 'enter', animateCfg.animation);
      if (Util.isFunction(animate)) {
        animate(newShape, animateCfg, coord);
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
      }
    });
  }
}


module.exports = {
  shapeAnimation(canvas, viewContainer, axisContainer, isUpdate) {
    const caches = canvas.get('caches') || [];
    const shapes = getShapes(viewContainer);
    const axisShapes = getShapes(axisContainer);
    const cacheShapes = shapes.concat(axisShapes);
    canvas.set('caches', cache(cacheShapes));
    if (isUpdate) {
      addAnimate(caches, cacheShapes, canvas, true);
    } else {
      addAnimate(caches, shapes, canvas, isUpdate);
    }
    // 无论是否执行动画，都调用一次 draw()
    canvas.draw();
  }
};
