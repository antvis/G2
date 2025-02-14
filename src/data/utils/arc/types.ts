export type ArcOptions = {
  /** Key of node, default: node.id */
  id?: (node: any) => any;
  /** Source key of edge, default: edge.source */
  source?: (edge: any) => any;
  /** Target key of edge, default: edge.target */
  target?: (edge: any) => any;
  /** Weight of source, default: edge.value || 1 */
  sourceWeight?: (edge: any) => number;
  /** Weight of target, default: edge.value || 1 */
  targetWeight?: (edge: any) => number;
  /** Sort method, default: null */
  sortBy?: 'id' | 'weight' | 'frequency' | null | ((a: any, b: any) => number);
  /** Layout y position, default: 0 */
  y?: number;
  /** Whether calculate weight, default: false */
  weight?: boolean;
  /** margin between nodes, [0, 1), default: 0.1  */
  marginRatio?: number;
  /** Thickness of node, default: 0.05 */
  thickness?: number;
};

export interface Edge {
  source: string;
  target: string;
  sourceWeight: number;
  targetWeight: number;
  x: number | number[];
  value: any;
  [key: string]: any;
}

export interface Node {
  key: string;
  id: string;
  x: number | number[];
  y: number | number[];
  [key: string]: any;
}

export type ArcData = {
  nodes: Node[];
  edges: Edge[];
};
