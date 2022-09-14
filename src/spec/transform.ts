import { TransformComponent, Primitive } from '../runtime';
import { ChannelTypes } from './geometry';

export type Transform =
  | StackYTransform
  | DodgeXTransform
  | NormalizeYTransform
  | StackEnterTransform
  | JitterTransform
  | JitterYTransform
  | SymmetryYTransform
  | SelectTransform
  | SelectXTransform
  | SelectYTransform
  | GroupXTransform
  | SortXTransform;

export type TransformTypes =
  | 'dodgeX'
  | 'stackY'
  | 'normalizeY'
  | 'stackEnter'
  | 'jitter'
  | 'jitterY'
  | 'symmetryY'
  | 'select'
  | 'selectY'
  | 'selectX'
  | 'groupX'
  | 'sortX'
  | TransformComponent;

export type TransformOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | ((data: Record<string, Primitive>) => Primitive);

export type DodgeXTransform = {
  type?: 'dodgeX';
  groupBy?: string | string[];
  reverse?: boolean;
  orderBy?: TransformOrder;
  paddingInner?: number;
  paddingOuter?: number;
  padding?: number;
};

export type StackYTransform = {
  type?: 'stackY';
  groupBy?: string | string[];
  reverse?: boolean;
  orderBy?: TransformOrder;
  y?: 'y' | 'y1';
};

export type NormalizeYTransform = {
  type?: 'normalizeY';
  series?: boolean;
  groupBy?: string | string[];
  basis?:
    | 'deviation'
    | 'first'
    | 'last'
    | 'max'
    | 'mean'
    | 'median'
    | 'min'
    | 'sum'
    | 'extent';
};

export type JitterTransform = {
  type?: 'jitter';
  paddingX?: number;
  paddingY?: number;
};

export type JitterYTransform = {
  type?: 'jitterY';
  padding?: number;
};

export type StackEnterTransform = {
  type?: 'stackEnter';
  by?: string[];
};

export type SymmetryYTransform = {
  type?: 'symmetryY';
  groupBy?: string | string[];
};

export type Selector =
  | 'min'
  | 'max'
  | 'first'
  | 'last'
  | 'mean'
  | 'median'
  | ((I: number[], V: number[]) => number[]);

export type SelectTransform = {
  type?: 'select';
  groupBy?: string | string[];
} & { [key in ChannelTypes]?: Selector };

export type SelectXTransform = {
  type?: 'selectX';
  groupBy?: string | string[];
  selector?: Selector;
};

export type SelectYTransform = {
  type?: 'selectY';
  groupBy?: string | string[];
  selector?: Selector;
};

export type SortXTransform = {
  type?: 'sortX';
  reverse?: boolean;
  channel?: string;
  reducer?: 'max' | 'min' | ((I: number[], V: Primitive[]) => Primitive);
};

export type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);

export type GroupXTransform = {
  type?: 'groupX';
  orderBy?: ChannelTypes;
  reverse?: boolean;
} & { [key in ChannelTypes]?: Reducer };

// export type SankeyTransform = {
//   type?: 'sankey';
//   nodeId?: (node: any) => string;
//   nodes?: (graph: any) => any;
//   links?: (graph: any) => any;
//   /**
//    * sankey.nodeSort(undefined) is the default and resorts by ascending breadth during each iteration.
//    * sankey.nodeSort(null) specifies the input order of nodes and never sorts.
//    * sankey.nodeSort(function) specifies the given order as a comparator function and sorts once on initialization.
//    */
//   nodeSort?: null | undefined | ((a: any, b: any) => number);
//   /**
//    * sankey.linkSort(undefined) is the default, indicating that vertical order of links within each node will be determined automatically by the layout. If
//    * sankey.linkSort(null) will resort by the input.
//    * sankey.linkSort(function) specifies the given order as a comparator function and sorts once on initialization.
//    */
//   linkSort?: null | undefined | ((a: any, b: any) => number);
//   nodeAlign?:
//     | 'left'
//     | 'center'
//     | 'right'
//     | 'justify'
//     | ((node: any, n: number) => number);
//   nodeWidth?: number;
//   nodePadding?: number;
//   iterations?: number;
//   // support config the depth of node
//   nodeDepth?: (datum: any, maxDepth: number) => number;
// };

// export type WordCloudTransform = {
//   type?: 'wordCloud';
//   /**
//    * @description If specified, sets the rectangular [width, height] of the layout
//    * @default [1, 1]
//    */
//   size?: [number, number];
//   font?: string | ((word: any) => string);
//   fontStyle?: string | ((word: any) => string);
//   fontWeight?: any | ((word: any) => any);
//   fontSize?: number | [number, number] | ((word: any) => number);
//   padding?: number | ((word: any) => number);
//   /**
//    * @description sets the text accessor function, which indicates the text for each word
//    * @default (d) => d.text
//    */
//   text?: (word: any) => number;
//   rotate?: number | ((word: any) => number);
//   timeInterval?: number;
//   random?: number | (() => number);
//   /**
//    * @description sets the current type of spiral used for positioning words. This can either be one of the two built-in spirals, "archimedean" and "rectangular"
//    * @default "archimedean"
//    */
//   spiral?:
//     | 'archimedean'
//     | 'rectangular'
//     | ((size: [number, number]) => (t: number) => number[]);
//   imageMask?: HTMLImageElement | string;
//   on?:
//     | ((type: 'end', details?: { cloud; words; bounds }) => void)
//     | ((type: 'word', details?: { cloud; word }) => void);
// };

// export type VoronoiTransform = {
//   type?: 'voronoi';
//   /**
//    * @description Sets the input fields from the data.
//    */
//   fields: [string, string];
//   /**
//    * @description Sets the output fields into data.
//    */
//   as: [string, string];
//   /**
//    * @description Sets region of canvas.
//    */
//   extend: Vector2[];
// };

// /**
//  * For arc diagram(edge with weight) or chord diagram(with weight)
//  */
// export type ArcTransform = {
//   type?: 'arc';
//   /** Layout y position, default: 0 */
//   y?: number;
//   /** margin between nodes, [0, 1), default: 0.1  */
//   marginRatio?: number;
//   /** Thickness of node, default: 0.05 */
//   thickness?: number;
//   /** Whether calculate weight, default: false */
//   weight?: boolean;
//   /** Key of node, default: node.id */
//   id?: (node: any) => any;
//   /** Source key of edge, default: edge.source */
//   source?: (edge: any) => any;
//   /** Target key of edge, default: edge.target */
//   target?: (edge: any) => any;
//   /** Weight of source, default: edge.value || 1 */
//   sourceWeight?: (edge: any) => number;
//   /** Weight of target, default: edge.value || 1 */
//   targetWeight?: (edge: any) => number;
//   /** Sort method, default: null */
//   sortBy?: 'id' | 'weight' | 'frequency' | null | ((a: any, b: any) => number);
// };

// /**
//  * Cluster layout options.
//  */
// export type ClusterTransform = {
//   type?: 'cluster';
//   /**
//    * Layout field. Default: 'value'.
//    */
//   field?: string;
//   /**
//    * Sets this cluster layout’s node size to the specified two-element array of numbers [width, height] and returns this cluster layout.
//    * Default: null.
//    */
//   nodeSize?: any;
//   /**
//    * The separation accessor is used to separate neighboring leaves.  Default: (a, b) => a.parent == b.parent ? 1 : 2;
//    */
//   separation?: (a, b) => number;
//   /**
//    * Sort function by compare 2 nodes.
//    */
//   sortBy?: (a, b) => number;
//   /**
//    * Layout infomation saved into fields. Default: ['x', 'y'].
//    */
//   as?: [string, string];
// };

// export type TreeTransform = Omit<ClusterTransform, 'type'> & {
//   type?: 'tree';
// };
