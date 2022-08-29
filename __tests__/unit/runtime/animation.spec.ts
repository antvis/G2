import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('animation', () => {
  // Don't asset for temporary as the inner data structure of context is not clear now.
  it('chart should has animation by default', (done) => {
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

  it('chart should be enable to specified effect timing by options.animate', (done) => {
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
        animate: {
          enter: {
            duration: 2000,
            delay: 1000,
          },
        },
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('chart should be enable to treat enterDuration as channel', (done) => {
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
          enterDuration: 'sold',
        },
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('chart should be enable to treat enterDelay as channel', (done) => {
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
          enterDelay: { type: 'band', range: [0, 3000] },
        },
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          enterDelay: 'genre',
        },
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('chart should be enable to treat enterType as channel', (done) => {
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
          enterType: { range: ['scaleInY', 'fadeIn'] },
        },
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          enterType: (d) => (d.sold > 200 ? 'high' : 'low'),
        },
        animate: {
          enter: {
            duration: 3000,
          },
        },
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('chart should apply animation to mark each by each if has stackEnter', (done) => {
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
          enter: { type: 'identity' },
        },
        transform: [{ type: 'stackEnter', by: ['x'] }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          enterDuration: 500,
        },
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('chart should show layer by layer for each stacked interval', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { type: 'Apple', year: '2001', value: 260 },
          { type: 'Orange', year: '2001', value: 100 },
          { type: 'Banana', year: '2001', value: 90 },
          { type: 'Apple', year: '2002', value: 210 },
          { type: 'Orange', year: '2002', value: 150 },
          { type: 'Banana', year: '2002', value: 30 },
        ],
        scale: {
          enter: { type: 'identity' },
        },
        transform: [{ type: 'stackEnter', by: ['color'] }],
        encode: {
          x: 'year',
          y: 'value',
          color: 'type',
          enterDuration: 300,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('chart should show layer by layer for all stacked interval', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { type: 'Apple', year: '2001', value: 260 },
          { type: 'Orange', year: '2001', value: 100 },
          { type: 'Banana', year: '2001', value: 90 },
          { type: 'Apple', year: '2002', value: 210 },
          { type: 'Orange', year: '2002', value: 150 },
          { type: 'Banana', year: '2002', value: 30 },
        ],
        scale: {
          enter: { type: 'identity' },
        },
        transform: [{ type: 'stackEnter', by: ['x', 'color'] }],
        encode: {
          x: 'year',
          y: 'value',
          color: 'type',
          enterDuration: 300,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('chart should show intervals type by type', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { type: 'Apple', year: '2001', value: 260 },
          { type: 'Orange', year: '2001', value: 100 },
          { type: 'Banana', year: '2001', value: 90 },
          { type: 'Apple', year: '2002', value: 210 },
          { type: 'Orange', year: '2002', value: 150 },
          { type: 'Banana', year: '2002', value: 30 },
        ],
        scale: {
          enter: { type: 'identity' },
        },
        transform: [{ type: 'stackEnter', by: ['color'] }],
        encode: {
          x: 'year',
          y: 'value',
          color: 'type',
          series: 'type',
          enterDuration: 1000,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('chart should show intervals year by year', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { type: 'Apple', year: '2001', value: 260 },
          { type: 'Orange', year: '2001', value: 100 },
          { type: 'Banana', year: '2001', value: 90 },
          { type: 'Apple', year: '2002', value: 210 },
          { type: 'Orange', year: '2002', value: 150 },
          { type: 'Banana', year: '2002', value: 30 },
        ],
        scale: {
          enter: { type: 'identity' },
        },
        transform: [{ type: 'stackEnter', by: ['x'] }],
        encode: {
          x: 'year',
          y: 'value',
          color: 'type',
          series: 'type',
          enterDuration: 1000,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it.only('chart should show intervals year by year and then type by type', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { type: 'Apple', year: '2001', value: 260 },
          { type: 'Orange', year: '2001', value: 100 },
          { type: 'Banana', year: '2001', value: 90 },
          { type: 'Apple', year: '2002', value: 210 },
          { type: 'Orange', year: '2002', value: 150 },
          { type: 'Banana', year: '2002', value: 30 },
        ],
        scale: {
          // enter: { type: 'identity' },
        },
        transform: [{ type: 'stackEnter', by: ['x', 'color'] }],
        encode: {
          x: 'year',
          y: 'value',
          color: 'type',
          series: 'type',
          enterDuration: 1000,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('chart should show intervals type by type then year by year', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { type: 'Apple', year: '2001', value: 260 },
          { type: 'Orange', year: '2001', value: 100 },
          { type: 'Banana', year: '2001', value: 90 },
          { type: 'Apple', year: '2002', value: 210 },
          { type: 'Orange', year: '2002', value: 150 },
          { type: 'Banana', year: '2002', value: 30 },
        ],
        transform: [{ type: 'stackEnter', by: ['color', 'x'] }],
        encode: {
          x: 'year',
          y: 'value',
          color: 'type',
          series: 'type',
          enterDuration: 1000,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('chart should be enable to treat both enterType and enterDuration as channel', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { name: 'event planning', startTime: 1, endTime: 4 },
          { name: 'layout logistics', startTime: 3, endTime: 13 },
          { name: 'select vendors', startTime: 5, endTime: 8 },
          { name: 'hire venue', startTime: 9, endTime: 13 },
          { name: 'hire caterer', startTime: 10, endTime: 14 },
          { name: 'hire event decorators', startTime: 12, endTime: 17 },
          { name: 'rehearsal', startTime: 14, endTime: 16 },
          { name: 'event celebration', startTime: 17, endTime: 18 },
        ],
        coordinate: [{ type: 'transpose' }],
        scale: {
          enter: { range: [0, 10000], zero: true },
        },
        encode: {
          x: 'name',
          y: ['endTime', 'startTime'],
          color: 'name',
          enterDelay: 'startTime',
          enterDuration: (d) => d.endTime - d.startTime,
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('chart should has animation with fadeIn, fadeOut', () => {
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
        animate: {
          enter: { type: 'fadeIn', duration: 1000 },
          // todo: how to test it?
          update: { type: 'fadeOut' },
          exit: { type: 'fadeOut' },
        },
      },
      {},
    );

    mount(createDiv(), chart);
  });

  it('chart should has animation with scaleInX, scaleOutX', () => {
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
        },
        animate: {
          enter: { type: 'scaleInX', duration: 10000 },
        },
      },
      {},
    );

    mount(createDiv(), chart);
  });
});
