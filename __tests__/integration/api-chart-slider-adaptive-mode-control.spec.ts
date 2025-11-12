import { chartSliderAdaptiveModeControl as render } from '../plots/api/chart-slider-adaptive-mode-control';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.slider adaptive mode control', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 600);

  it('should control adaptive behavior', async () => {
    const {
      buttonAdaptive,
      buttonDisableAdaptive,
      finished,
      adaptiveComplete,
      disableComplete,
    } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    buttonAdaptive.dispatchEvent(new CustomEvent('click'));
    await adaptiveComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'adaptive-enabled');

    buttonDisableAdaptive.dispatchEvent(new CustomEvent('click'));
    await disableComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'adaptive-disabled');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
