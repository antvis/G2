import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { antvLight } from '../../../src/theme/style-sheet/light';
import { antvDark } from '../../../src/theme/style-sheet/dark';
import { GroupComponent, GroupComponentCfg } from '../../../src/dependents';
import { DIAMOND } from '../../util/data';
import { createDiv, removeDom } from '../../util/dom';

describe('Legend category navigation', () => {
  const div = createDiv();
  const legendId = '';

  const chart = new Chart({
    container: div,
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data(DIAMOND);

  chart.interval().position('cut*price').color('clarity').adjust({ type: 'dodge' });

  it('navigation horizontal', () => {
    chart.legend('clarity', {
      position: 'bottom',
      flipPage: true,
    });
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;
    const navigation = legend.getElementById(`${legendId}-legend-navigation-group`);
    const children = navigation ? navigation.getChildren() : [];

    expect(legends.length).toBe(1);
    expect(children).toHaveLength(3);

    // left arrow: /\
    expect(children[0].get('type')).toBe('path');
    expect(children[0].attr('matrix')).toBeNull();

    // text
    expect(children[1].get('type')).toBe('text');
    expect(children[1].attr('text')).toEqual('1/2');
  });

  it('navigation style', () => {
    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;
    const navigation = legend.getElementById(`${legendId}-legend-navigation-group`);
    const children = navigation ? navigation.getChildren() : [];

    expect(children[0].attr('fill')).toBe(antvLight.legendPageNavigatorMarkerInactiveFillColor);
    expect(children[0].attr('opacity')).toBe(antvLight.legendPageNavigatorMarkerInactiveFillOpacity);
    expect(children[0].attr('cursor')).toBe('not-allowed');
    expect(children[1].attr('fontSize')).toBe(antvLight.legendPageNavigatorTextFontSize);
    expect(children[2].attr('cursor')).toBe('pointer');
    expect(children[2].attr('fill')).toBe(antvLight.legendPageNavigatorMarkerFillColor);
    expect(children[2].attr('opacity')).toBe(antvLight.legendPageNavigatorMarkerFillOpacity);
  });

  it('change navigation style by theme', () => {
    chart.theme('dark');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;
    const navigation = legend.getElementById(`${legendId}-legend-navigation-group`);
    const children = navigation ? navigation.getChildren() : [];

    expect(children[0].attr('fill')).toBe(antvDark.legendPageNavigatorMarkerInactiveFillColor);
    expect(children[0].attr('opacity')).toBe(antvDark.legendPageNavigatorMarkerInactiveFillOpacity);
    expect(children[0].attr('cursor')).toBe('not-allowed');
    expect(children[1].attr('fontSize')).toBe(antvDark.legendPageNavigatorTextFontSize);
    expect(children[2].attr('cursor')).toBe('pointer');
    expect(children[2].attr('fill')).toBe(antvDark.legendPageNavigatorMarkerFillColor);
    expect(children[2].attr('opacity')).toBe(antvDark.legendPageNavigatorMarkerFillOpacity);
  });

  it('change navigation style by legend config', () => {
    chart.legend('clarity', {
      position: 'bottom',
      pageNavigator: {
        marker: {
          style: {
            inactiveFill: 'pink',
            inactiveOpacity: 0.3,
            fill: 'red',
            opacity: 0.8,
          },
        },
        text: {
          style: {
            fontSize: 8,
          },
        },
      },
    });
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;
    const navigation = legend.getElementById(`${legendId}-legend-navigation-group`);
    const children = navigation ? navigation.getChildren() : [];

    expect(children[0].attr('fill')).toBe('pink');
    expect(children[0].attr('opacity')).toBe(0.3);
    expect(children[1].attr('fontSize')).toBe(8);
    expect(children[2].attr('fill')).toBe('red');
    expect(children[2].attr('opacity')).toBe(0.8);
  });

  it('navigation off', () => {
    chart.legend('clarity', {
      position: 'bottom',
      flipPage: false,
    });
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;
    const navigation = legend.getElementById(`${legendId}-legend-navigation-group`);

    expect(navigation).toBeUndefined();
  });

  it('legend marker with callback', () => {
    chart.legend('clarity', {
      position: 'right',
      flipPage: true,
      marker: {
        symbol: 'square',
        style: { fill: 'red' },
      },
    });
    chart.render();

    let legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    let items = legends[0].component.get('items');
    expect(items[0].marker.symbol).toBe('square');
    expect(items[0].marker.style.fill).toBe('red');

    chart.legend('clarity', {
      position: 'right',
      flipPage: true,
      marker: (text, index, item) => {
        return {
          symbol: index === 0 ? 'triangle' : 'diamond',
          style: { fill: 'red', stroke: index === 1 ? 'red' : undefined },
        };
      },
    });
    chart.render();

    legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    items = legends[0].component.get('items');
    expect(items[0].marker.symbol).toBe('triangle');
    expect(items[1].marker.symbol).toBe('diamond');
    expect(items[0].marker.style.fill).toBe('red');
    expect(items[1].marker.style.stroke).toBe('red');

    chart.legend('clarity', {
      marker: {
        symbol: 'circle',
        style: { fill: 'lightgreen' },
      },
    });
    chart.render();

    legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    items = legends[0].component.get('items');
    expect(items[0].marker.symbol).toBe('circle');
    expect(items[1].marker.symbol).toBe('circle');
    expect(items[0].marker.style.fill).toBe('lightgreen');
  });

  it('custom legend items, and marker with callback', () => {
    chart.legend('clarity', {
      marker: (text, index, item) => {
        return {
          symbol: index === 0 ? 'square' : 'diamond',
          style: { fill: 'red', stroke: index === 0 ? 'red' : undefined },
        };
      },
      custom: true,
      items: [
        {
          name: '城市 1',
          value: 'city-1',
          marker: { symbol: 'triangle', style: { r: 4, fill: 'blue' } },
        },
        {
          name: '城市 2',
          value: 'city-2',
        },
      ],
    });
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const items = legends[0].component.get('items');
    expect(items[0].marker.symbol).toBe('triangle');
    // 继承默认的 symbol 设置
    expect(items[1].marker.symbol).toBe('diamond');
    expect(items[0].marker.style.fill).toBe('blue');
    // 继承默认的 symbol 设置
    expect(items[1].marker.style.stroke).toBeUndefined();
  });

  it('maxItemWidth, maxWidth, maxWidthRatio', () => {
    chart.legend('clarity', {
      position: 'right',
      custom: true,
      items: [
        {
          name: '城市-1-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市',
          value: 'city-1',
        },
      ],
    });
    chart.render();
    let legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    // 不会大于
    expect(legends[0].component.getLayoutBBox().width).not.toBeGreaterThan(
      chart.getTheme().components.legend.common.maxItemWidth
    );
    expect(legends[0].component.getLayoutBBox().width).toBe(400 * 0.25);

    chart.legend('clarity', {
      position: 'right',
      maxWidthRatio: 0.2,
      custom: true,
      items: [
        {
          name: '城市-1-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市',
          value: 'city-1',
        },
      ],
    });
    chart.render();
    legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.getLayoutBBox().width).toBe(400 * 0.2);

    chart.legend('clarity', {
      position: 'right',
      maxWidth: 90,
      custom: true,
      items: [
        {
          name: '城市-1-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市-城市',
          value: 'city-1',
        },
      ],
    });
    chart.render();
    legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.getLayoutBBox().width).toBe(90);
  });
});

describe('Legend Category Vertical', () => {
  const div = createDiv();
  const legendId = '';

  const chart = new Chart({
    container: div,
    width: 400,
    height: 400,
  });

  chart.data(DIAMOND);

  chart.interval().position('cut*price').color('clarity').adjust({ type: 'dodge' });

  it('navigation vertical', () => {
    chart.legend('clarity', {
      position: 'right',
      flipPage: true,
      maxHeight: 80,
      itemMarginBottom: 8,
    });
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;

    expect(legend.get('maxHeight')).toBe(80);
    expect(legend.get('y')).toBeGreaterThan(0);

    const navigation = legend.getElementById(`${legendId}-legend-navigation-group`);

    const children = navigation ? navigation.getChildren() : [];

    expect(legends.length).toBe(1);
    expect(children).toHaveLength(3);

    // text
    expect(children[1].get('type')).toBe('text');
    expect(children[1].attr('text')).toEqual('1/3');
  });
});

describe('Legend auto ellipsis', () => {
  const div = createDiv();
  const data = [
    { genre: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试1', sold: 100 },
    { genre: '测试测试2', sold: null },
    { genre: '测试测试3', sold: 45 },
    { genre: '测试测试4', sold: 100 },
    { genre: '测试测试5', sold: 100 },
    { genre: '测试测试6', sold: 100 },
    { genre: '测试测试7', sold: 100 },
    { genre: '测试测试8', sold: 100 },
    { genre: '测试测试9', sold: 100 },
    { genre: '测试测试10', sold: 100 },
    { genre: '测试测试11', sold: 100 },
    { genre: '测试测试12', sold: 100 },
    { genre: '测试测试13', sold: 100 },
  ];
  const chart = new Chart({
    container: div,
    width: 400,
    height: 300,
  });

  it('vertical ellipsis', () => {
    chart.data(data);
    chart.animate(false);
    chart.legend({
      layout: 'vertical',
      position: 'right-top',
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;
    expect(legend.get('maxItemWidth')).toBe(200);
    expect(
      legend.getElementById('-legend-item-测试测试测试测试测试测试测试测试测试测试测试测试测试测试1-name').attr('text')
    ).toBe('测试测试测试测试测试测试测试…');
  });

  it('itemWidth', () => {
    chart.legend({
      layout: 'horizontal',
      position: 'top',
      itemWidth: 60,
    });
    chart.render(true);

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    const legend = legends[0].component as GroupComponent<GroupComponentCfg>;
    expect(legend.get('maxItemWidth')).toBe(200);
    expect(legend.get('itemWidth')).toBe(60);
    expect(
      legend.getElementById('-legend-item-测试测试测试测试测试测试测试测试测试测试测试测试测试测试1-name').attr('text')
    ).toBe('测试…');

    expect(legend.getElementById('-legend-item-测试测试4').getBBox().width).toBeLessThan(60);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
