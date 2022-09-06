const { createCanvas } = require('canvas');
const fs = require('fs');
const { Canvas } = require('@antv/g');
const { Renderer } = require('@antv/g-canvas');
const { diff, sleep } = require('./util');

import { render } from '../../src';

// create a node-canvas
const nodeCanvas = createCanvas(200, 200);
const offscreenNodeCanvas = createCanvas(1, 1);

// create a renderer, unregister plugin relative to DOM
const renderer = new Renderer();
const domInteractionPlugin = renderer.getPlugin('dom-interaction');
renderer.unregisterPlugin(domInteractionPlugin);

const SIZE = 200;
const canvas = new Canvas({
  width: SIZE,
  height: SIZE,
  canvas: nodeCanvas, // use node-canvas
  renderer,
  offscreenCanvas: offscreenNodeCanvas,
});

const RESULT_IMAGE = '/interval-constant-encode.png';
const BASELINE_IMAGE_DIR = '/snapshots';

describe('render interval on serverside with node-canvas', () => {
  afterEach(() => {
    canvas.removeChildren();
    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  afterAll(() => {
    canvas.destroy();
  });

  it('render({...}) renders chart with constant encode', async () => {
    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: SIZE,
          height: SIZE,
          data: [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
          ],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'orange',
          },
        },
        {
          canvas,
        },
        () => resolve(undefined),
      );
    });

    await sleep(200);

    await new Promise((resolve) => {
      const out = fs.createWriteStream(__dirname + RESULT_IMAGE);
      const stream = nodeCanvas.createPNGStream();
      stream.pipe(out);
      out.on('finish', () => {
        resolve(undefined);
      });
    });

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + BASELINE_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);
  });
});
