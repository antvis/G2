import { issue8520 as render } from '../plots/bugfix/issue-8520';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('issue8520', () => {
  it.each([
    [false, false],
    [true, false],
    [true, true],
  ])(
    'preserves automatic label transforms through slider filtering (initial values: %s, independent axes: %s)',
    async (initialValues, independentAxes) => {
      const canvas = createNodeGCanvas(480, 300);
      const { chart, finished } = render({
        container: document.createElement('div'),
        canvas,
        callback: (chart) => {
          const options = chart.options();
          const [mark] = options.children;
          if (!initialValues) delete mark.slider.x.values;
          if (independentAxes) {
            options.children.push({
              ...mark,
              scale: { y: { independent: true, key: 'y1' } },
            });
          }
          chart.options(options);
        },
      });
      const xAxis = () => {
        const axes = canvas.document.getElementsByClassName('axis');
        return axes.find((axis) =>
          axis.attributes.data?.some((d) => String(d.label).includes('199')),
        );
      };
      const expected = [
        {
          type: 'rotate',
          optionalAngles: [0, 15, 80],
          recoverWhenFailed: true,
        },
        { type: 'ellipsis', suffix: '..', minLength: 8, maxLength: 12 },
        { type: 'hide', keepHeader: true, keepTail: true },
        expect.objectContaining({
          type: 'wrap',
          wordWrapWidth: 80,
          maxLines: 2,
        }),
      ];
      try {
        await finished;
        await sleep(100);
        expect(xAxis().attributes.labelOverlap).toEqual(expected);
        const initialTickCount = xAxis().attributes.data.length;
        if (initialValues) expect(initialTickCount).toBeLessThan(9);
        else expect(initialTickCount).toBe(9);
        chart.emit('sliderX:filter', {
          data: { selection: [['1992（数字很长很很长1）', '1996'], undefined] },
        });
        await sleep(100);
        expect(xAxis().attributes.labelOverlap).toEqual(expected);
        expect(xAxis().attributes.data).toHaveLength(5);
        if (!independentAxes) {
          await expect(canvas).toMatchDOMSnapshot(
            `${__dirname}/snapshots/bugfix/issue-8520`,
            initialValues ? 'initial-values' : 'default-values',
          );
        }
      } finally {
        chart.destroy();
      }
    },
  );
  it.each([false, true])(
    'respects explicit axis settings (transform: %s)',
    async (explicitTransform) => {
      const canvas = createNodeGCanvas(480, 300);
      const transform = [{ type: 'ellipsis', maxLength: 60 }];
      const { chart, finished } = render({
        container: document.createElement('div'),
        canvas,
        callback: (chart) => {
          const options = chart.options();
          Object.assign(
            options.children[0].axis.x,
            explicitTransform ? { transform } : { labelAutoHide: false },
          );
          chart.options(options);
        },
      });
      try {
        await finished;
        await sleep(100);
        const axis = canvas.document
          .getElementsByClassName('axis')
          .find((axis) =>
            axis.attributes.data?.some((d) => String(d.label).includes('199')),
          );
        const overlap = axis.attributes.labelOverlap;
        if (explicitTransform) expect(overlap).toEqual(transform);
        else
          expect(overlap.map((d) => d.type)).toEqual([
            'rotate',
            'ellipsis',
            'wrap',
          ]);
      } finally {
        chart.destroy();
      }
    },
  );
});
