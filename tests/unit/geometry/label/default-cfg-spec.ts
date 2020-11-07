import { flatten } from 'lodash';
import { getTheme } from '../../../../src/theme/';
import { Chart } from '../../../../src';
import { createDiv } from '../../../util/dom';

const Theme = getTheme('default');

describe('GeometryLabel default ThemeCfg', () => {
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

  it('default use `theme.labels`, when offset >= 0', () => {
    let labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].style).toMatchObject(Theme.labels.style);

    geometry.label('type', { offset: 0 });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].style).toMatchObject(Theme.labels.style);
  });

  it('default use `theme.innerLabels`, when offset < 0', () => {
    geometry.label('type', { offset: '-10%' });
    let labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].labelLine).toBeNull();
    expect(labelItems[0].style).toMatchObject(Theme.innerLabels.style);

    geometry.label('type', { offset: '10%' });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].style).toMatchObject(Theme.labels.style);

    geometry.label('type', { offset: -40 });
    labelItems = geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(labelItems[0].style).toMatchObject(Theme.innerLabels.style);
  });

  afterAll(() => {
    chart.destroy();
  });
});
