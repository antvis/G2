// Build-time schema definition; excluded from the published runtime sources.
import type { AnySchema, AnySchemaObject } from 'ajv';

type SchemaProperties = Record<string, AnySchema>;
type ObjectOptions = AnySchemaObject & { required?: string[] };

export const ref = (name: string): AnySchemaObject => ({
  $ref: `#/definitions/${name}`,
});
export const nullable = (schema: AnySchema): AnySchemaObject => ({
  anyOf: [{ type: 'null' }, schema],
});
export const closeable = (schema: AnySchema): AnySchemaObject => ({
  anyOf: [{ type: 'null' }, { type: 'boolean' }, schema],
});
export const arrayOf = (items: AnySchema): AnySchemaObject => ({
  type: 'array',
  items,
});
export const tuple = (...items: AnySchema[]): AnySchemaObject => ({
  type: 'array',
  ...(items.length ? { items, additionalItems: false } : {}),
  minItems: items.length,
  maxItems: items.length,
});
export const object = (
  properties: SchemaProperties,
  options: ObjectOptions = {},
): AnySchemaObject => {
  const requiredProperties = new Set(options.required || []);
  const required = Object.keys(properties).filter((name) =>
    requiredProperties.has(name),
  );
  const { required: _, ...schemaOptions } = options;
  return {
    additionalProperties: false,
    ...schemaOptions,
    type: 'object',
    ...(required.length ? { required } : {}),
    properties,
  };
};
export const typedObject = (
  type: string,
  properties: SchemaProperties = {},
  options: ObjectOptions = {},
) =>
  object(
    { type: { const: type }, ...properties },
    { ...options, required: ['type', ...(options.required || [])] },
  );
export const discriminated = (refs: string[]): AnySchemaObject => ({
  type: 'object',
  properties: { type: { type: 'string' } },
  required: ['type'],
  oneOf: refs.map(ref),
  discriminator: { propertyName: 'type' },
});

export const primitive = {
  anyOf: [
    { type: 'null' },
    { type: 'boolean' },
    { type: 'number' },
    { type: 'string' },
  ],
};
export const stringOrStrings = {
  anyOf: [{ type: 'string' }, arrayOf({ type: 'string' })],
};
export const numberOrPair = {
  anyOf: [{ type: 'number' }, tuple({ type: 'number' }, { type: 'number' })],
};
export const reducer = {
  enum: ['mean', 'max', 'count', 'min', 'median', 'sum', 'first', 'last'],
};
export const selector = {
  enum: ['min', 'max', 'first', 'last', 'mean', 'median'],
};
export const transformOrder = {
  anyOf: [
    { type: 'null' },
    { enum: ['value', 'sum', 'series', 'maxIndex'] },
    arrayOf({ type: 'string' }),
  ],
};

export const baseChannelNames = [
  'x',
  'y',
  'z',
  'x1',
  'y1',
  'series',
  'color',
  'opacity',
  'shape',
  'size',
  'key',
  'groupKey',
  'position',
  'enterType',
  'enterEasing',
  'enterDuration',
  'enterDelay',
  'updateType',
  'updateEasing',
  'updateDuration',
  'updateDelay',
  'exitType',
  'exitEasing',
  'exitDuration',
  'exitDelay',
  'text',
  'fontSize',
  'fontWeight',
  'rotate',
  'src',
  'd',
  'source',
  'target',
  'value',
  'name',
];

const channelNames = [...baseChannelNames];
const capitalizedChannels = channelNames.map(
  (name) => name[0].toUpperCase() + name.slice(1),
);
for (const prefix of ['node', 'link', 'arc', 'indicator', 'pointer', 'pin']) {
  for (const channel of capitalizedChannels) {
    channelNames.push(`${prefix}${channel}`);
  }
}
export const encodeProperties = Object.fromEntries(
  channelNames.map((name) => [name, ref('encodeValue')]),
);

export const state = object({
  active: ref('jsonObject'),
  selected: ref('jsonObject'),
  inactive: ref('jsonObject'),
  unselected: ref('jsonObject'),
});

export const axisComponent = object(
  {
    type: { enum: ['axisX', 'axisY', 'axisZ'] },
    tickCount: { type: 'number', minimum: 0 },
    title: {
      anyOf: [{ type: 'string' }, { type: 'boolean' }, ref('jsonObject')],
    },
    position: { type: 'string' },
    grid: { type: 'boolean' },
    label: { type: 'boolean' },
    tick: { type: 'boolean' },
    line: { type: 'boolean' },
    arrow: { type: 'boolean' },
    labelFormatter: { type: 'string' },
    state,
    scale: ref('jsonObject'),
  },
  { additionalProperties: ref('jsonValue') },
);
export const legendComponent = object(
  {
    type: { enum: ['legends', 'legendCategory', 'legendContinuous'] },
    tickCount: { type: 'number', minimum: 0 },
    title: {
      anyOf: [{ type: 'string' }, { type: 'boolean' }, ref('jsonObject')],
    },
    position: { type: 'string' },
    state,
    scale: ref('jsonObject'),
  },
  { additionalProperties: ref('jsonValue') },
);
export const titleComponent = object(
  {
    size: { type: 'number', minimum: 0 },
    title: { type: 'string' },
    subtitle: nullable({ type: 'string' }),
    align: { enum: ['left', 'center', 'right'] },
    spacing: { type: 'number' },
  },
  { additionalProperties: ref('jsonValue') },
);
export const componentMap = (
  value: AnySchema,
  names: string[],
  pattern?: string,
): AnySchemaObject => ({
  type: 'object',
  properties: Object.fromEntries(names.map((name) => [name, closeable(value)])),
  ...(pattern ? { patternProperties: { [pattern]: closeable(value) } } : {}),
  additionalProperties: false,
});

export const animationProperties = {
  duration: { type: 'number', minimum: 0 },
  delay: { type: 'number', minimum: 0 },
  easing: { type: 'string' },
  fill: { enum: ['forwards', 'none', 'backwards', 'both', 'auto'] },
};
