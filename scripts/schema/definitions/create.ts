// Build-time schema definition; excluded from the published runtime sources.
import {
  animationProperties,
  arrayOf,
  axisComponent,
  closeable,
  discriminated,
  legendComponent,
  object,
  primitive,
  ref,
  titleComponent,
  tuple,
  typedObject,
} from './helpers';
import { interactionOptions } from './interaction-options';
import {
  addNodeDefinitions,
  createNodeBaseDefinitions,
} from './node-definitions';
import { addTransformDefinitions } from './transform-definitions';

export function createSchema(catalog) {
  const defs = {
    jsonValue: {
      anyOf: [primitive, arrayOf(ref('jsonValue')), ref('jsonObject')],
    },
    jsonObject: {
      type: 'object',
      additionalProperties: ref('jsonValue'),
    },
    spacing: { anyOf: [{ type: 'number' }, { const: 'auto' }] },
    encodeDescriptor: {
      type: 'object',
      properties: { type: { type: 'string' } },
      required: ['type'],
      oneOf: [
        typedObject(
          'field',
          { value: { type: 'string' } },
          { required: ['value'] },
        ),
        typedObject(
          'constant',
          { value: ref('jsonValue') },
          { required: ['value'] },
        ),
        typedObject(
          'column',
          { value: arrayOf(primitive) },
          { required: ['value'] },
        ),
      ],
      discriminator: { propertyName: 'type' },
    },
    encodeValue: {
      anyOf: [primitive, ref('encodeDescriptor'), arrayOf(ref('encodeValue'))],
    },
    data: {
      anyOf: [
        arrayOf(ref('jsonValue')),
        object(
          {
            type: { enum: ['inline', 'fetch', 'column'] },
            value: ref('jsonValue'),
            format: { enum: ['json', 'csv'] },
            delimiter: { type: 'string' },
            autoType: { type: 'boolean' },
            transform: arrayOf(ref('dataTransform')),
          },
          {
            allOf: [
              {
                if: {
                  required: ['type'],
                  properties: { type: { const: 'fetch' } },
                },
                then: { properties: { value: { type: 'string' } } },
              },
              {
                if: {
                  required: ['type'],
                  properties: { type: { const: 'column' } },
                },
                then: {
                  properties: {
                    value: {
                      type: 'object',
                      additionalProperties: arrayOf(ref('jsonValue')),
                    },
                  },
                },
              },
            ],
          },
        ),
      ],
    },
    geoData: {
      anyOf: [
        ref('data'),
        object(
          { type: { enum: ['graticule10', 'sphere'] } },
          { required: ['type'] },
        ),
      ],
    },
    axisComponent,
    legendComponent,
    titleComponent,
    tooltipItem: {
      anyOf: [
        { type: 'string' },
        object(
          {
            name: { type: 'string' },
            color: { type: 'string' },
            channel: { type: 'string' },
            field: { type: 'string' },
            value: primitive,
            valueFormatter: { type: 'string' },
          },
          { additionalProperties: ref('jsonValue') },
        ),
      ],
    },
    tooltip: {
      anyOf: [
        { type: 'null' },
        { const: false },
        ref('tooltipItem'),
        arrayOf(ref('tooltipItem')),
        object(
          {
            title: {
              anyOf: [
                { type: 'string' },
                object({
                  field: { type: 'string' },
                  channel: { type: 'string' },
                  value: { type: 'string' },
                }),
              ],
            },
            items: {
              anyOf: [
                { type: 'null' },
                { const: false },
                arrayOf(ref('tooltipItem')),
              ],
            },
          },
          { additionalProperties: ref('jsonValue') },
        ),
      ],
    },
    interaction: object(
      Object.fromEntries(
        catalog.interactionTypes.map((type) => [
          type,
          closeable(
            object(interactionOptions[type] || {}, {
              additionalProperties: ref('jsonValue'),
            }),
          ),
        ]),
      ),
    ),
    scale: object({
      type: { enum: catalog.scaleTypes },
      domain: arrayOf(ref('jsonValue')),
      range: arrayOf(ref('jsonValue')),
      unknown: ref('jsonValue'),
      clamp: { type: 'boolean' },
      nice: { type: 'boolean' },
      round: { type: 'boolean' },
      interpolate: { type: 'string' },
      tickCount: { type: 'number', minimum: 0 },
      tickMethod: { type: 'string' },
      zero: { type: 'boolean' },
      exponent: { type: 'number' },
      base: { type: 'number' },
      constant: { type: 'number' },
      padding: { type: 'number' },
      paddingInner: { type: 'number' },
      paddingOuter: { type: 'number' },
      align: { type: 'number' },
      rangeMax: { type: 'number' },
      rangeMin: { type: 'number' },
      domainMax: { type: 'number' },
      domainMin: { type: 'number' },
      key: { type: 'string' },
      facet: { type: 'boolean' },
      independent: { type: 'boolean' },
      palette: {
        anyOf: [
          { type: 'string' },
          object({ type: { enum: ['category10', 'category20'] } }),
        ],
      },
      relations: arrayOf(tuple(ref('jsonValue'), ref('jsonValue'))),
    }),
    coordinate: discriminated(
      catalog.coordinateTypes.map((type) => `coordinate_${type}`),
    ),
    coordinateTransform: discriminated(
      catalog.coordinateTransformTypes.map(
        (type) => `coordinateTransform_${type}`,
      ),
    ),
    animation: discriminated(
      catalog.animationTypes.map((type) => `animation_${type}`),
    ),
    animate: closeable(
      object({
        enter: closeable(ref('animation')),
        update: closeable(ref('animation')),
        exit: closeable(ref('animation')),
      }),
    ),
    labelTransform: discriminated(
      catalog.labelTransformTypes.map((type) => `labelTransform_${type}`),
    ),
    theme: {
      anyOf: [
        { enum: catalog.themeTypes },
        object(
          { type: { enum: catalog.themeTypes } },
          { additionalProperties: ref('jsonValue') },
        ),
      ],
    },
    transform: discriminated(
      catalog.transformTypes.map((type) => `transform_${type}`),
    ),
    dataTransform: discriminated(
      catalog.dataTransformTypes.map((type) => `dataTransform_${type}`),
    ),
    ...createNodeBaseDefinitions(catalog),
  };

  addCoordinateDefinitions(defs, catalog);
  addLabelDefinitions(defs, catalog);
  addTransformDefinitions(defs, catalog);
  addNodeDefinitions(defs, catalog);

  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'G2Schema',
    description: 'JSON Schema for JSON-safe G2 chart configuration.',
    $ref: '#/definitions/node',
    definitions: defs,
  };
}

function addCoordinateDefinitions(defs, catalog) {
  for (const type of catalog.coordinateTypes) {
    const angular = ['polar', 'theta', 'radial', 'radar', 'helix'].includes(
      type,
    );
    defs[`coordinate_${type}`] = typedObject(type, {
      ...(angular
        ? {
            startAngle: { type: 'number' },
            endAngle: { type: 'number' },
            innerRadius: { type: 'number' },
            outerRadius: { type: 'number' },
          }
        : {}),
      ...(type === 'fisheye'
        ? {
            focusX: { type: 'number' },
            focusY: { type: 'number' },
            distortionX: { type: 'number' },
            distortionY: { type: 'number' },
            visual: { type: 'boolean' },
          }
        : {}),
      transform: arrayOf(ref('coordinateTransform')),
    });
  }
  defs.coordinateTransform_transpose = typedObject('transpose');
  defs.coordinateTransform_fisheye = typedObject('fisheye', {
    focusX: { type: 'number' },
    focusY: { type: 'number' },
    distortionX: { type: 'number' },
    distortionY: { type: 'number' },
    visual: { type: 'boolean' },
  });

  for (const type of catalog.animationTypes) {
    defs[`animation_${type}`] = typedObject(type, animationProperties);
  }
}

function addLabelDefinitions(defs, catalog) {
  const labelOptions = {
    overlapHide: {},
    overlapDodgeY: {
      maxIterations: { type: 'number', minimum: 0 },
      maxError: { type: 'number', minimum: 0 },
      padding: { type: 'number' },
    },
    overflowHide: {},
    contrastReverse: {
      threshold: { type: 'number', minimum: 0 },
      palette: arrayOf({ type: 'string' }),
    },
    overflowStroke: {
      threshold: { type: 'number', minimum: 0 },
      palette: arrayOf({ type: 'string' }),
    },
    exceedAdjust: {
      bounds: { enum: ['view', 'main'] },
      offsetX: { type: 'number' },
      offsetY: { type: 'number' },
    },
  };
  for (const type of catalog.labelTransformTypes) {
    defs[`labelTransform_${type}`] = typedObject(type, labelOptions[type]);
  }
}
