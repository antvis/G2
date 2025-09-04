import { chartSliderBrushHighlight as render } from '../plots/api/chart-slider-brush-highlight';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.slider + brushHighlight integration', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 640);

  it('should get correct brush selection after slider filter', async () => {
    const {
      chart,
      buttonSliderX,
      buttonSliderY,
      buttonBrush,
      finished,
      sliderXComplete,
      sliderYComplete,
      brushComplete,
    } = render({
      canvas,
      container: document.createElement('div'),
    });

    await finished;
    await sleep(20);

    // Step 1: Apply slider X filter - filter x to [0, 1]
    buttonSliderX.dispatchEvent(new CustomEvent('click'));
    await sliderXComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // Step 2: Apply slider Y filter - filter y to [4, 2]
    buttonSliderY.dispatchEvent(new CustomEvent('click'));
    await sliderYComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    // Step 3: Trigger brush highlight
    // This is the key test - after slider filtering, brush should use filtered domain
    buttonBrush.dispatchEvent(new CustomEvent('click'));
    await brushComplete;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step2');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
