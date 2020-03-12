import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2158', () => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
  ];

  const div = createDiv();

  div.style.padding = '30px';
  div.id = 'mountNode';
  
  const chart = new Chart({
    container: 'mountNode',
    autoFit: true,
    height: 500,
  });
  
  // Step 2: 载入数据源
  chart.data(data);

  chart.scale({
    genre: {
      alias: '游戏种类' // 列定义，定义该属性显示的别名
    },
    sold: {
      alias: '销售量'
    }
  });
  
  chart.interval().position('genre*sold').color('genre');
  
  chart.render();

  test('height should be 500px', () => {
    expect(div.querySelector('canvas').getBoundingClientRect().height).toBe(500);
  });

  afterAll(() => {
    chart.destroy();
  });
});
