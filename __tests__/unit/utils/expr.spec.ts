import {
  parseOptionsValueExpr,
  parseOptionsExpr,
  parseChildrenExprWithRecursion,
} from '../../../src/api/expr';

describe('Expression Processing Functions', () => {
  describe('parseOptionsValueExpr', () => {
    it('should compile expressions in curly braces', () => {
      const result = parseOptionsValueExpr('{a.value * 2}');
      expect(typeof result).toBe('function');
      expect(result({ value: 5 }, 0, [], {})).toBe(10);
    });

    it('should handle whitespace in expressions', () => {
      const result = parseOptionsValueExpr('{ a.value * 2 }');
      expect(typeof result).toBe('function');
      expect(result({ value: 5 }, 0, [], {})).toBe(10);
    });

    it('should return primitive values as is', () => {
      expect(parseOptionsValueExpr(42)).toBe(42);
      expect(parseOptionsValueExpr('string')).toBe('string');
      expect(parseOptionsValueExpr(true)).toBe(true);
      expect(parseOptionsValueExpr(false)).toBe(false);
      expect(parseOptionsValueExpr(null)).toBe(null);
      expect(parseOptionsValueExpr(undefined)).toBe(undefined);
    });

    it('should handle empty strings', () => {
      expect(parseOptionsValueExpr('')).toBe('');
    });

    it('should handle strings with only curly braces', () => {
      expect(parseOptionsValueExpr('{}')).toBe('');
    });

    it('should process arrays recursively', () => {
      const result = parseOptionsValueExpr([1, '{a.value * 2}', 3]);
      expect(result[0]).toBe(1);
      expect(typeof result[1]).toBe('function');
      expect(result[1]({ value: 5 }, 0, [], {})).toBe(10);
      expect(result[2]).toBe(3);
    });

    it('should process objects recursively', () => {
      const result = parseOptionsValueExpr({
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

      const result = parseOptionsValueExpr(obj);
      expect(result.a).toBe(1);
      expect(typeof result.b).toBe('function');
      expect(result.self).toBe(result); // Circular reference preserved
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

      const result = parseOptionsValueExpr(complex);
      expect(result.array[0]).toBe(1);
      expect(typeof result.array[1].expr).toBe('function');
      expect(result.array[1].expr({ value: 5 }, 0, [], {})).toBe(10);
      expect(typeof result.array[2][0]).toBe('function');
      expect(result.array[2][0]({ x: 3, y: 4 }, 0, [], {})).toBe(7);
      expect(typeof result.object.nested.expr).toBe('function');
      expect(result.object.nested.expr({}, 3, [], {})).toBe(30);
    });

    it('should handle all context parameters', () => {
      const result = parseOptionsValueExpr({
        datumExpr: '{a && a.value}',
        indexExpr: '{b * 10}',
        dataExpr: '{c.length}',
        optionsExpr: '{d.color}',
        globalExpr: '{global.e.config}',
      });

      expect(typeof result.datumExpr).toBe('function');
      expect(result.datumExpr({ value: 42 }, 0, [], {})).toBe(42);
      expect(result.datumExpr(null, 0, [], {})).toBe(null);

      expect(typeof result.indexExpr).toBe('function');
      expect(result.indexExpr({}, 3, [], {})).toBe(30);

      expect(typeof result.dataExpr).toBe('function');
      expect(result.dataExpr({}, 0, [1, 2, 3], {})).toBe(3);

      expect(typeof result.optionsExpr).toBe('function');
      expect(result.optionsExpr({}, 0, [], { color: 'red' })).toBe('red');

      expect(typeof result.globalExpr).toBe('function');
      expect(result.globalExpr({}, 0, [], {}, { config: 'value' })).toBe(
        'value',
      );
    });

    it('should handle Date objects', () => {
      const date = new Date();
      const result = parseOptionsValueExpr({ date });
      expect(result.date).toBe(date);
    });

    it('should handle RegExp objects', () => {
      const regex = /test/;
      const result = parseOptionsValueExpr({ regex });
      expect(result.regex).toBe(regex);
    });
  });

  describe('parseOptionsExpr', () => {
    it('should process whitelisted properties', () => {
      const options = {
        attr: { color: '{a.color}' },
        encode: { x: '{a.x + a.y}' },
        transform: [{ callback: '{i * 10}' }],
        scale: { color: { range: ['{a.color}'] } },
        interaction: { tooltip: { fields: ['{a.field}'] } },
        labels: { text: '{a.value}' },
        animate: { enter: { callback: '{a.value}' } },
        coordinate: { type: '{a.type}' },
        axis: { x: { title: '{a.title}' } },
        legend: { color: { title: '{a.title}' } },
        slider: { x: { formatter: '{a.value}' } },
        scrollbar: { x: { formatter: '{a.value}' } },
        state: { active: { fill: '{a.color}' } },
        tooltip: { title: '{a.title}' },
        // Non-whitelisted property
        nonWhitelisted: { expr: '{a.value * 2}' },
      };

      parseOptionsExpr(options);

      // Check whitelisted properties are processed
      expect(typeof options.attr.color).toBe('function');
      expect(typeof options.encode.x).toBe('function');
      expect(typeof options.transform[0].callback).toBe('function');
      expect(typeof options.scale.color.range[0]).toBe('function');
      expect(typeof options.interaction.tooltip.fields[0]).toBe('function');
      expect(typeof options.labels.text).toBe('function');
      expect(typeof options.animate.enter.callback).toBe('function');
      expect(typeof options.coordinate.type).toBe('function');
      expect(typeof options.axis.x.title).toBe('function');
      expect(typeof options.legend.color.title).toBe('function');
      expect(typeof options.slider.x.formatter).toBe('function');
      expect(typeof options.scrollbar.x.formatter).toBe('function');
      expect(typeof options.state.active.fill).toBe('function');
      expect(typeof options.tooltip.title).toBe('function');

      // Non-whitelisted property should remain unchanged
      expect(typeof options.nonWhitelisted.expr).toBe('string');
      expect(options.nonWhitelisted.expr).toBe('{a.value * 2}');
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
  });

  describe('parseChildrenExprWithRecursion', () => {
    it('should process expressions in children array', () => {
      const options = [
        {
          type: 'interval',
          encode: {
            x: 'category',
            y: '{a.value * 2}',
          },
        },
        {
          type: 'line',
          encode: {
            x: '{a.x + a.y}',
          },
        },
      ];

      parseChildrenExprWithRecursion(options);

      expect(typeof options[0].encode.y).toBe('function');
      // @ts-ignore
      expect(options[0].encode.y({ value: 5 }, 0, [], {})).toBe(10);

      expect(typeof options[1].encode.x).toBe('function');
      // @ts-ignore
      expect(options[1].encode.x({ x: 3, y: 4 }, 0, [], {})).toBe(7);
    });

    it('should process nested children recursively', () => {
      const options = [
        {
          type: 'view',
          children: [
            {
              type: 'interval',
              encode: {
                y: '{a.value * 2}',
              },
              children: [
                {
                  type: 'point',
                  encode: {
                    x: '{a.x + a.y}',
                  },
                },
              ],
            },
          ],
        },
      ];

      parseChildrenExprWithRecursion(options);

      // First level
      expect(typeof options[0].children[0].encode.y).toBe('function');
      // @ts-ignore
      expect(options[0].children[0].encode.y({ value: 5 }, 0, [], {})).toBe(10);

      // Second level
      expect(typeof options[0].children[0].children[0].encode.x).toBe(
        'function',
      );
      expect(
        // @ts-ignore
        options[0].children[0].children[0].encode.x({ x: 3, y: 4 }, 0, [], {}),
      ).toBe(7);
    });

    it('should handle empty children array', () => {
      const options = [];

      // Should not throw error
      parseChildrenExprWithRecursion(options);
      expect(options).toEqual([]);
    });

    it('should handle children with no nested children property', () => {
      const options = [
        {
          type: 'interval',
          encode: {
            y: '{a.value * 2}',
          },
        },
      ];

      parseChildrenExprWithRecursion(options);
      expect(typeof options[0].encode.y).toBe('function');
    });

    it('should handle children with null or non-array children property', () => {
      const options = [
        {
          type: 'interval',
          encode: {
            y: '{a.value * 2}',
          },
          children: null,
        },
        {
          type: 'line',
          encode: {
            x: '{a.x + a.y}',
          },
          children: 'not an array',
        },
      ];

      // Should not throw error
      parseChildrenExprWithRecursion(options);
      expect(typeof options[0].encode.y).toBe('function');
      expect(typeof options[1].encode.x).toBe('function');
    });

    it('should handle circular references in children', () => {
      const child: any = {
        type: 'interval',
        encode: {
          y: '{a.value * 2}',
        },
      };

      const parent: any = {
        type: 'view',
        children: [child],
      };

      // Create circular reference
      child.parent = parent;

      const options = [parent];

      // Should not cause infinite recursion
      parseChildrenExprWithRecursion(options);

      expect(typeof options[0].children[0].encode.y).toBe('function');
      expect(options[0].children[0].parent).toBe(options[0]);
    });

    it('should handle deeply nested children', () => {
      // Create a deeply nested structure
      let current: any = { encode: { value: '{datum.value * 2}' } };
      const root = { children: [current] };

      // Create 10 levels of nesting
      for (let i = 0; i < 10; i++) {
        const next = { encode: { value: `{datum.level${i}}` } };
        current.children = [next];
        current = next;
      }

      const options = [root];

      // Should handle deep nesting without stack overflow
      parseChildrenExprWithRecursion(options);

      // Verify first level was processed
      expect(typeof options[0].children[0].encode.value).toBe('function');

      // Verify last level was processed
      let lastLevel = options[0];
      for (let i = 0; i < 11; i++) {
        lastLevel = lastLevel.children[0];
      }
      // @ts-ignore
      expect(typeof lastLevel.encode.value).toBe('function');
    });

    it('should handle non-object children', () => {
      const options = [
        'string',
        42,
        null,
        undefined,
        {
          type: 'interval',
          encode: {
            y: '{a.value * 2}',
          },
        },
      ];

      // Should not throw error for non-object children
      parseChildrenExprWithRecursion(options);

      // Only the object should be processed
      expect(options[0]).toBe('string');
      expect(options[1]).toBe(42);
      expect(options[2]).toBeNull();
      expect(options[3]).toBeUndefined();
      // @ts-ignore
      expect(typeof options[4].encode.y).toBe('function');
    });
  });
});
