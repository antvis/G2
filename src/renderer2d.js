
const G = require('@antv/g');
const Global = require('./global');

let renderer = G.canvas;


if (Global.renderer2d === 'svg') {
  renderer = G.svg;
}

module.exports = renderer;
