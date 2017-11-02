/**
 * @fileOverview the interaction when geom was actived
 * @author sima.zhang
 */
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
    if (!isSameShape(shape, preShapes[index])) {
      rst = true;
      return false;
    }
  });
  return rst;
}


const ActiveMixin = {
  _isAllowActive() {
    const allowActive = this.get('allowActive');
    if (Util.isNil(allowActive)) { // 用户未设置，使用默认的策略
      const view = this.get('view');
      const isShareTooltip = this.isShareTooltip();
      const options = view.get('options');
      // 默认情况下，tooltip 关闭或者 tooltip 模式为 shared === false 的时候允许 active
      if (options.tooltip === false || !isShareTooltip) {
        return true;
      }
    } else {
      return allowActive;
    }

    return false;
  },
  _onMouseenter(ev) {
    const self = this;
    const shape = ev.shape;
    const shapeContainer = self.get('shapeContainer');
    if (shape && !shape.get('animating') && shapeContainer.contain(shape) && self._isAllowActive()) {
      self.setShapesActived(shape);
    }
  },
  _onMouseleave() {
    const self = this;
    const view = self.get('view');
    const canvas = view.get('canvas');
    if (self.get('activeShapes')) {
      self.clearActivedShapes();
      canvas.draw();
    }
  },
  _bindActiveAction() {
    const self = this;
    const view = self.get('view');
    const type = self.get('type');
    view.on(type + ':mouseenter', Util.wrapBehavior(self, '_onMouseenter'));
    view.on(type + ':mouseleave', Util.wrapBehavior(self, '_onMouseleave'));
  },
  _offActiveAction() {
    const self = this;
    const view = self.get('view');
    const type = self.get('type');
    view.off(type + ':mouseenter', Util.getWrapBehavior(self, '_onMouseenter'));
    view.off(type + ':mouseleave', Util.getWrapBehavior(self, '_onMouseleave'));
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
    let isStop = false; // 判断 shape 是否正在动画
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
    const shapeContainer = self.get('shapeContainer');
    Util.each(shapes, shape => {
      if (shape.get('animating')) {
        isStop = true;
        return false;
      }
      if (!shape.get('_originAttrs')) {
        shape.set('_originAttrs', Util.cloneDeep(shape.__attrs)); // 缓存原来的属性，由于 __attrs.matrix 是数组，所以此处需要深度复制
      }
      if (shape.get('visible') && !shape.get('selected')) {
        self._setActiveShape(shape);
      }
    });

    if (isStop) {
      return;
    }

    self.set('activeShapes', shapes);
    self.set('preShapes', shapes);
    shapeContainer.sort();
    canvas.draw();
  },
  clearActivedShapes() {
    const self = this;
    const shapeContainer = self.get('shapeContainer');
    if (shapeContainer && !shapeContainer.get('destroyed')) {
      const activeShapes = self.get('activeShapes');
      Util.each(activeShapes, activeShape => {
        if (!activeShape.get('selected')) {
          const originAttrs = activeShape.get('_originAttrs');
          activeShape.__attrs = Util.cloneDeep(originAttrs);
          activeShape.setZIndex(0);
          activeShape.set('_originAttrs', null);
        }
      });
      const preHighlightShapes = self.get('preHighlightShapes');
      if (preHighlightShapes) {
        const shapes = shapeContainer.get('children');
        Util.each(shapes, shape => {
          if (!shape.get('selected')) {
            const originAttrs = shape.get('_originAttrs');
            if (originAttrs) {
              shape.__attrs = Util.cloneDeep(originAttrs);
              shape.setZIndex(0);
              shape.set('_originAttrs', null);
            }
          }
        });
      }
      // 恢复原来排序
      const children = shapeContainer.get('children');
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
    const shapeContainer = self.get('shapeContainer');
    const activeShapes = [];
    if (shapeContainer) {
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
    const shapeContainer = self.get('shapeContainer');
    const canvas = shapeContainer.get('canvas');
    const pixelRatio = canvas.get('pixelRatio');
    let result;
    if (shapeContainer) {
      result = shapeContainer.getShape(point.x * pixelRatio, point.y * pixelRatio);
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
