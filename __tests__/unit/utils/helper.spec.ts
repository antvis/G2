// import { flow } from '../../../src/transform/utils/flow';
import { delay } from '../../utils/delay';

describe('helper utils', () => {
  it('', () => {});
  // it('flow(target, source) returns a instance has `set` and `setAsync` properties, where each could be invoked and return the `this` binding of the created instance', async () => {
  //   const context = flow({}, {});
  //   expect(typeof context.set).toBe('function');
  //   expect(typeof context.setAsync).toBe('function');

  //   expect(context.set('test')).toBe(context);
  //   expect(await context.setAsync('test')).toBe(context);
  // });

  // it('flow(target, source).set(key) sets the value at `key` of target. The value is collected from source, supports customize', () => {
  //   const target: any = {};
  //   flow(target, { a: 'hello', b: 2 })
  //     .set('a')
  //     .set('b', (v) => v + 1)
  //     .set('c');
  //   expect(target.a).toBe('hello');
  //   expect(target.b).toBe(3);
  //   expect(target.c).toBeUndefined();
  // });

  // it('flow(target, source).set(key) excepts to invoke `target[key]` if it is a function, and supports callback', () => {
  //   let fontSize = 0;
  //   const target = { a: 1, fontSize: (d) => (fontSize = d) };

  //   flow(target, { a: 1, size: 10, fontSize: 12 })
  //     .set('fontSize')
  //     .set('size', null, (v) => (target.a = v));
  //   expect(fontSize).toBe(12);
  //   expect(target.a).toBe(10);
  //   expect(typeof target.fontSize).toBe('function');
  // });

  // it('flows(target, source).setAsync(...) is the same as flow().set(...)', async () => {
  //   const target: any = {};
  //   const context = await flow(target, { a: 'hello', b: 2 });

  //   await context.setAsync('a');
  //   expect(target.a).toBe('hello');
  //   await context.setAsync('b', (v) => {
  //     delay(100);
  //     return v + 1;
  //   });
  //   expect(target.b).toBe(3);

  //   await context.setAsync('c');
  //   expect(target.c).toBeUndefined();
  // });
});
