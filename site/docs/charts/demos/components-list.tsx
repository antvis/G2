/**
 * inline: true
 */
import * as React from 'react';
import { useFullSidebarData, useLocale } from 'dumi';
import { Tag, Divider, Flex, Row, Col } from 'antd';
import { styled } from 'styled-components';
import { GRAPH_USAGES, LANGUAGE_MAP } from './constants';
import ChartCard from './chart-card';
const GRAPH_USAGES_MAP = new Map(GRAPH_USAGES.map((g) => [g.id, g]));
const StyledWrapper = styled.div`
  .filter-panel {
    margin: 24px 0 32px;

    .filter-tag {
      border-radius: 4px;
    }
  }
`;

const MemoChartCard = React.memo(ChartCard);
export default () => {
  const { id: lang } = useLocale();
  const data = useFullSidebarData();
  const [selectedUsages, setSelectedUsages] = React.useState<string[]>(['all']);
  const metaList = React.useMemo(() => {
    const path = lang === LANGUAGE_MAP.ZH ? '/charts' : `/${lang}/charts`;
    return Array.isArray(data?.[path]?.[0]?.children)
      ? data[path][0].children
      : [];
  }, [data, lang]);
  const handleChange = (tag: string, checked: boolean) => {
    let nextSelectedUsages: string[];
    if (tag === 'all') {
      nextSelectedUsages = checked ? ['all'] : [];
    } else {
      nextSelectedUsages = checked
        ? [...selectedUsages.filter((t) => t !== 'all'), tag]
        : selectedUsages.filter((t) => t !== tag);
      if (nextSelectedUsages.length === 0) {
        nextSelectedUsages = ['all'];
      }
    }
    setSelectedUsages(nextSelectedUsages);
  };
  const usageSet = new Set(selectedUsages);
  const hasAllFlag = usageSet.has('all');
  const chartList = React.useMemo(
    () =>
      metaList
        .filter(({ frontmatter }) => {
          const categories = frontmatter?.category ?? [];
          return (
            categories.length > 0 &&
            (hasAllFlag || categories.some((c) => usageSet.has(c)))
          );
        })
        .map((meta) => {
          const { frontmatter = {}, link = '', title: metaTitle } = meta;
          const { title: fmTitle, screenshot, category = [] } = frontmatter;
          const categoryList = category
            .map((tagId) => GRAPH_USAGES_MAP.get(tagId))
            .filter(Boolean)
            .map((item) =>
              lang === LANGUAGE_MAP.ZH ? item.nameZh : item.nameEn,
            );
          return (
            <Col span={6} key={link}>
              <MemoChartCard
                title={metaTitle || fmTitle || ''}
                screenshot={screenshot}
                link={link}
                categoryList={categoryList}
              />
            </Col>
          );
        }),
    [metaList, hasAllFlag, usageSet, lang],
  );
  return (
    <StyledWrapper>
      <div className="filter-panel">
        <Divider />
        <Flex gap={6} wrap align="center">
          {GRAPH_USAGES.map(({ id, nameZh, nameEn }) => (
            <Tag.CheckableTag
              className="filter-tag"
              key={id}
              checked={selectedUsages.includes(id)}
              onChange={(checked) => handleChange(id, checked)}
            >
              {lang === LANGUAGE_MAP.ZH ? nameZh : nameEn}
            </Tag.CheckableTag>
          ))}
        </Flex>
      </div>
      <Row gutter={[24, 24]}>{chartList}</Row>
    </StyledWrapper>
  );
};
