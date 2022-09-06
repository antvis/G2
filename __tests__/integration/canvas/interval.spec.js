const fs = require('fs');
const { Polygon } = require('@antv/g');
const { diff, sleep, createGCanvas, writePNG } = require('./util');

import { render } from '../../../src';

const CANVAS_SIZE = 600;
const GOLDEN_IMAGE_DIR = '/snapshots';
const [canvas, nodeCanvas] = createGCanvas(CANVAS_SIZE, CANVAS_SIZE);

describe('render interval on serverside with node-canvas', () => {
  afterEach(() => {
    canvas.removeChildren();
  });

  afterAll(() => {
    canvas.destroy();
  });

  it('render({...}) renders chart with constant encode', async () => {
    const RESULT_IMAGE = '/interval-constant-encode.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with default color', async () => {
    const RESULT_IMAGE = '/interval-default-color.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with specified theme', async () => {
    const RESULT_IMAGE = '/interval-specified-theme.png';

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
          theme: {
            defaultColor: 'steelblue',
          },
        },
        {
          canvas,
        },
        () => resolve(undefined),
      );
    });

    await sleep(100);

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with custom component type', async () => {
    const RESULT_IMAGE = '/interval-custom-component.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with constant shape channel', async () => {
    const RESULT_IMAGE = '/interval-constant-shape-channel.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with field shape channel', async () => {
    const RESULT_IMAGE = '/interval-field-shape-channel.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with specified style', async () => {
    const RESULT_IMAGE = '/interval-specified-style.png';

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
          style: {
            fillOpacity: '0.8',
            lineWidth: 2,
          },
        },
        {
          canvas,
        },
        () => resolve(undefined),
      );
    });

    await sleep(100);

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart in transpose coordinate', async () => {
    const RESULT_IMAGE = '/interval-transpose-coordinate.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart in polar coordinate', async () => {
    const RESULT_IMAGE = '/interval-polar-coordinate.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart inferring stack statistic', async () => {
    const RESULT_IMAGE = '/interval-inferring-stack-statistic.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with specified scale options', async () => {
    const RESULT_IMAGE = '/interval-specified-scale.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with continuous color', async () => {
    const RESULT_IMAGE = '/interval-continuous-color.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with stackY', async () => {
    const RESULT_IMAGE = '/interval-stack-y.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with both stackY and dodgeX', async () => {
    const RESULT_IMAGE = '/interval-stack-y-dodge-x.png';

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

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with funnel shape when transpose', async () => {
    const RESULT_IMAGE = '/interval-funnel-shape-transpose.png';

    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          data: [
            { action: '浏览网站', pv: 50000 },
            { action: '放入购物车', pv: 35000 },
            { action: '生成订单', pv: 25000 },
            { action: '支付订单', pv: 15000 },
            { action: '完成交易', pv: 8000 },
          ],
          coordinate: [{ type: 'transpose' }],
          encode: {
            x: 'action',
            y: 'pv',
            color: 'action',
            shape: 'funnel',
          },
          scale: {
            x: { padding: 0 },
            y: { guide: null },
          },
        },
        {
          canvas,
        },
        () => resolve(undefined),
      );
    });

    await sleep(100);

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with funnel shape when symmetryY', async () => {
    const RESULT_IMAGE = '/interval-funnel-shape-symmetry-y.png';

    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          transform: [{ type: 'symmetryY' }],
          data: [
            { action: '浏览网站', pv: 50000 },
            { action: '放入购物车', pv: 35000 },
            { action: '生成订单', pv: 25000 },
            { action: '支付订单', pv: 15000 },
            { action: '完成交易', pv: 8000 },
          ],
          coordinate: [{ type: 'transpose' }],
          encode: {
            x: 'action',
            y: 'pv',
            color: 'action',
            shape: 'funnel',
          },
          scale: {
            x: { padding: 0 },
            y: { guide: null },
          },
        },
        {
          canvas,
        },
        () => resolve(undefined),
      );
    });

    await sleep(100);

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  it('render({...}) renders chart with pyramid shape when symmetryY', async () => {
    const RESULT_IMAGE = '/interval-pyramid-shape-symmetry-y.png';

    await new Promise((resolve) => {
      render(
        {
          type: 'interval',
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          transform: [{ type: 'symmetryY' }],
          data: [
            { action: '浏览网站', pv: 50000 },
            { action: '放入购物车', pv: 35000 },
            { action: '生成订单', pv: 25000 },
            { action: '支付订单', pv: 15000 },
            { action: '完成交易', pv: 8000 },
          ],
          coordinate: [{ type: 'transpose' }],
          encode: {
            x: 'action',
            y: 'pv',
            color: 'action',
            shape: 'pyramid',
          },
          scale: {
            x: { padding: 0 },
            y: { guide: null },
          },
        },
        {
          canvas,
        },
        () => resolve(undefined),
      );
    });

    await sleep(100);

    await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

    expect(
      diff(
        __dirname + RESULT_IMAGE,
        __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
      ),
    ).toBe(0);

    fs.rmSync(__dirname + RESULT_IMAGE);
  });

  // it('render({...} renders chart according to specified options', async () => {
  //   const RESULT_IMAGE = '/interval-constant-encode.png';

  //   await new Promise((resolve) => {
  //     render(
  //       {
  //         type: 'interval',
  //         width: CANVAS_SIZE,
  //         height: CANVAS_SIZE,
  //         title: {
  //           CANVAS_SIZE: 40,
  //           text: 'Chart Title',
  //           subtitle: 'Chart Subtitle: description, description.',
  //           subtitleStyle: { fill: 'pink' },
  //         },
  //         data: [
  //           { genre: 'Sports', sold: 275 },
  //           { genre: 'Strategy', sold: 115 },
  //           { genre: 'Action', sold: 120 },
  //           { genre: 'Shooter', sold: 350 },
  //           { genre: 'Other', sold: 150 },
  //         ],
  //         paddingRight: 80,
  //         scale: { color: { guide: { position: 'right', CANVAS_SIZE: 80 } } },
  //         encode: {
  //           x: 'genre',
  //           y: 'sold',
  //           color: 'genre',
  //         },
  //       },
  //       {
  //         canvas,
  //       },
  //       () => resolve(undefined),
  //     );
  //   });

  //   await sleep(100);

  //   await writePNG(nodeCanvas, __dirname + RESULT_IMAGE);

  //   expect(
  //     diff(
  //       __dirname + RESULT_IMAGE,
  //       __dirname + GOLDEN_IMAGE_DIR + RESULT_IMAGE,
  //     ),
  //   ).toBe(0);

  //   //  fs.rmSync(__dirname + RESULT_IMAGE);
  // });
});
