import { Variable } from '../../../../../src/chart/layout/constraint';

describe('constraint', () => {
  it('Variable', () => {
    const v = new Variable();

    v.value = 1;
    expect(v.value).toBe(1);

    expect(v.name).toBe(`𝒳_1`);

    const v1 = new Variable('v1');
    expect(v1.name).toBe('v1');
  });
});
