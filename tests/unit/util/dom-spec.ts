import { getChartSize, removeDom } from '../../../src/util/dom';
import { createDiv } from '../../util/dom';

const minDiv = createDiv();
minDiv.setAttribute('style', 'display: inline-block; width: 30px; height: 30px');

const maxDiv = createDiv();
maxDiv.id = 'max';
maxDiv.setAttribute('style', 'display: inline-block; width: 500px; height: 500px');

describe('util dom', () => {
  it('getChartSize', () => {
    expect(getChartSize(minDiv, false, 200, 200)).toEqual({ width: 200, height: 200 });
    expect(getChartSize(minDiv, false, 50, 50)).toEqual({ width: 50, height: 50 });
    expect(getChartSize(minDiv, false, 200, 50)).toEqual({ width: 200, height: 50 });

    expect(getChartSize(maxDiv, true, 200, 50)).toEqual({ width: 500, height: 500 });
    expect(getChartSize(minDiv, true, 200, 50)).toEqual({ width: 30, height: 30 });

    expect(getChartSize(minDiv, false, NaN, undefined)).toEqual({ width: 1, height: 1 });
  });

  it('removeDom', () => {
    removeDom(maxDiv);
    expect(document.getElementById('max')).toBeNull();
  });
});
