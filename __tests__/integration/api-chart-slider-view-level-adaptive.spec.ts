import { chartSliderViewLevelAdaptive as render } from '../plots/api/chart-slider-view-level-adaptive';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.slider view level adaptive', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 600);

  it('should adapt all marks when view slider filtered', async () => {
    const {
      buttonFilter1,
      buttonFilter2,
      finished,
      filterComplete1,
      filterComplete2,
    } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    buttonFilter1.dispatchEvent(new CustomEvent('click'));
    await filterComplete1;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    buttonFilter2.dispatchEvent(new CustomEvent('click'));
    await filterComplete2;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step2');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
