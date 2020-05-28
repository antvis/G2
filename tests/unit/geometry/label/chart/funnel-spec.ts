import { flatten } from '@antv/util';

import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Interval from '../../../../../src/geometry/interval';
import IntervalLabel from '../../../../../src/geometry/label/interval';
import { getTheme } from '../../../../../src/theme/';
import { createCanvas, createDiv } from '../../../../util/dom';
import { createScale } from '../../../../util/scale';

const Theme = getTheme('default');
const CartesianCoordinate = getCoordinate('rect');
const IdentityScale = getScale('identity');

describe('Funnel chart label', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 300,
    height: 300,
  });

  const coord = new CartesianCoordinate({
    start: { x: 0, y: 150 },
    end: { x: 150, y: 0 },
  });
  coord.transpose().scale(1, -1);

  const pyramidScale = new IdentityScale({
    field: 'pyramid',
    values: ['pyramid'],
    range: [0, 1],
  });
  const funnelScale = new IdentityScale({
    field: 'funnel',
    values: ['funnel'],
    range: [0, 1],
  });

  const data = [
    { action: '浏览网站', pv: 50000 },
    { action: '放入购物车', pv: 35000 },
    { action: '生成订单', pv: 25000 },
    { action: '支付订单', pv: 15000 },
    { action: '完成交易', pv: 8000 },
  ];

  const scales = {
    action: createScale('action', data),
    pv: createScale('pv', data),
    pyramid: pyramidScale,
    funnel: funnelScale,
  };

  it('pyramid', () => {
    const interval = new Interval({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: coord,
    });
    interval
      .adjust('symmetric')
      .position('action*pv')
      .shape('pyramid')
      .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
      .label(
        'action*pv',
        (action, pv) => {
          return {
            content: `${action} ${pv}`,
          };
        },
        {
          offset: 35,
          labelLine: {
            style: {
              lineWidth: 1,
              stroke: 'rgba(0, 0, 0, 0.15)',
            },
          },
        }
      );
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
    const labelItems = gLabels.getLabelItems(mappingArray);

    expect(labelItems[0].x).toBe(173.75);
    expect(labelItems[0].y).toBe(3.75);
    expect(labelItems[2].x).toBe(140);
    expect(labelItems[2].y).toBe(78.75);
    expect(labelItems[4].x).toBe(116);
    expect(labelItems[4].y).toBe(150);
  });

  it('funnel', () => {
    const interval = new Interval({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: coord,
    });
    interval
      .adjust('symmetric')
      .position('action*pv')
      .shape('funnel')
      .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
      .label(
        'action*pv',
        (action, pv) => {
          return {
            content: `${action} ${pv}`,
          };
        },
        {
          offset: 35,
          labelLine: {
            style: {
              lineWidth: 1,
              stroke: 'rgba(0, 0, 0, 0.15)',
            },
          },
        }
      );
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
    const labelItems = gLabels.getLabelItems(mappingArray);
    expect(labelItems[0].x).toBe(173.75);
    expect(labelItems[0].y).toBe(3.75);
    expect(labelItems[2].x).toBe(140);
    expect(labelItems[2].y).toBe(78.75);
    expect(labelItems[4].x).toBe(122);
    expect(labelItems[4].y).toBe(150);
  });
});
