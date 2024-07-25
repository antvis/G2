import { Vector2 } from '@antv/coord';
import { DisplayObject, IAnimation as GAnimation, Rect } from '@antv/g';
import { deepMix, upperFirst, isArray } from '@antv/util';
import { group, groups } from 'd3-array';
import { format } from 'd3-format';
import { mapObject } from '../utils/array';
import { ChartEvent } from '../utils/event';
import {
  isStrictObject,
  appendTransform,
  compose,
  copyAttributes,
  defined,
  error,
  maybeSubObject,
  subObject,
  useMemo,
} from '../utils/helper';
import { G2Element, select, Selection } from '../utils/selection';
import {
  groupComponents,
  inferComponent,
  normalizeComponents,
  renderComponent,
} from './component';
import {
  AREA_CLASS_NAME,
  COMPONENT_CLASS_NAME,
  ELEMENT_CLASS_NAME,
  LABEL_CLASS_NAME,
  LABEL_LAYER_CLASS_NAME,
  MAIN_LAYER_CLASS_NAME,
  PLOT_CLASS_NAME,
  VIEW_CLASS_NAME,
} from './constant';
import { coordinate2Transform, createCoordinate } from './coordinate';
import {
  computeLayout,
  computeRoughPlotSize,
  placeComponents,
  processAxisZ,
} from './layout';
import { documentOf, useLibrary } from './library';
import { initializeMark } from './mark';
import {
  applyScale,
  assignScale,
  collectScales,
  inferScale,
  syncFacetsScales,
  useRelationScale,
  groupTransform,
} from './scale';
import { applyDataTransform } from './transform';
import {
  G2MarkState,
  G2Theme,
  G2ViewDescriptor,
  G2ViewInstance,
  Primitive,
} from './types/common';
import {
  Animation,
  AnimationComponent,
  Composition,
  CompositionComponent,
  Interaction,
  InteractionComponent,
  LabelTransform,
  LabelTransformComponent,
  Scale,
  Shape,
  ShapeComponent,
  Theme,
  ThemeComponent,
} from './types/component';
import { Mark, MarkComponent, SingleMark } from './types/mark';
import {
  G2AnimationOptions,
  G2CompositionOptions,
  G2Context,
  G2GuideComponentOptions,
  G2InteractionOptions,
  G2LabelTransformOptions,
  G2Library,
  G2Mark,
  G2MarkOptions,
  G2ScaleOptions,
  G2ShapeOptions,
  G2ThemeOptions,
  G2View,
  G2ViewTree,
} from './types/options';

type Store = Map<any, (options: G2ViewTree) => G2ViewTree>;

export async function plot<T extends G2ViewTree>(
  options: T,
  selection: Selection,
  context: G2Context,
): Promise<any> {
  const { library } = context;

  const [useComposition] = useLibrary<
    G2CompositionOptions,
    CompositionComponent,
    Composition
  >('composition', library);
  const [useInteraction] = useLibrary<
    G2InteractionOptions,
    InteractionComponent,
    Interaction
  >('interaction', library);

  // Some helper functions.
  const marks = new Set(
    Object.keys(library)
      .map((d) => /mark\.(.*)/.exec(d)?.[1])
      .filter(defined),
  );
  const staticMarks = new Set(
    Object.keys(library)
      .map((d) => /component\.(.*)/.exec(d)?.[1])
      .filter(defined),
  );

  const typeOf = (node: G2ViewTree) => {
    const { type } = node;
    if (typeof type === 'function') {
      // @ts-ignore
      const { props = {} } = type;
      const { composite = true } = props;
      if (composite) return 'mark';
    }
    if (typeof type !== 'string') return type;
    if (marks.has(type) || staticMarks.has(type)) return 'mark';
    return type;
  };

  const isMark = (node: G2ViewTree) => typeOf(node) === 'mark';
  const isStandardView = (node: G2ViewTree) => typeOf(node) === 'standardView';
  const isStaticMark = (node: G2ViewTree) => {
    const { type } = node;
    if (typeof type !== 'string') return false;
    if (staticMarks.has(type)) return true;
    return false;
  };

  const transform = (node: G2ViewTree) => {
    if (isStandardView(node)) return [node];
    const type = typeOf(node);
    const composition = useComposition({ type, static: isStaticMark(node) });
    return composition(node);
  };

  // Some temporary variables help parse the view tree.
  const views: G2ViewDescriptor[] = [];
  const viewNode = new Map<G2ViewDescriptor, G2ViewTree>();
  const nodeState = new Map<G2ViewTree, Map<G2Mark, G2MarkState>>();
  const discovered: G2ViewTree[] = [options];
  const nodeGenerators: Generator<G2ViewTree, void, void>[] = [];

  while (discovered.length) {
    const node = discovered.shift();
    if (isStandardView(node)) {
      // Initialize view to get data to be visualized. If the marks
      // of the view have already been initialized (facet view),
      // initialize the view based on the initialized mark states,
      // otherwise initialize it from beginning.
      const state = nodeState.get(node);
      const [view, children] = state
        ? initializeState(state, node, library)
        : await initializeView(node, context);
      viewNode.set(view, node);
      views.push(view);

      // Transform children, they will be transformed into
      // standardView if they are mark or view node.
      const transformedNodes = children
        .flatMap(transform)
        .map((d) => coordinate2Transform(d, library));
      discovered.push(...transformedNodes);

      // Only StandardView can be treated as facet and it
      // should sync position scales among facets normally.
      if (transformedNodes.every(isStandardView)) {
        const states = await Promise.all(
          transformedNodes.map((d) => initializeMarks(d, context)),
        );
        // Note!!!
        // This will mutate scales for marks.
        syncFacetsScales(states);
        for (let i = 0; i < transformedNodes.length; i++) {
          const nodeT = transformedNodes[i];
          const state = states[i];
          nodeState.set(nodeT, state);
        }
      }
    } else {
      // Apply transform to get data in advance for non-mark composition
      // node, which makes sure that composition node can preprocess the
      // data to produce more nodes based on it.
      const n = isMark(node) ? node : await applyTransform(node, context);
      const N = transform(n);
      if (Array.isArray(N)) discovered.push(...N);
      else if (typeof N === 'function') nodeGenerators.push(N());
    }
  }

  context.emitter.emit(ChartEvent.BEFORE_PAINT);

  // Plot chart.
  const enterContainer = new Map<G2ViewDescriptor, DisplayObject>();
  const updateContainer = new Map<G2ViewDescriptor, DisplayObject>();
  const transitions: GAnimation[] = [];
  selection
    .selectAll(className(VIEW_CLASS_NAME))
    .data(views, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append('g')
          .attr('className', VIEW_CLASS_NAME)
          .attr('id', (view) => view.key)
          .call(applyTranslate)
          .each(function (view, i, element) {
            plotView(view, select(element), transitions, context);
            enterContainer.set(view, element);
          }),
      (update) =>
        update.call(applyTranslate).each(function (view, i, element) {
          plotView(view, select(element), transitions, context);
          updateContainer.set(view, element);
        }),
      (exit) =>
        exit
          .each(function (d, i, element) {
            // Remove existed interactions.
            const interactions = element['nameInteraction'].values();
            for (const interaction of interactions) {
              interaction.destroy();
            }
          })
          .remove(),
    );

  // Apply interactions.
  const viewInstanceof = (
    viewContainer: Map<G2ViewDescriptor, DisplayObject>,
    updateInteractions?: (
      container: Map<G2ViewDescriptor, DisplayObject>,
      updateTypes?: string[],
      store?: Store,
    ) => void,
    oldStore?: Store,
  ) => {
    return Array.from(viewContainer.entries()).map(([view, container]) => {
      // Index state by component or interaction name,
      // such as legend, scrollbar, brushFilter.
      // Each state transform options to another options.
      const store =
        oldStore || new Map<any, (options: G2ViewTree) => G2ViewTree>();
      const setState = (key, reducer = (x) => x) => store.set(key, reducer);
      const options = viewNode.get(view);
      const update = createUpdateView(select(container), options, context);
      return {
        view,
        container,
        options,
        setState,
        update: async (from, updateTypes) => {
          // Apply all state functions to get new options.
          const reducer = compose(Array.from(store.values()));
          const newOptions = reducer(options);
          return await update(newOptions, from, () => {
            if (isArray(updateTypes)) {
              updateInteractions(viewContainer, updateTypes, store);
            }
          });
        },
      };
    });
  };

  const updateInteractions = (
    container = updateContainer,
    updateType?: string[],
    oldStore?: Map<any, (options: G2ViewTree) => G2ViewTree>,
  ) => {
    // Interactions for update views.
    const updateViewInstances = viewInstanceof(
      container,
      updateInteractions,
      oldStore,
    );

    for (const target of updateViewInstances) {
      const { options, container } = target;
      const nameInteraction = container['nameInteraction'];
      let typeOptions = inferInteraction(options);

      if (updateType) {
        typeOptions = typeOptions.filter((v) => updateType.includes(v[0]));
      }

      for (const typeOption of typeOptions) {
        const [type, option] = typeOption;
        // Remove interaction for existed views.
        const prevInteraction = nameInteraction.get(type);
        if (prevInteraction) prevInteraction.destroy?.();

        // Apply new interaction.
        if (option) {
          const interaction = useThemeInteraction(
            target.view,
            type,
            option as Record<string, any>,
            useInteraction,
          );
          const destroy = interaction(
            target,
            updateViewInstances,
            context.emitter,
          );
          nameInteraction.set(type, { destroy });
        }
      }
    }
  };

  // Interactions for enter views.
  const enterViewInstances = viewInstanceof(enterContainer, updateInteractions);
  for (const target of enterViewInstances) {
    const { options } = target;

    // A Map index interaction by interaction name.
    const nameInteraction = new Map();
    target.container['nameInteraction'] = nameInteraction;

    // Apply interactions.
    for (const typeOption of inferInteraction(options)) {
      const [type, option] = typeOption;
      if (option) {
        const interaction = useThemeInteraction(
          target.view,
          type,
          option as Record<string, any>,
          useInteraction,
        );
        const destroy = interaction(
          target,
          enterViewInstances,
          context.emitter,
        );
        nameInteraction.set(type, { destroy });
      }
    }
  }

  updateInteractions();

  // Author animations.
  const { width, height } = options;
  const keyframes = [];
  for (const nodeGenerator of nodeGenerators) {
    // Delay the rendering of animation keyframe. Different animation
    // created by different nodeGenerator will play in the same time.
    // eslint-disable-next-line no-async-promise-executor
    const keyframe = new Promise<void>(async (resolve) => {
      for (const node of nodeGenerator) {
        const sizedNode = { width, height, ...node };
        await plot(sizedNode, selection, context);
      }
      resolve();
    });
    keyframes.push(keyframe);
  }

  context.views = views;

  // Clear and update animation.
  context.animations?.forEach((animation) => animation?.cancel());
  context.animations = transitions;

  context.emitter.emit(ChartEvent.AFTER_PAINT);

  // Note!!!
  // The returned promise will never resolved if one of nodeGenerator
  // never stop to yield node, which may created by a keyframe composition
  // with iteration count set to infinite.
  const finished = transitions
    .filter(defined)
    .map(cancel)
    .map((d) => d.finished);
  return Promise.all([...finished, ...keyframes]);
}

function applyTranslate(selection: Selection) {
  selection.style(
    'transform',
    (d) => `translate(${d.layout.x}, ${d.layout.y})`,
  );
}

function definedInteraction(library: G2Library) {
  const [, createInteraction] = useLibrary<
    G2InteractionOptions,
    InteractionComponent,
    Interaction
  >('interaction', library);
  return (d) => {
    const [name, options] = d;
    try {
      return [name, createInteraction(name)] as const;
    } catch {
      return [name, options.type] as const;
    }
  };
}

function createUpdateView(
  selection: Selection,
  options: G2ViewTree,
  context: G2Context,
): G2ViewInstance['update'] {
  const { library } = context;
  const createDefinedInteraction = definedInteraction(library);
  const filter = (d) => d[1] && d[1].props && d[1].props.reapplyWhenUpdate;
  const interactions = inferInteraction(options);
  const updates = interactions
    .map(createDefinedInteraction)
    .filter(filter)
    .map((d) => d[0]);

  return async (newOptions, source, callback) => {
    const transitions = [];
    const [newView, newChildren] = await initializeView(newOptions, context);
    plotView(newView, selection, transitions, context);

    // Update interaction need to reapply when update.
    for (const name of updates.filter((d) => d !== source)) {
      updateInteraction(name, selection, newOptions, newView, context);
    }

    for (const child of newChildren) {
      plot(child, selection, context);
    }
    callback();
    return { options: newOptions, view: newView };
  };
}

function updateInteraction(
  name: string,
  selection: Selection,
  options: G2ViewTree,
  view: G2ViewDescriptor,
  context: G2Context,
) {
  const { library } = context;

  const [useInteraction] = useLibrary<
    G2InteractionOptions,
    InteractionComponent,
    Interaction
  >('interaction', library);

  // Instances for interaction.
  const container = selection.node();
  const nameInteraction = container['nameInteraction'];
  const interactionOptions = inferInteraction(options).find(
    ([d]) => d === name,
  );

  // Destroy older interaction.
  const interaction = nameInteraction.get(name);
  if (!interaction) return;
  interaction.destroy?.();

  if (!interactionOptions[1]) return;

  // Apply new interaction.
  const applyInteraction = useThemeInteraction(
    view,
    name,
    interactionOptions[1] as any,
    useInteraction,
  );
  const target = {
    options,
    view,
    container: selection.node(),
    update: (options) => Promise.resolve(options),
  };
  const destroy = applyInteraction(target, [], context.emitter);
  nameInteraction.set(name, { destroy });
}

async function initializeView(
  options: G2View,
  context: G2Context,
): Promise<[G2ViewDescriptor, G2ViewTree[]]> {
  const { library } = context;

  const flattenOptions = await transformMarks(options, context);

  const mergedOptions = bubbleOptions(flattenOptions);

  // @todo Remove this.
  // !!! NOTE: Mute original view options.
  // Update interaction and coordinate for this view.
  options.interaction = mergedOptions.interaction;
  options.coordinate = mergedOptions.coordinate;
  // @ts-ignore
  options.marks = [...mergedOptions.marks, ...mergedOptions.components];

  const transformedOptions = coordinate2Transform(mergedOptions, library);
  const state = await initializeMarks(transformedOptions, context);
  return initializeState(state, transformedOptions, library);
}

function bubbleOptions(options: G2View): G2View {
  const {
    coordinate: viewCoordinate = {},
    interaction: viewInteraction = {},
    style: viewStyle = {},
    marks,
    ...rest
  } = options;
  const markCoordinates = marks.map((d) => d.coordinate || {});
  const markInteractions = marks.map((d) => d.interaction || {});
  const markViewStyles = marks.map((d) => d.viewStyle || {});
  const newCoordinate = [...markCoordinates, viewCoordinate].reduceRight(
    (prev, cur) => deepMix(prev, cur),
    {},
  );
  const newInteraction = [viewInteraction, ...markInteractions].reduce(
    (prev, cur) => deepMix(prev, cur),
    {},
  );
  const newStyle = [...markViewStyles, viewStyle].reduce(
    (prev, cur) => deepMix(prev, cur),
    {},
  );
  return {
    ...rest,
    marks,
    coordinate: newCoordinate,
    interaction: newInteraction,
    style: newStyle,
  };
}

async function transformMarks(
  options: G2View,
  context: G2Context,
): Promise<G2View> {
  const { library } = context;

  const [useMark, createMark] = useLibrary<G2MarkOptions, MarkComponent, Mark>(
    'mark',
    library,
  );

  const staticMarks = new Set(
    Object.keys(library)
      .map((d) => /component\.(.*)/.exec(d)?.[1])
      .filter(defined),
  );
  const { marks } = options;
  const flattenMarks = [];
  const components = [];
  const discovered = [...marks];
  const { width, height } = computeRoughPlotSize(options);
  const markOptions = { options, width, height };

  // Pre order traversal.
  while (discovered.length) {
    const [node] = discovered.splice(0, 1);
    // Apply data transform to get data.
    const mark = (await applyTransform(node, context)) as G2Mark;
    const { type = error('G2Mark type is required.'), key } = mark;

    // For components.
    if (staticMarks.has(type as string)) components.push(mark);
    else {
      const { props = {} } = createMark(type);
      const { composite = true } = props;
      if (!composite) flattenMarks.push(mark);
      else {
        // Unwrap data from { value: data } to data,
        // then the composite mark can process the normalized data.
        const { data } = mark;
        const newMark = {
          ...mark,
          data: data ? (Array.isArray(data) ? data : data.value) : data,
        };

        // Convert composite mark to marks.
        const marks = await useMark(newMark, markOptions);
        const M = Array.isArray(marks) ? marks : [marks];
        discovered.unshift(...M.map((d, i) => ({ ...d, key: `${key}-${i}` })));
      }
    }
  }

  return { ...options, marks: flattenMarks, components };
}

async function initializeMarks(
  options: G2View,
  context: G2Context,
): Promise<Map<G2Mark, G2MarkState>> {
  const { library } = context;

  const [useTheme] = useLibrary<G2ThemeOptions, ThemeComponent, Theme>(
    'theme',
    library,
  );
  const [, createMark] = useLibrary<G2MarkOptions, MarkComponent, Mark>(
    'mark',
    library,
  );

  const {
    theme: partialTheme,
    marks: partialMarks,
    coordinates = [],
  } = options;
  const theme = useTheme(inferTheme(partialTheme));
  const markState = new Map<G2Mark, G2MarkState>();

  // Initialize channels for marks.
  for (const markOptions of partialMarks) {
    const { type } = markOptions;
    const { props = {} } = createMark(type);
    const markAndState = await initializeMark(markOptions, props, context);
    if (markAndState) {
      const [initializedMark, state] = markAndState;
      markState.set(initializedMark, state);
    }
  }

  // Group channels by scale key, each group has scale.
  const scaleChannels = group(
    Array.from(markState.values()).flatMap((d) => d.channels),
    ({ scaleKey }) => scaleKey,
  );

  // Infer scale for each channel groups.
  for (const channels of scaleChannels.values()) {
    // Merge scale options for these channels.
    const scaleOptions = channels.reduce(
      (total, { scale }) => deepMix(total, scale),
      {},
    );
    const { scaleKey } = channels[0];

    // Use the fields of the first channel as the title.
    const { values: FV } = channels[0];
    const fields = Array.from(new Set(FV.map((d) => d.field).filter(defined)));
    const options = deepMix(
      {
        guide: { title: fields.length === 0 ? undefined : fields },
        field: fields[0],
      },
      scaleOptions,
    );

    // Use the name of the first channel as the scale name.
    const { name } = channels[0];
    const values = channels.flatMap(({ values }) => values.map((d) => d.value));
    const scale = {
      ...inferScale(name, values, options, coordinates, theme, library),
      uid: Symbol('scale'),
      key: scaleKey,
    };
    channels.forEach((channel) => (channel.scale = scale));
  }

  return markState;
}

function useThemeInteraction(
  view: G2ViewDescriptor,
  type: string,
  option: Record<string, any>,
  useInteraction: (options: G2InteractionOptions, context?: any) => Interaction,
): Interaction {
  const theme = view.theme;
  const defaults = typeof type === 'string' ? theme[type] || {} : {};
  const interaction = useInteraction(
    deepMix(defaults, { type, ...(option as any) }),
  );
  return interaction;
}

function initializeState(
  markState: Map<G2Mark, G2MarkState>,
  options: G2View,
  library: G2Library,
): [G2ViewDescriptor, G2ViewTree[]] {
  const [useMark] = useLibrary<G2MarkOptions, MarkComponent, Mark>(
    'mark',
    library,
  );
  const [useTheme] = useLibrary<G2ThemeOptions, ThemeComponent, Theme>(
    'theme',
    library,
  );
  const [useLabelTransform] = useLibrary<
    G2LabelTransformOptions,
    LabelTransformComponent,
    LabelTransform
  >('labelTransform', library);

  const {
    key,
    frame = false,
    theme: partialTheme,
    clip,
    style = {},
    labelTransform = [],
  } = options;

  const theme = useTheme(inferTheme(partialTheme));

  // Infer components and compute layout.
  const states = Array.from(markState.values());
  const scales = collectScales(states, options);
  const components = normalizeComponents(
    inferComponent(
      inferComponentScales(Array.from(scales), states, markState),
      options,
      library,
    ),
  );
  const layout = computeLayout(components, options, theme, library);
  const coordinate = createCoordinate(layout, options, library);
  const framedStyle = frame
    ? deepMix({ mainLineWidth: 1, mainStroke: '#000' }, style)
    : style;

  // Place components and mutate their bbox.
  placeComponents(groupComponents(components), coordinate, layout);

  // AxisZ need a copy of axisX and axisY to show grids in X-Z & Y-Z planes.
  processAxisZ(components);

  // Index scale instance by uid.
  const uidScale = new Map(
    Array.from(markState.values()).flatMap((state) => {
      const { channels } = state;
      return channels.map(({ scale }) => [
        scale.uid,
        useRelationScale(scale, library),
      ]);
    }),
  );

  groupTransform(markState, uidScale);

  // Scale from marks and components.
  const scaleInstance: Record<string, Scale> = {};

  // Initialize scale from components.
  for (const component of components) {
    const { scales: scaleDescriptors = [] } = component;
    const scales = [];
    for (const descriptor of scaleDescriptors) {
      const { name, uid } = descriptor;
      const scale = uidScale.get(uid) ?? useRelationScale(descriptor, library);
      scales.push(scale);
      // Delivery the scale of axisX to the AxisY,
      // in order to calculate the angle of axisY component when rendering radar chart.
      if (name === 'y') {
        scale.update({
          ...scale.getOptions(),
          xScale: scaleInstance.x,
        });
      }
      assignScale(scaleInstance, { [name]: scale });
    }
    component.scaleInstances = scales;
  }

  // Calc data to be rendered for each mark.
  // @todo More readable APIs for Container which stays
  // the same style with JS standard and lodash APIs.
  // @todo More proper way to index scale for different marks.
  const children = [];
  for (const [mark, state] of markState.entries()) {
    const {
      // scale,
      // Callback to create children options based on this mark.
      children: createChildren,
      // The total count of data (both show and hide)for this facet.
      // This is for unit visualization to sync data domain.
      dataDomain,
      modifier,
      key: markKey,
    } = mark;
    const { index, channels, tooltip } = state;
    const scale = Object.fromEntries(
      channels.map(({ name, scale }) => [name, scale]),
    );
    // Transform abstract value to visual value by scales.
    const markScaleInstance = mapObject(scale, ({ uid }) => uidScale.get(uid));
    assignScale(scaleInstance, markScaleInstance);
    const value = applyScale(channels, markScaleInstance);

    // Calc points and transformation for each data,
    // and then transform visual value to visual data.
    const calcPoints = (useMark as (options: G2MarkOptions) => SingleMark)(
      mark,
    );
    const [I, P, S] = filterValid(
      calcPoints(index, markScaleInstance, value, coordinate),
    );
    const count = dataDomain || I.length;
    const T = modifier ? modifier(P, count, layout) : [];
    const titleOf = (i) => tooltip.title?.[i]?.value;
    const itemsOf = (i) => tooltip.items.map((V) => V[i]);
    const visualData: Record<string, any>[] = I.map((d, i) => {
      const datum = {
        points: P[i],
        transform: T[i],
        index: d,
        markKey,
        viewKey: key,
        ...(tooltip && {
          title: titleOf(d),
          items: itemsOf(d),
        }),
      };
      for (const [k, V] of Object.entries(value)) {
        datum[k] = V[d];
        if (S) datum[`series${upperFirst(k)}`] = S[i].map((i) => V[i]);
      }
      if (S) datum['seriesIndex'] = S[i];
      if (S && tooltip) {
        datum['seriesItems'] = S[i].map((si) => itemsOf(si));
        datum['seriesTitle'] = S[i].map((si) => titleOf(si));
      }
      return datum;
    });
    state.data = visualData;
    state.index = I;

    // Create children options by children callback,
    // and then propagate data to each child.
    const markChildren = createChildren?.(
      visualData,
      markScaleInstance,
      layout,
    );
    children.push(...(markChildren || []));
  }

  const view = {
    layout,
    theme,
    coordinate,
    markState,
    key,
    clip,
    scale: scaleInstance,
    style: framedStyle,
    components,
    labelTransform: compose(labelTransform.map(useLabelTransform)),
  };

  return [view, children];
}

async function plotView(
  view: G2ViewDescriptor,
  selection: Selection,
  transitions: GAnimation[],
  context: G2Context,
): Promise<void> {
  const { library } = context;
  const {
    components,
    theme,
    layout,
    markState,
    coordinate,
    key,
    style,
    clip,
    scale,
  } = view;

  // Render background for the different areas.
  const { x, y, width, height, ...rest } = layout;
  const areaKeys = ['view', 'plot', 'main', 'content'];
  const I = areaKeys.map((_, i) => i);
  const sizeKeys = ['a', 'margin', 'padding', 'inset'];
  const areaStyles = areaKeys.map((d) =>
    maybeSubObject(Object.assign({}, theme.view, style), d),
  );
  const areaSizes = sizeKeys.map((d) => subObject(rest, d));
  const styleArea = (selection) =>
    selection
      .style('x', (i) => areaLayouts[i].x)
      .style('y', (i) => areaLayouts[i].y)
      .style('width', (i) => areaLayouts[i].width)
      .style('height', (i) => areaLayouts[i].height)
      .each(function (i, d, element) {
        applyStyle(select(element), areaStyles[i]);
      });
  let px = 0;
  let py = 0;
  let pw = width;
  let ph = height;
  const areaLayouts = I.map((i) => {
    const size = areaSizes[i];
    const { left = 0, top = 0, bottom = 0, right = 0 } = size;
    px += left;
    py += top;
    pw -= left + right;
    ph -= top + bottom;
    return {
      x: px,
      y: py,
      width: pw,
      height: ph,
    };
  });
  selection
    .selectAll(className(AREA_CLASS_NAME))
    .data(
      // Only render area with defined style.
      I.filter((i) => defined(areaStyles[i])),
      (i) => areaKeys[i],
    )
    .join(
      (enter) =>
        enter
          .append('rect')
          .attr('className', AREA_CLASS_NAME)
          .style('zIndex', -2)
          .call(styleArea),
      (update) => update.call(styleArea),
      (exit) => exit.remove(),
    );

  const animationExtent = computeAnimationExtent(markState);

  const componentAnimateOptions = animationExtent
    ? { duration: animationExtent[1] }
    : false;

  // Render components.
  // @todo renderComponent return ctor and options.
  // Key for each type of component.
  // Index them grouped by position.
  for (const [, C] of groups(components, (d) => `${d.type}-${d.position}`)) {
    C.forEach((d, i) => (d.index = i));
  }

  const componentsTransitions = selection
    .selectAll(className(COMPONENT_CLASS_NAME))
    .data(components, (d) => `${d.type}-${d.position}-${d.index}`)
    .join(
      (enter) =>
        enter
          .append('g')
          .style('zIndex', ({ zIndex }) => zIndex || -1)
          .attr('className', COMPONENT_CLASS_NAME)
          .append((options) =>
            renderComponent(
              deepMix({ animate: componentAnimateOptions, scale }, options),
              coordinate,
              theme,
              library,
              markState,
            ),
          ),
      (update) =>
        update.transition(function (
          options: G2GuideComponentOptions,
          i,
          element,
        ) {
          const { preserve = false } = options;
          if (preserve) return;
          const newComponent = renderComponent(
            deepMix({ animate: componentAnimateOptions, scale }, options),
            coordinate,
            theme,
            library,
            markState,
          );
          const { attributes } = newComponent;
          const [node] = element.childNodes;
          return node.update(attributes, false);
        }),
    )
    .transitions();

  transitions.push(...componentsTransitions.flat().filter(defined));

  // Main layer is for showing the main visual representation such as marks. There
  // may be multiple main layers for a view, each main layer correspond to one of marks.
  // @todo Test DOM structure.
  const T = selection
    .selectAll(className(PLOT_CLASS_NAME))
    .data([layout], () => key)
    .join(
      (enter) =>
        enter
          // Make this layer interactive, such as click and mousemove events.
          .append('rect')
          .style('zIndex', 0)
          .style('fill', 'transparent')
          .attr('className', PLOT_CLASS_NAME)
          .call(updateBBox)
          .call(updateLayers, Array.from(markState.keys()))
          .call(applyClip, clip),
      (update) =>
        update
          .call(updateLayers, Array.from(markState.keys()))
          .call((selection) => {
            return animationExtent
              ? animateBBox(selection, animationExtent)
              : updateBBox(selection);
          })
          .call(applyClip, clip),
    )
    .transitions();
  transitions.push(...T.flat());

  // Render marks with corresponding data.
  for (const [mark, state] of markState.entries()) {
    const { data } = state;
    const { key, class: cls, type } = mark;
    const viewNode = selection.select(`#${key}`);
    const shapeFunction = createMarkShapeFunction(mark, state, view, context);
    const enterFunction = createEnterFunction(mark, state, view, library);
    const updateFunction = createUpdateFunction(mark, state, view, library);
    const exitFunction = createExitFunction(mark, state, view, library);
    const facetElements = selectFacetElements(
      selection,
      viewNode,
      cls,
      'element',
    );
    const T = viewNode
      .selectAll(className(ELEMENT_CLASS_NAME))
      .selectFacetAll(facetElements)
      .data(
        data,
        (d) => d.key,
        (d) => d.groupKey,
      )
      .join(
        (enter) =>
          enter
            .append(shapeFunction)
            // Note!!! Only one className can be set.
            // Using attribute as alternative for other classNames.
            .attr('className', ELEMENT_CLASS_NAME)
            .attr('markType', type)
            .transition(function (data, i, element) {
              return enterFunction(data, [element]);
            }),
        (update) =>
          update.call((selection) => {
            const parent = selection.parent();
            const origin = useMemo<DisplayObject, [number, number]>((node) => {
              const [x, y] = node.getBounds().min;
              return [x, y];
            });
            selection
              .transition(function (data, index, element) {
                maybeFacetElement(element, parent, origin);
                const node = shapeFunction(data, index);
                const animation = updateFunction(data, [element], [node]);
                if (animation !== null) return animation;
                if (
                  element.nodeName === node.nodeName &&
                  node.nodeName !== 'g'
                ) {
                  copyAttributes(element, node);
                } else {
                  element.parentNode.replaceChild(node, element);
                  node.className = ELEMENT_CLASS_NAME;
                  // @ts-ignore
                  node.markType = type;
                  // @ts-ignore
                  node.__data__ = element.__data__;
                }
                return animation;
              })
              .attr('markType', type)
              .attr('className', ELEMENT_CLASS_NAME);
          }),
        (exit) => {
          return exit
            .each(function (d, i, element) {
              element.__removed__ = true;
            })
            .transition(function (data, i, element) {
              return exitFunction(data, [element]);
            })
            .remove();
        },
        (merge) =>
          merge
            // Append elements to be merged.
            .append(shapeFunction)
            .attr('className', ELEMENT_CLASS_NAME)
            .attr('markType', type)
            .transition(function (data, i, element) {
              // Remove merged elements after animation finishing.
              const { __fromElements__: fromElements } = element;
              const transition = updateFunction(data, fromElements, [element]);
              const exit = new Selection(
                fromElements,
                null,
                element.parentNode,
              );
              exit.transition(transition).remove();
              return transition;
            }),
        (split) =>
          split
            .transition(function (data, i, element) {
              // Append splitted shapes.
              const enter = new Selection(
                [],
                element.__toData__,
                element.parentNode,
              );
              const toElements = enter
                .append(shapeFunction)
                .attr('className', ELEMENT_CLASS_NAME)
                .attr('markType', type)
                .nodes();
              return updateFunction(data, [element], toElements);
            })
            // Remove elements to be splitted after animation finishing.
            .remove(),
      )
      .transitions();
    transitions.push(...T.flat());
  }

  // Plot label for this view.
  plotLabel(view, selection, transitions, library, context);
}

/**
 * Auto hide labels be specify label layout.
 */
function plotLabel(
  view: G2ViewDescriptor,
  selection: Selection,
  transitions: GAnimation[],
  library: G2Library,
  context: G2Context,
) {
  const [useLabelTransform] = useLibrary<
    G2LabelTransformOptions,
    LabelTransformComponent,
    LabelTransform
  >('labelTransform', library);
  const { markState, labelTransform } = view;
  const labelLayer = selection.select(className(LABEL_LAYER_CLASS_NAME)).node();

  // A Map index shapeFunction by label.
  const labelShapeFunction = new Map();

  // A Map index options by label.
  const labelDescriptor = new Map();

  // Get all labels for this view.
  const labels = Array.from(markState.entries()).flatMap(([mark, state]) => {
    const { labels: labelOptions = [], key } = mark;
    const shapeFunction = createLabelShapeFunction(
      mark,
      state,
      view,
      library,
      context,
    );
    const elements = selection
      .select(`#${key}`)
      .selectAll(className(ELEMENT_CLASS_NAME))
      .nodes()
      // Only select the valid element.
      .filter((n) => !n.__removed__);
    return labelOptions.flatMap((labelOption, i) => {
      const { transform = [], ...options } = labelOption;
      return elements.flatMap((e) => {
        const L = getLabels(options, i, e);
        L.forEach((l) => {
          labelShapeFunction.set(l, shapeFunction);
          labelDescriptor.set(l, labelOption);
        });
        return L;
      });
    });
  });

  // Render all labels.
  const labelShapes = select(labelLayer)
    .selectAll(className(LABEL_CLASS_NAME))
    .data(labels, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append((d) => labelShapeFunction.get(d)(d))
          .attr('className', LABEL_CLASS_NAME),
      (update) =>
        update.each(function (d, i, element) {
          // @todo Handle Label with different type.
          const shapeFunction = labelShapeFunction.get(d);
          const node = shapeFunction(d);
          copyAttributes(element, node);
        }),
      (exit) => exit.remove(),
    )
    .nodes();

  // Apply group-level transforms.
  const labelGroups = group(labelShapes, (d) =>
    labelDescriptor.get(d.__data__),
  );
  const { coordinate } = view;

  const labelTransformContext = {
    canvas: context.canvas,
    coordinate,
  };
  for (const [label, shapes] of labelGroups) {
    const { transform = [] } = label;
    const transformFunction = compose(transform.map(useLabelTransform));
    transformFunction(shapes, labelTransformContext);
  }

  // Apply view-level transform.
  if (labelTransform) {
    labelTransform(labelShapes, labelTransformContext);
  }
}

function getLabels(
  label: Record<string, any>,
  labelIndex: number,
  element: G2Element,
): Record<string, any>[] {
  const { seriesIndex: SI, seriesKey, points, key, index } = element.__data__;
  const bounds = getLocalBounds(element);
  if (!SI) {
    return [
      {
        ...label,
        key: `${key}-${labelIndex}`,
        bounds,
        index,
        points,
        dependentElement: element,
      },
    ];
  }
  const selector = normalizeLabelSelector(label);
  const F = SI.map((index: number, i: number) => ({
    ...label,
    key: `${seriesKey[i]}-${labelIndex}`,
    bounds: [points[i]],
    index,
    points,
    dependentElement: element,
  }));
  return selector ? selector(F) : F;
}

function filterValid([I, P, S]: [number[], Vector2[][], number[][]?]): [
  number[],
  Vector2[][],
  number[][]?,
] {
  if (S) return [I, P, S];
  const definedIndex = [];
  const definedPoints = [];
  for (let i = 0; i < I.length; i++) {
    const d = I[i];
    const p = P[i];
    if (p.every(([x, y]) => defined(x) && defined(y))) {
      definedIndex.push(d);
      definedPoints.push(p);
    }
  }
  return [definedIndex, definedPoints];
}

function normalizeLabelSelector(
  label: Record<string, any>,
): (I: number[]) => number[] {
  const { selector } = label;
  if (!selector) return null;
  if (typeof selector === 'function') return selector;
  if (selector === 'first') return (I) => [I[0]];
  if (selector === 'last') return (I) => [I[I.length - 1]];
  throw new Error(`Unknown selector: ${selector}`);
}

/**
 * Avoid getting error bounds caused by element animations.
 * @todo Remove this temporary handle method, if runtime supports
 * correct process: drawElement, do label layout and then do
 * transitions together.
 */
function getLocalBounds(element: DisplayObject) {
  const cloneElement = element.cloneNode();
  const animations = element.getAnimations();
  cloneElement.style.visibility = 'hidden';
  animations.forEach((animation) => {
    const keyframes = animation.effect.getKeyframes();
    cloneElement.attr(keyframes[keyframes.length - 1]);
  });
  element.parentNode.appendChild(cloneElement);
  const bounds = cloneElement.getLocalBounds();
  cloneElement.destroy();
  const { min, max } = bounds;
  return [min, max];
}

function createLabelShapeFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
  context: G2Context,
): (options: Record<string, any>) => DisplayObject {
  const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const { data: abstractData, encode } = mark;
  const { data: visualData, defaultLabelShape } = state;
  const point2d = visualData.map((d) => d.points);
  const channel = mapObject(encode, (d) => d.value);

  // Assemble Context.
  const { theme, coordinate } = view;
  const shapeContext = {
    ...context,
    document: documentOf(context),
    theme,
    coordinate,
  };

  return (options) => {
    // Computed values from data and styles.
    const { index, points } = options;
    const datum = abstractData[index];
    const {
      formatter = (d) => `${d}`,
      transform,
      style: abstractStyle,
      render,
      ...abstractOptions
    } = options;
    const visualOptions = mapObject(
      { ...abstractOptions, ...abstractStyle } as Record<string, any>,
      (d) => valueOf(d, datum, index, abstractData, { channel }),
    );
    const { shape = defaultLabelShape, text, ...style } = visualOptions;
    const f = typeof formatter === 'string' ? format(formatter) : formatter;
    const value = {
      ...style,
      text: f(text, datum, index, abstractData),
      datum,
    };

    // Params for create shape.
    const shapeOptions = { type: `label.${shape}`, render, ...style };
    const shapeFunction = useShape(shapeOptions, shapeContext);
    const defaults = getDefaultsStyle(theme, 'label', shape, 'label');

    return shapeFunction(points, value, defaults, point2d);
  };
}

function valueOf(
  value: Primitive | ((d: any, i: number, array: any, channel: any) => any),
  datum: Record<string, any>,
  i: number,
  data: Record<string, any>,
  options: { channel: Record<string, any> },
) {
  if (typeof value === 'function') return value(datum, i, data, options);
  if (typeof value !== 'string') return value;
  if (isStrictObject(datum) && datum[value] !== undefined) return datum[value];
  return value;
}

/**
 * Compute max duration for this frame.
 */
function computeAnimationExtent(markState): [number, number] {
  let maxDuration = -Infinity;
  let minDelay = Infinity;
  for (const [mark, state] of markState) {
    const { animate = {} } = mark;
    const { data } = state;
    const { enter = {}, update = {}, exit = {} } = animate;
    const {
      type: defaultUpdateType,
      duration: defaultUpdateDuration = 300,
      delay: defaultUpdateDelay = 0,
    } = update;
    const {
      type: defaultEnterType,
      duration: defaultEnterDuration = 300,
      delay: defaultEnterDelay = 0,
    } = enter;
    const {
      type: defaultExitType,
      duration: defaultExitDuration = 300,
      delay: defaultExitDelay = 0,
    } = exit;
    for (const d of data) {
      const {
        updateType = defaultUpdateType,
        updateDuration = defaultUpdateDuration,
        updateDelay = defaultUpdateDelay,
        enterType = defaultEnterType,
        enterDuration = defaultEnterDuration,
        enterDelay = defaultEnterDelay,
        exitDuration = defaultExitDuration,
        exitDelay = defaultExitDelay,
        exitType = defaultExitType,
      } = d;

      if (updateType === undefined || updateType) {
        maxDuration = Math.max(maxDuration, updateDuration + updateDelay);
        minDelay = Math.min(minDelay, updateDelay);
      }
      if (exitType === undefined || exitType) {
        maxDuration = Math.max(maxDuration, exitDuration + exitDelay);
        minDelay = Math.min(minDelay, exitDelay);
      }
      if (enterType === undefined || enterType) {
        maxDuration = Math.max(maxDuration, enterDuration + enterDelay);
        minDelay = Math.min(minDelay, enterDelay);
      }
    }
  }
  if (maxDuration === -Infinity) return null;
  return [minDelay, maxDuration - minDelay];
}

function selectFacetElements(
  selection: Selection,
  current: Selection,
  facetClassName: string,
  elementClassName: string,
): DisplayObject[] {
  const group = selection.node().parentElement;
  return group
    .findAll(
      (node) =>
        node.style.facet !== undefined &&
        node.style.facet === facetClassName &&
        node !== current.node(), // Exclude current view.
    )
    .flatMap((node) => node.getElementsByClassName(elementClassName));
}

/**
 * Update the parent of element and apply transform to make it
 * stay in original position.
 */
function maybeFacetElement(
  element: G2Element,
  parent: DisplayObject,
  originOf: (node: DisplayObject) => [number, number],
): void {
  if (!element.__facet__) return;
  // element -> g#main -> rect#plot
  const prePlot = element.parentNode.parentNode as DisplayObject;
  // g#main -> rect#plot
  const newPlot = parent.parentNode as DisplayObject;
  const [px, py] = originOf(prePlot);
  const [x, y] = originOf(newPlot);
  const translate = `translate(${px - x}, ${py - y})`;
  appendTransform(element, translate);
  parent.append(element);
}

function createMarkShapeFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  context: G2Context,
): (
  data: Record<string, any>,
  index: number,
  element?: DisplayObject,
) => DisplayObject {
  const { library } = context;

  const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const { data: abstractData, encode } = mark;
  const { defaultShape, data, shape: shapeLibrary } = state;
  const channel = mapObject(encode, (d) => d.value);
  const point2d = data.map((d) => d.points);
  const { theme, coordinate } = view;
  const { type: markType, style = {} } = mark;
  const shapeContext = {
    ...context,
    document: documentOf(context),
    coordinate,
    theme,
  };
  return (data) => {
    const { shape: styleShape = defaultShape } = style;
    const { shape = styleShape, points, seriesIndex, index: i, ...v } = data;
    const value = { ...v, index: i };

    // Get data-driven style.
    // If it is a series shape, such as area and line,
    // provides the series of abstract data and indices
    // for this shape, otherwise the single datum and
    // index.
    const abstractDatum = seriesIndex
      ? seriesIndex.map((i) => abstractData[i])
      : abstractData[i];

    const I = seriesIndex ? seriesIndex : i;
    const visualStyle = mapObject(style, (d) =>
      valueOf(d, abstractDatum, I, abstractData, { channel }),
    );

    // Try get shape from mark first, then from library.
    const shapeFunction = shapeLibrary[shape]
      ? shapeLibrary[shape](visualStyle, shapeContext)
      : useShape(
          { ...visualStyle, type: shapeName(mark, shape) },
          shapeContext,
        );

    const defaults = getDefaultsStyle(theme, markType, shape, defaultShape);
    return shapeFunction(points, value, defaults, point2d);
  };
}

function getDefaultsStyle(
  theme: G2Theme,
  mark: string | MarkComponent,
  shape: string,
  defaultShape: string,
) {
  if (typeof mark !== 'string') return;
  const { color } = theme;
  const markTheme = theme[mark] || {};
  const shapeTheme = markTheme[shape] || markTheme[defaultShape];
  return Object.assign({ color }, shapeTheme);
}

function createAnimationFunction(
  type: 'enter' | 'exit' | 'update',
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (
  data: Record<string, any>,
  from: DisplayObject[],
  to: DisplayObject[],
) => GAnimation[] {
  const [, createShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const [useAnimation] = useLibrary<
    G2AnimationOptions,
    AnimationComponent,
    Animation
  >('animation', library);
  const { defaultShape, shape: shapeLibrary } = state;
  const { theme, coordinate } = view;

  const upperType = upperFirst(type) as 'Enter' | 'Exit' | 'Update';
  const key:
    | 'defaultEnterAnimation'
    | 'defaultExitAnimation'
    | 'defaultUpdateAnimation' = `default${upperType}Animation`;

  // Get shape from mark first, then from library.
  const { [key]: defaultAnimation } =
    shapeLibrary[defaultShape]?.props ||
    createShape(shapeName(mark, defaultShape)).props;

  const { [type]: defaultEffectTiming = {} } = theme;
  const animate = mark.animate?.[type] || {};
  const context = { coordinate };

  return (data, from, to) => {
    const {
      [`${type}Type`]: animation,
      [`${type}Delay`]: delay,
      [`${type}Duration`]: duration,
      [`${type}Easing`]: easing,
    } = data;

    const options = {
      type: animation || defaultAnimation,
      ...animate,
    };
    if (!options.type) return null;

    const animateFunction = useAnimation(options, context);
    const value = { delay, duration, easing };
    const A = animateFunction(from, to, deepMix(defaultEffectTiming, value));
    if (!Array.isArray(A)) return [A];
    return A;
  };
}

function createEnterFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (
  data: Record<string, any>,
  from?: DisplayObject[],
  to?: DisplayObject[],
) => GAnimation[] {
  return createAnimationFunction('enter', mark, state, view, library);
}

/**
 * Animation will not cancel automatically, it should be canceled
 * manually. This is very important for performance.
 */
function cancel(animation: GAnimation): GAnimation {
  animation.finished.then(() => {
    animation.cancel();
  });
  return animation;
}

function createUpdateFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (
  data: Record<string, any>,
  from?: DisplayObject[],
  to?: DisplayObject[],
) => GAnimation[] {
  return createAnimationFunction('update', mark, state, view, library);
}

function createExitFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (
  data: Record<string, any>,
  from?: DisplayObject[],
  to?: DisplayObject[],
) => GAnimation[] {
  return createAnimationFunction('exit', mark, state, view, library);
}

function inferTheme(theme: G2ThemeOptions = {}): G2ThemeOptions {
  if (typeof theme === 'string') return { type: theme };
  const { type = 'light', ...rest } = theme;
  return { ...rest, type };
}

/**
 * @todo Infer builtin tooltips.
 */
function inferInteraction(
  view: G2View,
): [string, boolean | Omit<G2InteractionOptions, 'type'>][] {
  const defaults = {
    event: true,
    tooltip: true,
    // @todo Inferred by slider self.
    sliderFilter: true,
    legendFilter: true,
    scrollbarFilter: true,
  };
  const { interaction = {} } = view;
  return Object.entries(deepMix(defaults, interaction)).reverse();
}

async function applyTransform<T extends G2ViewTree>(
  node: T,
  context: G2Context,
): Promise<G2ViewTree> {
  const { data, ...rest } = node;
  if (data == undefined) return node;
  const [, { data: newData }] = await applyDataTransform([], { data }, context);
  return { data: newData, ...rest };
}

function updateBBox(selection: Selection) {
  selection
    .style(
      'transform',
      (d) =>
        `translate(${d.paddingLeft + d.marginLeft}, ${
          d.paddingTop + d.marginTop
        })`,
    )
    .style('width', (d) => d.innerWidth)
    .style('height', (d) => d.innerHeight);
}

function animateBBox(selection: Selection, extent: [number, number]) {
  const [delay, duration] = extent;
  selection.transition(function (data, i, element) {
    const { transform, width, height } = element.style;
    const {
      paddingLeft,
      paddingTop,
      innerWidth,
      innerHeight,
      marginLeft,
      marginTop,
    } = data;
    const keyframes = [
      {
        transform,
        width,
        height,
      },
      {
        transform: `translate(${paddingLeft + marginLeft}, ${
          paddingTop + marginTop
        })`,
        width: innerWidth,
        height: innerHeight,
      },
    ];
    return element.animate(keyframes, { delay, duration, fill: 'both' });
  });
}

function shapeName(mark, name) {
  const { type } = mark;
  if (typeof name === 'string') return `${type}.${name}`;
  return name;
}

/**
 * Create and update layer for each mark.
 * All the layers created here are treated as main layers.
 */
function updateLayers(selection: Selection, marks: G2Mark[]) {
  const facet = (d) => (d.class !== undefined ? `${d.class}` : '');

  // Skip for empty selection, it can't append nodes.
  const nodes = selection.nodes();
  if (nodes.length === 0) return;

  selection
    .selectAll(className(MAIN_LAYER_CLASS_NAME))
    .data(marks, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append('g')
          .attr('className', MAIN_LAYER_CLASS_NAME)
          .attr('id', (d) => d.key)
          .style('facet', facet)
          .style('fill', 'transparent')
          .style('zIndex', (d) => d.zIndex ?? 0),
      (update) =>
        update
          .style('facet', facet)
          .style('fill', 'transparent')
          .style('zIndex', (d) => d.zIndex ?? 0),
      (exit) => exit.remove(),
    );

  const labelLayer = selection.select(className(LABEL_LAYER_CLASS_NAME)).node();
  if (labelLayer) return;
  selection
    .append('g')
    .attr('className', LABEL_LAYER_CLASS_NAME)
    .style('zIndex', 0);
}

function className(...names: string[]): string {
  return names.map((d) => `.${d}`).join('');
}

function applyClip(selection, clip?: boolean) {
  if (!selection.node()) return;
  selection.style('clipPath', (data) => {
    if (!clip) return null;
    const {
      paddingTop: y,
      paddingLeft: x,
      marginLeft: x1,
      marginTop: y1,
      innerWidth: width,
      innerHeight: height,
    } = data;
    return new Rect({ style: { x: x + x1, y: y + y1, width, height } });
  });
}

function inferComponentScales(
  scales: G2ScaleOptions[],
  states: G2MarkState[],
  markState: Map<G2Mark, G2MarkState>,
): G2ScaleOptions[] {
  // add shape scale to state.

  // for cell, omit shape scale.
  // @todo support shape scale for cell.
  for (const [key] of markState.entries()) {
    if (key.type === 'cell') {
      return scales.filter((scale) => scale.name !== 'shape');
    }
  }

  // can't infer shape scale if there are multiple states.
  if (states.length !== 1 || scales.some((scale) => scale.name === 'shape')) {
    return scales;
  }

  const { defaultShape: shape } = states[0];
  const acceptMarkTypes = ['point', 'line', 'rect', 'hollow'];
  if (!acceptMarkTypes.includes(shape)) return scales;
  const shapeMap = {
    point: 'point',
    line: 'hyphen',
    rect: 'square',
    hollow: 'hollow',
  };

  // create shape scale
  const field = scales.find((scale) => scale.name === 'color')?.field || null;
  const shapeScale = {
    field,
    name: 'shape',
    type: 'constant',
    domain: [],
    range: [shapeMap[shape]],
  };
  return [...scales, shapeScale];
}

export function applyStyle(
  selection: Selection,
  style: Record<string, Primitive>,
) {
  for (const [key, value] of Object.entries(style)) {
    selection.style(key, value);
  }
}
