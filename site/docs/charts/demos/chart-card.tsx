/**
 * inline: true
 */
import * as React from 'react';
import { Flex, Card } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'dumi';

const StyledCard = styled(Card)`
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

const ChartCard: React.FC = (props) => {
  const { title, screenshot, link, categoryList } = props;
  const navigate = useNavigate();

  return (
    <StyledCard
      size="small"
      onClick={() => navigate(link)}
      hoverable
      title={title}
      style={{ borderRadius: 8 }}
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
    </StyledCard>
  );
};

export default ChartCard;
