import { createNodeGCanvas } from '../utils/createNodeGCanvas';
import { sleep } from '../utils/sleep';
import { basicIntervalRegisterShape as render } from './basic-interval-register-shape';
import '../utils/useSnapshotMatchers';

it('G2.register(data.[name]) should register data transform.', async () => {
  const canvas = createNodeGCanvas(640, 480);
  const { finished } = render({ canvas });
  await finished;
  await sleep(20);
  const dir = `${__dirname}/../snapshots-api`;
  await expect(canvas).toMatchCanvasSnapshot(dir, render.name);
});
