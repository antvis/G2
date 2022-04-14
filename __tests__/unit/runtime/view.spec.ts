import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('point', () => {
  it('render({...}) should render marks with same scales', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    const chart = render<G2Spec>({
      type: 'view',
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
        {
          type: 'text',
          data,
          encode: {
            x: 'genre',
            y: 'sold',
            text: 'sold',
          },
          style: {
            fill: 'black',
            textAlign: 'center',
            dy: -5,
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render marks with same encodings', () => {
    const data = [
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ];
    const chart = render<G2Spec>({
      type: 'view',
      children: [
        {
          type: 'line',
          data: data,
          encode: {
            x: 'month',
            y: 'temperature',
            color: 'city',
          },
        },
        {
          type: 'point',
          data: data,
          encode: {
            x: 'month',
            y: 'temperature',
            color: 'city',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render view with axis in same position', () => {
    const data = [
      { year: '1991', value: 3, count: 10 },
      { year: '1992', value: 4, count: 4 },
      { year: '1993', value: 3.5, count: 5 },
      { year: '1994', value: 5, count: 5 },
      { year: '1995', value: 4.9, count: 4.9 },
      { year: '1996', value: 6, count: 35 },
      { year: '1997', value: 7, count: 7 },
      { year: '1998', value: 9, count: 1 },
      { year: '1999', value: 13, count: 20 },
    ];

    const chart = render<G2Spec>({
      type: 'view',
      children: [
        {
          type: 'line',
          data: data,
          scale: {
            color: {
              domain: ['value', 'count'],
              range: ['#5B8FF9', '#5AD8A6'],
            },
          },
          encode: {
            x: 'year',
            y: 'value',
            color: () => 'value',
          },
        },
        {
          type: 'line',
          data: data,
          scale: {
            y: {
              independent: true,
            },
          },
          encode: {
            x: 'year',
            y: 'count',
            color: () => 'count',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render view with axis in different position', () => {
    const data = [
      { time: '2019-03', value: 350, count: 800 },
      { time: '2019-04', value: 900, count: 600 },
      { time: '2019-05', value: 300, count: 400 },
      { time: '2019-06', value: 450, count: 380 },
      { time: '2019-07', value: 470, count: 220 },
    ];

    const chart = render<G2Spec>({
      type: 'view',
      children: [
        {
          type: 'interval',
          data: data,
          scale: {
            color: {
              domain: ['value', 'count'],
              range: ['#5B8FF9', '#5AD8A6'],
            },
          },
          encode: {
            x: 'time',
            y: 'value',
            color: () => 'value',
          },
        },
        {
          type: 'line',
          data: data,
          scale: {
            y: {
              independent: true,
              guide: { position: 'right' },
            },
            x: {
              independent: true,
              guide: null,
            },
          },
          encode: {
            x: 'time',
            y: 'count',
            color: () => 'count',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render series intervals with different scales', () => {
    const data = [
      { year: '1991', value: 3, count: 10 },
      { year: '1992', value: 4, count: 4 },
      { year: '1993', value: 3.5, count: 5 },
      { year: '1994', value: 5, count: 5 },
      { year: '1995', value: 4.9, count: 4.9 },
      { year: '1996', value: 6, count: 35 },
      { year: '1997', value: 7, count: 7 },
      { year: '1998', value: 9, count: 1 },
      { year: '1999', value: 13, count: 20 },
    ];

    const chart = render<G2Spec>({
      type: 'view',
      children: [
        {
          type: 'interval',
          data: data,
          scale: {
            color: {
              domain: ['value', 'count'],
              range: ['#5B8FF9', '#5AD8A6'],
            },
            series: {
              domain: ['value', 'count'],
            },
          },
          encode: {
            x: 'year',
            y: 'value',
            color: () => 'value',
            series: () => 'value',
          },
        },
        {
          type: 'interval',
          data: data,
          scale: {
            y: {
              independent: true,
              guide: { position: 'right' },
            },
          },
          encode: {
            x: 'year',
            y: 'count',
            color: () => 'count',
            series: () => 'count',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });
});
