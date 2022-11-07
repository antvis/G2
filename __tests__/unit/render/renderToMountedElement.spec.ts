import { Canvas, Rect } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SvgRenderer } from '@antv/g-svg';
import { G2Spec, renderToMountedElement } from '../../../src';
import { createDiv } from '../../utils/dom';

describe('renderToMountedElement', () => {
  const WIDTH = 680;
  const HEIGHT = 480;
  it('RenderToMountedElement({...}) should return the group wraps the rendered the pont chart by the canvas renderer', async () => {
    const canvas = new Canvas({
      container: createDiv(),
      width: WIDTH,
      height: HEIGHT,
      renderer: new CanvasRenderer(),
    });
    const rect = new Rect({
      style: {
        x: 0,
        y: 0,
        height: HEIGHT,
        width: WIDTH,
        fill: '#1890FF',
      },
    });
    await canvas.ready;
    canvas.appendChild(rect);
    const group = renderToMountedElement<G2Spec>(
      {
        type: 'point',
        data: {
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
        },
        encode: {
          x: 'height',
          y: 'weight',
          color: 'gender',
          shape: 'hollow',
        },
      },
      { group: rect },
    );
    expect(group).toBeDefined();
  });

  it('RenderToMountedElement({...}) should return the group wraps the rendered the interval chart by the svg renderer', async () => {
    const canvas = new Canvas({
      container: createDiv(),
      width: WIDTH,
      height: HEIGHT,
      renderer: new SvgRenderer(),
    });
    const rect = new Rect({
      style: {
        x: 0,
        y: 0,
        height: HEIGHT,
        width: WIDTH,
        stroke: '#1890FF',
      },
    });

    await canvas.ready;
    canvas.appendChild(rect);
    const group = renderToMountedElement<G2Spec>(
      {
        type: 'interval',
        title: {
          size: 40,
          text: 'Chart Title',
          subtitle: 'Chart Subtitle: description, description.',
          subtitleStyle: { fill: 'pink' },
        },
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        paddingRight: 80,
        scale: { color: { guide: { position: 'right', size: 80 } } },
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
        },
      },
      { group: rect },
    );
    expect(group).toBeDefined();
  });
});
