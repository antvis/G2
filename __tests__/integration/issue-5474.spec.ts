import { issue5474 as render } from '../plots/bugfix/issue-5474';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('issue5474', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue5474.render() should render chart with labels matching element colors', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });

    await chart.render();
    await sleep(20);

    const labels = canvas.document.getElementsByClassName('label');
    expect(labels.length).toBeGreaterThan(0);

    labels.forEach((label) => {
      expect(label.style.fill).toBe(
        // @ts-ignore
        label.__data__.dependentElement.attributes.fill,
      );
    });

    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
