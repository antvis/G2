import { Canvas } from '@antv/g';
import * as chartTests from '../plots/static';
import { renderSpec } from './utils/renderSpec';
import { filterTests } from './utils/filterTests';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('Charts', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    let gCanvas: Canvas;
    it(`[Canvas]: ${name}`, async () => {
      try {
        // @ts-ignore
        const { before, after } = generateOptions;
        before?.();
        gCanvas = await renderSpec(
          generateOptions,
          undefined,
          createDOMGCanvas,
        );
        after?.();
        const dir = `${__dirname}/snapshots/static`;
        await expect(gCanvas).toMatchDOMSnapshot(dir, name);
      } finally {
        gCanvas?.destroy();
      }
    });
  }
});
