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

  it('should render stacked area', () => {
    const chart = render<G2Spec>({
      type: 'area',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
        },
        { type: 'stackY', orderBy: 'series' },
      ],
      scale: {
        x: { field: 'Date', utc: true },
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      encode: {
        shape: 'smoothArea',
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render stacked area order by value', () => {
    const chart = render<G2Spec>({
      type: 'area',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
        },
        { type: 'stackY', orderBy: 'value' },
      ],
      scale: {
        x: { field: 'Date', utc: true },
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      encode: {
        shape: 'smoothArea',
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render stacked value order by sum', () => {
    const chart = render<G2Spec>({
      type: 'area',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
        },
        { type: 'stackY', orderBy: 'sum' },
      ],
      scale: {
        x: { field: 'Date', utc: true },
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      encode: {
        shape: 'smoothArea',
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render stacked area order by fields', () => {
    const chart = render<G2Spec>({
      type: 'area',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
        },
        { type: 'stackY', orderBy: ['unemployed'] },
      ],
      scale: {
        x: { field: 'Date', utc: true },
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      encode: {
        shape: 'smoothArea',
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render stacked area order by function', () => {
    const chart = render<G2Spec>({
      type: 'area',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
        },
        { type: 'stackY', orderBy: (d) => d.unemployed },
      ],
      scale: {
        x: { field: 'Date', utc: true },
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      encode: {
        shape: 'smoothArea',
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render stacked area order by reverse max index', () => {
    const chart = render<G2Spec>({
      type: 'view',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
        },
      ],
      children: [
        {
          type: 'area',
          transform: [
            {
              type: 'stackY',
              orderBy: 'maxIndex',
              reverse: true,
            },
          ],
          scale: {
            y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
          },
          encode: {
            shape: 'smoothArea',
            x: (d) => new Date(d.year),
            y: 'revenue',
            color: 'group',
            series: 'format',
          },
        },
        {
          type: 'line',
          transform: [
            {
              type: 'stackY',
              orderBy: 'maxIndex',
              reverse: true,
              y: 'y1',
            },
          ],
          encode: {
            shape: 'smooth',
            x: (d) => new Date(d.year),
            y: 'revenue',
            series: 'format',
          },
          style: {
            stroke: 'white',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('should render stacked point', () => {
    const chart = render<G2Spec>({
      type: 'view',
      height: 360,
      children: [
        {
          type: 'point',
          transform: [
            {
              type: 'fetch',
              url: 'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
            },
            { type: 'stackY' },
          ],
          scale: {
            x: { field: 'Age →', nice: true },
            y: {
              field: '← Women · Men →',
              guide: { label: { formatter: (d) => `${Math.abs(+d.text)}` } },
            },
          },
          encode: {
            x: (d) => 2021 - d.birth,
            y: (d) => (d.gender === 'M' ? 1 : -1),
            color: 'gender',
          },
        },
        {
          type: 'annotation.lineX',
          // @todo Do not need encode.
          data: [0],
          encode: {
            y: 0,
          },
          style: {
            stroke: 'black',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('should render jittered points in x and y dimensions', () => {
    const chart = render<G2Spec>({
      type: 'point',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
        },
        { type: 'jitter' },
      ],
      scale: { x: { padding: 0.5 }, y: { guide: null } },
      encode: {
        x: 'clarity',
        color: 'clarity',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render jittered points in polar', () => {
    const chart = render<G2Spec>({
      type: 'point',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
        },
        { type: 'jitter', paddingX: 0.1, paddingY: 0.1 },
      ],
      paddingLeft: 90,
      coordinate: [{ type: 'polar' }],
      scale: {
        x: { padding: 0.5 },
        y: { padding: 0.5 },
        color: { guide: null },
      },
      encode: {
        x: 'clarity',
        y: 'cut',
        color: (d) => `(${d.clarity}, ${d.cut})`,
      },
    });
    mount(createDiv(), chart);
  });

  it('should render jittered points in y dimension', () => {
    const chart = render<G2Spec>({
      type: 'point',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
        },
        { type: 'jitterY', padding: 0.1 },
      ],
      paddingLeft: 90,
      scale: {
        x: { padding: 0.5 },
        y: { padding: 0.5 },
        color: { guide: null },
      },
      encode: {
        x: 'clarity',
        y: 'cut',
        shape: 'hyphen',
        size: 25,
      },
    });
    mount(createDiv(), chart);
  });

  it('should render symmetry stacked area', () => {
    const chart = render<G2Spec>({
      type: 'area',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
        },
        { type: 'stackY' },
        { type: 'symmetryY' },
      ],
      scale: {
        x: { field: 'Date', utc: true },
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      encode: {
        shape: 'smoothArea',
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render symmetry interval', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      transform: [
        { type: 'sortBy', fields: ['sold'], order: 'DESC' },
        { type: 'symmetryY' },
      ],
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

  it('should render symmetry stacked points', () => {
    const chart = render<G2Spec>({
      type: 'point',
      height: 360,
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
        },
        { type: 'stackY', orderBy: 'series' },
        { type: 'symmetryY' },
      ],
      scale: {
        x: { field: 'Age →', nice: true },
        y: {
          field: '← Women · Men →',
          guide: { label: { formatter: (d) => `${Math.abs(+d.text)}` } },
        },
      },
      encode: {
        x: (d) => 2021 - d.birth,
        y: 1,
        color: 'gender',
      },
    });
    mount(createDiv(), chart);
  });

  it('should render dodged interval', () => {
    const chart = render<G2Spec>({
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
        },
        { type: 'dodgeX' },
      ],
      paddingLeft: 60,
      scale: {
        x: {
          guide: {
            label: {
              formatter: (d) =>
                `${new Date(d.text).toLocaleString('en', { month: 'narrow' })}`,
            },
          },
        },
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      type: 'interval',
      encode: { x: 'date', y: 'deaths', color: 'cause' },
    });

    mount(createDiv(), chart);
  });

  it('should render dodged interval with value order', () => {
    const chart = render<G2Spec>({
      data: [
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
      ],
      paddingLeft: 60,
      transform: [{ type: 'dodgeX', orderBy: 'value', reverse: true }],
      type: 'interval',
      encode: { x: 'year', y: 'sales', color: 'type' },
    });

    mount(createDiv(), chart);
  });

  it('should render normalized dodged schema', () => {
    const chart = render<G2Spec>({
      type: 'schema',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/62fd7bf5-beb5-4791-9b62-6c66fa0204da.json',
        },
        {
          type: 'dodgeX',
          paddingInner: 0.3,
          paddingOuter: 0.1,
        },
      ],
      encode: {
        x: 'type',
        y: 'bin',
        color: 'Species',
      },
      scale: {
        x: { paddingInner: 0.2, paddingOuter: 0.1 },
        y: { zero: true },
      },
      style: {
        stroke: 'black',
      },
    });

    mount(createDiv(), chart);
  });
});
