import { getChartSize } from '../../../src/util/dom';
import { createDiv } from '../../util/dom';

const minDiv = createDiv();
minDiv.setAttribute('style', 'display: inline-block; width: 30px; height: 30px');

const maxDiv = createDiv();
maxDiv.setAttribute('style', 'display: inline-block; width: 500px; height: 500px');

describe('util padding', () => {
  it('getChartSize', () => {
    expect(getChartSize(minDiv, false, 200, 200)).toEqual({ width: 200, height: 200 });
    expect(getChartSize(minDiv, false, 50, 50)).toEqual({ width: 100, height: 100 });
    expect(getChartSize(minDiv, false, 200, 50)).toEqual({ width: 200, height: 100 });

    expect(getChartSize(maxDiv, true, 200, 50)).toEqual({ width: 500, height: 500 });
    expect(getChartSize(minDiv, true, 200, 50)).toEqual({ width: 100, height: 100 });

    expect(getChartSize(minDiv, false, NaN, undefined)).toEqual({ width: 100, height: 100 });
  });
});
