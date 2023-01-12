import { Coordinate } from '@antv/coord';
import { DisplayObject } from '@antv/g';
import { select } from '../utils/selection';
import {
  ChannelGroups,
  DataOptions,
  G2MarkState,
  G2Theme,
  G2ViewDescriptor,
} from '../runtime';
import { Chart } from './chart';

/**
 * BFS nodes and execute callback.
 */
function bfs(node: Node, callback?: (...args: any[]) => void) {
  const discovered: Node[] = [node];
  while (discovered.length) {
    const currentNode = discovered.pop();
    callback && callback(currentNode);
    const children = currentNode.children || [];
    for (const child of children) {
      discovered.push(child);
    }
  }
}

export function selectNodeGroup(root: DisplayObject, key: string) {
  return select(root).select(`#${key}`).node();
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
    node.parentNode = this;
    node.index = this.children.length;
    this.children.push(node);
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

  /**
   * Find the root Node.
   */
  findRoot(): Chart {
    let _root: Node = this;
    while (_root && _root.parentNode) {
      _root = _root.parentNode;
    }
    return _root as Chart;
  }

  /**
   * Change the node data and re-render.
   */
  changeData(data: DataOptions[]) {
    this.attr('data', data as Value[keyof Value]);
    const chart = this.findRoot();
    chart.render();
  }

  /**
   * Get render view instance.
   */
  getView(): G2ViewDescriptor {
    const chart = this.findRoot();
    return chart.getView();
  }

  /**
   * Get render theme options.
   */
  getTheme(): G2Theme {
    return this.getView()?.theme;
  }

  /**
   * Get mark from chart views.
   */
  getMark(): G2MarkState {
    const chartView = this.getView();
    if (!chartView) return undefined;
    const { markState } = chartView;
    const markKey = Array.from(markState.keys()).find(
      (item) => item.key === this.attr('key'),
    );
    return markState.get(markKey);
  }

  getScales(): ChannelGroups[] {
    return this.getMark()?.channels;
  }

  getScale(channel: string): ChannelGroups {
    const channels = this.getScales();
    return channels?.find((cha) => cha.name === channel);
  }

  /**
   * Get render coordinate options.
   */
  getCoordinate(): Coordinate {
    return this.getView()?.coordinate;
  }

  getGroup(): DisplayObject {
    const key = this.attr('key');
    if (!key) return undefined;
    const chart = this.findRoot();
    return selectNodeGroup(chart.getGroup(), key);
  }

  /**
   * Show the node.
   */
  show() {
    const group = this.getGroup();
    if (!group) return;
    !group.isVisible() && group.setAttribute('visibility', 'visible');
  }

  /**
   * Hide the node.
   */
  hide() {
    const group = this.getGroup();
    if (!group) return;
    group.isVisible() && group.setAttribute('visibility', 'hidden');
  }
}
