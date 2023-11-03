// import * as fs from 'fs';
// import * as os from 'os';
// import * as path from 'path';
// import { createCanvas } from 'canvas';
// import { Canvas } from '@antv/g';
// import { Renderer } from '@antv/g-canvas';
// import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
// import { Chart } from '../../../src';

// function createNodeGCanvas(width: number, height: number): Canvas {
//   // Create a node-canvas instead of HTMLCanvasElement
//   const nodeCanvas = createCanvas(width, height);
//   // A standalone offscreen canvas for text metrics
//   const offscreenNodeCanvas = createCanvas(1, 1);

//   // Create a renderer, unregister plugin relative to DOM.
//   const renderer = new Renderer();
//   // Remove html plugin to ssr.
//   const htmlRendererPlugin = renderer.getPlugin('html-renderer');
//   renderer.unregisterPlugin(htmlRendererPlugin);
//   const domInteractionPlugin = renderer.getPlugin('dom-interaction');
//   renderer.unregisterPlugin(domInteractionPlugin);
//   renderer.registerPlugin(
//     new DragAndDropPlugin({ dragstartDistanceThreshold: 10 }),
//   );
//   return new Canvas({
//     width,
//     height,
//     // @ts-ignore
//     canvas: nodeCanvas,
//     renderer,
//     // @ts-ignore
//     offscreenCanvas: offscreenNodeCanvas,
//   });
// }

// function writePNG(nodeCanvas) {
//   return new Promise<string>((resolve, reject) => {
//     const f = path.join(os.tmpdir(), `${Math.random()}.png`);
//     const out = fs.createWriteStream(f);
//     const stream = nodeCanvas.createPNGStream();
//     stream.pipe(out);
//     out.on('finish', () => resolve(f)).on('error', reject);
//   });
// }

// async function renderG2BySSR() {
//   const width = 600;
//   const height = 400;

//   const gCanvas = createNodeGCanvas(width, height);

//   // A tabular data to be visualized.
//   const data = [
//     { genre: 'Sports', sold: 275 },
//     { genre: 'Strategy', sold: 115 },
//     { genre: 'Action', sold: 120 },
//     { genre: 'Shooter', sold: 350 },
//     { genre: 'Other', sold: 150 },
//   ];

//   // Instantiate a new chart.
//   const chart = new Chart({
//     width,
//     height,
//     // Set the g canvas with node-canvas.
//     canvas: gCanvas,
//     // Set the createCanvas function.
//     // @ts-ignore
//     createCanvas: () => {
//       // The width attribute defaults to 300, and the height attribute defaults to 150.
//       // @see https://stackoverflow.com/a/12019582
//       return createCanvas(width, height) as unknown as HTMLCanvasElement;
//     },
//   });

//   // Specify visualization.
//   chart
//     .interval() // Create an interval mark and add it to the chart.
//     .data(data) // Bind data for this mark.
//     .encode('x', 'genre') // Assign genre column to x position channel.
//     .encode('y', 'sold') // Assign sold column to y position channel.
//     .encode('color', 'genre'); // Assign genre column to color channel.

//   // Render visualization.
//   await chart.render();

//   return writePNG(chart.getContext().canvas?.getConfig().canvas);
// }

describe('ssr', () => {
  it('SSR will return a image', async () => {
    // const f = await renderG2BySSR();
    // expect(fs.existsSync(f)).toBe(true);
  });
});
