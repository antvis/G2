import { Event as GEvent, IShape } from '../dependents';
import { Datum } from '../interface';
import View from './view';

/**
 * TODO Whether it can(or necessary to) keep consistent with the structure of G.Event or directly use the structure of G.Event
 * The event wrapper of G2 event, wrapper from G.Event
 */
export default class Event {
  /** the view which the target belongs to */
  public view: View;
  /** the event which G wrapped */
  public gEvent: GEvent;
  /** the data for the event, such as original data point */
  public data?: Datum;
  /** the type of event */
  public type: string;

  constructor(view: View, gEvent: GEvent, data?: Datum) {
    this.view = view;
    this.gEvent = gEvent;
    this.data = data;
    this.type = gEvent.type;
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
    return this.gEvent.originalEvent;
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
