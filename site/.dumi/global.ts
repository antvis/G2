require('./style.css');
require('./github-markdown-light.css');
require('./prism-one-light.css');

if (window) {
  (window as any).g2 = require('../../src');
  (window as any).d3Hierarchy = require('d3-hierarchy');
  (window as any).d3ScaleChromatic = require('d3-scale-chromatic');
  (window as any).d3Interpolate = require('d3-interpolate');
  (window as any).d3Voronoi = require('d3-voronoi');
  (window as any).d3Array = require('d3-array');
  (window as any).d3Regression = require('d3-regression');
  (window as any).d3GeoProjection = require('d3-geo-projection');
  (window as any).d3Random = require('d3-random');
  (window as any).topojson = require('topojson');
  (window as any).gLottiePlayer = require('@antv/g-lottie-player');
  (window as any).gPattern = require('@antv/g-pattern');
  (window as any).webfontloader = require('webfontloader');
  (
    window as any
  ).gPluginRoughCanvasRenderer = require('@antv/g-plugin-rough-canvas-renderer');
  (window as any).gPluginA11y = require('@antv/g-plugin-a11y');
  (window as any).gSvg = require('@antv/g-svg');
  (window as any).gWebgl = require('@antv/g-webgl');
  (window as any).fecha = require('fecha');
  (window as any).React = require('react');
}

if (
  location.host === 'g2.antv.vision' ||
  location.host === 'antv-g2.gitee.io'
) {
  (window as any).location.href = location.href.replace(
    location.origin,
    'https://g2.antv.antgroup.com',
  );
}
