import { chartElementMultipleSelect as render } from '../plots/api/chart-emit-element-multiple-select';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import { createPromise, dispatchIndexElementEvent } from './utils/event';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.select.mutiple', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('elementSelect multiple mode should toggle with hotkey.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    const [multiSelect, resolveMultiSelect] = createPromise();

    // press Shift, turn to multiple select
    document.dispatchEvent(
      new KeyboardEvent('keydown', { code: 'ShiftLeft', bubbles: true }),
    );

    // click first element
    dispatchIndexElementEvent(canvas, 0, 'click');
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'multi-select-multi-first');

    chart.on('element:select', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data.data.length).toBe(2);
      resolveMultiSelect();
    });

    // click second element
    dispatchIndexElementEvent(canvas, 1, 'click');
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'multi-select-multi-second');

    // release Shift, turn to single select
    document.dispatchEvent(
      new KeyboardEvent('keyup', { code: 'ShiftLeft', bubbles: true }),
    );

    await multiSelect;

    // click third element, should be single select
    dispatchIndexElementEvent(canvas, 2, 'click');
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'multi-select-single-third');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
