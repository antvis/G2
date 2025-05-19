import { CustomEvent } from '@antv/g';
import { issueChart2897 as render } from '../plots/bugfix/issue-chart-2897';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('issueChart2897', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issueChart2897.render() should correctly render', async () => {
    const { chart, finished } = await render({
      canvas,
      container: document.createElement('div'),
    });

    await finished;
    await sleep(20);

    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
    const element = canvas.document.getElementsByClassName('element')[0];
    element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, `${render.name}-click`);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
