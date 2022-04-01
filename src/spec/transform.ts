import { TransformComponent } from '../runtime';

export type Transform =
  | SortByTransform
  | PickTransform
  | RenameTransform
  | SubsetTransform
  | FetchTransform
  | FilterByTransform
  | CustomTransform;

export type TransformTypes =
  | 'sortBy'
  | 'fetch'
  | 'filterBy'
  | 'pick'
  | TransformComponent;

export type SortByTransform = {
  type?: 'sortBy';
  fields?: string[];
  order?: 'DESC' | 'ASC';
};

export type PickTransform = {
  type?: 'pick';
  fields?: string[];
};

export type RenameTransform = {
  type?: 'rename';
  map?: Record<string, string>;
};

export type SubsetTransform = {
  type?: 'subset';
  start?: number;
  end?: number;
  fields?: string[];
};

export type FetchTransform = {
  type?: 'fetch';
  url?: string;
  format?: 'json';
  callback?: (d: any) => any;
};

export type FilterByTransform = {
  type?: 'filterBy';
  fields?: string[];
  callback?: (d: any) => boolean;
};

export type SankeyTransform = {
  type?: 'sankey';
  nodeId?: (node: any) => string;
  nodes?: (graph: any) => any;
  links?: (graph: any) => any;
  /**
   * sankey.nodeSort(undefined) is the default and resorts by ascending breadth during each iteration.
   * sankey.nodeSort(null) specifies the input order of nodes and never sorts.
   * sankey.nodeSort(function) specifies the given order as a comparator function and sorts once on initialization.
   */
  nodeSort?: null | undefined | ((a: any, b: any) => number);
  /**
   * sankey.linkSort(undefined) is the default, indicating that vertical order of links within each node will be determined automatically by the layout. If
   * sankey.linkSort(null) will resort by the input.
   * sankey.linkSort(function) specifies the given order as a comparator function and sorts once on initialization.
   */
  linkSort?: null | undefined | ((a: any, b: any) => number);
  nodeAlign?:
    | 'left'
    | 'center'
    | 'right'
    | 'justify'
    | ((node: any, n: number) => number);
  nodeWidth?: number;
  nodePadding?: number;
  iterations?: number;
  // support config the depth of node
  nodeDepth?: (datum: any, maxDepth: number) => number;
};

export type CustomTransform = {
  type?: TransformComponent;
  [key: string]: any;
};
