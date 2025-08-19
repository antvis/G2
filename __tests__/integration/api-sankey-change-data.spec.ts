import { sankeyChangeData as render } from '../plots/api/sankey-change-data';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('sankey.changeData', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 600);
  const { finished, button1, button3 } = render({
    canvas,
    container: document.createElement('div'),
  });

  it('should render expected chart with initial data A (object format)', async () => {
    await finished;
    await sleep(20);
    expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('should switch to data B (array format) correctly', async () => {
    button1.click();
    await sleep(100);
    expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
