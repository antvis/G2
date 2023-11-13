import { chartEmitElementSelect as render } from '../plots/api/chart-emit-element-select';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import {
  createPromise,
  dispatchFirstElementEvent,
  dispatchPlotEvent,
} from './utils/event';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.on("element:select") should receive expected data.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    // chart.emit('element:select', options) should trigger slider.
    chart.emit('element:select', {
      data: { data: [{ population: 5038433 }, { population: 3983091 }] },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('element:unselect', options) should reset.
    chart.emit('element:unselect', {});
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    // chart.on("element:unselect") should be called.
    const [unselect, resolveUnselect] = createPromise();
    chart.on('element:unselect', (event) => {
      if (!event.nativeEvent) return;
      resolveUnselect();
    });
    dispatchPlotEvent(canvas, 'click');
    await sleep(20);
    await unselect;

    // chart.on("element:select") should receive expected data.
    const [select, resolveHighlight] = createPromise();
    chart.on('element:select', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data.data).toEqual([
        { age: '<10', population: 5038433, state: 'CA' },
        { age: '10-19', population: 5170341, state: 'CA' },
        { age: '20-29', population: 5809455, state: 'CA' },
        { age: '30-39', population: 5354112, state: 'CA' },
        { age: '40-49', population: 5179258, state: 'CA' },
        { age: '50-59', population: 5042094, state: 'CA' },
        { age: '60-69', population: 3737461, state: 'CA' },
        { age: '70-79', population: 2011678, state: 'CA' },
        { age: '≥80', population: 1311374, state: 'CA' },
      ]);
      resolveHighlight();
    });
    dispatchFirstElementEvent(canvas, 'click');
    await sleep(20);
    await select;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
