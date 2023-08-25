import { chartChangeDataEmpty as render } from '../plots/api/chart-change-data-empty';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.options.autoFit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createDOMGCanvas(800, 500);

  it('chart({ autoFit: true }) should fit parent container', async () => {
    const { finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
