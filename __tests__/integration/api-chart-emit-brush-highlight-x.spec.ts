import { chartEmitBrushHighlightX as render } from '../plots/api/chart-emit-brush-highlight-x';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.options.autoFit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart({ autoFit: true }) should fit parent container', async () => {
    const { highlighted, finished, button } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    button.dispatchEvent(new CustomEvent('click'));
    await highlighted;
    await sleep(20);
    await expect(canvas).toMatchCanvasSnapshot(dir, 'step0');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
