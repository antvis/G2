import { DIRECTION } from '../../../src';
import { BBox } from '../../../src/dependents';
import { BBoxProcessor, getRegionBBox } from '../../../src/util/bbox';

describe('util/ bbox', () => {
  it('BBoxProcessor', () => {
    const bbox = new BBox(0, 0, 100, 100);
    const processor = new BBoxProcessor(bbox);

    processor
      .add(new BBox(0, 0, 200, 200), new BBox(100, 100, 250, 250)) // 0, 0, 250, 250
      .merge(new BBox(0, 0, 200, 200), new BBox(50, 50, 150, 150)) // 50, 50, 150, 150
      .cut(new BBox(50, 50, 100, 10), DIRECTION.TOP)
      .cut(new BBox(140, 50, 10, 100), DIRECTION.RIGHT)
      .cut(new BBox(50, 140, 100, 10), DIRECTION.BOTTOM)
      .cut(new BBox(50, 50, 10, 100), DIRECTION.LEFT); // 60, 60, 130, 130

    let newBBox = processor.value();
    expect(newBBox.x).toBe(60);
    expect(newBBox.y).toBe(60);
    expect(newBBox.width).toBe(130);
    expect(newBBox.height).toBe(130);

    processor.shrink([10, 10, 10, 10]);
    newBBox = processor.value();
    expect(newBBox.x).toBe(70);
    expect(newBBox.y).toBe(70);
    expect(newBBox.width).toBe(110);
    expect(newBBox.height).toBe(110);
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
