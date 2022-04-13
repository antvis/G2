import { mapObject } from '../utils/array';
import { Container } from '../utils/container';
import { copyAttributes, error } from '../utils/helper';
import { Selection, select } from '../utils/selection';
import {
  G2ViewTree,
  G2Area,
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
import { Channel, G2AreaDescriptor } from './types/common';
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
    ...mark
  } = options;

  const areaOptions = {
    key: '0',
    x: 0,
    y: 0,
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
    marks: [{ data, ...mark }],
  };

  selection
    .selectAll('.chart')
    .data([areaOptions], (d) => d.key)
    .join(
      (enter) =>
        enter
          .append('g')
          .attr('className', 'chart')
          .each(async function (areaOptions) {
            const area = await plotArea(areaOptions, select(this), library);
            const update = (updater = (d: T) => d) => {
              plot(updater(options), selection, library);
            };
            // Only apply interaction for the first time.
            applyInteraction(areaOptions, area, update, library);
          }),
      (update) =>
        update.each(function (options) {
          plotArea(options, select(this), library);
        }),
    );
}

async function plotArea(
  options: G2Area,
  selection: Selection,
  library: G2Library,
): Promise<G2AreaDescriptor> {
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
  selection
    .selectAll('.plot')
    .data([layout], () => key)
    .join(
      (enter) => {
        const rect = enter
          .append('rect')
          .attr('className', 'plot')
          .call(applyDimension);
        rect.append('g').attr('className', 'main');
        rect.append('g').attr('className', 'selection');
        rect.append('g').attr('className', 'transient');
        return rect;
      },
      (update) => update.call(applyDimension),
    );

  // Render marks with corresponding props.
  for (const [mark, props] of markProps.entries()) {
    const { scale: scaleDescriptor, style = {}, animate = {} } = mark;
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
      .select('.main')
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
