import { Canvas, CustomEvent, DisplayObject, Document } from '@antv/g';
import type { G2Context } from '@/runtime';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

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
    changeState: () => element.dispatchEvent(new CustomEvent(event, rest)),
  };
}
