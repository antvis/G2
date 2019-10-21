import { Facet, getFacet, registerFacet } from '../../../src';

describe('facet', () => {
  it('registerFacet', () => {
    // @ts-ignore
    class A extends Facet {}

    // register same type, do not throw
    registerFacet('test-facet', A);
    registerFacet('test-facet', A);

    expect(getFacet('test-facet')).toBe(A);
    expect(getFacet('TEST-FACET')).toBe(A);

    expect(getFacet('test-not-exist-facet')).toBe(undefined);
  });

  it('build-in facet', () => {
    expect(getFacet('rect')).toBeDefined();
  });
});
