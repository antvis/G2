import { defineConfig } from 'dumi';
import { repository, version } from '../package.json';

export default defineConfig({
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  title: 'G2', // 网站header标题
  favicons: [
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
  ], // 网站 favicon
  metas: [
    // 自定义 meta 标签
    {
      name: 'keywords',
      content: 'G2, AntV, 图形语法, 交互语法, 动画语法, 可视化语法',
    },
    { name: 'description', content: '简洁的渐进式可视化语法。' },
  ],
  themeConfig: {
    title: 'G2',
    description: 'The Grammar of Visualization in JavaScript',
    defaultLanguage: 'zh', // 默认语言
    isAntVSite: false, // 是否是 AntV 的大官网
    footerTheme: 'light', // 白色 底部主题
    siteUrl: 'https://antv.antgroup.com/', // 官网首页地址
    githubUrl: repository.url, // GitHub 地址
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: true, // 是否显示 GitHub star 数量
    showAntVProductsCard: true, // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: false, // 是否在 demo 页展示API文档
    showSpecTab: true, // 是否展示 Spec 页面
    es5: false, // 案例代码是否编译到 es5
    versions: {
      // 历史版本以及切换下拉菜单
      [version]: 'https://g2.antv.antgroup.com',
      '4.x': 'https://g2-v4.antv.vision/',
      '3.x': 'https://g2-v3.antv.vision/',
      '2.x': 'https://antv.vision/old-site/g2/doc/index.html',
    },
    docsearchOptions: {
      apiKey: '200ec461f4aa0bb4f0e761566f1a1336',
      indexName: 'antv_g2',
    },
    navs: [
      // 头部的菜单列表
      {
        slug: 'docs/manual/introduction',
        title: {
          zh: '文档',
          en: 'Docs',
        },
        order: 3,
      },
      {
        slug: 'docs/spec/overview',
        title: {
          zh: '选项',
          en: 'Spec',
        },
        order: 2,
      },
      {
        slug: 'docs/api/overview',
        title: {
          zh: 'API',
          en: 'API',
        },
        order: 1,
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
      {
        slug: 'theme',
        title: {
          zh: '主题',
          en: 'Theme',
        },
      },
    ],
    ecosystems: [
      // 头部的菜单中的「周边生态」
      {
        name: {
          zh: 'g2-extensions',
          en: 'g2-extensions',
        },
        url: 'https://github.com/antvis/g2-extensions',
      },
      {
        name: {
          zh: 'ant-design-charts',
          en: 'ant-design-charts',
        },
        url: 'https://github.com/ant-design/ant-design-charts',
      },
    ],
    docs: [
      // manual
      {
        slug: 'manual/introduction',
        title: {
          zh: '简介',
          en: 'Introduction',
        },
        order: 1,
      },
      {
        slug: 'manual/core',
        title: {
          zh: '核心概念',
          en: 'Core Concepts',
        },
        order: 2,
      },
      {
        slug: 'manual/extra-topics',
        title: {
          zh: '进阶主题',
          en: 'Extra Topics',
        },
        order: 3,
      },
      // docs
      {
        slug: 'spec/data',
        title: {
          zh: '数据 - Data',
          en: 'Data',
        },
        order: 3,
      },
      {
        slug: 'spec/mark',
        title: {
          zh: '图形 - Mark',
          en: 'Mark',
        },
        order: 4,
      },
      {
        slug: 'spec/transform',
        title: {
          zh: '变换 - Transform',
          en: 'Transform',
        },
        order: 5,
      },
      {
        slug: 'spec/scale',
        title: {
          zh: '比例尺 - Scale',
          en: 'Scale',
        },
        order: 6,
      },
      {
        slug: 'spec/coordinate',
        title: {
          zh: '坐标系 - Coordinate',
          en: 'Coordinate',
        },
        order: 7,
      },
      {
        slug: 'spec/composition',
        title: {
          zh: '复合 - Composition',
          en: 'Composition',
        },
        order: 8,
      },
      {
        slug: 'spec/component',
        title: {
          zh: '组件 - Component',
          en: 'Component',
        },
        order: 9,
      },
      {
        slug: 'spec/label',
        title: {
          zh: '数据标签 - Label',
          en: 'Label',
        },
        order: 10,
      },

      {
        slug: 'spec/animation',
        title: {
          zh: '动画 - Animation',
          en: 'Animation',
        },
        order: 11,
      },
      {
        slug: 'spec/interaction',
        title: {
          zh: '交互 - Interaction',
          en: 'Interaction',
        },
        order: 12,
      },
      {
        slug: 'spec/graph',
        title: {
          zh: '关系图 - Graph',
          en: 'Graph',
        },
        order: 13,
      },
      {
        slug: 'spec/geo',
        title: {
          zh: '地图 - Geo',
          en: 'Geo',
        },
        order: 14,
      },
      {
        slug: 'spec/threed',
        title: {
          zh: '3D 图表 - 3D Charts',
          en: '3D',
        },
        order: 15,
      },
      {
        slug: 'spec/theme',
        title: {
          zh: '主题 - Theme',
          en: 'Theme',
        },
        order: 16,
      },
      {
        slug: 'spec/plugin',
        title: {
          zh: '插件扩展 - Plugin',
          en: 'Plugin',
        },
        order: 17,
      },
    ],
    examples: [
      {
        slug: 'general',
        title: {
          zh: '基础图表',
          en: 'General',
        },
        icon: 'other',
      },
      {
        slug: 'analysis',
        title: {
          zh: '数据分析',
          en: 'Analysis',
        },
        icon: 'other',
      },
      {
        slug: 'graph',
        title: {
          zh: '关系图',
          en: 'Graph',
        },
        icon: 'other',
      },
      {
        slug: 'geo',
        title: {
          zh: '地理',
          en: 'Geo',
        },
        icon: 'other',
      },
      {
        slug: 'annotation',
        title: {
          zh: '数据标注',
          en: 'Annotation',
        },
        icon: 'other',
      },
      {
        slug: 'composition',
        title: {
          zh: '复合视图',
          en: 'Composition',
        },
        icon: 'other',
      },
      {
        slug: 'component',
        title: {
          zh: '组件',
          en: 'Component',
        },
        icon: 'other',
      },
      {
        slug: 'animation',
        title: {
          zh: '动画',
          en: 'Animation',
        },
        icon: 'other',
      },
      {
        slug: 'interaction',
        title: {
          zh: '交互',
          en: 'Interaction',
        },
        icon: 'other',
      },
      {
        slug: 'intelligent',
        title: {
          zh: '智能可视化',
          en: 'Intelligent',
        },
        icon: 'other',
      },
      {
        slug: 'storytelling',
        title: {
          zh: '可视化叙事',
          en: 'Stroytelling',
        },
        icon: 'other',
      },
      {
        slug: 'algorithm',
        title: {
          zh: '算法可视化',
          en: 'Algorithm Vis',
        },
        icon: 'other',
      },
      {
        slug: 'unit',
        title: {
          zh: '单元可视化',
          en: 'Unit',
        },
        icon: 'other',
      },
      {
        slug: 'threed',
        title: {
          zh: '3D 可视化',
          en: '3D Charts',
        },
        icon: 'other',
      },
      {
        slug: 'interesting',
        title: {
          zh: '趣味可视化',
          en: 'Interesting',
        },
        icon: 'other',
      },
      {
        slug: 'style',
        title: {
          zh: '风格',
          en: 'Style',
        },
        icon: 'other',
      },
      {
        slug: 'renderer',
        title: {
          zh: '渲染器',
          en: 'Renderer',
        },
        icon: 'other',
      },
      {
        slug: 'accessible',
        title: {
          zh: '无障碍',
          en: 'Accessible',
        },
        icon: 'other',
      },
    ],
    playground: {
      devDependencies: {
        typescript: 'latest',
      },
      htmlCodeTemplate: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset='UTF-8'>
            <title>{{title}}</title>
          </head>
          <body>
            <div id='container' />
            <script src='https://gw.alipayobjects.com/os/lib/antv/g2/${version}/dist/g2.min.js'></script>
            <script src='https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.11.1/dist/data-set.js'></script>
            <script>
            <!-- 浏览器引入，请使用全局命名空间 G2，如 new Chart() 改为 new G2.Chart，即可运行。 -->
            {{code}}
            </script>
          </body>
        </html>`,
    },
    announcement: {
      zh: '',
      en: '',
    },
    /** 首页技术栈介绍 */
    detail: {
      engine: {
        zh: 'G2',
        en: 'G2',
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
      imageStyle: {
        marginLeft: '80px',
        marginTop: '30px',
        transform: 'scale(1.4)',
      },
      buttons: [
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/manual/introduction/getting-started`,
        },
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples/`,
          type: 'primary',
        },
      ],
    },
    /** 新闻公告，优先选择配置的，如果没有配置则使用远程的！ */
    /** 首页特性介绍 */
    features: [
      {
        icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*4x_KTKyqwJgAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '千变万化，自由组合',
          en: 'The ever-changing, free combination',
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
          en: 'Professional complete',
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
          en: 'owerful interactive syntax to help visual analysis and make charts come alive',
        },
      },
    ],
    /** 首页案例 */
    cases: [
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*-dLnTIexOxwAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '精品 Gallery',
          en: 'Boutique Gallery',
        },
        description: {
          zh: '真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，让用户达到开箱即用的效果。',
          en: 'Real data visualization cases, we summarize them into story-based design templates, allowing users to achieve out-of-the-box effects.',
        },
        link: `/examples`,
        image:
          'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*hDrgRb7ma4EAAAAAAAAAAABkARQnAQ',
      },
    ],
    /** 首页合作公司 */
    companies: [
      {
        name: '阿里云',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*V_xMRIvw2iwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '支付宝',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*lYDrRZvcvD4AAAAAAAAAAABkARQnAQ',
      },
      {
        name: '天猫',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BQrxRK6oemMAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '淘宝网',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1l8-TqUr7UcAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '网上银行',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZAKFQJ5Bz4MAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '京东',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*yh-HRr3hCpgAAAAAAAAAAABkARQnAQ',
      },
      {
        name: 'yunos',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_js7SaNosUwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '菜鸟',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TgV-RZDODJIAAAAAAAAAAABkARQnAQ',
      },
    ],
  },
  mfsu: false,
  analytics: {
    // google analytics 的 key (GA 4)
    // ga_v2: 'G-abcdefg',
    // 若你在使用 GA v1 旧版本，请使用 `ga` 来配置
    ga_v2: 'G-3L8SSDC4X6',
    // 百度统计的 key
    // baidu: 'baidu_tongji_key',
  },
  links: [],
  scripts: [],
  styles: ['https://fonts.googleapis.com/css?family=Gaegu'],
  alias: {
    '@antv/g2': require.resolve('../src/index.ts'),
    // '@antv/g2': (window as any).g2,
  },
});
