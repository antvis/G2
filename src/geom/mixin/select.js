const Util = require('../../util');

const SelectMixin = {
  _bindSelectedAction() {
    const self = this;
    const type = self.get('type');
    const view = self.get('view');
    view.on('plotclick', ev => {
      let shape = ev.shape;
      if (!shape) {
        const point = { x: ev.x, y: ev.y };
        shape = self.getSingleShapeByPoint(point);
      }
      if (shape) {
        ev.shape = shape;
        ev.data = shape.get('origin');
        view.emit(type + ':click', ev);
        if (self.isSelectable()) { // 允许选中
          self.setShapeSelected(shape);
        }
        // self.get();
      }
    });
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
  // setSelectedStatus(shape, status) {
  //   const self = this;
  //   const view = self.get('view');
  //   const canvas = view.get('canvas');

  //   const selectedOptions = self.get('selectedOptions') || {};
  //   const originCfg = {};
  //   if (status) {
  //     const origin = shape.get('origin');
  //     const cfg = Util.mix({
  //       geom: self,
  //       coord: shape.get('parent').get('coord'),
  //       point: origin
  //     }, selectedOptions);

  //     const shapeName = origin.shape || self.getDefaultValue('shape');
  //     const shapeFactory = self.get('shapeFactory');
  //     const selectedCfg = shapeFactory.getSelectedCfg(shapeName, cfg);

  //     // TODO 选中效果渲染
  //   }

  //   self.clearActivedShapes(); // 清除hover效果
  //   canvas.draw();
  // },
  _setShapeStatus(shape, status) {
    shape.set('selected', status);
    // this.setSelectedStatus(shape, status);
  },
  setShapeSelected(shape) {
    const self = this;
    const view = self.get('view');
    const type = self.get('type');
    const selectedShapes = self._getSelectedShapes();
    const selectedOptions = self.get('selectedOptions') || {};
    if (selectedOptions.mode === 'multiple') {
      if (Util.indexOf(selectedShapes, shape) === -1) {
        selectedShapes.push(shape);
        self._setShapeStatus(shape, true);
        view.emit(type + ':selected', {
          shape,
          data: shape.get('origin'),
          view,
          geom: self
        });
      } else {
        Util.Array.remove(selectedShapes, shape);
        self._setShapeStatus(shape, false);
        view.emit(type + ':unselected', {
          shape,
          data: shape.get('origin'),
          view,
          geom: self
        });
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
          view.emit(type + ':unselected', {
            shape: selectedShape,
            data: selectedShape.get('origin'),
            view,
            geom: self
          });
        }
        if (shape) {
          self._setShapeStatus(shape, true);
          view.emit(type + ':selected', {
            shape,
            data: shape.get('origin'),
            view,
            geom: self
          });
        }
      }
    }
  },
  clearSelected() {
    const self = this;
    const selectedShapes = self._getSelectedShapes();
    Util.each(selectedShapes, function(shape) {
      self._setShapeStatus(shape, false);
    });
  }
};

module.exports = SelectMixin;
