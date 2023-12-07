import { viewFacetCircle as render } from '../plots/api/view-facetCircle';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('facetCircle.options.autoFit', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('facetCircle.render() should render expected facetCircle', async () => {
    const { finished } = render({ canvas });
    await finished;
    await sleep(20);
    const dir = `${__dirname}/snapshots/api`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
