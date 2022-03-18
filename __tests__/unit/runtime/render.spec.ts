import { Polygon } from '@antv/g';
import { G2Spec, Point, render, ShapeComponent } from '../../../src';
import { createLibrary } from '../../../src/stdlib';
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

  it('render({...} renders chart according to specified options', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with constant encode', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with default color', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified theme', () => {
    const chart = render<G2Spec>({
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
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with custom component type', () => {
    const chart = render<G2Spec>({
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
        // @ts-ignore
        shape: {
          type: 'constant',
          value: () => {
            return (P, style) => {
              const [p0, p1, p2, p3] = P;
              const pm = [(p0[0] + p1[0]) / 2, p0[1]];
              const { color } = style;
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
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with custom library', () => {
    const TriangleShape: ShapeComponent<{}> = () => {
      return (P, style, coordinate) => {
        const [p0, p1, p2, p3] = P;
        const pm: Point = [(p0[0] + p1[0]) / 2, p0[1]];
        const { color } = style;
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
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with constant shape channel', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with field shape channel', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified style', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart in transpose coordinate', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart in polar coordinate', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart in polar and transpose coordinate', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart inferring stack statistic', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified scale options', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified palette option', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with continuos color', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with specified transform options', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with stackY', () => {
    const chart = render<G2Spec>({
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
      statistic: [{ type: 'stackY' }],
      encode: {
        x: 'month',
        y: 'rainfall',
        color: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart inferring stackY', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart inferring dodgeX', () => {
    const chart = render<G2Spec>({
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
        series: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with dodgeX', () => {
    const chart = render<G2Spec>({
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
      statistic: [{ type: 'dodgeX' }],
      encode: {
        x: 'month',
        y: 'rainfall',
        color: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with transform and array encode', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart with both stackY and dodgeX', () => {
    const chart = render<G2Spec>({
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
      statistic: [{ type: 'stackY' }],
      encode: {
        x: 'product_type',
        y: 'order_amt',
        color: 'product_sub_type',
        series: 'sex',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders chart inferring stackY and dodgeX', () => {
    const chart = render<G2Spec>({
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
    });

    mount(createDiv(), chart);
  });

  afterAll(() => {
    unmountAll();
  });
});
