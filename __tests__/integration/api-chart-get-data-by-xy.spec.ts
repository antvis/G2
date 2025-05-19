import { chartGetDataByXY as render } from '../plots/api/chart-get-data-by-xy';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.api.getDataByXY', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  let button;

  it('display the data obtained by getDataByXY at the 200 - point position.', async () => {
    const { finished, button1, button2 } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    button = button2;
    button1.dispatchEvent(new CustomEvent('click'));
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('display the data obtained by getDataByXY at the 400 - point position.', async () => {
    await sleep(1000);
    button.dispatchEvent(new CustomEvent('click'));
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
