const Util = require('../../util');

function isSameShape(shape1, shape2) {
  if (Util.isNil(shape1) || Util.isNil(shape2)) {
    return false;
  }
  const shape1Origin = shape1.get('origin');
  const shape2Origin = shape2.get('origin');
  return Util.isEqual(shape1Origin, shape2Origin);
}

class EventController {
  constructor(cfg) {
    this.view = null;
    this.canvas = null;
    Util.assign(this, cfg);

    this._init();
  }

  _init() {
    this.pixelRatio = this.canvas.get('pixelRatio');
  }

  _getShapeEventObj(ev) {
    return {
      x: ev.x / this.pixelRatio,
      y: ev.y / this.pixelRatio,
      target: ev.target, // canvas 元素
      toElement: ev.event.toElement
    };
  }

  _getShape(x, y) {
    const view = this.view;
    const container = view.get('viewContainer');
    return container.getShape(x, y);
  }

  _getPointInfo(ev) {
    const view = this.view;
    const point = {
      x: ev.x / this.pixelRatio,
      y: ev.y / this.pixelRatio
    };
    const views = view.getViewsByPoint(point);
    point.views = views;
    return point;
  }

  _getEventObj(ev, point, views) {
    return {
      x: point.x,
      y: point.y,
      target: ev.target, // canvas 元素
      toElement: ev.event.toElement, // 目标元素
      views
    };
  }

  bindEvents() {
    const canvas = this.canvas;
    canvas.on('mousedown', Util.wrapBehavior(this, 'onDown'));
    canvas.on('mousemove', Util.wrapBehavior(this, 'onMove'));
    canvas.on('mouseleave', Util.wrapBehavior(this, 'onOut'));
    canvas.on('mouseup', Util.wrapBehavior(this, 'onUp'));
    canvas.on('click', Util.wrapBehavior(this, 'onClick'));
    canvas.on('dblclick', Util.wrapBehavior(this, 'onClick'));
  }

  onDown(ev) {
    const view = this.view;
    const eventObj = this._getShapeEventObj(ev);
    eventObj.shape = this.currentShape;
    view.emit('mousedown', eventObj);
  }

  onMove(ev) {
    const self = this;
    const view = self.view;
    const currentShape = self.currentShape;
    const shape = self._getShape(ev.x, ev.y);
    let eventObj = self._getShapeEventObj(ev);
    eventObj.shape = shape;
    view.emit('mousemove', eventObj);

    // 移动时判定是否还在原先的图形中
    if (!isSameShape(currentShape, shape)) {
      if (currentShape) {
        const leaveObj = self._getShapeEventObj(ev);
        leaveObj.shape = currentShape;
        leaveObj.toShape = shape;
        view.emit(currentShape.name + ':mouseleave', leaveObj);
      }
      if (shape) {
        const enterObj = self._getShapeEventObj(ev);
        enterObj.shape = shape;
        enterObj.fromShape = currentShape;
        view.emit(shape.name + ':mouseenter', enterObj);
      }
      self.currentShape = shape;
    }

    const point = self._getPointInfo(ev);
    const preViews = self.curViews || [];

    if (preViews.length === 0 && point.views.length) {
      view.emit('plotenter', self._getEventObj(ev, point, point.views));
    }
    if (preViews.length && point.views.length === 0) {
      view.emit('plotleave', self._getEventObj(ev, point, preViews));
    }

    if (point.views.length) {
      eventObj = self._getEventObj(ev, point, point.views);
      eventObj.shape = shape;
      view.emit('plotmove', eventObj);
    }

    self.curViews = point.views;
  }

  onOut(ev) {
    const self = this;
    const view = self.view;
    const point = self._getPointInfo(ev);
    view.emit('plotleave', self._getEventObj(ev, point, self.curViews));
  }

  onUp(ev) {
    const view = this.view;
    const eventObj = this._getShapeEventObj(ev);
    eventObj.shape = this.currentShape;
    view.emit('mouseup', eventObj);
  }

  onClick(ev) {
    const self = this;
    const view = self.view;
    const shapeEventObj = this._getShapeEventObj(ev);
    shapeEventObj.shape = this.currentShape;
    view.emit('click', shapeEventObj);

    const point = self._getPointInfo(ev);
    const views = point.views;
    if (!Util.isEmpty(views)) {
      const eventObj = self._getEventObj(ev, point, views);
      if (this.currentShape) {
        const shape = this.currentShape;
        eventObj.shape = shape;
        eventObj.data = shape.get('origin');
      }
      view.emit('plotclick', eventObj);
      if (ev.type === 'dblclick') {
        view.emit('plotdblclick', eventObj);
        view.emit('dblclick', shapeEventObj);
      }
    }
  }

  clearEvents() {
    const canvas = this.canvas;
    canvas.off('mousemove', Util.getWrapBehavior(this, 'onMove'));
    canvas.off('mouseleave', Util.getWrapBehavior(this, 'onOut'));
    canvas.off('mousedown', Util.getWrapBehavior(this, 'onDown'));
    canvas.off('mouseup', Util.getWrapBehavior(this, 'onUp'));
    canvas.off('click', Util.getWrapBehavior(this, 'onClick'));
    canvas.off('dblclick', Util.getWrapBehavior(this, 'onClick'));
  }
}

module.exports = EventController;
