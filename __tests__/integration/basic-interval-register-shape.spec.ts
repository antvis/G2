import { basicIntervalRegisterShape as render } from '../plots/api/basic-interval-register-shape';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('G2.register(shape.[name])', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('G2.register(shape.[name]) should register shape function.', async () => {
    const { finished } = render({ canvas });
    await finished;
    await sleep(20);
    const dir = `${__dirname}/snapshots/api`;
    await expect(canvas).toMatchCanvasSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
