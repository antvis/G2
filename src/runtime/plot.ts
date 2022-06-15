import { mapObject } from '../utils/array';
import { Container } from '../utils/container';
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
} from './types/component';
import { MarkComponent, Mark, MarkChannel } from './types/mark';
import { TransformComponent, Transform } from './types/transform';
import { Channel, G2ViewDescriptor, G2MarkState } from './types/common';
import { useLibrary } from './library';
import { createTransformContext, initializeMark } from './mark';
import { inferComponent, renderComponent } from './component';
import { computeLayout, placeComponents } from './layout';
import { createCoordinate } from './coordinate';
import { applyScale, syncFacetsScales } from './scale';
import { applyInteraction } from './interaction';

export async function plot<T extends G2ViewTree>(
  options: T,
  selection: Selection,
  library: G2Library,
): Promise<void> {
  const [useComposition] = useLibrary<
    G2CompositionOptions,
    CompositionComponent,
    Composition
  >('composition', library);

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
  const views = [];
  const viewNode = new Map();
  const nodeState = new Map();
  const discovered: G2ViewTree[] = [options];

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
      discovered.push(...transform(n));
    }
  }

  selection
    .selectAll('.view')
    .data(views, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append('g')
          .attr('className', 'view')
          .attr('id', (view) => view.id)
          .style('transform', (d) => `translate(${d.layout.x}, ${d.layout.y})`)
          .each(function (view) {
            plotView(view, select(this), library);
            const options = viewNode.get(view);
            const update = async (updater = (d: G2View) => d) => {
              const newOptions = updater(options);
              const [newView, newChildren] = await initializeView(
                newOptions,
                library,
              );
              // Update itself and child nodes.
              plotView(newView, select(this), library);
              for (const child of newChildren) {
                plot(child, selection, library);
              }
            };
            applyInteraction(options, select(this), view, update, library);
          }),
      (update) =>
        update
          .style('transform', (d) => `translate(${d.layout.x}, ${d.layout.y})`)
          .each(function (view) {
            plotView(view, select(this), library);
          }),
      (exit) => exit.remove(),
    );
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
      style = {},
      animate = {},
    } = mark;
    const { index, channels, defaultShape } = state;

    // Transform abstract value to visual value by scales.
    const markScaleInstance = mapObject(scale, useScale);
    Object.assign(scaleInstance, markScaleInstance);
    const value = Container.of<MarkChannel>(channels)
      .call(applyScale, markScaleInstance)
      .call(applyAnimationFunction, index, animate, defaultShape, library)
      .call(applyShapeFunction, index, style, defaultShape, library)
      .value();

    // Calc points and transformation for each data,
    // and then transform visual value to visual data.
    const calcPoints = useMark(mark);
    const [I, P] = calcPoints(index, markScaleInstance, value, coordinate);
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
    const visualData: Record<string, any>[] = definedIndex.map((d, i) =>
      Object.entries(value).reduce(
        (datum, [k, V]) => ((datum[k] = V[d]), datum),
        { points: definedPoints[i], transform: T[i] },
      ),
    );
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

  // Create layers for plot.
  // Main layer is for showing the main visual representation such as marks.
  // Selection layer is for showing selected marks.
  // Transient layer is for showing transient graphical elements produced by interaction.
  // There may be multiple main layers for a view, each main layer correspond to one of
  // marks. While there is only one selection layer and transient layer for a view.
  // @todo Test DOM structure.
  selection
    .selectAll('.plot')
    .data([layout], () => key)
    .join(
      (enter) => {
        const rect = enter
          .append('rect')
          .attr('className', 'plot')
          .style('fill', 'transparent')
          .call(applyFrame, frame)
          .call(applyBBox)
          .call(applyMainLayers, Array.from(markState.keys()));
        rect
          .append('g')
          .attr('className', 'selection')
          .style('fill', 'transparent');
        rect
          .append('g')
          .attr('className', 'transient')
          .style('fill', 'transparent');
        return rect;
      },
      (update) =>
        update
          .call(applyBBox)
          .call(applyMainLayers, Array.from(markState.keys())),
    );

  // Render marks with corresponding data.
  for (const [{ key }, { data }] of markState.entries()) {
    const point2d = data.map((d) => d.points);
    selection
      .select(`#${key}`)
      .selectAll('.element')
      .data(data, (d) => d.key)
      .join(
        (enter) =>
          enter
            .append(({ shape, points, ...v }, i) => {
              const value = { ...v, index: i };
              return shape(points, value, coordinate, theme, point2d);
            })
            .attr('className', 'element')
            .each(function ({ enterType: animate, ...v }) {
              const {
                enterDelay: delay,
                enterDuration: duration,
                enterEasing: easing,
              } = v;
              const style = { delay, duration, easing };
              animate(this, style, coordinate, theme);
            }),
        (update) =>
          update.each(function ({ shape, points, ...v }, i) {
            const value = { ...v, index: i };
            const node = shape(points, value, coordinate, theme, point2d);
            copyAttributes(this, node);
          }),
      );
  }
}

function inferTheme(theme: G2ThemeOptions = { type: 'light' }): G2ThemeOptions {
  const { type = 'light' } = theme;
  return { ...theme, type };
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

function applyAnimationFunction(
  value: Record<string, any>,
  index: number[],
  animate: G2AnimationOptions,
  defaultShape: string,
  library: G2Library,
) {
  const [, createShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const [useAnimation] = useLibrary<
    G2AnimationOptions,
    AnimationComponent,
    Animation
  >('animation', library);

  const { enterType: ET } = value;
  const { defaultEnterAnimation } = createShape(defaultShape).props;
  const { enter = {} } = animate;
  const { type = defaultEnterAnimation } = enter;
  const animationFunctions = Array.isArray(ET)
    ? ET.map((type) => useAnimation({ ...enter, type }))
    : index.reduce(
        (ET, i) => ((ET[i] = useAnimation({ ...enter, type })), ET),
        [],
      );
  return { ...value, enterType: animationFunctions };
}

function applyShapeFunction(
  value: Record<string, Channel>,
  index: number[],
  style: Record<string, any>,
  defaultShape: string,
  library: G2Library,
): {
  shape: Shape[];
  [key: string]: Channel | Shape[];
} {
  const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const { shape } = value;
  const shapeFunctions = Array.isArray(shape)
    ? shape.map((type) => useShape({ ...normalizeOptions(type), ...style }))
    : index.reduce(
        (S, i) => ((S[i] = useShape({ type: defaultShape, ...style })), S),
        [],
      );
  return { ...value, shape: shapeFunctions };
}

function normalizeOptions(options: string | Record<string, any>) {
  return typeof options === 'object' ? options : { type: options };
}
