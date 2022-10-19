import { DisplayObject, IAnimation as GAnimation } from '@antv/g';
import { upperFirst } from '@antv/util';
import { format } from 'd3-format';
import { Vector2 } from '@antv/coord';
import { mapObject } from '../utils/array';
import {
  copyAttributes,
  error,
  defined,
  useMemo,
  appendTransform,
  compose,
} from '../utils/helper';
import { Selection, select, G2Element } from '../utils/selection';
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
  G2InteractionOptions,
  G2LabelTransformOptions,
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
  LabelTransformComponent,
  LabelTransform,
} from './types/component';
import { MarkComponent, Mark, MarkChannel } from './types/mark';
import {
  G2ViewDescriptor,
  G2MarkState,
  G2ViewInstance,
  Primitive,
} from './types/common';
import { useLibrary } from './library';
import { initializeMark } from './mark';
import { inferComponent, renderComponent } from './component';
import { computeLayout, placeComponents } from './layout';
import { createCoordinate } from './coordinate';
import { applyScale, syncFacetsScales, useRelation } from './scale';
import { applyDataTransform } from './transform';
import {
  MAIN_LAYER_CLASS_NAME,
  LABEL_LAYER_CLASS_NAME,
  ELEMENT_CLASS_NAME,
  VIEW_CLASS_NAME,
  COMPONENT_CLASS_NAME,
  PLOT_CLASS_NAME,
  LABEL_CLASS_NAME,
} from './constant';

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
      .map((d) => /mark\.(.*)/.exec(d)?.[1])
      .filter(defined),
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
            viewContainer.set(view, this);
          }),
      (update) =>
        update.call(applyTranslate).each(function (view) {
          plotView(view, select(this), transitions, library);
        }),
      (exit) => exit.remove(),
    );

  // Draw label for each element.
  selection.selectAll('.view').each(function (view) {
    plotLabel(view, select(this), transitions, library);
  });

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
  const [useTheme] = useLibrary<G2ThemeOptions, ThemeComponent, Theme>(
    'theme',
    library,
  );

  const { key, frame, theme: partialTheme } = options;
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
      modifier,
    } = mark;
    const { index, channels } = state;

    // Transform abstract value to visual value by scales.
    const markScaleInstance = mapObject(scale, (options) => {
      const { relations } = options;
      const [conditionalize] = useRelation(relations);
      const scale = useScale(options);
      return conditionalize(scale);
    });
    Object.assign(scaleInstance, markScaleInstance);
    const value = applyScale(channels, markScaleInstance);

    // Calc points and transformation for each data,
    // and then transform visual value to visual data.
    const calcPoints = useMark(mark);
    const [I, P, S] = filterValid(
      calcPoints(index, markScaleInstance, value, coordinate),
    );
    const count = dataDomain || I.length;
    const T = modifier ? modifier(P, count, layout) : [];
    const visualData: Record<string, any>[] = I.map((d, i) => {
      const datum = { points: P[i], transform: T[i], index: d };
      for (const [k, V] of Object.entries(value)) {
        datum[k] = V[d];
        if (S) datum[`series${upperFirst(k)}`] = S[i].map((i) => V[i]);
      }
      if (S) datum['seriesIndex'] = S[i];
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
    .selectAll(className(COMPONENT_CLASS_NAME))
    .data(components, (d, i) => `${d.type}-${i}`)
    .join(
      (enter) =>
        enter
          .append('g')
          .style('zIndex', ({ zIndex }) => zIndex || -1)
          .attr('className', COMPONENT_CLASS_NAME)
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
    .selectAll(className(PLOT_CLASS_NAME))
    .data([layout], () => key)
    .join(
      (enter) =>
        enter
          .append('rect')
          .attr('className', PLOT_CLASS_NAME)
          .style('fill', 'transparent')
          .call(updateFrame, frame)
          .call(updateBBox)
          .call(updateLayers, Array.from(markState.keys())),
      (update) =>
        update
          .call(updateBBox)
          .call(updateLayers, Array.from(markState.keys())),
    );

  // Render marks with corresponding data.
  for (const [mark, state] of markState.entries()) {
    const { data } = state;
    const { key, class: cls } = mark;
    const shapeFunction = createMarkShapeFunction(mark, state, view, library);
    const enterFunction = createEnterFunction(mark, state, view, library);
    const updateFunction = createUpdateFunction(mark, state, view, library);
    const exitFunction = createExitFunction(mark, state, view, library);
    const facetElements = selectFacetElements(selection, cls, 'element');
    const T = selection
      .select(`#${key}`)
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
            .attr('className', ELEMENT_CLASS_NAME)
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
              // @todo Handle element with different type.
              if (animation === null) copyAttributes(this, node);
              return animation;
            });
          }),
        (exit) =>
          exit
            .transition(function (data) {
              return exitFunction(data, [this]);
            })
            .remove(),
        (merge) =>
          merge
            // Append elements to be merged.
            .append(shapeFunction)
            .attr('className', ELEMENT_CLASS_NAME)
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
                .nodes();
              return updateFunction(data, [this], toElements);
            })
            // Remove elements to be splitted after animation finishing.
            .remove(),
      )
      .transitions();
    transitions.push(...T);
  }
}

/**
 * Auto hide labels be specify label layout.
 */
function plotLabel(
  view: G2ViewDescriptor,
  selection: Selection,
  transitions: Promise<void>[],
  library: G2Library,
) {
  const [useLabelTransform] = useLibrary<
    G2LabelTransformOptions,
    LabelTransformComponent,
    LabelTransform
  >('labelTransform', library);
  const { markState, labelTransform } = view;
  const labelLayer = selection.select(className(LABEL_LAYER_CLASS_NAME)).node();
  for (const [mark, state] of markState.entries()) {
    const { labels = [], key } = mark;
    const shapeFunction = createLabelShapeFunction(mark, state, view, library);
    const mainLayer = selection.select(`#${key}`);
    for (let i = 0; i < labels.length; i++) {
      // Get all labels for each mark.
      const { transform = [], ...options } = labels[i];
      const allLabels = mainLayer
        .selectAll('.element')
        .nodes()
        .flatMap((e) => getLabels(options, i, e));

      // Plot labels.
      const shapes = select(labelLayer)
        .selectAll(className(LABEL_CLASS_NAME))
        .data(allLabels, (d) => d.key)
        .join(
          (enter) =>
            enter.append(shapeFunction).attr('class', LABEL_CLASS_NAME),
          (update) =>
            update.each(function (options) {
              // @todo Handle Label with different type.
              const node = shapeFunction(options);
              copyAttributes(this, node);
            }),
          (exit) => exit.remove(),
        )
        .nodes();

      // Apply mark-level transform.
      const transformFunction = compose(transform.map(useLabelTransform));
      transformFunction(shapes);
    }
  }
  // Apply view-level  transform.
  if (labelTransform) labelTransform(selection.selectAll('.label').nodes());
}

function getLabels(
  label: Record<string, any>,
  labelIndex: number,
  element: G2Element,
): Record<string, any>[] {
  const { seriesIndex: SI, seriesKey, points, key, index } = element.__data__;
  const bounds = getLocalBounds(element);
  if (!SI) return [{ ...label, key, bounds, index, points }];
  const selector = normalizeLabelSelector(label);
  const F = SI.map((index: number, i: number) => ({
    ...label,
    key: `${seriesKey[i]}-${labelIndex}`,
    bounds: [points[i]],
    index,
    points,
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
    const { formatter = (d) => `${d}`, ...abstractOptions } = options;
    const visualOptions = mapObject(abstractOptions, (d) =>
      valueOf(datum, d, index, abstractData),
    );
    const { shape = defaultLabelShape, text, ...style } = visualOptions;
    const f = typeof formatter === 'string' ? format(formatter) : formatter;
    const value = { ...style, text: f(text) };
    const shapeFunction = useShape({ type: `label.${shape}`, ...style });
    return shapeFunction(points, value, coordinate, theme, point2d);
  };
}

function valueOf(
  datum: Record<string, any>,
  value: Primitive | ((d: any, i: number, array: any) => any),
  i: number,
  data: Record<string, any>,
) {
  if (typeof value === 'function') return value(datum, i, data);
  if (typeof value !== 'string') return value;
  if (datum[value] !== undefined) return datum[value];
  return value;
}

function selectFacetElements(
  selection: Selection,
  facetClassName: string,
  elementClassName: string,
): DisplayObject[] {
  const group = selection.node().parentElement;
  return group
    .findAll((node) => node.style.facet === facetClassName)
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
  const { defaultShape, data } = state;
  const point2d = data.map((d) => d.points);
  const { theme, coordinate } = view;
  const { type: markType, style } = mark;
  return (data, index) => {
    const { shape = defaultShape, points, ...v } = data;
    const value = { ...v, shape, mark: markType, defaultShape, index };
    const shapeFunction = useShape({ ...style, type: shapeName(mark, shape) });
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
) => Promise<void> {
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
  const { [type]: animate = {} } = mark.animate || {};
  const { [type]: defaultEffectTiming = {} } = theme;
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
    if (!Array.isArray(A)) return cancel(A);
    return Promise.all(A.map(cancel));
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
) => Promise<void> {
  return createAnimationFunction('enter', mark, state, view, library);
}

/**
 * Animation will not cancel automatically, it should be canceled
 * manually. This is very important for performance.
 */
function cancel(animation: GAnimation): Promise<any> {
  return animation.finished.then(() => {
    animation.cancel();
  });
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
) => Promise<void> {
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
) => Promise<void> {
  return createAnimationFunction('exit', mark, state, view, library);
}

function inferTheme(theme: G2ThemeOptions = { type: 'light' }): G2ThemeOptions {
  const { type = 'light' } = theme;
  return { ...theme, type };
}

function inferInteraction(
  interaction: G2InteractionOptions[] = [],
): G2InteractionOptions[] {
  const interactions = [...interaction];
  ['tooltip', 'ellipsisText'].forEach((type) => {
    if (!interaction.find((d) => d.type === type)) interactions.push({ type });
  });

  return interactions;
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

function shapeName(mark: G2Mark, name: string): string {
  const { type } = mark;
  return `${type}.${name}`;
}

/**
 * Draw frame for the plot area of each facet.
 * This is useful for facet.
 * @todo More options for frame style.
 */
function updateFrame(selection: Selection, frame: boolean) {
  if (!frame) return;
  selection.style('lineWidth', 1).style('stroke', 'black');
}

/**
 * Create and update layer for each mark.
 * All the layers created here are treated as main layers.
 */
function updateLayers(selection: Selection, marks: G2Mark[]) {
  const facet = (d) => (d.class !== undefined ? `${d.class}` : '');
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
          .style('fill', 'transparent'),
      (update) => update.style('facet', facet),
      (exit) => exit.remove(),
    );

  const labelLayer = selection.select(className(LABEL_LAYER_CLASS_NAME)).node();
  if (labelLayer) return;
  selection.append('g').attr('className', LABEL_LAYER_CLASS_NAME);
}

function className(name: string): string {
  return `.${name}`;
}
