require('./style.css');
// require('./github-markdown-light.css');
require('./prism-one-light.css');

if (window) {
  (window as any).g2 = extendG2(require('../../src'));
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
  (window as any).dataSet = require('@antv/data-set');
  (window as any).lodash = require('lodash');
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

// 对 G2 的 Chart 对象进行扩展
// 1. 可以自定义 spec 的展示内容和 key 的排序
// 2. 在 render 的时候触发 spec 事件抛出 spec，用于展示 spec
function extendG2(g2) {
  const { Chart: G2Chart, ...rest } = g2;

  const dimensionKeys = (name) =>
    ['', 'Top', 'Left', 'Bottom', 'Right'].map((d) => name + d);

  const sortObject = (
    obj,
    keys = [
      'type',
      'class',
      'theme',
      'autoFit',
      'clip',
      'frame',
      'x',
      'y',
      'width',
      'height',
      ...dimensionKeys('margin'),
      ...dimensionKeys('padding'),
      ...dimensionKeys('inset'),
      'ratio',
      'direction',
      'iterationCount',
      'shareSize',
      'shareData',
      'layout',
      'data',
      'encode',
      'transform',
      'scale',
      'coordinate',
      'style',
      'animate',
      'state',
      'axis',
      'legend',
      'labels',
      'tooltip',
      'interaction',
      'children',
    ].reverse(),
  ) =>
    Object.fromEntries(
      Object.entries(obj).sort(([a], [b]) => keys.indexOf(b) - keys.indexOf(a)),
    );

  // 对整个视图树的配置进行排序
  const sortKeys = (options) => {
    const newOptions = sortObject(options);
    const discovered = [newOptions];
    while (discovered.length) {
      const node = discovered.pop();
      const { children = [] } = node as any;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        children[i] = sortObject(child);
      }
      discovered.push(...children);
    }
    return newOptions;
  };

  class Chart extends G2Chart {
    options() {
      if (arguments.length !== 0) return super.options(...arguments);
      const options = super.options();
      const { type, children, key, plugins, style, ...rest } = options;

      // 是否只有一个 Mark，且没有 View 上的配置
      // 如果只有一个 Mark，那么就不用 View 容器了
      const isSingleMarkPlot =
        type === 'view' &&
        Array.isArray(children) &&
        children.length === 1 &&
        style === undefined;

      const options1 = isSingleMarkPlot
        ? { ...children[0], ...rest }
        : { type, children, style, ...rest };
      return sortKeys(options1);
    }
    render() {
      // 触发自定义事件
      const event = new CustomEvent('spec', {
        detail: {
          options: this.options(),
        },
      });
      window.dispatchEvent(event);
      return super.render();
    }
  }
  return { ...rest, Chart };
}
