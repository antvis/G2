import { CustomElement, DisplayObjectConfig, Group } from '@antv/g';
import { Layout } from '@antv/component';
import { deepMix, upperFirst } from '@antv/util';
import {
  FlexLayout,
  GuideComponentComponent,
  GuideComponentOrientation,
  GuideComponentPosition,
  Scale,
} from '../runtime';
import { G2Element, select, Selection } from '../utils/selection';

type Descriptor<T> = {
  render?: (attributes: T, container: CustomElement<T>) => void;
};

export function createComponent<T>(descriptor: Descriptor<T>): any {
  return class extends CustomElement<T> {
    public descriptor: Descriptor<T>;

    constructor(config: DisplayObjectConfig<T>) {
      super(config);
      this.descriptor = descriptor;
    }

    connectedCallback() {
      this.descriptor.render?.(this.attributes, this);
    }

    public update(cfg = {}) {
      this.attr(deepMix({}, this.attributes, cfg));
      this.descriptor.render?.(this.attributes, this);
    }
  };
}

export function maybeAppend<T>(
  parent: Group,
  selector: string,
  node: string | ((data: T, i: number) => G2Element),
): Selection<T> {
  if (!parent.querySelector(selector)) {
    return select(parent).append(node);
  }
  return select(parent).select(selector);
}

export function titleContent(field: string | string[]): string {
  return Array.isArray(field) ? field.join(', ') : `${field || ''}`;
}

export function inferComponentLayout(
  position: GuideComponentPosition,
  userDefinitions?: FlexLayout,
) {
  const preset = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  };

  let { flexDirection, justifyContent, alignItems } = preset;

  const layout = {
    top: ['row', 'flex-start', 'center'],
    bottom: ['row', 'flex-start', 'center'],
    left: ['column', 'flex-start', 'center'],
    right: ['column', 'flex-start', 'center'],
    center: ['column', 'center', 'center'],
  };

  if (position in layout) {
    [flexDirection, justifyContent, alignItems] = layout[position];
  }
  return {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    ...userDefinitions,
  };
}

export class G2Layout extends Layout {
  get child() {
    return this.children?.[0] as any;
  }

  update(options: any) {
    this.attr(options);
    const { subOptions } = options;
    this.child?.update(subOptions);
  }
}

export class LegendCategoryLayout extends G2Layout {
  update(options: any) {
    const { subOptions } = options;
    this.attr(options);
    this.child?.update(subOptions);
  }
}

export function scaleOf(scales: Scale[], type: string): Scale | undefined {
  return scales.filter((s) => s.getOptions().name === type)?.[0];
}

export function isHorizontal(orientation: GuideComponentOrientation) {
  return orientation === 'horizontal' || orientation === 0;
}

export function isVertical(orientation: GuideComponentOrientation) {
  return orientation === 'vertical' || orientation === -Math.PI / 2;
}

export function inferComponentShape(
  value: Record<string, any>,
  options: Record<string, any>,
  component: GuideComponentComponent,
) {
  const { bbox } = value;
  const {
    position = 'top',
    size: userDefinedSize,
    length: userDefinedLength,
  } = options;
  const isHorizontal = ['top', 'bottom', 'center'].includes(position);
  const [bboxSize, bboxLength] = isHorizontal
    ? [bbox.height, bbox.width]
    : [bbox.width, bbox.height];
  const { defaultSize, defaultLength } = component.props;
  const size = userDefinedSize || defaultSize || bboxSize;
  const length = userDefinedLength || defaultLength || bboxLength;
  const orientation = isHorizontal ? 'horizontal' : 'vertical';
  const [width, height] = isHorizontal ? [length, size] : [size, length];
  return {
    orientation,
    width,
    height,
    size,
    length,
  } as const;
}

export function domainOf(scales: Scale[]): any[] {
  // to get a available scale's domain
  return scales
    .find((scale) => scale.getOptions().domain.length > 0)
    .getOptions().domain;
}

export function adaptor<T>(style: T) {
  const reservedKeys = [
    'arrow',
    'crosshairs',
    'grid',
    'handle',
    'handleLabel',
    'indicator',
    'label',
    'line',
    'tick',
    'tip',
    'title',
    'trunc',
  ];
  // @ts-ignore
  const { style: styles, ...rest } = style;
  const finalStyle = {};
  Object.entries(rest).forEach(([key, value]) => {
    if (reservedKeys.includes(key)) {
      finalStyle[`show${upperFirst(key)}`] = value;
    } else finalStyle[key] = value;
  });
  return {
    ...finalStyle,
    ...styles,
  };
}
