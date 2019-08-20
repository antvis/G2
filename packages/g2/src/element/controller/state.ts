/**
 * @description Element 上响应 shape 状态的改变
 */
import * as _ from '@antv/util';
import Element from '../base';
import { Shape } from '@antv/g';

const FIELD_ORIGIN = '_origin';

// 通过 shape 上的原始数据来判断两个 shape 是否相同
function _isSameShape(shape1, shape2) {
  if (_.isNil(shape1) || _.isNil(shape2)) {
    return false;
  }
  const shape1Origin = shape1.get('origin');
  const shape2Origin = shape2.get('origin');
  return _.isEqual(shape1Origin, shape2Origin);
}

function isChange(preShapes, shapes) {
  if (!preShapes) {
    return true;
  }

  if (preShapes.length !== shapes.length) {
    return true;
  }

  let rst = false;
  _.each(shapes, (shape, index) => {
    if (!_isSameShape(shape, preShapes[index])) {
      rst = true;
      return false;
    }
  });
  return rst;
}

function getOriginAttrs(modifiedAttrs, originAttrs) {
  const result = {};
  _.each(modifiedAttrs, (v, k) => {
    let originValue = originAttrs[k];
    if (_.isArray(originValue)) {
      originValue = originValue.concat(); // 缓存原来的属性，由于 .attr('matrix') 是数组，所以此处需要深度复制
    }
    result[k] = originValue;
  });
  return result;
}

export default class StateController {
  readonly element: Element = null;
  private _activeShapes: Shape[] = null;
  private _selectedShapes: Shape[] = null;
  private _inactiveShapes: Shape[] = null;

  constructor(element) {
    this.element = element;
  }

  bind() {
    const element = this.element;
    const view = element.get('view');
    view.on('active:change', _.wrapBehavior(this, '_onActive'));
    view.on('selected:change', _.wrapBehavior(this, '_onSelected'));
    view.on('inactive:change', _.wrapBehavior(this, '_onInactive'));
  }

  unbind() {
    const element = this.element;
    const view = element.get('view');
    view.off('active:change', _.getWrapBehavior(this, '_onActive'));
    view.off('selected:change', _.getWrapBehavior(this, '_onSelected'));
    view.off('inactive:change', _.getWrapBehavior(this, '_onInactive'));
  }

  private _onActive(activeObject) {
    const element = this.element;
    const activeOptions = element.get('activeOptions');
    if (activeOptions === false) { // element.active(false); 不允许 active
      return;
    }
    const shapeContainer = element.get('shapeContainer');

    const { exp, draw } = activeObject;
    const activeShapes = this._filterShapes(exp);

    // 判断是否同上一次 activeShapes 相同，相同则不需要处理
    const preActiveShapes = this._activeShapes;
    if (!isChange(preActiveShapes, activeShapes)) {
      return;
    }

    if (preActiveShapes) {
      this._clearActiveShapes();
    }
    this._clearInactiveShapes(); // active 和 inactive 互斥，故需要清空

    activeShapes.forEach((activeShape) => {
      if (activeShape.get('animating')) {
        activeShape.stopAnimate();
      }

      this._setShapeActive(activeShape);
    });

    this._activeShapes = activeShapes;
    shapeContainer.sort();

    draw && this._draw();
  }

  // 清空原先 active 状态的 shapes
  private _clearActiveShapes() {
    const shapes = this._activeShapes;
    _.each(shapes, (shape: Shape) => {
      const originAttrs = shape.get('_beforeActiveAttrs');
      shape.attr(originAttrs);
      shape.setZIndex(0);
      shape.set('_beforeActiveAttrs', null);
    });

    // 恢复原来排序
    const shapeContainer = this.element.get('shapeContainer');
    const children = shapeContainer.get('children');
    children.sort((obj1, obj2) => {
      return obj1._INDEX - obj2._INDEX;
    });
    this._activeShapes = null;
  }

  private _setShapeActive(shape) {
    const activeStyle = this._getShapeStyleByState(shape, 'active');
    // active 是基于当前 shape 的样式进行变化
    const originAttrs = getOriginAttrs(activeStyle, shape.attr());
    shape.setSilent('_beforeActiveAttrs', originAttrs);

    shape.attr(activeStyle);
    shape.setZIndex(1); // 将 activeShapes 图层提前
  }

  private _onSelected(selectedObj) {
    const selectedOptions = this.element.get('selectedOptions');
    if (selectedOptions === false) { // element.active(false); 不允许 active
      return;
    }
    const { exp, draw } = selectedObj;
    const selectedShapes = this._filterShapes(exp);

    // 判断是否同上一次 selectedShapes 相同，相同则不需要处理
    const preSelectedShapes = this._selectedShapes;
    if (!isChange(preSelectedShapes, selectedShapes)) {
      return;
    }

    if (preSelectedShapes) {
      this._clearSelectedShapes();
    }
    this._clearInactiveShapes(); // selected 和 inactive 互斥，故需要清空

    selectedShapes.forEach((shape) => {
      if (shape.get('animating')) {
        shape.stopAnimate();
      }

      this._setShapeSelected(shape);
    });
    this._selectedShapes = selectedShapes;

    draw && this._draw();
  }

  private _clearSelectedShapes() {
    const shapes = this._selectedShapes;
    _.each(shapes, (shape: Shape) => {
      shape.set('selected', false);
      if (!shape.get('inactive')) {
        const originAttrs = shape.get('_originAttrs');
        shape.attr(originAttrs);
        shape.set('_originAttrs', null);
      }
    });
    this._selectedShapes = null;
  }

  private _setShapeSelected(shape) {
    shape.set('selected', true);
    const selectedStyle = this._getShapeStyleByState(shape, 'selected');
    this._applyShapeStyle(shape, selectedStyle);
  }

  private _onInactive(inactiveObj) {
    const inactiveOptions = this.element.get('inactiveOptions');
    if (inactiveOptions === false) { // element.active(false); 不允许 active
      return;
    }
    const { exp, draw } = inactiveObj;
    const inactiveShapes = this._filterShapes(exp);

    // 判断是否同上一次 _inactiveShapes 相同，相同则不需要处理
    const preinactiveShapes = this._inactiveShapes;
    if (!isChange(preinactiveShapes, inactiveShapes)) {
      return;
    }

    if (preinactiveShapes) {
      this._clearInactiveShapes();
    }

    inactiveShapes.forEach((shape) => {
      if (shape.get('animating')) {
        shape.stopAnimate();
      }

      this._setShapeInactive(shape);
    });
    this._inactiveShapes = inactiveShapes;

    draw && this._draw();
  }

  private _clearInactiveShapes() {
    const shapes = this._inactiveShapes;
    _.each(shapes, (shape: Shape) => {
      shape.set('inactive', false);
      if (!shape.get('selected')) {
        const originAttrs = shape.get('_originAttrs');
        shape.attr(originAttrs);
        shape.set('_originAttrs', null);
      }
    });
    this._inactiveShapes = null;
  }

  private _setShapeInactive(shape) {
    shape.set('inactive', true);
    const inactiveStyle = this._getShapeStyleByState(shape, 'inactive');
    this._applyShapeStyle(shape, inactiveStyle);
  }

  private _applyShapeStyle(shape, style) {
    // 基于 shape 的初始状态
    let originAttrs = shape.get('_originAttrs');
    if (originAttrs) {
      shape.attr(originAttrs);
    }

    originAttrs = getOriginAttrs(style, shape.attr());
    shape.setSilent('_originAttrs', originAttrs);

    shape.attr(style);
  }

  private _filterShapes(exp) {
    const element = this.element;
    const shapeContainer = element.get('shapeContainer');
    const shapes = shapeContainer.get('children');

    return _.filter(shapes, (shape: Shape) => {
      if (shape.get('origin') && shape.get('visible')) {
        const origin = shape.get('origin');
        // line、area、path 这三种 element，shape 的 origin 存储的是整个序列的数据集合
        const data = _.isArray(origin) ? origin[0][FIELD_ORIGIN] : origin[FIELD_ORIGIN];
        return exp(data);
      }
    });
  }

  private _getShapeStyleByState(shape: Shape, state: string) {
    const element = this.element;
    const shapeData = shape.get('origin');
    let shapeName = shapeData.shape || element.getDefaultValue('shape');
    if (_.isArray(shapeName)) {
      shapeName = shapeName[0];
    }
    const shapeFactory = element.get('shapeFactory');
    const shapeStyle = _.mix({}, shape.attr(), {
      origin: shapeData,
    });

    if (state === 'active') {
      const activeOptions = element.get('activeOptions');
      const defaultActiveStyle = shapeFactory.getActiveStyle(shapeName, shapeStyle) || {};
      return _.mix(defaultActiveStyle, activeOptions);
    }

    if (state === 'selected') {
      const selectedOptions = element.get('selectedOptions');
      const defaultSelectedStyle = shapeFactory.getSelectedStyle(shapeName, shapeStyle) || {};
      return _.mix(defaultSelectedStyle, selectedOptions);
    }

    if (state === 'inactive') {
      const inactiveOptions = element.get('inactiveOptions');
      const defaultInactiveStyle = shapeFactory.getInactiveStyle(shapeName, shapeStyle) || {};
      return _.mix(defaultInactiveStyle, inactiveOptions);
    }

    return shapeStyle;
  }

  private _draw() {
    const canvas = this.element.get('canvas');

    // 防止因为 state 处理是异步的，在 dom 元素移除之后再处理
    if (!canvas) return;

    let drawTimer = canvas.get('_drawTimer');
    if (drawTimer) {
      clearTimeout(drawTimer);
      canvas.set('_drawTimer', null);
    }

    drawTimer = setTimeout(() => {
      canvas.draw();
    },                     16);
    canvas.set('_drawTimer', drawTimer);
  }
}
