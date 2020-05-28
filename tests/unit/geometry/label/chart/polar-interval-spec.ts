import { flatten } from '@antv/util';

import { getCoordinate } from '@antv/coord';
import Interval from '../../../../../src/geometry/interval';
import PolarLabel from '../../../../../src/geometry/label/polar';
import { getTheme } from '../../../../../src/theme/';
import { createCanvas, createDiv } from '../../../../util/dom';
import { createScale } from '../../../../util/scale';

const Theme = getTheme('default');
const PolarCoord = getCoordinate('polar');

describe('Interval label in Polar coordinate', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 200,
    height: 200,
  });

  const coord = new PolarCoord({
    start: { x: 0, y: 100 },
    end: { x: 100, y: 0 },
  });

  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];
  const scaleDefs = {
    sales: {
      nice: true,
    },
  };

  const scales = {
    year: createScale('year', data, scaleDefs),
    sales: createScale('sales', data, scaleDefs),
  };

  const interval = new Interval({
    data,
    scales,
    container: canvas.addGroup(),
    labelsContainer: canvas.addGroup(),
    coordinate: coord,
    scaleDefs,
  });
  interval
    .position('year*sales')
    .label('sales', {
      labelEmit: true,
    });
  interval.init({
    theme: Theme,
  });
  interval.paint();

  // 生成映射数据
  // @ts-ignore
  const beforeMappingData = interval.beforeMappingData;
  // @ts-ignore
  const dataArray = interval.beforeMapping(beforeMappingData);

  let mappingArray = [];
  for (const eachGroup of dataArray) {
    // @ts-ignore
    const mappingData = interval.mapping(eachGroup);
    mappingArray.push(mappingData);
  }
  mappingArray = flatten(mappingArray);

  it('labels', () => {
    const gLabels = new PolarLabel(interval);
    const labelItems = gLabels.getLabelItems(mappingArray);

    expect(labelItems.length).toBe(data.length);
    expect(labelItems[0].textAlign).toBe('left');
    expect(labelItems[0].angle).toBeCloseTo(-1.5707963267948966);
    expect(labelItems[3].angle).toBeCloseTo(1.1219973762820692);
    expect(labelItems[5].angle).toBeCloseTo(2.9171931783333793);
  });
});
