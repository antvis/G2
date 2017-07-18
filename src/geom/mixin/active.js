const Util = require('../../util');
const FIELD_ORIGIN = '_origin';

function isSameShape(shape1, shape2) {
  if (Util.isNil(shape1) || Util.isNil(shape2)) {
    return false;
  }
  const shape1Origin = shape1.get('origin');
  const shape2Origin = shape2.get('origin');
  return Util.isEqual(shape1Origin, shape2Origin);
}


function isChange(preShapes, shapes) {
  if (!preShapes) {
    return true;
  }

  if (preShapes.length !== shapes.length) {
    return true;
  }

  let rst = false;
  Util.each(shapes, (shape, index) => {
    // if (shape !== preShapes[index]) {
    if (!isSameShape(shape, preShapes[index])) {
      rst = true;
      return false;
    }
  });
  return rst;
}

const ActiveMixin = {
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
    canvas.sort();
    canvas.draw();
  },
  clearActivedShapes() {
    const self = this;
    // const view = self.get('view');
    // const canvas = view.get('canvas');
    const activeGroup = self.get('activeGroup');
    activeGroup && activeGroup.clear();
    self.set('activeShapes', null);
    self.set('preShapes', null);
  },
  getActiveShapesByPoint(point) {
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
  }
};

module.exports = ActiveMixin;
