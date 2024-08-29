import './utils/useSnapshotMatchers';
import { Chart } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { dispatchFirstElementPointerMoveEvent } from './utils/event';
import { kebabCase } from './utils/kebabCase';

const data = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  { name: 'London', 月份: 'May', 月均降雨量: 47 },
  { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
];

function renderColumn({ canvas, container }) {
  const chart = new Chart({ canvas, container });
  chart.options({
    type: 'interval',
    data,
    encode: { x: '月份', y: '月均降雨量', color: 'name' },
    transform: [{ type: 'dodgeX' }],
    style: {
      inset: 0,
    },
    interaction: { tooltip: { shared: false } },
  });
  const finished = chart.render();
  return { chart, finished };
}

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase('chartEmitShowTooltip')}`;
  const columnCanvas = createNodeGCanvas(640, 480);

  it('chart.emit tooltip', async () => {
    const { finished, chart } = renderColumn({
      canvas: columnCanvas,
      container: document.createElement('div'),
    });
    await finished;

    chart.emit('tooltip:show', {
      offsetY: 0,
      data: { data: { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 } },
    });
    await sleep(20);

    await expect(columnCanvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    columnCanvas?.destroy();
  });
});
