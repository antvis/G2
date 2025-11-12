import { issue6970 as render } from '../plots/bugfix/issue-6970';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('issue6970', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue6970.render() should correctly render cell chart with sliders and handle programmatic filter', async () => {
    const { chart, finished } = await render({
      canvas,
      container: document.createElement('div'),
    });

    await finished;
    await sleep(20);

    // Test initial render
    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);

    // Test programmatic slider filter (mimics the setTimeout logic from playground)
    const start = 5,
      end = 21;
    chart.emit('sliderX:filter', {
      data: { selection: [[start, end], undefined] },
      nativeEvent: false,
    });

    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(
      dir,
      `${render.name}-slider-filter`,
    );
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
