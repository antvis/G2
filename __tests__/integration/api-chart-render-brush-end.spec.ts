import { chartRenderBrushEnd as render } from '../plots/api/chart-render-brush-end';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';

describe('chart.render', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('chart.render() should not emit brush:end', async () => {
    const { rerendered, finished, button, chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    chart.off();
    const fn = jest.fn();
    chart.on('brush:end', () => {
      fn();
    });
    button.dispatchEvent(new CustomEvent('click'));
    await rerendered;
    await sleep(20);
    expect(fn).toBeCalledTimes(0);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
