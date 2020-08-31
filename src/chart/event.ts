import { Event as GEvent, IShape } from '../dependents';
import { Datum } from '../interface';
import View from './view';

/**
 * @todo Whether it can(or necessary to) keep consistent with the structure of G.Event or directly use the structure of G.Event
 * G2 事件的事件包装类，基于 G.Event
 */
export default class Event {
  /** 当前 target 归属的 view 实例 */
  public view: View;
  /** 被包装的原声 G 事件 */
  public gEvent: GEvent;
  /** 原始数据 */
  public data?: Datum;
  /** 事件类型 */
  public type: string;

  constructor(view: View, gEvent: GEvent, data?: Datum) {
    this.view = view;
    this.gEvent = gEvent;
    this.data = data;
    this.type = gEvent.type;
  }

  /**
   * 非交互产生的事件
   * @param view
   * @param type
   * @param data
   */
  public static fromData(view: View, type: string, data: Datum) {
    return new Event(view, new GEvent(type, {}), data);
  }

  // below props are proxy props of G.event convenient

  /** the real trigger shape of the event */
  public get target(): IShape {
    // @todo G 中事件定义为 object 不正确，这里先 ignore
    // @ts-ignore
    return this.gEvent.target;
  }

  /** 获取对应的 dom 原生时间 */
  public get event(): any {
    return this.gEvent.originalEvent;
  }

  /** x 画布坐标 */
  public get x(): number {
    return this.gEvent.x;
  }

  /** y 画布坐标 */
  public get y(): number {
    return this.gEvent.y;
  }

  /** x 窗口坐标 */
  public get clientX(): number {
    return this.gEvent.clientX;
  }

  /** y 窗口坐标 */
  public get clientY(): number {
    return this.gEvent.clientY;
  }
  // end for proxy events

  /**
   * event string
   * @returns string
   */
  public toString(): string {
    return `[Event (type=${this.type})]`;
  }

  /**
   * clone a new event with same attributes
   * @returns [[Event]]
   */
  public clone(): Event {
    return new Event(this.view, this.gEvent, this.data);
  }
}
