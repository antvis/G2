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
    const shape = chart.backgroundStyleRectShape;

    expect(chart.backgroundGroup.getChildren().indexOf(shape)).toBe(0);
    expect(shape.attr('fill')).toBe('#141414');
    expect(shape.attr('x')).toBe(0);
    expect(shape.attr('y')).toBe(0);
    expect(shape.attr('width')).toBe(400);
    expect(shape.attr('height')).toBe(300);

    // 删除 theme
    chart.theme({
      background: 'yellow',
    });

    chart.changeSize(600, 400);

    // 保持引用
    // @ts-ignore
    expect(shape).toBe(chart.backgroundStyleRectShape);

    expect(shape.attr('fill')).toBe('yellow');
    expect(shape.attr('x')).toBe(0);
    expect(shape.attr('y')).toBe(0);
    expect(shape.attr('width')).toBe(600);
    expect(shape.attr('height')).toBe(400);
    expect(shape.get('capture')).toBe(false);

    chart.theme({
      background: '',
    });

    chart.render();

    // @ts-ignore
    expect(chart.backgroundStyleRectShape).toBe(undefined);
    expect(chart.backgroundGroup.getChildren().filter((s) => s.get('type') === 'rect').length).toBe(0); // 没有 rect
  });
});
