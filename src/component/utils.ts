import { CustomElement, DisplayObjectConfig, Group } from '@antv/g';
import { deepMix } from '@antv/util';
import { Layout } from '@antv/gui';
import { select, Selection, G2Element } from '../utils/selection';
import { GuideComponentPosition, FlexLayout, Scale } from '../runtime';

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

  if (userDefinitions) {
    return {
      ...preset,
      ...userDefinitions,
    };
  }
  let { flexDirection, justifyContent, alignItems } = preset;

  const layout = {
    top: ['row', 'center', 'center'],
    bottom: ['row', 'center', 'center'],
    left: ['colunm', 'center', 'center'],
    right: ['colunm', 'center', 'center'],
    center: ['column', 'center', 'center'],
  };

  if (position in layout) {
    [flexDirection, justifyContent, alignItems] = layout[position];
  }
  return { display: 'flex', flexDirection, justifyContent, alignItems };
}

export class G2Layout extends Layout {
  update(options: any) {
    this.attr(options);
    const { width, height, ...restOptions } = options;
    (this.children?.[0] as any)?.update(restOptions);
  }
}

export function scaleOf(scales: Scale[], type: string): Scale | undefined {
  return scales.filter((s) => s.getOptions().name === type)?.[0];
}
