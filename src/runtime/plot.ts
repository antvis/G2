import { Vector2 } from '@antv/coord';
import { DisplayObject, IAnimation as GAnimation, Rect } from '@antv/g';
import { deepMix, upperFirst } from '@antv/util';
import { group } from 'd3-array';
import { format } from 'd3-format';
import { mapObject } from '../utils/array';
import { ChartEvent } from '../utils/event';
import {
  appendTransform,
  copyAttributes,
  defined,
  error,
  maybeSubObject,
  subObject,
  useMemo,
} from '../utils/helper';
import { G2Element, select, Selection } from '../utils/selection';
import { inferComponent, renderComponent } from './component';
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
import { computeLayout, placeComponents } from './layout';
import { useLibrary } from './library';
import { initializeMark } from './mark';
import {
  applyScale,
  inferScale,
  syncFacetsScales,
  useRelationScale,
} from './scale';
import { applyDataTransform } from './transform';
import {
  G2MarkState,
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
  Shape,
  ShapeComponent,
  Theme,
  ThemeComponent,
} from './types/component';
import { CompositeMark, Mark, MarkComponent, SingleMark } from './types/mark';
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

export async function plot<T extends G2ViewTree>(
  options: T,
  selection: Selection,
  library: G2Library,
  context: G2Context,
): Promise<any> {
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
  const typeOf = (node: G2ViewTree) => {
    const { type } = node;
    if (typeof type === 'function') {
      // @ts-ignore
      const { props = {} } = type;
      const { composite = true } = props;
      if (composite) return 'mark';
    }
    return typeof type === 'string' && marks.has(type) ? 'mark' : type;
  };
  const isMark = (node: G2ViewTree) => typeOf(node) === 'mark';
  const isStandardView = (node: G2ViewTree) => typeOf(node) === 'standardView';
  const transform = (node: G2ViewTree) => {
    if (isStandardView(node)) return [node];
    const type = typeOf(node);
    const composition = useComposition({ type });
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
        : await initializeView(node, library);
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
          transformedNodes.map((d) => initializeMarks(d, library)),
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
      const n = isMark(node) ? node : await applyTransform(node, library);
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
          .each(function (view) {
            plotView(view, select(this), transitions, library);
            enterContainer.set(view, this);
          }),
      (update) =>
        update.call(applyTranslate).each(function (view) {
          plotView(view, select(this), transitions, library);
          updateContainer.set(view, this);
        }),
      (exit) =>
        exit
          .each(function () {
            // Remove existed interactions.
            const interactions = this['nameInteraction'].values();
            for (const interaction of interactions) {
              interaction.destroy();
            }
          })
          .remove(),
    );

  // Apply interactions.
  const viewInstanceof = (
    viewContainer: Map<G2ViewDescriptor, DisplayObject>,
  ) => {
    return Array.from(viewContainer.entries()).map(([view, container]) => ({
      view,
      container,
      options: viewNode.get(view),
      update: createUpdateView(select(container), library, context),
    }));
  };

  // Interactions for enter views.
  const enterViewInstances = viewInstanceof(enterContainer);
  for (const target of enterViewInstances) {
    const { options } = target;

    // A Map index interaction by interaction name.
    const nameInteraction = new Map();
    target.container['nameInteraction'] = nameInteraction;

    // Apply interactions.
    for (const option of inferInteraction(options)) {
      const interaction = useInteraction(option);
      const destroy = interaction(target, enterViewInstances, context.emitter);
      nameInteraction.set(option.type, { destroy });
    }
  }

  // Interactions for update views.
  const updateViewInstances = viewInstanceof(updateContainer);
  for (const target of updateViewInstances) {
    const { options, container } = target;
    const nameInteraction = container['nameInteraction'];
    for (const option of inferInteraction(options)) {
      // Remove interaction for existed views.
      const prevInteraction = nameInteraction.get(option.type);
      if (prevInteraction) prevInteraction.destroy?.();

      // Apply new interaction.
      const interaction = useInteraction(option);
      const destroy = interaction(target, updateViewInstances, context.emitter);
      nameInteraction.set(option.type, { destroy });
    }
  }

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
        await plot(sizedNode, selection, library, context);
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

function createUpdateView(
  selection: Selection,
  library: G2Library,
  context: G2Context,
): G2ViewInstance['update'] {
  return async (newOptions) => {
    const transitions = [];
    const [newView, newChildren] = await initializeView(newOptions, library);
    plotView(newView, selection, transitions, library);
    updateTooltip(selection, newOptions, newView, library, context);
    for (const child of newChildren) {
      plot(child, selection, library, context);
    }
    return { options: newOptions, view: newView };
  };
}

function updateTooltip(selection, options, view, library, context) {
  const [useInteraction] = useLibrary<
    G2InteractionOptions,
    InteractionComponent,
    Interaction
  >('interaction', library);

  // Instances for tooltip.
  const container = selection.node();
  const nameInteraction = container['nameInteraction'];
  const { interaction } = options;
  const tooltipOptions = inferInteraction(interaction).find(
    (d) => d.type === 'tooltip',
  );

  // Destroy older tooltip.
  const tooltip = nameInteraction.get('tooltip');
  if (!tooltip) return;
  tooltip.destroy?.();

  // Apply new tooltip interaction.
  const applyTooltip = useInteraction(tooltipOptions);
  const target = {
    options,
    view,
    container: selection.node(),
    update: (options) => Promise.resolve(options),
  };
  applyTooltip(target, [], context.emitter);
}

async function initializeView(
  options: G2View,
  library: G2Library,
): Promise<[G2ViewDescriptor, G2ViewTree[]]> {
  const flattenOptions = await transformMarks(options, library);

  const mergedOptions = bubbleOptions(flattenOptions);
  // @todo Remove this.
  // !!! NOTE: Mute original view options.
  // Update interaction and coordinate for this view.
  options.interaction = mergedOptions.interaction;
  options.coordinate = mergedOptions.coordinate;

  const transformedOptions = coordinate2Transform(mergedOptions, library);
  const state = await initializeMarks(transformedOptions, library);
  return initializeState(state, transformedOptions, library);
}

function bubbleOptions(options: G2View): G2View {
  const {
    coordinate: viewCoordinate = {},
    interaction: viewInteraction = {},
    marks,
    ...rest
  } = options;
  const markCoordinates = marks.map((d) => d.coordinate || {});
  const markInteractions = marks.map((d) => d.interaction || {});
  const newCoordinate = [...markCoordinates, viewCoordinate].reduceRight(
    (prev, cur) => deepMix(prev, cur),
    {},
  );
  const newInteraction = [viewInteraction, ...markInteractions].reduce(
    (prev, cur) => deepMix(prev, cur),
    {},
  );
  return {
    ...rest,
    marks,
    coordinate: newCoordinate,
    interaction: newInteraction,
  };
}

async function transformMarks(
  options: G2View,
  library: G2Library,
): Promise<G2View> {
  const [useMark, createMark] = useLibrary<G2MarkOptions, MarkComponent, Mark>(
    'mark',
    library,
  );

  const { marks } = options;
  const flattenMarks = [];
  const discovered = [...marks];

  // Pre order traversal.
  while (discovered.length) {
    const [node] = discovered.splice(0, 1);
    // Apply data transform to get data.
    const mark = (await applyTransform(node, library)) as G2Mark;
    const { type = error('G2Mark type is required.'), key } = mark;
    const { props = {} } = createMark(type);
    const { composite = true } = props;
    if (!composite) flattenMarks.push(mark);
    else {
      // Convert composite mark to marks.
      const marks = await (
        useMark as (options: G2MarkOptions) => CompositeMark
      )(mark)(options);
      const M = Array.isArray(marks) ? marks : [marks];
      discovered.unshift(...M.map((d, i) => ({ ...d, key: `${key}-${i}` })));
    }
  }

  return { ...options, marks: flattenMarks };
}

async function initializeMarks(
  options: G2View,
  library: G2Library,
): Promise<Map<G2Mark, G2MarkState>> {
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
    const markAndState = await initializeMark(markOptions, props, library);
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
    const scale = inferScale(
      name,
      values,
      options,
      coordinates,
      theme,
      library,
    );
    channels.forEach((channel) => (channel.scale = scale));
  }

  return markState;
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
  const scales = Array.from(
    new Set(states.flatMap((d) => d.channels.map((d) => d.scale))),
  );

  const components = inferComponent(
    inferComponentScales(Array.from(scales), states, markState),
    options,
    library,
  );
  const layout = computeLayout(components, options);
  const coordinate = createCoordinate(layout, options, library);
  const framedStyle = frame
    ? deepMix({ mainLineWidth: 1, mainStroke: '#000' }, style)
    : style;

  // Place components and mutate their bbox.
  placeComponents(components, coordinate, layout);

  // Calc data to be rendered for each mark.
  // @todo More readable APIs for Container which stays
  // the same style with JS standard and lodash APIs.
  // @todo More proper way to index scale for different marks.
  const scaleInstance = {};
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
    const markScaleInstance = mapObject(scale, (options) => {
      return useRelationScale(options, library);
    });
    Object.assign(scaleInstance, markScaleInstance);
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
    components,
    markState,
    key,
    clip,
    scale: scaleInstance,
    style: framedStyle,
    labelTransform: composeLabelTransform(
      labelTransform.map(useLabelTransform),
    ),
  };

  return [view, children];
}

async function plotView(
  view: G2ViewDescriptor,
  selection: Selection,
  transitions: GAnimation[],
  library: G2Library,
): Promise<void> {
  const { components, theme, layout, markState, coordinate, key, style, clip } =
    view;

  // Render background for the different areas.
  const { x, y, width, height, ...rest } = layout;
  const areaKeys = ['view', 'plot', 'main', 'content'];
  const I = areaKeys.map((_, i) => i);
  const sizeKeys = ['a', 'margin', 'padding', 'inset'];
  const areaStyles = areaKeys.map((d) =>
    maybeSubObject(Object.assign({}, theme, style), d),
  );
  const areaSizes = sizeKeys.map((d) => subObject(rest, d));
  const styleArea = (selection) =>
    selection
      .style('x', (i) => areaLayouts[i].x)
      .style('y', (i) => areaLayouts[i].y)
      .style('width', (i) => areaLayouts[i].width)
      .style('height', (i) => areaLayouts[i].height)
      .each(function (i) {
        applyStyle(select(this), areaStyles[i]);
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
  const componentsTransitions = selection
    .selectAll(className(COMPONENT_CLASS_NAME))
    .data(components, (d, i) => `${d.type}-${i}`)
    .join(
      (enter) =>
        enter
          .append('g')
          .style('zIndex', ({ zIndex }) => zIndex || -1)
          .attr('className', COMPONENT_CLASS_NAME)
          .append((options) =>
            renderComponent(
              deepMix({ animate: componentAnimateOptions }, options),
              coordinate,
              theme,
              library,
              markState,
            ),
          ),
      (update) =>
        update.transition(function (options: G2GuideComponentOptions) {
          const { preserve = false } = options;
          if (preserve) return;
          const newComponent = renderComponent(
            deepMix({ animate: componentAnimateOptions }, options),
            coordinate,
            theme,
            library,
            markState,
          );
          const { attributes } = newComponent;
          const [node] = this.childNodes;
          return node.update(attributes);
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
    const shapeFunction = createMarkShapeFunction(mark, state, view, library);
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
            .transition(function (data) {
              return enterFunction(data, [this]);
            }),
        (update) =>
          update.call((selection) => {
            const parent = selection.parent();
            const origin = useMemo<DisplayObject, [number, number]>((node) => {
              const [x, y] = node.getBounds().min;
              return [x, y];
            });
            update.transition(function (data, index) {
              maybeFacetElement(this, parent, origin);
              const node = shapeFunction(data, index);
              const animation = updateFunction(data, [this], [node]);
              if (animation === null) copyAttributes(this, node);
              return animation;
            });
          }),
        (exit) => {
          return exit
            .each(function () {
              this.__removed__ = true;
            })
            .transition(function (data) {
              return exitFunction(data, [this]);
            })
            .remove();
        },
        (merge) =>
          merge
            // Append elements to be merged.
            .append(shapeFunction)
            .attr('className', ELEMENT_CLASS_NAME)
            .attr('markType', type)
            .transition(function (data) {
              // Remove merged elements after animation finishing.
              const { __fromElements__: fromElements } = this;
              const transition = updateFunction(data, fromElements, [this]);
              const exit = new Selection(fromElements, null, this.parentNode);
              exit.transition(transition).remove();
              return transition;
            }),
        (split) =>
          split
            .transition(function (data) {
              // Append splitted shapes.
              const enter = new Selection([], this.__toData__, this.parentNode);
              const toElements = enter
                .append(shapeFunction)
                .attr('className', ELEMENT_CLASS_NAME)
                .attr('markType', type)
                .nodes();
              return updateFunction(data, [this], toElements);
            })
            // Remove elements to be splitted after animation finishing.
            .remove(),
      )
      .transitions();
    transitions.push(...T.flat());
  }

  // Plot label for this view.
  plotLabel(view, selection, transitions, library);
}

/**
 * Auto hide labels be specify label layout.
 */
function plotLabel(
  view: G2ViewDescriptor,
  selection: Selection,
  transitions: GAnimation[],
  library: G2Library,
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
    const shapeFunction = createLabelShapeFunction(mark, state, view, library);
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
        update.each(function (d) {
          // @todo Handle Label with different type.
          const shapeFunction = labelShapeFunction.get(d);
          const node = shapeFunction(d);
          copyAttributes(this, node);
        }),
      (exit) => exit.remove(),
    )
    .nodes();

  // Apply group-level transforms.
  const labelGroups = group(labelShapes, (d) =>
    labelDescriptor.get(d.__data__),
  );
  const { coordinate } = view;
  for (const [label, shapes] of labelGroups) {
    const { transform = [] } = label;
    const transformFunction = composeLabelTransform(
      transform.map(useLabelTransform),
    );
    transformFunction(shapes, coordinate);
  }

  // Apply view-level transform.
  if (labelTransform) {
    labelTransform(labelShapes, coordinate);
  }
}

function composeLabelTransform(transform: LabelTransform[]): LabelTransform {
  return (labels, coordinate) => {
    for (const t of transform) {
      labels = t(labels, coordinate);
    }
    return labels;
  };
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
): (options: Record<string, any>) => DisplayObject {
  const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const { data: abstractData } = mark;
  const { data: visualData, defaultLabelShape } = state;
  const point2d = visualData.map((d) => d.points);
  const { theme, coordinate } = view;
  return (options) => {
    const { index, points } = options;
    const datum = abstractData[index];
    const {
      formatter = (d) => `${d}`,
      transform,
      style: abstractStyle,
      ...abstractOptions
    } = options;
    const visualOptions = mapObject(
      { ...abstractOptions, ...abstractStyle } as Record<string, any>,
      (d) => valueOf(d, datum, index, abstractData),
    );
    const { shape = defaultLabelShape, text, ...style } = visualOptions;
    const f = typeof formatter === 'string' ? format(formatter) : formatter;
    const value = { ...style, text: f(text) };
    const shapeFunction = useShape({ type: `label.${shape}`, ...style });
    return shapeFunction(points, value, coordinate, theme, point2d);
  };
}

function valueOf(
  value: Primitive | ((d: any, i: number, array: any) => any),
  datum: Record<string, any>,
  i: number,
  data: Record<string, any>,
) {
  if (typeof value === 'function') return value(datum, i, data);
  if (typeof value !== 'string') return value;
  if (datum[value] !== undefined) return datum[value];
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
  library: G2Library,
): (
  data: Record<string, any>,
  index: number,
  element?: DisplayObject,
) => DisplayObject {
  const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const { data: abstractData } = mark;
  const { defaultShape, data } = state;
  const point2d = data.map((d) => d.points);
  const { theme, coordinate } = view;
  const { type: markType, style = {} } = mark;
  return (data, index) => {
    const { shape: styleShape = defaultShape } = style;
    const { shape = styleShape, points, seriesIndex, index: i, ...v } = data;
    const value = { ...v, shape, mark: markType, defaultShape, index };

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
      valueOf(d, abstractDatum, I, abstractData),
    );

    const shapeFunction = useShape({
      ...visualStyle,
      type: shapeName(mark, shape),
    });
    return shapeFunction(points, value, coordinate, theme, point2d);
  };
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
  const { defaultShape } = state;
  const { theme, coordinate } = view;
  const upperType = upperFirst(type) as 'Enter' | 'Exit' | 'Update';
  const key:
    | 'defaultEnterAnimation'
    | 'defaultExitAnimation'
    | 'defaultUpdateAnimation' = `default${upperType}Animation`;
  const { [key]: defaultAnimation } = createShape(
    shapeName(mark, defaultShape),
  ).props;
  const { [type]: defaultEffectTiming = {} } = theme;
  const animate = mark.animate?.[type] || {};
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
    const animateFunction = useAnimation(options);
    const value = { delay, duration, easing };
    const A = animateFunction(from, to, value, coordinate, defaultEffectTiming);
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
  const { type = 'classic', ...rest } = theme;
  return { ...rest, type };
}

/**
 * @todo Infer builtin tooltips.
 */
function inferInteraction(view: G2View): G2InteractionOptions[] {
  const defaults = {
    event: true,
    tooltip: true,
    // @todo Inferred by slider self.
    sliderFilter: true,
    legendFilter: true,
  };
  const { interaction = {} } = view;
  return Object.entries(deepMix(defaults, interaction))
    .filter((d) => !!d[1])
    .map(([key, value]) => ({
      type: key,
      ...(value as Record<string, any>),
    }));
}

async function applyTransform<T extends G2ViewTree>(
  node: T,
  library: G2Library,
): Promise<G2ViewTree> {
  const context = { library };
  const { data, ...rest } = node;
  if (data == undefined) return node;
  const [, { data: newData }] = await applyDataTransform([], { data }, context);
  return { data: newData, ...rest };
}

function updateBBox(selection: Selection) {
  selection
    .style('x', (d) => d.paddingLeft)
    .style('y', (d) => d.paddingTop)
    .style('width', (d) => d.innerWidth)
    .style('height', (d) => d.innerHeight);
}

function animateBBox(selection: Selection, extent: [number, number]) {
  const [delay, duration] = extent;
  selection.transition(function (data) {
    const { x, y, width, height } = this.style;
    const { paddingLeft, paddingTop, innerWidth, innerHeight } = data;
    const keyframes = [
      {
        x,
        y,
        width,
        height,
      },
      {
        x: paddingLeft,
        y: paddingTop,
        width: innerWidth,
        height: innerHeight,
      },
    ];
    return this.animate(keyframes, { delay, duration, fill: 'both' });
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
      innerWidth: width,
      innerHeight: height,
    } = data;
    return new Rect({ style: { x, y, width, height } });
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
