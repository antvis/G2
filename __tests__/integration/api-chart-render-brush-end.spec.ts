import { chartRenderBrushEnd as render } from '../plots/api/chart-render-brush-end';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';

describe('chart.render', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('chart.render() should not emit brush:remove', async () => {
    const { rerendered, finished, button, chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    chart.off();

    const end = jest.fn();
    const start = jest.fn();
    chart.on('brush:highlight', () => {
      start();
    });
    chart.on('brush:remove', () => {
      end();
    });
    await finished;
    await sleep(20);

    button.dispatchEvent(new CustomEvent('click'));
    await rerendered;
    await sleep(20);
    expect(start).toBeCalledTimes(1);
    expect(end).toBeCalledTimes(0);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
