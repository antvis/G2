// Build-time schema definition; excluded from the published runtime sources.
import {
  arrayOf,
  axisComponent,
  closeable,
  componentMap,
  discriminated,
  encodeProperties,
  legendComponent,
  nullable,
  numberOrPair,
  object,
  primitive,
  ref,
  state,
  titleComponent,
  tuple,
} from './helpers';

export function createNodeBaseDefinitions(catalog) {
  const commonNodeProperties = {
    key: { type: 'string' },
    class: { type: 'string' },
    x: { type: 'number' },
    y: { type: 'number' },
    z: { type: 'number' },
    width: { type: 'number', minimum: 0 },
    height: { type: 'number', minimum: 0 },
    depth: { type: 'number', minimum: 0 },
    autoFit: { type: 'boolean' },
    padding: ref('spacing'),
    paddingLeft: ref('spacing'),
    paddingRight: ref('spacing'),
    paddingTop: ref('spacing'),
    paddingBottom: ref('spacing'),
    inset: { type: 'number' },
    insetLeft: { type: 'number' },
    insetRight: { type: 'number' },
    insetTop: { type: 'number' },
    insetBottom: { type: 'number' },
    margin: { type: 'number' },
    marginLeft: { type: 'number' },
    marginRight: { type: 'number' },
    marginTop: { type: 'number' },
    marginBottom: { type: 'number' },
    frame: { type: 'boolean' },
    clip: { type: 'boolean' },
    data: ref('data'),
    transform: arrayOf(ref('transform')),
    scale: {
      type: 'object',
      additionalProperties: ref('scale'),
    },
    coordinate: ref('coordinate'),
    style: ref('jsonObject'),
    viewStyle: ref('jsonObject'),
    labelTransform: arrayOf(ref('labelTransform')),
    tooltip: ref('tooltip'),
    axis: closeable(
      componentMap(
        axisComponent,
        ['x', 'y', 'z', 'position'],
        '^position\\d+$',
      ),
    ),
    legend: closeable(
      componentMap(legendComponent, ['color', 'opacity', 'shape', 'size']),
    ),
    slider: closeable(
      componentMap(
        ref('jsonObject'),
        ['x', 'y', 'z', 'position'],
        '^position\\d+$',
      ),
    ),
    scrollbar: closeable(
      componentMap(
        ref('jsonObject'),
        ['x', 'y', 'z', 'position'],
        '^position\\d+$',
      ),
    ),
    title: { anyOf: [{ type: 'string' }, titleComponent] },
    interaction: ref('interaction'),
    theme: ref('theme'),
  };

  const markProperties = {
    ...commonNodeProperties,
    zIndex: { type: 'number' },
    facet: { type: 'boolean' },
    cartesian: { type: 'boolean' },
    encode: {
      type: 'object',
      properties: encodeProperties,
      patternProperties: { '^position\\d+$': ref('encodeValue') },
      additionalProperties: false,
    },
    layout: ref('jsonObject'),
    state,
    labels: arrayOf(ref('jsonObject')),
    nodeLabels: arrayOf(ref('jsonObject')),
    linkLabels: arrayOf(ref('jsonObject')),
    animate: ref('animate'),
  };

  const compositionEncode = {
    type: 'object',
    properties: {
      x: { anyOf: [{ type: 'string' }, arrayOf({ type: 'string' })] },
      y: { anyOf: [{ type: 'string' }, arrayOf({ type: 'string' })] },
      position: {
        anyOf: [{ type: 'string' }, arrayOf({ type: 'string' })],
      },
    },
    additionalProperties: false,
  };
  const markEncode = {
    type: 'object',
    properties: encodeProperties,
    patternProperties: { '^position\\d+$': ref('encodeValue') },
    additionalProperties: false,
  };
  const compositionProperties = {
    ...commonNodeProperties,
    children: arrayOf(ref('node')),
    layout: ref('jsonObject'),
  };
  const { data: _data, ...compositionPropertiesWithoutData } =
    compositionProperties;
  const flexibleCompositionProperties = {
    ...compositionPropertiesWithoutData,
    transform: {
      anyOf: [ref('transform'), arrayOf(ref('transform'))],
    },
    coordinate: ref('jsonObject'),
    axis: closeable(ref('jsonObject')),
    legend: closeable(ref('jsonObject')),
    slider: closeable(ref('jsonObject')),
    scrollbar: closeable(ref('jsonObject')),
  };
  const compositionOptions = {
    geoView: {
      coordinate: ref('jsonObject'),
    },
    geoPath: {
      coordinate: ref('jsonObject'),
      encode: markEncode,
      state,
    },
    spaceFlex: {
      direction: { enum: ['row', 'col'] },
      ratio: arrayOf({ type: 'number' }),
    },
    facetRect: {
      encode: compositionEncode,
      shareData: { type: 'boolean' },
      shareSize: { type: 'boolean' },
      transform: {
        anyOf: [ref('transform'), arrayOf(ref('transform'))],
      },
    },
    repeatMatrix: {
      encode: compositionEncode,
      transform: {
        anyOf: [ref('transform'), arrayOf(ref('transform'))],
      },
    },
    facetCircle: {
      encode: compositionEncode,
      transform: {
        anyOf: [ref('transform'), arrayOf(ref('transform'))],
      },
    },
    timingKeyframe: {
      duration: { type: 'number', minimum: 0 },
      easing: { type: 'string' },
      iterationCount: {
        anyOf: [{ const: 'infinite' }, { type: 'number', minimum: 0 }],
      },
      direction: {
        enum: ['normal', 'reverse', 'alternate', 'reverse-alternate'],
      },
    },
  };
  const compositionDefinitions = Object.fromEntries(
    catalog.compositionTypes.map((type) => [
      `composition_${type}`,
      type === 'view'
        ? object(
            { type: { const: type }, ...compositionProperties },
            { required: ['type'] },
          )
        : {
            type: 'object',
            properties: {
              type: { const: type },
              data: ref(
                type === 'geoView' || type === 'geoPath' ? 'geoData' : 'data',
              ),
              ...(compositionOptions[type] || {}),
            },
            required: ['type'],
            allOf: [ref('compositionBase')],
          },
    ]),
  );

  return {
    markBase: object(
      { type: { type: 'string' }, ...markProperties },
      { required: ['type'] },
    ),
    compositionBase: object(
      { type: { type: 'string' }, ...flexibleCompositionProperties },
      { required: ['type'], additionalProperties: ref('jsonValue') },
    ),
    ...compositionDefinitions,
    node: discriminated(
      [...catalog.markTypes, ...catalog.compositionTypes].map(
        (type) =>
          `${
            catalog.markTypes.includes(type) ? 'mark' : 'composition'
          }_${type}`,
      ),
    ),
  };
}

export function addNodeDefinitions(defs, catalog) {
  const markLayoutOptions = {
    sankey: {
      nodeAlign: { enum: ['left', 'center', 'right', 'justify'] },
      nodeWidth: { type: 'number', minimum: 0 },
      nodePadding: { type: 'number', minimum: 0 },
      iterations: { type: 'number', minimum: 0 },
    },
    chord: {
      y: { type: 'number' },
      sortBy: nullable({ enum: ['id', 'weight', 'frequency'] }),
      nodeWidthRatio: { type: 'number' },
      nodePaddingRatio: { type: 'number' },
    },
    tree: {
      field: { type: 'string' },
      nodeSize: tuple({ type: 'number' }, { type: 'number' }),
      as: tuple({ type: 'string' }, { type: 'string' }),
    },
    wordCloud: {
      size: tuple({ type: 'number' }, { type: 'number' }),
      font: { type: 'string' },
      fontStyle: { type: 'string' },
      fontWeight: primitive,
      fontSize: numberOrPair,
      padding: { type: 'number' },
      rotate: { type: 'number' },
      timeInterval: { type: 'number', minimum: 0 },
      random: { type: 'number' },
      spiral: { enum: ['archimedean', 'rectangular'] },
      imageMask: { type: 'string' },
    },
    partition: { fillParent: { type: 'boolean' } },
  };

  for (const type of catalog.markTypes) {
    defs[`mark_${type}`] = {
      type: 'object',
      properties: { type: { const: type } },
      required: ['type'],
      allOf: [
        ref('markBase'),
        ...(markLayoutOptions[type]
          ? [
              {
                type: 'object',
                properties: { layout: object(markLayoutOptions[type]) },
              },
            ]
          : []),
      ],
    };
  }
}
