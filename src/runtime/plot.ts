import { mapObject } from '../utils/array';
import { Container } from '../utils/container';
import { error } from '../utils/helper';
import {
  G2ViewTree,
  G2Context,
  G2Area,
  G2MarkOptions,
  G2ScaleOptions,
  G2GuideComponentOptions,
  G2ThemeOptions,
  G2Mark,
  G2Library,
  G2ShapeOptions,
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
} from './types/component';
import { Channel } from './types/common';
import { useLibrary } from './library';
import { initializeMark } from './mark';
import { inferComponent } from './component';
import { computeLayout, placeComponents } from './layout';
import { createCoordinate } from './coordinate';
import { applyScale } from './scale';

export async function plot<T extends G2ViewTree>(
  options: T,
  context: G2Context,
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
  return plotArea(area, context);
}

async function plotArea(options: G2Area, context: G2Context): Promise<void> {
  const { canvas, library } = context;
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

  // Infer guide components by scales and create coordinate.
  const [components, componentScale] = inferComponent(scales, options, library);
  const layout = computeLayout(components, options);
  const componentBBox = placeComponents(components, layout, options);
  const coordinate = createCoordinate(layout, options, library);

  // Render components with corresponding bbox and scale(if required).
  for (const component of components) {
    const scaleDescriptor = componentScale.get(component);
    const bbox = componentBBox.get(component);
    const scale = scaleDescriptor ? useScale(scaleDescriptor) : null;
    const render = useGuideComponent(component);
    const { field, domain } = scaleDescriptor;
    const value = { field, domain };
    const group = render(scale, bbox, value, coordinate, theme);
    canvas.appendChild(group);
  }

  // Render marks with corresponding channel values.
  for (const [mark, props] of markProps.entries()) {
    const { scale: scaleDescriptor } = mark;
    const { index, channels, defaultShape } = props;
    const scale = mapObject(scaleDescriptor, useScale);
    const render = useMark(mark);
    const value = Container.of<MarkChannel>(channels)
      .map(applyScale, scale)
      .map(shapeFunction, index, defaultShape, library)
      .value();
    const shapes = render(index, scale, value, coordinate, theme);
    for (const shape of shapes) {
      canvas.appendChild(shape);
    }
  }
}

function inferTheme(theme: G2ThemeOptions = { type: 'light' }): G2ThemeOptions {
  const { type = 'light' } = theme;
  return { ...theme, type };
}

function shapeFunction(
  value: Record<string, Channel>,
  index: number[],
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
    ? shape.map((type) => useShape({ type }))
    : index.map(() => useShape({ type: defaultShape }));
  return { ...value, shape: shapeFunctions };
}
