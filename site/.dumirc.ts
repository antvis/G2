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
    siteUrl: 'https://g2.antv.antgroup.com/', // 官网地址
    githubUrl: repository.url, // GitHub 地址
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: true, // 是否显示 GitHub star 数量
    showAntVProductsCard: true, // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: true, // 是否在 demo 页展示API文档
    versions: {
      // 历史版本以及切换下拉菜单
      [version]: 'https://g2.antv.vision/',
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
          zh: '教程',
          en: 'Tutorials',
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
    ],
    ecosystems: [
      // 头部的菜单中的「周边生态」
      {
        name: {
          zh: 'G2Plot',
          en: 'G2Plot (A charting library)',
        },
        url: 'https://g2plot.antv.antgroup.com/',
      },
    ],
    docs: [
      // manual
      {
        slug: 'manual/single-view',
        title: {
          zh: '基础',
          en: 'General',
        },
        order: 3,
      },
      // api
      {
        slug: 'api/data',
        title: {
          zh: 'Data',
          en: '数据',
        },
        order: 3,
      },
      {
        slug: 'api/mark',
        title: {
          zh: 'Mark',
          en: 'Mark',
        },
        order: 4,
      },
      {
        slug: 'api/transform',
        title: {
          zh: 'Transform',
          en: 'Transform',
        },
        order: 5,
      },
      {
        slug: 'api/scale',
        title: {
          zh: 'Scale',
          en: '比例尺',
        },
        order: 6,
      },
      {
        slug: 'api/coordinate',
        title: {
          zh: 'Coordinate',
          en: '坐标系',
        },
        order: 7,
      },
      {
        slug: 'api/composition',
        title: {
          zh: 'Composition',
          en: 'Composition',
        },
        order: 8,
      },
      {
        slug: 'api/component',
        title: {
          zh: 'Component',
          en: '组件',
        },
        order: 9,
      },
      {
        slug: 'api/label',
        title: {
          zh: 'Label',
          en: '数据标签',
        },
        order: 10,
      },

      {
        slug: 'api/animation',
        title: {
          zh: 'Animation',
          en: '动画',
        },
        order: 11,
      },
      {
        slug: 'api/interaction',
        title: {
          zh: 'Interaction',
          en: '交互',
        },
        order: 12,
      },
      {
        slug: 'api/graph',
        title: {
          zh: 'Graph',
          en: '图',
        },
        order: 13,
      },
      {
        slug: 'api/geo',
        title: {
          zh: 'Geo',
          en: '地图',
        },
        order: 14,
      },
      {
        slug: 'api/theme',
        title: {
          zh: 'Theme',
          en: '主题',
        },
        order: 15,
      },
      {
        slug: 'api/plugin',
        title: {
          zh: 'Plugin',
          en: '扩展插件',
        },
        order: 15,
      },
    ],
    examples: [
      {
        slug: 'general',
        title: {
          zh: '基础',
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
        slug: 'annotation',
        title: {
          zh: '数据标注',
          en: 'Annotation',
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
        slug: 'graph',
        title: {
          zh: '图',
          en: 'Graph',
        },
        icon: 'other',
      },
      {
        slug: 'geo',
        title: {
          zh: '地图',
          en: 'Geo',
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
        slug: 'unit',
        title: {
          zh: '单元可视化',
          en: 'Unit',
        },
        icon: 'other',
      },
      // {
      //   slug: 'component',
      //   title: {
      //     zh: '组件',
      //     en: 'Component',
      //   },
      //   icon: 'other',
      // },
      {
        slug: 'Theme',
        title: {
          zh: '主题',
          en: 'Theme',
        },
        icon: 'other',
      },
      {
        slug: 'plugin',
        title: {
          zh: '插件',
          en: 'Plugin',
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
      title: {
        zh: 'G2，可视化语法',
        en: 'G2, a Visualization Grammar',
      },
      description: {
        zh: 'G2 一套面向常规统计图表，以数据驱动的高交互可视化图形语法，具有高度的易用性和扩展性。使用 G2，你可以无需关注图表各种繁琐的实现细节，一条语句即可使用 Canvas 或 SVG 构建出各种各样的可交互的统计图表。',
        en: 'G2 is a highly interactive data-driven visualization grammar for statistical charts. with a high level of usability and scalability. It provides a set of grammars, takes users beyond a limited set of charts to an almost unlimited world of graphical forms. With G2, you can describe the visual appearance and interactive behavior of a visualization just by one statement, and generate web-based views using Canvas or SVG.',
      },
      image:
        'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*wo_LToatmbwAAAAAAAAAAABkARQnAQ',
      buttons: [
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples/`,
          type: 'primary',
        },
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/docs/manual/getting-started`,
        },
      ],
    },
    /** 新闻公告，优先选择配置的，如果没有配置则使用远程的！ */
    news: [
      {
        type: {
          zh: '论坛',
          en: 'Forum',
        },
        title: {
          zh: 'AntV 芒种日 图新物：GraphInsight 发布',
          en: 'AntV Seeds Day Graph New: GraphInsight Released',
        },
        date: '2022.06.06',
        link: 'https://github.com/antvis/GraphInsight',
      },
      {
        type: {
          zh: '论坛',
          en: 'Forum',
        },
        title: {
          zh: 'SEE Conf 2022 支付宝体验科技大会',
          en: 'SEE Conf 2022 Alipay Experience Technology Conference',
        },
        date: '2022.01.08',
        link: 'https://seeconf.antfin.com/',
      },
    ],
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
        link: `/examples/gallery`,
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
  links: [],
  scripts: [],
});
