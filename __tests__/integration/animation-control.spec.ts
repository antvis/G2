import { Canvas } from '@antv/g';
import { osAreaStackEnter } from '../plots/animation/os-area-stack-enter';
import { G2Context } from '../../src';
import { renderSpec } from './utils/renderSpec';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';
import { sleep } from './utils/sleep';

describe('context.animations', () => {
  let canvas: Canvas;
  it('go to specific timestamp in animations', async () => {
    const context: G2Context = {};
    canvas = await renderSpec(osAreaStackEnter, context);

    const goto = async (currentTime: number) => {
      context.animations?.forEach((animation) => {
        animation.pause();
        animation.currentTime = currentTime;
      });
      await sleep(300);
    };

    const finish = async () => {
      context.animations?.forEach((animation) => {
        animation.finish();
      });
      await sleep(300);
    };

    goto(1);

    const dir = `${__dirname}/snapshots/animation/control`;
    const intervals = [0, 1000, 5000];
    for (let i = 0; i < intervals.length; i++) {
      const currentTime = intervals[i];
      await goto(currentTime);
      await expect(context.canvas).toMatchDOMSnapshot(dir, `interval${i}`);
    }

    await finish();
    await expect(context.canvas).toMatchDOMSnapshot(
      dir,
      `interval${intervals.length}`,
    );
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
