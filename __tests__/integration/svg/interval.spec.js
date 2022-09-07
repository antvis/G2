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

const { Polygon } = require('@antv/g');
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

  it('render({...}) renders chart with custom component type', async () => {
    const RESULT_IMAGE = '/interval-custom-component.svg';

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
            shape: {
              type: 'constant',
              value: (style) => {
                return (P, value, coordinate, theme) => {
                  const [p0, p1, p2, p3] = P;
                  const { defaultColor } = theme;
                  const pm = [(p0[0] + p1[0]) / 2, p0[1]];
                  const { color = defaultColor } = value;
                  return new Polygon({
                    style: {
                      ...style,
                      fill: color,
                      points: [pm, p2, p3],
                    },
                  });
                };
              },
            },
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

  it('render({...}) renders chart with constant shape channel', async () => {
    const RESULT_IMAGE = '/interval-constant-shape-channel.svg';

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
            color: 'genre',
            shape: 'hollowRect',
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

  it('render({...}) renders chart with field shape channel', async () => {
    const RESULT_IMAGE = '/interval-field-shape-channel.svg';

    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          data: [
            { genre: 'Sports', sold: 275, type: 'a' },
            { genre: 'Strategy', sold: 115, type: 'a' },
            { genre: 'Action', sold: 120, type: 'a' },
            { genre: 'Shooter', sold: 350, type: 'b' },
            { genre: 'Other', sold: 150, type: 'b' },
          ],
          encode: {
            x: 'genre',
            y: 'sold',
            shape: 'type',
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

  it('render({...}) renders chart in transpose coordinate', async () => {
    const RESULT_IMAGE = '/interval-transpose-coordinate.svg';

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
          coordinate: [{ type: 'transpose' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
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

  it('render({...}) renders chart in polar coordinate', async () => {
    const RESULT_IMAGE = '/interval-polar-coordinate.svg';

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
          coordinate: [{ type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
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

  it('render({...}) renders chart inferring stack statistic', async () => {
    const RESULT_IMAGE = '/interval-inferring-stack-statistic.svg';

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
          coordinate: [{ type: 'transpose' }, { type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
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

  it('render({...}) renders chart with specified scale options', async () => {
    const RESULT_IMAGE = '/interval-specified-scale.svg';

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
          scale: {
            x: { flex: [2, 3, 1, 4, 2] },
          },
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
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

  it('render({...}) renders chart with continuous color', async () => {
    const RESULT_IMAGE = '/interval-continuous-color.svg';

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
          scale: {
            color: { range: ['red', 'yellow'] },
          },
          encode: {
            x: 'genre',
            y: 'sold',
            color: (_, i) => i,
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

  it('render({...}) renders chart with stackY', async () => {
    const RESULT_IMAGE = '/interval-stack-y.svg';

    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          data: [
            { city: 'London', month: 'Jan.', rainfall: 18.9 },
            { city: 'London', month: 'Feb.', rainfall: 28.8 },
            { city: 'London', month: 'Mar.', rainfall: 39.3 },
            { city: 'London', month: 'Apr.', rainfall: 81.4 },
            { city: 'London', month: 'May', rainfall: 47 },
            { city: 'London', month: 'Jun.', rainfall: 20.3 },
            { city: 'London', month: 'Jul.', rainfall: 24 },
            { city: 'London', month: 'Aug.', rainfall: 35.6 },
            { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
            { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
            { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
            { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
            { city: 'Berlin', month: 'May', rainfall: 52.6 },
            { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
            { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
            { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
          ],
          transform: [{ type: 'stackY' }],
          encode: {
            x: 'month',
            y: 'rainfall',
            color: 'city',
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

  it('render({...}) renders chart with both stackY and dodgeX', async () => {
    const RESULT_IMAGE = '/interval-stack-y-dodge-x.svg';

    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          data: [
            {
              product_type: '办公用品',
              sex: '男',
              order_amt: 8,
              product_sub_type: '橡皮擦',
            },
            {
              product_type: '办公用品',
              sex: '男',
              order_amt: 10,
              product_sub_type: '书架',
            },
            {
              product_type: '办公用品',
              sex: '男',
              order_amt: 20,
              product_sub_type: '砚台',
            },
            {
              product_type: '办公用品',
              sex: '女',
              order_amt: 13,
              product_sub_type: '砚台',
            },
            {
              product_type: '办公用品',
              sex: '女',
              order_amt: 21,
              product_sub_type: '橡皮擦',
            },
            {
              product_type: '办公用品',
              sex: '女',
              order_amt: 21,
              product_sub_type: '书架',
            },

            {
              product_type: '家电家具',
              sex: '男',
              order_amt: 13,
              product_sub_type: '洗衣机',
            },
            {
              product_type: '家电家具',
              sex: '女',
              order_amt: 2,
              product_sub_type: '洗衣机',
            },
            {
              product_type: '家电家具',
              sex: '男',
              order_amt: 5,
              product_sub_type: '微波炉',
            },
            {
              product_type: '家电家具',
              sex: '男',
              order_amt: 14,
              product_sub_type: '电磁炉',
            },
            {
              product_type: '家电家具',
              sex: '女',
              order_amt: 23,
              product_sub_type: '微波炉',
            },
            {
              product_type: '家电家具',
              sex: '女',
              order_amt: 23,
              product_sub_type: '电磁炉',
            },

            {
              product_type: '电子产品',
              sex: '男',
              order_amt: 33,
              product_sub_type: '电脑',
            },
            {
              product_type: '电子产品',
              sex: '女',
              order_amt: 4,
              product_sub_type: '电脑',
            },
            {
              product_type: '电子产品',
              sex: '女',
              order_amt: 23,
              product_sub_type: 'switch',
            },
            {
              product_type: '电子产品',
              sex: '男',
              order_amt: 20.9,
              product_sub_type: 'switch',
            },
            {
              product_type: '电子产品',
              sex: '男',
              order_amt: 5.9,
              product_sub_type: '鼠标',
            },
            {
              product_type: '电子产品',
              sex: '女',
              order_amt: 5.9,
              product_sub_type: '鼠标',
            },
          ],
          transform: [{ type: 'stackY', groupBy: ['x', 'series'] }],
          encode: {
            x: 'product_type',
            y: 'order_amt',
            color: 'product_sub_type',
            series: 'sex',
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
