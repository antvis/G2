import { chartEmitShowTooltipWithNull as render } from '../plots/api/chart-emit-show-tooltip-with-null';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit tooltip show', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.on("tooltip:show") should receive expected data.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    // chart.emit('element:select', options) should trigger slider.
    chart.emit('tooltip:show', {
      data: {
        data: { name: 'London', 月份: 'Jan.', 月均降雨量: null },
      },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    chart.emit('tooltip:show', {
      data: {
        data: { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
