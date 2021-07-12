import { BBox, getRegionBBox } from '../../../src/util/bbox';

describe('util/bbox', () => {
  it('BBox', () => {
    const bbox = new BBox(10, 20, 30, 40);

    expect(bbox.x).toBe(10);
    expect(bbox.y).toBe(20);
    expect(bbox.width).toBe(30);
    expect(bbox.height).toBe(40);

    expect(bbox.minX).toBe(10);
    expect(bbox.maxX).toBe(40);
    expect(bbox.minY).toBe(20);
    expect(bbox.maxY).toBe(60);

    expect(bbox.isEqual(new BBox(10, 20, 30, 40))).toBe(true);
    expect(bbox.isEqual(new BBox(10, 20, 30, 30))).toBe(false);
  });

  it('isPointIn', () => {
    const bbox = new BBox(10, 10, 100, 100);

    expect(bbox.isPointIn({ x: 10, y: 10 })).toBe(true);
    expect(bbox.isPointIn({ x: 50, y: 50 })).toBe(true);
    expect(bbox.isPointIn({ x: 120, y: 120 })).toBe(false);
  });

  it('collide', () => {
    expect(BBox.fromRange(100, 100, 200, 200).collide(BBox.fromRange(0, 0, 100, 100))).toBe(false);

    expect(BBox.fromRange(100, 100, 200, 200).collide(BBox.fromRange(150, 150, 170, 170))).toBe(true);
    expect(BBox.fromRange(100, 100, 200, 200).collide(BBox.fromRange(0, 0, 110, 110))).toBe(true);
    expect(BBox.fromRange(100, 100, 200, 200).collide(BBox.fromRange(190, 190, 300, 300))).toBe(true);
  });

  it('getRegionBBox', () => {
    const region = {
      start: { x: 0.1, y: 0.1 },
      end: { x: 0.9, y: 0.9 },
    };

    const bbox = new BBox(10, 10, 100, 100);

    const newBBox = getRegionBBox(bbox, region);

    expect(newBBox.x).toBe(20);
    expect(newBBox.y).toBe(20);
    expect(newBBox.width).toBe(80);
    expect(newBBox.height).toBe(80);
  });
});
