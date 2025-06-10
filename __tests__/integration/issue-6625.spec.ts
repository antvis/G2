import { chartRender as render } from '../plots/api/chart-render';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('issue6625 chart.clear block trailing render', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.clear should invoke after render resolved', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });

    const options = {
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],

      type: 'interval',
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    };

    await sleep(10);

    chart.clear();
    chart.options(options);
    await chart.render();

    expect(canvas).toMatchDOMSnapshot(dir, 'clear-after-render');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
