const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-5`,
        pathPrefix: '/g2',
      },
    },
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
          en: 'docs',
        },
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
      },
    ],
    docs: [],
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '官方精品库',
          en: 'Gallery',
        },
      },
    ],
  },
};
