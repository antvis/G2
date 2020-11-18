import { Chart, getTheme } from '../../../src/';
import { createDiv } from '../../util/dom';

describe('Dark theme', () => {
  const data = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ];

  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
    theme: 'dark',
  });

  chart.data(data);
  chart.scale('月均降雨量', {
    nice: true,
  });
  chart.tooltip({
    showMarkers: false,
    shared: true,
  });

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

  it('dark work', () => {
    const theme = chart.getTheme();
    expect(theme).toEqual(getTheme('dark'));
  });

  it('chart.theme 设置主题色', () => {
    chart.theme({ styleSheet: { paletteQualitative10: ['red'], backgroundColor: 'yellow' } });
    let theme = chart.getTheme();
    expect(theme.background).toBe('yellow');
    expect(theme.defaultColor).toBe('red');

    chart.theme({ styleSheet: { paletteQualitative10: ['red'], brandColor: 'blue' } });
    theme = chart.getTheme();
    expect(theme.defaultColor).toBe('blue');

    chart.theme({ styleSheet: { brandColor: 'blue' }, defaultColor: 'green' });
    theme = chart.getTheme();
    expect(theme.defaultColor).toBe('green');
  });

  afterAll(() => {
    chart.destroy();
  });
});
