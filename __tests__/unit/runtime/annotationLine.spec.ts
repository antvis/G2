import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('line annotation', () => {
  it('render({...}) should render basic chart with line annotation', () => {
    const chart = render<G2Spec>({
      type: 'view',
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
      children: [
        {
          type: 'line',
          encode: {
            x: 'year',
            y: 'value',
          },
        },
        {
          type: 'annotation.lineY',
          encode: {
            y: 30000,
          },
          style: {
            stroke: 'green',
          },
        },
        {
          type: 'annotation.lineX',
          data: {
            transform: [
              {
                type: 'filterBy',
                fields: ['year'],
                callback: (d) => d === '1995' || d === '1998',
              },
            ],
          },
          encode: {
            x: 'year',
          },
          style: {
            stroke: 'red',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render line annotation in series line chart', () => {
    const chart = render<G2Spec>({
      type: 'view',
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
      children: [
        {
          type: 'line',
          encode: {
            x: 'month',
            y: 'temperature',
            color: 'city',
          },
        },
        {
          type: 'annotation.lineY',
          data: {
            transform: [
              {
                type: 'filterBy',
                fields: ['temperature'],
                callback: (d) => d > 14 && d < 15,
              },
            ],
          },
          encode: {
            y: 'temperature',
            color: 'city',
          },
        },
        {
          type: 'annotation.lineX',
          data: {
            transform: [
              {
                type: 'filterBy',
                fields: ['month'],
                callback: (d) => d === 'Jun',
              },
            ],
          },
          encode: {
            x: 'month',
          },
          style: {
            stroke: 'red',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render line annotation in polar', () => {
    const chart = render<G2Spec>({
      type: 'view',
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
      children: [
        {
          type: 'line',
          encode: {
            x: 'item',
            y: 'score',
            color: 'user',
          },
        },
        {
          type: 'annotation.lineY',
          encode: {
            x: 'item',
            y: 40,
          },
          style: {
            lineDash: [2, 4],
            stroke: '#999',
            lineWidth: 1,
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });
});
