import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';
import {
  SALE_OF_YEAR,
  SALE_OF_YEAR_WITH_TYPE,
  SCORE_OF_ITEM_WITH_TYPE,
} from '../../data/sales';

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

  it('render({...}) should render basic area chart', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: SALE_OF_YEAR,
      encode: {
        x: 'year',
        y: 'sale',
        shape: 'smoothArea',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render stacked area chart', () => {
    const chart = render<G2Spec>({
      type: 'area',
      data: SALE_OF_YEAR_WITH_TYPE,
      encode: {
        x: 'year',
        y: 'sale',
        color: 'type',
        shape: 'smoothArea',
      },
      statistic: [{ type: 'stackY' }],
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
});
