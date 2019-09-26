import { expect } from 'chai';
import { VER } from '../../src';

describe('G2', () => {
  it('export', () => {
    expect(VER).to.equals('4.0.0-beta.1');
  });
});
