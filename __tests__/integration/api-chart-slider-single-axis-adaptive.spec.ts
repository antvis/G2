import { chartSliderSingleAxisAdaptive as render } from '../plots/api/chart-slider-single-axis-adaptive';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.slider single axis adaptive', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 600);

  it('should adapt Y axis when X slider filtered', async () => {
    const { chart, buttonFilter, finished, filterComplete } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    buttonFilter.dispatchEvent(new CustomEvent('click'));
    await filterComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
