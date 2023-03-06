import { Category10, Category20 } from '../../../src/palette';

describe('palette', () => {
  it('Category10 returns expected colors', () => {
    expect(Category10()).toEqual([
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#6F5EF9',
      '#6DC8EC',
      '#945FB9',
      '#FF9845',
      '#1E9493',
      '#FF99C3',
    ]);
  });

  it('Category20 returns expected colors', () => {
    expect(Category20()).toEqual([
      '#5B8FF9',
      '#CDDDFD',
      '#5AD8A6',
      '#CDF3E4',
      '#5D7092',
      '#CED4DE',
      '#F6BD16',
      '#FCEBB9',
      '#6F5EF9',
      '#D3CEFD',
      '#6DC8EC',
      '#D3EEF9',
      '#945FB9',
      '#DECFEA',
      '#FF9845',
      '#FFE0C7',
      '#1E9493',
      '#BBDEDE',
      '#FF99C3',
      '#FFE0ED',
    ]);
  });
});
