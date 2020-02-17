const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-5`,
      },
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'G2',
    description: 'The Grammar of Graphics in JavaScript',
    siteUrl: 'https://g2.antv.vision',
    githubUrl: repository.url,
    versions: {
      '4.x': 'https://g2.antv.vision/',
      '3.x': 'https://g2-v3.antv.vision/',
      '2.x': 'https://antv.vision/old-site/g2/doc/index.html',
    },
    navs: [
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
      {
        slug: 'docs/tutorial',
        title: {
          zh: '教程',
          en: 'Tutorials',
        },
        order: 1,
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API 文档',
          en: 'API',
        },
        order: 2,
      },
    ],
    docs: [
      {
        slug: 'api/index',
        title: {
          zh: 'Index',
          en: 'Index',
        },
        order: 0,
      },
      {
        slug: 'api/classes',
        title: {
          zh: 'Classes',
          en: 'Classes',
        },
        order: 1,
      },
      {
        slug: 'api/enums',
        title: {
          zh: 'Enums',
          en: 'Enums',
        },
        order: 2,
      },
      {
        slug: 'api/interfaces',
        title: {
          zh: 'Interfaces',
          en: 'Interfaces',
        },
        order: 3,
      },
      {
        slug: 'api/modules',
        title: {
          zh: 'Modules',
          en: 'Modules',
        },
        order: 4,
      },
    ],
    examples: [
      {
        slug: 'interaction',
        icon: 'interaction',
        title: {
          zh: '交互语法',
          en: 'Interaction Grammar',
        },
      },
      {
        slug: 'line',
        icon: 'line',
        title: {
          zh: '折线图',
          en: 'Line Chart',
        },
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱状图',
          en: 'Column Chart',
        },
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar Chart',
        },
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie Chart',
        },
      },
      {
        slug: 'point',
        icon: 'point',
        title: {
          zh: '点图',
          en: 'Point Chart',
        },
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area Chart',
        },
      },
      {
        slug: 'box',
        icon: 'box',
        title: {
          zh: '箱型图',
          en: 'Box Chart',
        },
      },
      {
        slug: 'candlestick',
        icon: 'candlestick',
        title: {
          zh: '烛形图',
          en: 'K Chart',
        },
      },
      {
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heatmap',
        },
      },
      {
        slug: 'gauge',
        icon: 'gauge',
        title: {
          zh: '仪表盘',
          en: 'Gauges',
        },
      },
      {
        slug: 'funnel',
        icon: 'funnel',
        title: {
          zh: '漏斗图',
          en: 'Funnel Chart',
        },
      },
      {
        slug: 'map',
        icon: 'map',
        title: {
          zh: '地图',
          en: 'Maps',
        },
      },
      {
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'Radar Chart',
        },
      },
      {
        slug: 'facet',
        icon: 'facet',
        title: {
          zh: '分面',
          en: 'Facets',
        },
      },
      {
        slug: 'relation',
        icon: 'relation',
        title: {
          zh: '关系图',
          en: 'Relation Chart',
        },
      },
      {
        slug: 'other',
        icon: 'other',
        title: {
          zh: '其他图表',
          en: 'Other Chart',
        },
      },
      {
        slug: 'annotation',
        icon: 'annotation',
        title: {
          zh: '辅助元素',
          en: 'Chart Annotation',
        },
      },
      {
        slug: 'component',
        icon: 'component',
        title: {
          zh: '组件使用',
          en: 'Chart Components',
        },
      },
      {
        slug: 'gallery',
        icon: 'gallery',
        title: {
          zh: '官方精品库',
          en: 'Featured',
        },
      },
    ],
    docsearchOptions: {
      apiKey: '200ec461f4aa0bb4f0e761566f1a1336',
      indexName: 'antv_g2',
    },
    playground: {
      htmlCodeTemplate: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>{{title}}</title>
          </head>
          <body>
            <div id="container" />
            <!-- todo: url 更新 4.0.0 -->
            <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.5.11/dist/g2.min.js"></script>
            <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.10.2/dist/data-set.min.js"></script>
            <script>
        {{code}}
            </script>
          </body>
        </html>`,
    },
  },
};
