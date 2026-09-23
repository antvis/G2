import { defineConfig } from '@antv/astro-theme-antv';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

const config = defineConfig({
  demo: {
    dependencies: {
      '@antv/g2': '@antv/g2',
      '@antv/g': '@antv/g',
      '@antv/data-set': '@antv/data-set',
      '@antv/g2-extension-3d': '@antv/g2-extension-3d',
      '@antv/g2-extension-plot': '@antv/g2-extension-plot',
      '@antv/g-plugin-3d': '@antv/g-plugin-3d',
      '@antv/g-plugin-control': '@antv/g-plugin-control',
      '@antv/g-plugin-a11y': '@antv/g-plugin-a11y',
      '@antv/g-webgl': '@antv/g-webgl',
      'd3-interpolate': 'd3-interpolate',
      'd3-random': 'd3-random',
      'd3-regression': 'd3-regression/dist/d3-regression.esm.js',
      'd3-scale-chromatic': 'd3-scale-chromatic',
      'topojson-client': 'topojson-client',
      '@antv/g-lottie-player': '@antv/g-lottie-player',
      '@antv/g-pattern': '@antv/g-pattern',
      '@antv/g-plugin-rough-canvas-renderer':
        '@antv/g-plugin-rough-canvas-renderer',
      '@antv/g-svg': '@antv/g-svg',
      '@antv/g2-extension-ava': '@antv/g2-extension-ava',
      '@mapbox/geojson-rewind': '@mapbox/geojson-rewind',
      'd3-array': 'd3-array',
      'd3-geo-projection': 'd3-geo-projection',
      'd3-hexjson': 'd3-hexjson',
      'd3-hierarchy': 'd3-hierarchy',
      'd3-voronoi': 'd3-voronoi',
      dirichlet: 'dirichlet',
      lodash: 'lodash',
      webfontloader: 'webfontloader',
    },
  },
  analytics: { GoogleAnalytics: { id: 'G-3L8SSDC4X6' } },
  site: {
    title: 'G2 一套简明和渐进式的可视化语法 | AntV',
    logo: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*A-lcQbVTpjwAAAAAAAAAAAAADmJ7AQ/original',
    origin: 'https://g2.antv.antgroup.com',
    repository: 'https://github.com/antvis/g2',
    description: {
      zh: 'G2 是一套简洁的渐进式可视化语法，用于构建仪表盘、数据探索以及数据讲故事。结合工业和学术实践，实现图形语法、动画语法和交互语法。',
      en: 'G2 is a concise and progressive visualization grammar designed for building dashboards, data exploration, and storytelling with data. It integrates both industry and academic practices to implement graphical grammar, animation grammar, and interaction grammar.',
    },
    favicon:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
  },
  content: {
    edit: { branch: 'v5', path: 'site/docs' },
    agentComponents: {
      Card: { type: 'link-card' },
    },
    sidebar: {
      'manual/introduction': { zh: '简介', en: 'Introduction', order: 2.0 },
      'manual/core': { zh: '核心概念', en: 'Core Concepts', order: 4.0 },
      'manual/core/chart': {
        zh: '图表组成和使用（Chart）',
        en: 'Chart',
        order: 1.1,
      },
      'manual/core/mark': { zh: '图形标记（Mark）', en: 'Mark', order: 2.0 },
      'manual/core/data': {
        zh: '数据配置和数据转换（Data）',
        en: 'Data',
        order: 4.0,
      },
      'manual/core/scale': { zh: '比例尺（Scale）', en: 'Scale', order: 6.0 },
      'manual/core/transform': {
        zh: '标记转换（Transform）',
        en: 'Transform',
        order: 7.0,
      },
      'manual/core/coordinate': {
        zh: '坐标系及其转换（Coordinate）',
        en: 'Coordinate',
        order: 8.0,
      },
      'manual/core/animate': {
        zh: '动画（Animate）',
        en: 'Animate',
        order: 10.0,
      },
      'manual/core/interaction': {
        zh: '交互（Interaction）',
        en: 'Interaction',
        order: 13.0,
      },
      'manual/core/composition': {
        zh: '复合视图（Composition）',
        en: 'Composition',
        order: 14.0,
      },
      'manual/core/theme': { zh: '主题（Theme）', en: 'Theme', order: 15.0 },
      'manual/component': { zh: '图表组件', en: 'Chart Component', order: 4.1 },
      'manual/extra-topics': { zh: '进阶主题', en: 'Extra Topics', order: 5.0 },
      'manual/extra-topics/graph': {
        zh: '关系图（Graph）',
        en: 'Graph',
        order: 5.0,
      },
      'manual/extra-topics/geo': { zh: '地图（Geo）', en: 'Geo', order: 5.0 },
      'manual/extra-topics/three-dimensional': {
        zh: '3D 图表（3D Chart）',
        en: '3D',
        order: 5.0,
      },
      'manual/extra-topics/plugin': {
        zh: '插件扩展（Plugin）',
        en: 'Plugin',
        order: 5.0,
      },
      'manual/whats-new': { zh: '版本特性', en: 'Whats New', order: 5.0 },
    },
  },
  examples: [
    {
      slug: 'general',
      icon: 'gallery',
      title: { zh: '基础图表', en: 'General' },
    },
    {
      slug: 'analysis',
      icon: 'data',
      title: { zh: '数据分析', en: 'Analysis' },
    },
    { slug: 'graph', icon: 'net', title: { zh: '关系图', en: 'Graph' } },
    { slug: 'geo', icon: 'map', title: { zh: '地理', en: 'Geo' } },
    {
      slug: 'annotation',
      icon: 'guide',
      title: { zh: '数据标注', en: 'Annotation' },
    },
    {
      slug: 'composition',
      icon: 'facet',
      title: { zh: '复合视图', en: 'Composition' },
    },
    {
      slug: 'component',
      icon: 'block',
      title: { zh: '组件', en: 'Component' },
    },
    {
      slug: 'animation',
      icon: 'player-play',
      title: { zh: '动画', en: 'Animation' },
    },
    {
      slug: 'interaction',
      icon: 'interaction',
      title: { zh: '交互', en: 'Interaction' },
    },
    { slug: 'layout', icon: 'block', title: { zh: '布局', en: 'Layout' } },
    {
      slug: 'intelligent',
      icon: 'bulb',
      title: { zh: '智能可视化', en: 'Intelligent' },
    },
    {
      slug: 'storytelling',
      icon: 'story',
      title: { zh: '可视化叙事', en: 'Stroytelling' },
    },
    {
      slug: 'algorithm',
      icon: 'tool',
      title: { zh: '算法可视化', en: 'Algorithm Vis' },
    },
    { slug: 'unit', icon: 'shape', title: { zh: '单元可视化', en: 'Unit' } },
    {
      slug: 'threed',
      icon: 'cube',
      title: { zh: '3D 可视化', en: '3D Charts' },
    },
    {
      slug: 'interesting',
      icon: 'star',
      title: { zh: '趣味可视化', en: 'Interesting' },
    },
    {
      slug: 'scene',
      icon: 'case',
      title: { zh: '场景可视化', en: 'Scene Visualization' },
    },
    { slug: 'style', icon: 'skin', title: { zh: '风格', en: 'Style' } },
    {
      slug: 'renderer',
      icon: 'build',
      title: { zh: '渲染器', en: 'Renderer' },
    },
    {
      slug: 'accessible',
      icon: 'accessible',
      title: { zh: '无障碍', en: 'Accessible' },
    },
    {
      slug: 'expr',
      icon: 'execute',
      title: {
        zh: 'Spec 函数表达式 (beta)',
        en: 'Spec Function Expression (beta)',
      },
    },
  ],
  navigation: [
    {
      text: {
        zh: '图表介绍',
        en: 'Chart Gallery',
      },
      href: '/charts/overview/',
    },
    {
      text: {
        zh: '文档',
        en: 'Docs',
      },
      href: '/manual/quick-start/',
    },
    {
      text: {
        zh: '图表示例',
        en: 'Examples',
      },
      href: '/examples/',
    },
    { text: { zh: '主题', en: 'Theme' }, href: '/theme/' },
  ],
  versions: {
    [version]: 'https://g2.antv.antgroup.com',
    '4.x': 'https://g2-v4.antv.vision/',
    '3.x': 'https://g2-v3.antv.vision/',
    '2.x': 'https://antv.vision/old-site/g2/doc/index.html',
  },
  slots: {
    home: {
      hero: ['./src/home/Hero.astro'],
      features: ['./src/home/Features.astro'],
      afterFeatures: ['./src/home/Community.astro'],
    },
  },
  qa: { enabled: true },
  home: {
    openGraph: {
      title: {
        zh: 'AntV G2，基于可视化语法的 JavaScript 图表库',
        en: 'AntV G2, The concise and progressive visualization grammar.',
      },
      description: {
        zh: '使用 G2 Spec 配置数据、图形标记、交互和动画，构建可组合的统计图表、仪表盘和数据可视化。提供中英文文档与可运行示例。',
        en: 'Build composable charts, dashboards, and data visualizations with G2 Spec, marks, interactions, and animations. Explore documentation and runnable examples.',
      },
    },
    title: {
      zh: 'G2·可视化语法',
      en: 'G2·Visualization Grammar',
    },
    description: {
      zh: 'G2 是一套简洁的渐进式可视化语法，用于报表搭建、数据探索以及可视化叙事。',
      en: 'G2 is a concise and progressive visualization grammar for dashboard building, data exploration and storytelling.',
    },
    image:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wi05Q7Za5ZIAAAAAAAAAAAAADmJ7AQ/original',
    features: [
      {
        icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*4x_KTKyqwJgAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '千变万化，自由组合',
          en: 'Compose without limits',
        },
        description: {
          zh: '任何图表，都可以基于图形语法灵活绘制，满足你无限的创意',
          en: 'Any chart can be drawn flexibly based on graphic syntax to satisfy your unlimited creativity',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ELYbTIVCgPoAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '专业完备',
          en: 'Professional and complete',
        },
        description: {
          zh: '大量产品实践之上，提供绘图引擎、完备图形语法、专业设计规范',
          en: 'On top of a large number of product practices, it provides a drawing engine, a complete graphics grammar, and professional design rules',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_riSQZrgczgAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '生动，可交互',
          en: 'Vivid, interactive',
        },
        description: {
          zh: '强大的交互语法，助力可视分析，让图表栩栩如生',
          en: 'Powerful interactions support visual analysis and bring charts to life',
        },
      },
    ],
  },
});

export default {
  ...config,
  integrations: [...config.integrations, react()],
  vite: {
    resolve: {
      alias: [
        {
          find: /^@antv\/g2$/,
          replacement: fileURLToPath(
            new URL('../src/index.ts', import.meta.url),
          ),
        },
      ],
      dedupe: ['react', 'react-dom', '@antv/g', '@antv/g-lite'],
    },
  },
};
