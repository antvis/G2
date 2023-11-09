import { chartEmitElementHighlight as render } from '../plots/api/chart-emit-element-highlight';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import { createPromise, dispatchFirstElementEvent } from './utils/event';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.on("element:highlight") should receive expected data.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    // chart.emit('element:highlight', options) should trigger slider.
    chart.emit('element:highlight', {
      data: { data: { population: 5038433 } },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('element:unhighlight', options) should reset.
    chart.emit('element:unhighlight', {});
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    // chart.on("element:highlight") should receive expected data.
    const [highlight, resolveHighlight] = createPromise();
    chart.on('element:highlight', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data.data).toEqual({
        age: '<10',
        population: 5038433,
        state: 'CA',
      });
      expect(event.data.group).toEqual([
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
    dispatchFirstElementEvent(canvas, 'pointerover');
    await sleep(20);
    await highlight;

    // chart.on("element:unhighlight") should be called.
    const [unhighlight, resolveUnhighlight] = createPromise();
    chart.on('element:unhighlight', (event) => {
      if (!event.nativeEvent) return;
      resolveUnhighlight();
    });
    dispatchFirstElementEvent(canvas, 'pointerout');
    await sleep(20);
    await unhighlight;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
