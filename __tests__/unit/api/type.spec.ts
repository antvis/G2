import { Chart, CompositionNode, MarkNode } from '../../../src';

describe('types', () => {
  const chart = new Chart();

  test('CompositionNode', () => {
    const rect: CompositionNode = chart.facetRect();
    rect.boxplot();
  });

  test('MarkNode', () => {
    const interval: MarkNode = chart.interval();
    interval.encode('x', 'name');
  });
});
