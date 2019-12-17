import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Interval from '../../../../src/geometry/interval';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';
import { createScale, updateScales } from '../../../util/scale';

const PolarCoordinate = getCoordinate('polar');
const IdentityScale = getScale('identity');

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
    theme: Theme,
  });
  interval
    .position('1*percent')
    .color('a')
    .label('percent')
    .adjust('stack');

  interval.init();
  interval.paint();

  it('render', () => {
    expect(interval.labelsContainer.getCount()).toBe(3);
    // @ts-ignore
    const labelsRenderer = interval.labelsRenderer;
    expect(labelsRenderer.container.getCount()).toBe(3);
    // @ts-ignore
    expect(labelsRenderer.container.getFirst().getCount()).toBe(2);
  });

  it('update', () => {
    const newData = [
      { a: '1', percent: 0.5 },
      { a: '2', percent: 0.5 },
    ];
    const newScales = {
      a: createScale('a', newData),
      percent: createScale('percent', newData),
    }
    // 保持引用，同步 scales
    updateScales(interval.scales, newScales);
    interval.update({
      data: newData,
    });
    interval.paint();

    // @ts-ignore
    const labelsRenderer = interval.labelsRenderer;
    expect(labelsRenderer.container.getCount()).toBe(2);
    expect(labelsRenderer.container.getFirst().get('data')).toEqual({ a: '1', percent: 0.5 });
  });

  it('clear', () => {
    // @ts-ignore
    const labelsRenderer = interval.labelsRenderer;
    labelsRenderer.clear();

    expect(interval.labelsContainer.getCount()).toBe(0);
    expect(labelsRenderer.shapesMap).toEqual({});
    // @ts-ignore
    expect(labelsRenderer.lastShapesMap).toEqual({});
  });

  it('destroy', () => {
    // @ts-ignore
    const labelsRenderer = interval.labelsRenderer;
    labelsRenderer.destroy();

    expect(interval.labelsContainer.destroyed).toBe(true);
  });
});
