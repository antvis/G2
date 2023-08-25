import { Canvas } from '@antv/g';
import { G2Context, G2Spec, stdlib, render } from '../../../src';
import { renderToMountedElement } from '../../utils/renderToMountedElement';
import { createDOMGCanvas } from './createDOMGCanvas';

export async function renderSpec(
  generateOptions,
  context: G2Context = {},
  createGCanvas = createDOMGCanvas,
): Promise<Canvas> {
  const { width = 640, height = 480, ...raw }: G2Spec = await generateOptions();
  const gCanvas = createGCanvas(width, height);
  const { mounted, preprocess = (d) => d } = generateOptions;
  const renderFunction = mounted ? renderToMountedElement : render;
  const options = preprocess({ ...raw, width, height });
  context.canvas = gCanvas;
  context.library = stdlib();
  context.createCanvas = () => document.createElement('canvas');
  await new Promise<Canvas>((resolve) =>
    // @ts-ignore
    renderFunction(options, context, resolve),
  );
  return gCanvas;
}
