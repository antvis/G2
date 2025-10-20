import { issues7121 as render } from '../plots/bugfix/issues-7121';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('issues7121', () => {
  const canvas = createNodeGCanvas(900, 340);

  it('issues7121.render() should render threshold legend correctly', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });

    await chart.render();
    await sleep(20);

    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  // Test with filter similar to playground/index.js
  it('issues7121.render() should render threshold legend with filter', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });

    await chart.render();
    await sleep(20);

    // Apply filter transform similar to playground/index.js
    chart.transform([
      {
        type: 'filter',
        color: {
          value: [0, 100000],
          ordinal: false,
        },
      },
    ]);

    await chart.render();
    await sleep(20);

    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, `${render.name}-filtered`);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
