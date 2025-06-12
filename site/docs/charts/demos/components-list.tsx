/**
 * inline: true
 */
import * as React from 'react';
import { useFullSidebarData, useLocale, useSiteSearch } from 'dumi';
import { Tag, Flex, Row, Col, AutoComplete } from 'antd';
import { AppstoreOutlined, FilterOutlined } from '@ant-design/icons';
import { styled, createGlobalStyle } from 'styled-components';
import { GRAPH_USAGES, LANGUAGE_MAP } from './constants';
import ChartCard from './chart-card';

const GRAPH_USAGES_MAP = new Map(GRAPH_USAGES.map((g) => [g.id, g]));

// 全局样式：隐藏页面标题
const GlobalStyle = createGlobalStyle`
 .ant-layout-content > div > h1:first-child {
    display: none !important;
  }
`;

const StyledWrapper = styled.div`
  .header-section {
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 25%,
      #8e44ad 50%,
      #9b59b6 75%,
      #e74c3c 100%
    );
    padding: 40px 0;
    margin: -24px -24px 32px -24px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        rgba(156, 39, 176, 0.1) 0%,
        rgba(103, 58, 183, 0.1) 50%,
        rgba(63, 81, 181, 0.1) 100%
      );
      pointer-events: none;
    }

    .search-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 24px;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .header-title {
      color: white;
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .header-subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      margin-bottom: 32px;
      line-height: 1.6;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .search-box {
      .ant-select {
        .ant-select-selector {
          border-radius: 8px !important;
          border: none !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;

          .ant-select-selection-search {
            .ant-select-selection-search-input {
              font-size: 14px !important;
              padding: 0 16px !important;
            }
          }

          .ant-select-selection-placeholder {
            font-size: 14px !important;
            color: #bfbfbf !important;
            padding-left: 16px !important;
          }
        }

        &:hover .ant-select-selector {
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15) !important;
        }

        &.ant-select-focused .ant-select-selector {
          box-shadow: 0 6px 25px rgba(103, 58, 183, 0.3) !important;
        }
      }
    }
  }

  .filter-panel {
    margin-bottom: 24px;
    padding: 20px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 6px;

    .filter-title {
      font-size: 16px;
      font-weight: 500;
      color: #262626;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-tag {
      border-radius: 4px !important;
      padding: 4px 12px !important;
      font-size: 13px !important;
      border: 1px solid #d9d9d9 !important;
      transition: all 0.2s !important;
      background: #fff !important;
      color: #595959 !important;
      margin: 0 8px 8px 0 !important;
      display: inline-flex !important;
      align-items: center !important;

      &:hover {
        border-color: #40a9ff !important;
        color: #1890ff !important;
      }

      &.ant-tag-checkable-checked {
        background: #1890ff !important;
        border-color: #1890ff !important;
        color: white !important;
      }
    }
  }

  .charts-grid {
    .ant-row {
      margin: 0 -12px;
    }

    .ant-col {
      padding: 0 12px;
      margin-bottom: 24px;
    }
  }

  .gallery-stats {
    text-align: center;
    margin-bottom: 20px;
    color: #8c8c8c;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .stats-number {
      font-weight: 600;
      color: #1890ff;
    }
  }
`;

const MemoChartCard = React.memo(ChartCard);

export default () => {
  const { id: lang } = useLocale();
  const data = useFullSidebarData();
  const { keywords, setKeywords, result } = useSiteSearch();
  const [selectedUsages, setSelectedUsages] = React.useState<string[]>(['all']);

  // 解析URL参数，获取category信息
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');

      if (categoryParam && categoryParam !== 'all') {
        // 验证category参数是否有效
        const validCategory = GRAPH_USAGES.find(
          (usage) => usage.id === categoryParam,
        );
        if (validCategory) {
          setSelectedUsages([categoryParam]);
        }
      }
    }
  }, []);

  const metaList = React.useMemo(() => {
    const chartsPath = lang === LANGUAGE_MAP.ZH ? '/charts' : `/${lang}/charts`;
    const todoPath =
      lang === LANGUAGE_MAP.ZH ? '/charts/todo' : `/${lang}/charts/todo`;

    const chartsData = Array.isArray(data?.[chartsPath]?.[0]?.children)
      ? data[chartsPath][0].children
      : [];
    const todoData = Array.isArray(data?.[todoPath]?.[0]?.children)
      ? data[todoPath][0].children
      : [];

    // 将todo数据标记为来自todo文件夹
    const markedTodoData = todoData.map((item) => ({
      ...item,
      _isTodo: true,
    }));

    return [...chartsData, ...markedTodoData];
  }, [data, lang]);

  const searchOptions = React.useMemo(() => {
    if (!result || result.length === 0 || !keywords || keywords.trim() === '') {
      return [];
    }

    const options = [];
    const chartPath = lang === LANGUAGE_MAP.ZH ? '/charts' : `/${lang}/charts`;

    result.forEach((section) => {
      if (section.hints && Array.isArray(section.hints)) {
        section.hints.forEach((hint) => {
          if (
            hint.link &&
            hint.link.startsWith(chartPath) &&
            !hint.link.includes('/todo/') &&
            hint.highlightTitleTexts
          ) {
            // 检查标题中是否有高亮的匹配字符
            const hasHighlight = hint.highlightTitleTexts.some(
              (item) => item.highlighted,
            );

            if (hasHighlight) {
              // 拼接 highlightTitleTexts 中的所有文本
              const titleText = hint.highlightTitleTexts
                .map((item) => item.text)
                .join('');

              // 构建显示用的高亮文本
              const highlightElements = hint.highlightTitleTexts.map(
                (item, index) => (
                  <span
                    key={index}
                    style={{
                      color: item.highlighted ? '#1890ff' : 'inherit',
                    }}
                  >
                    {item.text}
                  </span>
                ),
              );

              options.push({
                value: titleText,
                label: <div>{highlightElements}</div>,
                link: hint.link,
                pageTitle: hint.pageTitle,
              });
            }
          }
        });
      }
    });

    return options;
  }, [result, keywords, lang]);

  const handleSearch = (value: string) => {
    setKeywords(value);
  };

  const handleSelect = (value: string, option: any) => {
    if (option.link) {
      // 在当前页面跳转
      window.location.href = option.link;
    }
  };

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

    // 更新URL参数，但不重新加载页面
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (nextSelectedUsages.length === 1 && nextSelectedUsages[0] !== 'all') {
        url.searchParams.set('category', nextSelectedUsages[0]);
      } else {
        url.searchParams.delete('category');
      }
      // 使用pushState而不是replaceState，让用户可以后退
      window.history.pushState({}, '', url.toString());
    }
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
          const {
            frontmatter = {},
            link = '',
            title: metaTitle,
            _isTodo = false,
          } = meta;
          const { title: fmTitle, screenshot, category = [] } = frontmatter;
          const categoryList = category
            .map((tagId) => GRAPH_USAGES_MAP.get(tagId))
            .filter(Boolean)
            .map((item) =>
              lang === LANGUAGE_MAP.ZH ? item.nameZh : item.nameEn,
            );
          return (
            <Col span={8} key={link}>
              <MemoChartCard
                title={metaTitle || fmTitle || ''}
                screenshot={screenshot}
                link={link}
                categoryList={categoryList}
                disabled={_isTodo}
              />
            </Col>
          );
        }),
    [metaList, hasAllFlag, usageSet, lang],
  );

  return (
    <StyledWrapper>
      <GlobalStyle />
      {/* 顶部搜索区域 */}
      <div className="header-section">
        <div className="search-container">
          <div className="header-title">
            <AppstoreOutlined />
            {lang === LANGUAGE_MAP.ZH ? '图表介绍' : 'Chart Gallery'}
          </div>
          <p className="header-subtitle">
            {lang === LANGUAGE_MAP.ZH
              ? '探索丰富的数据可视化图表，找到最适合你需求的图表类型'
              : 'Explore rich data visualization charts and find the chart type that best suits your needs'}
          </p>
          <div className="search-box">
            <AutoComplete
              style={{ width: '100%', maxWidth: 600 }}
              options={searchOptions}
              onSearch={handleSearch}
              onSelect={handleSelect}
              placeholder={
                lang === LANGUAGE_MAP.ZH ? '搜索关键字...' : 'Search KeyWord...'
              }
              allowClear
              showSearch
              filterOption={false}
              value={keywords}
              onChange={setKeywords}
            />
          </div>
        </div>
      </div>

      {/* 分类过滤区域 */}
      <div className="filter-panel">
        <div className="filter-title">
          <FilterOutlined />
          {lang === LANGUAGE_MAP.ZH ? '按类型筛选' : 'Filter by Type'}
        </div>
        <Flex gap={0} wrap align="center">
          {GRAPH_USAGES.map(({ id, nameZh, nameEn, icon }) => {
            const IconComponent = icon;
            return (
              <Tag.CheckableTag
                className="filter-tag"
                key={id}
                checked={selectedUsages.includes(id)}
                onChange={(checked) => handleChange(id, checked)}
              >
                <IconComponent style={{ marginRight: 6 }} />
                {lang === LANGUAGE_MAP.ZH ? nameZh : nameEn}
              </Tag.CheckableTag>
            );
          })}
        </Flex>
      </div>

      {/* 图表统计 */}
      <div className="gallery-stats">
        <AppstoreOutlined />
        {lang === LANGUAGE_MAP.ZH ? (
          <>
            共 <span className="stats-number">{chartList.length}</span>{' '}
            种图表类型
          </>
        ) : (
          <>
            <span className="stats-number">{chartList.length}</span> chart types
            available
          </>
        )}
      </div>

      {/* 图表网格 */}
      <div className="charts-grid">
        <Row gutter={[24, 24]}>{chartList}</Row>
      </div>
    </StyledWrapper>
  );
};
