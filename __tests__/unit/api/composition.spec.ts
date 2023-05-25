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
  Tree,
  WordCloud,
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
  expect(node.tree()).toBeInstanceOf(Tree);
  expect(node.wordCloud()).toBeInstanceOf(WordCloud);
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
      .attr('paddingBottom', 10)
      .attr('paddingLeft', 10)
      .attr('paddingRight', 10)
      .attr('paddingTop', 10)
      .data([1, 2, 3])
      .attr('marginBottom', 10)
      .attr('marginLeft', 20)
      .attr('marginTop', 30)
      .attr('marginRight', 40)
      .scale('color', { type: 'linear' })
      .attr('key', 'composition')
      .style('plotFill', 'red')
      .coordinate({ type: 'polar' })
      .interaction('elementHighlight', { background: true })
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
      coordinate: { type: 'polar' },
      interaction: {
        elementHighlight: {
          background: true,
        },
      },
      theme: { defaultColor: 'red' },
      scale: { color: { type: 'linear' } },
    });
    expectToCreateMarks(node);
  });

  it('FacetCircle() should specify options by API', () => {
    const node = new FacetCircle();
    node
      .attr('paddingBottom', 10)
      .attr('paddingLeft', 10)
      .attr('paddingRight', 10)
      .attr('paddingTop', 10)
      .data([1, 2, 3])
      .attr('key', 'composition')
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
      .attr('direction', 'col')
      .data([1, 2, 3])
      .attr('padding', 10)
      .attr('ratio', [1, 2, 3])
      .attr('key', 'composition');

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
      .attr('easing', 'linear')
      .attr('iterationCount', 10)
      .attr('direction', 'alternate')
      .attr('duration', 100)
      .attr('key', 'composition');

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
    node.data([1, 2, 3]).attr('key', 'composition');

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
      .attr('key', 'composition')
      .attr('paddingBottom', 10)
      .attr('paddingLeft', 10)
      .attr('paddingRight', 10)
      .attr('paddingTop', 10)
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
      .attr('key', 'composition')
      .attr('paddingBottom', 10)
      .attr('paddingLeft', 10)
      .attr('paddingRight', 10)
      .attr('paddingTop', 10)
      .attr('shareData', true)
      .attr('shareSize', true)
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
      .attr('paddingBottom', 10)
      .attr('paddingLeft', 10)
      .attr('paddingRight', 10)
      .attr('paddingTop', 10)
      .data([1, 2, 3])
      .attr('marginBottom', 10)
      .attr('marginLeft', 20)
      .attr('marginTop', 30)
      .attr('marginRight', 40)
      .attr('key', 'composition')
      .style('plotFill', 'red')
      .coordinate({ type: 'polar' })
      .interaction('elementHighlight', { background: true })
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
      coordinate: { type: 'polar' },
      interaction: {
        elementHighlight: {
          background: true,
        },
      },
      theme: { defaultColor: 'red' },
    });
    expectToCreateMarks(node);
  });

  it('GeoPath() should specify options by API', () => {
    const node = new GeoPath();
    node
      .attr('paddingBottom', 10)
      .attr('paddingLeft', 10)
      .attr('paddingRight', 10)
      .attr('paddingTop', 10)
      .data([1, 2, 3])
      .attr('marginBottom', 10)
      .attr('marginLeft', 20)
      .attr('marginTop', 30)
      .attr('marginRight', 40)
      .encode('x', 'a')
      .state('active', { fill: 'red' })
      .scale('color', { type: 'linear' })
      .attr('key', 'composition')
      .style('plotFill', 'red')
      .coordinate({ type: 'polar' })
      .interaction('elementHighlight', { background: true })
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
      coordinate: { type: 'polar' },
      interaction: { elementHighlight: { background: true } },
      theme: { defaultColor: 'red' },
      scale: { color: { type: 'linear' } },
      encode: { x: 'a' },
      state: { active: { fill: 'red' } },
    });
    expectToCreateMarks(node);
  });
});
