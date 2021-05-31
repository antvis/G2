import { Chart } from '../../src';
import { createDiv } from '../util/dom';

const data = [
  {
    click_count: 423,
    hour: '00',
  },
  {
    click_count: 570,
    hour: '01',
  },
  {
    click_count: 634,
    hour: '02',
  },
];

describe('text annotation', () => {
  it('parse positon error', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 400,
    });

    const view = chart.createView();
    view.data(data);
    view.line().position('hour*click_count');

    chart.render();

    const drawAnnotation = () => {
      chart.annotation().text({ position: ['min', 'median'], content: 'xx' });
      chart.render();
    };

    expect(drawAnnotation).not.toThrowError();
  });
});
