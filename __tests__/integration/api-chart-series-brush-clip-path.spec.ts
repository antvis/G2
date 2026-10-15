import { DisplayObject, Rect } from '@antv/g';
import {
  Chart,
  ELEMENT_CLASS_NAME,
  PLOT_CLASS_NAME,
  VIEW_CLASS_NAME,
} from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('series brush clip paths', () => {
  const charts: Chart[] = [];

  async function render(series = true, reverse = false) {
    const canvas = createNodeGCanvas(640, 480);
    const chart = new Chart({ canvas, width: 640, height: 480 });
    charts.push(chart);
    chart.options({
      type: 'line',
      margin: 0,
      padding: 40,
      data: [
        { x: 0, y: 1, group: 'a' },
        { x: 3, y: 3, group: 'a' },
        { x: 0, y: 3, group: 'b' },
        { x: 3, y: 1, group: 'b' },
      ],
      encode: { x: 'x', y: 'y', color: 'group' },
      style: { opacity: 0.8 },
      scale: {
        x: { domain: [0, 3], nice: false },
        y: { domain: [0, 4], nice: false },
      },
      axis: false,
      legend: false,
      animate: false,
      interaction: { brushHighlight: { series, reverse } },
    });
    await chart.render();
    const plot = canvas.document.getElementsByClassName(PLOT_CLASS_NAME)[0];
    const originals = plot.getElementsByClassName(ELEMENT_CLASS_NAME);
    const originalChildren = [...plot.children];
    const clones = () =>
      plot
        .getElementsByClassName(ELEMENT_CLASS_NAME)
        .filter((element) => !originals.includes(element));
    const clipPaths = () =>
      plot.children.filter((node) => node instanceof Rect);
    const highlight = (
      selection = [
        [0.75, 2.25],
        [1, 3],
      ],
    ) => {
      chart.emit('brush:highlight', { data: { selection } });
    };
    return {
      chart,
      canvas,
      plot,
      originals,
      originalChildren,
      clones,
      clipPaths,
      highlight,
    };
  }

  afterEach(() => {
    for (const chart of charts.splice(0)) chart.destroy();
  });

  function expectSharedClip(clones: DisplayObject[], expected) {
    expect(clones).toHaveLength(2);
    const clipPath = clones[0].style.clipPath as Rect;
    expect(clipPath).toBeInstanceOf(Rect);
    expect(clones[1].style.clipPath).toBe(clipPath);
    const { x, y, width, height } = clipPath.style;
    expect({ x, y, width, height }).toEqual(expected);
  }

  it.each([false, true])(
    'keeps a single shared clip path in sync with repeated brush moves (reverse: %s)',
    async (reverse) => {
      const { highlight, clones, clipPaths } = await render(true, reverse);
      highlight();
      expectSharedClip(clones(), { x: 140, y: 100, width: 280, height: 200 });

      for (let i = 0; i < 5; i += 1) {
        highlight([
          [0, 1.5],
          [0, 2],
        ]);
        expectSharedClip(clones(), { x: 0, y: 200, width: 280, height: 200 });
        expect(clipPaths()).toHaveLength(1);
        highlight();
        expectSharedClip(clones(), { x: 140, y: 100, width: 280, height: 200 });
        expect(clipPaths()).toHaveLength(1);
      }
    },
  );

  it('removes the clip path and restores the series when a brush is cancelled', async () => {
    const {
      chart,
      plot,
      originals,
      originalChildren,
      highlight,
      clones,
      clipPaths,
    } = await render();
    const opacity = originals.map((element) => element.parsedStyle.opacity);

    for (let i = 0; i < 3; i += 1) {
      highlight();
      expectSharedClip(clones(), { x: 140, y: 100, width: 280, height: 200 });
      chart.emit('brush:remove');
      expect(clones()).toHaveLength(0);
      expect(clipPaths()).toHaveLength(0);
      expect(plot.children).toEqual(originalChildren);
      expect(originals.map((element) => element.parsedStyle.opacity)).toEqual(
        opacity,
      );
    }
  });

  it('releases the active clip path when the interaction is destroyed', async () => {
    const {
      chart,
      canvas,
      plot,
      originalChildren,
      highlight,
      clones,
      clipPaths,
    } = await render();
    highlight();
    const clipPath = clones()[0].style.clipPath as Rect;
    const view = canvas.document.getElementsByClassName(VIEW_CLASS_NAME)[0];
    const interaction = view['nameInteraction'].get('brushHighlight');

    interaction.destroy();

    expect(clipPath.parentNode).toBeNull();
    expect(clones()).toHaveLength(0);
    expect(clipPaths()).toHaveLength(0);
    expect(plot.children).toEqual(originalChildren);
    chart.emit('brush:highlight', {
      data: {
        selection: [
          [0, 3],
          [0, 4],
        ],
      },
    });
    expect(plot.children).toEqual(originalChildren);
  });

  it('keeps ordinary element brushing free of series clip paths', async () => {
    const { chart, plot, originalChildren, highlight, clones, clipPaths } =
      await render(false);

    for (let i = 0; i < 3; i += 1) {
      highlight();
      expect(clones()).toHaveLength(0);
      expect(clipPaths()).toHaveLength(0);
      chart.emit('brush:remove');
      expect(plot.children).toEqual(originalChildren);
    }
  });
});
