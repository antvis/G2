/**
 * inline: true
 */
import * as React from 'react';
import { Row, Col } from 'antd';
import { useLocale, useRouteMeta, useFullSidebarData } from 'dumi';
import { GRAPH_USAGES, LANGUAGE_MAP } from './constants';
import ChartCard from './chart-card';
const GRAPH_USAGES_MAP = new Map(GRAPH_USAGES.map((g) => [g.id, g]));
const MemoChartCard = React.memo(ChartCard);
export default () => {
  const { id: lang } = useLocale();
  const data = useFullSidebarData();
  const { frontmatter: { similar = [] } = {} } = useRouteMeta();
  const metaList = React.useMemo(
    () =>
      data?.[lang === LANGUAGE_MAP.ZH ? '/charts' : `/${lang}/charts`]?.[0]
        ?.children || [],
    [data, lang],
  );
  const filterList = React.useMemo(
    () =>
      metaList.filter((item) => {
        const linkName = item?.link?.match(/[^/]+$/)?.[0];
        return similar.includes(linkName);
      }),
    [metaList, similar],
  );
  return (
    <Row gutter={[24, 24]}>
      {filterList.map((meta) => {
        const {
          frontmatter: {
            category = [],
            screenshot,
            title: frontmatterTitle,
          } = {},
          link = '',
          title: metaTitle,
        } = meta;
        const categoryList = category
          .map((tagId) => GRAPH_USAGES_MAP.get(tagId))
          .filter(Boolean)
          .map((item) =>
            lang === LANGUAGE_MAP.ZH ? item.nameZh : item.nameEn,
          );
        return (
          <Col span={8} key={link}>
            <MemoChartCard
              title={metaTitle || frontmatterTitle || ''}
              screenshot={screenshot}
              link={link}
              categoryList={categoryList}
            />
          </Col>
        );
      })}
    </Row>
  );
};
