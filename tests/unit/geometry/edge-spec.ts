import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Edge from '../../../src/geometry/edge';
import '../../../src/geometry/shape/edge/vhv';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

const linearScale = getScale('linear');
const IdentityScale = getScale('identity');
const Theme = getTheme('default');
const RectCoordinate = getCoordinate('rect');

describe('Edge Geometry', () => {
  const scaleX = new linearScale({
    field: 'x',
    min: 0,
    max: 5
  });
  const scaleY = new linearScale({
    field: 'y',
    min: 0,
    max: 5
  });
  const scaleVh = new IdentityScale({
    field: 'vhv',
    values: [ 'vhv' ],
  });

  const ScaleRed = new IdentityScale({
    field: 'red',
    values: [ 'red' ],
  });

  const coord = new RectCoordinate({
    start: { x: 0, y: 0 },
    end: { x: 500, y: 500 },
  });

  const data = [
    { x: [1, 2], y: [3, 4] },
    { x: [2, 3], y: [1, 5] },
  ];

  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 400,
    height: 400,
  });

  const group = canvas.addGroup();
  const geom = new Edge({
    data,
    coordinate: coord,
    container: group,
    scales: { x: scaleX, y: scaleY, vhv: scaleVh, red: ScaleRed },
  });

  it('init', () => {
    expect(geom.type).toBe('edge');
    expect(geom.shapeType).toBe('edge');
  });

  it('draw two point', () => {
    geom.position('x*y').color('red');
    geom.init({
      theme: Theme,
    });
    geom.paint();
    expect(geom.container.getCount()).toBe(2);
    expect(geom.container.getFirst().attr('path').length).toBe(2);
    canvas.draw();
  });

  it('draw vhv', () => {
    geom.position('x*y').shape('vhv').animate(false);
    geom.init();
    geom.paint();
    expect(geom.container.getCount()).toBe(2);
    expect(geom.container.getFirst().attr('path').length).toBe(4);
    canvas.draw();
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
