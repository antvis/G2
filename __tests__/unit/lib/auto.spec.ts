import { autolib } from '../../../src/lib';
import { Auto } from '../../../src';

describe('autolib', () => {
  it('autolib() should returns expected autolib components.', () => {
    expect(autolib()).toEqual({
      'mark.auto': Auto,
    });
  });
});
