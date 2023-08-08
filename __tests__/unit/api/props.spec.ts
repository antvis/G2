import { defineProps } from '../../../src/api/define';
import { Node } from '../../../src/api/node';

describe('defineProps', () => {
  it('defineProps([...]) should define value prop', () => {
    const N = defineProps({ a: { type: 'value' } })(Node);
    const n = new N({ a: 1 });
    expect(n.a()).toBe(1);
    const n1 = n.a(2);
    expect(n1.a()).toBe(2);
    const n2 = n.a(undefined);
    expect(n2.a()).toBe(undefined);
  });

  it('defineProps([...]) should define keyed value prop', () => {
    const N = defineProps({ a: { type: 'value', key: 'b' } })(Node);
    const n = new N({});
    n.a(2);
    expect(n.value).toEqual({ b: 2 });
  });

  it('defineProps([...]) should define array prop', () => {
    const N = defineProps({ a: { type: 'array' } })(Node);
    const n = new N({ a: [1] });
    expect(n.a()).toEqual([1]);
    const n1 = n.a(2);
    expect(n1.a()).toEqual([1, 2]);
    const n2 = n1.a([1, 2, 3]);
    expect(n2.a()).toEqual([1, 2, 3]);

    const arr = [1, 2, 3];
    const n3 = n2.a(arr);
    expect(n3.a()).toBe(arr);
    expect(n3.a()).toEqual(arr);
    arr.push(4);
    expect(n3.a()).toEqual(arr);

    const n4 = n3.a(undefined);
    expect(n4.a()).toEqual([1, 2, 3, 4, undefined]);
  });

  it('defineProps([...]) should define keyed array prop', () => {
    const N = defineProps({ a: { type: 'array', key: 'b' } })(Node);
    const n = new N({});
    n.a(2);
    expect(n.value).toEqual({ b: [2] });
  });

  it('defineProps([...]) should define object prop', () => {
    const N = defineProps({ a: { type: 'object' } })(Node);
    const n = new N({ a: { b: 1 } });
    expect(n.a()).toEqual({ b: 1 });
    const n1 = n.a('b', 2);
    expect(n1.a()).toEqual({ b: 2 });
    const n2 = n1.a({ b: 3 });
    expect(n2.a()).toEqual({ b: 3 });
    const n3 = n2.a(false);
    expect(n3.a()).toEqual(false);
    const n4 = n3.a(null);
    expect(n4.a()).toEqual(null);
    const n5 = n4.a(undefined);
    expect(n5.a()).toEqual(undefined);
  });

  it('defineProps([...]) should define boolean object prop', () => {
    const N = defineProps({ a: { type: 'object' } })(Node);
    const n = new N();
    n.a('b');
    expect(n.a()).toEqual({ b: true });
    n.a('b', false);
    expect(n.a()).toEqual({ b: false });
  });

  it('defineProps([...]) should define keyed object prop', () => {
    const N = defineProps({ a: { type: 'object', key: 'b' } })(Node);
    const n = new N({});
    n.a('a', 1);
    expect(n.value).toEqual({ b: { a: 1 } });
  });

  it('defineProps([...]) should define node prop', () => {
    const N = defineProps({ a: { type: 'node', ctor: Node } })(Node);
    const n = new N();
    const n1 = n.a();
    expect(n1.parentNode).toBe(n);
    expect(n.children[0]).toBe(n1);
    expect(n1).toBeInstanceOf(Node);
  });

  it('defineProps([...]) should define container prop', () => {
    const N = defineProps({ a: { type: 'container', ctor: Node } })(Node);
    const n = new N();
    const n1 = n.a();
    expect(n1.parentNode).toBe(n);
    expect(n.children[0]).toBe(n1);
    expect(n1).toBeInstanceOf(Node);
    expect(n.type).toBeNull();
  });

  it('definedProps([...]) should define mix prop', () => {
    const N = defineProps({ mix: { type: 'mix' } })(Node);
    const n = new N();
    n.mix('a');
    n.mix('b');
    expect(n.mix()).toEqual({ items: ['a', 'b'] });
    n.mix(['c', 'd']);
    expect(n.mix()).toEqual({ items: ['c', 'd'] });
    n.mix({ items: ['f', 'g'] });
    expect(n.mix()).toEqual({
      items: ['f', 'g'],
    });
    n.mix({ title: 'hello' });
    expect(n.mix()).toEqual({
      title: 'hello',
    });
    n.mix({ name: 'min', channel: 'y' });
    expect(n.mix()).toEqual({
      title: 'hello',
      items: [{ name: 'min', channel: 'y' }],
    });
  });
});
