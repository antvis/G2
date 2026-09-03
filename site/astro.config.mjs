import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { antvSite } from '@antv/site';

const require = createRequire(import.meta.url);
const { repository, version } = require('../package.json');

/** @satisfies {import('@antv/site').AntVSiteConfig} */
const siteConfig = {
  site: {
    title: 'G2',
    origin: 'https://g2.antv.antgroup.com',
    repository: repository.url,
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    favicon:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
    logo: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*A-lcQbVTpjwAAAAAAAAAAAAADmJ7AQ/original',
    description: {
      zh: 'G2 是一套简洁的渐进式可视化语法，用于构建仪表盘、数据探索以及数据叙事。',
      en: 'G2 is a concise and progressive visualization grammar for dashboards, data exploration, and storytelling.',
    },
  },
  content: {
    docs: './docs',
    collectionName: 'docs',
    examples: './examples',
    edit: {
      branch: 'v5',
      path: 'site/docs',
    },
    sidebar: {
      'manual/introduction': { zh: '简介', en: 'Introduction', order: 2 },
      'manual/core': { zh: '核心概念', en: 'Core Concepts', order: 4 },
      'manual/core/chart': { zh: '图表（Chart）', en: 'Chart', order: 1.1 },
      'manual/core/mark': { zh: '图形标记（Mark）', en: 'Mark', order: 2 },
      'manual/core/data': { zh: '数据（Data）', en: 'Data', order: 4 },
      'manual/core/scale': { zh: '比例尺（Scale）', en: 'Scale', order: 6 },
      'manual/core/transform': {
        zh: '标记转换（Transform）',
        en: 'Transform',
        order: 7,
      },
      'manual/core/coordinate': {
        zh: '坐标系（Coordinate）',
        en: 'Coordinate',
        order: 8,
      },
      'manual/core/animate': {
        zh: '动画（Animate）',
        en: 'Animate',
        order: 10,
      },
      'manual/core/interaction': {
        zh: '交互（Interaction）',
        en: 'Interaction',
        order: 13,
      },
      'manual/core/composition': {
        zh: '复合视图（Composition）',
        en: 'Composition',
        order: 14,
      },
      'manual/core/theme': { zh: '主题（Theme）', en: 'Theme', order: 15 },
      'manual/component': {
        zh: '图表组件',
        en: 'Chart Components',
        order: 4.1,
      },
      'manual/extra-topics': {
        zh: '进阶主题',
        en: 'Extra Topics',
        order: 5,
      },
      'manual/extra-topics/graph': {
        zh: '关系图（Graph）',
        en: 'Graph',
        order: 5,
      },
      'manual/extra-topics/geo': { zh: '地图（Geo）', en: 'Geo', order: 5 },
      'manual/extra-topics/three-dimensional': {
        zh: '3D 图表',
        en: '3D Charts',
        order: 5,
      },
      'manual/extra-topics/plugin': {
        zh: '插件扩展',
        en: 'Plugins',
        order: 5,
      },
      'manual/whats-new': { zh: '版本特性', en: 'What’s New', order: 5 },
    },
    components: {
      Card: { type: 'link-card' },
      Tree: `<details class="configuration-tree" open>
  <summary>Chart configuration</summary>
  <ul>
    <li><code>type</code>, <code>width</code>, <code>height</code>, <code>autoFit</code>, spacing and layout</li>
    <li><code>data</code> and data transforms</li>
    <li><code>encode</code>, <code>scale</code>, and <code>coordinate</code></li>
    <li><code>transform</code>, <code>style</code>, <code>state</code>, and <code>animate</code></li>
    <li><code>axis</code>, <code>legend</code>, <code>title</code>, <code>tooltip</code>, <code>labels</code>, <code>slider</code>, and <code>scrollbar</code></li>
    <li><code>interaction</code> and nested <code>children</code></li>
  </ul>
  <p>See the <a href="../../api/">Chart API</a> for the complete option types.</p>
</details>`,
    },
  },
  navigation: [
    { text: { zh: '图表介绍', en: 'Chart Gallery' }, href: '/charts/overview' },
    { text: { zh: '文档', en: 'Docs' }, href: '/manual/quick-start' },
    { text: { zh: '图表示例', en: 'Examples' }, href: '/examples' },
  ],
  versions: {
    [version]: 'https://g2.antv.antgroup.com',
    '4.x': 'https://g2-v4.antv.vision/',
    '3.x': 'https://g2-v3.antv.vision/',
    '2.x': 'https://antv.vision/old-site/g2/doc/index.html',
  },
  examples: [
    {
      slug: 'general',
      title: { zh: '基础图表', en: 'General' },
      icon: 'gallery',
    },
    {
      slug: 'analysis',
      title: { zh: '数据分析', en: 'Analysis' },
      icon: 'data',
    },
    { slug: 'graph', title: { zh: '关系图', en: 'Graph' }, icon: 'net' },
    { slug: 'geo', title: { zh: '地理', en: 'Geo' }, icon: 'map' },
    {
      slug: 'annotation',
      title: { zh: '数据标注', en: 'Annotation' },
      icon: 'guide',
    },
    {
      slug: 'composition',
      title: { zh: '复合视图', en: 'Composition' },
      icon: 'facet',
    },
    {
      slug: 'component',
      title: { zh: '组件', en: 'Component' },
      icon: 'block',
    },
    {
      slug: 'animation',
      title: { zh: '动画', en: 'Animation' },
      icon: 'execute',
    },
    {
      slug: 'interaction',
      title: { zh: '交互', en: 'Interaction' },
      icon: 'interaction',
    },
    { slug: 'layout', title: { zh: '布局', en: 'Layout' }, icon: 'ruler' },
    {
      slug: 'intelligent',
      title: { zh: '智能可视化', en: 'Intelligent' },
      icon: 'bulb',
    },
    {
      slug: 'storytelling',
      title: { zh: '可视化叙事', en: 'Storytelling' },
      icon: 'story',
    },
    {
      slug: 'algorithm',
      title: { zh: '算法可视化', en: 'Algorithm' },
      icon: 'tool',
    },
    { slug: 'unit', title: { zh: '单元可视化', en: 'Unit' }, icon: 'shape' },
    {
      slug: 'threed',
      title: { zh: '3D 可视化', en: '3D Charts' },
      icon: 'GRAPHIC',
    },
    {
      slug: 'interesting',
      title: { zh: '趣味可视化', en: 'Interesting' },
      icon: 'star',
    },
    { slug: 'scene', title: { zh: '场景可视化', en: 'Scene' }, icon: 'case' },
    { slug: 'style', title: { zh: '风格', en: 'Style' }, icon: 'skin' },
    {
      slug: 'renderer',
      title: { zh: '渲染器', en: 'Renderer' },
      icon: 'build',
    },
    {
      slug: 'accessible',
      title: { zh: '无障碍', en: 'Accessible' },
      icon: 'health',
    },
    {
      slug: 'expr',
      title: { zh: 'Spec 函数表达式', en: 'Spec Function Expression' },
      icon: 'code_line',
    },
  ],
  qa: {
    defaultStack: 'g2',
  },
  home: {
    eyebrow: { zh: 'AntV 可视化引擎', en: 'AntV visualization engine' },
    title: {
      zh: '简明、渐进、可组合',
      en: 'Compose with clarity',
    },
    description: {
      zh: '从一行标记声明开始，逐步组合数据、编码、比例尺、坐标系、动画与交互。',
      en: 'Start with one mark declaration, then compose data, encodings, scales, coordinates, animation, and interaction.',
    },
    showStats: false,
    image:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wi05Q7Za5ZIAAAAAAAAAAAAADmJ7AQ/original',
    imageAlt: { zh: 'G2 图形语法能力展示', en: 'G2 visual grammar showcase' },
    featuresTitle: {
      zh: '一套语法，构建无限表达',
      en: 'One grammar, infinite expression',
    },
    featuresDescription: {
      zh: '从图形声明到复杂交互，保持清晰、精确，并且始终可组合。',
      en: 'Stay clear, precise, and composable from a first mark to a complete interactive view.',
    },
    actions: [
      {
        text: { zh: '开始使用', en: 'Get started' },
        href: '/manual/quick-start',
      },
      { text: { zh: '浏览示例', en: 'Browse examples' }, href: '/examples' },
    ],
    features: [],
  },
  slots: {
    home: {
      hero: ['./Home.astro'],
    },
  },
  theme: {
    tokens: {
      '--brand': '#873bf4',
      '--brand-strong': '#722ed1',
      '--brand-soft': '#f9f0ff',
      '--brand-faint': '#fcf8ff',
    },
  },
  footer: {
    tagline: {
      zh: '图形语法 · 开源社区驱动',
      en: 'Grammar of Graphics · Open source',
    },
  },
  demo: {
    height: 480,
  },
  output: './dist',
};

export default defineConfig({
  integrations: [antvSite(siteConfig), mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@antv/g2': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      },
    },
  },
});
