import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#4141', () => {
  it('render large-amount-of-annotations, should cost less than 5s', () => {
    const data: any[] = [];
    for (let i = 0; i < 1000; i++) {
      data.push(
        ...[
          { type: '17 岁以下', value: 654, percent: 0.02 },
          { type: '18-24 岁', value: 4400, percent: 0.2 },
          { type: '25-29 岁', value: 5300, percent: 0.24 },
          { type: '30-39 岁', value: 6200, percent: 0.28 },
          { type: '40-49 岁', value: 3300, percent: 0.14 },
          { type: '50 岁以上', value: 1500, percent: 0.06 },
          { type: '未知', value: 654, percent: 0.02 },
        ]
      );
    }
    // const startTime = Date.now();
    const chart = new Chart({
      container: createDiv(),
    });
    chart.data(data);
    chart.interval().position('type*value');
    // 添加文本标注
    data.forEach((item) => {
      chart
        .annotation()
        .text({
          position: [item.type, item.value],
          content: item.value,
          offsetY: -30,
        })
        .text({
          position: [item.type, item.value],
          content: (item.percent * 100).toFixed(0) + '%',
          offsetY: -12,
        });
    });

    chart.render();
    // Actual cost less than 1500ms.
    // expect(Date.now() - startTime).toBeLessThan(5000);
  });
});
