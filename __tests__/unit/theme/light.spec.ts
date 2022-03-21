import { Light } from '../../../src/theme';

describe('light', () => {
  it('Light() returns expected defaults', () => {
    expect(Light()).toEqual({
      defaultColor: '#5B8FF9',
      defaultCategory10: 'category10',
      defaultCategory20: 'category20',
    });
  });

  it('Light({...}) overrides expected defaults', () => {
    expect(Light({ defaultColor: 'red' })).toEqual({
      defaultColor: 'red',
      defaultCategory10: 'category10',
      defaultCategory20: 'category20',
    });
  });
});
