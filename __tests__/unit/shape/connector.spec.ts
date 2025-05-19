import { vi } from 'vitest';
import type { Vector2 } from '../../../src/runtime';
import { Connector } from '../../../src/shape/connector/connector';
import * as coordinateUtils from '../../../src/utils/coordinate';

vi.mock('../../../src/utils/coordinate', () => ({
  isTranspose: vi.fn().mockReturnValue(false),
}));

const mockDocument = {};

describe('Connector offsetX', () => {
  let mockContext;
  let points: Vector2[];
  const mockIsTranspose = coordinateUtils.isTranspose;

  beforeEach(() => {
    mockContext = { coordinate: {}, document: mockDocument };
    points = [
      [100, 100],
      [300, 200],
    ];
    mockIsTranspose.mockReset();
    mockIsTranspose.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('In a regular coordinate system', () => {
    it('should correctly apply the offsetX parameter', () => {
      const connector1 = Connector({}, mockContext);
      const connector2 = Connector({ offsetX: 20 }, mockContext);
      const connector3 = Connector({ offsetX: -20 }, mockContext);

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});
      const path3 = connector3(points, {}, {});

      const d1 = path1.style.d;
      const d2 = path2.style.d;
      const d3 = path3.style.d;

      expect(d2).not.toBe(d1);
      expect(d3).not.toBe(d1);
      expect(d3).not.toBe(d2);

      expect(coordinateUtils.isTranspose).toHaveBeenCalled();
    });

    it('sourceOffsetX and targetOffsetX should take precedence over offsetX', () => {
      const connector1 = Connector({ offsetX: 15 }, mockContext);
      const connector2 = Connector(
        {
          offsetX: 15,
          sourceOffsetX: 10,
          targetOffsetX: 20,
        },
        mockContext,
      );

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});

      expect(path2.style.d).not.toBe(path1.style.d);
    });

    it('offsetY and offsetX should be combinable', () => {
      const connector1 = Connector({ offsetY: 10 }, mockContext);

      const connector2 = Connector(
        {
          offsetY: 10,
          offsetX: 15,
        },
        mockContext,
      );

      const connector3 = Connector(
        {
          offsetY: 10,
          sourceOffsetY: 15,
          targetOffsetY: 20,
          offsetX: 15,
          sourceOffsetX: 10,
          targetOffsetX: 25,
        },
        mockContext,
      );

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});
      const path3 = connector3(points, {}, {});

      expect(path2.style.d).not.toBe(path1.style.d);
      expect(path3.style.d).not.toBe(path1.style.d);
      expect(path3.style.d).not.toBe(path2.style.d);
    });
  });

  describe('In a transposed coordinate system', () => {
    beforeEach(() => {
      mockIsTranspose.mockReturnValue(true);
    });

    it('should correctly apply the offsetX parameter', () => {
      const connector1 = Connector({}, mockContext);
      const connector2 = Connector({ offsetX: 20 }, mockContext);
      const connector3 = Connector({ offsetX: -20 }, mockContext);

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});
      const path3 = connector3(points, {}, {});

      const d1 = path1.style.d;
      const d2 = path2.style.d;
      const d3 = path3.style.d;

      expect(d2).not.toBe(d1);
      expect(d3).not.toBe(d1);
      expect(d3).not.toBe(d2);

      expect(coordinateUtils.isTranspose).toHaveBeenCalled();
    });

    it('sourceOffsetX and targetOffsetX should independently set start and end offsets', () => {
      const connector1 = Connector({ offsetX: 20 }, mockContext);
      const connector2 = Connector(
        { sourceOffsetX: 20, targetOffsetX: -20 },
        mockContext,
      );

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});

      expect(path2.style.d).not.toBe(path1.style.d);
    });

    it('should maintain consistent behavior across different coordinate systems', () => {
      const connectorTransposed = Connector({ offsetX: 20 }, mockContext);
      const pathTransposed = connectorTransposed(points, {}, {}).style.d;

      mockIsTranspose.mockReturnValue(false);

      const connectorNormal = Connector({ offsetX: 20 }, mockContext);
      const pathNormal = connectorNormal(points, {}, {}).style.d;

      expect(pathTransposed).not.toBe(pathNormal);
      expect(coordinateUtils.isTranspose).toHaveBeenCalledTimes(2);
    });
  });

  describe('Default value behavior', () => {
    it('default value of offsetX should be 0', () => {
      const connector1 = Connector({}, mockContext);
      const connector2 = Connector({ offsetX: 0 }, mockContext);

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});

      expect(path1.style.d).toBe(path2.style.d);
    });

    it('sourceOffsetX and targetOffsetX should use offsetX value when not specified', () => {
      const connector1 = Connector({ offsetX: 15 }, mockContext);
      const connector2 = Connector(
        {
          offsetX: 15,
          sourceOffsetX: 15,
          targetOffsetX: 15,
        },
        mockContext,
      );

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});

      expect(path1.style.d).toBe(path2.style.d);
    });
  });
});
