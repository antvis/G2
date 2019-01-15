const Util = require('../util');
const Interaction = require('./base');

function getOriginalAttrs(attrs, styles) {
  const origin = {};
  for (const style in styles) {
    origin[style] = attrs[style];
  }
  return origin;
}

class Select extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'mouseup',
      processEvent: null,
      selectStyle: {
        fillOpacity: 1
      },
      unSelectStyle: {
        fillOpacity: 0.1
      },
      cancelable: true
    });
  }

  start(ev) {
    const self = this;
    const chart = self.view;

    let selectedShape;
    const unSelectedShapes = [];
    chart.eachShape((obj, shape) => {
      if (shape.isPointInPath(ev.x, ev.y)) {
        selectedShape = shape;
      } else {
        unSelectedShapes.push(shape);
      }
    });

    if (!selectedShape) {
      self.reset();
      return;
    }

    if (selectedShape.get('_selected')) { // 已经被选中
      if (!self.cancelable) { // 不允许取消选中则不处理
        return;
      }
      self.reset(); // 允许取消选中
    } else { // 未被选中
      const { selectStyle, unSelectStyle } = self;
      // 获取选中效果对应的本来效果,保存下来
      const originAttrs = getOriginalAttrs(selectedShape.attr(), selectedShape);
      selectedShape.set('_originAttrs', originAttrs);
      selectedShape.attr(selectStyle);

      Util.each(unSelectedShapes, child => {
        let originAttrs = child.get('_originAttrs');
        // 先恢复到默认状态下
        if (originAttrs) {
          child.attr(originAttrs);
        }
        child.set('_selected', false);
        // 保存未选中效果对应的原始效果
        if (unSelectStyle) {
          originAttrs = getOriginalAttrs(child.attr(), unSelectStyle);
          child.set('_originAttrs', originAttrs);
          child.attr(unSelectStyle);
        }
      });

      selectedShape.set('_selected', true);
      self.selectedShape = selectedShape;
      self.canvas.draw();
    }
  }

  end(ev) {
    const selectedShape = this.selectedShape;
    if (selectedShape && !selectedShape.get('destroyed') && selectedShape.get('origin')) {
      ev.data = selectedShape.get('origin')._origin; // 绘制数据，包含原始数据啊
      ev.shapeInfo = selectedShape.get('origin');
      ev.shape = selectedShape;
      ev.selected = !!selectedShape.get('_selected'); // 返回选中的状态
    }
  }

  reset() {
    const self = this;
    if (!self.selectedShape) {
      return;
    }
    const chart = self.view;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container').get('children')[0];
    const children = container.get('children');

    Util.each(children, child => {
      const originAttrs = child.get('_originAttrs');
      if (originAttrs) {
        child._attrs = originAttrs;
        child.set('_originAttrs', null);
      }
      child.set('_selected', false);
    });
    self.canvas.draw();
  }
}

module.exports = Select;
