import { chartRenderClearAnimation as render } from '../plots/api/chart-render-clear-animation';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import './utils/useSnapshotMatchers';

// Skip it, because debounce of chart.render.
describe.skip('chart.render', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('chart.render should clear prev animation', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        const { animations: prevAnimations = [] } = chart.getContext();
        chart.render();
        setTimeout(() => {
          const [animation] = prevAnimations;
          expect(animation.playState).toBe('idle');
          resolve();
        }, 0);
      }, 0);
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
