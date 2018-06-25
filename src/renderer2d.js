
const G = require('@antv/g');
const Global = require('./global');
const Util = require('./util');

let renderer = G.canvas;


if (Global.renderer2d === 'svg') {
  renderer = G.svg;
}

Util.mix(renderer, G);

module.exports = renderer;
