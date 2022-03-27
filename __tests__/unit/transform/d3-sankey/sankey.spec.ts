import { sankey } from '../../../../src/transform/d3-sankey';
import { delay } from '../../../utils/delay';
import data from './energy.json';
import nodes from './energy-nodes.json';
import links from './energy-links.json';

describe('d3-sankey', () => {
  it('sankey(energy) returns the expected results', async () => {
    const processor = sankey()
      .nodeSort(undefined)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 1],
        [200, 200],
      ])
      .nodeId((n) => n.name);

    const energy = processor(data);
    await delay(500);
    expect(energy.nodes.map(nodePosition)).toEqual(nodes);
    expect(energy.links.map(linkPosition)).toEqual(links);
  });

  it('sankey(energy) enable custom nodeWidth', () => {
    const W = 20;
    const processor = sankey()
      .nodeSort(undefined)
      .nodeWidth(W)
      .nodePadding(10)
      .extent([
        [1, 1],
        [200, 200],
      ])
      .nodeId((n) => n.name);

    const energy = processor(data);
    expect(
      energy.nodes.every((node) => round(node.x1 - node.x0) === W),
    ).toEqual(true);
  });
});

function nodePosition(node) {
  return {
    x: round(node.x0),
    dx: round(node.x1 - node.x0),
    y: round(node.y0),
    dy: round(node.y1 - node.y0),
  };
}

function linkPosition(link) {
  return {
    source: nodePosition(link.source),
    target: nodePosition(link.target),
    dy: round(link.width),
    sy: round(link.y0 - link.source.y0 - link.width / 2),
    ty: round(link.y1 - link.target.y0 - link.width / 2),
  };
}

function round(x) {
  const d = Math.round(x * 10) / 10;
  // convert -0 to 0
  return Number(`${d}`);
}
