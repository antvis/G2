import { chartEmitShowTooltipWithResize as render } from '../plots/api/chart-emit-show-tooltip-with-resize';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit tooltip show with resize', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(500, 400);
  const { chart, finished, button, fitted } = render({
    canvas,
    container: document.createElement('div'),
  });

  it('chart.on("tooltip:show") should receive expected data.', async () => {
    await finished;
    button.dispatchEvent(new CustomEvent('click'));
    await sleep(20);
    chart.emit('tooltip:show', {
      data: {
        data: { time: '10:40', call: 13, waiting: 1, people: 4, mock: 2 },
      },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
