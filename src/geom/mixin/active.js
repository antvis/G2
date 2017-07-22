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
  _bindActiveAction() {
    const self = this;
    const view = self.get('view');
    const canvas = view.get('canvas');
    const type = Util.lowerFirst(self.get('type'));
    view.on('plotmove', ev => {
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
        ev.activeShape = shapes;
        ev.geom = self;
        self.setShapesActived(shapes);
        // view.emit(type + ':active', ev);
      } else {
        if (self.get('activeShapes')) {
          self.clearActivedShapes();
          canvas.draw();
        }
      }
    });
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
    if (!shape.get('_originAttrs')) {
      shape.set('_originAttrs', Util.mix({}, shape.__attrs)); // 缓存原来的属性
    }
    Util.mix(shape.__attrs, activeCfg);
    shape.set('zIndex', 1, false); // 提前
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
      if (shape.get('visible')) {
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
    const activeShapes = self.get('activeShapes');
    Util.each(activeShapes, activeShape => {
      const originAttrs = activeShape.get('_originAttrs');
      activeShape.__attrs = Util.mix({}, originAttrs);
      activeShape.set('zIndex', 0, false);
    });
    const preHighlightShapes = self.get('preHighlightShapes');
    if (preHighlightShapes) {
      const shapes = container.get('children');
      Util.each(shapes, shape => {
        const originAttrs = shape.get('_originAttrs');
        shape.__attrs = Util.mix({}, originAttrs);
        shape.set('zIndex', 0, false);
      });
    }
    // 恢复原来排序
    const children = container.get('children');
    children.sort((obj1, obj2) => {
      return obj1._INDEX - obj2._INDEX;
    });

    self.set('activeShapes', null);
    self.set('preShapes', null);
    self.set('preHighlightShapes', null);
  },
  getGroupShapesByPoint(point) {
    const self = this;
    const container = self.get('container');
    const activeShapes = [];
    if (container) {
      const xField = self.getXScale().field;
      const shapes = container.get('children');
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
    return result;
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

    const container = self.get('container');
    const shapes = container.get('children');

    Util.each(shapes, shape => {
      if (!shape.get('_originAttrs')) {
        shape.set('_originAttrs', Util.mix({}, shape.__attrs)); // 缓存原来的属性
      }
      if (Util.indexOf(highlightShapes, shape) !== -1) {
        shape.__attrs = Util.mix({}, shape.get('_originAttrs'), highlightCfg);
        shape.set('zIndex', 1, false); // 提前
      } else {
        Util.mix(shape.__attrs, {
          fill: '#fff',
          fillOpacity: 0.3,
          strokeOpacity: 0.3,
          stroke: '#fff'
        });
        shape.set('zIndex', 0, false);
      }
    });
    self.set('preHighlightShapes', highlightShapes);
    self.set('activeShapes', highlightShapes);
  }
};

module.exports = ActiveMixin;
