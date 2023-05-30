import { Venn } from '../../../src/data/venn';

describe('Venn', () => {
  it('Venn({...}) returns function return layout venn data', async () => {
    const data = [
      { sets: ['A'], size: 102, label: 'A' },
      { sets: ['B'], size: 12, label: 'B' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'C'], size: 2, label: 'B&C' },
      { sets: ['A', 'B', 'C'], size: 1 },
    ];
    const v = Venn({
      sets: 'sets',
      size: 'size',
      as: ['_key', '_path'],
    });
    const layout = await v(data);
    expect(layout.length).toBe(7);
    expect(layout[0]._path).toBeInstanceOf(Function);
    expect(layout[6]._key).toBe('A&B&C');
  });
});
