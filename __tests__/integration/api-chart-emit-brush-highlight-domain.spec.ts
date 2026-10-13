import { CustomEvent } from '@antv/g';
import { Chart, PLOT_CLASS_NAME } from '../../src';
import { dataOf } from '../../src/utils/helper';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('chart.emit(brush:highlight) categorical domains', () => {
  const letters = ['A', 'B', 'H', 'I', 'J'];
  let canvas: ReturnType<typeof createNodeGCanvas>;
  let chart: Chart;

  beforeEach(async () => {
    canvas = createNodeGCanvas(500, 200);
    chart = new Chart({
      container: document.createElement('div'),
      canvas,
      width: 500,
      height: 200,
    });
    chart.options({
      type: 'interval',
      data: letters.map((letter) => ({ letter, value: 1000 })),
      encode: { x: 'letter', y: 'value' },
      scale: {
        x: { domain: letters, paddingInner: 0.2, paddingOuter: 0.1 },
        y: { domain: [0, 2000] },
      },
      state: { active: { opacity: 1 }, inactive: { opacity: 0.25 } },
      interaction: { brushHighlight: true },
      animate: false,
      axis: false,
      padding: 0,
    });
    await chart.render();
  });

  afterEach(() => {
    chart?.destroy();
    canvas?.destroy();
  });

  function expectSelection(expected: string[]) {
    const elements = canvas.document.querySelectorAll('.element');
    expect(elements).toHaveLength(letters.length);
    const active = elements
      .filter((element) => Number(element.style.opacity) === 1)
      .map((element) => dataOf(element).letter);
    expect(active).toEqual(expected);
    for (const element of elements) {
      expect(Number(element.style.opacity)).toBe(
        expected.includes(dataOf(element).letter) ? 1 : 0.25,
      );
    }
    const mask = canvas.document.querySelector('.mask');
    expect(mask).not.toBeNull();
    for (const property of ['x', 'y', 'width', 'height']) {
      expect(Number.isFinite(Number(mask.style[property]))).toBe(true);
    }
    expect(Number(mask.style.width)).toBeGreaterThan(0);
    expect(Number(mask.style.height)).toBeGreaterThan(0);
    return mask;
  }

  function drag(target, from: number[], to: number[]) {
    // Match the scenegraph drag contract, including the event that moves/resizes.
    for (const [type, point] of [
      ['dragstart', from],
      ['drag', to],
      ['dragend', to],
    ] as const) {
      target.dispatchEvent(
        new CustomEvent(type, { offsetX: point[0], offsetY: point[1] } as any),
      );
    }
  }

  it.each([
    [['H'], ['H']],
    [
      ['H', 'I'],
      ['H', 'I'],
    ],
    [
      ['H', 'I', 'J'],
      ['H', 'I', 'J'],
    ],
    [
      ['B', 'H', 'I', 'J'],
      ['B', 'H', 'I', 'J'],
    ],
    [
      ['H', 'J'],
      ['H', 'I', 'J'],
    ],
  ])('highlights the full categorical selection %j', (selection, expected) => {
    chart.emit('brush:highlight', {
      data: { selection: [selection, [0, 2000]] },
    });
    expectSelection(expected);
  });

  it('replays a single-category selection emitted by an actual brush drag', () => {
    const ended = vi.fn();
    chart.on('brush:end', ended);
    const plot = canvas.document.getElementsByClassName(PLOT_CLASS_NAME)[0];
    drag(plot, [215, 20], [285, 180]);
    expectSelection(['H']);
    expect(ended).toHaveBeenCalledTimes(1);
    const event = ended.mock.calls[0][0];
    expect(event.nativeEvent).toBe(true);
    expect(event.data.selection[0]).toEqual(['H']);

    chart.emit('brush:remove');
    expect(canvas.document.querySelector('.mask')).toBeNull();
    chart.emit('brush:highlight', {
      data: { selection: event.data.selection },
    });
    expectSelection(['H']);
  });

  it('keeps a restored brush movable and resizable, and replays its full domain', () => {
    const ended = vi.fn();
    chart.on('brush:end', ended);
    chart.emit('brush:highlight', {
      data: {
        selection: [
          ['H', 'I'],
          [0, 2000],
        ],
      },
    });
    let mask = expectSelection(['H', 'I']);
    const before = Number(mask.style.x);
    const beforeWidth = Number(mask.style.width);
    drag(mask.getElementById('selection'), [300, 100], [400, 100]);
    mask = expectSelection(['I', 'J']);
    expect(Number(mask.style.x)).toBeCloseTo(before + 100);

    drag(mask.getElementById('handle-w'), [310, 100], [210, 100]);
    mask = expectSelection(['H', 'I', 'J']);
    expect(Number(mask.style.width)).toBeCloseTo(beforeWidth + 100);
    expect(ended).toHaveBeenCalledTimes(2);
    const event = ended.mock.calls[1][0];
    expect(event.data.selection[0]).toEqual(['H', 'I', 'J']);

    chart.emit('brush:remove');
    chart.emit('brush:highlight', {
      data: { selection: event.data.selection },
    });
    expectSelection(['H', 'I', 'J']);
  });
});
