import { sankeyChangeData as render } from '../plots/api/sankey-change-data';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('sankey.changeData', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 600);
  const { finished, button1, button3, switchToDataB, switchToDataC } = render({
    canvas,
    container: document.createElement('div'),
  });

  it('should render expected chart with initial data A (object format)', async () => {
    await finished;
    await sleep(20);
    expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('should switch to data B (array format) correctly', async () => {
    await switchToDataB();
    await sleep(20);
    expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  it('should handle empty data (data C) gracefully', async () => {
    await switchToDataC();
    await sleep(20);
    expect(canvas).toMatchDOMSnapshot(dir, 'step2');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
