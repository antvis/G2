import { Canvas } from '@antv/g';
import * as chartTests from '../plots/tooltip';
import { kebabCase } from './utils/kebabCase';
import { filterTests } from './utils/filterTests';
import { renderSpec } from './utils/renderSpec';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';
import { disableAnimation } from './utils/preprocess';

describe('Tooltips', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    let gCanvas: Canvas;
    it(`[Tooltip]: ${name}`, async () => {
      try {
        // @ts-ignore
        const { steps: S } = generateOptions;
        if (!S) {
          throw new Error(`Missing steps for ${name}`);
        }

        // @ts-ignore
        const { className = 'g2-tooltip' } = generateOptions;
        // @ts-ignore
        generateOptions.preprocess = disableAnimation;

        // Render chart.
        // @ts-ignore
        generateOptions.before?.();
        gCanvas = await renderSpec(generateOptions);

        // Asset each state.
        const steps = S({ canvas: gCanvas });
        const dir = `${__dirname}/snapshots/tooltip/${kebabCase(name)}`;
        for (let i = 0; i < steps.length; i++) {
          const { changeState, skip = false } = steps[i];
          if (!skip) {
            await changeState();
            await sleep(100);
            await expect(gCanvas).toMatchDOMSnapshot(dir, `step${i}`, {
              fileFormat: 'html',
              selector: `.${className}`,
            });
          }
        }
      } finally {
        gCanvas?.destroy();
        // @ts-ignore
        generateOptions.after?.();
        await sleep(100);
      }
    });
  }
  afterEach(() => {
    document.body.innerHTML = '';
  });
});
