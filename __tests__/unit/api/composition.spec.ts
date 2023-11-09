import { Chart } from '../../../src';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

function expectToCreateMarks(node) {
  expect(node.interval().type).toBe('interval');
  expect(node.rect().type).toBe('rect');
  expect(node.point().type).toBe('point');
  expect(node.area().type).toBe('area');
  expect(node.line().type).toBe('line');
  expect(node.cell().type).toBe('cell');
  expect(node.vector().type).toBe('vector');
  expect(node.link().type).toBe('link');
  expect(node.polygon().type).toBe('polygon');
  expect(node.image().type).toBe('image');
  expect(node.text().type).toBe('text');
  expect(node.box().type).toBe('box');
  expect(node.lineX().type).toBe('lineX');
  expect(node.lineY().type).toBe('lineY');
  expect(node.range().type).toBe('range');
  expect(node.rangeX().type).toBe('rangeX');
  expect(node.rangeY().type).toBe('rangeY');
  expect(node.connector().type).toBe('connector');
  expect(node.sankey().type).toBe('sankey');
  expect(node.treemap().type).toBe('treemap');
  expect(node.pack().type).toBe('pack');
  expect(node.forceGraph().type).toBe('forceGraph');
  expect(node.tree().type).toBe('tree');
  expect(node.wordCloud().type).toBe('wordCloud');
  expect(node.density().type).toBe('density');
  expect(node.heatmap().type).toBe('heatmap');
}

function expectToCreateCompositions(node) {
  expect(node.view().type).toBe('view');
  expect(node.spaceLayer().type).toBe('spaceLayer');
  expect(node.spaceFlex().type).toBe('spaceFlex');
  expect(node.facetRect().type).toBe('facetRect');
  expect(node.repeatMatrix().type).toBe('repeatMatrix');
  expect(node.facetCircle().type).toBe('facetCircle');
  expect(node.timingKeyframe().type).toBe('timingKeyframe');
  expect(node.geoView().type).toBe('geoView');
}

function expectToCreateNodes(node) {
  expectToCreateCompositions(node);
  expectToCreateMarks(node);
}

describe('Composition', () => {
  const chart = new Chart({
    canvas: createNodeGCanvas(640, 480),
  });
  it('chart.view() should specify options by API', () => {
    const node = chart.view();
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

  it('chart.facetCircle() should specify options by API', () => {
    const node = chart.facetCircle();
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

  it('chart.spaceFlex() should specify options by API', () => {
    const node = chart.spaceFlex();
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

  it('chart.timingKeyframe() should specify options by API', () => {
    const node = chart.timingKeyframe();
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

  it('chart.spaceLayer() should specify options by API', () => {
    const node = chart.spaceLayer();
    node.data([1, 2, 3]).attr('key', 'composition');

    expect(node.type).toBe('spaceLayer');
    expect(node.value).toEqual({
      data: [1, 2, 3],
      key: 'composition',
    });
    expectToCreateNodes(node);
  });

  it('chart.repeatMatrix() should specify options by API', () => {
    const node = chart.repeatMatrix();
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

  it('chart.facetRect() should specify options by API', () => {
    const node = chart.facetRect();
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

  it('chart.geoView() should specify options by API', () => {
    const node = chart.geoView();
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

  it('chart.geoPath() should specify options by API', () => {
    const node = chart.geoPath();
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
