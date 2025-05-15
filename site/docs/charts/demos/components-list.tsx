/**
 * inline: true
 */
import * as React from 'react';
import { useFullSidebarData, useLocale, useNavigate } from 'dumi';
import { Tag, Divider, Flex, Row, Card, Col } from 'antd';
import { styled } from 'styled-components';
import { GRAPH_USAGES, mockSnapshot, mockCategory } from './constants';

const StyledWrapper = styled.div`
  .filter-panel {
    margin: 24px 0 32px;

    .filter-tag {
      border-radius: 4px;
    }
  }

  .usage-items {
    margin-top: 2px;

    .usage-item {
      border-radius: 12px;
      padding: 0px 12px;
      font-size: 10px;
      border: 1px solid #f0f0f0;
    }
  }
`;

export default () => {
  const lang = useLocale().id;
  const data = useFullSidebarData();
  const navigate = useNavigate();

  const list = data?.['/api']?.[0]?.children;
  const metaList = Array.isArray(list) ? list : [];

  const [selectedUsages, setSelectedUsages] = React.useState<string[]>(['all']);

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

  return (
    <StyledWrapper>
      <div className="filter-panel">
        <Divider />
        <Flex gap={6} wrap align="center">
          {GRAPH_USAGES.map<React.ReactNode>(({ id, nameZh, nameEn }) => (
            <Tag.CheckableTag
              className="filter-tag"
              key={id}
              checked={selectedUsages.includes(id)}
              onChange={(checked) => handleChange(id, checked)}
            >
              {lang === 'zh' ? nameZh : nameEn}
            </Tag.CheckableTag>
          ))}
        </Flex>
      </div>

      <Row gutter={[24, 24]}>
        {metaList

          .map((meta = {}, index) => {
            const link = meta.link || '';
            const title = meta.title || meta.frontmatter?.title;
            const desc = meta.frontmatter?.description;
            const snapshot = meta.frontmatter?.snapshot || mockSnapshot[index];

            const tags = (mockCategory[index] || []).map((tagId) =>
              GRAPH_USAGES.find((g) => g.id === tagId),
            );

            return (
              <Col span={6} key={index}>
                <Card
                  size="small"
                  onClick={() => navigate(link)}
                  hoverable
                  title={title}
                  style={{ borderRadius: 8 }}
                >
                  <Flex justify="center" align="center">
                    <img alt={title} src={snapshot} height={158} />
                  </Flex>

                  <Flex wrap gap={2} className="usage-items">
                    {tags.map((usage, index) => (
                      <div className="usage-item" key={index}>
                        {lang === 'zh' ? usage.nameZh : usage.nameEn}
                      </div>
                    ))}
                  </Flex>
                </Card>
              </Col>
            );
          })
          .filter((_, index) => {
            const tags = mockCategory[index] || [];
            return (
              tags.some((tag) => selectedUsages.includes(tag)) ||
              selectedUsages.includes('all')
            );
          })}
      </Row>
    </StyledWrapper>
  );
};
