const { repository, version } = require('./package.json');

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
        slug: 'docs/manual',
        title: {
          zh: '教程文档',
          en: 'Tutorials',
        },
        order: 1,
      },
    ],
    docs: [
      {
        slug: 'manual/tutorial',
        title: {
          zh: '基础教程',
          en: 'Tutorials',
        },
        order: 3,
      },
      {
        slug: 'manual/concepts',
        title: {
          zh: '核心概念',
          en: 'Main Concepts',
        },
        order: 5,
      },
      {
        slug: 'manual/concepts/geometry',
        title: {
          zh: '几何标记与图表类型',
          en: 'Geometry and Charts',
        },
        order: 5,
      },
      {
        slug: 'manual/developer',
        title: {
          zh: '开发者教程',
          en: 'For Developers',
        },
        order: 6,
      },
      {
        slug: 'manual/dataset',
        title: {
          zh: 'DataSet',
          en: 'DataSet',
        },
        order: 7,
      },
      {
        slug: 'api',
        title: {
          zh: 'API 文档',
          en: 'API Doc',
        },
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
        slug: 'gallery',
        icon: 'gallery',
        title: {
          zh: '官方精品库',
          en: 'Featured',
        },
      },
      {
        slug: 'interaction',
        icon: 'interaction',
        title: {
          zh: '交互语法',
          en: 'Grammar of Interaction',
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
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area Chart',
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
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'Radar Chart',
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
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heatmap',
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
        slug: 'gauge',
        icon: 'gauge',
        title: {
          zh: '仪表盘',
          en: 'Gauges',
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
        slug: 'component',
        icon: 'component',
        title: {
          zh: '组件使用',
          en: 'Chart Components',
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
            <script src="https://gw.alipayobjects.com/os/lib/antv/g2/${version}/dist/g2.min.js"></script>
            <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.11.1/dist/data-set.js"></script>
            <script>
            <!-- 浏览器引入，请使用全局命名空间 G2，如 new Chart() 改为 new G2.Chart，即可运行。 -->
            {{code}}
            </script>
          </body>
        </html>`,
    },
  },
};
