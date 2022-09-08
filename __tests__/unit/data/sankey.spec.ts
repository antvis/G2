// import { Sankey } from '../../../src/data';

describe.skip('Sankey', () => {
  it('', () => {});
  // const data = {
  //   nodes: [{ name: 'n1' }, { name: 'n2' }, { name: 'n3' }, { name: 'n4' }],
  //   links: [
  //     { source: 'n1', target: 'n2', value: 3 },
  //     { source: 'n1', target: 'n3', value: 1 },
  //     { source: 'n2', target: 'n3', value: 1 },
  //     { source: 'n1', target: 'n4', value: 1 },
  //   ],
  // };

  // const dftOptions = { nodeId: (n) => n.name };

  // it('Sankey({...}) returns a graph representing sankey layout', async () => {
  //   const graph = (await Sankey(dftOptions)({ data })).data;
  //   expect(graph.nodes.length).toEqual(4);
  //   expect(graph.links.length).toEqual(4);
  //   expect(graph.nodes.map((n) => n.name)).toEqual(['n1', 'n2', 'n3', 'n4']);
  //   expect(graph.nodes[0].x0).toEqual(0);
  //   expect(graph.nodes[2].x1).toEqual(1);
  //   expect(graph.nodes[3].x1).toEqual(1);

  //   // n1 -> n2, n1 -> n3, n1 -> n4
  //   expect(graph.nodes[0].sourceLinks.length).toEqual(3);
  //   // n2 -> n3
  //   expect(graph.nodes[1].sourceLinks.length).toEqual(1);
  //   // n1 -> n2
  //   expect(graph.nodes[1].targetLinks.length).toEqual(1);
  //   // n1 -> n3, n2 -> n3
  //   expect(graph.nodes[2].targetLinks.length).toEqual(2);
  //   expect(graph.nodes[2].sourceLinks.length).toEqual(0);
  // });

  // it('Sankey({ nodeAlign: ... })', async () => {
  //   const graph = (await Sankey({ ...dftOptions, nodeAlign: 'left' })({ data }))
  //     .data;
  //   expect(graph.nodes[3].x1).not.toEqual(1);
  // });

  // it('Sankey({ nodePadding: ..., nodeWidth: ... })', async () => {
  //   const graph = (
  //     await Sankey({
  //       ...dftOptions,
  //       nodePadding: 0.1,
  //       nodeWidth: 0.01,
  //       nodeAlign: 'left',
  //     })({ data })
  //   ).data;
  //   expect(graph.nodes[0].x1 - graph.nodes[0].x0).toBeCloseTo(0.01);
  //   expect(graph.nodes[3].y0 - graph.nodes[1].y1).toBeCloseTo(0.1);
  // });

  // it('Sankey({ nodeDepth: ... })', async () => {
  //   const data = {
  //     nodes: [
  //       { name: 'n1' },
  //       { name: 'n2' },
  //       { name: 'n3' },
  //       { name: 'n4' },
  //       { name: 'n5' },
  //     ],
  //     links: [
  //       { source: 'n1', target: 'n2', value: 3 },
  //       { source: 'n1', target: 'n3', value: 1 },
  //       { source: 'n2', target: 'n3', value: 1 },
  //       { source: 'n1', target: 'n4', value: 1 },
  //       { source: 'n3', target: 'n5', value: 1 },
  //     ],
  //   };
  //   let graph = (
  //     await Sankey({
  //       ...dftOptions,
  //       nodeAlign: 'left',
  //       nodeDepth: (datum) => datum.depth,
  //     })({ data })
  //   ).data;
  //   expect(graph.nodes.map((n) => n.name)).toEqual([
  //     'n1',
  //     'n2',
  //     'n3',
  //     'n4',
  //     'n5',
  //   ]);
  //   expect(graph.nodes[3].x1).not.toEqual(1);

  //   // config the depth of 'n4' to maxDepth, makes it align the last
  //   graph = (
  //     await Sankey({
  //       ...dftOptions,
  //       nodeAlign: 'left',
  //       nodeDepth: (datum, maxDepth) =>
  //         datum.name === 'n4' ? maxDepth : datum.depth,
  //     })({ data })
  //   ).data;
  //   expect(graph.nodes[3].x1).toEqual(1);
  // });

  // it('Sankey({ nodes: ..., links: ...})', async () => {
  //   const data = {
  //     names: [{ id: 'Bob' }, { id: 'Carol' }, { id: 'Alice' }],
  //     edges: [
  //       { source: 0, target: 1 },
  //       { source: 1, target: 2 },
  //     ],
  //   };

  //   const graph = (
  //     await Sankey({ nodes: (d) => d.names, links: (d) => d.edges })({ data })
  //   ).data;
  //   expect(graph.nodes.length).toEqual(3);
  //   expect(graph.links.length).toEqual(2);
  //   expect(graph.nodes[0].id).toBe('Bob');
  // });

  // it('Sankey({ nodeSort: ..., linkSort: ...})', async () => {
  //   const data = {
  //     nodes: [{ id: 'Alice' }, { id: 'Bob' }, { id: 'Carol' }],
  //     links: [
  //       { source: 'Alice', target: 'Bob', value: 1 },
  //       { source: 'Alice', target: 'Carol', value: 2 },
  //     ],
  //   };
  //   let graph = (await Sankey({ nodeId: (n) => n.id })({ data })).data;
  //   expect(graph.links[0].y0).toBeLessThan(graph.links[1].y0);
  //   expect(graph.nodes[1].y0).toBeLessThan(graph.nodes[2].y0);
  //   // link, node sort by value desc
  //   graph = (
  //     await Sankey({
  //       nodeId: (n) => n.id,
  //       linkSort: (a, b) => b.value - a.value,
  //       nodeSort: (a, b) => b.value - a.value,
  //     })({ data })
  //   ).data;
  //   expect(graph.links[0].y0).not.toBeLessThan(graph.links[1].y0);
  //   expect(graph.nodes[1].y0).not.toBeLessThan(graph.nodes[2].y0);
  // });
});

export {};
