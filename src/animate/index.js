const Util = require('../util');
const Animate = require('./animate');

// 获取图组内所有的shapes
function getShapes(container) {
  let shapes = [];
  if (container.get('animate') === false) {
    return;
  }
  const children = container.get('children');
  Util.each(children, child => {
    if (child.isGroup) {
      shapes = shapes.concat(getShapes(child));
    } else if (child.isShape) {
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
      name: shape.name
    };
  });
  return rst;
}

// TODO rename 获取动画的方法
function getAnimate(geomType, coord, animationType, animationName) {
  let result;
  if (animationName) {
    result = Animate.Action[animationType][animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, animationType);
  }
  return result;
}

function getAnimateCfg(geomType, animationType, shape) {
  const defaultCfg = Animate.getAnimateCfg(geomType, animationType);
  let cfg = {};
  let animateCfg = shape.animateCfg;
  if (!animateCfg && Util.isFunction(shape.getParent)) {
    const geom = shape.getParent().get('geom'); // ??? 在哪里设置的
    if (geom) {
      animateCfg = geom.get('animateCfg');
    }
  }
  if (animateCfg) {
    cfg = Util.mix({}, defaultCfg, animateCfg[animationType]);
  } else {
    cfg = defaultCfg;
  }
  return cfg;
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

function getDiffAttrs(newAttrs, oldAttrs) {
  const result = {};

  for (const k in newAttrs) {
    if (!Util.isEqual(newAttrs[k], oldAttrs[k])) {
      result[k] = oldAttrs[k];
    }
  }
  return result;
}

function addAnimate(cache, shapes, canvas, coord, isUpdate) {
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
        result.set('cacheAttrs', cacheShape);
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
      animateCfg = getAnimateCfg(deletedShape.name, 'leave', deletedShape);
      animate = getAnimate(deletedShape.name, coord, 'leave', animateCfg.animation);
      if (Util.isFunction(animate)) {
        const tempShape = canvas.addShape(deletedShape.type, {
          attrs: deletedShape.attrs
        });
        tempShape._id = deletedShape._id;
        tempShape.name = deletedShape.name;
        animate(tempShape, animateCfg, coord);
      }
    });

    Util.each(updateShapes, updateShape => {
      animateCfg = getAnimateCfg(updateShape.name, 'update', updateShape);
      animate = getAnimate(updateShape.name, coord, 'update', animateCfg.animation);
      if (Util.isFunction(animate)) {
        animate(updateShape, animateCfg, coord);
      } else {
        const cacheAttrs = updateShape.get('cacheAttrs').attrs;
        const diffAttrs = getDiffAttrs(updateShape.__attrs, cacheAttrs);
        updateShape.animate(diffAttrs, animateCfg.duration, animateCfg.easing, function() {
          updateShape.set('cacheAttrs', null);
        });
      }
    });

    Util.each(newShapes, newShape => {
      animateCfg = getAnimateCfg(newShape.name, 'enter', newShape);
      animate = getAnimate(newShape.name, coord, 'enter', animateCfg.animation);
      if (Util.isFunction(animate)) {
        animate(newShape, animateCfg, coord);
      }
    });
  } else {
    Util.each(shapes, shape => {
      animateCfg = getAnimateCfg(shape.name, 'appear', shape);
      animate = getAnimate(shape.name, coord, 'appear', animateCfg.animation);
      if (Util.isFunction(animate)) {
        animate(shape, animateCfg, coord);
      }
    });
  }
}


module.exports = {
  shapeAnimation(canvas, container, coord, isUpdate) {
    const caches = canvas.get('caches') || [];
    const shapes = getShapes(container);
    canvas.set('caches', cache(shapes));
    addAnimate(caches, shapes, canvas, coord, isUpdate);
    // 无论是否执行动画，都调用一次 draw()
    canvas.draw();
  }
};
