import { CustomEvent } from '@antv/g';
import { chartOnItemElement as render } from '../plots/api/chart-on-item-element';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('chart.on', () => {
  const canvas = createDOMGCanvas(640, 480);

  it('chart.on("element:click", callback) should provide datum for item element', async () => {
    const { finished, chart } = render({ canvas });
    await finished;
    await sleep(20);

    await new Promise<void>((resolve) => {
      let count = 0;
      const click = (event) => {
        count++;
        expect(event.data.data).toEqual({
          genre: 'Sports',
          sold: 275,
        });
        if (count >= 2) resolve();
      };

      chart.off();
      chart.on('element:click', click);
      chart.on('interval:click', click);

      const [element] = canvas.document.getElementsByClassName('element');
      element.dispatchEvent(new CustomEvent('click'));
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
