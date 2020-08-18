import { Chart } from '../../../../../src';
import Element from '../../../../../src/geometry/element';
import { BBox } from '../../../../../src/util/bbox';
import { isContrastColorWhite } from '../../../../../src/util/color';
import { removeDom } from '../../../../../src/util/dom';
import { subSalesByArea } from '../../../../data/sales';
import { delay } from '../../../../util/delay';
import { createDiv } from '../../../../util/dom';

describe('auto-color layout', async () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    width: 1300,
    height: 800,
  });

  it('auto color on interval', async () => {
    chart.data(subSalesByArea);
    chart.scale('sales', {
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .position('area*sales')
      .color('series')
      .adjust({
        type: 'dodge',
        marginRatio: 1 / 32,
      })
      .label('sales', {
        position: 'middle',
        layout: {
          type: 'adjust-color',
        },
      });

    chart.render();

    // 等 label 动画执行完
    await delay(300);

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

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
