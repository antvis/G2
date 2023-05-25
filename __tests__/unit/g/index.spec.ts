import '../../../src';
import { runtime } from '@antv/g';

describe('g.runtime.enableCSSParsing', () => {
  it('should disable enableCSSParsing for g when import.', () => {
    expect(runtime.enableCSSParsing).toBe(false);
  });
});
