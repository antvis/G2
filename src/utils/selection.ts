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
  IAnimation as GAnimation,
} from '@antv/g';
import { group } from 'd3-array';
import { error } from './helper';

export type G2Element = DisplayObject & {
  // Data for this element.
  __data__?: any;
  // An Array of data to be splitted to.
  __toData__?: any[];
  // An Array of elements to be merged from.
  __fromElements__?: DisplayObject[];
  // Whether to update parent if it in update selection.
  __facet__?: boolean;
  // Whether is removed in G2, but also exist in G dom.
  __removed__?: boolean;
};

export function select<T = any>(node: DisplayObject) {
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
  private _data: T[] | [T, G2Element[]][];
  private _enter: Selection;
  private _exit: Selection;
  private _update: Selection;
  private _merge: Selection;
  private _split: Selection;
  private _document: IDocument;
  private _transitions: (GAnimation | GAnimation[])[];
  private _facetElements: G2Element[];

  constructor(
    elements: Iterable<G2Element> = null,
    data: T[] | [T, G2Element[]][] = null,
    parent: G2Element = null,
    document: IDocument | null = null,
    selections: [Selection, Selection, Selection, Selection, Selection] = [
      null,
      null,
      null,
      null,
      null,
    ],
    transitions: (GAnimation | GAnimation[])[] = [],
    updateElements: G2Element[] = [],
  ) {
    this._elements = Array.from(elements);
    this._data = data;
    this._parent = parent;
    this._document = document;
    this._enter = selections[0];
    this._update = selections[1];
    this._exit = selections[2];
    this._merge = selections[3];
    this._split = selections[4];
    this._transitions = transitions;
    this._facetElements = updateElements;
  }

  selectAll(selector: string | G2Element[]): Selection<T> {
    const elements =
      typeof selector === 'string'
        ? this._parent.querySelectorAll<G2Element>(selector)
        : selector;
    return new Selection<T>(elements, null, this._elements[0], this._document);
  }

  selectFacetAll(selector: string | G2Element[]): Selection<T> {
    const elements =
      typeof selector === 'string'
        ? this._parent.querySelectorAll<G2Element>(selector)
        : selector;
    return new Selection<T>(
      this._elements,
      null,
      this._parent,
      this._document,
      undefined,
      undefined,
      elements,
    );
  }

  /**
   * @todo Replace with querySelector which has bug now.
   */
  select(selector: string | G2Element): Selection<T> {
    const element =
      typeof selector === 'string'
        ? this._parent.querySelectorAll<G2Element>(selector)[0] || null
        : selector;
    return new Selection<T>([element], null, element, this._document);
  }

  append(node: string | ((data: T, i: number) => G2Element)): Selection<T> {
    const callback =
      typeof node === 'function' ? node : () => this.createElement(node);

    const elements = [];
    if (this._data !== null) {
      // For empty selection, append new element to parent.
      // Each element is bind with datum.
      for (let i = 0; i < this._data.length; i++) {
        const d = this._data[i];
        const [datum, from] = Array.isArray(d) ? d : [d, null];
        const newElement = callback(datum, i);
        newElement.__data__ = datum;
        if (from !== null) newElement.__fromElements__ = from;
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

  maybeAppend(
    id: string,
    node: string | (() => G2Element),
    className?: string,
  ) {
    const element = this._elements[0];
    const child = element.getElementById(id) as G2Element;
    if (child) {
      return new Selection([child], null, this._parent, this._document);
    }
    const newChild =
      typeof node === 'string' ? this.createElement(node) : node();
    newChild.id = id;
    if (className) newChild.className = className;
    element.appendChild(newChild);
    return new Selection([newChild], null, this._parent, this._document);
  }

  /**
   * Bind data to elements, and produce three selection:
   * Enter: Selection with empty elements and data to be bind to elements.
   * Update: Selection with elements to be updated.
   * Exit: Selection with elements to be removed.
   */
  data<T = any>(
    data: T[],
    id: (d: T, index?: number) => any = (d) => d,
    groupId: (d: T, index?: number) => any = () => null,
  ): Selection<T> {
    // An Array of new data.
    const enter: T[] = [];

    // An Array of elements to be updated.
    const update: G2Element[] = [];

    // A Set of elements to be removed.
    const exit = new Set<G2Element>(this._elements);

    // An Array of data to be merged into one element.
    const merge: [T, G2Element[]][] = [];

    // A Set of elements to be split into multiple datum.
    const split = new Set<G2Element>();

    // A Map from key to each element.
    const keyElement = new Map<string, G2Element>(
      this._elements.map((d, i) => [id(d.__data__, i), d]),
    );

    // A Map from key to exist element. The Update Selection
    // can get element from this map, this is for diff among
    // facets.
    const keyUpdateElement = new Map<string, G2Element>(
      this._facetElements.map((d, i) => [id(d.__data__, i), d]),
    );

    // A Map from groupKey to a group of elements.
    const groupKeyElements = group(this._elements, (d) => groupId(d.__data__));

    // Diff data with selection(elements with data).
    // !!! Note
    // The switch is strictly ordered, not not change the order of them.
    for (let i = 0; i < data.length; i++) {
      const datum = data[i];
      const key = id(datum, i);
      const groupKey = groupId(datum, i);
      // Append element to update selection if incoming data has
      // exactly the same key with elements.
      if (keyElement.has(key)) {
        const element = keyElement.get(key);
        element.__data__ = datum;
        element.__facet__ = false;
        update.push(element);
        exit.delete(element);
        keyElement.delete(key);
        // Append element to update selection if incoming data has
        // exactly the same key with updateElements.
      } else if (keyUpdateElement.has(key)) {
        const element = keyUpdateElement.get(key);
        element.__data__ = datum;
        // Flag this element should update its parentNode.
        element.__facet__ = true;
        update.push(element);
        keyUpdateElement.delete(key);
        // Append datum to merge selection if existed elements has
        // its key as groupKey.
      } else if (groupKeyElements.has(key)) {
        const group = groupKeyElements.get(key);
        merge.push([datum, group]);
        for (const element of group) exit.delete(element);
        groupKeyElements.delete(key);
        // Append element to split selection if incoming data has
        // groupKey as its key, and bind to datum for it.
      } else if (keyElement.has(groupKey)) {
        const element = keyElement.get(groupKey);
        if (element.__toData__) element.__toData__.push(datum);
        else element.__toData__ = [datum];
        split.add(element);
        exit.delete(element);
      } else {
        // @todo Data with non-unique key.
        enter.push(datum);
      }
    }

    // Create new selection with enter, update and exit.
    const S: [
      Selection<T>,
      Selection<T>,
      Selection<T>,
      Selection<T>,
      Selection<T>,
    ] = [
      new Selection<T>([], enter, this._parent, this._document),
      new Selection<T>(update, null, this._parent, this._document),
      new Selection<T>(exit, null, this._parent, this._document),
      new Selection<T>([], merge, this._parent, this._document),
      new Selection<T>(split, null, this._parent, this._document),
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
    const transitions = [...this._transitions, ...other._transitions];
    return new Selection<T>(
      elements,
      null,
      this._parent,
      this._document,
      undefined,
      transitions,
    );
  }

  createElement(type: string): G2Element {
    if (this._document) {
      return this._document.createElement<G2Element, BP>(type, {});
    }
    const Ctor = Selection.registry[type];
    if (Ctor) return new Ctor();
    return error(`Unknown node type: ${type}`);
  }
  /**
   * Apply callback for each selection(enter, update, exit)
   * and merge them into one selection.
   */
  join(
    enter: (selection: Selection<T>) => any = (d) => d,
    update: (selection: Selection<T>) => any = (d) => d,
    exit: (selection: Selection<T>) => any = (d) => d.remove(),
    merge: (selection: Selection<T>) => any = (d) => d,
    split: (selection: Selection<T>) => any = (d) => d.remove(),
  ): Selection<T> {
    const newEnter = enter(this._enter);
    const newUpdate = update(this._update);
    const newExit = exit(this._exit);
    const newMerge = merge(this._merge);
    const newSplit = split(this._split);
    return newUpdate
      .merge(newEnter)
      .merge(newExit)
      .merge(newMerge)
      .merge(newSplit);
  }

  remove(): Selection<T> {
    // Remove node immediately if there is no transition,
    // otherwise wait until transition finished.
    for (let i = 0; i < this._elements.length; i++) {
      const transition = this._transitions[i];
      if (transition) {
        const T = Array.isArray(transition) ? transition : [transition];
        Promise.all(T.map((d) => d.finished)).then(() => {
          const element = this._elements[i];
          element.remove();
        });
      } else {
        const element = this._elements[i];
        element.remove();
      }
    }
    return new Selection<T>(
      [],
      null,
      this._parent,
      this._document,
      undefined,
      this._transitions,
    );
  }

  each(callback: (datum: T, index: number, element) => any): Selection<T> {
    for (let i = 0; i < this._elements.length; i++) {
      const element = this._elements[i];
      const datum = element.__data__;
      callback(datum, i, element);
    }
    return this;
  }

  attr(key: string, value: any): Selection<T> {
    const callback = typeof value !== 'function' ? () => value : value;
    return this.each(function (d, i, element) {
      if (value !== undefined) element[key] = callback(d, i, element);
    });
  }

  style(key: string, value: any): Selection<T> {
    const callback = typeof value !== 'function' ? () => value : value;
    return this.each(function (d, i, element) {
      if (value !== undefined) element.style[key] = callback(d, i, element);
    });
  }

  transition(value: any): Selection<T> {
    const callback = typeof value !== 'function' ? () => value : value;
    const { _transitions: T } = this;
    return this.each(function (d, i, element) {
      T[i] = callback(d, i, element);
    });
  }

  on(event: string, handler: any) {
    this.each(function (d, i, element) {
      element.addEventListener(event, handler);
    });
    return this;
  }

  call(
    callback: (selection: Selection<T>, ...args: any[]) => any,
    ...args: any[]
  ): Selection<T> {
    callback(this, ...args);
    return this;
  }

  node(): G2Element {
    return this._elements[0];
  }

  nodes(): G2Element[] {
    return this._elements;
  }

  transitions(): (GAnimation | GAnimation[])[] {
    return this._transitions;
  }

  parent(): DisplayObject {
    return this._parent;
  }
}
