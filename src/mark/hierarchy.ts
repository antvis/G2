import { deepMix, pick } from '@antv/util';
import { CompositeMarkComponent } from '../runtime';
import { BaseMark, ChannelTypes } from '../spec';
export type HierarchyMark = BaseMark<'rect', 'value' | ChannelTypes>;

export interface HierarchyNode {
  name: string;
  value: number;
  children?: HierarchyNode[];
  [key: string]: any;
}

export interface HierarchyDataNode {
  data: HierarchyNode;
  depth: number;
  parent: HierarchyDataNode | null;
  children: HierarchyDataNode[];
  x0: number;
  x1: number;
  value: number;
}

export interface LayoutOptions {
  field?: string;
  sort?: (a: HierarchyNode, b: HierarchyNode) => number;
  fillParent?: boolean; // Whether child nodes fill parent width.
}

/**
 * Hierarchy layout algorithm.
 * Child nodes start layout from the parent's starting position to show parent-child relationships.
 *
 * @param data Hierarchical data
 * @param options Configuration options
 */
export function hierarchyLayout(
  data: HierarchyNode[],
  options: LayoutOptions = {},
) {
  const {
    field = 'value',
    sort = (a: HierarchyNode, b: HierarchyNode) => b[field] - a[field],
    fillParent = true,
  } = options;

  if (!data || data.length === 0) return [];

  // Build hierarchical structure
  const buildHierarchy = (
    node: HierarchyNode,
    parent: HierarchyDataNode | null = null,
    depth = 0,
  ): HierarchyDataNode => {
    const hierarchyNode: HierarchyDataNode = {
      data: node,
      depth,
      parent,
      children: [],
      x0: 0,
      x1: 0,
      value: node[field] || 0,
    };

    if (node.children && node.children.length > 0) {
      hierarchyNode.children = node.children.map((child: HierarchyNode) =>
        buildHierarchy(child, hierarchyNode, depth + 1),
      );
    }

    return hierarchyNode;
  };

  // Process each root node
  const result: Array<Record<string, any>> = [];
  let currentRootStartX = 0; // Track the starting position for the next root node

  data.forEach((rootData: HierarchyNode) => {
    const root = buildHierarchy(rootData);

    // Calculate position for each node - key point: child nodes start layout from parent's starting position
    const calculateLayout = (
      node: HierarchyDataNode,
      parentStartX = 0,
      isRootNode = false,
      parentWidth = 0, // Parent node actual width.
    ): void => {
      if (isRootNode || node.depth === 0) {
        // Root node: start from current root position
        node.x0 = isRootNode ? parentStartX : 0;
        node.x1 = node.x0 + node.value;
      } else {
        // Child node: start layout from parent's starting position
        node.x0 = parentStartX;
        if (fillParent && parentWidth > 0) {
          // If fillParent is true, calculate width based on parent width and value ratio.
          const totalChildrenValue =
            node.parent?.children.reduce(
              (sum, child) => sum + child.value,
              0,
            ) || node.value;
          const ratio = node.value / totalChildrenValue;
          node.x1 = parentStartX + parentWidth * ratio;
        } else {
          // If fillParent is false, use node own value as width.
          node.x1 = parentStartX + node.value;
        }
      }

      // Calculate position for child nodes - start from current node's starting position
      let childStartX = node.x0;
      const nodeWidth = node.x1 - node.x0;

      // Sort by value (larger first)
      const sortedChildren = [...node.children].sort(
        (a: HierarchyDataNode, b: HierarchyDataNode) =>
          // forward underlying data nodes to the provided comparator
          sort(a.data, b.data),
      );

      if (fillParent && sortedChildren.length > 0) {
        // fillParent mode: child nodes fill parent width proportionally.
        sortedChildren.forEach((child: HierarchyDataNode) => {
          calculateLayout(child, childStartX, false, nodeWidth);
          // Calculate child node position ratio in parent.
          const totalChildrenValue = node.children.reduce(
            (sum, child) => sum + child.value,
            0,
          );
          const ratio = child.value / totalChildrenValue;
          childStartX += nodeWidth * ratio;
        });
      } else {
        // Non-fillParent mode: child nodes layout independently based on own value.
        sortedChildren.forEach((child: HierarchyDataNode) => {
          calculateLayout(child, childStartX, false, 0);
          // Next child node starts from current child node's end position
          childStartX += child.x1 - child.x0 + 0.01; // Add small spacing
        });
      }
    };

    // Start layout calculation from root node, using current root start position
    calculateLayout(root, currentRootStartX, true);

    // Update the starting position for the next root node
    currentRootStartX += root.value + 0.02; // Add spacing between root nodes

    // Convert to final format
    const processNode = (node: HierarchyDataNode): Record<string, any> => {
      const path = [node.data.name];
      let ancestorNode = node;
      while (ancestorNode.parent) {
        path.unshift(ancestorNode.parent.data.name);
        ancestorNode = ancestorNode.parent;
      }

      return {
        ...pick(node.data, [field]),
        [HIERARCHY_PATH_FIELD]: path,
        [HIERARCHY_ANCESTOR_FIELD]:
          ancestorNode.parent?.data?.name || node.data.name,
        name: node.data.name,
        depth: node.depth,
        value: node.value,
        x: [node.x0, node.x1],
        y: [node.depth, node.depth + 1],
        // Add child node count attribute for drill-down interaction judgment
        [CHILD_NODE_COUNT]: node.children.length,
      };
    };

    // Collect all nodes
    const collectResultNodes = (node: HierarchyDataNode): void => {
      result.push(processNode(node));
      node.children.forEach(collectResultNodes);
    };

    collectResultNodes(root);
  });

  return result;
}

export type HierarchyData = HierarchyNode[];

export type HierarchyOptions = Omit<HierarchyMark, 'type'> & {
  fillParent?: boolean; // Whether child nodes fill parent width.
};

export const HIERARCHY_TYPE = 'hierarchy';
export const HIERARCHY_TYPE_FIELD = 'markType';
export const HIERARCHY_Y_FIELD = 'value';
export const HIERARCHY_PATH_FIELD = 'path';
export const HIERARCHY_ANCESTOR_FIELD = 'ancestor-node';
export const CHILD_NODE_COUNT = 'childNodeCount';

export function transformData(
  options: Pick<HierarchyOptions, 'data' | 'encode'> & { fillParent?: boolean },
) {
  const { data, encode, fillParent } = options;
  const { color, value } = encode;

  // Use the real hierarchy layout algorithm
  const nodes = hierarchyLayout(data, {
    field: value,
    fillParent,
  });

  return nodes.map((node: Record<string, any>) => {
    // Handle color mapping
    const nodeInfo = { ...node };
    if (color && color !== HIERARCHY_ANCESTOR_FIELD) {
      nodeInfo[color] = node.data?.[color] || node[color];
    }
    return nodeInfo;
  });
}

const DEFAULT_OPTIONS = {
  id: HIERARCHY_TYPE,
  encode: {
    x: 'x',
    y: 'y',
    key: HIERARCHY_PATH_FIELD,
    color: HIERARCHY_ANCESTOR_FIELD,
    value: 'value',
  },
  labels: [
    {
      style: {
        pointerEvents: 'none',
      },
      text: 'value',
      position: 'inside',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
  axis: {
    x: { title: 'Time/Order', label: true },
    y: false,
  },
  style: {
    [HIERARCHY_TYPE_FIELD]: HIERARCHY_TYPE,
    [CHILD_NODE_COUNT]: 'childNodeCount', // Add child node count attribute for drill-down interaction
  },
  state: {
    active: { zIndex: 2 },
    inactive: { zIndex: 1 },
  },
  legend: false,
  coordinate: {
    type: 'cartesian',
    grid: false, // Remove grid lines
  },
  interaction: {
    drillDown: true,
  },
};

export const Hierarchy: CompositeMarkComponent<HierarchyOptions> = (
  options,
) => {
  const {
    encode: encodeOption,
    data = [],
    fillParent = true,
    ...resOptions
  } = options;

  const encode = { ...DEFAULT_OPTIONS.encode, ...encodeOption };
  const { value } = encode;
  const rectData = transformData({ encode, data, fillParent });

  return [
    deepMix({}, DEFAULT_OPTIONS, {
      type: 'rect',
      data: rectData,
      encode,
      tooltip: {
        title: 'path',
        items: [
          (d: Record<string, any>) => {
            return {
              name: value as string,
              value: d[value],
            };
          },
        ],
      },
      // Add basic interaction
      interaction: {
        elementHighlight: true,
      },
      ...resOptions,
    }),
  ];
};

Hierarchy.props = {};
