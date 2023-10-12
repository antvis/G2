import { chartAutoFitSlider as render } from '../plots/api/chart-auto-fit-slider';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import './utils/useCustomFetch';

import './utils/useSnapshotMatchers';

describe('mark.changeSize', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('mark.changeSize(width, height) should rerender expected chart', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });

    expect(chart['_computedOptions']().depth).toBe(0);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
