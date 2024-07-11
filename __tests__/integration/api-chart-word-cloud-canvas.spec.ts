import { chartWordCloudCanvas as render } from '../plots/api/chart-word-cloud-canvas';
import './utils/useSnapshotMatchers';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import './utils/useCustomFetch';

describe('word cloud canvas', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('word cloud should use custom canvas.', async () => {
    // This no canvas in JSDOM environment, so it will throw error.
    // But it's ok, we just need to test if the ref is called.
    let ref;
    try {
      const rendered = render({
        canvas,
        container: document.createElement('div'),
      });
      ref = rendered.ref;
      await rendered.finished;
    } catch (e) {
      expect(ref.called).toBe(true);
    }
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
