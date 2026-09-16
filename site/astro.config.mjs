import { defineConfig } from '@antv/astro-theme-antv';
import { readFileSync } from 'node:fs';
const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

export default defineConfig({
  analytics: { GoogleAnalytics: { id: 'G-3L8SSDC4X6' } },
  site: {
    title: 'G2',
    origin: 'https://g2.antv.antgroup.com',
    repository: 'https://github.com/antvis/g2',
    description: {
      zh: 'G2 是一套简洁的渐进式可视化语法，用于构建仪表盘、数据探索以及数据讲故事。结合工业和学术实践，实现图形语法、动画语法和交互语法。',
      en: 'G2 is a concise and progressive visualization grammar designed for building dashboards, data exploration, and storytelling with data. It integrates both industry and academic practices to implement graphical grammar, animation grammar, and interaction grammar.',
    },
    favicon:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
  },
  content: { examples: null },
  navigation: [
    {
      text: {
        zh: '图表示例',
        en: 'Examples',
      },
      href: '/examples/',
    },
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
