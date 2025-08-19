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
    const { chart, finished, clear } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(100);

    chart.emit('tooltip:show', {
      data: {
        data: { name: 'London', 月份: 'Jan.', 月均降雨量: null },
      },
    });
    await sleep(100);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
    clear();
    chart.emit('tooltip:show', {
      data: {
        data: { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      },
    });
    await sleep(100);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
