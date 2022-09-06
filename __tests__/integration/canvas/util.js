const fs = require('fs');
const { createCanvas } = require('canvas');
const { Canvas } = require('@antv/g');
const { Renderer } = require('@antv/g-canvas');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;

const createGCanvas = (width, height) => {
  // Create a node-canvas instead of HTMLCanvasElement
  const nodeCanvas = createCanvas(width, height);
  // A standalone offscreen canvas for text metrics
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);

  return [
    new Canvas({
      width,
      height,
      canvas: nodeCanvas,
      renderer,
      offscreenCanvas: offscreenNodeCanvas,
    }),
    nodeCanvas,
  ];
};

const sleep = (n) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, n);
  });
};

/**
 * diff between PNGs
 */
const diff = (src, target) => {
  const img1 = PNG.sync.read(fs.readFileSync(src));
  const img2 = PNG.sync.read(fs.readFileSync(target));
  const { width, height } = img1;
  return pixelmatch(img1.data, img2.data, null, width, height, {
    threshold: 0.1,
  });
};

/**
 * create PNG with rawdata
 * @see https://github.com/lukeapage/pngjs/blob/master/examples/newfile.js
 */
const createPNGFromRawdata = async (target, width, height, data) => {
  let newfile = new PNG({ width, height });
  for (let y = 0; y < newfile.height; y++) {
    for (let x = 0; x < newfile.width; x++) {
      let idx = (newfile.width * y + x) << 2;
      newfile.data[idx] = data[idx];
      newfile.data[idx + 1] = data[idx + 1];
      newfile.data[idx + 2] = data[idx + 2];
      newfile.data[idx + 3] = data[idx + 3];
    }
  }

  return new Promise((resolve) => {
    newfile
      .pack()
      .pipe(fs.createWriteStream(target))
      .on('finish', function () {
        resolve(newfile);
      });
  });
};

const writePNG = (nodeCanvas, path) =>
  new Promise((resolve) => {
    const out = fs.createWriteStream(path);
    const stream = nodeCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
      resolve(undefined);
    });
  });

module.exports = { sleep, diff, createPNGFromRawdata, createGCanvas, writePNG };
