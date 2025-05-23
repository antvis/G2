import { chartAutoFit as render } from '../plots/api/chart-auto-fit';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('chart.options.autoFit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  const { finished, button, fitted } = render({
    canvas,
    container: document.createElement('div'),
  });

  it('chart({ autoFit: true }) should fit parent container', async () => {
    await finished;
    await sleep(20);
    expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('chart.forceFit() should fit parent container', async () => {
    button.dispatchEvent(new CustomEvent('click'));
    await fitted;
    await sleep(20);
    expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
