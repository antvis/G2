import { Connector } from '../../../src/shape/connector/connector';
import * as coordinateUtils from '../../../src/utils/coordinate';
import { Vector2 } from '../../../src/runtime';

jest.mock('../../../src/utils/coordinate', () => ({
  isTranspose: jest.fn().mockReturnValue(false),
}));

const mockDocument = {};

describe('Connector offsetX', () => {
  let mockContext;
  let points: Vector2[];
  const mockIsTranspose = coordinateUtils.isTranspose as jest.Mock;

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
    jest.clearAllMocks();
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

    it('offsetX1 and offsetX2 should take precedence over offsetX', () => {
      const connector1 = Connector({ offsetX: 15 }, mockContext);
      const connector2 = Connector(
        {
          offsetX: 15,
          offsetX1: 10,
          offsetX2: 20,
        },
        mockContext,
      );

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});

      expect(path2.style.d).not.toBe(path1.style.d);
    });

    it('offset and offsetX should be combinable', () => {
      const connector1 = Connector({ offset: 10 }, mockContext);

      const connector2 = Connector(
        {
          offset: 10,
          offsetX: 15,
        },
        mockContext,
      );

      const connector3 = Connector(
        {
          offset: 10,
          offset1: 15,
          offset2: 20,
          offsetX: 15,
          offsetX1: 10,
          offsetX2: 25,
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

    it('offsetX1 and offsetX2 should independently set start and end offsets', () => {
      const connector1 = Connector({ offsetX: 20 }, mockContext);
      const connector2 = Connector(
        { offsetX1: 20, offsetX2: -20 },
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

    it('offsetX1 and offsetX2 should use offsetX value when not specified', () => {
      const connector1 = Connector({ offsetX: 15 }, mockContext);
      const connector2 = Connector(
        {
          offsetX: 15,
          offsetX1: 15,
          offsetX2: 15,
        },
        mockContext,
      );

      const path1 = connector1(points, {}, {});
      const path2 = connector2(points, {}, {});

      expect(path1.style.d).toBe(path2.style.d);
    });
  });
});
