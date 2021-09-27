import { Chart, registerInteraction } from '../../../../src/index';
import { isPointInCoordinate } from '../../../../src/util/coordinate';
import { createDiv } from '../../../util/dom';
import { delay } from '../../../util/delay';

describe('facet active region', () => {
  const dom = createDiv();
  const chart = new Chart({
    container: dom,
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data([
    { country: '乌拉圭', type: '2016 年转基因种植面积', value: 1.3 },
    { country: '乌拉圭', type: '2016 年耕地总面积', value: 1.8 },
    { country: '巴拉圭', type: '2016 年转基因种植面积', value: 3.6 },
    { country: '巴拉圭', type: '2016 年耕地总面积', value: 5.5 },
    { country: '南非', type: '2016 年转基因种植面积', value: 3.7 },
    { country: '南非', type: '2016 年耕地总面积', value: 12.1 },
    { country: '巴基斯坦', type: '2016 年转基因种植面积', value: 2.9 },
    { country: '巴基斯坦', type: '2016 年耕地总面积', value: 22.0 },
    { country: '阿根廷', type: '2016 年转基因种植面积', value: 23.8 },
    { country: '阿根廷', type: '2016 年耕地总面积', value: 38.6 },
    { country: '加拿大', type: '2016 年转基因种植面积', value: 11.6 },
    { country: '加拿大', type: '2016 年耕地总面积', value: 46.9 },
    { country: '巴西', type: '2016 年转基因种植面积', value: 49.1 },
    { country: '巴西', type: '2016 年耕地总面积', value: 73.2 },
    { country: '中国', type: '2016 年转基因种植面积', value: 2.8 },
    { country: '中国', type: '2016 年耕地总面积', value: 108.4 },
    { country: '美国', type: '2016 年转基因种植面积', value: 72.9 },
    { country: '美国', type: '2016 年耕地总面积', value: 165.2 },
    { country: '印度', type: '2016 年转基因种植面积', value: 49.1 },
    { country: '印度', type: '2016 年耕地总面积', value: 175.4 },
  ]);

  chart.scale('value', {
    alias: '销售额（万）',
  });

  chart.axis('value', false);
  chart.coordinate().transpose();
  chart.tooltip({
    showMarkers: false,
    shared: true,
  });
  chart.interaction('facet-active-region');
  chart.facet('mirror', {
    fields: ['type'],
    transpose: true,
    showTitle: false,
    eachView: (view, facet) => {
      const facetIndex = facet.columnIndex;
      if (facetIndex === 0) {
        view.axis('country', {
          position: 'top',
          tickLine: {
            alignTick: false,
            length: 0,
          },
          line: null,
        });
      } else view.axis('country', false);
      view.interval().position('country*value').color(['#1890ff', '#2fc25b'][facetIndex]).size(30);
    },
  });
  chart.render();

  let regionShapes = null;

  it('show', () => {
    const point = chart.views[0].getXY({ country: '乌拉圭', type: '2016 年转基因种植面积', value: 1.3 });
    chart.emit('plot:mousemove', point);
    regionShapes = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'facet-active-region';
    });
    expect(regionShapes.length).toBe(2);
    const [leftRegionShape, rightRegionShape] = regionShapes;
    const [[, xl1, yl1], [, xl2, yl2], [, xl3, yl3], [, xl4, yl4]] = leftRegionShape.attr('path');
    const [[, xr1, yr1], [, xr2, yr2], [, xr3, yr3], [, xr4, yr4]] = rightRegionShape.attr('path');
    expect(yl1).toEqual(yr1);
    expect(yl2).toEqual(yr2);
    expect(yl3).toEqual(yr3);
    expect(yl4).toEqual(yr4);
    const distance = xr1 - xl1;
    expect(xl2).toBeCloseTo(xr2 - distance);
    expect(xl3).toBeCloseTo(xr3 - distance);
    expect(xl4).toBeCloseTo(xr4 - distance);
  });

  it('hide', () => {
    chart.emit('plot:mouseleave', {});
    const [leftRegionShape, rightRegionShape] = regionShapes;
    expect(leftRegionShape.get('visible')).toBe(false);
    expect(rightRegionShape.get('visible')).toBe(false);
  });

  it('facet-active-region style', () => {
    const point = chart.views[0].getXY({ country: '乌拉圭', type: '2016 年转基因种植面积', value: 1.3 });
    chart.emit('plot:mousemove', point);
    const [leftRegionShape, rightRegionShape] = regionShapes;

    expect(leftRegionShape.attr('fill')).toBe('#CCD6EC');
    expect(rightRegionShape.attr('fill')).toBe('#CCD6EC');

    chart.emit('plot:mouseleave', {});
    registerInteraction('facet-active-region', {
      start: [{ trigger: 'plot:mousemove', action: 'facet-active-region:show', arg: { style: { fill: 'red' } } }],
      end: [{ trigger: 'plot:mouseleave', action: 'facet-active-region:hide' }],
    });
    chart.interaction('facet-active-region');
    chart.emit('plot:mousemove', point);
    const [leftRegionShape2, rightRegionShape2] = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'facet-active-region';
    });
    // visible is false
    expect(leftRegionShape2.get('visible')).toBe(true);
    expect(leftRegionShape2.attr('fill')).toBe('red');
    expect(rightRegionShape2.get('visible')).toBe(true);
    expect(rightRegionShape2.attr('fill')).toBe('red');

    chart.removeInteraction('facet-active-region');

    // register interaction
    registerInteraction('custom', {
      start: [{ trigger: 'plot:mousemove', action: ['tooltip:show', 'facet-active-region:show'] }],
      end: [{ trigger: 'plot:mouseleave', action: 'facet-active-region:hide' }],
    });
    chart.interaction('custom', {
      start: [
        {
          trigger: 'plot:mousemove',
          action: ['tooltip:show', 'facet-active-region:show'],
          arg: [null, { style: { fill: 'green' } }],
        },
      ],
    });
    chart.emit('plot:mousemove', point);
    const [leftRegionShape3, rightRegionShape3] = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'facet-active-region';
    });
    // tooltip controller is visible
    // @ts-ignore
    expect(chart.getController('tooltip').isVisible()).toBe(true);
    // leftRegionShape3 is green
    expect(leftRegionShape3.attr('fill')).toBe('green');
    expect(rightRegionShape3.attr('fill')).toBe('green');
    chart.emit('plot:mouseleave', {});
    chart.removeInteraction('custom');

    chart.interaction('facet-active-region', {
      start: [
        {
          trigger: 'plot:mousemove',
          action: 'facet-active-region:show',
          arg: { style: { fill: 'orange' } },
        },
      ],
    });
    chart.emit('plot:mousemove', point);
    const [leftRegionShape4, rightRegionShape4] = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'facet-active-region';
    });
    // leftRegionShape4 is orange
    expect(leftRegionShape4.attr('fill')).toBe('orange');
    expect(rightRegionShape4.attr('fill')).toBe('orange');
    chart.emit('plot:mouseleave', {});
  });

  it('change trigger', () => {
    chart.coordinate('rect');
    chart.render();

    const point = chart.views[0].getXY({ country: '乌拉圭', type: '2016 年转基因种植面积', value: 1.3 });
    chart.interaction('facet-active-region', {
      start: [
        {
          trigger: 'click',
          action: 'facet-active-region:show',
          isEnable(context) {
            const view = context.view;
            const event = context.event;
            const coordinate = view.getCoordinate();
            return isPointInCoordinate(coordinate, { x: event.x, y: event.y });
          },
        },
      ],
      end: [
        {
          trigger: 'click',
          action: 'facet-active-region:hide',
          isEnable(context) {
            const view = context.view;
            const event = context.event;
            const coordinate = view.getCoordinate();
            return !isPointInCoordinate(coordinate, { x: event.x, y: event.y });
          },
        },
      ],
    });

    let [leftRegionShape, rightRegionShape] = regionShapes;
    // regionShape is destroyed
    expect(leftRegionShape.destroyed).toBe(true);
    expect(rightRegionShape.destroyed).toBe(true);

    chart.emit('plot:mousemove', point);
    regionShapes = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'facet-active-region';
    });
    expect(regionShapes.length).toBe(0);
    chart.emit('click', point);
    regionShapes = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'facet-active-region';
    });
    expect(regionShapes.length).toBe(2);
    [leftRegionShape, rightRegionShape] = regionShapes;
    // regionShape is visible
    expect(leftRegionShape.get('visible')).toBe(true);
    expect(rightRegionShape.get('visible')).toBe(true);
    const { x, y } = point;
    chart.emit('click', { x: x + 1000, y });
    expect(leftRegionShape.get('visible')).toBe(false);
    expect(rightRegionShape.get('visible')).toBe(false);
  });

  it('remove interaction', async () => {
    expect(chart.interactions['facet-active-region']).not.toBe(undefined);
    chart.removeInteraction('facet-active-region');
    expect(chart.interactions['facet-active-region']).toBe(undefined);
    const [leftRegionShape, rightRegionShape] = regionShapes;
    expect(leftRegionShape.destroyed).toBe(true);
    expect(rightRegionShape.destroyed).toBe(true);
  });

  afterAll(() => {
    chart.destroy();
  });
});
