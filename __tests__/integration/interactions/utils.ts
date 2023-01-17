import { DisplayObject, Canvas, Document, CustomEvent } from '@antv/g';
import { G2Context, G2Spec, render } from '../../../src';

// @ts-ignore
// global.fetch = fetch;

export function assetElementStyle(
  element: DisplayObject,
  key: string,
  value: any,
): void {
  expect(element.getAttribute(key)).toBe(value);
}

export function assetElementsStyle(
  elements: DisplayObject[],
  key: string,
  value: any,
): void {
  elements.forEach((e) => assetElementStyle(e, key, value));
}

export function renderSync(
  options: G2Spec,
  context: G2Context = {},
): Promise<Document> {
  return new Promise<Document>((resolve) => {
    render(options, context, () => {
      resolve((context.canvas as Canvas).document);
    });
  });
}

export function step(
  element: DisplayObject,
  event,
  { skip = false, ...rest }: Record<string, any> = {},
) {
  return {
    skip,
    changeState: async () => {
      element.dispatchEvent(new CustomEvent(event, rest));
    },
  };
}

export function disableDelay(options): G2Spec {
  const { interactions = [] } = options;
  const newInteractions = interactions.map((d) => ({ ...d, delay: 0 }));
  return {
    ...options,
    interactions: newInteractions,
  };
}
