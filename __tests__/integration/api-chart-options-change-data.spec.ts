import { chartOptionsChangeData as render } from '../plots/api/chart-options-change-data';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.options.changeData', () => {
  const canvas = createDOMGCanvas(800, 500);

  it('chart.options.changeData should rerender expected chart', async () => {
    const { finished, button, chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    button.dispatchEvent(new CustomEvent('click'));
    await new Promise<void>((resolve) => chart.on('afterrender', resolve));
    const dir = `${__dirname}/snapshots/api`;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
