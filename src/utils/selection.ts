import {
  Group,
  Rect,
  DisplayObject,
  IDocument,
  BaseStyleProps as BP,
  Circle,
  Path,
  Text,
  Ellipse,
  Image,
  Line,
  Polygon,
  Polyline,
  HTML,
} from '@antv/g';
import { error } from './helper';

export type G2Element = DisplayObject & {
  __data__?: any;
};

export function select<T = any>(node: Group) {
  return new Selection<T>([node], null, node, node.ownerDocument);
}

/**
 * A simple implementation of d3-selection for @antv/g.
 * It has the core features of d3-selection and extended ability.
 * Every methods of selection returns new selection if elements
 * are mutated(e.g. append, remove), otherwise return the selection itself(e.g. attr, style).
 * @see https://github.com/d3/d3-selection
 * @see https://github.com/antvis/g
 * @todo Nested selections.
 * @todo More useful functor.
 */
export class Selection<T = any> {
  static registry: Record<string, new () => G2Element> = {
    g: Group,
    rect: Rect,
    circle: Circle,
    path: Path,
    text: Text,
    ellipse: Ellipse,
    image: Image,
    line: Line,
    polygon: Polygon,
    polyline: Polyline,
    html: HTML,
  };
  private _elements: G2Element[];
  private _parent: G2Element;
  private _data: T[];
  private _enter: Selection;
  private _exit: Selection;
  private _update: Selection;
  private _document: IDocument;

  constructor(
    elements: G2Element[] = null,
    data: T[] = null,
    parent: G2Element = null,
    document: IDocument = null,
    selections: [Selection, Selection, Selection] = [null, null, null],
  ) {
    this._elements = elements;
    this._data = data;
    this._parent = parent;
    this._document = document;
    this._enter = selections[0];
    this._update = selections[1];
    this._exit = selections[2];
  }

  selectAll(selector: string | G2Element[]): Selection<T> {
    const elements =
      typeof selector === 'string'
        ? this._parent.querySelectorAll<G2Element>(selector)
        : selector;
    return new Selection<T>(elements, null, this._elements[0], this._document);
  }

  /**
   * @todo Replace with querySelector which has bug now.
   */
  select(selector: string | G2Element): Selection<T> {
    const element =
      typeof selector === 'string'
        ? this._parent.querySelectorAll<G2Element>(selector)[0] || null
        : selector;
    return new Selection<T>([element], null, this._elements[0], this._document);
  }

  append(node: string | ((data: T, i: number) => G2Element)): Selection<T> {
    const createElement = (type: string) => {
      if (this._document) {
        return this._document.createElement<G2Element, BP>(type, {});
      }
      const Ctor = Selection.registry[type];
      if (Ctor) return new Ctor();
      return error(`Unknown node type: ${type}`);
    };
    const callback =
      typeof node === 'function' ? node : () => createElement(node);

    const elements = [];
    if (this._data !== null) {
      // For empty selection, append new element to parent.
      // Each element is bind with datum.
      for (let i = 0; i < this._data.length; i++) {
        const datum = this._data[i];
        const newElement = callback(datum, i);
        newElement.__data__ = datum;
        this._parent.appendChild(newElement);
        elements.push(newElement);
      }
      return new Selection(elements, null, this._parent, this._document);
    } else {
      // For non-empty selection, append new element to
      // selected element and return new selection.
      for (let i = 0; i < this._elements.length; i++) {
        const element = this._elements[i];
        const datum = element.__data__;
        const newElement = callback(datum, i);
        element.appendChild(newElement);
        elements.push(newElement);
      }
      return new Selection(elements, null, elements[0], this._document);
    }
  }

  /**
   * Bind data to elements, and produce three selection:
   * Enter: Selection with empty elements and data to be bind to elements.
   * Update: Selection with elements to be updated.
   * Exit: Selection with elements to be removed.
   */
  data<T>(
    data: T[],
    id: (d: T, index: number) => unknown = (d) => d,
  ): Selection<T> {
    // An array of new data.
    const enter = [];

    // An array of elements to be updated.
    const update = [];

    // A Map from key to each element.
    const keyElement = new Map(
      this._elements.map((d, i) => [id(d.__data__, i), d]),
    );

    // Diff data with selection(elements with data).
    for (let i = 0; i < data.length; i++) {
      const datum = data[i];
      const key = id(datum, i);
      if (keyElement.has(key)) {
        const element = keyElement.get(key);
        element.__data__ = datum;
        update.push(element);
        keyElement.delete(key);
      } else {
        enter.push(datum);
      }
    }

    // An array of elements to be removed.
    const exit = Array.from(keyElement.values());

    // Create new selection with enter, update and exit.
    const S: [Selection<T>, Selection<T>, Selection<T>] = [
      new Selection<T>([], enter, this._parent, this._document),
      new Selection<T>(update, null, this._parent, this._document),
      new Selection<T>(exit, null, this._parent, this._document),
    ];

    return new Selection<T>(
      this._elements,
      null,
      this._parent,
      this._document,
      S,
    );
  }

  merge(other: Selection<T>): Selection<T> {
    const elements = [...this._elements, ...other._elements];
    return new Selection<T>(elements, null, this._parent, this._document);
  }

  /**
   * Apply callback for each selection(enter, update, exit)
   * and merge them into one selection.
   */
  join(
    enter: (selection: Selection<T>) => any = (d) => d,
    update: (selection: Selection<T>) => any = (d) => d,
    exit: (selection: Selection<T>) => any = (d) => d.remove(),
  ): Selection<T> {
    const newEnter = enter(this._enter);
    const newUpdate = update(this._update);
    const newExit = exit(this._exit);
    return newUpdate.merge(newEnter).merge(newExit);
  }

  remove(): Selection<T> {
    const elements = [...this._elements];
    for (const element of this._elements) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
        const index = elements.indexOf(element);
        elements.splice(index, 1);
      }
    }
    return new Selection<T>(elements, null, this._parent, this._document);
  }

  each(callback: (datum: T, index: number) => any): Selection<T> {
    for (let i = 0; i < this._elements.length; i++) {
      const element = this._elements[i];
      const datum = element.__data__;
      callback.call(element, datum, i);
    }
    return this;
  }

  attr(key: string, value: any): Selection<T> {
    const callback = typeof value !== 'function' ? () => value : value;
    this.each(function (d, i) {
      if (value !== undefined) this[key] = callback.call(this, d, i);
    });
    return this;
  }

  style(key: string, value: any): Selection<T> {
    const callback = typeof value !== 'function' ? () => value : value;
    this.each(function (d, i) {
      if (value !== undefined) this.style[key] = callback.call(this, d, i);
    });
    return this;
  }

  on(event: string, handler: any) {
    this.each(function () {
      this.addEventListener(event, handler);
    });
    return this;
  }

  call(
    callback: (selection: Selection<T>, ...args: any[]) => any,
    ...args: any[]
  ): Selection<T> {
    callback.call(this._parent, this, ...args);
    return this;
  }

  node(): G2Element {
    return this._elements[0];
  }

  nodes(): G2Element[] {
    return this._elements;
  }
}
