import { Sankey } from '../../../src/transform';

describe('Sankey', () => {
  const data = {
    nodes: [{ name: 'n1' }, { name: 'n2' }, { name: 'n3' }, { name: 'n4' }],
    edges: [
      { source: 'n1', target: 'n2', value: 3 },
      { source: 'n1', target: 'n3', value: 1 },
      { source: 'n2', target: 'n3', value: 1 },
      { source: 'n1', target: 'n4', value: 1 },
    ],
  };

  it('Sankey({...}) returns a graph representing sankey layout', async () => {
    const graph = Sankey({ nodeId: (n) => n.name })(data);
    expect(graph.nodes.length).toEqual(4);
    expect(graph.edges.length).toEqual(4);
    expect(graph.nodes.map((n) => n.name)).toEqual(['n1', 'n2', 'n3', 'n4']);
    expect(graph.nodes[0].x0).toEqual(0);
    expect(graph.nodes[2].x1).toEqual(1);
    expect(graph.nodes[3].x1).toEqual(1);

    // n1 -> n2, n1 -> n3, n1 -> n4
    expect(graph.nodes[0].sourceLinks.length).toEqual(3);
    // n2 -> n3
    expect(graph.nodes[1].sourceLinks.length).toEqual(1);
    // n1 -> n2
    expect(graph.nodes[1].targetLinks.length).toEqual(1);
    // n1 -> n3, n2 -> n3
    expect(graph.nodes[2].targetLinks.length).toEqual(2);
    expect(graph.nodes[2].sourceLinks.length).toEqual(0);
  });

  it('Sankey({...}) enable config nodeAlign', () => {
    const graph = Sankey({ nodeId: (n) => n.name, nodeAlign: 'left' })(data);
    expect(graph.nodes[3].x1).not.toEqual(1);
  });

  it('Sankey({...}) enable config nodePadding and nodeWidth', () => {
    const graph = Sankey({
      nodeId: (n) => n.name,
      nodePadding: 0.1,
      nodeWidth: 0.01,
      nodeAlign: 'left',
    })(data);
    expect(graph.nodes[0].x1 - graph.nodes[0].x0).toBeCloseTo(0.01);
    expect(graph.nodes[3].y0 - graph.nodes[1].y1).toBeCloseTo(0.1);
  });

  it('Sankey({...}) enable config nodeDepth', () => {
    const data = {
      nodes: [
        { name: 'n1' },
        { name: 'n2' },
        { name: 'n3' },
        { name: 'n4' },
        { name: 'n5' },
      ],
      edges: [
        { source: 'n1', target: 'n2', value: 3 },
        { source: 'n1', target: 'n3', value: 1 },
        { source: 'n2', target: 'n3', value: 1 },
        { source: 'n1', target: 'n4', value: 1 },
        { source: 'n3', target: 'n5', value: 1 },
      ],
    };
    let graph = Sankey({
      nodeId: (n) => n.name,
      nodeAlign: 'left',
      nodeDepth: (datum) => datum.depth,
    })(data);
    expect(graph.nodes.map((n) => n.name)).toEqual([
      'n1',
      'n2',
      'n3',
      'n4',
      'n5',
    ]);
    expect(graph.nodes[3].x1).not.toEqual(1);

    // config the depth of 'n4' to maxDepth, makes it align the last
    graph = Sankey({
      nodeId: (n) => n.name,
      nodeAlign: 'left',
      nodeDepth: (datum, maxDepth) =>
        datum.name === 'n4' ? maxDepth : datum.depth,
    })(data);
    expect(graph.nodes[3].x1).toEqual(1);
  });
});
