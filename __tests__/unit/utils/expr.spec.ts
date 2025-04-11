import { parseOptionsExpr, EXPR_WHITE_LIST } from '../../../src/utils/expr';

describe('Expression Processing Functions', () => {
  describe('parseOptionsExpr', () => {
    it('should process whitelisted properties', () => {
      const options = {
        encode: { x: '{a.x + a.y}' },
        // Non-whitelisted property.
        nonWhitelisted: { expr: '{a.value * 2}' },
      };

      const newOptions = parseOptionsExpr(options);

      // Check whitelisted properties are processed.
      expect(typeof newOptions.encode.x).toBe('function');

      // Non-whitelisted property should remain unchanged.
      expect(typeof newOptions.nonWhitelisted.expr).toBe('string');
      expect(newOptions.nonWhitelisted.expr).toBe('{a.value * 2}');
    });

    it('should verify all whitelisted properties are processed', () => {
      // Create an object with all whitelisted properties.
      const options = {};
      for (const key of EXPR_WHITE_LIST.filter((key) => key !== 'children')) {
        options[key] = { value: '{a.value * 2}' };
      }

      const newOptions = parseOptionsExpr(options);

      // Verify all whitelisted properties were processed.
      for (const key of EXPR_WHITE_LIST.filter((key) => key !== 'children')) {
        expect(typeof newOptions[key].value).toBe('function');
        expect(newOptions[key].value({ value: 5 }, 0, [], {})).toBe(10);
      }
    });

    it('should handle undefined whitelisted properties', () => {
      const options = {
        type: 'interval',
        // All whitelisted properties are undefined.
      };

      // Should not throw error.
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

      const newOptions = parseOptionsExpr(options);

      // Root level.
      expect(typeof newOptions.encode.y).toBe('function');
      // @ts-ignore
      expect(newOptions.encode.y({ value: 5 }, 0, [], {})).toBe(10);

      // First level child.
      expect(typeof newOptions.children[0].encode.x).toBe('function');
      // @ts-ignore
      expect(newOptions.children[0].encode.x({ x: 3, y: 4 }, 0, [], {})).toBe(
        7,
      );

      // Second level child.
      expect(typeof newOptions.children[0].children[0].encode.z).toBe(
        'function',
      );
      // @ts-ignore
      expect(newOptions.children[0].children[0].encode.z({}, 3, [], {})).toBe(
        30,
      );
    });

    it('should handle non-object options', () => {
      // Should not throw errors for non-object inputs.
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

      // Should not throw error.
      const newOptions = parseOptionsExpr(options);
      expect(typeof newOptions.encode.y).toBe('function');
    });

    // Test whitespace handling in expressions.
    it('should handle whitespace in expressions', () => {
      const options = {
        encode: {
          x: '{ a.value * 2 }', // Expression with spaces on both sides.
          y: '{  a.x + a.y  }', // Expression with multiple spaces on both sides.
          z: '{a.value*2}', // Expression without spaces.
        },
      };

      const newOptions = parseOptionsExpr(options);

      expect(typeof newOptions.encode.x).toBe('function');
      expect(typeof newOptions.encode.y).toBe('function');
      expect(typeof newOptions.encode.z).toBe('function');

      // All expressions should work the same regardless of whitespace.
      // @ts-ignore
      expect(newOptions.encode.x({ value: 5 }, 0, [], {})).toBe(10);
      // @ts-ignore
      expect(newOptions.encode.y({ x: 3, y: 4 }, 0, [], {})).toBe(7);
      // @ts-ignore
      expect(newOptions.encode.z({ value: 5 }, 0, [], {})).toBe(10);
    });

    // Test empty expressions.
    it('should handle empty expressions', () => {
      const options = {
        encode: {
          x: '{}', // Empty expression.
          y: '{  }', // Empty expression with spaces.
        },
      };

      expect(() => parseOptionsExpr(options)).toThrow();
    });

    // Test conditional expressions.
    it('should handle conditional expressions', () => {
      const options = {
        encode: {
          conditional: '{a.value > 10 ? a.high : a.low}',
          ternary: '{a.condition ? a.value * 2 : a.value / 2}',
        },
      };

      const newOptions = parseOptionsExpr(options);

      expect(typeof newOptions.encode.conditional).toBe('function');
      expect(typeof newOptions.encode.ternary).toBe('function');

      // Test conditional expression with value > 10.
      // @ts-ignore
      expect(
        newOptions.encode.conditional(
          { value: 15, high: 'high', low: 'low' },
          0,
          [],
          {},
        ),
      ).toBe('high');

      // Test conditional expression with value < 10.
      // @ts-ignore
      expect(
        newOptions.encode.conditional(
          { value: 5, high: 'high', low: 'low' },
          0,
          [],
          {},
        ),
      ).toBe('low');

      // Test ternary with true condition.
      // @ts-ignore
      expect(
        newOptions.encode.ternary({ condition: true, value: 5 }, 0, [], {}),
      ).toBe(10);

      // Test ternary with false condition.
      // @ts-ignore
      expect(
        newOptions.encode.ternary({ condition: false, value: 5 }, 0, [], {}),
      ).toBe(2.5);
    });

    // Test expressions in arrays.
    it('should process expressions in arrays', () => {
      const options = {
        encode: {
          values: ['{a.x}', '{a.y}', '{a.z}'],
          mixed: [10, '{a.value}', 'static', null, undefined],
        },
      };

      const newOptions = parseOptionsExpr(options);

      // Check that expressions in arrays are properly processed.
      expect(Array.isArray(newOptions.encode.values)).toBe(true);
      expect(typeof newOptions.encode.values[0]).toBe('function');
      expect(typeof newOptions.encode.values[1]).toBe('function');
      expect(typeof newOptions.encode.values[2]).toBe('function');

      // Check mixed array with expressions and non-expressions.
      expect(newOptions.encode.mixed[0]).toBe(10);
      expect(typeof newOptions.encode.mixed[1]).toBe('function');
      expect(newOptions.encode.mixed[2]).toBe('static');
      expect(newOptions.encode.mixed[3]).toBeNull();
      expect(newOptions.encode.mixed[4]).toBeUndefined();

      // Test execution of expressions in arrays.
      // @ts-ignore
      expect(newOptions.encode.values[0]({ x: 'X' }, 0, [], {})).toBe('X');
      // @ts-ignore
      expect(newOptions.encode.mixed[1]({ value: 42 }, 0, [], {})).toBe(42);
    });

    // Test special characters and string operations.
    it('should handle special characters and string operations', () => {
      const options = {
        encode: {
          special: "{a['special-key']}", // Bracket notation for property access.
          quotes: '{a.text + " and " + a.more}', // String concatenation.
        },
      };

      const newOptions = parseOptionsExpr(options);

      expect(typeof newOptions.encode.special).toBe('function');
      expect(typeof newOptions.encode.quotes).toBe('function');

      // Test bracket notation for accessing properties with special characters.
      // @ts-ignore
      expect(
        newOptions.encode.special({ 'special-key': 'works' }, 0, [], {}),
      ).toBe('works');

      // Test string concatenation with quotes.
      // @ts-ignore
      expect(
        newOptions.encode.quotes({ text: 'Hello', more: 'World' }, 0, [], {}),
      ).toBe('Hello and World');
    });

    // Test deeply nested objects.
    it('should process deeply nested objects', () => {
      const options = {
        style: {
          level1: {
            level2: {
              level3: {
                color: '{a.color}',
                size: '{a.size}',
              },
            },
          },
        },
      };

      const newOptions = parseOptionsExpr(options);

      // Check that expressions in deeply nested objects are processed.
      expect(typeof newOptions.style.level1.level2.level3.color).toBe(
        'function',
      );
      expect(typeof newOptions.style.level1.level2.level3.size).toBe(
        'function',
      );

      // Test execution of expressions in deeply nested objects.
      // @ts-ignore
      expect(
        newOptions.style.level1.level2.level3.color(
          { color: 'red' },
          0,
          [],
          {},
        ),
      ).toBe('red');
      // @ts-ignore
      expect(
        newOptions.style.level1.level2.level3.size({ size: 12 }, 0, [], {}),
      ).toBe(12);
    });

    // Test mathematical expressions.
    it('should handle mathematical expressions', () => {
      const options = {
        encode: {
          add: '{a.x + a.y}',
          multiply: '{a.value * 2}',
        },
      };

      const newOptions = parseOptionsExpr(options);

      expect(typeof newOptions.encode.add).toBe('function');
      expect(typeof newOptions.encode.multiply).toBe('function');

      // Test basic addition.
      // @ts-ignore
      expect(newOptions.encode.add({ x: 3, y: 4 }, 0, [], {})).toBe(7);

      // Test multiplication.
      // @ts-ignore
      expect(newOptions.encode.multiply({ value: 5 }, 0, [], {})).toBe(10);
    });

    // Test error handling in expressions.
    it('should handle errors in expressions gracefully', () => {
      const options = {
        encode: {
          // This expression will throw an error when executed.
          error: '{a.nonExistent.property}',
        },
      };

      const newOptions = parseOptionsExpr(options);

      // The expression should be compiled to a function.
      expect(typeof newOptions.encode.error).toBe('function');

      // Executing the expression should throw an error.
      // @ts-ignore
      expect(() => newOptions.encode.error({}, 0, [], {})).toThrow();
    });
  });
});
