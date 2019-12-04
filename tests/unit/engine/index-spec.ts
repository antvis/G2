import * as CanvasEngine from '@antv/g-canvas';
import * as SVGEngine from '@antv/g-svg';
import { getEngine, registerEngine } from '../../../src/engine';

describe('engine', () => {
  it('api', () => {
    expect(getEngine).toBeDefined();
    expect(registerEngine).toBeDefined();
  });

  it('register', () => {
    // 找不到 throw error
    expect(() => getEngine('xxx')).toThrow("G engine 'xxx' is not exist, please register it at first.");

    // 注册后可以获取
    registerEngine('svg', SVGEngine);
    registerEngine('canvas', CanvasEngine);
    expect(getEngine('svg')).toBe(SVGEngine);
    expect(getEngine('canvas')).toBe(CanvasEngine);

    // 可覆盖
    registerEngine('svg', CanvasEngine);
    expect(getEngine('svg')).toBe(CanvasEngine);
  });
});
