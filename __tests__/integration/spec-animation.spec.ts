import EventEmitter from '@antv/event-emitter';
import { Canvas } from '@antv/g';
import { G2Context } from '../../src';
import * as chartTests from '../plots/animation';
import { filterTests } from './utils/filterTests';
import { renderSpec } from './utils/renderSpec';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';
import { compose } from './utils/compose';
import { disableAxis } from './utils/preprocess';

function defined(d) {
  return d !== null;
}

function useFrame(I, context, asset) {
  let frameCount = 0;
  return {
    assetEach: async () => {
      // Skip intervals, useful for the first frame of keyframe node.
      const intervals = I[frameCount] as number[];
      if (!intervals) {
        frameCount++;
        return;
      }

      // Skip non-animation.
      if (context.animations?.filter(defined).length === 0) return;

      // Asset the fist state of this keyframe.
      // @ts-ignore
      for (const animation of context.animations?.filter(defined)) {
        animation.pause();
      }

      await sleep(20);
      await asset(`${frameCount}-0`);

      // Asset the state of specified time of keyframe.
      for (let i = 0; i < intervals.length; i++) {
        // Wait this interval finishing.
        const interval = intervals[i];
        // @ts-ignore
        for (const animation of context.animations?.filter(defined)) {
          animation.currentTime = interval;
          await sleep(20);
        }
        await asset(`${frameCount}-${i + 1}`);
      }

      // Update frame count.
      frameCount++;
      // @ts-ignore
      for (const animation of context.animations?.filter(defined)) {
        animation.finish();
        await sleep(20);
      }
    },
    assetLast: async () => {
      // Asset the last state of this animation.
      if (frameCount === 0) {
        // For non-animation.
        await sleep(20);
        await asset(`0-0`);
      } else {
        frameCount--;
        const last = I[frameCount] as number[];
        if (last) {
          await sleep(20);
          await asset(`${frameCount}-${last.length + 1}`);
        }
      }
    },
  };
}

// function hideAxisTitle(options) {
//   const { children } = options;
//   const hide = (d) =>
//     deepMix(d, {
//       axis: { x: { title: false }, y: { title: false } },
//     });
//   if (!children) return hide(options);
//   const newChildren = children.map(hide);
//   return {
//     ...options,
//     children: newChildren,
//   };
// }

describe('Animations', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    let gCanvas: Canvas | undefined;
    it(`[Animation]: ${name}`, async () => {
      try {
        // @ts-ignore
        const { intervals: I } = generateOptions;

        // @todo Remove this when gui fixed title animation.
        // @ts-ignore
        generateOptions.preprocess = compose([disableAxis]);

        if (!I) {
          throw new Error(`Missing intervals for ${name}`);
        }

        // Create rendering context.
        const context: G2Context = {};
        const asset = async (step) => {
          const dir = `${__dirname}/snapshots/animation/${kebabCase(name)}`;
          await expect(context.canvas).toMatchDOMSnapshot(
            dir,
            `interval${step}`,
          );
        };
        const { assetEach, assetLast } = useFrame(I, context, asset);

        // Create, register emitter and mount it to context.
        const emitter = new EventEmitter();
        emitter.on('afterpaint', () => {
          gCanvas = context.canvas;
          assetEach();
        });
        context.emitter = emitter;

        // Render and compare each frame with expected snapshot.
        // This will mount canvas to context.
        await renderSpec(generateOptions, context);

        // Asset the last state of this animation.
        await assetLast();
      } finally {
        gCanvas?.destroy();
      }
    });
  }
});
