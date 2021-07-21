import { Interaction, grammar } from '../../../../src';

describe('grammar', () => {
  it('action', () => {
    expect(grammar.getAction('a')).toBeFalsy();
    grammar.registerAction('a', grammar.Action);
    expect(grammar.getAction('A')).toBeTruthy();
  });

  it('parse', () => {
    const Ctor = grammar.parse({});
    expect(new Ctor(undefined, undefined)).toBeInstanceOf(Interaction);
  });
});
