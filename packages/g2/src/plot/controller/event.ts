import * as _ from '@antv/util';
import { Canvas, Shape, Group } from '@antv/g';
import View from '../../../src/plot/view';

interface ShapeType extends Shape {
  name?: string;
}

function isBackgroundShape(view: View, shape: ShapeType) {
  const backgroundBkShape = view.get('backgroundGroup').get('backShape');
  const panelBkShape = view.get('panelGroup').get('backShape');
  if (backgroundBkShape === shape || panelBkShape === shape) {
    return true;
  }
  return false;
}

function registerData(eventObj: EventObj) {
  if (eventObj.target && eventObj.target.get('origin')) {
    eventObj.data = eventObj.target.get('origin');
  }
}

function isSameShape(shape1: ShapeType, shape2: ShapeType) {
  if (shape1 && shape2 && shape1 === shape2) {
    return true;
  }
  return false;
}

function isInView(target: any, view: View, canvas: Canvas) {
  if (target !== canvas && view.isShapeInView(target)) {
    return true;
  }
  return false;
}

function isInPanel(target: any, panelGroup: Group) {
  let parent = target;
  while (parent = parent.get('parent')) {
    if (parent === panelGroup) {
      return true;
    }
  }
  return false;
}

interface EventControllerCfg {
  view: View;
  canvas: Canvas;
}

interface EventObj {
  x: number;
  y: number;
  target: any;
  event: object;
  data?: any;
  view?: any;
  appendInfo?: any;
  shape?: any;
  toShape?: any;
  fromShape?: any;
  wheelDelta?: number;
}

export default class EventController {
  public view: View;
  public canvas: Canvas;
  private _panelGroup: Group;
  private _lastShape: Shape;
  private _lastCanvasTarget: any;
  private _pixelRatio: number;
  private _eventHandlers: any[];
  private _canvasDomLeaveHandler: any;

  constructor(cfg: EventControllerCfg = { view: null, canvas: null  }) {
    this.view = cfg.view;
    this.canvas = cfg.canvas;
    this._panelGroup = this.view.get('panelGroup');
    this._eventHandlers = [];
    this._pixelRatio = this.canvas.get('pixelRatio');
  }

  private _getEventObj(ev) {
    const obj:EventObj = {
      x: ev.x / this._pixelRatio,
      y: ev.y / this._pixelRatio,
      target: ev.target,
      event: ev.event, // g事件的event
    };
    return obj;
  }

  private _triggerShapeEvent(shape: ShapeType, eventName: string, eventObj: EventObj) {
    const shapeName = shape.name;
    if (shapeName && !shape.get('destroyed')) {
      const view = this.view;
      const name = `${shapeName}:${eventName}`;
      eventObj.view = view;
      eventObj.appendInfo = shape.get('appendInfo'); // appendInfo is defined by user
      view.emit(name, eventObj);
    }
  }

  private _addEvent(target, eventType, handler) {
    target.on(eventType, handler);
    this._eventHandlers.push({ target, type:eventType, handler });
  }

  bindEvents() {
    const container = this.view.get('container');
    this._addEvent(container, 'mousedown', _.wrapBehavior(this, '_onEvents'));
    this._addEvent(container, 'mousemove', _.wrapBehavior(this, '_onMove'));
    this._addEvent(container, 'mouseup', _.wrapBehavior(this, '_onEvents'));
    this._addEvent(container, 'click', _.wrapBehavior(this, '_onEvents'));
    this._addEvent(container, 'dblclick', _.wrapBehavior(this, '_onEvents'));
    this._addEvent(container, 'contextmenu', _.wrapBehavior(this, '_onEvents'));
    this._addEvent(container, 'wheel', _.wrapBehavior(this, '_onEvents'));

    this._addEvent(container, 'touchstart', _.wrapBehavior(this, '_onEvents'));
    this._addEvent(container, 'touchmove', _.wrapBehavior(this, '_onEvents'));
    this._addEvent(container, 'touchend', _.wrapBehavior(this, '_onEvents'));

    this._addEvent(this.canvas, 'mousemove', _.wrapBehavior(this, '_onCanvasMove'));

    const canvasDom = this.canvas.get('canvasDOM');
    this._canvasDomLeaveHandler = _.wrapBehavior(this, '_onCanvasDomLeave');
    canvasDom.addEventListener('mouseleave', this._canvasDomLeaveHandler);
  }

  private _onEvents(ev) {
    const eventType = ev.type;
    const eventObj = this._getEventObj(ev);
    const target = ev.target;
    registerData(eventObj);
    const isbk = isBackgroundShape(this.view, target);
    if (!isbk) {
      this._triggerShapeEvent(target, eventType, eventObj);
    }
    /*panel event*/
    const targetParent = target.get('parent');
    if (targetParent) { // 当调用 view.clear()，target 为 canvas 画布本身，此时 targetParent 为 null
      const parentName = targetParent.get('name');
      if (parentName && parentName === 'panelGroup') {
        this.view.emit(`panel:${eventType}`, eventObj);
      }
    }

    this.view.emit(eventType, eventObj);
  }

  private _onMove(ev) {
    /*dispatch mousemove events*/
    const eventObj = this._getEventObj(ev);
    const target = ev.target;
    registerData(eventObj);
    this.view.emit('mousemove', eventObj);
    const isbkTarget = isBackgroundShape(this.view, target);
    if (!isbkTarget) {
      this._triggerShapeEvent(target, 'mousemove', eventObj);
    }

    const lastShape = this._lastShape;
    const isbklastShape = isBackgroundShape(this.view, lastShape);

    if (lastShape && !isbklastShape && !isSameShape(lastShape, target)) {
      const leaveObj = this._getEventObj(ev);
      registerData(leaveObj);
      this._triggerShapeEvent(lastShape, 'mouseleave', eventObj);
    }

    if (!isbkTarget && !isSameShape(lastShape, target)) {
      const enterObj = this._getEventObj(ev);
      registerData(enterObj);
      this._triggerShapeEvent(target, 'mouseenter', enterObj);
    }

    const isTargetInPanel = isInPanel(target, this._panelGroup);
    const isLastShapeInPanel = lastShape ? isInPanel(lastShape, this._panelGroup) : false;

    if (isTargetInPanel) {
      if (!isLastShapeInPanel) {
        this.view.emit('panel:mouseenter', eventObj);
      }else {
        this.view.emit('panel:mousemove', eventObj);
      }
    }else {
      if (isLastShapeInPanel) {
        this.view.emit('panel:mouseleave', eventObj);
      }
    }

    this._lastShape = target;
  }

  private _onCanvasMove(ev) {
    const event = _.isArray(ev) ? ev[0] :ev;
    const eventObj = this._getEventObj(event);
    const canvas = this.canvas;
    const view = this.view;
    const target = event.target;
    const targetInView = isInView(target, view, canvas);
    const lastTargetInView = this._lastCanvasTarget ? isInView(this._lastCanvasTarget, view, canvas) :false;
    if (target !== this._lastCanvasTarget) {
      if (lastTargetInView && !targetInView) {
        this.view.emit('mouseleave', eventObj);
      }else if (!lastTargetInView && targetInView) {
        this.view.emit('mouseenter', eventObj);
      }
    }
    this._lastCanvasTarget = target;
  }

  private _onCanvasDomLeave(ev) {
    // 解决padding为0时的panel leave问题
    const eventObj = this._getEventObj(ev);
    // ev.event,  g事件的才有。解决移动太快的时候, wrapBehavior 触发的 event === undefined；
    eventObj.event = ev;
    this.view.emit('panel:mouseleave', eventObj);
  }

  clearEvents() {
    const eventHandlers = this._eventHandlers;
    _.each(eventHandlers, (eh) => {
      eh.target.off(eh.type, eh.handler);
    });

    const canvasDom = this.canvas.get('canvasDOM');
    canvasDom.removeEventListener('mouseleave', this._canvasDomLeaveHandler);
  }

}
