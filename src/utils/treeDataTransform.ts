import { isArray, get } from '@antv/util';
import {
  stratify,
  hierarchy,
  treemap as treemapLayout,
  treemapBinary,
  treemapDice,
  treemapSlice,
  treemapSliceDice,
  treemapSquarify,
  treemapResquarify,
} from '@antv/vendor/d3-hierarchy';
import type { HierarchyNode } from '@antv/vendor/d3-hierarchy';
import { field } from '../mark/utils';

type Data = any[] | Record<string, any>;

export interface Node<T> extends HierarchyNode<T> {
  x0?: number;
  y0?: number;
  x1?: number;
  y1?: number;
}

type Layout = {
  tile?:
    | 'treemapBinary'
    | 'treemapDice'
    | 'treemapSlice'
    | 'treemapSliceDice'
    | 'treemapSquarify'
    | 'treemapResquarify';
  size?: [number, number];
  round?: boolean;
  // Ignore the value of the parent node when calculating the total value.
  ignoreParentValue?: boolean;
  ratio?: number;
  padding?: number;
  paddingInner?: number;
  paddingOuter?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  sort?(a: any, b: any): number;
  path?: (d: any) => any;
  /** The granularity of Display layer.  */
  layer?: number | ((d: any) => any);
};

/**
 * @description Path need when the data is a flat json structure,
 * and the tree object structure do not need.
 */
function generateHierarchyRoot(data: Data, path: (d: any) => any): Node<Data> {
  if (Array.isArray(data)) {
    return typeof path === 'function'
      ? stratify().path(path)(data)
      : stratify()(data);
  }
  return hierarchy(data);
}

function addObjectDataPath(
  root: Node<Record<string, any>>,
  path: any = [root.data.name],
) {
  // @ts-ignore
  root.id = root.id || root.data.name;
  root.path = path;

  if (root.children) {
    root.children.forEach((item) => {
      // @ts-ignore
      item.id = `${root.id}/${item.data.name}`;
      item.path = [...path, item.data.name] as any;
      addObjectDataPath(item, item.path);
    });
  }
}

function addArrayDataPath(root: Node<any[]>) {
  const name = get(root, ['data', 'name']);
  if (name.replaceAll) {
    root.path = name.replaceAll('.', '/').split('/');
  }

  if (root.children) {
    root.children.forEach((item) => {
      addArrayDataPath(item);
    });
  }
}

function getTileMethod(tile: string, ratio: number) {
  const tiles = {
    treemapBinary,
    treemapDice,
    treemapSlice,
    treemapSliceDice,
    treemapSquarify,
    treemapResquarify,
  };
  const tileMethod =
    tile === 'treemapSquarify' ? tiles[tile].ratio(ratio) : tiles[tile];
  if (!tileMethod) {
    throw new TypeError('Invalid tile method!');
  }
  return tileMethod;
}

export function treeDataTransform(
  data,
  layout: Layout,
  encode,
): [Node<Data>[], Node<Data>[]] {
  const { value } = encode;
  const tileMethod = getTileMethod(layout.tile, layout.ratio);

  const root = generateHierarchyRoot(data, layout.path);

  if (isArray(data)) {
    addArrayDataPath(root as HierarchyNode<any[]>);
  } else {
    addObjectDataPath(root as HierarchyNode<Record<string, any>>);
  }

  // Calculate the value and sort.
  value
    ? root
        .sum((d) =>
          layout.ignoreParentValue && (d as Record<string, any>).children
            ? 0
            : field(value)(d),
        )
        .sort(layout.sort)
    : root.count();

  treemapLayout()
    .tile(tileMethod)
    // @ts-ignore
    .size(layout.size)
    .round(layout.round)
    .paddingInner(layout.paddingInner)
    .paddingOuter(layout.paddingOuter)
    .paddingTop(layout.paddingTop)
    .paddingRight(layout.paddingRight)
    .paddingBottom(layout.paddingBottom)
    .paddingLeft(layout.paddingLeft)(root);

  const nodes = root.descendants().map((d) =>
    Object.assign(d, {
      id: d.id.replace(/^\//, ''),
      x: [d.x0, d.x1],
      y: [d.y0, d.y1],
    }),
  );

  const filterData = nodes.filter(
    typeof layout.layer === 'function'
      ? layout.layer
      : (d) => d.height === layout.layer,
  );

  return [filterData, nodes];
}
