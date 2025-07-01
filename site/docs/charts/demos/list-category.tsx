/**
 * inline: true
 */
import * as React from 'react';
import { useRouteMeta, useLocale, useNavigate } from 'dumi';
import { Flex, Card } from 'antd';
import { styled } from 'styled-components';
import { GRAPH_USAGES, LANGUAGE_MAP } from './constants';

const GRAPH_USAGES_MAP = new Map(GRAPH_USAGES.map((g) => [g.id, g]));

const StyledCard = styled(Card)`
  width: 200px;
  cursor: pointer;

  .card-content {
    text-align: center;
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .category-icon {
      font-size: 24px;
      color: #1890ff;
    }

    .category-name {
      font-size: 14px;
      font-weight: 500;
    }
  }

  &:hover {
    .card-content {
      .category-icon {
        color: #40a9ff;
        transform: scale(1.1);
        transition: all 0.2s ease;
      }
    }
  }
`;

export default () => {
  const { id: lang } = useLocale();
  const { frontmatter: { category = [] } = {} } = useRouteMeta();
  const navigate = useNavigate();

  const categoryList = category
    .map((tagId) => GRAPH_USAGES_MAP.get(tagId))
    .filter(Boolean);

  const handleCategoryClick = (categoryId: string) => {
    // 构建跳转路径，使用dumi的路由结构
    const basePath =
      lang === LANGUAGE_MAP.ZH
        ? '/charts/overview'
        : `/${lang}/charts/overview`;
    const targetPath = `${basePath}?category=${categoryId}`;

    // 使用dumi的navigate进行跳转
    navigate(targetPath);
  };

  return (
    <Flex wrap gap={16} className="usage-items">
      {categoryList.map((item, index) => {
        const IconComponent = item.icon;
        const categoryName =
          lang === LANGUAGE_MAP.ZH ? item.nameZh : item.nameEn;

        return (
          <StyledCard
            key={index}
            hoverable
            onClick={() => handleCategoryClick(item.id)}
          >
            <div className="card-content">
              <IconComponent className="category-icon" />
              <div className="category-name">{categoryName}</div>
            </div>
          </StyledCard>
        );
      })}
    </Flex>
  );
};
