import { Canvas as GCanvas } from '@antv/g';
import { Canvas } from '../../../src/renderer';

describe('renderer', () => {
  it('Canvas({}) returns G Canvas', () => {
    const canvas = Canvas({
      width: 400,
      height: 400,
      container: document.createElement('div'),
    });
    expect(canvas).toBeInstanceOf(GCanvas);
  });
});
