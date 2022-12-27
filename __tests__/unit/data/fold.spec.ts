import { Fold } from '../../../src/data';

describe('fold', () => {
  const data = [
    { country: 'USA', gold: 10, silver: 20 },
    { country: 'Canada', gold: 7, silver: 26 },
  ];

  it('Fold({...}) returns function collapses (or “folds”) one or more data fields into two properties, `key` and `value`', async () => {
    const fold = Fold({ fields: ['gold', 'silver'] });
    const result = await fold(data);
    expect(result).toEqual([
      { key: 'gold', value: 10, country: 'USA', gold: 10, silver: 20 },
      { key: 'silver', value: 20, country: 'USA', gold: 10, silver: 20 },
      { key: 'gold', value: 7, country: 'Canada', gold: 7, silver: 26 },
      { key: 'silver', value: 26, country: 'Canada', gold: 7, silver: 26 },
    ]);
  });

  it('Fold({...}) returns a function collapses data with specified `as`', async () => {
    const fold = Fold({ fields: ['gold', 'silver'], key: 'k', value: 'v' });
    expect(await fold(data)).toEqual([
      { k: 'gold', v: 10, country: 'USA', gold: 10, silver: 20 },
      { k: 'silver', v: 20, country: 'USA', gold: 10, silver: 20 },
      { k: 'gold', v: 7, country: 'Canada', gold: 7, silver: 26 },
      { k: 'silver', v: 26, country: 'Canada', gold: 7, silver: 26 },
    ]);
  });

  it('Fold({...}) not specified `fields`', async () => {
    const fold = Fold({});
    expect(await fold(data)).toEqual(data);
  });
});
