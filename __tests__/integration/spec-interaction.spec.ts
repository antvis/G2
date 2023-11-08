import { Canvas } from '@antv/g';
import { G2Spec } from '../../src';
import * as chartTests from '../plots/interaction';
import { kebabCase } from './utils/kebabCase';
import { filterTests } from './utils/filterTests';
import { sleep } from './utils/sleep';
import { renderSpec } from './utils/renderSpec';
import { compose } from './utils/compose';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';
import { disableAnimation, disableAxis } from './utils/preprocess';

function disableTooltip(options): G2Spec {
  const discovered = [options];
  while (discovered.length) {
    const node = discovered.pop();
    node.interaction = {
      ...node.interaction,
      tooltip: false,
    };
    if (node.children) {
      discovered.push(...node.children);
    }
  }
  return options;
}

describe('Interactions', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    let gCanvas: Canvas | undefined;
    it(`[Interaction]: ${name}`, async () => {
      try {
        // @ts-ignore
        const { steps: S } = generateOptions;
        if (!S) {
          throw new Error(`Missing steps for ${name}`);
        }

        // Disable animations and delays.
        const {
          // @ts-ignore
          preprocess = (d) => d,
          // @ts-ignore
          tooltip = false,
        } = generateOptions;
        // @ts-ignore
        generateOptions.preprocess = compose([
          preprocess,
          disableAnimation,
          disableAxis,
          tooltip ? (d) => d : disableTooltip,
        ]);

        // Render chart.
        const gCanvas = await renderSpec(generateOptions);

        // Asset each state.
        // @ts-ignore
        const steps = S({ canvas: gCanvas });
        const dir = `${__dirname}/snapshots/interaction/${kebabCase(name)}`;
        for (let i = 0; i < steps.length; i++) {
          // Dispatch event and wait for the next tick and rerender.
          // @ts-ignore
          const { changeState, skip } = steps[i];
          await changeState();
          await sleep(100);

          // If do not skip this state, asset it after dispatch the event.
          if (!skip) {
            await expect(gCanvas).toMatchDOMSnapshot(dir, `step${i}`);
          }
        }
      } finally {
        gCanvas?.destroy();
      }
    });
  }
});
