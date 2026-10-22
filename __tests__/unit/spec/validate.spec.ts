import { stdlib } from '../../../src/lib';
import { suggestSchemaFixes, validate } from '../../../src/schema';
import schema from '../../../src/schema/schema.json';

describe('validate', () => {
  test('does not expose schema APIs from the main entry', async () => {
    const g2 = await import('../../../src');
    expect(g2).not.toHaveProperty('validate');
    expect(g2).not.toHaveProperty('suggestSchemaFixes');
  });

  test('publishes the generated G2 schema', () => {
    expect(schema.title).toBe('G2Schema');
    expect(schema.$schema).toBe('http://json-schema.org/draft-07/schema#');
    expect(schema.definitions.mark_interval.properties.type.const).toBe(
      'interval',
    );
    expect(schema.definitions.mark_forceGraph.properties.type.const).toBe(
      'forceGraph',
    );
    expect(schema.definitions.composition_geoView.properties.type.const).toBe(
      'geoView',
    );
  });

  test('keeps schema component types aligned with the runtime registry', () => {
    const definitions = schema.definitions as Record<
      string,
      { properties?: { type?: { const?: string } } }
    >;
    const registered = (namespace: string) =>
      Object.keys(stdlib())
        .filter((key) => key.startsWith(`${namespace}.`))
        .map((key) => key.slice(namespace.length + 1))
        .sort();
    const defined = (prefix: string) =>
      Object.entries(definitions)
        .filter(([name]) => name.startsWith(prefix))
        .map(([, definition]) => definition.properties?.type?.const)
        .filter((type): type is string => type !== undefined)
        .sort();

    expect(defined('mark_')).toEqual(registered('mark'));
    expect(defined('composition_')).toEqual(
      ['view', ...registered('composition')].sort(),
    );
    expect(defined('transform_')).toEqual(registered('transform'));
    expect(defined('dataTransform_')).toEqual(
      registered('data').filter(
        (type) => !['fetch', 'inline', 'column'].includes(type),
      ),
    );
    expect(defined('coordinate_')).toEqual(registered('coordinate'));
    expect(defined('animation_')).toEqual(registered('animation'));
    expect(defined('labelTransform_')).toEqual(registered('labelTransform'));
    expect(
      Object.keys(schema.definitions.interaction.properties).sort(),
    ).toEqual(registered('interaction'));
    expect(schema.definitions.scale.properties.type.enum.sort()).toEqual(
      registered('scale'),
    );
  });

  test('validates a core mark', () => {
    const spec = {
      type: 'interval',
      data: [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
      ],
      encode: {
        x: 'category',
        y: 'value',
      },
    };

    expect(validate(spec)).toEqual({
      ok: true,
      diagnostics: [],
      value: spec,
    });
  });

  test('allows disabling components at the node level', () => {
    expect(
      validate({
        type: 'interval',
        axis: false,
        legend: false,
        slider: false,
        scrollbar: null,
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });
  });

  test('validates composition children', () => {
    const spec = {
      type: 'view',
      data: [{ time: '2025-01-01', value: 10 }],
      children: [
        {
          type: 'line',
          encode: { x: 'time', y: 'value' },
        },
      ],
    };

    expect(validate(spec).ok).toBe(true);
  });

  test('validates composition-specific options', () => {
    expect(
      validate({
        type: 'timingKeyframe',
        direction: 'alternate',
        iterationCount: 2,
        children: [{ type: 'interval' }],
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });

    expect(
      validate({
        type: 'geoPath',
        coordinate: { type: 'albersUsa' },
        encode: { color: 'rate' },
        state: { active: { fill: 'red' } },
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });
  });

  test('supports inherited data transforms and Geo data sources', () => {
    expect(
      validate({
        type: 'view',
        data: [{ city: 'A', value: 1 }],
        children: [
          {
            type: 'interval',
            data: {
              transform: [
                {
                  type: 'fold',
                  fields: ['value'],
                  key: 'metric',
                  value: 'amount',
                },
              ],
            },
            encode: { x: 'city', y: 'amount' },
          },
        ],
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });

    expect(
      validate({
        type: 'geoView',
        coordinate: { type: 'orthographic' },
        children: [
          { type: 'geoPath', data: { type: 'graticule10' } },
          { type: 'geoPath', data: { type: 'sphere' } },
        ],
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });
  });

  test('does not expose Geo-only data sources to regular marks', () => {
    expect(validate({ type: 'point', data: { type: 'sphere' } })).toMatchObject(
      { ok: false },
    );
  });

  test('does not apply composition-specific options to a view', () => {
    expect(validate({ type: 'view', direction: 'alternate' })).toMatchObject({
      ok: false,
      diagnostics: [
        expect.objectContaining({
          path: '/direction',
          keyword: 'additionalProperties',
        }),
      ],
    });
  });

  test('reports an unknown component type with Ajv diagnostics', () => {
    const spec = {
      type: 'intervel',
      data: [{ category: 'A', value: 10 }],
      encode: { x: 'category', y: 'value' },
    };
    const result = validate(spec);

    expect(result.ok).toBe(false);
    expect(result.diagnostics[0]).toMatchObject({
      path: '/type',
      keyword: 'discriminator',
      params: { tag: 'type', tagValue: 'intervel' },
    });
    expect(suggestSchemaFixes(spec)).toEqual([
      expect.objectContaining({
        path: '/type',
        patch: [{ op: 'replace', path: '/type', value: 'interval' }],
      }),
    ]);
  });

  test('keeps useful diagnostics inside schema alternatives', () => {
    const spec = {
      type: 'interval',
      data: {
        type: 'fetsh',
        value: 'https://example.com/data.json',
      },
      encode: { y: 'value' },
    };
    const result = validate(spec);

    expect(result.ok).toBe(false);
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/data/type',
          keyword: 'enum',
        }),
      ]),
    );
    expect(suggestSchemaFixes(spec)).toEqual([
      expect.objectContaining({
        path: '/data/type',
        patch: [{ op: 'replace', path: '/data/type', value: 'fetch' }],
      }),
    ]);
  });

  test.each([
    [
      { type: 'interval', transform: [{ type: 'stakY' }] },
      '/transform/0/type',
      'stackY',
    ],
    [
      { type: 'interval', coordinate: { type: 'poler' } },
      '/coordinate/type',
      'polar',
    ],
    [
      {
        type: 'interval',
        encode: { x: { type: 'feild', value: 'x' } },
      },
      '/encode/x/type',
      'field',
    ],
  ])(
    'derives discriminator candidates directly from Ajv schema errors',
    (spec, path, value) => {
      expect(suggestSchemaFixes(spec)).toEqual([
        expect.objectContaining({
          path,
          patch: [{ op: 'replace', path, value }],
        }),
      ]);
    },
  );

  test('leaves data-field and coordinate-dependent encodings to the runtime', () => {
    expect(
      validate({
        type: 'line',
        data: [{ time: '2025-01-01', value: 10 }],
        encode: { x: 'times' },
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });

    expect(
      validate({
        type: 'point',
        data: [{ value: 10 }],
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });

    expect(
      validate({
        type: 'line',
        coordinate: { type: 'parallel' },
        data: [{ a: 1, b: 2 }],
        encode: { position1: 'a', position2: 'b' },
      }),
    ).toMatchObject({ ok: true, diagnostics: [] });
  });

  test('rejects non-serializable values without mutating the input', () => {
    const formatter = () => 'red';
    const spec = {
      type: 'interval',
      data: [{ category: 'A', value: 10 }],
      encode: { x: 'category', y: 'value' },
      style: { fill: formatter },
    };

    const result = validate(spec);

    expect(result.ok).toBe(false);
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyword: 'jsonSerializable',
          path: '/style/fill',
        }),
      ]),
    );
    expect(spec.style.fill).toBe(formatter);
  });

  test('reports and separately suggests renaming an unknown property', () => {
    const spec = {
      type: 'point',
      data: [{ x: 1, y: 2 }],
      encod: { x: 'x', y: 'y' },
    };
    const result = validate(spec);

    expect(result.ok).toBe(false);
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/encod',
          keyword: 'additionalProperties',
        }),
      ]),
    );
    expect(suggestSchemaFixes(spec)).toEqual([
      expect.objectContaining({
        path: '/encod',
        patch: [{ op: 'move', from: '/encod', path: '/encode' }],
      }),
    ]);
  });

  test.each(['q', 'id'])(
    'does not guess a rename for a low-confidence property: %s',
    (property) => {
      expect(suggestSchemaFixes({ type: 'point', [property]: 1 })).toEqual([
        expect.objectContaining({
          path: `/${property}`,
          patch: [{ op: 'remove', path: `/${property}` }],
        }),
      ]);
    },
  );

  test('keeps mark and composition capabilities separate', () => {
    const result = validate({
      type: 'interval',
      data: [{ value: 10 }],
      encode: { y: 'value' },
      children: [],
    });

    expect(result.ok).toBe(false);
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/children',
          keyword: 'additionalProperties',
        }),
      ]),
    );
  });

  test('covers registered marks, transforms, coordinates, and interactions', () => {
    const spec = {
      type: 'wordCloud',
      data: [{ text: 'G2', value: 10 }],
      encode: { text: 'text', value: 'value' },
      transform: [{ type: 'sortX', by: 'value', reverse: true }],
      coordinate: {
        type: 'polar',
        innerRadius: 0.2,
        transform: [{ type: 'transpose' }],
      },
      interaction: {
        elementHighlight: { background: true },
        tooltip: { shared: true },
      },
      animate: { enter: { type: 'fadeIn', duration: 300 } },
      labelTransform: [{ type: 'overlapDodgeY', padding: 4 }],
    };

    expect(validate(spec).ok).toBe(true);
  });

  test.each([new Date(), new Map(), new Set()])(
    'rejects non-plain JSON objects: %s',
    (value) => {
      const result = validate({
        type: 'interval',
        data: [{ value: 10 }],
        encode: { y: 'value' },
        style: { fill: value },
      });

      expect(result).toMatchObject({
        ok: false,
        diagnostics: [
          {
            keyword: 'jsonSerializable',
            path: '/style/fill',
          },
        ],
      });
    },
  );

  test('rejects circular references before Ajv validation', () => {
    const style: Record<string, unknown> = {};
    style.self = style;

    expect(
      validate({
        type: 'interval',
        data: [{ value: 10 }],
        encode: { y: 'value' },
        style,
      }),
    ).toMatchObject({
      ok: false,
      diagnostics: [
        {
          keyword: 'jsonSerializable',
          path: '/style/self',
        },
      ],
    });
  });

  test('does not suggest fixes for valid or non-JSON values', () => {
    expect(suggestSchemaFixes({ type: 'point' })).toEqual([]);
    expect(
      suggestSchemaFixes({ type: 'point', style: { fill: () => 'red' } }),
    ).toEqual([]);
  });
});
