import { invariant, log, LEVEL } from '../../../src/utils/invariant';

describe('invariant', () => {
  it('invariant', () => {
    expect(() => {
      invariant(true, 'not throw');
    }).not.toThrow();
    expect(() => {
      invariant(false, 'throw %s %s!', 'hello', 'world');
    }).toThrow('throw hello world!');
  });

  it('log', () => {
    const fn = jest.fn();
    window.console.error = fn;
    window.console.warn = fn;
    window.console.log = fn;

    log(LEVEL.ERROR, true, 'error %s %s!', 'hello', 'world');
    expect(fn).not.toBeCalled();

    log(LEVEL.ERROR, false, 'error %s %s!', 'hello', 'world');
    expect(fn).toBeCalledWith('AntV_G2: error hello world!');

    log(LEVEL.WARN, false, 'warn %s %s!', 'hello', 'world');
    expect(fn).toBeCalledWith('AntV_G2: warn hello world!');

    log(LEVEL.INFO, false, 'info %s %s!', 'hello', 'world');
    expect(fn).toBeCalledWith('AntV_G2: info hello world!');
  });
});
