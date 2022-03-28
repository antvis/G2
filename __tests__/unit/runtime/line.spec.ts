import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('line', () => {
  it('render({...}) should render basic line chart', () => {
    const chart = render<G2Spec>({
      type: 'line',
      data: [
        { year: '1991', value: 15468 },
        { year: '1992', value: 16100 },
        { year: '1993', value: 15900 },
        { year: '1994', value: 17409 },
        { year: '1995', value: 17000 },
        { year: '1996', value: 31056 },
        { year: '1997', value: 31982 },
        { year: '1998', value: 32040 },
        { year: '1999', value: 33233 },
      ],
      encode: {
        x: 'year',
        y: 'value',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render basic line chart', () => {
    const chart = render<G2Spec>({
      type: 'line',
      data: [
        { year: '1991', value: 15468 },
        { year: '1992', value: 16100 },
        { year: '1993', value: 15900 },
        { year: '1994', value: 17409 },
        { year: '1995', value: 17000 },
        { year: '1996', value: 31056 },
        { year: '1997', value: 31982 },
        { year: '1998', value: 32040 },
        { year: '1999', value: 33233 },
      ],
      encode: {
        x: 'year',
        y: 'value',
        shape: 'smooth',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render basic line chart', () => {
    const chart = render<G2Spec>({
      type: 'line',
      data: [
        { year: '1991', value: 15468 },
        { year: '1992', value: 16100 },
        { year: '1993', value: 15900 },
        { year: '1994', value: 17409 },
        { year: '1995', value: 17000 },
        { year: '1996', value: 31056 },
        { year: '1997', value: 31982 },
        { year: '1998', value: 32040 },
        { year: '1999', value: 33233 },
      ],
      transform: [
        {
          type: ({ alphas = [] }) => {
            if (!Array.isArray(alphas)) return (data) => data;
            return (data) =>
              alphas.flatMap((alpha) =>
                data.map((d) => ({
                  ...d,
                  alpha: alpha,
                })),
              );
          },
          alphas: [0, 0.25, 0.5, 0.75, 1],
        },
      ],
      scale: {
        color: { field: 'alpha' },
      },
      encode: {
        x: 'year',
        y: 'value',
        color: (d) => `${d.alpha}`,
        shape: {
          type: 'transform',
          value: (d) => ({
            type: 'smooth',
            alpha: d.alpha,
          }),
        },
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render line chart with temporal x channel', () => {
    const chart = render<G2Spec>({
      type: 'line',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/ab55d10f-24da-465a-9eba-87ac4b7a83ec.json',
        },
      ],
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render series line chart', () => {
    const chart = render<G2Spec>({
      type: 'line',
      data: [
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
      ],
      encode: {
        x: 'month',
        y: 'temperature',
        color: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render series line chart', () => {
    const chart = render<G2Spec>({
      type: 'line',
      data: [
        { month: 'Jan', city: 'Tokyo', temperature: 7 },
        { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
        { month: 'Jan', city: 'London', temperature: 3.9 },
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
      ],
      statistic: [{ type: 'stackEnter', by: ['color'] }],
      encode: {
        x: 'month',
        y: 'temperature',
        color: 'city',
        enterDuration: 2000,
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render series line chart', () => {
    const chart = render<G2Spec>({
      type: 'line',
      data: [
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
      ],
      encode: {
        x: 'month',
        y: 'temperature',
        color: 'city',
        size: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render line in polar', () => {
    const chart = render<G2Spec>({
      type: 'line',
      data: [
        { item: 'Design', user: 'a', score: 70 },
        { item: 'Design', user: 'b', score: 30 },
        { item: 'Development', user: 'a', score: 60 },
        { item: 'Development', user: 'b', score: 70 },
        { item: 'Marketing', user: 'a', score: 50 },
        { item: 'Marketing', user: 'b', score: 60 },
        { item: 'Users', user: 'a', score: 40 },
        { item: 'Users', user: 'b', score: 50 },
        { item: 'Test', user: 'a', score: 60 },
        { item: 'Test', user: 'b', score: 70 },
        { item: 'Language', user: 'a', score: 70 },
        { item: 'Language', user: 'b', score: 50 },
        { item: 'Technology', user: 'a', score: 50 },
        { item: 'Technology', user: 'b', score: 40 },
        { item: 'Support', user: 'a', score: 30 },
        { item: 'Support', user: 'b', score: 40 },
        { item: 'Sales', user: 'a', score: 60 },
        { item: 'Sales', user: 'b', score: 40 },
        { item: 'UX', user: 'a', score: 50 },
        { item: 'UX', user: 'b', score: 60 },
      ],
      coordinate: [{ type: 'polar' }],
      scale: { y: { zero: true } },
      encode: {
        x: 'item',
        y: 'score',
        color: 'user',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render line in parallel', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'line',
        width: 720,
        paddingLeft: 80,
        transform: [
          {
            type: 'fetch',
            url: 'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
            callback: ({ Year, ...rest }) => ({
              Year: new Date(Year),
              ...rest,
            }),
          },
          {
            type: 'filterBy',
            fields: ['Horsepower', 'Miles_per_Gallon'],
          },
        ],
        coordinate: [{ type: 'parallel' }],
        scale: {
          'position[1]': { nice: true, guide: { zIndex: 1 } },
          'position[2]': { nice: true, guide: { zIndex: 1 } },
          'position[3]': { nice: true, guide: { zIndex: 1 } },
          'position[4]': { nice: true, guide: { zIndex: 1 } },
          'position[5]': { nice: true, guide: { zIndex: 1 } },
          'position[6]': { nice: true, guide: { zIndex: 1 } },
        },
        encode: {
          position: [
            'Cylinders',
            'Displacement',
            'Weight_in_lbs',
            'Horsepower',
            'Acceleration',
            'Miles_per_Gallon',
            'Year',
          ],
          color: 'Origin',
          size: 1.01,
        },
        style: {
          strokeOpacity: 0.3,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });
});
