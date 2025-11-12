import { chartSliderMultiAxisAdaptive as render } from '../plots/api/chart-slider-multi-axis-adaptive';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.slider multi-axis adaptive', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 600);

  it('should adapt all independent Y axes', async () => {
    const {
      buttonFilterEarly,
      buttonFilterMiddle,
      buttonFilterLate,
      finished,
      filterEarlyComplete,
      filterMiddleComplete,
      filterLateComplete,
    } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    buttonFilterEarly.dispatchEvent(new CustomEvent('click'));
    await filterEarlyComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    buttonFilterMiddle.dispatchEvent(new CustomEvent('click'));
    await filterMiddleComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step2');

    buttonFilterLate.dispatchEvent(new CustomEvent('click'));
    await filterLateComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step3');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
