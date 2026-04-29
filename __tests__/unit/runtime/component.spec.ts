import { vi } from 'vitest';
import { Band } from '@antv/scale';
import { Canvas } from '@antv/g';
import { computeLabelsBBox } from '../../../src/runtime/component';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

describe('computeLabelsBBox', () => {
  let canvas: Canvas;

  beforeEach(async () => {
    canvas = createNodeGCanvas(640, 480);
    await canvas.ready;
  });

  it('should pass labels array to label callbacks', async () => {
    const labels = ['A', 'B', 'C'];

    const scale = new Band();
    scale.update({ domain: labels, range: [0, 1] });

    const labelFontSize = vi.fn(
      (_datum: string, _index: number, _data: string[]) => 12,
    );

    const component = {
      label: true,
      labelFontSize,
    };

    computeLabelsBBox(component, scale);

    expect(labelFontSize).toHaveBeenCalledTimes(3);
    expect(labelFontSize.mock.calls).toEqual([
      ['A', 0, ['A', 'B', 'C']],
      ['B', 1, ['A', 'B', 'C']],
      ['C', 2, ['A', 'B', 'C']],
    ]);

    const dataArgs = labelFontSize.mock.calls.map(([, , data]) => data);
    expect(new Set(dataArgs).size).toBe(1);
    expect(dataArgs[0]).toEqual(labels);
  });

  it('should pass labels array to keyed callbacks', async () => {
    const labels = ['A', 'B', 'C'];
    const scale = new Band();
    scale.update({ domain: labels, range: [0, 1] });

    const itemLabelFontSize = vi.fn(
      (_datum: string, _index: number, data: string[]) =>
        data.length ? 12 : 0,
    );

    const component = {
      label: true,
      itemLabelFontSize,
    };

    computeLabelsBBox(component, scale, 'itemLabel');

    expect(itemLabelFontSize).toHaveBeenCalledTimes(3);
    expect(itemLabelFontSize.mock.calls).toEqual([
      ['A', 0, ['A', 'B', 'C']],
      ['B', 1, ['A', 'B', 'C']],
      ['C', 2, ['A', 'B', 'C']],
    ]);
  });
});
