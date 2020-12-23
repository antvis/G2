import DataSet from '@antv/data-set';
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

const data = [
  { value: 1.2 },
  { value: 3.4 },
  { value: 3.7 },
  { value: 4.3 },
  { value: 5.2 },
  { value: 5.8 },
  { value: 6.1 },
  { value: 6.5 },
  { value: 6.8 },
  { value: 7.1 },
  { value: 7.3 },
  { value: 7.7 },
  { value: 8.3 },
  { value: 8.6 },
  { value: 8.8 },
  { value: 9.1 },
  { value: 9.2 },
  { value: 9.4 },
  { value: 9.5 },
  { value: 9.7 },
  { value: 10.5 },
  { value: 10.7 },
  { value: 10.8 },
  { value: 11.0 },
  { value: 11.0 },
  { value: 11.1 },
  { value: 11.2 },
  { value: 11.3 },
  { value: 11.4 },
  { value: 11.4 },
  { value: 11.7 },
  { value: 12.0 },
  { value: 12.9 },
  { value: 12.9 },
  { value: 13.3 },
  { value: 13.7 },
  { value: 13.8 },
  { value: 13.9 },
  { value: 14.0 },
  { value: 14.2 },
  { value: 14.5 },
  { value: 15 },
  { value: 15.2 },
  { value: 15.6 },
  { value: 16.0 },
  { value: 16.3 },
  { value: 17.3 },
  { value: 17.5 },
  { value: 17.9 },
  { value: 18.0 },
  { value: 18.0 },
  { value: 20.6 },
  { value: 21 },
  { value: 23.4 },
];

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'bin.histogram',
  field: 'value',
  binWidth: 4,
  as: ['value', 'count'],
});

describe('histogram label position', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 500,
    height: 400,
  });

  chart.data(dv.rows);
  chart.scale({
    count: {
      nice: true,
    },
  });
  chart.interval().position('value*count').label('count');

  chart.render();

  it('label position', () => {
    const elements = chart.geometries[0].elements;
    expect(elements).toHaveLength(dv.rows.length);
    elements.forEach((element) => {
      const shape = element.shape;
      const label = element.labelShape[0].getFirst();
      const shapeBBox = shape.getCanvasBBox();
      expect(label.attr('x')).toBe((shapeBBox.minX + shapeBBox.maxX) / 2);
    });
  });
});
