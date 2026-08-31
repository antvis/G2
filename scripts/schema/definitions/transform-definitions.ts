// Build-time schema definition; excluded from the published runtime sources.
import {
  arrayOf,
  baseChannelNames,
  numberOrPair,
  primitive,
  reducer,
  ref,
  selector,
  stringOrStrings,
  transformOrder,
  tuple,
  typedObject,
} from './helpers';

export function addTransformDefinitions(defs, catalog) {
  const channelReducers = Object.fromEntries(
    baseChannelNames.map((name) => [name, reducer]),
  );
  const transformOptions = {
    stackY: {
      groupBy: stringOrStrings,
      reverse: { type: 'boolean' },
      orderBy: transformOrder,
      y: { enum: ['y', 'y1'] },
      y1: { enum: ['y', 'y1'] },
      series: { type: 'boolean' },
    },
    dodgeX: {
      groupBy: stringOrStrings,
      reverse: { type: 'boolean' },
      orderBy: transformOrder,
      padding: { type: 'number' },
    },
    normalizeY: {
      series: { type: 'boolean' },
      groupBy: stringOrStrings,
      basis: {
        enum: [
          'deviation',
          'first',
          'last',
          'max',
          'mean',
          'median',
          'min',
          'sum',
        ],
      },
    },
    stackEnter: {
      groupBy: stringOrStrings,
      orderBy: { type: 'string' },
      reverse: { type: 'boolean' },
      duration: { type: 'number', minimum: 0 },
    },
    jitter: {
      padding: { type: 'number' },
      paddingX: { type: 'number' },
      paddingY: { type: 'number' },
    },
    jitterX: { padding: { type: 'number' } },
    jitterY: { padding: { type: 'number' } },
    symmetryY: { groupBy: stringOrStrings },
    diffY: { groupBy: stringOrStrings },
    select: { groupBy: stringOrStrings, channel: { type: 'string' }, selector },
    selectX: { groupBy: stringOrStrings, selector },
    selectY: { groupBy: stringOrStrings, selector },
    groupX: channelReducers,
    groupY: channelReducers,
    groupColor: channelReducers,
    group: { channels: stringOrStrings, ...channelReducers },
    sortX: {
      reverse: { type: 'boolean' },
      by: { type: 'string' },
      slice: numberOrPair,
      ordinal: { type: 'boolean' },
      reducer,
    },
    sortY: {
      reverse: { type: 'boolean' },
      by: { type: 'string' },
      slice: numberOrPair,
      reducer,
    },
    sortColor: {
      reverse: { type: 'boolean' },
      by: { type: 'string' },
      slice: numberOrPair,
      reducer,
    },
    flexX: {
      field: { type: 'string' },
      channel: { type: 'string' },
      reducer: { const: 'sum' },
    },
    pack: { padding: { type: 'number' }, direction: { enum: ['row', 'col'] } },
    sample: {
      strategy: { enum: ['lttb', 'median', 'max', 'min', 'first', 'last'] },
      thresholds: { type: 'number', minimum: 0 },
      groupBy: stringOrStrings,
    },
    filter: Object.fromEntries(
      baseChannelNames.map((name) => [name, arrayOf(primitive)]),
    ),
    binX: { thresholds: { type: 'number', minimum: 0 }, ...channelReducers },
    bin: {
      thresholdsX: { type: 'number', minimum: 0 },
      thresholdsY: { type: 'number', minimum: 0 },
      ...channelReducers,
    },
  };
  for (const type of catalog.transformTypes) {
    defs[`transform_${type}`] = typedObject(type, transformOptions[type] || {});
  }

  const dataTransformOptions = {
    sortBy: {
      fields: arrayOf({
        anyOf: [
          { type: 'string' },
          tuple({ type: 'string' }),
          tuple({ type: 'string' }, { type: 'boolean' }),
        ],
      }),
    },
    pick: { fields: arrayOf({ type: 'string' }) },
    rename: {},
    fold: {
      fields: arrayOf({ type: 'string' }),
      key: { type: 'string' },
      value: { type: 'string' },
    },
    slice: { start: { type: 'number' }, end: { type: 'number' } },
    join: {
      join: arrayOf(ref('jsonObject')),
      on: tuple({ type: 'string' }, { type: 'string' }),
      select: arrayOf({ type: 'string' }),
      as: arrayOf({ type: 'string' }),
      unknown: ref('jsonValue'),
    },
    kde: {
      field: { type: 'string' },
      groupBy: arrayOf({ type: 'string' }),
      as: tuple({ type: 'string' }, { type: 'string' }),
      min: { type: 'number' },
      max: { type: 'number' },
      size: { type: 'number', minimum: 0 },
      width: { type: 'number', minimum: 0 },
    },
    venn: {
      padding: { type: 'number' },
      sets: { type: 'string' },
      size: { type: 'string' },
      as: tuple({ type: 'string' }, { type: 'string' }),
    },
    ema: {
      field: { type: 'string' },
      alpha: { type: 'number', minimum: 0, maximum: 1 },
      as: { type: 'string' },
    },
    wordCloud: {
      timeInterval: { type: 'number', minimum: 0 },
      words: arrayOf(ref('jsonValue')),
      size: tuple({ type: 'number' }, { type: 'number' }),
      font: { type: 'string' },
      fontFamily: { type: 'string' },
      fontStyle: { type: 'string' },
      fontWeight: primitive,
      fontSize: numberOrPair,
      rotate: { type: 'number' },
      text: { type: 'string' },
      padding: { type: 'number' },
      spiral: { enum: ['archimedean', 'rectangular'] },
    },
  };
  for (const type of catalog.dataTransformTypes) {
    const options = dataTransformOptions[type] || {};
    const additionalProperties = ['rename', 'arc', 'cluster'].includes(type)
      ? ref('jsonValue')
      : false;
    defs[`dataTransform_${type}`] = typedObject(type, options, {
      additionalProperties,
    });
  }
}
