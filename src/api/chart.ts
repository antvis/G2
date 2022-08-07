import { clone } from '@antv/util';
import { render } from '../runtime';
import { ViewComposition } from '../spec';
import { Node } from './node';
import { defineProps, NodePropertyDescriptor } from './props';
import {
  Area,
  Interval,
  Point,
  Line,
  Grid,
  Vector,
  Link,
  Polygon,
  Image,
  Text,
  Schema,
  AnnotationText,
  AnnotationBadge,
  AnnotationLineX,
  AnnotationLineY,
  AnnotationRange,
  AnnotationRangeX,
  AnnotationRangeY,
  AnnotationConnector,
} from './mark';
import {
  ValueAttribute,
  Concrete,
  ArrayAttribute,
  ObjectAttribute,
} from './types';

function normalizeContainer(container: string | HTMLElement): HTMLElement {
  if (container === undefined) return document.createElement('div');
  if (typeof container === 'string') {
    const node = document.getElementById(container);
    return node;
  }
  return container;
}

function normalizeRoot(root: Node) {
  if (root.type !== null) return root;
  return root.children[0];
}

function valueOf(node: Node): Record<string, any> {
  const value = clone(node.value);
  return {
    ...value,
    type: node.type,
  };
}

export function optionsOf(root: Node): Record<string, any> {
  const discovered: Node[] = [root];
  const nodeValue = new Map<Node, Record<string, any>>();
  nodeValue.set(root, valueOf(root));
  while (discovered.length) {
    const node = discovered.pop();
    const value = nodeValue.get(node);
    for (const child of node.children) {
      const childValue = valueOf(child);
      const { children = [] } = value;
      children.push(childValue);
      discovered.push(child);
      nodeValue.set(child, childValue);
      value.children = children;
    }
  }
  return nodeValue.get(root);
}

export type ChartOptions = ViewComposition & {
  container?: string | HTMLElement;
};

type ChartProps = Concrete<ViewComposition>;

export interface Chart {
  render(): void;
  node(): HTMLElement;
  data: ValueAttribute<ChartProps['data'], Chart>;
  coordinate: ArrayAttribute<ChartProps['coordinate'], Chart>;
  interaction: ArrayAttribute<ChartProps['interaction'], Chart>;
  title: ObjectAttribute<ChartProps['title'], Chart>;
  key: ValueAttribute<ChartProps['key'], Chart>;
  interval(): Interval;
  point(): Point;
  area(): Area;
  line(): Line;
  grid(): Grid;
  vector(): Vector;
  link(): Link;
  polygon(): Polygon;
  image(): Image;
  text(): Text;
  schema(): Schema;
  annotationText(): AnnotationText;
  annotationBadge(): AnnotationBadge;
  annotationLineX(): AnnotationLineX;
  annotationLineY(): AnnotationLineY;
  annotationRange(): AnnotationRange;
  annotationRangeX(): AnnotationRangeX;
  annotationRangeY(): AnnotationRangeY;
  annotationConnector(): AnnotationConnector;
}

export const props: NodePropertyDescriptor[] = [
  { name: 'data', type: 'value' },
  { name: 'coordinate', type: 'array' },
  { name: 'interaction', type: 'array' },
  { name: 'theme', type: 'object' },
  { name: 'title', type: 'object' },
  { name: 'key', type: 'value' },
  { name: 'interval', type: 'node', ctor: Interval },
  { name: 'point', type: 'node', ctor: Point },
  { name: 'area', type: 'node', ctor: Area },
  { name: 'line', type: 'node', ctor: Line },
  { name: 'grid', type: 'node', ctor: Grid },
  { name: 'vector', type: 'node', ctor: Vector },
  { name: 'link', type: 'node', ctor: Link },
  { name: 'polygon', type: 'node', ctor: Polygon },
  { name: 'image', type: 'node', ctor: Image },
  { name: 'text', type: 'node', ctor: Text },
  { name: 'schema', type: 'node', ctor: Schema },
  { name: 'annotationText', type: 'node', ctor: AnnotationText },
  { name: 'annotationBadge', type: 'node', ctor: AnnotationBadge },
  { name: 'annotationLineX', type: 'node', ctor: AnnotationLineX },
  { name: 'annotationLineY', type: 'node', ctor: AnnotationLineY },
  { name: 'annotationRange', type: 'node', ctor: AnnotationRange },
  { name: 'annotationRangeX', type: 'node', ctor: AnnotationRangeX },
  { name: 'annotationRangeY', type: 'node', ctor: AnnotationRangeY },
  { name: 'annotationConnector', type: 'node', ctor: AnnotationConnector },
];

@defineProps(props)
export class Chart extends Node<ChartOptions> {
  private container: HTMLElement;

  constructor(options: ChartOptions = {}) {
    const { container, ...rest } = options;
    super(rest, 'view');
    this.container = normalizeContainer(container);
  }

  render() {
    const root = normalizeRoot(this);
    const node = render(optionsOf(root));
    this.container.append(node);
    return this;
  }

  node() {
    return this.container;
  }
}
