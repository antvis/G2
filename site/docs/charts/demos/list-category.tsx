/**
 * inline: true
 */
import * as React from 'react';
import { useRouteMeta, useLocale } from 'dumi';
import { Flex, Card } from 'antd';
import { styled } from 'styled-components';
import { GRAPH_USAGES, LANGUAGE_MAP } from './constants';

const GRAPH_USAGES_MAP = new Map(GRAPH_USAGES.map((g) => [g.id, g]));

const StyledCard = styled(Card)`
  width: 200px;
  div {
    text-align: center;
    color: #666;
  }
`;

export default () => {
  const { id: lang } = useLocale();
  const { frontmatter: { category = [] } = {} } = useRouteMeta();

  const categoryList = category
    .map((tagId) => GRAPH_USAGES_MAP.get(tagId))
    .filter(Boolean)
    .map((item) => (lang === LANGUAGE_MAP.ZH ? item.nameZh : item.nameEn));
  return (
    <Flex wrap gap={2} className="usage-items">
      {categoryList.map((category, index) => (
        <StyledCard key={index} hoverable>
          <div>{category}</div>
        </StyledCard>
      ))}
    </Flex>
  );
};
