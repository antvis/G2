import { IGroup, ShapeAttrs } from '@antv/g-base';
import { getCoordinate, Coordinate } from '@antv/coord';
import { limitInPlot } from '../../../../../src/geometry/label/layout/limit-in-plot';
import { createCanvas, createDiv, removeDom } from '../../../../util/dom';

const Polar = getCoordinate('polar');
const Cartesian = getCoordinate('rect');

describe('GeometryLabel layout limitInPlot', () => {
  const div = createDiv();
  const WIDTH = 150;
  const HEIGHT = 100;
  const canvas = createCanvas({
    container: div,
    width: WIDTH,
    height: HEIGHT,
  });

  const group = canvas.addGroup();
  const region = group.getBBox();
  const coord = new Cartesian({ start: { x: 0, y: 0 }, end: { x: WIDTH, y: HEIGHT } });
  const addLabel = (instance: Coordinate, x: number, y: number, text = 'label', attrs: ShapeAttrs = {}) => {
    const labelGroup = group.addGroup({
      id: `group-${text}`,
      coordinate: instance,
    });
    labelGroup.addShape({
      type: 'text',
      id: `text-${text}`,
      attrs: {
        x,
        y,
        text,
        fill: 'red',
        textAlign: 'start',
        textBaseline: 'top',
        ...attrs,
      },
    });
  };
  const getLabels = () => group.getChildren() as IGroup[];
  const getCount = () =>
    getLabels().filter((labelGroup) => labelGroup.get('visible') && labelGroup.getFirst().get('visible')).length;

  beforeEach(() => {
    group.clear();
  });

  it('top', () => {
    addLabel(coord, -5, 50, 'label1');
    addLabel(coord, 40, 50, 'label2');
    limitInPlot([], getLabels(), [], region);

    expect(getCount()).toBe(2);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(0);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(50);
  });

  it('top, margin', () => {
    addLabel(coord, -5, 50, 'label1');
    addLabel(coord, 40, 50, 'label2');
    addLabel(coord, -10, 50, 'label3');
    limitInPlot([], getLabels(), [], region, { margin: 6 });

    expect(getCount()).toBe(3);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(-5);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(50);
    expect(getLabels()[2].getCanvasBBox().minX).toBe(-6);
    expect(getLabels()[2].getCanvasBBox().minY).toBe(50);
  });

  it('right', () => {
    addLabel(coord, 150, 40, 'label1');
    addLabel(coord, 50, 40, 'label2');
    limitInPlot([], getLabels(), [], region);

    expect(getCount()).toBe(2);
    expect(getLabels()[0].getCanvasBBox().maxX).toBe(150);
    expect(getLabels()[0].getCanvasBBox().y).toBe(40);
    expect(getLabels()[1].getCanvasBBox().x).toBe(50);
    expect(getLabels()[1].getCanvasBBox().y).toBe(40);
  });

  it('right, margin', () => {
    addLabel(coord, 155, 40, 'label1', { textAlign: 'right' });
    addLabel(coord, 50, 40, 'label2', { textAlign: 'right' });
    addLabel(coord, 160, 40, 'label3', { textAlign: 'right' });
    limitInPlot([], getLabels(), [], region, { margin: 6 });

    expect(getCount()).toBe(3);
    expect(getLabels()[0].getCanvasBBox().maxX).toBe(155);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(40);
    expect(getLabels()[1].getCanvasBBox().maxX).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(40);
    expect(getLabels()[2].getCanvasBBox().maxX).toBe(156);
    expect(getLabels()[2].getCanvasBBox().minY).toBe(40);
  });

  it('bottom', () => {
    addLabel(coord, 40, 50, 'label1');
    addLabel(coord, 40, 100, 'label2');
    limitInPlot([], getLabels(), [], region);

    expect(getCount()).toBe(2);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[1].getCanvasBBox().maxY).toBe(100);
  });

  it('bottom, margin', () => {
    addLabel(coord, 40, 50, 'label1', { textBaseline: 'bottom' });
    addLabel(coord, 40, 105, 'label2', { textBaseline: 'bottom' });
    addLabel(coord, 40, 110, 'label3', { textBaseline: 'bottom' });
    limitInPlot([], getLabels(), [], region, { margin: 6 });

    expect(getCount()).toBe(3);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[0].getCanvasBBox().maxY).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[1].getCanvasBBox().maxY).toBe(105);
    expect(getLabels()[2].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[2].getCanvasBBox().maxY).toBe(106);
  });

  it('left', () => {
    addLabel(coord, 40, 50, 'label1');
    addLabel(coord, -5, 50, 'label2');
    limitInPlot([], getLabels(), [], region);

    expect(getCount()).toBe(2);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(0);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(50);
  });

  it('left, margin', () => {
    addLabel(coord, 40, 50, 'label1');
    addLabel(coord, -5, 50, 'label2');
    addLabel(coord, -10, 50, 'label3');
    limitInPlot([], getLabels(), [], region, { margin: 6 });

    expect(getCount()).toBe(3);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(40);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(-5);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(50);
    expect(getLabels()[2].getCanvasBBox().minX).toBe(-6);
    expect(getLabels()[2].getCanvasBBox().minY).toBe(50);
  });

  it('multiple direction', () => {
    addLabel(coord, -5, -5, 'label1'); // top-left
    addLabel(coord, 50, 40, 'label2');
    addLabel(coord, 150, 100, 'label3'); // bottom-right
    limitInPlot([], getLabels(), [], region);

    expect(getCount()).toBe(3);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(0);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(0);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(40);
    expect(getLabels()[2].getCanvasBBox().maxX).toBe(150);
    expect(getLabels()[2].getCanvasBBox().maxY).toBe(100);
  });

  it('multiple direction', () => {
    addLabel(coord, 155, -5, 'label1'); // right-top
    addLabel(coord, 50, 40, 'label2');
    addLabel(coord, -5, 105, 'label3'); // left-bottom
    limitInPlot([], getLabels(), [], region);

    expect(getCount()).toBe(3);
    expect(getLabels()[0].getCanvasBBox().maxX).toBe(150);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(0);
    expect(getLabels()[1].getCanvasBBox().minX).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(40);
    expect(getLabels()[2].getCanvasBBox().minX).toBe(0);
    expect(getLabels()[2].getCanvasBBox().maxY).toBe(100);
  });

  it('multiple direction, action = hide', () => {
    addLabel(coord, -5, -5, 'label1'); // top-left
    addLabel(coord, 50, 40, 'label2');
    addLabel(coord, 150, 100, 'label3'); // bottom-right
    limitInPlot([], getLabels(), [], region, { action: 'hide' });

    expect(getCount()).toBe(1);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(-5);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(-5);
    expect(getLabels()[0].get('visible')).toBeFalsy();
    expect(getLabels()[1].getCanvasBBox().minX).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(40);
    expect(getLabels()[1].get('visible')).toBeTruthy();
    expect(getLabels()[2].getCanvasBBox().minX).toBe(150);
    expect(getLabels()[2].getCanvasBBox().minY).toBe(100);
    expect(getLabels()[2].get('visible')).toBeFalsy();
  });

  it('multiple direction, action = hide', () => {
    addLabel(coord, 155, -5, 'label1'); // right-top
    addLabel(coord, 50, 40, 'label2');
    addLabel(coord, -5, 105, 'label3'); // left-bottom
    limitInPlot([], getLabels(), [], region, { action: 'hide' });

    expect(getCount()).toBe(1);
    expect(getLabels()[0].getCanvasBBox().minX).toBe(155);
    expect(getLabels()[0].getCanvasBBox().minY).toBe(-5);
    expect(getLabels()[0].get('visible')).toBeFalsy();
    expect(getLabels()[1].getCanvasBBox().minX).toBe(50);
    expect(getLabels()[1].getCanvasBBox().minY).toBe(40);
    expect(getLabels()[1].get('visible')).toBeTruthy();
    expect(getLabels()[2].getCanvasBBox().minX).toBe(-5);
    expect(getLabels()[2].getCanvasBBox().minY).toBe(105);
    expect(getLabels()[2].get('visible')).toBeFalsy();
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
