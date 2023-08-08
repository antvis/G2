import { Runtime } from './runtime';

/**
 * BFS nodes and execute callback.
 */
function bfs(node: Node, callback?: (...args: any[]) => void) {
  const discovered: Node[] = [node];
  while (discovered.length) {
    const currentNode = discovered.shift();
    callback && callback(currentNode);
    const children = currentNode.children || [];
    for (const child of children) {
      discovered.push(child);
    }
  }
}

/**
 * Hierarchy container.
 */
export class Node<
  Value extends Record<string, any> = Record<string, any>,
  ParentValue extends Record<string, any> = Record<string, any>,
  ChildValue extends Record<string, any> = Record<string, any>,
> {
  // The parent node.
  parentNode: Node<ParentValue, Record<string, any>, Value> = null;

  // The children nodes.
  children: Node<ChildValue, Value, Record<string, any>>[] = [];

  // The index of parent children.
  index = 0;

  // The value of the node.
  value: Partial<Value>;

  // The type of the node.
  type: string;

  constructor(value: Partial<Value> = {}, type?: string) {
    this.type = type;
    this.value = value;
  }

  /**
   * Apply specified transform to current value. Mount the node
   * to replace the original one in the tree and then return it.
   */
  map(transform = (x: Value): Value => x): this {
    const newValue = transform(this.value as Value);
    this.value = newValue;
    return this;
  }

  /**
   * Set or get the specified attribute. It the value is specified, update
   * the attribute of current value and return the node. Otherwise
   * return the the attribute of current value.
   */
  attr<T extends Value[keyof Value]>(
    key: keyof Value,
    value?: T,
  ): T extends undefined ? T : this {
    if (arguments.length === 1) return this.value[key];
    return this.map((v) => ((v[key] = value), v)) as any;
  }

  /**
   * Create a new node and append to children nodes.
   */
  append(
    Ctor: new (value: Record<string, any>) => Node<ChildValue, Value>,
  ): Node<ChildValue, Value> {
    const node = new Ctor({});
    node.children = [];
    this.push(node);
    return node;
  }

  push(node: Node<ChildValue, Value>): this {
    node.parentNode = this;
    node.index = this.children.length;
    this.children.push(node);
    return this;
  }

  /**
   * Remove current node from parentNode.
   */
  remove(): Node {
    const parent = this.parentNode;
    if (parent) {
      const { children } = parent;
      const index = children.findIndex((item) => item === this);
      children.splice(index, 1);
    }
    return this;
  }

  getNodeByKey(key: string): Node {
    let targetNode = null;
    const callback = (node: Node) => {
      if (key === node.attr('key')) {
        targetNode = node;
      }
    };
    bfs(this, callback);
    return targetNode;
  }

  getNodesByType(type: string): Node[] {
    const nodes = [];
    const callback = (node: Node) => {
      if (type === node.type) {
        nodes.push(node);
      }
    };
    bfs(this, callback);
    return nodes;
  }

  getNodeByType(type: string): Node {
    let node = null;
    bfs(this, (current: Node) => {
      if (node) return;
      if (type === current.type) node = current;
    });
    return node;
  }

  /**
   * Apply specified callback to the node value.
   */
  call(
    callback: (node: this, ...params: any[]) => any,
    ...params: any[]
  ): this {
    callback(this.map(), ...params);
    return this;
  }

  getRoot(): Runtime {
    // Find the root chart and render.
    let root: Node = this;
    while (root && root.parentNode) {
      root = root.parentNode;
    }
    return root as Runtime;
  }
}
