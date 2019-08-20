import { expect } from 'chai';
import { getFacet, registerFacet } from '../../../src/facet';

describe('facet factory', () => {
  it('registerFacet & getFacet', () => {
    expect(getFacet('not-exist')).equal(undefined);
    expect(getFacet('rect')).not.equal(undefined);
    expect(getFacet('Rect')).not.equal(undefined);

    class A {}
    registerFacet('xxx', A);

    expect(getFacet('xxx')).equal(A);
  });
});
