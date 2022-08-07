import { Chart } from '../../../src';
import { optionsOf } from '../../../src/api/chart';
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
  AnnotationBadge,
  AnnotationLineX,
  AnnotationLineY,
  AnnotationRange,
  AnnotationRangeX,
  AnnotationRangeY,
  AnnotationText,
  AnnotationConnector,
} from '../../../src/api/mark';
import { createDiv } from '../../utils/dom';

describe('Chart', () => {
  it('Chart() should have expected defaults', () => {
    const chart = new Chart();
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({});
    expect(chart['container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should support HTML container', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
    });
    expect(chart['container']).toBe(container);
  });

  it('Chart({...}) should support id container', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'root');
    document.body.appendChild(div);
    const chart = new Chart({
      container: 'root',
    });
    expect(chart['container']).toBe(div);
  });

  it('Chart({...}) should support undefined container', () => {
    const chart = new Chart();
    expect(chart['container'].nodeName).toBe('DIV');
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

  it('chart.data(data) should specify data options', () => {
    const chart = new Chart();
    const data = [1, 2, 3];
    chart.data([1, 2, 3]);
    expect(optionsOf(chart).data).toEqual(data);
  });

  it('chart.data() should return current data', () => {
    const chart = new Chart();
    const data = [1, 2, 3];
    chart.data([1, 2, 3]);
    expect(chart.data()).toEqual(data);
  });

  it('chart.title() should specify title options', () => {
    const chart = new Chart();
    chart.title({ text: 'hello world' });
    expect(optionsOf(chart).title).toEqual({ text: 'hello world' });
  });

  it('chart.coordinate() should specify coordinate options', () => {
    const chart = new Chart();
    chart.coordinate({ type: 'polar' });
    expect(optionsOf(chart).coordinate).toEqual([{ type: 'polar' }]);
  });

  it('chart.key() should specify key options', () => {
    const chart = new Chart();
    chart.key('a');
    expect(optionsOf(chart).key).toBe('a');
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
    expect(chart.annotationBadge()).toBeInstanceOf(AnnotationBadge);
    expect(chart.annotationLineX()).toBeInstanceOf(AnnotationLineX);
    expect(chart.annotationLineY()).toBeInstanceOf(AnnotationLineY);
    expect(chart.annotationRange()).toBeInstanceOf(AnnotationRange);
    expect(chart.annotationRangeX()).toBeInstanceOf(AnnotationRangeX);
    expect(chart.annotationRangeY()).toBeInstanceOf(AnnotationRangeY);
    expect(chart.annotationText()).toBeInstanceOf(AnnotationText);
    expect(chart.annotationConnector()).toBeInstanceOf(AnnotationConnector);
  });

  it('chart.nodeName() should build view tree', () => {
    const chart = new Chart();
    chart.interval();
    chart.point();
    expect(optionsOf(chart)).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.pipe(chart => chart.nodeName()) should build view tree', () => {
    const chart = new Chart();
    chart.pipe((chart) => chart.interval()).pipe((chart) => chart.point());
    expect(optionsOf(chart)).toEqual({
      type: 'view',
      children: [{ type: 'interval' }, { type: 'point' }],
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
});
