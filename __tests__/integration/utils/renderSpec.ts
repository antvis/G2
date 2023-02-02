import { Canvas, Text, Group } from '@antv/g';
import {
  G2Context,
  G2Spec,
  render,
  renderToMountedElement,
} from '../../../src';
import { createNodeGCanvas } from './createNodeGCanvas';
import { sleep } from './sleep';

export function renderChartToMountedElement(
  options,
  { canvas },
  resolve = () => {},
) {
  canvas.ready.then(() => {
    canvas.appendChild(
      new Text({
        style: {
          text: 'Other Elements Rendered By G',
          textBaseline: 'top',
        },
      }),
    );
    const group = new Group({});
    canvas.appendChild(group);
    renderToMountedElement(options, { group }, resolve);
  });
  return canvas.getConfig().container;
}

export async function renderSpec(
  generateOptions,
  context: G2Context = {},
): Promise<Canvas> {
  const { width = 640, height = 480, ...raw }: G2Spec = await generateOptions();
  const gCanvas = createNodeGCanvas(width, height);
  const { mounted, preprocess = (d) => d } = generateOptions;
  const renderFunction = mounted ? renderChartToMountedElement : render;
  const options = preprocess({ ...raw, width, height });
  context.canvas = gCanvas;
  await new Promise<Canvas>((resolve) =>
    // @ts-ignore
    renderFunction(options, context, resolve),
  );
  // Wait for the next tick.
  await sleep(20);
  return gCanvas;
}
