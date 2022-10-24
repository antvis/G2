import { isObject, deepMix, get, isString, isArray } from '@antv/util';

type EventListener = (...args: any[]) => void;

export type NodePropertyDescriptor = {
  type: 'object' | 'value' | 'array' | 'node' | 'container' | 'event';
  name: string;
  key?: string;
  ctor?: new (...args: any[]) => any;
};

function defineValueProp(Node, { name, key = name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (value) {
    if (arguments.length === 0) return this.attr(key);
    return this.attr(key, value);
  };
}

function defineArrayProp(Node, { name, key = name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (value) {
    if (arguments.length === 0) return this.attr(key);
    if (Array.isArray(value)) return this.attr(key, value);
    const array = [...(this.attr(key) || []), value];
    return this.attr(key, array);
  };
}

function defineObjectProp(
  Node,
  { name, key: k = name }: NodePropertyDescriptor,
) {
  Node.prototype[name] = function (key, value) {
    if (arguments.length === 0) return this.attr(k);
    if (arguments.length === 1) return this.attr(k, key);
    const obj = this.attr(k) || {};
    obj[key] = value;
    return this.attr(k, obj);
  };
}

function defineNodeProp(Node, { name, ctor }: NodePropertyDescriptor) {
  Node.prototype[name] = function () {
    return this.append(ctor);
  };
}

function defineContainerProp(Node, { name, ctor }: NodePropertyDescriptor) {
  Node.prototype[name] = function () {
    this.type = null;
    return this.append(ctor);
  };
}

function defineEventProp(Node, { name, key = name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (
    eventName: string,
    listener: EventListener | EventListener[],
  ) {
    const events = this.attr(key) || {};
    if (arguments.length === 0) return events;
    if (arguments.length === 1) return events[eventName];
    const listeners = events[eventName];
    if (listeners) {
      isArray(listener) ? listeners.concat(listener) : listeners.push(listener);
    } else {
      events[eventName] = isArray(listener) ? listener : [listener];
    }
    return this.attr(key, events);
  };
}

/**
 * A decorator to define different type of attribute setter or
 * getter for current node.
 */
export function defineProps(descriptors: NodePropertyDescriptor[]) {
  return (Node) => {
    for (const descriptor of descriptors) {
      const { type } = descriptor;
      if (type === 'value') defineValueProp(Node, descriptor);
      else if (type === 'array') defineArrayProp(Node, descriptor);
      else if (type === 'object') defineObjectProp(Node, descriptor);
      else if (type === 'node') defineNodeProp(Node, descriptor);
      else if (type === 'container') defineContainerProp(Node, descriptor);
      else if (type === 'event') defineEventProp(Node, descriptor);
    }
    return Node;
  };
}

export function nodeProps(
  node: Record<string, new (...args: any[]) => any>,
): NodePropertyDescriptor[] {
  return Object.entries(node).map(([name, ctor]) => ({
    type: 'node',
    name,
    ctor,
  }));
}

export function containerProps(
  node: Record<string, new (...args: any[]) => any>,
): NodePropertyDescriptor[] {
  return Object.entries(node).map(([name, ctor]) => ({
    type: 'container',
    name,
    ctor,
  }));
}
