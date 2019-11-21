const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-5`
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'G2',
    description: 'The Grammar of Graphics in JavaScript',
    siteUrl: 'https://g2.antv.vision',
    githubUrl: repository.url,
    navs: [
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples'
        },
        order: 0
      },
      {
        slug: 'docs/manual',
        title: {
          zh: '使用文档',
          en: 'Tutorials'
        },
        order: 1
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API 文档',
          en: 'API'
        },
        order: 2
      }
    ],
    docs: [
      {
        slug: 'manual/getting-started',
        title: {
          zh: '快速开始',
          en: 'Getting Started'
        },
        order: 0
      },
      {
        slug: 'manual/tutorial',
        title: {
          zh: '使用教程',
          en: 'Tutorial'
        },
        order: 1
      }, {
        slug: 'manual/advanced',
        title: {
          zh: '高级教程',
          en: 'Advanced'
        },
        order: 2
      }, {
        slug: 'manual/faq',
        title: {
          zh: 'G2 常见问题',
          en: 'FAQ'
        },
        order: 3
      }
    ],
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '官方精品库',
          en: 'Gallery'
        }
      },
      {
        slug: 'line',
        icon: 'line', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '折线图',
          en: 'Line Chart'
        }
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱状图',
          en: 'Column Chart'
        }
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar Chart'
        }
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie Chart'
        }
      },
      {
        slug: 'point',
        icon: 'point',
        title: {
          zh: '点图',
          en: 'Point Chart'
        }
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area Chart'
        }
      },
      {
        slug: 'box',
        icon: 'box',
        title: {
          zh: '箱型图',
          en: 'Box Chart'
        }
      },
      {
        slug: 'candlestick',
        icon: 'candlestick',
        title: {
          zh: '烛形图',
          en: 'K Chart'
        }
      },
      {
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heatmap'
        }
      },
      {
        slug: 'gauge',
        icon: 'gauge',
        title: {
          zh: '仪表盘',
          en: 'Gauges'
        }
      },
      {
        slug: 'funnel',
        icon: 'funnel',
        title: {
          zh: '漏斗图',
          en: 'Funnel Chart'
        }
      },
      {
        slug: 'map',
        icon: 'map',
        title: {
          zh: '地图',
          en: 'Maps'
        }
      },
      {
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'Radar Chart'
        }
      },
      {
        slug: 'facet',
        icon: 'facet',
        title: {
          zh: '分面',
          en: 'Facets'
        }
      },
      {
        slug: 'relation',
        icon: 'relation',
        title: {
          zh: '关系图',
          en: 'Relation Chart'
        }
      },
      {
        slug: 'other',
        icon: 'other',
        title: {
          zh: '其他图表',
          en: 'Other Chart'
        }
      },
      {
        slug: 'component',
        icon: 'component',
        title: {
          zh: '组件使用',
          en: 'Chart Components'
        }
      }
    ]
  }
};
