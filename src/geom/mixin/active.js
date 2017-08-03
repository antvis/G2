const Util = require('../../util');
const FIELD_ORIGIN = '_origin';

function isChange(preShapes, shapes) {
  if (!preShapes) {
    return true;
  }

  if (preShapes.length !== shapes.length) {
    return true;
  }

  let rst = false;
  Util.each(shapes, (shape, index) => {
    if (!Util.isEqual(shape, preShapes[index])) {
      rst = true;
      return false;
    }
  });
  return rst;
}


const ActiveMixin = {
  _onPlotmove(ev) {
    const self = this;
    const view = self.get('view');
    const canvas = view.get('canvas');
    const type = Util.lowerFirst(self.get('type'));
    const point = {
      x: ev.x,
      y: ev.y
    };
    let shapes;
    if (Util.inArray([ 'line', 'path' ], type) || !self.isShareTooltip()) {
      shapes = self.getSingleShapeByPoint(point);
    } else if (type !== 'area') {
      shapes = self.getGroupShapesByPoint(point);
    }

    if (shapes) {
      self.setShapesActived(shapes);
    } else {
      if (self.get('activeShapes')) {
        self.clearActivedShapes();
        canvas.draw();
      }
    }
  },
  _bindActiveAction() {
    const self = this;
    const view = self.get('view');
    view.on('plotmove', Util.wrapBehavior(self, '_onPlotmove'));
  },
  _offActiveAction() {
    const self = this;
    const view = self.get('view');
    view.off('plotmove', Util.getWrapBehavior(self, '_onPlotmove'));
  },
  _setActiveShape(shape) {
    const self = this;
    const shapeData = shape.get('origin');
    let shapeName = shapeData.shape || self.getDefaultValue('shape');
    if (Util.isArray(shapeName)) {
      shapeName = shapeName[0];
    }
    const shapeFactory = self.get('shapeFactory');
    const shapeCfg = Util.mix({}, shape.__attrs, {
      origin: shapeData
    });
    const activeCfg = shapeFactory.getActiveCfg(shapeName, shapeCfg);
    Util.mix(shape.__attrs, activeCfg);
    shape.setZIndex(1); // 提前
  },
  setShapesActived(shapes) {
    const self = this;
    const type = self.get('type');
    if (!Util.isArray(shapes)) {
      shapes = [ shapes ];
    }

    const preShapes = self.get('preShapes'); // 获取上次被激活的 shapes
    if (!isChange(preShapes, shapes)) {
      return;
    }
    if (preShapes) {
      self.clearActivedShapes(); // 先清除激活元素
    }
    const view = self.get('view');
    const canvas = view.get('canvas');
    const container = self.get('container');
    Util.each(shapes, shape => {
      if (!shape.get('_originAttrs')) {
        shape.set('_originAttrs', Util.cloneDeep(shape.__attrs)); // 缓存原来的属性，由于 __attrs.matrix 是数组，所以此处需要深度复制
      }
      if (shape.get('visible') && !shape.get('selected')) {
        self._setActiveShape(shape);
      }
    });
    // 抛出事件
    view.emit(type + ':active', {
      geom: self,
      shapes
    });
    self.set('activeShapes', shapes);
    self.set('preShapes', shapes);
    container.sort();
    canvas.draw();
  },
  clearActivedShapes() {
    const self = this;
    const container = self.get('container');
    if (container && !container.get('destroyed')) {
      const activeShapes = self.get('activeShapes');
      Util.each(activeShapes, activeShape => {
        if (!activeShape.get('selected')) {
          const originAttrs = activeShape.get('_originAttrs');
          activeShape.__attrs = Util.cloneDeep(originAttrs);
          activeShape.setZIndex(0);
        }
      });
      const preHighlightShapes = self.get('preHighlightShapes');
      if (preHighlightShapes) {
        const shapes = self.getShapes();
        Util.each(shapes, shape => {
          if (!shape.get('selected')) {
            const originAttrs = shape.get('_originAttrs');
            shape.__attrs = Util.cloneDeep(originAttrs);
            shape.setZIndex(0);
          }
        });
      }
      // 恢复原来排序
      const children = self.getShapes();
      children.sort((obj1, obj2) => {
        return obj1._INDEX - obj2._INDEX;
      });

      self.set('activeShapes', null);
      self.set('preShapes', null);
      self.set('preHighlightShapes', null);
    }
  },
  getGroupShapesByPoint(point) {
    const self = this;
    const container = self.get('container');
    const activeShapes = [];
    if (container) {
      const xField = self.getXScale().field;
      const shapes = self.getShapes();
      const originObj = self._getOriginByPoint(point);
      Util.each(shapes, shape => {
        const origin = shape.get('origin');
        if (shape.get('visible') && origin) { // 有可能不是图形，而是label文本，所以判断一下
          const shapeXValue = origin[FIELD_ORIGIN][xField];
          if (shapeXValue === originObj[xField]) {
            activeShapes.push(shape);
          }
        }
      });
    }
    return activeShapes;
  },
  getSingleShapeByPoint(point) {
    const self = this;
    const container = self.get('container');
    const canvas = container.get('canvas');
    const pixelRatio = canvas.get('pixelRatio');
    let result;
    if (container) {
      result = container.getShape(point.x * pixelRatio, point.y * pixelRatio);
    }

    if (result && result.get('origin')) {
      return result;
    }

  },
  highlightShapes(highlightShapes, highlightCfg) {
    const self = this;
    if (!Util.isArray(highlightShapes)) {
      highlightShapes = [ highlightShapes ];
    }

    const preHighlightShapes = self.get('preHighlightShapes'); // 获取上次被激活的 shapes
    if (!isChange(preHighlightShapes, highlightShapes)) {
      return;
    }

    if (preHighlightShapes) {
      self.clearActivedShapes();
    }

    const shapes = self.getShapes();

    Util.each(shapes, shape => {
      if (!shape.get('_originAttrs')) {
        shape.set('_originAttrs', Util.cloneDeep(shape.__attrs)); // 缓存原来的属性
      }
      if (Util.indexOf(highlightShapes, shape) !== -1) {
        shape.__attrs = Util.mix({}, shape.get('_originAttrs'), highlightCfg);
        shape.setZIndex(1); // 提前
      } else {
        Util.mix(shape.__attrs, {
          fill: '#fff',
          fillOpacity: 0.3,
          strokeOpacity: 0.3,
          stroke: '#fff'
        });
        shape.setZIndex(0);
      }
    });
    self.set('preHighlightShapes', highlightShapes);
    self.set('activeShapes', highlightShapes);
  }
};

module.exports = ActiveMixin;
