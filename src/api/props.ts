import { isObject, clone } from '@antv/util';

export type NodePropertyDescriptor = {
  type: 'object' | 'value' | 'array' | 'node' | 'container';
  name: string;
  key?: string;
  ctor?: new (...args: any[]) => any;
};

function defineValueProp(Node, { name, key = name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (value) {
    return this.attr(key, value);
  };
}

function defineArrayProp(Node, { name, key = name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (value) {
    if (Array.isArray(value) || value === undefined) {
      return this.attr(key, value);
    }
    const array = this.attr(key);
    const newArray = [...(Array.isArray(array) ? array : [])];
    newArray.push(value);
    return this.attr(key, newArray);
  };
}

function defineObjectProp(
  Node,
  { name, key: k = name }: NodePropertyDescriptor,
) {
  Node.prototype[name] = function (key, value) {
    if (isObject(key) || key === undefined) {
      return this.attr(k, key);
    }
    const newObject = clone(this.attr(k) || {});
    newObject[key] = value;
    return this.attr(k, newObject);
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
