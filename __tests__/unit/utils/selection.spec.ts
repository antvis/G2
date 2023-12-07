import {
  DisplayObject,
  Group,
  Rect,
  Circle,
  Path,
  Text,
  Ellipse,
  Image,
  Line,
  Polygon,
  Polyline,
  HTML,
  CustomEvent,
} from '@antv/g';
import { G2Element, select, Selection } from '../../../src/utils/selection';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

describe('select', () => {
  it('select(node) should return a new selection with expected defaults', () => {
    const canvas = createNodeGCanvas(300, 200);
    const selection = select(canvas.document.documentElement);
    expect(selection).toBeInstanceOf(Selection);

    // @ts-ignore
    expect(selection._elements).toEqual([canvas.document.documentElement]);
    // @ts-ignore
    expect(selection._data).toBeNull();
    // @ts-ignore
    expect(selection._parent).toBe(canvas.document.documentElement);
    // @ts-ignore
    expect(selection._document).toBe(
      canvas.document.documentElement.ownerDocument,
    );
  });

  it('Selection.registry should have expected defaults', () => {
    expect(Selection.registry).toEqual({
      g: Group,
      rect: Rect,
      circle: Circle,
      path: Path,
      text: Text,
      ellipse: Ellipse,
      image: Image,
      line: Line,
      polygon: Polygon,
      polyline: Polyline,
      html: HTML,
    });
  });

  it('Selection.select(selector) should return a new selection with the first match element selected', async () => {
    const canvas = createNodeGCanvas(300, 200);

    await canvas.ready;

    const selection = select(canvas.document.documentElement);
    selection.append('rect').attr('className', 'cls');

    const rect1 = selection.select('.cls');
    expect(rect1).not.toBe(selection);
    // @ts-ignore
    expect(rect1._elements).toEqual([rect1.node()]);
    // @ts-ignore
    expect(rect1._parent).toBe(rect1.node());

    const rect2 = selection.select(rect1.node());
    // @ts-ignore
    expect(rect2._elements).toEqual([rect1.node()]);

    expect(selection.select('circle').nodes()[0]).toBeNull();
  });

  it('Selection.selectAll(selector) should returns a new selection with all match element selected', async () => {
    const canvas = createNodeGCanvas(300, 200);

    await canvas.ready;

    const selection = select(canvas.document.documentElement);
    selection.append('rect').attr('className', 'cls');
    selection.append('rect').attr('className', 'cls');
    selection.append('rect').attr('className', 'cls');

    const rect1 = selection.selectAll('.cls');
    expect(rect1).not.toBe(selection);
    // @ts-ignore
    expect(rect1._elements.length).toEqual(3);
    // @ts-ignore
    expect(rect1._parent).toBe(selection.node());

    const rect2 = selection.selectAll(rect1.nodes());
    // @ts-ignore
    expect(rect2._elements).toEqual(rect1.nodes());
  });

  it('Selection.append(node) should append node to each selected elements for non-empty selection and return the new selection', async () => {
    const canvas = createNodeGCanvas(300, 200);

    await canvas.ready;

    const selection = select(canvas.document.documentElement);

    const s1 = selection.append('rect');
    const rect = s1.node();
    const rect1 = selection.append('rect').node();
    const rect2 = selection.append('rect').node();
    const s2 = selection.selectAll('rect').append('circle');
    const circles = s2.nodes();

    expect(s1).not.toBe(selection);
    // @ts-ignore
    expect(s2._parent).toBe(circles[0]);
    expect(rect.parentElement).toBe(canvas.document.documentElement);
    expect(circles[0].parentElement).toBe(rect);
    expect(circles[1].parentElement).toBe(rect1);
    expect(circles[2].parentElement).toBe(rect2);
  });

  it('Selection.append(node) should append nodes with data to parent for empty selection and return the new selection', () => {
    const group = new Group();
    const data = [1, 2, 3];
    const selection = new Selection([], data, group, group.ownerDocument);

    const s1 = selection.append('rect');
    const nodes = s1.nodes();
    expect(s1).not.toBe(selection);
    expect(nodes[0].__data__).toBe(1);
    expect(nodes[1].__data__).toBe(2);
    expect(nodes[2].__data__).toBe(3);

    const s2 = selection.append((d, i) => {
      expect(d).toBe(data[i]);
      return new Rect();
    });
    // @ts-ignore
    expect(s2._parent).toBe(selection._parent);
  });

  it('Selection.append(node) should throw error with unknown node type', () => {
    const group = new Group();
    const selection = select(group);
    expect(() => {
      selection.append('hello');
    }).toThrowError();
  });

  it('Selection.data(data) should bind data to nodes', () => {
    const group = new Group();
    const selection = select(group);

    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();
    selection
      .append(() => ((rect1.__data__ = 1), rect1))
      .attr('className', 'cls');
    selection
      .append(() => ((rect2.__data__ = 2), rect2))
      .attr('className', 'cls');
    selection
      .append(() => ((rect3.__data__ = 3), rect3))
      .attr('className', 'cls');

    const data = [2, 3, 4];
    const s1 = selection.selectAll('.cls').data(data);

    expect(s1).not.toBe(selection);

    // @ts-ignore
    expect(s1._enter._parent).toBe(selection._parent);
    // @ts-ignore
    expect(s1._enter._elements).toEqual([]);
    // @ts-ignore
    expect(s1._enter._data).toEqual([4]);

    // @ts-ignore
    expect(s1._update._parent).toBe(selection._parent);
    // @ts-ignore
    expect(s1._update._elements.map((d) => d.__data__)).toEqual([2, 3]);
    // @ts-ignore
    expect(s1._update._data).toEqual(null);

    // @ts-ignore
    expect(s1._exit._parent).toBe(selection._parent);
    // @ts-ignore
    expect(s1._exit._elements.map((d) => d.__data__)).toEqual([1]);
    // @ts-ignore
    expect(s1._exit._data).toEqual(null);
  });

  it('Selection.data(data, key) should use specified key accessor and update data for update selection', () => {
    const group = new Group();
    const selection = select(group);

    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();
    selection
      .append(() => ((rect1.__data__ = { id: 1, a: 1 }), rect1))
      .attr('className', 'cls');
    selection
      .append(() => ((rect2.__data__ = { id: 2, a: 1 }), rect2))
      .attr('className', 'cls');
    selection
      .append(() => ((rect3.__data__ = { id: 3, a: 1 }), rect3))
      .attr('className', 'cls');

    const data = [{ id: 2 }, { id: 3 }, { id: 4 }];
    const s1 = selection.selectAll('.cls').data(data, (d) => d.id);
    expect(s1).not.toBe(selection);

    // @ts-ignore
    expect(s1._enter._parent).toBe(selection._parent);
    // @ts-ignore
    expect(s1._enter._elements).toEqual([]);
    // @ts-ignore
    expect(s1._enter._data).toEqual([{ id: 4 }]);

    // @ts-ignore
    expect(s1._update._parent).toBe(selection._parent);
    // @ts-ignore
    expect(s1._update._elements.map((d) => d.__data__)).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
    // @ts-ignore
    expect(s1._update._data).toEqual(null);

    // @ts-ignore
    expect(s1._exit._parent).toBe(selection._parent);
    // @ts-ignore
    expect(s1._exit._elements.map((d) => d.__data__)).toEqual([
      { id: 1, a: 1 },
    ]);
    // @ts-ignore
    expect(s1._exit._data).toEqual(null);
  });

  it('Selection.merge(selection) should merge the selected elements of two selection', () => {
    const group = new Group();
    const selection = select(group);

    const s1 = selection.append('rect');
    const s2 = selection.append('rect');
    expect(s1.merge(s2).nodes().length).toBe(2);
    expect(s1.nodes().length).toBe(1);
    expect(s2.nodes().length).toBe(1);
  });

  it('Selection.join(enter, update, exit) should apply default function for each selection and merge them into one selection', () => {
    const group = new Group();
    const selection = select(group);

    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();
    selection
      .append(() => ((rect1.__data__ = 1), rect1))
      .attr('className', 'cls');
    selection
      .append(() => ((rect2.__data__ = 2), rect2))
      .attr('className', 'cls');
    selection
      .append(() => ((rect3.__data__ = 3), rect3))
      .attr('className', 'cls');

    const data = [2, 3, 4];
    expect(
      selection
        .selectAll('.cls')
        .data(data)
        .join((enter) => enter.append('rect'))
        .call((selection) =>
          expect(selection.nodes().map((d) => d.__data__)).toEqual([2, 3, 4]),
        ),
    ).not.toBe(selection);
    expect(group.childNodes.length).toBe(3);
  });

  it('Selection.join(enter, update, exit) should apply custom function', () => {
    const group = new Group();
    const selection = select(group);

    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();
    selection
      .append(() => ((rect1.__data__ = 1), rect1))
      .attr('className', 'cls');
    selection
      .append(() => ((rect2.__data__ = 2), rect2))
      .attr('className', 'cls');
    selection
      .append(() => ((rect3.__data__ = 3), rect3))
      .attr('className', 'cls');

    const data = [2, 3, 4];
    selection
      .selectAll('.cls')
      .data(data)
      .join(
        (enter) => enter.append('rect'),
        (update) => update.style('fill', 'red'),
        (exit) => exit,
      )
      .call((selection) =>
        expect(selection.nodes().map((d) => d.__data__)).toEqual([2, 3, 4, 1]),
      );
    expect(selection.selectAll('.cls').nodes()[1].style.fill).toBe('red');
  });

  it('Selection.remove() should remove selected elements', () => {
    const group = new Group();
    const selection = select(group);

    selection.append('rect');
    selection.append('rect');
    selection.append('rect');

    const s = selection.selectAll('rect').remove();
    expect(s.nodes().length).toBe(0);
    expect(group.childNodes.length).toBe(0);
  });

  it('Selection.each() should apply function for each selected element', () => {
    const group = new Group();
    const selection = select(group);
    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();

    selection.append(() => ((rect1.__data__ = 1), rect1));
    selection.append(() => ((rect2.__data__ = 2), rect2));
    selection.append(() => ((rect3.__data__ = 3), rect3));

    const R = [rect1, rect2, rect3];
    const data = [1, 2, 3];
    const s1 = selection.selectAll('rect');
    expect(
      s1.each(function (d, i, element) {
        expect(d).toBe(data[i]);
        expect(element).toBe(R[i]);
      }),
    ).toBe(s1);
  });

  it('Selection.call() should call the callback for the selection', () => {
    const group = new Group();
    const selection = select(group);
    const append = (selection: Selection, node: DisplayObject) =>
      selection.append(() => node);
    selection.call(append, new Rect({}));
    expect(group.childNodes.length).toBe(1);
  });

  it('Selection.node() should return the first element of selected elements', () => {
    const group = new Group();
    const selection = select(group);
    const node = new Rect({});
    expect(selection.select(node).node()).toBe(node);
  });

  it('Selection.attr() should set defined attributes', () => {
    const group = new Group();
    const selection = select(group);

    selection.append('rect');
    expect(
      selection
        .select('rect')
        .attr('className', 'cls')
        .attr('className', undefined)
        .node().className,
    ).toBe('cls');
  });

  it('Selection.attr() should accept callback', () => {
    const group = new Group();
    const selection = select(group);
    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();
    const data = [1, 2, 3];
    selection.append(() => ((rect1.__data__ = 1), rect1));
    selection.append(() => ((rect2.__data__ = 2), rect2));
    selection.append(() => ((rect3.__data__ = 3), rect3));

    selection.selectAll('rect').attr('className', (d, i) => {
      expect(d).toBe(data[i]);
    });
  });

  it('Selection.style() should set defined styles', () => {
    const group = new Group();
    const selection = select(group);
    selection.append('rect');
    expect(
      selection
        .select('rect')
        .style('fill', 'red')
        .style('fill', undefined)
        .node().style.fill,
    ).toBe('red');
  });

  it('Selection.style() should accept callback', () => {
    const group = new Group();
    const selection = select(group);
    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();
    const data = [1, 2, 3];
    selection.append(() => ((rect1.__data__ = 1), rect1));
    selection.append(() => ((rect2.__data__ = 2), rect2));
    selection.append(() => ((rect3.__data__ = 3), rect3));
    selection.selectAll('rect').style('fill', (d, i) => {
      expect(d).toBe(data[i]);
    });
  });

  it('Selection.nodes() should return all the selected elements', () => {
    const group = new Group();
    const selection = select(group);
    const rect1: G2Element = new Rect();
    const rect2: G2Element = new Rect();
    const rect3: G2Element = new Rect();

    selection.append(() => rect1);
    selection.append(() => rect2);
    selection.append(() => rect3);

    expect(selection.selectAll('rect').nodes()[0]).toBe(rect1);
    expect(selection.selectAll('rect').nodes()[1]).toBe(rect2);
    expect(selection.selectAll('rect').nodes()[2]).toBe(rect3);
  });

  it('Selection.on() should register event', async () => {
    const canvas = createNodeGCanvas(300, 200);

    await canvas.ready;

    const selection = select(canvas.document.documentElement);

    const fn = jest.fn();
    const event = new CustomEvent('build');
    const circle = selection
      .append('circle')
      .on('build', () => fn())
      .on('build', () => (fn(), fn()))
      .node();

    circle.dispatchEvent(event);
    expect(fn).toBeCalledTimes(3);
  });
});
