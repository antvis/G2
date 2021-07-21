import { Interaction, getInteraction, registerInteraction } from '../../../src';

describe('interaction', () => {
  it('register', () => {
    expect(getInteraction('a')).toBe(undefined);

    registerInteraction('a', class extends Interaction {
      public init() {}
    });

    expect(getInteraction('a')).toBeTruthy();
  });
});
