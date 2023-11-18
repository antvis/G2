import { group, sum } from 'd3-array';
import { error } from '../../../utils/helper';
import { ArcData, ArcOptions } from './types';
import * as SortMethods from './sort';

const DEFAULT_OPTIONS = {
  y: 0,
  thickness: 0.05,
  weight: false,
  marginRatio: 0.1,
  id: (node) => node.id,
  source: (edge) => edge.source,
  target: (edge) => edge.target,
  sourceWeight: (edge) => edge.value || 1,
  targetWeight: (edge) => edge.value || 1,
  sortBy: null,
};

/**
 * Layout for Arc / Chord diagram with d3 style.
 */
export function Arc(options?: ArcOptions) {
  const {
    y,
    thickness,
    weight,
    marginRatio,
    id,
    source,
    target,
    sourceWeight,
    targetWeight,
    sortBy,
  } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  function arc(data: ArcData) {
    // Clone first.
    const nodes = data.nodes.map((n) => ({ ...n }));
    const edges = data.edges.map((n) => ({ ...n }));

    // Keep reference in below functions.
    preprocess(nodes, edges);
    sortNodes(nodes, edges);
    layoutNodes(nodes, edges);
    layoutEdges(nodes, edges);

    return { nodes, edges };
  }

  /**
   * Calculate id, value, frequency for node, and source,target for edge.
   */
  function preprocess(nodes, edges) {
    edges.forEach((edge) => {
      edge.source = source(edge);
      edge.target = target(edge);
      edge.sourceWeight = sourceWeight(edge);
      edge.targetWeight = targetWeight(edge);
    });

    // Group edges by source, target.
    const edgesBySource = group(edges, (e: any) => e.source);
    const edgesByTarget = group(edges, (e: any) => e.target);

    nodes.forEach((node) => {
      node.id = id(node);
      const sources = edgesBySource.has(node.id)
        ? edgesBySource.get(node.id)
        : [];
      const targets = edgesByTarget.has(node.id)
        ? edgesByTarget.get(node.id)
        : [];
      node.frequency = sources.length + targets.length;

      node.value =
        sum(sources, (d) => d.sourceWeight) +
        sum(targets, (d) => d.targetWeight);
    });

    return { nodes, edges };
  }

  function sortNodes(nodes, edges) {
    const method = typeof sortBy === 'function' ? sortBy : SortMethods[sortBy];

    if (method) {
      nodes.sort(method);
    }
  }

  function layoutNodes(nodes, edges) {
    const size = nodes.length;
    if (!size) {
      throw error("Invalid nodes: it's empty!");
    }

    // No weight.
    if (!weight) {
      const deltaX = 1 / size;

      nodes.forEach((node, i: number) => {
        node.x = (i + 0.5) * deltaX;
        node.y = y;
      });

      return { nodes, edges };
    }

    // todo: marginRatio should be in [0, 1)
    // todo: thickness shoule be in (0, 1)
    const margin = marginRatio / (2 * size);

    const total = nodes.reduce((prev: number, node) => (prev += node.value), 0);

    nodes.reduce((deltaX: number, node) => {
      node.weight = node.value / total;
      node.width = node.weight * (1 - marginRatio);
      node.height = thickness;

      /* points
       * 3---2
       * |   |
       * 0---1
       */
      const minX = margin + deltaX;
      const maxX = minX + node.width;
      const minY = y - thickness / 2;
      const maxY = minY + thickness;

      node.x = [minX, maxX, maxX, minX];
      node.y = [minY, minY, maxY, maxY];

      // Return next deltaX.
      return deltaX + node.width + 2 * margin;
    }, 0);
    return {
      nodes,
      edges,
    };
  }

  /**
   * Get edge layout information from nodes, and save into edge object.
   */
  function layoutEdges(nodes, edges) {
    const nodesMap = new Map(nodes.map((d) => [d.id, d]));

    if (!weight) {
      edges.forEach((edge) => {
        const sourceId = source(edge);
        const targetId = target(edge);

        const sourceNode: any = nodesMap.get(sourceId);
        const targetNode: any = nodesMap.get(targetId);

        // Edge's layout information is Equal with node.
        if (sourceNode && targetNode) {
          edge.x = [sourceNode.x, targetNode.x];
          edge.y = [sourceNode.y, targetNode.y];
        }
      });
      return { nodes, edges };
    }

    // Initial edge.x, edge.y.
    edges.forEach((edge) => {
      edge.x = [0, 0, 0, 0];
      edge.y = [y, y, y, y];
    });

    // Group edges by source, target.
    const edgesBySource = group(edges, (e: any) => e.source);
    const edgesByTarget = group(edges, (e: any) => e.target);

    // When weight = true, we need to calculation the bbox of edge start/end.
    nodes.forEach((node) => {
      const { edges, width, x, y, value, id } = node;

      const sourceEdges = edgesBySource.get(id) || [];
      const targetEdges = edgesByTarget.get(id) || [];

      let offset = 0;
      /* points
       * 0----------2
       * |          |
       * 1----------3
       */
      sourceEdges.map((edge) => {
        const w = (edge.sourceWeight / value) * width;
        edge.x[0] = x[0] + offset;
        edge.x[1] = x[0] + offset + w;

        offset += w;
      });

      targetEdges.forEach((edge) => {
        const w = (edge.targetWeight / value) * width;
        edge.x[3] = x[0] + offset;
        edge.x[2] = x[0] + offset + w;

        offset += w;
      });
    });
  }

  return arc;
}
