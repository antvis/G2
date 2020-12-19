import { Chart } from '../../src';
import { delay } from '../util/delay';
import { createDiv } from '../util/dom';

describe('#3108', () => {
  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: createDiv(), // 指定图表容器 ID
    height: 300, // 指定图表高度
    autoFit: true,
  });

  // Step 2: 载入数据源
  chart.data([
    {
      x: 'A',
      y: 10,
    },
    {
      x: 'B',
      y: 20,
    },
    {
      x: 'C',
      y: 30,
    },
  ]);
  // Step 3：创建图形语法，
  chart.line().position('x*y');

  // Step 4: 渲染图表
  chart.render();

  it('no extra div', () => {
    const canvas = chart.getCanvas();
    expect(canvas.get('el').parentNode.querySelectorAll('div').length).toBe(0);
  });

  it('html annotation render', async () => {
    chart.annotation().html({
      position: ['50%', '50%'],
      html: () => '<div>hello</div>',
    });
    chart.render();
    await delay(10);
    const canvas = chart.getCanvas();
    const divs = [...canvas.get('el').parentNode.childNodes].filter((child) => child.tagName === 'DIV');
    expect(divs.length).toBe(1);
  });

  it('html annotation clear', async () => {
    chart.annotation().clear(true);
    const canvas = chart.getCanvas();
    expect(canvas.get('el').parentNode.querySelectorAll('div').length).toBe(0);
  });

  it('html annotation destroy', async () => {
    chart.annotation().html({
      position: ['50%', '50%'],
      html: () => '<div>hello</div>',
    });
    chart.render();
    await delay(10);

    chart.annotation().destroy();
    const canvas = chart.getCanvas();
    expect(canvas.get('el').parentNode.querySelectorAll('div').length).toBe(0);
  });

  afterAll(() => {
    chart.destroy();
  });
});
