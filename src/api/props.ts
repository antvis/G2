import { isStrictObject } from '../utils/helper';

export type NodePropertyDescriptor = {
  type: 'object' | 'value' | 'array' | 'node' | 'container' | 'mix';
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
    if (arguments.length === 1 && typeof key !== 'string') {
      return this.attr(k, key);
    }
    const obj = this.attr(k) || {};
    obj[key] = arguments.length === 1 ? true : value;
    return this.attr(k, obj);
  };
}

function defineMixProp(Node, { name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (key) {
    if (arguments.length === 0) return this.attr(name);
    if (Array.isArray(key)) return this.attr(name, { items: key });
    if (
      isStrictObject(key) &&
      (key.title !== undefined || key.items !== undefined)
    ) {
      return this.attr(name, key);
    }
    if (key === null || key === false) return this.attr(name, key);
    const obj = this.attr(name) || {};
    const { items = [] } = obj;
    items.push(key);
    obj.items = items;
    return this.attr(name, obj);
  };
}

function defineNodeProp(Node, { name, ctor }: NodePropertyDescriptor) {
  Node.prototype[name] = function (hocMark?) {
    const node = this.append(ctor);
    if (name === 'mark') {
      node.type = hocMark;
    }
    return node;
  };
}

function defineContainerProp(Node, { name, ctor }: NodePropertyDescriptor) {
  Node.prototype[name] = function () {
    this.type = null;
    return this.append(ctor);
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
      else if (type === 'mix') defineMixProp(Node, descriptor);
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
