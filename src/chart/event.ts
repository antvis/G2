import { Event as GEvent, IShape } from '../dependents';
import { Data } from '../interface';
import View from './view';

/**
 * The event wrapper of G2 event, wrapper from G.Event
 */
export default class Event {
  /** the view which the target belongs to */
  public view: View;
  /** the event which G wrapped */
  public gEvent: GEvent;
  /** the data for the event, such as original data point */
  public data?: Data;

  constructor(view: View, gEvent: GEvent, data: Data = []) {
    this.view = view;
    this.gEvent = gEvent;
    this.data = data;
  }

  // below props are proxy props of G.event convenient

  /** the real trigger shape of the event */
  public get target(): IShape {
    // TODO G 中事件定义为 object 不正确，这里先 ignore
    // @ts-ignore
    return this.gEvent.target;
  }

  /** the original dom event object */
  public get event(): any {
    return this.gEvent.domEvent;
  }

  /** the type of event */
  public get type(): string {
    return this.gEvent.type;
  }

  /** the position x of canvas */
  public get x(): number {
    return this.gEvent.x;
  }

  /** the position y of canvas */
  public get y(): number {
    return this.gEvent.y;
  }

  /** the position x of window */
  public get clientX(): number {
    return this.gEvent.clientX;
  }

  /** the position y of window */
  public get clientY(): number {
    return this.gEvent.clientY;
  }
  // end for proxy events

  public toString(): string {
    const type = this.type;
    return `[Event (type=${type})]`;
  }
}
