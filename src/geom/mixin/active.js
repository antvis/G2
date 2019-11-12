/**
 * @fileOverview the interaction when geom was actived
 * @author sima.zhang
 */
const Util = require('../../util');
const FIELD_ORIGIN = '_origin';
const ZIndexUtil = require('./zindex-util');
const ATTRS_ORIGIN_ACTIVE = '_originActiveAttrs';

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

function getOriginAttrs(activeCfg, shape) {
  const originAttrs = {};
  Util.each(activeCfg, (v, k) => {
    let originValue = shape.attr(k);
    if (Util.isArray(originValue)) {
      originValue = Util.cloneDeep(originValue);// 缓存原来的属性，由于 .attr('matrix') 是数组，所以此处需要深度复制
    }
    originAttrs[k] = originValue;
  });
  return originAttrs;
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
    if (shape && shapeContainer.contain(shape) && self._isAllowActive()) { // shape.get('animating')
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
    const activedOptions = self.get('activedOptions') || {};
    const shapeData = shape.get('origin');
    let shapeName = shapeData.shape || self.getDefaultValue('shape');
    if (Util.isArray(shapeName)) {
      shapeName = shapeName[0];
    }
    const shapeFactory = self.get('shapeFactory');
    const shapeCfg = Util.mix({}, shape.attr(), {
      origin: shapeData
    });
    const activeCfg = shapeFactory.getActiveCfg(shapeName, shapeCfg);
    if (activedOptions.style) {
      Util.mix(activeCfg, activedOptions.style);
    }
    const originAttrs = getOriginAttrs(activeCfg, shape);
    shape.setSilent(ATTRS_ORIGIN_ACTIVE, originAttrs);
    if (activedOptions.animate) {
      shape.animate(activeCfg, 300);
    } else {
      shape.attr(activeCfg);
    }
    ZIndexUtil.toFront(shape); // 提前
  },
  setShapesActived(shapes) {
    const self = this;
    if (!Util.isArray(shapes)) {
      shapes = [ shapes ];
    }
    const preShapes = self.get('activeShapes'); // 获取上次被激活的 shapes
    if (!isChange(preShapes, shapes)) {
      return;
    }
    const view = self.get('view');
    const canvas = view.get('canvas');
    const activedOptions = self.get('activedOptions');
    if (activedOptions && activedOptions.highlight) {
      // 上次的动画未完成，所以要停止掉动画
      Util.each(shapes, shape => {
        if (shape.get('animating')) {
          shape.stopAnimate();
        }
      });
      self.highlightShapes(shapes);
    } else {
      if (preShapes) {
        self.clearActivedShapes(); // 先清除激活元素
      }

      Util.each(shapes, shape => {
        if (shape.get('animating')) {
          shape.stopAnimate();
        }
        if (shape.get('visible')) { // && !shape.get('selected')
          self._setActiveShape(shape);
        }
      });
    }
    self.set('activeShapes', shapes);
    // shapeContainer.sort(); // toFront, resetZIndex 不需要再排序
    canvas.draw();
  },
  clearActivedShapes() {
    const self = this;
    const shapeContainer = self.get('shapeContainer');
    const activedOptions = self.get('activedOptions');
    const activeAnimate = activedOptions && activedOptions.animate;
    if (shapeContainer && !shapeContainer.get('destroyed')) {
      const activeShapes = self.get('activeShapes');
      Util.each(activeShapes, activeShape => {
        // if (!activeShape.get('selected')) {
        const originAttrs = activeShape.get(ATTRS_ORIGIN_ACTIVE);
        if (activeAnimate) {
          activeShape.stopAnimate();
          activeShape.animate(originAttrs, 300);
        } else {
          activeShape.attr(originAttrs);
        }
        ZIndexUtil.resetZIndex(activeShape);
        activeShape.setSilent(ATTRS_ORIGIN_ACTIVE, null);
        // }
      });
      const preHighlightShapes = self.get('preHighlightShapes');
      if (preHighlightShapes) {
        const shapes = shapeContainer.get('children');
        Util.each(shapes, shape => {
          // if (!shape.get('selected')) {
          const originAttrs = shape.get(ATTRS_ORIGIN_ACTIVE);
          if (originAttrs) {
            if (activeAnimate) {
              shape.stopAnimate();
              shape.animate(originAttrs, 300);
            } else {
              shape.attr(originAttrs);
            }
            ZIndexUtil.resetZIndex(shape);
            shape.setSilent(ATTRS_ORIGIN_ACTIVE, null);
          }
          // }
        });
      }
      // 恢复原来排序
      // const children = shapeContainer.get('children');
      // children.sort((obj1, obj2) => {
      //   return obj1._INDEX - obj2._INDEX;
      // });

      self.set('activeShapes', null);
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

    const preHighlightShapes = self.get('activeShapes'); // 获取上次被激活的 shapes
    if (!isChange(preHighlightShapes, highlightShapes)) {
      return;
    }
    if (preHighlightShapes) {
      self.clearActivedShapes();
    }

    const shapes = self.getShapes();
    const activedOptions = self.get('activedOptions');
    const activeAnimate = activedOptions && activedOptions.animate;
    const activeStyle = activedOptions && activedOptions.style;

    Util.each(shapes, shape => {
      const changeAttrs = {};
      shape.stopAnimate();
      if (Util.indexOf(highlightShapes, shape) !== -1) {
        Util.mix(changeAttrs, activeStyle, highlightCfg);
        // shape.setZIndex(1); // 提前
        ZIndexUtil.toFront(shape);
      } else {
        Util.mix(changeAttrs, {
          fillOpacity: 0.3,
          // @2018-07-11 by blue.lb 由于线图只有stoke，fillOpacity不生效，最好还是直接改成整个图形透明度opacity
          opacity: 0.3
        });
        ZIndexUtil.resetZIndex(shape);
      }
      const originAttrs = getOriginAttrs(changeAttrs, shape);
      shape.setSilent(ATTRS_ORIGIN_ACTIVE, originAttrs);
      if (activeAnimate) {
        shape.animate(changeAttrs, 300);
      } else {
        shape.attr(changeAttrs);
      }
    });
    self.set('preHighlightShapes', highlightShapes);
    self.set('activeShapes', highlightShapes);
  }
};

module.exports = ActiveMixin;
