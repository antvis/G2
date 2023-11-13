import { markChangeData as render } from '../plots/api/mark-change-data';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('mark.changeData', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('mark.changeData(width, height) should rerender expected chart', async () => {
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
