const util = require('util');
// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// ref: https://github.com/jsdom/jsdom/issues/2524
// eslint-disable-next-line no-undef
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: util.TextEncoder,
});
// eslint-disable-next-line no-undef
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: util.TextDecoder,
});

const fs = require('fs');
const xmlserializer = require('xmlserializer');
const { sleep, createGCanvas } = require('./util');

import { render } from '../../../src';

const CANVAS_SIZE = 400;
const GOLDEN_IMAGE_DIR = '/snapshots';
const [canvas, dom] = createGCanvas(CANVAS_SIZE, CANVAS_SIZE);

describe('render interval on serverside with JSDOM', () => {
  afterEach(() => {
    canvas.removeChildren();
  });

  afterAll(() => {
    canvas.destroy();
  });

  it('render({...}) renders chart with constant encode', async () => {
    const RESULT_IMAGE = '/interval-constant-encode.svg';
    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
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

    await sleep(100);

    // fs.writeFileSync(
    //   __dirname + RESULT_IMAGE,
    //   xmlserializer.serializeToString(
    //     dom.window.document.getElementById('container').children[0],
    //   ),
    // );

    const snapshot = fs.readFileSync(
      __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      {
        encoding: 'utf8',
        flag: 'r',
      },
    );

    expect(
      xmlserializer.serializeToString(
        dom.window.document.getElementById('container').children[0],
      ),
    ).toBe(snapshot);
  });

  it('render({...}) renders chart with default color', async () => {
    const RESULT_IMAGE = '/interval-default-color.svg';

    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
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
          },
        },
        {
          canvas,
        },
        () => resolve(undefined),
      );
    });

    await sleep(100);

    // fs.writeFileSync(
    //   __dirname + RESULT_IMAGE,
    //   xmlserializer.serializeToString(
    //     dom.window.document.getElementById('container').children[0],
    //   ),
    // );

    const snapshot = fs.readFileSync(
      __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      {
        encoding: 'utf8',
        flag: 'r',
      },
    );

    expect(
      xmlserializer.serializeToString(
        dom.window.document.getElementById('container').children[0],
      ),
    ).toBe(snapshot);
  });
});
