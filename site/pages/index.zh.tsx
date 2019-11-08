import React from 'react';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import astronaut from '../images/gatsby-astronaut.png';

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title="蚂蚁数据可视化" lang="zh" />
      <div style={{ margin: '0 auto', padding: '0 60px' }}>
        {t('首页')}
        <img src={astronaut} alt="astronaut" height="200" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </>
  );
};

export default IndexPage;
