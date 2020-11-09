import { flatten, get } from '@antv/util';
import { Coordinate, getCoordinate } from '@antv/coord';
import { Chart } from '../../../../src';
import Interval from '../../../../src/geometry/interval';
import IntervalLabel from '../../../../src/geometry/label/interval';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv } from '../../../util/dom';
import { createScale } from '../../../util/scale';
import { positiveNegativeData } from '../../../data/positive-negative';
import { Point } from '../../../../src/interface';
import { near } from '../../../util/math';

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
      range: [0.25, 0.75],
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
    interval.position('year*value').size(30).label('percent', {
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
    const [data1, data2] = mappingArray;

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
      expect(item1.textAlign).toBe('left');
      expect(item2.x).toBe(data2.x - 15);
      expect(item2.y).toBe((data2.y + coord.y.start) / 2);
      expect(item2.textAlign).toBe('left');
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
      expect(item1.textBaseline).toBe('bottom');
      expect(item2.x).toBe(data2.x);
      expect(item2.y).toBe(coord.y.start);
      expect(item2.textAlign).toBe('center');
      expect(item2.textBaseline).toBe('bottom');
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
    interval.position('country*value').color('year').adjust('stack').label('percent', {
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
    const [data1, data2] = mappingArray;
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
      expect(item1.textAlign).toBe('left');
      expect(item2.x).toBe(data2.x[0]);
      expect(item2.y).toBe(200);
      expect(item2.textAlign).toBe('left');
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
      expect(item1.textBaseline).toBe('bottom');
      expect(item2.x).toBe((data2.x[0] + data2.x[1]) / 2);
      expect(item2.y).toBe(250);
      expect(item2.textAlign).toBe('center');
      expect(item2.textBaseline).toBe('bottom');
    });
  });
});

describe('interval position', () => {
  const getIntervalSize = (coordinate: Coordinate, shapePoints: Point[]) => {
    const transposed = coordinate.isTransposed;
    const point0 = coordinate.convert(shapePoints[0]);
    const point2 = coordinate.convert(shapePoints[2]);
    const top = Math.min(point2.y, point0.y);
    const bottom = Math.max(point2.y, point0.y);
    const right = point2.x;
    const left = point0.x;

    return {
      top,
      bottom,
      right,
      left,
    };
  };

  it('position bottom', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(positiveNegativeData);
    chart.scale('value', {
      nice: true,
    });
    const interval = chart.interval().position('type*value').label('value', {
      position: 'bottom',
    });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(positiveNegativeData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { bottom } = getIntervalSize(chart.getCoordinate(), element.getModel().points as Point[]);
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe(dir > 0 ? 'bottom' : 'top');
      expect(near(labelTextShape.attr('y'), dir > 0 ? bottom - 12 : bottom + 12)).toBe(true);
    });
  });

  it('position middle', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(positiveNegativeData);
    chart.scale('value', {
      nice: true,
    });
    const interval = chart.interval().position('type*value').label('value', {
      position: 'middle',
    });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(positiveNegativeData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { top, bottom } = getIntervalSize(chart.getCoordinate(), element.getModel().points as Point[]);
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('y'), (top + bottom) / 2)).toBe(true);
    });
  });

  it('position top', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(positiveNegativeData);
    chart.scale('value', {
      nice: true,
    });
    const interval = chart.interval().position('type*value').label('value', {
      position: 'top',
    });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(positiveNegativeData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { top } = getIntervalSize(chart.getCoordinate(), element.getModel().points as Point[]);
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe(dir > 0 ? 'bottom' : 'top');
      expect(near(labelTextShape.attr('y'), top + -dir * 12)).toBe(true);
    });
  });

  it('transposed position left', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(positiveNegativeData);
    chart.coordinate().transpose();
    chart.scale('value', {
      nice: true,
    });
    const interval = chart.interval().position('type*value').label('value', {
      position: 'left',
    });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(positiveNegativeData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { left } = getIntervalSize(chart.getCoordinate(), element.getModel().points as Point[]);
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe(dir > 0 ? 'left' : 'right');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('x'), dir > 0 ? left + 12 : left - 12)).toBe(true);
    });
  });

  it('transposed position middle', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(positiveNegativeData);
    chart.coordinate().transpose();
    chart.scale('value', {
      nice: true,
    });
    const interval = chart.interval().position('type*value').label('value', {
      position: 'middle',
    });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(positiveNegativeData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { left, right } = getIntervalSize(chart.getCoordinate(), element.getModel().points as Point[]);
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('x'), (left + right) / 2)).toBe(true);
    });
  });

  it('transposed position right', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(positiveNegativeData);
    chart.coordinate().transpose();
    chart.scale('value', {
      nice: true,
    });
    const interval = chart.interval().position('type*value').label('value', {
      position: 'right',
    });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(positiveNegativeData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { right } = getIntervalSize(chart.getCoordinate(), element.getModel().points as Point[]);
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe(dir > 0 ? 'left' : 'right');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('x'), right + dir * 12)).toBe(true);
    });
  });
});

describe('funnel position', () => {
  const funnelData = [
    { action: '浏览网站', pv: 50000 },
    { action: '放入购物车', pv: 35000 },
    { action: '生成订单', pv: 25000 },
    { action: '支付订单', pv: 15000 },
    { action: '完成交易', pv: 8000 },
  ];
  const getIntervalSize = (coordinate: Coordinate, mappingData) => {
    const transposed = coordinate.isTransposed;
    let top;
    let right;
    let bottom;
    let left;
    const nextPoints = get(mappingData, 'nextPoints');
    const points = get(mappingData, 'points');
    const point0 = coordinate.convert(points[0]);
    const point2 = coordinate.convert(points[2]);
    if (nextPoints) {
      // 非漏斗图底部
      const p0 = coordinate.convert(points[0] as Point);
      const p1 = coordinate.convert(points[1] as Point);
      const nextP0 = coordinate.convert(nextPoints[0] as Point);
      const nextP1 = coordinate.convert(nextPoints[1] as Point);

      // TODO: 使用包围盒的计算方法
      if (transposed) {
        top = Math.min(nextP0.y, p0.y);
        bottom = Math.max(nextP0.y, p0.y);
        right = (p1.x + nextP1.x) / 2;
        left = (p0.x + nextP0.x) / 2;
      } else {
        top = Math.min((p1.y + nextP1.y) / 2, (p0.y + nextP0.y) / 2);
        bottom = Math.max((p1.y + nextP1.y) / 2, (p0.y + nextP0.y) / 2);
        right = nextP1.x;
        left = p0.x;
      }
    } else {
      top = Math.min(point2.y, point0.y);
      bottom = Math.max(point2.y, point0.y);
      right = point2.x;
      left = point0.x;
    }

    return {
      top,
      bottom,
      right,
      left,
    };
  };

  it('position bottom', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(funnelData);
    chart.axis(false);
    chart.coordinate('rect').scale(1, -1);
    chart.tooltip({
      showMarkers: false,
    });
    const interval = chart
      .interval()
      .adjust('symmetric')
      .position('action*pv')
      .shape('funnel')
      .color('action')
      .label('pv', {
        position: 'bottom',
      });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(funnelData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { bottom } = getIntervalSize(chart.getCoordinate(), element.getModel());
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe(dir > 0 ? 'bottom' : 'top');
      expect(near(labelTextShape.attr('y'), bottom + 12)).toBe(true);
    });
  });

  it('position middle', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(funnelData);
    chart.axis(false);
    chart.coordinate('rect').scale(1, -1);
    chart.tooltip({
      showMarkers: false,
    });
    const interval = chart
      .interval()
      .adjust('symmetric')
      .position('action*pv')
      .shape('funnel')
      .color('action')
      .label('pv', {
        position: 'middle',
      });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(funnelData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { top, bottom } = getIntervalSize(chart.getCoordinate(), element.getModel());
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('y'), (top + bottom) / 2)).toBe(true);
    });
  });

  it('position top', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(funnelData);
    chart.axis(false);
    chart.coordinate('rect').scale(1, -1);
    chart.tooltip({
      showMarkers: false,
    });
    const interval = chart
      .interval()
      .adjust('symmetric')
      .position('action*pv')
      .shape('funnel')
      .color('action')
      .label('pv', {
        position: 'top',
      });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(funnelData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { top } = getIntervalSize(chart.getCoordinate(), element.getModel());
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe(dir > 0 ? 'bottom' : 'top');
      expect(near(labelTextShape.attr('y'), top + 12)).toBe(true);
    });
  });

  it('transposed position left', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(funnelData);
    chart.axis(false);
    chart.coordinate('rect').transpose().scale(1, -1);
    chart.tooltip({
      showMarkers: false,
    });
    const interval = chart
      .interval()
      .adjust('symmetric')
      .position('action*pv')
      .shape('funnel')
      .color('action')
      .label('pv', {
        position: 'left',
      });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(funnelData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { left } = getIntervalSize(chart.getCoordinate(), element.getModel());
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe(dir > 0 ? 'left' : 'right');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('x'), dir > 0 ? left + 12 : left - 12)).toBe(true);
    });
  });

  it('transposed position middle', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(funnelData);
    chart.axis(false);
    chart.coordinate('rect').transpose().scale(1, -1);
    chart.tooltip({
      showMarkers: false,
    });
    const interval = chart
      .interval()
      .adjust('symmetric')
      .position('action*pv')
      .shape('funnel')
      .color('action')
      .label('pv', {
        position: 'middle',
      });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(funnelData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { left, right } = getIntervalSize(chart.getCoordinate(), element.getModel());
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe('center');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('x'), (left + right) / 2)).toBe(true);
    });
  });

  it('transposed position right', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });
    chart.data(funnelData);
    chart.axis(false);
    chart.coordinate('rect').transpose().scale(1, -1);
    chart.tooltip({
      showMarkers: false,
    });
    const interval = chart
      .interval()
      .adjust('symmetric')
      .position('action*pv')
      .shape('funnel')
      .color('action')
      .label('pv', {
        position: 'right',
      });

    chart.render();

    const { elements } = interval;

    expect(elements).toHaveLength(funnelData.length);

    elements.forEach((element) => {
      const dir = element.getData().value < 0 ? -1 : 1;
      const { right } = getIntervalSize(chart.getCoordinate(), element.getModel());
      const labelTextShape = element.labelShape[0]?.find((el) => el.get('type') === 'text');
      expect(labelTextShape.attr('textAlign')).toBe(dir > 0 ? 'left' : 'right');
      expect(labelTextShape.attr('textBaseline')).toBe('middle');
      expect(near(labelTextShape.attr('x'), right + dir * 12)).toBe(true);
    });
  });
});
