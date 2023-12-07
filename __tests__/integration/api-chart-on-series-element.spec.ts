import { chartOnSeriesElement as render } from '../plots/api/chart-on-series-element';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import {
  dispatchFirstElementEvent,
  createPromise,
  receiveExpectData,
} from './utils/event';
import './utils/useSnapshotMatchers';

const data = {
  data: [
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
  ],
};

describe('chart.on', () => {
  const canvas = createNodeGCanvas(640, 480);
  const { finished, chart } = render({ canvas });
  chart.off();

  it('chart.on("element:click", callback) should provide data for series element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('element:click', receiveExpectData(resolve, data));
    dispatchFirstElementEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("line:click", callback) should provide data for series element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('line:click', receiveExpectData(resolve, data));
    dispatchFirstElementEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
