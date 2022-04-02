import { Coordinate, Vector2 } from '@antv/coord';
import { mapObject } from '../utils/array';
import { Container } from '../utils/container';
import { error } from '../utils/helper';
import { Selection } from '../utils/selection';
import {
  G2ViewTree,
  G2Area,
  G2MarkOptions,
  G2ScaleOptions,
  G2GuideComponentOptions,
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
  GuideComponentComponent,
  GuideComponent,
  MarkChannel,
  Shape,
  ShapeComponent,
  AnimationComponent,
  Animation,
} from './types/component';
import { Channel, G2Theme } from './types/common';
import { useLibrary } from './library';
import { initializeMark } from './mark';
import { inferComponent } from './component';
import { computeLayout, placeComponents } from './layout';
import { createCoordinate } from './coordinate';
import { applyScale } from './scale';

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
    ...mark
  } = options;
  const area = {
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
    marks: [{ data, ...mark }],
  };
  return plotArea(area, selection, library);
}

async function plotArea(
  options: G2Area,
  selection: Selection,
  library: G2Library,
): Promise<void> {
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
  const [useGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GuideComponentComponent,
    GuideComponent
  >('component', library);

  // Initialize theme.
  const { theme: partialTheme, marks: partialMarks } = options;
  const theme = useTheme(inferTheme(partialTheme));

  // Infer options and calc props for each mark.
  const markProps = new Map<G2Mark, MarkProps>();
  const channelScale = new Map<string, G2ScaleOptions>();
  const marks = [];
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
  const components = inferComponent(scales, options, library);
  const layout = computeLayout(components, options);
  const coordinate = createCoordinate(layout, options, library);

  // Place components and mutate their bbox.
  placeComponents(components, coordinate, layout, options);

  selection
    .selectAll('.component')
    .data(components, (d) => JSON.stringify(d))
    .join((enter) =>
      enter
        .append('g')
        .style('zIndex', ({ zIndex }) => zIndex || -1)
        .attr('className', '.component')
        .append((component) => {
          const { scale: scaleDescriptor, bbox, ...options } = component;
          const scale = scaleDescriptor ? useScale(scaleDescriptor) : null;
          const { field, domain } = scaleDescriptor;
          const value = { field, domain, bbox };
          const render = useGuideComponent(options);
          return render(scale, value, coordinate, theme);
        }),
    );

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
    const { key: K } = value;

    //@todo Which is better: Binding index or Binding data directly?
    selection
      .selectAll('.element')
      .data(I, (d) => K[d])
      .join((enter) =>
        enter
          .append(renderMark(P, value, coordinate, theme))
          .call(applyEnterAnimation, value, coordinate, theme)
          .attr('className', 'element'),
      );
  }
}

function inferTheme(theme: G2ThemeOptions = { type: 'light' }): G2ThemeOptions {
  const { type = 'light' } = theme;
  return { ...theme, type };
}

function renderMark(
  P: Vector2[][],
  value: Record<string, any>,
  coordinate: Coordinate,
  theme: G2Theme,
) {
  const { shape: S, ...rest } = value;
  return (d, i) => {
    const render = S[d];
    const points = P[i];
    const v = Object.entries(rest).reduce(
      (obj, [key, value]) => ((obj[key] = value[d]), obj),
      {},
    );
    return render(points, v, coordinate, theme);
  };
}

function applyEnterAnimation(
  selection: Selection,
  value: Record<string, any>,
  coordinate: Coordinate,
  theme: G2Theme,
) {
  const {
    enterType: ET,
    enterDelay: EDL = [],
    enterEasing: EE = [],
    enterDuration: EDR = [],
  } = value;
  selection.each(function (d) {
    const animate = ET[d];
    const effectTiming = {
      duration: EDR[d],
      easing: EE[d],
      delay: EDL[d],
    };
    animate(this, effectTiming, coordinate, theme);
  });
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
