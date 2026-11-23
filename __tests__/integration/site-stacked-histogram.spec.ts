import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { ModuleKind, transpileModule } from 'typescript';
import { Chart } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('stacked histogram gallery example', () => {
  it('stacks each bin and keeps original counts in its tooltip', async () => {
    const canvas = createNodeGCanvas(500, 300);
    const chart = new Chart({ canvas, width: 500, height: 300 });
    // Run the gallery entry without requiring the separate Astro toolchain.
    const demo = readFileSync(
      resolve(
        __dirname,
        '../../site/examples/general/histogram/demo/histogram-stacked.ts',
      ),
      'utf8',
    );
    const { outputText } = transpileModule(demo, {
      compilerOptions: { module: ModuleKind.CommonJS },
    });

    try {
      const rendered = vi.spyOn(chart, 'render');
      runInNewContext(outputText, {
        exports: {},
        require: (id: string) => {
          if (id !== '@antv/g2')
            throw new Error(`Unexpected demo import: ${id}`);
          return {
            Chart: function () {
              return chart;
            },
          };
        },
        fetch: async () => ({
          json: async () => [
            { depth: 60, cut: 'Ideal' },
            { depth: 60, cut: 'Ideal' },
            { depth: 60, cut: 'Good' },
            { depth: 61, cut: 'Ideal' },
          ],
        }),
      });
      await vi.waitFor(() => expect(rendered).toHaveBeenCalledTimes(1));
      await rendered.mock.results[0].value;

      const marks = canvas.document
        .querySelectorAll('.element')
        .map((mark) => mark.__data__)
        .filter((datum) => datum.data.depth === 60)
        .sort((a, b) => b.points[0][1] - a.points[0][1]);

      expect(
        Object.fromEntries(
          marks.map((datum) => [datum.data.cut, datum.items[0].value]),
        ),
      ).toEqual({ Ideal: 2, Good: 1 });
      expect(marks[0].points[0][1]).toBeCloseTo(marks[1].points[3][1], 0);
    } finally {
      chart.destroy();
    }
  });
});
