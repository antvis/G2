import {
  View,
  Circle,
  Flex,
  Keyframe,
  Layer,
  Matrix,
  Square,
} from '../../../src/api/composition';
import {
  Area,
  Grid,
  Image,
  Interval,
  Line,
  Link,
  Point,
  Polygon,
  Vector,
  Box,
  LineX,
  LineY,
  Range,
  RangeX,
  RangeY,
  Text,
  Connector,
} from '../../../src/api/mark/mark';

function expectToCreateMarks(node) {
  expect(node.interval()).toBeInstanceOf(Interval);
  expect(node.point()).toBeInstanceOf(Point);
  expect(node.area()).toBeInstanceOf(Area);
  expect(node.line()).toBeInstanceOf(Line);
  expect(node.grid()).toBeInstanceOf(Grid);
  expect(node.vector()).toBeInstanceOf(Vector);
  expect(node.link()).toBeInstanceOf(Link);
  expect(node.polygon()).toBeInstanceOf(Polygon);
  expect(node.image()).toBeInstanceOf(Image);
  expect(node.text()).toBeInstanceOf(Text);
  expect(node.box()).toBeInstanceOf(Box);
  expect(node.lineX()).toBeInstanceOf(LineX);
  expect(node.lineY()).toBeInstanceOf(LineY);
  expect(node.range()).toBeInstanceOf(Range);
  expect(node.rangeX()).toBeInstanceOf(RangeX);
  expect(node.rangeY()).toBeInstanceOf(RangeY);
  expect(node.connector()).toBeInstanceOf(Connector);
}

function expectToCreateCompositions(node) {
  expect(node.view()).toBeInstanceOf(View);
  expect(node.layer()).toBeInstanceOf(Layer);
  expect(node.flex()).toBeInstanceOf(Flex);
  expect(node.square()).toBeInstanceOf(Square);
  expect(node.matrix()).toBeInstanceOf(Matrix);
  expect(node.circle()).toBeInstanceOf(Circle);
  expect(node.keyframe()).toBeInstanceOf(Keyframe);
}

function expectToCreateNodes(node) {
  expectToCreateCompositions(node);
  expectToCreateMarks(node);
}

describe('Composition', () => {
  it('View() should specify options by API', () => {
    const node = new View();
    node
      .paddingBottom(10)
      .paddingLeft(10)
      .paddingRight(10)
      .paddingTop(10)
      .data([1, 2, 3])
      .key('composition')
      .coordinate({ type: 'polar' })
      .interaction({ type: 'brush' })
      .theme('defaultColor', 'red');

    expect(node.type).toBe('view');
    expect(node.value).toEqual({
      paddingBottom: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingLeft: 10,
      data: [1, 2, 3],
      key: 'composition',
      coordinate: [{ type: 'polar' }],
      interaction: [{ type: 'brush' }],
      theme: { defaultColor: 'red' },
    });
    expectToCreateMarks(node);
  });

  it('Circle() should specify options by API', () => {
    const node = new Circle();
    node
      .paddingBottom(10)
      .paddingLeft(10)
      .paddingRight(10)
      .paddingTop(10)
      .data([1, 2, 3])
      .key('composition')
      .encode('position', 'name')
      .scale('x', { type: 'log' })
      .transform({ type: 'stackY' });

    expect(node.type).toBe('circle');
    expect(node.value).toEqual({
      paddingBottom: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingLeft: 10,
      data: [1, 2, 3],
      key: 'composition',
      encode: { position: 'name' },
      scale: { x: { type: 'log' } },
      transform: [{ type: 'stackY' }],
    });
    expectToCreateNodes(node);
  });

  it('Flex() should specify options by API', () => {
    const node = new Flex();
    node
      .direction('col')
      .data([1, 2, 3])
      .padding(10)
      .ratio([1, 2, 3])
      .key('composition');

    expect(node.type).toBe('flex');
    expect(node.value).toEqual({
      direction: 'col',
      data: [1, 2, 3],
      padding: 10,
      ratio: [1, 2, 3],
      key: 'composition',
    });
    expectToCreateNodes(node);
  });

  it('Keyframe() should specify options by API', () => {
    const node = new Keyframe();
    node
      .easing('linear')
      .iterationCount(10)
      .direction('alternate')
      .duration(100)
      .key('composition');

    expect(node.type).toBe('keyframe');
    expect(node.value).toEqual({
      easing: 'linear',
      iterationCount: 10,
      direction: 'alternate',
      duration: 100,
      key: 'composition',
    });
    expectToCreateNodes(node);
  });

  it('Layer() should specify options by API', () => {
    const node = new Layer();
    node.data([1, 2, 3]).key('composition');

    expect(node.type).toBe('layer');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      key: 'composition',
    });
    expectToCreateNodes(node);
  });

  it('Matrix() should specify options by API', () => {
    const node = new Matrix();
    node
      .data([1, 2, 3])
      .key('composition')
      .paddingBottom(10)
      .paddingLeft(10)
      .paddingRight(10)
      .paddingTop(10)
      .scale('x', { type: 'log' })
      .encode('y', ['name'])
      .transform({ type: 'stackY' });

    expect(node.type).toBe('matrix');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      key: 'composition',
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingTop: 10,
      scale: { x: { type: 'log' } },
      encode: { y: ['name'] },
      transform: [{ type: 'stackY' }],
    });
    expectToCreateNodes(node);
  });

  it('Rect() should specify options by API', () => {
    const node = new Square();
    node
      .data([1, 2, 3])
      .key('composition')
      .paddingBottom(10)
      .paddingLeft(10)
      .paddingRight(10)
      .paddingTop(10)
      .shareData(true)
      .shareSize(true)
      .scale('x', { type: 'log' })
      .encode('y', 'name')
      .transform({ type: 'stackY' });

    expect(node.type).toBe('square');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      key: 'composition',
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingTop: 10,
      scale: { x: { type: 'log' } },
      encode: { y: 'name' },
      transform: [{ type: 'stackY' }],
      shareData: true,
      shareSize: true,
    });
    expectToCreateNodes(node);
  });
});
