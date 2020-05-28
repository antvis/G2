import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import { Chart, getEngine } from '../../../../src/';
import Interval from '../../../../src/geometry/interval';
import Path from '../../../../src/geometry/path';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';
import { createScale, updateScales } from '../../../util/scale';

const PolarCoordinate = getCoordinate('polar');
const RectCoordinate = getCoordinate('rect');
const IdentityScale = getScale('identity');
const G = getEngine('canvas');
const Theme = getTheme('default');

describe('LabelsRenderer', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });
  // 构造 theta 坐标系
  const thetaCoord = new PolarCoordinate({
    start: {
      x: 0,
      y: 180,
    },
    end: {
      x: 180,
      y: 0,
    },
    radius: 0.5,
  });
  thetaCoord.transpose();
  // @ts-ignore
  thetaCoord.type = 'theta';

  const rectCoord = new RectCoordinate({
    start: {
      x: 0,
      y: 180,
    },
    end: {
      x: 180,
      y: 0,
    },
  });

  describe('normal', () => {
    const identityScale = new IdentityScale({
      field: '1',
      values: [1],
      range: [0.5, 1],
    });
    const data = [
      { a: '1', percent: 0.2 },
      { a: '2', percent: 0.5 },
      { a: '3', percent: 0.3 },
    ];
    const interval = new Interval({
      data,
      coordinate: thetaCoord,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      scales: {
        1: identityScale,
        percent: createScale('percent', data),
        a: createScale('a', data),
      },
    });
    interval
      .position('1*percent')
      .color('a')
      .label('percent', {
        animate: false,
      })
      .adjust('stack');

    interval.init({
      theme: Theme,
    });
    interval.paint();

    it('render', () => {
      expect(interval.labelsContainer.getCount()).toBe(3);
      // @ts-ignore
      const labelsRenderer = interval.geometryLabel.labelsRenderer;
      expect(labelsRenderer.container.getCount()).toBe(3);
      // @ts-ignore
      expect(labelsRenderer.container.getFirst().getCount()).toBe(2);
      expect(labelsRenderer.container.getFirst().get('animateCfg')).toBe(false);
      expect(labelsRenderer.container.getFirst().get('coordinate')).toEqual(interval.coordinate);
    });

    it('update', () => {
      const newData = [
        { a: '1', percent: 0.5 },
        { a: '2', percent: 0.5 },
      ];
      const newScales = {
        a: createScale('a', newData),
        percent: createScale('percent', newData),
      };
      // 保持引用，同步 scales
      updateScales(interval.scales, newScales);
      interval
        .label('percent', {
          animate: {
            update: false,
          },
        })
        .update({
          data: newData,
        });
      interval.paint();

      // @ts-ignore
      const labelsRenderer = interval.geometryLabel.labelsRenderer;
      expect(labelsRenderer.container.getCount()).toBe(2);
      expect(labelsRenderer.container.find(ele => ele.get('type') === 'text').get('data')).toEqual({ a: '1', percent: 0.5 });
      expect(labelsRenderer.container.find(ele => ele.get('type') === 'text').get('animateCfg').update).toBe(false);

      interval.animate(false).update();
      interval.paint();
      // @ts-ignore
      expect(labelsRenderer.container.getFirst().get('animateCfg')).toBe(false);
    });

    it('clear', () => {
      // @ts-ignore
      const labelsRenderer = interval.geometryLabel.labelsRenderer;
      labelsRenderer.clear();

      expect(interval.labelsContainer.getCount()).toBe(0);
      expect(labelsRenderer.shapesMap).toEqual({});
      // @ts-ignore
      expect(labelsRenderer.lastShapesMap).toEqual({});
    });

    it('destroy', () => {
      // @ts-ignore
      const labelsRenderer = interval.geometryLabel.labelsRenderer;
      labelsRenderer.destroy();

      expect(interval.labelsContainer.destroyed).toBe(true);
    });
  });

  describe('path label', () => {
    const data = [
      { consumption: 0.65, price: 1, year: 1965 },
      { consumption: 0.66, price: 1.05, year: 1966 },
      { consumption: 0.64, price: 1.1, year: 1967 },
      { consumption: 0.63, price: 1.12, year: 1968 },
      { consumption: 0.55, price: 1.15, year: 1969 },
      { consumption: 0.57, price: 1.19, year: 1970 },
      { consumption: 0.58, price: 1.14, year: 1971 },
      { consumption: 0.59, price: 1, year: 1972 },
      { consumption: 0.57, price: 0.96, year: 1973 },
      { consumption: 0.55, price: 0.92, year: 1974 },
      { consumption: 0.54, price: 0.88, year: 1975 },
      { consumption: 0.55, price: 0.87, year: 1976 },
      { consumption: 0.42, price: 0.89, year: 1977 },
      { consumption: 0.28, price: 1, year: 1978 },
      { consumption: 0.15, price: 1.1, year: 1979 },
    ];

    const scales = {
      price: createScale('price', data),
      consumption: createScale('consumption', data),
      year: createScale('year', data),
    };
    const path = new Path({
      data,
      coordinate: rectCoord,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      scales,
    });
    path.position('price*consumption').label('year');
    path.init({
      theme: Theme,
    });
    path.paint();

    it('render', () => {
      expect(path.container.getCount()).toEqual(1);
      expect(path.labelsContainer.getCount()).toEqual(data.length);

      path.hide();

      expect(path.labelsContainer.getChildren()[4].get('visible')).toEqual(false);
    });
  });

  it('content is an instance of group', () => {
    const data = [
      { sex: '男', sold: 0.45 },
      { sex: '女', sold: 0.55 },
    ];

    const chart = new Chart({
      container: div,
      autoFit: false,
      width: 500,
      height: 500,
      padding: 100,
    });

    chart.coordinate('theta', {
      radius: 0.8,
    });

    chart.data(data);

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    const interval = chart
      .interval()
      .adjust('stack')
      .position('sold')
      .color('sex', ['#1890ff', '#f04864'])
      .label('sold', {
        content: (obj) => {
          if (obj.sex === '男') {
            const group = new G.Group({});
            group.addShape({
              type: 'image',
              attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                img: obj.sex === '男' ?
                  'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png' :
                  'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png',
              },
            });

            group.addShape({
              type: 'text',
              attrs: {
                x: 20,
                y: 54,
                text: obj.sex,
                textAlign: 'center',
                textBaseline: 'top',
                fill: obj.sex === '男' ? '#1890ff' : '#f04864',
              },
            });
            return group;
          }

          return obj.sold;
        }
      });
    chart.interaction('active');
    chart.render();

    const labelsContainer = interval.labelsContainer;
    expect(labelsContainer.getCount()).toBe(2);
    const femaleLabel = labelsContainer.findById('1-女');
    const maleLabel = labelsContainer.findById('1-男');
    // @ts-ignore
    expect(femaleLabel.getFirst().get('type')).toBe('text');
    // @ts-ignore
    expect(femaleLabel.getFirst().attr('matrix')).toBe(null);
    // @ts-ignore
    expect(femaleLabel.getFirst().attr('text')).toBe(0.55);

    // @ts-ignore
    expect(maleLabel.getFirst().getCount()).toBe(2);
    // @ts-ignore
    expect(maleLabel.getFirst().attr('matrix')[6]).toBeGreaterThan(1);
    // @ts-ignore
    expect(maleLabel.getFirst().attr('matrix')[7]).toBeGreaterThan(1);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
