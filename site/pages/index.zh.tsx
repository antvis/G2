import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';

const IndexPage = () => {
  const { t, i18n } = useTranslation();
  const features = [
    {
      icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*lOy9RohQHK4AAAAAAAAAAABkARQnAQ',
      title: t('千变万化，自由组合'),
      description: t(
        '任何图表，都可以基于图形语法灵活绘制，满足你无限的创意',
      ),
    },
    {
      icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*D_CMQ7GPtdwAAAAAAAAAAABkARQnAQ',
      title: t('专业完备'),
      description: t(
        '大量产品实践之上，提供绘图引擎、完备图形语法、专业设计规范',
      ),
    },
    {
      icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*0VmfQ4KVAlEAAAAAAAAAAABkARQnAQ',
      title: t('生动，可交互'),
      description: t(
        '强大的交互语法，助力可视分析，让图表栩栩如生',
      ),
    },
  ];
  const companies = [
    { name: '阿里云', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*V_xMRIvw2iwAAAAAAAAAAABkARQnAQ' },
    { name: '支付宝', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*lYDrRZvcvD4AAAAAAAAAAABkARQnAQ', },
    { name: '天猫', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BQrxRK6oemMAAAAAAAAAAABkARQnAQ', },
    { name: '淘宝网', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1l8-TqUr7UcAAAAAAAAAAABkARQnAQ', },
    { name: '网上银行', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZAKFQJ5Bz4MAAAAAAAAAAABkARQnAQ', },
    { name: '京东', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*yh-HRr3hCpgAAAAAAAAAAABkARQnAQ', },
    { name: 'yunos', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_js7SaNosUwAAAAAAAAAAABkARQnAQ', },
    { name: '菜鸟', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TgV-RZDODJIAAAAAAAAAAABkARQnAQ', },
  ];
  const bannerButtons = [
    {
      text: t('图表示例'),
      link: '/zh/examples/gallery/line',
      type: 'primary',
    },
    {
      text: t('下载使用'),
      link: '/zh/docs/manual/getting-started',
    },
  ];
  const notifications = [
    {
      type: t('测试'),
      title: t('G6 3.2 全新上线！'),
      date: '2019.12.04',
      link: '#',
    },
  ];

  const cases = [
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*-dLnTIexOxwAAAAAAAAAAABkARQnAQ',
      title: t('精品 Gallery'),
      description: t('真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，让用户达到开箱即用的效果。'),
      link: 'examples/gallery/line',
      image: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*MYNsTKSKIVIAAAAAAAAAAABkARQnAQ',
    },
  ];

  return (
    <>
      <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
      <Banner
        coverImage={
          <img width="100%" class="Notification-module--number--31-3Z" style={{ marginLeft: '125px', marginTop: '50px' }}
            src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*hT73QqjgYPcAAAAAAAAAAABkARQnAQ" />}
        title={t('G2 可视化图形语法')}
        description={t(
          'G2 是一套基于可视化编码的图形语法，以数据驱动，具有高度的易用性和扩展性，用户无需关注各种繁琐的实现细节，一条语句即可构建出各种各样的可交互的统计图表。',
        )}
        buttons={bannerButtons}
        notifications={notifications}
        className='banner'
      />
      <Features
        features={features}
        style={{ width: '100%' }}
      />
      <Cases cases={cases} />
      <Companies
        title={t('合作公司')}
        companies={companies}
      />
    </>
  );
};

export default IndexPage;
