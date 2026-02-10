import { Column } from '../../../src/data';

describe('column', () => {
  it('Column({...}) converts column-major format to row-major format', async () => {
    const columnData = {
      'Sepal.Length': [5.1, 4.9, 4.7],
      'Sepal.Width': [3.5, 3.0, 3.2],
      'Petal.Length': [1.4, 1.4, 1.3],
      'Petal.Width': [0.2, 0.2, 0.2],
      Species: ['setosa', 'setosa', 'setosa'],
    };

    const c = Column({ value: columnData });
    const result = await c();

    expect(result).toEqual([
      {
        'Sepal.Length': 5.1,
        'Sepal.Width': 3.5,
        'Petal.Length': 1.4,
        'Petal.Width': 0.2,
        Species: 'setosa',
      },
      {
        'Sepal.Length': 4.9,
        'Sepal.Width': 3.0,
        'Petal.Length': 1.4,
        'Petal.Width': 0.2,
        Species: 'setosa',
      },
      {
        'Sepal.Length': 4.7,
        'Sepal.Width': 3.2,
        'Petal.Length': 1.3,
        'Petal.Width': 0.2,
        Species: 'setosa',
      },
    ]);
  });

  it('Column({...}) handles empty column data', async () => {
    const c = Column({ value: {} });
    const result = await c();
    expect(result).toEqual([]);
  });

  it('Column({...}) handles non-object values', async () => {
    const c = Column({ value: null });
    const result = await c();
    expect(result).toBeNull();
  });

  it('Column({...}) handles non-array values in columns', async () => {
    const notColumnData = {
      a: 'string',
      b: 123,
    };
    const c = Column({ value: notColumnData });
    const result = await c();
    expect(result).toBe(notColumnData);
  });

  it('Column({...}) correctly handles numeric and string columns', async () => {
    const columnData = {
      id: [1, 2, 3],
      name: ['Alice', 'Bob', 'Charlie'],
      score: [95.5, 87.3, 92.1],
    };

    const c = Column({ value: columnData });
    const result = await c();

    expect(result).toEqual([
      { id: 1, name: 'Alice', score: 95.5 },
      { id: 2, name: 'Bob', score: 87.3 },
      { id: 3, name: 'Charlie', score: 92.1 },
    ]);
  });

  it('Column({...}) handles columns with different data types', async () => {
    const columnData = {
      x: [1, 2, 3],
      y: [10, 20, 30],
      category: ['A', 'B', 'C'],
      active: [true, false, true],
      value: [1.1, 2.2, 3.3],
    };

    const c = Column({ value: columnData });
    const result = await c();

    expect(result).toEqual([
      { x: 1, y: 10, category: 'A', active: true, value: 1.1 },
      { x: 2, y: 20, category: 'B', active: false, value: 2.2 },
      { x: 3, y: 30, category: 'C', active: true, value: 3.3 },
    ]);
  });
});
