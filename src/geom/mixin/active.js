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
        self.setShapesActived(shapes);
        view.emit(type + ':active', ev);
      } else {
        const activeGroup = self.get('activeGroup');
        if (activeGroup && activeGroup.get('children').length) { // 防止多次绘制
          self.clearActivedShapes();
          canvas.draw();
        }
      }
    });
  },
  _setActiveShape(shape, activeCfg) {
    const self = this;
    const type = shape.get('type');
    const origin = shape.get('origin');
    const activeGroup = self.get('activeGroup');
    let shapeName = origin.shape || self.getDefaultValue('shape');
    if (Util.isArray(shapeName)) {
      shapeName = shapeName[0];
    }

    const shapeFactory = self.get('shapeFactory');
    if (Util.isNil(activeCfg)) {
      activeCfg = shapeFactory.getActiveCfg(shapeName);
    }
    activeCfg.clip = null;

    const newShape = activeGroup.addShape(type, {
      attrs: Util.mix({}, shape.__attrs, activeCfg)
    });
    newShape.setMatrix(shape.getMatrix());
    newShape.set('origin', origin);
    newShape.set('geom', shape.get('geom'));
  },
  setShapesActived(shapes, activeCfg) {
    const self = this;
    if (!Util.isArray(shapes)) {
      shapes = [ shapes ];
    }

    const preShapes = self.get('preShapes'); // 获取上次被激活的 shapes
    if (!isChange(preShapes, shapes)) {
      return;
    }

    const coord = self.get('coord');
    let activeGroup = self.get('activeGroup');
    const view = self.get('view');
    const canvas = view.get('canvas'); // 避免全局刷新,在刷新层叠放一个复制的图形
    if (!activeGroup) {
      activeGroup = canvas.addGroup();
      self.set('activeGroup', activeGroup);
    } else {
      activeGroup.clear();
    }
    activeGroup.setMatrix(Util.cloneDeep(coord.matrix));

    Util.each(shapes, shape => {
      if (shape.get('visible')) {
        self._setActiveShape(shape, activeCfg);
      }
    });

    self.set('activeShapes', shapes);
    self.set('preShapes', shapes);
    // activeGroup.sort();
    canvas.sort();
    canvas.draw();
  },
  clearActivedShapes() {
    const self = this;
    const activeGroup = self.get('activeGroup');
    activeGroup && activeGroup.clear();
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
  highlightShapes(highlightShapes, filteredShapes) {
    const self = this;
    const type = self.get('type');
    const preHighlightShapes = self.get('preHighlightShapes'); // 获取上次被激活的 shapes
    if (!isChange(preHighlightShapes, highlightShapes)) {
      return;
    }

    const coord = self.get('coord');
    let activeGroup = self.get('activeGroup');
    const view = self.get('view');
    const canvas = view.get('canvas'); // 避免全局刷新,在刷新层叠放一个复制的图形
    if (!activeGroup) {
      activeGroup = canvas.addGroup();
      self.set('activeGroup', activeGroup);
    } else {
      activeGroup.clear();
    }
    activeGroup.setMatrix(Util.cloneDeep(coord.matrix));

    if (type === 'area' || type === 'line' || type === 'path') {
      Util.each(highlightShapes, highlightShape => {
        let newShape;
        if (type === 'line' || type === 'path') {
          newShape = Util.cloneDeep(highlightShape);
          newShape.attr('lineWidth', highlightShape.attr('lineWidth') + 1);
          // activeGroup.add(newShape);
        } else {
          const origin = highlightShape.get('origin');
          const path = [];
          Util.each(origin, (obj, index) => {
            if (index === 0) {
              path.push([ 'M', obj.x, Util.isArray(obj.y) ? obj.y[1] : obj.y ]);
            } else {
              path.push([ 'L', obj.x, Util.isArray(obj.y) ? obj.y[1] : obj.y ]);
            }
          });
          newShape = activeGroup.addShape('path', {
            attrs: {
              path,
              lineWidth: 2,
              stroke: highlightShape.attr('fill')
            }
          });
        }
        activeGroup.add(newShape);
      });
    } else {
      Util.each(highlightShapes, highlightShape => {
        const newShape = Util.cloneDeep(highlightShape);
        newShape.set('zIndex', 1);
        newShape.attr('fillOpacity', 1);
        activeGroup.add(newShape);
      });

      Util.each(filteredShapes, filteredShape => {
        const newShape = activeGroup.addShape(filteredShape.get('type'), {
          attrs: Util.mix({}, filteredShape.__attrs, {
            fill: '#fff',
            fillOpacity: 0.85,
            strokeOpacity: 0.85,
            stroke: '#fff'
          }),
          zIndex: 0
        });
        activeGroup.add(newShape);
      });
    }

    activeGroup.sort();
    self.set('preHighlightShapes', highlightShapes);
    canvas.draw();
  }
};

module.exports = ActiveMixin;
