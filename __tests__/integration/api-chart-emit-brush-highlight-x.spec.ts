import { chartEmitBrushHighlightX as render } from '../plots/api/chart-emit-brush-highlight-x';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.emit(brushX) should emit brushX events', async () => {
    const { highlighted, finished, button, button1, removed } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    button.dispatchEvent(new CustomEvent('click'));
    await highlighted;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    button1.dispatchEvent(new CustomEvent('click'));
    await removed;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
