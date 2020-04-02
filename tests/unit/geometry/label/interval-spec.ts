import { flatten } from '@antv/util';

import { getCoordinate } from '@antv/coord';
import Interval from '../../../../src/geometry/interval';
import IntervalLabel from '../../../../src/geometry/label/interval';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv } from '../../../util/dom';
import { createScale } from '../../../util/scale';

const Theme = getTheme('default');
const CartesianCoordinate = getCoordinate('rect');

describe('interval labels', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 1000,
    height: 300,
  });

  const coord = new CartesianCoordinate({
    start: { x: 0, y: 200 },
    end: { x: 200, y: 0 },
  });

  const transposedCoord = new CartesianCoordinate({
    start: { x: 50, y: 250 },
    end: { x: 250, y: 50 },
  });
  transposedCoord.transpose();

  const data = [
    { country: 'A', year: '1750', value: 502, percent: 0.5169927909371782 },
    { country: 'A', year: '1800', value: 635, percent: 0.5545851528384279 },
  ];
  const scaleDefs = {
    year: {
      range: [ 0.25, 0.75 ],
    },
    country: {
      range: [0.25, 0.75],
    },
    percent: {
      formatter: (val) => val.toFixed(4) * 100 + '%',
    },
    value: {
      nice: true,
    },
  };

  const scales = {
    year: createScale('year', data, scaleDefs),
    value: createScale('value', data, scaleDefs),
    percent: createScale('percent', data, scaleDefs),
    country: createScale('country', data, scaleDefs),
  };

  describe('cartesion', () => {
    const interval = new Interval({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: coord,
      scaleDefs,
    });
    interval
      .position('year*value')
      .size(30)
      .label('percent', {
        position: 'middle',
        offset: 0,
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

    const gLabels = new IntervalLabel(interval);
    const [ data1, data2 ] = mappingArray;

    it('single label position middle', () => {
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe(data1.x);
      expect(item1.y).toBe((data1.y + coord.y.start) / 2);
      expect(item1.textAlign).toBe('center');
      expect(item2.x).toBe(data2.x);
      expect(item2.y).toBe((data2.y + coord.y.start) / 2);
      expect(item2.textAlign).toBe('center');
    });

    it('single label position left', () => {
      interval.label('percent', {
        position: 'left',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe(data1.x - 15);
      expect(item1.y).toBe((data1.y + coord.y.start) / 2);
      expect(item1.textAlign).toBe('right');
      expect(item2.x).toBe(data2.x - 15);
      expect(item2.y).toBe((data2.y + coord.y.start) / 2);
      expect(item2.textAlign).toBe('right');
    });

    it('single label position right', () => {
      interval.label('percent', {
        position: 'right',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe(data1.x + 15);
      expect(item1.y).toBe((data1.y + coord.y.start) / 2);
      expect(item1.textAlign).toBe('left');
      expect(item2.x).toBe(data2.x + 15);
      expect(item2.y).toBe((data2.y + coord.y.start) / 2);
      expect(item2.textAlign).toBe('left');
    });

    it('single label position top', () => {
      interval.label('percent', {
        position: 'top',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe(data1.x);
      expect(item1.y).toBe(data1.y);
      expect(item1.textAlign).toBe('center');
      expect(item1.textBaseline).toBe('bottom');
      expect(item2.x).toBe(data2.x);
      expect(item2.y).toBe(data2.y);
      expect(item2.textAlign).toBe('center');
      expect(item2.textBaseline).toBe('bottom');
    });

    it('single label position bottom', () => {
      interval.label('percent', {
        position: 'bottom',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe(data1.x);
      expect(item1.y).toBe(coord.y.start);
      expect(item1.textAlign).toBe('center');
      expect(item1.textBaseline).toBe('top');
      expect(item2.x).toBe(data2.x);
      expect(item2.y).toBe(coord.y.start);
      expect(item2.textAlign).toBe('center');
      expect(item2.textBaseline).toBe('top');
    });
  });

  describe('transposed coordinate', () => {
    const interval = new Interval({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: transposedCoord,
      scaleDefs,
    });
    interval
      .position('country*value')
      .color('year')
      .adjust('stack')
      .label('percent', {
        position: 'middle',
        offset: 0,
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

    const gLabels = new IntervalLabel(interval);
    const [ data1, data2 ] = mappingArray;
    it('single label position middle', () => {
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe((data1.x[0] + data1.x[1]) / 2);
      expect(item1.y).toBe(200);
      expect(item1.textAlign).toBe('center');
      expect(item2.x).toBe((data2.x[0] + data2.x[1]) / 2);
      expect(item2.y).toBe(200);
      expect(item2.textAlign).toBe('center');
    });

    it('single label position left', () => {
      interval.label('percent', {
        position: 'left',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe(data1.x[0]);
      expect(item1.y).toBe(200);
      expect(item1.textAlign).toBe('right');
      expect(item2.x).toBe(data2.x[0]);
      expect(item2.y).toBe(200);
      expect(item2.textAlign).toBe('right');
    });

    it('single label position right', () => {
      interval.label('percent', {
        position: 'right',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe(data1.x[1]);
      expect(item1.y).toBe(200);
      expect(item1.textAlign).toBe('left');
      expect(item2.x).toBe(data2.x[1]);
      expect(item2.y).toBe(200);
      expect(item2.textAlign).toBe('left');
    });

    it('single label position top', () => {
      interval.label('percent', {
        position: 'top',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe((data1.x[0] + data1.x[1]) / 2);
      expect(item1.y).toBe(150);
      expect(item1.textAlign).toBe('center');
      expect(item1.textBaseline).toBe('bottom');
      expect(item2.x).toBe((data2.x[0] + data2.x[1]) / 2);
      expect(item2.y).toBe(150);
      expect(item2.textAlign).toBe('center');
      expect(item2.textBaseline).toBe('bottom');
    });

    it('single label position bottom', () => {
      interval.label('percent', {
        position: 'bottom',
        offset: 0,
      });
      const [item1, item2] = gLabels.getLabelItems(mappingArray);
      expect(item1.x).toBe((data1.x[0] + data1.x[1]) / 2);
      expect(item1.y).toBe(250);
      expect(item1.textAlign).toBe('center');
      expect(item1.textBaseline).toBe('top');
      expect(item2.x).toBe((data2.x[0] + data2.x[1]) / 2);
      expect(item2.y).toBe(250);
      expect(item2.textAlign).toBe('center');
      expect(item2.textBaseline).toBe('top');
    });
  });
});
