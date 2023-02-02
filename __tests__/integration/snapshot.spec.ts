import { Canvas } from '@antv/g';
import * as chartTests from './charts';
import { renderSpec } from './utils/renderSpec';
import { filterTests } from './utils/filterTests';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('Charts', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    let gCanvas: Canvas;
    it(`[Canvas]: ${name}`, async () => {
      try {
        // @ts-ignore
        const { maxError = 0 } = generateOptions;
        gCanvas = await renderSpec(generateOptions);
        const dir = `${__dirname}/snapshots/`;
        await expect(gCanvas).toMatchCanvasSnapshot(dir, name, { maxError });
      } finally {
        gCanvas?.destroy();
      }
    });
  }
});
