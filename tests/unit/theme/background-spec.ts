import { Chart, getTheme } from '../../../src';
import { createDiv } from '../../util/dom';

describe('theme', () => {
  it('background', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      theme: 'dark',
    });

    chart.data(data);

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ]);

    chart.render();

    const theme = chart.getTheme();
    expect(theme).toEqual(getTheme('dark'));

    // @ts-ignore
    const shape = chart.backgruondStyleRectShape;

    expect(shape.attr('fill')).toBe('#141414');
    expect(shape.attr('x')).toBe(0);
    expect(shape.attr('y')).toBe(0);
    expect(shape.attr('width')).toBe(400);
    expect(shape.attr('height')).toBe(300);

    // 删除 theme
    chart.theme({
      background: 'red',
    });

    chart.changeSize(300, 200);

    chart.render();

    // 保持引用
    // @ts-ignore
    expect(shape).toBe(chart.backgruondStyleRectShape);

    expect(shape.attr('fill')).toBe('red');
    expect(shape.attr('x')).toBe(0);
    expect(shape.attr('y')).toBe(0);
    expect(shape.attr('width')).toBe(300);
    expect(shape.attr('height')).toBe(200);

    chart.theme({
      background: '',
    });

    chart.render();

    // @ts-ignore
    expect(chart.backgruondStyleRectShape).toBe(undefined);
    expect(chart.backgroundGroup.getChildren().filter((s) => s.get('type') === 'rect').length).toBe(0); // 没有 rect
  });
});
