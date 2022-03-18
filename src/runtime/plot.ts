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
import { inferMarkAndProps } from './mark';
import { inferComponent } from './component';
import { computeLayout, placeComponents } from './layout';
import { createCoordinate } from './coordinate';
import { applyScale } from './scale';

export function plot<T extends G2ViewTree>(
  options: T,
  context: G2Context,
): void {
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
  plotArea(area, context);
}

function plotArea(options: G2Area, context: G2Context): void {
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

  const { theme: partialTheme, marks: partialMarks } = options;
  const theme = useTheme(inferTheme(partialTheme));

  const markProps = new Map<G2Mark, MarkProps>();
  const channelScale = new Map<string, G2ScaleOptions>();
  const marks = [];
  for (const partialMark of partialMarks) {
    const { type = error('Mark type is required.') } = partialMark;
    const { props: partialProps } = createMark(type);
    const markAndProps = inferMarkAndProps(
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

  const scales = Array.from(
    new Set(marks.flatMap((d) => Object.values(d.scale))),
  );
  const [components, componentScale] = inferComponent(scales, options, library);
  const layout = computeLayout(components, options);
  const componentBBox = placeComponents(components, layout, options);
  const coordinate = createCoordinate(layout, options, library);

  for (const component of components) {
    const scaleDescriptor = componentScale.get(component);
    const bbox = componentBBox.get(component);
    const scale = useScale(scaleDescriptor);
    const render = useGuideComponent(component);
    const { field, domain } = scaleDescriptor;
    const value = { field, domain };
    const group = render(scale, bbox, value, coordinate, theme);
    canvas.appendChild(group);
  }

  for (const [mark, props] of markProps.entries()) {
    const { type, style, scale: scaleDescriptor } = mark;
    const { index, channels, defaultShape } = props;
    const scale = mapObject(scaleDescriptor, useScale);
    const render = useMark({ type });
    const value = Container.of<MarkChannel>(channels)
      .map(applyScale, scale)
      .map(shapeFunction, index, defaultShape, library)
      .value();
    const shapes = render(index, scale, value, style, coordinate, theme);
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
