import { PaddingCal } from '../../../../src/chart/layout/padding-cal';
import { DIRECTION } from '../../../../src';
import { BBox } from '../../../../src/dependents';

describe('padding-cal', () => {
  it('default padding', () => {
    let pc = new PaddingCal();
    expect(pc.getPadding()).toEqual([0, 0, 0, 0]);
    pc = new PaddingCal(1);
    expect(pc.getPadding()).toEqual([1, 0, 0, 0]);
    pc = new PaddingCal(1, 1);
    expect(pc.getPadding()).toEqual([1, 1, 0, 0]);
    pc = new PaddingCal(1, 1, 1);
    expect(pc.getPadding()).toEqual([1, 1, 1, 0]);
    pc = new PaddingCal(1, 1, 1,1);
    expect(pc.getPadding()).toEqual([1, 1, 1, 1]);
  });

  it('shrink', () => {
    const pc = new PaddingCal();
    const p: [number, number, number, number] = [1, 2, 3, 4];
    pc.shrink(p);
    expect(pc.getPadding()).toEqual(p);
  });

  it('inc', () => {
    const pc = new PaddingCal();
    const bbox = { width: 8, height: 16 } as BBox;

    pc.inc(bbox, DIRECTION.TOP);
    pc.inc(bbox, DIRECTION.RIGHT);
    pc.inc(bbox, DIRECTION.BOTTOM);
    pc.inc(bbox, DIRECTION.LEFT);

    expect(pc.getPadding()).toEqual([16, 8, 16, 8]);
  });
});
