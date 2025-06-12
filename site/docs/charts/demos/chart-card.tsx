/**
 * inline: true
 */
import * as React from 'react';
import { Flex, Card } from 'antd';
import { FileExclamationOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { useNavigate, useLocale } from 'dumi';

const StyledCard = styled(Card)`
  position: relative;

  .usage-items {
    margin-top: 2px;

    .usage-item {
      border-radius: 12px;
      padding: 0px 12px;
      font-size: 10px;
      border: 1px solid #f0f0f0;
    }
  }

  .disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    .disabled-text {
      color: white;
      font-size: 16px;
      font-weight: 500;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
  }

  &.disabled {
    cursor: not-allowed;

    .ant-card-body {
      opacity: 0.7;
    }
  }
`;

const ChartCard: React.FC = (props) => {
  const { title, screenshot, link, categoryList, disabled = false } = props;
  const navigate = useNavigate();
  const { id: lang } = useLocale();

  const getDisabledText = () => {
    return lang === 'zh' ? '相关文档待补充' : 'Documentation to be added';
  };

  const handleClick = () => {
    if (!disabled) {
      navigate(link);
    }
  };

  return (
    <StyledCard
      size="small"
      onClick={handleClick}
      hoverable={!disabled}
      title={title}
      style={{ borderRadius: 8 }}
      className={disabled ? 'disabled' : ''}
    >
      <Flex justify="center" align="center">
        <img alt={title} src={screenshot} height={158} />
      </Flex>

      <Flex wrap gap={2} className="usage-items">
        {categoryList.map((category, index) => (
          <div className="usage-item" key={index}>
            {category}
          </div>
        ))}
      </Flex>

      {disabled && (
        <div className="disabled-overlay">
          <div className="disabled-text">
            <FileExclamationOutlined style={{ marginRight: 6 }} />
            {getDisabledText()}
          </div>
        </div>
      )}
    </StyledCard>
  );
};

export default ChartCard;
