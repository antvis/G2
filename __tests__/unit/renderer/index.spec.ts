import { Canvas as GCanvas } from '@antv/g';
import { Renderer as SvgRenderer } from '@antv/g-svg';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { Canvas } from '../../../src/renderer';

describe('renderer', () => {
  it('Canvas({...}) returns G Canvas', () => {
    const canvas = Canvas({
      width: 400,
      height: 400,
      container: document.createElement('div'),
    });
    expect(canvas).toBeInstanceOf(GCanvas);
  });

  it('SVG({...}) returns G Canvas', () => {
    const canvas = Canvas({
      width: 400,
      height: 400,
      container: document.createElement('div'),
      renderer: new SvgRenderer(),
    });
    expect(canvas).toBeInstanceOf(GCanvas);
  });

  it('Canvas({...}) with render plugin returns G Canvas', () => {
    const canvas = Canvas({
      width: 400,
      height: 400,
      container: document.createElement('div'),
      plugins: [new DragAndDropPlugin()],
    });
    expect(canvas).toBeInstanceOf(GCanvas);
  });
});
