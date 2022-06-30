import { DisplayObject, Animation as GAnimation } from '@antv/g';
import { upperFirst } from '@antv/util';
import { mapObject } from '../utils/array';
import { copyAttributes, error, defined, composeAsync } from '../utils/helper';
import { Selection, select } from '../utils/selection';
import {
  G2ViewTree,
  G2View,
  G2MarkOptions,
  G2ScaleOptions,
  G2ThemeOptions,
  G2Mark,
  G2Library,
  G2ShapeOptions,
  G2AnimationOptions,
  G2CompositionOptions,
  G2AdjustOptions,
  G2TransformOptions,
  G2InteractionOptions,
} from './types/options';
import {
  ThemeComponent,
  Theme,
  ScaleComponent,
  Scale,
  Shape,
  ShapeComponent,
  AnimationComponent,
  Animation,
  CompositionComponent,
  Composition,
  AdjustComponent,
  Adjust,
  InteractionComponent,
  Interaction,
} from './types/component';
import { MarkComponent, Mark, MarkChannel } from './types/mark';
import { TransformComponent, Transform } from './types/transform';
import {
  Channel,
  G2ViewDescriptor,
  G2MarkState,
  G2ViewInstance,
} from './types/common';
import { useLibrary } from './library';
import { createTransformContext, initializeMark } from './mark';
import { inferComponent, renderComponent } from './component';
import { computeLayout, placeComponents } from './layout';
import { createCoordinate } from './coordinate';
import { applyScale, syncFacetsScales } from './scale';

export async function plot<T extends G2ViewTree>(
  options: T,
  selection: Selection,
  library: G2Library,
): Promise<void[]> {
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
      .filter((d) => d.startsWith('mark'))
      .map((d) => d.split('.').pop()),
  );
  const typeOf = (node: G2ViewTree) => {
    const { type } = node;
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
      const transformedNodes = children.flatMap(transform);
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

  // Plot chart.
  const viewContainer = new Map<G2ViewDescriptor, DisplayObject>();
  const transitions: Promise<void>[] = [];
  selection
    .selectAll('.view')
    .data(views, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append('g')
          .attr('className', 'view')
          .attr('id', (view) => view.id)
          .call(applyTranslate)
          .each(function (view) {
            plotView(view, select(this), transitions, library);
            viewContainer.set(view, this);
          }),
      (update) =>
        update.call(applyTranslate).each(function (view) {
          plotView(view, select(this), transitions, library);
        }),
      (exit) => exit.remove(),
    );

  // Apply interaction to entered views.
  const viewInstances = Array.from(viewContainer.entries()).map(
    ([view, container]) => ({
      view,
      container,
      options: viewNode.get(view),
      update: createUpdateView(select(container), library),
    }),
  );
  for (const target of viewInstances) {
    const { options } = target;
    const { interaction } = options;
    for (const option of inferInteraction(interaction)) {
      const interaction = useInteraction(option);
      interaction(target, viewInstances);
    }
  }

  // Author animations.
  const { width, height } = options;
  for (const nodeGenerator of nodeGenerators) {
    // Delay the rendering of animation keyframe. Different animation
    // created by different nodeGenerator will play in the same time.
    // eslint-disable-next-line no-async-promise-executor
    const keyframe = new Promise<void>(async (resolve) => {
      for (const node of nodeGenerator) {
        const sizedNode = { width, height, ...node };
        await plot(sizedNode, selection, library);
      }
      resolve();
    });
    transitions.push(keyframe);
  }

  // Note!!!
  // The returned promise will never resolved if one of nodeGenerator
  // never stop to yield node, which may created by a keyframe composition
  // with iteration count set to infinite.
  return Promise.all(transitions);
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
): G2ViewInstance['update'] {
  return async (newOptions) => {
    const transitions = [];
    const [newView, newChildren] = await initializeView(newOptions, library);
    plotView(newView, selection, transitions, library);
    for (const child of newChildren) {
      plot(child, selection, library);
    }
  };
}

async function initializeView(
  options: G2View,
  library: G2Library,
): Promise<[G2ViewDescriptor, G2ViewTree[]]> {
  const state = await initializeMarks(options, library);
  return initializeState(state, options, library);
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

  const { theme: partialTheme, marks: partialMarks } = options;
  const theme = useTheme(inferTheme(partialTheme));
  const markState = new Map<G2Mark, G2MarkState>();
  const channelScale = new Map<string, G2ScaleOptions>();
  for (const partialMark of partialMarks) {
    const { type = error('G2Mark type is required.') } = partialMark;
    const { props } = createMark(type);
    const markAndState = await initializeMark(
      partialMark,
      props,
      channelScale,
      theme,
      options,
      library,
    );
    if (markAndState) {
      const [mark, state] = markAndState;
      markState.set(mark, state);
    }
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
  const [useScale] = useLibrary<G2ScaleOptions, ScaleComponent, Scale>(
    'scale',
    library,
  );
  const [useAdjust] = useLibrary<G2AdjustOptions, AdjustComponent, Adjust>(
    'adjust',
    library,
  );
  const [useTheme] = useLibrary<G2ThemeOptions, ThemeComponent, Theme>(
    'theme',
    library,
  );

  const { key, adjust, frame, theme: partialTheme } = options;
  const theme = useTheme(inferTheme(partialTheme));

  // Infer components and compute layout.
  const marks = Array.from(markState.keys());
  const scales = new Set(marks.flatMap((d) => Object.values(d.scale)));
  const components = inferComponent(Array.from(scales), options, library);
  const layout = computeLayout(components, options);
  const coordinate = createCoordinate(layout, options, library);

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
      scale,
      // Callback to create children options based on this mark.
      children: createChildren,
      // The total count of data (both show and hide)for this facet.
      // This is for unit visualization to sync data domain.
      dataDomain,
    } = mark;
    const { index, channels, defaultShape } = state;

    // Transform abstract value to visual value by scales.
    const markScaleInstance = mapObject(scale, useScale);
    Object.assign(scaleInstance, markScaleInstance);
    const value = applyScale(channels, markScaleInstance);

    // Calc points and transformation for each data,
    // and then transform visual value to visual data.
    const calcPoints = useMark(mark);
    const [I, P, S] = calcPoints(index, markScaleInstance, value, coordinate);
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
    const count = dataDomain || definedIndex.length;
    const T = adjust ? useAdjust(adjust)(P, count, layout) : [];
    const visualData: Record<string, any>[] = definedIndex.map((d, i) => {
      const datum = { points: definedPoints[i], transform: T[i] };
      for (const [k, V] of Object.entries(value)) {
        datum[k] = V[d];
        if (S) datum[`series${upperFirst(k)}`] = S[i].map((i) => V[i]);
      }
      return datum;
    });
    state.data = visualData;
    state.index = definedIndex;

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
    frame,
    scale: scaleInstance,
  };
  return [view, children];
}

/**
 * @todo Extract className as constants.
 */
async function plotView(
  view: G2ViewDescriptor,
  selection: Selection,
  transitions: Promise<void>[],
  library: G2Library,
): Promise<void> {
  const {
    components,
    theme,
    layout,
    markState,
    coordinate,
    key,
    frame = false,
  } = view;

  // Render components.
  // @todo renderComponent return ctor and options.
  selection
    .selectAll('.component')
    .data(components, (d, i) => `${d.type}-${i}`)
    .join(
      (enter) =>
        enter
          .append('g')
          .style('zIndex', ({ zIndex }) => zIndex || -1)
          .attr('className', 'component')
          .append((options) =>
            renderComponent(options, coordinate, theme, library),
          ),
      (update) =>
        update.each(function (options) {
          const newComponent = renderComponent(
            options,
            coordinate,
            theme,
            library,
          );
          const { attributes } = newComponent;
          const [node] = this.childNodes;
          node.update({ ...attributes });
        }),
    );

  // Main layer is for showing the main visual representation such as marks. There
  // may be multiple main layers for a view, each main layer correspond to one of marks.
  // @todo Test DOM structure.
  selection
    .selectAll('.plot')
    .data([layout], () => key)
    .join(
      (enter) =>
        enter
          .append('rect')
          .attr('className', 'plot')
          .style('fill', 'transparent')
          .call(applyFrame, frame)
          .call(applyBBox)
          .call(applyMainLayers, Array.from(markState.keys())),
      (update) =>
        update
          .call(applyBBox)
          .call(applyMainLayers, Array.from(markState.keys())),
    );

  // Render marks with corresponding data.
  for (const [mark, state] of markState.entries()) {
    const { data } = state;
    const { key } = mark;
    const shapeFunction = createShapeFunction(mark, state, view, library);
    const enterFunction = createEnterFunction(mark, state, view, library);
    const updateFunction = createUpdateFunction(mark, state, view, library);
    const exitFunction = createExitFunction(mark, state, view, library);
    selection
      .select(`#${key}`)
      .selectAll('.element')
      .data(data, (d) => d.key)
      .join(
        (enter) =>
          enter
            .append(shapeFunction)
            .attr('className', 'element')
            .each(function (data) {
              const animation = enterFunction(data, this);
              appendTransition(transitions, animation);
            }),
        (update) =>
          update.each(function (data, index) {
            const node = shapeFunction(data, index);
            const animation = updateFunction(data, this, node);
            appendTransition(transitions, animation);
            if (animation === null) copyAttributes(this, node);
          }),
        (exit) =>
          exit.each(function (data) {
            const animation = exitFunction(data, this);
            appendTransition(transitions, animation);
          }),
      );
  }
}

function createShapeFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (data: Record<string, any>, index: number) => DisplayObject {
  const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const { defaultShape, data } = state;
  const point2d = data.map((d) => d.points);
  const { theme, coordinate } = view;
  const { style } = mark;
  return (data, index) => {
    const { shape, points, ...v } = data;
    const value = { ...v, index };
    const normalizedShape = normalizeOptions(shape || defaultShape);
    const shapeFunction = useShape({ ...normalizedShape, ...style });
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
  from: DisplayObject,
  to?: DisplayObject,
) => GAnimation {
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
  const { [key]: defaultAnimation } = createShape(defaultShape).props;
  const { [type]: animate = {} } = mark.animate || {};
  const { [type]: defaultEffectTiming = {} } = theme;
  return (data, from, to?) => {
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
    const value = { delay, duration, easing, to };
    return animateFunction(from, value, coordinate, defaultEffectTiming);
  };
}

function createEnterFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (
  data: Record<string, any>,
  from: DisplayObject,
  to?: DisplayObject,
) => GAnimation {
  return createAnimationFunction('enter', mark, state, view, library);
}

function createUpdateFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (
  data: Record<string, any>,
  from: DisplayObject,
  to?: DisplayObject,
) => GAnimation {
  return createAnimationFunction('update', mark, state, view, library);
}

function createExitFunction(
  mark: G2Mark,
  state: G2MarkState,
  view: G2ViewDescriptor,
  library: G2Library,
): (
  data: Record<string, any>,
  from: DisplayObject,
  to?: DisplayObject,
) => GAnimation {
  return createAnimationFunction('exit', mark, state, view, library);
}

function appendTransition(transitions: Promise<void>[], animation: GAnimation) {
  if (animation === null) return;
  transitions.push(
    new Promise((resolve) => {
      const preOnfinish = animation.onfinish;
      animation.onfinish = () => {
        preOnfinish?.call(animation);
        resolve();
      };
    }),
  );
}

function inferTheme(theme: G2ThemeOptions = { type: 'light' }): G2ThemeOptions {
  const { type = 'light' } = theme;
  return { ...theme, type };
}

function inferInteraction(
  interaction: G2InteractionOptions[] = [],
): G2InteractionOptions[] {
  return [...interaction, { type: 'tooltip' }];
}

async function applyTransform<T extends G2ViewTree>(
  node: T,
  library: G2Library,
): Promise<G2ViewTree> {
  const [useTransform] = useLibrary<
    G2TransformOptions,
    TransformComponent,
    Transform
  >('transform', library);
  const { transform = [], data, ...rest } = node;
  const context = createTransformContext(node, library);
  const transformFunctions: TransformComponent[] = transform.map(useTransform);
  const {
    data: newDate,
    encode,
    scale,
  } = await composeAsync(transformFunctions)(context);
  return { ...rest, data: newDate, encode, scale };
}

function applyBBox(selection: Selection) {
  selection
    .style('x', (d) => d.paddingLeft)
    .style('y', (d) => d.paddingTop)
    .style('width', (d) => d.innerWidth)
    .style('height', (d) => d.innerHeight);
}

/**
 * Draw frame for the plot area of each facet.
 * This is useful for facet.
 * @todo More options for frame style.
 */
function applyFrame(selection: Selection, frame: boolean) {
  if (!frame) return;
  selection.style('lineWidth', 1).style('stroke', 'black');
}

/**
 * Create and update layer for each mark.
 * All the layers created here are treated as main layers.
 */
function applyMainLayers(selection: Selection, marks: G2Mark[]) {
  selection
    .selectAll('.main')
    .data(marks.map((d) => d.key))
    .join(
      (enter) =>
        enter
          .append('g')
          .attr('className', 'main')
          .attr('id', (d) => d)
          .style('fill', 'transparent'),
      (update) => update,
      (exit) => exit.remove(),
    );
}

function normalizeOptions(options: string | Record<string, any>) {
  return typeof options === 'object' ? options : { type: options };
}
