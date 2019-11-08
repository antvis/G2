const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-5`,
        pathPrefix: '/g2'
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'G2',
    description: 'The Grammar of Graphics in JavaScript',
    githubUrl: repository.url,
    navs: [
      {
        slug: 'docs/manual',
        title: {
          zh: '使用文档',
          en: 'docs'
        }
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples'
        }
      }
    ],
    docs: [
      {
        slug: 'manual/tutorial',
        title: {
          zh: '使用教程',
          en: 'tutorial'
        },
        order: 1
      }, {
        slug: 'manual/advanced',
        title: {
          zh: '高级教程',
          en: 'advanced'
        },
        order: 2
      }, {
        slug: 'manual/api',
        title: {
          zh: 'API 文档',
          en: 'API'
        },
        order: 3
      }, {
        slug: 'manual/faq',
        title: {
          zh: 'G2 常见问题',
          en: 'FAQ'
        },
        order: 4
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
          en: 'Line Charts'
        }
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱状图',
          en: 'Column Charts'
        }
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar Charts'
        }
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie Charts'
        }
      },
      {
        slug: 'point',
        icon: 'point',
        title: {
          zh: '点图',
          en: 'Point Charts'
        }
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area Charts'
        }
      },
      {
        slug: 'box',
        icon: 'box',
        title: {
          zh: '箱型图',
          en: 'Box Charts'
        }
      },
      {
        slug: 'candlestick',
        icon: 'candlestick',
        title: {
          zh: '烛形图',
          en: 'K Charts'
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
          en: 'Funnel Charts'
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
          en: 'Radar Charts'
        }
      }
    ]
  }
};
