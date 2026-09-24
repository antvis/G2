import { describe, it, expect } from 'vitest';
import { parseRadius } from '../../../src/shape/interval/color';

describe('parseRadius', () => {
  describe('radius as a number', () => {
    it('should apply the same radius to all four corners', () => {
      expect(parseRadius(10)).toEqual([10, 10, 10, 10]);
    });

    it('should return all zeros for radius 0', () => {
      expect(parseRadius(0)).toEqual([0, 0, 0, 0]);
    });
  });

  describe('radius as an array [TL, TR, BR, BL]', () => {
    it('should expand 4-element radius array to corners', () => {
      expect(parseRadius([10, 10, 4, 4])).toEqual([10, 10, 4, 4]);
    });

    it('should fallback missing array elements to 0', () => {
      expect(parseRadius([10, 5])).toEqual([10, 5, 0, 0]);
      expect(parseRadius([8])).toEqual([8, 0, 0, 0]);
      expect(parseRadius([])).toEqual([0, 0, 0, 0]);
    });

    it('should fallback undefined elements to 0', () => {
      expect(parseRadius([10, undefined, 4])).toEqual([10, 0, 4, 0]);
    });
  });

  describe('radius as undefined', () => {
    it('should fallback to all zeros when radius is undefined', () => {
      expect(parseRadius(undefined)).toEqual([0, 0, 0, 0]);
    });
  });

  describe('individual corner override with ?? pattern', () => {
    it('should allow explicit corner radius to override parsed array values', () => {
      const [tl, tr, br, bl] = parseRadius([10, 10, 4, 4]);
      expect(20 ?? tl).toBe(20); // explicit override
      expect(undefined ?? tr).toBe(10); // fallback to parsed value
      expect(undefined ?? br).toBe(4);
      expect(undefined ?? bl).toBe(4);
    });
  });
});
