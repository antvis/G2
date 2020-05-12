import { Chart } from '../../src/';
import { createDiv } from '../util/dom';
import { COMPONENT_TYPE } from '../../src/constant';

describe('2442', () => {
  it('should end with blue', () => {
    const data = [
      { task: 'task0', range: ['2018-04-18 01:17:12', '2018-04-18 01:19:10'], value: 10 },
      { task: 'task1', range: ['2018-04-18 01:18:15', '2018-04-18 01:19:20'], value: 11 },
      { task: 'task2', range: ['2018-04-18 02:11:32', '2018-04-18 02:18:50'], value: 12 },
      { task: 'task3', range: ['2018-04-18 02:18:50', '2018-04-18 03:16:38'], value: 13 },
      { task: 'task4', range: ['2018-04-18 02:19:48', '2018-04-18 02:21:57'], value: 0 },
      { task: 'task5', range: ['2018-04-18 03:16:38', '2018-04-18 03:19:38'], value: 1 },
      { task: 'task6', range: ['2018-04-18 03:19:38', '2018-04-18 03:27:49'], value: 0 },
      { task: 'task7', range: ['2018-04-18 07:29:37', '2018-04-18 07:33:01'], value: 0 },
      { task: 'task8', range: ['2018-04-18 03:27:49', '2018-04-18 04:26:05'], value: 0 },
      { task: 'task9', range: ['2018-04-18 04:26:05', '2018-04-18 06:06:36'], value: 0 },
      { task: 'task10', range: ['2018-04-18 06:06:36', '2018-04-18 06:15:15'], value: 0 },
      { task: 'task11', range: ['2018-04-18 03:27:49', '2018-04-18 03:34:50'], value: 0 },
    ];

    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });

    chart.data(data);

    chart.coordinate().transpose().scale(1, -1);

    chart.interaction('element-active');
    chart.interval().position('task*range').color('value', ['red', 'blue']);

    chart.render();

    const [legend] = chart.getComponents().filter((comp) => comp.type === COMPONENT_TYPE.LEGEND);
    const colors = legend.component.get('colors') as string[];
    expect(colors.pop()).toBe('#0000ff');
  });
});
