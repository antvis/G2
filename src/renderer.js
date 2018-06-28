
const G = require('@antv/g/src');
const Global = require('./global');
const Util = require('./util');

let renderer = G.canvas;

if (Global.renderer === 'svg') {
  renderer = G.svg;
}

Util.mix(renderer, G);

module.exports = renderer;
