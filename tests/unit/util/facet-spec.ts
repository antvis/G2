import { getFactTitleConfig } from '../../../src/util/facet';
import { DIRECTION } from '../../../src';

describe('util facet', () => {
  it('getFactTitleConfig', () => {
    expect(getFactTitleConfig(DIRECTION.TOP)).toEqual({
      offsetX: 0,
      offsetY: -8,
      style: {
        textAlign: 'center',
        textBaseline: 'bottom',
      }
    });
    expect(getFactTitleConfig(DIRECTION.RIGHT)).toEqual({
      offsetX: 8,
      offsetY: 0,
      style: {
        textAlign: 'left',
        textBaseline: 'middle',
        rotate: Math.PI / 2,
      }
    });
    expect(getFactTitleConfig(DIRECTION.BOTTOM)).toEqual({
      offsetX: 0,
      offsetY: 8,
      style: {
        textAlign: 'center',
        textBaseline: 'top',
      }
    });
    expect(getFactTitleConfig(DIRECTION.LEFT)).toEqual({
      offsetX: -8,
      offsetY: 0,
      style: {
        textAlign: 'right',
        textBaseline: 'middle',
        rotate: Math.PI / 2,
      }
    });
  });
});
