import {
  View,
  FacetCircle,
  SpaceFlex,
  TimingKeyframe,
  SpaceLayer,
  RepeatMatrix,
  FacetRect,
  GeoView,
  GeoPath,
} from '../../../src/api/composition';
import {
  Area,
  Cell,
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
  Rect,
  Text,
  Connector,
  Sankey,
  Treemap,
  Pack,
  ForceGraph,
} from '../../../src/api/mark/mark';

function expectToCreateMarks(node) {
  expect(node.interval()).toBeInstanceOf(Interval);
  expect(node.rect()).toBeInstanceOf(Rect);
  expect(node.point()).toBeInstanceOf(Point);
  expect(node.area()).toBeInstanceOf(Area);
  expect(node.line()).toBeInstanceOf(Line);
  expect(node.cell()).toBeInstanceOf(Cell);
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
  expect(node.sankey()).toBeInstanceOf(Sankey);
  expect(node.treemap()).toBeInstanceOf(Treemap);
  expect(node.pack()).toBeInstanceOf(Pack);
  expect(node.forceGraph()).toBeInstanceOf(ForceGraph);
}

function expectToCreateCompositions(node) {
  expect(node.view()).toBeInstanceOf(View);
  expect(node.spaceLayer()).toBeInstanceOf(SpaceLayer);
  expect(node.spaceFlex()).toBeInstanceOf(SpaceFlex);
  expect(node.facetRect()).toBeInstanceOf(FacetRect);
  expect(node.repeatMatrix()).toBeInstanceOf(RepeatMatrix);
  expect(node.facetCircle()).toBeInstanceOf(FacetCircle);
  expect(node.timingKeyframe()).toBeInstanceOf(TimingKeyframe);
  expect(node.geoView()).toBeInstanceOf(GeoView);
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
      .marginBottom(10)
      .marginLeft(20)
      .marginTop(30)
      .marginRight(40)
      .scale('color', { type: 'linear' })
      .key('composition')
      .style('plotFill', 'red')
      .coordinate({ type: 'polar' })
      .interaction({ type: 'brush' })
      .theme('defaultColor', 'red');

    expect(node.type).toBe('view');
    expect(node.value).toEqual({
      paddingBottom: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingLeft: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginTop: 30,
      marginRight: 40,
      data: [1, 2, 3],
      key: 'composition',
      style: { plotFill: 'red' },
      coordinate: [{ type: 'polar' }],
      interaction: [{ type: 'brush' }],
      theme: { defaultColor: 'red' },
      scale: { color: { type: 'linear' } },
    });
    expectToCreateMarks(node);
  });

  it('FacetCircle() should specify options by API', () => {
    const node = new FacetCircle();
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

    expect(node.type).toBe('facetCircle');
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

  it('SpaceFlex() should specify options by API', () => {
    const node = new SpaceFlex();
    node
      .direction('col')
      .data([1, 2, 3])
      .padding(10)
      .ratio([1, 2, 3])
      .key('composition');

    expect(node.type).toBe('spaceFlex');
    expect(node.value).toEqual({
      direction: 'col',
      data: [1, 2, 3],
      padding: 10,
      ratio: [1, 2, 3],
      key: 'composition',
    });
    expectToCreateNodes(node);
  });

  it('TimingKeyframe() should specify options by API', () => {
    const node = new TimingKeyframe();
    node
      .easing('linear')
      .iterationCount(10)
      .direction('alternate')
      .duration(100)
      .key('composition');

    expect(node.type).toBe('timingKeyframe');
    expect(node.value).toEqual({
      easing: 'linear',
      iterationCount: 10,
      direction: 'alternate',
      duration: 100,
      key: 'composition',
    });
    expectToCreateNodes(node);
  });

  it('SpaceLayer() should specify options by API', () => {
    const node = new SpaceLayer();
    node.data([1, 2, 3]).key('composition');

    expect(node.type).toBe('spaceLayer');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      key: 'composition',
    });
    expectToCreateNodes(node);
  });

  it('RepeatMatrix() should specify options by API', () => {
    const node = new RepeatMatrix();
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

    expect(node.type).toBe('repeatMatrix');
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
    const node = new FacetRect();
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
      .transform({ type: 'stackY' })
      .axis('x', { title: 'a' })
      .legend('color', { title: 'b' });

    expect(node.type).toBe('facetRect');
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
      axis: { x: { title: 'a' } },
      legend: { color: { title: 'b' } },
    });
    expectToCreateNodes(node);
  });

  it('GeoView() should specify options by API', () => {
    const node = new GeoView();
    node
      .paddingBottom(10)
      .paddingLeft(10)
      .paddingRight(10)
      .paddingTop(10)
      .data([1, 2, 3])
      .marginBottom(10)
      .marginLeft(20)
      .marginTop(30)
      .marginRight(40)
      .key('composition')
      .style('plotFill', 'red')
      .projection({ type: 'foo' })
      .coordinate({ type: 'polar' })
      .interaction({ type: 'brush' })
      .theme('defaultColor', 'red');

    expect(node.type).toBe('geoView');
    expect(node.value).toEqual({
      paddingBottom: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingLeft: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginTop: 30,
      marginRight: 40,
      data: [1, 2, 3],
      key: 'composition',
      style: { plotFill: 'red' },
      coordinate: [{ type: 'polar' }],
      interaction: [{ type: 'brush' }],
      theme: { defaultColor: 'red' },
      projection: { type: 'foo' },
    });
    expectToCreateMarks(node);
  });

  it('GeoView() should specify options by API', () => {
    const node = new GeoPath();
    node
      .paddingBottom(10)
      .paddingLeft(10)
      .paddingRight(10)
      .paddingTop(10)
      .data([1, 2, 3])
      .marginBottom(10)
      .marginLeft(20)
      .marginTop(30)
      .marginRight(40)
      .encode('x', 'a')
      .scale('color', { type: 'linear' })
      .key('composition')
      .style('plotFill', 'red')
      .projection({ type: 'foo' })
      .coordinate({ type: 'polar' })
      .interaction({ type: 'brush' })
      .theme('defaultColor', 'red');

    expect(node.type).toBe('geoPath');
    expect(node.value).toEqual({
      paddingBottom: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingLeft: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginTop: 30,
      marginRight: 40,
      data: [1, 2, 3],
      key: 'composition',
      style: { plotFill: 'red' },
      coordinate: [{ type: 'polar' }],
      interaction: [{ type: 'brush' }],
      theme: { defaultColor: 'red' },
      projection: { type: 'foo' },
      scale: { color: { type: 'linear' } },
      encode: { x: 'a' },
    });
    expectToCreateMarks(node);
  });
});
