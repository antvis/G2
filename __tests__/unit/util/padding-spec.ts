import { expect } from 'chai';
import { parsePadding } from '../../../src/util';

describe('util', () => {
  it('parsePadding', () => {
    expect(parsePadding()).to.eql([0, 0, 0, 0]);
    expect(parsePadding(1)).to.eql([1, 1, 1, 1]);
    expect(parsePadding([1])).to.eql([1, 1, 1, 1]);
    expect(parsePadding([1, 2])).to.eql([1, 2, 1, 2]);
    expect(parsePadding([1, 2, 3])).to.eql([1, 2, 3, 2]);
    expect(parsePadding([1, 2, 3, 4])).to.eql([1, 2, 3, 4]);
    expect(parsePadding([1, 2, 3, 4, 5])).to.eql([1, 2, 3, 4]);
  });
});
