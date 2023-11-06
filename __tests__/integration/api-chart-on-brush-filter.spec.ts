import { chartOnBrushFilter as render } from '../plots/api/chart-on-brush-filter';
import { PLOT_CLASS_NAME } from '../../src';
import { dblclick, brush } from '../plots/interaction/penguins-point-brush';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import { createPromise, receiveExpectData } from './utils/event';
import { sleep } from './utils/sleep';
import './utils/useCustomFetch';

describe('chart.on', () => {
  const canvas = createDOMGCanvas(640, 480);
  const { finished, chart } = render({ canvas });

  chart.off();

  it('chart.on("brush:filter", callback) should provide selection when filtering', async () => {
    await finished;
    const { document } = canvas;
    const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];

    // Brush plot.
    const [filtered, resolve] = createPromise();
    chart.on(
      'brush:filter',
      receiveExpectData(resolve, {
        selection: [
          [33.901062731583, 43.79314911976218],
          [15.52991946870155, 20.132659194728948],
        ],
      }),
    );
    brush(plot, 100, 100, 300, 300);
    await filtered;
    await sleep(20);

    // Reset plot.
    const [rested, resolve1] = createPromise();
    chart.off();
    chart.on(
      'brush:filter',
      receiveExpectData(resolve1, {
        selection: [
          [32.1, 59.6],
          [13.1, 21.5],
        ],
      }),
    );
    setTimeout(() => dblclick(plot), 1000);
    await rested;
    // Wait for rerender over to close test.
    await sleep(20);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
