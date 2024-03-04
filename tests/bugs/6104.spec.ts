import { Chart } from '../../src';
import { createDiv } from '../util/dom';


describe('#6104', () => {
  it('dual-axes-label.spec', async () => {

    const data = [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2, people: 5 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 }
    ];
    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500
    });
    chart.clear();
    chart.data(data);
    chart.interval()
      .position('time*waiting')
      .color('#3182bd')
      .label('waiting', {
        style: {
          fill: '#f00',
        },
      })
    chart.line()
      .position('time*people')
      .color('#fdae6b')
      .size(3)
      .shape('smooth')
      .label('waiting', {
        style: {
          fill: '#0f0',
        },
      })


    chart.render();
    chart.render();
    chart.destroy();
  })
})
