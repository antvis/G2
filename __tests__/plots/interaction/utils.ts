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

export function dispatchSliderZoom(
  slider: any,
  zoomFactor: number,
  center = 0.5,
) {
  const { values } = slider.attributes;
  const [v0, v1] = values;
  const range = v1 - v0;
  const newRange = Math.max(0.001, Math.min(1, range * zoomFactor));

  // Calculate new range boundaries based on center position
  const leftRatio = (center - v0) / range;
  const rightRatio = (v1 - center) / range;

  let newV0 = center - newRange * leftRatio;
  let newV1 = center + newRange * rightRatio;

  // Handle boundary conditions
  if (newV0 < 0) {
    newV0 = 0;
    newV1 = Math.min(1, newRange);
  } else if (newV1 > 1) {
    newV1 = 1;
    newV0 = Math.max(0, 1 - newRange);
  }

  slider.update({ values: [newV0, newV1] });
  slider.dispatchEvent(
    new CustomEvent('valuechange', {
      detail: { value: [newV0, newV1] },
      nativeEvent: true,
    }),
  );
}
