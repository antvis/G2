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

  it('node.map(transform) apply specified transform to current value and clone a new node.', () => {
    const node = new Node({ a: 1 });
    const n1 = node.map();
    const n2 = node.map(({ a }) => ({ a: a * 2 }));
    expect(node.value).toEqual({ a: 1 });
    expect(n1).toBeInstanceOf(Node);
    expect(n1.value).toEqual({ a: 1 });
    expect(n2.value).toEqual({ a: 2 });
    expect(n1).not.toBe(node);
    expect(n1).not.toBe(n2);
    expect(n2).not.toBe(node);
  });

  it('node.map(transform) should mount the return node to its parentNode.', () => {
    const node = new Node();
    const child = node.append(Node);
    const c1 = child.map();
    expect(c1.parentNode).toBe(child.parentNode);
    expect(c1.index).toBe(child.index);
    expect(c1.children).toBe(child.children);
    expect(c1.parentNode).toBe(node);
    expect(node.children[0]).toBe(c1);
  });

  it('node.attr(key, value) should update value and return a new clone node.', () => {
    const node = new Node({ a: 1 });
    const n1 = node.attr('a', 2);
    expect(node.value).toEqual({ a: 1 });
    expect(n1).not.toBe(node);
    expect(n1).toBeInstanceOf(Node);
    expect(n1.value).toEqual({ a: 2 });
    expect(n1.parentNode).toBe(node.parentNode);
    expect(n1.index).toBe(node.index);
    expect(n1.children).toBe(node.children);
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

  it('node.pipe(callback) should apply specified callback to a new cloned node.', () => {
    const node = new Node({ a: 1 });
    const n1 = node.pipe((node) => node.attr('a', 2));
    expect(node.value).toEqual({ a: 1 });
    expect(n1).not.toBe(node);
    expect(n1).toBeInstanceOf(Node);
    expect(n1.value).toEqual({ a: 2 });
    expect(n1.parentNode).toBe(node.parentNode);
    expect(n1.index).toBe(node.index);
    expect(n1.children).toBe(node.children);
  });

  it('node.pipe(callback, ...args) should apply specified callback with args.', () => {
    const node = new Node({ a: 1 });
    const multiple = (node, t) => node.attr('a', node.attr('a') * t);
    const n1 = node.pipe(multiple, 2);
    expect(node.value).toEqual({ a: 1 });
    expect(n1.value).toEqual({ a: 2 });
  });
});
