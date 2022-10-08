import { isObject, clone, deepMix, get, isString } from '@antv/util';

export type NodePropertyDescriptor = {
  type: 'object' | 'value' | 'array' | 'node' | 'container';
  name: string;
  key?: string;
  ctor?: new (...args: any[]) => any;
};

function defineValueProp(Node, { name, key = name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (...args) {
    return this.attr.apply(this, [key, ...args]);
  };
}

function defineArrayProp(Node, { name, key = name }: NodePropertyDescriptor) {
  Node.prototype[name] = function (...args) {
    if (args.length === 0) return this.attr(key);
    const [value] = args;
    if (Array.isArray(value) || value === undefined) {
      return this.attr(key, clone(value));
    }
    const array = [...(this.attr(key) || []), value];
    return this.attr(key, array);
  };
}

function defineObjectProp(
  Node,
  { name, key: k = name }: NodePropertyDescriptor,
) {
  Node.prototype[name] = function (...args) {
    if (args.length === 0) return this.attr(k);
    if (args.length === 1) {
      if (isString(args[0])) return get(this.attr(k), args[0]);
      if (isObject(args[0]) || args[0] === undefined)
        return this.attr(k, clone(args[0]));
    }
    if (isString(args[0])) {
      const obj = deepMix({}, this.attr(k) || {}, { [args[0]]: args[1] });
      return this.attr(k, obj);
    }
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
