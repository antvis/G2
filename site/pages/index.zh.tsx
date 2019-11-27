import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { Skeleton } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title="蚂蚁数据可视化" lang="zh" />
      <div style={{ margin: '0 auto', padding: '0 60px' }}>
        {t('首页')}
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </>
  );
};

export default IndexPage;
