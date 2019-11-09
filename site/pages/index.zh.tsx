import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';
import BannerSVG from '@antv/gatsby-theme-antv/site/components/BannerSVG';
import alipay from '../images/alipay.png';
import aliyun from '../images/aliyun.png';
import cainiao from '../images/cainiao.png';
import gi from '../images/gi.png';
import mybank from '../images/mybank.png';
import taobao from '../images/taobao.png';
import tmall from '../images/tmall.png';
import yunos from '../images/yunos.png';
import jd from '../images/jd.png';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  const coverImage = BannerSVG();

  const features = [
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
      title: t('千变万化，自由组合'),
      description: t(
        '从数据出发，仅需几行代码就可以轻松获得想要的图表展示效果',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
      title: t('生动、易实现'),
      description: t(
        '大量产品实践之上，提供绘图引擎、完备图形语法、专业设计规范',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
      title: t('强大的交互语法'),
      description: t(
        '任何图表，都可以基于图形语法灵活绘制，满足你无限的创意',
      ),
    },
  ];

  const companies = [
    {
      name: '阿里云',
      img: aliyun
    },
    {
      name: '支付宝',
      img: alipay,
    },
    {
      name: '天猫',
      img: tmall,
    },
    {
      name: '淘宝网',
      img: taobao,
    },
    {
      name: '网上银行',
      img: mybank,
    },
    {
      name: '京东',
      img: jd,
    },
    {
      name: 'yunos',
      img: yunos,
    },
    {
      name: '菜鸟',
      img: cainiao,
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
      logo:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*2Ij9T76DyCcAAAAAAAAAAABkARQnAQ',
      title: t('精品 Gallery'),
      description:
        '真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，然用户达到开箱即用的效果。',
      link: 'examples/gallery/line',
      image:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*oCd7Sq3N-QEAAAAAAAAAAABkARQnAQ',
    },
  ];

  return (
    <>
      <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
      <Banner
        coverImage={coverImage}
        title={t('G2 可视化图形语法')}
        description={t(
          'G2 是一套基于可视化编码的图形语法，以数据驱动，具有高度的易用性和扩展性，用户无需关注各种繁琐的实现细节，一条语句即可构建出各种各样的可交互的统计图表。',
        )}
        buttonText={t('继续了解')}
        buttonHref={'/zh/docs/manual/getting-started'}
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
