/**
 * @fileOverview The controller of chart's events
 * @author sima.zhang
 */
const Util = require('../../util');

function isSameShape(shape1, shape2) {
  if (Util.isNil(shape1) || Util.isNil(shape2)) {
    return false;
  }
  const shape1Origin = shape1.get('origin');
  const shape2Origin = shape2.get('origin');

  // hotfix: if both shapes have no data，just compare shapes.
  if (Util.isNil(shape1Origin) && Util.isNil(shape2Origin)) {
    return Util.isEqual(shape1, shape2);
  }

  return Util.isEqual(shape1Origin, shape2Origin);
}

function registerData(eventObj) {
  if (eventObj.shape && eventObj.shape.get('origin')) {
    eventObj.data = eventObj.shape.get('origin');
  }
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
      toElement: ev.event.toElement || ev.event.relatedTarget
    };
  }

  _getShape(x, y) {
    const view = this.view;
    const container = view.get('canvas');
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
      toElement: ev.event.toElement || ev.event.relatedTarget, // 目标元素
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
    canvas.on('touchstart', Util.wrapBehavior(this, 'onTouchstart'));
    canvas.on('touchmove', Util.wrapBehavior(this, 'onTouchmove'));
    canvas.on('touchend', Util.wrapBehavior(this, 'onTouchend'));
  }

  _triggerShapeEvent(shape, eventName, eventObj) {
    if (shape && shape.name && !shape.get('destroyed')) {
      const view = this.view;
      if (view.isShapeInView(shape)) {
        const name = shape.name + ':' + eventName;
        eventObj.view = view;
        eventObj.appendInfo = shape.get('appendInfo'); // appendInfo is defined by user
        view.emit(name, eventObj);
        const parent = view.get('parent');
        if (parent) { // chart 上也需要抛出该事件，本期先不抛出
          parent.emit(name, eventObj);
        }
      }
    }
  }

  onDown(ev) {
    const view = this.view;
    const eventObj = this._getShapeEventObj(ev);
    eventObj.shape = this.currentShape;
    registerData(eventObj);
    view.emit('mousedown', eventObj);
    this._triggerShapeEvent(this.currentShape, 'mousedown', eventObj);
  }

  onMove(ev) {
    const self = this;
    const view = self.view;
    let currentShape = self.currentShape;
    // 如果图形被销毁，则设置当前 shape 为空
    if (currentShape && currentShape.get('destroyed')) {
      currentShape = null;
      self.currentShape = null;
    }
    const shape = self._getShape(ev.x, ev.y);
    let eventObj = self._getShapeEventObj(ev);
    eventObj.shape = shape;
    registerData(eventObj);
    view.emit('mousemove', eventObj);
    self._triggerShapeEvent(shape, 'mousemove', eventObj);

    if (currentShape && !isSameShape(currentShape, shape)) {
      const leaveObj = self._getShapeEventObj(ev);
      leaveObj.shape = currentShape;
      leaveObj.toShape = shape;
      registerData(leaveObj);
      self._triggerShapeEvent(currentShape, 'mouseleave', leaveObj);
    }

    if (shape && !isSameShape(currentShape, shape)) {
      const enterObj = self._getShapeEventObj(ev);
      enterObj.shape = shape;
      enterObj.fromShape = currentShape;
      registerData(enterObj);
      self._triggerShapeEvent(shape, 'mouseenter', enterObj);
    }
    self.currentShape = shape;

    const point = self._getPointInfo(ev);
    const preViews = self.curViews || [];

    if (preViews.length === 0 && point.views.length) {
      view.emit('plotenter', self._getEventObj(ev, point, point.views));
    }
    // if (preViews.length && point.views.length === 0) {
    //   view.emit('plotleave', self._getEventObj(ev, point, preViews));
    // }

    if (point.views.length) {
      eventObj = self._getEventObj(ev, point, point.views);
      eventObj.shape = shape;
      registerData(eventObj);
      view.emit('plotmove', eventObj);
    }

    self.curViews = point.views;
  }

  onOut(ev) {
    const self = this;
    const view = self.view;
    const point = self._getPointInfo(ev);
    const preViews = self.curViews || [];
    const evtObj = self._getEventObj(ev, point, preViews);
    if (point.views.length === 0 && (!evtObj.toElement || evtObj.toElement.tagName !== 'CANVAS')) {
      view.emit('plotleave', evtObj);
    }
  }

  onUp(ev) {
    const view = this.view;
    const eventObj = this._getShapeEventObj(ev);
    eventObj.shape = this.currentShape;
    view.emit('mouseup', eventObj);
    this._triggerShapeEvent(this.currentShape, 'mouseup', eventObj);
  }

  onClick(ev) {
    const self = this;
    const view = self.view;
    const shape = self._getShape(ev.x, ev.y);
    const shapeEventObj = self._getShapeEventObj(ev);
    shapeEventObj.shape = shape;
    registerData(shapeEventObj);
    view.emit('click', shapeEventObj);
    self._triggerShapeEvent(shape, ev.type, shapeEventObj);
    self.currentShape = shape;

    const point = self._getPointInfo(ev);
    const views = point.views;
    if (!Util.isEmpty(views)) {
      const eventObj = self._getEventObj(ev, point, views);
      if (self.currentShape) {
        const shape = self.currentShape;
        eventObj.shape = shape;
        registerData(eventObj);
        // eventObj.data = shape.get('origin');
      }
      view.emit('plotclick', eventObj);
      if (ev.type === 'dblclick') {
        view.emit('plotdblclick', eventObj);
        view.emit('dblclick', shapeEventObj);
      }
    }
  }

  onTouchstart(ev) {
    const view = this.view;
    const shape = this._getShape(ev.x, ev.y);
    const eventObj = this._getShapeEventObj(ev);
    eventObj.shape = shape;
    registerData(eventObj);
    view.emit('touchstart', eventObj);
    this._triggerShapeEvent(shape, 'touchstart', eventObj);
    this.currentShape = shape;
  }

  onTouchmove(ev) {
    const view = this.view;
    const shape = this._getShape(ev.x, ev.y);
    const eventObj = this._getShapeEventObj(ev);
    eventObj.shape = shape;
    registerData(eventObj);
    view.emit('touchmove', eventObj);
    this._triggerShapeEvent(shape, 'touchmove', eventObj);
    this.currentShape = shape;
  }

  onTouchend(ev) {
    const view = this.view;
    const eventObj = this._getShapeEventObj(ev);
    eventObj.shape = this.currentShape;
    registerData(eventObj);
    view.emit('touchend', eventObj);
    this._triggerShapeEvent(this.currentShape, 'touchend', eventObj);
  }

  clearEvents() {
    const canvas = this.canvas;
    canvas.off('mousemove', Util.getWrapBehavior(this, 'onMove'));
    canvas.off('mouseleave', Util.getWrapBehavior(this, 'onOut'));
    canvas.off('mousedown', Util.getWrapBehavior(this, 'onDown'));
    canvas.off('mouseup', Util.getWrapBehavior(this, 'onUp'));
    canvas.off('click', Util.getWrapBehavior(this, 'onClick'));
    canvas.off('dblclick', Util.getWrapBehavior(this, 'onClick'));
    canvas.off('touchstart', Util.getWrapBehavior(this, 'onTouchstart'));
    canvas.off('touchmove', Util.getWrapBehavior(this, 'onTouchmove'));
    canvas.off('touchend', Util.getWrapBehavior(this, 'onTouchend'));
  }
}

module.exports = EventController;
