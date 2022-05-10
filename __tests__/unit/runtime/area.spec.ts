import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('area', () => {
  it('render({...}) should render basic area chart', () => {
    const chart = render<G2Spec>({
      type: 'area',
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

  it('render({...}) should render basic area chart', () => {
    const chart = render<G2Spec>({
      type: 'area',
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
        shape: 'smoothArea',
      },
    });

    mount(createDiv(), chart);
  });
});
