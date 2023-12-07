import { Chart, CompositionNode, MarkNode } from '../../../src';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

describe('types', () => {
  const chart = new Chart({
    canvas: createNodeGCanvas(640, 480),
  });

  test('CompositionNode', () => {
    const rect: CompositionNode = chart.facetRect();
    rect.boxplot();
  });

  test('MarkNode', () => {
    const interval: MarkNode = chart.interval();
    interval.encode('x', 'name');
  });
});
