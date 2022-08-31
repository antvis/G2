import { Canvas } from '@antv/g';
import { Chart, createLibrary } from '../../../src';
import {
  View,
  Keyframe,
  Flex,
  Rect,
  Matrix,
  Circle,
} from '../../../src/api/composition';
import { Layer } from '../../../src/api/composition/layer';
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
  Text,
  Schema,
  AnnotationLineX,
  AnnotationLineY,
  AnnotationRange,
  AnnotationRangeX,
  AnnotationRangeY,
  AnnotationText,
  AnnotationConnector,
} from '../../../src/api/mark/mark';
import { createDiv } from '../../utils/dom';

describe('Chart', () => {
  it('Chart() should have expected defaults', () => {
    const chart = new Chart();
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({});
    expect(chart['_container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should support HTML container', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
    });
    expect(chart['_container']).toBe(container);
  });

  it('Chart({...}) should support id container', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'root');
    document.body.appendChild(div);
    const chart = new Chart({
      container: 'root',
    });
    expect(chart['_container']).toBe(div);
  });

  it('Chart({...}) should support undefined container', () => {
    const chart = new Chart();
    expect(chart['_container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should override default value', () => {
    const chart = new Chart({
      data: [1, 2, 3],
    });
    expect(chart.value).toEqual({
      data: [1, 2, 3],
    });
  });

  it('chart.node() should return container', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
    });
    expect(chart.node()).toBe(container);
  });

  it('chart.[attr](...) should specify options by API', () => {
    const chart = new Chart();
    chart
      .data([1, 2, 3])
      .key('composition')
      .coordinate({ type: 'polar' })
      .interaction({ type: 'brush' })
      .transform({ type: 'stackY' })
      .theme('defaultColor', 'red');

    expect(chart.options()).toEqual({
      type: 'view',
      data: [1, 2, 3],
      key: 'composition',
      coordinate: [{ type: 'polar' }],
      interaction: [{ type: 'brush' }],
      transform: [{ type: 'stackY' }],
      theme: { defaultColor: 'red' },
    });
  });

  it('chart.nodeName() should return expected node ', () => {
    const chart = new Chart();
    expect(chart.interval()).toBeInstanceOf(Interval);
    expect(chart.point()).toBeInstanceOf(Point);
    expect(chart.area()).toBeInstanceOf(Area);
    expect(chart.line()).toBeInstanceOf(Line);
    expect(chart.grid()).toBeInstanceOf(Grid);
    expect(chart.vector()).toBeInstanceOf(Vector);
    expect(chart.link()).toBeInstanceOf(Link);
    expect(chart.polygon()).toBeInstanceOf(Polygon);
    expect(chart.image()).toBeInstanceOf(Image);
    expect(chart.text()).toBeInstanceOf(Text);
    expect(chart.schema()).toBeInstanceOf(Schema);
    expect(chart.annotationLineX()).toBeInstanceOf(AnnotationLineX);
    expect(chart.annotationLineY()).toBeInstanceOf(AnnotationLineY);
    expect(chart.annotationRange()).toBeInstanceOf(AnnotationRange);
    expect(chart.annotationRangeX()).toBeInstanceOf(AnnotationRangeX);
    expect(chart.annotationRangeY()).toBeInstanceOf(AnnotationRangeY);
    expect(chart.annotationText()).toBeInstanceOf(AnnotationText);
    expect(chart.annotationConnector()).toBeInstanceOf(AnnotationConnector);
    expect(chart.options().children).toEqual([
      { type: 'interval' },
      { type: 'point' },
      { type: 'area' },
      { type: 'line' },
      { type: 'grid' },
      { type: 'vector' },
      { type: 'link' },
      { type: 'polygon' },
      { type: 'image' },
      { type: 'text' },
      { type: 'schema' },
      { type: 'annotation.lineX' },
      { type: 'annotation.lineY' },
      { type: 'annotation.range' },
      { type: 'annotation.rangeX' },
      { type: 'annotation.rangeY' },
      { type: 'annotation.text' },
      { type: 'annotation.connector' },
    ]);
  });

  it('chart.container() should use last node as root node', () => {
    const chart = new Chart();
    chart.view();
    chart.layer();
    expect(chart.layer()).toBeInstanceOf(Layer);
  });

  it('chart.container() should set layout options for root node', () => {
    const chart = new Chart({
      width: 100,
      height: 120,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 30,
      paddingTop: 40,
    });
    chart.layer();
    expect(chart.options()).toEqual({
      type: 'layer',
      width: 100,
      height: 120,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 30,
      paddingTop: 40,
    });
  });

  it('chart.container() should return expected container', () => {
    const chart = new Chart();
    expect(chart.view()).toBeInstanceOf(View);
    expect(chart.options()).toEqual({ type: 'view' });
    expect(chart.layer()).toBeInstanceOf(Layer);
    expect(chart.options()).toEqual({ type: 'layer' });
    expect(chart.flex()).toBeInstanceOf(Flex);
    expect(chart.options()).toEqual({ type: 'flex' });
    expect(chart.rect()).toBeInstanceOf(Rect);
    expect(chart.options()).toEqual({ type: 'rect' });
    expect(chart.matrix()).toBeInstanceOf(Matrix);
    expect(chart.options()).toEqual({ type: 'matrix' });
    expect(chart.circle()).toBeInstanceOf(Circle);
    expect(chart.options()).toEqual({ type: 'circle' });
    expect(chart.keyframe()).toBeInstanceOf(Keyframe);
    expect(chart.options()).toEqual({ type: 'keyframe' });
  });

  it('chart.options() should return view tree', () => {
    const chart = new Chart();
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.nodeName() should build view tree', () => {
    const chart = new Chart();
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.call(chart => chart.nodeName()) should build view tree', () => {
    const chart = new Chart();
    chart.call((chart) => chart.interval()).call((chart) => chart.point());
    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.nodeName() should build nested view tree', () => {
    const chart = new Chart();
    chart
      .flex()
      .call((node) => node.interval())
      .call((node) =>
        node
          .flex()
          .call((node) => node.line())
          .call((node) => node.point()),
      );
    expect(chart.options()).toEqual({
      type: 'flex',
      children: [
        { type: 'interval' },
        { type: 'flex', children: [{ type: 'line' }, { type: 'point' }] },
      ],
    });
  });

  it('chart.render() should render chart', () => {
    const chart = new Chart({
      container: createDiv(),
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    expect(chart.render()).toBe(chart);
  });

  it('chart.context() should return rendering context', () => {
    const chart = new Chart({
      container: createDiv(),
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    const context = chart.context();
    expect(context.canvas).toBeUndefined();
    expect(context.library).toEqual(createLibrary());
    chart.render();
    expect(context.canvas).toBeInstanceOf(Canvas);
  });

  it('chart.render({...}) should rerender chart with updated data', () => {
    const div = createDiv();
    const button = document.createElement('button');
    button.innerText = 'Update';
    div.appendChild(button);

    const chart = new Chart({
      container: div,
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    chart.render();

    button.onclick = () => {
      chart.data([
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
      ]);
      chart.render();
    };
  });
});
