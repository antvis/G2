require('./style.css');

if (window) {
  (window as any).g2 = require('../../src');
  (window as any).d3Hierarchy = require('d3-hierarchy');
  (window as any).d3Voronoi = require('d3-voronoi');
  (window as any).d3Array = require('d3-array');
  (window as any).d3GeoProjection = require('d3-geo-projection');
  (window as any).topojson = require('topojson');
  (window as any).gLottiePlayer = require('@antv/g-lottie-player');
  (window as any).webfontloader = require('webfontloader');
  (
    window as any
  ).gPluginRoughCanvasRenderer = require('@antv/g-plugin-rough-canvas-renderer');
  (window as any).gPluginA11y = require('@antv/g-plugin-a11y');
}
