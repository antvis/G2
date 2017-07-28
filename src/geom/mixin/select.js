const Util = require('../../util');

const SelectMixin = {
  _onPlotclick(ev) {
    const self = this;
    let shape = ev.shape;
    self.clearActivedShapes(); // 清除hover效果

    if (!shape) {
      const point = { x: ev.x, y: ev.y };
      shape = self.getSingleShapeByPoint(point);
    }
    if (shape) {
      ev.shape = shape;
      ev.data = shape.get('origin');
      if (self.isSelectable()) { // 允许选中
        self.setShapeSelected(shape);
      }
    }
  },
  _bindSelectedAction() {
    const self = this;
    const view = self.get('view');
    view.on('plotclick', Util.wrapBehavior(self, '_onPlotclick'));
  },
  _offSelectedAction() {
    const self = this;
    const view = self.get('view');
    view.off('plotclick', Util.getWrapBehavior(self, '_onPlotclick'));
  },
  isSelectable() {
    const type = this.get('type');
    const coord = this.get('coord');
    const coordType = coord && coord.type;
    let selectable = this.get('selectable');

    if (this.get('selectedOptions') && this.get('selectedOptions').mode !== false) {
      selectable = true;
    }

    if (type === 'interval' && coordType === 'theta') { // 饼图默认可以进行选中
      selectable = true;
      if (this.get('selectedOptions') && this.get('selectedOptions').mode === false) {
        selectable = false;
      }
    }

    return selectable;
  },
  _getSelectedShapes() {
    const self = this;
    const container = self.get('container');
    const shapes = container.get('children');
    const selectedShapes = [];

    Util.each(shapes, shape => {
      if (shape.get('selected')) {
        selectedShapes.push(shape);
      }
    });
    self.set('selectedShapes', selectedShapes);

    return selectedShapes;
  },
  _setShapeStatus(shape, status) {
    const self = this;
    const view = self.get('view');
    const type = self.get('type');
    const selectedOptions = self.get('selectedOptions') || {};
    const animate = view.get('animate'); // 由 view 控制是否执行动画
    let originAttrs;

    shape.set('selected', status);
    const shapeData = shape.get('origin');

    if (status) {
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
        originAttrs = Util.mix({}, shape.get('_originAttrs'));
        shape.set('_originAttrs', originAttrs);
      } else {
        originAttrs = shape.get('_originAttrs');
      }

      if (animate) {
        shape.animate(selectedStyle, 300);
      } else {
        shape.attr(selectedStyle);
        shape.get('canvas').draw();
      }

      view.emit(type + ':selected', {
        geom: self,
        shape,
        data: shapeData,
        view
      });
    } else {
      originAttrs = shape.get('_originAttrs');

      if (animate) {
        shape.animate(originAttrs, 300);
      } else {
        shape.attr(originAttrs);
        shape.get('canvas').draw();
      }

      view.emit(type + ':unselected', {
        geom: self,
        shape,
        data: shapeData,
        view
      });
    }
  },
  setShapeSelected(shape) {
    const self = this;
    const selectedShapes = self._getSelectedShapes();
    const selectedOptions = self.get('selectedOptions') || {};
    if (selectedOptions.mode === 'multiple') {
      if (Util.indexOf(selectedShapes, shape) === -1) {
        selectedShapes.push(shape);
        self._setShapeStatus(shape, true);
      } else {
        Util.Array.remove(selectedShapes, shape);
        self._setShapeStatus(shape, false);
      }
    } else {
      const cancelable = selectedOptions.cancelable !== false;
      const selectedShape = selectedShapes[0];
      if (cancelable) { // 如果允许取消，则选中null
        shape = selectedShape === shape ? null : shape;
      }
      if (selectedShape !== shape) {
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
    const container = self.get('container');
    if (container && !container.get('destroyed')) {
      const selectedShapes = self._getSelectedShapes();
      Util.each(selectedShapes, function(shape) {
        self._setShapeStatus(shape, false);
      });
    }
  }
};

module.exports = SelectMixin;
