import { Dodge, Jitter, Stack, Symmetric, Identity } from '../../../src/visual/adjust';
import { createAdjust } from '../../../src/util/adjust';

describe('adjust', () => {
  it('createAdjust', () => {
    expect(createAdjust('dodge', {})).toBeInstanceOf(Dodge);
    expect(createAdjust('jitter', {})).toBeInstanceOf(Jitter);
    expect(createAdjust('stack', {})).toBeInstanceOf(Stack);
    expect(createAdjust('Symmetric', {})).toBeInstanceOf(Symmetric);
    expect(createAdjust('x', {})).toBeInstanceOf(Identity);
  });
});
