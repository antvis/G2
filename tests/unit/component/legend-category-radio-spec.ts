import { Chart } from '../../../src/';
import { createDiv } from '../../util/dom';
import { COMPONENT_TYPE } from '../../../src/constant';
import { GroupComponent, GroupComponentCfg } from '../../../src/dependents';

function renderLegend(options = {}) {
  const CITY_SALE = [
    { city: '杭州', sale: 100 },
    { city: '广州', sale: 30 },
    { city: '上海', sale: 110 },
    { city: '呼和浩特', sale: 40 },
  ];
  const div = createDiv();
  const chart = new Chart({
    container: div,
    width: 400,
    height: 300,
    autoFit: false,
  });

  chart.data(CITY_SALE);
  chart.interval().position('city*scale').color('city');
  chart.legend(options);
  chart.render();

  const [legend] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
  return {
    chart,
    legend: legend.component as GroupComponent<GroupComponentCfg>,
  };
}

describe('Legend category radio', () => {
  test('默认 category legend 没有 radio', () => {
    const { legend } = renderLegend();
    expect(legend.getElementsByName('legend-item-radio').length).toBe(0);
  });

  test('选项 radio:{} 可以开启 radio', () => {
    const { legend } = renderLegend({ radio: {} });
    const radios = legend.getElementsByName('legend-item-radio');
    const [radio] = radios;
    expect(radios.length).toBe(4);
    expect(radio.attr('opacity')).toBe(0);
    expect(radio.attr('stroke')).toBe('#000000');
    expect(radio.attr('fill')).toBe('#ffffff');
  });

  test('选项 radio:styles 可以配置 radio 样式', () => {
    const { legend } = renderLegend({
      radio: {
        style: {
          stroke: 'red',
          fill: 'blue',
        }
      },
    });
    const [radio] = legend.getElementsByName('legend-item-radio');
    expect(radio.attr('opacity')).toBe(0);
    expect(radio.attr('stroke')).toBe('red');
    expect(radio.attr('fill')).toBe('blue');
  });

  test('默认 radio 的 opacity 是 0，鼠标移动上去 opacity 是 0.45，移出是 0', () => {
    const { legend, chart } = renderLegend({ radio: {} });
    const radios = legend.getElementsByName('legend-item-radio');
    const [radio] = radios;

    expect(radio.attr('opacity')).toBe(0);

    const target = legend.get('container').findById('-legend-item-杭州-name');

    chart.emit('legend-item:mouseenter', { x: 50, y: 330, target });
    expect(radio.attr('opacity')).toBe(0.45);

    chart.emit('legend-item:mouseleave', { x: 50, y: 330, target });
    expect(radio.attr('opacity')).toBe(0);
  });

  test('点击 radio，如果有多个 item 被选中，那么只选中对应 item，否者恢复默认状态', () => {
    const { legend, chart } = renderLegend({ radio: {} });
    const radios = legend.getElementsByName('legend-item-radio');
    const [radio] = radios;
    const getItems = (legend) =>
      legend.get('items').map((item) => ({
        value: item.value,
        unchecked: item.unchecked,
      }));

    expect(radio.attr('opacity')).toBe(0);

    const target = legend.get('container').findById('-legend-item-杭州-name');

    // 点击 legend-item 不生效
    chart.emit('legend-item:click', { x: 50, y: 330, target });
    expect(radio.attr('opacity')).toBe(0.45);
    expect(getItems(legend)).toEqual([
      { value: '杭州', unchecked: true },
      { value: '广州', unchecked: false },
      { value: '上海', unchecked: false },
      { value: '呼和浩特', unchecked: false },
    ]);

    chart.emit('legend-item-radio:click', { x: 50, y: 330, target });
    expect(radio.attr('opacity')).toBe(0.45);
    expect(getItems(legend)).toEqual([
      { value: '杭州', unchecked: false },
      { value: '广州', unchecked: true },
      { value: '上海', unchecked: true },
      { value: '呼和浩特', unchecked: true },
    ]);

    chart.emit('legend-item-radio:click', { x: 50, y: 330, target });
    expect(radio.attr('opacity')).toBe(0.45);
    expect(getItems(legend)).toEqual([
      { value: '杭州', unchecked: false },
      { value: '广州', unchecked: false },
      { value: '上海', unchecked: false },
      { value: '呼和浩特', unchecked: false },
    ]);

    const target2 = legend.get('container').findById('-legend-item-广州-name');
    chart.emit('legend-item-radio:click', { x: 50, y: 330, target });
    chart.emit('legend-item:click', { x: 50, y: 330, target: target2 });
    chart.emit('legend-item-radio:click', { x: 50, y: 330, target });
    expect(getItems(legend)).toEqual([
      { value: '杭州', unchecked: false },
      { value: '广州', unchecked: true },
      { value: '上海', unchecked: true },
      { value: '呼和浩特', unchecked: true },
    ]);
  });
});
