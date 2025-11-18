import { deepMix, pick } from '@antv/util';
import { CompositeMarkComponent } from '../runtime';
import { BaseMark, ChannelTypes, PartitionNode } from '../spec';
export type PartitionMark = BaseMark<'rect', 'value' | ChannelTypes>;

export interface PartitionDataNode {
  data: PartitionNode;
  depth: number;
  parent: PartitionDataNode | null;
  children: PartitionDataNode[];
  x0: number;
  x1: number;
  value: number;
}

export interface LayoutOptions {
  valueField?: string;
  sort?: (a: PartitionNode, b: PartitionNode) => number;
  fillParent?: boolean; // Whether child nodes fill parent width.
  nameField?: string;
}

/**
 * Partition layout algorithm.
 * Child nodes start layout from the parent's starting position to show parent-child relationships.
 *
 * @param data Hierarchical data
 * @param options Configuration options
 */
export function partitionLayout(
  data: PartitionNode[],
  options: LayoutOptions = {},
) {
  const {
    valueField = 'value',
    sort,
    fillParent = true,
    nameField = 'name',
  } = options;

  if (!data || data.length === 0) return [];

  // Build hierarchical structure
  const buildPartition = (
    node: PartitionNode,
    parent: PartitionDataNode | null = null,
    depth = 0,
  ): PartitionDataNode => {
    const partitionNode: PartitionDataNode = {
      data: node,
      depth,
      parent,
      children: [],
      x0: 0,
      x1: 0,
      value: node[valueField] || 0,
    };

    if (node.children && node.children.length > 0) {
      partitionNode.children = node.children.map((child: PartitionNode) =>
        buildPartition(child, partitionNode, depth + 1),
      );
    }

    return partitionNode;
  };

  // Process each root node
  const result: Array<Record<string, any>> = [];
  let currentRootStartX = 0; // Track the starting position for the next root node

  data.forEach((rootData: PartitionNode) => {
    const root = buildPartition(rootData);

    // Calculate position for each node - key point: child nodes start layout from parent's starting position
    const calculateLayout = (
      node: PartitionDataNode,
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
          const siblingsTotalValue = node.parent
            ? node.parent.children.reduce((acc, child) => acc + child.value, 0)
            : node.value;
          const siblingsCount = node.parent ? node.parent.children.length : 1;
          const ratio =
            siblingsTotalValue > 0
              ? node.value / siblingsTotalValue
              : 1 / siblingsCount;
          node.x1 = parentStartX + parentWidth * ratio;
        } else {
          // If fillParent is false, use node own value as width.
          node.x1 = parentStartX + node.value;
        }
      }

      // Calculate position for child nodes - start from current node's starting position
      let childStartX = node.x0;
      const nodeWidth = node.x1 - node.x0;

      const sortedChildren = sort
        ? [...node.children].sort(
            (a: PartitionDataNode, b: PartitionDataNode) =>
              sort(a.data, b.data),
          )
        : node.children;

      if (fillParent && sortedChildren.length > 0) {
        // fillParent mode: child nodes fill parent width proportionally.
        const childrenTotalValue = node.children.reduce(
          (sum, c) => sum + c.value,
          0,
        );
        sortedChildren.forEach((child: PartitionDataNode) => {
          calculateLayout(child, childStartX, false, nodeWidth);
          const ratio =
            childrenTotalValue > 0
              ? child.value / childrenTotalValue
              : 1 / sortedChildren.length;
          childStartX += nodeWidth * ratio;
        });
      } else {
        // Non-fillParent mode: child nodes layout independently based on own value.
        sortedChildren.forEach((child: PartitionDataNode) => {
          calculateLayout(child, childStartX, false, 0);
          // Next child node starts from current child node's end position.
          childStartX += child.x1 - child.x0;
        });
      }
    };

    // Start layout calculation from root node, using current root start position.
    calculateLayout(root, currentRootStartX, true);

    // Update the starting position for the next root node.
    currentRootStartX += root.value;

    // Convert to final format.
    const processNode = (node: PartitionDataNode): Record<string, any> => {
      const getName = (d: PartitionNode) => d[nameField] ?? d.name;
      const path = [getName(node.data)];
      let ancestorNode = node;
      while (ancestorNode.parent) {
        path.unshift(getName(ancestorNode.parent.data));
        ancestorNode = ancestorNode.parent;
      }

      return {
        ...pick(node.data, [valueField]),
        [PARTITION_PATH_FIELD]: path,
        [PARTITION_ANCESTOR_FIELD]:
          ancestorNode.parent?.data?.[nameField] ?? node.data[nameField],
        name: node.data[nameField],
        depth: node.depth,
        value: node.value,
        x: [node.x0, node.x1],
        y: [node.depth, node.depth + 1],
        // Add child node count attribute for drill-down interaction judgment.
        [CHILD_NODE_COUNT]: node.children.length,
      };
    };

    // Collect all nodes.
    const collectResultNodes = (node: PartitionDataNode): void => {
      result.push(processNode(node));
      node.children.forEach(collectResultNodes);
    };

    collectResultNodes(root);
  });

  return result;
}

export type PartitionData = PartitionNode[];

export type PartitionOptions = Omit<PartitionMark, 'type'> & {
  fillParent?: boolean; // Whether child nodes fill parent width.
};

export const PARTITION_TYPE = 'partition';
export const PARTITION_TYPE_FIELD = 'markType';
export const PARTITION_PATH_FIELD = 'path';
export const PARTITION_ANCESTOR_FIELD = 'ancestor-node';
export const CHILD_NODE_COUNT = 'childNodeCount';

export function transformData(
  options: Pick<PartitionOptions, 'data' | 'encode'> & {
    fillParent?: boolean;
    sort?: (a: PartitionNode, b: PartitionNode) => number;
  },
) {
  const { data, encode, fillParent, sort } = options;
  const { color, value, name } = encode as any;

  const nodes = partitionLayout(data, {
    valueField: value,
    fillParent,
    nameField: name,
    sort,
  });

  return nodes.map((node: Record<string, any>) => {
    // Handle color mapping.
    const nodeInfo = { ...node };
    if (color && color !== PARTITION_ANCESTOR_FIELD) {
      nodeInfo[color] = node[color];
    }
    return nodeInfo;
  });
}

const DEFAULT_OPTIONS = {
  id: PARTITION_TYPE,
  encode: {
    x: 'x',
    y: 'y',
    key: PARTITION_PATH_FIELD,
    color: PARTITION_ANCESTOR_FIELD,
    value: 'value',
    name: 'name',
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
    [PARTITION_TYPE_FIELD]: PARTITION_TYPE,
    [CHILD_NODE_COUNT]: 'childNodeCount', // Add child node count attribute for drill-down interaction.
  },
  state: {
    active: { zIndex: 2 },
    inactive: { zIndex: 1 },
  },
  legend: false,
  coordinate: {
    type: 'cartesian',
    grid: false, // Remove grid lines.
  },
  interaction: {
    drillDown: true,
  },
};

export const Partition: CompositeMarkComponent<PartitionOptions> = (
  options,
) => {
  const {
    encode: encodeOption,
    data = [],
    layout = {},
    ...resOptions
  } = options;

  const { fillParent = true, sort } = layout as {
    fillParent?: boolean;
    sort?: (a: PartitionNode, b: PartitionNode) => number;
  };

  const encode = { ...DEFAULT_OPTIONS.encode, ...encodeOption };
  const { value } = encode;
  const rectData = transformData({ encode, data, fillParent, sort });

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
      // Add basic interaction.
      interaction: {
        elementHighlight: true,
      },
      ...resOptions,
    }),
  ];
};

Partition.props = {};
