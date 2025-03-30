import { CustomEvent as GCustomEvent } from '@antv/g';
import { chartMultipleMarkSelectRegion as render } from '../plots/api/chart-multiple-mark-select-region';
import { PLOT_CLASS_NAME } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import { createPromise, dispatchIndexElementEvent } from './utils/event';
import './utils/useSnapshotMatchers';

describe('chart.select.region', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  const { document: GDocument } = canvas;

  it("elementSelect region click should toggle group elements' select status", async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    const [multiSelect, resolveMultiSelect] = createPromise();

    // Press Shift, turn to multiple select.
    document.dispatchEvent(
      new KeyboardEvent('keydown', { code: 'ShiftLeft', bubbles: true }),
    );

    const plot = GDocument.getElementsByClassName(PLOT_CLASS_NAME)[0];
    // Click first group.
    // Note: "line" WILL NOT be group selected.
    plot.dispatchEvent(
      new GCustomEvent('click', {
        offsetX: 200,
        offsetY: 100,
      }),
    );
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'region-select-multi-first');

    chart.on('element:select', (event) => {
      if (!event.nativeEvent) return;
      // A group and a single element selected, now should be 3 elements selected.
      expect(event.data.data.length).toBe(3);
      resolveMultiSelect();
    });

    // Click single element.
    dispatchIndexElementEvent(canvas, 1, 'click');
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'region-select-multi-second');

    // Release Shift, turn to single select.
    document.dispatchEvent(
      new KeyboardEvent('keyup', { code: 'ShiftLeft', bubbles: true }),
    );

    await multiSelect;

    // Click last group, should be single select.
    plot.dispatchEvent(
      new GCustomEvent('click', {
        offsetX: 600,
        offsetY: 20,
      }),
    );
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'region-select-single-third');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
