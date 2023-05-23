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

  it('node.attr(key, undefined) should update value to undefined', () => {
    const node = new Node({ a: 1 });
    const n1 = node.attr('a', undefined);
    expect(node.value).toEqual({ a: undefined });
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

  it('node.getNodeByType(type) should return the first node.', () => {
    const node = new Node({ a: 1 }, 'a');
    const n1 = node.append(Node);
    n1.type = 'b';
    const n2 = node.append(Node);
    n2.type = 'b';
    expect(node.getNodeByType('b')).toBe(n1);
  });

  it('node.getNodesByType(type) should get the children node by type.', () => {
    const node = new Node({ a: 1 }, 'node1');
    const n1 = node.append(Node);
    n1.type = 'n';
    const n2 = n1.append(Node);
    n2.type = 'n';
    const targetNodes = node.getNodesByType('n');
    expect(targetNodes.length).toEqual(2);
  });

  it('node.getNodesByType(type) should get nodes by type.', () => {
    const node = new Node({ a: 1 }, 'node1');
    let targetNodes = node.getNodesByType('node1');

    expect(targetNodes.length).toEqual(1);
    expect(targetNodes[0]).toBe(node);

    const n1 = node.append(Node);
    n1.type = 'n';
    const n2 = n1.append(Node);
    n2.type = 'n';
    targetNodes = node.getNodesByType('n');
    expect(targetNodes.length).toEqual(2);
    expect(targetNodes[0]).toBe(n1);

    expect(node.getNodesByType('undefined')).toEqual([]);
  });

  it('node.getNodeByKey(key) should get the node by key.', () => {
    const node = new Node({ a: 1 });
    node.value['key'] = 'node1';

    expect(node.getNodeByKey('node1')).toEqual(node);

    const n1 = node.append(Node);
    n1.attr('key', 'n1');
    const n2 = n1.append(Node);
    n2.attr('key', 'n2');

    expect(node.getNodeByKey('n1')).toEqual(n1);
    expect(n1.getNodeByKey('n2')).toEqual(n2);

    expect(node.getNodeByKey('undefined')).toEqual(null);
  });

  it('node.remove() should delete the node.', () => {
    const node = new Node({ a: 1 });

    const n1 = node.append(Node);
    n1.attr('key', 'n1');

    expect(node.children.length).toEqual(1);
    const targetNode = node.getNodeByKey('n1');
    expect(targetNode.remove()).toEqual(targetNode);
    expect(node.children.length).toEqual(0);
  });
});
