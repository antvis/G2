const { createCanvas } = require('canvas');
const { JSDOM } = require('jsdom');
const { Canvas } = require('@antv/g');
const { Renderer } = require('@antv/g-svg');

const createGCanvas = (width, height) => {
  const dom = new JSDOM(`
  <div id="container">
  </div>
  `);
  // A standalone offscreen canvas for text metrics
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);

  return [
    new Canvas({
      container: 'container',
      width,
      height,
      renderer,
      document: dom.window.document,
      offscreenCanvas: offscreenNodeCanvas,
      requestAnimationFrame: dom.window.requestAnimationFrame,
      cancelAnimationFrame: dom.window.cancelAnimationFrame,
    }),
    dom,
  ];
};

const sleep = (n) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, n);
  });
};

module.exports = { sleep, createGCanvas };
