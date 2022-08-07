import { clone } from '@antv/util';

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
   * Apply specified transform to current value and clone a new node.
   * Mount the cloned node to replace the original one in the tree
   * and then return it.
   */
  map(transform = (x: Value): Value => x): this {
    const newValue = transform(clone(this.value));
    this.value = newValue;
    return this;
  }

  /**
   * Set or get the specified attribute. It the value is specified, update
   * the attribute of current value and return a new cloned node. Otherwise
   * return the the attribute of current value.
   */
  attr<T extends Value[keyof Value]>(
    key: keyof Value,
    value?: T,
  ): T extends undefined ? T : this {
    if (value === undefined) return this.value[key];
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
    node.parentNode = this;
    node.index = this.children.length;
    this.children.push(node);
    return node;
  }

  /**
   * Apply specified callback to a new cloned node.
   */
  pipe(callback: (this, ...params: any[]) => any, ...params: any[]): this {
    callback(this.map(), ...params);
    return this;
  }
}
