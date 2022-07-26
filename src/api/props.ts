import { isObject, clone } from '@antv/util';

export type NodePropertyDescriptor = {
  type: 'object' | 'value' | 'array' | 'node';
  name: string;
  ctor?: new (...args: any[]) => any;
};

function defineValueProp(Node, { name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (value) {
    return this.attr(name, value);
  };
}

function defineArrayProp(Node, { name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (value) {
    if (Array.isArray(value) || value === undefined) {
      return this.attr(name, value);
    }
    const array = this.attr(name);
    const newArray = [...(Array.isArray(array) ? array : [])];
    newArray.push(value);
    return this.attr(name, newArray);
  };
}

function defineObjectProp(Node, { name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (key, value) {
    if (isObject(key) || key === undefined) {
      return this.attr(name, key);
    }
    const newObject = clone(this.attr(name) || {});
    newObject[key] = value;
    return this.attr(name, newObject);
  };
}

function defineNodeProp(Node, { name, ctor }: NodePropertyDescriptor) {
  Node.prototype[name] = function () {
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
    }
    return Node;
  };
}
