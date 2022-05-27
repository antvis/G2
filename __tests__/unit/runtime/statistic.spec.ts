import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';
import { SALE_OF_YEAR_WITH_TYPE } from '../../data/sales';

describe('statistic', () => {
  it('should render normalized stack interval', () => {
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
      transform: [{ type: 'normalizeY' }],
      encode: {
        x: 'month',
        y: 'rainfall',
        color: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  it('should render normalized stack end dodge interval', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json',
        },
        { type: 'normalizeY', groupBy: ['x', 'series'] },
      ],
      scale: { y: { field: 'order' } },
      encode: {
        x: 'product_type',
        y: 'order_amt',
        color: 'product_sub_type',
        series: 'sex',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render normalized stack area', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: SALE_OF_YEAR_WITH_TYPE,
      transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
      encode: {
        x: 'year',
        y: 'sale',
        color: 'type',
        shape: 'smoothArea',
      },
    });

    mount(createDiv(), chart);
  });

  it('should render normalized line', () => {
    const chart = render<G2Spec>({
      type: 'line',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/6a9b4091-2fe1-4649-89f3-f9a211827811.json',
        },
        {
          type: 'normalizeY',
          groupBy: 'series',
          basis: 'first',
        },
      ],
      scale: { x: { field: 'Date' } },
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        color: 'Symbol',
      },
    });
    mount(createDiv(), chart);
  });
});
