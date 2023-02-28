import { CustomEvent } from '@antv/g';
import { chartOnSeriesElement as render } from '../plots/api/chart-on-series-element';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

const data = [
  {
    month: 'Jan',
    city: 'Tokyo',
    temperature: 7,
  },
  {
    month: 'Feb',
    city: 'Tokyo',
    temperature: 6.9,
  },
  {
    month: 'Mar',
    city: 'Tokyo',
    temperature: 9.5,
  },
  {
    month: 'Apr',
    city: 'Tokyo',
    temperature: 14.5,
  },
  {
    month: 'May',
    city: 'Tokyo',
    temperature: 18.4,
  },
  {
    month: 'Jun',
    city: 'Tokyo',
    temperature: 21.5,
  },
  {
    month: 'Jul',
    city: 'Tokyo',
    temperature: 25.2,
  },
  {
    month: 'Aug',
    city: 'Tokyo',
    temperature: 26.5,
  },
  {
    month: 'Sep',
    city: 'Tokyo',
    temperature: 23.3,
  },
  {
    month: 'Oct',
    city: 'Tokyo',
    temperature: 18.3,
  },
  {
    month: 'Nov',
    city: 'Tokyo',
    temperature: 13.9,
  },
  {
    month: 'Dec',
    city: 'Tokyo',
    temperature: 9.6,
  },
];

describe('chart.on', () => {
  const canvas = createDOMGCanvas(640, 480);

  it('chart.on("element:click", callback) should provide data for series element', async () => {
    const { finished, chart } = render({ canvas });
    await finished;
    await sleep(20);

    await new Promise<void>((resolve) => {
      let count = 0;
      const click = (event) => {
        count++;
        expect(event.data.data).toEqual(data);
        if (count >= 2) resolve();
      };

      chart.off();
      chart.on('element:click', click);
      chart.on('line:click', click);

      const [element] = canvas.document.getElementsByClassName('element');
      element.dispatchEvent(new CustomEvent('click'));
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
