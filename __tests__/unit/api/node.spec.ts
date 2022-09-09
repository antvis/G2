import { Node } from '../../../src/api/node';

describe('Node', () => {
  it('Node() should have expected defaults', () => {
    const node = new Node();
    expect(node.type).toBeUndefined();
    expect(node.parentNode).toBeNull();
    expect(node.value).toEqual({});
    expect(node.index).toBe(0);
  });

  it('Node(value) should override default value', () => {
    const node = new Node({ a: 1 });
    expect(node.value).toEqual({ a: 1 });
  });

  it('node.map(transform) apply specified transform to current value and return itself.', () => {
    const node = new Node({ a: 1 });
    expect(node.value).toEqual({ a: 1 });
    const n1 = node.map();
    expect(n1.value).toEqual({ a: 1 });
    const n2 = node.map(({ a }) => ({ a: a * 2 }));
    expect(n2.value).toEqual({ a: 2 });
    expect(n1).toBeInstanceOf(Node);
    expect(n1).toBe(node);
    expect(n1).toBe(n2);
  });

  it('node.map() should return itself.', () => {
    class N extends Node {}
    const n = new N();
    const n1 = n.map();
    expect(n1).toBe(n1);
  });

  it('node.attr(key, value) should update value and return itself.', () => {
    const node = new Node({ a: 1 });
    const n1 = node.attr('a', 2);
    expect(node.value).toEqual({ a: 2 });
    expect(n1).toBe(node);
  });

  it('node.attr(key) should return specified attribute.', () => {
    const node = new Node({ a: 1 });
    expect(node.attr('a')).toBe(1);
  });

  it('node.append(ctor) should append node to children', () => {
    const node = new Node({ a: 1 });
    const n1 = node.append(Node);
    const n2 = node.append(Node);
    expect(n1.children).toEqual([]);
    expect(n1.parentNode).toBe(node);
    expect(n1.index).toBe(0);
    expect(n2.index).toBe(1);
    expect(node.children[0]).toBe(n1);
    expect(node.children[1]).toBe(n2);
  });

  it('node.call(callback) should apply specified callback to the node.', () => {
    const node = new Node({ a: 1 });
    const n1 = node.call((node) => {
      node.attr('a', 2);
    });
    expect(node.value).toEqual({ a: 2 });
    expect(n1).toBe(node);
  });

  it('node.pipe(callback, ...args) should apply specified callback with args.', () => {
    const node = new Node({ a: 1 });
    const multiple = (node, t) => node.attr('a', node.attr('a') * t);
    expect(node.value).toEqual({ a: 1 });
    const n1 = node.call(multiple, 2);
    expect(n1.value).toEqual({ a: 2 });
  });
});
