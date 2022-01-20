import { Chart } from '../../src';
import { createDiv } from '../util/dom';
const data = [
  { category: 'A', value: 1 },
  { category: 'A', value: 1.5 },
  { category: 'B', value: 2 },
  { category: 'B', value: 2 },
  { category: 'B', value: 2 },
  { category: 'B', value: 2 },
  { category: 'B', value: 2 },
  { category: 'B', value: 2 },
  { category: 'B', value: 2 },
  { category: 'B', value: 2 },
  //   {category: 'C', value: 2},
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'D', value: 3 },
  { category: 'E', value: 3 },
];

describe('#3737', () => {
  it('B类的点不应该出现在C类范围中', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
      width: 400,
      height: 400,
    });

    chart.data(data);
    chart.scale('category', {
      type: 'cat',
      range: [0, 1],
      nice: true,
      values: ['A', 'B', 'C', 'D', 'E'],
    });
    chart.axis('category', {
      grid: {
        alignTick: false,
      },
    });

    chart.point().adjust('jitter').position('category*value');

    chart.render();

    const pointsB = chart.geometries[0].dataArray[0].filter((val) => val._origin.category === 'B');

    expect(pointsB.every((val) => val.x < (400 / 5) * 2)).toBe(true);
  });
});
