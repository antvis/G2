import { flatten } from 'lodash';
import { Chart } from '../../../../src';
import { createDiv } from '../../../util/dom';

describe('Pie GeometryLabel offset', () => {
  const div = createDiv();
  const data = [
    { type: 'item1', value: 5 },
    { type: 'item2', value: 5 },
    { type: 'item3', value: 5 },
    { type: 'item4', value: 5 },
  ];
  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 400,
  });
  chart.coordinate('theta', { radius: 0.8 });
  chart.data(data);
  const pie = chart.interval().position('value');
  const geometry = pie.color('type').adjust('stack').label('type');
  chart.render();

  // @ts-ignore
  const geometryLabel = geometry.geometryLabel;

  it('default label layout', () => {
    expect(geometryLabel.defaultLayout).toBe('distribute');
  });

  it('no offset declaration', () => {
    const labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems.length).toBe(data.length);
    expect(labelItems[0].offset).not.toBeLessThanOrEqual(0);
    // @ts-ignore
    expect(labelItems[0].labelLine).toEqual(geometryLabel.getDefaultLabelCfg().labelLine);
  });

  it('declare "offset" specific number', () => {
    geometry.label('type', { offset: -10 });
    let labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].offset).toBe(-10);

    geometry.label('type', { offset: 10 });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].offset).toBe(10);
  });

  it('declare "offset" percentage', () => {
    geometry.label('type', { offset: '-10%' });
    let labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].labelLine).toBeNull();
    expect(labelItems[0].offset).toBe(chart.getCoordinate().getRadius() * -0.1);

    geometry.label('type', { offset: '10%' });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].labelLine).not.toBeNull();
    expect(labelItems[0].offset).toBe(chart.getCoordinate().getRadius() * 0.1);
  });

  it('labelLine not to be shown, when offset <= 0', () => {
    geometry.label('type', { offset: '-10%' });
    let labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].labelLine).toBeNull();
    expect(labelItems[0].offset).toBe(chart.getCoordinate().getRadius() * -0.1);
    chart.render();
    expect(geometryLabel.labelsRenderer.shapesMap[labelItems[0].id].getChildren().length).toBe(1);

    geometry.label('type', { offset: 10 });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    chart.render();
    expect(geometryLabel.labelsRenderer.shapesMap[labelItems[0].id].getChildren().length).toBe(2);
  });

  it('declare "offset" percentage, with innerRadius', () => {
    chart.coordinate('polar', { radius: 0.9, innerRadius: 0.6 });
    geometry.label('type', { offset: '-50%' });
    chart.render();
    const coordinate = chart.getCoordinate();

    let labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].offset).not.toEqual(coordinate.getRadius() * -0.5);
    expect(labelItems[0].offset).toBeCloseTo(coordinate.getRadius() * (1 - 0.6) * -0.5);

    geometry.label('type', { offset: -10 });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].offset).toEqual(-10);

    geometry.label('type', { offset: 10 });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].offset).toEqual(10);

    geometry.label('type', { offset: '10%' });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].offset).not.toEqual(coordinate.getRadius() * 0.1);
    expect(labelItems[0].offset).toBeCloseTo((coordinate.getRadius() * (1 - 0.6) * 0.1));
  });

  afterAll(() => {
    chart.destroy();
  });
});

describe('Interval GeometryLabel offset', () => {
  const div = createDiv();
  const data = [
    { type: 'item1', value: 5 },
    { type: 'item2', value: 5 },
    { type: 'item3', value: 5 },
    { type: 'item4', value: 5 },
  ];
  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 400,
  });
  chart.data(data);
  const interval = chart.interval().position('type*value');
  const geometry = interval.label('type', { offset: -10 });
  chart.render();

  // @ts-ignore
  const geometryLabel = geometry.geometryLabel;

  it('offset < 0', () => {
    const labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].labelLine).toBeNull();
    expect(labelItems[0].offset).toBe(-10);
    chart.render();
    expect(geometryLabel.labelsRenderer.shapesMap[labelItems[0].id].getChildren().length).toBe(1);
  });

  it('declare "offset" percentage', () => {
    geometry.label('type', { offset: '-10%' });
    const labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].offset).toBe(0);
  });
});
