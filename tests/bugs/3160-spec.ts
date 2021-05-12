import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('#3160', () => {
  const div = createDiv();
  const chart = new Chart({
    container: div, // 指定图表容器 ID
    height: 300, // 指定图表高度
    autoFit: true,
  });
  chart.coordinate('theta');

  const data = [
    { type: '1', item: 1, value: 0.1 },
    { type: '2', item: 4, value: 0.4 },
    { type: '1.3', item: 2, value: 0.2 },
    { type: '2.5', item: 3, value: 0.3 },
  ];
  chart.data(data);

  chart
    .interval()
    .position('value')
    .color('type')
    .label('type', { layout: { type: 'pie-spider' } })
    .adjust('stack');

  chart.render();

  it('mapping color to linear scale, label render normal', () => {
    const labels = chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(4);
  });

  it('spider label, render normal', () => {
    chart.clear();
    chart
      .interval()
      .position('value')
      .color('type')
      .label('type', { layout: { type: 'pie-spider' } })
      .adjust('stack');
    chart.render();

    const labels = chart.geometries[0].labelsContainer.getChildren();

    const label1 = labels.find((l) => l.get('id') === `1-${data[0].type}`);
    const label2 = labels.find((l) => l.get('id') === `1-${data[1].type}`);
    const label3 = labels.find((l) => l.get('id') === `1-${data[2].type}`);
    const label4 = labels.find((l) => l.get('id') === `1-${data[3].type}`);

    // @ts-ignore
    expect(label1.getChildren()[0].getCanvasBBox().minX).toEqual(label2.getChildren()[0].getCanvasBBox().minX);
    // @ts-ignore
    expect(label3.getChildren()[0].getCanvasBBox().maxX).toEqual(label4.getChildren()[0].getCanvasBBox().maxX);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
