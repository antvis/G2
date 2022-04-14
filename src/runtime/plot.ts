import { mapObject } from '../utils/array';
import { Container } from '../utils/container';
import { copyAttributes, error } from '../utils/helper';
import { Selection } from '../utils/selection';
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
} from './types/options';
import {
  ThemeComponent,
  Theme,
  MarkComponent,
  Mark,
  MarkProps,
  ScaleComponent,
  Scale,
  MarkChannel,
  Shape,
  ShapeComponent,
  AnimationComponent,
  Animation,
} from './types/component';
import { Channel, G2ViewDescriptor } from './types/common';
import { useLibrary } from './library';
import { initializeMark } from './mark';
import { inferComponent, renderComponent } from './component';
import { computeLayout, placeComponents } from './layout';
import { createCoordinate } from './coordinate';
import { applyScale } from './scale';
import { applyInteraction } from './interaction';

export async function plot<T extends G2ViewTree>(
  options: T,
  selection: Selection,
  library: G2Library,
): Promise<void> {
  // Collect keys of existed views, for both of enter and update.
  const viewKeys = [];

  // Convert node to views, then plot the views and collect keys
  // of views to viewKeys.
  await plotNode(options, selection, viewKeys, library);

  // Remove exit views.
  // The init and update manipulations of enter and update view
  // have been done in plotNode, so here will do nothing.
  selection
    .selectAll('.view')
    .data(viewKeys, (d) => d)
    .join(
      (enter) => enter,
      (update) => update,
      (exit) => exit.remove(),
    );
}

/**
 * Convert node specification to view specification and plot it.
 */
async function plotNode<T extends G2ViewTree>(
  options: T,
  selection: Selection,
  keys: string[],
  library: G2Library,
): Promise<void> {
  const marks = new Set(
    Object.keys(library)
      .filter((d) => d.startsWith('mark'))
      .map((d) => d.split('.').pop()),
  );
  const { type } = options;
  if (type === 'view') {
    // If node specification is already view, just change children to marks.
    const { children = [] } = options;
    const view = { ...options, marks: children };
    keys.push(view.key);
    plotView(view, selection, library);
  } else if (typeof type === 'string' && marks.has(type)) {
    // Convert mark specification to a view specification.
    // Mark specification can be treated as syntax surger for view specification.
    const view = fromMark(options);
    keys.push(view.key);
    plotView(view, selection, library);
  } else {
    // todo
  }
}

async function plotView(
  options: G2View,
  selection: Selection,
  library: G2Library,
): Promise<void> {
  const { key } = options;
  // Find container of current plot by key.
  const chart = selection.select(`#${key}`);
  if (chart.node() !== null) {
    updateView(options, chart, library);
  } else {
    // If the container of current view is not exist,
    // that means it's the first time for it to render.
    // In this case, create container for it, bind key and apply interaction.
    const chart = selection
      .append('g')
      .attr('className', 'view')
      .attr('id', key)
      .attr('__data__', key);
    const view = await updateView(options, chart, library);
    const update = (updater = (d: G2View) => d) => {
      plotView(updater(options), selection, library);
    };
    applyInteraction(options, view, update, library);
  }
}

function fromMark<T extends G2ViewTree>(options: T): G2View {
  const {
    width,
    height,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    data,
    coordinate,
    theme,
    component,
    interaction,
    x,
    y,
    key,
    ...mark
  } = options;
  const markKey = mark.key || `${key}-0`;
  return {
    x,
    y,
    key,
    width,
    height,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    theme,
    coordinate,
    component,
    interaction,
    marks: [{ ...mark, key: markKey, data }],
  };
}

async function updateView(
  options: G2View,
  selection: Selection,
  library: G2Library,
): Promise<G2ViewDescriptor> {
  const [useTheme] = useLibrary<G2ThemeOptions, ThemeComponent, Theme>(
    'theme',
    library,
  );
  const [useMark, createMark] = useLibrary<G2MarkOptions, MarkComponent, Mark>(
    'mark',
    library,
  );
  const [useScale] = useLibrary<G2ScaleOptions, ScaleComponent, Scale>(
    'scale',
    library,
  );

  // Initialize theme.
  const { theme: partialTheme, marks: partialMarks, key } = options;
  const theme = useTheme(inferTheme(partialTheme));

  // Infer options and calc props for each mark.
  const markProps = new Map<G2Mark, MarkProps>();
  const channelScale = new Map<string, G2ScaleOptions>();
  const marks: G2Mark[] = [];
  for (const partialMark of partialMarks) {
    const { type = error('G2Mark type is required.') } = partialMark;
    const { props: partialProps } = createMark(type);
    const markAndProps = await initializeMark(
      partialMark,
      partialProps,
      channelScale,
      theme,
      options,
      library,
    );
    if (markAndProps) {
      const [mark, props] = markAndProps;
      markProps.set(mark, props);
      marks.push(mark);
    }
  }

  // Collect scales from marks.
  const scales = Array.from(
    new Set(marks.flatMap((d) => Object.values(d.scale))),
  );
  const scale = scales.reduce(
    (obj, { name, ...options }) => ((obj[name] = useScale(options)), obj),
    {},
  );
  const components = inferComponent(scales, options, library);
  const layout = computeLayout(components, options);
  const coordinate = createCoordinate(layout, options, library);

  // Place components and mutate their bbox.
  placeComponents(components, coordinate, layout);

  // Render components.
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
  selection
    .selectAll('.plot')
    .data([layout], () => key)
    .join(
      (enter) => {
        const rect = enter
          .append('rect')
          .attr('className', 'plot')
          .call(applyDimension)
          .call(updateMainLayers, markProps);
        rect.append('g').attr('className', 'selection');
        rect.append('g').attr('className', 'transient');
        return rect;
      },
      (update) => update.call(applyDimension).call(updateMainLayers, markProps),
    );

  // Render marks with corresponding props.
  for (const [mark, props] of markProps.entries()) {
    const { scale: scaleDescriptor, style = {}, animate = {}, key } = mark;
    const { index, channels, defaultShape } = props;
    const scale = mapObject(scaleDescriptor, useScale);
    const value = Container.of<MarkChannel>(channels)
      .map(applyScale, scale)
      .map(applyAnimationFunction, index, animate, defaultShape, library)
      .map(applyShapeFunction, index, style, defaultShape, library)
      .value();

    const calcPoints = useMark(mark);
    const [I, P] = calcPoints(index, scale, value, coordinate);
    const data: Record<string, any>[] = I.map((d, i) =>
      Object.entries(value).reduce(
        (datum, [k, V]) => ((datum[k] = V[d]), datum),
        { points: P[i] },
      ),
    );

    selection
      .select(`#${key}`)
      .selectAll('.element')
      .data(data, (d) => d.key)
      .join(
        (enter) =>
          enter
            .append(({ shape, points, ...v }) =>
              shape(points, v, coordinate, theme),
            )
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
          update.each(function ({ shape, points, ...v }) {
            const node = shape(points, v, coordinate, theme);
            copyAttributes(this, node);
          }),
      );
  }

  return {
    selection,
    scale,
    coordinate,
    theme,
  };
}

function inferTheme(theme: G2ThemeOptions = { type: 'light' }): G2ThemeOptions {
  const { type = 'light' } = theme;
  return { ...theme, type };
}

function applyDimension(selection: Selection) {
  selection
    .style('x', (d) => d.x + d.paddingLeft)
    .style('y', (d) => d.y + d.paddingTop)
    .style('width', (d) => d.innerWidth)
    .style('height', (d) => d.innerHeight);
}

function updateMainLayers(
  selection: Selection,
  markProps: Map<G2Mark, MarkProps>,
) {
  const markKeys = Array.from(markProps.keys()).map((d) => d.key);

  // Create and update layer for each mark.
  // All the layers created here are treated as main layers.
  selection
    .selectAll('.main')
    .data(markKeys)
    .join(
      (enter) =>
        enter
          .append('g')
          .attr('className', 'main')
          .attr('id', (d) => d),
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
    : index.map(() => useAnimation({ ...enter, type }));
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
    : index.map(() => useShape({ type: defaultShape, ...style }));
  return { ...value, shape: shapeFunctions };
}

function normalizeOptions(options: string | Record<string, any>) {
  return typeof options === 'object' ? options : { type: options };
}
