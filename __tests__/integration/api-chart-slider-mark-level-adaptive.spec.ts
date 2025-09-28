import { chartSliderMarkLevelAdaptive as render } from '../plots/api/chart-slider-mark-level-adaptive';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.slider mark level adaptive', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 600);

  it('should adapt only specific mark with slider', async () => {
    const { buttonFilterMark, finished, filterMarkComplete } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    buttonFilterMark.dispatchEvent(new CustomEvent('click'));
    await filterMarkComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
