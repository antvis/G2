import {
  parseValueExpr,
  parseOptionsExpr,
  exprWhiteList,
} from '../../../src/api/utils';

describe('Expression Processing Functions', () => {
  describe('parseValueExpr', () => {
    it('should compile expressions in curly braces', () => {
      const result = parseValueExpr('{a.value * 2}');
      expect(typeof result).toBe('function');
      expect(result({ value: 5 }, 0, [], {})).toBe(10);
    });

    it('should handle whitespace in expressions', () => {
      const result = parseValueExpr('{ a.value * 2 }');
      expect(typeof result).toBe('function');
      expect(result({ value: 5 }, 0, [], {})).toBe(10);
    });

    it('should return primitive values as is', () => {
      expect(parseValueExpr(42)).toBe(42);
      expect(parseValueExpr('string')).toBe('string');
      expect(parseValueExpr(true)).toBe(true);
      expect(parseValueExpr(false)).toBe(false);
      expect(parseValueExpr(null)).toBe(null);
      expect(parseValueExpr(undefined)).toBe(undefined);
    });

    it('should handle empty strings', () => {
      expect(parseValueExpr('')).toBe('');
    });

    it('should handle strings with only curly braces', () => {
      expect(parseValueExpr('{}')).toBe('');
    });

    it('should process arrays recursively', () => {
      const result = parseValueExpr([1, '{a.value * 2}', 3]);
      expect(result[0]).toBe(1);
      expect(typeof result[1]).toBe('function');
      expect(result[1]({ value: 5 }, 0, [], {})).toBe(10);
      expect(result[2]).toBe(3);
    });

    it('should process objects recursively', () => {
      const result = parseValueExpr({
        a: 1,
        b: '{a.value * 2}',
        c: { d: '{a.x + a.y}' },
      });

      expect(result.a).toBe(1);
      expect(typeof result.b).toBe('function');
      expect(result.b({ value: 5 }, 0, [], {})).toBe(10);
      expect(typeof result.c.d).toBe('function');
      expect(result.c.d({ x: 3, y: 4 }, 0, [], {})).toBe(7);
    });

    it('should handle circular references', () => {
      const obj: any = { a: 1, b: '{a.value * 2}' };
      obj.self = obj;

      const result = parseValueExpr(obj);
      expect(result.a).toBe(1);
      expect(typeof result.b).toBe('function');
      expect(result.self).toBe(result); // Circular reference preserved
    });

    it('should use cache for identical expressions', () => {
      // Create a test cache to verify it's being used
      const testCache = new Map<string, () => any>();
      const spy = jest.spyOn(testCache, 'set');

      // First call should add to cache
      const result1 = parseValueExpr('{a.value * 2}', testCache);
      expect(spy).toHaveBeenCalledTimes(1);

      // Second call with same expression should use cache
      const result2 = parseValueExpr('{a.value * 2}', testCache);
      expect(spy).toHaveBeenCalledTimes(1); // Still just one call

      // Both should be functions
      expect(typeof result1).toBe('function');
      expect(typeof result2).toBe('function');

      // Both should return the same result
      expect(result1({ value: 5 }, 0, [], {})).toBe(10);
      expect(result2({ value: 5 }, 0, [], {})).toBe(10);

      // Different expression should add to cache
      parseValueExpr('{a.x + a.y}', testCache);
      expect(spy).toHaveBeenCalledTimes(2);

      spy.mockRestore();
    });

    it('should handle complex nested structures', () => {
      const complex = {
        array: [1, { expr: '{a.value * 2}' }, ['{a.x + a.y}']],
        object: {
          nested: {
            expr: '{b * 10}',
          },
        },
      };

      const result = parseValueExpr(complex);
      expect(result.array[0]).toBe(1);
      expect(typeof result.array[1].expr).toBe('function');
      expect(result.array[1].expr({ value: 5 }, 0, [], {})).toBe(10);
      expect(typeof result.array[2][0]).toBe('function');
      expect(result.array[2][0]({ x: 3, y: 4 }, 0, [], {})).toBe(7);
      expect(typeof result.object.nested.expr).toBe('function');
      expect(result.object.nested.expr({}, 3, [], {})).toBe(30);
    });

    it('should handle Date objects', () => {
      const date = new Date();
      const result = parseValueExpr({ date });
      expect(result.date).toBe(date);
    });

    it('should handle RegExp objects', () => {
      const regex = /test/;
      const result = parseValueExpr({ regex });
      expect(result.regex).toBe(regex);
    });
  });

  describe('parseOptionsExpr', () => {
    it('should process whitelisted properties', () => {
      const options = {
        attr: { color: '{a.color}' },
        encode: { x: '{a.x + a.y}' },
        // Non-whitelisted property
        nonWhitelisted: { expr: '{a.value * 2}' },
      };

      parseOptionsExpr(options);

      // Check whitelisted properties are processed
      expect(typeof options.attr.color).toBe('function');
      expect(typeof options.encode.x).toBe('function');

      // Non-whitelisted property should remain unchanged
      expect(typeof options.nonWhitelisted.expr).toBe('string');
      expect(options.nonWhitelisted.expr).toBe('{a.value * 2}');
    });

    it('should verify all whitelisted properties are processed', () => {
      // Create an object with all whitelisted properties
      const options = {};
      for (const key of exprWhiteList) {
        options[key] = { value: '{a.value * 2}' };
      }

      parseOptionsExpr(options);

      // Verify all whitelisted properties were processed
      for (const key of exprWhiteList) {
        expect(typeof options[key].value).toBe('function');
        expect(options[key].value({ value: 5 }, 0, [], {})).toBe(10);
      }
    });

    it('should handle undefined whitelisted properties', () => {
      const options = {
        type: 'interval',
        // All whitelisted properties are undefined
      };

      // Should not throw error
      parseOptionsExpr(options);
      expect(options.type).toBe('interval');
    });

    it('should handle empty whitelisted properties', () => {
      const options = {
        attr: {},
        encode: {},
        transform: [],
      };

      parseOptionsExpr(options);
      expect(options.attr).toEqual({});
      expect(options.encode).toEqual({});
      expect(options.transform).toEqual([]);
    });

    it('should handle null whitelisted properties', () => {
      const options = {
        attr: null,
        encode: null,
      };

      parseOptionsExpr(options);
      expect(options.attr).toBeNull();
      expect(options.encode).toBeNull();
    });

    it('should process children recursively', () => {
      const options = {
        type: 'view',
        encode: { y: '{a.value * 2}' },
        children: [
          {
            type: 'interval',
            encode: { x: '{a.x + a.y}' },
            children: [
              {
                type: 'point',
                encode: { z: '{b * 10}' },
              },
            ],
          },
        ],
      };

      parseOptionsExpr(options);

      // Root level
      expect(typeof options.encode.y).toBe('function');
      // @ts-ignore
      expect(options.encode.y({ value: 5 }, 0, [], {})).toBe(10);

      // First level child
      expect(typeof options.children[0].encode.x).toBe('function');
      // @ts-ignore
      expect(options.children[0].encode.x({ x: 3, y: 4 }, 0, [], {})).toBe(7);

      // Second level child
      expect(typeof options.children[0].children[0].encode.z).toBe('function');
      // @ts-ignore
      expect(options.children[0].children[0].encode.z({}, 3, [], {})).toBe(30);
    });

    it('should use the same cache across all recursive calls', () => {
      // Create a test cache to verify it's being used
      const testCache = new Map<string, () => any>();
      const spy = jest.spyOn(testCache, 'set');

      const options = {
        encode: { y: '{a.value * 2}' },
        children: [
          {
            encode: { y: '{a.value * 2}' }, // Same expression as parent
          },
        ],
      };

      parseOptionsExpr(options, testCache);

      // Should only add the expression to cache once
      expect(spy).toHaveBeenCalledTimes(1);

      // Both expressions should be functions
      expect(typeof options.encode.y).toBe('function');
      expect(typeof options.children[0].encode.y).toBe('function');

      spy.mockRestore();
    });

    it('should handle non-object options', () => {
      // Should not throw errors for non-object inputs
      expect(() => parseOptionsExpr(null)).not.toThrow();
      expect(() => parseOptionsExpr(undefined)).not.toThrow();
      expect(() => parseOptionsExpr(42)).not.toThrow();
      expect(() => parseOptionsExpr('string')).not.toThrow();
      expect(() => parseOptionsExpr(true)).not.toThrow();
    });

    it('should handle children with non-array children property', () => {
      const options = {
        encode: { y: '{a.value * 2}' },
        children: 'not an array',
      };

      // Should not throw error
      expect(() => parseOptionsExpr(options)).not.toThrow();
      expect(typeof options.encode.y).toBe('function');
    });

    it('should handle circular references in children', () => {
      const options: any = {
        encode: { y: '{a.value * 2}' },
        children: [],
      };

      // Create circular reference
      options.children.push(options);

      // Should not cause infinite recursion
      expect(() => parseOptionsExpr(options)).not.toThrow();
      expect(typeof options.encode.y).toBe('function');
    });
  });
});
