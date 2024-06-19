import './utils/useSnapshotMatchers';
import { Chart } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import {
  dispatchFirstElementPointerMoveEvent,
  dispatchPlotEvent,
} from './utils/event';
import { kebabCase } from './utils/kebabCase';

const data = [
  { date: '2007-04-23', close: 93.24 },
  { date: '2007-04-24', close: 95.35 },
  { date: '2007-04-25', close: 98.84 },
  { date: '2007-04-26', close: 99.92 },
  { date: '2007-04-29', close: 99.8 },
  { date: '2007-05-01', close: 99.47 },
  { date: '2007-05-02', close: 100.39 },
  { date: '2007-05-03', close: 100.4 },
  { date: '2007-05-04', close: 100.81 },
  { date: '2007-05-07', close: 103.92 },
];

function renderBar({ canvas, container }) {
  const chart = new Chart({ canvas, container });
  chart.options({
    type: 'interval',
    data,
    encode: { x: 'date', y: 'close' },
  });
  const finished = chart.render();
  return { chart, finished };
}

function renderLine({ canvas, container }) {
  const chart = new Chart({ canvas, container });
  chart.options({
    type: 'line',
    data,
    encode: { x: 'date', y: 'close' },
  });
  const finished = chart.render();
  return { chart, finished };
}

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(
    'chartEmitEnableDisableTooltip',
  )}`;
  const barCanvas = createNodeGCanvas(640, 480);
  const lineCanvas = createNodeGCanvas(640, 480);

  it('chart.emit enable item tooltip.', async () => {
    const { finished, chart } = renderBar({
      canvas: barCanvas,
      container: document.createElement('div'),
    });
    await finished;

    chart.emit('tooltip:disable');
    await sleep(20);

    dispatchFirstElementPointerMoveEvent(barCanvas);
    await expect(barCanvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });

    chart.emit('tooltip:enable');

    dispatchFirstElementPointerMoveEvent(barCanvas);
    await expect(barCanvas).toMatchDOMSnapshot(dir, 'step1', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  it('chart.emit enable series tooltip.', async () => {
    const { finished, chart } = renderLine({
      canvas: lineCanvas,
      container: document.createElement('div'),
    });
    await finished;

    chart.emit('tooltip:disable');
    dispatchPlotEvent(lineCanvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });
    await expect(lineCanvas).toMatchDOMSnapshot(dir, 'step2', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });

    chart.emit('tooltip:enable');
    dispatchPlotEvent(lineCanvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });
    await expect(lineCanvas).toMatchDOMSnapshot(dir, 'step3', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    barCanvas?.destroy();
    lineCanvas?.destroy();
  });
});
