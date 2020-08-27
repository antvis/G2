import { Chart } from '../../../../../../src';
import { BBox } from '../../../../../../src/util/bbox';
import { removeDom } from '../../../../../../src/util/dom';
import { salesByArea, subSalesByArea } from '../../../../../data/sales';
import { createDiv } from '../../../../../util/dom';
import { near } from '../../../../../util/math';

describe('adjust-position layout', () => {
  const container = createDiv();

  it('adjust position on interval /w inShape', async () => {
    const chart = new Chart({
      container,
      width: 1300,
      height: 800,
    });
    chart.data(salesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(salesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeTruthy();
    });
  });

  it('adjust position on interval /w outShape', async () => {
    const chart = new Chart({
      container,
      width: 400,
      height: 300,
    });
    chart.data(salesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(salesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeFalsy();
    });
  });

  it('adjust position on transposed interval /w inShape', async () => {
    const chart = new Chart({
      container,
      width: 1300,
      height: 800,
    });
    chart.data(salesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.coordinate().transpose();
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(salesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeTruthy();
    });
  });

  it('adjust position on transposed interval /w outShape', async () => {
    const chart = new Chart({
      container,
      width: 300,
      height: 160,
    });
    chart.data(salesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.coordinate().transpose();
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(salesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeFalsy();
    });
  });

  // changeSize 后 shape 上拿不到 element 待修复
  it.skip('adjust position update on changeSize', async () => {
    const chart = new Chart({
      container,
      width: 300,
      height: 160,
    });
    chart.data(salesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.coordinate().transpose();
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    let elements = interval.elements;
    expect(elements).toHaveLength(salesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeFalsy();
    });

    chart.changeSize(600, 500);

    elements = interval.elements;
    expect(elements).toHaveLength(salesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeTruthy();
    });
  });

  it('adjust position on dodged interval /w inShape', async () => {
    const chart = new Chart({
      container,
      width: 1300,
      height: 800,
    });
    chart.data(subSalesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .adjust('dodge')
      .color('series')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(subSalesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeTruthy();
    });
  });

  it('adjust position on dodged interval /w outShape', async () => {
    const chart = new Chart({
      container,
      width: 800,
      height: 600,
    });
    chart.data(subSalesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .adjust('dodge')
      .color('series')
      .label('sales', {
        animate: false,
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(subSalesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeFalsy();
    });
  });

  it('adjust position on stacked interval /w inShape', async () => {
    const chart = new Chart({
      container,
      width: 1400,
      height: 2000,
    });
    chart.data(subSalesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .adjust('stack')
      .color('series')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(subSalesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const labelTextBBox = BBox.fromObject(labelTextShape.getCanvasBBox());
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(intervalBBox.contains(labelTextBBox)).toBeTruthy();
    });
  });

  it('adjust position on stacked interval /w inShape overflow', async () => {
    const chart = new Chart({
      container,
      width: 300,
      height: 400,
    });
    chart.data(subSalesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .adjust('stack')
      .color('series')
      .label('sales', {
        layout: [
          {
            type: 'interval-adjust-position',
          },
        ],
      });

    chart.render();

    const elements = interval.elements;
    expect(elements).toHaveLength(subSalesByArea.length);
    elements.forEach((element) => {
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      const intervalShape = element.shape;
      const intervalBBox = BBox.fromObject(intervalShape.getCanvasBBox());
      expect(near(labelTextShape.attr('y'), intervalBBox.y + intervalBBox.height / 2)).toBe(true);
    });
  });

  afterAll(() => {
    removeDom(container);
  });
});
