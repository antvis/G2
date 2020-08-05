import { Chart } from '../src/';
import { createDiv } from './util/dom';

describe('1265', () => {

  it('1265', () => {
    const data = [
      { genre: 'SportsSportsSportsSportsSportsSportsSportsSports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new Chart({
      container: createDiv(),
      height: 300,
      autoFit: true
    });

    chart.data(data);
    chart.interval().position('genre*sold').color('genre');

    chart.interaction('component-tooltip');
    chart.render();
  });
});
