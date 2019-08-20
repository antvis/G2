import { expect } from 'chai';
import * as Factory from '../../../src/element/factory';
import Element from '../../../src/element/base';

describe('Element Factory', () => {
  it('registerElement && getElement', () => {
    Factory.registerElement('basic', Element);

    expect(Factory.getElement('basic')).to.eql(Element);
    expect(() => {
      Factory.registerElement('basic', 123);
    }).to.throw();
  });
});
