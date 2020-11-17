import { Chart } from '../../../../../src';
import Element from '../../../../../src/geometry/element';
import { BBox } from '../../../../../src/util/bbox';
import { isContrastColorWhite } from '../../../../../src/util/color';
import { removeDom } from '../../../../../src/util/dom';
import { subSalesByArea } from '../../../../data/sales';
import { delay } from '../../../../util/delay';
import { createDiv } from '../../../../util/dom';

describe('adjust-color layout', () => {
  const container = createDiv();

  it('adjust color on interval', async () => {
    const chart = new Chart({
      container,
      width: 1300,
      height: 800,
    });
    chart.data(subSalesByArea);
    chart.scale('sales', {
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .color('series')
      .adjust({
        type: 'dodge',
        marginRatio: 1 / 32,
      })
      .label('sales', {
        animate: false,
        position: 'middle',
        layout: {
          type: 'adjust-color',
        },
      });

    chart.render();

    const labelContainer = interval.labelsContainer;
    expect(labelContainer.getCount()).toBe(subSalesByArea.length);
    const textShapes = labelContainer.findAll((item) => item.get('type') === 'text');
    textShapes.forEach((textShape) => {
      const element: Element = textShape.get('element');
      const shape = element.shape;
      const shapeBBox = BBox.fromObject(shape.getCanvasBBox());
      const textBBox = BBox.fromObject(textShape.getCanvasBBox());
      if (shapeBBox.contains(textBBox)) {
        const bgColor = shape.attr('fill');
        const fillWhite = isContrastColorWhite(bgColor);
        if (fillWhite) {
          expect(textShape.attr('fill')).toBe('#ffffff');
        } else {
          expect(textShape.attr('fill')).toBe('#2c3542');
        }
      }
    });
  });

  it('adjust-color overflow shape', () => {
    const DATA = [
      {
        name: '人群定向召回',
        count: 200000000,
      },
      {
        name: '创意召回',
        count: 99000000,
      },
      {
        name: '展位疲劳度展位疲劳度展位疲劳度',
        count: 70000000,
      },
      {
        name: '计划疲劳度',
        count: 65700000,
      },
      {
        name: '召回完成',
        count: 8880000,
      },
    ];
    const chart = new Chart({
      container,
      height: 400,
      width: 600,
      padding: [20, 20, 20, 60],
      appendPadding: 10,
      // theme: 'dark',
    });
    chart.data(DATA);
    chart.scale('count', {
      formatter: (v) => `${(v / 10000).toFixed(2)}万`,
    });
    chart.coordinate().transpose();
    const interval = chart
      .interval()
      .animate(false)
      .position('name*count')
      .label('count', {
        position: 'left',
        layout: [{ type: 'adjust-color' }],
      });
    chart.axis('name', {
      label: {
        autoEllipsis: true,
      },
    });
    chart.render();

    const labelContainer = interval.labelsContainer;
    expect(labelContainer.getCount()).toBe(DATA.length);
    const textShapes = labelContainer.findAll((item) => item.get('type') === 'text');

    textShapes.forEach((textShape) => {
      const element: Element = textShape.get('element');
      const shape = element.shape;
      const shapeBBox = BBox.fromObject(shape.getCanvasBBox());
      const textBBox = BBox.fromObject(textShape.getCanvasBBox());
      if (shapeBBox.contains(textBBox)) {
        const bgColor = shape.attr('fill');
        const fillWhite = isContrastColorWhite(bgColor);
        if (fillWhite) {
          expect(textShape.attr('fill')).toBe('#ffffff');
        } else {
          expect(textShape.attr('fill')).toBe('#2c3542');
        }
      } else {
        expect(textShape.attr('fill')).toBe('#595959');
        expect(textShape.attr('stroke')).toBe('#FFFFFF');
        expect(textShape.attr('lineWidth')).toBe(1);
      }
    });
  });

  it('adjust-color overflow shape /w dark theme', () => {
    const DATA = [
      {
        name: '人群定向召回',
        count: 200000000,
      },
      {
        name: '创意召回',
        count: 99000000,
      },
      {
        name: '展位疲劳度展位疲劳度展位疲劳度',
        count: 70000000,
      },
      {
        name: '计划疲劳度',
        count: 65700000,
      },
      {
        name: '召回完成',
        count: 8880000,
      },
    ];
    const chart = new Chart({
      container,
      height: 400,
      width: 600,
      padding: [20, 20, 20, 60],
      appendPadding: 10,
      theme: 'dark',
    });
    chart.data(DATA);
    chart.scale('count', {
      formatter: (v) => `${(v / 10000).toFixed(2)}万`,
    });
    chart.coordinate().transpose();
    const interval = chart
      .interval()
      .animate(false)
      .position('name*count')
      .label('count', {
        position: 'left',
        layout: [{ type: 'adjust-color' }],
      });
    chart.axis('name', {
      label: {
        autoEllipsis: true,
      },
    });
    chart.render();

    const labelContainer = interval.labelsContainer;
    expect(labelContainer.getCount()).toBe(DATA.length);
    const textShapes = labelContainer.findAll((item) => item.get('type') === 'text');

    textShapes.forEach((textShape) => {
      const element: Element = textShape.get('element');
      const shape = element.shape;
      const shapeBBox = BBox.fromObject(shape.getCanvasBBox());
      const textBBox = BBox.fromObject(textShape.getCanvasBBox());
      if (shapeBBox.contains(textBBox)) {
        const bgColor = shape.attr('fill');
        const fillWhite = isContrastColorWhite(bgColor);
        if (fillWhite) {
          expect(textShape.attr('fill')).toBe('#ffffff');
        } else {
          expect(textShape.attr('fill')).toBe('#2c3542');
        }
      } else {
        expect(textShape.attr('fill')).toBe('#A6A6A6');
        expect(textShape.attr('stroke')).toBe('#000');
        expect(textShape.attr('lineWidth')).toBe(1);
      }
    });
  });

  afterAll(() => {
    removeDom(container);
  });
});
