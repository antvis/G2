import { ICanvas } from '../../dependents';
import { Point } from '../../interface';
import { View } from '../view';
import { Controller } from './base';

const PRESS_DELAY = 250;

// 计算滑动的方向
const calcDirection = (start: Point, end: Point) => {
  const xDistance = end.x - start.x;
  const yDistance = end.y - start.y;
  // x 的距离大于y 说明是横向，否则就是纵向
  if (Math.abs(xDistance) > Math.abs(yDistance)) {
    return xDistance > 0 ? 'right' : 'left';
  }
  return yDistance > 0 ? 'down' : 'up';
};

// 计算2点之间的距离
const calcDistance = (point1: Point, point2: Point) => {
  const xDistance = Math.abs(point2.x - point1.x);
  const yDistance = Math.abs(point2.y - point1.y);
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};

const getCenter = (point1, point2) => {
  const x = (point1.x + point2.x) / 2;
  const y = (point1.y + point2.y) / 2;
  return { x, y };
};

const convertPoints = (touches, canvas: ICanvas) => {
  if (!touches) {
    return;
  }
  const points = [];
  const len = touches.length;
  for (let i = 0; i < len; i++) {
    const touch = touches[i];
    // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置
    const { clientX, clientY } = touch;
    const point = canvas.getPointByClient(clientX, clientY);
    points.push(point);
  }
  return points;
};

export default class GestureController extends Controller {
  private canvas: ICanvas;
  private processEvent = {};

  private startTime: number;
  private startPoints: Point[];
  private startDistance: number;
  private center: Point;
  private pressTimeout;
  private direction: string;
  private prevMoveTime: number;
  private prevMovePoints: Point[];
  private lastMoveTime: number;
  private lastMovePoints: Point[];
  private eventType: string;

  constructor(view: View) {
    super(view);

    this.canvas = view.getCanvas();

    this.delegateEvent();

    // 用来记录当前触发的事件
    this.processEvent = {};
  }

  public get name(): string {
    return 'gesture';
  }

  public init() {}

  public render() {}

  public layout() {}

  public update() {}

  public destroy() {
    this.reset();
    this.offEvent();
    this.processEvent = null;
  }

  private delegateEvent() {
    // 代理这几个事件
    this.canvas.on('touchstart', this.touchStart);
    this.canvas.on('touchmove', this.touchMove);
    this.canvas.on('touchend', this.touchEnd);
  }

  private offEvent() {
    this.canvas.off('touchstart', this.touchStart);
    this.canvas.off('touchmove', this.touchMove);
    this.canvas.off('touchend', this.touchEnd);
  }

  private touchStart = (ev): void => {
    const points = convertPoints(ev.originalEvent.touches, this.canvas);
    if (!points) {
      return;
    }
    ev.points = points;
    // 防止上次的内容没有清理掉，重新reset下
    this.reset();
    // 记录touch start 的时间
    this.startTime = Date.now();
    // 记录touch start 的点
    this.startPoints = points;
    if (points.length > 1) {
      this.startDistance = calcDistance(points[0], points[1]);
      this.center = getCenter(points[0], points[1]);
    } else {
      // 如果touchstart后停顿250ms, 则也触发press事件
      this.pressTimeout = setTimeout(() => {
        // 这里固定触发press事件
        const eventType = 'press';
        ev.direction = 'none';
        this.emitStart(eventType, ev);
        this.emitEvent(eventType, ev);
        this.eventType = eventType;
      }, PRESS_DELAY);
    }
  };

  private touchMove = (ev): void => {
    const points = convertPoints(ev.originalEvent.touches, this.canvas);
    if (!points) {
      return;
    }
    this.clearPressTimeout();
    ev.points = points;

    const startPoints = this.startPoints;
    if (!startPoints) {
      return;
    }
    // 多指触控
    if (points.length > 1) {
      // touchstart的距离
      const startDistance = this.startDistance;
      const currentDistance = calcDistance(points[0], points[1]);
      ev.zoom = currentDistance / startDistance;
      ev.center = this.center;
      // 触发缩放事件
      this.emitStart('pinch', ev);
      this.emitEvent('pinch', ev);
    } else {
      const deltaX = points[0].x - startPoints[0].x;
      const deltaY = points[0].y - startPoints[0].y;
      const direction = this.direction || calcDirection(startPoints[0], points[0]);
      this.direction = direction;

      // 获取press或者pan的事件类型
      // press 按住滑动, pan表示平移
      // 如果start后立刻move，则触发pan, 如果有停顿，则触发press
      const eventType = this.getEventType(points);

      ev.direction = direction;
      ev.deltaX = deltaX;
      ev.deltaY = deltaY;
      this.emitStart(eventType, ev);
      this.emitEvent(eventType, ev);

      // 记录最后2次move的时间和坐标，为了给swipe事件用
      const prevMoveTime = this.lastMoveTime;
      const now = Date.now();
      // 最后2次的时间间隔一定要大于0，否则swipe没发计算
      if (now - prevMoveTime > 0) {
        this.prevMoveTime = prevMoveTime;
        this.prevMovePoints = this.lastMovePoints;
        this.lastMoveTime = now;
        this.lastMovePoints = points;
      }
    }
  };

  private touchEnd = (ev): void => {
    this.emitEnd(ev);

    // swipe事件处理, 在touchend之后触发
    const lastMoveTime = this.lastMoveTime;
    const now = Date.now();
    // 做这个判断是为了最后一次touchmove后到end前，还有一个停顿的过程
    // 100 是拍的一个值，理论这个值会很短，一般不卡顿的话在10ms以内
    if (now - lastMoveTime < 100) {
      const prevMoveTime = this.prevMoveTime || this.startTime;
      const intervalTime = lastMoveTime - prevMoveTime;
      // 时间间隔一定要大于0, 否则计算没意义
      if (intervalTime > 0) {
        const prevMovePoints = this.prevMovePoints || this.startPoints;
        const lastMovePoints = this.lastMovePoints;
        // move速率
        const velocity = calcDistance(prevMovePoints[0], lastMovePoints[0]) / intervalTime;
        // 0.3 是参考hammerjs的设置
        if (velocity > 0.3) {
          ev.velocity = velocity;
          ev.direction = calcDirection(prevMovePoints[0], lastMovePoints[0]);
          this.emitEvent('swipe', ev);
        }
      }
    }

    this.reset();

    const touches = ev.touches;
    // 当多指只释放了1指时也会触发end, 这时重新触发一次start
    if (touches && touches.length > 0) {
      this.touchStart(ev);
    }
  };

  private emitEvent(type, ev) {
    const view = this.view;
    view.emit(type, ev);
  }

  // 触发start事件
  private emitStart(type, ev) {
    if (this.isProcess(type)) {
      return;
    }
    this.enable(type);
    this.emitEvent(`${type}start`, ev);
  }
  // 触发end事件
  private emitEnd(ev) {
    const processEvent = this.processEvent;
    Object.keys(processEvent).forEach((type) => {
      this.emitEvent(`${type}end`, ev);
      delete processEvent[type];
    });
  }

  private enable(eventType: string) {
    this.processEvent[eventType] = true;
  }
  // 是否进行中的事件
  private isProcess(eventType: string) {
    return this.processEvent[eventType];
  }

  private reset() {
    this.clearPressTimeout();
    this.startTime = 0;
    this.startPoints = null;
    this.startDistance = 0;
    this.direction = null;
    this.eventType = null;
    this.prevMoveTime = 0;
    this.prevMovePoints = null;
    this.lastMoveTime = 0;
    this.lastMovePoints = null;
  }

  private clearPressTimeout() {
    if (this.pressTimeout) {
      clearTimeout(this.pressTimeout);
      this.pressTimeout = 0;
    }
  }

  private getEventType(points) {
    const { eventType, view, startTime, startPoints } = this;
    if (eventType) {
      return eventType;
    }
    let type;
    const panEventListeners = view.getEvents().pan;
    // 如果 view 上没有 pan 事件的监听，默认都是 press
    if (!panEventListeners || !panEventListeners.length) {
      type = 'press';
    } else {
      // 如果有pan事件的处理，press则需要停顿250ms, 且移动距离小于10
      const now = Date.now();
      if (now - startTime > PRESS_DELAY && calcDistance(startPoints[0], points[0]) < 10) {
        type = 'press';
      } else {
        type = 'pan';
      }
    }
    this.eventType = type;
    return type;
  }
}
