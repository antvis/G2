import { Polygon } from '@antv/g';
import { G2Spec, Vector2, render, ShapeComponent } from '../../../src';
import { createLibrary } from '../../../src/stdlib';
import { SALE_OF_YEAR } from '../../data/sales';
import { createDiv, mount, unmountAll } from '../../utils/dom';

describe('render', () => {
  it('render({}) returns a canvas wrapped in HTMLElement with default size', () => {
    const chart = render({
      type: 'interval',
    });
    mount(createDiv(), chart);

    const canvas = chart.childNodes[0] as HTMLCanvasElement;
    expect(canvas.style.width).toBe('640px');
    expect(canvas.style.height).toBe('480px');
  });

  it('render({width, height}) returns a canvas wrapped in HTMLElement with specified size', () => {
    const chart = render({
      width: 800,
      height: 200,
      type: 'interval',
    });
    mount(createDiv(), chart);

    const canvas = chart.childNodes[0] as HTMLCanvasElement;
    expect(canvas.style.width).toBe('800px');
    expect(canvas.style.height).toBe('200px');
  });

  // Don't asset for temporary as the inner data structure of context is not clear now.
  it('render({...} renders chart according to specified options', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with constant encode', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with default color', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified theme', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with custom component type', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with custom library', (done) => {
    const TriangleShape: ShapeComponent = (style) => {
      return (P, value, coordinate, theme) => {
        const { defaultColor } = theme;
        const [p0, p1, p2, p3] = P;
        const pm: Vector2 = [(p0[0] + p1[0]) / 2, p0[1]];
        const { color = defaultColor } = value;
        return new Polygon({
          style: {
            ...style,
            fill: color,
            points: [pm, p2, p3],
          },
        });
      };
    };

    const context = {
      library: Object.assign(createLibrary(), {
        'shape.triangle': TriangleShape,
      }),
    };

    const chart = render<G2Spec>(
      {
        type: 'interval',
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
          shape: 'triangle',
        },
      },
      context,
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with constant shape channel', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with field shape channel', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified style', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart in transpose coordinate', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart in polar coordinate', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart in polar and transpose coordinate', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        coordinate: [{ type: 'transpose' }, { type: 'polar' }],
        encode: {
          y: 'sold',
          color: 'genre',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart inferring stack statistic', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified scale options', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        coordinate: [{ type: 'polar' }],
        scale: {
          x: { padding: 0.05 },
        },
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
        },
        style: {
          radius: 10,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified scale options', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified palette option', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        scale: {
          color: { palette: { type: 'category20' } },
        },
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with continuos color', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified transform options', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        transform: [{ type: 'sortBy', fields: ['sold'] }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with stackY', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart inferring stackY', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
        encode: {
          x: 'month',
          y: 'rainfall',
          color: 'city',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with stackY and series field', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
        transform: [{ type: 'stackY', groupBy: ['x', 'series'] }],
        encode: {
          x: 'month',
          y: 'rainfall',
          color: 'city',
          series: 'city',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with dodgeX', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
        transform: [{ type: 'dodgeX' }],
        encode: {
          x: 'month',
          y: 'rainfall',
          color: 'city',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with array encode', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
          { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
          { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
          { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
          { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
          { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
          { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
          { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
          { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
          { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
          { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
          { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
          { month: 'Total', start: 0, end: 3164946 },
        ],
        encode: {
          x: 'month',
          y: ['end', 'start'],
          color: (d) =>
            d.month === 'Total'
              ? 'Total'
              : d.profit > 0
              ? 'Increase'
              : 'Decrease',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with array field', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { month: 'Jan.', profit: 387264, y: [0, 387264] },
          { month: 'Feb.', profit: 772096, y: [387264, 1159360] },
          { month: 'Mar.', profit: 638075, y: [1159360, 1797435] },
          { month: 'Apr.', profit: -211386, y: [1797435, 1586049] },
          { month: 'May', profit: -138135, y: [1586049, 1447914] },
          { month: 'Jun', profit: -267238, y: [1447914, 1180676] },
          { month: 'Jul.', profit: 431406, y: [1180676, 1612082] },
          { month: 'Aug.', profit: 363018, y: [1612082, 1975100] },
          { month: 'Sep.', profit: -224638, y: [1975100, 1750462] },
          { month: 'Oct.', profit: -299867, y: [1750462, 1450595] },
          { month: 'Nov.', profit: 607365, y: [1450595, 2057960] },
          { month: 'Dec.', profit: 1106986, y: [2057960, 3164946] },
          { month: 'Total', y: [0, 3164946] },
        ],
        encode: {
          x: 'month',
          y: 'y',
          color: (d) =>
            d.month === 'Total'
              ? 'Total'
              : d.profit > 0
              ? 'Increase'
              : 'Decrease',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with both stackY and dodgeX', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart inferring stackY and dodgeX', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
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
        encode: {
          x: 'product_type',
          y: 'order_amt',
          color: 'product_sub_type',
          series: 'sex',
        },
        transform: [{ type: 'stackY', groupBy: ['x', 'series'] }],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders interval chart in transposed polar coordinate', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      data: SALE_OF_YEAR,
      coordinate: [
        { type: 'transpose' },
        { type: 'polar' },
        { type: 'cartesian' },
      ],
      scale: {
        x: { guide: { type: 'axisX', title: null } },
        y: { guide: { type: 'axisY', title: null }, nice: true },
      },
      encode: {
        x: 'year',
        y: 'sale',
        color: 'year',
      },
    });

    mount(createDiv(), chart);
  });

  afterAll(() => {
    // unmountAll();
  });
});
