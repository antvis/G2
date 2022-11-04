import { createDiv, mount } from '../../utils/dom';
import {
  SALE_OF_YEAR,
  SALE_OF_YEAR_WITH_TYPE,
  SCORE_OF_ITEM_WITH_TYPE,
} from '../../data/sales';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('area', () => {
  it('render({...}) should render basic area chart', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: SALE_OF_YEAR,
      encode: {
        x: 'year',
        y: 'sale',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render gradient area chart', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: [
        { year: '1991', value: 0 },
        { year: '1992', value: 632 },
        { year: '1993', value: 432 },
        { year: '1994', value: 1941 },
        { year: '1995', value: 1532 },
        { year: '1996', value: 15588 },
        { year: '1997', value: 16514 },
        { year: '1998', value: 16572 },
        { year: '1999', value: 17765 },
      ],
      encode: {
        x: 'year',
        y: 'value',
        color: 'value',
        shape: 'smooth',
        series: 'a',
      },
      style: {
        gradient: true,
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render stacked area chart', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: SALE_OF_YEAR_WITH_TYPE,
      transform: [{ type: 'stackY' }],
      encode: {
        x: 'year',
        y: 'sale',
        color: 'type',
        shape: 'smooth',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render area chart in polar', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: SCORE_OF_ITEM_WITH_TYPE,
      encode: {
        x: 'item',
        y: 'score',
        color: 'type',
      },
      scale: {
        x: { guide: { type: 'axisX' }, padding: 0.5, align: 0 },
        y: { guide: { type: 'axisY', zIndex: 1 }, tickCount: 5 },
      },
      coordinate: [{ type: 'polar' }],
      style: {
        fillOpacity: 0.25,
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render area chart in polar with smooth', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: SCORE_OF_ITEM_WITH_TYPE,
      encode: {
        x: 'item',
        y: 'score',
        color: 'type',
        shape: 'smooth',
      },
      scale: {
        x: { guide: { type: 'axisX' }, padding: 0.5, align: 0 },
        y: { guide: { type: 'axisY', zIndex: 1 }, tickCount: 5 },
      },
      coordinate: [{ type: 'polar' }],
      style: {
        fillOpacity: 0.25,
      },
    });

    mount(createDiv(), chart);
  });
});
