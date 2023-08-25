import { Canvas } from '@antv/g';
import { createCanvas } from 'canvas';
import { G2Context, G2Spec, stdlib, render } from '../../../src';
import { renderToMountedElement } from '../../utils/renderToMountedElement';
import { createNodeGCanvas } from './createNodeGCanvas';

export async function renderSpec(
  generateOptions,
  context: G2Context = {},
  createGCanvas = createNodeGCanvas,
): Promise<Canvas> {
  const { width = 640, height = 480, ...raw }: G2Spec = await generateOptions();
  const gCanvas = createGCanvas(width, height);
  const { mounted, preprocess = (d) => d } = generateOptions;
  const renderFunction = mounted ? renderToMountedElement : render;
  const options = preprocess({ ...raw, width, height });
  context.canvas = gCanvas;
  context.library = stdlib();
  context.createCanvas = () => {
    // The width attribute defaults to 300, and the height attribute defaults to 150.
    // @see https://stackoverflow.com/a/12019582
    return createCanvas(300, 150) as unknown as HTMLCanvasElement;
  };
  await new Promise<Canvas>((resolve) =>
    // @ts-ignore
    renderFunction(options, context, resolve),
  );
  return gCanvas;
}
