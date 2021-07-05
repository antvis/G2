import { Dodge, Jitter, Stack, Symmetric, Identity } from '../../../../src/visual/adjust';

describe('adjust', () => {
  it('export', () => {
    expect(Dodge).toBeDefined();
    expect(Jitter).toBeDefined();
    expect(Stack).toBeDefined();
    expect(Symmetric).toBeDefined();
    expect(Identity).toBeDefined();
  });
});
