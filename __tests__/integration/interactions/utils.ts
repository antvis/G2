import { DisplayObject, Canvas, Document } from '@antv/g';
import { G2Context, G2Spec, render } from '../../../src';
import { fetch } from '../fetch';

// @ts-ignore
global.fetch = fetch;

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
