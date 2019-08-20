/*
 * The entry of chart's animation
 */
import * as _ from '@antv/util';
import { mat3 } from '@antv/matrix-util';
import {
  Group,
  Shape,
  Element as GElement,
} from '@antv/g';
import Animate from './animate';
import Element from '../element/base';
import { CacheType, AnimateCFG } from './interface';

/*
 * 获取图组内所有的shapes
 */
function getShapes(container: Group, viewId: string): Shape[] {
  let shapes = [];
  if (container.get('animate') === false) {
    return [];
  }
  const children: GElement[] = container.get('children');
  _.each(children, (child: Group | Shape) => {
    // 这里child定义为Group|Shape后，tslint会报错。根源解决需要在g -> element类增加isGroup/isShape/id属性。这里暂时忽略tslint
    // @ts-ignore
    if (child.isGroup) {
      // @ts-ignore
      shapes = shapes.concat(getShapes(child, viewId));
      // @ts-ignore
    } else if (child.isShape && child.id) {
      // @ts-ignore
      let id = child.id;
      id = id.split('-')[0];
      if (id === viewId) {
        shapes.push(child);
      }
    }
  });
  return shapes;
}
/**
 * collect shape info.
 * @param shapes
 */
function cache(shapes: Shape[]): CacheType {
  const rst = {};
  _.each(shapes, (shape) => {
    if (!shape.id || shape.get('isClip')) return;
    const id = shape.id;
    rst[id] = {
      id,
      type: shape.get('type'),
      attrs: _.clone(shape.attr()),
      // 原始属性
      name: shape.name,
      index: shape.get('index'),
      animateCfg: shape.get('animateOptions'),
      coord: shape.get('coord'),
    };
  });
  return rst;
}

function getAnimate(elementType: string, coord, animationType, animationName) {
  let result = {};
  if (animationName) {
    result = Animate.Action[animationType][animationName];
  } else {
    result = Animate.getAnimation(elementType, coord, animationType);
  }
  return result;
}

function getAnimateCfg(elementType: string, animationType, animateCfg): AnimateCFG {
  // .animate(false) 或者 .animate({ appear: false });
  if (animateCfg === false || (_.isObject(animateCfg) && (animateCfg[animationType] === false))) {
    return null;
  }
  const defaultCfg = Animate.getAnimateCfg(elementType, animationType);
  if (animateCfg && animateCfg[animationType]) {
    return _.deepMix(
      {},
      defaultCfg,
      animateCfg[animationType],
    );
  }
  return defaultCfg;
}

/**
 * canvas draw之前将动画配置添加到动画队列中。
 * @return canvasDrawn(boolean) 是否添加绘制成功
 */
function addAnimate(cache: CacheType, shapes: Shape[], canvas) {
  let animate;
  let animateCfg;
  let canvasDrawn = false;

  // Step: leave -> update -> enter
  const updateShapes = []; // 存储的是 shapes
  const newShapes = []; // 存储的是 shapes
  _.each(shapes, (shape) => {
    const result = cache[shape.id];
    if (!result) {
      newShapes.push(shape);
    } else {
      shape.setSilent('cacheShape', result);
      updateShapes.push(shape);
      delete cache[shape.id];
    }
  });

  _.each(cache, (deletedShape) => {
    const {
      name,
      coord,
      id,
      attrs,
      index,
      type,
    } = deletedShape;
    animateCfg = getAnimateCfg(name, 'leave', deletedShape.animateCfg);
    if (!animateCfg) return true; // 用户关闭动画

    animate = getAnimate(name, coord, 'leave', animateCfg.animation);
    if (_.isFunction(animate)) {
      const tempShape = canvas.addShape(type, {
        attrs,
        index,
      });
      tempShape.id = id;
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

  _.each(updateShapes, (updateShape) => {
    const name = updateShape.name;

    animateCfg = getAnimateCfg(name, 'update', updateShape.get('animateOptions'));
    if (!animateCfg) return true; // 用户关闭动画

    const coord = updateShape.get('coord');
    const cacheAttrs = updateShape.get('cacheShape').attrs;
    // 判断如果属性相同的话就不进行变换
    if (!_.isEqual(cacheAttrs, updateShape.attr())) {
      animate = getAnimate(name, coord, 'update', animateCfg.animation);
      if (_.isFunction(animate)) {
        animate(updateShape, animateCfg, coord);
      } else {
        const endState = _.clone(updateShape.attr());
        updateShape.attr(cacheAttrs);
        updateShape.animate(endState, animateCfg.duration, animateCfg.easing, () => {
          updateShape.setSilent('cacheShape', null);
        });
      }
      canvasDrawn = true;
    }
  });

  _.each(newShapes, (newShape) => {
    const name = newShape.name;
    const coord = newShape.get('coord');

    animateCfg = getAnimateCfg(name, 'enter', newShape.get('animateOptions'));
    if (!animateCfg) return true; // 用户关闭动画

    animate = getAnimate(name, coord, 'enter', animateCfg.animation);
    if (_.isFunction(animate)) {
      animate(newShape, animateCfg, coord);
      canvasDrawn = true;
    }
  });

  return canvasDrawn;
}

/**
 * 动画模块唯一对外暴露接口
 * @param view
 * @param isUpdate
 */
function execAnimation(view, isUpdate?: boolean) {
  let newIsUpdate = isUpdate; // eslint: no-param-reassign
  const panelGroup = view.get('panelGroup');
  const backgroundGroup = view.get('backgroundGroup');
  const viewId = view.get('id');
  const canvas = view.get('canvas');
  const caches = canvas.get(`${viewId}caches`) || [];

  if (caches.length === 0) {
    newIsUpdate = false;
  }
  const shapes: Shape[] = getShapes(panelGroup, viewId);
  const axisShapes: Shape[] = getShapes(backgroundGroup, viewId);
  const cacheShapes = shapes.concat(axisShapes);
  canvas.setSilent(`${viewId}caches`, cache(cacheShapes));
  let drawn;

  if (newIsUpdate) { // 执行更新动画
    drawn = addAnimate(caches, cacheShapes, canvas);
  } else { // 初入场动画
    // drawn = addAnimate(caches, shapes, canvas, newIsUpdate);
    let animateCfg;
    let animate;
    const elements = view.get('elements');
    const coord = view.get('coord');
    _.each(elements, (element: Element) => {
      const type = element.get('type');
      const elementAnimateOption = element.get('animateOptions');
      if (elementAnimateOption !== false) { // 用户为关闭动画
        animateCfg = getAnimateCfg(type, 'appear', elementAnimateOption);
        if (!animateCfg) return true; // 用户关闭了初始动画

        animate = getAnimate(type, coord, 'appear', animateCfg.animation);
        if (_.isFunction(animate)) {
          if ((animate.name).indexOf('group') === 0) { // 执行全局动画
            const yScale = element.getYScale();
            const zeroY = coord.convertPoint({
              x: 0,
              y: yScale.scale(element.getYMinValue()),
            });

            const container = element.get('container');
            animate && animate(container, animateCfg, coord, zeroY);
          } else {
            const shapes = getShapes(element.get('container'), viewId);
            _.each(shapes, (shape) => {
              if (shape.name === type) { // element shapes 上的动画
                animate(shape, animateCfg, coord);
              } else if (shape.name === 'label') {
                animateCfg = getAnimateCfg('label', 'appear', null);
                animate = getAnimate(shape.name, coord, 'appear', animateCfg.animation);
                if (_.isFunction(animate)) {
                  animate(shape, animateCfg, coord);
                }
              }
            });
          }
        }
      }
    });

    drawn = true;
  }
  if (!drawn) {
    canvas.draw();
  }
}

export default {
  execAnimation,
};
