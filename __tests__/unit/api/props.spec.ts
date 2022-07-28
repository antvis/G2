import { defineProps } from '../../../src/api/props';
import { Node } from '../../../src/api/node';

describe('defineProps', () => {
  it('defineProps([...]) should define value prop', () => {
    const N = defineProps([{ type: 'value', name: 'a' }])(Node);
    const n = new N({ a: 1 });
    const n1 = n.a(2);
    expect(n.a()).toBe(2);
    expect(n1.a()).toBe(2);
  });

  it('defineProps([...]) should define array prop', () => {
    const N = defineProps([{ type: 'array', name: 'a' }])(Node);
    const n = new N({ a: [1] });
    expect(n.a()).toEqual([1]);
    const n1 = n.a(2);
    expect(n1.a()).toEqual([1, 2]);
    const n2 = n1.a([1, 2, 3]);
    expect(n2.a()).toEqual([1, 2, 3]);
  });

  it('defineProps([...]) should define object prop', () => {
    const N = defineProps([{ type: 'object', name: 'a' }])(Node);
    const n = new N({ a: { b: 1 } });
    expect(n.a()).toEqual({ b: 1 });
    const n1 = n.a('b', 2);
    expect(n1.a()).toEqual({ b: 2 });
    const n2 = n1.a({
      b: 3,
    });
    expect(n2.a()).toEqual({ b: 3 });
  });

  it('defineProps([...]) should define node prop', () => {
    const N = defineProps([{ type: 'node', ctor: Node, name: 'a' }])(Node);
    const n = new N();
    const n1 = n.a();
    expect(n1.parentNode).toBe(n);
    expect(n.children[0]).toBe(n1);
    expect(n1).toBeInstanceOf(Node);
  });
});
