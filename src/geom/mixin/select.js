/**
 * @fileOverview the interaction when geom was selected
 * @author sima.zhang
 */

const Util = require('../../util');
const FIELD_ORIGIN = '_origin';
const ZIndexUtil = require('./zindex-util');

function isSameShape(shape1, shape2) {
  if (Util.isNil(shape1) || Util.isNil(shape2)) {
    return false;
  }
  const shape1Origin = shape1.get('origin');
  const shape2Origin = shape2.get('origin');
  return Util.isEqual(shape1Origin, shape2Origin);
}

function getOriginAttrs(selectedCfg, shape) {
  const originAttrs = {};
  Util.each(selectedCfg, (v, k) => {
    if (k === 'transform') {
      k = 'matrix';
    }
    let originValue = shape.attr(k);
    if (Util.isArray(originValue)) {
      originValue = Util.cloneDeep(originValue);// 缓存原来的属性，由于 .attr('matrix') 是数组，所以此处需要深度复制
    }
    originAttrs[k] = originValue;
  });
  return originAttrs;
}

const SelectMixin = {
  _isAllowSelect() {
    const isAllowSelect = this.get('allowSelect');
    if (Util.isNil(isAllowSelect)) {
      const type = this.get('type');
      const coord = this.get('coord');
      const coordType = coord && coord.type;

      if (type === 'interval' && coordType === 'theta') { // 饼图默认可以进行选中
        return true;
      }
    } else { // 用户设置了 select 配置
      return isAllowSelect;
    }

    return false;
  },
  _onClick(ev) {
    const self = this;
    if (self._isAllowSelect()) { // 允许选中下才执行
      // self.clearActivedShapes(); // 不需要清除hover效果
      const shape = ev.shape;
      const shapeContainer = self.get('shapeContainer');
      if (shape && shapeContainer.contain(shape)) { // 去除 !shape.get('animating') 的判定，点击反馈更加及时
        self.setShapeSelected(shape);
      }
    }
  },
  _bindSelectedAction() {
    const self = this;
    const view = self.get('view');
    const type = self.get('type');
    view.on(type + ':click', Util.wrapBehavior(self, '_onClick'));
  },
  _offSelectedAction() {
    const self = this;
    const view = self.get('view');
    const type = self.get('type');
    view.off(type + ':click', Util.getWrapBehavior(self, '_onClick'));
  },
  _setShapeStatus(shape, status) {
    const self = this;
    const view = self.get('view');
    const selectedOptions = self.get('selectedOptions') || {};
    const animate = selectedOptions.animate !== false; // 默认允许动画
    const canvas = view.get('canvas');

    shape.set('selected', status);
    const shapeData = shape.get('origin');

    if (status) { // 选中状态
      let shapeName = shapeData.shape || self.getDefaultValue('shape');
      if (Util.isArray(shapeName)) {
        shapeName = shapeName[0];
      }
      const shapeFactory = self.get('shapeFactory');
      const cfg = Util.mix({
        geom: self,
        point: shapeData
      }, selectedOptions);
      const selectedStyle = shapeFactory.getSelectedCfg(shapeName, cfg);
      Util.mix(selectedStyle, cfg.style); // 用户设置的优先级更高

      if (!shape.get('_originAttrs')) { // 缓存原有属性
        if (shape.get('animating')) { // 停止动画
          shape.stopAnimate();
        }
        shape.set('_originAttrs', getOriginAttrs(selectedStyle, shape));
      }
      // 选中时图形要到最上面
      if (selectedOptions.toFront) {
        ZIndexUtil.toFront(shape);
      }

      if (animate) {
        shape.animate(selectedStyle, 300);
      } else {
        shape.attr(selectedStyle);
        canvas.draw();
      }
    } else {
      const originAttrs = shape.get('_originAttrs');
      // 取消选中时，要恢复到原先的位置
      if (selectedOptions.toFront) {
        ZIndexUtil.resetZIndex(shape);
      }
      shape.set('_originAttrs', null);
      if (animate) {
        shape.animate(originAttrs, 300);
      } else {
        shape.attr(originAttrs);
        canvas.draw();
      }
    }
  },
  setShapeSelected(shape) {
    const self = this;
    const selectedShapes = self._getSelectedShapes();
    const selectedOptions = self.get('selectedOptions') || {};
    const cancelable = selectedOptions.cancelable !== false; // 选中状态是否允许取消，默认允许
    if (selectedOptions.mode === 'multiple') { // 支持多选
      if (Util.indexOf(selectedShapes, shape) === -1) {
        selectedShapes.push(shape);
        self._setShapeStatus(shape, true);
      } else if (cancelable) { // 图形已经被选中并且选中状态允许取消选中
        Util.Array.remove(selectedShapes, shape);
        self._setShapeStatus(shape, false);
      }
    } else {
      const selectedShape = selectedShapes[0];
      if (cancelable) { // 如果允许取消，则选中null
        shape = isSameShape(selectedShape, shape) ? null : shape;
      }
      if (!isSameShape(selectedShape, shape)) {
        if (selectedShape) {
          self._setShapeStatus(selectedShape, false);
        }
        if (shape) {
          self._setShapeStatus(shape, true);
        }
      }
    }
  },
  clearSelected() {
    const self = this;
    const shapeContainer = self.get('shapeContainer');
    if (shapeContainer && !shapeContainer.get('destroyed')) {
      const selectedShapes = self._getSelectedShapes();
      Util.each(selectedShapes, shape => {
        self._setShapeStatus(shape, false);
        shape.set('_originAttrs', null);
      });
    }
  },
  /**
   * 设置记录对应的图形选中
   * @param {Object} record 选中的记录
   * @chainable
   * @return {Geom} 返回当前的 Geometry
   */
  setSelected(record) {
    const self = this;
    const shapes = self.getShapes();
    Util.each(shapes, shape => {
      const origin = shape.get('origin');
      if (origin && origin[FIELD_ORIGIN] === record) {
        self.setShapeSelected(shape);
      }
    });
    return this;
  },
  _getSelectedShapes() {
    const self = this;
    const shapes = self.getShapes();
    const selectedShapes = [];

    Util.each(shapes, shape => {
      if (shape.get('selected')) {
        selectedShapes.push(shape);
      }
    });
    self.set('selectedShapes', selectedShapes);
    return selectedShapes;
  }
};

module.exports = SelectMixin;
